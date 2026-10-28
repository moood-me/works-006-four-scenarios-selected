// The wooden seal Sophia leaves on the table (`seal`): Grandmother's carving from the forest, pale driftwood with the
// knife's facets, lying on its belly, its head up, the flippers, the tail — nothing when it is not there. It always
// turns to the eye (no facing). Metres from the middle of its belly on the table; 0.34 m long.
if (e.state.seal) {
  g.fillStyle = '#c9b48f';
  g.beginPath();
  g.moveTo(-0.17, -0.02);
  g.bezierCurveTo(-0.16, -0.08, -0.06, -0.1, 0.05, -0.09);
  g.bezierCurveTo(0.1, -0.09, 0.12, -0.13, 0.15, -0.15);
  g.bezierCurveTo(0.18, -0.16, 0.19, -0.13, 0.18, -0.11);
  g.bezierCurveTo(0.17, -0.06, 0.13, -0.02, 0.1, 0);
  g.lineTo(-0.15, 0);
  g.closePath();
  g.fill();
  // the tail and the near flipper
  g.beginPath();
  g.moveTo(-0.15, -0.02);
  g.lineTo(-0.19, -0.05);
  g.lineTo(-0.185, 0.0);
  g.closePath();
  g.fill();
  g.fillStyle = '#b39d77';
  g.beginPath();
  g.moveTo(0.04, -0.03);
  g.lineTo(0.08, 0.0);
  g.lineTo(0.0, 0.0);
  g.closePath();
  g.fill();
  // the knife's facets and the eye
  g.strokeStyle = 'rgba(130,108,76,0.55)';
  g.lineWidth = 0.004;
  g.beginPath();
  g.moveTo(-0.1, -0.07);
  g.lineTo(-0.06, -0.02);
  g.moveTo(-0.02, -0.09);
  g.lineTo(0.02, -0.03);
  g.moveTo(0.08, -0.09);
  g.lineTo(0.1, -0.04);
  g.stroke();
  g.fillStyle = '#4b4034';
  g.beginPath();
  g.arc(0.155, -0.125, 0.007, 0, 6.2832);
  g.fill();
}
e.at(0, -0.06, 'seal');
