// М4б «The Armful» (2.4 «seaweed for Mama», the middle of the island, after the piece `armful_in`: Papa on the path
// with the armful of seaweed above his head, not seeing his feet): lead anywhere — the arrow is the armful's sway
// (`sway` −1…1, the scene leans the heap and Papa under it), steered (`rate`); the zone — upright. His steps and the
// heap's own weight rock it (`push`, the stronger the longer he walks). The way (the plate's fill) goes on only while
// the finger leads; leaned over to the edge (|sway| ≥ SPILL) — some of it slides off (into danger), once till it is
// upright again. The way done — the end (clean; flawed if it spilt); the piece after it: straight through the boy's
// ring.
//   What he does: Papa carries an armful of seaweed for Mama's garden, higher than his head.
//   What he wants: to bring her as much as anyone ever carried — to be useful, together.
//   How it is for him: cheerful, puffed up, blind to his feet.
//   What the player feels: balancing the heap — and not seeing what is underfoot.
//   → { spilt: how many times it spilt }
import { clamp, until, keys, teach, settle } from './hands.js';

const WAY = 6; // s of leading
const STEP = 1.1, PUSH = 0.45, GROW = 0.25; // s: a step; the rock at first; and more by the way's end
const ZONE = 0.4, SPILL = 0.92, UPRIGHT = 0.4;

export default {
  title: tr('The Armful'),
  about: 8,
  skipped: { spilt: 0 },
  points: [],
  keys: ['sway', 'armful_way'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Seaweed higher than his head.') });
    const send = keys(g);
    settle(signal, () => { g.set('sway', 0, 0.6); g.set('armful_way', 1); });
    send('sway', 0);
    send('armful_way', 0);
    const lead = mg.lead({ zone: { at: 0, width: ZONE }, steer: 'rate', release: 'stay', push: 0 });
    teach(b, mg, [lead]);
    let way = 0, spilt = 0, over = false, walked = 0;
    const done = await until(mg, ({ dt }) => {
      const s = lead.state;
      if (s.held) {
        way = clamp(way + dt / WAY);
        walked += dt;
      }
      const k = Math.floor(walked / STEP), into = walked - k * STEP;
      lead.set({ push: s.held ? (k % 2 ? -1 : 1) * (PUSH + GROW * way) * Math.sin((Math.PI * into) / STEP) : 0 });
      send('sway', s.arrow);
      send('armful_way', way);
      if (!over && Math.abs(s.arrow) >= SPILL) {
        over = true;
        spilt++;
        g.failed();
        mg.error('danger', { chip: true });
      }
      if (over && Math.abs(s.arrow) < UPRIGHT) over = false;
      mg.plate.set({ fill: way, glow: s.in ? (s.held ? 'good' : 'idle') : 'bad' });
      return way >= 1;
    });
    if (!done) return this.skipped;
    g.set('sway', 0, 0.6);
    await mg.end({ as: spilt ? 'flawed' : 'clean' });
    return { spilt };
  },
};
