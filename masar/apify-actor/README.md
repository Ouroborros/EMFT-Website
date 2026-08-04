# Course catalogue scraper — Apify Actor

The Apify-hosted version of the course scrape. Where `../tools/scrape-courses.py`
runs on your machine and `../tools/scrape-agent.py` needs a local Claude API
loop, this Actor runs on Apify's cloud — which has the open network access
that sandboxed environments lack — and writes its results to an Apify
dataset whose rows use the pipeline's exact column contract.

## Deploy and run

```bash
npm install -g apify-cli
apify login                      # once
cd masar/apify-actor
apify push                       # builds and uploads the Actor
```

Then run it from the Apify Console (or `apify call`) with an input like:

```json
{
  "startUrls": [{"url": "https://executivecourses.com/"}],
  "urlPattern": "/(course|program)",
  "maxPages": 20,
  "requestsPerMinute": 30,
  "useSitemap": true
}
```

Start with a small `maxPages` and read the dataset before a full run — the
overview table in the Console shows title, school, fee and dates per row, so
extraction problems are visible immediately.

To also fill the Arabic columns in the same run, set `translate: true` and
provide `anthropicApiKey` (stored as a secret). Translation is per-row Claude
usage; leave it off while you are still tuning the crawl.

## Getting the data into the site

Export the dataset as CSV from the Console (or the API), then locally:

```bash
python3 tools/spreadsheet-to-batch.py dataset.csv --out import/batch-scraped.json
python3 tools/merge-catalogue.py import --write
python3 tools/build.py
```

The dataset columns match the import spreadsheet exactly, so no reshaping is
needed. Rows the converter rejects (missing Arabic, unparseable fields) land
in a `.rejected.csv` with reasons.

## What the Actor does — and refuses to do

- **robots.txt is respected** (`respect_robots_txt_file=True`) and requests
  are throttled (`requestsPerMinute`, default 30). A hard page budget caps
  the crawl.
- **Extraction prefers schema.org JSON-LD** (Course / Event / Product nodes,
  including `@graph` wrappers and Course/CourseInstance field splits); pages
  without it fall back to OpenGraph metadata, marked `extraction: "meta"` so
  low-confidence rows are distinguishable.
- **Nothing is invented.** Fees, dates, ratings and review counts appear only
  when the page states them; currencies are recorded, never converted.
- **The legal call is yours.** robots.txt compliance is not a licence — the
  target site's terms govern whether you may republish its listings, and
  running this Actor is the act of deciding you may.

## Local development

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
mkdir -p storage/key_value_stores/default
echo '{"startUrls":[{"url":"http://127.0.0.1:8901/"}],"maxPages":10}' \
  > storage/key_value_stores/default/INPUT.json
.venv/bin/python -m src
```

Dataset items land in `storage/datasets/default/`.
