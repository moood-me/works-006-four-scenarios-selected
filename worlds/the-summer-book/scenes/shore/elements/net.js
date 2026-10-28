// Papa's net (`net`: he is at it this evening): a heap of brown cotton net with cork floats on the rock at his feet by
// the two stones at the pier's root, a length of it drawn out toward his knees, tangled (the layer `tangle`: it loosens
// as `knot` goes to 1 — the mini-game's). Metres from the middle of its foot; about 1.4 m along. Point: `knot` (the
// tangle in the length drawn out, where hands work it).
if (!e.state.net) return;
g.fillStyle = '#6e5a44';
g.beginPath();
g.moveTo(-0.7, 0);
g.bezierCurveTo(-0.65, -0.2, -0.3, -0.32, 0, -0.3);
g.bezierCurveTo(0.3, -0.3, 0.55, -0.18, 0.6, 0);
g.closePath();
g.fill();
g.strokeStyle = 'rgba(170,150,120,0.55)';
g.lineWidth = 0.008;
for (let x = -0.65; x < 0.6; x += 0.05) {
  g.beginPath();
  g.moveTo(x, 0);
  g.lineTo(x + 0.12, -0.28);
  g.moveTo(x, 0);
  g.lineTo(x - 0.12, -0.28);
  g.stroke();
}
// the length drawn out, hanging in loose loops
g.strokeStyle = 'rgba(110,90,68,0.85)';
g.lineWidth = 0.02;
for (let k = 0; k < 4; k++) {
  g.beginPath();
  g.moveTo(0.4, -0.2 + k * 0.04);
  g.quadraticCurveTo(0.9, -0.5 + k * 0.05, 1.3, -0.1 + k * 0.03);
  g.stroke();
}
g.fillStyle = '#c99a5a';
for (const [x, y] of [[-0.45, -0.16], [-0.1, -0.27], [0.25, -0.22], [0.8, -0.38], [1.15, -0.22]]) {
  g.beginPath();
  g.ellipse(x, y, 0.05, 0.03, 0.3, 0, 6.2832);
  g.fill();
}
// the tangle: a knotted clot in the length drawn out
e.layer('tangle', {}, c => {
  c.strokeStyle = 'rgba(92,72,52,0.95)';
  c.lineWidth = 0.014;
  for (let i = 0; i < 18; i++) {
    const a = e.rnd() * 6.28;
    c.beginPath();
    c.ellipse(0.85 + 0.05 * Math.cos(a), -0.42 + 0.03 * Math.sin(a), 0.09, 0.05, a, 0, 6.2832);
    c.stroke();
  }
});
e.at(0.85, -0.42, 'knot');
