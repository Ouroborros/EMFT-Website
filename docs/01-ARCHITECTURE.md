# Architecture — EMFT Website

_Last updated: 2026-08-04_

## The shape of the system
A **static website**: plain HTML pages with shared CSS (`css/`) and
JavaScript (`js/`), images in `assets/`. There is no build step, no server
code, no database. Hosting and deployment are **GitHub Pages** — pushing to
the main branch publishes the site automatically via the workflow in
`.github/workflows/`.

In plain English: the site is a folder of files that GitHub serves directly
to visitors. Nothing runs "on a server" that belongs to us.

## Why this shape is right for now
- Nothing to maintain, patch, or pay for beyond GitHub.
- Effectively unlimited scale for a marketing site — GitHub Pages serves
  static files behind a CDN; 10x or 100x traffic changes nothing for us.
- No stored user data → minimal security and privacy surface.

## What breaks at 10x — and what actually would break
- **Traffic 10x–100x:** nothing. Static hosting absorbs it.
- **Content 10x (many more pages):** editing raw HTML page-by-page becomes
  error-prone (nav menus and footers are duplicated in every file). The fix
  at that point is a static site generator — a mechanical migration, not a
  rewrite. Cost: small, but grows with page count, so decide before ~30 pages.
- **Dynamic features (accounts, payments, booking):** cannot be bolted onto
  a static site. That is a new system beside this one (API-first, per
  CLAUDE.md rules), not a modification of it.

## Known constraints
- Every page carries its own copy of the header/nav/footer. Any nav change
  must be applied to **all** HTML files — a known duplication cost, accepted
  for zero-infrastructure simplicity. (See phase log.)
