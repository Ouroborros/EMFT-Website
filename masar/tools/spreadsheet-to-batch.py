#!/usr/bin/env python3
"""Turn a course spreadsheet into a batch JSON file for merge-catalogue.py.

    python3 tools/spreadsheet-to-batch.py courses.xlsx --out import/batch-scraped.json
    python3 tools/merge-catalogue.py import --write

Accepts .xlsx (needs openpyxl) or .csv, in the column layout that
tools/scrape-courses.py --template writes.

It normalises what a scrape produces into what the catalogue stores:
durations like "P5D" or "5 days" become an integer, "£4,200" becomes a number,
"Online"/"Blended"/"Onsite" become the site's format ids, and a school column
becomes a school record with a stable id.

It refuses rows it cannot make honest:
  * a row with no Arabic cannot be merged, because the site is bilingual and
    the Arabic pages would silently show English text
  * a price it cannot parse is left out rather than guessed at
  * a subject that is not one of the twelve is reported, not invented

Rows that fail are written to <out>.rejected.csv with the reason, so they can
be fixed and re-run rather than lost.
"""

import argparse
import csv
import json
import os
import re
import sys
import unicodedata
from datetime import date

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SUBJECTS = {"leadership", "finance", "strategy", "digital", "data", "marketing",
            "operations", "people", "sustainability", "negotiation",
            "entrepreneurship", "healthcare"}
LANGS = {"en", "ar", "fr", "es", "de"}

FORMAT_ALIASES = {
    "online": "online", "onlineeventattendancemode": "online", "distance": "online",
    "virtual": "online", "remote": "online", "elearning": "online", "self-paced": "online",
    "blended": "blended", "hybrid": "blended", "mixedeventattendancemode": "blended",
    "in-person": "in-person", "inperson": "in-person", "onsite": "in-person",
    "on-site": "in-person", "offline": "in-person", "campus": "in-person",
    "offlineeventattendancemode": "in-person", "face-to-face": "in-person",
}

LANG_ALIASES = {
    "english": "en", "en": "en", "en-gb": "en", "en-us": "en",
    "arabic": "ar", "ar": "ar", "french": "fr", "fr": "fr",
    "spanish": "es", "es": "es", "german": "de", "de": "de",
}


def slug(value, maxlen=38):
    value = unicodedata.normalize("NFKD", str(value)).encode("ascii", "ignore").decode()
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    return re.sub(r"-+", "-", value)[:maxlen].strip("-")


def parse_days(value):
    if value in (None, ""):
        return None
    s = str(value).strip()
    m = re.match(r"^P(?:(\d+)W)?(?:(\d+)D)?$", s, re.I)      # ISO 8601 duration
    if m and (m.group(1) or m.group(2)):
        return int(m.group(1) or 0) * 5 + int(m.group(2) or 0)
    m = re.search(r"(\d+(?:\.\d+)?)\s*(day|week|month)", s, re.I)
    if m:
        n = float(m.group(1))
        unit = m.group(2).lower()
        return int(round(n * (1 if unit == "day" else 5 if unit == "week" else 20)))
    if re.match(r"^\d+$", s):
        return int(s)
    return None


def parse_price(value):
    if value in (None, ""):
        return None
    s = re.sub(r"[^\d.,]", "", str(value))
    if not s:
        return None
    s = s.replace(",", "") if s.count(",") and s.count(".") else s.replace(",", ".")
    try:
        return int(round(float(s)))
    except ValueError:
        return None


def parse_date(value):
    if value in (None, ""):
        return None
    if isinstance(value, date):
        return value.isoformat()
    s = str(value).strip()[:10]
    if re.match(r"^\d{4}-\d{2}-\d{2}$", s):
        return s
    m = re.match(r"^(\d{1,2})[/.](\d{1,2})[/.](\d{4})$", s)
    if m:                                     # assume day-first
        return "{}-{:02d}-{:02d}".format(m.group(3), int(m.group(2)), int(m.group(1)))
    return None


def parse_list(value):
    if value in (None, ""):
        return []
    return [p.strip() for p in re.split(r"[|;]", str(value)) if p.strip()]


def read_rows(path):
    if path.lower().endswith((".xlsx", ".xlsm")):
        try:
            from openpyxl import load_workbook
        except ImportError:
            sys.exit("reading .xlsx needs openpyxl: pip install openpyxl")
        wb = load_workbook(path, data_only=True)
        ws = wb["Courses"] if "Courses" in wb.sheetnames else wb.worksheets[0]
        rows = list(ws.iter_rows(values_only=True))
        if not rows:
            return []
        header = [str(h).strip() if h is not None else "" for h in rows[0]]
        return [dict(zip(header, r)) for r in rows[1:]
                if any(c not in (None, "") for c in r)]
    with open(path, encoding="utf-8-sig", newline="") as fh:
        return list(csv.DictReader(fh))


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("spreadsheet")
    ap.add_argument("--out", default="import/batch-imported.json")
    ap.add_argument("--schools-out", default=None,
                    help="where to write new school records (default: alongside --out)")
    ap.add_argument("--default-subject", help="subject id for rows that have none")
    args = ap.parse_args()

    rows = read_rows(args.spreadsheet)
    if not rows:
        sys.exit("no rows found in {}".format(args.spreadsheet))

    courses, schools, rejected = [], {}, []
    seen_ids = set()

    for i, r in enumerate(rows, 2):          # 2 = first data row in a spreadsheet
        get = lambda k: ("" if r.get(k) is None else str(r.get(k)).strip())
        problems = []

        title, title_ar = get("title"), get("title_ar")
        if not title:
            problems.append("no title")
        if not title_ar:
            problems.append("no Arabic title")
        if not get("summary"):
            problems.append("no summary")
        if not get("summary_ar"):
            problems.append("no Arabic summary")

        subject = get("subject").lower() or (args.default_subject or "")
        if subject not in SUBJECTS:
            problems.append("subject '{}' is not one of the twelve".format(subject or "(blank)"))

        fmt = FORMAT_ALIASES.get(re.sub(r"[^a-z-]", "", get("format").lower()), "")
        if not fmt:
            problems.append("format '{}' unrecognised".format(get("format") or "(blank)"))

        start = parse_date(r.get("start"))
        if not start:
            problems.append("start date '{}' unparseable".format(get("start") or "(blank)"))

        days = parse_days(r.get("days"))
        if not days:
            problems.append("duration '{}' unparseable".format(get("days") or "(blank)"))

        price = parse_price(r.get("price"))
        if price is None:
            problems.append("price '{}' unparseable".format(get("price") or "(blank)"))
        currency = get("currency").upper()
        if price is not None and currency and currency != "USD":
            problems.append("price is in {} — convert to USD first".format(currency))

        school_name = get("school")
        if not school_name:
            problems.append("no school")

        langs = [LANG_ALIASES.get(l.lower(), "") for l in parse_list(r.get("langs"))]
        langs = [l for l in langs if l in LANGS] or ["en"]

        if problems:
            rejected.append({"row": i, "title": title or get("source_url"),
                             "problems": "; ".join(problems)})
            continue

        sid = "s-" + slug(school_name)
        if sid not in schools:
            schools[sid] = {
                "id": sid,
                "name": {"en": school_name, "ar": get("school_ar") or school_name},
                "city": {"en": get("school_city"), "ar": get("school_city_ar") or get("school_city")},
                "country": {"en": get("school_country"),
                            "ar": get("school_country_ar") or get("school_country")},
                "region": get("region") or "",
                "founded": int(get("founded")) if get("founded").isdigit() else 0,
                "accreditation": parse_list(r.get("accreditation")),
                "about": {"en": get("school_about"), "ar": get("school_about_ar")},
            }

        cid = "c-" + slug(title)
        base, n = cid, 2
        while cid in seen_ids:
            cid = "{}-{}".format(base[:36], n)
            n += 1
        seen_ids.add(cid)

        hl_en = parse_list(r.get("highlights"))[:4]
        hl_ar = parse_list(r.get("highlights_ar"))[:4]
        if len(hl_en) != len(hl_ar):
            rejected.append({"row": i, "title": title,
                             "problems": "highlights: {} English vs {} Arabic".format(
                                 len(hl_en), len(hl_ar))})
            seen_ids.discard(cid)
            continue

        course = {
            "id": cid, "school": sid, "subject": subject, "format": fmt,
            "start": start, "days": days, "price": price, "langs": langs,
            "title": {"en": title, "ar": title_ar},
            "summary": {"en": get("summary"), "ar": get("summary_ar")},
            "highlights": {"en": hl_en, "ar": hl_ar},
            "audience": {"en": get("audience"), "ar": get("audience_ar")},
            "source_url": get("source_url"),
        }
        rating, reviews = get("rating"), get("reviews")
        if rating:
            try:
                course["rating"] = round(float(rating), 1)
            except ValueError:
                pass
        if reviews.isdigit():
            course["reviews"] = int(reviews)
        courses.append(course)

    os.makedirs(os.path.dirname(os.path.abspath(args.out)) or ".", exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump(courses, fh, ensure_ascii=False, indent=1)

    schools_out = args.schools_out or os.path.join(
        os.path.dirname(os.path.abspath(args.out)), "schools.json")
    if schools:
        with open(schools_out, "w", encoding="utf-8") as fh:
            json.dump(list(schools.values()), fh, ensure_ascii=False, indent=1)

    print("{} course(s) -> {}".format(len(courses), args.out))
    if schools:
        print("{} school(s) -> {}".format(len(schools), schools_out))

    if rejected:
        rej_path = args.out + ".rejected.csv"
        with open(rej_path, "w", encoding="utf-8-sig", newline="") as fh:
            w = csv.DictWriter(fh, fieldnames=["row", "title", "problems"])
            w.writeheader()
            w.writerows(rejected)
        print("\n{} row(s) rejected -> {}".format(len(rejected), rej_path))
        for r in rejected[:12]:
            print("  row {}: {} — {}".format(r["row"], r["title"][:44], r["problems"]))
        if len(rejected) > 12:
            print("  ... and {} more".format(len(rejected) - 12))
        print("\nMost rejections on scraped data are the Arabic columns: a scrape cannot "
              "produce them, and the catalogue is bilingual.")

    print("\nNext: python3 tools/merge-catalogue.py {} --write".format(
        os.path.dirname(os.path.abspath(args.out))))
    print("Note: merge-catalogue.py also requires rating, reviews and popularity, and "
          "checks price-per-day plausibility. Fill anything it reports as missing.")


if __name__ == "__main__":
    main()
