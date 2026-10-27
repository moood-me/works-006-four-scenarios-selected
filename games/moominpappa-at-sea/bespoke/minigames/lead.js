// М4а «The Lead» (2.4 «the pool», the middle of the island, after the piece `sound_ready`: Papa at the pool's lip
// holding the rope with its weight): pull, and again — a dashed ring on the water (`pool#water`); each pull (a tear
// of TEAR of the frame's height) lets down a length of rope (`rope` +LENGTH, moving as the finger draws it, kept when
// it lets go). Nothing to get wrong — the water has no bottom. All the rope out (`rope` 1) — the end (clean); the
// piece after it: no bottom.
//   What he does: Papa sounds the black pool with a rope and a weight.
//   What he wants: to find its bottom — to measure the island, to know it.
//   How it is for him: excitement, more with every length that goes down.
//   What the player feels: letting it down, and down, and down — and still no bottom.
//   → {}
import { clamp, until, keys, teach, settle } from './hands.js';

const PULLS = 5, TEAR = 0.1;

export default {
  title: tr('The Lead'),
  about: 8,
  skipped: {},
  points: ['pool#water'],
  keys: ['rope'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A rope with a weight, and black water with no bottom.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('rope', 1, 0.5));
    send('rope', 0);
    mg.plate.set({ notches: Array.from({ length: PULLS - 1 }, (_, i) => (i + 1) / PULLS) });
    const water = mg.mark({ at: 'pool#water', kind: 'dash' });
    const pull = mg.pull({ on: water, tear: TEAR });
    teach(b, mg, [pull]);
    let down = 0, torn = false; // lengths let down, whole; this pull's length down already
    pull.on('tear', () => { down++; torn = true; g.sound.splash(0.2); });
    pull.on('up', () => { torn = false; });
    const done = await until(mg, () => {
      const s = pull.state, rope = clamp((down + (s.held && !torn ? Math.min(s.u, 0.99) : 0)) / PULLS);
      send('rope', rope);
      mg.plate.set({ fill: rope, glow: s.held ? 'good' : 'idle' });
      return down >= PULLS;
    });
    if (!done) return this.skipped;
    send('rope', 1);
    mg.snap({ at: water });
    over();
    await mg.end({ as: 'clean' });
    return {};
  },
};
