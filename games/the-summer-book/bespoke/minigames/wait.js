// М10в «Waiting» (Ш3 «lamp», the room in the fog at night, after the piece `lamp_window`: the lamp in the window, her
// face by it, the cape white below): touch nothing — SECONDS of the play's time, counted whatever the hands do; the
// language's sign of it (the ghost's hands off) from the first second and over and over. A touch — a quiet mistake (the
// count goes on). The count out — the end (neutral); the game cuts after
// it to Sophia at the folded-back flap under the moon.
//   What she does: Grandmother sits at the window with the lamp and does not go.
//   What she wants: to let the child have her night — not to step in.
//   How it is for her: the fog; every sound from the cape; the lamp the only thing she gives.
//   What the player feels: hands off — and the pull to go.
//   → { moved }
import { until, handsOff } from './hands.js';

const SECONDS = 12;

export default {
  title: tr('Waiting'),
  about: 12,
  skipped: { moved: false },
  points: [],
  keys: [],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A lamp in the window, and the cape white with fog.') });
    const sign = handsOff(mg);
    let moved = false;
    const off = mg.on('down', () => {
      if (!moved) mg.error('early', { chip: true });
      moved = true;
    });
    const t0 = mg.t;
    const done = await until(mg, ({ t }) => {
      mg.plate.set({ fill: Math.min(1, (t - t0) / SECONDS), glow: 'idle' });
      return t - t0 >= SECONDS;
    });
    off();
    sign.remove();
    if (!done) return this.skipped;
    await mg.end({ as: 'neutral' });
    return { moved };
  },
};
