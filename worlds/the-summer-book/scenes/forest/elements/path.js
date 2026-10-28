// The path to the other side of the island, going off between the dead trees ahead on the left: a worn line through
// the moss and three flat stones on it (night: Grandmother goes along it with her lantern). Seen from above, metres;
// the plane's middle at across -1.9, distance 10: a point (x, z) of the world is (x + 1.9, 10 - z) here. Its points
// `stone1` (the nearest), `stone2`, `stone3`.
const X = x => x + 1.9;
const Y = z => 10 - z;
g.globalAlpha = 0.55;
g.strokeStyle = '#8f8574';
g.lineCap = 'round';
g.lineWidth = 0.55;
g.beginPath();
g.moveTo(X(-0.4), Y(5.6));
g.bezierCurveTo(X(-1.0), Y(8), X(-1.8), Y(10.5), X(-3.4), Y(14.5));
g.stroke();
g.globalAlpha = 1;
const STONES = [[-1.0, 7.5, 0.3, 0.22, 0.3], [-1.8, 10.0, 0.32, 0.24, -0.2], [-2.8, 12.8, 0.3, 0.22, 0.4]];
STONES.forEach(([x, z, rx, rz, a], k) => {
  g.fillStyle = '#7f7973';
  g.beginPath();
  g.ellipse(X(x), Y(z + 0.04), rx * 1.06, rz * 1.06, a, 0, 6.2832);
  g.fill();
  g.fillStyle = '#9b958e';
  g.beginPath();
  g.ellipse(X(x), Y(z), rx, rz, a, 0, 6.2832);
  g.fill();
  e.at(X(x), Y(z), 'stone' + (k + 1));
});
