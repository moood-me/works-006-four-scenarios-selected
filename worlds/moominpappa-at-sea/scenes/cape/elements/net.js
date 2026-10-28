// The Fisherman's net at his feet (`net`): heaped on the stone, a soft brown pile of mesh, a few cork floats, the end
// of it rising into his hands (dry, mended); with a dark snarl of a knot on top (knot); drawn out of the heap up into
// Papa's paws as he sits, the knot in it before him (papa); or folded into a neat roll, his hands empty (folded). Its point
// `net#knot` — the knot, where it is.
const L = e.lib, st = e.state.net ?? "dry";
const floats = pts => {
  for (const [x, y] of pts) {
    g.fillStyle = "#a9804f";
    g.beginPath();
    g.ellipse(x, y, 0.045, 0.028, 0.3, 0, Math.PI * 2);
    g.fill();
  }
};
// a snarl of cord: loops round a dark knot
const snarl = (x, y, r) => {
  g.fillStyle = "#3e342b";
  g.beginPath();
  g.ellipse(x, y, r, r * 0.7, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "rgba(170, 150, 120, 0.85)";
  g.lineWidth = 0.008;
  for (let i = 0; i < 10; i++) {
    const a = e.rnd() * Math.PI * 2, b = a + 1 + e.rnd() * 2;
    g.beginPath();
    g.ellipse(x, y, r * (0.5 + 0.6 * e.rnd()), r * (0.4 + 0.4 * e.rnd()), e.rnd() * 3, a, b);
    g.stroke();
  }
  e.at(x, y, "knot");
};
if (st === "folded") {
  // the net rolled up and laid on the stone beside him
  g.fillStyle = "#5f5143";
  g.beginPath();
  g.ellipse(0.55, -0.12, 0.34, 0.12, 0, 0, Math.PI * 2);
  g.fill();
  L.net(g, 0.25, 0.85, () => -0.22, () => -0.02, 0.05, "rgba(150, 132, 108, 0.6)");
  floats([[0.4, -0.2], [0.7, -0.18]]);
  e.at(0.55, -0.12, "knot");
} else {
  g.fillStyle = "#5f5143";
  g.beginPath();
  g.moveTo(-0.62, 0.02);
  g.bezierCurveTo(-0.55, -0.16, -0.25, -0.24, 0.02, -0.22);
  g.bezierCurveTo(0.3, -0.2, 0.55, -0.12, 0.64, 0.02);
  g.closePath();
  g.fill();
  L.net(g, -0.55, 0.55, x => -0.21 + 0.3 * (x / 0.6) ** 2, () => 0.01, 0.06, "rgba(150, 132, 108, 0.7)");
  floats([[-0.35, -0.1], [0.12, -0.18], [0.42, -0.06], [-0.05, -0.04]]);
  if (st === "papa") {
    // a long stretch of it drawn out of the heap and up into Papa's paws, sagging between
    const top = x => -0.14 - 0.26 * ((x - 0.5) / 2) ** 1.5, low = x => top(x) + 0.16 + 0.1 * Math.sin(Math.PI * (x - 0.5) / 2);
    L.net(g, 0.5, 2.5, top, low, 0.07, "rgba(150, 132, 108, 0.8)");
    g.strokeStyle = "#5a4b3b";
    g.lineWidth = 0.02;
    g.beginPath();
    for (let x = 0.5; x <= 2.5 + 1e-6; x += 0.1) g[x === 0.5 ? "moveTo" : "lineTo"](x, low(x));
    g.stroke();
    floats([[1.1, top(1.1) + 0.02], [1.8, top(1.8) + 0.02]]);
    snarl(2.2, top(2.2) + 0.1, 0.09);
  } else if (st === "knot") {
    snarl(0.05, -0.2, 0.1);
  } else if (st === "mended") {
    L.net(g, -0.15, 0.25, () => -0.2, () => -0.04, 0.06, "rgba(220, 204, 170, 0.95)");
    e.at(0.05, -0.12, "knot");
  } else {
    e.at(0.05, -0.12, "knot");
  }
}
