// М5в «The Door» (Ш1 «moon», the room by the full moon, after the piece `to_door`: her hand on the handle of the second
// door, Sophia's hand in her other): pull slowly — a dashed ring on the handle (`door2#handle`); each slow pull opens
// the creaking door a little more (`creak` +1/3, the leaf going out into the entry). Too fast — it creaks aloud (a
// mistake; that pull spent: on the veranda Papa stirs in his sleep). Open — the end (clean; flawed if it creaked); the
// piece after it: the two go out into the night.
//   What she does: Grandmother opens the creaking door slowly, to lead the child out on the sly.
//   What she wants: to take her out to the moon's path — and wake no one.
//   How it is for her: a conspiracy; an old woman and a child at midnight.
//   What the player feels: a slow pull, holding the creak in.
//   → { creaked }
import { keys, settle, slowly } from './hands.js';

export default {
  title: tr('The Door'),
  about: 8,
  skipped: { creaked: 0 },
  points: ['door2#handle'],
  keys: ['creak'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('The second door creaks, and Papa sleeps on the veranda.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('creak', 1, 0.8));
    send('creak', 0);
    const r = await slowly(g, b, mg, { at: 'door2#handle', pulls: 3, frame: u => send('creak', u),
      jerk: () => g.mood('papa', 'surprised') });
    if (!r) return this.skipped;
    if (r.jerks) g.mood('papa', 'neutral');
    over();
    await mg.end({ as: r.self ? 'neutral' : r.jerks ? 'flawed' : 'clean' });
    return { creaked: r.jerks };
  },
};
