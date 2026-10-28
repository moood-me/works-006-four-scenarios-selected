// The hull of the boat «Adventure»: a clinker skin over her ribs (a form, e.kit.loft of lib.RIBS — from the stem to the
// transom); its painting is the hull unrolled — across it from the port rail round the keel to the starboard rail,
// down it from the bow to the stern. Pale weathered blue strakes with their dark laps, the white rail, the bottom's
// dark red-brown below the waterline. Inside the same, but for the floorboards and thwarts laid in her.
const L = e.lib, [x0, y0, x1, y1] = e.area;
g.fillStyle = '#86a2b5';
g.fillRect(x0, y0, x1 - x0, y1 - y0);
// the strakes' laps, along her
g.fillStyle = 'rgba(46, 66, 84, 0.55)';
for (const x of [0.3, 0.55, 0.8, 1.02]) {
  g.fillRect(-x - 0.012, y0, 0.024, y1 - y0);
  g.fillRect(x - 0.012, y0, 0.024, y1 - y0);
}
g.fillStyle = 'rgba(220, 232, 238, 0.25)';
for (let i = 0; i < 30; i++) g.fillRect(x0 + (x1 - x0) * e.rnd(), y0 + (y1 - y0) * e.rnd(), 0.08, 0.3 + 0.8 * e.rnd());
// the bottom, below the water
g.fillStyle = '#6a4436';
g.fillRect(-0.36, y0, 0.72, y1 - y0);
// the rail, white, at both edges
g.fillStyle = '#efede6';
g.fillRect(x0, y0, 0.1, y1 - y0);
g.fillRect(x1 - 0.1, y0, 0.1, y1 - y0);
e.form(e.kit.loft(L.RIBS.map(L.rib)), { ground: '#86a2b5' });
