# The Magic Forest

The island's crown (С3 of the game's scenario): a clearing of grey-green moss and granite among dead trees twisted by
the wind; the stump where Grandmother carves, her wooden animals in the moss, a boulder with a crack, a dead trunk with
a dry branch; past the trees the land goes down to the open sea far below. Its sea, sky, fog and the hour and the
weather are the island's (`modules/isle.md`); the generator is `tools/forest.py` (`python -B tools/forest.py <world>`
writes `scene.json`, `elements/sky.*`, `elements/sea.*`). Engine 3, camera `picture`.

- **The land** is `lib.ground` (relief.js): the clearing nearly level, going down ahead to the sea (`WATER` −4 m,
  `edge` its waterline). `moss` paints the ground (moss, granite backs with lichen, needles; drier at the end of July:
  `late`) and the red beetle by the stump (`moss#beetle`). `path` — the worn path to the other side going off between
  the trees ahead on the left, its stones `path#stone1` (nearest) … `#stone3`.
- **Trees**: `deadtree` and `snag` (copies) and the hero `trunk` (`trunk#palm` on it chest-high, `trunk#branch` the dry
  branch above); each a layer that sways a little in the wind and, by `spin` (0…1, smooth, animate), wheels about its
  foot — all as one, as a dizzy head sees them (М6). Living pines far off (the island's).
- **Things**: `stump` (a form; `stump#seat`, Grandmother sits on it: `sit_stone`), `animals` (the wooden horse, bird,
  dog, cow and — the fifth — the seal: `animals` 0–5; `animals#seal`), `crevice` (a boulder, a form, with its crack:
  `pack` none · in · taken; `crevice#pack`).
- **The end of July** (`band` 0…1, smooth): a heavy grey band along the horizon (`band`, a layer faded by animate). **By
  night**: the moon behind the viewer, faces lit; `boat_out` — the family's boat at the nets far out, Papa's lantern
  (`far_boat#lamp`, the light `far_lamp`).
- **People** (the world's `cast`): `<id>_at` (`lib.PLACES`; sitting ones by the script): Grandmother — clearing (first),
  stump (sitting on it), trunk (her palm on it, looking up at the branch), moss (sitting on the ground), path1…3;
  Sophia — clearing (first), moss (by the beetle), stump, crevice, path1. Grandmother sitting on the ground
  (`sit_ground`) shows the engine's stiff skirt (`modules/cast.md`, Checked) — until it is mended, the stump.
- The showcase: June on the stump (the seal laid with the others), the trunk, the packet, the end of July (the band,
  the forest spinning), the night and the path.

## Contract for the check

```json
{"beats": {},
 "points": ["stump#seat", "trunk#palm", "trunk#branch", "crevice#pack", "moss#beetle", "animals#seal", "animals#animals", "path#stone1", "path#stone2", "path#stone3", "far_boat#lamp", "sky#sun", "sky#sun_late", "sky#sun_dawn", "grandma#chest", "sophia#chest"],
 "offers": ["stump#seat", "trunk#palm", "trunk#branch", "crevice#pack", "moss#beetle", "animals#seal", "path#stone1", "path#stone2", "path#stone3", "grandma#chest", "sophia#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "animals": 4, "pack": "none", "band": 0, "spin": 0, "boat_out": false, "grandma_at": "clearing", "sophia_at": "clearing", "grandma_here": true, "sophia_here": true},
 "acts": {"flash": {"values": [], "tells": ["flash:strike"]}}}
```
