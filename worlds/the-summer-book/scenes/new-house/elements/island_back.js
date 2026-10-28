// The island beyond the house, seen from the sea (it turns to the eye): its granite rising gently inland and on the
// crown the grey dead forest — bare crooked trunks and their crooked branches, uneven, taller toward the middle — a few
// dark living pines among them. Painted flat, as far things are. Metres from the middle of its foot; 180 m long,
// about 12 m high.
g.fillStyle = '#a49b94';
g.beginPath();
g.moveTo(-90, 1.2);
g.bezierCurveTo(-60, -2.5, -30, -4.2, 0, -4.4);
g.bezierCurveTo(30, -4.6, 60, -2.8, 90, 1.2);
g.closePath();
g.fill();
const ground = x => -4.4 * Math.cos((x / 90) * 1.45);
// the dead trees: bare crooked silver-grey trunks, a few crooked branches each, uneven, taller toward the middle
g.strokeStyle = '#8c8a83';
g.lineCap = 'round';
const trunks = new Path2D();
const twigs = new Path2D();
for (let i = 0; i < 110; i++) {
  const x = -78 + 156 * e.rnd();
  const h = (2.5 + 5.5 * e.rnd()) * (0.6 + 0.4 * Math.cos((x / 80) * 1.3));
  const lean = 0.5 + 0.8 * e.rnd();
  const y = ground(x);
  trunks.moveTo(x, y + 0.3);
  trunks.quadraticCurveTo(x + lean * 0.2, y - h * 0.6, x + lean, y - h);
  for (const k of [0.5, 0.75]) {
    const bx = x + lean * k * k;
    const by = y - h * k;
    twigs.moveTo(bx, by);
    twigs.lineTo(bx - 0.6 - 0.8 * e.rnd(), by - 0.5 - 0.6 * e.rnd());
    twigs.moveTo(bx, by);
    twigs.lineTo(bx + 0.7 + 0.8 * e.rnd(), by - 0.4 - 0.6 * e.rnd());
  }
}
g.lineWidth = 0.22;
g.stroke(trunks);
g.lineWidth = 0.08;
g.stroke(twigs);
// a few dark living pines
g.fillStyle = '#5f6a64';
for (let i = 0; i < 8; i++) {
  const x = -60 + 120 * e.rnd();
  const top = ground(x) - 6 - 3 * e.rnd();
  g.fillRect(x - 0.12, top + 2.5, 0.24, ground(x) - top - 2.3);
  for (const [dx, dy, rx, ry, a] of [[0.4, 1.2, 1.7, 0.6, -0.1], [-0.3, 2.4, 1.3, 0.45, 0.1]]) {
    g.beginPath();
    g.ellipse(x + dx, top + dy, rx, ry, a, 0, 6.2832);
    g.fill();
  }
}
g.fillStyle = '#958c85';
g.fillRect(-90, 0, 180, 1.2);
