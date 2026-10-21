// The road outside the convent wall, seen from above (x across, y toward the viewer; its centre 16 m ahead): frosted
// gravel, two darker ruts where wheels go, white rime at its edges.
const r = e.lib.stream(3);
g.fillStyle = "#8b8f93";
g.fillRect(-20, -4.8, 40, 9.6);
g.fillStyle = "#777b80";
g.fillRect(-20, -1.6, 40, 0.5);
g.fillRect(-20, 0.4, 40, 0.5);
const rime = new Path2D();
for (let i = 0; i < 700; i++) {
  const x = -20 + r() * 40;
  const y = -4.8 + r() * 9.6;
  rime.moveTo(x + 0.08, y);
  rime.ellipse(x, y, 0.08 + r() * 0.1, 0.05, 0, 0, 6.3);
}
g.fillStyle = "rgba(230, 236, 241, 0.7)";
g.fill(rime);
