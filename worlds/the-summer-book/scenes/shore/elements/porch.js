// The porch before the door: three grey wooden steps and a small landing, a plain rail on the left side. Metres from the
// middle of its foot; 1.3 m wide, the landing 0.55 m up.
g.fillStyle = '#9e978d';
g.fillRect(-0.65, -0.55, 1.3, 0.6);
g.fillStyle = '#b3ada3';
for (let i = 0; i < 3; i++) {
  const y = -0.55 + i * 0.185;
  g.fillRect(-0.65, y, 1.3, 0.05);
}
g.strokeStyle = '#857e75';
g.lineWidth = 0.02;
for (let i = 1; i < 3; i++) {
  const y = -0.55 + i * 0.185 - 0.01;
  g.beginPath();
  g.moveTo(-0.65, y);
  g.lineTo(0.65, y);
  g.stroke();
}
// the rail
g.fillStyle = '#8f887e';
g.fillRect(-0.68, -1.45, 0.06, 1.45);
g.fillRect(-0.68, -1.45, 0.06, 0.06);
g.fillRect(-0.7, -1.47, 0.1, 0.05);
g.fillRect(-0.68, -1.0, 0.04, 0.04);
e.at(0, -0.55, 'landing');
