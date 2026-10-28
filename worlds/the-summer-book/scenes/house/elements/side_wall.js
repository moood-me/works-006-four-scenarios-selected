// The glazed wall's solid parts: the low wall of white-painted upright boards under the windows with its sill, and the
// band over them up to the ceiling; between them (0.8 to 2.25 m) the glazing. Metres from the veranda's far corner,
// running toward the viewer (x −6.4…0).
g.fillStyle = '#e1ddd4';
g.fillRect(-6.4, -0.8, 6.4, 0.82);
g.strokeStyle = 'rgba(150,144,132,0.45)';
g.lineWidth = 0.012;
for (let x = -6.4 + 0.12; x < 0; x += 0.12) {
  g.beginPath();
  g.moveTo(x, -0.8);
  g.lineTo(x, 0.02);
  g.stroke();
}
g.fillStyle = '#c4bdb0';
g.fillRect(-6.4, -0.08, 6.4, 0.1);
// the sill
g.fillStyle = '#f0eee8';
g.fillRect(-6.4, -0.84, 6.4, 0.05);
// over the windows
g.fillStyle = '#e8e5de';
g.fillRect(-6.4, -2.62, 6.4, 0.37);
