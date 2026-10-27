// The storm's wave coming in over the cape's rocks (`wave`, raised by the pieces as an event): a wall of white water
// and foam rising just beyond the stone (between them and the sea, facing the faces' camera) up to the shoulders of
// the two sitting there, washing over them, sinking back
// into the rock. One layer; its animate lifts it by `wave` (a storm only).
e.layer("wash", { box: [-2.6, -2.6, 2.6, 1.4] }, c => {
  const s = c.createLinearGradient(0, -1.3, 0, 0.05);
  s.addColorStop(0, "rgba(250, 252, 252, 0.95)");
  s.addColorStop(0.45, "rgba(226, 238, 240, 0.75)");
  s.addColorStop(1, "rgba(206, 222, 228, 0.55)");
  c.fillStyle = s;
  c.beginPath();
  c.moveTo(-2.5, 0.05);
  c.lineTo(-2.4, -0.7);
  c.quadraticCurveTo(-1.6, -1.35, -0.6, -1.1);
  c.quadraticCurveTo(0.2, -1.45, 1.0, -1.15);
  c.quadraticCurveTo(1.8, -1.3, 2.5, -0.6);
  c.lineTo(2.5, 0.05);
  c.closePath();
  c.fill();
  c.fillStyle = "rgba(255, 255, 255, 0.85)";
  for (let i = 0; i < 60; i++) {
    const x = -2.4 + 4.8 * e.rnd(), y = -1.35 + 0.5 * e.rnd() ** 1.4, r = 0.03 + 0.07 * e.rnd();
    c.beginPath();
    c.ellipse(x, y, r * 1.6, r * 0.7, 0, 0, Math.PI * 2);
    c.fill();
  }
});
