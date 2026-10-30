// The potter's stall out on the lane (the square at night, the morning market): a board on two trestles, his jugs and
// bowls, and at its left end a little heap of coppers (by the Fisherman as he stands there, his hand near them) — what he took; their point `coppers`. Nothing unless the
// square or the morning (`time`) brings it out
if (!e.state.square && e.state.time !== 'morning') return;
g.fillStyle = '#5c4636';
g.fillRect(-0.8, -0.82, 1.6, 0.07);
for (const x of [-0.7, 0.62]) g.fillRect(x, -0.77, 0.07, 0.77);
g.fillStyle = 'rgba(40, 30, 24, 0.35)';
g.fillRect(-0.8, -0.76, 1.6, 0.03);
const pots = [[-0.18, 0.1, 0.2, '#a85c3c'], [0.06, 0.09, 0.13, '#c48a58'], [0.3, 0.12, 0.24, '#93583e'], [0.56, 0.08, 0.12, '#b8744a']];
for (const [x, r, h, c] of pots) {
  g.fillStyle = c;
  g.beginPath();
  g.ellipse(x, -0.82 - h / 2, r, h / 2, 0, 0, Math.PI * 2);
  g.fill();
  g.fillRect(x - r * 0.45, -0.82 - h - 0.04, r * 0.9, 0.06);
}
// the coppers: a few dull brown-gold coins heaped by the edge
for (let i = 0; i < 7; i++) {
  g.fillStyle = i % 2 ? '#b07a3e' : '#c98f4c';
  g.beginPath();
  g.ellipse(-0.55 + 0.1 * (e.anim.hash(i, 1) - 0.5), -0.85 - 0.018 * (i % 3), 0.035, 0.012, 0, 0, Math.PI * 2);
  g.fill();
}
e.at(-0.55, -0.87, 'coppers');
