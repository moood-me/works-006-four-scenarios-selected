// A rounded granite boulder on the slab, where Moomintroll sits looking back at the sea: pink stone, a grey-green
// lichen rosette, a crack (a form: the boulder unrolled, the way round by the slope, top down).
const W = 3.2, S = 0.74;
g.fillStyle = "#d1a196";
g.fillRect(-W / 2, -S, W, S);
for (let i = 0; i < 40; i++) {
  const x = (e.rnd() - 0.5) * W, y = -e.rnd() * S, r = 0.01 + e.rnd() * 0.025;
  g.fillStyle = e.rnd() < 0.5 ? "rgba(120, 92, 90, 0.3)" : "rgba(248, 228, 218, 0.35)";
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
const moss = g.createRadialGradient(0.5, -0.45, 0, 0.5, -0.45, 0.22);
moss.addColorStop(0, "rgba(158, 164, 132, 0.8)");
moss.addColorStop(1, "rgba(158, 164, 132, 0)");
g.fillStyle = moss;
g.fillRect(0.28, -0.67, 0.44, 0.44);
g.strokeStyle = "rgba(110, 78, 76, 0.6)";
g.lineWidth = 0.02;
g.beginPath();
g.moveTo(-0.9, -0.7);
g.quadraticCurveTo(-0.7, -0.35, -0.85, 0);
g.stroke();
const wet = g.createLinearGradient(0, -0.2, 0, 0);
wet.addColorStop(0, "rgba(120, 90, 88, 0)");
wet.addColorStop(1, "rgba(120, 90, 88, 0.4)");
g.fillStyle = wet;
g.fillRect(-W / 2, -0.2, W, 0.2);
e.form(e.kit.lump([[0.58, 0.02], [0.4, -0.36], [0, -0.48], [-0.42, -0.34], [-0.6, 0.04], [-0.38, 0.38], [0.04, 0.45], [0.42, 0.34]], 0.5, 3), { closed: "u", ground: "#d1a196" });
