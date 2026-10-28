// Papa's big storm lantern out in the night, seen from the window far off (`far_light`, `far_light_at`): a dark
// little frame round a lit glass, and its light, carried a metre over the rock; nothing of it while it is not out.
// Metres from its foot. The point `lantern`.
e.layer('frame', {}, c => {
  c.fillStyle = '#3e4042';
  c.fillRect(-0.06, -0.3, 0.12, 0.03);
  c.fillRect(-0.06, -0.06, 0.12, 0.05);
  c.fillRect(-0.004, -0.34, 0.008, 0.04);
});
e.layer('glass', { blend: 'add' }, c => {
  c.fillStyle = '#ffe2a8';
  c.fillRect(-0.045, -0.27, 0.09, 0.21);
});
e.light(0, -0.17, 3, '#ffd08e', 1.6, 'flame');
e.at(0, -0.17, 'lantern');
