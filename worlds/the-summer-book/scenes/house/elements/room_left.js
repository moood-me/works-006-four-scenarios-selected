// The room's left wall (facing into the room: its x runs away along the house's frame, u = z, 0.05…3.85): the paper,
// a skirting board, a small shelf with Grandmother's books and a glass float, a hook with her grey cardigan. Metres
// from the frame's z 0 at the floor.
g.fillStyle = '#ddd6c6';
g.fillRect(0.05, -2.62, 3.8, 2.64);
g.fillStyle = 'rgba(130,146,160,0.35)';
for (let row = 0; row < 11; row++) {
  const y = -2.5 + row * 0.22;
  for (let x = 0.1 + (row % 2) * 0.11; x < 3.85; x += 0.22) {
    g.beginPath();
    g.ellipse(x, y, 0.012, 0.022, 0.4, 0, 6.2832);
    g.fill();
  }
}
g.fillStyle = '#bcb5a6';
g.fillRect(0.05, -0.12, 3.8, 0.14);
g.fillStyle = '#e8e3d8';
g.fillRect(0.05, -2.62, 3.8, 0.06);
// the shelf and its books, a green glass float
g.fillStyle = '#a58c6c';
g.fillRect(0.55, -1.62, 0.8, 0.03);
const BOOKS = ['#7c6a58', '#8e9a8a', '#a07a62', '#6c7884', '#b39f78'];
let x = 0.6;
for (let i = 0; i < 9; i++) {
  const w = 0.03 + 0.02 * e.rnd();
  const h = 0.16 + 0.06 * e.rnd();
  g.fillStyle = BOOKS[i % 5];
  g.fillRect(x, -1.62 - h, w, h);
  x += w + 0.004;
}
g.fillStyle = '#6f9a86';
g.beginPath();
g.arc(1.2, -1.7, 0.075, 0, 6.2832);
g.fill();
g.strokeStyle = '#8a7a64';
g.lineWidth = 0.01;
g.beginPath();
g.arc(1.2, -1.7, 0.075, 0, 6.2832);
g.stroke();
// the hook and the cardigan hanging from it
g.fillStyle = '#5b5550';
g.fillRect(0.3, -1.82, 0.02, 0.03);
g.fillStyle = '#9b9c98';
g.beginPath();
g.moveTo(0.31, -1.8);
g.bezierCurveTo(0.12, -1.72, 0.1, -1.4, 0.16, -1.1);
g.lineTo(0.46, -1.1);
g.bezierCurveTo(0.52, -1.4, 0.5, -1.72, 0.31, -1.8);
g.closePath();
g.fill();
g.strokeStyle = 'rgba(110,110,104,0.6)';
g.lineWidth = 0.006;
for (const k of [0.2, 0.26, 0.36, 0.42]) {
  g.beginPath();
  g.moveTo(k + 0.02, -1.66);
  g.lineTo(k, -1.12);
  g.stroke();
}
