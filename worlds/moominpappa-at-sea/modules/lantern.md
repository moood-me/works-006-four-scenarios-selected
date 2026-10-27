# lantern — the family's storm lantern

One lantern for every scene it is in (the valley, the boat, the round room, the lantern room, the shore): a tin font,
a glass globe in its wire guard, a cap, a bail handle. In the scene's `modules`: `"lantern"`; `e.kit.lantern` in code.

## Standing (a table, a step, a stone, a boat's bow, the floor)

- The element: `tools/lantern.py` `element(id, name, across, distance, elevation)` (its box, the uniform `lit`) — or
  `on` what carries it (a boat). `shader(folder, id)` copies `tools/lantern/lantern.wgsl` beside it.
- Its code: `e.kit.lantern.paint(g, e, { flame, here })` — `flame` `full` · `low` · `out` (empty, sooty) · `frost`
  (out and white with rime); `here: false` — not here (only its light is painted, put out). Repaints only when the
  keys it reads change.
- Its animate: `e.kit.lantern.move(e, k)`, k — how much it burns now: `FLAME[flame]`, 0 while not here.
- Its light: `tools/lantern.py` `light(id, "<element>#flame")`; its point `<element>#flame`.
- Moved about (one lantern in several places): the element's `place` keys, set by the scene's script from a key of
  where it stands (as `round-room` does with `lantern_at`).

## In a hand

A part on a person is the cast's (`modules/cast` — a module's code cannot reach another's): the cast draws it in the
hand with the same colours, the scene's light `"at": "<person>#hand_r"` (its `on` the scene's key), the scene's own
lantern element `here: false` meanwhile. Not made yet (stage 5, the cast's owner).

Used by: `round-room`, `lantern-room`.
