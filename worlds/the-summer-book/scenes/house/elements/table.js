// Papa's table top from above: worn pine boards running its length, and on it his work — loose sheets of drawing paper,
// one with a pencil sketch of the shore, a pencil, a bottle of ink — and his coffee cup on its saucer (the point `cup`);
// at supper (`supper`) the papers pushed to the far end, a linen runner, plates, bread on its board, butter, a jug of
// milk. Metres from its middle, x across the table (the glazing on the left), y along it toward the viewer.
const supper = !!e.state.supper;
g.fillStyle = '#b39b7b';
g.fillRect(-0.375, -0.75, 0.75, 1.5);
g.strokeStyle = 'rgba(120,98,72,0.45)';
g.lineWidth = 0.006;
for (const x of [-0.19, 0, 0.19]) {
  g.beginPath();
  g.moveTo(x, -0.75);
  g.lineTo(x, 0.75);
  g.stroke();
}
const sheet = (x, y, w, h, a) => {
  g.save();
  g.translate(x, y);
  g.rotate(a);
  g.fillStyle = '#f3f0e6';
  g.fillRect(-w / 2, -h / 2, w, h);
  g.restore();
};
const round = (x, y, r, color) => {
  g.fillStyle = color;
  g.beginPath();
  g.arc(x, y, r, 0, 6.2832);
  g.fill();
};
if (supper) {
  sheet(0, -0.55, 0.3, 0.38, 0.04);
  sheet(0.02, -0.56, 0.3, 0.38, -0.03);
  // the runner, the plates, the bread, the butter, the milk
  g.fillStyle = '#e9e4d6';
  g.fillRect(-0.3, -0.3, 0.6, 1.0);
  for (const [x, y] of [[-0.14, 0.35], [0.14, 0.05], [-0.14, -0.15]]) {
    round(x, y, 0.1, '#f4f3ee');
    round(x, y, 0.07, '#e6e4dc');
  }
  g.fillStyle = '#9c7b55';
  g.fillRect(0.02, 0.3, 0.22, 0.14);
  g.fillStyle = '#c99a62';
  g.beginPath();
  g.ellipse(0.13, 0.37, 0.09, 0.05, 0, 0, 6.2832);
  g.fill();
  g.fillStyle = '#f1e4a8';
  g.fillRect(-0.05, 0.12, 0.06, 0.04);
  round(0.24, -0.2, 0.045, '#f4f3ee');
  round(0.24, -0.2, 0.035, '#f8f7f2');
} else {
  sheet(-0.1, -0.35, 0.3, 0.42, 0.08);
  sheet(0.06, -0.05, 0.3, 0.42, -0.05);
  sheet(-0.14, 0.32, 0.21, 0.3, 0.2);
  // the sketch: the shore's line, the house
  g.strokeStyle = 'rgba(70,72,78,0.6)';
  g.lineWidth = 0.004;
  g.beginPath();
  g.moveTo(-0.07, 0.1);
  g.bezierCurveTo(0.0, 0.02, 0.08, 0.05, 0.18, -0.02);
  g.moveTo(-0.02, -0.12);
  g.lineTo(-0.02, -0.04);
  g.lineTo(0.06, -0.04);
  g.lineTo(0.06, -0.12);
  g.lineTo(0.02, -0.17);
  g.closePath();
  g.stroke();
  // the pencil
  g.fillStyle = '#4b4a4a';
  g.save();
  g.translate(0.16, 0.22);
  g.rotate(0.6);
  g.fillRect(-0.08, -0.004, 0.16, 0.008);
  g.restore();
}
// the ink bottle
round(0.24, -0.62, 0.035, '#2e3a46');
// his cup on its saucer, by his hand
round(0.22, 0.48, 0.07, '#ecebe6');
round(0.22, 0.48, 0.042, '#4c6478');
round(0.22, 0.48, 0.034, '#5a4030');
e.at(0.22, 0.48, 'cup');
