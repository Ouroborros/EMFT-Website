#!/usr/bin/env python3
"""Merge JSON catalogue batches into assets/js/data.js.

The catalogue is authored as JavaScript rather than JSON so the site keeps
working from file:// (fetch() is blocked there). That makes bulk additions
awkward to do by hand, so batches are written as JSON and folded in here.

    python3 tools/merge-catalogue.py <dir>        # check and report
    python3 tools/merge-catalogue.py <dir> --write

<dir> holds schools.json (optional) and any number of batch-*.json files.

Nothing is written unless every record passes validation: a half-merged
catalogue is worse than none. Re-running is safe — records whose id is already
in data.js are skipped, so an interrupted merge can simply be repeated.
"""

import glob
import json
import os
import re
import sys
from datetime import date

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(HERE, "assets", "js", "data.js")

FORMATS = {"in-person", "online", "blended"}
LANGS = {"en", "ar", "fr", "es", "de"}
REGIONS = {"mena", "europe", "americas", "asia", "africa", "oceania"}
SUBJECTS = {"leadership", "finance", "strategy", "digital", "data", "marketing",
            "operations", "people", "sustainability", "negotiation",
            "entrepreneurship", "healthcare"}
WINDOW = (date(2026, 9, 1), date(2027, 8, 31))

COURSE_FIELDS = ["id", "school", "subject", "format", "start", "days", "price",
                 "langs", "title", "summary", "highlights", "audience"]
# Editorial metrics. Optional: a real imported listing has no rating and gets
# none — the site renders those cards without a review line rather than
# inventing one. popularity defaults to 50 (middle of the sort) when absent.
OPTIONAL_FIELDS = ["rating", "reviews", "popularity"]
SCHOOL_FIELDS = ["id", "name", "city", "country", "region", "founded",
                 "accreditation", "about"]


# --- JS emission ----------------------------------------------------------

def q(s):
    """Quote a string for JS, preferring single quotes like the rest of data.js."""
    if "'" in s and '"' not in s:
        return '"' + s.replace("\\", "\\\\") + '"'
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


def pair(obj, indent):
    pad = " " * indent
    return "{{ en: {}, ar: {} }}".format(q(obj["en"]), q(obj["ar"])) if \
        len(obj["en"]) + len(obj["ar"]) < 90 else \
        "{{\n{p}  en: {},\n{p}  ar: {}\n{p}}}".format(q(obj["en"]), q(obj["ar"]), p=pad)


def arr_pair(obj, indent):
    pad = " " * indent
    en = ", ".join(q(x) for x in obj["en"])
    ar = ", ".join(q(x) for x in obj["ar"])
    return "{{\n{p}  en: [{}],\n{p}  ar: [{}]\n{p}}}".format(en, ar, p=pad)


def course_js(c):
    metrics = []
    if "rating" in c:
        metrics.append("rating: {}".format(c["rating"]))
        metrics.append("reviews: {}".format(c["reviews"]))
    metrics.append("popularity: {}".format(c.get("popularity", 50)))
    if c.get("source_url"):
        metrics.append("sourceUrl: {}".format(q(c["source_url"])))
    return (
        "    {{\n"
        "      id: {id}, school: {school}, subject: {subject}, format: {format},\n"
        "      start: {start}, days: {days}, price: {price}, langs: [{langs}], "
        "{metrics},\n"
        "      title: {title},\n"
        "      summary: {summary},\n"
        "      highlights: {highlights},\n"
        "      audience: {audience}\n"
        "    }}"
    ).format(
        id=q(c["id"]), school=q(c["school"]), subject=q(c["subject"]), format=q(c["format"]),
        start=q(c["start"]), days=c["days"], price=c["price"],
        langs=", ".join(q(l) for l in c["langs"]),
        metrics=", ".join(metrics),
        title=pair(c["title"], 6), summary=pair(c["summary"], 6),
        highlights=arr_pair(c["highlights"], 6), audience=pair(c["audience"], 6),
    )


def school_js(s):
    return (
        "    {{\n"
        "      id: {id},\n"
        "      name: {name},\n"
        "      city: {city},\n"
        "      country: {country},\n"
        "      region: {region}, founded: {founded}, accreditation: [{acc}],\n"
        "      about: {about}\n"
        "    }}"
    ).format(
        id=q(s["id"]), name=pair(s["name"], 6), city=pair(s["city"], 6),
        country=pair(s["country"], 6), region=q(s["region"]), founded=s["founded"],
        acc=", ".join(q(a) for a in s["accreditation"]),
        about=pair(s["about"], 6),
    )


# --- validation -----------------------------------------------------------

def is_pair(v):
    return isinstance(v, dict) and isinstance(v.get("en"), str) and isinstance(v.get("ar"), str) \
        and v["en"].strip() and v["ar"].strip()


def check_school(s, known_ids, errs, where):
    for f in SCHOOL_FIELDS:
        if f not in s:
            errs.append("{}: school missing field '{}'".format(where, f))
            return
    sid = s["id"]
    if not re.match(r"^s-[a-z0-9-]{2,40}$", sid):
        errs.append("{}: bad school id '{}'".format(where, sid))
    if sid in known_ids:
        errs.append("{}: duplicate school id '{}'".format(where, sid))
    for f in ("name", "city", "country", "about"):
        if not is_pair(s[f]):
            errs.append("{} [{}]: '{}' is not a filled en/ar pair".format(where, sid, f))
    if s["region"] not in REGIONS:
        errs.append("{} [{}]: unknown region '{}'".format(where, sid, s["region"]))
    if not isinstance(s["founded"], int) or not 1900 <= s["founded"] <= 2020:
        errs.append("{} [{}]: implausible founded year {}".format(where, sid, s["founded"]))
    if not isinstance(s["accreditation"], list):
        errs.append("{} [{}]: accreditation must be a list".format(where, sid))


def check_course(c, known_course_ids, school_ids, errs, where):
    for f in COURSE_FIELDS:
        if f not in c:
            errs.append("{}: course missing field '{}'".format(where, f))
            return
    cid = c["id"]
    if not re.match(r"^c-[a-z0-9-]{2,40}$", cid):
        errs.append("{}: bad course id '{}'".format(where, cid))
    if cid in known_course_ids:
        errs.append("{}: duplicate course id '{}'".format(where, cid))
    if c["school"] not in school_ids:
        errs.append("{} [{}]: unknown school '{}'".format(where, cid, c["school"]))
    if c["subject"] not in SUBJECTS:
        errs.append("{} [{}]: unknown subject '{}'".format(where, cid, c["subject"]))
    if c["format"] not in FORMATS:
        errs.append("{} [{}]: unknown format '{}'".format(where, cid, c["format"]))
    try:
        d = date(*[int(x) for x in c["start"].split("-")])
        if not WINDOW[0] <= d <= WINDOW[1]:
            errs.append("{} [{}]: start {} outside the window".format(where, cid, c["start"]))
    except Exception:
        errs.append("{} [{}]: unparseable start '{}'".format(where, cid, c["start"]))
    if not isinstance(c["langs"], list) or not c["langs"] or set(c["langs"]) - LANGS:
        errs.append("{} [{}]: bad langs {}".format(where, cid, c["langs"]))
    if not isinstance(c["days"], int) or not 2 <= c["days"] <= 20:
        errs.append("{} [{}]: days out of range ({})".format(where, cid, c["days"]))
    if not isinstance(c["price"], int) or not 300 <= c["price"] <= 60000:
        errs.append("{} [{}]: price out of range ({})".format(where, cid, c["price"]))
    else:
        # Board-level short programmes really do cost this much: the existing
        # catalogue runs 2,042/day (c-agp) and 2,360/day (c-board-fin), so the
        # ceiling has to sit above them or the validator rejects its own data.
        per_day = c["price"] / max(c["days"], 1)
        if not 120 <= per_day <= 2500:
            errs.append("{} [{}]: {:.0f}/day is implausible ({} over {} days)".format(
                where, cid, per_day, c["price"], c["days"]))
    if "rating" in c and (not isinstance(c["rating"], (int, float)) or not 3.5 <= c["rating"] <= 5.0):
        errs.append("{} [{}]: rating {}".format(where, cid, c["rating"]))
    if "reviews" in c and (not isinstance(c["reviews"], int) or not 5 <= c["reviews"] <= 900):
        errs.append("{} [{}]: reviews {}".format(where, cid, c["reviews"]))
    if ("rating" in c) != ("reviews" in c):
        errs.append("{} [{}]: rating and reviews must come together or not at all".format(where, cid))
    if "popularity" in c and (not isinstance(c["popularity"], int) or not 1 <= c["popularity"] <= 100):
        errs.append("{} [{}]: popularity {}".format(where, cid, c["popularity"]))
    for f in ("title", "summary", "audience"):
        if not is_pair(c[f]):
            errs.append("{} [{}]: '{}' is not a filled en/ar pair".format(where, cid, f))
    h = c["highlights"]
    if not isinstance(h, dict) or not isinstance(h.get("en"), list) or not isinstance(h.get("ar"), list):
        errs.append("{} [{}]: highlights must hold en and ar arrays".format(where, cid))
    elif len(h["en"]) != len(h["ar"]) or not h["en"]:
        errs.append("{} [{}]: highlights en/ar length mismatch ({} vs {})".format(
            where, cid, len(h["en"]), len(h["ar"])))
    elif any(not str(x).strip() for x in h["en"] + h["ar"]):
        errs.append("{} [{}]: empty highlight".format(where, cid))


# --- data.js surgery ------------------------------------------------------

def array_span(src, name):
    """Byte range of the contents of `const <name> = [ ... ];` in data.js."""
    m = re.search(r"const {} = \[".format(name), src)
    if not m:
        sys.exit("Could not find `const {} = [` in data.js".format(name))
    start = m.end() - 1
    depth = 0
    for i in range(start, len(src)):
        if src[i] == "[":
            depth += 1
        elif src[i] == "]":
            depth -= 1
            if depth == 0:
                return start + 1, i
    sys.exit("Unbalanced brackets in the {} array".format(name))


def existing_ids(src, name):
    lo, hi = array_span(src, name)
    return set(re.findall(r"\bid: '([^']+)'", src[lo:hi]))


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    batch_dir = sys.argv[1]
    write = "--write" in sys.argv

    with open(DATA, encoding="utf-8") as fh:
        src = fh.read()

    have_schools = existing_ids(src, "schools")
    have_courses = existing_ids(src, "courses")
    errs, new_schools, new_courses, skipped = [], [], [], []

    schools_path = os.path.join(batch_dir, "schools.json")
    if os.path.exists(schools_path):
        with open(schools_path, encoding="utf-8") as fh:
            try:
                records = json.load(fh)
            except json.JSONDecodeError as e:
                sys.exit("schools.json is not valid JSON: {}".format(e))
        seen = set(have_schools)
        for s in records:
            if isinstance(s, dict) and s.get("id") in have_schools:
                skipped.append(s["id"])
                continue
            check_school(s, seen, errs, "schools.json")
            if isinstance(s, dict) and "id" in s:
                seen.add(s["id"])
                new_schools.append(s)

    school_ids = set(have_schools) | {s["id"] for s in new_schools}
    seen_courses = set(have_courses)

    for path in sorted(glob.glob(os.path.join(batch_dir, "batch-*.json"))):
        name = os.path.basename(path)
        with open(path, encoding="utf-8") as fh:
            try:
                records = json.load(fh)
            except json.JSONDecodeError as e:
                errs.append("{}: not valid JSON: {}".format(name, e))
                continue
        if not isinstance(records, list):
            errs.append("{}: expected a JSON array".format(name))
            continue
        for c in records:
            if isinstance(c, dict) and c.get("id") in have_courses:
                skipped.append(c["id"])
                continue
            check_course(c, seen_courses, school_ids, errs, name)
            if isinstance(c, dict) and "id" in c:
                seen_courses.add(c["id"])
                new_courses.append(c)

    # Near-duplicate titles, against each other and the existing catalogue.
    def norm(t):
        return re.sub(r"[^a-z0-9 ]", "", t.lower()).strip()

    titles = {norm(t): "data.js" for t in re.findall(r"title: \{ en: '([^']+)'", src)}
    for c in new_courses:
        if not is_pair(c.get("title", {})):
            continue
        k = norm(c["title"]["en"])
        if k in titles:
            errs.append("duplicate title '{}' ({} and {})".format(c["title"]["en"], titles[k], c["id"]))
        titles[k] = c["id"]

    print("schools: {} new, courses: {} new{}".format(
        len(new_schools), len(new_courses),
        ", {} already in data.js (skipped)".format(len(skipped)) if skipped else ""))

    if errs:
        print("\n{} problem(s) — nothing written:".format(len(errs)))
        for e in errs[:60]:
            print("  " + e)
        if len(errs) > 60:
            print("  ... and {} more".format(len(errs) - 60))
        sys.exit(1)

    print("validation clean")
    if not write:
        print("(dry run — pass --write to apply)")
        return

    if new_schools:
        lo, hi = array_span(src, "schools")
        block = ",\n" + ",\n".join(school_js(s) for s in new_schools) + "\n  "
        src = src[:hi].rstrip() + block + src[hi:]

    if new_courses:
        lo, hi = array_span(src, "courses")
        block = ",\n" + ",\n".join(course_js(c) for c in new_courses) + "\n  "
        src = src[:hi].rstrip() + block + src[hi:]

    with open(DATA, "w", encoding="utf-8") as fh:
        fh.write(src)
    print("wrote {}".format(os.path.relpath(DATA, HERE)))


if __name__ == "__main__":
    main()
