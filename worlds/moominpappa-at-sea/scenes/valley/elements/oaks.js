// A broad leafy tree of the hills (an oak, an alder): a short trunk and a big round crown in heaps, green with the
// first ochre. Copies on the hills, among the spruces.
g.fillStyle = '#4a3c30';
g.fillRect(-0.25, -2.2, 0.5, 2.2);
const heaps = [[0, -5.6, 2.4], [-1.9, -4.3, 1.7], [1.9, -4.4, 1.8], [-0.8, -7.0, 1.6], [1.0, -6.9, 1.5]];
for (const [cx, cy, r] of heaps) {
  g.fillStyle = '#4a6e3a';
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fill();
}
for (const [cx, cy, r] of heaps) {
  const s = g.createRadialGradient(cx - r * 0.3, cy - r * 0.4, 0, cx, cy, r);
  s.addColorStop(0, 'rgba(150, 170, 90, 0.75)');
  s.addColorStop(1, 'rgba(150, 170, 90, 0)');
  g.fillStyle = s;
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fill();
}
for (let i = 0; i < 40; i++) {
  const [cx, cy, r] = heaps[Math.floor(e.rnd() * heaps.length)], a = e.rnd() * Math.PI * 2, q = r * Math.sqrt(e.rnd());
  g.fillStyle = e.rnd() < 0.5 ? 'rgba(196, 170, 80, 0.7)' : 'rgba(54, 84, 44, 0.7)';
  g.beginPath();
  g.arc(cx + Math.cos(a) * q, cy + Math.sin(a) * q, 0.25 + 0.3 * e.rnd(), 0, Math.PI * 2);
  g.fill();
}
