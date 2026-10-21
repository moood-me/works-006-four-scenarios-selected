// The table's top from above (0.76 m up; x across, y toward the viewer — the world's (across, distance) is
// (−0.2 + x, 2.8 − y)): an oilcloth of a small faded red check on cream; on it, flat: flour spilt round the mixing
// bowl (at x −0.6, y 0.18), a saucer of glacé cherries and the wooden spoon beside it; raisins scattered from the
// basin (x 0, y −0.25) toward Grace; three little stacks of coins and a few loose ones by the tin (x 0.45, y −0.3).
const r = e.lib.stream(91);
g.fillStyle = "#efe6d2";
g.fillRect(-0.8, -0.425, 1.6, 0.85);
g.fillStyle = "rgba(178, 74, 62, 0.28)";
for (let x = -0.8; x < 0.8; x += 0.06) g.fillRect(x, -0.425, 0.03, 0.85);
for (let y = -0.425; y < 0.425; y += 0.06) g.fillRect(-0.8, y, 1.6, 0.03);
// flour about the bowl
const flour = g.createRadialGradient(-0.6, 0.16, 0.02, -0.6, 0.16, 0.3);
flour.addColorStop(0, "rgba(250, 248, 240, 0.85)");
flour.addColorStop(1, "rgba(250, 248, 240, 0)");
g.fillStyle = flour;
g.fillRect(-0.8, -0.14, 0.5, 0.55);
// the saucer of cherries
g.fillStyle = "#f4f1ea";
g.beginPath();
g.arc(-0.3, 0.05, 0.07, 0, 6.3);
g.fill();
g.fillStyle = "#b8282e";
for (let i = 0; i < 9; i++) {
  g.beginPath();
  g.arc(-0.3 + (r() - 0.5) * 0.08, 0.05 + (r() - 0.5) * 0.08, 0.012, 0, 6.3);
  g.fill();
}
// the wooden spoon
g.fillStyle = "#c9a26e";
g.beginPath();
g.ellipse(-0.3, 0.3, 0.035, 0.022, 0.2, 0, 6.3);
g.fill();
g.save();
g.translate(-0.3, 0.3);
g.rotate(0.2);
g.fillRect(0.03, -0.006, 0.22, 0.012);
g.restore();
// raisins scattered toward Grace
g.fillStyle = "#3a2420";
for (let i = 0; i < 14; i++) {
  g.beginPath();
  g.ellipse(-0.15 + r() * 0.3, -0.15 + r() * 0.2, 0.008, 0.005, r() * 3, 0, 6.3);
  g.fill();
}
// the coins by the tin
for (const [x, y] of [[0.3, -0.12], [0.38, -0.05], [0.26, -0.02]]) {
  g.fillStyle = "#a7a39a";
  g.beginPath();
  g.arc(x, y, 0.016, 0, 6.3);
  g.fill();
  g.strokeStyle = "#7f7b72";
  g.lineWidth = 0.003;
  g.stroke();
}
for (let i = 0; i < 6; i++) {
  g.fillStyle = r() < 0.5 ? "#b0884a" : "#a9a59c";
  g.beginPath();
  g.arc(0.3 + r() * 0.22, -0.02 + r() * 0.1, 0.012, 0, 6.3);
  g.fill();
}
