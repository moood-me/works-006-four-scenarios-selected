// The stump in the clearing, where Grandmother sits to carve: an old grey stump (a form, lit as a volume), cracked, its
// top sawn flat long ago and weathered. The painting is it unrolled: the way round (1.8 m) across, from its top's edge
// (y -0.44) down to its foot. Its point `seat`. Metres; 0.42 m high.
const W = 0.9;
g.fillStyle = '#9b958c';
g.fillRect(-W, -0.44, 2 * W, 0.44);
g.strokeStyle = '#7d7871';
g.lineWidth = 0.012;
for (let i = 0; i < 26; i++) {
  const x = -W + 2 * W * e.rnd();
  g.beginPath();
  g.moveTo(x, -0.44);
  g.lineTo(x + (e.rnd() - 0.5) * 0.04, -0.44 + 0.2 + 0.24 * e.rnd());
  g.stroke();
}
g.fillStyle = '#6f7b57';
for (let i = 0; i < 10; i++) {
  g.beginPath();
  g.ellipse(-W + 2 * W * e.rnd(), -0.04 - 0.08 * e.rnd(), 0.06, 0.03, 0, 0, 6.2832);
  g.fill();
}
e.form(e.kit.revolve([[0, 0.42], [0.22, 0.42], [0.27, 0.4], [0.28, 0.1], [0.36, 0]]), { closed: 'u', ground: '#9b958c' });
e.at(0, -0.44, 'seat');
