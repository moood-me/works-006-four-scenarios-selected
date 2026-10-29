// The rail at the pier's root where his net hangs to dry (`net_rail`): two posts and a pole between them, the net draped
// over it in brown folds with its cork floats — torn at its edge with `net_hole` 1, a wide hole with 2. Without the net,
// the bare rail. Metres, its foot's middle at the origin, its face toward the shore's view
const snow = !!e.state.snow;
g.fillStyle = '#5c4a3b';
for (const x of [-1.3, 1.3]) g.fillRect(x - 0.06, -1.35, 0.12, 1.35);
g.fillRect(-1.45, -1.35, 2.9, 0.08);
if (snow) {
  g.fillStyle = '#eef1f6';
  g.fillRect(-1.45, -1.39, 2.9, 0.05);
}
if (e.state.net_rail === false) return;
const hole = e.state.net_hole ?? 0;
g.fillStyle = 'rgba(94, 74, 56, 0.9)';
g.beginPath();
g.moveTo(-1.25, -1.3);
g.lineTo(1.25, -1.3);
g.quadraticCurveTo(1.2, -0.7, 1.05, -0.35);
g.quadraticCurveTo(0, -0.5, -1.0, -0.38);
g.quadraticCurveTo(-1.2, -0.75, -1.25, -1.3);
g.closePath();
g.fill();
// the mesh's lines
g.strokeStyle = 'rgba(150, 124, 96, 0.6)';
g.lineWidth = 0.012;
for (let x = -1.2; x <= 1.2; x += 0.12) {
  g.beginPath();
  g.moveTo(x, -1.3);
  g.lineTo(x + 0.08 * Math.sign(x || 1), -0.42);
  g.stroke();
}
for (let y = -1.2; y < -0.45; y += 0.12) {
  g.beginPath();
  g.moveTo(-1.2, y);
  g.quadraticCurveTo(0, y + 0.06, 1.15, y);
  g.stroke();
}
// the hole: torn at the edge (1), wider (2)
if (hole >= 1) {
  const w = hole >= 2 ? 0.34 : 0.14;
  g.fillStyle = '#2a241e';
  g.save();
  g.globalCompositeOperation = 'destination-out';
  g.beginPath();
  g.ellipse(0.55, -0.62, w, w * 0.8, 0.3, 0, Math.PI * 2);
  g.fill();
  g.restore();
  g.strokeStyle = 'rgba(150, 124, 96, 0.8)';
  for (let i = 0; i < 4 * hole; i++) {
    const a = (i / (4 * hole)) * Math.PI * 2;
    g.beginPath();
    g.moveTo(0.55 + w * Math.cos(a), -0.62 + w * 0.8 * Math.sin(a));
    g.lineTo(0.55 + w * 1.25 * Math.cos(a + 0.2), -0.62 + w * Math.sin(a + 0.2) + 0.05);
    g.stroke();
  }
}
g.fillStyle = '#d8c79a';
for (let i = 0; i < 8; i++) {
  g.beginPath();
  g.ellipse(-1.1 + 0.31 * i, -0.4 + 0.04 * Math.sin(i * 1.7), 0.045, 0.028, 0, 0, Math.PI * 2);
  g.fill();
}
