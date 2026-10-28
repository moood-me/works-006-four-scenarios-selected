// М2в «The Ledge» (П.5 «down», the shore at dawn, after the piece `down`: Grandmother at the edge of the rock): balance
// — lead anywhere, the arrow her body over the slippery rock (pushed side to side as she goes); a quiet ring on the
// ledge (`rock#ledge`), its arc of danger how far she leans. While she is kept upright she climbs down (`step` 0 → 1:
// from the edge to knee-deep on the ledge, the scene walking her at her own pace); leant too far — she slips (a
// mistake), catches herself; Sophia afraid for her. Down — the end (clean; flawed if she slipped); by the count it ends
// all the same (the scenario's way out by time), the rest of the way gone by herself. The piece after it: «You too!».
//   What she does: Grandmother climbs down the slippery rock into the cold water, to the child on the ledge.
//   What she wants: to be there with her — together.
//   How it is for her: the rock wet, the water cold, the legs old; going all the same.
//   What the player feels: keeping her balance, step by step.
//   → { slips }
import { clamp, keys, balance, settle, wobble, count } from './hands.js';

const KEEP = 5, SECONDS = 12, PUSH = 0.55;

export default {
  title: tr('The Ledge'),
  about: 9,
  skipped: { slips: 0 },
  points: ['rock#ledge'],
  keys: ['step'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Slippery rock, cold water, and the ledge under it.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('step', 1));
    send('step', 0);
    let down = 0;
    const r = await balance(g, b, mg, { at: 'rock#ledge', seconds: SECONDS, keep: KEEP, push: t => wobble(t, PUSH, 0.4),
      frame: ({ in: kept, t, dt }) => { if (kept && t > 0) down = clamp(down + dt / KEEP); send('step', down); },
      slip: () => g.mood('sophia', 'afraid') });
    if (!r) return this.skipped;
    if (down < 1) g.set('step', 1, 1.5 * (1 - down));
    g.mood('sophia', 'laugh');
    if (!(await count(mg, 0.6))) return this.skipped;
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return { slips: r.slips };
  },
};
