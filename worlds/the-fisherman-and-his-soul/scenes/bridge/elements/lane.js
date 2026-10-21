// The lane along the quay from above (4.2 m across, from 3 m behind the viewer to the bridge's head 16 m out; y toward
// the viewer): rounded cobbles in rows, each its own grey-brown, and on the river's side (x −2.1) a kerb of long
// pale coping slabs — the quay's edge
g.fillStyle = '#4c453c';
g.fillRect(-2.1, -9.5, 4.2, 19);
let row = 0;
for (let y = -9.5; y < 9.5; y += 0.27) {
  let x = -1.62 + (row % 2 ? 0.15 : 0);
  let i = 0;
  while (x < 2.1) {
    const n = row * 31 + i;
    const w = 0.24 + 0.08 * e.anim.hash(n, 1);
    const tone = 104 + Math.round(30 * e.anim.hash(n, 2));
    g.fillStyle = `rgb(${tone + 6}, ${tone}, ${tone - 12})`;
    g.beginPath();
    g.ellipse(x + w / 2, y + 0.13, w / 2 - 0.02, 0.11, 0, 0, Math.PI * 2);
    g.fill();
    x += w;
    i++;
  }
  row++;
}
let y = -9.5;
let k = 0;
while (y < 9.5) {
  const len = 0.7 + 0.4 * e.anim.hash(k, 3);
  const tone = 150 + Math.round(18 * e.anim.hash(k, 4));
  g.fillStyle = `rgb(${tone}, ${tone - 4}, ${tone - 14})`;
  g.fillRect(-2.1, y + 0.02, 0.46, len - 0.04);
  y += len;
  k++;
}
