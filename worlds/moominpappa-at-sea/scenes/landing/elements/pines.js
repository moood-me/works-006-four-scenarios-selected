// A small crooked island pine, the kind that grows in a crack of the granite: a black trunk bent away from the wind,
// a few flat tiers of dark needles leaning the same way (the crown a layer the wind sways). Painted once; its copies
// stand about the lighthouse and on the back of the island, told apart by size and flip.
const bark = "#2b2725", needles = ["#24302a", "#2c3a31", "#1d2621"];
// the trunk: from the crack up, bending left, then back
g.fillStyle = bark;
g.beginPath();
g.moveTo(-0.14, 0);
g.bezierCurveTo(-0.16, -0.9, -0.62, -1.4, -0.48, -2.3);
g.bezierCurveTo(-0.42, -2.7, -0.3, -2.9, -0.34, -3.05);
g.lineTo(-0.27, -3.05);
g.bezierCurveTo(-0.22, -2.85, -0.32, -2.6, -0.36, -2.3);
g.bezierCurveTo(-0.46, -1.5, -0.02, -0.95, 0.12, 0);
g.closePath();
g.fill();
// roots gripping the stone
g.strokeStyle = bark;
g.lineCap = "round";
g.lineWidth = 0.06;
for (const [x1, x2] of [[-0.1, -0.5], [0.08, 0.42], [0, 0.2]]) {
  g.beginPath();
  g.moveTo(0, -0.05);
  g.quadraticCurveTo(x1, 0.02, x2, 0.04);
  g.stroke();
}
e.layer("crown", { pivot: [-0.4, -1.6], wind: { strength: 0.35, gust: 0.6, scale: 6 } }, c => {
  // branches out to the tiers
  c.strokeStyle = bark;
  c.lineCap = "round";
  const tiers = [[-0.55, -1.55, 1.05, 0.26], [-0.4, -2.1, 0.85, 0.24], [-0.38, -2.6, 0.62, 0.2], [-0.32, -3.0, 0.38, 0.16]];
  for (const [x, y, w] of tiers) {
    c.lineWidth = 0.05;
    c.beginPath();
    c.moveTo(x + 0.05, y + 0.1);
    c.quadraticCurveTo(x + w * 0.4, y - 0.05, x + w * 0.85, y + 0.02);
    c.moveTo(x, y + 0.1);
    c.quadraticCurveTo(x - w * 0.3, y, x - w * 0.6, y + 0.06);
    c.stroke();
  }
  // the needles: flat ragged clouds, darker beneath
  for (const [x, y, w, h] of tiers) {
    for (let i = 0; i < 9; i++) {
      const cx = x - w * 0.55 + e.rnd() * w * 1.5, cy = y - e.rnd() * h * 0.6, r = h * (0.6 + e.rnd() * 0.6);
      c.fillStyle = needles[i % 3];
      c.beginPath();
      c.ellipse(cx, cy, r * 1.9, r, (e.rnd() - 0.5) * 0.3, 0, Math.PI * 2);
      c.fill();
    }
  }
});
e.at(-0.35, -2.2, "crown");
