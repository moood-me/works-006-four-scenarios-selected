// М2 «The Tiller» (1.2, the sea at night, after the piece `night`: seen from behind the stern, Papa's back at the
// tiller, the bow and the star in the middle): lead anywhere — the arrow is the bow off the star (`heading` −1…1, the
// scene turns the boat by it), steered (`rate`); the zone — on the star. Three waves come one after another: each lifts
// the swell (`wave` up to 1 and down) and shoves the bow to one side, then the other (`push`). Blown right off the star
// (|heading| ≥ BLOWN) — a mistake (off the way), once a wave. After the third wave — the end (clean; flawed if blown
// off — and Papa, as if nothing were wrong: «Just as planned»). It ends by its count, steered or not.
//   What he does: Papa steers his family across the night sea by a star.
//   What he wants: to lead his own — a captain who knows the way.
//   How it is for him: proud, a little unsure in the dark, the boat heavy with sleeping people.
//   What the player feels: keeping the bow on the star against the waves.
//   → { blown: how many waves blew the bow off the star }
import { clamp, until, keys, teach, settle } from './hands.js';

const WAVES = 3, FIRST = 1.2, EVERY = 3.4, SHOVE = 2.2; // s: the first wave; one after another; each shoves this long
const PUSH = 0.7; // the shove at its height (the finger steers at 0.8)
const ZONE = 0.4, BLOWN = 0.9;

export default {
  title: tr('The Tiller'),
  about: 12,
  skipped: { blown: 0 },
  points: [],
  keys: ['heading', 'wave'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A star over the bow, and three waves coming.') });
    const send = keys(g);
    settle(signal, () => { g.set('heading', 0, 1.5); g.set('wave', 0, 2); });
    send('heading', 0);
    const lead = mg.lead({ zone: { at: 0, width: ZONE }, steer: 'rate', release: 'stay', push: 0 });
    teach(b, mg, [lead]);
    const END = FIRST + (WAVES - 1) * EVERY + SHOVE + 1;
    const hit = new Set();
    let blown = 0;
    const t0 = mg.t;
    const done = await until(mg, ({ t }) => {
      const now = t - t0, k = Math.floor((now - FIRST) / EVERY), into = now - FIRST - k * EVERY;
      const on = k >= 0 && k < WAVES && into < SHOVE;
      const swell = on ? Math.sin((Math.PI * into) / SHOVE) : 0;
      lead.set({ push: (k % 2 ? -1 : 1) * PUSH * swell });
      send('wave', swell);
      const a = lead.state.arrow;
      send('heading', a);
      if (on && Math.abs(a) >= BLOWN && !hit.has(k)) {
        hit.add(k);
        blown++;
        mg.error('off', { chip: true });
      }
      mg.plate.set({ fill: clamp(now / END), glow: lead.state.in ? 'good' : on ? 'bad' : 'idle' });
      return now >= END;
    });
    if (!done) return this.skipped;
    g.set('heading', 0, 1.5);
    await mg.end({ as: blown ? 'flawed' : 'clean' });
    if (blown) await g.say('papa', 'Just as planned');
    return { blown };
  },
};
