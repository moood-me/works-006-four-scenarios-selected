// The valley's land from above (the plane's metres: x across, y toward the viewer; its centre at across 149, distance
// 130), draped over the relief: the garden's grass at the end of August — green going ochre, a lighter mown lawn before
// the house, a bed of late flowers along the veranda, wild flowers in the meadow; the sandy path from the veranda's
// steps over the bridge and down to the jetty; the stream's banks darker, with reeds; the strip of beach on the left,
// dune grass along its top, wet sand at the water; behind, the hills — fields in patches, woods — fading to blue.
const CA = 149, CD = 130, L = e.lib, at = (a, d) => [a - CA, CD - d];
const blot = (a, d, r, rgb, alpha, sx) => {
  const [x, y] = at(a, d), s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(${rgb}, ${alpha})`);
  s.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = s;
  g.save();
  g.translate(x, y);
  g.scale(sx ?? 1, 1);
  g.translate(-x, -y);
  g.fillRect(x - r, y - r, 2 * r, 2 * r);
  g.restore();
};
const line = (pts, width, color) => {
  g.strokeStyle = color;
  g.lineWidth = width;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  pts.forEach(([a, d], i) => {
    const [x, y] = at(a, d);
    if (i) g.lineTo(x, y);
    else g.moveTo(x, y);
  });
  g.stroke();
};
// the grass, nearer greener, the hills farther bluer and paler
const base = g.createLinearGradient(0, at(0, 0)[1], 0, at(0, 260)[1]);
base.addColorStop(0, '#8fa862');
base.addColorStop(0.12, '#97a964');
base.addColorStop(0.35, '#8c9d62');
base.addColorStop(1, '#93a183');
g.fillStyle = base;
g.fillRect(-165, -130, 330, 260);
// the hills: fields in patches (stubble ochre, late green, a yellow one), woods dark between them
for (let i = 0; i < 46; i++) {
  const a = -4 + 300 * e.rnd() ** 1.2, d = 40 + 200 * e.rnd(), [x, y] = at(a, d), k = e.rnd();
  g.save();
  g.translate(x, y);
  g.rotate((e.rnd() - 0.5) * 0.8);
  g.fillStyle = k < 0.4 ? 'rgba(206, 182, 112, 0.6)' : k < 0.7 ? 'rgba(160, 172, 92, 0.55)' : 'rgba(222, 202, 120, 0.5)';
  g.fillRect(-8 - 10 * e.rnd(), -5 - 6 * e.rnd(), 16 + 14 * e.rnd(), 10 + 10 * e.rnd());
  g.restore();
}
for (let i = 0; i < 60; i++) {
  const a = -8 + 300 * e.rnd() ** 1.3, d = 34 + 210 * e.rnd();
  blot(a, d, 5 + 9 * e.rnd(), e.rnd() < 0.5 ? '58, 82, 54' : '74, 96, 58', 0.55, 1.6);
}
// the meadow: drifts of ochre (dry grass) and deeper green
for (let i = 0; i < 40; i++) {
  const a = -10 + 26 * e.rnd(), d = 3 + 30 * e.rnd();
  blot(a, d, 1.5 + 3 * e.rnd(), e.rnd() < 0.55 ? '196, 178, 104' : '104, 138, 72', 0.4);
}
// the mown lawn before the house, lighter
blot(5.5, 13, 6.5, '170, 192, 116', 0.55, 1.4);
// the beach: sand from the meadow's edge down to the water, the wet sand darker; dune grass along its top
const coastAt = (s, d) => -(s + 0.9 * Math.sin(d * 0.13) + 0.5 * Math.sin(d * 0.05 + 1));
const strip = (s0, s1, fill) => {
  g.fillStyle = fill;
  g.beginPath();
  for (let d = -2; d <= 262; d += 2) {
    const [x, y] = at(coastAt(s0, d), d);
    if (d === -2) g.moveTo(x, y);
    else g.lineTo(x, y);
  }
  for (let d = 262; d >= -2; d -= 2) {
    const [x, y] = at(coastAt(s1, d), d);
    g.lineTo(x, y);
  }
  g.closePath();
  g.fill();
};
strip(7.6, 8.4, 'rgba(206, 196, 150, 0.6)');
strip(8.2, 12.2, '#ded0a8');
strip(12.2, 16, '#b9ad8c');
g.lineCap = 'round';
for (let i = 0; i < 260; i++) {
  const d = 2 + 120 * e.rnd() ** 1.3, s = 7.8 + 1.4 * e.rnd(), [x, y] = at(coastAt(s, d), d);
  g.strokeStyle = e.rnd() < 0.5 ? 'rgba(122, 138, 82, 0.8)' : 'rgba(170, 160, 96, 0.8)';
  g.lineWidth = 0.03;
  for (let j = 0; j < 4; j++) {
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + (e.rnd() - 0.5) * 0.4, y - 0.2 - 0.25 * e.rnd());
    g.stroke();
  }
}
// the stream's banks: lusher, darker green, reeds at the water
for (const side of [-1, 1]) {
  g.fillStyle = 'rgba(70, 104, 62, 0.55)';
  const [x0, y0] = at(L.STREAM_A + side * 0.6, 34), [x1, y1] = at(L.STREAM_A + side * 1.6, -1);
  g.fillRect(Math.min(x0, x1), y0, Math.abs(x1 - x0), y1 - y0);
  for (let i = 0; i < 90; i++) {
    const d = 32 * e.rnd(), [x, y] = at(L.STREAM_A + side * (0.7 + 0.35 * e.rnd()), d);
    g.strokeStyle = e.rnd() < 0.6 ? 'rgba(60, 90, 54, 0.9)' : 'rgba(132, 140, 70, 0.9)';
    g.lineWidth = 0.035;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + (e.rnd() - 0.5) * 0.2, y - 0.3 - 0.3 * e.rnd());
    g.stroke();
  }
}
// the path: from the veranda's steps across the garden, over the bridge, down the meadow to the jetty
const PATH = [[7.0, 13.5], [4.6, 12.3], [1.4, 11.7], [-1.6, 9.9], [-3.4, 8.3], [-5.9, 8.0], [-7.4, 11], [-9.2, 16], [-10.6, 21], [-11.8, 24]];
line(PATH, 0.95, 'rgba(150, 130, 84, 0.5)');
line(PATH, 0.75, '#d6c393');
line(PATH, 0.3, 'rgba(232, 214, 168, 0.8)');
// the flower beds: along the veranda's front, and a round one in the lawn
const flowers = (a0, d0, a1, d1, n) => {
  for (let i = 0; i < n; i++) {
    const [x, y] = at(a0 + (a1 - a0) * e.rnd(), d0 + (d1 - d0) * e.rnd()), k = e.rnd();
    g.fillStyle = k < 0.3 ? '#c8463a' : k < 0.55 ? '#e8b83a' : k < 0.75 ? '#7a6ab8' : k < 0.88 ? '#f2eee2' : '#d47aa0';
    g.beginPath();
    g.arc(x, y, 0.025 + 0.03 * e.rnd(), 0, Math.PI * 2);
    g.fill();
  }
};
blot(7.5, 13.55, 2.6, '88, 112, 56', 0.7, 1);
flowers(5.1, 13.25, 9.8, 13.85, 110);
blot(3.6, 12.6, 0.9, '88, 112, 56', 0.8);
flowers(3.0, 12.1, 4.2, 13.1, 50);
// the grass near: short strokes, green and ochre, and wild flowers in it
g.lineWidth = 0.025;
for (let i = 0; i < 1500; i++) {
  const a = -9 + 23 * e.rnd(), d = 3 + 22 * e.rnd() ** 1.2;
  if (L.coast(a, d) > 7.6 || Math.abs(a - L.STREAM_A) < 0.8) continue;
  const [x, y] = at(a, d), k = e.rnd();
  g.strokeStyle = k < 0.45 ? 'rgba(96, 128, 64, 0.7)' : k < 0.75 ? 'rgba(178, 176, 98, 0.7)' : 'rgba(132, 160, 84, 0.7)';
  g.beginPath();
  g.moveTo(x, y);
  g.lineTo(x + (e.rnd() - 0.5) * 0.12, y - 0.12 - 0.1 * e.rnd());
  g.stroke();
}
for (let i = 0; i < 260; i++) {
  const a = -8 + 21 * e.rnd(), d = 3 + 26 * e.rnd();
  if (L.coast(a, d) > 7.6 || Math.abs(a - L.STREAM_A) < 0.8) continue;
  const [x, y] = at(a, d), k = e.rnd();
  g.fillStyle = k < 0.4 ? '#f1ecd8' : k < 0.7 ? '#e6c24a' : '#8f7cc4';
  g.beginPath();
  g.arc(x, y, 0.03 + 0.03 * e.rnd(), 0, Math.PI * 2);
  g.fill();
}
