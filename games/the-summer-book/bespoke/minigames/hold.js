// М11 «Sophia's Hand» (the finale «The Tent», the big boat on the last morning, after the piece `come_over` or
// `hand_in_hand`: the two of them hand in hand on the thwart, the island going into the white): hold, by its count — a
// groove on Sophia's hand (`sophia#hand_r`): from the first touch SECONDS of holding it till the island is gone. Let go
// — a mistake (held again, it is held again); the scenario gives it no colour of its own. The count out — the end
// (clean; flawed if let go); the piece after it: the island goes on into the white, Grandmother sits with her eyes
// closed, smiling. It moves nothing of the scene.
//   What she does: Grandmother holds Sophia's hand as the island goes.
//   What she wants: to be with her to the end of the island — together.
//   How it is for her: the motor, the fog, the tent left on the cape; content.
//   What the player feels: holding a small hand, to the end.
//   → { slips }
import { keep } from './hands.js';

const SECONDS = 8;

export default {
  title: tr('Sophia’s Hand'),
  about: 10,
  skipped: { slips: 0 },
  points: ['sophia#hand_r'],
  keys: [],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A small hand, and the island going into the white.') });
    const r = await keep(g, b, mg, { at: 'sophia#hand_r', seconds: SECONDS, take: 0.8 });
    if (!r) return this.skipped;
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
