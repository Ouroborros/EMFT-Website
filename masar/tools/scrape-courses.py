#!/usr/bin/env python3
"""Scrape course listings into a spreadsheet.

    python3 tools/scrape-courses.py --template courses.xlsx
    python3 tools/scrape-courses.py --discover https://example.com/some-course
    python3 tools/scrape-courses.py --site https://example.com --out courses.xlsx

Run it where the network is open — it cannot run inside a sandbox whose gateway
blocks the target host.

BEFORE YOU POINT THIS AT A SITE
    Scraping a directory's listings and republishing them is the thing most
    directory terms of service exist to prohibit, and in the EU a compiled
    database carries its own sui generis right separate from copyright. Read
    the target's terms and robots.txt and decide whether you have the right.
    This script will refuse a path robots.txt disallows, but robots.txt is not
    a licence — it is one signal, and it is not the terms of service.

HOW IT EXTRACTS
    1. schema.org JSON-LD (Course, Event, Product) — most course sites publish
       it for Google, it is stable across redesigns, and it needs no selectors.
    2. Open Graph and <meta> tags — title, description, image.
    3. CSS selectors you supply in a --config JSON file, for anything the first
       two miss. Needs beautifulsoup4 installed; everything else is stdlib.

    Use --discover on one course page first. It prints what each strategy finds
    so you can see whether you need selectors at all.

POLITENESS
    robots.txt is fetched and obeyed, including crawl-delay. Default pause
    between requests is 2s. Every response is cached under .scrape-cache/ so
    re-runs and parser changes cost the site nothing.
"""

import argparse
import csv
import gzip
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
from html import unescape

UA = ("MasarCourseIndexer/1.0 (+set --contact to a real address so the site "
      "operator can reach you)")

# The spreadsheet contract. Columns marked * are what the site needs; the _ar
# ones exist because the catalogue is bilingual and scraped pages will not have
# them — see tools/spreadsheet-to-batch.py.
COLUMNS = [
    "source_url", "school", "school_city", "school_country",
    "title", "title_ar", "summary", "summary_ar",
    "subject", "format", "start", "days", "price", "currency", "langs",
    "audience", "audience_ar", "highlights", "highlights_ar",
    "rating", "reviews", "scraped_at",
]

EXAMPLE_ROW = {
    "source_url": "https://example.com/courses/advanced-general-management",
    "school": "Example Business School", "school_city": "London",
    "school_country": "United Kingdom",
    "title": "Advanced General Management Programme",
    "title_ar": "برنامج الإدارة العامة المتقدّم",
    "summary": "A four-week residential step-up for senior managers.",
    "summary_ar": "برنامج داخلي مكثّف يمتدّ أربعة أسابيع للمديرين التنفيذيين.",
    "subject": "leadership", "format": "in-person", "start": "2026-09-14",
    "days": 12, "price": 24500, "currency": "USD", "langs": "en",
    "audience": "Senior managers with 12+ years of experience",
    "audience_ar": "مديرون تنفيذيون بخبرة 12 عامًا فأكثر",
    "highlights": "Enterprise strategy simulation | Board-level finance | 360° feedback | Alumni network",
    "highlights_ar": "محاكاة استراتيجية | التمويل على مستوى المجلس | تقييم شامل | شبكة خريجين",
    "rating": 4.8, "reviews": 212, "scraped_at": "2026-08-04T10:00:00Z",
}


# --------------------------------------------------------------------------
# Fetching
# --------------------------------------------------------------------------

class Fetcher:
    def __init__(self, cache_dir=".scrape-cache", delay=2.0, contact=None, timeout=30):
        self.cache_dir = cache_dir
        self.delay = delay
        self.timeout = timeout
        self.ua = UA if not contact else "MasarCourseIndexer/1.0 (+%s)" % contact
        self.last_request = 0.0
        self.robots = {}
        os.makedirs(cache_dir, exist_ok=True)

    def _cache_path(self, url):
        return os.path.join(self.cache_dir, hashlib.sha256(url.encode()).hexdigest() + ".html")

    def allowed(self, url):
        """Check robots.txt for this host, caching the parser per host."""
        parts = urllib.parse.urlsplit(url)
        root = "{}://{}".format(parts.scheme, parts.netloc)
        if root not in self.robots:
            rp = urllib.robotparser.RobotFileParser()
            rp.set_url(root + "/robots.txt")
            try:
                rp.read()
            except Exception as e:
                # No robots.txt readable. Treat as "not explicitly allowed" and
                # let the operator decide, rather than assuming consent.
                print("  ! could not read {}/robots.txt ({})".format(root, e))
                rp = None
            self.robots[root] = rp
        rp = self.robots[root]
        if rp is None:
            return True, None
        delay = rp.crawl_delay(self.ua) or rp.crawl_delay("*")
        return rp.can_fetch(self.ua, url), delay

    def get(self, url, use_cache=True):
        path = self._cache_path(url)
        if use_cache and os.path.exists(path):
            with open(path, encoding="utf-8", errors="replace") as fh:
                return fh.read()

        ok, crawl_delay = self.allowed(url)
        if not ok:
            raise PermissionError("robots.txt disallows {}".format(url))

        wait = max(self.delay, crawl_delay or 0) - (time.time() - self.last_request)
        if wait > 0:
            time.sleep(wait)

        req = urllib.request.Request(url, headers={
            "User-Agent": self.ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en",
        })
        self.last_request = time.time()
        with urllib.request.urlopen(req, timeout=self.timeout) as resp:
            raw = resp.read()
            if resp.headers.get("Content-Encoding") == "gzip":
                raw = gzip.decompress(raw)
            charset = resp.headers.get_content_charset() or "utf-8"
            body = raw.decode(charset, errors="replace")

        with open(path, "w", encoding="utf-8") as fh:
            fh.write(body)
        return body


# --------------------------------------------------------------------------
# Extraction
# --------------------------------------------------------------------------

JSONLD_RE = re.compile(
    r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.S | re.I)
META_RE = re.compile(r"<meta\s+[^>]*>", re.I)
TAG_RE = re.compile(r"<[^>]+>")


def json_ld_blocks(html):
    out = []
    for raw in JSONLD_RE.findall(html):
        raw = raw.strip()
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            # Some sites emit several objects back to back, or trailing commas.
            try:
                data = json.loads("[" + re.sub(r"}\s*{", "},{", raw) + "]")
            except json.JSONDecodeError:
                continue
        out.extend(data if isinstance(data, list) else [data])
    # @graph wrappers hold the interesting nodes one level down.
    flat = []
    for node in out:
        if isinstance(node, dict) and "@graph" in node:
            flat.extend(node["@graph"])
        else:
            flat.append(node)
    return [n for n in flat if isinstance(n, dict)]


def meta_tags(html):
    tags = {}
    for tag in META_RE.findall(html):
        name = re.search(r'(?:property|name)=["\']([^"\']+)["\']', tag, re.I)
        content = re.search(r'content=["\']([^"\']*)["\']', tag, re.I)
        if name and content:
            tags[name.group(1).lower()] = unescape(content.group(1)).strip()
    return tags


def text(value):
    if value is None:
        return ""
    if isinstance(value, list):
        return " | ".join(text(v) for v in value if v)
    if isinstance(value, dict):
        return text(value.get("name") or value.get("@value") or "")
    return unescape(TAG_RE.sub(" ", str(value))).replace("&nbsp;", " ").strip()


def first(node, *keys):
    for k in keys:
        if node.get(k):
            return node[k]
    return None


def from_json_ld(nodes, url):
    """Pull a course row out of schema.org nodes, if any of them describe one."""
    wanted = {"course", "courseinstance", "event", "educationevent", "product"}
    node = next((n for n in nodes
                 if str(n.get("@type", "")).lower() in wanted
                 or (isinstance(n.get("@type"), list)
                     and any(str(t).lower() in wanted for t in n["@type"]))), None)
    if not node:
        return None

    row = {c: "" for c in COLUMNS}
    row["source_url"] = url
    row["title"] = text(first(node, "name", "headline"))
    row["summary"] = text(first(node, "description", "abstract"))

    provider = first(node, "provider", "organizer", "brand", "publisher") or {}
    if isinstance(provider, list):
        provider = provider[0] if provider else {}
    if isinstance(provider, dict):
        row["school"] = text(provider.get("name"))
        addr = provider.get("address") or {}
        if isinstance(addr, dict):
            row["school_city"] = text(addr.get("addressLocality"))
            row["school_country"] = text(addr.get("addressCountry"))

    offers = first(node, "offers") or {}
    if isinstance(offers, list):
        offers = offers[0] if offers else {}
    if isinstance(offers, dict):
        row["price"] = text(first(offers, "price", "lowPrice"))
        row["currency"] = text(offers.get("priceCurrency"))

    instance = first(node, "hasCourseInstance") or {}
    if isinstance(instance, list):
        instance = instance[0] if instance else {}
    src = instance if isinstance(instance, dict) and instance else node

    def pick(*keys):
        # Sites split these fields between the Course node and its
        # CourseInstance inconsistently; instance first, then the node.
        return text(first(src, *keys) or first(node, *keys))

    start = pick("startDate", "courseSchedule")
    row["start"] = start[:10] if re.match(r"^\d{4}-\d{2}-\d{2}", start) else start
    row["format"] = pick("courseMode", "eventAttendanceMode")
    row["langs"] = pick("inLanguage", "availableLanguage")
    row["days"] = pick("timeRequired", "duration")

    rating = first(node, "aggregateRating") or {}
    if isinstance(rating, dict):
        row["rating"] = text(rating.get("ratingValue"))
        row["reviews"] = text(first(rating, "reviewCount", "ratingCount"))

    location = first(src, "location") or {}
    if isinstance(location, dict) and not row["school_city"]:
        addr = location.get("address") or {}
        if isinstance(addr, dict):
            row["school_city"] = text(addr.get("addressLocality"))
            row["school_country"] = text(addr.get("addressCountry"))

    return row if row["title"] else None


def from_meta(html, url):
    tags = meta_tags(html)
    title = tags.get("og:title") or tags.get("twitter:title") or ""
    if not title:
        m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
        title = unescape(m.group(1)).strip() if m else ""
    if not title:
        return None
    row = {c: "" for c in COLUMNS}
    row["source_url"] = url
    row["title"] = title
    row["summary"] = tags.get("og:description") or tags.get("description") or ""
    row["school"] = tags.get("og:site_name") or ""
    return row


def from_selectors(html, url, config):
    """Last resort: CSS selectors from a --config file. Needs beautifulsoup4."""
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        print("  ! selector extraction needs beautifulsoup4: pip install beautifulsoup4")
        return None
    soup = BeautifulSoup(html, "html.parser")
    row = {c: "" for c in COLUMNS}
    row["source_url"] = url
    for field, selector in (config.get("selectors") or {}).items():
        if field not in row:
            continue
        found = soup.select(selector)
        if found:
            row[field] = " | ".join(el.get_text(" ", strip=True) for el in found[:6])
    return row if row.get("title") else None


def extract(html, url, config):
    for strategy in (lambda: from_json_ld(json_ld_blocks(html), url),
                     lambda: from_selectors(html, url, config) if config.get("selectors") else None,
                     lambda: from_meta(html, url)):
        row = strategy()
        if row:
            row["scraped_at"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            return row
    return None


# --------------------------------------------------------------------------
# Discovery
# --------------------------------------------------------------------------

LOC_RE = re.compile(r"<loc>\s*([^<\s]+)\s*</loc>", re.I)
HREF_RE = re.compile(r'href=["\']([^"\'#]+)["\']', re.I)


def discover_urls(fetcher, site, pattern, limit):
    """Prefer the sitemap; fall back to links on the site's own pages."""
    urls, seen = [], set()
    rx = re.compile(pattern) if pattern else None

    for sm in ("/sitemap.xml", "/sitemap_index.xml", "/sitemap-index.xml"):
        try:
            body = fetcher.get(site.rstrip("/") + sm)
        except Exception:
            continue
        found = LOC_RE.findall(body)
        # A sitemap index points at more sitemaps.
        for loc in list(found):
            if loc.endswith(".xml") and len(urls) < limit:
                try:
                    found.extend(LOC_RE.findall(fetcher.get(loc)))
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
            return urls

    print("  no usable sitemap; falling back to links on the homepage")
    try:
        body = fetcher.get(site)
    except Exception as e:
        sys.exit("could not fetch {}: {}".format(site, e))
    for href in HREF_RE.findall(body):
        full = urllib.parse.urljoin(site, href)
        if urllib.parse.urlsplit(full).netloc != urllib.parse.urlsplit(site).netloc:
            continue
        if rx and not rx.search(full):
            continue
        if full not in seen:
            seen.add(full)
            urls.append(full)
        if len(urls) >= limit:
            break
    return urls


# --------------------------------------------------------------------------
# Output
# --------------------------------------------------------------------------

def write_csv(rows, path):
    with open(path, "w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=COLUMNS)
        w.writeheader()
        for r in rows:
            w.writerow({c: r.get(c, "") for c in COLUMNS})
    return path


def write_xlsx(rows, path, with_legend=True):
    try:
        from openpyxl import Workbook
        from openpyxl.styles import Alignment, Font, PatternFill
        from openpyxl.utils import get_column_letter
    except ImportError:
        print("  ! openpyxl not installed — wrote CSV only (pip install openpyxl for .xlsx)")
        return None

    wb = Workbook()
    ws = wb.active
    ws.title = "Courses"

    header_font = Font(name="Arial", bold=True, color="FFFFFF")
    header_fill = PatternFill("solid", fgColor="0F6B57")
    needs_fill = PatternFill("solid", fgColor="FFF3CD")
    body = Font(name="Arial")

    ws.append(COLUMNS)
    for i, col in enumerate(COLUMNS, 1):
        cell = ws.cell(row=1, column=i)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        width = 42 if col in ("summary", "summary_ar", "highlights", "highlights_ar",
                              "source_url", "title", "title_ar") else 16
        ws.column_dimensions[get_column_letter(i)].width = width

    for r in rows:
        ws.append([r.get(c, "") for c in COLUMNS])

    ar_cols = {COLUMNS.index(c) + 1 for c in COLUMNS if c.endswith("_ar")}
    for row in ws.iter_rows(min_row=2):
        for cell in row:
            cell.font = body
            cell.alignment = Alignment(vertical="top", wrap_text=True)
            # The bilingual columns a scrape cannot fill, flagged for a translator.
            if cell.column in ar_cols and not cell.value:
                cell.fill = needs_fill

    ws.freeze_panes = "A2"
    ws.auto_filter.ref = "A1:{}{}".format(
        get_column_letter(len(COLUMNS)), max(ws.max_row, 1))

    if with_legend:
        legend = wb.create_sheet("How to use")
        notes = [
            ("Column", "What to put in it"),
            ("source_url", "The page this row came from. Keep it — it is your provenance trail."),
            ("school / school_city / school_country", "The institution running the programme."),
            ("title / summary", "English. Scraped where available."),
            ("title_ar / summary_ar / audience_ar / highlights_ar",
             "ARABIC — a scrape will not fill these. Highlighted cells are empty and need a "
             "translator before the row can go live, because the site is bilingual."),
            ("subject", "One of: leadership, finance, strategy, digital, data, marketing, "
                        "operations, people, sustainability, negotiation, entrepreneurship, healthcare"),
            ("format", "in-person, online or blended"),
            ("start", "YYYY-MM-DD"),
            ("days", "Teaching days, as a whole number"),
            ("price / currency", "Fee as a number, and its currency code"),
            ("langs", "Language of instruction: en, ar, fr, es, de — separate several with |"),
            ("highlights", "Up to 4 items separated by | "),
            ("rating / reviews", "Only if the source publishes them. Leave blank rather than guess."),
            ("", ""),
            ("Then", "python3 tools/spreadsheet-to-batch.py <this file> --out batch-import.json"),
            ("Then", "python3 tools/merge-catalogue.py <dir holding that json> --write"),
            ("", ""),
            ("Note", "Rows whose Arabic columns are empty will be reported by "
                     "spreadsheet-to-batch.py and cannot be merged until they are filled."),
        ]
        for r in notes:
            legend.append(list(r))
        legend.column_dimensions["A"].width = 42
        legend.column_dimensions["B"].width = 96
        for row in legend.iter_rows():
            for cell in row:
                cell.font = Font(name="Arial", bold=(cell.row == 1))
                cell.alignment = Alignment(vertical="top", wrap_text=True)

    wb.save(path)
    return path


# --------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--site", help="site root, e.g. https://example.com")
    ap.add_argument("--url", action="append", default=[], help="scrape one URL (repeatable)")
    ap.add_argument("--pattern", help="regex a URL must match to be treated as a course page")
    ap.add_argument("--out", default="courses.xlsx", help="output .xlsx (a .csv is written too)")
    ap.add_argument("--limit", type=int, default=200, help="max pages (default 200)")
    ap.add_argument("--delay", type=float, default=2.0, help="seconds between requests (default 2)")
    ap.add_argument("--contact", help="your email, put in the User-Agent")
    ap.add_argument("--config", help="JSON file with {\"selectors\": {...}}")
    ap.add_argument("--discover", metavar="URL", help="show what each strategy finds on one page")
    ap.add_argument("--template", metavar="PATH", help="write an empty import template and exit")
    ap.add_argument("--no-cache", action="store_true")
    args = ap.parse_args()

    if args.template:
        write_csv([EXAMPLE_ROW], os.path.splitext(args.template)[0] + ".csv")
        write_xlsx([EXAMPLE_ROW], args.template)
        print("wrote {} (and .csv) — one example row showing the expected format".format(args.template))
        return

    config = {}
    if args.config:
        with open(args.config, encoding="utf-8") as fh:
            config = json.load(fh)

    fetcher = Fetcher(delay=args.delay, contact=args.contact)

    if args.discover:
        url = args.discover
        ok, delay = fetcher.allowed(url)
        print("robots.txt allows this path: {}{}".format(
            ok, "" if delay is None else "  (crawl-delay {}s)".format(delay)))
        if not ok:
            sys.exit("robots.txt disallows it — stopping.")
        html = fetcher.get(url, use_cache=not args.no_cache)
        print("fetched {} bytes\n".format(len(html)))

        nodes = json_ld_blocks(html)
        print("JSON-LD blocks: {}".format(len(nodes)))
        for n in nodes[:8]:
            print("   @type={}  keys={}".format(n.get("@type"), ", ".join(list(n)[:12])))
        row = from_json_ld(nodes, url)
        print("\nJSON-LD extraction: {}".format("MATCH" if row else "no course-shaped node"))
        if row:
            for k, v in row.items():
                if v:
                    print("   {:<16} {}".format(k, str(v)[:96]))
        tags = meta_tags(html)
        print("\nmeta tags found: {}".format(len(tags)))
        for k in ("og:title", "og:description", "og:site_name", "description"):
            if tags.get(k):
                print("   {:<16} {}".format(k, tags[k][:96]))
        print("\nIf JSON-LD said MATCH you need no selectors. If it did not, write a "
              "--config file mapping column names to CSS selectors and re-run --discover.")
        return

    urls = list(args.url)
    if args.site:
        print("discovering course pages on {} ...".format(args.site))
        urls += discover_urls(fetcher, args.site, args.pattern, args.limit)
    if not urls:
        sys.exit("nothing to scrape — pass --site or --url")

    urls = urls[:args.limit]
    print("{} page(s) to fetch\n".format(len(urls)))

    rows, skipped, failed = [], 0, 0
    for i, url in enumerate(urls, 1):
        try:
            html = fetcher.get(url, use_cache=not args.no_cache)
        except PermissionError as e:
            print("  [{}/{}] blocked by robots.txt: {}".format(i, len(urls), url))
            skipped += 1
            continue
        except Exception as e:
            print("  [{}/{}] failed: {} ({})".format(i, len(urls), url, e))
            failed += 1
            continue
        row = extract(html, url, config)
        if row:
            rows.append(row)
            print("  [{}/{}] {}".format(i, len(urls), row["title"][:70]))
        else:
            print("  [{}/{}] no course found on {}".format(i, len(urls), url))

    if not rows:
        sys.exit("\nNothing extracted. Run --discover on one course page to see why.")

    csv_path = write_csv(rows, os.path.splitext(args.out)[0] + ".csv")
    xlsx_path = write_xlsx(rows, args.out)
    print("\n{} row(s) written".format(len(rows)))
    print("  {}".format(csv_path))
    if xlsx_path:
        print("  {}".format(xlsx_path))
    if skipped or failed:
        print("  ({} blocked by robots.txt, {} fetch failures)".format(skipped, failed))
    missing_ar = sum(1 for r in rows if not r.get("title_ar"))
    if missing_ar:
        print("\n{} row(s) have no Arabic. The site is bilingual, so those columns need "
              "filling before the rows can be merged.".format(missing_ar))


if __name__ == "__main__":
    main()
