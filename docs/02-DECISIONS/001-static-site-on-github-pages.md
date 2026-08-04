# ADR-001: Static HTML site hosted on GitHub Pages

- **Date:** 2026-08-04 (recorded retroactively; decision predates this file)
- **Status:** accepted

## Decision
The site is plain static HTML/CSS/JS, hosted free on GitHub Pages, deployed
automatically on push by a GitHub Actions workflow.

## Alternatives rejected
- **WordPress / site builders:** hosting cost, plugin maintenance, slower,
  and harder for Claude to edit reliably.
- **React/Next.js app:** build tooling and framework complexity with zero
  benefit for a content site.

## Why
A marketing site with no user data needs nothing more. Static files scale
automatically, cost nothing, and have almost no security surface.

**Cost accepted:** shared elements (nav, footer) are duplicated in every
HTML file, so sitewide changes touch every page. Revisit (move to a static
site generator) if the site approaches ~30 pages or nav edits become a
recurring source of errors.
