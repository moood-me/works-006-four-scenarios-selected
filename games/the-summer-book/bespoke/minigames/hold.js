// М11 «Sophia's Hand» (the finale «The Tent», the big boat on the last morning, after the piece `come_over` or
// `hand_in_hand`: the two of them hand in hand on the thwart, the island going into the white): hold, by its count — a
// groove on Sophia's hand (`sophia#hand_r`): from the first touch SECONDS of holding it till the island is gone. Let go
// — a mistake (held again, it is held again); the scenario gives it no colour of its own. The count out — the end
// (clean; flawed if let go); the piece after it: the island goes on into the white, Grandmother sits with her eyes
// closed, smiling. While it is held the island goes away (`island`, to AWAY by the count's end).
//   What she does: Grandmother holds Sophia's hand as the island goes.
//   What she wants: to be with her to the end of the island — together.
//   How it is for her: the motor, the fog, the tent left on the cape; content.
//   What the player feels: holding a small hand, to the end.
//   → { slips }
import { keep, keys, settle } from './hands.js';

const SECONDS = 8, AWAY = 0.55; // (the island's `island` at the count's end, held all through)

export default {
  title: tr('Sophia’s Hand'),
  about: 10,
  skipped: { slips: 0 },
  points: ['sophia#hand_r'],
  keys: ['island'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A small hand, and the island going into the white.') });
    const send = keys(g);
    const from = g.get('island') ?? 0.35;
    const over = settle(signal, () => g.set('island', AWAY, 1.5));
    let away = from;
    const r = await keep(g, b, mg, { at: 'sophia#hand_r', seconds: SECONDS, take: 0.8,
      frame: ({ held, dt }) => { if (held) send('island', (away = Math.min(AWAY, away + dt * (AWAY - from) / SECONDS))); } });
    if (!r) return this.skipped;
    if (away < AWAY) g.set('island', AWAY, 1.5);
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
