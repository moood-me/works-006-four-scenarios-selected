// Grandmother's paraffin lamp (`lamp`): a pale green glass font on a brass foot, a brass burner, a tall clear chimney
// — on the night table, in the window, or burnt out in the window at dawn (the chimney sooted at its top); nothing
// when it is not in the room. Its light is the flame's glow (`flame`, the light `lamp`), lit as `lamp_lit` says.
// Metres from its foot; 0.42 m high. The point `lamp`: the lamp itself (raised to the glass, it is held there).
const s = e.state.lamp;
if (s !== 'none') {
  g.fillStyle = '#b8954e';
  g.fillRect(-0.055, -0.02, 0.11, 0.02);
  g.fillRect(-0.02, -0.07, 0.04, 0.05);
  g.fillStyle = '#9fc2a8';
  g.beginPath();
  g.ellipse(0, -0.12, 0.065, 0.055, 0, 0, 6.2832);
  g.fill();
  g.fillStyle = '#b8954e';
  g.fillRect(-0.035, -0.19, 0.07, 0.025);
  // the chimney, clear glass: its edges and a gleam
  g.strokeStyle = 'rgba(220,228,226,0.9)';
  g.lineWidth = 0.004;
  g.beginPath();
  g.moveTo(-0.025, -0.19);
  g.bezierCurveTo(-0.045, -0.23, -0.045, -0.26, -0.022, -0.29);
  g.lineTo(-0.018, -0.42);
  g.moveTo(0.025, -0.19);
  g.bezierCurveTo(0.045, -0.23, 0.045, -0.26, 0.022, -0.29);
  g.lineTo(0.018, -0.42);
  g.stroke();
  if (s === 'burnt') {
    g.fillStyle = 'rgba(40,36,34,0.75)';
    g.beginPath();
    g.moveTo(-0.022, -0.29);
    g.lineTo(-0.018, -0.42);
    g.lineTo(0.018, -0.42);
    g.lineTo(0.022, -0.29);
    g.closePath();
    g.fill();
  }
}
// the flame: a small bright tongue in its own layer (shown while lit), and its light
e.layer('flame', { blend: 'add' }, c => {
  c.fillStyle = '#ffd89a';
  c.beginPath();
  c.ellipse(0, -0.225, 0.009, 0.022, 0, 0, 6.2832);
  c.fill();
});
e.light(0, -0.23, 2.2, '#ffcf8e', 1.5, 'flame');
e.at(0, -0.2, 'lamp');
