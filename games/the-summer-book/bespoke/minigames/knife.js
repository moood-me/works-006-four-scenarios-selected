// М3 «The Knife» (1.2, the forest, after the piece `carve`: Grandmother on the stump, the knife and the driftwood before
// her), in the insert `knife` (closeups: her hands, the knife, the shavings curling off — opened by `knife_open`): pull
// slowly — a dashed ring on the blade (`knife#blade`); each slow pull takes a shaving off (`carve` +1/PULLS, the seal
// coming out of the wood). Too fast — a jerk: a flipper split off (`knife_flaw` 1 — the seal will have one flipper; a
// mistake, that pull spent). All of it — the seal is there: the insert closes, the end (clean; flawed if it jerked);
// the piece after it: Sophia takes the seal and sets it in the moss.
//   What she does: Grandmother carves a seal out of a piece of driftwood, shaving after shaving.
//   What she wants: to make the child an animal for her forest — her own work in her hands.
//   How it is for her: calm; the old skill still there in the fingers.
//   What the player feels: a slow pull, a shaving at a time.
//   → { flipper: the seal has one flipper }
import { keys, settle, slowly, count } from './hands.js';

const PULLS = 4;

export default {
  title: tr('The Knife'),
  about: 9,
  skipped: { flipper: false },
  points: ['knife#blade'],
  keys: ['knife_open', 'carve', 'knife_flaw'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A piece of driftwood, a knife, and somewhere inside it a seal.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('knife_open', 0, 0.4); g.set('carve', 1); });
    send('carve', 0);
    g.set('knife_flaw', 0);
    g.set('knife_open', 1, 0.4);
    const r = await slowly(g, b, mg, { at: 'knife#blade', pulls: PULLS, frame: u => send('carve', u), jerk: () => g.set('knife_flaw', 1) });
    if (!r) return this.skipped;
    if (!(await count(mg, 1))) return this.skipped;
    g.set('knife_open', 0, 0.4);
    over();
    await mg.end({ as: r.self ? 'neutral' : r.jerks ? 'flawed' : 'clean' });
    return { flipper: r.jerks > 0 };
  },
};
