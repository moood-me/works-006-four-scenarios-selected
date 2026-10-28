# At Sea

The last scene of «The Summer Book» (С6 of the game's scenario): the last morning of August, the big motor boat
taking them off the island in the thin morning fog, the island going away into the white. Its sea, sky, fog and the
hour and the weather are the island's (`modules/isle.md`); the generator is `tools/sea.py` (`python -B tools/sea.py
<world>` writes `scene.json`, `elements/sky.*`, `elements/sea.*`).

- **The boat** is the unseen anchor `hull` amidships at the deck (it is moved out from the island by `island` —
  its distance `boat_d`, the script's — and pitches on the swell by `sway` — `boat_pitch`, the script's), the deck
  plane `boat` on it (people stand on it), and on it: the sides and the bow seen from inside (`side_l`, `side_r`,
  `bow_l`, `bow_r`: `lib.side`), the stern (`transom`), the engine's housing, two thwarts and their fronts, the
  basket in the bow (`basket`: the cat Mappe on its lid, or shut), the things aft (`bundles`), the dinghy in tow on
  its painter (`dinghy`). Metres from the deck's middle, across it and toward the stern.
- **The camera rides** `eye`, in the bow at a seated person's height, looking aft: the people facing it (the way the
  boat goes), the island behind them. `eye` has its own `facing` (180): an anchor the camera rides must, else the
  engine turns it toward the start's eye — itself (engine gap, see the history note).
- **The island** is a picture far off (`island`: the granite back, the pines, the house with the room's window, the
  pier, the cape); the new house on its far side (`new_house`, its black windows); skerries; the fog's wall, banks
  far and near (`fog`). At `island` 1 the boat is 360 m out and the island is gone into the fog.
- **People** (`<id>_at`, `lib.PLACES`, the island's `places`): Grandmother — `seat`, `hand` (her hand to Sophia's);
  Sophia — `bow` (on the bow, facing the way they go), `beside`, `hand` (her hand in Grandmother's); Papa — `stern`
  by the engine. They stand (stage 4): seated places come with the motions of stage 5. The cat is a painting on the
  basket (the world's `cat` module, when it comes, will take him).
- The showcase: leaving, Sophia on the bow and the cat, the swell and the hands, the island gone.

## Contract for the check

```json
{"beats": {},
 "points": ["boat#seat", "boat#bow", "basket#cat", "transom#cleat", "island#window", "island#cape", "island#pier", "new_house#windows", "sky#sun", "sky#sun_late", "sky#sun_dawn", "grandma#chest", "sophia#chest", "papa#chest"],
 "offers": ["boat#seat", "boat#bow", "grandma#chest", "sophia#chest", "papa#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "island": 0, "sway": 0, "basket": "shut", "dinghy": true, "grandma_at": "seat", "sophia_at": "beside", "papa_at": "stern", "grandma_here": true, "sophia_here": true, "papa_here": true},
 "acts": {"flash": {"values": [], "tells": ["flash:strike"]}}}
```

The last morning a game plays here is `late: 1, dawn: 1, fog: 0.6` (the showcase's); `fog` toward 0.85 as the island
goes.
