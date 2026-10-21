// The kitchen's back wall, seen straight on (x across from the start's line; the wall 4.2 m ahead, the ceiling at
// 2.9 m): the painted panelling to the dado rail, cream distemper above; on the left the chimney breast with the
// range's recess (cream tiles, sooted at the top) and the mantel shelf — a clock, a tea caddy, a brass candlestick;
// a calendar to the left of the window; the peg board by the right corner where the coats hang (`coats`). The window's
// opening (x 1.3…2.5, 1.0…2.3 m up) is left unpainted: the street beyond is seen through it (`window`, `window_glass`).
const L = e.lib;
L.wall(g, 61, -3.25, 3.25, -2.92);
// the chimney breast, a shade lighter, standing out by its edge
g.fillStyle = "#e8dcc0";
g.fillRect(-3.25, -2.92, 1.52, 2.94);
g.fillStyle = "rgba(90, 76, 58, 0.25)";
g.fillRect(-1.75, -2.92, 0.025, 2.94);
L.boards(g, 62, -3.25, -1.05, 1.52, 1.07, L.PANEL, L.PANEL_LINE, 0.1);
// the recess: cream tiles behind the range, sooted toward the top
g.fillStyle = "#e9e3d2";
g.fillRect(-3.0, -1.32, 1.04, 1.34);
g.fillStyle = "#cfc7b3";
for (let y = -1.32; y < 0; y += 0.15) g.fillRect(-3.0, y, 1.04, 0.01);
for (let x = -3.0; x < -1.96; x += 0.15) g.fillRect(x, -1.32, 0.01, 1.34);
const soot = g.createLinearGradient(0, -1.32, 0, -0.6);
soot.addColorStop(0, "rgba(60, 50, 42, 0.55)");
soot.addColorStop(1, "rgba(60, 50, 42, 0)");
g.fillStyle = soot;
g.fillRect(-3.0, -1.32, 1.04, 0.72);
g.fillStyle = "#7d6c58";
g.fillRect(-3.04, -1.36, 1.12, 0.05);
// the mantel shelf and what stands on it
g.fillStyle = "#6c5642";
g.fillRect(-3.25, -1.58, 1.56, 0.06);
g.fillStyle = "#56442f";
g.fillRect(-3.22, -1.52, 1.5, 0.03);
// a small clock in a dark wooden case, its white face
g.fillStyle = "#4a3828";
g.beginPath();
g.moveTo(-2.86, -1.58);
g.lineTo(-2.86, -1.8);
g.quadraticCurveTo(-2.74, -1.9, -2.62, -1.8);
g.lineTo(-2.62, -1.58);
g.closePath();
g.fill();
g.fillStyle = "#f1ece0";
g.beginPath();
g.arc(-2.74, -1.73, 0.075, 0, 6.3);
g.fill();
g.strokeStyle = "#2d241c";
g.lineWidth = 0.008;
g.beginPath();
g.moveTo(-2.74, -1.73);
g.lineTo(-2.74, -1.79);
g.moveTo(-2.74, -1.73);
g.lineTo(-2.7, -1.71);
g.stroke();
// a tea caddy, dark green with a band
g.fillStyle = "#3f5a4a";
g.fillRect(-2.3, -1.76, 0.14, 0.18);
g.fillStyle = "#b39a5a";
g.fillRect(-2.3, -1.7, 0.14, 0.025);
// a brass candlestick with a white candle
g.fillStyle = "#b8954a";
g.fillRect(-1.98, -1.62, 0.09, 0.04);
g.fillRect(-1.95, -1.76, 0.03, 0.15);
g.fillStyle = "#efe9da";
g.fillRect(-1.955, -1.92, 0.04, 0.16);
// the calendar: a picture of green hills on top, the month's grid below
g.fillStyle = "#f2eee4";
g.fillRect(-0.32, -2.06, 0.38, 0.62);
g.fillStyle = "#9db3c4";
g.fillRect(-0.29, -2.03, 0.32, 0.2);
g.fillStyle = "#6f8f5a";
g.beginPath();
g.moveTo(-0.29, -1.9);
g.quadraticCurveTo(-0.18, -1.98, -0.06, -1.9);
g.quadraticCurveTo(0.0, -1.95, 0.03, -1.91);
g.lineTo(0.03, -1.83);
g.lineTo(-0.29, -1.83);
g.closePath();
g.fill();
g.fillStyle = "#b9b2a4";
for (let row = 0; row < 5; row++) for (let col = 0; col < 7; col++) g.fillRect(-0.28 + col * 0.044, -1.76 + row * 0.055, 0.03, 0.03);
g.fillStyle = "#a33a32";
g.fillRect(-0.28 + 4 * 0.044, -1.76 + 2 * 0.055, 0.03, 0.03);
// the peg board by the corner
g.fillStyle = "#6c5642";
g.fillRect(2.68, -1.84, 0.52, 0.07);
g.fillStyle = "#4a3a2c";
for (const x of [2.8, 2.98, 3.12]) g.fillRect(x, -1.8, 0.025, 0.06);
// the window's opening: nothing painted there
g.globalCompositeOperation = "destination-out";
g.fillRect(1.3, -2.3, 1.2, 1.3);
g.globalCompositeOperation = "source-over";
