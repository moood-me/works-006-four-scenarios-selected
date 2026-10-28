// М1 «The Ladle» (prologue П.2, the valley, after the piece `smoke`: Papa beside the moss with the ladle, the camera
// still): hold — a groove on the moss (`apple#moss`), filled in 3 s while held: the ladle over the little fire, the
// smoke going from grey to white steam (`smoke` = the fill); let go, it ebbs and the smoke greys again. Let go once it
// had begun — Papa blows on his paw: «Ow» (the first time only). Full — the fire is out: the end (clean, or flawed if
// he let go).
//   What he does: Papa holds the ladle of water over a little fire in the moss.
//   What he wants: to put it out — to be needed for once in a valley where everything is done.
//   How it is for him: a moment of being needed; delight; a little burnt.
//   What the player feels: holding on till it is done.
//   → { early: how many times let go too soon }
import { clamp, until, keys, teach, settle } from './hands.js';

const SECONDS = 3, DRAIN = 5;

export default {
  title: tr('The Ladle'),
  about: 7,
  skipped: { early: 0 },
  points: ['apple#moss'],
  keys: ['smoke'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A thread of smoke out of the moss under the apple tree.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('smoke', 1, 0.5));
    send('smoke', 0);
    const fire = mg.mark({ at: 'apple#moss', kind: 'groove' });
    const hold = mg.hold({ on: fire, seconds: SECONDS, drain: DRAIN });
    teach(b, mg, [hold]);
    let early = 0;
    // (let go before it is full — a click, as a first touch so often is: the ghost shows the holding again at once,
    // and the fill ebbs slowly, so the touch is seen to have counted)
    hold.on('up', () => {
      const f = hold.state.fill;
      if (f < 1) mg.show({ gestures: [hold] });
      if (f <= 0.15 || f >= 1) return;
      early++;
      g.failed();
      mg.error('early', { at: fire });
      if (early === 1) {
        g.mood('papa', 'surprised');
        g.say('papa', 'Ow');
      }
    });
    const done = await until(mg, () => {
      const s = hold.state;
      send('smoke', clamp(s.fill));
      mg.plate.set({ fill: s.fill, glow: s.held ? 'good' : 'idle' });
      return s.fill >= 1;
    });
    if (!done) return this.skipped;
    send('smoke', 1);
    mg.snap({ at: fire });
    g.mood('papa', 'smile');
    over();
    await mg.end({ as: early ? 'flawed' : 'clean' });
    return { early };
  },
};
