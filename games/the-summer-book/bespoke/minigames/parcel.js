// М9а «The Parcel» (4.1, the shore, after the piece `post`: Grandmother holding the parcel, making out the label,
// Sophia pulling it her way), in the insert `string` (closeups: the brown paper and its string, Grandmother's hands
// holding it out, Sophia's at the bow — opened by `string_open`): hold, then let go — a groove on the bow
// (`string#bow`): held till full, the parcel is in her hands; then Sophia pulls (`parcel` a little her way; the plate
// says so) and the arc of time runs: lifted — the hands open, the parcel is Sophia's (`parcel` 1; clean); not lifted in
// WAIT s — the string snaps, Sophia sits down on the pier with the parcel and laughs (held long, neutral). The insert
// closes; the piece after it: «Will you put it up yourself?» — «Myself!».
//   What she does: Grandmother lets the child take the parcel out of her hands.
//   What she wants: to give it — the present is hers, not mine.
//   How it is for her: the label read, Eriksson watching; letting go of what she would have done herself.
//   What the player feels: opening the hands while the child pulls.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';

const WAIT = 5;

export default {
  title: tr('The Parcel'),
  about: 7,
  skipped: { long: false },
  points: ['string#bow'],
  keys: ['string_open', 'parcel'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A parcel with a label, and Sophia pulling it her way.') });
    const over = settle(signal, () => { g.set('string_open', 0, 0.4); g.set('parcel', 1); });
    g.set('parcel', 0);
    g.set('string_open', 1, 0.4);
    const how = await letGo(g, b, mg, { at: 'string#bow', take: 1.2, wait: WAIT, sign: () => {
      g.set('parcel', 0.25, 0.6);
      mg.plate.set({ phrase: tr('Sophia pulls, and the string goes taut.') });
    } });
    if (!how) return this.skipped;
    g.set('parcel', 1, how === 'let' ? 0.8 : 0.2);
    g.mood('sophia', 'laugh');
    if (!(await count(mg, 1.2))) return this.skipped;
    g.set('string_open', 0, 0.4);
    over();
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
