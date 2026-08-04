# Phase Log — append-only

Newest entries at the top. Every working session appends an entry **before**
declaring work done. Format:

```
## YYYY-MM-DD — <one-line summary>
- Built: ...
- Skipped: ...
- Shortcuts taken: ... (or "none")
- Needs owner decision: ... (or "nothing")
```

---

## 2026-08-04 — Installed the project operating system (this docs/ structure)
- Built: CLAUDE.md operating rules; spec, architecture doc, decision
  records, this phase log, audits folder.
- Skipped: no code changes to the site itself.
- Shortcuts taken: none.
- Needs owner decision: review `00-SPEC.md` and correct anything wrong.

## Prior history (reconstructed from git, before logging existed)
- Rebuilt site navigation; added Contact, About, and legal pages.
- Added GitHub Pages deploy workflow (and fixed a YAML error in it).
- Added SEO metadata, sitemap, robots.txt; optimized logo.
- Brought the site in line with the 2026 company profile.
- Known shortcut inherited from this era: nav/footer duplicated across all
  HTML pages (see ADR-001 for the accepted trade-off).
