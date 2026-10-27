// The front window of the house's middle floor lit from inside: warm panes behind the white bars (a layer the lamps'
// key shows — `lamps`), and its glow, the light the room gives out (`window_lit#glow`).
e.layer('lit', {}, c => {
  c.fillStyle = '#ffd896';
  c.fillRect(-0.31, -1.0, 0.62, 1.0);
  c.fillStyle = '#fff0c8';
  c.fillRect(-0.24, -0.92, 0.2, 0.36);
  c.fillStyle = '#f4f1e8';
  c.fillRect(-0.035, -1.0, 0.07, 1.0);
  c.fillRect(-0.31, -0.535, 0.62, 0.07);
  e.light(0, -0.5, 0.7, '#ffcf88', 0.8, 'glow');
});
