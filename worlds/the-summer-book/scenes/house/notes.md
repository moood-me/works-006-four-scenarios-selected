# The House

The house on the island (C2 of the game's scenario): the glazed veranda — Papa's table by its windows, his camp bed,
the glass door to the room with the straw hat on its nail — and the room: Grandmother's and Sophia's beds side by side,
the night table with her lamp, the window onto the cape with the armchair beside it, the second door, the creaking one,
to the entry and the porch. Outside, the island's rock and sea; from the room's window the long back of granite down to
the cape, where Sophia's tent stands. Stage 4: every state a key of the play; people stand and breathe (no motions yet).
`tools/house.py` writes `scene.json` (run `python -B tools/house.py <world>`); the island's sky, sea, light and weather
are `modules/isle` (`tools/isle.py`).

## How it is made

- **The frame.** Everything of the house is laid on the unseen anchor `veranda` at the veranda's far corner (across
  −0.6, distance 7, facing 225, 0.3 m over the land): x runs right along the back wall, z away behind it, y up from the
  floor. `lib.js` turns it to the world's metres and back (`lx`, `lz`, `wa`, `wd`, `bearing`); `tools/house.py` has
  the same numbers — keep them the same. A card's facing in the frame: 180 faces the veranda (−z), 0 the cape's side,
  90 the right (+x), 270 the left.
- **The veranda** (stage 2's, as approved): x 0…6.4, z −6.4…0 — `floor`, `ceiling`, `side_wall` and `glazing` (x 0),
  `back_wall` with the doorway (x 1.3…2.15), the open glass `door`, `hat` on its nail, Papa's `table` (plane;
  `supper`), `table_legs`, `table_things`, `chair`, `cot`. Beyond the glazing the house's front (`house_out`).
- **The room** x −2.7…2.3, z 0.1…3.8: `room` (the far wall, the window's opening cut out; the point `room#window`),
  `room_near` (the doorway from inside), `jamb`, `lintel`, `room_left`, `room_right` (the second door's opening),
  `room_ceiling` (a card laid face down), `room_floor`. The beds' heads at the far wall: `beds` (their tops, a plane;
  `beds#gap` — the edge of Grandmother's blanket by Sophia's bed), `pillow` (Sophia's, with the dead bird), `bed_foot`,
  `bed_side` (each with a part for the other bed), `bed_head`. `stand` and `stand_top` (the night table), `lamp`,
  `teabox`, `armchair` (`armchair#seat`). The window: `room_window` (its frame and the shut left leaf; its rectangle is
  the daylight `win_in`), `room_glass` (the left leaf's pane: `glass`, strength 0.55 — the room mirrored in it at
  night), `casement` (the right leaf, hinged at its right, swinging out by `casement`), `sill` (a plane), `drops`.
  `door2` (hinged at its far side, opening out into the entry by `creak`), and the entry beyond it (`entry_floor`,
  `entry_wall` with the outer door and Papa's storm lantern on its hook, `entry_side`).
- **Outside.** `relief.js` → `lib.ground`: level under the house (the veranda and the room: `lib.out`), falling to the
  sea (−4.4) all round, and the cape's back (`lib.ridge`) running from the room's window (W) down 65 m to the cape (T,
  bearing 18° from the window) and ending in the sea. `outside` — one draped plane painting it all (granite, the wet
  band, cracks, lichen, grass and heather by the house and along the crest, burnt by `late`, the worn way of stones down
  to the cape). The island's `sky` and `sea` (`modules/isle`), `islet`, `skerry`, `mist` and `fog_wall` (thickening
  with `fog`), `juniper` along the back, the `tent` (translucent canvas; its candle a glow `candle` by `tent_light`;
  the point `tent#tent`), `far_lantern` (Papa's lantern, `far_light`, carried along the way by `far_light_at`).
- **The light.** The island's (`isle.light`: the day as approved, the looks late, dawn, dusk, night, fog_air, storm,
  flash), `inside` 0.6 (at night 0.85, so that faces read). The far lights: the suns of the day, August and the dusk
  come in only through the glazing; the dawn's and the moon's — low over the sea beyond the cape, bearing 22° — only
  through the room's window (`through`, the opening as a polygon). The day (or the moon) at the glazing (`sky_in`) and
  at the room's window (`win_in`). `lamp` (the lamp's flame, lit by `lamp_lit` while it is on its table or in the
  window), `candle` (at Sophia's right hand — the candle itself is the people's part, stage 5), `far_lantern`. Rain in
  three areas round the house (none inside it), drops running down the glazing and the window in a storm.
- **The script** (`script.js`): the island's weather; `view` → a cut with all the camera's keys (`lib.VIEW`); `<id>_at`
  → the person put at that spot at once, turned, looking where the spot says (`lib.SPOT`: Grandmother at the window
  looks at the tent, Sophia at the moon), Sophia's hand in Grandmother's when both are before the glass door, Papa's mug
  at his table; `hat`, `lamp`, `cot` → their places; `casement`, `creak`, `far_light_at` → the turns and the place
  (the script's own keys, in `states`).
- **The views** (`view`): `veranda` (stage 2's), `room` (from inside the doorway: the beds, the window, the armchair),
  `window` (behind the one at the window on her right: the cape, the moon, her face in the glass), `face` (close on the
  face of the one at the window, from beside the night table — the camera at Sophia's eyes when she is there, else
  Grandmother's), `door` (from the beds' side: the second door and the doorway to the veranda). A view is set between
  steps: it cuts.
- **The cat** is not here yet: the world's `cat` module is package В's; its places in this scene will be the sill, the
  bed by the pillow, the veranda.

## The keys of the play

Common (the island's): `dawn`, `dusk`, `night`, `late`, `calm`, `storm`, `flash`, `fog`, `moon`. The house's:
`view`, `grandma_at` (door · table · bed · window · chair · door2), `sophia_at` (door · bed · window · door2),
`papa_at` (table · cot · doorway · room · door2), `hat` (nail · bed · none), `bird`, `teabox`, `lamp` (none · table ·
window · burnt), `lamp_lit` 0…1, `drops` (none · full · empty), `cot` (veranda · room), `supper`, `candle` 0…1,
`casement` 0…1, `creak` 0…1, `tent_light` 0…1, `far_light` 0…1, `far_light_at` 0…1; the people's `<id>_here`,
`<id>_mood`.

## What changed for the game (stage 3 → 4)

- The scene is the whole house now; its stage-3 points stay (`back_wall#doorway`, `room#window`, `hat#hat`,
  `glazing#window`, people's `#chest`). The door mini-game (М5в) belongs on `door2#handle` (the second door) with
  `view: door`, not on `back_wall#doorway` (the glass door to the veranda).
- The «new house» stand-in is gone from this scene's use: the game's 3.3 «moss» goes to `new-house`.

## Open

- The thick fog (`fog` over a half: the look `fog_air`) is the air of the whole scene, the room too: a lamp lit in the
  room glows in the room's air as in the fog outside. Held down here (the house's `fog_air` `hazeGlow` 0.8, the lamp's
  reach 3.5); the engine has no air of its own for what is inside (reported).
- By day the window's pane shows a faint image of the room (the pane's `show` counts the day's light so).

## Contract for the check

```json
{"beats": {},
 "points": ["back_wall#doorway", "glazing#window", "hat#hat", "room#window", "beds#gap", "pillow#pillow", "door2#handle", "lamp#lamp", "table#cup", "armchair#seat", "tent#tent", "far_lantern#lantern", "sky#moon", "grandma", "sophia", "papa"],
 "offers": ["grandma#chest", "sophia#chest", "papa#chest", "beds#gap", "pillow#pillow", "door2#handle", "lamp#lamp", "table#cup", "room#window", "hat#hat", "back_wall#doorway"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1,
   "view": "veranda", "grandma_at": "door", "sophia_at": "door", "papa_at": "table", "hat": "nail", "bird": false,
   "teabox": false, "lamp": "table", "lamp_lit": 0, "drops": "none", "cot": "veranda", "supper": false, "candle": 0,
   "casement": 0, "creak": 0, "tent_light": 0, "far_light": 0, "far_light_at": 0},
 "acts": {}}
```
