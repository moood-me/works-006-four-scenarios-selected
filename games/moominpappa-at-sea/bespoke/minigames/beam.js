// М11 «The Beam» (the finale «The Beam», the lantern room, after the piece `e_write`: Papa on the gallery, the lamp
// burning): touch nothing — SECONDS of the play's time, counted whatever the hands do; the language's sign of it, the
// ghost's hands off, from the first second and again every AGAIN s and after any touch (a touch changes nothing); a
// light on what is watched (`at`: the lamp turning — `burner#lens`), no touch of its own; the bar fills with the time.
// The beam goes round by itself (the scene's). The count out — the end (neutral); the
// game cuts after it to the beam passing each of them.
// М11 «The Stair» (stair.js) — the same at the middle of the stair.
//   What he does: Papa lets the lighthouse shine — he does nothing more.
//   What he wants: nothing now; the light goes over the island by itself, lingering on no one.
//   How it is for him: quiet; done.
//   What the player feels: hands off — the light needs no one to hold it.
//   → {}
import { until } from './hands.js';

const AGAIN = 4; // s: the hands-off sign shown again

// still({title, phrase, seconds, at}) → a minigame of touching nothing; at — what is watched (a light on it), or none
export function still({ title, phrase, seconds, about, at = null }) {
  return {
    title, about,
    skipped: {},
    points: at ? [at] : [],
    keys: [],
    async run(g, b, opts, signal) {
      const mg = g.minigame({ phrase });
      if (at) mg.mark({ at, kind: 'light' });
      let sign = mg.show({ handsOff: true }), last = mg.t;
      const again = () => { sign?.remove(); sign = mg.show({ handsOff: true }); last = mg.t; };
      mg.on('up', again);
      const t0 = mg.t;
      const done = await until(mg, ({ t }) => {
        if (t - last >= AGAIN) again();
        mg.plate.set({ fill: Math.min(1, (t - t0) / seconds), glow: 'idle' });
        return t - t0 >= seconds;
      });
      if (!done) return this.skipped;
      await mg.end({ as: 'neutral' });
      return {};
    },
  };
}

export default still({ title: tr('The Beam'), phrase: tr('The beam goes round.'), seconds: 8, about: 8, at: 'burner#lens' });
