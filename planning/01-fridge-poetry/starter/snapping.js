/**
 * Fridge Poetry — snapping + phrase-graph math (source of truth for T1 + T2).
 * Pure functions; used client-side for preview and mirrored server-side (port the
 * constants + adjacency rule into the magnet.snap reducer's validation).
 *
 * Model: magnets snap horizontally into chains (left/right of a target). A phrase is
 * the connected component of the snap graph. Vertical stacking of chains is layout,
 * not structure — line breaks are just chains placed near each other.
 */

export const MAGNET_H = 34;          // px at zoom 1 — fixed tile height
export const CHAR_W = 11;            // approx width per character + padding
export const SNAP_RADIUS = 26;       // max px between edges to trigger a snap
export const GAP = 3;                // visual gap between snapped magnets

export const magnetWidth = (word) => Math.max(2, word.length) * CHAR_W + 14;

/**
 * Given a dragged magnet's drop position and nearby magnets (same fridge, not locked,
 * not stashed, not held by someone else), return the best snap candidate or null.
 * `magnets`: [{id, word, x, y, snapped_to, snap_side, phrase_locked}]
 */
export function findSnapCandidate(drop, magnets) {
  let best = null;
  for (const m of magnets) {
    if (m.id === drop.id || m.phrase_locked) continue;
    const mW = magnetWidth(m.word);
    const dW = magnetWidth(drop.word);
    // candidate slots: right edge of m, left edge of m
    const slots = [
      { side: 'right', x: m.x + mW + GAP, y: m.y },
      { side: 'left',  x: m.x - GAP - dW, y: m.y },
    ];
    for (const s of slots) {
      const dx = Math.abs(drop.x - s.x);
      const dy = Math.abs(drop.y - s.y);
      if (dx > SNAP_RADIUS || dy > SNAP_RADIUS) continue;
      const dist = Math.hypot(dx, dy);
      if (!best || dist < best.dist) best = { targetId: m.id, side: s.side, x: s.x, y: s.y, dist };
    }
  }
  return best; // null = free placement at drop.x/drop.y
}

/** Server-side validation rule for magnet.snap (mirror in SQL/Edge reducer):
 *  - target exists, same fridge, not locked/stashed.
 *  - the slot is FREE: no other magnet already has (snapped_to = target, snap_side = side).
 *  - re-check the drop position is within SNAP_RADIUS of the slot (client can't lie).
 *  - after linking, walk the chain to a bounded depth (e.g. 64) — a cycle or
 *    over-length chain rejects the op.
 */

/** Connected component = phrase membership. Union after snap, split after unsnap. */
export function phraseMembers(magnetId, byId) {
  const seen = new Set();
  const stack = [magnetId];
  while (stack.length) {
    const id = stack.pop();
    if (seen.has(id)) continue;
    seen.add(id);
    const m = byId.get(id);
    if (m?.snapped_to && !seen.has(m.snapped_to)) stack.push(m.snapped_to);
    for (const other of byId.values())
      if (other.snapped_to === id && !seen.has(other.id)) stack.push(other.id);
  }
  return seen;
}

/** Reading order for text_cached: sort chain members left-to-right per line
 *  (group by rounded y within MAGNET_H, then x asc), lines top-to-bottom. */
export function phraseText(memberIds, byId) {
  const ms = [...memberIds].map((id) => byId.get(id));
  const lines = new Map();
  for (const m of ms) {
    const line = Math.round(m.y / (MAGNET_H * 1.2));
    if (!lines.has(line)) lines.set(line, []);
    lines.get(line).push(m);
  }
  return [...lines.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, arr]) => arr.sort((a, b) => a.x - b.x).map((m) => m.word).join(' '))
    .join(' / ');
}
