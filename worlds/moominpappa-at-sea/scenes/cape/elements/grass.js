// A tuft of dry sea grass in a crack of the granite: thin straw-gold blades, a few green at the root, bent by the
// wind (a layer that sways). Its copies grow about the cape.
g.fillStyle = "rgba(90, 80, 60, 0.6)";
g.beginPath();
g.ellipse(0, 0, 0.16, 0.03, 0, 0, Math.PI * 2);
g.fill();
e.layer("blades", { pivot: [0, 0], wind: { strength: 0.6, gust: 0.6, scale: 3 } }, c => {
  c.lineCap = "round";
  for (let i = 0; i < 22; i++) {
    const x = (e.rnd() - 0.5) * 0.24, h = 0.22 + e.rnd() * 0.32, lean = -0.05 - e.rnd() * 0.16;
    c.strokeStyle = e.rnd() < 0.3 ? "#8a8c5a" : e.rnd() < 0.6 ? "#c9b071" : "#dcc68c";
    c.lineWidth = 0.008 + e.rnd() * 0.008;
    c.beginPath();
    c.moveTo(x, 0);
    c.quadraticCurveTo(x + lean * 0.3, -h * 0.6, x + lean, -h);
    c.stroke();
  }
});
