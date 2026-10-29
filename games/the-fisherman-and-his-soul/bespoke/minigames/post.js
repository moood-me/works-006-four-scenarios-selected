// М9 «The Post» (3С.4 «нет», the pier at dawn, after the piece `turn_away`: he in the water with his back to the pier,
// his hand on its post — `fisherman_reach`): hold, then let go — a groove on the post (`lantern_post#grip`): held till
// full; then the water calls below (the plate says so) and the arc of time runs: lifted — he lets go of the shore
// (clean); not lifted in WAIT s — his fingers slip by themselves, and he goes under without looking back at the pier
// (held long, neutral). The pair of the prologue's knot.
//   What he does: the Fisherman lets go of the pier for the last time.
//   What he wants: to stay with her — and to let the Soul go.
//   How it is for him: the Soul on the boards with the cup, his face; her song or the silence below.
//   What the player feels: opening the hand, letting the shore go.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';

const WAIT = 5;
const POST = { r: 'lantern_post#grip' };

export default {
  title: tr('The Post'),
  about: 5,
  skipped: { long: false },
  missed: { long: true },
  points: ['lantern_post#grip'],
  keys: ['fisherman_reach'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('The post of the pier, and the water below.') });
    const over = settle(signal, () => g.set('fisherman_reach', null));
    g.set('fisherman_reach', POST);
    const how = await letGo(g, b, mg, { at: 'lantern_post#grip', take: 1.2, wait: WAIT,
      sign: () => mg.plate.set({ phrase: tr('Below, the water is calling.') }) });
    if (!how) return this.skipped;
    g.set('fisherman_reach', null);
    if (!(await count(mg, 0.6))) return this.skipped;
    over();
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
