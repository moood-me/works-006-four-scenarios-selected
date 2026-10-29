// The white flowers laid on the threshold stone — only when `flowers` is "threshold": a bunch lying on its side, the
// stems toward the room, the white heads toward the night
if (e.state.flowers !== 'threshold') return;
g.strokeStyle = '#5c7a4a';
g.lineWidth = 0.008;
for (let i = 0; i < 8; i++) {
  g.beginPath();
  g.moveTo(-0.26, -0.02);
  g.lineTo(0.12, -0.03 - 0.09 * e.anim.hash(i, 1));
  g.stroke();
}
g.strokeStyle = '#9a968a';
g.lineWidth = 0.005;
for (let i = 0; i < 8; i++) {
  const x = 0.14 + 0.08 * e.anim.hash(i, 2);
  const y = -0.03 - 0.09 * e.anim.hash(i, 1);
  const r = 0.03 + 0.012 * e.anim.hash(i, 3);
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
e.at(0.1, -0.06, 'flowers');
