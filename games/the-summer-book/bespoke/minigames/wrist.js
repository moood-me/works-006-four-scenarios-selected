// М2а «The Wrist» (П.5 «hold», the shore at dawn, after the piece `wrist`: Sophia leaning out over the water,
// Grandmother's hand on her wrist): hold, by its count — a groove on Sophia's hand (`sophia#hand_l`); from the first
// touch SECONDS of her looking at the bottom while she tugs to be free, harder each time (`pull` — her hand drawn back
// from the hold). Let go — she sways out over the water (`pull` far out; a mistake), and the hand takes her again (the
// groove filled again: `pull` back). The count out — the end (clean; flawed if she was let go); the piece after it:
// «Let go!», she jerks free.
//   What she does: Grandmother holds the child by the wrist while she leans out over the deep water.
//   What she wants: not to give her up to the water — and not to spoil her looking.
//   How it is for her: fear held in the hand; the child pulling against it.
//   What the player feels: holding on while the small hand tugs.
//   → { slips: times she was let go }
import { clamp, keys, keep, settle } from './hands.js';

const SECONDS = 7, TUGS = [1.5, 3.6, 5.6], TUG = 0.7; // s from the first touch; each tug this long

export default {
  title: tr('The Wrist'),
  about: 9,
  skipped: { slips: 0 },
  points: ['sophia#hand_l'],
  keys: ['pull'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Sophia leans out over the water, and the ledge goes down into the dark.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('pull', 0, 0.4));
    send('pull', 0);
    let out = 0; // how far she swayed, let go (going back as the hand has her again)
    const r = await keep(g, b, mg, { at: 'sophia#hand_l', seconds: SECONDS, take: 0.6,
      frame: ({ u, held, t, dt, on }) => {
        if (!on) return;
        if (held) out = Math.max(0, out - 1.5 * dt);
        // the tugs: each a little harder than the one before
        const k = TUGS.findIndex(at => t >= at && t < at + TUG);
        const tug = k < 0 ? 0 : (0.2 + 0.1 * k) * Math.sin((Math.PI * (t - TUGS[k])) / TUG);
        send('pull', clamp(held ? Math.max(tug, out) : Math.max(out, 1 - u)));
      },
      slip: () => { out = 0.9; g.mood('sophia', 'surprised'); } });
    if (!r) return this.skipped;
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
