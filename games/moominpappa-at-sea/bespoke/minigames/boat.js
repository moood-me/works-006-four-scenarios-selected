// М8 «The Boat» (4.1, the landing, the grey morning of the 25th, after the piece `storm_coming`: Papa and the boy at the
// boat): rhythm with the other — the boy heaves in his own time: a breathing ring on the boat (`boat#boat`), held while
// it grows (the boy heaves — they pull together: the boat comes up the rocks, `boat_up` += a share of the heave), let
// go while it falls (the boy takes breath). Pulling while he rests — a jerk out of time (a mistake: too early or too
// late; once a breath): the boy looks round (`troll` surprised for a moment). Up (`boat_up` 1) — the end (clean; flawed
// if it jerked); the piece after it: they straighten up.
//   What he does: Papa and his son pull the boat up the rocks before the storm.
//   What they want: to save the boat — together, without words.
//   How it is for him: the one «together» of father and son; the boy says nothing.
//   What the player feels: pulling in another's time, not one's own.
//   → { jerks }
import { clamp, until, keys, teach, settle } from './hands.js';

const BPM = 62; // a heave a beat, a breath the next
const HEAVES = 4; // heaves held through, the boat up
const GRACE = 0.25; // s into his breath before pulling on is a jerk

export default {
  title: tr('The Boat'),
  about: 10,
  skipped: { jerks: 0 },
  points: ['boat#boat'],
  keys: ['boat_up'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A heavy boat, and two pulling.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('boat_up', 1, 0.6));
    send('boat_up', 0);
    const beat = 60 / BPM;
    const hull = mg.mark({ at: 'boat#boat', kind: 'ring' });
    const heave = mg.rhythm({ on: hull, bpm: BPM, breath: true });
    teach(b, mg, [heave]);
    let up = 0, jerks = 0, jerked = -1, back = 0, breath = null, since = 0;
    const done = await until(mg, ({ dt }) => {
      const s = heave.state;
      if (s.breath !== breath) { breath = s.breath; since = 0; } else since += dt;
      if (s.held && s.breath === 'in') up = clamp(up + dt / (HEAVES * beat));
      if (s.held && s.breath === 'out' && since >= GRACE && s.k !== jerked) {
        jerked = s.k;
        jerks++;
        g.failed();
        mg.error('timing', { at: hull });
        g.mood('troll', 'surprised');
        back = 1.2;
      }
      if (back > 0 && (back -= dt) <= 0) g.mood('troll', 'neutral');
      send('boat_up', up);
      mg.plate.set({ fill: up, glow: s.held ? (s.breath === 'in' ? 'good' : 'bad') : 'idle' });
      return up >= 1;
    });
    if (!done) return this.skipped;
    send('boat_up', 1);
    mg.snap({ at: hull });
    g.sound.creak();
    over();
    await mg.end({ as: jerks ? 'flawed' : 'clean' });
    return { jerks };
  },
};
