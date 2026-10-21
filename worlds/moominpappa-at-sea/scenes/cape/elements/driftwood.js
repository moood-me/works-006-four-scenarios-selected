// A bleached driftwood trunk lying across the near rock, silver-grey, its root end splayed, cracks along the grain —
// the Fisherman's firewood, thrown up by some storm.
g.fillStyle = "#b9b2a8";
g.beginPath();
g.moveTo(-2.4, -0.04);
g.bezierCurveTo(-2.3, -0.3, 1.2, -0.34, 1.7, -0.28);
g.lineTo(2.1, -0.5);
g.lineTo(2.2, -0.36);
g.lineTo(2.45, -0.4);
g.lineTo(2.3, -0.12);
g.lineTo(2.5, 0.0);
g.bezierCurveTo(1.0, 0.02, -1.6, 0.04, -2.4, -0.04);
g.closePath();
g.fill();
g.strokeStyle = "rgba(110, 100, 92, 0.6)";
g.lineWidth = 0.018;
for (let i = 0; i < 7; i++) {
  const y = -0.26 + i * 0.035, x0 = -2.1 + e.rnd() * 1.2, x1 = x0 + 0.8 + e.rnd() * 1.4;
  g.beginPath();
  g.moveTo(x0, y);
  g.lineTo(x1, y + 0.01);
  g.stroke();
}
g.fillStyle = "rgba(244, 240, 232, 0.5)";
g.fillRect(-2.2, -0.31, 3.6, 0.05);
