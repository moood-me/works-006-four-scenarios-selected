// М8б «The Blanket» (3.4 «blanket», the room in the storm at night, after the piece `under`: the two of them under the
// blanket, the lamp's glow under it): hold, by its count — a groove on the blanket's edge (`beds#cover`): from the first
// touch SECONDS of holding it up over the two of them (`cover` — the edge, rising as the hold takes and sagging as it
// ebbs); let go — it slips, the storm comes in (a mistake: held again, it rises again). The count out — the end (clean;
// flawed if it slipped); the piece after it: she sings the old song, hoarsely, and Sophia falls asleep.
//   What she does: Grandmother holds the blanket over the child and herself in the storm.
//   What she wants: to cover her — a house under the blanket, a lamp, a song.
//   How it is for her: the thunder; an old arm held up; tenderness.
//   What the player feels: holding a roof over two heads.
//   → { slips }
import { keys, keep, settle } from './hands.js';

const SECONDS = 8;

export default {
  title: tr('The Blanket'),
  about: 10,
  skipped: { slips: 0 },
  points: ['beds#cover'],
  keys: ['cover'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Thunder, and a blanket over two heads.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('cover', 1, 0.6));
    send('cover', 0.5);
    const r = await keep(g, b, mg, { at: 'beds#cover', seconds: SECONDS, take: 1,
      frame: ({ u, on }) => send('cover', on ? 0.3 + 0.7 * u : 0.5),
      slip: () => g.mood('sophia', 'afraid') });
    if (!r) return this.skipped;
    send('cover', 1);
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
