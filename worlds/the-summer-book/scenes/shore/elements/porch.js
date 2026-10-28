// The porch before the door: three grey wooden steps and a small landing, a plain rail on the left side. Metres from the
// middle of its foot; 1.3 m wide, the landing 0.55 m up. On the rail's top, when Papa has put it there (`shell`), the
// big white shell they stub the cigarettes out in. Points: `landing`, `rail` (the rail's top).
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
if (e.state.shell) {
  g.fillStyle = '#efe4d6';
  g.beginPath();
  g.moveTo(-0.84, -1.47);
  g.bezierCurveTo(-0.8, -1.6, -0.5, -1.62, -0.46, -1.47);
  g.closePath();
  g.fill();
  g.strokeStyle = 'rgba(180,150,130,0.7)';
  g.lineWidth = 0.008;
  for (const x of [-0.75, -0.68, -0.6, -0.53]) {
    g.beginPath();
    g.moveTo(-0.65, -1.47);
    g.lineTo(x, -1.57);
    g.stroke();
  }
}
e.at(0, -0.55, 'landing');
e.at(-0.65, -1.47, 'rail');
