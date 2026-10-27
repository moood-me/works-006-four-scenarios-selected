// М6в «Dust» (Ш2 «wait», the round room, noon to dusk, after the piece `w_wait`: Papa on the floor by the wall, the
// lowest line under dust): pull slowly — a dashed ring on the line (`wall_a#line27`); each slow pull (a tear of TEAR of
// the frame's height) wipes a stretch of it (`wipe` +1/PULLS, moving with the finger, kept when it lets go). Too hard
// (faster than FAST a second) — the dust goes up in a cloud, Papa sneezes (a mistake: jerked); that pull is spent. All of
// it wiped (`wipe` 1) — the end (clean; flawed if it clouded). The line under it is the scene's (the piece after it).
//   What he does: Papa, sitting on the floor while he waits for Mama, wipes the dust off the lowest line with his paw.
//   What he wants: to wait — and to keep his paws busy while he does.
//   How it is for him: patience that is hard for him; idle, he finds something to do.
//   What the player feels: a slow paw along a line, waiting.
//   → { clouds }
import { clamp, until, keys, teach, settle, pace } from './hands.js';

const PULLS = 3, TEAR = 0.12;
const FAST = 1.6; // tears a second

export default {
  title: tr('Dust'),
  about: 9,
  skipped: { clouds: 0 },
  points: ['wall_a#line27'],
  keys: ['wipe', 'dust_cloud'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Dust by the floor, and a line under it.') });
    const send = keys(g);
    settle(signal, () => g.set('wipe', 1, 0.5));
    send('wipe', 0);
    mg.plate.set({ notches: Array.from({ length: PULLS - 1 }, (_, i) => (i + 1) / PULLS) });
    const line = mg.mark({ at: 'wall_a#line27', kind: 'dash' });
    const pull = mg.pull({ on: line, tear: TEAR });
    teach(b, mg, [pull]);
    let wiped = 0, spent = false, clouds = 0;
    const speed = pace();
    pull.on('tear', () => { if (!spent) { wiped += 1 / PULLS; spent = true; } });
    pull.on('up', () => { spent = false; speed.reset(); });
    const done = await until(mg, ({ dt }) => {
      const s = pull.state;
      if (s.held && !spent && speed.at(s.u, dt) > FAST) {
        spent = true;
        clouds++;
        g.set('dust_cloud', (g.get('dust_cloud') ?? 0) + 1);
        g.failed();
        mg.error('jerk', { at: line });
        g.mood('papa', 'surprised');
      }
      const wipe = clamp(wiped + (s.held && !spent ? Math.min(s.u, 0.99) / PULLS : 0));
      send('wipe', wipe);
      mg.plate.set({ fill: wipe, glow: spent && s.held ? 'bad' : s.held ? 'good' : 'idle' });
      return wiped >= 1 - 1e-6;
    });
    if (!done) return this.skipped;
    send('wipe', 1);
    mg.snap({ at: line });
    await mg.end({ as: clouds ? 'flawed' : 'clean' });
    return { clouds };
  },
};
