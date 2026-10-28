// The old apple tree in the garden: a crooked grey-brown trunk leaning a little, low spreading limbs, a round crown of
// late-summer leaves (green, some going yellow) full of red apples — the crown a layer the wind sways. At its foot, on
// the right, the moss where the little fire starts (`apple#moss`; the moss itself is the plane `moss`).
const bark = '#6e6152';
g.fillStyle = bark;
g.beginPath();
g.moveTo(-0.2, 0);
g.bezierCurveTo(-0.16, -0.6, -0.32, -1.1, -0.22, -1.7);
g.lineTo(0.08, -1.75);
g.bezierCurveTo(0.02, -1.1, 0.18, -0.6, 0.2, 0);
g.closePath();
g.fill();
g.strokeStyle = 'rgba(60, 50, 40, 0.6)';
g.lineWidth = 0.02;
for (const x of [-0.1, 0, 0.08]) {
  g.beginPath();
  g.moveTo(x, -0.05);
  g.quadraticCurveTo(x - 0.06, -0.8, x - 0.02, -1.6);
  g.stroke();
}
e.layer('crown', { pivot: [-0.1, -1.7], wind: { strength: 0.18, gust: 0.4, scale: 5 } }, c => {
  c.strokeStyle = bark;
  c.lineCap = 'round';
  for (const [x0, y0, x1, y1, w] of [[-0.1, -1.7, -1.3, -2.3, 0.09], [-0.05, -1.75, 1.2, -2.4, 0.09], [-0.08, -1.8, -0.2, -3.0, 0.08],
    [-0.6, -2.0, -1.6, -2.9, 0.05], [0.5, -2.05, 1.5, -3.0, 0.05]]) {
    c.lineWidth = w;
    c.beginPath();
    c.moveTo(x0, y0);
    c.quadraticCurveTo((x0 + x1) / 2, y0 - 0.15, x1, y1);
    c.stroke();
  }
  // the leaves: clumps of dabs, darker under, lighter and yellowing on top
  const clumps = [[-1.3, -2.6, 0.8], [1.2, -2.7, 0.85], [0, -3.3, 0.95], [-0.7, -3.5, 0.7], [0.75, -3.6, 0.7], [-1.7, -3.0, 0.55],
    [1.75, -3.1, 0.55], [0, -2.5, 0.7], [-0.2, -4.0, 0.55]];
  for (const [cx, cy, r] of clumps) {
    for (let i = 0; i < 46; i++) {
      const a = e.rnd() * Math.PI * 2, q = r * Math.sqrt(e.rnd()), x = cx + Math.cos(a) * q, y = cy + Math.sin(a) * q * 0.8;
      const up = (cy - y) / r, k = e.rnd();
      c.fillStyle = k < 0.12 ? '#c9b24e' : up > 0.2 ? (k < 0.6 ? '#7ea052' : '#94b260') : k < 0.6 ? '#4f7438' : '#628a44';
      c.beginPath();
      c.ellipse(x, y, 0.11 + 0.06 * e.rnd(), 0.07, e.rnd() * 3, 0, Math.PI * 2);
      c.fill();
    }
  }
  for (let i = 0; i < 26; i++) {
    const [cx, cy, r] = clumps[Math.floor(e.rnd() * clumps.length)], a = e.rnd() * Math.PI * 2, q = r * 0.8 * Math.sqrt(e.rnd());
    c.fillStyle = e.rnd() < 0.7 ? '#c23a2c' : '#d8682e';
    c.beginPath();
    c.arc(cx + Math.cos(a) * q, cy + Math.sin(a) * q * 0.8, 0.055, 0, Math.PI * 2);
    c.fill();
  }
});
e.at(0.6, 0, 'moss');
e.at(0, -3.0);
