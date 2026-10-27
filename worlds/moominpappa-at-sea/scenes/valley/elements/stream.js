// The stream from above (the plane's metres: x across it, y toward the viewer — the way it flows; 2.4 m by 32): brown-
// green water over its stones, paler where it runs quick; two layers the flow carries toward the viewer (drift): the
// little ripples, and the children's boats of pine bark with birch-leaf sails.
g.fillStyle = '#6e8a86';
g.fillRect(-1.2, -16, 2.4, 32);
for (let i = 0; i < 60; i++) {
  const x = (e.rnd() - 0.5) * 2, y = -16 + 32 * e.rnd(), r = 0.1 + 0.25 * e.rnd();
  g.fillStyle = e.rnd() < 0.5 ? 'rgba(92, 84, 64, 0.45)' : 'rgba(150, 168, 156, 0.4)';
  g.beginPath();
  g.ellipse(x, y, r * 1.3, r, e.rnd() * 3, 0, Math.PI * 2);
  g.fill();
}
e.layer('ripples', { drift: [0, 0.32] }, c => {
  c.strokeStyle = 'rgba(226, 236, 230, 0.55)';
  c.lineCap = 'round';
  for (let i = 0; i < 160; i++) {
    const x = (e.rnd() - 0.5) * 1.6, y = -16 + 32 * e.rnd(), w = 0.12 + 0.3 * e.rnd();
    c.lineWidth = 0.02 + 0.02 * e.rnd();
    c.beginPath();
    c.moveTo(x - w, y);
    c.quadraticCurveTo(x, y + 0.06, x + w, y);
    c.stroke();
  }
});
e.layer('bark', { drift: [0, 0.22] }, c => {
  for (const [x, y, t] of [[-0.25, -11, 0.3], [0.2, -3, -0.2], [-0.05, 6, 0.15]]) {
    c.save();
    c.translate(x, y);
    c.rotate(t);
    c.fillStyle = '#7a5434';
    c.beginPath();
    c.moveTo(0, -0.14);
    c.quadraticCurveTo(0.07, -0.02, 0.05, 0.1);
    c.lineTo(-0.05, 0.1);
    c.quadraticCurveTo(-0.07, -0.02, 0, -0.14);
    c.fill();
    c.fillStyle = '#e8d66a';
    c.beginPath();
    c.ellipse(0.02, -0.01, 0.05, 0.035, 0.4, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
});
