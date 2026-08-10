# Chores (rebrand TBD) — Plan

Rebuild of the existing Paramore chore app. The old app worked but recurring chores
were **eagerly materialized and never cleaned up**, so misses piled up, duplicates
accumulated, and the free-for-all section became unmanageable. The rebuild fixes this
architecturally, not with UI patches.

## Core architecture decisions (settled — do not relitigate)

### 1. Template / occurrence split
- `chore_templates` holds the *rule*: title, value, assignment mode, recurrence,
  missed policy. Templates are never shown as tasks.
- `occurrences` holds only a **small rolling window** of concrete instances. A nightly
  pg_cron job (per-family timezone) generates the next window AND closes out expired
  occurrences per each template's missed policy. Nothing unbounded ever accumulates.
- Missed policies: `expire` (default — silently closes), `carry_once` (rolls forward
  one period, then expires), `carry_reduced` (rolls forward at reduced value).

### 2. Four assignment modes — explicit enum on the template
1. `each` — one occurrence per assigned kid ("everyone makes their bed").
2. `any` — one shared occurrence; first completion closes it for all (free-for-all).
   Includes **soft claim**: kid taps "I'm on it", chore locks to them for N hours
   (default 2), auto-releases if not completed. Kills claim-sniping disputes.
3. `together` — one occurrence, multiple kids mark "I helped"; reward splits evenly
   (parent can adjust at approval).
4. `rotation` — one occurrence per period, assignee auto-alternates through an ordered
   kid list. Kid view shows "next up: you".

### 3. Single ledger for stars, money, and IOUs
One `ledger` table per family; every row is a signed entry with a type:
- chore payout (stars or cents), manual IOU credit, reward redemption (negative stars),
  cash payout (negative cents, marked when money physically changes hands).
- The old app's separate IOU section is **just manual ledger entries**; "mark paid" is
  a payout entry. Balances are always `SUM(amount)` — provably correct, fully auditable.

### 4. Approval loop
kid marks done → `pending_approval` → parent approves (batched, one tap) or bounces
back with a note → approval creates the ledger entry. `auto_approve` boolean per
template for trusted chores.

## Reward store
Per-kid or shared catalog of rewards with star prices. Redeeming = negative ledger
entry + `fulfillment_pending` flag so the parent remembers to deliver.

## Notifications
- Kid morning push: "You have 3 chores today." One evening nudge for incompletes. No more.
- Parent: single daily digest (done/pending/missed) + instant push only for approval
  requests and redemptions.

## Kid mode UX
- Profiles under one family account; avatar-picker login, optional PIN. No real credentials.
- Kid view = Today list (big checkboxes), balances (⭐ and $), reward store, streak. Nothing else.

## v1 scope
Templates + occurrence generator + 4 assignment modes + soft claim + ledger + approval
+ kid mode + parent dashboard. **v2:** reward store UI polish, streaks, family goal jar
(collective star pool → shared reward), avatar/theme unlocks, notification polish.

## Migration
Start fresh. One manual "starting balance" ledger entry per kid. Do not import old data.

## Risks / watch-outs
- The occurrence generator is the only tricky code. It must be **idempotent** (safe to
  re-run) and timezone-correct per family. See starter/schema.sql for the shape.
- Rotation math must be anchored to a fixed epoch date on the template, not "last run".
- All economy writes via RPC; kids' clients get zero direct write access to ledger.
