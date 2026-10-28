// М10г «Three Times» (Ш3 «behind», the cape in the moonlit fog, after the piece `alone_talk`: Grandmother on the stone
// behind the tent, her palm come up near the canvas, Sophia talking to herself inside), in the insert `palm` (closeups:
// the canvas from behind, glowing faintly; her old palm close to it, not touching — opened by `palm_open`): touch
// nothing — SECONDS of the play's time, counted whatever the hands do; the language's sign of it (the ghost's hands off)
// from the first second and over and over. From SIGN s a quiet ring on the palm (`palm#palm`) — the knock she could
// give: pressed, the hand trembles to the canvas and draws back (`palm_near` to the cloth and back) and inside Sophia
// goes still (a quiet mistake; the ring gone). A touch anywhere else counts for nothing. The count out — the insert
// closes, the end (neutral); the piece after it: before dawn she goes home.
//   What she does: Grandmother sits behind the tent at night, her palm by the canvas, and does not knock.
//   What she wants: to be there — and to let the child have her night alone.
//   How it is for her: the child's voice through the cloth; the knock promised, or not; cold; keeping still.
//   What the player feels: hands off — and the pull to knock.
//   → { touched: her hand went to the canvas }
import { until, handsOff, settle } from './hands.js';

const SECONDS = 10, SIGN = 3, NEAR = 0.6;

export default {
  title: tr('Three Times'),
  about: 10,
  skipped: { touched: false },
  points: ['palm#palm'],
  keys: ['palm_open', 'palm_near'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Wet canvas, and a girl talking on the other side of it.') });
    const over = settle(signal, () => { g.set('palm_open', 0, 0.4); g.set('palm_near', NEAR); });
    g.set('palm_near', NEAR);
    g.set('palm_open', 1, 0.4);
    const sign = handsOff(mg);
    let touched = false, ring = null, back = Infinity;
    const t0 = mg.t;
    const done = await until(mg, ({ t }) => {
      const now = t - t0;
      if (!ring && !touched && now >= SIGN) {
        ring = mg.mark({ at: 'palm#palm', kind: 'ring', quiet: true });
        mg.press({ on: ring }).on('press', () => {
          touched = true;
          g.set('palm_near', 0.95, 0.3);
          back = mg.t + 0.5;
          g.mood('sophia', 'surprised');
          mg.error('early', { at: ring, chip: true });
          ring.remove();
        });
      }
      if (t >= back) { back = Infinity; g.set('palm_near', NEAR, 0.8); }
      mg.plate.set({ fill: Math.min(1, now / SECONDS), glow: 'idle' });
      return now >= SECONDS;
    });
    sign.remove();
    if (!done) return this.skipped;
    g.set('palm_open', 0, 0.4);
    over();
    await mg.end({ as: 'neutral' });
    return { touched };
  },
};
