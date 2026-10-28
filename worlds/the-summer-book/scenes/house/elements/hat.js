// Sophia's mother's straw hat (`hat`): on its nail by the glass door — a wide-brimmed summer hat of pale straw, a faded
// blue ribbon round the crown tied in a bow, hung by the ribbon's loop, seen from the front (the nail 0.33 m over the
// brim's middle) —; or lying on Sophia's bed, seen from above (the card laid face up: its middle 0.2 m up the card);
// or gone. Metres from the brim's middle on the nail, from the card's foot on the bed. The point `hat`.
const s = e.state.hat;
if (s === 'nail') {
  g.fillStyle = '#5b5550';
  g.fillRect(-0.01, -0.36, 0.02, 0.025);
  g.strokeStyle = '#8396a8';
  g.lineWidth = 0.012;
  g.beginPath();
  g.moveTo(-0.05, -0.2);
  g.lineTo(0, -0.345);
  g.lineTo(0.05, -0.2);
  g.stroke();
  g.fillStyle = '#d9c48e';
  g.beginPath();
  g.ellipse(0, -0.04, 0.22, 0.09, -0.06, 0, 6.2832);
  g.fill();
  g.strokeStyle = 'rgba(160,136,86,0.45)';
  g.lineWidth = 0.006;
  for (const k of [0.55, 0.75, 0.92]) {
    g.beginPath();
    g.ellipse(0, -0.04, 0.22 * k, 0.09 * k, -0.06, 0, 6.2832);
    g.stroke();
  }
  g.fillStyle = '#e1cd98';
  g.beginPath();
  g.moveTo(-0.11, -0.05);
  g.bezierCurveTo(-0.12, -0.17, -0.07, -0.21, 0, -0.21);
  g.bezierCurveTo(0.07, -0.21, 0.12, -0.17, 0.11, -0.05);
  g.closePath();
  g.fill();
  g.fillStyle = '#8396a8';
  g.fillRect(-0.112, -0.1, 0.224, 0.035);
  g.beginPath();
  g.ellipse(0.1, -0.08, 0.035, 0.02, 0.5, 0, 6.2832);
  g.ellipse(0.13, -0.06, 0.03, 0.016, -0.3, 0, 6.2832);
  g.fill();
  e.at(0, -0.1, 'hat');
} else if (s === 'bed') {
  const y = -0.2;
  g.fillStyle = '#d9c48e';
  g.beginPath();
  g.arc(0, y, 0.2, 0, 6.2832);
  g.fill();
  g.strokeStyle = 'rgba(160,136,86,0.45)';
  g.lineWidth = 0.006;
  for (const k of [0.62, 0.8, 0.94]) {
    g.beginPath();
    g.arc(0, y, 0.2 * k, 0, 6.2832);
    g.stroke();
  }
  g.fillStyle = '#8396a8';
  g.beginPath();
  g.arc(0, y, 0.105, 0, 6.2832);
  g.fill();
  g.fillStyle = '#e1cd98';
  g.beginPath();
  g.arc(0, y, 0.088, 0, 6.2832);
  g.fill();
  g.fillStyle = '#8396a8';
  g.beginPath();
  g.ellipse(0.11, y + 0.04, 0.035, 0.02, 0.6, 0, 6.2832);
  g.ellipse(0.13, y + 0.07, 0.03, 0.016, 1.2, 0, 6.2832);
  g.fill();
  e.at(0, y, 'hat');
}
