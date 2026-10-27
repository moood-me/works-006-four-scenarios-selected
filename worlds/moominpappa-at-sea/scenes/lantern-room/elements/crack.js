// The glass of the side the sea throws its waves at, cracked in the storm (`gallery_glass`: cracked) — white lines
// running out from where it was struck. Whole, nothing (the glazing's frame is the element `glazing`).
if (e.state.gallery_glass === "cracked") {
  const L = e.lib, P = L.PARAPET, w = L.WS / 2 - 0.08, cx = 0.25, cy = -1.75;
  g.save();
  g.beginPath();
  g.rect(-w, -L.H + 0.08, 2 * w, L.H - P - 0.14);
  g.clip();
  g.strokeStyle = "rgba(236, 244, 250, 0.7)";
  g.lineWidth = 0.004;
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + e.rnd() * 0.4;
    let x = cx, y = cy;
    g.beginPath();
    g.moveTo(x, y);
    for (let k = 0; k < 6; k++) {
      x += Math.cos(a + (e.rnd() - 0.5) * 0.9) * (0.04 + e.rnd() * 0.1);
      y += Math.sin(a + (e.rnd() - 0.5) * 0.9) * (0.04 + e.rnd() * 0.1);
      g.lineTo(x, y);
    }
    g.stroke();
  }
  g.beginPath();
  g.ellipse(cx, cy, 0.04, 0.03, 0.4, 0, Math.PI * 2);
  g.stroke();
  g.restore();
}
e.at(0.25, -1.75, "glass");
