// М7в «After Him» (night 2, «go after him», the shore, after the piece `follow_start`: the boy with the lantern on the
// dune's path going down toward the stone, Papa coming over the dune behind him): lead anywhere — the arrow is Papa's
// pace (`follow_at` — how far down his way he has come, 0…1; he goes on only while the finger leads him, slower or
// faster by the arrow); the boy goes at his own pace (`follow` — how far down his, 0…1, moved here); the scene walks
// each of them there at his own gait. The zone — the pace that keeps the
// distance behind him (it moves as the gap grows or shrinks). A quiet ring on the boy (`troll#chest`), its arc of
// danger — how near Papa is. Too near (the gap under NEAR for HOLD s) — the boy knows (into danger): he will sit down by
// the Groke with his back to his father (`follow_close`, the piece after it), once. Fallen far behind (over FAR) — a
// mistake (behind), once. The boy at the stone — the end (clean, or flawed).
// М10в «As Far as the Dune» is the same walk beside him (beside.js): side by side, not getting ahead.
//   What he does: Papa follows his son at night, keeping his distance.
//   What he wants: to know where he goes — without being seen.
//   How it is for him: knowing, and not wanting the boy to know he knows.
//   What the player feels: keeping a distance — not too near, not losing him.
//   → { close: came too near, behind: fell far behind }
import { clamp, until, keys, teach, settle } from './hands.js';

// walking({...}) → the minigame: keys — the scene's keys it moves, put(send, p, s) — Papa at p, the boy at s (0…1 along
// the way) as those keys; title, phrase; GAP — the distance to keep
// (son − Papa); NEAR — nearer than this is danger (beside: getting ahead); FAR — falling behind; pace(s) — the boy's
// speed (of the way a second) where he is, speed — Papa's at an even arrow; close — what being too near does (a key of the scene)
export function walking({ keys: moves, put, title, phrase, gap, near, far, pace, speed, close = null, about }) {
  const LEAD = 0.9; // the arrow: Papa's pace × (1 ± LEAD)
  const HOLD = 0.3; // s too near before it counts
  return {
    title, about,
    skipped: { close: false, behind: false },
    points: ['troll#chest'],
    keys: [...moves, ...(close ? [close] : [])],
    async run(g, b, opts, signal) {
      const mg = g.minigame({ phrase });
      const send = keys(g);
      settle(signal, () => put((k, v) => g.set(k, v), 1 - gap, 1));
      let p = 0, s = gap, nearFor = 0, isClose = false, isBehind = false;
      put(send, p, s);
      const boy = mg.mark({ at: 'troll#chest', kind: 'ring', quiet: true, danger: 0 });
      const lead = mg.lead({ zone: { at: 0, width: 0.45 }, steer: 'follow', release: 'return' });
      teach(b, mg, [lead]);
      const done = await until(mg, ({ dt }) => {
        s = clamp(s + pace(s) * dt);
        if (lead.state.held) p = clamp(p + speed * (1 + LEAD * lead.state.arrow) * dt);
        const d = s - p;
        // the pace that keeps the distance
        lead.set({ zone: { at: clamp((d - gap) * 5, -0.8, 0.8), width: 0.45 } });
        const danger = clamp(1 - (d - near) / Math.max(0.02, gap - near));
        boy.set({ danger });
        if (d < near) nearFor += dt; else nearFor = 0;
        if (nearFor >= HOLD && !isClose) {
          isClose = true;
          g.failed();
          mg.error('danger', { at: boy });
          if (close) g.set(close, true);
        }
        if (d > far && !isBehind) {
          isBehind = true;
          g.failed();
          mg.error('behind', { at: boy });
        }
        put(send, p, s);
        mg.plate.set({ fill: s, glow: danger > 0.6 || d > far ? 'bad' : lead.state.in ? 'good' : 'idle' });
        return s >= 1;
      });
      if (!done) return this.skipped;
      await mg.end({ as: isClose || isBehind ? 'flawed' : 'clean' });
      return { close: isClose, behind: isBehind };
    },
  };
}

// (the boy's pace: steady, nine seconds down to the stone)
export default walking({
  keys: ['follow', 'follow_at'], put: (send, p, s) => { send('follow', s); send('follow_at', p); }, close: 'follow_close',
  title: tr('After Him'), phrase: tr('A boy with a lantern, and steps behind him.'), about: 10,
  gap: 0.2, near: 0.07, far: 0.42, pace: () => 1 / 9, speed: 1 / 9,
});
