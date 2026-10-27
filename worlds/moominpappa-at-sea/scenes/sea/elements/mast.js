// The boat's stub of a mast with its crosstree (Little My sits on it), the sail furled round its foot, the stays down
// to the rails. Metres from its foot on the floorboards.
g.fillStyle = '#6b5440';
g.fillRect(-0.04, -3.2, 0.08, 3.2);
g.fillRect(-0.36, -2.28, 0.72, 0.05);
g.fillStyle = '#e7dfcf';
g.beginPath();
g.moveTo(-0.04, -1.25);
g.quadraticCurveTo(0.05, -1.05, 0.05, -0.75);
g.lineTo(-0.05, -0.75);
g.quadraticCurveTo(-0.13, -1.05, -0.04, -1.25);
g.fill();
g.strokeStyle = 'rgba(120, 100, 80, 0.8)';
g.lineWidth = 0.012;
for (const y of [-1.1, -0.95, -0.82]) {
  g.beginPath();
  g.moveTo(-0.1, y);
  g.lineTo(0.06, y + 0.02);
  g.stroke();
}
// the stays down to the rails
g.strokeStyle = 'rgba(160, 140, 110, 0.8)';
g.lineWidth = 0.01;
g.beginPath();
g.moveTo(0, -3.1);
g.lineTo(-0.62, -0.05);
g.moveTo(0, -3.1);
g.lineTo(0.62, -0.05);
g.stroke();
