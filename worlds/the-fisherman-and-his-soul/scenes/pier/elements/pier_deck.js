// The pier's deck from above: weathered planks laid across it (x across its 1.5 m, y along its length toward the
// viewer), each its own grey-brown, nail heads at their ends; darker where the spray wets its edges; under snow
// (`snow`, 4.3) white over the planks, their joints showing
const L = 9.95 / 2;
g.fillStyle = '#5a4c40';
g.fillRect(-0.75, -L, 1.5, 2 * L);
let y = -L;
let i = 0;
while (y < L) {
  const w = 0.17 + 0.03 * e.anim.hash(i, 1);
  const tone = 112 + Math.round(26 * e.anim.hash(i, 2));
  g.fillStyle = `rgb(${tone + 10}, ${tone - 2}, ${tone - 18})`;
  const x0 = -0.75 + 0.02 * e.anim.hash(i, 3);
  const x1 = 0.75 - 0.02 * e.anim.hash(i, 4);
  g.fillRect(x0, y, x1 - x0, w - 0.016);
  g.fillStyle = 'rgba(60, 48, 38, 0.6)';
  for (const nx of [-0.62, 0.62]) g.fillRect(nx - 0.01, y + w / 2 - 0.01, 0.02, 0.02);
  y += w;
  i++;
}
const wet = g.createLinearGradient(-0.75, 0, 0.75, 0);
wet.addColorStop(0, 'rgba(40, 34, 30, 0.35)');
wet.addColorStop(0.12, 'rgba(40, 34, 30, 0)');
wet.addColorStop(0.88, 'rgba(40, 34, 30, 0)');
wet.addColorStop(1, 'rgba(40, 34, 30, 0.35)');
g.fillStyle = wet;
g.fillRect(-0.75, -L, 1.5, 2 * L);
if (e.state.snow) {
  g.fillStyle = 'rgba(236, 240, 246, 0.88)';
  g.fillRect(-0.75, -L, 1.5, 2 * L);
  g.fillStyle = 'rgba(170, 180, 196, 0.5)';
  for (let k = 0; k < 50; k++) g.fillRect(-0.75, -L + k * 0.2, 1.5, 0.01);
}
