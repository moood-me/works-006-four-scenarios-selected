// The pot of oil warmed on the stove and carried up wrapped in Moominpappa's black frock coat (`pot`), set down by the
// lamp: a bundle of black cloth, the sleeves knotted round, the pot's handle and its lid's knob showing. Not there,
// nothing.
if (e.state.pot) {
  g.fillStyle = "#26262c";
  g.beginPath();
  g.moveTo(-0.24, 0);
  g.quadraticCurveTo(-0.28, -0.24, -0.12, -0.3);
  g.quadraticCurveTo(0.05, -0.36, 0.2, -0.27);
  g.quadraticCurveTo(0.3, -0.15, 0.25, 0);
  g.closePath();
  g.fill();
  g.strokeStyle = "#3a3a42";
  g.lineWidth = 0.035;
  g.beginPath();
  g.moveTo(-0.2, -0.12);
  g.quadraticCurveTo(0, -0.05, 0.22, -0.14);
  g.stroke();
  g.fillStyle = "#7a7670";
  g.fillRect(-0.02, -0.36, 0.04, 0.05);
  g.strokeStyle = "#7a7670";
  g.lineWidth = 0.02;
  g.beginPath();
  g.moveTo(0.24, -0.2);
  g.lineTo(0.36, -0.22);
  g.stroke();
  e.at(0, -0.2, "pot");
}
