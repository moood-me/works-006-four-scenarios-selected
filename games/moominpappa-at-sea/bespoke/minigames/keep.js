// М10б «Holding Him» (night 3, «Mama is right», the round room, after «Mama is right», in the pose of the choice: Papa's
// paw on the boy's shoulder): hold — a groove on the boy (`troll#chest`), filled in SECONDS while held. Let go before it
// is full (once it had begun) — the end at once (flawed; what it shows — the boy long in the doorway, scenario §7 —
// is the chapter's and the scene's: no key or piece for it yet).
// Full — the end (clean). Never touched — after LIMIT s the end all the same (neutral). The piece after it: the boy at
// the window till dawn.
//   What he does: Papa keeps his paw on his son's shoulder through the night's first minutes.
//   What he wants: to keep him in — out of the cold, away from the Groke.
//   How it is for him: holding back; the boy straining under his paw.
//   What the player feels: ten seconds of not letting go.
//   → { early: let go before the ten seconds }
import { until, teach } from './hands.js';

const SECONDS = 10, LIMIT = 15;

export default {
  title: tr('Holding Him'),
  about: 11,
  skipped: { early: false },
  points: ['troll#chest'],
  keys: [],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A paw on a small shoulder.') });
    const boy = mg.mark({ at: 'troll#chest', kind: 'groove' });
    const hold = mg.hold({ on: boy, seconds: SECONDS, drain: 0 });
    teach(b, mg, [hold]);
    let early = false;
    hold.on('up', () => { if (hold.state.fill > 0.03 && hold.state.fill < 1) early = true; });
    const t0 = mg.t;
    const done = await until(mg, ({ t }) => {
      mg.plate.set({ fill: hold.state.fill, glow: hold.state.held ? 'good' : 'idle' });
      return early || hold.state.fill >= 1 || (hold.state.fill === 0 && t - t0 >= LIMIT);
    });
    if (!done) return this.skipped;
    if (hold.state.fill >= 1) mg.snap({ at: boy });
    else if (early) { g.failed(); mg.error('early', { at: boy }); }
    await mg.end({ as: hold.state.fill >= 1 ? 'clean' : early ? 'flawed' : 'neutral' });
    return { early };
  },
};
