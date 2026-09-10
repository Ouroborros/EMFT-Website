# EMFT Website

Static marketing website for EMFT (Emerging Market Financial Training) — a
financial training firm serving banks, regulators, and investment
professionals across emerging markets. No frameworks, no build step: plain
HTML, CSS, and vanilla JavaScript. Works from `file://`, GitHub Pages,
Netlify, or any static host.

## Structure

```
├── index.html            Home — implements "EMFT Homepage v2" from the
│                         Claude Design handoff (navy/gold editorial identity)
├── css/home.css          Homepage stylesheet (design tokens at the top)
├── js/home.js            Nav toggle, count-up stats, year
├── assets/img/           EMFT logo
├── favicon.svg           Navy/gold monogram
│
│   Legacy pages (previous placeholder design, not linked from the homepage;
│   replace with the Case Studies / Assessments / Program Catalog designs
│   from the handoff bundle):
├── services.html · about.html · contact.html
└── css/styles.css · js/main.js
```

## Development

No tooling required — open `index.html` in a browser, or serve locally:

```
python3 -m http.server 8000
```

The only external request is the Inter font from Google Fonts; everything else
(icons, hero graphics) is inline SVG and CSS gradients. Without network access
the site falls back to the system font stack.

## Homepage notes

- **Photography** is hot-linked from Unsplash (as in the design mockup) —
  replace with owned/licensed imagery for production. Institutional register
  only: architecture, boardrooms, markets (per the design blueprint).
- **Nav links** for Case Studies / Assessments / Programs point to homepage
  sections until those pages (included in the design handoff) are built.
- **Learning Portal** and Terms/Privacy links from the mockup are omitted
  until real URLs/pages exist.

## Placeholders to replace before launch (legacy pages)

- **Stats band** (Home): `500+ professionals trained`, `30+ institutions`,
  `25 years`, `95% satisfaction` are placeholder figures — replace with real,
  verifiable numbers or remove the section.
- **Email**: `info@emft.com` (footer, contact page, form success message).
- **Phone**: `+1 (000) 000-0000` (footer, contact page).
- **Address**: `[Street Address], [City], [State] [Postal Code]`.
- **Business hours**: Mon–Fri 9–5 is a generic default; confirm hours and
  time zone.
- **Response-time promise**: "within one business day" appears on the Contact
  page — confirm it can be honored, or soften it.
- **Contact form backend**: `contact-form.php` on the production host emails
  each submission to info@emergingmarketft.com (POST only, same-site origin,
  honeypot, per-address rate limit, header-injection stripping). It sends
  from `website@emergingmarketft.com`, which must exist as a mailbox or
  alias so SPF/DKIM align; if mail lands in spam, switch the `mail()` call to
  authenticated SMTP. Where the handler is absent (the GitHub Pages preview)
  the form falls back to opening a pre-filled email.
- **Service lineup**: corporate training, open courses, advisory & capability
  building, and e-learning are a reasonable inference for a financial
  training firm — confirm the lineup and the listed course topics (credit,
  risk, treasury, capital markets, compliance) against the actual offering.
