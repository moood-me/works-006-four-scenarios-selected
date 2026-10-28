// The wet stones of the path coming down from the island to the cape: three flat stones and their small neighbours, dark
// and glistening, laid over the rock (seen from above, metres; the plane's middle at across -1.75, distance 8.4: a
// point (x, z) of the world is (x + 1.75, 8.4 - z) here). Its points `stone1` (the highest), `stone2`, `stone3`.
const X = x => x + 1.75;
const Y = z => 8.4 - z;
const STONES = [[-3.4, 10.6, 0.36, 0.28, 0.4], [-1.1, 8.9, 0.34, 0.26, -0.3], [-0.1, 6.2, 0.32, 0.25, 0.2]];
const flat = (x, z, rx, rz, a, color) => {
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(X(x), Y(z), rx, rz, a, 0, 6.2832);
  g.fill();
};
for (let i = 0; i < 14; i++) {
  const u = e.rnd();
  const x = -3.6 + 3.8 * u + (e.rnd() - 0.5) * 0.9;
  const z = 10.9 - 4.8 * u + (e.rnd() - 0.5) * 0.9;
  flat(x, z, 0.08 + 0.1 * e.rnd(), 0.06 + 0.07 * e.rnd(), e.rnd() * 3, '#7c7671');
}
STONES.forEach(([x, z, rx, rz, a], k) => {
  flat(x, z + 0.04, rx * 1.06, rz * 1.06, a, '#6c6661');
  flat(x, z, rx, rz, a, '#868079');
  flat(x - rx * 0.25, z + rz * 0.2, rx * 0.45, rz * 0.3, a, '#9b968f');
  e.at(X(x), Y(z), 'stone' + (k + 1));
});
