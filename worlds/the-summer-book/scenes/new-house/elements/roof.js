// A slope of the steep roof (its two slopes are this plane's two copies): new black painted tin, its standing seams
// running up the slope. Seen from above, metres from its middle: x along the ridge (8.3 m), y up the slope (4.74 m).
g.fillStyle = '#2a2d31';
g.fillRect(-4.2, -2.42, 8.4, 4.84);
g.strokeStyle = 'rgba(70,74,80,0.8)';
g.lineWidth = 0.03;
for (let x = -4.1; x < 4.2; x += 0.48) {
  g.beginPath();
  g.moveTo(x, -2.42);
  g.lineTo(x, 2.42);
  g.stroke();
}
g.fillStyle = 'rgba(110,116,122,0.18)';
for (let x = -4.0; x < 4.2; x += 0.96) g.fillRect(x, -2.42, 0.2, 4.84);
