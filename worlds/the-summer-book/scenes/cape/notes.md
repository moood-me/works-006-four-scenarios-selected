# The Cape

The island's far end (С4 of the game's scenario): bare granite going down into the open sea, Sophia's tent on the
rocks at the water's edge, the fog coming in from the sea; far up the island, over the rock, the house with
Grandmother's window. Its sea, sky, granite, pines, mist, fog and the hour and the weather are the island's
(`modules/isle.md`); the generator is `tools/cape.py` (`python -B tools/cape.py <world>` writes `scene.json`,
`elements/sky.*`, `elements/sea.*`). The approved look (stage 2) is `dusk: 1` (the August evening) and `night: 1` (the
moonlit night) with `fog: 0.5`, Grandmother and Sophia at their first places — on the island it looks as it did.

- **The land** is `lib.ground` (relief.js): `coast(z)` the line of the rock, `shore(z)` where the sea meets it, `edge`
  the waterline. `rock` paints the granite (the island's) and the cape's own moss and grass inland (burnt in August:
  `late`). `path` — the wet stones coming down from the island (`path#stone1` the highest, `#stone2`, `#stone3`);
  `seat` — two low stones to sit on (halfway down the path, and behind the tent by its far corner: the tent's back
  stands at the water's edge).
- **The tent** is cards and planes on the unseen anchor `tent` (facing 215; `lib.onTent(across, distance)` — a point of
  its frame in the world's): `tent_front`, `tent_back`, the two roof slopes, `tent_floor` (Sophia's blanket), the
  candle `lantern` at its back, `peg` (the front guy rope and its peg), `stones_side`/`stones_front` (the stones round
  its edges, `stones`). Its states (`tent`, between steps or once in a piece — each painting reads it): `parcel` (the
  roll on the rock, as Eriksson brought it: `parcel`), `pole` (the pole stood up, the canvas slack: `pole`, swaying),
  `up`. `lean` 0…1 leans the whole tent back up to 9° (the anchor's tilt, `tent_tilt`: the engine moves it). The door
  (`flap`) is `open` (thrown back, the flaps tied, stirring in the wind) or `shut` (laced): the canvas is translucent,
  the candle (`candle`) makes it glow, and Sophia sitting inside (`sophia_at: inside`) between the candle and the shut
  door is a sharp shadow on it (her element's `shadow` names the light `candle` and the canvas: check 2 of the plan).
- **The crevice** `ledge`: a low granite face at the water behind the tent, a dark cleft and a ledge in it, facing the
  sea — seen from the sea only (from the land the tent stands before it); the shawl on the ledge by `shawl: ledge`.
- **Far off**: `far_house` (painted flat) and `far_window` (glows: its pane lit by `window`), the pines round it; the
  fog's wall on the horizon (`fog_wall`), its banks over the water (`fog_far`: as approved), and over a half the cape in
  the fog (`fog_near`, the island's thick-fog look). In the thick fog the candle's light is held to 0.4 (the scene's own
  look over the island's `fog_air`): its glow in the white air would wash out whoever sits by the tent.
- **The light**: the island's by the hour — `dusk` the August evening (the afterglow low on the left), `night` the
  moonlit night (the moon behind the viewer over the island, so the faces turned to us are lit), `dawn` the last
  morning, the day (June, or August with `late`). `candle` — the lantern's light, `window` — Grandmother's lamp.
- **People** (the world's `cast`): `<id>_at` names where each is (`lib.PLACES`, put by the island's `places`; sitting
  ones — `do`, `on` — by the script): Grandmother — stand (first), pole (holding the pole as it goes up), stone1…3 (on
  the path's stones), half (sitting on the stone halfway), door (at the tent's door), behind (sitting behind the tent,
  her palm on its back: `tent_back#palm`); Sophia — tent (first), tie (by the peg), door (at the thrown-back flap),
  inside (sitting in the tent, the knees hugged), path (coming up to meet her); Papa — by (beside the tent), peg (at
  the peg, the last morning), path (on the highest stone). Papa is not here in the empty play.
- **The cat** (the world's `cat`): `cat_at` (tent · door · rock: `lib.CAT`), `cat_pose` (sit · lie · walk · none — not
  here, the empty play). Walking, a new `cat_at` sends him there at his pace (`cat:arrived` told).
- **The camera** (`from`, a cut): `land` — the scene's own; `sea` — out on the water to the right looking back at the
  cape (the tent's back, the crevice, the ledge); `side` — up the path on the left, across the tent to the sea (whoever
  sits behind it).
- The showcase (`showcase.js`): the tent going up, the evening turning to night, the glow, the shadow on the shut door,
  Sophia at the door with the cat, Grandmother on the stones in the fog, Grandmother behind the tent, the last morning,
  the cape from the sea.

## What changed for the game (stage 3 used `night`, `fog`, `candle`, `window`)

- `night: 0` is now the day, not the August evening: the evening is `dusk: 1` (and `late: 1` for August). The game's
  `DUSK` keys (`chapters/4.js`) want `dusk: 1, late: 1`; the epilogue's last morning `dawn: 1, late: 1`.
- `fog` is the island's: up to a half its banks over the water (0.5 — as approved), over a half the cape in white air.
- The empty play is a June day (the island's), the tent up, the candle and the window out; Papa and the cat not here.
- New: `tent`, `lean`, `flap`, `shawl`, `stones`, `from`, the places, the cat. The points `tent_front#door`,
  `far_window#window` stay; `lantern` is now `lantern` at the tent's back.

## Contract for the check

```json
{"beats": {},
 "points": ["tent_front#door", "tent_back#palm", "path#stone1", "path#stone2", "path#stone3", "peg#peg", "ledge#shawl", "pole#grip", "pole#top", "parcel#parcel", "seat:0#seat", "seat:1#seat", "lantern", "far_window#window", "cat#cat", "cat#back", "sky#sun", "sky#sun_late", "sky#sun_dawn", "grandma#chest", "sophia#chest", "papa#chest"],
 "offers": ["tent_front#door", "tent_back#palm", "path#stone1", "path#stone2", "path#stone3", "peg#peg", "ledge#shawl", "pole#grip", "parcel#parcel", "cat#back", "far_window#window", "grandma#chest", "sophia#chest", "papa#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "candle": 0, "window": 0, "tent": "up", "lean": 0, "flap": "open", "shawl": "none", "stones": false, "from": "land", "grandma_at": "stand", "sophia_at": "tent", "papa_at": "by", "cat_at": "tent", "cat_pose": "none", "grandma_here": true, "sophia_here": true, "papa_here": false},
 "acts": {"flash": {"values": [], "tells": ["flash:strike"]}, "cat_at": {"tells": ["cat:arrived"]}}}
```

Against the plan's names: `ledge#shawl` is the crevice's (its element is `ledge`); `flap` is `open` · `shut` (a door
laced or not is a painting's state, read between steps — a smooth key would repaint it); the seats are `seat:0`
(halfway) and `seat:1` (behind the tent).
