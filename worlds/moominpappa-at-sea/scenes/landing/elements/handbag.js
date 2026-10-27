// Moominmamma's black handbag, stood on the rock beside her: round-bottomed, a clasp, a looped handle.
// (on the slab while the luggage is there: `bundles` "slab")
if ((e.state.bundles ?? "slab") === "slab") {
  g.fillStyle = "#26232a";
  g.beginPath();
  g.moveTo(-0.16, -0.2);
  g.lineTo(0.16, -0.2);
  g.quadraticCurveTo(0.2, -0.02, 0.15, 0);
  g.lineTo(-0.15, 0);
  g.quadraticCurveTo(-0.2, -0.02, -0.16, -0.2);
  g.fill();
  g.strokeStyle = "#26232a";
  g.lineWidth = 0.025;
  g.beginPath();
  g.moveTo(-0.09, -0.2);
  g.quadraticCurveTo(0, -0.36, 0.09, -0.2);
  g.stroke();
  g.fillStyle = "#b8a36a";
  g.fillRect(-0.025, -0.2, 0.05, 0.04);
}
