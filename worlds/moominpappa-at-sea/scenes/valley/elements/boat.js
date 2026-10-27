// The boat «Adventure» afloat by the jetty, side-on, her bow to the left (to the sea): a clinker hull of pale weathered
// blue with a white rail, her stub of a mast with the sail furled round it, the ship's lantern on its bracket at the
// bow — its glass glowing warm when it is lit (`lantern_bow`: the layer lit and the light `bow_lantern`). Her anchor is
// at the waterline; what is under the water the sea hides.
e.layer('hull', { pivot: [0, 0] }, c => {
  c.fillStyle = '#7f9cb0';
  c.beginPath();
  c.moveTo(1.8, -0.62);
  c.quadraticCurveTo(1.86, 0.1, 1.2, 0.3);
  c.quadraticCurveTo(-0.2, 0.42, -1.25, 0.25);
  c.quadraticCurveTo(-1.8, 0, -1.95, -0.78);
  c.quadraticCurveTo(-0.2, -0.55, 1.8, -0.62);
  c.closePath();
  c.fill();
  c.strokeStyle = 'rgba(52, 70, 86, 0.6)';
  c.lineWidth = 0.025;
  for (const k of [0.25, 0.48, 0.7]) {
    c.beginPath();
    c.moveTo(1.82, -0.62 + k * 0.62);
    c.quadraticCurveTo(-0.1, -0.53 + k * 0.72, -1.9 + k * 0.45, -0.76 + k * 0.78);
    c.stroke();
  }
  // the white rail
  c.strokeStyle = '#ecebe6';
  c.lineWidth = 0.07;
  c.beginPath();
  c.moveTo(1.8, -0.64);
  c.quadraticCurveTo(-0.2, -0.57, -1.96, -0.8);
  c.stroke();
  // her name on the bow
  c.fillStyle = '#2f3f4e';
  c.font = 'italic 0.13px Georgia, serif';
  c.textAlign = 'center';
  c.fillText(tr('Adventure'), -1.1, -0.38);
  // the mast and the furled sail
  c.fillStyle = '#6b5440';
  c.fillRect(0.05, -2.6, 0.07, 2.0);
  c.fillStyle = '#e7dfcf';
  c.beginPath();
  c.moveTo(0.06, -2.4);
  c.quadraticCurveTo(0.19, -1.55, 0.12, -0.75);
  c.lineTo(0.03, -0.75);
  c.quadraticCurveTo(-0.05, -1.55, 0.06, -2.4);
  c.fill();
  c.strokeStyle = 'rgba(120, 100, 80, 0.8)';
  c.lineWidth = 0.015;
  for (const y of [-2.05, -1.65, -1.25, -0.9]) {
    c.beginPath();
    c.moveTo(-0.03, y);
    c.lineTo(0.19, y + 0.03);
    c.stroke();
  }
  // the lantern at the bow: brass, its glass dark — lit, a warm layer over it and its light
  c.fillStyle = '#3a3632';
  c.fillRect(-1.72, -1.05, 0.04, 0.26);
  c.fillStyle = '#a5874f';
  c.fillRect(-1.79, -1.3, 0.17, 0.05);
  c.fillRect(-1.79, -1.08, 0.17, 0.04);
  c.fillStyle = '#58646c';
  c.fillRect(-1.77, -1.25, 0.13, 0.17);
  c.beginPath();
  c.moveTo(-1.79, -1.3);
  c.lineTo(-1.705, -1.38);
  c.lineTo(-1.62, -1.3);
  c.fillStyle = '#a5874f';
  c.fill();
});
e.layer('lit', { pivot: [0, 0] }, c => {
  c.fillStyle = '#ffd890';
  c.fillRect(-1.77, -1.25, 0.13, 0.17);
  c.fillStyle = '#fff4d0';
  c.fillRect(-1.73, -1.21, 0.05, 0.09);
  e.light(-1.705, -1.17, 0.35, '#ffcf88', 1, 'lantern');
});
e.at(-1.705, -1.17, 'lantern');
e.at(0, -0.6);
