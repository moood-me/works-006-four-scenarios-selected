// The crevice in the cape's sea face behind the tent: a low wall of granite out of the water, a dark cleft slanting
// down it, and in the cleft a ledge just over the water — seen only from the sea (the card faces it; from the land the
// tent stands before it). Grandmother's shawl on the ledge (painted there by `shawl: ledge`). Metres from its
// foot on the water; 1 m long, 0.55 m high (drawn at K of the numbers below). Its point `shawl` (on the ledge).
const K = 0.42;
g.save();
g.scale(K, K);
g.fillStyle = '#a69c94';
g.beginPath();
g.moveTo(-1.2, 0.1);
g.bezierCurveTo(-1.1, -0.7, -0.6, -1.25, 0.1, -1.3);
g.bezierCurveTo(0.7, -1.28, 1.1, -0.8, 1.2, 0.1);
g.closePath();
g.fill();
for (let i = 0; i < 26; i++) {
  g.fillStyle = e.rnd() < 0.5 ? 'rgba(190,180,170,0.4)' : 'rgba(128,120,114,0.35)';
  g.beginPath();
  g.ellipse((e.rnd() - 0.5) * 2, -0.2 - 0.9 * e.rnd(), 0.05 + 0.12 * e.rnd(), 0.03 + 0.05 * e.rnd(), 0, 0, 6.2832);
  g.fill();
}
// the wet band at the water
g.fillStyle = '#6a706e';
g.fillRect(-1.2, -0.12, 2.4, 0.22);
// the cleft, dark, and the ledge in it
g.fillStyle = '#3e3d3c';
g.beginPath();
g.moveTo(-0.15, -1.25);
g.lineTo(0.1, -1.24);
g.lineTo(0.42, -0.2);
g.lineTo(0.05, -0.18);
g.closePath();
g.fill();
g.fillStyle = '#958c84';
g.beginPath();
g.moveTo(-0.02, -0.42);
g.lineTo(0.38, -0.44);
g.lineTo(0.44, -0.36);
g.lineTo(0.0, -0.34);
g.closePath();
g.fill();
g.restore();
// the shawl, grey wool, crumpled on the ledge, a corner hanging down over its edge
if (e.state.shawl === 'ledge') e.layer('shawl', {}, c => {
  c.scale(K, K);
  c.fillStyle = '#a7a6a0';
  c.beginPath();
  c.moveTo(0.02, -0.43);
  c.quadraticCurveTo(0.12, -0.53, 0.24, -0.48);
  c.quadraticCurveTo(0.36, -0.52, 0.4, -0.43);
  c.lineTo(0.38, -0.36);
  c.lineTo(0.3, -0.24);
  c.lineTo(0.24, -0.35);
  c.lineTo(0.04, -0.35);
  c.closePath();
  c.fill();
  c.strokeStyle = '#8e8d87';
  c.lineWidth = 0.01;
  c.beginPath();
  c.moveTo(0.1, -0.45);
  c.lineTo(0.2, -0.37);
  c.moveTo(0.28, -0.47);
  c.lineTo(0.33, -0.38);
  c.stroke();
});
e.at(0.22 * K, -0.42 * K, 'shawl');
