# cat — Mappe, the cat

Big, grey and wild, seen side-on (from the shore's look). The engine moves no animals: he is a card whose poses are
layers painted once; which pose is seen, his animate says by a key. In the scene's `modules`: `"cat"`; `e.kit.cat`.

## The element

- Its code: `e.kit.cat.paint(g, e);` — every pose painted once (reads no key). Its box: `e.kit.cat.BOX`
  (`[-0.46, -0.56, 0.46, 0.03]` — his paws on the ground at 0, about 0.43 m tall sitting); `"height": 0.5`.
- Its animate: `e.kit.cat.move(e, pose, dir)` — `pose` `sit` · `lie` · `walk` · `none` (not seen: no shadow either),
  usually the scene's `cat_pose`; `dir` 1 facing right (as painted), −1 mirrored. A new pose cross-fades in a quarter of
  a second (at once after a cut), so he sits down or gets up in the middle of a piece with no painting made again.
- Where he is: the element's `place` keys (the scene's `cat_at` puts him at its own places; walking, a path moves him).
  Walking, his legs step by the way his card goes (a stride 0.36 m), the body bobs, the tail swings; standing in `walk`,
  the legs hold. Sitting and lying, the tail stirs now and then.
- Points: `<id>#cat` (his head; also his own `e.at`: lines over him) and `<id>#back` (where Sophia's hand strokes him —
  `sophia_reach: {"r": "cat#back"}`, only sitting). They follow the pose and `dir`.
- `"shadow": true` casts the shape of the pose seen (the hidden ones cast nothing — checked on the GPU).

Comes and goes by `cat_pose: "none"` (behind the stones, into the fog, off the edge: walk him there, then `none`).
No jumps, no being carried. His sounds (purring, hissing, claws) are the game's.
