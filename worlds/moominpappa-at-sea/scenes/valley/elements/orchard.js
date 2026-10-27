// A younger apple tree of the garden: a slim trunk, a round crown, a few apples (the crown a layer the wind sways).
// Copies about the garden, told apart by size and flip.
g.fillStyle = '#6e6152';
g.beginPath();
g.moveTo(-0.1, 0);
g.quadraticCurveTo(-0.14, -0.7, -0.06, -1.3);
g.lineTo(0.06, -1.3);
g.quadraticCurveTo(0.12, -0.7, 0.1, 0);
g.closePath();
g.fill();
e.layer('crown', { pivot: [0, -1.3], wind: { strength: 0.2, gust: 0.4, scale: 5 } }, c => {
  for (let i = 0; i < 220; i++) {
    const a = e.rnd() * Math.PI * 2, q = 1.05 * Math.sqrt(e.rnd()), x = Math.cos(a) * q * 1.1, y = -2.2 + Math.sin(a) * q * 0.85;
    const up = (-2.2 - y) / 1.05, k = e.rnd();
    c.fillStyle = k < 0.1 ? '#c5b04c' : up > 0.2 ? (k < 0.6 ? '#7ea052' : '#94b260') : k < 0.6 ? '#4f7438' : '#628a44';
    c.beginPath();
    c.ellipse(x, y, 0.1 + 0.05 * e.rnd(), 0.065, e.rnd() * 3, 0, Math.PI * 2);
    c.fill();
  }
  for (let i = 0; i < 12; i++) {
    const a = e.rnd() * Math.PI * 2, q = 0.85 * Math.sqrt(e.rnd());
    c.fillStyle = '#c23a2c';
    c.beginPath();
    c.arc(Math.cos(a) * q * 1.1, -2.2 + Math.sin(a) * q * 0.85, 0.05, 0, Math.PI * 2);
    c.fill();
  }
});
