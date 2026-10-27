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

## Pieces (stage 5)

The scene's film in pieces (`modules/beats`: the game sets `beat`, the scene tells `beat:<name>` at its end and `<piece>:<moment>` at each moment the game speaks or acts on; the game's lines are the game's). The keys a piece moves are its own; the party's keys it starts from are the step's (the game's `g.scene`). The seconds are estimates.

| Piece | Step | What it shows | Keys it sets | Ends on | Moments (`<piece>:<moment>`) |
| --- | --- | --- | --- | --- | --- |
| `lamp_look` | 2.1 | the same afternoon: the cloudy lenses; Papa dips a finger in the barrel — the oil thick as jam; the wall by the burner black with soot, grooves under his finger | lenses 0, flame out | Papa at the burner: the pose for М3 «Спичка» (burner#wick) | oil, soot, wick |
| `smoke_out` (after lamp_look) | 2.2 | the flame catches, smokes and goes out; My in the hatch | flame smoky→out, my in the hatch | My in the hatch, Papa facing her | out, my |
| `n1_up` | 2.7 Ш1 «Наверх» | Papa comes up with the lantern: the pose for М5а «Ровно» at the sooty wall; the writing comes up, he reads; he splashes paraffin on the burner, strikes: blue, out; he pins up the sheet, sets up the camp bed | lantern_at floor, slant, flame blue→out, sheets +1, cot made | Papa by the cold lamp, the sheet on the board | wall, read, out, sheet |
| `n1_cold` | 2.7 Ш1 «Сыну» | Papa up by the cold lamp, listening (the silence) | flame out | Papa by the lamp | listen |
| `n1_half` | 2.7 Ш1 «По очереди» | the pose for М5г «Полсвета»: the sheet by the dim flame — the writing does not come up; before dawn he takes the lantern down | lantern_at floor, lantern_flame low, slant low | the empty room above, the lantern gone | wall, down |
| `lenses` | 3.2 | noon: Papa up by the lamp rubbing the lenses | lenses 0→1 | the lenses clear | wiped |
| `w_lamp` | 3.4 Ш2 «Гуляет» | Papa by the lamp till dusk: wiping the lenses, striking matches, talking to the burner; the light goes to dusk | dusk 0→1 | Papa by the lamp at dusk | dusk |
| `n2_asleep` | 3.5 «Гуляет» | Papa asleep by the lamp (the lantern on the floor, its light straight on the soot: no grooves); the boy appears in the hatch and reaches for the lantern; the creak | night, lantern_at floor, slant 0, troll in the hatch | the pose for 3.6 (lantern#flame) | hatch |
| `n2_read` (after n2_asleep) | 3.6 «Положи», by the lamp | the boy sets the lantern down; Papa turns the wick up, holds it slanting by the soot, reads the next piece; the sheet | lantern_flame full, slant, sheets +1 | the sheet pinned | wall, read, sheet |
| `n2_taken` (after n2_asleep) | 3.6 «Не открывать глаз» / «Следом», by the lamp | the boy goes down with the lantern (Papa after him: «Следом»); the camp bed stays empty | lantern_at none, cot empty | the dark lantern room | gone |
| `pot_up` | 4.2 | Papa sets the pot wrapped in his frock coat by the lamp | pot true | the pot by the lamp | set |
| `st_gallery` | 4.4 Ш3 «Маяк» | Papa on the gallery shouting at the storm; a wave into the glass — it cracks; what is by the lamp is seen: the sheets (the empty place of the second), the pot or none, the cold barrel | storm, gallery_glass cracked | Papa at the burner: the pose for М9а (burner#wick) | shout, wave, sheets, wick |
| `st_lit` (after st_gallery) | 4.4 Ш3 «Маяк», two sheets | the warm oil runs, the flame rises, the lenses turn; Papa on the gallery, wet, laughing | flame lit | Papa on the gallery, the lamp burning | lit, laugh |
| `st_out` (after st_gallery) | 4.4 Ш3 «Маяк», fewer sheets | the paraffin burns blue, the oil does not run; the flame rises and dies; lightning — Papa's face close; he listens to the wind by the cold lamp | flame blue→out, flash | Papa by the cold lamp | out, flash, listen |
| `st_both` | 4.4 Ш3 «Горелка и бегом» | the pose for М9г at the burner; a bang below; the flame dies behind him as he goes down | flame blue→out | the dark lamp, the hatch | wick, bang, down |
| `e_write` | Эпилог «Луч» | Papa on the gallery writing his Big Book of the sea, the lamp burning (late: he sleeps up here all week — the bed slept in) | flame lit, lenses 1, cot taken | Papa on the gallery | write |
| `e_light` | Эпилог «Лестница», two sheets | on a still evening Papa warms the pot, lights the lamp — and goes down without staying | flame lit, pot | the lamp burning, the room empty | lit, down |
| `shot_cot` | finales, the common frames | the camp bed by the promise (made, empty, slept in) | — | the bed, held | seen |

Keys of the mini-games (`acts`): `match` (М3, the match toward the wick 0…1); М5а/М5г move `slant`, М9а/М9г `flame` (the party's keys, set by the mini-game while it plays).

## Contract for the check

```json
{
 "beats": {
  "lamp_look": {
   "after": [],
   "tells": [
    "lamp_look:oil",
    "lamp_look:soot",
    "lamp_look:wick"
   ],
   "seconds": 16,
   "show": false
  },
  "smoke_out": {
   "after": [
    "lamp_look"
   ],
   "tells": [
    "smoke_out:out",
    "smoke_out:my"
   ],
   "seconds": 10,
   "show": false
  },
  "n1_up": {
   "after": [],
   "tells": [
    "n1_up:wall",
    "n1_up:read",
    "n1_up:out",
    "n1_up:sheet"
   ],
   "seconds": 26,
   "show": false
  },
  "n1_cold": {
   "after": [],
   "tells": [
    "n1_cold:listen"
   ],
   "seconds": 15,
   "show": false
  },
  "n1_half": {
   "after": [],
   "tells": [
    "n1_half:wall",
    "n1_half:down"
   ],
   "seconds": 16,
   "show": false
  },
  "lenses": {
   "after": [],
   "tells": [
    "lenses:wiped"
   ],
   "seconds": 10,
   "show": false
  },
  "w_lamp": {
   "after": [],
   "tells": [
    "w_lamp:dusk"
   ],
   "seconds": 16,
   "show": false
  },
  "n2_asleep": {
   "after": [],
   "tells": [
    "n2_asleep:hatch"
   ],
   "seconds": 14,
   "show": false
  },
  "n2_read": {
   "after": [
    "n2_asleep"
   ],
   "tells": [
    "n2_read:wall",
    "n2_read:read",
    "n2_read:sheet"
   ],
   "seconds": 20,
   "show": false
  },
  "n2_taken": {
   "after": [
    "n2_asleep"
   ],
   "tells": [
    "n2_taken:gone"
   ],
   "seconds": 8,
   "show": false
  },
  "pot_up": {
   "after": [],
   "tells": [
    "pot_up:set"
   ],
   "seconds": 6,
   "show": false
  },
  "st_gallery": {
   "after": [],
   "tells": [
    "st_gallery:shout",
    "st_gallery:wave",
    "st_gallery:sheets",
    "st_gallery:wick"
   ],
   "seconds": 22,
   "show": false
  },
  "st_lit": {
   "after": [
    "st_gallery"
   ],
   "tells": [
    "st_lit:lit",
    "st_lit:laugh"
   ],
   "seconds": 14,
   "show": false
  },
  "st_out": {
   "after": [
    "st_gallery"
   ],
   "tells": [
    "st_out:out",
    "st_out:flash",
    "st_out:listen"
   ],
   "seconds": 14,
   "show": false
  },
  "st_both": {
   "after": [],
   "tells": [
    "st_both:wick",
    "st_both:bang",
    "st_both:down"
   ],
   "seconds": 12,
   "show": false
  },
  "e_write": {
   "after": [],
   "tells": [
    "e_write:write"
   ],
   "seconds": 12,
   "show": false
  },
  "e_light": {
   "after": [],
   "tells": [
    "e_light:lit",
    "e_light:down"
   ],
   "seconds": 14,
   "show": false
  },
  "shot_cot": {
   "after": [],
   "tells": [
    "shot_cot:seen"
   ],
   "seconds": 4,
   "show": false
  }
 },
 "points": [
  "burner#wick",
  "burner#lens",
  "soot#grooves",
  "sheets#sheet",
  "cot#cot",
  "stair#hatch",
  "gallery#rail",
  "crack#glass",
  "barrel#oil",
  "pot#pot",
  "lantern#flame",
  "papa",
  "my",
  "troll"
 ],
 "offers": [
  "burner#wick",
  "soot#grooves",
  "sheets#sheet",
  "cot#cot",
  "stair#hatch",
  "gallery#rail",
  "lantern#flame",
  "papa#chest",
  "my#chest",
  "troll#chest"
 ],
 "party": {
  "calm": 0,
  "dawn": 0,
  "dusk": 0,
  "night": 0,
  "moon": 0.6,
  "storm": 0,
  "flash": 0,
  "lighthouse_lit": 0,
  "lenses": 0,
  "flame": "out",
  "slant": 0,
  "sheets": 0,
  "pot": false,
  "cot": "none",
  "gallery_glass": "whole",
  "lantern_at": "none",
  "lantern_flame": "full"
 },
 "acts": {
  "match": {
   "values": [],
   "tells": []
  }
 }
}
```
