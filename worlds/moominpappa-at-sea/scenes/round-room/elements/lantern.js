// The storm lantern on the table, the only light: a tin font, a glass globe in its wire guard, a cap and a bail
// handle; inside, the flame (its glow and its light are the engine's — e.light, "flame"). It glows: the scene's light
// does not darken it, its tin is as painted.
g.fillStyle = "#6f6a5e";
g.beginPath();
g.ellipse(0, -0.03, 0.11, 0.03, 0, 0, Math.PI * 2);
g.fill();
g.fillRect(-0.11, -0.1, 0.22, 0.07);
g.fillStyle = "#8a8474";
g.fillRect(-0.09, -0.12, 0.18, 0.03);
// the globe: pale glass, warmer at its heart
const glass = g.createRadialGradient(0, -0.2, 0.01, 0, -0.2, 0.09);
glass.addColorStop(0, "rgba(255, 214, 140, 0.95)");
glass.addColorStop(1, "rgba(226, 184, 118, 0.8)");
g.fillStyle = glass;
g.beginPath();
g.moveTo(-0.05, -0.12);
g.bezierCurveTo(-0.11, -0.16, -0.11, -0.26, -0.05, -0.3);
g.lineTo(0.05, -0.3);
g.bezierCurveTo(0.11, -0.26, 0.11, -0.16, 0.05, -0.12);
g.closePath();
g.fill();
// the flame
g.fillStyle = "#ffd890";
g.beginPath();
g.moveTo(0, -0.25);
g.quadraticCurveTo(0.02, -0.2, 0, -0.17);
g.quadraticCurveTo(-0.02, -0.2, 0, -0.25);
g.fill();
// the guard wires, the cap, the handle
g.strokeStyle = "#4a4640";
g.lineWidth = 0.008;
for (const x of [-0.085, 0, 0.085]) {
  g.beginPath();
  g.moveTo(x * 0.7, -0.12);
  g.quadraticCurveTo(x * 1.25, -0.21, x * 0.7, -0.3);
  g.stroke();
}
g.fillStyle = "#6f6a5e";
g.fillRect(-0.06, -0.33, 0.12, 0.03);
g.beginPath();
g.moveTo(-0.045, -0.33);
g.lineTo(0, -0.37);
g.lineTo(0.045, -0.33);
g.fill();
g.lineWidth = 0.01;
g.beginPath();
g.moveTo(-0.1, -0.1);
g.quadraticCurveTo(-0.13, -0.44, 0, -0.45);
g.quadraticCurveTo(0.13, -0.44, 0.1, -0.1);
g.stroke();
e.light(0, -0.21, 0.14, "#ffc874", 1.2, "flame");
e.at(0, -0.21, "flame");
