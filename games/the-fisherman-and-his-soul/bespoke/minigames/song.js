// М4 «The Song» (2.1, the deep, after the piece `deep_song`: the two on the sand, she singing): touch nothing —
// SECONDS of the play's time while she sings (the song is the game's sound). A touch — she stops, laughs (her face),
// and begins again nearer (`mermaid_near` up; a quiet mistake, the count begins again); at the second touch she sings
// on holding his hand (`hands` true) and it ends there. The count out — the end (neutral: listening is the action).
//   What he does: the Fisherman listens to her sing under the water.
//   What he wants: nothing more than this.
//   How it is for him: light in pillars, weed, fish — a year like a single evening.
//   What the player feels: keeping still so as not to break it.
//   → { touches }
import { until, handsOff, settle } from './hands.js';

const SECONDS = 10;

export default {
  title: tr('The Song'),
  about: 10,
  skipped: { touches: 0 },
  missed: { touches: 2 },
  points: [],
  keys: ['mermaid_near', 'hands'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('Four notes under the water.') });
    const over = settle(signal, () => g.set('mermaid_mood', 'smile'));
    const sign = handsOff(mg);
    g.set('mermaid_near', 0);
    let touches = 0, t0 = mg.t, laughed = null;
    const off = mg.on('down', () => {
      touches++;
      g.failed();
      mg.error('early', { chip: true });
      g.set('mermaid_mood', 'laugh');
      laughed = mg.t;
      if (touches === 1) { g.set('mermaid_near', 1, 1.5); t0 = mg.t + 1.2; }
      else g.set('hands', true);
    });
    const done = await until(mg, ({ t }) => {
      if (laughed != null && t - laughed >= 1.2) { laughed = null; g.set('mermaid_mood', 'smile'); }
      mg.plate.set({ fill: Math.min(1, Math.max(0, t - t0) / SECONDS), glow: 'idle' });
      return t - t0 >= SECONDS || touches >= 2;
    });
    off();
    sign.remove();
    if (!done) return this.skipped;
    g.set('mermaid_mood', 'smile');
    over();
    await mg.end({ as: 'neutral' });
    return { touches };
  },
};
