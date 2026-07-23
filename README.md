# EMFT Website

Static marketing website for EMFT (Emerging Market Financial Training) — a
financial training firm serving banks, regulators, and investment
professionals across emerging markets. No frameworks, no build step: plain
HTML, CSS, and vanilla JavaScript. Works from `file://`, GitHub Pages,
Netlify, or any static host.

## Structure

```
├── index.html          Home
├── services.html       Services (deep-linkable: #corporate-training,
│                       #open-courses, #advisory-capability, #e-learning)
├── about.html          About — mission, values, approach
├── contact.html        Contact — details + client-side validated form
├── css/styles.css      Single stylesheet (design tokens at the top)
├── js/main.js          Nav toggle, header state, scroll reveal, form, year
└── favicon.svg         Monogram mark
```

## Development

No tooling required — open `index.html` in a browser, or serve locally:

```
python3 -m http.server 8000
```

The only external request is the Inter font from Google Fonts; everything else
(icons, hero graphics) is inline SVG and CSS gradients. Without network access
the site falls back to the system font stack.

## Placeholders to replace before launch

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
- **Contact form backend**: until an endpoint is configured the form
  transmits nothing — it validates client-side and shows a success message
  that points visitors to the direct email address. To make it actually send,
  set the `FORM_ENDPOINT` constant in `js/main.js` to a Formspree/Netlify
  Forms/Basin URL or your own API.
- **Service lineup**: corporate training, open courses, advisory & capability
  building, and e-learning are a reasonable inference for a financial
  training firm — confirm the lineup and the listed course topics (credit,
  risk, treasury, capital markets, compliance) against the actual offering.
