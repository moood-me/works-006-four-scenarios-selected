// The bridge's road from above (23.4 m across the river, 4 m wide; y toward the viewer): worn flagstones in courses
// across it, a kerb of coping along each parapet
g.fillStyle = '#5a5248';
g.fillRect(-11.7, -2, 23.4, 4);
let x = -11.7;
let i = 0;
while (x < 11.7) {
  const w = 0.5 + 0.35 * e.anim.hash(i, 1);
  let y = -1.75;
  let j = 0;
  while (y < 1.75) {
    const h = 0.4 + 0.3 * e.anim.hash(i * 13 + j, 2);
    const tone = 112 + Math.round(26 * e.anim.hash(i * 13 + j, 3));
    g.fillStyle = `rgb(${tone + 4}, ${tone}, ${tone - 10})`;
    g.fillRect(x + 0.02, y + 0.02, w - 0.04, Math.min(h, 1.75 - y) - 0.04);
    y += h;
    j++;
  }
  x += w;
  i++;
}
g.fillStyle = '#9a9084';
g.fillRect(-11.7, -2, 23.4, 0.25);
g.fillRect(-11.7, 1.75, 23.4, 0.25);
