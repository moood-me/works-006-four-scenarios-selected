// Papa's table top from above: worn pine boards running its length, and on it his work — loose sheets of drawing paper,
// one with a pencil sketch of the shore, a pencil, a bottle of ink, a cup ring. Metres from its middle, x across the
// table (the glazing on the left), y along it toward the viewer.
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
// the ink bottle, the cup ring
g.fillStyle = '#2e3a46';
g.beginPath();
g.arc(0.24, -0.55, 0.035, 0, 6.2832);
g.fill();
g.strokeStyle = 'rgba(120,96,70,0.35)';
g.lineWidth = 0.006;
g.beginPath();
g.arc(0.2, 0.5, 0.04, 0, 6.2832);
g.stroke();
