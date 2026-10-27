// The son's ring of stones on the moss of his clearing (ring): rounded grey granite stones the size of a fist to a
// loaf, a fleck of lichen on each, each a part at its own depth. set — a whole ring; one_missing — a gap where one
// was; broken — kicked apart, scattered outward and over. Its point ring#stones, the ring's middle.
const R = e.lib.RING.r, n = 9, ring = e.state.ring;
if (ring !== "none") {
  for (let i = 0; i < n; i++) {
    if (ring === "one_missing" && i === 2) continue;
    const t = i / n * Math.PI * 2 + 0.3, k = 0.55 + 0.45 * Math.abs(Math.sin(i * 2.7)), w = 0.16 * k + 0.06, h = 0.1 * k + 0.04;
    const kicked = ring === "broken" && i % 3 !== 1, out = kicked ? 0.5 + 0.9 * Math.abs(Math.sin(i * 5.1)) : 0, tw = kicked ? 0.6 * Math.sin(i * 3.3) : 0;
    const dx = Math.cos(t) * (R + out) + tw * 0.3, dz = Math.sin(t) * (R + out) * 0.95;
    const tone = i % 3 === 0 ? "#9d938f" : i % 3 === 1 ? "#8c8a88" : "#a8857d";
    e.part(dx, dz, p => {
      p.fillStyle = tone;
      p.beginPath();
      p.moveTo(-w, 0);
      p.quadraticCurveTo(-w * 1.05, -h * 0.85, -w * 0.25, -h);
      p.quadraticCurveTo(w * 0.7, -h * 1.05, w, -h * 0.3);
      p.quadraticCurveTo(w * 1.08, 0, w * 0.9, 0.01);
      p.closePath();
      p.fill();
      p.fillStyle = "rgba(60, 50, 48, 0.35)";
      p.beginPath();
      p.moveTo(-w, 0);
      p.quadraticCurveTo(0, -h * 0.35, w * 0.95, -0.005);
      p.lineTo(w * 0.9, 0.01);
      p.closePath();
      p.fill();
      p.fillStyle = "rgba(226, 220, 212, 0.45)";
      p.beginPath();
      p.ellipse(-w * 0.25, -h * 0.8, w * 0.35, h * 0.14, -0.15, 0, Math.PI * 2);
      p.fill();
      p.fillStyle = "rgba(170, 176, 140, 0.7)";
      p.beginPath();
      p.arc(w * 0.3, -h * 0.55, w * 0.14, 0, Math.PI * 2);
      p.fill();
      p.fillStyle = "rgba(70, 90, 50, 0.35)";
      p.fillRect(-w, -0.012, w * 2, 0.02);
    }, [-w * 1.2, -h * 1.2, w * 1.2, 0.05]);
  }
}
e.at(0, -0.05, "stones");
