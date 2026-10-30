// М3 «The Knife» (1.10, the pier at moonrise, after the piece `knife_ready`: the Fisherman crouched at his heels, the
// Witch's knife in his hand, his long shadow on the boards): trace — the knife along the shadow's edge at his soles,
// from the heel to the toe (`cutline#heel` → `cutline#toe`), the cut coming with it (`cut` 0…1). Off the line — the cut
// goes uneven (`cut_rough`, a mistake): the Soul's left hand stays blurred like smoke to the end of the game. The line
// drawn — the end (clean; flawed if uneven).
//   What he does: the Fisherman cuts his soul away from his feet.
//   What he wants: to be free of it — quickly, for her.
//   How it is for him: the moon at his back, she watching from the stone, his own face pleading beside him.
//   What the player feels: a careful line that cuts away a part of oneself.
//   → { rough }
import { keys, settle, count, line } from './hands.js';

export default {
  title: tr('The Knife'),
  about: 10,
  skipped: { rough: false },
  missed: { rough: true },
  points: ['cutline#heel', 'cutline#toe'],
  keys: ['cut', 'cut_rough'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A long shadow on the boards, and a knife with a green snakeskin handle.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('cut', 1));
    g.set('cut', 0);
    g.set('cut_rough', false);
    let scraped = -1;
    const r = await line(g, b, mg, { from: 'cutline#heel', to: 'cutline#toe', progress: u => {
        if (u - scraped > 0.3) { scraped = u; g.sound.scrape(); }
        send('cut', u);
      },
      off: () => g.set('cut_rough', true) });
    if (!r) return this.skipped;
    const rough = r.offs > 0;
    if (!(await count(mg, 0.6))) return this.skipped;
    over();
    await mg.end({ as: rough ? 'flawed' : 'clean' });
    return { rough };
  },
};
