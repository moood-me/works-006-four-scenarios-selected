// The rowing boat moored at the pier's end: a small clinker-built boat, white gone grey, a dark rubbing strake, two oars
// laid along the thwarts; seen side-on, bow to the right. It rides the still water (the layer `hull`, rocked by animate).
// Metres from the middle of its waterline; 3.6 m long. Not here while it is out at the nets by night (`boat_out`: the
// far boat, `far_boat`).
if (e.state.boat_out) return;
e.layer('hull', { pivot: [0, 0] }, c => {
  c.fillStyle = '#d6d3cc';
  c.beginPath();
  c.moveTo(-1.8, -0.62);
  c.lineTo(1.85, -0.72);
  c.bezierCurveTo(1.6, -0.2, 1.2, 0.08, 0.6, 0.12);
  c.lineTo(-1.2, 0.12);
  c.bezierCurveTo(-1.6, 0.05, -1.75, -0.3, -1.8, -0.62);
  c.closePath();
  c.fill();
  c.strokeStyle = 'rgba(120,118,112,0.6)';
  c.lineWidth = 0.02;
  for (let k = 1; k < 4; k++) {
    c.beginPath();
    c.moveTo(-1.8 + k * 0.03, -0.62 + k * 0.17);
    c.bezierCurveTo(-0.8, -0.6 + k * 0.17, 0.8, -0.66 + k * 0.17, 1.8 - k * 0.12, -0.72 + k * 0.19);
    c.stroke();
  }
  c.fillStyle = '#3f4a52';
  c.beginPath();
  c.moveTo(-1.82, -0.66);
  c.lineTo(1.88, -0.76);
  c.lineTo(1.84, -0.66);
  c.lineTo(-1.79, -0.57);
  c.closePath();
  c.fill();
  // the oars, their blades over the stern
  c.strokeStyle = '#a58f6c';
  c.lineWidth = 0.045;
  c.beginPath();
  c.moveTo(-2.1, -0.82);
  c.lineTo(1.1, -0.74);
  c.stroke();
  c.fillStyle = '#a58f6c';
  c.fillRect(-2.3, -0.87, 0.45, 0.1);
});
e.at(0, -0.7, 'boat');
