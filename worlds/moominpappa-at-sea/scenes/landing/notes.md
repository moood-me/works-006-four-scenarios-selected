# The Landing Rocks (С3 of the game «Папа и море»)

The island's landing: the granite slab by the cove, the boat in the cove, the lighthouse on its knoll on the right, the
steps to its door, the stone with the arrow, the crooked pines, the open sea and the Fisherman's cape far off on the
left — at every hour and in the storm, with all the states the game's steps see (stage 4: people stand or sit and
breathe; no motions, no camera, no showcase yet).

- `tools/landing.py` writes `scene.json`; it reads the lib's tables (`PLACES`, `PINES`, `BOAT`) for the starting
  state. The island — sky, sea, granite, lighthouse, steps, pines, the hour, the storm — is the world's module
  `island` (`modules/island.md`; the light, the looks, the lights and the common keys from `tools/island.py`).
- The land is one function (`lib.js` `land`, of the island's `ridge` and `bump`), used by the relief and the island's
  painters. `SEA` is the sea's height.
- It opens at its first morning (`dawn` 1, the approved look); the empty play's other keys are as landed.
- What the keys move is the script's (`script.js`), from the lib's tables, at once and from the state:
  - `pines` 0…1 — the three pines `pine1…3` creep from the island's back to the threshold (their place keys
    `pine<n>_a/_d`); the six `pines` copies stay.
  - `door` 0…1 — the door is a card of its own on the tower (`island.door`; the tower paints the dark doorway),
    hung on its right jamb as seen from outside (as the round room's door, seen from inside, on its left), opening
    outward toward the landing (`door_turn` = 180 − 70 · door) — against the pines.
  - `boat` (moored · up · cracked · tarred · away) and `boat_up` 0…1 — moored, her bow on the rocks and her stern
    afloat, rocking (her animate); pulled up the rocks as `boat_up` grows (`boat_a/_d/_turn`); cracked — a split along
    her strakes, tarred — a black stripe of tar over it; away — not painted.
  - `<id>_at` — each person at a named place (`lib.PLACES`, put by the island's `places`: their place keys, seat,
    turn, motion, look, reach); `<id>_placed` keeps which, so a scene opened again goes on as it was.
- Painted by the keys, once per state: on the granite itself (`lib.marks`; the granite repaints when they change, between
  steps) — `frost_step` (two broken bands of rime from the water's edge up to the threshold and back), `frost_patch`
  (rime by the landing), `cleft` (empty ·
  weed · sprout: the slit in the slab before the family, point `granite#cleft`; the shoot is the card `sprout`), `driftwood` (parts along the cove),
  `bundles` (slab — the bundle Mama sits on, her bag, the can; steps — three bundles on the lighthouse steps, one wet;
  none).
- The storm: the island's look, sky and sea; rain (`rain`) and spray on the cove's rocks (`spray`) by `storm`;
  lightning by the island's script. The lighthouse's beam — `beam` (on), turned by the island's script (`beam_turn`);
  the lantern's own light and glow are `lighthouse_lit`.
- The boulder is a form (Moomintroll sits on it); the bundle is a card now (it goes away with the luggage).
- People: the world's cast — papa, mama, troll, my, fisher (the Fisherman is not here at the start). Their places are
  near the camera where the story allows (the cleft is in the slab before the family, Little My's rock is on the slab);
  the door, the steps and the arrow stone stay at the lighthouse, 28–31 m off: those are framed by the pieces' shots.

## Pieces (stage 5: the contract — no piece code yet)

The pieces of the game's steps (plan.md «Куски сцен по шагам», scenario.md), played by the module `beats` (as in
«Around the World»: the key `beat`, `beat:<name>` told at its end, `beat_next`). Each: what it shows, the keys it
begins with or sets, where it ends (a living pose); its moments are told as `<piece>:<moment>` — the game speaks its
lines there.

- `arrive` (1.4, ≈ 20 s). Dawn of the 23rd: the family on the slab with the luggage; Papa walks up to the door and tries it — locked; a cut (made ready) to Little My sitting by the arrow stone; she lifts the stone — the key. Keys: dawn 1, bundles slab, papa_at slab → door, my_at stone. Ends: Papa at the door, My by the stone with the key. Moments: `arrive:door` — Papa at the locked door: «A keeper must leave the key…»; `arrive:arrow` — My by the stone: «There's an arrow. For fools»; `arrive:key` — the key in her hand.
- `patch` (1.4 «keep», ≈ 9 s). After `arrive`. A cut to the white patch of rime on the stones by the landing; Mama sees it, Papa glances. Keys: frost_patch true. Ends: Mama and Papa by the patch. Moments: `patch:seen` — Mama: «Someone was here»; Papa: «Gulls».
- `asleep` (1.4 «douse», ≈ 8 s). After `arrive`. Mama, awake all night, falls asleep sitting on the bundle of blankets, her head going down. Keys: mama_at slab, mama_mood tired. Ends: Mama asleep on the bundle. Moments: `asleep:asleep` — her head down.
- `bundles` (1.7 «sit» (cut from the cape), ≈ 24 s). Mama alone hauls the wet bundles up the lighthouse steps; one slips off into the water, she fishes it out, wet to the elbows; when Papa comes all is carried up and she sits on a step wringing her sleeve. Keys: bundles steps, mama_at steps. Ends: Mama on the step, Papa before her. Moments: `bundles:fell` — the bundle splashes in; `bundles:wet` — she has it out, wet; `bundles:sat` — Papa comes; Mama: «All done already».
- `weed` (2.4 «weed», ≈ 16 s). At the landing Papa and Mama pack seaweed into the cleft. Keys: cleft empty → weed, papa_at cleft, mama_at cleft. Ends: the cleft full, the two by it. Moments: `weed:packed` — Mama: «Nothing will grow here»; Papa: «It will, with me»; `weed:laugh` — she laughs.
- `dusk` (2.5, ≈ 12 s). Dusk: Papa alone on the wet rocks at the cove's edge facing the sea; a wave splashes over his boots. Keys: dusk 1, papa_at edge. Ends: Papa at the edge, the sea at his feet. Moments: `dusk:stood` — «I'll understand you. You'll see» — or, on «weed», silence.
- `pines` (3.1, ≈ 8 s). The morning of the 24th: the pines have crept up to the threshold; Papa leans on the door — it won't open. Keys: pines 1, door 0, papa_at door. Ends: Papa's paws on the door (the door minigame). Moments: `pines:push` — Papa: «Trees don't walk»; My: «They're afraid».
- `door_open` (3.1, ≈ 10 s). After `pines`. The door opened against the pines (act door); on the stone at the threshold the rime's trail from the shore and back; far off the Fisherman going away from the lighthouse. Keys: door 1, frost_step true, fisher_at away. Ends: Papa in the doorway looking at the trail. Moments: `door_open:frost` — the trail at his feet; `door_open:fisher` — the Fisherman far off on the rocks.
- `storm_coming` (4.1, ≈ 9 s). The grey morning of the 25th, the wind rising, crests all over the sea; Papa and the son go down to the boat. Keys: storm 0.35, boat moored, papa_at boat, troll_at boat. Ends: both at the boat (the boat minigame). Moments: `storm_coming:sky` — Papa: «There'll be a storm».
- `boat_up` (4.1, ≈ 7 s). After `storm_coming`. The boat pulled up the rocks (act boat_up); they straighten, the son walks off first. Keys: boat up. Ends: the boat up, Papa by it. Moments: `boat_up:up` — the boat up the rocks.
- `out_storm` (4.4 «cape», ≈ 8 s). The storm at night: Papa with the lantern out of the door and down onto the rocks toward the cape, rain, foam, the lighthouse dark. Keys: night 1, storm 1, moon 1, papa_at door → out of the frame. Ends: Papa gone into the dark toward the cape (cut to the cape). Moments: `out_storm:out` — Papa: «Man overboard. The captain goes».
- `calm` (4.5, ≈ 14 s). The calm dawn of the 26th: drops off the rocks, the shore all in driftwood, the boat with a split in her side; Papa comes down to the water — by the storm's choice: «You see» / silent / crouches and strokes the water / looks at the sea over his shoulder and goes to the boat; not at all after «both». Keys: dawn 0.6, driftwood true, boat cracked, papa_at water (see «Open»). Ends: Papa at the water. Moments: `calm:water` — Papa's line by the storm's choice.
- `caulk` (4.5, ≈ 9 s). After `calm`. All day Papa caulks the boat's split; the tar drying. Keys: boat cracked → tarred. Ends: Papa at the boat. Moments: `caulk:done` — the tar drying.
- `leave` («Boat», ≈ 16 s). The quiet morning of the 27th: Mama carries the basket down to the boat; Papa puts the key back under the arrow stone; at the boat — the mooring (the mooring minigame). Keys: boat tarred, papa_at stone → boat, mama_at stand. Ends: Papa's paw on the mooring. Moments: `leave:key` — the key under the stone; `leave:ready` — at the mooring.
- `cast_off` («Boat», ≈ 8 s). After `leave`. The mooring let go (act mooring); the boat slides off from the rocks (then the cut to `sea`). Keys: mooring 1; boat away at its end. Ends: the cove empty. Moments: `cast_off:off` — the boat away.
- `threshold` («Pie», full, «spoke», ≈ 14 s). The moonlit evening: the Fisherman comes to the lighthouse, not over the rocks — lays his palm on the door, does not open it, sits down on the threshold facing the sea, the matchbox in his fist; Papa passes him at the threshold. Keys: night 0.7, dusk 0.3, fisher_at door → threshold, papa_at door. Ends: the Fisherman on the threshold. Moments: `threshold:palm` — his palm on the door; `threshold:sat` — he sits.
- `beam_pass` («Beam», ≈ 8 s). The beam goes over the landing at night: Little My on the rocks, lit and left. Keys: night 1, lighthouse_lit 1, beam 1, my_at rock. Ends: the beam gone on. Moments: `beam_pass:my` — My in the beam.
- `mooring_touch` («Stair», ≈ 10 s). A quiet morning: Papa goes down to the tarred boat, touches the mooring and goes back up. Keys: boat tarred, papa_at boat. Ends: Papa going back. Moments: `mooring_touch:touch` — his paw on the mooring.
- `look_marks` (common shots, ≈ 6 s). The arrow stone close, then the cleft (bare, weed or the shoot by `cleft`). Keys: the play's keys. Ends: on the cleft. Moments: `look_marks:cleft` — the cleft.

## Open for the game (stage 5)

- `calm` (4.5): Papa at the water by the storm's choice — the scene needs one key from the game, `papa_shore` (look ·
  silent · crouch · glance · none), or the game picks among four pieces; to agree with the game's author.
- `bundles` and `leave` need carrying motions (the people package); the minigames' `door` and `boat_up` move the door
  and the boat; `cast_off` hands over to `sea`.
- `threshold` follows the cape's `pie_leave` (the order of leaving: Papa passes the Fisherman at the threshold).

## Contract for the check

```json
{"beats": {"arrive": {"after": [], "tells": ["arrive:door", "arrive:arrow", "arrive:key"], "seconds": 20, "show": true}, "patch": {"after": ["arrive"], "tells": ["patch:seen"], "seconds": 9, "show": false}, "asleep": {"after": ["arrive"], "tells": ["asleep:asleep"], "seconds": 8, "show": false}, "bundles": {"after": [], "tells": ["bundles:fell", "bundles:wet", "bundles:sat"], "seconds": 24, "show": false}, "weed": {"after": [], "tells": ["weed:packed", "weed:laugh"], "seconds": 16, "show": false}, "dusk": {"after": [], "tells": ["dusk:stood"], "seconds": 12, "show": true}, "pines": {"after": [], "tells": ["pines:push"], "seconds": 8, "show": true}, "door_open": {"after": ["pines"], "tells": ["door_open:frost", "door_open:fisher"], "seconds": 10, "show": false}, "storm_coming": {"after": [], "tells": ["storm_coming:sky"], "seconds": 9, "show": true}, "boat_up": {"after": ["storm_coming"], "tells": ["boat_up:up"], "seconds": 7, "show": false}, "out_storm": {"after": [], "tells": ["out_storm:out"], "seconds": 8, "show": false}, "calm": {"after": [], "tells": ["calm:water"], "seconds": 14, "show": true}, "caulk": {"after": ["calm"], "tells": ["caulk:done"], "seconds": 9, "show": false}, "leave": {"after": [], "tells": ["leave:key", "leave:ready"], "seconds": 16, "show": true}, "cast_off": {"after": ["leave"], "tells": ["cast_off:off"], "seconds": 8, "show": false}, "threshold": {"after": [], "tells": ["threshold:palm", "threshold:sat"], "seconds": 14, "show": false}, "beam_pass": {"after": [], "tells": ["beam_pass:my"], "seconds": 8, "show": false}, "mooring_touch": {"after": [], "tells": ["mooring_touch:touch"], "seconds": 10, "show": false}, "look_marks": {"after": [], "tells": ["look_marks:cleft"], "seconds": 6, "show": true}},
 "points": ["lighthouse#door", "lighthouse#lantern", "door#door", "arrow_stone#stone", "granite#cleft", "boat#boat", "boat#mooring", "boat#lantern", "rock#edge", "sky#moon", "cape#point", "pines#crown", "papa", "mama", "troll", "my", "fisher"],
 "offers": ["papa", "mama", "troll", "my", "fisher", "lighthouse#door", "door#door", "arrow_stone#stone", "granite#cleft", "boat", "boat#mooring", "rock#edge"],
 "party": {"calm": 0, "dawn": 1, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "lighthouse_lit": 0, "pines": 0, "frost_step": false, "frost_patch": false, "boat": "moored", "cleft": "empty", "driftwood": false, "bundles": "slab", "papa_at": "slab", "mama_at": "slab", "troll_at": "boulder", "my_at": "stone", "fisher_at": "away", "beam": 0},
 "acts": {"door": {"values": [], "tells": ["door:open"]}, "boat_up": {"values": [], "tells": ["boat_up:up"]}, "mooring": {"values": [], "tells": ["mooring:free"]}, "flash": {"values": [], "tells": []}}}
```
