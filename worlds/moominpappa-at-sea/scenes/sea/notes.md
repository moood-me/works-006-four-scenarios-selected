# The open sea (`sea`, С2 of the game «Папа и море»)

The boat «Adventure» on the open sea, the camera riding her (1.1–1.3; the finale «Лодка в долину»): from before her
bow, a little to one side and above, looking aft over everyone in her — Little My up the mast on its crosstree, Mama
asleep under the checked blanket on the middle thwart, Papa on the stern thwart by the tiller, the son on the little
stern deck at the very back — at what follows behind: the white strip of rime on the water and the Groke's head in it,
the moon low astern over it (its path on the water beside the strip — «Лунная дорожка»); by day, going home, the
lighthouse's island astern.

- **The island's sea and sky** (`modules/island`, `tools/island.py`): the light by the hour (`dawn`, `dusk`, `night`,
  `storm`, `flash`), the sky (the moon at `moon`'s phase, low astern), the sea plane. `tools/sea.py` writes
  `scene.json` (the island's light, lights, sky, sea and their shaders, copied).
- **The boat** — `boat`, an unseen anchor at the start, facing the start (her frame is the world's): bow toward the
  start's back, stern toward the view; `boat_facing` (her nose off the star, from `heading`) and `boat_pitch` (the swell)
  turn her. On her: the hull (a form, `e.kit.loft` of `lib.RIBS` — her ribs from the stem to the transom), the
  transom, the floorboards, the thwarts, the stern deck (the Groke's rime creeps over it from the transom as
  `frost_boat` grows — its shader), the mast with its crosstree, the tiller (point `tiller#grip`), the lantern on its
  bracket at the bow (point `lantern`, light `bow_lantern`), Mama's blanket. The people sit `on` her (`lib.SEATS`).
- **The camera** rides her (`camera.on`): in her frame `camera_x` 1, `camera_z` −4.8 (before the bow), `camera_h` 1.1,
  `camera_yaw` 8, `camera_look` 0.14 (her frame faces the start: her `across` is the viewer's left-right mirrored).
- **What follows behind** — `trail`: the strip of rime (`strip`, a plane on the sea astern of her, not on her — she
  pitches; drawn `inFront` of the sea, which it lies on) shown from where the Groke swims on astern; the Groke (`groke`,
  standing on the sea floor `lib.FLOOR`, her head and eyes over the water) comes from ~52 m (0) to ~4 m (1) behind the
  stern (`lib.trailNear`). No strip while she is not here.
- **The lantern** — `lantern_at`: `bow` (burning on its bracket), `troll` (in the son's paws: its light from his right
  hand `troll#hand_r`; the bracket empty), `out` (on the bracket, dark).
- **The island** — `island`: `none` (far out of sight: the night crossing), `ahead` (260 m before her bow — out of this
  view, which looks aft), `behind` (230 m astern, seen over the stern: going home). The island is a card of pink granite
  backs (`isle`) with the island's lighthouse (`modules/island`, dark) on it; the Fisherman stands before its door
  (`fisher_on` `isle#step`) when the game has him here.
- The script works out what the keys move: `isle_d`, `groke_a`, `groke_d`, `lantern_bow_on`, `lantern_troll_on`,
  `boat_facing`, `boat_pitch` (the scene's own, not set from outside); the swell every 2.6 s (`wave` its height); the
  island's lightning in a storm.
- **Stage 4**: people sit and breathe (`seated`; the Groke `hands_behind`); no motions, no beats yet. Mama «asleep» is
  seated with `tired` (a lying motion is stage 5's); the lantern in the son's paws has its light but no lantern drawn in
  his hand — the cast has no such part yet (stage 5, package Л).
- **Not yet: the view forward** (the star they steer by — М2 «Румпель»; the island ahead at dawn). The island module's
  sky is painted across one view and its sea's crests only ahead of the start, so a camera turned to look forward sees
  the sky's soft carry and bare water. It needs the module to paint its sky and sea all round (a request to its owner).
- The showcase: the night, the strip and the Groke coming nearer; the lantern in the son's paws and the rime creeping
  over the stern; dawn; by day going home, the island astern (about 30 s).

## Keys (the play's)

| Key | Values | Default |
| --- | --- | --- |
| `dawn`, `dusk`, `night`, `moon`, `storm`, `flash`, `lighthouse_lit` | the island's common keys (1.1–1.3: night 1; the hold branch's dawn: dawn 1; the finale: day) | island's |
| `lantern_at` | `bow` · `troll` · `out` | `bow` |
| `trail` | 0…1 | 0.4 |
| `frost_boat` | 0…1 | 0 |
| `island` | `none` · `ahead` · `behind` | `none` |
| `heading` | −1…1 (М2) | 0 |
| `wave` | 0…1 (М2) | 0 |

## Contract for the check

```json
{"beats": {},
 "points": ["papa", "mama", "troll", "my", "groke", "fisher", "lantern", "tiller#grip", "strip", "isle#step", "lighthouse#door"],
 "offers": ["lantern", "tiller#grip"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "flash": 0, "lighthouse_lit": 0, "lantern_at": "bow",
  "trail": 0.4, "frost_boat": 0, "island": "none", "heading": 0, "wave": 0},
 "acts": {}}
```
