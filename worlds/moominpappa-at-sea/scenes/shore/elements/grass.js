// A tuft of lyme grass on the dune: long grey-green blades, a few straw-gold dead ones, leaning away from the sea,
// a little sand drifted at its root (the blades a layer the wind sways). Its copies grow along the dune.
g.fillStyle = "rgba(200, 182, 150, 0.7)";
g.beginPath();
g.ellipse(0, 0, 0.3, 0.05, 0, 0, Math.PI * 2);
g.fill();
e.layer("blades", { pivot: [0, 0], wind: { strength: 0.55, gust: 0.6, scale: 4 } }, c => {
  c.lineCap = "round";
  for (let i = 0; i < 30; i++) {
    const x = (e.rnd() - 0.5) * 0.4, h = 0.35 + e.rnd() * 0.5, lean = 0.08 + e.rnd() * 0.26, k = e.rnd();
    c.strokeStyle = k < 0.6 ? "#8fa596" : k < 0.85 ? "#a9b8a6" : "#cdb67f";
    c.lineWidth = 0.012 + e.rnd() * 0.01;
    c.beginPath();
    c.moveTo(x, 0);
    c.quadraticCurveTo(x + lean * 0.25, -h * 0.65, x + lean, -h);
    c.stroke();
  }
});
