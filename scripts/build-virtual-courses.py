#!/usr/bin/env python3
"""Render the session rows in virtual-courses.html from js/virtual-courses-data.js.

The schedule ships pre-rendered in the HTML so the dates are readable without
JavaScript and search engines can index them. js/virtual-courses-data.js is the
single source of truth; run this after editing it, then run build-chrome.py:

    python3 scripts/build-virtual-courses.py
    python3 scripts/build-chrome.py

Rows are written in English. js/virtual-courses.js rebuilds the same rows in
whichever language the reader has chosen, so the Arabic text in the data file is
what an Arabic reader sees.

It also rewrites the data file, which normalises the row commas: a hand edit
that removes the last entry otherwise leaves a trailing comma and the JSON
stops parsing.
"""
import datetime
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'js', 'virtual-courses-data.js')
PAGE = os.path.join(ROOT, 'virtual-courses.html')

START = '<!-- SESSIONS:START -->'
END = '<!-- SESSIONS:END -->'

# These have to read the same as vc19-vc29 in js/i18n-virtual-courses.js, which
# is what replaces them once JavaScript runs.
LABEL = {
    'dates': 'Dates',
    'daily': 'Daily',
    'fee': 'Fee',
    'fee_on_request': 'Fee on request',
    'pay': 'Register and pay',
    'request': 'Request a place',
    'per': 'per participant',
}
SEATS = {
    'open': 'Places open',
    'filling': 'Filling up',
    'waitlist': 'Waitlist only',
    'full': 'Fully booked',
}
ENQUIRY = 'contact.html?interest=Virtual%20Courses'
SYMBOL = {'USD': '$', 'GBP': '£', 'EUR': '€', 'AED': 'AED ', 'SAR': 'SAR '}


def read_rows():
    """Pull the JSON list out of the data file."""
    text = open(DATA, encoding='utf-8').read()
    match = re.search(r'window\.EMFT_VIRTUAL_COURSES\s*=\s*(\[.*?\])\s*;', text, re.S)
    if not match:
        raise SystemExit('could not find the course list in %s' % DATA)
    try:
        return text, json.loads(match.group(1))
    except json.JSONDecodeError as err:
        raise SystemExit('%s is not valid JSON: %s' % (DATA, err))


def day(value):
    try:
        return datetime.date.fromisoformat(str(value))
    except (TypeError, ValueError):
        return None


def date_range(start_value, end_value):
    """9 November 2026 / 9-12 November 2026 / 30 November - 3 December 2026."""
    start = day(start_value)
    end = day(end_value) or start
    if not start:
        return ''
    if end < start:
        end = start
    full = '%-d %B %Y'
    if start == end:
        return start.strftime(full)
    if start.year != end.year:
        return '%s – %s' % (start.strftime(full), end.strftime(full))
    if start.month != end.month:
        return '%s – %s' % (start.strftime('%-d %B'), end.strftime(full))
    return '%s–%s' % (start.strftime('%-d'), end.strftime(full))


def money(fee):
    if not isinstance(fee, dict) or not isinstance(fee.get('amount'), (int, float)):
        return None
    currency = fee.get('currency') or 'USD'
    return '%s%s' % (SYMBOL.get(currency, currency + ' '), format(int(fee['amount']), ','))


def fact(label, value, extra=''):
    """dir="auto" on the value: an Arabic date keeps its direction and a Latin
    time window keeps its own, so a time range cannot reorder into nonsense
    inside an Arabic page. js/virtual-courses.js builds the same shape."""
    return (
        '            <div class="session-fact"><dt>%s</dt>'
        '<dd><span dir="auto">%s</span>%s</dd></div>\n'
        % (html.escape(label), html.escape(value), extra)
    )


def row(course):
    copy = course.get('en') or {}
    seats = course.get('seats') if course.get('seats') in SEATS else 'open'
    closed = seats in ('full', 'waitlist')
    pay = course.get('pay')

    out = ['          <article class="session"%s>\n'
           % (' id="%s"' % html.escape(str(course['id'])) if course.get('id') else '')]

    out.append('            <div class="session-main">\n')
    if copy.get('tag'):
        out.append('              <span class="session-tag">%s</span>\n' % html.escape(copy['tag']))
    out.append('              <h3 class="session-name">%s</h3>\n' % html.escape(copy.get('name', '')))
    if copy.get('summary'):
        out.append('              <p class="session-summary">%s</p>\n' % html.escape(copy['summary']))
    out.append('            </div>\n')

    out.append('            <dl class="session-facts">\n')
    out.append(fact(LABEL['dates'], date_range(course.get('start'), course.get('end'))))
    if course.get('time'):
        out.append(fact(LABEL['daily'], str(course['time'])))
    price = money(course.get('fee'))
    if price:
        out.append(fact(LABEL['fee'], price,
                        '<span class="session-per">%s</span>' % html.escape(LABEL['per'])))
    else:
        out.append(fact(LABEL['fee'], LABEL['fee_on_request']))
    out.append('            </dl>\n')

    out.append('            <div class="session-act">\n')
    out.append('              <span class="session-seats seats-%s">%s</span>\n'
               % (seats, html.escape(SEATS[seats])))
    if pay and not closed:
        out.append('              <a class="btn-solid" href="%s" target="_blank" rel="noopener">%s</a>\n'
                   % (html.escape(str(pay), quote=True), html.escape(LABEL['pay'])))
    else:
        out.append('              <a class="btn-outline" href="%s">%s</a>\n'
                   % (ENQUIRY, html.escape(LABEL['request'])))
    out.append('            </div>\n')
    out.append('          </article>\n')
    return ''.join(out)


def block(courses):
    usable = [c for c in courses if c.get('start') and (c.get('en') or c.get('ar'))]
    usable.sort(key=lambda c: str(c.get('start')))
    has = bool(usable)

    out = [START, '\n']
    out.append('        <div class="session-list" id="session-list" aria-label="Session schedule" data-i18n-aria="vc39"%s>\n'
               % ('' if has else ' hidden'))
    for course in usable:
        out.append(row(course))
    out.append('        </div>\n')
    out.append('        <div class="no-sessions" id="no-sessions"%s>\n' % (' hidden' if has else ''))
    out.append('          <h3 data-i18n="vc16">No open sessions are scheduled right now.</h3>\n')
    out.append('          <p data-i18n="vc17">New dates are published here as soon as they are confirmed. '
               'Tell us which course you need and we will let you know when it next runs, or schedule it '
               'privately for your team on dates that suit you.</p>\n')
    out.append('          <a class="btn-solid" href="%s" data-i18n="vc18">Ask about dates</a>\n' % ENQUIRY)
    out.append('        </div>\n')
    out.append(END)
    return ''.join(out)


def main():
    text, courses = read_rows()

    dropped = [c for c in courses if not (c.get('start') and (c.get('en') or c.get('ar')))]
    for course in dropped:
        print('skip (needs start and at least one language): %r' % course.get('id', course))

    page = open(PAGE, encoding='utf-8').read()
    if START not in page or END not in page:
        raise SystemExit('%s has no SESSIONS markers' % PAGE)
    page = re.sub(re.escape(START) + '.*?' + re.escape(END), lambda _: block(courses), page, flags=re.S)
    open(PAGE, 'w', encoding='utf-8').write(page)

    # Normalise the data file so hand edits cannot leave the JSON broken.
    body = json.dumps(courses, ensure_ascii=False, indent=2)
    header = text[:text.index('window.EMFT_VIRTUAL_COURSES')]
    open(DATA, 'w', encoding='utf-8').write(
        '%swindow.EMFT_VIRTUAL_COURSES =\n%s\n;\n' % (header, body))

    print('virtual-courses.html: %d session%s' % (len(courses) - len(dropped),
                                                  '' if len(courses) - len(dropped) == 1 else 's'))


if __name__ == '__main__':
    sys.exit(main())
