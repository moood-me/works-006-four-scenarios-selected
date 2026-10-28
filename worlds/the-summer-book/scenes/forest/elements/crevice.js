// A granite boulder by the clearing with a deep crack in it, where Sophia hides the packet (`pack`: none — the crack
// empty; in — the packet of cigarettes pushed in, its corner showing; taken — gone again, the moss at its mouth
// scuffed). A form, lit as a volume: the painting is the boulder unrolled, the way round (3 m) across, its top (y -0.7)
// down to its rim; its front, with the crack, in the middle. Its point `pack` (the crack's mouth). Metres; 0.65 m high.
const W = 1.5;
const S = 0.7;
const pack = e.state.pack ?? 'none';
g.fillStyle = '#a69d95';
g.fillRect(-W, -S, 2 * W, S);
for (let i = 0; i < 40; i++) {
  g.fillStyle = e.rnd() < 0.5 ? 'rgba(194,184,174,0.5)' : 'rgba(132,124,116,0.4)';
  g.beginPath();
  g.ellipse((e.rnd() - 0.5) * 2 * W, -e.rnd() * S, 0.04 + 0.12 * e.rnd(), 0.03 + 0.06 * e.rnd(), 0, 0, 6.2832);
  g.fill();
}
for (let i = 0; i < 9; i++) {
  g.fillStyle = i % 2 ? '#cdb46a' : '#97a184';
  g.beginPath();
  g.ellipse((e.rnd() - 0.5) * 2 * W, -0.15 - 0.45 * e.rnd(), 0.04, 0.03, 0, 0, 6.2832);
  g.fill();
}
// the crack, down the front
g.fillStyle = '#3f3c39';
g.beginPath();
g.moveTo(-0.04, -0.62);
g.lineTo(0.05, -0.6);
g.lineTo(0.09, -0.2);
g.lineTo(0.03, -0.05);
g.lineTo(-0.02, -0.2);
g.closePath();
g.fill();
if (pack === 'in') {
  g.fillStyle = '#e8e2d2';
  g.fillRect(0.0, -0.34, 0.06, 0.05);
  g.fillStyle = '#b8452f';
  g.fillRect(0.0, -0.34, 0.06, 0.015);
}
if (pack === 'taken') {
  g.fillStyle = 'rgba(110,100,86,0.6)';
  g.beginPath();
  g.ellipse(0.03, -0.05, 0.16, 0.04, 0, 0, 6.2832);
  g.fill();
}
const rim = [];
for (let k = 0; k < 12; k++) {
  const a = (k / 12) * 6.2832;
  rim.push([0.55 * Math.cos(a), -0.4 * Math.sin(a)]);
}
e.form(e.kit.lump(rim, 0.65, 0), { closed: 'u', ground: '#a69d95' });
e.at(0.04, -0.32, 'pack');
