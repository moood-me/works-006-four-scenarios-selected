// М3в «The Net» (1.5 «net», the shore in the evening, after the piece `net`: Grandmother has taken up the other end of
// Papa's net), in the insert `knot` (closeups: the tarred mesh, a hard knot, her fingers at the thread — opened by
// `knot_open`): pull slowly — a dashed ring on the thread's end (`knot#thread`); each slow pull draws a length out of the
// knot (`knot` +1/3, the tangle loosening). Too fast — it jerks, the knot draws tighter again (a mistake; that pull
// spent: let go, and draw again). All of it out — the knot is loose: the insert closes, the end (clean; flawed if it
// jerked); the piece after it: they untangle it together, without a word.
//   What she does: Grandmother sits by her son and untangles a knot in his net.
//   What she wants: to be beside him — instead of the answer he asked for.
//   How it is for her: quiet; his question in the air; her hands busy.
//   What the player feels: a slow pull, a thread at a time, side by side without words.
//   → { jerks }
import { keys, settle, slowly, count } from './hands.js';

export default {
  title: tr('The Net'),
  about: 9,
  skipped: { jerks: 0 },
  points: ['knot#thread'],
  keys: ['knot_open', 'knot'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A net pulled into a knot, and two pairs of hands.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('knot_open', 0, 0.4); g.set('knot', 1); });
    send('knot', 0);
    g.set('knot_open', 1, 0.4);
    const r = await slowly(g, b, mg, { at: 'knot#thread', pulls: 3, frame: u => send('knot', u) });
    if (!r) return this.skipped;
    if (!(await count(mg, 0.8))) return this.skipped;
    g.set('knot_open', 0, 0.4);
    over();
    await mg.end({ as: r.self ? 'neutral' : r.jerks ? 'flawed' : 'clean' });
    return { jerks: r.jerks };
  },
};
