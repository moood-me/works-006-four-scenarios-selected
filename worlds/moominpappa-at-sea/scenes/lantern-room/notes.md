# The Lantern Room (С5 of the game «Папа и море»)

The lantern room at the top of the lighthouse: the lamp in the middle — its pedestal, the lens drum with the burner
inside, its cap and vent —, the barrel of thick oil, the sooty wall by the burner with the keeper's pencil under the
soot, the board by the lamp for the sheets Moominpappa pins up, the pot of warm oil in his frock coat, the camp bed
along the glass, the hatch in the floor where the stair comes up, the glass all round the seaward side with the
gallery and its rail outside, the sea far below. Stage 4 (all the states, people stand and breathe).

## How it is made

- A ten-sided room round the lamp (`lib.js`: `C`, `R`, `H`, `PARAPET`, `SIDE`; `at(angle, r)` — a bearing from `C`),
  seen from its open side: the four sides nearest the viewer are not built (their cut is out of the 16:9 frame; a
  21:9 one sees past them). The sides: `wall` (two landward sides, copies), `soot` (the one by the burner), `glazing`
  (three seaward sides, copies: a parapet, the glass in its frame — the glass itself clear), `glass_door` (the one
  with the door out to the gallery), `crack` (the struck glass, painted only when cracked). Outside: `gallery_floor`,
  `gallery` (the rail, copies; point `gallery#rail` on the side ahead-right).
- The lamp: `lamp` (the pedestal, a revolve form), `burner` (a flat sheet facing the room: the burner and its wick,
  the lens drum's glass, the flame, the blue flame, the grime — its shader turns the drum's panels while it burns,
  lights the flames from within, lays the grime as murky as `lenses` says; its lights `lamp` and `blue_flame` dimmed
  by animate), `lamp_top` (the cap, a form), `burner_smoke` (soot rising out of the lamp's top while it smokes).
- The keeper's writing under the soot (`soot`): a layer as legible as `slant` (no light can bring up grooves on a flat
  painting: the key says how far the slanting light has brought it up). Two pieces: the burner's and the pot's.
- The hatch: a hole in the floor's painting; the relief (`relief.js`, `lib.land`) is a pit under it, deeper to the
  left, so that whoever stands in it shows head and shoulders (My on the right, the boy on the left); the stair's
  rails and treads going down are a card at its far edge (`stair`, point `stair#hatch`).
- The storm lantern carried up (`lantern`, on the floor by the sooty wall): the round room's lantern (its painting
  is `lib.stormLantern` here — the same lantern), its flame by `lantern_flame`.
- Light: the island's (`island.light`; `inside` 0.9, the night's 0.85, the storm's 0.6) and its far lights (the sun
  at each hour, the moon from `sky#moon`, the lightning), the glass's daylight (`glass_light`), the lamp, the blue
  flame, the storm lantern.
- The script: the island's lightning, `smoke` from `flame`.
- `tools/lantern_room.py` writes `scene.json` from the same numbers as `lib.js` (keep them the same) and copies the
  island's shaders.

## The keys of the play

Common (the island's): `dawn`, `dusk`, `night`, `moon`, `storm`, `flash`, `lighthouse_lit` (not read here: the
lamp's own key is `flame`). The room's: `lenses` 0…1 (murky … wiped), `flame` (out · smoky · blue · lit — lit, the
drum turns), `slant` 0…1, `sheets` 0–2, `pot`, `cot` (none · made · empty · taken), `gallery_glass` (whole ·
cracked), `lantern_at` (none · floor), `lantern_flame` (full · low · out). The script's own: `smoke`.

## Open

- The lighthouse's beam: not made — the engine has no turning spotlight yet (plan, «Что проверено до начала»); the
  lamp's own light and glow only.
- `cot` taken: the bed slept in (the blanket thrown back, his hat by the pillow); Moominpappa lying in it needs a
  lying motion (stage 5).
- The room is bigger than the island's lighthouse's lantern seen from outside (5.6 m across against 2 m): it has to
  hold the lamp, the barrel, the bed, the hatch and three people.

## Contract for the check

```json
{"beats": {},
 "points": ["burner#wick", "burner#lens", "soot#grooves", "sheets#sheet", "cot#cot", "stair#hatch", "gallery#rail", "crack#glass", "barrel#oil", "pot#pot", "lantern#flame", "papa", "my", "troll"],
 "offers": ["burner#wick", "soot#grooves", "sheets#sheet", "cot#cot", "stair#hatch", "gallery#rail", "lantern#flame", "papa#chest", "my#chest", "troll#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "flash": 0, "lighthouse_lit": 0,
   "lenses": 0, "flame": "out", "slant": 0, "sheets": 0, "pot": false, "cot": "none", "gallery_glass": "whole",
   "lantern_at": "none", "lantern_flame": "full"},
 "acts": {}}
```
