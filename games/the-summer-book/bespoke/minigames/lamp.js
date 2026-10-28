// М10б «The Lamp» (Ш3 «papa», the room in the fog at night, after the piece `shine`: Grandmother at the window, the lamp
// raised to the glass, her face by it; Papa's light going off into the white): hold, by its count — a groove on the
// lamp (`lamp#lamp`): from the first touch SECONDS of holding it up to the glass (`lamp_up` — up as the hold takes,
// sinking as it ebbs) while his light goes away into the fog. Lowered — Papa's light in the fog is lost for a moment and
// found again (a mistake: held up again, the lamp rises again). The count out — the end (clean; flawed if lowered); the
// piece after it: a long time nothing, then out of the white comes one light.
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
  keys: ['lamp_up'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A lamp at the window, and a light going away into the white.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('lamp_up', 1, 0.6));
    send('lamp_up', 1);
    const r = await keep(g, b, mg, { at: 'lamp#lamp', seconds: SECONDS, take: 0.8,
      frame: ({ u, on }) => send('lamp_up', on ? 0.4 + 0.6 * u : 1) });
    if (!r) return this.skipped;
    send('lamp_up', 1);
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
