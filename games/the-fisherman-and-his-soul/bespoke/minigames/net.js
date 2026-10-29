// М1 «The Net» (П.2, the stone at night, after the piece `night`: the boat by the stone, the net cast over the bow, his
// hands on its rope): pull slowly — a dashed ring on the rope (`net_over#rope`); each slow pull draws the net in a
// length (`haul` 0 → 1), the boat heeling under its weight (`heel`). Too fast — it jerks: the net tears at the edge
// (`net_hole` 1, a mistake; that pull spent) — the hole is seen on the pier's rail all game, and in 4.8. All drawn in —
// the end (clean; flawed if it tore).
//   What he does: the Fisherman hauls a net too heavy for fish.
//   What he wants: whatever is in it — all the fish of the sea, or trouble.
//   How it is for him: night, the boat heeling, the rope cutting his palms.
//   What the player feels: a heavy weight that comes only slowly.
//   → { torn }
import { keys, settle, slowly, count } from './hands.js';

export default {
  title: tr('The Net'),
  about: 10,
  skipped: { torn: false },
  missed: { torn: true },
  points: ['net_over#rope'],
  keys: ['haul', 'heel', 'net_hole'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('The net is heavy, and the boat heels.') });
    const send = keys(g);
    const over = settle(signal, () => { g.set('haul', 1); g.set('heel', 0, 0.8); });
    send('haul', 0);
    let torn = false;
    const r = await slowly(g, b, mg, { at: 'net_over#rope', pulls: 4,
      frame: u => { send('haul', u); send('heel', 0.3 + 0.7 * Math.sin(Math.PI * Math.min(1, u))); },
      jerk: () => { if (!torn) { torn = true; g.set('net_hole', 1); mg.plate.set({ phrase: tr('A thread snaps at the edge of the net.') }); } } });
    if (!r) return this.skipped;
    g.set('heel', 0, 0.8);
    if (!(await count(mg, 0.6))) return this.skipped;
    over();
    await mg.end({ as: r.self ? 'neutral' : torn ? 'flawed' : 'clean' });
    return { torn };
  },
};
