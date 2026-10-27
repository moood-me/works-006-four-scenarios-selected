// A green shoot standing up out of the weed in the cleft (`cleft` "sprout"): a thin stem, two leaves.
if (e.state.cleft === "sprout") {
  g.strokeStyle = "#5f8a3a";
  g.lineWidth = 0.018;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(0, 0);
  g.quadraticCurveTo(0.04, -0.23, 0, -0.5);
  g.stroke();
  g.fillStyle = "#79a84a";
  for (const [y, a] of [[-0.36, -0.6], [-0.46, 0.7]]) {
    g.beginPath();
    g.ellipse(Math.cos(a) * 0.06, y, 0.07, 0.025, a, 0, Math.PI * 2);
    g.fill();
  }
}
