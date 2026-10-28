// The veranda seen through its glass from outside: its back wall — the house's wall, boarded, painted a pale grey-green
// gone dim —, the glass door into the room on the right, a shelf of books, and Papa's table under the windows with his
// papers in piles and the lamp; by the door, on its nail, the straw hat (`hat`: nail — there; none — gone). Darker
// toward the ceiling. Metres from the middle of its foot; 3.4 m wide, 3 m high.
const W = 1.7;
g.fillStyle = '#9da39a';
g.fillRect(-W, -3.0, 2 * W, 3.05);
g.strokeStyle = 'rgba(80,88,82,0.35)';
g.lineWidth = 0.02;
for (let x = -W + 0.14; x < W; x += 0.14) {
  g.beginPath();
  g.moveTo(x, -3.0);
  g.lineTo(x, 0);
  g.stroke();
}
const shade = g.createLinearGradient(0, -3.0, 0, -1.6);
shade.addColorStop(0, 'rgba(50,56,54,0.55)');
shade.addColorStop(1, 'rgba(50,56,54,0)');
g.fillStyle = shade;
g.fillRect(-W, -3.0, 2 * W, 1.4);
// the glass door into the room
g.fillStyle = '#e6e4dc';
g.fillRect(0.75, -2.15, 0.8, 2.15);
g.fillStyle = '#6d7a7c';
g.fillRect(0.82, -2.05, 0.66, 1.2);
g.fillStyle = '#5d6264';
g.fillRect(0.82, -0.8, 0.66, 0.75);
// the straw hat on its nail by the door
if ((e.state.hat ?? 'nail') === 'nail') {
  g.fillStyle = '#4f4a44';
  g.fillRect(0.6, -1.95, 0.025, 0.04);
  g.fillStyle = '#d8c48c';
  g.beginPath();
  g.ellipse(0.61, -1.72, 0.2, 0.05, 0, 0, 6.2832);
  g.fill();
  g.fillStyle = '#cdb878';
  g.beginPath();
  g.ellipse(0.61, -1.8, 0.11, 0.09, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = '#8a5a3c';
  g.fillRect(0.5, -1.77, 0.22, 0.025);
  e.at(0.61, -1.78, 'hat');
}
// a shelf of books
g.fillStyle = '#7c6a58';
g.fillRect(-1.5, -2.05, 1.0, 0.04);
const BOOKS = ['#8a4a3c', '#3f5868', '#b29a62', '#5b6a4a', '#7a5a7a', '#a8a091'];
for (let i = 0; i < 12; i++) {
  g.fillStyle = BOOKS[i % 6];
  g.fillRect(-1.48 + i * 0.08, -2.3 + (i % 3) * 0.02, 0.065, 0.25 - (i % 3) * 0.02);
}
// Papa's table: its top, the papers, the lamp with its shade
g.fillStyle = '#6b5c4c';
g.fillRect(-1.6, -0.8, 1.9, 0.06);
g.fillStyle = '#efece4';
g.fillRect(-1.4, -0.86, 0.36, 0.06);
g.fillRect(-0.95, -0.9, 0.3, 0.1);
g.fillStyle = '#4f5552';
g.fillRect(-0.3, -1.4, 0.03, 0.6);
g.fillStyle = '#c9b77e';
g.beginPath();
g.moveTo(-0.46, -1.4);
g.lineTo(-0.12, -1.4);
g.lineTo(-0.2, -1.58);
g.lineTo(-0.38, -1.58);
g.closePath();
g.fill();
