// Grandmother's storm lantern, set down (`lantern`: on the table, or on the floor before her at the bed's foot): a tin
// foot and cap, a wire guard round the glass globe, a bail on top, the candle's flame in it (its glow and its light —
// the light `lantern`, alight while it stands here). Nothing of it while it is in her hand or not here. Metres from its
// foot; 0.36 m high. The point `lantern`.
const at = e.state.lantern;
if (at === 'table' || at === 'floor') {
  g.fillStyle = '#6a6e70';
  g.fillRect(-0.085, -0.04, 0.17, 0.04);
  g.beginPath();
  g.moveTo(-0.075, -0.25);
  g.lineTo(0.075, -0.25);
  g.lineTo(0.05, -0.29);
  g.lineTo(-0.05, -0.29);
  g.closePath();
  g.fill();
  g.fillRect(-0.02, -0.31, 0.04, 0.02);
  // the globe: clear glass, its edges catching the light
  g.fillStyle = 'rgba(232,226,206,0.35)';
  g.beginPath();
  g.ellipse(0, -0.145, 0.065, 0.105, 0, 0, 6.2832);
  g.fill();
  g.strokeStyle = '#5c6062';
  g.lineWidth = 0.007;
  g.beginPath();
  for (const x of [-0.07, 0, 0.07]) {
    g.moveTo(x, -0.04);
    g.quadraticCurveTo(x * 1.25, -0.145, x, -0.25);
  }
  g.stroke();
  g.beginPath();
  g.arc(0, -0.29, 0.085, Math.PI * 1.05, Math.PI * 1.95);
  g.stroke();
  g.fillStyle = '#f2ead8';
  g.fillRect(-0.012, -0.12, 0.024, 0.07);
  g.fillStyle = '#ffe1a0';
  g.beginPath();
  g.ellipse(0, -0.145, 0.01, 0.024, 0, 0, 6.2832);
  g.fill();
}
e.light(0, -0.145, 0.12, '#ffd08a', 1, 'flame');
e.at(0, -0.15, 'lantern');
