// The straw hat on its nail by the door: a wide-brimmed summer hat of pale straw, a faded blue ribbon round the crown
// tied in a bow, hung from the nail by the ribbon's loop; seen from the front, tilted a little. Metres from the middle
// of its brim; the nail 0.33 m over it.
g.fillStyle = '#5b5550';
g.fillRect(-0.01, -0.36, 0.02, 0.025);
g.strokeStyle = '#8396a8';
g.lineWidth = 0.012;
g.beginPath();
g.moveTo(-0.05, -0.2);
g.lineTo(0, -0.345);
g.lineTo(0.05, -0.2);
g.stroke();
// the brim, tilted toward us: a wide ellipse
g.fillStyle = '#d9c48e';
g.beginPath();
g.ellipse(0, -0.04, 0.22, 0.09, -0.06, 0, 6.2832);
g.fill();
// the straw's weave on the brim: rings
g.strokeStyle = 'rgba(160,136,86,0.45)';
g.lineWidth = 0.006;
for (const k of [0.55, 0.75, 0.92]) {
  g.beginPath();
  g.ellipse(0, -0.04, 0.22 * k, 0.09 * k, -0.06, 0, 6.2832);
  g.stroke();
}
// the crown
g.fillStyle = '#e1cd98';
g.beginPath();
g.moveTo(-0.11, -0.05);
g.bezierCurveTo(-0.12, -0.17, -0.07, -0.21, 0, -0.21);
g.bezierCurveTo(0.07, -0.21, 0.12, -0.17, 0.11, -0.05);
g.closePath();
g.fill();
// the ribbon round it and its bow
g.fillStyle = '#8396a8';
g.fillRect(-0.112, -0.1, 0.224, 0.035);
g.beginPath();
g.ellipse(0.1, -0.08, 0.035, 0.02, 0.5, 0, 6.2832);
g.ellipse(0.13, -0.06, 0.03, 0.016, -0.3, 0, 6.2832);
g.fill();
e.at(0, -0.1, 'hat');
