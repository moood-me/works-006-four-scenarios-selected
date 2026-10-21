// The biscuit tin the household's money is kept in, open (x −0.14…0.14): a tartan tin, its lid leaning on it behind,
// coins and a folded note inside; the point `tin` — what Eileen counts.
g.fillStyle = "#2f4a3a";
g.beginPath();
g.ellipse(0.02, -0.12, 0.12, 0.08, 0, 0, 6.3);
g.fill();
g.fillStyle = "#8a2f2c";
g.fillRect(-0.12, -0.09, 0.24, 0.09);
g.fillStyle = "#2f4a3a";
for (let x = -0.1; x < 0.12; x += 0.05) g.fillRect(x, -0.09, 0.015, 0.09);
g.fillRect(-0.12, -0.055, 0.24, 0.012);
g.fillStyle = "#c9b98c";
g.beginPath();
g.ellipse(0, -0.09, 0.12, 0.022, 0, 0, 6.3);
g.fill();
g.fillStyle = "#a9a59c";
for (const [x, y] of [[-0.05, -0.092], [0.02, -0.088], [0.06, -0.094]]) {
  g.beginPath();
  g.ellipse(x, y, 0.016, 0.006, 0, 0, 6.3);
  g.fill();
}
g.fillStyle = "#9fb08a";
g.fillRect(-0.02, -0.1, 0.05, 0.012);
e.at(0, -0.09, "tin");
