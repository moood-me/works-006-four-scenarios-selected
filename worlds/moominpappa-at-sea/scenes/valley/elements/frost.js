// The Groke's frost on the beach, from above (the plane's metres; its centre at across -11.3, distance 36): white
// rime on the sand and the dune grass round where she stands, and her track down to the water — patches of frost
// where her hem passed. Painted once; its shader (frost.wgsl) shows as much of it as `frost` says: the ring round her
// widening, then the track from her to the water.
const C = [-11.3, 36], G = e.lib.GROKE, at = (a, d) => [a - C[0], C[1] - d];
const [gx, gy] = at(G[0], G[1]);
const rime = (c, x, y, r, a) => {
  const s = c.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(244, 248, 252, ${a})`);
  s.addColorStop(0.7, `rgba(230, 238, 246, ${a * 0.7})`);
  s.addColorStop(1, 'rgba(230, 238, 246, 0)');
  c.fillStyle = s;
  c.fillRect(x - r, y - r, 2 * r, 2 * r);
};
// the ring: rime thickest at her, crystals and whitened tufts out to its rim
rime(g, gx, gy, 1.05, 0.9);
g.strokeStyle = 'rgba(250, 252, 255, 0.9)';
g.lineWidth = 0.012;
for (let i = 0; i < 260; i++) {
  const a = e.rnd() * Math.PI * 2, r = 1.0 * e.rnd() ** 0.7, x = gx + Math.cos(a) * r, y = gy + Math.sin(a) * r * 0.9;
  const l = 0.03 + 0.05 * e.rnd(), t = e.rnd() * Math.PI;
  g.beginPath();
  g.moveTo(x - Math.cos(t) * l, y - Math.sin(t) * l);
  g.lineTo(x + Math.cos(t) * l, y + Math.sin(t) * l);
  g.stroke();
}
// the track: patches of rime from her to the water, and the share of the way at each (its grey: what the shader reads
// back is the share itself)
const W = e.lib.GROKE_WATER, steps = 9;
e.layer('track', {}, c => {
  for (let i = 1; i <= steps; i++) {
    const u = i / steps, [x, y] = at(G[0] + (W[0] - G[0]) * u, G[1] + (W[1] - G[1]) * u + 0.12 * Math.sin(i * 2.1));
    rime(c, x, y, 0.32, 0.85);
  }
});
const grey = u => {
  const v = Math.round(255 * (u <= 0.0031308 ? 12.92 * u : 1.055 * u ** (1 / 2.4) - 0.055));
  return `rgb(${v},${v},${v})`;
};
e.layer('share', {}, c => {
  for (let i = 1; i <= steps; i++) {
    const u = i / steps, [x, y] = at(G[0] + (W[0] - G[0]) * u, G[1] + (W[1] - G[1]) * u + 0.12 * Math.sin(i * 2.1));
    c.fillStyle = grey(u);
    c.beginPath();
    c.arc(x, y, 0.36, 0, Math.PI * 2);
    c.fill();
  }
});
e.at(gx, gy, 'groke');
