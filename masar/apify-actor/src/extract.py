"""Course extraction from a parsed page.

Self-contained port of the extraction logic in ../tools/scrape-courses.py,
adapted to BeautifulSoup (the actor already holds a parsed document, so there
is no reason to re-parse with regexes). Keep the two in sync if the row shape
changes — the column contract is what ties the actor's dataset to the rest of
the pipeline (spreadsheet-to-batch.py → merge-catalogue.py).
"""

import json
import re

# The pipeline's column contract. Dataset items use exactly these keys, so an
# Apify dataset export (CSV/XLSX) feeds spreadsheet-to-batch.py unchanged.
COLUMNS = [
    "source_url", "school", "school_city", "school_country",
    "title", "title_ar", "summary", "summary_ar",
    "subject", "format", "start", "days", "price", "currency", "langs",
    "audience", "audience_ar", "highlights", "highlights_ar",
    "rating", "reviews", "scraped_at",
]

COURSE_TYPES = {"course", "courseinstance", "event", "educationevent", "product"}


def _text(value):
    if value is None:
        return ""
    if isinstance(value, list):
        return " | ".join(_text(v) for v in value if v)
    if isinstance(value, dict):
        return _text(value.get("name") or value.get("@value") or "")
    return re.sub(r"\s+", " ", str(value)).strip()


def _first(node, *keys):
    for key in keys:
        if isinstance(node, dict) and node.get(key):
            return node[key]
    return None


def _one(value):
    """JSON-LD freely wraps single values in lists; unwrap to the first."""
    if isinstance(value, list):
        return value[0] if value else {}
    return value or {}


def json_ld_nodes(soup):
    nodes = []
    for tag in soup.find_all("script", type="application/ld+json"):
        raw = (tag.string or tag.get_text() or "").strip()
        if not raw:
            continue
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            try:  # several objects back to back
                data = json.loads("[" + re.sub(r"}\s*{", "},{", raw) + "]")
            except json.JSONDecodeError:
                continue
        nodes.extend(data if isinstance(data, list) else [data])
    flat = []
    for node in nodes:
        if isinstance(node, dict) and "@graph" in node:
            flat.extend(n for n in node["@graph"] if isinstance(n, dict))
        elif isinstance(node, dict):
            flat.append(node)
    return flat


def _is_course(node):
    node_type = node.get("@type", "")
    if isinstance(node_type, list):
        return any(str(t).lower() in COURSE_TYPES for t in node_type)
    return str(node_type).lower() in COURSE_TYPES


def course_from_json_ld(soup, url):
    """A course row from schema.org data, or None if the page has none."""
    node = next((n for n in json_ld_nodes(soup) if _is_course(n)), None)
    if not node:
        return None

    row = {c: "" for c in COLUMNS}
    row["source_url"] = url
    row["title"] = _text(_first(node, "name", "headline"))
    row["summary"] = _text(_first(node, "description", "abstract"))

    provider = _one(_first(node, "provider", "organizer", "brand", "publisher"))
    if isinstance(provider, dict):
        row["school"] = _text(provider.get("name"))
        addr = provider.get("address") or {}
        if isinstance(addr, dict):
            row["school_city"] = _text(addr.get("addressLocality"))
            row["school_country"] = _text(addr.get("addressCountry"))

    offers = _one(_first(node, "offers"))
    if isinstance(offers, dict):
        row["price"] = _text(_first(offers, "price", "lowPrice"))
        row["currency"] = _text(offers.get("priceCurrency"))

    instance = _one(_first(node, "hasCourseInstance"))
    source = instance if isinstance(instance, dict) and instance else node

    def pick(*keys):
        # Sites split these fields between the Course node and its
        # CourseInstance inconsistently; check the instance first, then
        # fall back to the node.
        return _text(_first(source, *keys) or _first(node, *keys))

    start = pick("startDate", "courseSchedule")
    row["start"] = start[:10] if re.match(r"^\d{4}-\d{2}-\d{2}", start) else start
    row["format"] = pick("courseMode", "eventAttendanceMode")
    row["langs"] = pick("inLanguage", "availableLanguage")
    row["days"] = pick("timeRequired", "duration")

    rating = _first(node, "aggregateRating") or {}
    if isinstance(rating, dict):
        row["rating"] = _text(rating.get("ratingValue"))
        row["reviews"] = _text(_first(rating, "reviewCount", "ratingCount"))

    location = _one(_first(source, "location"))
    if isinstance(location, dict) and not row["school_city"]:
        addr = location.get("address") or {}
        if isinstance(addr, dict):
            row["school_city"] = _text(addr.get("addressLocality"))
            row["school_country"] = _text(addr.get("addressCountry"))

    return row if row["title"] else None


def course_from_meta(soup, url):
    """Metadata fallback: a partial row from OpenGraph/meta tags, or None.

    Deliberately thin — a page whose only signal is og:title is probably not
    a course page, so callers should treat this as a low-confidence result
    and let a reviewer (or the dataset consumer) filter it.
    """
    def meta(*names):
        for name in names:
            tag = soup.find("meta", attrs={"property": name}) or \
                soup.find("meta", attrs={"name": name})
            if tag and tag.get("content"):
                return tag["content"].strip()
        return ""

    title = meta("og:title", "twitter:title") or \
        (soup.title.get_text().strip() if soup.title else "")
    if not title:
        return None
    row = {c: "" for c in COLUMNS}
    row["source_url"] = url
    row["title"] = title
    row["summary"] = meta("og:description", "description")
    row["school"] = meta("og:site_name")
    return row
