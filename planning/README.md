# Web Apps Planning Package

Planning docs + starters for four small apps that will live under paramore.design,
each installable as its own PWA. Produced from a phone brainstorming session on
2026-08-10; intended to be split into separate build sessions.

## How to use this package

Each app folder is a **self-contained handoff**:

- `PLAN.md` — vision, decisions already made (with reasoning), data model, v1/v2 scope, risks.
- `AGENT-TASKS.md` — the v1 work broken into **parallel workstreams for multiple Opus agents**.
  Each task lists scope, interfaces/contracts it must honor, dependencies on other tasks,
  and acceptance criteria. Tasks with no dependency edges between them can run concurrently.
- `starter/` — schemas and code stubs that encode the load-bearing design decisions
  (recurrence handling, ops-based sync, snapping, ledger). Agents should treat these as
  the source of truth for architecture, extending rather than reinventing them.

**Tomorrow-morning flow:** create the new project with the app-setup skill, copy the app's
folder into the new repo, then in the session: "Read planning/PLAN.md and AGENT-TASKS.md.
Spawn one agent per workstream in Wave 1, then Wave 2 after interfaces land."

## Shared conventions (all four apps)

- **Stack:** Supabase (auth, Postgres, Realtime, storage, Edge Functions, pg_cron) +
  static-friendly frontend, installable PWA, offline-aware. Existing auth/email/DNS
  infra is already set up and provisioned by the app-setup skill.
- **All mutations that touch shared state or an economy go through Postgres RPCs /
  Edge Functions** — never direct client writes. RLS on every table.
- **Ops-based sync engine:** Fridge Poetry (01) and Flare (04) share the same core idea —
  clients emit operations, server applies + broadcasts. Build it first in Flare
  (simplest surface), then port. See `04-flare/starter/module-contract.ts`.
- **Notifications:** PWA push (service worker) + existing email. Digest-first; avoid
  per-event spam.
- **Offline honesty:** show staleness explicitly (last-seen timestamps, queued-op
  indicators) instead of pretending liveness.

## Suggested build order

1. **03-chores** — easiest, no realtime, immediate family value; exercises the
   template/occurrence + ledger patterns.
2. **04-flare** — builds the ops/sync engine + module system (reused by 01).
3. **01-fridge-poetry** — reuses Flare's sync engine; adds drag/snap canvas + economy.
4. **02-ham-companion** — mostly content/UX; can also run any time in parallel
   (no realtime, no shared engine).
