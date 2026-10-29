// Her body wrapped in his net on the sand (4.8, `bundle`): a long bundle lying, the net's brown mesh over a pale shape,
// cork floats, the rope at its landward end (point `rope` — where his hands pull); the script moves it up the sand to the
// field's edge as `drag` goes 0 → 1 (bundle_a, bundle_d). Metres, its middle's foot at the origin, its side toward the
// shore's view (x −1 its landward end)
if (!e.state.bundle) return;
const hole = e.state.net_hole ?? 0;
g.fillStyle = '#c9d4cf';
g.beginPath();
g.ellipse(0, -0.16, 0.85, 0.16, 0, 0, Math.PI * 2);
g.fill();
g.fillStyle = 'rgba(86, 68, 50, 0.85)';
g.beginPath();
g.ellipse(0, -0.17, 0.9, 0.19, 0, 0, Math.PI * 2);
g.fill();
g.strokeStyle = 'rgba(200, 212, 206, 0.7)';
g.lineWidth = 0.01;
for (let x = -0.85; x <= 0.85; x += 0.09) {
  g.beginPath();
  g.moveTo(x, -0.34);
  g.lineTo(x + 0.06, 0);
  g.moveTo(x + 0.06, -0.34);
  g.lineTo(x, 0);
  g.stroke();
}
if (hole >= 2) {
  g.fillStyle = '#c9d4cf';
  g.beginPath();
  g.ellipse(0.35, -0.2, 0.18, 0.1, 0, 0, Math.PI * 2);
  g.fill();
}
g.fillStyle = '#d8c79a';
for (let i = 0; i < 5; i++) {
  g.beginPath();
  g.ellipse(-0.7 + 0.35 * i, -0.33, 0.04, 0.025, 0, 0, Math.PI * 2);
  g.fill();
}
g.strokeStyle = '#8a6a48';
g.lineWidth = 0.03;
g.beginPath();
g.moveTo(-0.88, -0.18);
g.quadraticCurveTo(-1.05, -0.3, -1.15, -0.5);
g.stroke();
e.at(-1.15, -0.5, 'rope');
