// Mama's blanket over her as she sleeps on the thwart: a big checked plaid, red and cream, pulled up to her chin, its
// folds falling to the floorboards. Metres from its foot.
g.fillStyle = '#b8574a';
g.beginPath();
g.moveTo(-0.34, -0.66);
g.quadraticCurveTo(0, -0.74, 0.34, -0.66);
g.quadraticCurveTo(0.46, -0.3, 0.42, 0);
g.lineTo(-0.42, 0);
g.quadraticCurveTo(-0.46, -0.3, -0.34, -0.66);
g.fill();
g.strokeStyle = 'rgba(240, 230, 210, 0.75)';
g.lineWidth = 0.03;
for (const x of [-0.26, -0.09, 0.08, 0.25]) {
  g.beginPath();
  g.moveTo(x, -0.7);
  g.quadraticCurveTo(x * 1.2, -0.35, x * 1.2, 0);
  g.stroke();
}
for (const y of [-0.55, -0.38, -0.21, -0.06]) {
  g.beginPath();
  g.moveTo(-0.42, y);
  g.quadraticCurveTo(0, y - 0.03, 0.42, y);
  g.stroke();
}
g.strokeStyle = 'rgba(110, 40, 34, 0.45)';
g.lineWidth = 0.02;
for (const x of [-0.18, 0.15]) {
  g.beginPath();
  g.moveTo(x, -0.6);
  g.quadraticCurveTo(x - 0.05, -0.3, x + 0.02, 0);
  g.stroke();
}
