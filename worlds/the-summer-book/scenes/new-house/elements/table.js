// The table under the sea windows, from above: a new top of pale birch, bare and clean, its grain along it, a thin
// darker edge. Metres from its middle (x as the world's, y toward the start; 1.4 × 0.7 m). The point `seal`: where
// the wooden seal is left, by the window before the middle of a pane; `table` — its middle.
g.fillStyle = '#e3cda6';
g.fillRect(-0.7, -0.35, 1.4, 0.7);
g.strokeStyle = 'rgba(176,146,104,0.35)';
g.lineWidth = 0.005;
g.beginPath();
for (let y = -0.32; y < 0.34; y += 0.045) {
  g.moveTo(-0.68, y);
  g.bezierCurveTo(-0.2, y + 0.01, 0.2, y - 0.012, 0.68, y + 0.004);
}
g.stroke();
g.strokeStyle = '#c4a678';
g.lineWidth = 0.014;
g.strokeRect(-0.693, -0.343, 1.386, 0.686);
e.at(-0.05, -0.1, 'seal');
e.at(0, 0, 'table');
