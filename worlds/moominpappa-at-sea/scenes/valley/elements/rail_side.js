// The veranda's ends: its skirt of lattice and the balustrade, as on its front (`rail`), 2.6 m long. Two copies, on its
// left and right ends.
const F = 0.58, T = F + 0.62, X0 = -1.3, X1 = 1.3;
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
g.fillStyle = '#f4f1e8';
g.fillRect(X0, -F - 0.06, X1 - X0, 0.08);
g.fillRect(X0, -T, X1 - X0, 0.07);
g.fillRect(X0, -F - 0.1, X1 - X0, 0.05);
for (let x = X0 + 0.12; x < X1 - 0.05; x += 0.14) {
  g.beginPath();
  g.moveTo(x - 0.022, -T + 0.07);
  g.quadraticCurveTo(x - 0.05, -(F + T) / 2, x - 0.022, -F - 0.05);
  g.lineTo(x + 0.022, -F - 0.05);
  g.quadraticCurveTo(x + 0.05, -(F + T) / 2, x + 0.022, -T + 0.07);
  g.fill();
}
for (const x of [X0, X1]) g.fillRect(x - 0.05, -T - 0.08, 0.1, T - F + 0.08);
