// The chimney: whitewashed brick going grey, a dark cap. Metres from its foot (inside the house; only its top shows
// over the roof).
g.fillStyle = '#cfcac2';
g.fillRect(-0.3, -5.7, 0.6, 5.7);
g.strokeStyle = 'rgba(120,114,108,0.35)';
g.lineWidth = 0.02;
for (let y = -5.6; y < -4; y += 0.14) {
  g.beginPath();
  g.moveTo(-0.3, y);
  g.lineTo(0.3, y);
  g.stroke();
}
g.fillStyle = '#4b5056';
g.fillRect(-0.36, -5.82, 0.72, 0.14);
