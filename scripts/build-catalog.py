#!/usr/bin/env python3
"""Regenerate the static program rows in programs.html from js/programs-data.js.

The catalog ships pre-rendered in the HTML so it works without JavaScript and
so search engines see every program name. js/programs-data.js is the single
source of truth; run this after editing it:

    python3 scripts/build-catalog.py

It also rewrites the data file itself, which normalises row commas — hand
edits that delete the last entry otherwise leave a trailing comma and the
JSON stops parsing. Group titles here must match the `groups` maps in
js/programs.js, which render the same list client-side.
"""
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'js', 'programs-data.js')
PAGE = os.path.join(ROOT, 'programs.html')

GROUPS = [
    ('leadership',     'Leadership & Management'),
    ('skills',         'Professional Skills'),
    ('frontline',      'Retail & Frontline Banking'),
    ('credit',         'Credit & Corporate Banking'),
    ('finance',        'Finance, Accounting & Reporting'),
    ('risk',           'Risk, Regulation & Compliance'),
    ('investment',     'Investment & Markets'),
    ('tech',           'Data, AI & Technology'),
    ('digital',        'Digital Banking & FinTech'),
    ('qualifications', 'Qualifications & Exam Training'),
    ('talent',         'Talent & Graduates'),
]

HEADER = """/* EMFT program catalog. Body must stay valid JSON — parsed by
   scripts/build-catalog.py and read by the browser. g: group, d: domain
   (fin|tech|skills), a: audiences (banks|cb|swf|grad|exec). */
window.EMFT_PROGRAMS =
"""


def load():
    src = open(DATA, encoding='utf-8').read()
    return json.loads(src[src.index('['):src.rindex(']') + 1])


def write_data(programs):
    rows = ',\n'.join(
        '  ' + json.dumps(p, ensure_ascii=False, separators=(', ', ': '))
        for p in programs)
    with open(DATA, 'w', encoding='utf-8') as fh:
        fh.write(HEADER + '[\n' + rows + '\n]\n;\n')


def write_rows(programs):
    e = lambda t: html.escape(t, quote=False)
    out = []
    for key, title in GROUPS:
        items = [p for p in programs if p['g'] == key]
        if not items:
            continue
        out.append('        <section class="catalog-group" id="%s">' % key)
        out.append('          <h2 class="catalog-group-title">%s'
                   '<span class="catalog-group-count">%d</span></h2>'
                   % (e(title), len(items)))
        for p in items:
            en = p['en']
            out.append('          <a class="program-row" href="index.html#contact">')
            out.append('            <span class="tag">%s</span>' % e(en['tag']))
            out.append('            <span class="name">%s</span>' % e(en['name']))
            out.append('            <span class="outcome">%s</span>' % e(en['outcome']))
            out.append('          </a>')
        out.append('        </section>')

    page = open(PAGE, encoding='utf-8').read()
    page, n = re.subn(
        r'(<div class="container catalog" id="catalog">\n).*?(\n      </div>)',
        lambda m: m.group(1) + '\n'.join(out) + m.group(2),
        page, count=1, flags=re.S)
    if n != 1:
        raise SystemExit('could not find the catalog container in programs.html')

    total = len(programs)
    groups = sum(1 for k, _ in GROUPS if any(p['g'] == k for p in programs))
    page = re.sub(r'role="status">\d+ programs<',
                  'role="status">%d programs<' % total, page)
    page = re.sub(r'\d+ programs across \d+ groups',
                  '%d programs across %d groups' % (total, groups), page)
    open(PAGE, 'w', encoding='utf-8').write(page)
    return total, groups


if __name__ == '__main__':
    programs = load()
    write_data(programs)
    total, groups = write_rows(programs)
    print('%d programs across %d groups' % (total, groups))
