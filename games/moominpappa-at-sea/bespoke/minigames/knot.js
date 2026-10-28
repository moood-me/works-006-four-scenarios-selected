// М4в «The Knot» (2.4 «the Fisherman», the cape, after the piece `net_sit` or `net_left`: Papa's paws at the knot in
// the Fisherman's net), in the insert `knot` (the people package's closeups shot: the tarred net close, the hard knot,
// Papa's two paws — opened by `knot_open`): pull slowly — a dashed ring on the thread's end (`knot#thread`, it moves
// out as the thread comes); each slow pull (a tear of TEAR of the frame's height) draws a length out of the knot (`knot`
// +1/PULLS, moving with the finger, kept when it lets go). Too fast (faster than FAST a second) — it jerks, the knot
// draws tight again (`knot` back by BACK; a mistake: jerked) and that pull is spent: let go, and draw again. All of it
// out (`knot` 1) — the knot is loose, the insert closes: the end (clean; flawed if it jerked).
//   What he does: Papa sits by the Fisherman and slowly undoes the knot in his net.
//   What he wants: to be beside him without words — and to be of use to him.
//   How it is for him: quiet; patient; the Fisherman does not look at him.
//   What the player feels: a slow pull, a thread at a time, silently, beside him.
//   → { jerks }
import { clamp, until, keys, teach, settle, count, pace } from './hands.js';

const PULLS = 3, TEAR = 0.1;
const FAST = 1.8; // tears a second: faster — it jerks
const BACK = 0.12;

export default {
  title: tr('The Knot'),
  about: 9,
  skipped: { jerks: 0 },
  points: ['knot#thread'],
  keys: ['knot_open', 'knot'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A net pulled into a knot.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('knot_open', 0, 0.4); g.set('knot', 1); });
    send('knot', 0);
    g.set('knot_open', 1, 0.4);
    mg.plate.set({ notches: Array.from({ length: PULLS - 1 }, (_, i) => (i + 1) / PULLS) });
    const end = mg.mark({ at: 'knot#thread', kind: 'dash' });
    const pull = mg.pull({ on: end, tear: TEAR });
    teach(b, mg, [pull]);
    // drawn: the lengths out, whole (with what jerked back); this pull's own: spent (torn, or jerked)
    let drawn = 0, spent = false, jerks = 0;
    const speed = pace();
    pull.on('tear', () => { if (!spent) { drawn += 1 / PULLS; spent = true; g.sound.rustle(); } });
    pull.on('up', () => { spent = false; speed.reset(); });
    const done = await until(mg, ({ dt }) => {
      const s = pull.state;
      if (s.held && !spent && speed.at(s.u, dt) > FAST) {
        spent = true;
        jerks++;
        drawn = Math.max(0, drawn - BACK);
        g.failed();
        mg.error('jerk', { at: end });
      }
      const knot = clamp(drawn + (s.held && !spent ? Math.min(s.u, 0.99) / PULLS : 0));
      send('knot', knot);
      mg.plate.set({ fill: knot, glow: spent && s.held ? 'bad' : s.held ? 'good' : 'idle' });
      return drawn >= 1 - 1e-6;
    });
    if (!done) return this.skipped;
    send('knot', 1);
    mg.snap({ at: end });
    if (!(await count(mg, 0.8))) return this.skipped;
    g.set('knot_open', 0, 0.4);
    over();
    await mg.end({ as: jerks ? 'flawed' : 'clean' });
    return { jerks };
  },
};
