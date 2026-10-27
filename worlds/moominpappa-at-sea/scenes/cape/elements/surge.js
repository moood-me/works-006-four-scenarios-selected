// The storm's wave coming in over the cape's rocks and under the Fisherman as he sits (`storm`): a sheet of white
// water and foam spread over the stone toward the eye (painted below the card's foot), a low broken crest before it.
// One layer; its animate brings it in and draws it back as the waves come, only in a storm.
e.layer("wash", { box: [-2.4, -0.6, 2.4, 1.6] }, c => {
  const s = c.createLinearGradient(0, -0.3, 0, 1.5);
  s.addColorStop(0, "rgba(246, 250, 250, 0.85)");
  s.addColorStop(0.5, "rgba(214, 228, 232, 0.55)");
  s.addColorStop(1, "rgba(214, 228, 232, 0)");
  c.fillStyle = s;
  c.beginPath();
  c.moveTo(-2.3, -0.1);
  c.quadraticCurveTo(-1.2, -0.42, 0, -0.3);
  c.quadraticCurveTo(1.2, -0.45, 2.3, -0.15);
  c.lineTo(2.2, 1.4);
  c.quadraticCurveTo(0, 1.55, -2.2, 1.4);
  c.closePath();
  c.fill();
  c.fillStyle = "rgba(255, 255, 255, 0.8)";
  for (let i = 0; i < 70; i++) {
    const x = -2.2 + 4.4 * e.rnd(), y = -0.35 + 1.5 * e.rnd() ** 1.6, r = 0.04 + 0.1 * e.rnd();
    c.beginPath();
    c.ellipse(x, y, r * 1.6, r * 0.6, 0, 0, Math.PI * 2);
    c.fill();
  }
});
