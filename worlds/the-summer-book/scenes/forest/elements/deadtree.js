// A dead tree of the island's crown (copies: their scale, flip and seed tell them apart): a crooked silver-grey trunk
// twisted by the wind, bare branches; the whole tree a layer that sways a little in the wind (they creak) and, as the
// forest spins (`spin`, animate), wheels about its foot. Metres from its foot; about 6 m tall.

// a dead tree's trunk and its bare branches: a crooked silver-grey trunk, thick at the foot, turned by the wind one way,
// its branches crooked and broken; drawn into c (metres from its foot; h its height)
function tree(c, h, lean, seed) {
  const r = n => e.anim.hash(n, seed);
  c.lineCap = 'round';
  c.lineJoin = 'round';
  const pts = [[0, 0]];
  for (let k = 1; k <= 6; k++) pts.push([lean * h * (k / 6) ** 1.6 + (r(k) - 0.5) * 0.35, -h * k / 6]);
  for (let k = 0; k < pts.length - 1; k++) {
    c.strokeStyle = k % 2 ? '#a7a29a' : '#9b968e';
    c.lineWidth = 0.32 * (1 - k / 7) + 0.05;
    c.beginPath();
    c.moveTo(pts[k][0], pts[k][1]);
    c.lineTo(pts[k + 1][0], pts[k + 1][1]);
    c.stroke();
  }
  // a pale streak down the trunk where the bark is gone
  c.strokeStyle = '#c3beb5';
  c.lineWidth = 0.05;
  c.beginPath();
  c.moveTo(pts[0][0] + 0.06, pts[0][1]);
  for (let k = 1; k < 5; k++) c.lineTo(pts[k][0] + 0.05, pts[k][1]);
  c.stroke();
  // the branches: crooked, bending away with the wind, twigs at their ends
  for (let k = 2; k < pts.length; k++) {
    for (const s of [-1, 1]) {
      if (r(k * 7 + s) < 0.35) continue;
      const [x0, y0] = pts[k];
      const len = h * (0.18 + 0.2 * r(k * 3 + s));
      const x1 = x0 + s * len * 0.7 + lean * len * 0.6;
      const y1 = y0 - len * (0.35 + 0.4 * r(k + s * 5));
      c.strokeStyle = '#a19c94';
      c.lineWidth = 0.07 * (1 - k / 8);
      c.beginPath();
      c.moveTo(x0, y0);
      c.quadraticCurveTo(x0 + s * len * 0.2, y0 - len * 0.5, x1, y1);
      c.stroke();
      c.lineWidth = 0.02;
      for (let t = 0; t < 3; t++) {
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x1 + s * 0.3 * r(k + t * 11), y1 - 0.25 * r(k + t * 13));
        c.stroke();
      }
    }
  }
}

e.layer('tree', { pivot: [0, 0], wind: { strength: 0.03, gust: 0.6 } }, c => tree(c, 6, 0.35, 3));
