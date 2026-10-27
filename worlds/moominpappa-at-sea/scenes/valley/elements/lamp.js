// The paraffin lamp on the table: a brass foot, the glass font, a tall chimney and a white globe shade; its flame's
// light (`lamp#flame`) lights the veranda when the lamps are lit (`lamps`). The globe glows warm then (a layer).
g.fillStyle = '#b08a42';
g.beginPath();
g.moveTo(-0.07, 0);
g.quadraticCurveTo(-0.08, -0.04, -0.03, -0.06);
g.lineTo(-0.025, -0.14);
g.lineTo(0.025, -0.14);
g.lineTo(0.03, -0.06);
g.quadraticCurveTo(0.08, -0.04, 0.07, 0);
g.closePath();
g.fill();
g.fillStyle = 'rgba(190, 210, 214, 0.9)';
g.beginPath();
g.ellipse(0, -0.18, 0.06, 0.045, 0, 0, Math.PI * 2);
g.fill();
g.fillStyle = '#e9e6dc';
g.beginPath();
g.ellipse(0, -0.3, 0.085, 0.085, 0, 0, Math.PI * 2);
g.fill();
g.fillStyle = 'rgba(220, 232, 236, 0.85)';
g.fillRect(-0.022, -0.44, 0.044, 0.08);
e.layer('lit', {}, c => {
  const s = c.createRadialGradient(0, -0.3, 0, 0, -0.3, 0.09);
  s.addColorStop(0, '#fff3cf');
  s.addColorStop(1, '#ffd890');
  c.fillStyle = s;
  c.beginPath();
  c.ellipse(0, -0.3, 0.085, 0.085, 0, 0, Math.PI * 2);
  c.fill();
});
e.light(0, -0.3, 0.3, '#ffcf88', 1, 'flame');
