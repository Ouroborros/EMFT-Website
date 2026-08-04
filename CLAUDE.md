# Operating Rules for Claude (read this first, every session)

The owner of this project is a non-coder. These rules exist so that all work
stays auditable, scalable, and fixable without the owner reading code.
They are not optional.

## 1. Paper trail — nothing invisible

- Before saying any piece of work is "done", update `docs/03-PHASE-LOG.md`
  with: the date, what was built, what was skipped, and every shortcut taken.
- A shortcut is anything hardcoded, temporary, untested, or done the quick
  way. Shortcuts are allowed. **Undocumented shortcuts are never allowed.**
- Any significant technical choice (framework, service, data shape, hosting)
  gets a short decision record in `docs/02-DECISIONS/` explaining what was
  chosen, what was rejected, and why. Never silently undo a recorded
  decision — if it needs to change, write a new record superseding the old.
- Keep `docs/01-ARCHITECTURE.md` truthful. If the shape of the system
  changes, update it in the same session.

## 2. Plain English for the owner

- All docs in `docs/` are written for a smart non-programmer. No unexplained
  jargon. Every risk stated with its business consequence
  ("if traffic 10x, X breaks, symptom will be Y, fix costs roughly Z").
- When finishing a session, summarize in plain English: what changed, what
  it means for the product, what (if anything) now needs the owner's decision.

## 3. Audits

- When asked for an audit, act as a hostile senior engineer reviewing a
  stranger's code. Rank findings by cost-to-fix-later. Write the report to
  `docs/AUDITS/YYYY-MM-audit.md`. Check the phase log for undeclared
  shortcuts — finding one is itself a finding.

## 4. Architecture rules (apply to this and future features)

1. Boring, mainstream technology only. No novel infra.
2. Stateless application code — all state in a managed database or object
   storage, never in server memory or local disk.
3. Managed services for auth, payments, and email. Never hand-rolled.
4. All configuration in environment variables. No hardcoded URLs, keys,
   or limits in code.
5. Slow work (imports, emails, reports) goes to a background job/queue,
   never inside a user-facing request.
6. API-first for any dynamic product: every feature is an API endpoint
   first; the UI is one consumer of it. Publish an OpenAPI spec. Design so
   machines/agents can use the product, not only humans.

## 5. This specific project

EMFT-Website is a **static marketing site** (plain HTML/CSS/JS, no build
step, no backend) deployed via **GitHub Pages** (`.github/workflows`).

- Keep it static. Do not introduce a framework, build step, or server for
  this site without a decision record and the owner's explicit approval.
- Forms/dynamic needs: use managed services (e.g. a hosted form backend),
  consistent with rule 4.3.
- Preserve SEO assets: `sitemap.xml`, `robots.txt`, per-page meta tags.
  Update the sitemap when pages are added or removed.
- Test before declaring done: open the changed pages locally (e.g.
  `python3 -m http.server`) and verify nav, links, and mobile layout.

## 6. Reuse

When the owner starts a new project, copy this file and the `docs/`
structure into the new repo as the first commit, then tailor section 5.
