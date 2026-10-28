// М8а «The Rail» (3.4 «porch», the porch in the storm at night, after the piece `rail`: the two of them out in the
// rain, Grandmother's hands on the porch rail): hold with danger — a groove on the rail (`porch#rail`), its arc of
// danger growing before each gust (GUSTS, every EVERY s from the first touch); the gust comes (`gust` up — the wind, the
// rain driven — and down): held through it, she stands; not held — she sways (`lean`), Sophia grabs her hand (`sophia_grab`) (a
// mistake).
// The bar — the time held. It ends by its count, after the last gust (clean; flawed if a gust found her not holding);
// the piece after it: Sophia shrieks with fear and delight, «It isn't you. It's the sky».
//   What she does: Grandmother stands out on the porch in the storm, holding on to the rail, the child beside her.
//   What she wants: to show her the sky — it is not her doing; to stand it together.
//   How it is for her: wet through, old, the wind strong; glad.
//   What the player feels: bracing for each gust, together against the sky.
//   → { swayed: gusts she was not holding at }
import { clamp, until, teach, settle } from './hands.js';

const GUSTS = 3, FIRST = 2, EVERY = 2.4, WARN = 1, BLOW = 0.9; // s: from the first touch; between; warning; a gust's length
const ALONE = 12;

export default {
  title: tr('The Rail'),
  about: 10,
  skipped: { swayed: 0 },
  points: ['porch#rail'],
  keys: ['gust', 'lean', 'sophia_grab'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Rain, white sky, and the porch rail wet under the hands.') });
    const over = settle(signal, () => { g.set('gust', 0, 0.8); g.set('lean', 0, 0.6); g.set('sophia_grab', 0, 0.4); });
    g.set('gust', 0.2, 0.5);
    const rail = mg.mark({ at: 'porch#rail', kind: 'groove', danger: 0 });
    const hold = mg.hold({ on: rail, seconds: 0.4, drain: 0.4 });
    teach(b, mg, [hold]);
    const END = FIRST + (GUSTS - 1) * EVERY + BLOW + 0.6;
    let swayed = 0, held = 0, next = 0, calm = null, begun = null;
    const touch = mg.on('down', () => { begun ??= mg.t; });
    const t00 = mg.t;
    const done = await until(mg, ({ t, dt }) => {
      if (begun == null) {
        mg.plate.set({ fill: 0, glow: 'idle' });
        return t - t00 >= ALONE;
      }
      const now = t - begun, at = FIRST + next * EVERY;
      if (hold.state.held) held += dt;
      rail.set({ danger: next < GUSTS ? clamp(1 - (at - now) / WARN) : 0 });
      if (next < GUSTS && now >= at) {
        next++;
        g.set('gust', 1, 0.25);
        calm = now + BLOW;
        if (!hold.state.held) {
          swayed++;
          g.failed();
          mg.error('danger', { at: rail });
          g.mood('sophia', 'afraid');
          g.set('lean', next % 2 ? 0.7 : -0.7, 0.3);
          g.set('sophia_grab', 1, 0.3);
        }
      }
      if (calm !== null && now >= calm) { calm = null; g.set('gust', 0.2, 0.8); g.set('lean', 0, 0.8); g.set('sophia_grab', 0, 0.6); g.mood('sophia', 'laugh'); }
      mg.plate.set({ fill: clamp(held / (END - FIRST)), glow: hold.state.held ? 'good' : 'idle' });
      return now >= END;
    });
    touch();
    if (!done) return this.skipped;
    over();
    await mg.end({ as: swayed ? 'flawed' : 'clean' });
    return { swayed };
  },
};
