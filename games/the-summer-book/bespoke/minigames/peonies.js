// М1 «The Peonies» (П.2, the shore at dawn, after the piece `peonies`: Grandmother sits in the peonies, her hand in the
// earth among the stems), in the insert `stems` (closeups: the stems close, her old hand among them — opened by
// `stems_open`): pull slowly — a dashed ring on the stem's end in her hand (`stems#stem`); each slow pull parts the
// stems a little more (`stems` +1/3 — the insert's pull, her hand going in), till the teeth can be seen. Too fast — a
// stalk breaks (a mistake: jerked; that pull spent). All parted — the insert closes: the end (clean; flawed if a stalk
// broke — and Grandmother: «Oh well»); the piece after it: something glints in the grass.
//   What she does: Grandmother parts the peony stalks, feeling for her false teeth in the earth.
//   What she wants: to find them before anyone wakes — and not to break the peonies.
//   How it is for her: the funny humiliation of being old; dawn, nobody watching.
//   What the player feels: a slow, careful parting — an old hand among stems.
//   → { broke: stalks broken }
import { keys, settle, slowly, count } from './hands.js';

export default {
  title: tr('The Peonies'),
  about: 8,
  skipped: { broke: 0 },
  points: ['stems#stem'],
  keys: ['stems_open', 'stems'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('The peonies are thick, and somewhere under them are her teeth.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('stems_open', 0, 0.4); g.set('stems', 1); });
    send('stems', 0);
    g.set('stems_open', 1, 0.4);
    const r = await slowly(g, b, mg, { at: 'stems#stem', pulls: 3, frame: u => send('stems', u) });
    if (!r) return this.skipped;
    if (!(await count(mg, 0.8))) return this.skipped;
    g.set('stems_open', 0, 0.4);
    over();
    await mg.end({ as: r.self ? 'neutral' : r.jerks ? 'flawed' : 'clean' });
    if (r.jerks) await g.say('grandma', 'Oh well');
    return { broke: r.jerks };
  },
};
