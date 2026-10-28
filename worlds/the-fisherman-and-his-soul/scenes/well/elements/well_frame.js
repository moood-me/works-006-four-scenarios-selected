// Over the well: two rough posts, a crossbeam with a windlass, the rope down to a wooden bucket hanging in the shaft
// — the bucket a layer that sways a little on its rope (animate). Metres, the well's centre at the origin
g.fillStyle = '#54432f';
for (const x of [-0.84, 0.84]) g.fillRect(x - 0.06, -2.15, 0.12, 2.15);
g.fillStyle = '#3e3124';
for (const x of [-0.84, 0.84]) g.fillRect(x + 0.02, -2.15, 0.04, 2.15);
g.fillStyle = '#5f4c36';
g.fillRect(-1.0, -2.25, 2.0, 0.1);
// the windlass and its crank
g.fillStyle = '#4c3c2a';
g.fillRect(-0.7, -1.98, 1.4, 0.12);
g.strokeStyle = '#2b2622';
g.lineWidth = 0.025;
g.beginPath();
g.moveTo(0.84, -1.92);
g.lineTo(1.02, -1.92);
g.lineTo(1.02, -1.74);
g.stroke();
e.layer('bucket', { pivot: [0.05, -1.88], box: [-0.2, -1.9, 0.3, -1.0] }, g => {
  g.strokeStyle = '#8c7a5c';
  g.lineWidth = 0.015;
  g.beginPath();
  g.moveTo(0.05, -1.88);
  g.lineTo(0.05, -1.32);
  g.stroke();
  g.fillStyle = '#5a4630';
  g.beginPath();
  g.moveTo(-0.09, -1.3);
  g.lineTo(0.19, -1.3);
  g.lineTo(0.16, -1.08);
  g.lineTo(-0.06, -1.08);
  g.closePath();
  g.fill();
  g.fillStyle = '#2f2a26';
  g.fillRect(-0.085, -1.27, 0.27, 0.025);
  g.fillRect(-0.07, -1.14, 0.24, 0.025);
});
