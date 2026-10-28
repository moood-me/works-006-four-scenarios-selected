// A dead tree round the new house — the island's grey dead forest come down to the far shore (copies: their scale,
// flip and seed tell them apart): a crooked silver-grey trunk turned by the wind one way, bare crooked branches, the
// whole tree a layer that sways a little in the wind. Metres from its foot; about 5.5 m tall.
const r = n => e.anim.hash(n, 11);
e.layer('tree', { pivot: [0, 0], wind: { strength: 0.03, gust: 0.6 } }, c => {
  c.lineCap = 'round';
  c.lineJoin = 'round';
  const pts = [[0, 0]];
  for (let k = 1; k <= 6; k++) pts.push([0.32 * 5.5 * (k / 6) ** 1.6 + (r(k) - 0.5) * 0.3, (-5.5 * k) / 6]);
  for (let k = 0; k < 6; k++) {
    c.strokeStyle = k % 2 ? '#a8a39b' : '#9c978f';
    c.lineWidth = 0.3 * (1 - k / 7) + 0.05;
    c.beginPath();
    c.moveTo(pts[k][0], pts[k][1]);
    c.lineTo(pts[k + 1][0], pts[k + 1][1]);
    c.stroke();
  }
  c.strokeStyle = '#c4bfb6';
  c.lineWidth = 0.05;
  c.beginPath();
  c.moveTo(pts[0][0] + 0.06, pts[0][1]);
  for (let k = 1; k < 5; k++) c.lineTo(pts[k][0] + 0.05, pts[k][1]);
  c.stroke();
  for (let k = 2; k < 7; k++) {
    for (const s of [-1, 1]) {
      if (r(k * 7 + s) < 0.35) continue;
      const [x0, y0] = pts[k];
      const len = 5.5 * (0.17 + 0.2 * r(k * 3 + s));
      const x1 = x0 + s * len * 0.7 + 0.32 * len * 0.6;
      const y1 = y0 - len * (0.35 + 0.4 * r(k + s * 5));
      c.strokeStyle = '#a29d95';
      c.lineWidth = 0.07 * (1 - k / 8);
      c.beginPath();
      c.moveTo(x0, y0);
      c.quadraticCurveTo(x0 + s * len * 0.2, y0 - len * 0.5, x1, y1);
      c.stroke();
      c.lineWidth = 0.02;
      c.beginPath();
      for (let t = 0; t < 3; t++) {
        c.moveTo(x1, y1);
        c.lineTo(x1 + s * 0.3 * r(k + t * 11), y1 - 0.25 * r(k + t * 13));
      }
      c.stroke();
    }
  }
});
