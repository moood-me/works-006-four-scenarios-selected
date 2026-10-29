// Far off in the water, 26 m out: a low line of rocks on the floor, some rising tall, weed on them — grey-green, the
// water's haze taking most of them; painted wide past the frame's edges
const h = (i, s) => e.anim.hash(i, s);
g.fillStyle = '#6d8682';
for (let i = 0; i < 16; i++) {
  const cx = -38 + 76 * (i + h(i, 1)) / 16;
  const w = 2.5 + 4 * h(i, 2);
  const top = 1.5 + (h(i, 3) > 0.7 ? 7 : 3.5) * h(i, 4);
  g.beginPath();
  g.moveTo(cx - w, 0.5);
  for (let k = 0; k <= 6; k++) {
    const t = k / 6;
    const x = cx - w + 2 * w * t;
    const y = -top * Math.max(0, Math.sin(Math.PI * t)) ** 0.6 * (0.85 + 0.3 * h(i * 7 + k, 5));
    g.lineTo(x, y);
  }
  g.lineTo(cx + w, 0.5);
  g.closePath();
  g.fill();
}
g.strokeStyle = '#6f7f58';
g.lineWidth = 0.12;
for (let i = 0; i < 40; i++) {
  const x = -38 + 76 * h(i, 6);
  const top = 1.5 + 2.5 * h(i, 7);
  g.beginPath();
  g.moveTo(x, 0.5);
  g.quadraticCurveTo(x + 0.4, -top * 0.5, x + 0.2 * (h(i, 8) - 0.5), -top);
  g.stroke();
}
