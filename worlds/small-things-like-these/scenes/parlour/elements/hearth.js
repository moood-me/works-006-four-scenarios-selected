// The hearth before the grate from above (x −0.7…0.7, y toward the viewer): black slate in its middle, a border of red
// quarry tiles.
g.fillStyle = "#8a4636";
g.fillRect(-0.7, -0.2, 1.4, 0.4);
g.fillStyle = "#2c2a2b";
g.fillRect(-0.6, -0.2, 1.2, 0.32);
g.fillStyle = "#6f3a2e";
for (let x = -0.7; x < 0.7; x += 0.1) g.fillRect(x, 0.12, 0.006, 0.08);
