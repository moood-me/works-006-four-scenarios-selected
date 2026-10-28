// The son's ring of stones on the moss of his clearing: nine rounded grey granite stones the size of a fist to a loaf,
// a fleck of lichen on each — each painted twice, once in its place in the ring and once kicked apart (scattered
// outward, a few turned over), each a layer at its own depth. Painted once; its animate shows them by `ring` and
// `ring_n` (none; set — the first ring_n in place, the rest not yet laid; broken — the first ring_n laid back, the
// rest scattered; one_missing — the ring whole but for one). Its point ring#stones, the ring's middle.
const R = e.lib.RING.r, N = 9;
const stone = (c, x, w, h, tone) => {
  c.fillStyle = tone;
  c.beginPath();
  c.moveTo(x - w, 0);
  c.quadraticCurveTo(x - w * 1.05, -h * 0.85, x - w * 0.25, -h);
  c.quadraticCurveTo(x + w * 0.7, -h * 1.05, x + w, -h * 0.3);
  c.quadraticCurveTo(x + w * 1.08, 0, x + w * 0.9, 0.01);
  c.closePath();
  c.fill();
  c.fillStyle = "rgba(60, 50, 48, 0.35)";
  c.beginPath();
  c.moveTo(x - w, 0);
  c.quadraticCurveTo(x, -h * 0.35, x + w * 0.95, -0.005);
  c.lineTo(x + w * 0.9, 0.01);
  c.closePath();
  c.fill();
  c.fillStyle = "rgba(226, 220, 212, 0.45)";
  c.beginPath();
  c.ellipse(x - w * 0.25, -h * 0.8, w * 0.35, h * 0.14, -0.15, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = "rgba(170, 176, 140, 0.7)";
  c.beginPath();
  c.arc(x + w * 0.3, -h * 0.55, w * 0.14, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = "rgba(70, 90, 50, 0.35)";
  c.fillRect(x - w, -0.012, w * 2, 0.02);
};
for (let i = 0; i < N; i++) {
  const t = i / N * Math.PI * 2 + 0.3, k = 0.55 + 0.45 * Math.abs(Math.sin(i * 2.7)), w = 0.16 * k + 0.06, h = 0.1 * k + 0.04;
  const tone = i % 3 === 0 ? "#9d938f" : i % 3 === 1 ? "#8c8a88" : "#a8857d";
  const kicked = i % 3 !== 1, out = kicked ? 0.5 + 0.9 * Math.abs(Math.sin(i * 5.1)) : 0.15, tw = kicked ? 0.6 * Math.sin(i * 3.3) : 0;
  for (const [name, x, z] of [[`set${i}`, Math.cos(t) * R, Math.sin(t) * R * 0.95], [`off${i}`, Math.cos(t) * (R + out) + tw * 0.3, Math.sin(t) * (R + out) * 0.95]]) {
    e.layer(name, { depth: -z, box: [x - w * 1.2, -h * 1.2, x + w * 1.2, 0.05] }, c => stone(c, x, w, h, tone));
  }
}
e.at(0, -0.05, "stones");
