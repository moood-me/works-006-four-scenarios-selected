// A small crooked island pine, the kind that grows in a crack of the granite: a black trunk bent away from the wind,
// thin crooked limbs, ragged dark tufts of needles at their ends, thinner on the windward side (the crown a layer the
// wind sways). Painted once; its copies stand about the lighthouse and on the back of the island, told apart by size
// and flip.
const bark = "#272321", needles = ["#1e2620", "#26302a", "#18201b", "#2e3a31"];
g.fillStyle = bark;
g.beginPath();
g.moveTo(-0.13, 0);
g.bezierCurveTo(-0.15, -0.9, -0.66, -1.35, -0.5, -2.25);
g.bezierCurveTo(-0.44, -2.65, -0.3, -2.9, -0.36, -3.1);
g.lineTo(-0.3, -3.1);
g.bezierCurveTo(-0.24, -2.9, -0.36, -2.6, -0.39, -2.25);
g.bezierCurveTo(-0.5, -1.45, -0.02, -0.95, 0.11, 0);
g.closePath();
g.fill();
g.strokeStyle = bark;
g.lineCap = "round";
g.lineWidth = 0.06;
for (const [x1, x2] of [[-0.1, -0.5], [0.08, 0.42], [0, 0.2]]) {
  g.beginPath();
  g.moveTo(0, -0.05);
  g.quadraticCurveTo(x1, 0.02, x2, 0.04);
  g.stroke();
}
// limbs: from the trunk out and up, mostly to the right (downwind), crooked
const limbs = [[-0.42, -1.3, 0.95, -1.75], [-0.52, -1.7, -1.05, -2.05], [-0.48, -2.05, 0.75, -2.45], [-0.42, -2.4, -0.85, -2.7], [-0.36, -2.75, 0.4, -3.05], [-0.34, -3.05, -0.4, -3.3]];
e.layer("crown", { pivot: [-0.4, -1.4], wind: { strength: 0.35, gust: 0.6, scale: 6 } }, c => {
  c.strokeStyle = bark;
  c.lineCap = "round";
  for (const [x0, y0, x1, y1] of limbs) {
    c.lineWidth = 0.045;
    c.beginPath();
    c.moveTo(x0, y0);
    c.quadraticCurveTo((x0 + x1) / 2, y0 - 0.25, x1, y1);
    c.stroke();
  }
  // tufts: clusters of short needle strokes round each limb's end and along it
  c.lineWidth = 0.035;
  for (const [x0, y0, x1, y1] of limbs) {
    for (let t = 0.35; t <= 1.01; t += 0.22) {
      const cx = x0 + (x1 - x0) * t, cy = y0 + (y1 - y0) * t - 0.08 * t, r = 0.18 + 0.2 * t;
      c.fillStyle = needles[Math.floor(e.rnd() * 4)];
      c.beginPath();
      c.ellipse(cx, cy, r * 1.25, r * 0.55, (e.rnd() - 0.5) * 0.4, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = needles[Math.floor(e.rnd() * 4)];
      for (let k = 0; k < 9; k++) {
        const a = e.rnd() * Math.PI * 2, l = r * (1.05 + e.rnd() * 0.5);
        c.beginPath();
        c.moveTo(cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.3);
        c.lineTo(cx + Math.cos(a) * l * 1.2, cy + Math.sin(a) * l * 0.55 - 0.04);
        c.stroke();
      }
    }
  }
});
e.at(-0.35, -2.2, "crown");
