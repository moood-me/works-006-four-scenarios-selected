// М2б «The Shoulder» (П.5 «go», the shore at dawn, after «Go on. I'm watching», the piece `shoulder` ending in its pose:
// Grandmother's hand on Sophia's shoulder): hold, then let go — a groove on the shoulder (`sophia#shoulder_r`): held
// till full, the hand rests there; then Sophia leans on toward the ledge (`let` a little — the shoulder going from under
// the hand; the plate says so) and the arc of time runs: lifted — the hand opens, she goes (`let` 1; clean); not lifted
// in WAIT s — Sophia shakes the hand off herself (held long, neutral). The piece after it: she steps onto the ledge and
// slips in.
//   What she does: Grandmother takes her hand off the child's shoulder.
//   What she wants: to let her go and see the bottom by herself — «I'm watching».
//   How it is for her: allowing; afraid and not showing it.
//   What the player feels: opening the hand.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';

const WAIT = 5;

export default {
  title: tr('The Shoulder'),
  about: 6,
  skipped: { long: false },
  points: ['sophia#shoulder_r'],
  keys: ['let'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Under the clear water a ledge, and the girl’s shoulder under an old hand.') });
    const over = settle(signal, () => g.set('let', 1));
    g.set('let', 0);
    const how = await letGo(g, b, mg, { at: 'sophia#shoulder_r', take: 1.2, wait: WAIT, sign: () => {
      g.set('let', 0.3, 0.6);
      mg.plate.set({ phrase: tr('The shoulder stirs under the hand: the ledge is so near.') });
    } });
    if (!how) return this.skipped;
    if (how === 'long') g.mood('sophia', 'angry');
    g.set('let', 1, how === 'let' ? 0.8 : 0.3);
    if (!(await count(mg, 0.8))) return this.skipped;
    over();
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
