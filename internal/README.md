# Internal tools

Not part of the published marketing site. Nothing in this folder is linked from
`index.html` or the page navigation — these are single-file working tools for the
EMFT team, kept in the repo so they are versioned rather than living only as
pasted HTML.

## `operations-board.html`

The delivery-side counterpart to the Sales Dashboard. Where the sales board
tracks *who we are talking to*, this one tracks *what has to get done* on the two
pieces of work that follow a conversation:

- **Proposal build** — Qualify → Design → Cost → Write → Submit → Follow-up
- **Delivery operations** — Content → Assessment → Schedule → Logistics →
  Deliver → Report & close

Each engagement (a client + a programme) carries a checklist of tasks. Every task
has an owner, a due date, a free-text note and a state you advance by clicking the
pill: `TO DO → DOING → BLOCKED → DONE`.

### The three check-in views

| Button | What it answers |
| --- | --- |
| **What's due now** | Overdue, then due within 7 days, then in flight, then one undated next-step per engagement |
| **Blocked & waiting on others** | Split by who is holding it up — client, trainer, or us |
| **Split by owner** | Every open task grouped by Hussam / Bilal / Fatima / Trainer / Client |

### Running it

Open the file directly in a browser, or serve it:

```
python3 -m http.server 8000     # then http://localhost:8000/internal/operations-board.html
```

No build step, no dependencies, no network calls.

### Data

State lives in the browser (`localStorage`, key `emft-ops-board-v1`), or in the
artifact storage API when the page is hosted as a Claude artifact. It is
per-browser, not shared — use **⚙ Data & tools → Backup board** to export JSON and
**Restore** to move it to another machine or another person.

The board seeds itself on first open with the 2026 engagements from the sales
board's Zoho deal set. Client and programme names are real; the checklists start
empty on purpose, so nothing on the board claims progress that has not actually
happened. Two BSF items carried over from the branch-transformation planning
notes are labelled as such and need confirming before you act on them.
