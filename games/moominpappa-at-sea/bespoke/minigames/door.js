// М6а «The Door» (3.1, the landing, the morning of the 24th, after the piece `pines`: Papa leaning on the door, the
// pines at the threshold): pull slowly — a dashed ring on the door (`door#door`); each slow pull (a tear of TEAR of the
// frame's height) opens it a palm's width (`door` +1/PULLS, moving with the finger, kept when it lets go). Too hard
// (faster than FAST a second) — it bangs into a pine and swings back (`door` back by BACK; a mistake: jerked), My roars
// with laughter; that pull is spent. Open (`door` 1) — the end (clean; flawed if it banged); the piece after it: the
// rime's trail on the threshold.
//   What he does: Papa leans on the lighthouse door against the pines that crept up to it overnight.
//   What he wants: to open it — trees don't walk.
//   How it is for him: stubbornness; a little fear he does not show.
//   What the player feels: pressing, a palm's width at a time, not forcing it.
//   → { bangs }
import { clamp, until, keys, teach, settle, pace } from './hands.js';

const PULLS = 4, TEAR = 0.1;
const FAST = 1.8; // tears a second
const BACK = 0.1;

export default {
  title: tr('The Door'),
  about: 8,
  skipped: { bangs: 0 },
  points: ['door#door'],
  keys: ['door'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Pines against the door.') });
    const send = keys(g);
    settle(signal, () => g.set('door', 1, 0.5));
    send('door', 0);
    mg.plate.set({ notches: Array.from({ length: PULLS - 1 }, (_, i) => (i + 1) / PULLS) });
    const leaf = mg.mark({ at: 'door#door', kind: 'dash' });
    const pull = mg.pull({ on: leaf, tear: TEAR });
    teach(b, mg, [pull]);
    let open = 0, spent = false, bangs = 0;
    const speed = pace();
    pull.on('tear', () => { if (!spent) { open += 1 / PULLS; spent = true; g.sound.creak(); } });
    pull.on('up', () => { spent = false; speed.reset(); });
    const done = await until(mg, ({ dt }) => {
      const s = pull.state;
      if (s.held && !spent && speed.at(s.u, dt) > FAST) {
        spent = true;
        bangs++;
        open = Math.max(0, open - BACK);
        g.failed();
        mg.error('jerk', { at: leaf });
        g.sound.door();
        g.mood('my', 'laugh');
      }
      const door = clamp(open + (s.held && !spent ? Math.min(s.u, 0.99) / PULLS : 0));
      send('door', door);
      mg.plate.set({ fill: door, glow: spent && s.held ? 'bad' : s.held ? 'good' : 'idle' });
      return open >= 1 - 1e-6;
    });
    if (!done) return this.skipped;
    send('door', 1);
    mg.snap({ at: leaf });
    await mg.end({ as: bangs ? 'flawed' : 'clean' });
    return { bangs };
  },
};
