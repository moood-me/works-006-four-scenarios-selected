// М4 «The Pebble» (2.1, the shore in the calm, after the piece `calm`: the two of them back to back and cross,
// Grandmother's hand with a pebble over the glass water): hold, then let go — a groove on the pebble in her hand (`grandma#pebble`):
// held till full, the pebble is in her fingers, her
// hand out over the water (`pebble_hand`, going out as the hold takes); then the sea lies waiting, like glass (the plate says so) and the arc of
// time runs: lifted — it falls, rings spread on the glass (`rings` one more), and nothing else happens; not lifted in
// WAIT s — she drops it without looking, all the same (the scenario: no colour of its own; skipped — the same, a long
// breath later). The end (neutral: nothing to win); the piece after it: the rings die away, the second pebble.
//   What she does: Grandmother, sulking with her back to the child, drops a pebble into the glassy water.
//   What she wants: to make peace without saying so.
//   How it is for her: cross like a little girl; the calm heavy; the quarrel already silly.
//   What the player feels: opening the fingers — and watching nothing happen.
//   → {}
import { letGo, settle, count, keys } from './hands.js';

const WAIT = 5;

export default {
  title: tr('The Pebble'),
  about: 7,
  skipped: {},
  points: ['grandma#pebble'],
  keys: ['rings', 'pebble_hand'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('The sea like glass, and a pebble in an old hand.') });
    const thrown = () => g.set('rings', (g.get('rings') ?? 0) + 1);
    const send = keys(g);
    const over = settle(signal, () => { thrown(); g.set('pebble_hand', 0, 1); });
    send('pebble_hand', 0);
    const how = await letGo(g, b, mg, { at: 'grandma#pebble', take: 1, wait: WAIT, held: u => send('pebble_hand', u), sign: () => {
      mg.plate.set({ phrase: tr('Not a ripple on the glass. Nothing moves.') });
    } });
    if (!how) return this.skipped;
    over();
    thrown();
    g.set('pebble_hand', 0, 1.2);
    if (!(await count(mg, 1.6))) return {};
    await mg.end({ as: 'neutral' });
    return {};
  },
};
