// М7 «The Net, for the Children» (4.5 «выйти на ночь», the widow's boat at sea at night — the stone's boat —, after the
// piece `boat_out`: the net cast, his hands on its rope): pull slowly — a dashed ring on the rope (`net_over#rope`); each
// slow pull draws the net in a length (`haul`) and it comes up fuller (`fish`). Too fast — it jerks and half the catch
// spills out (`fish` no more than a half from then; a mistake). All drawn in — the end (clean; flawed — half a net: the
// children get fish all the same).
//   What he does: the Fisherman fishes for the widow's children in her husband's boat.
//   What he wants: that they should not go away hungry.
//   How it is for him: a night away from the water where she might come.
//   What the player feels: the same slow pull as the prologue's — for others now.
//   → { half }
import { keys, settle, slowly, count } from './hands.js';

export default {
  title: tr('The Net, for the Children'),
  about: 10,
  skipped: { half: false },
  missed: { half: true },
  points: ['net_over#rope'],
  keys: ['haul', 'fish'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('The widow’s boat, his lantern on the bow, his net in the black water.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('haul', 1); g.set('fish', 1); });
    send('haul', 0);
    send('fish', 0);
    let half = false;
    const r = await slowly(g, b, mg, { at: 'net_over#rope', pulls: 4,
      frame: u => { send('haul', u); send('fish', half ? Math.min(0.5, u) : u); },
      jerk: () => { if (!half) { half = true; mg.plate.set({ phrase: tr('The net jerks, and half the catch slips back into the sea.') }); } } });
    if (!r) return this.skipped;
    if (!(await count(mg, 0.6))) return this.skipped;
    over();
    await mg.end({ as: r.self ? 'neutral' : half ? 'flawed' : 'clean' });
    return { half };
  },
};
