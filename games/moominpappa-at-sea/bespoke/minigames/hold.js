// М9б «The Door in the Storm» (Ш3 «the door», the round room in the storm, after the piece `st_door`: Papa's back to
// the door): hold with danger — a groove on the door (`door#door`), its arc of danger growing before each blow of the sea
// (BLOWS, every EVERY s): held through the blow, the door shudders and holds (`door_shake` a little); not held — it
// gives (`door_shake` full, into danger: the door shudders). The bar — the time held. It ends by its count: after the
// last blow (clean; flawed if a blow found it not held); the piece after it: the four sitting with their backs to it.
//   What he does: Papa holds the door against the sea with his family.
//   What he wants: to be with his own while they are afraid — «when it drops, we sail home».
//   How it is for him: fear, together; nothing heroic.
//   What the player feels: bracing for each blow.
//   → { gave: blows the door was not held at }
import { clamp, until, teach, settle } from './hands.js';

const BLOWS = 4, FIRST = 2.5, EVERY = 2.4, WARN = 1; // s: the first blow; between; the danger grows this long before
const HELD = 0.3, LOOSE = 1; // door_shake at a blow held / not held

export default {
  title: tr('The Door in the Storm'),
  about: 11,
  skipped: { gave: 0 },
  points: ['door#door'],
  keys: ['door_shake'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A door, and the sea behind it.') });
    const over = settle(signal, () => g.set('door_shake', 0, 0.6));
    g.set('door_shake', 0);
    const door = mg.mark({ at: 'door#door', kind: 'groove', danger: 0 });
    const hold = mg.hold({ on: door, seconds: 0.4, drain: 0.4 });
    teach(b, mg, [hold]);
    const END = FIRST + (BLOWS - 1) * EVERY + 1;
    let gave = 0, held = 0, next = 0, still = null; // still: when the door settles after a blow
    const t0 = mg.t;
    const done = await until(mg, ({ t, dt }) => {
      const now = t - t0, at = FIRST + next * EVERY;
      if (hold.state.held) held += dt;
      door.set({ danger: next < BLOWS ? clamp(1 - (at - now) / WARN) : 0 });
      if (next < BLOWS && now >= at) {
        next++;
        const ok = hold.state.held;
        g.set('door_shake', ok ? HELD : LOOSE, 0.12);
        g.sound.wave(ok ? 0.7 : 1);
        if (!ok) { gave++; g.failed(); mg.error('danger', { at: door }); }
        still = now + 0.15;
      }
      if (still !== null && now >= still) { still = null; g.set('door_shake', 0, 0.6); }
      mg.plate.set({ fill: clamp(held / (END - 1)), glow: hold.state.held ? 'good' : 'idle' });
      return now >= END;
    });
    if (!done) return this.skipped;
    over();
    await mg.end({ as: gave ? 'flawed' : 'clean' });
    return { gave };
  },
};
