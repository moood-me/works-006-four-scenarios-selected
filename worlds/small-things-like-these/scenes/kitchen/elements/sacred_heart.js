// The picture of the Sacred Heart on the wall left of the table (x −0.22…0.22, 0.58 m high): a gilt frame; inside,
// a figure in a red robe and a blue mantle, its head bowed a little, a pale glow behind it, the heart on its breast.
// Its small red lamp hangs under it on its bracket (`sacred_lamp`).
g.fillStyle = "#a8873e";
g.fillRect(-0.22, -0.58, 0.44, 0.52);
g.fillStyle = "#e6dcc0";
g.fillRect(-0.18, -0.54, 0.36, 0.44);
const halo = g.createRadialGradient(0, -0.43, 0.01, 0, -0.43, 0.12);
halo.addColorStop(0, "rgba(255, 236, 180, 0.9)");
halo.addColorStop(1, "rgba(255, 236, 180, 0)");
g.fillStyle = halo;
g.fillRect(-0.18, -0.54, 0.36, 0.24);
// the mantle and the robe
g.fillStyle = "#3e5d8a";
g.beginPath();
g.moveTo(-0.15, -0.1);
g.quadraticCurveTo(-0.13, -0.3, -0.05, -0.36);
g.lineTo(0.05, -0.36);
g.quadraticCurveTo(0.13, -0.3, 0.15, -0.1);
g.closePath();
g.fill();
g.fillStyle = "#a33a32";
g.beginPath();
g.moveTo(-0.06, -0.1);
g.lineTo(-0.045, -0.34);
g.lineTo(0.045, -0.34);
g.lineTo(0.06, -0.1);
g.closePath();
g.fill();
// the head, the hair
g.fillStyle = "#d9b08e";
g.beginPath();
g.ellipse(0.005, -0.41, 0.035, 0.045, 0.15, 0, 6.3);
g.fill();
g.fillStyle = "#5a3a26";
g.beginPath();
g.ellipse(0.0, -0.43, 0.045, 0.04, 0.15, 3.3, 6.2);
g.fill();
g.fillRect(-0.045, -0.43, 0.02, 0.07);
g.fillRect(0.03, -0.42, 0.02, 0.06);
// the heart
g.fillStyle = "#d8463a";
g.beginPath();
g.arc(0, -0.27, 0.018, 0, 6.3);
g.fill();
g.fillStyle = "#f2c867";
g.fillRect(-0.003, -0.31, 0.006, 0.025);
