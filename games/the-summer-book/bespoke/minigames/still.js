// М7б «Not a Move» (3.3 «sophia», the room at night, after the piece `palm_night`: Sophia by Grandmother's bed with the
// candle, her palm on her breast), in the insert `breast` (closeups: the small palm on the breast, the candle's light
// from below — opened by `breast_open`): touch nothing — SECONDS of the play's time, counted whatever the hands do; the
// language's sign of it (the ghost's hands off) from the first second and over and over. A touch — she has moved under
// the palm: the candle's flame stirs (`breast_flicker`), a quiet mistake; the count goes on. The count out — the insert
// closes, the end (neutral; if she moved — Sophia: «You're not asleep?»); the piece after it: «Not today».
//   What she does: Grandmother lies still, pretending to sleep, under the child's palm.
//   What she wants: to let her make sure — not to frighten her, not to be caught awake.
//   How it is for her: the small palm on her breast; her own breath; the child's fear.
//   What the player feels: not moving — the pull to answer the hand.
//   → { moved }
import { until, handsOff, settle } from './hands.js';

const SECONDS = 10;

export default {
  title: tr('Not a Move'),
  about: 10,
  skipped: { moved: false },
  points: [],
  keys: ['breast_open', 'breast_flicker'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A candle, and a small palm on an old breast.') });
    const over = settle(signal, () => { g.set('breast_open', 0, 0.4); g.set('breast_flicker', 0); });
    g.set('breast_flicker', 0);
    g.set('breast_open', 1, 0.4);
    const sign = handsOff(mg);
    let moved = false, calm = Infinity;
    const off = mg.on('down', () => {
      g.set('breast_flicker', 1, 0.15);
      calm = mg.t + 0.8;
      if (!moved) mg.error('early', { chip: true });
      moved = true;
    });
    const t0 = mg.t;
    const done = await until(mg, ({ t }) => {
      if (t >= calm) { calm = Infinity; g.set('breast_flicker', 0, 1.2); }
      mg.plate.set({ fill: Math.min(1, (t - t0) / SECONDS), glow: 'idle' });
      return t - t0 >= SECONDS;
    });
    off();
    sign.remove();
    if (!done) return this.skipped;
    g.set('breast_open', 0, 0.4);
    over();
    await mg.end({ as: 'neutral' });
    if (moved) await g.say('sophia', 'You’re not asleep?');
    return { moved };
  },
};
