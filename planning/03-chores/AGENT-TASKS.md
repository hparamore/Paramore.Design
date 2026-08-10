# Chores — Parallel Agent Workstreams (v1)

Read PLAN.md first. `starter/schema.sql` is the architectural source of truth — extend
it, don't reinvent it. Tasks in the same wave have no dependencies on each other and
should run as concurrent agents. Wave 2 depends only on Wave 1's *interfaces* (the
schema + RPC signatures), which are already specified below and in the starter, so
Wave 2 can start against the contract while Wave 1 finishes.

## Wave 1

### T1 — Database & RPC layer
- Apply `starter/schema.sql` (extend as needed; keep table/column names).
- Implement RPCs (SECURITY DEFINER, all validation server-side):
  - `complete_occurrence(occurrence_id, kid_id)` → handles each/any/together semantics,
    sets `pending_approval` or auto-approves per template.
  - `claim_occurrence(occurrence_id, kid_id)` / auto-release of expired claims.
  - `approve_occurrences(occurrence_ids[], adjustments jsonb)` → creates ledger entries.
  - `bounce_occurrence(occurrence_id, note)`.
  - `add_ledger_entry(kid_id, type, stars, cents, note)` (parent-only; covers IOU + payout).
  - `redeem_reward(kid_id, reward_id)`.
- RLS: parents full family access; kid sessions read-only on their own rows + the
  family's open `any` occurrences; zero direct writes anywhere.
- Acceptance: seed script with 2 kids + all 4 assignment modes; every RPC exercised
  by a SQL test file; balances always equal SUM(ledger).

### T2 — Occurrence generator (Edge Function + pg_cron)
- Nightly per-family run at family-local midnight (store tz on family).
- Generates occurrences for the visible window (today + lookahead per recurrence),
  applies missed policies to expired ones, computes rotation assignee from
  `rotation_anchor_date`.
- **Idempotent**: unique key `(template_id, period_start, kid_id NULLS NOT DISTINCT)`;
  re-running produces no dupes.
- Acceptance: unit tests for daily / weekly / every-N-weeks / rotation across DST
  boundaries; re-run test; each missed policy verified.

### T3 — App shell, auth & PWA scaffold
- Project scaffold per app-setup skill output; family account auth (existing infra),
  kid profile picker (avatar grid, optional PIN), role context (parent vs kid session).
- PWA: manifest, service worker, installable, offline shell with cached last-known data.
- Layout frame + navigation for parent and kid modes (empty slots for T4/T5 screens).
- Acceptance: installable on iOS/Android; kid can enter kid mode; parent can switch kids.

## Wave 2

### T4 — Kid experience
- Today list (big checkboxes), claim button for `any` chores with countdown,
  "I helped" for `together`, "next up: you" badge for rotations.
- Balances header (⭐/$), reward store (browse + redeem), streak counter.
- Optimistic UI over T1 RPCs with queued-offline handling.
- Acceptance: complete/claim/redeem flows work end-to-end against seeded data.

### T5 — Parent experience
- Template CRUD (all 4 modes, recurrence picker, missed policy, value, auto-approve).
- Approval inbox (batch approve, per-item adjust for `together` splits, bounce w/ note).
- Ledger view per kid (filter by type), manual IOU entry, mark-paid, reward catalog CRUD.
- Daily dashboard: done / pending / missed.
- Acceptance: a parent can set up the family's full chore system without touching SQL.

### T6 — Notifications
- Web push subscription flow + service worker handlers.
- Kid morning summary + single evening nudge; parent daily digest (email via existing
  infra) + instant push for approvals/redemptions. Per-user quiet hours.
- Acceptance: scheduled sends fire from pg_cron/Edge Function; no per-completion spam.

## Integration pass (single agent, after waves)
Wire-through review, empty states, error toasts, seed → screenshot walkthrough of both
modes, README for the repo.
