// The low granite boulder Grandmother sits on, worn round, a little lichen on it: a form (a lump), its painting the
// way round it (u) by the slope from its top (v 0) to its rim (v 1). About 1 m across, 0.45 m high.
g.fillStyle = '#aaa098';
g.fillRect(-1.6, -0.75, 3.2, 0.75);
for (let i = 0; i < 40; i++) {
  g.globalAlpha = 0.4;
  g.fillStyle = e.rnd() < 0.5 ? '#bdb3aa' : '#968d86';
  g.beginPath();
  g.ellipse(-1.6 + 3.2 * e.rnd(), -0.75 * e.rnd(), 0.05 + 0.12 * e.rnd(), 0.03 + 0.06 * e.rnd(), 0, 0, 6.2832);
  g.fill();
}
const LICHEN = ['#cdb46a', '#d9d6c6', '#97a184'];
g.globalAlpha = 0.8;
for (let i = 0; i < 14; i++) {
  g.fillStyle = LICHEN[i % 3];
  g.beginPath();
  g.arc(-1.6 + 3.2 * e.rnd(), -0.6 * e.rnd() - 0.1, 0.02 + 0.04 * e.rnd(), 0, 6.2832);
  g.fill();
}
g.globalAlpha = 1;
const rim = [];
for (let k = 0; k < 14; k++) {
  const a = (2 * Math.PI * k) / 14;
  rim.push([0.55 * Math.cos(a), -0.42 * Math.sin(a)]);
}
e.form(e.kit.lump(rim, 0.45, 3), { closed: 'u' });
