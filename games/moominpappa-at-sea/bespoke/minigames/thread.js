// М5б «The Thread» (Ш1 «to Mama», the round room at night, after the piece `n1_mama`: Mama's needle by the lantern),
// in the insert `needle` (the people package's closeups shot: the needle held up in her left paw, the thread's end —
// opened by `needle_open`): pull — a dashed ring on the thread's end (`needle#thread`), its way to the eye
// (`needle#eye`); `thread` — the end to the eye (EYE) as the finger draws it. Let go off the eye — it springs back (his
// paws are big: it comes out funny; no mistake, he tries again). Let go at the eye — it goes through (`thread` 1), the
// insert closes: the end (clean).
//   What he does: Papa threads Mama's needle for her.
//   What he wants: a small thing for her — to sit with her this evening.
//   How it is for him: clumsy, tender, a little ashamed of his big paws.
//   What the player feels: a fine small aim with a big paw.
//   → { tries: how many times it was let go }
import { until, keys, teach, settle, count } from './hands.js';

const EYE = 0.85;

export default {
  title: tr('The Thread'),
  about: 7,
  skipped: { tries: 1 },
  points: ['needle#thread', 'needle#eye'],
  keys: ['needle_open', 'thread'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A needle, a thread, and big paws.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('needle_open', 0, 0.4); g.set('thread', 1); });
    send('thread', 0);
    g.set('needle_open', 1, 0.4);
    const end = mg.mark({ at: 'needle#thread', kind: 'dash' });
    const pull = mg.pull({ on: end, to: 'needle#eye', release: 'spring' });
    teach(b, mg, [pull]);
    let tries = 0, through = false;
    pull.on('release', ({ inTarget }) => { tries++; if (inTarget) through = true; });
    const done = await until(mg, () => {
      const s = pull.state;
      if (!through) send('thread', EYE * (s.shown ?? s.u));
      mg.plate.set({ fill: through ? 1 : 0.9 * s.u, glow: s.inTarget ? 'good' : 'idle' });
      return through;
    });
    if (!done) return this.skipped;
    g.set('thread', 1, 0.5);
    mg.snap({ at: end });
    end.remove();
    if (!(await count(mg, 0.9))) return this.skipped;
    g.set('needle_open', 0, 0.4);
    over();
    await mg.end({ as: 'clean' });
    return { tries };
  },
};
