# Masar — bilingual executive-course directory

A course-directory site in the shape of [executivecourses.com](https://executivecourses.com),
rebuilt as a personal project with the two things that kind of site usually
lacks: a real Arabic version, and an interface that shows you the fee before
it asks for your phone number.

Plain HTML, CSS and vanilla JavaScript. No framework, no bundler, no runtime
dependencies. It runs from `file://`, GitHub Pages, Netlify, or any static
host.

> **Sample data.** Every school, programme, date, fee and review in
> `assets/js/data.js` is invented. Attaching made-up prices and dates to real
> business schools would misrepresent them, so the catalogue uses fictional
> institutions throughout. Replace the dataset before this is used for
> anything real.

## What is in it

| Page | What it does |
| --- | --- |
| `index.html` | Hero search, featured programmes, subject browse, next intakes, editorial collections |
| `courses.html` | The catalogue — faceted filters, sort, live search, shareable filtered URLs |
| `course.html?id=…` | Programme detail, booking panel, similar programmes |
| `schools.html` / `school.html?id=…` | School directory filtered by region, and per-school profiles |
| `lists.html` / `list.html?id=…` | Editorial collections ("best courses for…") |
| `about.html` | Editorial policy, privacy, and the sample-data disclosure |
| `contact.html` | Enquiry form, pre-filled when you arrive from a course page |

Each page exists twice: English at the root, Arabic under `ar/`.

## How the bilingual part works

Three rules keep the two languages from drifting apart:

1. **One catalogue, two languages.** Every record in `assets/js/data.js`
   carries `{ en, ar }` for each human-readable field. A programme cannot
   exist in English and quietly go missing in Arabic.
2. **One stylesheet.** `assets/css/site.css` is written with CSS logical
   properties (`margin-inline-start`, `inset-inline-end`, `text-align: start`),
   so RTL is the same code path as LTR. The `[dir="rtl"]` block at the bottom
   of the file is only for what logical properties cannot express — mirrored
   arrow glyphs, gradient angles, and isolating Latin runs (prices, `AACSB`)
   inside Arabic text.
3. **One page generator.** `tools/build.py` holds the page shells and their
   translated copy and writes all 18 files. Editing a shell by hand means
   editing it twice and forgetting one; editing the generator does not.

Localisation goes past translation: Arabic gets its own plural forms
(`برنامج واحد` / `برنامجان` / `٣ برامج` / `١١ برنامجًا`), localised dates and
numbers via `Intl`, and `hreflang` alternates on every page. The language
switcher carries your current filters across, so switching languages on a
filtered search keeps the search.

## Working on it

```bash
cd masar
python3 tools/build.py     # regenerate the HTML after editing tools/build.py
python3 -m http.server 8000
```

Editing **content** (courses, schools, collections) means editing
`assets/js/data.js` only — no rebuild needed. Editing **page structure or
static copy** means editing `tools/build.py` and re-running it. The generated
`.html` files are committed so the site can be served straight from the repo.

## Deliberate choices

- **No tracking.** No analytics, no third-party scripts. The only external
  request is the Google Fonts stylesheet, and the site falls back to system
  fonts without it.
- **The shortlist is yours.** Saved courses live in `localStorage` under
  `masar:shortlist` and never leave the browser. It is shared between the
  English and Arabic sites.
- **Filters live in the URL.** Any filtered view is a link you can send.
- **Facet counts are honest.** Each filter option shows how many courses you
  would get *with the other filters still applied*, so you never click into an
  empty result.
- **Collections, not rankings.** The "best courses for…" pages are labelled
  editorial selections. Scoring a four-day negotiation course out of a hundred
  would be an invention, so the site does not do it.
- **Dark mode** follows the system by default, is toggleable, and is applied
  before first paint so the page never flashes.

## Accessibility

Skip link, visible focus rings, labelled form controls, `aria-pressed` on the
save and theme toggles, `aria-live` on the result count, keyboard-dismissible
drawer, and `prefers-reduced-motion` honoured throughout. Checked at 390px and
1360px in both writing directions.
