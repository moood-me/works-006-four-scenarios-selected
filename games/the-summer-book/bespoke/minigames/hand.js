// М5б «The Hand» (Ш1 «sky», the room by the full moon, the piece `sky` ending in its pose: the two hands between the
// beds, Sophia's face on her pillow), in the insert `gap` (closeups: the gap between the beds, Grandmother's old hand,
// Sophia's small one in it — opened by `gap_open`): hold, by its count — a groove on the hands (`gap#palm`): from the
// first touch SECONDS of holding her hand till she falls asleep. Let go — in her sleep Sophia's hand slides off and
// gropes over the blanket (`gap_hand` drops), a mistake; held again — her hand finds Grandmother's by itself (`gap_hand`
// back). The count out — asleep: the insert closes, the end (clean; flawed if let go); the piece after it: in the
// morning «Mama sees».
//   What she does: Grandmother holds the child's hand across the gap till she falls asleep.
//   What she wants: to comfort her — «not soon».
//   How it is for her: the promise just given; the moon in the window; Papa breathing out on the veranda.
//   What the player feels: holding a small hand still, till it goes slack with sleep.
//   → { slips: times it was let go }
import { keys, keep, settle } from './hands.js';

const SECONDS = 8;

export default {
  title: tr('The Hand'),
  about: 10,
  skipped: { slips: 0 },
  points: ['gap#palm'],
  keys: ['gap_open', 'gap_palm', 'gap_hand'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A small hand in an old one, and the moon in the window.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('gap_open', 0, 0.4); g.set('gap_hand', 1); });
    g.set('gap_palm', 1);
    g.set('gap_hand', 1);
    g.set('gap_open', 1, 0.4);
    let hand = 1;
    const r = await keep(g, b, mg, { at: 'gap#palm', seconds: SECONDS, take: 0.8,
      frame: ({ fill, taken, held, dt }) => {
        hand = !taken ? 1 : held ? Math.min(1, hand + dt * 0.8) : Math.max(0.4, Math.min(hand, fill));
        send('gap_hand', hand);
      },
      slip: () => g.mood('sophia', 'sad') });
    if (!r) return this.skipped;
    send('gap_hand', 1);
    g.set('gap_open', 0, 0.6);
    over();
    await mg.end({ as: r.slips ? 'flawed' : 'clean' });
    return r;
  },
};
