// A close-up of Papa's sea chart on the veranda table at night (an insert, `chart`): the open sea with its compass rose,
// the island far out with its lighthouse, ringed in his pencil, a corner of the island's plan; his pencil and his
// dividers lying on it; the lamp's warm pool on the paper, the table's boards dark past it — the light painted, as an
// insert's is. The chart is the world's module `chart`. Its point `chart#island` is the island.
const A = e.aspect, C = e.kit.chart;
// the table's boards
g.fillStyle = '#4a3322';
g.fillRect(-0.4, -0.05, A + 0.8, 1.1);
for (let y = -0.05; y < 1.05; y += 0.12) {
  g.fillStyle = `rgba(${e.rnd() < 0.5 ? '30, 18, 10' : '110, 76, 48'}, ${0.15 + 0.15 * e.rnd()})`;
  g.fillRect(-0.4, y, A + 0.8, 0.12);
  g.fillStyle = 'rgba(20, 12, 6, 0.6)';
  g.fillRect(-0.4, y + 0.116, A + 0.8, 0.004);
}
// the chart, a little askew: chart units → the insert's (its point (CX, CY) at (OX, OY), S a unit, turned by T)
const S = 0.036, T = -0.035, CX = 56, CY = 14, OX = A / 2 + 0.06, OY = 0.5;
const to = (x, y) => [OX + S * (Math.cos(T) * (x - CX) - Math.sin(T) * (y - CY)), OY + S * (Math.sin(T) * (x - CX) + Math.cos(T) * (y - CY))];
g.save();
g.translate(OX, OY);
g.rotate(T);
g.scale(S, S);
g.translate(-CX, -CY);
g.fillStyle = 'rgba(0, 0, 0, 0.35)';
g.fillRect(0.4, 0.5, C.W, C.H);
C.paint(g, { course: false });
// his pencil and his dividers
g.fillStyle = '#c9a23a';
g.save();
g.translate(44, 22.5);
g.rotate(-0.5);
g.fillRect(-5, -0.22, 9, 0.44);
g.fillStyle = '#e8c9a0';
g.beginPath();
g.moveTo(4, -0.22);
g.lineTo(5.2, 0);
g.lineTo(4, 0.22);
g.fill();
g.fillStyle = '#333';
g.beginPath();
g.moveTo(4.85, -0.07);
g.lineTo(5.2, 0);
g.lineTo(4.85, 0.07);
g.fill();
g.restore();
g.strokeStyle = '#8c8f94';
g.lineWidth = 0.22;
g.lineCap = 'round';
g.beginPath();
g.moveTo(66.5, 4);
g.lineTo(69.5, 11);
g.moveTo(66.5, 4);
g.lineTo(63.2, 10.6);
g.stroke();
g.fillStyle = '#a9adb3';
g.beginPath();
g.arc(66.5, 4, 0.45, 0, Math.PI * 2);
g.fill();
g.restore();
// the lamp's light: a warm pool on the paper from the lamp beyond the frame's top right, the edges dim
const pool = g.createRadialGradient(A * 0.62, 0.3, 0.05, A * 0.55, 0.45, 1.25);
pool.addColorStop(0, 'rgba(255, 214, 140, 0.22)');
pool.addColorStop(0.45, 'rgba(255, 190, 110, 0.06)');
pool.addColorStop(0.75, 'rgba(40, 24, 12, 0.25)');
pool.addColorStop(1, 'rgba(20, 12, 6, 0.6)');
g.fillStyle = pool;
g.fillRect(-0.4, -0.05, A + 0.8, 1.1);
const [ix, iy] = to(C.ISLAND[0], C.ISLAND[1]);
e.at(ix, iy, 'island');
