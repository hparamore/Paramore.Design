/**
 * Flare — Module Contract (v1, FROZEN before Wave 2)
 *
 * A module is: a state schema, a set of operations (the only way state changes),
 * and a renderer. Reducers run server-side (authoritative) AND client-side
 * (optimistic preview); they must be pure, deterministic, and side-effect free.
 * Effects (sounds, TTS, vibration) are declared, not performed, by reducers.
 */

export interface ModuleDefinition<S, C, O extends OpMap> {
  type: string;                    // 'counter', 'signals', ...
  title: string;
  configSchema: JSONSchema;        // validated at placement/config time
  defaultConfig: C;
  initialState: (config: C) => S;

  ops: {
    [K in keyof O]: {
      /** who may emit this op: 'operators' respects instance.operators;
       *  'self' is always allowed but may only affect the sender's own slice
       *  (e.g. ready_check.set_ready, status_grid.set_status). */
      permission: 'operators' | 'self' | 'owner';
      payloadSchema: JSONSchema;
      /** drop the op (never apply) if now - createdAtClient exceeds this. */
      expiresAfterMs?: number;
    }
  };

  /** Pure. Throw OpRejected(reason) to refuse (server returns it; client rolls back). */
  reduce: (state: S, op: Op<O>, ctx: OpContext) => S;

  /** Declarative effects derived from an applied op, run on RECEIVING clients. */
  effects?: (op: Op<O>, newState: S, ctx: OpContext) => Effect[];

  /** Renderer + config panel are client components keyed by `type` in the registry. */
}

export interface Op<O extends OpMap = OpMap> {
  instanceId: string;
  opType: keyof O & string;        // namespaced on the wire: `${module.type}.${opType}`
  payload: unknown;
  senderId: string;
  clientId: string;                // device identity (attribution)
  clientOpId: string;              // uuid; dedup key for offline at-least-once replay
  createdAtClient: string;         // ISO — when the human acted (offline honesty)
  seq?: number;                    // assigned server-side on apply
}

export interface OpContext {
  boardMembers: { userId: string; display: string }[];
  config: unknown;                 // this instance's config (typed per module)
  now: string;                     // server time on authoritative apply; est. on client
}

export type Effect =
  | { kind: 'sound'; name: 'go' | 'chime' | 'alert' | 'tick' }
  | { kind: 'speak'; text: string }                    // TTS announcement
  | { kind: 'vibrate'; pattern: number[] }
  | { kind: 'flash'; color: string; durationMs: number }
  | { kind: 'track_acks' };                            // create op_acks rows (Signals)

export class OpRejected extends Error { constructor(public reason: string) { super(reason); } }

type OpMap = Record<string, unknown>;
type JSONSchema = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* Reference implementation: Counter                                   */
/* Wave-2 agents: copy this shape exactly for your module.             */
/* ------------------------------------------------------------------ */

interface CounterConfig { label: string; capacity: number | null; step: number; allowNegative: boolean; }
interface CounterState  { count: number; }
type CounterOps = { increment: {}; decrement: {}; reset: {}; };

export const CounterModule: ModuleDefinition<CounterState, CounterConfig, CounterOps> = {
  type: 'counter',
  title: 'Counter',
  configSchema: {
    type: 'object',
    properties: {
      label:         { type: 'string', maxLength: 40 },
      capacity:      { type: ['integer', 'null'], minimum: 1 },
      step:          { type: 'integer', minimum: 1, default: 1 },
      allowNegative: { type: 'boolean', default: false },
    },
  },
  defaultConfig: { label: 'Count', capacity: null, step: 1, allowNegative: false },
  initialState: () => ({ count: 0 }),

  ops: {
    increment: { permission: 'operators', payloadSchema: {} },
    decrement: { permission: 'operators', payloadSchema: {} },
    reset:     { permission: 'owner',     payloadSchema: {} },
  },

  reduce(state, op, ctx) {
    const cfg = ctx.config as CounterConfig;
    switch (op.opType) {
      case 'increment': return { count: state.count + cfg.step };
      case 'decrement': {
        const next = state.count - cfg.step;
        if (next < 0 && !cfg.allowNegative) throw new OpRejected('count cannot go below zero');
        return { count: next };
      }
      case 'reset': return { count: 0 };
      default: throw new OpRejected(`unknown op ${op.opType}`);
    }
  },

  effects(op, newState, ctx) {
    const cfg = ctx.config as CounterConfig;
    if (cfg.capacity && newState.count >= cfg.capacity && op.opType === 'increment') {
      return [{ kind: 'sound', name: 'alert' }, { kind: 'speak', text: `${cfg.label} at capacity` }];
    }
    return [];
  },
};

/* Renderer notes (client, per module):
 *  - subscribe via engine.useInstance(instanceId) -> { state, submit, pending, oplog }
 *  - submit() applies the reducer optimistically and queues offline; the engine
 *    reconciles against authoritative broadcasts by seq (drop local preview on match,
 *    re-reduce queued ops on divergence).
 *  - Threshold coloring for counter: <80% cap green, 80–99% yellow, >=100% red.
 */
