// М1б «Letting Her Go» (П.4, the stone, after the piece `in_net` and his word: she in his net off the bow, struggling;
// his hand on the knot by hers): hold, then let go — a groove on the knot (`net_over#knot`): held till full, the knot
// loosening under his fingers (`knot`); then she grows still (her face quiet; the plate says so) and the arc of time
// runs: lifted — he lets her go (clean); not lifted in WAIT s — the knot slides by itself and she slips out without
// looking at him (held long, neutral).
//   What he does: the Fisherman unties the net round the little Mermaid.
//   What he wants: to let her go without hurting her — and to keep her a moment longer.
//   How it is for him: he cannot look away from her.
//   What the player feels: opening the hand at the right moment.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';

const WAIT = 5;

export default {
  title: tr('Letting Her Go'),
  about: 5,
  skipped: { long: false },
  missed: { long: true },
  points: ['net_over#knot'],
  keys: ['knot'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A knot of the net, and a small hand caught in it.') });
    const over = settle(signal, () => { g.set('knot', 1); g.set('mermaid_mood', 'neutral'); });
    g.set('knot', 0);
    g.set('mermaid_mood', 'afraid');
    const how = await letGo(g, b, mg, { at: 'net_over#knot', take: 1.2, wait: WAIT,
      held: u => g.set('knot', 0.6 * u),
      sign: () => { g.set('mermaid_mood', 'neutral'); mg.plate.set({ phrase: tr('She has grown still.') }); } });
    if (!how) return this.skipped;
    g.set('knot', 1, 0.4);
    if (!(await count(mg, 0.6))) return this.skipped;
    over();
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
