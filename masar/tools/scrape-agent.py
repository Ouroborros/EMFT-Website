#!/usr/bin/env python3
"""An agent that scrapes course listings into the import spreadsheet.

    export ANTHROPIC_API_KEY=sk-ant-...        # or `ant auth login`
    python3 tools/scrape-agent.py --site https://example.com \
        --pattern "/courses/" --out courses.xlsx --contact you@example.com

Where tools/scrape-courses.py is a fixed pipeline (fetch → JSON-LD → row),
this is the agentic version: Claude drives the same polite fetcher through a
tool loop, decides which pages are course pages, adapts its extraction when a
site has no structured data, translates each row into Arabic itself, and
writes the same spreadsheet the rest of the pipeline consumes
(spreadsheet-to-batch.py → merge-catalogue.py).

The division of labour is deliberate:

  * The TOOLS own everything that must not be left to a model's judgement —
    robots.txt enforcement, rate limiting, the response cache, the page
    budget, and the column contract. The agent cannot fetch a disallowed
    path or exceed the page limit, because the tool refuses.
  * The AGENT owns everything that benefits from judgement — which URLs are
    course pages, how to read a page with no JSON-LD, how to normalise a
    duration or a fee, and the Arabic translation of each field.

Run it where the network is open. Same legal note as scrape-courses.py:
robots.txt is enforced but it is not a licence — whether you may republish a
site's listings is governed by its terms, and that judgement is yours.
"""

import argparse
import importlib.util
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))


def _load(name, filename):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, filename))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


sc = _load("scrape_courses", "scrape-courses.py")

try:
    import anthropic
    from anthropic import beta_tool
except ImportError:
    sys.exit("This agent needs the Anthropic SDK: pip install anthropic")


# --------------------------------------------------------------------------
# Shared state the tools operate on. Module-level because @beta_tool wraps
# plain functions; main() configures it before the loop starts.
# --------------------------------------------------------------------------

STATE = {
    "fetcher": None,      # sc.Fetcher — robots, rate limit, cache
    "budget": 100,        # pages remaining; fetch() decrements and refuses at 0
    "fetched": 0,
    "rows": [],           # accepted course rows
}

SCRIPT_STYLE_RE = re.compile(r"<(script|style|noscript)[^>]*>.*?</\1>", re.S | re.I)

# Rating/review fields deliberately excluded: unless the source publishes them
# (in which case they arrive via JSON-LD), inventing them is what this project
# refuses to do. merge-catalogue.py treats them as optional.
REQUIRED_EN = ["source_url", "school", "title", "summary", "subject", "format",
               "start", "days", "price", "currency", "langs"]
REQUIRED_AR = ["title_ar", "summary_ar"]


def _visible_text(html, cap=2000):
    body = SCRIPT_STYLE_RE.sub(" ", html)
    text = sc.TAG_RE.sub(" ", body)
    return re.sub(r"\s+", " ", sc.unescape(text)).strip()[:cap]


def _internal_links(html, base_url, cap=60):
    from urllib.parse import urljoin, urlsplit
    host = urlsplit(base_url).netloc
    seen, links = set(), []
    for href in sc.HREF_RE.findall(html):
        full = urljoin(base_url, href)
        if urlsplit(full).netloc != host or full in seen:
            continue
        seen.add(full)
        links.append(full)
        if len(links) >= cap:
            break
    return links


# --------------------------------------------------------------------------
# Tools
# --------------------------------------------------------------------------

@beta_tool
def discover(site: str, pattern: str = "") -> str:
    """List candidate page URLs from a site's sitemap, falling back to links
    on the homepage. Call this once at the start to map the site before
    fetching individual pages.

    Args:
        site: The site root, e.g. https://example.com
        pattern: Optional regular expression; only URLs matching it are kept.
    """
    try:
        urls = sc.discover_urls(STATE["fetcher"], site, pattern or None, STATE["budget"])
    except SystemExit as e:
        return json.dumps({"error": str(e)})
    except Exception as e:
        return json.dumps({"error": "{}: {}".format(type(e).__name__, e)})
    return json.dumps({"count": len(urls), "urls": urls})


@beta_tool
def fetch(url: str) -> str:
    """Politely fetch one page and return a digest of it. robots.txt is
    enforced, requests are rate-limited and cached, and a page budget applies
    — when the budget is exhausted this tool refuses, so spend fetches on
    pages likely to be course pages.

    The digest contains: `jsonld_course` (a pre-extracted course row if the
    page has schema.org Course/Event data — trust it, it is more reliable
    than reading text), `meta` (OpenGraph/description tags), `text` (visible
    page text, truncated), and `links` (same-site links on the page).

    Args:
        url: The absolute URL to fetch.
    """
    if STATE["budget"] <= 0:
        return json.dumps({"error": "page budget exhausted — stop fetching, save what "
                                    "you have with save_courses, and summarise"})
    try:
        html = STATE["fetcher"].get(url)
    except PermissionError:
        return json.dumps({"error": "robots.txt disallows this URL; do not retry it "
                                    "or try to reach it another way"})
    except Exception as e:
        return json.dumps({"error": "fetch failed: {}: {}".format(type(e).__name__, e)})

    STATE["budget"] -= 1
    STATE["fetched"] += 1

    row = sc.from_json_ld(sc.json_ld_blocks(html), url)
    tags = sc.meta_tags(html)
    digest = {
        "url": url,
        "budget_remaining": STATE["budget"],
        "jsonld_course": {k: v for k, v in row.items() if v} if row else None,
        "meta": {k: v[:300] for k, v in tags.items()
                 if k in ("og:title", "og:description", "og:site_name", "description")},
        "text": _visible_text(html),
        "links": _internal_links(html, url),
    }
    return json.dumps(digest, ensure_ascii=False)


@beta_tool
def save_courses(rows_json: str) -> str:
    """Save completed course rows to the spreadsheet. Call this with a batch
    of finished rows (not one field at a time). Rows are validated; rejected
    rows are returned with reasons so you can fix and resubmit them.

    Args:
        rows_json: A JSON array of objects. Each object uses exactly these
            keys — source_url, school, school_city, school_country, title,
            title_ar, summary, summary_ar, subject, format, start, days,
            price, currency, langs, audience, audience_ar, highlights,
            highlights_ar, rating, reviews. Leave a field empty rather than
            guessing; rating/reviews only if the source publishes them.
    """
    try:
        rows = json.loads(rows_json)
        assert isinstance(rows, list)
    except Exception:
        return json.dumps({"error": "rows_json must be a JSON array of objects"})

    accepted, rejected = 0, []
    for i, row in enumerate(rows):
        if not isinstance(row, dict):
            rejected.append({"index": i, "reason": "not an object"})
            continue
        unknown = [k for k in row if k not in sc.COLUMNS]
        missing = [k for k in REQUIRED_EN + REQUIRED_AR if not str(row.get(k, "")).strip()]
        if unknown:
            rejected.append({"index": i, "reason": "unknown keys: {}".format(unknown)})
        elif missing:
            rejected.append({"index": i, "reason": "missing/empty: {}".format(missing)})
        elif any(str(row.get("source_url")) == str(r.get("source_url"))
                 and str(row.get("title")) == str(r.get("title")) for r in STATE["rows"]):
            rejected.append({"index": i, "reason": "duplicate of an already-saved row"})
        else:
            row["scraped_at"] = sc.time.strftime("%Y-%m-%dT%H:%M:%SZ", sc.time.gmtime())
            STATE["rows"].append(row)
            accepted += 1
    return json.dumps({"accepted": accepted, "total_saved": len(STATE["rows"]),
                       "rejected": rejected})


# --------------------------------------------------------------------------

SYSTEM = """You are a data-collection agent building a bilingual (English/Arabic) course
spreadsheet from a website's public course listings.

## Method
1. discover() once to map the site; identify which URLs are course pages
   (detail pages for a single course — not category indexes, news, or about
   pages). Fetch one candidate first to confirm the page shape before
   spending budget on the rest.
2. If a page carries `jsonld_course`, prefer it over reading the text; use
   the text only to fill fields JSON-LD lacks. If the site has no structured
   data, extract from `meta` and `text` — carefully, and leave blank what
   the page does not state.
3. Normalise as you go: dates to YYYY-MM-DD, durations to whole teaching
   days, prices to a number plus its ISO currency code (do NOT convert
   currencies), format to one of in-person / online / blended, subject to
   one of: leadership, finance, strategy, digital, data, marketing,
   operations, people, sustainability, negotiation, entrepreneurship,
   healthcare. langs are codes (en, ar, fr, es, de), several separated
   by |. highlights: up to 4 items separated by | .
4. Translate title, summary, audience and highlights into Arabic yourself —
   Modern Standard Arabic, natural business register, faithful to the
   source; never a word-for-word tracing. This is the field a plain scraper
   cannot fill and the reason you exist.
5. save_courses() in batches of 5-15 as you complete rows. Fix and resubmit
   anything rejected.
6. When the useful pages are exhausted or the budget runs out, stop and
   summarise: pages fetched, rows saved, what was skipped and why.

## Rules
- Honesty over completeness: an empty cell beats a guessed value. Never
  invent fees, dates, ratings or review counts; ratings only if the page
  itself publishes them.
- The fetch tool enforces robots.txt and a page budget. Never attempt to
  circumvent either; a robots refusal is final for that URL.
- Every row's source_url must be the page it actually came from.
- Do not fetch the same URL twice (responses are cached, but it wastes
  budget accounting); do not fetch off-site URLs.
"""


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--site", help="site root to crawl")
    ap.add_argument("--url", action="append", default=[], help="specific page (repeatable)")
    ap.add_argument("--pattern", default="", help="regex hint for course-page URLs")
    ap.add_argument("--out", default="courses.xlsx")
    ap.add_argument("--limit", type=int, default=100, help="max pages fetched (default 100)")
    ap.add_argument("--delay", type=float, default=2.0)
    ap.add_argument("--contact", help="your email, sent in the User-Agent")
    ap.add_argument("--model", default="claude-opus-5")
    ap.add_argument("--task", help="extra instructions for the agent")
    args = ap.parse_args()

    if not args.site and not args.url:
        sys.exit("pass --site or --url")

    STATE["fetcher"] = sc.Fetcher(delay=args.delay, contact=args.contact)
    STATE["budget"] = args.limit

    task = []
    if args.site:
        task.append("Collect the course listings from {} into the spreadsheet.".format(args.site))
    if args.url:
        task.append("Also process these specific pages: {}".format(", ".join(args.url)))
    if args.pattern:
        task.append("Course pages likely match this URL pattern: {}".format(args.pattern))
    task.append("Page budget: {} fetches.".format(args.limit))
    if args.task:
        task.append(args.task)

    client = anthropic.Anthropic()

    # The tool runner drives the loop: request → run tools → feed results
    # back, until the agent stops calling tools.
    runner = client.beta.messages.tool_runner(
        model=args.model,
        max_tokens=16000,
        system=SYSTEM,
        tools=[discover, fetch, save_courses],
        messages=[{"role": "user", "content": " ".join(task)}],
    )

    last = None
    for message in runner:
        last = message
        for block in message.content:
            if block.type == "text" and block.text.strip():
                print(block.text)
        if message.stop_reason == "refusal":
            print("\n[the model declined to continue: {}]".format(
                getattr(message, "stop_details", None)))
            break

    print("\n{} page(s) fetched, {} row(s) collected".format(
        STATE["fetched"], len(STATE["rows"])))
    if not STATE["rows"]:
        sys.exit("nothing collected — nothing written")

    csv_path = sc.write_csv(STATE["rows"], os.path.splitext(args.out)[0] + ".csv")
    xlsx_path = sc.write_xlsx(STATE["rows"], args.out)
    print("wrote {}".format(csv_path))
    if xlsx_path:
        print("wrote {}".format(xlsx_path))
    print("\nNext: python3 tools/spreadsheet-to-batch.py {} --out import/batch-scraped.json".format(
        args.out))


if __name__ == "__main__":
    main()
