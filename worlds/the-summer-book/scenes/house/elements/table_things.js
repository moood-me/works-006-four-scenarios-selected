// What stands on Papa's table: the white enamel coffee pot with its blue rim and a jar of pencils — at supper (`supper`)
// the jar gone, a tall jug of milk instead; nothing on the last morning (`packed`). Metres from the middle of their
// foot on the table top.
if (!e.state.packed) {
  g.fillStyle = '#ecebe6';
  g.beginPath();
  g.moveTo(-0.24, 0);
  g.lineTo(-0.22, -0.2);
  g.lineTo(-0.16, -0.24);
  g.lineTo(-0.1, -0.2);
  g.lineTo(-0.08, 0);
  g.closePath();
  g.fill();
  g.fillStyle = '#4c6478';
  g.fillRect(-0.2, -0.255, 0.08, 0.02);
  g.fillRect(-0.24, -0.015, 0.16, 0.015);
  // its spout and handle
  g.strokeStyle = '#ecebe6';
  g.lineWidth = 0.014;
  g.beginPath();
  g.moveTo(-0.235, -0.15);
  g.lineTo(-0.29, -0.2);
  g.stroke();
  g.beginPath();
  g.arc(-0.07, -0.12, 0.04, -1.4, 1.4);
  g.stroke();
  if (e.state.supper) {
    // the milk jug
    g.fillStyle = '#e9ebe8';
    g.beginPath();
    g.moveTo(0.16, 0);
    g.lineTo(0.15, -0.16);
    g.lineTo(0.13, -0.2);
    g.lineTo(0.25, -0.2);
    g.lineTo(0.23, -0.16);
    g.lineTo(0.22, 0);
    g.closePath();
    g.fill();
    g.fillStyle = '#7d93a3';
    g.fillRect(0.155, -0.12, 0.07, 0.015);
  } else {
    // the jar of pencils
    g.fillStyle = 'rgba(190,200,200,0.8)';
    g.fillRect(0.18, -0.1, 0.07, 0.1);
    g.strokeStyle = '#6a5a48';
    g.lineWidth = 0.008;
    for (const [x, a] of [[0.2, -0.2], [0.215, 0.05], [0.23, 0.25]]) {
      g.beginPath();
      g.moveTo(x, -0.06);
      g.lineTo(x + Math.sin(a) * 0.12, -0.06 - Math.cos(a) * 0.12);
      g.stroke();
    }
  }
}
