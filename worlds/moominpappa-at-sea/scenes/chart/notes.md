# The chart (`chart`) — the play's map

The game's own scene (games.md §2): the background the game hangs its chapters' trees over — Papa's sea chart (the
world's module `chart`) on the veranda table. Made after «The route» of «Around the World» and «The Yard» of «The Elder
Son»; the trees, their titles and rows are the game's (`bespoke/map.js`, in `bespoke.underlay`).

- **The sheet** (`sheet`, one card 12.6 m off, 63 × 12.6 m: `lib.K` 0.45 m a chart unit): the module's chart, the
  frame's foot its foot and the frame's top its top (horizon 0.865). Its layers, shown by its shader (`sheet.wgsl`):
  Papa's course in pencil (`ink`) and under it its share of the way as grey (`share`) — the course shows as far as
  `route`; nothing is painted again as it grows.
- `desk` — the table's boards (a sky), seen past the sheet's ends and on a tall screen.
- **The camera** — panorama, span [14.7, 48.3] (the first and the last chapter's points); `script.js` leads `camera_x` to the chapter `shown` (at once as it opens,
  over a second on a change; `come` — back to it).
- **The points** — unseen, 12 m off, in a row at the frame's 0.28, 5.6 m apart (12.4 chart units): `c0` the
  prologue over the valley, `c1` I off its coast, `c2` II mid-sea, `c3` III nearing the island, `c4` IV by the island on the chart,
  `c5`–`c6` the epilogue and the finale over the island's plan; `author` inland in the valley (9 m). The first and the last are
  half a 21:9 frame (14.7 m) in from the sheet's ends, so at any screen the camera on a chapter sees only paper (the
  camera's place is state and does not hang on the screen: the sheet is wide enough instead).
- No people, no music, no beats (stage 5 too: the map has no pieces; the game draws its trees). The showcase goes chapter by chapter, the course pencilled in chapter I (about 25 s).

## Keys

| Key | What | By default |
| --- | --- | --- |
| `shown` | the chapter the player is at (0 the prologue … 5 the epilogue, 6 the finale) | 0 |
| `come` | each new value brings the view back to the chapter shown | 0 |
| `route` | 0…1, smoothly: how far Papa's course is pencilled (0 the valley … 1 the island) | 0 |

## Contract for the check

```json
{"beats": {},
 "points": ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "author"],
 "offers": [],
 "party": {},
 "acts": {},
 "keys": {"shown": 0, "come": 0, "route": 0}}
```
