// The room's far wall, the cape's side of the house: papered in a faded cream with small grey-blue sprigs, a skirting
// board, the window onto the cape cut out (its frames, glass and opening leaf are `room_window`, `room_glass`,
// `casement`), thin white curtains gathered at its sides. Metres from the room's frame (x as the house's frame — the
// window x −0.25…0.85, its sill 0.82 m, its head 2.0 m over the floor), 2.6 m to the ceiling.
g.fillStyle = '#ddd6c6';
g.fillRect(-2.75, -2.62, 5.1, 2.64);
g.fillStyle = 'rgba(130,146,160,0.35)';
for (let row = 0; row < 11; row++) {
  const y = -2.5 + row * 0.22;
  for (let x = -2.7 + (row % 2) * 0.11; x < 2.35; x += 0.22) {
    g.beginPath();
    g.ellipse(x, y, 0.012, 0.022, 0.4, 0, 6.2832);
    g.fill();
  }
}
g.fillStyle = '#bcb5a6';
g.fillRect(-2.75, -0.12, 5.1, 0.14);
g.fillStyle = '#e8e3d8';
g.fillRect(-2.75, -2.62, 5.1, 0.06);
// the opening
g.globalCompositeOperation = 'destination-out';
g.fillRect(-0.25, -2.0, 1.1, 1.18);
g.globalCompositeOperation = 'source-over';
// the curtains, gathered at either side of the window, a little over its head
g.fillStyle = '#f4f2ec';
for (const [x, w] of [[-0.55, 0.26], [0.88, 0.26]]) {
  g.beginPath();
  g.moveTo(x, -2.12);
  g.lineTo(x + w, -2.12);
  g.bezierCurveTo(x + w - 0.04, -1.6, x + w, -1.1, x + w - 0.02, -0.7);
  g.lineTo(x + 0.03, -0.7);
  g.bezierCurveTo(x + 0.05, -1.2, x, -1.7, x, -2.12);
  g.closePath();
  g.fill();
}
g.strokeStyle = 'rgba(170,164,150,0.5)';
g.lineWidth = 0.008;
for (const x of [-0.5, -0.42, -0.36, 0.94, 1.01, 1.08]) {
  g.beginPath();
  g.moveTo(x, -2.1);
  g.lineTo(x + 0.01, -0.72);
  g.stroke();
}
// the curtain rod
g.fillStyle = '#9a8f80';
g.fillRect(-0.6, -2.15, 1.6, 0.025);
e.at(0.3, -1.4, 'window');
