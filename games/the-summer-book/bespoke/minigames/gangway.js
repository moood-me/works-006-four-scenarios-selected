// М11 «The Gangway» (the finale «The Window», the shore on the last morning, the fog, after the piece `elbow` or `catch`:
// Grandmother at the gangway, her hand on its rail, the big boat waiting), in the insert `rail` (closeups: the
// gangway's wooden rail in the fog, her hand on it — opened by `rail_open`): hold, then let go — a groove on her hand
// (`rail#hand`): held till full, the hand rests on the rail; then the boat waits (the plate says so; `rail_let` a
// little — the fingers loosen) and the arc of time runs: lifted — the hand opens and leaves the rail, the last time
// (`rail_let` 1); not lifted in WAIT s — it opens by itself, a long breath later (the scenario: no colour of its own).
// The insert closes: the end (neutral); the game goes on to the boat.
//   What she does: Grandmother lets go of the gangway rail and goes aboard, leaving the island.
//   What she wants: to go to town for the winter, as was decided — the window is hers no more.
//   How it is for her: the last morning; the island in the fog behind her.
//   What the player feels: opening the hand, the last time.
//   → {}
import { letGo, settle, count } from './hands.js';

const WAIT = 5;

export default {
  title: tr('The Gangway'),
  about: 7,
  skipped: {},
  points: ['rail#hand'],
  keys: ['rail_open', 'rail_let'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('The gangway rail, and the boat waiting.') });
    const over = settle(signal, () => { g.set('rail_open', 0, 0.4); g.set('rail_let', 1); });
    g.set('rail_let', 0);
    g.set('rail_open', 1, 0.4);
    const how = await letGo(g, b, mg, { at: 'rail#hand', take: 1.2, wait: WAIT, sign: () => {
      g.set('rail_let', 0.15, 0.8);
      mg.plate.set({ phrase: tr('The boat waits at the gangway.') });
    } });
    if (!how) return this.skipped;
    g.set('rail_let', 1, 1);
    if (!(await count(mg, 1.2))) return this.skipped;
    g.set('rail_open', 0, 0.4);
    over();
    await mg.end({ as: 'neutral' });
    return {};
  },
};
