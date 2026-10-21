// The stone in the bay: a rounded mound from the floor, its top a metre out of the water. Its painting is the mound
// unrolled (u round its rim, v from its top down): grey stone, paler and dry on top, lichen in patches, dark and wet
// from the water's line down, weed hanging there
const W = 7.8;
const H = 3;
g.fillStyle = '#6b707a';
g.fillRect(-W / 2, -H, W, H);
const wet = g.createLinearGradient(0, -H, 0, 0);
wet.addColorStop(0, 'rgba(150, 156, 160, 0.5)');
wet.addColorStop(0.25, 'rgba(150, 156, 160, 0)');
wet.addColorStop(0.32, 'rgba(40, 46, 54, 0)');
wet.addColorStop(0.42, 'rgba(40, 46, 54, 0.75)');
wet.addColorStop(1, 'rgba(32, 38, 44, 0.9)');
g.fillStyle = wet;
g.fillRect(-W / 2, -H, W, H);
for (let i = 0; i < 70; i++) {
  const x = -W / 2 + W * anim.hash(i, 1);
  const y = -H + 0.95 * anim.hash(i, 2);
  const r = 0.05 + 0.18 * anim.hash(i, 3);
  g.fillStyle = anim.hash(i, 4) > 0.5 ? 'rgba(126, 140, 112, 0.55)' : 'rgba(84, 88, 96, 0.5)';
  g.beginPath();
  g.ellipse(x, y, r * 1.6, r, 0, 0, Math.PI * 2);
  g.fill();
}
g.fillStyle = 'rgba(70, 92, 70, 0.8)';
for (let i = 0; i < 60; i++) {
  const x = -W / 2 + W * anim.hash(i, 11);
  const y = -H + 1.0 + 0.08 * anim.hash(i, 12);
  g.fillRect(x, y, 0.04 + 0.05 * anim.hash(i, 13), 0.15 + 0.3 * anim.hash(i, 14));
}
// its rim on the floor, counter-clockwise from above (x right, z toward the viewer)
const rim = [];
for (let i = 0; i < 14; i++) {
  const a = (i / 14) * Math.PI * 2;
  rim.push([1.45 * Math.cos(a) * (1 + 0.08 * Math.sin(3 * a)), -1.0 * Math.sin(a) * (1 + 0.1 * Math.cos(2 * a))]);
}
e.form(e.kit.lump(rim, 2.95, 4), { closed: 'u', ground: '#4c525c' });
