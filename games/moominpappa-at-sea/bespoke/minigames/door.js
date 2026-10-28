// М6а «The Door» (3.1, the landing, the morning of the 24th, after the piece `pines`: Papa leaning on the door, the
// pines at the threshold): pull slowly — a dashed ring on the door (`door#door`), its way to Papa (`papa#chest`: the door
// drawn open toward him, against the pines), seen as it is pulled and shown by the ghost from the first second (again
// whenever the player stands still); heavy — the door comes only while the finger pulls ahead of it, a palm's width at a
// time however fast the finger goes (forgiving: nothing to get wrong but letting go, and let go it stays where it is).
// `door` — how far open. Each palm's width (a notch of the bar) — the door creaks. Open (`door` ≥ THERE) — the end
// (clean); the piece after it: the rime's trail on the threshold.
//   What he does: Papa leans on the lighthouse door against the pines that crept up to it overnight.
//   What he wants: to open it — trees don't walk.
//   How it is for him: stubbornness; a little fear he does not show.
//   What the player feels: pulling against something that gives only a palm's width at a time.
//   → {}
import { until, keys, teach, settle } from './hands.js';

const PALMS = 4, THERE = 0.97;

export default {
  title: tr('The Door'),
  about: 8,
  skipped: {},
  points: ['door#door', 'papa#chest'],
  keys: ['door'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Pines against the door.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('door', 1, 0.5));
    send('door', 0);
    mg.plate.set({ notches: Array.from({ length: PALMS - 1 }, (_, i) => (i + 1) / PALMS) });
    const leaf = mg.mark({ at: 'door#door', kind: 'dash' });
    const pull = mg.pull({ on: leaf, to: 'papa#chest', heavy: true, release: 'stay' });
    teach(b, mg, [pull]);
    let palms = 0;
    const done = await until(mg, () => {
      const s = pull.state;
      send('door', s.shown ?? s.u);
      const k = Math.floor(s.u * PALMS + 1e-6);
      if (k > palms) { palms = k; g.sound.creak(); }
      mg.plate.set({ fill: s.u, glow: s.held ? 'good' : 'idle' });
      return s.u >= THERE;
    });
    if (!done) return this.skipped;
    send('door', 1);
    mg.snap({ at: leaf });
    over();
    await mg.end({ as: 'clean' });
    return {};
  },
};
