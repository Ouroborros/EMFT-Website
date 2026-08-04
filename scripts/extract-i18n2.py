#!/usr/bin/env python3
"""Second extraction pass: strings that sit beside inline markup.

The first pass only tagged elements whose content was pure text. That left the
call-to-action labels sitting next to an arrow span, the case-study meta lines,
the result figures and the whole track-record list untranslated.

This pass wraps each bare text run inside such an element in its own span so the
translator has something to replace, and appends the new keys to the page's
dictionary with an empty Arabic side.

    python3 scripts/extract-i18n2.py index contact
"""

import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PREFIX = {
    "index": "ix", "about": "ab", "contact": "co", "case-studies": "cs",
    "assessments": "as", "coaching": "cg", "speakers": "sp",
    "elearning": "el", "privacy": "pv", "terms": "tm",
}

# Elements to look inside. Anything already carrying data-i18n is left alone.
CONTAINERS = re.compile(
    r'<(a|p|li|label|div|span|h2|h3)((?:\s[^>]*)?)>(.*?)</\1>', re.S
)

KEEP_LATIN = re.compile(
    r"^(EMFT|CFA|CISI|Power BI|ISO 27001|eCPPT|CCD|LinkedIn|AML/CFT|ESG|GenAI|"
    r"IISI|ICWIM|UAE FRR|Security\+|CompTIA Security\+)$"
)


def next_key(page, state):
    state[0] += 1
    return "%s%d" % (PREFIX[page], state[0])


def highest_existing(page):
    src = (ROOT / "js" / ("i18n-%s.js" % page)).read_text(encoding="utf-8")
    nums = [int(m) for m in re.findall(r"\n      %s(\d+):" % PREFIX[page], src)]
    return max(nums) if nums else 0


def wrap_text_runs(inner, page, state, entries):
    """Wrap each bare text run that sits between tags in its own span.

    The container regex cannot see nesting: a bare <span> wrapper matches up to
    its *child's* </span>, so the run we are looking at may really be the child's
    own already-tagged content. Skipping any run that directly follows an
    opening tag carrying data-i18n keeps us from wrapping it twice.
    """
    parts = re.split(r"(<[^>]+>)", inner)
    out, changed = [], False
    tagged = False
    for part in parts:
        if part.startswith("<"):
            if not part.startswith("</"):
                tagged = "data-i18n=" in part
            else:
                tagged = False
            out.append(part)
            continue
        if tagged:
            out.append(part)
            continue
        stripped = html.unescape(part).strip()
        if len(stripped) < 3 or not re.search(r"[A-Za-z]{3,}", stripped):
            out.append(part)
            continue
        if KEEP_LATIN.match(stripped) or "@" in stripped:
            out.append(part)
            continue
        lead = part[: len(part) - len(part.lstrip())]
        trail = part[len(part.rstrip()):]
        key = next_key(page, state)
        entries.append((key, stripped))
        out.append('%s<span data-i18n="%s">%s</span>%s'
                   % (lead, key, part.strip(), trail))
        changed = True
    return "".join(out), changed


def process(page):
    path = ROOT / (page + ".html")
    text = path.read_text(encoding="utf-8")
    start, end = text.index("<main"), text.index("</main>")
    head, body, tail = text[:start], text[start:end], text[end:]

    state = [highest_existing(page)]
    entries = []

    def sub(m):
        tag, attrs, inner = m.group(1), m.group(2) or "", m.group(3)
        if "data-i18n" in attrs:
            return m.group(0)
        if "<" not in inner:                 # pure text — first pass handled it
            return m.group(0)
        if re.search(r"<(a|p|li|label|div|h2|h3)\b", inner):
            # Recurse rather than bail out. A plain `return` would consume the
            # whole outer element and the scanner would resume past it, so the
            # nested elements inside a wrapper like .cta-actions were never
            # visited at all.
            return "<%s%s>%s</%s>" % (tag, attrs, CONTAINERS.sub(sub, inner), tag)
        new_inner, changed = wrap_text_runs(inner, page, state, entries)
        if not changed:
            return m.group(0)
        return "<%s%s>%s</%s>" % (tag, attrs, new_inner, tag)

    body = CONTAINERS.sub(sub, body)

    if not entries:
        print("%-14s nothing to add" % page)
        return
    path.write_text(head + body + tail, encoding="utf-8")

    f = ROOT / "js" / ("i18n-%s.js" % page)
    src = f.read_text(encoding="utf-8")
    en = "\n".join("      %s: '%s'," % (k, esc(v)) for k, v in entries)
    ar = "\n".join("      %s: ''," % k for k, _ in entries)
    src = re.sub(r"(\n    \},\n    ar: \{)", "\n" + en + r"\1", src, count=1)
    src = re.sub(r"(\n    \}\n  \}\);)", "\n" + ar + r"\1", src, count=1)
    f.write_text(src, encoding="utf-8")
    print("%-14s +%d strings" % (page, len(entries)))


def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ")


for page in (sys.argv[1:] or list(PREFIX)):
    process(page)
