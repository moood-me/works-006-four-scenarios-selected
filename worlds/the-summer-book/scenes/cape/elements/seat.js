// A low stone to sit on (a form, lit as a volume): halfway down the path, and behind the tent. The painting is the
// lump unrolled: the way round its rim (2.4 m) across, the slope from its top (y -0.45) down to the rim (y 0).
// Metres; 0.42 m high. Its point `seat` — the middle of its top.
const W = 1.2;
const S = 0.45;
g.fillStyle = '#a39a92';
g.fillRect(-W, -S, 2 * W, S);
for (let i = 0; i < 30; i++) {
  g.fillStyle = e.rnd() < 0.5 ? 'rgba(190,180,170,0.5)' : 'rgba(132,124,116,0.4)';
  g.beginPath();
  g.ellipse((e.rnd() - 0.5) * 2 * W, -e.rnd() * S, 0.03 + 0.08 * e.rnd(), 0.02 + 0.04 * e.rnd(), 0, 0, 6.2832);
  g.fill();
}
g.fillStyle = '#cdb46a';
for (let i = 0; i < 6; i++) {
  g.beginPath();
  g.ellipse((e.rnd() - 0.5) * 2 * W, -0.1 - 0.25 * e.rnd(), 0.025, 0.02, 0, 0, 6.2832);
  g.fill();
}
const rim = [];
for (let k = 0; k < 10; k++) {
  const a = (k / 10) * 6.2832;
  rim.push([0.42 * Math.cos(a), -0.34 * Math.sin(a)]);
}
e.form(e.kit.lump(rim, 0.42, 0), { closed: 'u', ground: '#a39a92' });
e.at(0, -S, 'seat');
