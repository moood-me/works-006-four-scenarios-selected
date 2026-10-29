// М5 «The Cup» (3.6 «вернуть тихо», the potter's room in the morning, after the piece `bend_daughter`: the potter on his
// knees by his daughter, his back to the shelf; the silver cup in the Fisherman's hand): balance — the cup is what
// tilts (a quiet ring on it, `fisherman#cup`; his unsteady hand rocks it, the finger leads it level), `cup_tilt` with
// the arrow; he goes from the bench to the shelf as the count goes (`carry` 0 → 1), and at its end the cup stands behind
// the bread (`cup_at` shelf). Off too far — it rings against the shelf (a mistake): the potter turns his head to it
// (`potter_look`). The count out — the end (clean; flawed if it rang).
//   What he does: the Fisherman puts the stolen cup back, unseen.
//   What he wants: that no one should know — not the potter, not the child.
//   How it is for him: hands that took it without him; the potter's back a step away.
//   What the player feels: carrying something that must not make a sound.
//   → { rang }
import { keys, settle, balance, wobble } from './hands.js';

const SECONDS = 8;

export default {
  title: tr('The Cup'),
  about: 8,
  skipped: { rang: false },
  missed: { rang: true },
  points: ['fisherman#cup'],
  keys: ['cup_tilt', 'carry', 'cup_at'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A silver cup, a shelf, and the potter’s back.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('carry', 1); g.set('cup_tilt', 0); g.set('cup_at', 'shelf'); });
    g.set('cup_at', 'hand');
    g.set('carry', 0);
    let rang = false;
    const r = await balance(g, b, mg, { at: 'fisherman#cup', seconds: SECONDS, width: 0.45,
      push: t => wobble(t, 0.7, 2.1),
      frame: ({ arrow, t }) => { send('cup_tilt', Math.max(-1, Math.min(1, arrow))); send('carry', Math.min(1, t / SECONDS)); },
      slip: () => {
        if (rang) return;
        rang = true;
        g.set('potter_look', 'fisherman#cup');
        mg.plate.set({ phrase: tr('The cup rings against the shelf.') });
      } });
    if (!r) return this.skipped;
    g.set('cup_tilt', 0, 0.3);
    g.set('carry', 1, 0.4);
    g.set('cup_at', 'shelf');
    over();
    await mg.end({ as: r.alone ? 'neutral' : rang ? 'flawed' : 'clean' });
    return { rang };
  },
};
