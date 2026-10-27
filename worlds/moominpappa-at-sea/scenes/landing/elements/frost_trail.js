// The frost's trail across the granite (`frost_step`): from the water's edge on the left up the long back to the
// lighthouse steps and back again — the Groke slides, she leaves no footprints: two broken bands of white rime,
// crystal ticks along them, thickest at the threshold. A draped plane (its metres: x across from 3.5, y toward the
// viewer from distance 24.5).
if (e.state.frost_step) {
  const at = (a, d) => [a - 3.5, 24.5 - d];
  const ways = [[[-3.6, 19.4], [1.5, 22.6], [6.0, 26.6], [9.6, 29.8]], [[9.9, 29.7], [6.6, 26.0], [2.2, 22.0], [-3.2, 19.0]]];
  for (const way of ways) {
    for (let i = 0; i < way.length - 1; i++) {
      const [a0, d0] = way[i], [a1, d1] = way[i + 1], n = Math.ceil(Math.hypot(a1 - a0, d1 - d0) / 0.35);
      for (let k = 0; k < n; k++) {
        if (e.rnd() < 0.18) continue;
        const u = k / n, [x, y] = at(a0 + (a1 - a0) * u + (e.rnd() - 0.5) * 0.3, d0 + (d1 - d0) * u + (e.rnd() - 0.5) * 0.3);
        const door = Math.hypot(a0 + (a1 - a0) * u - 9.8, d0 + (d1 - d0) * u - 29.8) < 2.5, r = 0.22 + 0.2 * e.rnd() + (door ? 0.15 : 0);
        const s = g.createRadialGradient(x, y, 0, x, y, r);
        s.addColorStop(0, "rgba(248, 252, 255, 0.85)");
        s.addColorStop(0.6, "rgba(236, 244, 252, 0.5)");
        s.addColorStop(1, "rgba(236, 244, 252, 0)");
        g.fillStyle = s;
        g.fillRect(x - r, y - r, r * 2, r * 2);
        g.strokeStyle = "rgba(255, 255, 255, 0.8)";
        g.lineWidth = 0.012;
        for (let c = 0; c < 4; c++) {
          const ang = e.rnd() * Math.PI, l = 0.05 + 0.08 * e.rnd();
          g.beginPath();
          g.moveTo(x - Math.cos(ang) * l, y - Math.sin(ang) * l);
          g.lineTo(x + Math.cos(ang) * l, y + Math.sin(ang) * l);
          g.stroke();
        }
      }
    }
  }
}
