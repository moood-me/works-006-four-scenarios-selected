// The gate on the path from the porch down to the rock: two grey posts, a small picket gate of weathered boards
// standing a little open, a stub of fence either side going into the heather; beside it on the right a flat grey stone
// to sit on. Metres from the middle of its foot; the gate 0.9 m wide, the posts 1.1 m. Points: `gate` (its latch),
// `stone` (the stone's top, where one sits).
const POST = '#8a837a';
const BOARD = '#b3ab9f';
// the fence stubs
g.fillStyle = BOARD;
for (const [x0, x1] of [[-1.6, -0.55], [0.55, 1.2]]) {
  g.fillRect(x0, -0.75, x1 - x0, 0.06);
  g.fillRect(x0, -0.35, x1 - x0, 0.06);
  for (let x = x0 + 0.05; x < x1; x += 0.16) g.fillRect(x, -0.85, 0.07, 0.85);
}
// the posts
g.fillStyle = POST;
g.fillRect(-0.55, -1.1, 0.1, 1.12);
g.fillRect(0.45, -1.1, 0.1, 1.12);
// the gate, a little open: narrower, as seen swung in
g.fillStyle = BOARD;
g.fillRect(-0.45, -0.72, 0.62, 0.06);
g.fillRect(-0.45, -0.3, 0.62, 0.06);
for (let x = -0.43; x < 0.15; x += 0.12) g.fillRect(x, -0.86, 0.065, 0.84);
g.fillStyle = '#5b554e';
g.fillRect(0.1, -0.56, 0.06, 0.04);
// the stone
g.fillStyle = '#9b938b';
g.beginPath();
g.moveTo(1.3, 0.02);
g.bezierCurveTo(1.3, -0.3, 1.55, -0.42, 1.85, -0.42);
g.bezierCurveTo(2.15, -0.42, 2.35, -0.3, 2.35, 0.02);
g.closePath();
g.fill();
g.fillStyle = '#aca59c';
g.beginPath();
g.ellipse(1.84, -0.38, 0.38, 0.05, 0, 0, 6.2832);
g.fill();
e.at(0.13, -0.55, 'gate');
e.at(1.84, -0.42, 'stone');
