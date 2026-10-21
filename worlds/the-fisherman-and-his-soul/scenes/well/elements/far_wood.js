// Far beyond the glade, the wood going on: a low ragged band of fir tops, paler as the haze takes it. Metres, its foot
// at the origin
g.fillStyle = '#34474b';
g.fillRect(-420, -4, 840, 6);
for (let i = 0; i < 520; i++) {
  const x = -420 + 840 * e.anim.hash(i, 3);
  const h = 9 + 13 * e.anim.hash(i, 4);
  const w = h * (0.2 + 0.08 * e.anim.hash(i, 5));
  g.beginPath();
  g.moveTo(x, -h);
  g.lineTo(x + w, -2);
  g.lineTo(x - w, -2);
  g.closePath();
  g.fill();
}
