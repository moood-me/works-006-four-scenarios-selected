// The grey wool blanket pulled over Grandmother and Sophia in Grandmother's bed (`under` 0…1: seen), the lamp alight
// under it: seen from the room's side, a low hump along the bed, its near edge held up by Grandmother's hand over an
// opening where their faces and the lamp are (`cover` 1 held … 0 sagging over it: М8б). Translucent: the lamp glows
// through the wool. Metres along the bed from its middle (the foot at −0.78, the head at 0.78), up from the mattress.
// The point `edge`: where her hand holds it.
e.layer('wool', {}, c => {
  c.fillStyle = '#878b8f';
  c.beginPath();
  c.moveTo(-0.8, 0.02);
  c.bezierCurveTo(-0.74, -0.34, -0.4, -0.5, 0.05, -0.52);
  c.bezierCurveTo(0.5, -0.54, 0.76, -0.34, 0.8, 0.02);
  c.closePath();
  c.ellipse(0.36, -0.02, 0.33, 0.24, 0, 0, Math.PI, true);
  c.fill('evenodd');
  c.fillStyle = '#6f7478';
  for (const x of [-0.55, -0.48]) c.fillRect(x, -0.36, 0.025, 0.37);
  c.strokeStyle = 'rgba(70,74,78,0.5)';
  c.lineWidth = 0.008;
  c.beginPath();
  c.moveTo(-0.35, -0.47);
  c.quadraticCurveTo(-0.25, -0.25, -0.3, 0);
  c.moveTo(0.02, -0.5);
  c.quadraticCurveTo(0.08, -0.38, 0.0, -0.26);
  c.stroke();
});
// the edge held up over the opening: a fold of the wool, turning about its far end as it sags
e.layer('edge', { pivot: [0.7, -0.27] }, c => {
  c.fillStyle = '#7b7f83';
  c.beginPath();
  c.moveTo(0.02, -0.25);
  c.quadraticCurveTo(0.35, -0.33, 0.72, -0.3);
  c.lineTo(0.72, -0.22);
  c.quadraticCurveTo(0.35, -0.25, 0.04, -0.19);
  c.closePath();
  c.fill();
});
e.at(0.2, -0.25, 'edge');
