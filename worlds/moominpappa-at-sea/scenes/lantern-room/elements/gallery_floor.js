// The gallery outside the glass, from above (x across, y toward the viewer; its centre the lamp's): an iron grating
// running round the lantern, rusted at its bolts.
const L = e.lib, ring = new Path2D();
ring.arc(0, 0, L.GR, 0, Math.PI * 2);
ring.moveTo(L.R - 0.05, 0);
ring.arc(0, 0, L.R - 0.05, 0, Math.PI * 2, true);
g.save();
g.clip(ring, "evenodd");
g.fillStyle = "#4a4f52";
g.fillRect(-L.GR, -L.GR, 2 * L.GR, 2 * L.GR);
g.strokeStyle = "rgba(20, 22, 24, 0.7)";
g.lineWidth = 0.02;
for (let x = -L.GR; x < L.GR; x += 0.08) {
  g.beginPath();
  g.moveTo(x, -L.GR);
  g.lineTo(x, L.GR);
  g.stroke();
}
g.fillStyle = "rgba(150, 84, 50, 0.4)";
for (let i = 0; i < 40; i++) g.fillRect(-L.GR + e.rnd() * 2 * L.GR, -L.GR + e.rnd() * 2 * L.GR, 0.04, 0.04);
g.restore();
