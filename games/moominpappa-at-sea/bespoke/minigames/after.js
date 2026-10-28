// М7в «After Him» (night 2, «go after him», the shore, after the piece `follow_start`: the boy with the lantern on the
// dune's path going down toward the stone, Papa coming over the dune behind him): lead anywhere — the arrow is Papa's
// pace against the boy's. Nothing moves till the first touch; from it the boy goes at his own pace (`follow` — how far
// down his way, 0…1) and Papa after him (`follow_at` — how far down his, 0…1) at the boy's pace — drawn on a little
// more (DRAW): left alone he closes in; the arrow slows him (−) or hurries him (+). The scene walks each of them there
// at his own gait. The zone — the arrow that keeps the distance (it moves as the gap grows or shrinks). A quiet ring
// on the boy (`troll#chest`), its arc of danger — how near Papa is. Too near (the gap under NEAR for HOLD s) — the boy
// knows (into danger): he will sit down by the Groke with his back to his father (`follow_close`, the piece after it),
// once. Fallen far behind (over FAR for HOLD s) — a mistake (behind), once. The bar — the time kept in the zone. The
// boy at the stone — the end (clean, or flawed).
// М10в «As Far as the Dune» is the same walk beside him (beside.js): side by side, not getting ahead.
//   What he does: Papa follows his son at night, keeping his distance.
//   What he wants: to know where he goes — without being seen.
//   How it is for him: knowing, and not wanting the boy to know he knows; drawn to him.
//   What the player feels: keeping a distance — not too near, not losing him.
//   → { close: came too near, behind: fell far behind }
import { clamp, until, keys, teach, settle } from './hands.js';

// walking({...}) → the minigame: keys — the scene's keys it moves, put(send, p, s) — Papa at p, the boy at s (0…1 along
// the way) as those keys; title, phrase; gap — the distance to keep (son − Papa); near — nearer than this is danger
// (beside: getting ahead); far — falling behind; pace(s) — the boy's speed (of the way a second) where he is; seconds —
// how long his way takes (the bar); draw — how much faster than the boy Papa goes left alone; close — what being too
// near does (a key of the scene)
export function walking({ keys: moves, put, title, phrase, gap, near, far, pace, seconds, draw, close = null, about }) {
  const LEAD = 0.9; // the arrow: Papa's pace × (1 + draw + LEAD × arrow)
  const HOLD = 1.5; // s too near (too far) before it counts
  return {
    title, about,
    skipped: { close: false, behind: false },
    points: ['troll#chest'],
    keys: [...moves, ...(close ? [close] : [])],
    async run(g, b, opts, signal) {
      const mg = g.minigame({ phrase });
      const send = keys(g);
      const over = settle(signal, () => put((k, v) => g.set(k, v), 1 - gap, 1));
      let p = 0, s = gap, nearFor = 0, farFor = 0, isClose = false, isBehind = false, kept = 0, going = false;
      put(send, p, s);
      const boy = mg.mark({ at: 'troll#chest', kind: 'ring', quiet: true, danger: 0 });
      const lead = mg.lead({ zone: { at: -draw / LEAD, width: 0.45 }, steer: 'follow', release: 'return' });
      teach(b, mg, [lead]);
      const start = mg.on('down', () => { going = true; });
      const done = await until(mg, ({ dt }) => {
        if (!going) return false;
        const v = pace(s);
        s = clamp(s + v * dt);
        p = clamp(p + v * (1 + draw + LEAD * lead.state.arrow) * dt);
        const d = s - p;
        // the arrow that keeps the distance
        lead.set({ zone: { at: clamp(-draw / LEAD + (d - gap) * 5, -0.8, 0.8), width: 0.45 } });
        const danger = clamp(1 - (d - near) / Math.max(0.02, gap - near));
        boy.set({ danger });
        nearFor = d < near ? nearFor + dt : 0;
        farFor = d > far ? farFor + dt : 0;
        if (nearFor >= HOLD && !isClose) {
          isClose = true;
          g.failed();
          mg.error('danger', { at: boy });
          if (close) g.set(close, true);
        }
        if (farFor >= HOLD && !isBehind) {
          isBehind = true;
          g.failed();
          mg.error('behind', { at: boy });
        }
        if (lead.state.in) kept += dt;
        put(send, p, s);
        mg.plate.set({ fill: clamp(kept / seconds), glow: danger > 0.6 || d > far ? 'bad' : lead.state.in ? 'good' : 'idle' });
        return s >= 1;
      });
      start();
      if (!done) return this.skipped;
      over();
      await mg.end({ as: isClose || isBehind ? 'flawed' : 'clean' });
      return { close: isClose, behind: isBehind };
    },
  };
}

// (the boy's pace: steady, nine seconds down to the stone)
export default walking({
  keys: ['follow', 'follow_at'], put: (send, p, s) => { send('follow', s); send('follow_at', p); }, close: 'follow_close',
  title: tr('After Him'), phrase: tr('A boy with a lantern, and steps behind him.'), about: 10,
  gap: 0.2, near: 0.07, far: 0.42, pace: () => 1 / 9, seconds: 9, draw: 0.25,
});
