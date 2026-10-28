// The three-legged stool Moominmamma sits on at the table's end: a round seat of worn pine.
g.fillStyle = "#9c7d5a";
for (const [x0, x1] of [[-0.12, -0.17], [0.12, 0.17], [0.01, 0.02]]) {
  g.beginPath();
  g.moveTo(x0 - 0.02, -0.42);
  g.lineTo(x0 + 0.02, -0.42);
  g.lineTo(x1 + 0.02, 0);
  g.lineTo(x1 - 0.02, 0);
  g.closePath();
  g.fill();
}
g.fillStyle = "#b8976e";
g.beginPath();
g.ellipse(0, -0.43, 0.19, 0.05, 0, 0, Math.PI * 2);
g.fill();
g.fillRect(-0.19, -0.43, 0.38, 0.03);
