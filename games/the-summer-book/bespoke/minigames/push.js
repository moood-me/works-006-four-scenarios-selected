// М3б «Push Off» (1.4, the shore, after «Don't hold your girl back», the piece `eriksson` ending in its pose: her palms on
// the gunwale of Eriksson's boat), in the insert `gunwale` (closeups: the gunwale, her two old hands on it, the water
// beyond — opened by `gunwale_open`): hold, then let go — a groove on her hands (`gunwale#hands`): held till full, the
// hands rest on the wood as before; then the boat stirs under them (`gunwale_push` a little — the boat's side sliding;
// the plate says so) and the arc of time runs: lifted — her hands push off and open (`gunwale_push` 1; clean); not
// lifted in WAIT s — the boat goes out from under them by itself (held long, neutral: Eriksson pushes off with his oar —
// the piece after it, by `long`). The insert closes; the piece after it: he rows away without a word.
//   What she does: Grandmother pushes Eriksson's boat off from the pier.
//   What she wants: to let the old life go — the nets, the sea, «like before».
//   How it is for her: her hands remember; her knees do not.
//   What the player feels: opening the hands on the gunwale.
//   → { long: held long }
import { letGo, settle, count } from './hands.js';

const WAIT = 5;

export default {
  title: tr('Push Off'),
  about: 7,
  skipped: { long: false },
  points: ['gunwale#hands'],
  keys: ['gunwale_open', 'gunwale_push'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Two old hands on the gunwale, and the boat wants to go.') });
    const over = settle(signal, () => { g.set('gunwale_open', 0, 0.4); g.set('gunwale_push', 1); });
    g.set('gunwale_push', 0);
    g.set('gunwale_open', 1, 0.4);
    const how = await letGo(g, b, mg, { at: 'gunwale#hands', take: 1.2, wait: WAIT, sign: () => {
      g.set('gunwale_push', 0.1, 0.8);
      mg.plate.set({ phrase: tr('The boat stirs under the hands: the sea is pulling it.') });
    } });
    if (!how) return this.skipped;
    g.set('gunwale_push', 1, how === 'let' ? 0.8 : 1.6);
    if (!(await count(mg, 1.4))) return this.skipped;
    g.set('gunwale_open', 0, 0.4);
    over();
    await mg.end({ as: how === 'let' ? 'clean' : 'neutral' });
    return { long: how === 'long' };
  },
};
