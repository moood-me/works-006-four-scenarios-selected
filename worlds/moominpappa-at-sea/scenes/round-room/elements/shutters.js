// The window's shutters outside the glass, shut and tied against the storm (`shutters`): two leaves of grey planks, a
// crossbar, a rope. Open, they are folded back against the tower, out of sight from the room: nothing.
if (e.state.shutters) {
  const L = e.lib, w = 2 * L.WIN.half + 0.1, h = L.WIN.top - L.WIN.sill + 0.1;
  g.fillStyle = "#6f7b82";
  g.fillRect(-w / 2, -h, w, h);
  g.fillStyle = "rgba(30, 36, 42, 0.6)";
  for (let i = 1; i < 8; i++) g.fillRect(-w / 2 + (i * w) / 8, -h, 0.01, h);
  g.fillRect(-0.005, -h, 0.012, h);
  g.fillStyle = "#5c676e";
  g.fillRect(-w / 2, -h * 0.55, w, 0.09);
  g.strokeStyle = "#b39a6a";
  g.lineWidth = 0.02;
  g.beginPath();
  g.moveTo(-0.08, -h * 0.5);
  g.lineTo(0.08, -h * 0.58);
  g.moveTo(-0.08, -h * 0.58);
  g.lineTo(0.08, -h * 0.5);
  g.stroke();
}
