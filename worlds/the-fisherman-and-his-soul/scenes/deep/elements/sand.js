// The sea's floor from above (its centre 30 m ahead; x across, y toward the viewer — a point `distance` ahead is at
// y = 30 − distance): pale sand, broad soft patches a little darker and lighter, ripple marks across it near (each a
// dark trough and a pale crest beside it), pebbles and shells scattered, a dark fringe of weed's shade by the stone's
// foot (3.2 m right, 9 m ahead)
const Y = d => 30 - d;
const h = (i, s) => e.anim.hash(i, s);
g.fillStyle = '#dccda4';
g.fillRect(-60, -40, 120, 80);
for (let i = 0; i < 70; i++) {
  const x = -40 + 80 * h(i, 1);
  const y = Y(-4 + 50 * h(i, 2));
  const r = 1.5 + 5 * h(i, 3);
  const c = h(i, 4) > 0.5 ? '232, 222, 190' : '184, 170, 132';
  const blot = g.createRadialGradient(x, y, 0, x, y, r);
  blot.addColorStop(0, `rgba(${c}, 0.45)`);
  blot.addColorStop(1, `rgba(${c}, 0)`);
  g.fillStyle = blot;
  g.fillRect(x - r, y - r, 2 * r, 2 * r);
}
// ripple marks: long wavy lines across, 0.45 m apart, from under the viewer to 30 m out
for (let i = 0; i < 70; i++) {
  const d = -1.5 + i * 0.45;
  const line = new Path2D();
  const phase = 6 * h(i, 5);
  line.moveTo(-32, Y(d));
  for (let k = 1; k <= 16; k++) {
    const x = -32 + k * 4;
    const w = 0.12 * Math.sin(x * 0.35 + phase) + 0.06 * Math.sin(x * 0.9 + 2 * phase);
    line.quadraticCurveTo(x - 2, Y(d) + w + 0.1 * (h(i * 16 + k, 6) - 0.5), x, Y(d) + w);
  }
  g.strokeStyle = 'rgba(150, 132, 96, 0.4)';
  g.lineWidth = 0.06;
  g.stroke(line);
  g.save();
  g.translate(0, -0.08);
  g.strokeStyle = 'rgba(246, 238, 214, 0.55)';
  g.lineWidth = 0.045;
  g.stroke(line);
  g.restore();
}
// pebbles and shells
for (let i = 0; i < 260; i++) {
  const x = -12 + 24 * h(i, 7);
  const y = Y(-1 + 22 * h(i, 8));
  const r = 0.02 + 0.05 * h(i, 9);
  const kind = h(i, 10);
  g.fillStyle = kind < 0.5 ? '#9a9486' : kind < 0.8 ? '#efe6d6' : '#c9a58e';
  g.beginPath();
  g.ellipse(x, y, r * 1.4, r, 3 * h(i, 11), 0, Math.PI * 2);
  g.fill();
}
// the shade of weed round the stone's foot
const foot = g.createRadialGradient(3.2, Y(9), 1.6, 3.2, Y(9), 4.2);
foot.addColorStop(0, 'rgba(96, 112, 84, 0.55)');
foot.addColorStop(1, 'rgba(96, 112, 84, 0)');
g.fillStyle = foot;
g.fillRect(-1.2, Y(9) - 4.4, 8.8, 8.8);
