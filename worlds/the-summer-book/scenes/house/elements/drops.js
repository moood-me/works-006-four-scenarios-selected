// The doctor's drops on the sill (`drops`): a small brown glass bottle, a paper label, a dropper in its cork — full
// (dark) or empty (the glass light); nothing before the doctor came. Metres from its foot on the sill.
const s = e.state.drops;
if (s === 'full' || s === 'empty') {
  g.fillStyle = s === 'full' ? '#5b3a22' : '#a98a6c';
  g.beginPath();
  g.moveTo(-0.022, 0);
  g.lineTo(-0.022, -0.06);
  g.quadraticCurveTo(-0.022, -0.075, -0.01, -0.08);
  g.lineTo(-0.01, -0.09);
  g.lineTo(0.01, -0.09);
  g.lineTo(0.01, -0.08);
  g.quadraticCurveTo(0.022, -0.075, 0.022, -0.06);
  g.lineTo(0.022, 0);
  g.closePath();
  g.fill();
  g.fillStyle = '#efe9d8';
  g.fillRect(-0.02, -0.05, 0.04, 0.025);
  g.fillStyle = '#3a3634';
  g.fillRect(-0.008, -0.12, 0.016, 0.032);
}
