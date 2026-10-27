// The rope let down into the pool (rope): from the rock's lip, sagging a little, straight down into the black water;
// rings on the water round where it goes in. Its anchor is on the water there.
e.layer("line", { pivot: [0.5, -0.75] }, c => {
  c.strokeStyle = "#5e4b36";
  c.lineWidth = 0.04;
  c.lineCap = "round";
  c.beginPath();
  c.moveTo(0.5, -0.75);
  c.quadraticCurveTo(0.12, -0.56, 0, 0.02);
  c.stroke();
});
e.layer("rings", { pivot: [0, 0] }, c => {
  c.strokeStyle = "rgba(210, 220, 226, 0.5)";
  c.lineWidth = 0.012;
  for (const r of [0.08, 0.16, 0.26]) {
    c.beginPath();
    c.ellipse(0, 0, r, r * 0.22, 0, 0, Math.PI * 2);
    c.stroke();
  }
});
