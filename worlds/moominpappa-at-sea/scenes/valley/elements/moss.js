// The moss under the apple tree, from above (1.4 m by 1.0): soft green, a few fallen apples — or, while the little
// fire smoulders in it (`moss` "smoulder"), a ring of brown-singed moss round a glowing red-grey heart, its ember's
// light (`moss#ember`); or, put out ("burnt"), a small black spot. Its point `moss#fire`: where the smoke rises.
const m = e.state.moss ?? 'green';
const blot = (x, y, r, rgb, a) => {
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(${rgb}, ${a})`);
  s.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = s;
  g.fillRect(x - r, y - r, 2 * r, 2 * r);
};
blot(0, 0, 0.62, '92, 128, 60', 0.95);
for (let i = 0; i < 70; i++) {
  const a = e.rnd() * Math.PI * 2, r = 0.5 * e.rnd() ** 0.6;
  g.fillStyle = e.rnd() < 0.5 ? 'rgba(120, 156, 70, 0.8)' : 'rgba(70, 104, 50, 0.8)';
  g.beginPath();
  g.arc(Math.cos(a) * r * 1.2, Math.sin(a) * r * 0.8, 0.02 + 0.03 * e.rnd(), 0, Math.PI * 2);
  g.fill();
}
for (const [x, y] of [[-0.42, 0.18], [0.36, -0.22]]) {
  g.fillStyle = '#b8402e';
  g.beginPath();
  g.arc(x, y, 0.035, 0, Math.PI * 2);
  g.fill();
}
if (m === 'smoulder') {
  blot(0.05, 0.02, 0.22, '120, 84, 46', 0.9);
  blot(0.05, 0.02, 0.09, '210, 80, 40', 0.95);
  blot(0.05, 0.02, 0.04, '255, 190, 110', 1);
} else if (m === 'burnt') {
  blot(0.05, 0.02, 0.2, '40, 34, 30', 0.95);
  blot(0.05, 0.02, 0.28, '96, 80, 58', 0.5);
}
// the ember's light: shines only while it smoulders (its light's `on` is the grey smoke's share)
e.light(0.05, 0.02, 0.12, '#ff8a3a', 0.8, 'ember');
e.at(0.05, 0.02, 'fire');
