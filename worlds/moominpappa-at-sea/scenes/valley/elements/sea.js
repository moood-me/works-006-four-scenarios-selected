// The sea from above (the plane's own metres: x across, y toward the viewer; it lies left of the coast, out to the
// horizon): a quiet late-summer grey-blue, greener over the shallows along the beach; two layers its shader shows by
// turns — the few white crests the evening breeze raises (they come and go), the foam washing the beach's edge.
const CA = -754.5, CD = 1500, L = e.lib, at = (a, d) => [a - CA, CD - d];
g.fillStyle = '#5f86a0';
g.fillRect(-745.5, -1500, 1491, 3000);
// the shallows: a band along the waterline, paler and greener toward the beach
for (let d = 0; d <= 260; d += 1.5) {
  const a = -(L.SHORE[2] + 0.9 * Math.sin(d * 0.13) + 0.5 * Math.sin(d * 0.05 + 1));
  const [x, y] = at(a, d), gr = g.createLinearGradient(x - 9, 0, x + 1, 0);
  gr.addColorStop(0, 'rgba(126, 162, 160, 0)');
  gr.addColorStop(1, 'rgba(146, 178, 168, 0.75)');
  g.fillStyle = gr;
  g.fillRect(x - 9, y - 0.8, 10, 1.6);
}
e.layer('crests', {}, c => {
  c.strokeStyle = 'rgba(244, 246, 246, 0.8)';
  c.lineCap = 'round';
  for (let i = 0; i < 1800; i++) {
    const d = 6 + 600 * e.rnd() ** 2, a = -12 - (e.rnd() ** 1.4) * (30 + d * 2.2);
    if (L.coast(a, d) < L.SHORE[2] + 1.5) continue;
    const len = 0.6 + e.rnd() * 1.8 + d * 0.01;
    c.lineWidth = 0.1 + e.rnd() * 0.12 + d * 0.002;
    const [x, y] = at(a, d);
    c.beginPath();
    c.moveTo(x - len / 2, y);
    c.quadraticCurveTo(x, y - len * 0.12, x + len / 2, y + len * 0.05);
    c.stroke();
  }
});
e.layer('foam', {}, c => {
  c.fillStyle = 'rgba(248, 249, 246, 0.6)';
  for (let d = 0; d <= 200; d += 0.35) {
    const a = -(L.SHORE[2] + 0.9 * Math.sin(d * 0.13) + 0.5 * Math.sin(d * 0.05 + 1)) - 0.15 * e.rnd();
    const [x, y] = at(a, d), r = 0.15 + e.rnd() * 0.25;
    c.beginPath();
    c.ellipse(x - 0.2, y, r * 1.6, r, e.rnd() * 3.1, 0, Math.PI * 2);
    c.fill();
  }
});
