// М5а «Steady» (Ш1 «up to the lamp», the lantern room at night, after the piece `n1_up`: Papa with the lantern by the
// sooty wall): hold — a groove on the soot (`soot#grooves`), filled in SECONDS while held: the lantern held sideways,
// its slanting light bringing the keeper's pencil up out of the soot (`slant` = the fill); let go — it ebbs (the
// lantern lowered). The finger drawn more than SHAKE px from where it rests — the lantern trembles, the letters jump (a
// mistake: jerked; the fill falls by DROP). Full — the writing read: the end (clean; flawed if it trembled).
// М5г «Half a Light» is the same at the turned-down flame (half.js): the grooves do not come up (`slant` no more than
// DIM), and the holding ends by its count — nothing to be seen (neutral).
//   What he does: Papa holds the lantern sideways to the sooty wall and reads the keeper's writing under the soot.
//   What he wants: to learn the lamp's secret — to light the lighthouse.
//   How it is for him: work at last; excitement held steady (at half a light: straining, afraid to turn it up — there
//     would not be enough for his son).
//   What the player feels: holding a light still till the letters come.
//   → { shook: how many times it trembled }
import { until, keys, teach, settle } from './hands.js';

const SHAKE = 28, DROP = 0.3; // px; the fill lost

// side({low}) → the minigame: low — at the turned-down flame (half.js)
export function side({ low = false } = {}) {
  const SECONDS = low ? 6 : 5, DIM = 0.15;
  return {
    title: low ? tr('Half a Light') : tr('Steady'),
    about: low ? 8 : 7,
    skipped: { shook: 0 },
    points: ['soot#grooves'],
    keys: ['slant'],
    async run(g, b, opts, signal) {
      const mg = g.minigame({ phrase: low ? tr('A low flame, and grey grooves.') : tr('Soot on the wall, and pencil under it.') });
      const send = keys(g);
      const level = u => (low ? DIM * u : u);
      settle(signal, () => g.set('slant', level(1), 0.6));
      send('slant', 0);
      const soot = mg.mark({ at: 'soot#grooves', kind: 'groove' });
      const hold = mg.hold({ on: soot, seconds: SECONDS, drain: 1.2 });
      teach(b, mg, [hold]);
      let shook = 0, rest = null;
      hold.on('up', () => { rest = null; });
      const done = await until(mg, () => {
        const s = hold.state;
        if (s.held && s.at) {
          rest ??= { ...s.at };
          if (Math.hypot(s.at.x - rest.x, s.at.y - rest.y) > SHAKE) {
            shook++;
            rest = { ...s.at };
            hold.set({ fill: Math.max(0, s.fill - DROP) });
            g.failed();
            mg.error('jerk', { at: soot });
          }
        }
        send('slant', level(hold.state.fill));
        mg.plate.set({ fill: hold.state.fill, glow: s.held ? 'good' : 'idle' });
        return hold.state.fill >= 1;
      });
      if (!done) return this.skipped;
      send('slant', level(1));
      mg.snap({ at: soot });
      await mg.end({ as: low ? 'neutral' : shook ? 'flawed' : 'clean' });
      return { shook };
    },
  };
}

export default side();
