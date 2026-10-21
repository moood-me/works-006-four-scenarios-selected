// The net heaped on the stone at the Fisherman's feet: a soft brown pile of mesh, a few cork floats, the end of it
// trailing to where it rises into his hands.
const L = e.lib;
g.fillStyle = "#5f5143";
g.beginPath();
g.moveTo(-0.62, 0.02);
g.bezierCurveTo(-0.55, -0.16, -0.25, -0.24, 0.02, -0.22);
g.bezierCurveTo(0.3, -0.2, 0.55, -0.12, 0.64, 0.02);
g.closePath();
g.fill();
L.net(g, -0.55, 0.55, x => -0.21 + 0.3 * (x / 0.6) ** 2, () => 0.01, 0.06, "rgba(150, 132, 108, 0.7)");
for (const [x, y] of [[-0.35, -0.1], [0.12, -0.18], [0.42, -0.06], [-0.05, -0.04]]) {
  g.fillStyle = "#c08a4e";
  g.beginPath();
  g.ellipse(x, y, 0.055, 0.035, 0.3, 0, Math.PI * 2);
  g.fill();
}
