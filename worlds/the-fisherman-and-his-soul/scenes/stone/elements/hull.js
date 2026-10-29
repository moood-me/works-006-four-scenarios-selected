// The Fisherman's boat: a small clinker-built rowing boat — a skin over its ribs (a form, e.kit.loft of lib.RIBS, from
// the stem to the stern); its painting is the hull unrolled: across it from the left rail round the keel to the right
// rail, down it from the bow to the stern. Weathered grey-blue strakes with their dark laps, a pale worn rail, tarred
// dark below the water. Nothing while the boat is not here (`boat`)
if (!e.state.boat) return;
const L = e.lib;
const [x0, y0, x1, y1] = e.area;
g.fillStyle = '#6f8492';
g.fillRect(x0, y0, x1 - x0, y1 - y0);
// the strakes' laps, along her
g.fillStyle = 'rgba(38, 48, 58, 0.55)';
for (const x of [0.22, 0.45, 0.68, 0.88]) {
  g.fillRect(-x - 0.01, y0, 0.02, y1 - y0);
  g.fillRect(x - 0.01, y0, 0.02, y1 - y0);
}
g.fillStyle = 'rgba(214, 222, 226, 0.18)';
for (let i = 0; i < 26; i++) g.fillRect(x0 + (x1 - x0) * e.rnd(), y0 + (y1 - y0) * e.rnd(), 0.06, 0.25 + 0.6 * e.rnd());
// tarred below the water
g.fillStyle = '#2c2a2a';
g.fillRect(-0.42, y0, 0.84, y1 - y0);
// the rail, pale worn wood, at both edges
g.fillStyle = '#b8a88e';
g.fillRect(x0, y0, 0.07, y1 - y0);
g.fillRect(x1 - 0.07, y0, 0.07, y1 - y0);
e.form(e.kit.loft(L.RIBS.map(L.rib)), { ground: '#6f8492' });
