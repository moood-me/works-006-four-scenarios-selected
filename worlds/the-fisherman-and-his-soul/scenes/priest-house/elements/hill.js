// The hill outside the door, seen from above (its centre 31.5 m ahead; x across, y toward the viewer — a point
// `distance` ahead is at y = 31.5 − distance): short sea-grass in patches, falling away to the shore (the relief), and a
// trodden path from the threshold (0.45 m right, 6.45 m ahead) down the slope
const Y = d => 31.5 - d;
g.fillStyle = '#4f5e45';
g.fillRect(-70, -25, 140, 50);
for (let i = 0; i < 700; i++) {
  const x = -70 + 140 * e.anim.hash(i, 1);
  const y = -25 + 50 * e.anim.hash(i, 2);
  const r = 0.3 + 1.6 * e.anim.hash(i, 3);
  g.fillStyle = e.anim.hash(i, 4) > 0.5 ? 'rgba(104, 118, 82, 0.4)' : 'rgba(52, 64, 46, 0.35)';
  g.beginPath();
  g.ellipse(x, y, r * 1.6, r, 0, 0, Math.PI * 2);
  g.fill();
}
// the path: pale trodden earth, curving a little to the right as it goes down
g.strokeStyle = '#8e8270';
g.lineCap = 'round';
g.lineWidth = 0.7;
g.beginPath();
g.moveTo(0.45, Y(6.45));
g.bezierCurveTo(0.6, Y(10), 1.6, Y(14), 2.8, Y(22));
g.lineTo(4.5, Y(34));
g.stroke();
