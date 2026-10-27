// Boulders on the way over the rocks from the island's back to the Fisherman — what Papa holds on to, step by step, in
// the storm: three low rounded stones, greyer than the slab, at their own depths, wet at the foot; their points `rocks#hold1`…`hold3`, on
// their tops, from the island's side to his.
const holds = [[3.2, 5.6, 0.3], [1.8, 6.4, 0.36], [0.4, 6.6, 0.28]], [A, D] = [1.8, 6.2];
holds.forEach(([a, d, h], i) => {
  e.part(a - A, d - D, p => {
    p.fillStyle = "#a8857e";
    p.beginPath();
    p.moveTo(-h * 1.1, 0.02);
    p.quadraticCurveTo(-h * 1.15, -h * 0.85, -h * 0.2, -h);
    p.quadraticCurveTo(h * 0.8, -h * 1.05, h * 1.1, -h * 0.25);
    p.quadraticCurveTo(h * 1.2, 0, h * 1.0, 0.02);
    p.closePath();
    p.fill();
    p.fillStyle = "rgba(236, 214, 206, 0.3)";
    p.beginPath();
    p.ellipse(-h * 0.2, -h * 0.85, h * 0.5, h * 0.12, -0.1, 0, Math.PI * 2);
    p.fill();
    for (let k = 0; k < 18; k++) {
      p.fillStyle = e.rnd() < 0.5 ? "rgba(110, 84, 80, 0.35)" : "rgba(240, 222, 212, 0.35)";
      p.beginPath();
      p.arc((e.rnd() - 0.5) * h * 1.8, -e.rnd() * h * 0.85, 0.01 + 0.015 * e.rnd(), 0, Math.PI * 2);
      p.fill();
    }
    const wet = p.createLinearGradient(0, -h * 0.4, 0, 0.02);
    wet.addColorStop(0, "rgba(100, 72, 72, 0)");
    wet.addColorStop(1, "rgba(100, 72, 72, 0.45)");
    p.fillStyle = wet;
    p.fillRect(-h * 1.2, -h * 0.4, h * 2.4, h * 0.42);
    e.at(0, -h * 0.9, `hold${i + 1}`);
  }, [-0.7, -0.6, 0.7, 0.05]);
});
