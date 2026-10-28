// The rope coiled on the rock's top (rope, coil): a few loops of tarred hemp, the free end tied round the rock's
// crown. A layer its animate shows: smaller as more of it is let down into the pool.
e.layer("coil", { pivot: [0, 0] }, c => {
  c.strokeStyle = "#5e4b36";
  c.lineCap = "round";
  for (let i = 0; i < 6; i++) {
    c.lineWidth = 0.028;
    c.beginPath();
    c.ellipse((i - 2.5) * 0.012, -0.03 - i * 0.022, 0.2 - i * 0.008, 0.055, 0.05 * (i % 2 ? 1 : -1), 0, Math.PI * 2);
    c.stroke();
  }
  c.strokeStyle = "rgba(160, 134, 100, 0.8)";
  c.lineWidth = 0.008;
  c.beginPath();
  c.ellipse(0, -0.13, 0.17, 0.045, 0, Math.PI * 1.1, Math.PI * 1.7);
  c.stroke();
});
