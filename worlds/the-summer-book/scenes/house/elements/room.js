// The room seen through the open door: its far wall papered in a faded cream with small grey-blue sprigs, the window
// onto the cape (white frame, four panes — the glass clear: the sea and the sky beyond), thin white curtains drawn to
// its sides. Metres from the middle of the wall's foot (4.4 m of it), 2.6 m to the ceiling.
g.fillStyle = '#ddd6c6';
g.fillRect(-2.2, -2.62, 4.4, 2.64);
g.fillStyle = 'rgba(130,146,160,0.35)';
for (let row = 0; row < 11; row++) {
  const y = -2.5 + row * 0.22;
  for (let x = -2.1 + (row % 2) * 0.11; x < 2.2; x += 0.22) {
    g.beginPath();
    g.ellipse(x, y, 0.012, 0.022, 0.4, 0, 6.2832);
    g.fill();
  }
}
g.fillStyle = '#bcb5a6';
g.fillRect(-2.2, -0.12, 4.4, 0.14);
// the window: frame, then the panes cut out
g.fillStyle = '#efede7';
g.fillRect(-0.95, -2.06, 1.1, 1.32);
g.fillRect(-1.02, -0.76, 1.24, 0.06);
g.globalCompositeOperation = 'destination-out';
for (const [x, y] of [[-0.89, -2.0], [-0.39, -2.0], [-0.89, -1.37], [-0.39, -1.37]]) g.fillRect(x, y, 0.48, 0.6);
g.globalCompositeOperation = 'source-over';
// the curtains, gathered at either side
g.fillStyle = 'rgba(246,244,238,0.92)';
for (const x of [-1.22, 0.17]) {
  g.beginPath();
  g.moveTo(x, -2.12);
  g.lineTo(x + 0.25, -2.12);
  g.bezierCurveTo(x + 0.2, -1.6, x + 0.24, -1.1, x + 0.22, -0.82);
  g.lineTo(x + 0.03, -0.82);
  g.bezierCurveTo(x + 0.05, -1.2, x, -1.7, x, -2.12);
  g.closePath();
  g.fill();
}
e.at(-0.4, -1.4, 'window');
