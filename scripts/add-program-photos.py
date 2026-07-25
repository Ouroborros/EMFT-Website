#!/usr/bin/env python3
"""Wire photographs into the homepage's Trending Programs cards.

The cards are typographic by default. Drop correctly named photos into
assets/img/ and run this to crop them to the card ratio, check they are
bright enough to read against the sand panel, and restore the image layer
in index.html and css/home.css:

    python3 scripts/add-program-photos.py            # wire whatever is present
    python3 scripts/add-program-photos.py --check    # report only, change nothing
    python3 scripts/add-program-photos.py --remove   # back to typographic cards

Expected files, one per card (jpg or png, any size, landscape preferred):

    program-agentic-ai.jpg        Agentic AI for Professionals
    program-modelling.jpg         Financial Modelling in Excel, VBA & Power BI
    program-cyber.jpg             Cybersecurity — Defensive & Offensive
    program-relationship.jpg      Relationship Management Excellence
    program-cx.jpg                Customer Experience & Journey Design
    program-data-science.jpg      Data Science, Machine Learning & Analytics

Photos are cropped centre-weighted to 3:2 at 1200x800 and saved back over
themselves as optimised JPEG. Anything missing simply keeps its typographic
card, so a partial set is fine.
"""
import argparse
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, 'assets', 'img')
PAGE = os.path.join(ROOT, 'index.html')
CSS = os.path.join(ROOT, 'css', 'home.css')

CARD_W, CARD_H = 960, 640      # 2.3x the card's rendered width; no upscaling
MIN_MEAN = 60      # near-black deck backdrops read as broken; reject them
MAX_MEAN = 235     # blown-out shots lose the title's contrast

# card title -> base filename, in the order the cards appear
CARDS = [
    ('Agentic AI for Professionals',                 'program-agentic-ai'),
    ('Financial Modelling in Excel, VBA &amp; Power BI', 'program-modelling'),
    ('Cybersecurity — Defensive &amp; Offensive',     'program-cyber'),
    ('Relationship Management Excellence',            'program-relationship'),
    ('Customer Experience &amp; Journey Design',      'program-cx'),
    ('Data Science, Machine Learning &amp; Analytics', 'program-data-science'),
]

ALT = {
    'program-agentic-ai':    'A professional working alongside an AI assistant',
    'program-modelling':     'A financial model open on screen',
    'program-cyber':         'A security analyst monitoring systems',
    'program-relationship':  'A relationship manager meeting a client',
    'program-cx':            'A customer being served at a branch counter',
    'program-data-science':  'An analytics dashboard under discussion',
}

CSS_IMG_RULE = """.program-card img {
  width: 100%;
  height: auto;          /* without this the height attribute beats aspect-ratio */
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-bottom: 1px solid var(--line);
}
"""


def find(base):
    for ext in ('.jpg', '.jpeg', '.png', '.webp'):
        p = os.path.join(IMG_DIR, base + ext)
        if os.path.exists(p):
            return p
    return None


def prepare(path):
    """Crop centre-weighted to the card ratio; return (ok, message)."""
    from PIL import Image, ImageStat

    im = Image.open(path).convert('RGB')
    mean = sum(ImageStat.Stat(im).mean) / 3
    if mean < MIN_MEAN:
        return False, 'too dark (mean %d, need %d+)' % (mean, MIN_MEAN)
    if mean > MAX_MEAN:
        return False, 'washed out (mean %d, max %d)' % (mean, MAX_MEAN)

    target = CARD_W / CARD_H
    w, h = im.size
    if w / h > target:                      # too wide: trim the sides
        new_w = int(h * target)
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    else:                                   # too tall: bias to the upper third,
        new_h = int(w / target)             # where faces and screens usually are
        top = min(int(h * 0.15), h - new_h)
        im = im.crop((0, top, w, top + new_h))

    im = im.resize((CARD_W, CARD_H), Image.LANCZOS)
    out = os.path.splitext(path)[0] + '.jpg'
    im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
    if out != path:
        os.remove(path)
    return True, 'cropped to %dx%d, brightness %d, %d KB' % (
        CARD_W, CARD_H, mean, os.path.getsize(out) // 1024)


def strip_images(page, css):
    """Remove the image layer. Matches the rule by selector rather than by an
    exact string, so editing CSS_IMG_RULE can never strand an older copy."""
    page = re.sub(r'\n *<img src="assets/img/program-[a-z-]+\.jpg"[^>]*>', '', page)
    css = re.sub(r'\.program-card img \{[^}]*\}\n', '', css)
    return page, css


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--check', action='store_true', help='report only')
    ap.add_argument('--remove', action='store_true', help='revert to typographic cards')
    args = ap.parse_args()

    page = open(PAGE, encoding='utf-8').read()
    css = open(CSS, encoding='utf-8').read()

    if args.remove:
        page, css = strip_images(page, css)
        open(PAGE, 'w', encoding='utf-8').write(page)
        open(CSS, 'w', encoding='utf-8').write(css)
        print('reverted to typographic cards')
        return

    wired, skipped = [], []
    for title, base in CARDS:
        path = find(base)
        if not path:
            skipped.append((base, 'not found'))
            continue
        if args.check:
            wired.append((base, 'present'))
            continue
        ok, msg = prepare(path)
        (wired if ok else skipped).append((base, msg))

    for base, msg in wired:
        print('  ok    %-24s %s' % (base, msg))
    for base, msg in skipped:
        print('  skip  %-24s %s' % (base, msg))

    if args.check or not wired:
        if not wired:
            print('\nNothing to wire. Drop photos into assets/img/ using the names above.')
        return

    # start from a clean slate so re-running is safe
    page, css = strip_images(page, css)
    usable = {b for b, _ in wired}
    for title, base in CARDS:
        if base not in usable:
            continue
        anchor = '<div class="program-body">\n              <div class="program-tag">'
        marker = '<div class="program-title">%s</div>' % title
        i = page.find(marker)
        if i == -1:
            print('  !     %-24s card not found in index.html' % base)
            continue
        j = page.rfind(anchor, 0, i)
        img = ('<img src="assets/img/%s.jpg" alt="%s" loading="lazy" '
               'width="%d" height="%d">\n            ' % (base, ALT[base], CARD_W, CARD_H))
        page = page[:j] + img + page[j:]

    if CSS_IMG_RULE not in css:
        css = css.replace('.program-body {', CSS_IMG_RULE + '.program-body {', 1)

    open(PAGE, 'w', encoding='utf-8').write(page)
    open(CSS, 'w', encoding='utf-8').write(css)
    print('\nwired %d of %d cards' % (len(wired), len(CARDS)))


if __name__ == '__main__':
    sys.exit(main())
