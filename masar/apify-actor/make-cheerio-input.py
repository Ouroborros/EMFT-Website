#!/usr/bin/env python3
"""Build a run input for Apify's stock `apify/cheerio-scraper` Actor.

Embeds cheerio-page-function.js into the input JSON so the scrape can run on
Apify with no custom Actor deployed at all — via the Apify MCP connector,
the console UI, or the REST API:

    python3 make-cheerio-input.py            # writes input.cheerio.json
    APIFY_TOKEN=... python3 run-remote.py --actor apify~cheerio-scraper \
        --input input.cheerio.json --out courses.csv

Politeness: Cheerio Scraper has no requests-per-minute knob, so the lever is
maxConcurrency=1 (one request in flight) plus respectRobotsTxtFile.
"""

import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(HERE, "cheerio-page-function.js"), encoding="utf-8") as fh:
    page_function = fh.read()

run_input = {
    "startUrls": [
        {"url": "https://executivecourses.com/"},
        {"url": "https://executivecourses.com/upcoming-courses"},
        {"url": "https://executivecourses.com/featured-courses"},
    ],
    "respectRobotsTxtFile": True,
    "linkSelector": "a[href]",
    # One regex over the whole URL: same-site pages that look course-shaped.
    "pseudoUrls": [
        {"purl": "[https?://(www\\.)?executivecourses\\.com/"
                 ".*(course|program|upcoming|featured).*]"},
    ],
    "excludes": [{"glob": "/**/*.{png,jpg,jpeg,gif,svg,pdf,css,js}"}],
    "pageFunction": page_function,
    "proxyConfiguration": {"useApifyProxy": True},
    "maxPagesPerCrawl": 20,
    "maxConcurrency": 1,
    "maxRequestRetries": 2,
    "maxCrawlingDepth": 3,
}

out = os.path.join(HERE, "input.cheerio.json")
with open(out, "w", encoding="utf-8") as fh:
    json.dump(run_input, fh, indent=2, ensure_ascii=False)
    fh.write("\n")
print("wrote", out)
