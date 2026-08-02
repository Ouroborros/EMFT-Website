#!/usr/bin/env python3
"""One-off patches applied on top of the shared chrome.

Wires the translator and shared-behaviour scripts into every page, makes sure
the RTL stylesheet and the Arabic face are available everywhere, and replaces
the mailto buttons that used to be the only route to the company with links to
the enquiry form.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PAGES = [
    "index.html", "programs.html", "case-studies.html", "about.html",
    "contact.html", "elearning.html", "coaching.html", "assessments.html",
    "speakers.html", "privacy.html", "terms.html",
]

FONT_OLD = "family=Libre+Franklin:wght@400;500;600;700&display=swap"
FONT_NEW = "family=Libre+Franklin:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap"

# Each CTA gets the label that fits what the page is asking for, and all of
# them land on the enquiry form rather than opening a mail client.
CTA = {
    "index.html": "Contact Us",
    "programs.html": "Request the Program Outline",
    "assessments.html": "Discuss Your Requirements",
    "coaching.html": "Discuss Your Requirements",
    "speakers.html": "Request a Proposal",
    "elearning.html": "Request Portal Access",
}


def patch(name):
    path = ROOT / name
    text = path.read_text(encoding="utf-8")
    before = text

    # Arabic face, everywhere.
    if "Noto+Naskh" not in text:
        text = text.replace(FONT_OLD, FONT_NEW)

    # RTL rules and shared page components live in pages.css.
    if "css/pages.css" not in text:
        text = text.replace(
            '<link rel="stylesheet" href="css/home.css">',
            '<link rel="stylesheet" href="css/home.css">\n  <link rel="stylesheet" href="css/pages.css">',
        )

    # The translator has to run before anything that reads the language.
    if "js/i18n.js" not in text:
        text = re.sub(
            r'(  <script src="js/(?:home|programs)\.js" defer></script>)',
            r'  <script src="js/i18n.js" defer></script>\n\1',
            text,
            count=1,
        )
    if "js/site.js" not in text:
        text = text.replace(
            "</body>", '  <script src="js/site.js" defer></script>\n</body>'
        )

    # Page CTAs: button to the form, not a mailto.
    label = CTA.get(name)
    if label:
        text = re.sub(
            r'<a class="(btn-gold|btn-solid|link-underline)" href="mailto:hussam\.eldissouqi@emergingmarketft\.com[^"]*">[^<]*</a>',
            lambda m: '<a class="%s" href="contact.html">%s</a>' % (m.group(1), label),
            text,
        )

    if text != before:
        path.write_text(text, encoding="utf-8")
        print("patched %s" % name)
    else:
        print("        %s (no change)" % name)


for page in PAGES:
    patch(page)
