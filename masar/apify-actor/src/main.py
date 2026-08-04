"""Apify Actor: crawl a course site into Masar-import rows.

Runs on the Apify platform (or locally via `apify run` / `python -m src`).
The crawl is polite by construction — robots.txt respected, a request-rate
throttle, and a hard page budget — and every dataset item uses the pipeline's
column contract, so a dataset export feeds tools/spreadsheet-to-batch.py
directly.

Optionally, each extracted row is translated into Arabic with Claude before
it lands in the dataset (translate=true + an API key in the input).
"""

import json
import re
from urllib.parse import urljoin, urlsplit

from apify import Actor
from crawlee import ConcurrencySettings
from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext

from .extract import COLUMNS, course_from_json_ld, course_from_meta

LOC_RE = re.compile(r"<loc>\s*([^<\s]+)\s*</loc>", re.I)


async def _sitemap_urls(client, root, pattern, limit):
    """Course-page candidates from sitemap.xml — beats blind link-following."""
    urls, seen = [], set()
    rx = re.compile(pattern) if pattern else None
    for path in ("/sitemap.xml", "/sitemap_index.xml", "/sitemap-index.xml"):
        try:
            response = await client.get(urljoin(root, path), follow_redirects=True)
            if response.status_code != 200:
                continue
            found = LOC_RE.findall(response.text)
        except Exception:
            continue
        # A sitemap index points at further sitemaps; fetch one level down.
        for loc in [u for u in found if u.endswith(".xml")][:20]:
            try:
                sub = await client.get(loc, follow_redirects=True)
                if sub.status_code == 200:
                    found.extend(LOC_RE.findall(sub.text))
            except Exception:
                pass
        for loc in found:
            if loc.endswith(".xml") or loc in seen:
                continue
            if rx and not rx.search(loc):
                continue
            seen.add(loc)
            urls.append(loc)
            if len(urls) >= limit:
                return urls
        if urls:
            break
    return urls


def _translate(rows, api_key, model, log):
    """Fill the *_ar columns with Claude. Returns rows; failures leave the
    row untranslated rather than dropping it."""
    import anthropic

    client = anthropic.Anthropic(api_key=api_key)
    schema = {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "title_ar": {"type": "string"},
                        "summary_ar": {"type": "string"},
                        "audience_ar": {"type": "string"},
                        "highlights_ar": {"type": "string"},
                    },
                    "required": ["title_ar", "summary_ar", "audience_ar", "highlights_ar"],
                    "additionalProperties": False,
                },
            }
        },
        "required": ["items"],
        "additionalProperties": False,
    }

    for batch_start in range(0, len(rows), 8):
        batch = rows[batch_start:batch_start + 8]
        payload = [{"title": r.get("title", ""), "summary": r.get("summary", ""),
                    "audience": r.get("audience", ""), "highlights": r.get("highlights", "")}
                   for r in batch]
        try:
            response = client.messages.create(
                model=model,
                max_tokens=16000,
                system=(
                    "Translate course-listing fields into Modern Standard Arabic for a "
                    "bilingual course directory. Natural business register, faithful to "
                    "the source, never a word-for-word tracing. highlights are "
                    "|-separated items — translate each item, keep the | separators and "
                    "the item count. Return one output object per input object, in order. "
                    "An empty input field stays an empty string."
                ),
                messages=[{"role": "user", "content": json.dumps(payload, ensure_ascii=False)}],
                output_config={"format": {"type": "json_schema", "schema": schema}},
            )
            if response.stop_reason == "refusal":
                log.warning("translation batch refused; leaving rows untranslated")
                continue
            text = next(b.text for b in response.content if b.type == "text")
            items = json.loads(text)["items"]
            for row, item in zip(batch, items):
                row.update(item)
        except Exception as exc:  # a translation failure must not lose the scrape
            log.warning(f"translation batch failed ({exc}); rows kept untranslated")
    return rows


async def main():
    async with Actor:
        inp = await Actor.get_input() or {}
        start_urls = [s["url"] if isinstance(s, dict) else s
                      for s in inp.get("startUrls", [])]
        if not start_urls:
            raise ValueError("startUrls is required")
        pattern = (inp.get("urlPattern") or "").strip()
        max_pages = int(inp.get("maxPages") or 50)
        rpm = int(inp.get("requestsPerMinute") or 30)

        rows = []
        start_hosts = {urlsplit(u).netloc for u in start_urls}

        crawler = BeautifulSoupCrawler(
            max_requests_per_crawl=max_pages,
            respect_robots_txt_file=True,
            concurrency_settings=ConcurrencySettings(
                min_concurrency=1, desired_concurrency=1, max_concurrency=2,
                max_tasks_per_minute=rpm),
        )

        @crawler.router.default_handler
        async def handle(ctx: BeautifulSoupCrawlingContext) -> None:
            url = ctx.request.loaded_url or ctx.request.url
            row = course_from_json_ld(ctx.soup, url)
            confidence = "json-ld"
            if row is None:
                row = course_from_meta(ctx.soup, url)
                confidence = "meta"
            if row and row["title"] and (confidence == "json-ld" or
                                         (pattern and re.search(pattern, url))):
                row["extraction"] = confidence
                rows.append(row)
                ctx.log.info(f"course: {row['title'][:60]}  [{confidence}]")
            else:
                ctx.log.info(f"no course on {url}")

            # Follow same-site links; the include filter keeps the budget on
            # course-shaped URLs when a pattern was given.
            kwargs = {"strategy": "same-domain"}
            if pattern:
                kwargs["include"] = [re.compile(pattern)]
            await ctx.enqueue_links(**kwargs)

        seeds = list(start_urls)
        if inp.get("useSitemap", True):
            import httpx
            async with httpx.AsyncClient(timeout=30, headers={
                "User-Agent": "MasarCourseIndexer/1.0 (Apify Actor)"}) as http:
                for root in start_urls:
                    base = "{0.scheme}://{0.netloc}".format(urlsplit(root))
                    found = await _sitemap_urls(http, base, pattern, max_pages)
                    if found:
                        Actor.log.info(f"sitemap seeded {len(found)} URLs from {base}")
                        seeds.extend(found)

        # Dedupe seeds, keep order, stay on the start hosts.
        seen = set()
        seeds = [u for u in seeds
                 if urlsplit(u).netloc in start_hosts
                 and not (u in seen or seen.add(u))]

        await crawler.run(seeds[:max_pages])

        Actor.log.info(f"{len(rows)} course row(s) extracted")

        if rows and inp.get("translate") and inp.get("anthropicApiKey"):
            Actor.log.info("translating to Arabic with Claude...")
            rows = _translate(rows, inp["anthropicApiKey"],
                              inp.get("model") or "claude-opus-5", Actor.log)

        # Exactly the pipeline's columns (plus extraction confidence), so the
        # dataset's CSV/XLSX export feeds spreadsheet-to-batch.py unchanged.
        for row in rows:
            item = {c: row.get(c, "") for c in COLUMNS}
            item["extraction"] = row.get("extraction", "")
            await Actor.push_data(item)

        await Actor.set_status_message(
            f"Done: {len(rows)} courses in the dataset")
