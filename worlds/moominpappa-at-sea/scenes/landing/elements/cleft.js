// The cleft in the granite by the landing (`cleft`): a long dark slit lying on the slab toward the eye (painted below
// the card's foot), its lips paler; with the seaweed Mama and Papa packed into it (weed) — brown-olive bladderwrack
// heaped along it; and later a green shoot standing up out of it (sprout). Its point `cleft#cleft`.
const st = e.state.cleft ?? "empty";
g.fillStyle = "rgba(246, 230, 222, 0.6)";
g.beginPath();
g.moveTo(-1.0, 0.3);
g.quadraticCurveTo(-0.3, 0.12, 0.2, 0.28);
g.quadraticCurveTo(0.6, 0.42, 1.0, 0.24);
g.lineTo(1.0, 0.36);
g.quadraticCurveTo(0.6, 0.56, 0.2, 0.42);
g.quadraticCurveTo(-0.3, 0.26, -1.0, 0.44);
g.closePath();
g.fill();
g.fillStyle = "#3b2a2a";
g.beginPath();
g.moveTo(-0.95, 0.36);
for (const [x, y] of [[-0.6, 0.27], [-0.3, 0.22], [0.0, 0.28], [0.25, 0.34], [0.55, 0.38], [0.95, 0.3]]) g.lineTo(x, y);
for (const [x, y] of [[0.55, 0.47], [0.25, 0.43], [0.0, 0.37], [-0.3, 0.32], [-0.6, 0.37], [-0.95, 0.4]]) g.lineTo(x, y);
g.closePath();
g.fill();
if (st === "weed" || st === "sprout") {
  for (let i = 0; i < 26; i++) {
    const x = -0.85 + 1.7 * e.rnd(), y = 0.3 + 0.06 * (e.rnd() - 0.5) + 0.05 * x, r = 0.05 + 0.05 * e.rnd();
    g.fillStyle = e.rnd() < 0.5 ? "#6d5a2c" : "#55502a";
    g.beginPath();
    g.ellipse(x, y - r * 0.6, r * 1.4, r * 0.8, (e.rnd() - 0.5) * 0.6, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = "#7b6a34";
  g.lineWidth = 0.012;
  for (let i = 0; i < 14; i++) {
    const x = -0.8 + 1.6 * e.rnd();
    g.beginPath();
    g.moveTo(x, 0.3);
    g.quadraticCurveTo(x + 0.06, 0.2, x + 0.12 * (e.rnd() - 0.3), 0.14);
    g.stroke();
  }
}
if (st === "sprout") {
  g.strokeStyle = "#5f8a3a";
  g.lineWidth = 0.018;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(0.1, 0.28);
  g.quadraticCurveTo(0.14, 0.05, 0.1, -0.22);
  g.stroke();
  g.fillStyle = "#79a84a";
  for (const [x, y, a] of [[0.12, -0.08, -0.6], [0.09, -0.18, 0.7]]) {
    g.beginPath();
    g.ellipse(x + Math.cos(a) * 0.06, y, 0.07, 0.025, a, 0, Math.PI * 2);
    g.fill();
  }
}
e.at(0, 0.3, "cleft");
