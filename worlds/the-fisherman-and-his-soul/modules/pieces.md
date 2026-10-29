# pieces — what the scenes' pieces share

The pieces of «The Fisherman and His Soul» (the game's contract: `docs/new-games/rybak-i-dusha/game.md`, «Stage 5 —
pieces») are each scene's `FILM` in its lib (`film(scene)` → the beats), played by the world's module `beats`
(beats.md) from the scene's script. This module is their small shared kit:

- `CAM0` — the camera at rest (no target, no offsets); `shot(target, size, frame, base)` — a framed shot over a base
  (the pier's shore view gives its own base: its camera keys).
- `at(PLACES, id, name)` — the keys a cut sets to put someone at a named place (places.md): `_at`, `_placed`, `_a`,
  `_d`, `_e`, `_turn`, `_on` — so a shot made ready ahead has them (a script's reaction to `_at` would come after it).
- `tell(s, text, hold)` — a moment told, held; `cut(s, values)` — a cut to a shot made ready first; `frame(s, values,
  glide)` — the camera moved; `go(s, id, pts, turn, gait)` — a walk, then a turn; `loop(s, id, motion)`.

A piece's `from` gives everything it begins at but `here` and the faces (the game's); a piece ends in a living pose.
The motions are the cast's (the contract's names, made by Kimodo in `r3/rybak-motions`).
