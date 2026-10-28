// The net drying: two grey driftwood poles wedged in the cracks, a rope between their tops, the long net hanging from
// it in a deep sag, its cork floats along the top, its lead line along the bottom. The net is thin — the low sun
// comes through it — and sways from the rope in the wind (a layer). `net`: folded — the poles bare, the rope slack;
// mended — a pale patch of new knots where Papa untangled it.
const L = e.lib, X = 1.6, TOP = -1.85;
g.strokeStyle = "#9b938a";
g.lineCap = "round";
g.lineWidth = 0.075;
g.beginPath();
g.moveTo(-X, 0.02);
g.lineTo(-X + 0.06, TOP - 0.12);
g.moveTo(X, 0.02);
g.lineTo(X - 0.05, TOP - 0.08);
g.stroke();
g.strokeStyle = "rgba(70, 64, 60, 0.6)";
g.lineWidth = 0.02;
g.beginPath();
g.moveTo(-X - 0.02, -0.3);
g.lineTo(-X + 0.03, -1.2);
g.moveTo(X + 0.02, -0.5);
g.lineTo(X - 0.02, -1.4);
g.stroke();
const rope = x => TOP + 0.12 * (1 - (x / X) ** 2);
g.strokeStyle = "#6b5b48";
g.lineWidth = 0.022;
g.beginPath();
for (let x = -X; x <= X + 1e-6; x += 0.1) g[x === -X ? "moveTo" : "lineTo"](x, rope(x));
g.stroke();
const st = e.state.net ?? "dry";
if (st !== "folded") e.layer("net", { pivot: [0, TOP + 0.12], wind: { strength: 0.25, gust: 0.7, scale: 4 } }, c => {
  const bottom = x => -0.32 - 0.12 * (x / X) ** 2 + 0.05 * Math.sin(x * 3.1);
  L.net(c, -X + 0.1, X - 0.1, x => rope(x) + 0.02, bottom, 0.11, "rgba(70, 60, 48, 0.85)");
  c.strokeStyle = "#5a4b3b";
  c.lineWidth = 0.03;
  c.beginPath();
  for (let x = -X + 0.1; x <= X - 0.1 + 1e-6; x += 0.1) c[x === -X + 0.1 ? "moveTo" : "lineTo"](x, bottom(x));
  c.stroke();
  for (let x = -X + 0.3; x < X - 0.2; x += 0.42) {
    c.fillStyle = "#c08a4e";
    c.beginPath();
    c.ellipse(x, rope(x) + 0.05, 0.06, 0.04, 0, 0, Math.PI * 2);
    c.fill();
  }
  if (st === "mended") L.net(c, -0.5, 0.1, x => rope(x) + 0.35, x => rope(x) + 0.75, 0.11, "rgba(214, 196, 160, 0.95)");
});
e.at(0, -1.1, "net");
