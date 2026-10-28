// Fog beyond the wall, over the road and the fields falling away to the town: soft white banks, thick low and thin
// higher, drifting slowly on a layer that wraps (`fog`); its banks keep clear of the box's ends so they meet.
e.layer("fog", { drift: [0.12, 0], box: [-30, -7, 30, 0.2] }, (c) => {
  const low = c.createLinearGradient(0, 0, 0, -7);
  low.addColorStop(0, "rgba(222, 228, 233, 0.85)");
  low.addColorStop(0.35, "rgba(222, 228, 233, 0.45)");
  low.addColorStop(1, "rgba(222, 228, 233, 0)");
  c.fillStyle = low;
  c.fillRect(-30, -7, 60, 7.2);
  const r = e.lib.stream(5);
  for (let i = 0; i < 9; i++) {
    const x = -26 + i * 5.8 + r() * 2;
    const y = -1.5 - r() * 3;
    const rx = 2.5 + r() * 2;
    const bank = c.createRadialGradient(x, y, 0, x, y, rx);
    bank.addColorStop(0, "rgba(232, 236, 240, 0.5)");
    bank.addColorStop(1, "rgba(232, 236, 240, 0)");
    c.fillStyle = bank;
    c.beginPath();
    c.ellipse(x, y, rx, rx * 0.4, 0, 0, 6.3);
    c.fill();
  }
});
