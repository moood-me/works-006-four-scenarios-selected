// The stone in the middle of the bay: a big boulder from the floor (2.6 m under the water), its flat top 1.2 m out of
// the water — the Mermaid's seat. A form of its own: round its rim (u, its front — toward the pier — in the painting's
// middle) and from its top (v 0) down to its foot (v 1): a flat top out to 0.55 of its radius, then shoulders rounding
// down to the floor; its outline uneven. The painting is it unrolled: grey stone, paler and dry on top, lichen in
// patches, dark and wet from a little over the water's line down, weed hanging there
const W = 8.8;
const H = 3.6;
g.fillStyle = '#727780';
g.fillRect(-W / 2, -H, W, H);
// the water's line on it: 0.66 of the way down (the top 3.2 m over the floor, the water 2.6 m over it)
const line = -H + 0.66 * H;
const wet = g.createLinearGradient(0, -H, 0, 0);
wet.addColorStop(0, 'rgba(168, 172, 176, 0.55)');
wet.addColorStop(0.3, 'rgba(168, 172, 176, 0)');
wet.addColorStop(0.58, 'rgba(40, 46, 54, 0)');
wet.addColorStop(0.64, 'rgba(40, 46, 54, 0.75)');
wet.addColorStop(1, 'rgba(32, 38, 44, 0.9)');
g.fillStyle = wet;
g.fillRect(-W / 2, -H, W, H);
for (let i = 0; i < 80; i++) {
  const x = -W / 2 + W * e.anim.hash(i, 1);
  const y = -H + 0.3 + 1.6 * e.anim.hash(i, 2);
  const r = 0.05 + 0.16 * e.anim.hash(i, 3);
  g.fillStyle = e.anim.hash(i, 4) > 0.5 ? 'rgba(130, 146, 112, 0.5)' : 'rgba(92, 96, 104, 0.45)';
  g.beginPath();
  g.ellipse(x, y, r * 1.6, r, 0, 0, Math.PI * 2);
  g.fill();
}
g.fillStyle = 'rgba(70, 96, 72, 0.85)';
for (let i = 0; i < 70; i++) {
  const x = -W / 2 + W * e.anim.hash(i, 11);
  const y = line - 0.12 + 0.06 * e.anim.hash(i, 12);
  g.fillRect(x, y, 0.04 + 0.05 * e.anim.hash(i, 13), 0.15 + 0.3 * e.anim.hash(i, 14));
}
const RX = 1.5;
const RZ = 1.1;
const TOP = 3.2;
e.form((u, v) => {
  const a = (u - 0.5) * Math.PI * 2;
  const n = 1 + 0.1 * Math.sin(3 * a + 1.3) + 0.06 * Math.sin(5 * a + 0.4);
  let r;
  let y;
  if (v < 0.12) {
    const s = v / 0.12;
    r = 0.55 * s;
    y = TOP - 0.06 * s * s;
  } else {
    const t = (v - 0.12) / 0.88;
    r = 0.55 + 0.45 * Math.sin(t * Math.PI / 2);
    y = (TOP - 0.06) * (1 - t * t);
  }
  return [r * RX * n * Math.sin(a), y, r * RZ * n * Math.cos(a)];
}, { closed: 'u', ground: '#4c525c' });
