// A spruce of the woods on the hills: a dark narrow cone of drooping tiers, blue-green. Copies, by tens, on the hills
// and the far headland.
g.fillStyle = '#3e2f24';
g.fillRect(-0.12, -1.2, 0.24, 1.2);
for (let i = 0; i < 9; i++) {
  const y = -0.8 - i * 0.95, w = 1.9 * (1 - i / 9.5) + 0.2;
  g.fillStyle = i % 2 ? '#2f4a3c' : '#36533f';
  g.beginPath();
  g.moveTo(0, y - 1.25);
  g.quadraticCurveTo(w * 0.4, y - 0.5, w, y + 0.05);
  g.quadraticCurveTo(0, y - 0.2, -w, y + 0.05);
  g.quadraticCurveTo(-w * 0.4, y - 0.5, 0, y - 1.25);
  g.fill();
}
g.fillStyle = '#2a4134';
g.beginPath();
g.moveTo(0, -10);
g.lineTo(0.3, -8.6);
g.lineTo(-0.3, -8.6);
g.fill();
