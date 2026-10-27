// М11 «The Matchbox» (the finale «The Pie on the Cape», the cape at moonlight, after the piece `pie` — or, late, after
// `bread_take`: the two sitting, Papa's matchbox in his paw): hold, then let go — the box given:
// - the Fisherman spoke in the storm and the «Pie» is the full one (the play's facts: `spoke`, `form`; the late one
//   always ends with the box on the stone): in the insert `matchbox` (the people package's closeups
//   shot: Papa's paw laying his matchbox into the Fisherman's open palm — opened by `matchbox_open`), a groove on the
//   box (`matchbox#box`); let go — the box goes into the palm (`matchbox_give` 0 → 1), the insert closes; the piece
//   after it (`matches_palm`): his fist closes on it;
// - otherwise: a groove on the box's place on his stone (`box#box`); let go — the piece after it (`matches_stone`) lays the box on
//   the stone, and he does not take it while they are there.
// Held till full, then the call (into the palm: the box over it, `matchbox_give` a little; the plate says so), the arc
// of time: lifted — let go (clean); not lifted in WAIT s — let go by itself (neutral).
//   What he does: Papa gives the Fisherman his matchbox — the right to light the lighthouse.
//   What he wants: to give it to the one it belongs to.
//   How it is for him: giving away what made him the keeper; quiet.
//   What the player feels: opening the paw over another's hand.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';
import { facts } from '../story.js';

export default {
  title: tr('The Matchbox'),
  about: 7,
  skipped: { long: false },
  points: ['matchbox#box', 'box#box'],
  keys: ['matchbox_open', 'matchbox_give'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A matchbox, and a hand that does not take it.') });
    const f = facts(g.state), palm = f.spoke && f.form === 'full';
    let over = () => {};
    if (palm) {
      over = settle(signal, () => { g.set('matchbox_open', 0, 0.4); g.set('matchbox_give', 1); });
      g.set('matchbox_give', 0);
      g.set('matchbox_open', 1, 0.4);
    }
    const how = await letGo(g, b, mg, { at: palm ? 'matchbox#box' : 'box#box', take: 1.2, wait: 5, sign: () => {
      if (palm) g.set('matchbox_give', 0.3, 0.8);
      mg.plate.set({ phrase: palm ? tr('The palm lies open under the box.') : tr('The stone beside him is bare.') });
    } });
    if (!how) return this.skipped;
    if (palm) {
      g.set('matchbox_give', 1, 1);
      if (!(await count(mg, 1.3))) return this.skipped;
      g.set('matchbox_open', 0, 0.4);
    }
    over();
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
