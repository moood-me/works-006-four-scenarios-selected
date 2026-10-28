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
  bracket at the bow (the world's `lantern`, `bracket`; point `lantern#flame`, light `bow_lantern`), Mama's blanket. The people sit `on` her (`lib.SEATS`):
  Papa on the stern thwart by the tiller (his paw on `tiller#grip`), Mama asleep (`doze`) on the middle thwart just
  before him, the son at its other end (pressed against her, `troll_close`; on the stern deck with the lantern,
  `troll_stern`), My on the crosstree.
- **The camera** rides her (`camera.on`). Its shots are placed by hand in her frame (`lib.js` `VIEWS`: `aft`, `fore`,
  `wide`, `behind` — close behind Papa at the tiller, the son's face beside him, the bow lantern and the star beyond,
  the choice's pose; `papa`, `papa_sea`, `lantern`, `son`, `son_stern`, `mama`): in a boat this small the operator,
  framing a target, comes into people's heads. Her frame faces the start: her `across` is the viewer's mirrored. The
  island's sky and sea are painted all round (`round`).
- **What follows behind** — `trail`: the strip of rime (`strip`, a plane on the sea astern of her, not on her — she
  pitches; drawn `inFront` of the sea, which it lies on) shown from where the Groke swims on astern; the Groke (`groke`,
  standing on the sea floor `lib.FLOOR`, her head and eyes over the water) comes from ~52 m (0) to ~4 m (1) behind the
  stern (`lib.trailNear`). No strip while she is not here.
- **The lantern** — `lantern_at`: `bow` (burning on its bracket), `papa` (in Papa's paw, held out), `troll` (in the
  son's paws) — the bracket empty and the cast's part `lantern` in the paw, its light from `<id>#flame` —, `out` (on the
  bracket, dark).
- **The island** — `island`: `none` (far out of sight: the night crossing), `ahead` (260 m before her bow, seen
  forward at dawn), `behind` (230 m astern, going home; the piece `last` moves it on away). A card of pink granite
  backs (`isle`) with the island's dark lighthouse on it.
- **Close-ups** (the world's `closeups`): `handle` (`handle_open`, `handle_give` — the lantern's bail from Papa's paw
  to the son's) and `paws` (`paws_open`, `paws_rub` — his paws on the lantern white with rime, Mama's paws rubbing).
- **Pieces** (`lib.js` `FILM`, the module `beats` in `script.js`; the showcase plays `night`, `quiet`, `glance`,
  `hold`, `home`, `last` with their play's keys). The crossing's night wants the island's `calm` (≈ 0.8, the game's):
  with the sea's crests all round, a calm sea is what lets the white strip read.
- The script works out what the keys move: `isle_d`, `groke_a`, `groke_d`, `lantern_bow_on`, `lantern_troll_on`,
  `boat_facing`, `boat_pitch` (the scene's own, not set from outside); the swell every 2.6 s (`wave` its height); the
  island's lightning in a storm.
- The showcase: the night, the strip and the Groke coming nearer; the lantern in the son's paws and the rime creeping
  over the stern; dawn; by day going home, the island astern (about 30 s).

## Keys (the play's)

| Key | Values | Default |
| --- | --- | --- |
| `dawn`, `dusk`, `night`, `moon`, `storm`, `flash`, `lighthouse_lit` | the island's common keys (1.1–1.3: night 1; the hold branch's dawn: dawn 1; the finale: day) | island's |
| `lantern_at` | `bow` · `papa` · `troll` · `out` | `bow` |
| `trail` | −1.5…1 (below 0 falling away out of sight) | 0.4 |
| `frost_boat` | 0…1 | 0 |
| `island` | `none` · `ahead` · `behind` | `none` |
| `heading` | −1…1 (М2) | 0 |
| `wave` | 0…1 (М2) | 0 |
| `glance` | `never` · `once` · `sea` — the son's look in the finale (`home:look`) | `sea` |

## Pieces (stage 5 — the contract; the code in lib.js FILM)

The film in beats (`modules/beats`), as the valley's. The lantern is seen where it matters: in `fore` (over the stern
toward the bow) and in the pieces' own close shots of it (`lantern`); in `aft` it is at the frame's foot. The choice of
1.3 is offered on `tiller#grip` (the game's, from stage 4).

**1.1–1.2 (night, the crossing; `moon` the play's)**
- `night` (≈ 16 s): `aft`, everyone at their places, the lantern burning on the bow. A cut to Papa at the tiller,
  medium (`fore`) — `night:star` (his «We steer by that star…»); a cut to the son on the stern, close, looking back;
  past him the strip of rime and in it the Groke's two pale eyes (`trail` 0.4) — `night:eyes`; he pulls his paws in
  from the gunwale and edges up against sleeping Mama — `night:closer`; he looks at the grown-ups, says nothing, and
  turns to look back again — `night:back`. Ends in the pose for М2: `fore`, Papa's back at the tiller, the bow and the
  star (`star`) in the middle of 4:3, the camera still. *Л: `steer` (seated, the tiller), `shift_along` (seated, moving
  along the thwart), `look_back`; Mama `lie` or slumped asleep under the blanket.*
- (М2 «Румпель» — the game's: `heading`, `wave`.)
- `quiet` (≈ 10 s, after `night`): `aft`, wide: the boat under the stars, only the water; the son looking back —
  `quiet:back`. Ends wide.

**1.3**
- `glance` (≈ 10 s, by a cut): Papa sees where his son is looking and glances round (`fore`, Papa close) — `glance:strip`
  (his «The moon's path. Pretty»); `aft` over his shoulder: the strip and, beside it, the moon's path; Papa turns back
  to look ahead, the eyes behind him unseen — `glance:ahead` («The eyes he does not see…»). Ends: Papa medium by the
  tiller, the lantern burning on the bow beyond him — the pose for the choice `boat` (`fore`: the lantern in the middle
  of the frame, unoccluded — `lantern#flame`).
- `douse` (≈ 14 s, after `glance`): Papa reaches forward and puts the lantern out (`lantern_at` "out") — `douse:out`;
  `aft`, wide: the boat goes on by moonlight, the strip and the Groke in it fall behind, far astern, out of sight in
  the dark (`trail` 0.4 → −1.5 over 9 s) — `douse:gone`; Mama wakes in the dark and lifts her head — `douse:wake` («Where are we?» …). Ends: Mama awake, moonlit.
- `keep` (≈ 14 s, after `glance`): Papa tucks the blanket round Mama — `keep:tuck`; `aft`: the strip comes nearer
  (`trail` 0.4 → 0.8 over 6 s) — `keep:near`; the son's face close, the eyes clear behind him, his paws on the gunwale
  shaking; Papa looks ahead — `keep:face`. Ends on the son's face.
- `hold` (≈ 24 s, after `glance`): Papa hands the lantern to his son (`lantern_at` "troll") — `hold:give`; the son,
  shaking, holds it out back with both paws; the Groke comes on into its light (`trail` 0.4 → 0.7) — `hold:shine`; Papa
  steers without a light, the boat drifts (`heading` wandering) — `hold:drift` («So… a bit to the left… I think»); the
  rime creeps over the stern to the son's paws (`frost_boat` 0 → 0.8), the paws on the lantern white close (an insert of
  the cast's closeups) — `hold:frost`; dawn (`night` → 0, `dawn` → 1 over 6 s): Mama sees his paws, throws off her
  blanket and rubs them — `hold:dawn`. Ends: Mama rubbing his paws, `fore`, the island ahead (`island` "ahead").
  *Л: the lantern in his paws (a part), `hold_lantern`, `rub_paws`, `tuck`.*

**The finale «Лодка в долину» (day, going home)**
- `home` (≈ 16 s, by a cut; after the landing's `cast_off`): `aft`, the island astern (`island` "behind"); first the
  family settling, Mama looking up at the sky — `home:term` (with the term kept: «Full moon» — «The captain keeps his
  word» — «The captain didn't light it»; otherwise nothing is said there); Papa at the tiller telling, with his paw —
  `home:tell`; My on the mast — `home:my` («That's not how it was»); the son on the stern — `home:look`: by the play's
  `glance` (the finales' rule, as the shore's `look_son`): `sea` — he looks back at the island till it is small;
  `once` — he turns once to look at Papa, then back to the island; `never` — he looks at the island, never at Papa.
  Ends on the son and the island.
- `last` (≈ 8 s, after `home`, or by a cut after the landing's `fisher_door`): the dark lighthouse falls behind (the
  island going from 230 m to ~600 m over the piece) — `last:far`. Ends: the island small astern — the finale's last
  shot. (The Fisherman at the door is the landing's `fisher_door`, seen from the water.)

## Contract for the check

```json
{"beats": {
  "night": {"after": [], "tells": ["night:star", "night:eyes", "night:closer", "night:back"], "seconds": 16, "show": false},
  "quiet": {"after": ["night"], "tells": ["quiet:back"], "seconds": 10, "show": false},
  "glance": {"after": [], "tells": ["glance:strip", "glance:ahead"], "seconds": 10, "show": false},
  "douse": {"after": ["glance"], "tells": ["douse:out", "douse:gone", "douse:wake"], "seconds": 14, "show": false},
  "keep": {"after": ["glance"], "tells": ["keep:tuck", "keep:near", "keep:face"], "seconds": 14, "show": false},
  "hold": {"after": ["glance"], "tells": ["hold:give", "hold:shine", "hold:drift", "hold:frost", "hold:dawn"], "seconds": 24, "show": false},
  "home": {"after": [], "tells": ["home:term", "home:tell", "home:my", "home:look"], "seconds": 16, "show": false},
  "last": {"after": ["home"], "tells": ["last:far"], "seconds": 8, "show": false}
 },
 "points": ["papa", "mama", "troll", "my", "groke", "lantern#flame", "tiller#grip", "star", "strip", "lighthouse#door", "handle#troll", "paws#paws"],
 "offers": ["tiller#grip", "lantern#flame", "star"],
 "party": {"moon": 0.6, "calm": 0, "glance": "sea"},
 "acts": {"heading": {"values": [], "tells": []}, "wave": {"values": [], "tells": []}}}
```
