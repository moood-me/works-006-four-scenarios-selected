// A boulder left on the bare rock: a low rounded lump of pinkish-grey granite (a form, lit as a volume), mottled, a few
// lichen rosettes, darker at its foot. The painting is the lump unrolled: the way round its rim (4.6 m) across, the slope
// from its top (y -1.2) down to the rim (y 0). Metres; about 0.8 m high, 1.7 m long (copies scale and flip it).
const W = 2.3;
const S = 1.2;
g.fillStyle = '#aaa098';
g.fillRect(-W, -S, 2 * W, S);
for (let i = 0; i < 70; i++) {
  g.fillStyle = e.rnd() < 0.5 ? 'rgba(196,186,176,0.45)' : 'rgba(140,130,122,0.35)';
  g.beginPath();
  g.ellipse((e.rnd() - 0.5) * 2 * W, -e.rnd() * S, 0.05 + 0.15 * e.rnd(), 0.03 + 0.08 * e.rnd(), 0, 0, 6.2832);
  g.fill();
}
const LICHEN = ['#cdb46a', '#d9d6c6', '#97a184'];
for (let i = 0; i < 14; i++) {
  g.fillStyle = LICHEN[i % 3];
  g.beginPath();
  g.ellipse((e.rnd() - 0.5) * 2 * W, -0.15 - 0.8 * e.rnd(), 0.03 + 0.04 * e.rnd(), 0.025 + 0.03 * e.rnd(), 0, 0, 6.2832);
  g.fill();
}
const foot = g.createLinearGradient(0, -0.3, 0, 0);
foot.addColorStop(0, 'rgba(110,104,98,0)');
foot.addColorStop(1, 'rgba(110,104,98,0.5)');
g.fillStyle = foot;
g.fillRect(-W, -0.3, 2 * W, 0.3);
// its rim on the level, round counter-clockwise from above, a little uneven
const rim = [];
for (let k = 0; k < 12; k++) {
  const a = (k / 12) * 6.2832;
  const r = 0.9 + 0.18 * e.rnd();
  rim.push([0.85 * r * Math.cos(a), -0.6 * r * Math.sin(a)]);
}
e.form(e.kit.lump(rim, 0.8, 3), { closed: 'u', ground: '#aaa098' });
