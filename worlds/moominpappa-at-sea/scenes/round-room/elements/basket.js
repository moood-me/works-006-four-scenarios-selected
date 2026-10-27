// Moominmamma's basket packed for going home, set down by the door (`basket`): a round wicker basket, a blanket folded
// on top, a jar's paper lid showing. Not there, nothing.
if (e.state.basket) {
  g.fillStyle = "#b8935a";
  g.beginPath();
  g.moveTo(-0.24, -0.26);
  g.lineTo(0.24, -0.26);
  g.lineTo(0.2, 0);
  g.lineTo(-0.2, 0);
  g.closePath();
  g.fill();
  g.strokeStyle = "rgba(110, 82, 46, 0.7)";
  g.lineWidth = 0.008;
  for (let y = -0.24; y < 0; y += 0.04) {
    g.beginPath();
    g.moveTo(-0.23, y);
    g.lineTo(0.23, y);
    g.stroke();
  }
  g.fillStyle = "#c9a065";
  g.beginPath();
  g.ellipse(0, -0.28, 0.22, 0.06, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "rgba(92, 112, 132, 0.6)";
  g.lineWidth = 0.02;
  g.beginPath();
  g.moveTo(-0.15, -0.3);
  g.lineTo(0.15, -0.26);
  g.stroke();
  g.fillStyle = "#efe6d2";
  g.fillRect(0.06, -0.37, 0.09, 0.04);
  g.strokeStyle = "#8a6a3c";
  g.lineWidth = 0.025;
  g.beginPath();
  g.moveTo(-0.2, -0.27);
  g.quadraticCurveTo(0, -0.62, 0.2, -0.27);
  g.stroke();
  e.at(0, -0.3, "basket");
}
