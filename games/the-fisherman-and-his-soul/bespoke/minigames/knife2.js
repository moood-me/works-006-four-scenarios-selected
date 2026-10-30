// М6 «The Knife, Again» (4.2, the pier, after the piece `knife_rust`: the rusty knife pulled out of the post, the one
// shadow at his feet again): trace — the same line as at moonrise (`cutline#heel` → `cutline#toe`), the cut coming
// with it (`cut`) — and closing behind the blade like water (`cut` back to 0 as it ends): a knife cuts once, the line
// true or not. Off the line — a mistake: he throws the knife down on the boards before he drives it back into the post
// (the piece `knife_back`, `thrown`). The line drawn — the end (neutral: it was never going to cut; flawed if off).
//   What he does: the Fisherman tries to cut his soul away a second time.
//   What he wants: to go down to her again.
//   How it is for him: she does not come; the Soul's lie, his own face inside him.
//   What the player feels: the same careful gesture — and nothing it can do.
//   → { thrown }
import { keys, settle, count, line } from './hands.js';

export default {
  title: tr('The Knife, Again'),
  about: 10,
  skipped: { thrown: false },
  missed: { thrown: true },
  points: ['cutline#heel', 'cutline#toe'],
  keys: ['cut'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A rusty knife, and a shadow that is one again.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('cut', 0));
    g.set('cut', 0);
    let scraped = -1;
    const r = await line(g, b, mg, { from: 'cutline#heel', to: 'cutline#toe', progress: u => {
        if (u - scraped > 0.3) { scraped = u; g.sound.scrape(); }
        send('cut', u);
      } });
    if (!r) return this.skipped;
    mg.plate.set({ phrase: tr('The blade goes through the shadow as through water.') });
    g.set('cut', 0, 1.2);
    if (!(await count(mg, 1.4))) return this.skipped;
    over();
    await mg.end({ as: r.offs ? 'flawed' : 'neutral' });
    return { thrown: r.offs > 0 };
  },
};
