// М10а «The Shoulder» (night 3, «let him go», the round room, after «Let him go», in the pose of the choice: Papa's paw
// on the boy's shoulder): hold, then let go — a groove on the boy (`troll#chest`): held till full, the paw rests on his
// shoulder; then the boy stirs under it (his face, the plate says so) and the arc of time runs: lifted — let go (clean); not lifted in WAIT s — the boy slips out from under it by
// himself (held long, neutral). The piece after it: the boy goes.
//   What he does: Papa takes his paw off his son's shoulder.
//   What he wants: to let him go to the Groke.
//   How it is for him: allowing — the hardest thing a father does with his paws.
//   What the player feels: opening the paw.
//   → { long: held long }
import { letGo } from './hands.js';

export default {
  title: tr('The Shoulder'),
  about: 6,
  skipped: { long: false },
  points: ['troll#chest'],
  keys: [],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A paw on a small shoulder.') });
    const how = await letGo(g, b, mg, { at: 'troll#chest', take: 1.2, wait: 5, sign: () => {
      g.mood('troll', 'thinking');
      mg.plate.set({ phrase: tr('The shoulder stirs under the paw.') });
    } });
    if (!how) return this.skipped;
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
