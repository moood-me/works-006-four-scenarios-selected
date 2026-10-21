// The Fisherman's seat: a low flat stone, rubbed smoother on top (a form).
const W = 2, S = 0.42;
g.fillStyle = "#c8a59d";
g.fillRect(-W / 2, -S, W, S);
for (let i = 0; i < 40; i++) {
  const x = (e.rnd() - 0.5) * W, y = -e.rnd() * S, r = 0.008 + e.rnd() * 0.02;
  g.fillStyle = e.rnd() < 0.5 ? "rgba(120, 92, 90, 0.3)" : "rgba(248, 228, 218, 0.35)";
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
const top = g.createLinearGradient(0, -S, 0, -S * 0.5);
top.addColorStop(0, "rgba(236, 218, 208, 0.6)");
top.addColorStop(1, "rgba(236, 218, 208, 0)");
g.fillStyle = top;
g.fillRect(-W / 2, -S, W, S * 0.5);
e.form(e.kit.lump([[0.4, 0], [0.28, -0.24], [0, -0.32], [-0.3, -0.22], [-0.42, 0.02], [-0.28, 0.26], [0.02, 0.32], [0.3, 0.22]], 0.36, 1), { closed: "u", ground: "#c8a59d" });
