// The barrel of the lamp's oil, thick as jam: an oak cask in iron hoops, its bung out, a black lick of oil down its side
// (a form: kit.revolve; its painting the cask unrolled). Its point: the oil at the bung.
const P = [[0.25, 0.82], [0.29, 0.7], [0.31, 0.41], [0.29, 0.12], [0.25, 0]];
let len = 0;
for (let i = 1; i < P.length; i++) len += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
const W = 2 * Math.PI * 0.29;
g.fillStyle = "#8a6440";
g.fillRect(-W / 2, -len, W, len);
for (let x = -W / 2; x < W / 2; x += 0.1) {
  g.fillStyle = e.rnd() < 0.5 ? "rgba(60, 40, 24, 0.25)" : "rgba(200, 170, 120, 0.12)";
  g.fillRect(x, -len, 0.1, len);
  g.fillStyle = "rgba(40, 26, 16, 0.5)";
  g.fillRect(x, -len, 0.006, len);
}
g.fillStyle = "#3a3634";
for (const y of [0.08, 0.26, len - 0.3, len - 0.12]) g.fillRect(-W / 2, -y - 0.03, W, 0.05);
g.fillStyle = "rgba(24, 20, 14, 0.85)";
g.beginPath();
g.moveTo(-0.05, -len + 0.02);
g.quadraticCurveTo(-0.02, -len * 0.6, -0.04, -len * 0.3);
g.lineTo(0.02, -len * 0.3);
g.quadraticCurveTo(0.03, -len * 0.6, 0.05, -len + 0.02);
g.fill();
e.at(0, -len + 0.03, "oil");
e.form(e.kit.revolve(P), { closed: "u", ground: "#8a6440" });
