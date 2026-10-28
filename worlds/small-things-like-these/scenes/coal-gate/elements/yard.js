// The yard from above (x across, y toward the viewer; its centre 3.9 m ahead, so the world's (across, distance) is
// (x, 3.9 − y)): cobbles grey-blue under white rime, the frost worn off and blackened along the way the coal goes —
// from the gate (1.1, 9) to the shed's door (−1.65, 4.4) and to the chute (2.4, 9) — and round the laundry's door
// (3.3, 5.85); lumps of coal spilt before the shed's door.
const D = 3.9;
// how bare of frost a point is: near the coal's ways and the door
const seg = (x, y, ax, ad, bx, bd) => {
  const ay = D - ad;
  const by = D - bd;
  const dx = bx - ax;
  const dy = by - ay;
  const u = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - ax - dx * u, y - ay - dy * u);
};
const bare = (x, y) => {
  const d = Math.min(seg(x, y, 1.1, 9, -1.65, 4.4), seg(x, y, 1.1, 9, 2.4, 9), Math.hypot(x - 3.3, y - (D - 5.85)));
  return Math.max(0, 1 - d / 0.8);
};
e.lib.cobbles(g, 51, -13, -5.4, 26, 10.8, ["#7e8287", "#868a8f", "#767a7f", "#8d9195"], bare);
// the coal dust along its ways
g.strokeStyle = "rgba(34, 33, 34, 0.45)";
g.lineCap = "round";
g.lineWidth = 0.7;
g.beginPath();
g.moveTo(1.1, D - 9);
g.lineTo(-1.65, D - 4.4);
g.moveTo(1.1, D - 9);
g.lineTo(2.4, D - 9);
g.stroke();
g.strokeStyle = "rgba(34, 33, 34, 0.3)";
g.lineWidth = 1.3;
g.stroke();
// lumps spilt before the shed's door
const r = e.lib.stream(52);
const lumps = new Path2D();
for (let i = 0; i < 18; i++) {
  const x = -1.65 + (r() - 0.5) * 1.1 * (0.4 + r() * 0.6);
  const y = D - 4.35 + r() * r() * 0.8;
  const s = 0.015 + r() * r() * 0.05;
  lumps.moveTo(x - s, y + s * (r() - 0.5) * 0.6);
  lumps.lineTo(x - s * 0.3, y - s * (0.5 + r() * 0.4));
  lumps.lineTo(x + s * (0.6 + r() * 0.4), y - s * 0.4);
  lumps.lineTo(x + s * 0.8, y + s * 0.4);
  lumps.lineTo(x - s * 0.1, y + s * (0.4 + r() * 0.3));
  lumps.closePath();
}
// the dust trodden out over the threshold
const dust = g.createRadialGradient(-1.6, D - 4.3, 0.05, -1.6, D - 4.3, 0.7);
dust.addColorStop(0, "rgba(30, 29, 30, 0.5)");
dust.addColorStop(1, "rgba(30, 29, 30, 0)");
g.fillStyle = dust;
g.fillRect(-2.3, D - 5.0, 1.4, 1.4);
g.fillStyle = "#1b1a1c";
g.fill(lumps);
