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
- **People** (`<id>_at`, `lib.PLACES`, the island's `places`), seated on the thwarts (`on` the hull, carried with
  it): Grandmother — `seat`, `hand` (her hand to Sophia's); Sophia — `bow` (sitting on the deck in the bow, facing the
  way they go), `beside`, `hand` (her hand in Grandmother's); Papa — `stern`, on the stern thwart by the engine. The
  cat Mappe is the world's `cat` on the basket's lid while `basket` is cat.
- The showcase: leaving, Sophia on the bow and the cat, the swell and the hands, the island gone.

## Pieces (stage 5)

Made as the shore's (`lib.js` `film(scene)`, `from` and `run`, the world's `beats`; the game says the lines at the
moments and plays the mini-games between pieces; a piece ends in the pose of what follows it). The camera is the
scene's own, riding in the bow (`eye`), moved nearer or aside by the pieces (`camera_x`, `camera_z`, `camera_yaw` in
the boat's frame), or framing a point (`camera_target`). Where the people sit is the play's (`sophia_at`, `grandma_at`
by Sophia's scale, §8 — in `party`); the island's going (`island`), the swell (`sway`) are the pieces'. All in the last
morning's light (`late`, `dawn`, `fog` 0.6 → 0.85 as the island goes).

- `aboard` («Окно», «Платок», ≈ 8 s): the big boat off the far rock, everyone in their seats, the things,
  the basket (`basket`), the dinghy in tow (`dinghy`); the motor starts, the island begins to go (`island` 0.15 →
  0.25) — `aboard:motor`; with `counted` Sophia's lips move: she counted Grandmother's steps into the boat —
  `aboard:count`.
- `come_over` («Палатка», Sophia ≥ 3, ≈ 10 s): Sophia on the bow (`sophia_at` bow); as the island begins to go
  (`island` 0.2 → 0.35) she gets up and comes over to Grandmother, sits by her and takes her hand (`sophia_at` hand,
  `grandma_at` hand) — `come_over:sat`. Ends in the pose of М11 «Держать» (`sophia#hand_r`, hand in hand, in the middle
  4:3).
- `hand_in_hand` («Палатка», Sophia ≤ 2, ≈ 3 s): the two seated hand in hand from the start, the island beginning to
  go. Ends in the pose of М11 «Держать».
- `eyes_closed` (after М11 «Держать», ≈ 10 s): the island going on (`island` → 0.6); Grandmother sits with her eyes
  closed, smiling — `eyes_closed:smile`.
- `swell` («Платок», ≈ 4 s): out on the swell, the boat pitching (`sway` up); Grandmother on her thwart. Ends in the
  pose of М11 «Сидеть прямо» (`grandma#chest`): the mini-game moves `sway` (the swell she sits upright against).
- `motor` (every ending, the second step, ≈ 6 s): the motor; the island going by on the right (`island` → 0.45) —
  `motor:go`. (The game then cuts to the shore's `from_water` and the new house's `from_sea`, and back.)
- `look_house` (every ending without the new house, after the new house's `from_sea`, ≈ 6 s): Sophia looks back a long
  time at the black windows of that house as long as they can be seen (`new_house#windows`) — `look_house:look`.

The second step of an ending, in this order (the game cuts with `beat_next`; each of these opens with its own `from`
when what comes before it was not played): `motor` → (the shore, the new house) → `look_house` → `cat_gift` → `sky` →
the ending's talk → `promise` → the last shot.
- `cat_gift` (`basket` cat, ≈ 12 s): the cat on the basket beside Sophia, a dead bird at his paws — `cat_gift:bird`;
  wrinkling her nose she drops it overboard with two fingers — `cat_gift:over`; strokes him (`sophia_reach` →
  `cat#back`); he puts up with it and looks at the water — `cat_gift:stroke`.
- `sky` (≈ 5 s, by `storm_mark`): Sophia looks up at the grey sky and laughs (`porch`) / Papa covers the two of them
  with one blanket (`blanket`; the blanket, Л) / by habit Sophia folds her hands — and lowers them (`notyou`) —
  `sky:sign`.
- `window_talk` («Окно», ≈ 22 s): Grandmother looks — at Papa's bag (`sign_hat` bag), at the hat on Sophia (`on`), back
  at the island where the hat stayed (`nail`) — `window_talk:look`; to her son, not to Sophia — `window_talk:said`
  («She wouldn't have let herself be led either»); a pause; Papa — `window_talk:papa` («She wouldn't»); Sophia looks
  from one to the other — `window_talk:sophia`; with `song` Grandmother hums the song, hoarsely — `window_talk:song`.
- `promise` (after a talk, ≈ 14 s, by `mama`): `sky` — Sophia to Grandmother — `promise:said` («You promised: not
  soon» — «I did» — «Promise again»); Grandmother says nothing — `promise:silent` («Greedy»); Sophia turns away —
  `promise:away`. `moon` — in a whisper, only to Grandmother, while Papa is at the stern — `promise:whisper` («You never
  did tell me…»); Grandmother points at the water — `promise:point` («Look» — «"Look" again!»); she looks —
  `promise:looks`. (`gone` — no piece.)
- `window_last` («Окно», ≈ 12 s): the narrator's line — `window_last:narrator`; the island going into the white
  (`island` → 1, `fog` → 0.85), the house's window dark, the last of it (`island#window`) — `window_last:window`.
- `tent_talk` («Палатка», ≈ 24 s): Sophia tells Papa about the summer — `tent_talk:tell`; «…and Mama would have got
  into the tent too!» — she stops — `tent_talk:mama`; Papa lays his hand on her head and keeps it there (`papa_reach`
  → `sophia#head`) — `tent_talk:hand`; «Next summer again!» — «Again» — «We'll see» — `tent_talk:again`; with `late`
  form «Why only once?» — Grandmother does not answer — `tent_talk:once`. (The game cuts to the cape for the last shot.)
- `oars_boat` («Вёсла», ≈ 22 s): by the big boat's side; Papa lifts her in from the dinghy, or she climbs over by
  herself — `oars_boat:board`; without `learned` his hand on her elbow feels her trembling — `oars_boat:tremble` (by
  `nets` — «Mamma?» — «I'll tell you later» / «Nothing to tell» / he holds her hand on the gunwale, as the net's end —
  `oars_boat:hand`); Sophia sits down by her scale — `oars_boat:seat`; with `ask_mama` — `oars_boat:ask` («Did Mama
  row like that?»), a long silence — `oars_boat:better` («Better»); else Papa takes the dinghy's oars from Sophia and
  ties it astern (`dinghy` → true) — `oars_boat:tie`; with `counted` Sophia, watching Papa help her in, counts
  soundlessly with her lips — `oars_boat:count`.
- `oars_last` («Вёсла», ≈ 10 s): the island going into the white (`island` → 1, `fog` → 0.85); the last shot by
  Sophia's place — Grandmother's empty hands on her knees and Sophia ahead on the bow / beside her, facing forward /
  Sophia's hand in hers and the bow empty — `oars_last:hands`.
- `shawl_talk` («Платок», ≈ 20 s): Sophia tells — haltingly to Papa (`called`), or everyone how she slept alone —
  `shawl_talk:tell`; with `called` Papa looks at his mother and says nothing — `shawl_talk:papa`; with `knock` «You
  didn't knock» — `shawl_talk:knock`; Grandmother says nothing — `shawl_talk:silent`; from the water Sophia sees by the cape, in a crevice above the water, a grey patch —
  `shawl_talk:patch` («What's that?» — «A stone»). (The game cuts to the cape for the last shot.)

The play's keys the pieces read (`party`): the hour and the weather; where Sophia and Grandmother sit (`sophia_at`,
`grandma_at`); `basket` (cat with «Кот: подарок»); `dinghy` (in tow; false at the start of «Вёсла»); `counted` («Софья
знает»); `storm_mark` (`porch` · `blanket` · `notyou`); `song` («Гроза: одеяло»); `sign_hat` (`on` · `bag` · `nail`);
`mama` (`gone` · `sky` · `moon`); `learned`, `nets` (`say` · `nothing` · `net`), `ask_mama` (the full «Вёсла» with
«Мама: нет»); `late_form`; `called`, `knock`. The mini-games: «Держать» moves nothing (the island goes on in the piece
after it), «Сидеть прямо» moves `sway`.

## The pieces' code (stage 5)

`lib.js` `film(scene)`, played by the world's `beats` from `script.js`; `showcase.js` a selection in its play's keys.
The camera rides the eye in the bow; the pieces move it in the boat's frame toward the faces (`BNEAR`: `CLOSE`,
`MEDIUM`, `HANDS`), or turn it toward the island's window, the cape, the new house (`YAW`). The operator is not used
inside the boat: framing someone seated there it stands behind them or inside the thwart. The sea's mirror follows the
weather (the island's keyed mirror).

### What the pieces need from the people (package Л)

- Motions: Sophia `rise_floor` (up from the deck), `fold_hands`; Papa `drape` (the blanket), `tie` (the dinghy's
  painter at the stern). Grandmother with her eyes closed (`eyes_closed`: a face of the cast's).
- Parts — in: `blanket_fold` (Papa carrying it), `blanket_round` (round the two). The dead bird is the scene's (`bird`,
  `cat_bird`).

## Contract for the check

```json
{"beats": {
 "aboard": {"after": [], "tells": ["aboard:motor", "aboard:count"], "seconds": 8, "show": false},
 "come_over": {"after": [], "tells": ["come_over:sat"], "seconds": 10, "show": false},
 "hand_in_hand": {"after": [], "tells": [], "seconds": 3, "show": false},
 "eyes_closed": {"after": ["come_over", "hand_in_hand"], "tells": ["eyes_closed:smile"], "seconds": 10, "show": false},
 "swell": {"after": [], "tells": [], "seconds": 4, "show": false},
 "motor": {"after": [], "tells": ["motor:go"], "seconds": 6, "show": false},
 "look_house": {"after": [], "tells": ["look_house:look"], "seconds": 6, "show": false},
 "cat_gift": {"after": ["look_house"], "tells": ["cat_gift:bird", "cat_gift:over", "cat_gift:stroke"], "seconds": 12, "show": false},
 "sky": {"after": ["look_house", "cat_gift"], "tells": ["sky:sign"], "seconds": 5, "show": false},
 "window_talk": {"after": ["look_house", "cat_gift", "sky"], "tells": ["window_talk:look", "window_talk:said", "window_talk:papa", "window_talk:sophia", "window_talk:song"], "seconds": 22, "show": false},
 "tent_talk": {"after": ["look_house", "cat_gift", "sky"], "tells": ["tent_talk:tell", "tent_talk:mama", "tent_talk:hand", "tent_talk:again", "tent_talk:once"], "seconds": 24, "show": false},
 "oars_boat": {"after": ["look_house", "cat_gift", "sky"], "tells": ["oars_boat:board", "oars_boat:tremble", "oars_boat:hand", "oars_boat:seat", "oars_boat:ask", "oars_boat:better", "oars_boat:tie", "oars_boat:count"], "seconds": 22, "show": false},
 "shawl_talk": {"after": ["look_house", "cat_gift", "sky"], "tells": ["shawl_talk:tell", "shawl_talk:papa", "shawl_talk:knock", "shawl_talk:silent", "shawl_talk:patch"], "seconds": 20, "show": false},
 "promise": {"after": ["window_talk", "tent_talk", "oars_boat", "shawl_talk"], "tells": ["promise:said", "promise:silent", "promise:away", "promise:whisper", "promise:point", "promise:looks"], "seconds": 14, "show": false},
 "window_last": {"after": ["window_talk", "promise"], "tells": ["window_last:narrator", "window_last:window"], "seconds": 12, "show": false},
 "oars_last": {"after": ["oars_boat", "promise"], "tells": ["oars_last:hands"], "seconds": 10, "show": false}},
 "points": ["boat#seat", "boat#bow", "basket#lid", "cat#cat", "cat#back", "transom#cleat", "island#window", "island#cape", "island#pier", "new_house#windows", "sky#sun", "sky#sun_late", "sky#sun_dawn", "grandma#chest", "grandma#hand_l", "sophia#chest", "sophia#hand_r", "sophia#head", "papa#chest"],
 "offers": ["sophia#hand_r", "grandma#chest", "sophia#chest", "papa#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "grandma_at": "seat", "sophia_at": "beside", "basket": "shut", "dinghy": true, "counted": false, "storm_mark": "notyou", "song": false, "sign_hat": "nail", "mama": "gone", "learned": false, "nets": "say", "ask_mama": false, "late_form": false, "called": false, "knock": false, "grandma_here": true, "sophia_here": true, "papa_here": true},
 "acts": {"sway": {"values": [], "tells": []}, "flash": {"values": [], "tells": ["flash:strike"]}}}
```

The last morning a game plays here is `late: 1, dawn: 1, fog: 0.6` (the showcase's); `fog` toward 0.85 as the island
goes.
