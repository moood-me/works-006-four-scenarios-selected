// The floor seen from above (its centre 2.8 m ahead; x across, y toward the viewer — a point `distance` ahead is at
// y = 2.8 − distance): wide old boards running into the room, each its own brown, worn paler where feet go (from the
// door to the hearth), dark in the corners
const Y = d => 2.8 - d;
g.fillStyle = '#6a5038';
g.fillRect(-2.7, -2.3, 5.4, 4.6);
let x = -2.7;
let i = 0;
while (x < 2.7) {
  const w = 0.22 + 0.06 * e.anim.hash(i, 1);
  const tone = 104 + Math.round(26 * e.anim.hash(i, 2));
  g.fillStyle = 'rgb(' + (tone + 16) + ', ' + (tone - 6) + ', ' + (tone - 30) + ')';
  g.fillRect(x + 0.008, -2.3, w - 0.016, 4.6);
  x += w;
  i++;
}
const worn = g.createRadialGradient(0.2, Y(2.6), 0, 0.2, Y(2.6), 1.8);
worn.addColorStop(0, 'rgba(200, 170, 130, 0.3)');
worn.addColorStop(1, 'rgba(200, 170, 130, 0)');
g.fillStyle = worn;
g.fillRect(-2.0, Y(4.4), 4.4, 3.6);
