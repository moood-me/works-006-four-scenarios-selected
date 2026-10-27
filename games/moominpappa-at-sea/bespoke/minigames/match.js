// М3 «The Match» (2.2, the lantern room, after the piece `lamp_look`: Papa at the burner), in the insert `match` (the
// people package's closeups shot: Papa's paw bringing a lit match to the wick, the draught bending its flame — opened
// by `match_open`; the piece opens it, the piece after it closes it): pull — a dashed ring on the match's flame
// (`match#flame`), its way to the wick (`match#wick`); heavy: against the draught from the gallery it comes only while
// the finger pulls ahead of it. `match` — where the match is on its way. Let go before the wick — the draught blows it
// out halfway (a mistake: let go early); a moment later he strikes another and it is back at the start. At the wick
// (`match` ≥ THERE) — the end (clean; flawed if a match went out); the piece after it (`smoke_out`): the flame
// catches, smokes and goes out.
//   What he does: Papa brings a match to the lamp's wick against the draught.
//   What he wants: to light the lighthouse — the first time, at once.
//   How it is for him: hope; a little showing off before My.
//   What the player feels: shielding a small flame all the way to the wick.
//   → { matches: how many matches it took }
import { until, keys, teach, settle, count } from './hands.js';

const THERE = 0.97;
const OUT = 0.7; // s: the match out before the next is struck

export default {
  title: tr('The Match'),
  about: 9,
  skipped: { matches: 1 },
  points: ['match#flame', 'match#wick'],
  keys: ['match_open', 'match', 'match_out'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A wick, a match, and a draught from the gallery.') });
    const send = keys(g);
    settle(signal, () => { g.set('match', 1); g.set('match_out', 0); });
    send('match', 0);
    g.set('match_open', 1, 0.4);
    g.sound.strike();
    const flame = mg.mark({ at: 'match#flame', kind: 'dash' });
    const pull = mg.pull({ on: flame, to: 'match#wick', heavy: true, release: 'stay' });
    teach(b, mg, [pull]);
    let matches = 1, out = false;
    pull.on('release', ({ u }) => {
      if (u >= THERE || u < 0.05 || out) return;
      out = true;
      g.set('match_out', 1);
      g.failed();
      mg.error('early', { at: flame });
    });
    for (;;) {
      const lit = await until(mg, () => {
        const s = pull.state;
        if (!out) send('match', s.shown ?? s.u);
        mg.plate.set({ fill: s.u, glow: out ? 'bad' : s.held ? 'good' : 'idle' });
        return out || s.u >= THERE;
      });
      if (!lit) return this.skipped;
      if (!out) break;
      // the match blown out: another struck, from the start
      if (!(await count(mg, OUT))) return this.skipped;
      matches++;
      pull.set({ u: 0 });
      g.set('match_out', 0);
      send('match', 0);
      g.sound.strike();
      out = false;
    }
    send('match', 1);
    mg.snap({ at: flame });
    await mg.end({ as: matches > 1 ? 'flawed' : 'clean' });
    return { matches };
  },
};
