// The steep wooden stair up the wall to the hatch (seen from its side: a card along the wall): two stringers, the
// treads' ends between them, worn pale in their middles, a rope for a rail on the wall above. It rises to the right,
// from the floor to the ceiling.
const L = e.lib, run = 2.3, H = L.H, n = 13;
const xAt = h => -run / 2 + (h / H) * run;
// the stringer: a long plank along the slope
g.fillStyle = "#7d6248";
g.beginPath();
g.moveTo(-run / 2 - 0.05, 0);
g.lineTo(-run / 2 + 0.17, 0);
g.lineTo(run / 2 + 0.05, -H + 0.05);
g.lineTo(run / 2 - 0.15, -H);
g.closePath();
g.fill();
g.strokeStyle = "rgba(40, 28, 20, 0.5)";
g.lineWidth = 0.012;
g.stroke();
// the treads: thick boards standing out over the stringer, each a step up
for (let i = 1; i <= n; i++) {
  const h = (i * H) / (n + 1), x = xAt(h);
  g.fillStyle = "#a68660";
  g.fillRect(x - 0.12, -h - 0.04, 0.26, 0.045);
  g.fillStyle = "rgba(240, 222, 190, 0.35)";
  g.fillRect(x - 0.06, -h - 0.04, 0.12, 0.012);
  g.fillStyle = "rgba(40, 28, 20, 0.45)";
  g.fillRect(x - 0.12, -h, 0.26, 0.008);
}
// the rope rail, slung on iron eyes above the stair
g.strokeStyle = "#a88c64";
g.lineWidth = 0.022;
g.beginPath();
g.moveTo(xAt(0.9) - 0.15, -1.75);
g.quadraticCurveTo(xAt(1.9), -2.55, xAt(3.0), -3.45);
g.stroke();
e.at(xAt(1.2), -1.2, "stair");
e.at(run / 2 - 0.05, -H + 0.1, "hatch");
