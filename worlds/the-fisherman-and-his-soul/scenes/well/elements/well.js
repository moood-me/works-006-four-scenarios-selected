// The well: a round wall of fitted stones, knee-high, its rim of flat capstones, dark water inside. A form turned on a
// lathe (kit.revolve): its profile goes from the water in the middle out and up the inner wall to the rim, over the
// rim and down the outside to the ground. The painting is that profile unrolled — u once round, v down the profile —
// 4.4 m round by 1.75 m of profile: the water (to y −1.245), the inner wall (to −0.965), the rim (to −0.804), the
// outer wall below
const W = 2.2;
const top = -1.748;
g.fillStyle = '#1b2530';
g.fillRect(-W, top, 2 * W, 0.51);
g.fillStyle = '#4d4f52';
g.fillRect(-W, -1.245, 2 * W, 0.29);
g.fillStyle = '#a19c92';
g.fillRect(-W, -0.965, 2 * W, 0.18);
g.fillStyle = '#7f7a72';
g.fillRect(-W, -0.785, 2 * W, 0.785);
// the capstones' joints over the rim
g.fillStyle = '#6c675f';
for (let i = 0; i < 14; i++) g.fillRect(-W + (2 * W * i) / 14, -0.965, 0.025, 0.18);
// the courses of stones on the outside, each its own tone, the mortar dark between them
for (let row = 0; row < 5; row++) {
  const y0 = -0.785 + row * 0.157;
  let x = -W - 0.15 * e.anim.hash(row, 1);
  let i = 0;
  while (x < W) {
    const w = 0.22 + 0.16 * e.anim.hash(row * 40 + i, 2);
    const t = 108 + Math.round(30 * e.anim.hash(row * 40 + i, 3));
    g.fillStyle = `rgb(${t + 4}, ${t}, ${t - 8})`;
    g.fillRect(x + 0.012, y0 + 0.012, w - 0.024, 0.133);
    x += w;
    i++;
  }
}
// moss low on the stones
g.fillStyle = 'rgba(78, 100, 64, 0.5)';
for (let i = 0; i < 40; i++) {
  const x = -W + 2 * W * e.anim.hash(i, 11);
  g.beginPath();
  g.ellipse(x, -0.06 - 0.12 * e.anim.hash(i, 12), 0.12 + 0.12 * e.anim.hash(i, 13), 0.05, 0, 0, Math.PI * 2);
  g.fill();
}
e.form(e.kit.revolve([[0, 0.45], [0.5, 0.5], [0.52, 0.78], [0.68, 0.8], [0.7, 0.74], [0.7, 0]]), { closed: 'u', ground: '#6e6a63' });
