// The ship's lantern on its bracket at the bow: the bracket, and the lantern on it (a layer, gone from it while the son
// holds it — `lantern_at` "troll"); its glass glowing warm while it burns there (layer lit; its light `bow_lantern`
// from `lantern#flame`, on while `lantern_at` is "bow").
g.fillStyle = '#3a3632';
g.fillRect(-0.02, -0.1, 0.04, 0.24);
g.fillRect(-0.1, 0.12, 0.2, 0.03);
e.layer('lamp', {}, c => {
  c.fillStyle = '#a5874f';
  c.fillRect(-0.09, -0.36, 0.18, 0.05);
  c.fillRect(-0.09, -0.12, 0.18, 0.04);
  c.fillStyle = '#58646c';
  c.fillRect(-0.075, -0.31, 0.15, 0.19);
  c.fillStyle = '#a5874f';
  c.beginPath();
  c.moveTo(-0.09, -0.36);
  c.lineTo(0, -0.45);
  c.lineTo(0.09, -0.36);
  c.fill();
  c.strokeStyle = '#a5874f';
  c.lineWidth = 0.012;
  c.beginPath();
  c.arc(0, -0.47, 0.04, Math.PI, 0);
  c.stroke();
});
e.layer('lit', {}, c => {
  c.fillStyle = '#ffd890';
  c.fillRect(-0.075, -0.31, 0.15, 0.19);
  c.fillStyle = '#fff4d0';
  c.fillRect(-0.03, -0.27, 0.06, 0.11);
  e.light(0, -0.21, 0.3, '#ffcf88', 1, 'flame');
});
e.at(0, -0.21, 'lantern');
