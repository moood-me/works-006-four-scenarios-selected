// М8в «The Sleeve» (3.4 «not you», the room in the storm at night, after the piece `notyou`: Sophia's fingers clutching
// Grandmother's sleeve), in the insert `sleeve` (closeups: the small fingers on the dark-blue sleeve at the wrist —
// opened by `sleeve_open`): hold, then let go — a groove on the fingers (`sleeve#fingers`): held till full, her old hand
// lies over the small one; then the fingers loosen a little (`sleeve_let` a little; the plate says so) and the arc of
// time runs: lifted — the old hand unclenches them and lets them go (`sleeve_let` 1; clean); not lifted in WAIT s —
// Sophia lets go of the sleeve herself, finger by finger (held long, neutral). The insert closes; the piece after it:
// «Nothing at all to do with me?».
//   What she does: Grandmother gently unclenches the child's fingers from her sleeve.
//   What she wants: to take the blame off her — «nobody prayed anything down».
//   How it is for her: the truth said firmly; the child holding on to it.
//   What the player feels: opening a small hand, gently.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';

const WAIT = 5;

export default {
  title: tr('The Sleeve'),
  about: 7,
  skipped: { long: false },
  points: ['sleeve#fingers'],
  keys: ['sleeve_open', 'sleeve_let'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Small fingers clutching an old sleeve.') });
    const over = settle(signal, () => { g.set('sleeve_open', 0, 0.4); g.set('sleeve_let', 1); });
    g.set('sleeve_let', 0);
    g.set('sleeve_open', 1, 0.4);
    const how = await letGo(g, b, mg, { at: 'sleeve#fingers', take: 1.2, wait: WAIT, sign: () => {
      g.set('sleeve_let', 0.2, 0.8);
      mg.plate.set({ phrase: tr('The small fingers loosen on the sleeve.') });
    } });
    if (!how) return this.skipped;
    g.set('sleeve_let', 1, how === 'let' ? 0.8 : 2.5);
    if (!(await count(mg, how === 'let' ? 1 : 2.6))) return this.skipped;
    g.set('sleeve_open', 0, 0.4);
    over();
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
