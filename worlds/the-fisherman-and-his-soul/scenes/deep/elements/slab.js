// A low flat stone half sunk in the sand before the big stone's foot — where the two of them sit, side by side: a mound
// (kit.lump, smooth) 3 × 1 m, 0.44 high; its painting the way round it by its slope: pale weathered stone, sand lying in
// its hollows, a little weed at its rim
g.fillStyle = '#a9a69a';
g.fillRect(-3.5, -0.6, 7, 0.6);
for (let i = 0; i < 40; i++) {
  const x = -3.5 + 7 * e.anim.hash(i, 1);
  const y = -0.6 + 0.45 * e.anim.hash(i, 2);
  const r = 0.04 + 0.1 * e.anim.hash(i, 3);
  g.fillStyle = e.anim.hash(i, 4) > 0.5 ? 'rgba(206, 196, 164, 0.55)' : 'rgba(128, 126, 116, 0.45)';
  g.beginPath();
  g.ellipse(x, y, r * 1.8, r, 0, 0, Math.PI * 2);
  g.fill();
}
g.fillStyle = 'rgba(104, 128, 88, 0.7)';
for (let i = 0; i < 60; i++) {
  const x = -3.5 + 7 * e.anim.hash(i, 5);
  g.fillRect(x, -0.12 + 0.04 * e.anim.hash(i, 6), 0.03 + 0.03 * e.anim.hash(i, 7), 0.12);
}
const rim = [];
for (let k = 0; k < 14; k++) {
  const a = (k / 14) * Math.PI * 2;
  rim.push([1.5 * Math.cos(a), -0.5 * Math.sin(a)]);
}
e.form(e.kit.lump(rim, 0.44, 0), { closed: 'u', ground: '#8e8b80' });
