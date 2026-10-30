// М2 «The Dance» (1.5, the well at midnight, after the piece `dance`: the Witch with her tambourine and the Fisherman
// facing her, going round the well — `round`): rhythm — the beats of her tambourine (`witch#tambourine`, BPM), SECONDS of
// them; a tap on the beat is his step in time with her; off the beat — he stumbles (`stumble`, a pulse; a mistake), and
// she pulls him by the hands harder and laughs. The count out — the end (clean if he kept her beat most of the time;
// flawed — stumbled: fewer than half the beats kept, or none). The tambourine is heard on every beat (sound.js strike —
// the piece's own tambourine hushed: the beat is the mini-game's now).
//   What he does: the Fisherman dances the Witch's dance — her price for the secret.
//   What he wants: to pay it and be done.
//   How it is for him: someone else's dance, the full moon, her eyes on him.
//   What the player feels: keeping a stranger's beat.
//   → { stumbled }
import { until, settle, teach } from './hands.js';

const BPM = 100, SECONDS = 12;

export default {
  title: tr('The Dance'),
  about: 12,
  skipped: { stumbled: false },
  missed: { stumbled: true },
  points: ['witch#tambourine'],
  keys: ['round', 'stumble'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A tambourine, the full moon, and two dancing round the well.') });
    const over = settle(signal, () => g.set('stumble', 0));
    g.set('round', true);
    const mark = mg.mark({ at: 'witch#tambourine' });
    const beat = mg.rhythm({ on: mark, bpm: BPM });
    g.sound.hush('tambourine', 0.1);
    const struck = beat.on('beat', ({ strong }) => g.sound.strike(strong));
    const taught = teach(b, mg, [beat]);
    const kept = new Set();
    let offs = 0;
    const stumble = () => { g.set('stumble', 1); g.set('stumble', 0, 0.5); };
    const off = beat.on('tap', ({ k, hit }) => {
      if (hit) { kept.add(k); return; }
      offs++;
      g.failed();
      mg.error('timing', { at: mark, chip: true });
      stumble();
    });
    const t0 = mg.t;
    const done = await until(mg, ({ t }) => {
      mg.plate.set({ fill: Math.min(1, (t - t0) / SECONDS), glow: kept.size ? 'good' : 'idle' });
      return t - t0 >= SECONDS;
    });
    off();
    struck();
    taught.remove();
    if (!done) return this.skipped;
    const beats = Math.max(1, Math.floor(SECONDS * BPM / 60) - 1);
    const stumbled = kept.size < beats / 2;
    if (!stumbled) mg.snap({ at: mark });
    beat.remove();
    mark.remove();
    over();
    await mg.end({ as: stumbled ? 'flawed' : 'clean' });
    return { stumbled, offs };
  },
};
