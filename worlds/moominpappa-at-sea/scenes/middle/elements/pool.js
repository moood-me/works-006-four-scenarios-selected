// The black pool with no bottom, from above (the plane's metres): dark peaty water filling its granite basin up to its
// level — its outline where the land comes up out of it, found along each way from its middle — brown-black, a little
// browner at its edge where the stone shows under it; still, it mirrors the sky and the pines, which is what tells it
// is water and not a hole. Its point pool#water, where the rope goes in.
const L = e.lib, P = L.POOL, n = 72, edge = [];
for (let i = 0; i < n; i++) {
  const t = i / n * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
  let r = 0;
  while (r < 2.4 && L.land(P.a + r * c, P.d + r * s) < P.level) r += 0.02;
  edge.push([r * c, -r * s]);
}
const fill = g.createRadialGradient(0, 0, 0, 0, 0, 1.9);
fill.addColorStop(0, "#121110");
fill.addColorStop(0.7, "#1b1915");
fill.addColorStop(1, "#4a3c34");
g.fillStyle = fill;
g.beginPath();
edge.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
g.closePath();
g.fill();
e.at(0.95, 0.05, "water");
