// The lighthouse's island seen from the sea, side-on: low backs of pink granite rising to the knoll where the
// lighthouse stands (the module's tower stands on it, a few metres behind this face), black crooked pines in its
// cracks, the white of the swell breaking along its foot. Metres from its middle at the waterline, 90 m across.
// Its point `isle#step`: the ground before the lighthouse's door, where someone stands there.
const back = [[-45, 0.4], [-38, 1.4], [-30, 2.2], [-22, 3.0], [-14, 4.2], [-6, 5.6], [0, 6.3], [6, 6.6], [12, 6.2], [18, 4.8],
  [26, 3.4], [34, 2.0], [41, 0.9], [45, 0.3]];
const outline = () => {
  g.beginPath();
  g.moveTo(-45, 0.6);
  for (const [x, h] of back) g.lineTo(x, -h);
  g.lineTo(45, 0.6);
  g.closePath();
};
g.fillStyle = '#d4a296';
outline();
g.fill();
g.save();
outline();
g.clip();
// the stone's drifts and the darker shoulders, the cracks
for (let i = 0; i < 40; i++) {
  const x = -42 + 84 * e.rnd(), y = -0.5 - 5 * e.rnd(), r = 1.5 + 4 * e.rnd();
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  const k = e.rnd();
  s.addColorStop(0, k < 0.5 ? 'rgba(170, 150, 156, 0.5)' : 'rgba(236, 196, 182, 0.5)');
  s.addColorStop(1, 'rgba(200, 160, 150, 0)');
  g.fillStyle = s;
  g.fillRect(x - r, y - r, 2 * r, 2 * r);
}
g.strokeStyle = 'rgba(110, 76, 72, 0.6)';
g.lineWidth = 0.15;
for (let i = 0; i < 24; i++) {
  const x = -40 + 80 * e.rnd(), y = -0.4 - 4 * e.rnd();
  g.beginPath();
  g.moveTo(x, y);
  g.lineTo(x + 2 + 4 * e.rnd(), y - 0.6 - e.rnd());
  g.stroke();
}
g.restore();
// the wet dark rim and the swell's white along the foot
g.fillStyle = 'rgba(96, 72, 74, 0.6)';
g.fillRect(-45, -0.5, 90, 0.5);
g.fillStyle = 'rgba(248, 249, 248, 0.85)';
for (let x = -45; x < 45; x += 0.9) {
  g.beginPath();
  g.ellipse(x + 0.4 * e.rnd(), -0.08, 0.6 + 0.6 * e.rnd(), 0.18, 0, 0, Math.PI * 2);
  g.fill();
}
// pines: small crooked black ones in the cracks
for (const [x, s] of [[-18, 1.0], [-11, 1.3], [-8, 0.9], [14, 1.2], [19, 1.0], [24, 0.8]]) {
  const h = -back.reduce((m, [bx, bh]) => (Math.abs(bx - x) < Math.abs(m[0] - x) ? [bx, bh] : m), back[0])[1];
  g.fillStyle = '#25302a';
  g.fillRect(x - 0.15 * s, h - 2.4 * s, 0.3 * s, 2.4 * s);
  for (const [dx, dy, r] of [[-0.6, -2.0, 0.7], [0.5, -2.5, 0.65], [0, -3.1, 0.55]]) {
    g.beginPath();
    g.ellipse(x + dx * s, h + dy * s, r * s * 1.3, r * s * 0.55, 0, 0, Math.PI * 2);
    g.fill();
  }
}
e.at(6, -6.6, 'step');
