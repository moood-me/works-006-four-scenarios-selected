// The glade from above (its centre 25 m ahead; x across, y toward the viewer — a point `distance` ahead is at
// y = 25 − distance): dark moss and short grass in patches, a ring of trodden earth round the well (0.9 m right,
// 7.5 m ahead), and a path of flat stone slabs from the viewer's feet up to it
const Y = d => 25 - d;
g.fillStyle = '#44523a';
g.fillRect(-45, -35, 90, 70);
for (let i = 0; i < 900; i++) {
  const x = -45 + 90 * e.anim.hash(i, 1);
  const y = -35 + 70 * e.anim.hash(i, 2);
  const r = 0.4 + 2.2 * e.anim.hash(i, 3);
  g.fillStyle = e.anim.hash(i, 4) > 0.5 ? 'rgba(92, 108, 70, 0.35)' : 'rgba(38, 48, 34, 0.35)';
  g.beginPath();
  g.ellipse(x, y, r * 1.5, r, 0, 0, Math.PI * 2);
  g.fill();
}
// the trodden ring round the well
const ring = g.createRadialGradient(0.9, Y(7.5), 0.6, 0.9, Y(7.5), 2.6);
ring.addColorStop(0, 'rgba(104, 90, 70, 1)');
ring.addColorStop(0.6, 'rgba(104, 90, 70, 0.7)');
ring.addColorStop(1, 'rgba(104, 90, 70, 0)');
g.fillStyle = ring;
g.fillRect(-2, Y(7.5) - 3, 6, 6);
// the slabs: irregular flat stones along a gentle curve from the viewer to the well
for (let i = 0; i < 11; i++) {
  const d = 0.4 + i * 0.58;
  const x = 0.15 + 0.35 * Math.sin(d * 0.45) + 0.12 * (e.anim.hash(i, 6) - 0.5);
  const w = 0.32 + 0.1 * e.anim.hash(i, 7);
  const h = 0.2 + 0.06 * e.anim.hash(i, 8);
  const tone = 128 + Math.round(22 * e.anim.hash(i, 9));
  g.fillStyle = `rgb(${tone}, ${tone - 2}, ${tone - 10})`;
  g.beginPath();
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2;
    const q = 0.8 + 0.25 * e.anim.hash(i * 7 + k, 10);
    g.lineTo(x + Math.cos(a) * w * q, Y(d) + Math.sin(a) * h * q);
  }
  g.closePath();
  g.fill();
}
