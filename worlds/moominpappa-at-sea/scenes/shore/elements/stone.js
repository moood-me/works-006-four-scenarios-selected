// The flat stone at the water's edge: a low pink granite slab worn smooth, its seaward foot dark and wet, a ring of
// orange lichen on its dry top (a form: the slab unrolled, the way round by the slope, top down). Its top is where
// the lantern is set: stone#lantern.
const W = 3.4, S = 0.55;
g.fillStyle = "#cfa198";
g.fillRect(-W / 2, -S, W, S);
for (let i = 0; i < 50; i++) {
  const x = (e.rnd() - 0.5) * W, y = -e.rnd() * S, r = 0.01 + e.rnd() * 0.025;
  g.fillStyle = e.rnd() < 0.5 ? "rgba(120, 92, 90, 0.3)" : "rgba(248, 228, 218, 0.35)";
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
const moss = g.createRadialGradient(0.6, -0.4, 0, 0.6, -0.4, 0.2);
moss.addColorStop(0, "rgba(206, 146, 72, 0.8)");
moss.addColorStop(1, "rgba(206, 146, 72, 0)");
g.fillStyle = moss;
g.fillRect(0.4, -0.6, 0.4, 0.4);
const wet = g.createLinearGradient(0, -0.22, 0, 0);
wet.addColorStop(0, "rgba(110, 84, 82, 0)");
wet.addColorStop(1, "rgba(110, 84, 82, 0.55)");
g.fillStyle = wet;
g.fillRect(-W / 2, -0.22, W, 0.22);
e.at(0, -S, "lantern");
e.form(e.kit.lump([[0.62, 0.02], [0.44, -0.4], [0, -0.52], [-0.46, -0.38], [-0.66, 0.02], [-0.42, 0.4], [0.02, 0.5], [0.46, 0.36]], 0.32, 5), { closed: "u", ground: "#cfa198" });
