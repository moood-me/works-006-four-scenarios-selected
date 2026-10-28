# The map (`map`) — the play's map

The game's own scene (games.md §2): the background the game hangs its chapters' trees over — the island as Papa drew
it, in ink and watercolour on a long sheet of paper (he draws for books), on his table. Made after «Papa and the Sea»'s
`chart`; the trees, their titles and rows are the game's (`bespoke.underlay`). `tools/map.py` writes `scene.json`
(`python -B tools/map.py <world>`).

- **The sheet** (`sheet`, one card 12.6 m off, 57.4 × 12.6 m; `lib.js`): the frame's foot its foot and the frame's top
  its top (horizon 0.865). The pale sea with his little waves and skerries; the long granite island — at its west end
  the house, the peonies, the pier and the rowboat; the magic forest of grey dead trees; the calm bay, the row of little
  graves, the full moon's path on the flat water; the new house with its black windows on the far side under the
  storm's cloud and rain; the cape and the tent on it, the fog coming in; the big boat going out east into the white.
  Dotted paths from the house to the cape and through the forest to the new house. His labels (`tr`): «The Island»,
  «The house», «The magic forest», «The new house», «The cape». Painted once; nothing moves on it.
- `desk` — Papa's table's pale old boards (a sky), seen past the sheet's ends and on a tall screen.
- **The camera** — panorama, span [14.7, 42.7] (the first and the last chapter's points); `script.js` leads `camera_x`
  to the chapter `shown` (at once as it opens, over a second on a change; `come` — back to it).
- **The points** — unseen, 12 m off, in a row at the frame's 0.28, 5.6 m apart: `c0` the prologue over the house and
  the pier, `c1` I over the magic forest, `c2` II over the calm bay, `c3` III over the new house and the storm, `c4` IV
  over the cape and its tent, `c5` the epilogue over the big boat in the fog; `author` over the sea on the left, by the
  drawing's title (8.5). The first and the last are half a 21:9 frame (14.7 m) in from the sheet's ends, so at any
  screen the camera on a chapter sees only paper.
- No people, no music, no beats (stage 5 too: the map has no pieces; the game draws its trees). The showcase goes
  chapter by chapter (about 21 s).

## Keys

| Key | What | By default |
| --- | --- | --- |
| `shown` | the chapter the player is at (0 the prologue … 4 the fourth, 5 the epilogue) | 0 |
| `come` | each new value brings the view back to the chapter shown | 0 |

## Contract for the check

```json
{"beats": {},
 "points": ["c0", "c1", "c2", "c3", "c4", "c5", "author"],
 "offers": [],
 "party": {},
 "acts": {},
 "keys": {"shown": 0, "come": 0}}
```
