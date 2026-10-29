// М8 «Holding Her» (4.8 «остаться с ней», the shore at night or dawn, after the piece `sea_comes` and the choice: she
// lies dead on the sand, he kneels by her, the black wave coming): hold, by its count — a groove on her hand in his
// (`mermaid#hand_l`, his hand on it: `fisherman_reach`): SECONDS of holding from the first touch while the wave rises
// (`wave` 0.3 → 1). Let go — her hand slips out of his (`fisherman_reach` none; a mistake); held again — he finds it
// again; the plate says it (her hand gone from his, the wave nearer) till he holds it again, his face afraid meanwhile.
// The count out — the end (clean; flawed if it slipped: they will lie side by side, fingers almost touching).
//   What he does: the Fisherman holds her hand while the sea comes for him.
//   What he wants: to go with her, all the way.
//   How it is for him: his heart breaking; the Soul crying «Run!» inside him.
//   What the player feels: not letting go.
//   → { slips }
import { keys, keep, settle } from './hands.js';

const SECONDS = 10, FROM = 0.3;
const HERS = { r: 'mermaid#hand_l' };

export default {
  title: tr('Holding Her'),
  about: 10,
  skipped: { slips: 0 },
  missed: { slips: 1 },
  points: ['mermaid#hand_l'],
  keys: ['wave', 'fisherman_reach'],
  async run(g, b, opts, signal) {
    const phrase = tr('Her cold hand, and the black wave coming.');
    const mg = g.minigame({ phrase });
    const send = keys(g);
    const over = settle(signal, () => { g.set('fisherman_reach', HERS); g.set('wave', 1); });
    g.set('fisherman_reach', HERS);
    let lost = false;
    const r = await keep(g, b, mg, { at: 'mermaid#hand_l', seconds: SECONDS, take: 0.8,
      frame: ({ held, t }) => {
        if (lost && held) { lost = false; g.set('fisherman_reach', HERS); g.mood('fisherman', 'sad'); mg.plate.set({ phrase }); }
        send('wave', FROM + (1 - FROM) * Math.min(1, t / SECONDS));
      },
      slip: () => {
        lost = true;
        g.set('fisherman_reach', null);
        g.mood('fisherman', 'afraid');
        mg.plate.set({ phrase: tr('Her hand slipped out of his. The wave is nearer.') });
      } });
    if (!r) return this.skipped;
    if (!r.slips) g.set('fisherman_reach', HERS);
    g.set('wave', 1, 0.6);
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
