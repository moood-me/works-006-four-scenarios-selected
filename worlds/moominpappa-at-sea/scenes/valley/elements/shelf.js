// The shelf on the house's wall by the door: a board on two brackets, jars of last year's jam, a watering can — and the
// candles in a jug while they are on the shelf (`candles` "shelf"; packed into the basket they are gone from it).
g.fillStyle = '#8a6a48';
g.fillRect(-0.45, -0.04, 0.9, 0.04);
for (const x of [-0.36, 0.36]) {
  g.beginPath();
  g.moveTo(x - 0.02, 0);
  g.lineTo(x + 0.02, 0);
  g.lineTo(x + 0.02, 0.16);
  g.closePath();
  g.fill();
}
for (const [x, h, c] of [[-0.34, 0.12, '#8a2430'], [-0.22, 0.1, '#b0502c']]) {
  g.fillStyle = 'rgba(214, 226, 226, 0.9)';
  g.fillRect(x - 0.045, -0.04 - h, 0.09, h);
  g.fillStyle = c;
  g.fillRect(x - 0.04, -0.04 - h + 0.02, 0.08, h - 0.025);
  g.fillStyle = '#f2ead8';
  g.fillRect(x - 0.05, -0.04 - h - 0.01, 0.1, 0.02);
}
// the watering can
g.fillStyle = '#6f8c7a';
g.fillRect(0.18, -0.2, 0.16, 0.16);
g.beginPath();
g.moveTo(0.34, -0.16);
g.lineTo(0.44, -0.27);
g.lineTo(0.45, -0.25);
g.lineTo(0.34, -0.12);
g.fill();
if ((e.state.candles ?? 'shelf') === 'shelf') {
  g.fillStyle = '#d9c9a4';
  g.fillRect(-0.06, -0.15, 0.13, 0.11);
  g.fillStyle = '#f6f1e2';
  for (const [x, h] of [[-0.035, 0.2], [0, 0.23], [0.035, 0.19]]) g.fillRect(x - 0.012, -0.15 - h, 0.024, h);
}
