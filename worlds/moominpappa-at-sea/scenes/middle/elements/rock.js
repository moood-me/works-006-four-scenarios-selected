// The rock at the pool's lip: a rounded granite boulder, its pool side darker and wet, grey-green lichen on its crown
// (a form: the boulder unrolled, the way round by the slope, top down). Moominpappa ties the rope to it and coils it
// on its top.
const W = 3.8, S = 0.8;
g.fillStyle = "#c99c92";
g.fillRect(-W / 2, -S, W, S);
for (let i = 0; i < 50; i++) {
  const x = (e.rnd() - 0.5) * W, y = -e.rnd() * S, r = 0.01 + e.rnd() * 0.025;
  g.fillStyle = e.rnd() < 0.5 ? "rgba(120, 92, 90, 0.3)" : "rgba(248, 228, 218, 0.35)";
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
const moss = g.createRadialGradient(-0.3, -0.62, 0, -0.3, -0.62, 0.3);
moss.addColorStop(0, "rgba(158, 164, 132, 0.85)");
moss.addColorStop(1, "rgba(158, 164, 132, 0)");
g.fillStyle = moss;
g.fillRect(-0.6, -0.8, 0.6, 0.5);
const wet = g.createLinearGradient(0, -0.3, 0, 0);
wet.addColorStop(0, "rgba(96, 72, 70, 0)");
wet.addColorStop(1, "rgba(96, 72, 70, 0.6)");
g.fillStyle = wet;
g.fillRect(-W / 2, -0.3, W, 0.3);
e.form(e.kit.lump([[0.66, 0.04], [0.46, -0.42], [0, -0.55], [-0.5, -0.4], [-0.68, 0.02], [-0.44, 0.42], [0.04, 0.55], [0.5, 0.4]], 0.62, 7), { closed: "u", ground: "#c99c92" });
