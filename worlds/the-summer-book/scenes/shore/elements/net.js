// Papa's net (`net`: he is at it this evening): a heap of brown cotton net with cork floats on the pier by the boat,
// a length of it drawn up over his knees and hanging over the boat's gunwale, tangled. Metres from the middle of its foot
// on the deck; about 1.4 m along. Point: `knot` (the tangle in the length drawn out, where hands work it).
if (!e.state.net) return;
g.fillStyle = '#6e5a44';
g.beginPath();
g.moveTo(-0.7, 0);
g.bezierCurveTo(-0.65, -0.2, -0.3, -0.32, 0, -0.3);
g.bezierCurveTo(0.3, -0.3, 0.55, -0.18, 0.6, 0);
g.closePath();
g.fill();
// the mesh: a fine lighter lattice over the heap
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
// the length drawn out to the right and over toward the boat, hanging
g.strokeStyle = 'rgba(110,90,68,0.85)';
g.lineWidth = 0.02;
for (let k = 0; k < 4; k++) {
  g.beginPath();
  g.moveTo(0.4, -0.2 + k * 0.04);
  g.quadraticCurveTo(0.9, -0.55 + k * 0.05, 1.3, -0.1 + k * 0.03);
  g.stroke();
}
// the floats
g.fillStyle = '#c99a5a';
for (const [x, y] of [[-0.45, -0.16], [-0.1, -0.27], [0.25, -0.22], [0.8, -0.42], [1.15, -0.25]]) {
  g.beginPath();
  g.ellipse(x, y, 0.05, 0.03, 0.3, 0, 6.2832);
  g.fill();
}
e.at(0.85, -0.45, 'knot');
