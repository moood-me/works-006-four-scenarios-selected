// What goes into the boat, waiting on the jetty: Mama's big wicker basket with its lid, a bundle of blankets tied with
// string, the paraffin can. A layer shown while the set-up has it there (`luggage`).
e.layer('all', {}, c => {
  // the bundle
  c.fillStyle = '#c9a46a';
  c.beginPath();
  c.ellipse(-0.3, -0.17, 0.24, 0.17, 0, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = '#7a5a3a';
  c.lineWidth = 0.02;
  c.beginPath();
  c.moveTo(-0.32, -0.34);
  c.lineTo(-0.28, 0);
  c.stroke();
  // the basket
  c.fillStyle = '#b08a52';
  c.beginPath();
  c.moveTo(-0.08, 0);
  c.lineTo(-0.12, -0.32);
  c.lineTo(0.32, -0.32);
  c.lineTo(0.28, 0);
  c.closePath();
  c.fill();
  c.strokeStyle = 'rgba(110, 80, 44, 0.7)';
  c.lineWidth = 0.012;
  for (let y = -0.29; y < 0; y += 0.045) {
    c.beginPath();
    c.moveTo(-0.11, y);
    c.lineTo(0.31, y);
    c.stroke();
  }
  c.fillStyle = '#9c7848';
  c.fillRect(-0.14, -0.36, 0.48, 0.05);
  c.strokeStyle = '#8a6a40';
  c.lineWidth = 0.025;
  c.beginPath();
  c.arc(0.1, -0.36, 0.14, Math.PI, 0);
  c.stroke();
  // the paraffin can
  c.fillStyle = '#5f7a52';
  c.fillRect(0.36, -0.3, 0.13, 0.3);
  c.fillStyle = '#444';
  c.fillRect(0.4, -0.34, 0.04, 0.04);
});
