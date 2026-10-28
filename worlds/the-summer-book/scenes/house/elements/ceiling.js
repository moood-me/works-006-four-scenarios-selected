// The veranda's ceiling, laid face down: narrow boards painted white gone cream, a beam across. Metres from its foot at
// the back wall, running up the card toward the viewer.
g.fillStyle = '#e4e0d7';
g.fillRect(-3.2, -6.4, 6.4, 6.45);
g.strokeStyle = 'rgba(160,152,138,0.4)';
g.lineWidth = 0.012;
for (let y = -6.4; y < 0; y += 0.11) {
  g.beginPath();
  g.moveTo(-3.2, y);
  g.lineTo(3.2, y);
  g.stroke();
}
g.fillStyle = '#d6d0c4';
g.fillRect(-3.2, -3.3, 6.4, 0.14);
