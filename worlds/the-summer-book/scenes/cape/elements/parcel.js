// The tent in its parcel, as Eriksson brought it (`tent: parcel`): the canvas rolled up and tied with string, the two
// poles and the pegs lying beside it, a coil of rope. Side-on, metres from the middle of its foot on the rock. One
// layer, painted once: its animate shows it while the tent is in its parcel (Sophia unrolls it in a piece).
e.at(0, -0.15, 'parcel');
e.layer('parcel', {}, g => {
  // the poles, lying behind the roll
  g.strokeStyle = '#8b7558';
  g.lineCap = 'round';
  g.lineWidth = 0.035;
  g.beginPath();
  g.moveTo(-0.72, -0.02);
  g.lineTo(0.62, -0.06);
  g.moveTo(-0.6, -0.05);
  g.lineTo(0.72, -0.02);
  g.stroke();
  // the roll of canvas
  g.fillStyle = '#ddd5c2';
  g.beginPath();
  g.ellipse(0, -0.14, 0.46, 0.14, 0, 0, 6.2832);
  g.fill();
  g.fillStyle = '#cfc6b1';
  g.beginPath();
  g.ellipse(0.43, -0.14, 0.05, 0.13, 0, 0, 6.2832);
  g.fill();
  g.strokeStyle = '#b9ae96';
  g.lineWidth = 0.01;
  for (const r of [0.03, 0.07, 0.1]) {
    g.beginPath();
    g.ellipse(0.43, -0.14, r * 0.38, r, 0, 0, 6.2832);
    g.stroke();
  }
  // the string round it
  g.strokeStyle = '#7d6c55';
  g.lineWidth = 0.012;
  for (const x of [-0.25, 0.15]) {
    g.beginPath();
    g.moveTo(x, -0.28);
    g.quadraticCurveTo(x + 0.03, -0.14, x, 0.0);
    g.stroke();
  }
  // a coil of rope and the pegs
  g.strokeStyle = '#b4a27e';
  g.lineWidth = 0.015;
  for (const r of [0.05, 0.08]) {
    g.beginPath();
    g.ellipse(-0.62, -0.03, r * 1.3, r * 0.35, 0, 0, 6.2832);
    g.stroke();
  }
  g.fillStyle = '#9a8566';
  for (const x of [0.52, 0.58, 0.64]) g.fillRect(x, -0.05, 0.12, 0.022);
});
