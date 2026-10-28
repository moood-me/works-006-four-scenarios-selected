// М11 «Sitting Upright» (the finale «The Shawl on the Rock», the big boat on the last morning, after the piece `swell`:
// out on the swell, Grandmother on her thwart): balance — lead anywhere, the arrow her body in the rocking boat (`lean`), pushed
// by the swell (`sway` — the swell, rising and falling with the push); a quiet ring on her (`grandma#chest`), its arc of
// danger how far she leans. Leant too far — she sways (a mistake; she catches herself). It ends by its count (SECONDS
// from the first touch; the bar — the time kept upright by the finger; the scenario gives it no colour of its own, the
// plate's end says how it went); the swell eases.
//   What she does: Grandmother sits upright in the rocking boat, the island going into the fog behind.
//   What she wants: to sit straight — tired, wrapped in his jacket, not to be held.
//   How it is for her: the shawl left on the rock; the night behind the tent in her bones; the doctor in town.
//   What the player feels: keeping upright against the swell.
//   → { slips }
import { clamp, keys, balance, settle, wobble } from './hands.js';

const SECONDS = 9, PUSH = 0.7;

export default {
  title: tr('Sitting Upright'),
  about: 11,
  skipped: { slips: 0 },
  points: ['grandma#chest'],
  keys: ['sway', 'lean'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A rocking boat, and the fog closing behind.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('sway', 0.4, 1.5); g.set('lean', 0, 0.6); });
    const swell = t => wobble(t, PUSH, 0.9);
    const r = await balance(g, b, mg, { at: 'grandma#chest', seconds: SECONDS, push: swell,
      frame: ({ on, t, arrow }) => {
        send('sway', on ? clamp(0.5 + 0.5 * Math.abs(swell(t)) / PUSH) : 0.6);
        send('lean', arrow);
      } });
    if (!r) return this.skipped;
    g.set('sway', 0.4, 1.5);
    g.set('lean', 0, 0.6);
    over();
    await mg.end({ as: r.as });
    return { slips: r.slips };
  },
};
