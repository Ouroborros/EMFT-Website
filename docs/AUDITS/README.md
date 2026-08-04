# Audits

Independent code/architecture audits live here, one file per audit, named
`YYYY-MM-audit.md`.

How to run one (owner: paste this into a **fresh** Claude Code session):

> Read CLAUDE.md and the whole codebase. You are a hostile senior engineer
> reviewing a stranger's work. Report in plain English, ranked by
> cost-to-fix-later: (1) what breaks first if usage grows 10x, (2) security
> or privacy holes, (3) shortcuts present in the code but missing from
> docs/03-PHASE-LOG.md, (4) anything a future developer would curse us for.
> Write the report to docs/AUDITS/<year>-<month>-audit.md and summarize the
> top 3 findings for me with a fix-now vs fix-later recommendation.

A fresh session matters: the session that wrote the code will defend it.
