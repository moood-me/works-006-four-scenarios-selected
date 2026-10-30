// The boat's hull seen from inside: the same skin over the same ribs (lib.RIBS), each rib's points the other way round
// so that this face looks in — a form is seen from its face's side only, and from the pier one looks down into the
// boat (without it her far side and her stem were gone and the hull read as two loose planks). Old tarred wood inside,
// the strakes' laps, the floor of it darker; the rail pale. Nothing while the boat is not here (`boat`)
if (!e.state.boat) return;
const L = e.lib;
const [x0, y0, x1, y1] = e.area;
g.fillStyle = '#5e5248';
g.fillRect(x0, y0, x1 - x0, y1 - y0);
g.fillStyle = 'rgba(28, 22, 18, 0.5)';
for (const x of [0.22, 0.45, 0.68, 0.88]) {
  g.fillRect(-x - 0.01, y0, 0.02, y1 - y0);
  g.fillRect(x - 0.01, y0, 0.02, y1 - y0);
}
// the ribs across her inside, every 0.35 m
g.fillStyle = 'rgba(40, 30, 24, 0.55)';
for (let y = y0 + 0.15; y < y1; y += 0.35) g.fillRect(x0, y, x1 - x0, 0.04);
g.fillStyle = '#3c332c';
g.fillRect(-0.42, y0, 0.84, y1 - y0);
g.fillStyle = '#b8a88e';
g.fillRect(x0, y0, 0.07, y1 - y0);
g.fillRect(x1 - 0.07, y0, 0.07, y1 - y0);
e.form(e.kit.loft(L.RIBS.map(r => L.rib(r).slice().reverse())), { ground: '#5e5248' });
