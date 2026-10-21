// The Fisherman's rock: a big rounded granite block on the cape, his corner in its lee — pink stone gone grey on the
// weather side, lichen, a long crack, the dark wet line at its foot (a form: the block unrolled, the way round by the
// slope, top down).
const W = 8, S = 1.7;
g.fillStyle = "#cf9f94";
g.fillRect(-W / 2, -S, W, S);
const grey = g.createLinearGradient(-W / 2, 0, W / 2, 0);
grey.addColorStop(0, "rgba(160, 150, 154, 0.55)");
grey.addColorStop(0.35, "rgba(160, 150, 154, 0)");
grey.addColorStop(0.8, "rgba(160, 150, 154, 0)");
grey.addColorStop(1, "rgba(160, 150, 154, 0.5)");
g.fillStyle = grey;
g.fillRect(-W / 2, -S, W, S);
for (let i = 0; i < 160; i++) {
  const x = (e.rnd() - 0.5) * W, y = -e.rnd() * S * 0.75, r = 0.01 + e.rnd() * 0.03;
  g.fillStyle = e.rnd() < 0.5 ? "rgba(120, 92, 90, 0.3)" : "rgba(248, 228, 218, 0.35)";
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
for (let i = 0; i < 14; i++) {
  const x = (e.rnd() - 0.5) * W, y = -S * (0.2 + e.rnd() * 0.5), r = 0.12 + e.rnd() * 0.25;
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  const c = e.rnd() < 0.5 ? "206, 146, 72" : "158, 164, 132";
  s.addColorStop(0, `rgba(${c}, 0.75)`);
  s.addColorStop(1, `rgba(${c}, 0)`);
  g.fillStyle = s;
  g.fillRect(x - r, y - r, r * 2, r * 2);
}
g.strokeStyle = "rgba(104, 72, 70, 0.7)";
g.lineWidth = 0.035;
g.beginPath();
g.moveTo(-0.9, -S * 0.55);
g.quadraticCurveTo(-0.5, -0.7, -0.8, 0);
g.moveTo(2.1, -S * 0.45);
g.quadraticCurveTo(2.4, -0.6, 2.0, -0.1);
g.stroke();
const wet = g.createLinearGradient(0, -0.35, 0, 0);
wet.addColorStop(0, "rgba(110, 84, 82, 0)");
wet.addColorStop(1, "rgba(110, 84, 82, 0.45)");
g.fillStyle = wet;
g.fillRect(-W / 2, -0.35, W, 0.35);
e.form(e.kit.lump([[1.9, 0.1], [1.4, -0.6], [0.3, -0.85], [-1.1, -0.7], [-1.9, -0.05], [-1.3, 0.6], [0.2, 0.8], [1.3, 0.6]], 1.25, 7), { closed: "u", ground: "#cf9f94" });
