// М9а «The Burner» (Ш3 «the lighthouse», the lantern room in the storm, after the piece `st_gallery`: Papa at the
// burner with the last paraffin): hold, then let go — a groove on the wick (`burner#wick`): held, the paraffin burns
// on the burner and warms it (`flame` smoky), TAKE s till it is full — then the flame turns blue (`flame` blue: the
// sign) and the arc of time runs down WAIT s: lifted — let go (clean); let go before the blue — too early (a mistake;
// it ebbs, and the paw takes hold again); not lifted — the flame tears loose by itself, Papa snatches his paw away
// (burnt: held long, flawed). Whether it catches is decided by the sheets and the oil, not by the hands: the pieces after
// it (`st_lit` / `st_out`) set the flame.
// М9г «The Burner, and Run» (both.js): the same burner, but before the blue the door bangs below (the sign comes at
// SOONER s): he is asked to let go; not let go — WAIT s later a second blow, and the paw slips by itself.
//   What he does: Papa warms the burner with the last paraffin, his paw on it, in the storm.
//   What he wants: to light the lighthouse tonight, of all nights (or: to light it and run down to his own in time).
//   How it is for him: stubbornness; the glass ringing, the sea at the gallery (or: torn in two).
//   What the player feels: holding till the blue — and letting go at the right moment (or: letting go too soon).
//   → { long: held long }
import { letGo } from './hands.js';

const TAKE = 3, SOONER = 1.5, WAIT = 5;

// burner({down}) → the minigame: down — the door bangs below before the blue (both.js)
export function burner({ down = false } = {}) {
  return {
    title: down ? tr('The Burner, and Run') : tr('The Burner'),
    about: 8,
    skipped: { long: false },
    points: ['burner#wick'],
    keys: ['flame'],
    async run(g, b, opts, signal) {
      const mg = g.minigame({ phrase: down ? tr('The burner — and the door banging below.') : tr('The burner, the storm, and the last paraffin.') });
      let lit = false;
      const how = await letGo(g, b, mg, {
        at: 'burner#wick', take: down ? SOONER : TAKE, wait: WAIT,
        held: u => { if (u > 0.05 && !lit) { lit = true; g.set('flame', 'smoky'); g.sound.flare(0.5); } },
        early: () => mg.error('early', { chip: true }),
        sign: () => {
          if (down) {
            g.sound.door();
            mg.plate.set({ phrase: tr('Below, the door has banged.') });
          } else {
            g.set('flame', 'blue');
            g.sound.flare(0.8);
            mg.plate.set({ phrase: tr('The flame has turned blue.') });
          }
        },
      });
      if (!how) return this.skipped;
      if (how === 'long') {
        if (down) g.sound.door();
        else g.sound.flare(1);
        g.mood('papa', 'afraid');
      }
      await mg.end({ as: how === 'let' ? 'clean' : down ? 'neutral' : 'flawed' });
      return { long: how === 'long' };
    },
  };
}

export default burner();
