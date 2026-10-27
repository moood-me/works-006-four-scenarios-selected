// The stone from the boy's circle, left inside the door when he went away (`stone`): a round grey beach stone with a
// white band. Not there, nothing.
if (e.state.stone) {
  g.fillStyle = "#8f9196";
  g.beginPath();
  g.ellipse(0, -0.05, 0.1, 0.055, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#e8e6e0";
  g.lineWidth = 0.012;
  g.beginPath();
  g.ellipse(0, -0.05, 0.1, 0.02, 0.15, Math.PI * 0.1, Math.PI * 0.9);
  g.stroke();
  e.at(0, -0.06, "stone");
}
