// Wrack the storm threw up on the rock (`weed`: the morning after): a ragged heap of bladderwrack, brown and olive,
// strands trailing from it, a few pale stalks. Metres from the middle of its foot; about 1.4 m long, low (copies lie
// along the waterline).
if (!e.state.weed) return;
const C = ['#4f4a2c', '#5d5631', '#3f3c26', '#6a6034', '#2f2e22'];
// the trailing strands
g.lineCap = 'round';
for (let i = 0; i < 14; i++) {
  const x = (e.rnd() - 0.5) * 1.1;
  g.strokeStyle = C[i % 5];
  g.lineWidth = 0.025 + 0.02 * e.rnd();
  g.beginPath();
  g.moveTo(x, -0.04);
  g.quadraticCurveTo(x + (e.rnd() - 0.5) * 0.5, -0.02, x + (e.rnd() - 0.5) * 0.9, 0.01);
  g.stroke();
}
// the heap: many small lumps, taller in the middle
for (let i = 0; i < 40; i++) {
  const u = e.rnd() - 0.5;
  const x = u * 0.9;
  const r = 0.03 + 0.06 * e.rnd() * (1 - Math.abs(u));
  g.fillStyle = C[i % 5];
  g.beginPath();
  g.ellipse(x, -0.03 - (0.12 * (1 - 2 * Math.abs(u))) * e.rnd(), r * 1.4, r, (e.rnd() - 0.5) * 1.2, 0, 6.2832);
  g.fill();
}
g.strokeStyle = '#a99d78';
g.lineWidth = 0.01;
for (let i = 0; i < 5; i++) {
  const x = (e.rnd() - 0.5) * 0.9;
  g.beginPath();
  g.moveTo(x, -0.03);
  g.quadraticCurveTo(x + 0.12, -0.12, x + 0.3, -0.07);
  g.stroke();
}
