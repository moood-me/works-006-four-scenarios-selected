# chart — Papa's sea chart

A module for the scenes that show Moominpappa's chart: the play's map (`chart`) and the valley's insert (`valley`,
`chart`). In the scene's `modules`: `e.kit.chart` (`kit.chart` in the lib).

An old printed chart of the gulf in watercolour and pencil: the valley's coast on the left (hills, woods, the river,
the blue house, «Moominvalley»), the open sea with its compass rose, rhumb lines, soundings and pencilled waves, far
out on the right the island with its lighthouse ringed in Papa's pencil, and in the right part the printed plan of the
island at a large scale (the lighthouse, the pines, the pool, the sand, reefs; «The Lighthouse Island»).

- `W`, `H` — its size in its own units (100 × 28; x right, y down). The caller scales and places it.
- `paint(g, {course})` — paints the whole chart into `g` in its units (clipped to it); `course: true` — Papa's course
  pencilled on it too.
- `courseLine(g)` — Papa's course alone, in pencil dashes (a layer the map's shader shows as far as `route`).
- `course(t)` — the point of the course at `t` 0…1 (from the valley's bay to the island).
- `ISLAND` — the island's point on the chart; `PLACES` — on the plan: `lighthouse`, `landing`, `cape`, `pool`, `shore`;
  `INSET` — the plan's frame `[x0, y0, x1, y1]`.

Its texts (`tr`) are translated in `chart.ru.json`.
