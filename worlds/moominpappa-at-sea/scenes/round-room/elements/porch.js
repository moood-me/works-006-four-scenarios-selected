// Outside the door, seen from above (x across, y toward the room; its near edge at the threshold): the top step of the
// lighthouse — one broad slab of granite, greyer than the rock, a crust of yellow lichen and salt, a crack, its far
// edge dropping away to the knoll.
const w = 1.4, d = 0.9;
g.fillStyle = "#c2a29a";
g.fillRect(-w / 2, -d / 2, w, d);
for (let i = 0; i < 16; i++) {
  const px = -w / 2 + e.rnd() * w, py = -d / 2 + e.rnd() * d, r = 0.06 + e.rnd() * 0.18;
  const s = g.createRadialGradient(px, py, 0, px, py, r);
  s.addColorStop(0, e.rnd() < 0.5 ? "rgba(222, 196, 186, 0.6)" : "rgba(150, 120, 114, 0.35)");
  s.addColorStop(1, "rgba(222, 196, 186, 0)");
  g.fillStyle = s;
  g.fillRect(px - r, py - r, 2 * r, 2 * r);
}
g.fillStyle = "rgba(214, 190, 92, 0.55)";
for (let i = 0; i < 9; i++) {
  g.beginPath();
  g.ellipse(-w / 2 + 0.1 + e.rnd() * (w - 0.2), -d / 2 + 0.08 + e.rnd() * (d - 0.16), 0.02 + e.rnd() * 0.05, 0.015 + e.rnd() * 0.03, e.rnd() * 3, 0, Math.PI * 2);
  g.fill();
}
g.strokeStyle = "rgba(96, 66, 60, 0.6)";
g.lineWidth = 0.01;
g.beginPath();
g.moveTo(-0.3, -d / 2);
g.quadraticCurveTo(-0.15, -0.05, -0.32, d / 2);
g.stroke();
g.fillStyle = "rgba(90, 62, 58, 0.5)";
g.fillRect(-w / 2, -d / 2, w, 0.04);
