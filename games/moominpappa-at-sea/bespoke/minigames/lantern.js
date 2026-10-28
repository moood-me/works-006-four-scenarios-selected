// М5в «The Lantern» (Ш1 «to the son», the round room at night, after «Take it. I won't ask», in the pose of the choice:
// the lantern on the table), in the insert `handle` (the people package's closeups shot: the lantern's bail, Papa's paw
// round it, the boy's smaller paw closing on it — opened by `handle_open`): hold, then let go — a groove on Papa's paw
// (`handle#papa`): held till full, his paw has hold of the handle beside the boy's; then the boy pulls (`give` a
// little, the plate says so) and the arc of time runs: lifted — Papa's paw opens and goes off, the boy's holds (`give` 0 → 1); not lifted in WAIT s — the boy pulls
// harder and it goes by itself (held long, neutral). The insert closes; the piece after it: the boy goes out.
//   What he does: Papa lets go of the lantern's handle as his son takes it.
//   What he wants: to give it — quickly, before he changes his mind.
//   How it is for him: giving what is his own; «I won't ask» said more to himself.
//   What the player feels: opening the paw.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';

const WAIT = 5;

export default {
  title: tr('The Lantern'),
  about: 6,
  skipped: { long: false },
  points: ['handle#papa'],
  keys: ['handle_open', 'give'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('One handle, and two paws on it.') });
    const over = settle(signal, () => { g.set('handle_open', 0, 0.4); g.set('give', 1); });
    g.set('give', 0);
    g.set('handle_open', 1, 0.4);
    const how = await letGo(g, b, mg, { at: 'handle#papa', take: 1.2, wait: WAIT, sign: () => {
      g.set('give', 0.25, 0.6);
      mg.plate.set({ phrase: tr('The boy’s paw pulls at the handle.') });
    } });
    if (!how) return this.skipped;
    g.set('give', 1, how === 'let' ? 0.8 : 0.4);
    if (!(await count(mg, 1.2))) return this.skipped;
    g.set('handle_open', 0, 0.4);
    over();
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
