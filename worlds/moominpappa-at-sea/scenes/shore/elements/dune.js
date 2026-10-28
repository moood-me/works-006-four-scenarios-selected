// The dune's top, from above (the plane's metres), draped on the dune — its point dune#top, where Moominpappa stands
// and sits; and the hollow in the sand where he sat all night (dune_dent, a layer): a shallow scoop, its far side
// shaded, its rim of pushed-up sand paler, two heel marks below it.
e.layer("dent", {}, c => {
  const s = c.createRadialGradient(0, 0.05, 0.05, 0, 0, 0.5);
  s.addColorStop(0, "rgba(176, 158, 128, 0.75)");
  s.addColorStop(0.7, "rgba(190, 172, 142, 0.45)");
  s.addColorStop(1, "rgba(190, 172, 142, 0)");
  c.fillStyle = s;
  c.beginPath();
  c.ellipse(0, 0, 0.5, 0.38, 0, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = "rgba(250, 242, 226, 0.8)";
  c.lineWidth = 0.05;
  c.beginPath();
  c.ellipse(0, 0, 0.52, 0.4, 0, Math.PI * 1.05, Math.PI * 1.95);
  c.stroke();
  c.fillStyle = "rgba(160, 142, 114, 0.6)";
  for (const x of [-0.16, 0.16]) {
    c.beginPath();
    c.ellipse(x, 0.62, 0.07, 0.11, 0, 0, Math.PI * 2);
    c.fill();
  }
});
e.at(0, 0, "top");
