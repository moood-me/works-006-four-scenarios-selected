// Little My's high stool at the table's corner: a round seat on three splayed legs with a rung.
g.fillStyle = '#8a6a48';
for (const [x0, x1] of [[-0.12, -0.18], [0.12, 0.18], [0, 0]]) {
  g.beginPath();
  g.moveTo(x0 - 0.02, -0.48);
  g.lineTo(x1 - 0.022, 0);
  g.lineTo(x1 + 0.022, 0);
  g.lineTo(x0 + 0.02, -0.48);
  g.fill();
}
g.fillRect(-0.15, -0.2, 0.3, 0.03);
g.fillStyle = '#a5845c';
g.beginPath();
g.ellipse(0, -0.5, 0.17, 0.04, 0, 0, Math.PI * 2);
g.fill();
g.fillRect(-0.17, -0.5, 0.34, 0.03);
