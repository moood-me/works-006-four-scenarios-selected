// The lighthouse's door from inside, hung on its hinge at the left (seen from the room), painted from the hinge
// rightward: the same dark red-brown boards as outside (modules/island) under the arch, here with their two ledges and
// a brace, black strap hinges, the latch and its ring. It turns on its hinge by `door_f` (the script sets it from
// `door`): opening, it swings in along the wall toward the window, leaving the doorway clear to the room.
const L = e.lib, w = 2 * L.DOOR.half, s = L.DOOR.spring;
const shape = new Path2D();
shape.moveTo(0, 0);
shape.lineTo(0, -s);
shape.arc(w / 2, -s, w / 2, Math.PI, 0);
shape.lineTo(w, 0);
shape.closePath();
g.save();
g.clip(shape);
g.fillStyle = "#6e3c33";
g.fillRect(0, -L.DOOR.top, w, L.DOOR.top);
const planks = 4;
for (let i = 0; i < planks; i++) {
  const x0 = (i * w) / planks;
  g.fillStyle = i % 2 ? "rgba(40, 20, 16, 0.14)" : "rgba(230, 200, 180, 0.08)";
  g.fillRect(x0, -L.DOOR.top, w / planks, L.DOOR.top);
  g.fillStyle = "rgba(40, 22, 20, 0.6)";
  g.fillRect(x0, -L.DOOR.top, 0.012, L.DOOR.top);
}
g.strokeStyle = "rgba(60, 30, 24, 0.25)";
g.lineWidth = 0.004;
for (let i = 0; i < 50; i++) {
  const px = e.rnd() * w, py = -L.DOOR.top + e.rnd() * L.DOOR.top;
  g.beginPath();
  g.moveTo(px, py);
  g.lineTo(px + (e.rnd() - 0.5) * 0.01, py + 0.15 + e.rnd() * 0.3);
  g.stroke();
}
// the ledges and the brace
g.fillStyle = "#5e332b";
for (const y of [-s + 0.05, -0.32]) g.fillRect(0, y, w, 0.12);
g.beginPath();
g.moveTo(w - 0.04, -0.32);
g.lineTo(w - 0.17, -0.32);
g.lineTo(0.04, -s + 0.17);
g.lineTo(0.17, -s + 0.17);
g.closePath();
g.fill();
g.restore();
// the strap hinges, the latch, its ring
g.fillStyle = "#2a2626";
for (const y of [-s + 0.11, -0.26]) {
  g.beginPath();
  g.moveTo(0, y - 0.03);
  g.lineTo(w * 0.7, y - 0.012);
  g.lineTo(w * 0.7, y + 0.012);
  g.lineTo(0, y + 0.03);
  g.closePath();
  g.fill();
}
g.fillRect(w - 0.11, -1.02, 0.05, 0.14);
g.strokeStyle = "#2a2626";
g.lineWidth = 0.014;
g.beginPath();
g.arc(w - 0.085, -0.9, 0.04, 0, Math.PI * 2);
g.stroke();
