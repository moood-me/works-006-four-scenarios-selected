// Moominmamma's pie on the rock beside the Fisherman (`pie`): a round golden pie with the valley's jam showing through
// its lattice, in its tin; a piece broken off when he has eaten (the pie stays as set — the piece is the game's moment).
if (e.state.pie) {
  g.fillStyle = "#8a8f94";
  g.beginPath();
  g.moveTo(-0.2, -0.02);
  g.lineTo(-0.22, -0.07);
  g.lineTo(0.22, -0.07);
  g.lineTo(0.2, -0.02);
  g.closePath();
  g.fill();
  g.fillStyle = "#d7a457";
  g.beginPath();
  g.ellipse(0, -0.075, 0.2, 0.045, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#9c3a3a";
  g.beginPath();
  g.ellipse(0, -0.08, 0.15, 0.03, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#e2b468";
  g.lineWidth = 0.014;
  for (let x = -0.12; x <= 0.12; x += 0.06) {
    g.beginPath();
    g.moveTo(x - 0.03, -0.055);
    g.lineTo(x + 0.03, -0.105);
    g.stroke();
  }
  e.at(0, -0.08, "pie");
}
