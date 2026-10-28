// М5а «The Palm» (Ш1 «gone», the room by the full moon, the piece `gone` ending in its pose: Sophia crying on her own bed
// with her back to Grandmother, Grandmother on the edge of hers, very near), in the insert `gap` (closeups: the narrow
// gap between the beds by moonlight, Grandmother's old hand lying open on the blanket — opened by `gap_open`): hold, by
// its count — a groove on her palm (`gap#palm`): from the first touch SECONDS of keeping it there, open, not reaching
// out (`gap_palm` — her palm on the blanket; let go — it is taken away, a mistake: held again, it lies there again).
// The count out — the insert closes, the end (clean; flawed if the palm was taken away — Sophia then comes over not at
// once); the piece after it: Sophia comes over by herself and goes quiet.
//   What she does: Grandmother lays her palm on the blanket between the two beds and leaves it there.
//   What she wants: to be near — she cannot hug.
//   How it is for her: the truth said («No»); the child crying; nothing to add.
//   What the player feels: keeping the hand there, open, and waiting.
//   → { slips: times the palm was taken away }
import { keys, keep, settle } from './hands.js';

const SECONDS = 8;

export default {
  title: tr('The Palm'),
  about: 10,
  skipped: { slips: 0 },
  points: ['gap#palm'],
  keys: ['gap_open', 'gap_palm', 'gap_hand'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Two beds side by side, and a gap of a blanket between them.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('gap_open', 0, 0.4); g.set('gap_palm', 1); });
    g.set('gap_palm', 1);
    g.set('gap_hand', 0);
    g.set('gap_open', 1, 0.4);
    const r = await keep(g, b, mg, { at: 'gap#palm', seconds: SECONDS, take: 0.8,
      frame: ({ u, on }) => send('gap_palm', on ? u : 1) });
    if (!r) return this.skipped;
    send('gap_palm', 1);
    g.set('gap_open', 0, 0.6);
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
