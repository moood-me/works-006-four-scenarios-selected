// М11 «The Oars» (the finale «The Oars», the shore on the last morning, after the piece `dinghy_board`: Sophia at the
// oars of the dinghy, Grandmother's hands over hers), in the insert `oars` (closeups: the oars' handles, Sophia's small
// hands on them, Grandmother's old hands over hers — opened by `oars_open`): hold, then let go — a groove on the hands
// (`oars#hands`): held till full, her hands lie over Sophia's; then Sophia leans on the oars (`oars_let` a little —
// the old hands loosening; the plate says so) and the arc of time runs: lifted — her hands lift off and away
// (`oars_let` 1); not lifted in WAIT s — they open by themselves, a long breath later (the scenario: no colour of its
// own). The insert closes: the end (neutral); the piece after it (`oars_after`) takes the dinghy out — crooked, then
// straight, to the big boat.
//   What she does: Grandmother takes her hands off Sophia's on the oars and lets her row.
//   What she wants: to let her take her there — by herself, a hundred strokes.
//   How it is for her: sitting in the stern, carried; the child at the oars.
//   What the player feels: opening the hands.
//   → {}
import { letGo, settle, count } from './hands.js';

const WAIT = 5;

export default {
  title: tr('The Oars'),
  about: 7,
  skipped: {},
  points: ['oars#hands'],
  keys: ['oars_open', 'oars_let'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Two pairs of hands on the oars, and a hundred strokes to the boat.') });
    const over = settle(signal, () => { g.set('oars_open', 0, 0.4); g.set('oars_let', 1); });
    g.set('oars_let', 0);
    g.set('oars_open', 1, 0.4);
    const how = await letGo(g, b, mg, { at: 'oars#hands', take: 1.2, wait: WAIT, sign: () => {
      g.set('oars_let', 0.1, 0.8);
      mg.plate.set({ phrase: tr('Sophia leans on the oars under the old hands.') });
    } });
    if (!how) return this.skipped;
    g.set('oars_let', 1, how === 'let' ? 0.8 : 1.4);
    if (!(await count(mg, 1.2))) return this.skipped;
    g.set('oars_open', 0, 0.4);
    over();
    await mg.end({ as: 'neutral' });
    return {};
  },
};
