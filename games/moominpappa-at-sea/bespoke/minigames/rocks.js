// М9в «Over the Rocks» (Ш3 «the cape», the cape in the storm, after the piece `crossing`: Papa with the lantern before
// the first hold): pull, step by step — a dashed ring on Papa (`papa#chest`), its way to the next hold of the rock
// (`granite#hold1…3`, one at a time); heavy: against the storm he comes only while the finger pulls ahead of him.
// `cross` — where he is (0…3: at each hold; the scene puts him along the way). Let go — he stays where he is, clinging.
// At the hold — a step done (the sea breaks on the rocks); the third — the end (clean); the piece after it: the lantern
// blown out halfway.
//   What he does: Papa goes over the rocks to the Fisherman in the storm, holding on to the rock.
//   What he wants: to get to the man sitting under the waves — «man overboard».
//   How it is for him: for someone else; the storm against him; afraid and going.
//   What the player feels: hauling himself, a hold at a time.
//   → {}
import { until, keys, teach, settle } from './hands.js';

const HOLDS = 3, THERE = 0.97;

export default {
  title: tr('Over the Rocks'),
  about: 11,
  skipped: {},
  points: ['papa#chest', 'granite#hold1', 'granite#hold2', 'granite#hold3'],
  keys: ['cross'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Rocks, foam, and a lantern in the wind.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('cross', HOLDS));
    send('cross', 0);
    mg.plate.set({ notches: Array.from({ length: HOLDS - 1 }, (_, i) => (i + 1) / HOLDS) });
    for (let n = 1; n <= HOLDS; n++) {
      const papa = mg.mark({ at: 'papa#chest', kind: 'dash' });
      const pull = mg.pull({ on: papa, to: `granite#hold${n}`, heavy: true, release: 'stay' });
      const taught = teach(b, mg, [pull]);
      const there = await until(mg, () => {
        const s = pull.state;
        send('cross', n - 1 + (s.shown ?? s.u));
        mg.plate.set({ fill: (n - 1 + s.u) / HOLDS, glow: s.held ? 'good' : 'idle' });
        return s.u >= THERE;
      });
      taught.remove();
      if (!there) return this.skipped;
      send('cross', n);
      mg.snap({ at: papa });
      papa.remove();
      g.sound.wave(0.8);
    }
    over();
    await mg.end({ as: 'clean' });
    return {};
  },
};
