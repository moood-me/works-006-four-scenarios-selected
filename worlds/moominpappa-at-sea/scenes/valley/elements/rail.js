// The veranda's front, side-on: its skirt of white lattice from the ground up to the floor, and the balustrade on it —
// a white rail on turned balusters, posts at the corners — with the gap where the steps go down (across −0.8…0 of its
// middle). Metres from its foot on the ground under the floor's front edge.
const F = 0.58, T = F + 0.62, X0 = -2.3, X1 = 2.3, GAP = [-0.8, 0];
// the skirt
g.fillStyle = '#e9e4d6';
g.fillRect(X0, -F, X1 - X0, F);
g.strokeStyle = 'rgba(120, 110, 96, 0.55)';
g.lineWidth = 0.025;
g.save();
g.beginPath();
g.rect(X0, -F, X1 - X0, F);
g.clip();
for (let x = X0 - F; x < X1; x += 0.18) {
  g.beginPath();
  g.moveTo(x, 0);
  g.lineTo(x + F, -F);
  g.moveTo(x + F, 0);
  g.lineTo(x, -F);
  g.stroke();
}
g.restore();
g.fillStyle = '#f2efe6';
g.fillRect(X0, -F - 0.06, X1 - X0, 0.08);
// the balustrade, either side of the gap
const span = (a, b) => {
  g.fillStyle = '#f4f1e8';
  g.fillRect(a, -T, b - a, 0.07);
  g.fillRect(a, -F - 0.1, b - a, 0.05);
  for (let x = a + 0.12; x < b - 0.05; x += 0.14) {
    g.beginPath();
    g.moveTo(x - 0.022, -T + 0.07);
    g.quadraticCurveTo(x - 0.05, -(F + T) / 2, x - 0.022, -F - 0.05);
    g.lineTo(x + 0.022, -F - 0.05);
    g.quadraticCurveTo(x + 0.05, -(F + T) / 2, x + 0.022, -T + 0.07);
    g.fill();
  }
  for (const x of [a, b]) g.fillRect(x - 0.05, -T - 0.08, 0.1, T - F + 0.08);
};
span(X0, GAP[0]);
span(GAP[1], X1);
