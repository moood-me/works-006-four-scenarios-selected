// The little wooden footbridge over the stream, side-on: a low hump of grey boards on two beams, a handrail on posts,
// its feet on either bank. Metres from its middle at the banks' height.
g.fillStyle = '#7d6a54';
g.beginPath();
g.moveTo(-1.55, 0.1);
g.quadraticCurveTo(0, -0.62, 1.55, 0.1);
g.lineTo(1.55, 0.22);
g.quadraticCurveTo(0, -0.46, -1.55, 0.22);
g.closePath();
g.fill();
g.fillStyle = '#a3917a';
g.beginPath();
g.moveTo(-1.6, 0.04);
g.quadraticCurveTo(0, -0.7, 1.6, 0.04);
g.lineTo(1.6, 0.1);
g.quadraticCurveTo(0, -0.62, -1.6, 0.1);
g.closePath();
g.fill();
// the handrail on its posts
g.strokeStyle = '#8a7660';
g.lineWidth = 0.05;
g.lineCap = 'round';
const deck = x => -0.33 * (1 - (x / 1.6) ** 2) + 0.04;
for (const x of [-1.4, -0.7, 0, 0.7, 1.4]) {
  g.beginPath();
  g.moveTo(x, deck(x));
  g.lineTo(x, deck(x) - 0.7);
  g.stroke();
}
g.beginPath();
for (let x = -1.4; x <= 1.41; x += 0.1) {
  if (x === -1.4) g.moveTo(x, deck(x) - 0.7);
  else g.lineTo(x, deck(x) - 0.7);
}
g.stroke();
