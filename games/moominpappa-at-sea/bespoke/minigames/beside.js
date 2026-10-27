// М10в «As Far as the Dune» (night 3, «come on, I'll go with you as far as the dune», the shore, after the piece
// `dune_start`: Papa and the boy side by side on the dune's path): the walk of «After Him» (after.js) side by side —
// `walk` — how far up the path onto the dune the boy has come (0…1), `walk_at` — Papa beside him, as far ahead (+) or
// behind (−) as the gap between them (−1…1: FAR behind … as far ahead); the scene walks them there at their own
// gait. The boy goes at his own pace and twice stops, unsure (PAUSES); Papa goes on only while the finger leads him.
// Getting ahead of him (Papa past him by more than AHEAD) — into danger, once; falling far behind — behind, once. The boy on the dune's top — the end (clean, or flawed).
//   What he does: Papa walks his son to the dune — and no further.
//   What he wants: to be near him on his way, not to lead it.
//   How it is for him: being beside, holding himself back.
//   What the player feels: matching another's step — not getting ahead.
//   → { close: got ahead, behind: fell far behind }
import { walking } from './after.js';

const AHEAD = 0.04;
const PAUSES = [[0.35, 0.42], [0.68, 0.74]]; // where on the way he stops a moment (it is passed slowly)
const SPEED = 1 / 9, FAR = 0.14;

export default walking({
  keys: ['walk', 'walk_at'], put: (send, p, s) => { send('walk', s); send('walk_at', Math.max(-1, Math.min(1, (p - s) / FAR))); },
  title: tr('As Far as the Dune'), phrase: tr('Two in the moonlight, one a little ahead.'), about: 12,
  gap: 0, near: -AHEAD, far: FAR,
  pace: s => (PAUSES.some(([a, b]) => s >= a && s < b) ? SPEED / 5 : SPEED), speed: SPEED,
});
