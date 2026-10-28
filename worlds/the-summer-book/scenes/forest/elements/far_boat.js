// The family's boat far out on the water at night (`boat_out`): Papa at the nets, a small dark shape low on the water,
// the lantern on its pole — its glow (`lamp`; the scene's light `far_lamp` takes it, on `boat_out`) the one warm point
// out there, seen between the trees. Painted flat, as far things are. Metres from the middle of its waterline; 3.6 m long.
if (e.state.boat_out) {
  g.fillStyle = '#3a3f4a';
  g.beginPath();
  g.moveTo(-1.8, -0.6);
  g.lineTo(1.85, -0.7);
  g.bezierCurveTo(1.5, -0.1, 1.0, 0.1, 0.4, 0.1);
  g.lineTo(-1.2, 0.1);
  g.closePath();
  g.fill();
  g.beginPath();
  g.ellipse(-0.3, -0.95, 0.22, 0.32, 0.5, 0, 6.2832);
  g.fill();
  g.fillRect(0.9, -1.7, 0.05, 1.05);
}
e.light(0.92, -1.72, 0.25, '#ffcf86', 1.6, 'lamp');
e.at(0.92, -1.72, 'lamp');
