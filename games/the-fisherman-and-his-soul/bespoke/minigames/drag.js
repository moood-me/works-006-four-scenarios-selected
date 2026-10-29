// М8б «The Net, Up the Shore» (4.8 «вытянуть её от воды», the shore, after the piece `wrap`: her body wrapped in his net
// on the sand, the wave coming): pull slowly — a dashed ring on the net's rope (`bundle#rope`); each slow pull draws her
// a length up the shore, him backing before her (`drag` 0 → 1), the sea following (`wave`). Too fast — it jerks: the net
// tears wider (`net_hole` 2) and the wave reaches his knees (`wave` up; a mistake); he draws her out all the same. All
// the way up — the end (clean; flawed if it tore).
//   What he does: the Fisherman drags her body out of the sea's reach.
//   What he wants: not to give her to the foam — to lay her in the earth and remember.
//   How it is for him: the net that caught her in the prologue; the wave at his back.
//   What the player feels: a slow, heavy pull away from the water.
//   → { torn }
import { keys, settle, slowly, count } from './hands.js';

const KNEES = 0.6;

export default {
  title: tr('The Net, Up the Shore'),
  about: 12,
  skipped: { torn: false },
  missed: { torn: true },
  points: ['bundle#rope'],
  keys: ['drag', 'wave', 'net_hole'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('His net with her in it, the sand, and the sea behind.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('drag', 1); g.set('wave', 0.3, 1); });
    send('drag', 0);
    let torn = false;
    const r = await slowly(g, b, mg, { at: 'bundle#rope', pulls: 4,
      frame: u => send('drag', u),
      jerk: () => {
        g.set('wave', KNEES, 0.6);
        if (!torn) { torn = true; g.set('net_hole', 2); mg.plate.set({ phrase: tr('The net tears wider; the wave is at his knees.') }); }
      } });
    if (!r) return this.skipped;
    g.set('wave', 0.3, 1.5);
    if (!(await count(mg, 0.6))) return this.skipped;
    over();
    await mg.end({ as: r.self ? 'neutral' : torn ? 'flawed' : 'clean' });
    return { torn };
  },
};
