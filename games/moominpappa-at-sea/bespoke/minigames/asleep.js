// М7а «Asleep» (night 2, «don't open your eyes»: the round room after the piece `n2_sleep`, or the lantern room after
// `n2_asleep` — the boy with the lantern, still, looking at his father): touch nothing — SECONDS of the play's time,
// counted whatever the hands do (the ghost shows the hands off; the bar fills with the time). From SIGN s a ring on
// Papa (`papa#chest`): «open your eyes» — the one touch that counts; pressed, Papa opens his eyes (`eyes` 0 → 1), the
// boy sees it (`troll` surprised) and goes all the same. A touch anywhere else counts for nothing. The count out — the
// end (neutral).
//   What he does: Papa lies with his eyes shut while his son takes the lantern.
//   What he wants: to let him go — on the sly, without a word between them.
//   How it is for him: wide awake, pretending; every creak.
//   What the player feels: not moving — and the pull to look.
//   → { eyes: whether he opened them }
import { until, settle } from './hands.js';

const SECONDS = 10, SIGN = 3;

export default {
  title: tr('Asleep'),
  about: 10,
  skipped: { eyes: false },
  points: ['papa#chest'],
  keys: ['eyes'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A creak, and a hand on the lantern.') });
    let eyes = false, sign = null;
    settle(signal, () => { if (!eyes) g.set('eyes', 0); });
    g.set('eyes', 0);
    mg.show({ handsOff: true });
    const t0 = mg.t;
    const done = await until(mg, ({ t }) => {
      const now = t - t0;
      if (!sign && !eyes && now >= SIGN) {
        sign = mg.mark({ at: 'papa#chest', kind: 'ring', quiet: true });
        mg.press({ on: sign }).on('press', () => {
          eyes = true;
          g.set('eyes', 1, 0.6);
          g.mood('troll', 'surprised');
          mg.snap({ at: sign });
          sign.remove();
        });
      }
      mg.plate.set({ fill: Math.min(1, now / SECONDS), glow: 'idle' });
      return now >= SECONDS;
    });
    if (!done) return this.skipped;
    await mg.end({ as: 'neutral' });
    return { eyes };
  },
};
