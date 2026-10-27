// М11 «The Mooring» (the finale «A Boat to the Valley», the landing, after the piece `leave`: Papa crouched at the
// mooring), in the insert `mooring` (the people package's closeups shot: the rope round the iron ring in the rock, Papa's
// paw holding its end — opened by `mooring_open`): hold, then let go — a groove on the rope's end (`mooring#rope`):
// held till full, the paw has it; then the arc of time: lifted — the paw opens and the rope slips off the ring into the
// water (`mooring` 0 → 1; clean); not lifted in WAIT s — it slips by itself (held long, neutral). The insert closes; the
// piece after it: the boat slides off.
//   What he does: Papa lets go of the mooring line — the family sails home.
//   What he wants: to keep his word; to take them home.
//   How it is for him: the island let go; the lighthouse dark behind.
//   What the player feels: opening the paw.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';

export default {
  title: tr('The Mooring'),
  about: 6,
  skipped: { long: false },
  points: ['mooring#rope'],
  keys: ['mooring_open', 'mooring'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A mooring line, and a quiet sea.') });
    settle(signal, () => { g.set('mooring_open', 0, 0.4); g.set('mooring', 1); });
    g.set('mooring', 0);
    g.set('mooring_open', 1, 0.4);
    const how = await letGo(g, b, mg, { at: 'mooring#rope', take: 1.2, wait: 5 });
    if (!how) return this.skipped;
    g.set('mooring', 1, 1.2);
    g.sound.splash(0.3);
    if (!(await count(mg, 1.4))) return this.skipped;
    g.set('mooring_open', 0, 0.4);
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
