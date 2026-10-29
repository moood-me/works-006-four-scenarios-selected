// The shelf on the back wall: a board on two brackets, the potter's best pots, a round loaf at its front, and — while it
// is here (`cup_at` shelf) — the small silver cup behind the loaf, his wife's. Points `cup` (where it stands, behind the
// bread) and `bread`. Metres, the board's top at y 0
g.fillStyle = '#5c4430';
g.fillRect(-0.6, 0, 1.2, 0.05);
for (const x of [-0.45, 0.45]) {
  g.beginPath();
  g.moveTo(x, 0.05);
  g.lineTo(x + 0.03, 0.05);
  g.lineTo(x + 0.03, 0.22);
  g.closePath();
  g.fill();
}
const pots = [[-0.45, 0.08, 0.2, '#a85c3c'], [-0.25, 0.07, 0.14, '#c48a58'], [0.42, 0.09, 0.24, '#93583e']];
for (const [x, r, h, c] of pots) {
  g.fillStyle = c;
  g.beginPath();
  g.ellipse(x, -h / 2, r, h / 2, 0, 0, Math.PI * 2);
  g.fill();
  g.fillRect(x - r * 0.45, -h - 0.03, r * 0.9, 0.05);
}
if (e.state.cup_at === 'shelf') {
  g.fillStyle = '#e4e6ea';
  g.beginPath();
  g.moveTo(-0.0, -0.17);
  g.lineTo(0.12, -0.17);
  g.quadraticCurveTo(0.11, -0.08, 0.072, -0.07);
  g.lineTo(0.072, -0.02);
  g.lineTo(0.1, 0);
  g.lineTo(0.02, 0);
  g.lineTo(0.048, -0.02);
  g.lineTo(0.048, -0.07);
  g.quadraticCurveTo(0.01, -0.08, -0.0, -0.17);
  g.closePath();
  g.fill();
  g.fillStyle = 'rgba(255, 255, 255, 0.6)';
  g.fillRect(0.02, -0.16, 0.012, 0.07);
}
e.at(0.06, -0.1, 'cup');
// the loaf in front of where the cup stands
g.fillStyle = '#b07a46';
g.beginPath();
g.ellipse(0.17, -0.07, 0.13, 0.075, 0, 0, Math.PI * 2);
g.fill();
g.fillStyle = 'rgba(80, 50, 26, 0.4)';
g.fillRect(0.1, -0.1, 0.12, 0.012);
e.at(0.17, -0.07, 'bread');
