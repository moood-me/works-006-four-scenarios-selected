// М2б «The Can» (1.5, the round room, after the piece `can_in`: Papa on the threshold with the full can of paraffin):
// lead anywhere — the arrow is the can's sway (`can_sway` −1…1, the scene tips the can and the paraffin in it),
// steered (`rate`); the zone — level. Each step over the high threshold rocks it (`push`, one way, then the other).
// The way over the threshold (the plate's fill) goes on only while the finger leads it; tipped to the brim
// (|can_sway| ≥ SPLASH) — a splash (into danger), once till it is level again. Over the threshold — the end (clean;
// flawed if it splashed); the piece after it sets the can on the shelf.
//   What he does: Papa carries the full can — all the light the family has — over the threshold.
//   What he wants: to bring it in whole; it is three nights' light.
//   How it is for him: careful, solemn, the can heavier than it is.
//   What the player feels: keeping the light safe.
//   → { splashed: how many times it splashed }
import { clamp, until, keys, teach, settle } from './hands.js';

const WAY = 5.5; // s of leading over the threshold
const STEP = 1.4, PUSH = 0.55; // s: a step rocks it; the rock at its height
const ZONE = 0.45, SPLASH = 0.9, LEVEL = 0.4;

export default {
  title: tr('The Can'),
  about: 8,
  skipped: { splashed: 0 },
  points: ['papa#chest'],
  keys: ['can_sway', 'spill'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A full can, and a high threshold.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('can_sway', 0, 0.6));
    send('can_sway', 0);
    const lead = mg.lead({ zone: { at: 0, width: ZONE }, steer: 'rate', release: 'stay', push: 0 });
    mg.mark({ at: 'papa#chest', kind: 'ring', quiet: true }); // (no touch of its own: what is led)
    teach(b, mg, [lead]);
    let way = 0, splashed = 0, tipped = false, walked = 0;
    const done = await until(mg, ({ dt }) => {
      const s = lead.state;
      if (s.held) {
        way = clamp(way + dt / WAY);
        walked += dt;
      }
      // (a step, while he walks: one way, then the other)
      const k = Math.floor(walked / STEP), into = walked - k * STEP;
      lead.set({ push: s.held ? (k % 2 ? -1 : 1) * PUSH * Math.sin((Math.PI * into) / STEP) : 0 });
      send('can_sway', s.arrow);
      if (!tipped && Math.abs(s.arrow) >= SPLASH) {
        tipped = true;
        splashed++;
        g.set('spill', (g.get('spill') ?? 0) + 1);
        g.failed();
        mg.error('danger', { chip: true });
      }
      if (tipped && Math.abs(s.arrow) < LEVEL) tipped = false;
      mg.plate.set({ fill: way, glow: s.in ? (s.held ? 'good' : 'idle') : 'bad' });
      return way >= 1;
    });
    if (!done) return this.skipped;
    g.set('can_sway', 0, 0.6);
    over();
    await mg.end({ as: splashed ? 'flawed' : 'clean' });
    return { splashed };
  },
};
