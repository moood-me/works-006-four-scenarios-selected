# The Beach (С8 of the game «Папа и море»)

The island's sandy lee shore, looking along it: the sea on the left to the horizon, a level strand of wet and dry sand
along the water, the flat stone at the water's edge, the sand rising on the right to a low dune with lyme grass, and
beyond the dune the granite knoll with the lighthouse and its pines. By day the son by the water and the sea-horses
in the shallows; at night the Groke by the water facing the lights, her frost round her, the lantern on the stone,
Papa on the dune.

- The land is one function (`lib.js` `land`), made with the island's shapes: the strand level from the waterline
  (`WATER`) to `STRAND` metres inland — the Groke's frost lies flat on it —, the sea shelving down under it (waist-deep
  where she wades), the dune, the knoll (`knoll`). `SEA`, `FLAT` (the strand's height) and `shore` for the island's
  painters. The sky, the sea, the granite, the lighthouse, the pines are the world's module `island`
  (`modules/island.md`), and so are the hour, the moon and the storm (light, looks, lights from `tools/island.py`).
- `tools/shore.py` writes `scene.json` (run from the world's root: `python tools/shore.py .`).
- `sand` — the beach, a draped plane in front of the granite: the wet strand, ripple marks, the high-water mark,
  shells; it thins away where the knoll's granite comes up and far ahead.
- `rime` — the Groke's frost: a level plane on the strand, painted once for where she is (`groke_at`, its only key)
  — rime, the warmed dark sand, the trail to the water — and shown by its shader (`rime.wgsl`) as `frost`, `warm`,
  `track` say: the frost grows and melts, the dark circle comes, the trail runs out, with no painting again. It
  ends softly at the water's edge.
- `seahorses` — three glowing sea-horses in the shallows, each a layer bobbing out of step; when `seahorses` becomes
  `gone` the script moves `seahorses_away` 0 → 1 over 6 s and they swim off to the left, their glows going out.
- `stone` (a form) and `stone_lantern` on it: the lantern shown by `lantern_stone` — lit (its globe a layer of added
  light, its flame `e.light` taken by the light `stone_lamp`, reach 7 m, flickering), out (cold glass), none.
- `blanket` (a plane) is laid by the script behind the son, wherever he is (`blanket_a`, `blanket_d`); `dune` — the
  dune's top (point `dune#top`) and the hollow where Papa sat (`dune_dent`).
- The script (`script.js`): the island's lightning; `groke_at` → the Groke's place (`groke_a`, `groke_d`) and turn —
  to the lantern on the stone while it is there, else to the lighthouse's lantern; `troll_at` → the son's place and
  turn (beside her: at her left, facing as she does) — set at once when the scene opens, walked at his own pace when
  it changes while the scene plays.
- People (the world's cast): the Groke (`groke`, new in the cast with this scene), the son, Papa on the dune's top,
  Mama by the water further along. Stage 4: they stand and breathe, no motions yet (sitting, the Groke sitting down
  and swaying over the light, walking into the sea — stage 5).
- The lighthouse's lantern seen lit from here (Papa up there with the storm lantern, night 1 «Наверх») is the
  island's `lighthouse_lit`; at 0.25 its glow is faint at this distance. No beam: the engine has no turning
  spotlight yet.
- Composition: when the Groke faces the lighthouse she has her back to the viewer (the lighthouse is ahead); she
  faces the viewer when the lantern is on the stone. Her face in the moments without the lantern is the game's
  camera's (stage 5: `camera_target`, `camera_yaw`).

## Contract for the check

```json
{"points": ["stone#lantern", "dune#top", "groke#chest", "troll#chest", "papa#chest", "mama#chest", "lighthouse#lantern", "lighthouse#door"],
"offers": ["stone#lantern", "dune#top", "groke#chest", "troll#chest"],
"party": {"dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "flash": 0, "lighthouse_lit": 0,
  "seahorses": "here", "groke_at": "edge", "frost": 0, "warm": 0, "track": 0, "lantern_stone": "none", "blanket": false,
  "troll_at": "near", "dune_dent": false, "groke_here": false, "troll_here": true, "papa_here": false, "mama_here": false},
"acts": {}}
```
