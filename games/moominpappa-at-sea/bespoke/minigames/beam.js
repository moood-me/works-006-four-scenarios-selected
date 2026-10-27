// М11 «The Beam» (the finale «The Beam», the lantern room, after the piece `e_write`: Papa on the gallery, the lamp
// burning): touch nothing — SECONDS of the play's time, counted whatever the hands do (the ghost shows the hands off;
// the bar fills with the time); the beam goes round by itself (the scene's). The count out — the end (neutral); the
// game cuts after it to the beam passing each of them.
// М11 «The Stair» (stair.js) — the same at the middle of the stair.
//   What he does: Papa lets the lighthouse shine — he does nothing more.
//   What he wants: nothing now; the light goes over the island by itself, lingering on no one.
//   How it is for him: quiet; done.
//   What the player feels: hands off — the light needs no one to hold it.
//   → {}
import { until } from './hands.js';

// still({title, phrase, seconds}) → a minigame of touching nothing
export function still({ title, phrase, seconds, about }) {
  return {
    title, about,
    skipped: {},
    points: [],
    keys: [],
    async run(g, b, opts, signal) {
      const mg = g.minigame({ phrase });
      mg.show({ handsOff: true });
      const t0 = mg.t;
      const done = await until(mg, ({ t }) => {
        mg.plate.set({ fill: Math.min(1, (t - t0) / seconds), glow: 'idle' });
        return t - t0 >= seconds;
      });
      if (!done) return this.skipped;
      await mg.end({ as: 'neutral' });
      return {};
    },
  };
}

export default still({ title: tr('The Beam'), phrase: tr('The beam goes round.'), seconds: 8, about: 8 });
