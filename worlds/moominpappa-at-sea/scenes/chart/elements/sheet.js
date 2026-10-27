// Papa's sea chart on the table, painted once by the world's module `chart` (the valley's coast, the open sea, the
// island ringed in pencil, the island's plan in its corner), the sheet's foot at the anchor. Its layers, shown by its
// shader (sheet.wgsl): Papa's course in pencil dashes (ink), and the same way a little wider, its grey the share of the
// way at each point (share) — the course is shown where that share is short of `route`.
const L = e.lib, C = e.kit.chart, K = L.K;
const toChart = c => {
  c.translate(0, -L.TALL);
  c.scale(K, K);
};
g.save();
toChart(g);
C.paint(g, { course: false });
g.restore();
e.layer('ink', {}, I => {
  toChart(I);
  C.courseLine(I);
});
// (a share u written as the grey whose light is u: what the shader reads back is u itself)
const grey = u => {
  const v = Math.round(255 * (u <= 0.0031308 ? 12.92 * u : 1.055 * u ** (1 / 2.4) - 0.055));
  return `rgb(${v},${v},${v})`;
};
e.layer('share', {}, S => {
  toChart(S);
  S.lineWidth = 0.45;
  S.lineCap = 'round';
  const N = 90;
  for (let i = 0; i < N; i++) {
    const [ax, ay] = C.course(i / N), [bx, by] = C.course((i + 1) / N);
    S.strokeStyle = grey((i + 0.5) / N);
    S.beginPath();
    S.moveTo(ax, ay);
    S.lineTo(bx, by);
    S.stroke();
  }
});
