// A birch: a white trunk with black marks, a light airy crown of small leaves, the first of them gone yellow (a layer
// the wind sways). Copies along the stream, on the meadow's edge and on the hills.
g.fillStyle = '#ece8de';
g.beginPath();
g.moveTo(-0.12, 0);
g.quadraticCurveTo(-0.1, -3, -0.03, -6.2);
g.lineTo(0.03, -6.2);
g.quadraticCurveTo(0.1, -3, 0.12, 0);
g.closePath();
g.fill();
g.fillStyle = '#2e2a26';
for (let i = 0; i < 14; i++) {
  const y = -0.3 - 5.4 * e.rnd(), w = 0.12 * (1 - -y / 7);
  g.fillRect(-w + 0.04 * e.rnd(), y, w * (0.6 + 0.8 * e.rnd()), 0.04);
}
e.layer('crown', { pivot: [0, -2.4], wind: { strength: 0.3, gust: 0.6, scale: 6 } }, c => {
  c.strokeStyle = '#4a3e34';
  c.lineWidth = 0.025;
  for (let i = 0; i < 9; i++) {
    const y = -2.6 - i * 0.42, s = i % 2 ? 1 : -1;
    c.beginPath();
    c.moveTo(0, y);
    c.quadraticCurveTo(s * 0.6, y - 0.1, s * (1.1 - i * 0.07), y + 0.35);
    c.stroke();
  }
  for (let i = 0; i < 380; i++) {
    const y = -2.5 - 4.6 * e.rnd(), wd = 1.25 * Math.sin(Math.PI * Math.min(1, (-y - 2.3) / 4.9)) + 0.15;
    const x = (e.rnd() - 0.5) * 2 * wd, k = e.rnd();
    c.fillStyle = k < 0.18 ? '#d8c25a' : k < 0.55 ? '#86a85a' : '#6e9248';
    c.beginPath();
    c.ellipse(x, y, 0.08, 0.055, e.rnd() * 3, 0, Math.PI * 2);
    c.fill();
  }
});
