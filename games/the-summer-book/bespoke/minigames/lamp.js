// М10б «The Lamp» (Ш3 «papa», the room in the fog at night, after the piece `shine`: Grandmother at the window, the lamp
// raised to the glass, her face by it; Papa's light going off into the white): hold, by its count — a groove on the
// lamp (`lamp#lamp`): from the first press SECONDS of holding it up to the glass (`lamp_up` — it stays up till the hold
// has taken; lowered as it ebbs) while his light goes away into the fog. Lowered — a mistake: Papa's light in the fog
// is lost (`far_light` low), and found again once the lamp is held up again. The count out — the end (clean; flawed if
// lowered); the piece after it: a long time nothing, then out of the white comes one light.
//   What she does: Grandmother holds the lamp up to the window for her son going out into the fog.
//   What she wants: to shine — «Sit. Shine» — the one thing she is let do.
//   How it is for her: her arms old; the light going smaller in the white; the child out there.
//   What the player feels: holding a light up, and waiting.
//   → { slips }
import { keys, keep, settle } from './hands.js';

const SECONDS = 9;

export default {
  title: tr('The Lamp'),
  about: 11,
  skipped: { slips: 0 },
  points: ['lamp#lamp'],
  keys: ['lamp_up', 'far_light'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A lamp at the window, and a light going away into the white.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('lamp_up', 1, 0.6); g.set('far_light', 1, 0.6); });
    send('lamp_up', 1);
    let lost = false; // (Papa's light lost in the fog while the lamp was down — found again as it is held up)
    const r = await keep(g, b, mg, { at: 'lamp#lamp', seconds: SECONDS, take: 0.8,
      frame: ({ fill, taken, held }) => {
        send('lamp_up', taken ? 0.4 + 0.6 * fill : 1);
        if (lost && held && fill >= 1) { lost = false; g.set('far_light', 1, 0.8); }
      },
      slip: () => { lost = true; g.set('far_light', 0.1, 0.4); } });
    if (!r) return this.skipped;
    send('lamp_up', 1);
    if (lost) g.set('far_light', 1, 0.8);
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
