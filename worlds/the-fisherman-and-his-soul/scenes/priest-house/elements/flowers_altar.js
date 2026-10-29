// The white flowers no one has seen before, in a clay jug on the altar between the candles — only when `flowers` is
// "altar": a brown jug, green stems, many small white heads and a few buds
if (e.state.flowers !== 'altar') return;
g.fillStyle = '#8a5a3c';
g.beginPath();
g.moveTo(-0.07, -0.2);
g.quadraticCurveTo(-0.1, -0.08, -0.06, 0);
g.lineTo(0.06, 0);
g.quadraticCurveTo(0.1, -0.08, 0.07, -0.2);
g.closePath();
g.fill();
g.strokeStyle = '#5c7a4a';
g.lineWidth = 0.008;
for (let i = 0; i < 9; i++) {
  const a = (i / 8 - 0.5) * 1.2;
  g.beginPath();
  g.moveTo(0, -0.19);
  g.quadraticCurveTo(a * 0.08, -0.32, a * 0.2, -0.36 - 0.1 * e.anim.hash(i, 1));
  g.stroke();
}
// the heads: white petals with a fine grey edge and a yellow eye, so that they read against the white wall
g.strokeStyle = '#9a968a';
g.lineWidth = 0.005;
for (let i = 0; i < 9; i++) {
  const a = (i / 8 - 0.5) * 1.2;
  const x = a * 0.2;
  const y = -0.36 - 0.1 * e.anim.hash(i, 1);
  const r = 0.035 + 0.015 * e.anim.hash(i, 2);
  g.fillStyle = '#fdfcf6';
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.fillStyle = '#e2b43a';
  g.beginPath();
  g.arc(x, y, r * 0.32, 0, Math.PI * 2);
  g.fill();
}
e.at(0, -0.36, 'flowers');
