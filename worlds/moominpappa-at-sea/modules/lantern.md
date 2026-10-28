# lantern — the family's storm lantern

One lantern for every scene it is in — the valley, the boat, the round room, the lantern room, the shore: a tin font,
a glass globe in its wire guard, a cap, a bail handle; its flame full, turned low, out (empty, the globe sooty), or out
and white with rime. In the scene's `modules`: `"lantern"`; `e.kit.lantern` in code.

## Standing — on a table, a step, the floor, a stone, in a boat, on the bow

- The element: `tools/lantern.py` `element(id, name, across, distance, elevation, bracket=False, **k)` (its box, the
  uniform `lit`); `shader(folder, id)` copies `tools/lantern/lantern.wgsl` beside it. In a boat: `on` the boat (its
  `across`, `distance`, `elevation` in the boat's frame). On a stone: `elevation` the stone's top. On the bow:
  `bracket=True` — the iron bracket painted under its foot (the anchor the lantern's foot on the bracket's top).
- Its code: `e.kit.lantern.paint(g, e, { flame, here, bracket })` — `flame` `full` · `low` · `out` · `frost`;
  `here: false` — not here (only its light, put out; the bracket stays). Repaints only when the keys it reads change.
- Its animate: `e.kit.lantern.move(e, k)`, k — how much it burns now: `FLAME[flame]`, 0 while not here.
- Its light: `tools/lantern.py` `light(id, "<element>#flame", reach, strength)`; its point `<element>#flame`.
- One lantern in several places of a scene: the element's `place` keys, set by the scene's script from a key of where
  it stands (as `round-room` does with `lantern_at`).

## In a hand

The cast's parts `lantern`, `lantern_low`, `lantern_out`, `lantern_frost` (`modules/cast`: a module's code cannot
reach another's, so the cast draws it, with the same colours) — and the scene's light at its flame, `"at":
"<person>#flame"`, on a key of the scene's while it burns (`round-room`, `lantern-room`: `<id>_lamp`); the scene's
standing lantern `here: false` meanwhile.

Used by: `round-room`, `lantern-room`; to come: `sea` (on the bow, in the boat), `shore` (on the stone), `valley`
(in the boat).
