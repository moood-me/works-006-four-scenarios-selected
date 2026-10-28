// М9 «The Pole» (4.2, the cape in the evening, after the piece `pitch`: Grandmother holding the tent pole in both hands,
// Sophia kneeling at the peg tying the ropes): hold, by its count — a groove on her grip (`pole#grip`): from the first
// touch SECONDS of holding the pole still while Sophia ties. The finger drawn more than SHAKE px from where it rests, or
// lifted — the pole trembles (a mistake): the tent will stand crooked (`lean` up by LEAN, to 1 at most; it stays the
// play's). The count out — the end (clean; flawed if it trembled — and Sophia, satisfied: «That's how it should be»);
// the piece after it: Papa with the lantern, the law of the fog.
//   What she does: Grandmother holds the tent pole while the child ties the ropes.
//   What she wants: to help — and not to do it for her.
//   How it is for her: her arms tired; the child busy and proud.
//   What the player feels: holding still while someone else does the work.
//   → { lean: how crooked the tent stands, 0…1 }
import { clamp, until, keys, teach } from './hands.js';

const SECONDS = 8, SHAKE = 32, LEAN = 0.35, ALONE = 12;

export default {
  title: tr('The Pole'),
  about: 10,
  skipped: { lean: 0 },
  points: ['pole#grip'],
  keys: ['lean'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A pole on bare rock, and a girl tying knots.') });
    const send = keys(g);
    send('lean', 0);
    const grip = mg.mark({ at: 'pole#grip', kind: 'groove' });
    const hold = mg.hold({ on: grip, seconds: 0.8, drain: 1.2 });
    teach(b, mg, [hold]);
    let lean = 0, rest = null, begun = null;
    const shook = () => {
      lean = clamp(lean + LEAN);
      g.set('lean', lean, 0.4);
      g.failed();
      mg.error('jerk', { at: grip, chip: true });
    };
    const offs = [
      mg.on('down', () => { begun ??= mg.t; }),
      hold.on('up', () => {
        rest = null;
        if (hold.state.fill < 1) mg.show({ gestures: [hold] });
        if (hold.state.fill >= 0.6) shook();
      }),
    ];
    const t00 = mg.t;
    const done = await until(mg, ({ t }) => {
      const s = hold.state;
      if (s.held && s.at && s.fill >= 0.6) {
        rest ??= { ...s.at };
        if (Math.hypot(s.at.x - rest.x, s.at.y - rest.y) > SHAKE) { rest = { ...s.at }; shook(); }
      }
      const now = begun == null ? 0 : t - begun;
      mg.plate.set({ fill: clamp(now / SECONDS), glow: s.held ? 'good' : begun == null ? 'idle' : 'bad' });
      return (begun != null && now >= SECONDS) || (begun == null && t - t00 >= ALONE);
    });
    offs.forEach(f => f());
    if (!done) return this.skipped;
    mg.snap({ at: grip });
    await mg.end({ as: lean ? 'flawed' : 'clean' });
    if (lean) await g.say('sophia', 'That’s how it should be');
    return { lean };
  },
};
