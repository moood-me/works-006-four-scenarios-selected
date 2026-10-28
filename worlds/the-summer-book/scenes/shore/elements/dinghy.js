// The dinghy (тузик): a small blunt pram, pale blue-grey paint worn to the wood at the gunwale, one thwart, two short
// oars in their rowlocks; seen side-on, bow to the right. It rides the water (the layer `hull`, rocked by animate);
// where it is and which way it faces are the scene's (`dinghy`, `dinghy_at`: its place's keys). Metres from the middle
// of its waterline; 2.3 m long. Points: `oars` (the oars' looms over the thwart, where the hands are), `seat` (the
// thwart), `bow` (where it is held by the nose).
e.layer('hull', { pivot: [0, 0] }, c => {
  c.fillStyle = '#9fb0b6';
  c.beginPath();
  c.moveTo(-1.15, -0.5);
  c.lineTo(1.1, -0.55);
  c.lineTo(1.0, -0.12);
  c.bezierCurveTo(0.8, 0.08, 0.4, 0.1, 0, 0.1);
  c.bezierCurveTo(-0.5, 0.1, -0.95, 0.06, -1.1, -0.12);
  c.closePath();
  c.fill();
  c.fillStyle = '#b39a76';
  c.beginPath();
  c.moveTo(-1.18, -0.54);
  c.lineTo(1.13, -0.59);
  c.lineTo(1.12, -0.5);
  c.lineTo(-1.16, -0.45);
  c.closePath();
  c.fill();
  c.strokeStyle = 'rgba(70,84,90,0.45)';
  c.lineWidth = 0.018;
  c.beginPath();
  c.moveTo(-1.08, -0.25);
  c.lineTo(1.04, -0.3);
  c.stroke();
  // the oars: from the rowlocks out and down into the water on either side of the thwart
  c.strokeStyle = '#a58f6c';
  c.lineWidth = 0.035;
  c.beginPath();
  c.moveTo(-0.15, -0.72);
  c.lineTo(-0.55, -0.62);
  c.lineTo(-1.6, 0.05);
  c.stroke();
  c.fillStyle = '#a58f6c';
  c.beginPath();
  c.ellipse(-1.62, 0.06, 0.18, 0.06, -0.55, 0, 6.2832);
  c.fill();
  e.at(-0.25, -0.7, 'oars');
  e.at(0.05, -0.5, 'seat');
  e.at(1.05, -0.55, 'bow');
});
