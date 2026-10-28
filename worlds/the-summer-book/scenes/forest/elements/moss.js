// The clearing's ground, draped over the relief, seen from above: a carpet of moss, grey-green and soft, with the grey
// granite showing through in smooth backs, lichen on it, dry needles and twigs; drier and yellower at the end of July
// (`late`). The red beetle in the moss by the stump (its point `beetle`). Metres; the plane's middle at across 0,
// distance 30: a point (x, z) of the world is (x, 30 - z) here.
const late = e.state.late ?? 0;
const X = x => x;
const Y = z => 30 - z;
const blob = (x, z, rx, rz, color, alpha) => {
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(X(x), Y(z), rx, rz, 0, 0, 6.2832);
  g.fill();
};
g.globalAlpha = 1;
g.fillStyle = late > 0.5 ? '#97937a' : '#878d78';
g.fillRect(-40, -45, 80, 90);
// the moss: soft patches, lighter and darker
const MOSS = late > 0.5 ? ['#a5a07e', '#8c896a', '#aaa58c', '#83806a'] : ['#949b7e', '#7a8268', '#a2a68e', '#7c846c'];
for (let i = 0; i < 700; i++) {
  const x = -40 + 80 * e.rnd();
  const z = -12 + 84 * e.rnd() ** 1.3;
  blob(x, z, 0.2 + 0.9 * e.rnd(), 0.15 + 0.6 * e.rnd(), MOSS[i % 4], 0.6);
}
// granite backs breaking through the moss
for (let i = 0; i < 70; i++) {
  const x = -30 + 60 * e.rnd();
  const z = -6 + 60 * e.rnd();
  if (Math.hypot(x - 0.4, z - 4) < 2.2) continue;
  const rx = 0.6 + 2.2 * e.rnd();
  const rz = 0.4 + 1.4 * e.rnd();
  blob(x, z, rx, rz, '#a39c94', 0.95);
  blob(x - rx * 0.2, z + rz * 0.15, rx * 0.6, rz * 0.5, '#b3aca4', 0.6);
  for (let k = 0; k < 4; k++) blob(x + (e.rnd() - 0.5) * rx, z + (e.rnd() - 0.5) * rz, 0.06 + 0.1 * e.rnd(), 0.05 + 0.07 * e.rnd(), k % 2 ? '#cdb46a' : '#d9d6c6', 0.8);
}
// dry needles and twigs
g.globalAlpha = 0.7;
g.strokeStyle = '#8a7a62';
g.lineCap = 'round';
for (let i = 0; i < 260; i++) {
  const x = -14 + 28 * e.rnd();
  const z = -4 + 24 * e.rnd();
  const a = e.rnd() * 3.14;
  const l = 0.06 + 0.25 * e.rnd();
  g.lineWidth = 0.01 + 0.012 * e.rnd();
  g.beginPath();
  g.moveTo(X(x), Y(z));
  g.lineTo(X(x + Math.cos(a) * l), Y(z + Math.sin(a) * l));
  g.stroke();
}
// the beetle: small and red, its black head and spots, on the moss by the stump
g.globalAlpha = 1;
blob(1.45, 3.05, 0.03, 0.022, '#c0352b', 1);
blob(1.48, 3.05, 0.012, 0.012, '#222020', 1);
blob(1.43, 3.06, 0.006, 0.006, '#222020', 1);
blob(1.44, 3.04, 0.006, 0.006, '#222020', 1);
e.at(X(1.45), Y(3.05), 'beetle');
g.globalAlpha = 1;
