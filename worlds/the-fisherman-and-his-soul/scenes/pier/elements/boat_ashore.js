// The widow's husband's boat drawn up on the sand (chapter 4, `widow_boat`): side-on, its keel in the sand and a little
// heeled, weathered grey planks gone green at the waterline, a gap where a plank has rotted, the oars laid in her.
// Metres, its keel's middle at the origin, its side toward the shore's view
if (!e.state.widow_boat) return;
const snow = !!e.state.snow;
g.fillStyle = '#6f7a7c';
g.beginPath();
g.moveTo(-2.2, -0.75);
g.quadraticCurveTo(-2.0, -0.15, -1.2, 0);
g.lineTo(1.4, 0);
g.quadraticCurveTo(2.0, -0.15, 2.15, -0.8);
g.lineTo(-2.2, -0.75);
g.closePath();
g.fill();
g.strokeStyle = 'rgba(40, 46, 48, 0.6)';
g.lineWidth = 0.025;
for (const y of [-0.22, -0.42, -0.6]) {
  g.beginPath();
  g.moveTo(-2.05, y - 0.05);
  g.quadraticCurveTo(0, y + 0.08, 2.0, y - 0.07);
  g.stroke();
}
g.fillStyle = 'rgba(80, 104, 70, 0.55)';
g.fillRect(-1.6, -0.12, 3.2, 0.1);
// the rotted plank
g.fillStyle = '#2e2a26';
g.fillRect(0.3, -0.48, 0.55, 0.08);
// the rail and the oars over it
g.fillStyle = '#8a8478';
g.fillRect(-2.2, -0.82, 4.35, 0.07);
g.fillStyle = '#7a6448';
g.fillRect(-1.4, -0.92, 2.6, 0.05);
if (snow) {
  g.fillStyle = '#eef1f6';
  g.fillRect(-2.1, -0.88, 4.2, 0.06);
}
