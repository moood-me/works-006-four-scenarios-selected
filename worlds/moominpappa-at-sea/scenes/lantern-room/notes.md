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
- **The pieces** (`lib.js` `film`, `script.js`, `showcase.js`; `modules/beats`): as the round room's. Where the lamp burns the eye is raised over the beam's cone (`HIGH`), or set from inside by the glass on Papa out on the gallery (`FROM`, `EYE.gallery`); the soot from beside the lamp (`EYE.soot`). The close-up `match` (М3: the pose of `lamp_look` opens it).

## The keys of the play

Common (the island's): `dawn`, `dusk`, `night`, `moon`, `storm`, `flash`, `lighthouse_lit` (not read here: the
lamp's own key is `flame`). The room's: `lenses` 0…1 (murky … wiped), `flame` (out · smoky · blue · lit — lit, the
drum turns), `slant` 0…1, `sheets` 0–2, `pot`, `cot` (none · made · empty · taken), `gallery_glass` (whole ·
cracked), `lantern_at` (none · floor), `lantern_flame` (full · low · out). The script's own: `smoke`.

## The beam

The lighthouse's beam (`beam`, turned by `beam_turn` — modules/island `beam`): the lamp's own light `burner#beam`, a cone out through the glass, on while the lamp burns (the script sets `beam` from `flame`).

## Open

- `cot` taken: the bed slept in (the blanket thrown back, his hat by the pillow); Moominpappa lying in it needs a
  lying motion (stage 5).
- The room is bigger than the island's lighthouse's lantern seen from outside (5.6 m across against 2 m): it has to
  hold the lamp, the barrel, the bed, the hatch and three people.

## Pieces (stage 5)

The scene's film in pieces (`modules/beats`: the game sets `beat`, the scene tells `beat:<name>` at its end and `<piece>:<moment>` at each moment the game speaks or acts on). A piece that leads to a mini-game or a choice ends in its pose; what follows it is another piece (`after`). The places of people are the pieces' (`from`); the party's keys are the step's. The seconds are estimates.

| Piece | Step | What it shows | Keys it sets | Ends on | Moments (`<piece>:<moment>`) |
| --- | --- | --- | --- | --- | --- |
| `lamp_look` | 2.1 | the same afternoon: the cloudy lenses; Papa dips a finger in the barrel — the oil thick as jam; the wall by the burner black with soot, grooves under his finger | — | Papa at the burner: the pose for М3 «Спичка» (burner#wick) | oil, soot, wick |
| `smoke_out` (after lamp_look) | 2.2 | the flame catches, smokes and goes out; My in the hatch | flame smoky→out | My in the hatch, Papa facing her | out, my |
| `n1_up` | 2.7 Ш1 «Наверх» | Papa comes up with the lantern | lantern_at floor | the pose for М5а «Ровно»: the lantern held slanting at the soot (soot#grooves) | wall |
| `n1_read` (after n1_up) | 2.7 Ш1 «Наверх» | he reads; splashes paraffin on the burner, strikes: blue, out; pins up the sheet, sets up the camp bed | flame blue→out, sheets +1, cot made | Papa by the cold lamp, the sheet on the board | read, out, sheet |
| `n1_cold` | 2.7 Ш1 «Сыну» | Papa up by the cold lamp, listening (the silence) | — | Papa by the lamp | listen |
| `n1_half` | 2.7 Ш1 «По очереди» | Papa up with the turned-down lantern | lantern_at floor, lantern_flame low | the pose for М5г «Полсвета» (soot#grooves) | wall |
| `n1_down` (after n1_half) | 2.7 Ш1 «По очереди» | towards morning he takes the lantern down through the hatch | lantern_at none | the empty room above | down |
| `lenses` | 3.2 | noon: Papa up by the lamp rubbing the lenses | lenses 0→1 | the lenses clear | wiped |
| `w_lamp` | 3.4 Ш2 «Гуляет» | Papa by the lamp till dusk: wiping the lenses, striking matches, talking to the burner; the light goes to dusk | dusk 0→1 | Papa by the lamp at dusk | dusk |
| `n2_asleep` | 3.5 «Гуляет» | Papa asleep by the lamp (the lantern on the floor, its light straight on the soot: no grooves); the boy appears in the hatch and reaches for the lantern; the creak | lantern_at floor | the pose for 3.6 (lantern#flame) | hatch |
| `n2_read` (after n2_asleep) | 3.6 «Положи», by the lamp | the boy sets the lantern down; Papa turns the wick up, holds it slanting by the soot, reads the next piece; the sheet | lantern_flame full, slant, sheets +1 | the sheet pinned | wall, read, sheet |
| `n2_taken` (after n2_asleep) | 3.6 «Не открывать глаз» / «Следом», by the lamp | the boy goes down with the lantern (Papa after him: «Следом»); the camp bed stays empty | lantern_at none | the dark lantern room | gone |
| `pot_up` | 4.2 (the showcase) | Papa sets the pot wrapped in his frock coat by the lamp | pot | the pot by the lamp | set |
| `st_gallery` | 4.4 Ш3 «Маяк» | Papa on the gallery shouting at the storm; a wave into the glass — it cracks; what is by the lamp is seen: the sheets (the empty place of the second), the pot or none, the cold barrel | gallery_glass cracked | Papa at the burner: the pose for М9а (burner#wick) | shout, wave, sheets, wick |
| `st_lit` (after st_gallery) | 4.4 Ш3 «Маяк», two sheets | the warm oil runs, the flame rises, the lenses turn, the beam goes out through the glass; Papa on the gallery, wet, laughing (the camera where the beam does not sweep it) | flame lit | Papa on the gallery, the lamp burning | lit, laugh |
| `st_out` (after st_gallery) | 4.4 Ш3 «Маяк», fewer sheets | the paraffin burns blue, the oil does not run; the flame rises and dies; lightning — Papa's face close; he listens to the wind by the cold lamp | flame blue→out, flash | Papa by the cold lamp | out, flash, listen |
| `st_both` | 4.4 Ш3 «Горелка и бегом» | Papa at the burner with the last paraffin | — | the pose for М9г (burner#wick) | wick |
| `st_both_down` (after st_both) | 4.4 Ш3 «Горелка и бегом» | a bang below; the flame dies behind him as he goes down through the hatch | flame blue→out | the dark lamp, the hatch | bang, down |
| `burnt_out` | 4.5, «Маяк» lit | dawn: the lamp burns down — the flame sinks and goes out | flame lit→out, dawn | the cold lamp at dawn | low, out |
| `e_write` | Эпилог «Луч» | Papa on the gallery writing his Big Book of the sea, the lamp burning; «через неделю»: My in the hatch — «Это ты не умеешь» — «Уже умею» (late: he sleeps up here all week — the bed slept in) | — | Papa on the gallery | write, my |
| `e_light` | Эпилог «Лестница» / поздний «Пирог», two sheets | on a still evening Papa warms the pot, lights the lamp with his matchbox — and goes down without staying | flame lit | the lamp burning, the room empty | lit, down |
| `shot_cot` | finales, the common frames; 3.5 the bed empty | the camp bed by the promise (made, empty, slept in) | — | the bed, held | seen |

Keys of the mini-games (`acts`): `match` (М3, the match toward the wick 0…1); М5а/М5г move `slant`, М9а/М9г `flame` (the party's keys, set by the mini-game while it plays). The beam: the scene's own, on while `flame` is lit.

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
    "n1_up:wall"
   ],
   "seconds": 10,
   "show": false
  },
  "n1_read": {
   "after": [
    "n1_up"
   ],
   "tells": [
    "n1_read:read",
    "n1_read:out",
    "n1_read:sheet"
   ],
   "seconds": 20,
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
    "n1_half:wall"
   ],
   "seconds": 8,
   "show": false
  },
  "n1_down": {
   "after": [
    "n1_half"
   ],
   "tells": [
    "n1_down:down"
   ],
   "seconds": 8,
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
    "st_both:wick"
   ],
   "seconds": 8,
   "show": false
  },
  "st_both_down": {
   "after": [
    "st_both"
   ],
   "tells": [
    "st_both_down:bang",
    "st_both_down:down"
   ],
   "seconds": 8,
   "show": false
  },
  "burnt_out": {
   "after": [],
   "tells": [
    "burnt_out:low",
    "burnt_out:out"
   ],
   "seconds": 10,
   "show": false
  },
  "e_write": {
   "after": [],
   "tells": [
    "e_write:write",
    "e_write:my"
   ],
   "seconds": 14,
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
