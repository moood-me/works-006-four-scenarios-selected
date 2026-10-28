// The other side of the island, far off past the house: a low granite shore, the grey wind-bent trees of the dead
// forest on it, and over them the new house — its steep black roof and the top of its white gable, new, with big
// black windows: no one there all summer. Painted flat, as far things are. Metres from the middle of its foot at the
// waterline; 22 m wide. Point: `roof`.
// the rock along the water
g.fillStyle = '#9a928b';
g.beginPath();
g.moveTo(-11, 0.6);
g.bezierCurveTo(-8, -1.2, 6, -1.6, 11, 0.6);
g.closePath();
g.fill();
// the new house, its gable to us
g.fillStyle = '#ecebe6';
g.beginPath();
g.moveTo(-1.6, -1.5);
g.lineTo(-1.6, -5.4);
g.lineTo(1.0, -7.6);
g.lineTo(3.6, -5.4);
g.lineTo(3.6, -1.5);
g.closePath();
g.fill();
g.fillStyle = '#25282d';
g.beginPath();
g.moveTo(-2.4, -5.0);
g.lineTo(1.0, -8.1);
g.lineTo(4.4, -5.0);
g.lineTo(3.9, -5.0);
g.lineTo(1.0, -7.55);
g.lineTo(-1.9, -5.0);
g.closePath();
g.fill();
g.fillStyle = '#1f2327';
g.fillRect(-1.0, -4.6, 1.3, 1.6);
g.fillRect(1.7, -4.6, 1.3, 1.6);
g.fillRect(0.6, -6.6, 0.8, 0.7);
// the dead forest before it: grey crooked crowns, darker low
const tree = (x, h, w) => {
  g.fillStyle = '#7d7f78';
  g.fillRect(x - 0.08, -h, 0.16, h);
  g.fillStyle = '#6b706a';
  g.beginPath();
  g.ellipse(x + 0.3, -h, w, w * 0.35, -0.15, 0, 6.2832);
  g.fill();
};
for (let i = 0; i < 18; i++) {
  const x = -10 + 20 * e.rnd();
  if (x > -1.8 && x < 3.8) tree(x, 3.2 + 1.4 * e.rnd(), 0.9 + 0.6 * e.rnd());
  else tree(x, 2.2 + 2.6 * e.rnd(), 1.0 + 0.8 * e.rnd());
}
g.fillStyle = '#5f645e';
g.beginPath();
g.moveTo(-10.5, -0.4);
for (let x = -10.5; x <= 10.5; x += 0.7) g.lineTo(x, -1.2 - 0.6 * e.rnd());
g.lineTo(10.5, -0.4);
g.closePath();
g.fill();
e.at(1.0, -6.4, 'roof');
