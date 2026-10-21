// The low armchair Bill has just got up from (seen from the front, a little turned toward the window; x −0.45…0.45):
// faded plum velvet, a low seat (0.34 m) with its cushion still pressed, rolled arms, a back to 0.9 m with a white lace
// antimacassar over it, short turned legs. A guest is given a low chair here.
const plum = "#6e3b46";
const deep = "#55303a";
// the back
g.fillStyle = deep;
g.beginPath();
g.moveTo(-0.36, -0.36);
g.lineTo(-0.36, -0.78);
g.quadraticCurveTo(0, -0.95, 0.36, -0.78);
g.lineTo(0.36, -0.36);
g.closePath();
g.fill();
// the antimacassar, its scalloped hem
g.fillStyle = "#f1ece0";
g.beginPath();
g.moveTo(-0.2, -0.86);
g.quadraticCurveTo(0, -0.92, 0.2, -0.86);
g.lineTo(0.2, -0.66);
for (let x = 0.2; x > -0.2; x -= 0.05) g.quadraticCurveTo(x - 0.025, -0.62, x - 0.05, -0.66);
g.closePath();
g.fill();
g.fillStyle = "rgba(160, 150, 130, 0.5)";
for (let x = -0.16; x < 0.18; x += 0.06) for (let y = -0.84; y < -0.68; y += 0.05) g.fillRect(x, y, 0.02, 0.02);
// the seat's cushion, pressed in the middle
g.fillStyle = plum;
g.fillRect(-0.34, -0.42, 0.68, 0.1);
g.fillStyle = "rgba(40, 20, 26, 0.3)";
g.beginPath();
g.ellipse(0, -0.4, 0.2, 0.03, 0, 0, 6.3);
g.fill();
// the seat's front, the skirt of the chair
g.fillStyle = deep;
g.fillRect(-0.4, -0.32, 0.8, 0.22);
g.fillStyle = "#4a2830";
g.fillRect(-0.4, -0.12, 0.8, 0.025);
// the arms, rolled over at their tops
for (const s of [-1, 1]) {
  g.fillStyle = plum;
  g.fillRect(s > 0 ? 0.3 : -0.45, -0.56, 0.15, 0.46);
  g.beginPath();
  g.ellipse(s * 0.375, -0.56, 0.085, 0.05, 0, 0, 6.3);
  g.fill();
  g.fillStyle = "rgba(255, 230, 220, 0.12)";
  g.fillRect(s > 0 ? 0.31 : -0.44, -0.6, 0.13, 0.02);
}
// the short turned legs
g.fillStyle = "#3a2318";
for (const x of [-0.4, 0.36]) g.fillRect(x, -0.1, 0.045, 0.1);
