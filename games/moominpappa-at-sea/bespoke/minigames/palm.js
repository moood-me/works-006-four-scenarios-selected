// М6б «The Palm» (Ш2 «call», the round room at noon, after «Mamma! Mamma!», in the pose the piece `empty_room` ends
// in: Papa's palm on the painted gate): hold — a groove on the gate (`wall_a#gate`), filled in SECONDS while held (let go
// — it ebbs: the palm taken off the plaster). Full — she has heard: the end (clean). Hold without letting go ends by
// its count: if the gate is not held, after LIMIT s the end all the same (neutral) — she comes out anyway.
//   What he does: Papa keeps his palm on the painted garden gate while he calls Mama.
//   What he wants: to call her back out of the wall.
//   How it is for him: alarm; a big paw on cold plaster.
//   What the player feels: keeping the paw there till she hears.
//   → {}
import { until, teach } from './hands.js';

const SECONDS = 4, LIMIT = 14;

export default {
  title: tr('The Palm'),
  about: 6,
  skipped: {},
  points: ['wall_a#gate'],
  keys: [],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A painted gate, and plaster under the paw.') });
    const gate = mg.mark({ at: 'wall_a#gate', kind: 'groove' });
    const hold = mg.hold({ on: gate, seconds: SECONDS, drain: 0.8 });
    teach(b, mg, [hold]);
    const t0 = mg.t;
    const done = await until(mg, ({ t }) => {
      mg.plate.set({ fill: hold.state.fill, glow: hold.state.held ? 'good' : 'idle' });
      return hold.state.fill >= 1 || t - t0 >= LIMIT;
    });
    if (!done) return this.skipped;
    const full = hold.state.fill >= 1;
    if (full) mg.snap({ at: gate });
    await mg.end({ as: full ? 'clean' : 'neutral' });
    return {};
  },
};
