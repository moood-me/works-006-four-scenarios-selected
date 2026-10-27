# The chart (`chart`) — the play's map

The game's own scene (games.md §2): the background the game hangs its chapters' trees over — Papa's sea chart (the
world's module `chart`) on the veranda table. Made after «The route» of «Around the World» and «The Yard» of «The Elder
Son»; the trees, their titles and rows are the game's (`bespoke/map.js`, in `bespoke.underlay`).

- **The sheet** (`sheet`, one card 12.6 m off, 45 × 12.6 m: `lib.K` 0.45 m a chart unit): the module's chart, the
  frame's foot its foot and the frame's top its top (horizon 0.865). Its layers, shown by its shader (`sheet.wgsl`):
  Papa's course in pencil (`ink`) and under it its share of the way as grey (`share`) — the course shows as far as
  `route`; nothing is painted again as it grows.
- `desk` — the table's boards (a sky), seen past the sheet's ends and on a tall screen.
- **The camera** — panorama, span [0, 45]; `script.js` leads `camera_x` to the chapter `shown` (at once as it opens,
  over a second on a change; `come` — back to it).
- **The points** — unseen, 12 m off, in a row at the frame's 0.28: `c0` the prologue over the valley, `c1` I over the
  open sea, `c2` II by the island on the chart, `c3`–`c4` III–IV over the island's plan, `c5` the epilogue and `c6`
  the finale at the plan's far side (12 chart units, 5.4 m, apart from `c2` on); `author` at the sheet's left edge.
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
