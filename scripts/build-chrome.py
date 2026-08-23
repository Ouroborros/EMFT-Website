#!/usr/bin/env python3
"""Write the shared header, footer and consent banner into every page.

The site has no build step and no templating, so the chrome is kept identical
by generating it here and splicing it into each file between marker comments.
Run this after changing the navigation, the footer, or the contact details:

    python3 scripts/build-chrome.py

On the first run the markers do not exist yet, so the script matches the
existing <header>/<footer> elements instead and leaves the markers behind for
next time.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

EMAIL = "info@emergingmarketft.com"
# Main switchboard. The legacy site carries two numbers — this Dubai landline
# and a +971 50 400 1195 mobile — so it is defined once, here, and nowhere else.
TEL_DISPLAY = "+971 4 250 9783"
TEL_HREF = "+97142509783"
LINKEDIN = "https://www.linkedin.com/company/emergingmarketft"

# key: (filename, nav item to mark current)
PAGES = [
    ("index.html", None),
    ("programs.html", "programs"),
    ("case-studies.html", "cases"),
    ("about.html", "about"),
    ("contact.html", "contact"),
    ("elearning.html", "portal"),
    ("coaching.html", "solutions"),
    ("assessments.html", "solutions"),
    ("speakers.html", "solutions"),
    ("privacy.html", None),
    ("terms.html", None),
]

# The generated flagship detail pages all live under the Programs nav item.
PAGES += [
    (path.name, "programs")
    for path in sorted(ROOT.glob("program-*.html"))
]

SOLUTIONS = [
    ("coaching.html", "Coaching &amp; Technical Mentoring", "navCoaching"),
    ("assessments.html", "Assessments", "navAssessments"),
    ("speakers.html", "Keynote Speakers", "navSpeakers"),
    ("elearning.html", "Digital Learning", "navDigital"),
    ("index.html#services", "All Services", "navServices"),
]


def header(current):
    def cur(key):
        return ' aria-current="page"' if current == key else ""

    items = "\n".join(
        '              <li><a href="%s" data-i18n="%s">%s</a></li>' % (href, key, label)
        for href, label, key in SOLUTIONS
    )
    return """  <header class="site-header">
    <div class="header-inner">
      <a class="logo" href="index.html" aria-label="EMFT — Emerging Market Financial Training, home">
        <img src="assets/img/emft-logo.png" alt="Emerging Market Financial Training" width="230" height="68">
      </a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">
        <span class="visually-hidden">Menu</span>
        <span class="nav-toggle-bar" aria-hidden="true"></span>
        <span class="nav-toggle-bar" aria-hidden="true"></span>
        <span class="nav-toggle-bar" aria-hidden="true"></span>
      </button>
      <nav id="primary-nav" class="primary-nav" aria-label="Primary">
        <ul>
          <li class="nav-group">
            <span class="nav-group-label" aria-hidden="true" data-i18n="navSolutions">Solutions</span>
            <button type="button" class="nav-group-toggle" aria-expanded="false" aria-controls="solutions-menu"%s>
              <span data-i18n="navSolutions">Solutions</span>
            </button>
            <ul id="solutions-menu" class="nav-group-menu">
%s
            </ul>
          </li>
          <li><a href="programs.html"%s data-i18n="navPrograms">Programs</a></li>
          <li><a href="case-studies.html"%s data-i18n="navCases">Case Studies</a></li>
          <li><a href="about.html"%s data-i18n="navAbout">About</a></li>
          <li><a href="elearning.html#portal"%s data-i18n="navPortal">Learning Portal</a></li>
          <li><button type="button" class="lang-toggle" id="lang-toggle">العربية</button></li>
          <li><a class="nav-contact" href="contact.html"%s data-i18n="navContact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>""" % (
        ' data-current="true"' if current == "solutions" else "",
        items,
        cur("programs"),
        cur("cases"),
        cur("about"),
        cur("portal"),
        cur("contact"),
    )


FOOTER = """  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-brand-name">Emerging Market Financial Training</div>
          <p data-i18n="footBlurb">Practitioner-led training, assessment and coaching for financial institutions, government entities and corporates.</p>
        </div>
        <nav class="footer-col" aria-label="Footer — solutions">
          <h2 class="footer-heading" data-i18n="navSolutions">Solutions</h2>
          <a href="index.html#services" data-i18n="navServices">Services</a>
          <a href="programs.html" data-i18n="navPrograms">Programs</a>
          <a href="coaching.html" data-i18n="navCoaching">Coaching &amp; Mentoring</a>
          <a href="assessments.html" data-i18n="navAssessments">Assessments</a>
          <a href="speakers.html" data-i18n="navSpeakers">Keynote Speakers</a>
        </nav>
        <nav class="footer-col" aria-label="Footer — company">
          <h2 class="footer-heading" data-i18n="footCompany">Company</h2>
          <a href="about.html" data-i18n="navAbout">About</a>
          <a href="case-studies.html" data-i18n="navCases">Case Studies</a>
          <a href="contact.html" data-i18n="navContact">Contact</a>
          <a href="elearning.html#portal" data-i18n="navPortal">Learning Portal</a>
        </nav>
        <nav class="footer-col" aria-label="Footer — contact">
          <h2 class="footer-heading" data-i18n="navContact">Contact</h2>
          <!-- dir="ltr": a Latin address or a phone number reverses visually
               inside an RTL paragraph without it. -->
          <a href="mailto:{email}" dir="ltr">{email}</a>
          <a href="tel:{tel_href}" dir="ltr">{tel}</a>
          <a href="{linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        </nav>
        <div class="footer-col">
          <h2 class="footer-heading" data-i18n="footOffices">Offices</h2>
          <span>London, United&nbsp;Kingdom</span>
          <span>Dubai, United&nbsp;Arab&nbsp;Emirates</span>
          <span>Abu&nbsp;Dhabi, United&nbsp;Arab&nbsp;Emirates</span>
          <span>Riyadh, Saudi&nbsp;Arabia</span>
        </div>
      </div>
      <div class="footer-legal">
        <span>EMFT &copy; <span id="year">2026</span>. <span data-i18n="footRights">All rights reserved.</span></span>
        <span class="footer-legal-links">
          <a href="privacy.html" data-i18n="footPrivacy">Privacy Policy</a>
          <a href="terms.html" data-i18n="footTerms">Terms of Use</a>
        </span>
      </div>
    </div>
  </footer>

  <div class="cookie-banner" id="cookie-banner" role="region" aria-label="Privacy notice" hidden>
    <div class="cookie-inner">
      <!-- No data-i18n here: the string wraps a link, and the translator swaps
           textContent, which would drop the anchor. -->
      <p><span data-i18n="cookieText">This site stores your language choice and this notice's dismissal in your browser. Nothing is shared with advertisers.</span> <a href="privacy.html" data-i18n="footPrivacy">Privacy Policy</a></p>
      <div class="cookie-actions">
        <button type="button" id="cookie-accept" data-i18n="cookieOk">Got it</button>
        <a class="ghost" href="privacy.html" role="button" data-i18n="cookieMore">Read more</a>
      </div>
    </div>
  </div>""".format(email=EMAIL, tel=TEL_DISPLAY, tel_href=TEL_HREF, linkedin=LINKEDIN)


HDR_START, HDR_END = "<!-- CHROME:HEADER -->", "<!-- /CHROME:HEADER -->"
FTR_START, FTR_END = "<!-- CHROME:FOOTER -->", "<!-- /CHROME:FOOTER -->"


def splice(text, start, end, new, fallback):
    """Replace between markers, or match `fallback` the first time round."""
    block = "%s\n%s\n%s" % (start, new, end)
    if start in text and end in text:
        return re.sub(
            re.escape(start) + r".*?" + re.escape(end), lambda _: block, text, flags=re.S
        )
    if not fallback.search(text):
        raise SystemExit("no marker and no match in page")
    return fallback.sub(lambda _: block, text, count=1)


HDR_RE = re.compile(r'  <header class="site-header">.*?</header>', re.S)
FTR_RE = re.compile(r'  <footer class="(?:site-footer|footer-slim)".*?</footer>', re.S)


def main():
    for name, current in PAGES:
        path = ROOT / name
        if not path.exists():
            print("skip (missing) %s" % name)
            continue
        text = path.read_text(encoding="utf-8")
        text = splice(text, HDR_START, HDR_END, header(current), HDR_RE)
        text = splice(text, FTR_START, FTR_END, FOOTER, FTR_RE)
        path.write_text(text, encoding="utf-8")
        print("chrome  %s" % name)


if __name__ == "__main__":
    sys.exit(main())
