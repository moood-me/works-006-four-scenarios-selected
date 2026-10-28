// The shed's floor inside (from above): packed coal dust, a few lumps fallen off the heap.
g.fillStyle = "#2b2928";
g.fillRect(-1.6, -1.25, 3.2, 2.5);
const r = e.lib.stream(44);
g.fillStyle = "#1c1b1b";
for (let i = 0; i < 40; i++) {
  const x = -1.5 + r() * 3;
  const y = -1.2 + r() * 2.4;
  g.beginPath();
  g.ellipse(x, y, 0.03 + r() * 0.04, 0.025 + r() * 0.03, r() * 3, 0, 6.3);
  g.fill();
}
