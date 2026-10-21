// The parlour's back wall, seen straight on (x across from the start's line; the wall 4.4 m ahead, the ceiling at
// 3.6 m): varnished panelling to the dado, a pale distemper above, the picture rail, the cornice. From the left: the
// door to the corridor (x −2.45…−1.75), shut; the chimney breast (x −1.65…−0.35) with a white marble mantelpiece, green
// tile slips and the black iron grate (what burns in it is `fire`), on the shelf a statue of Our Lady between two brass
// candlesticks, over it the crucifix; a small portrait of the order's foundress (x 1.0) over where the Mother stands;
// the window's opening (x 1.5…2.4, 0.8…2.7 m up) left unpainted — the yard beyond is seen through it (`window`,
// `window_glass`) — and the radiator under it. The wall clock is `clock`.
const L = e.lib;
L.wall(g, 31, -2.65, 2.65, -3.6);
// the door: its architrave, the leaf with four sunk panels, the brass knob
g.fillStyle = "#4a3424";
g.fillRect(-2.53, -2.18, 0.86, 2.18);
g.fillStyle = "#6b4a30";
g.fillRect(-2.45, -2.1, 0.7, 2.1);
g.fillStyle = "#5b3e28";
for (const [x, y, w, h] of [[-2.38, -2.0, 0.25, 0.86], [-2.07, -2.0, 0.25, 0.86], [-2.38, -1.02, 0.25, 0.9], [-2.07, -1.02, 0.25, 0.9]]) g.fillRect(x, y, w, h);
g.fillStyle = "rgba(255, 230, 190, 0.12)";
for (const [x, y, h] of [[-2.38, -2.0, 0.86], [-2.07, -2.0, 0.86], [-2.38, -1.02, 0.9], [-2.07, -1.02, 0.9]]) g.fillRect(x, y, 0.02, h);
g.fillStyle = L.BRASS;
g.beginPath();
g.arc(-1.84, -1.0, 0.03, 0, 6.3);
g.fill();
g.fillRect(-1.855, -1.1, 0.03, 0.06);
// the chimney breast, standing out by a shade and its edges
g.fillStyle = "#e3e1cf";
g.fillRect(-1.65, -3.48, 1.3, 3.5);
L.boards(g, 32, -1.65, -1.0, 1.3, 1.02, L.PANEL, L.PANEL_LINE, 0.11);
g.fillStyle = L.SKIRT;
g.fillRect(-1.65, -0.16, 1.3, 0.18);
g.fillStyle = "rgba(70, 60, 44, 0.28)";
g.fillRect(-1.67, -3.48, 0.02, 3.5);
g.fillRect(-0.35, -3.48, 0.02, 3.5);
// the green tile slips either side of the grate
g.fillStyle = "#4f7a62";
g.fillRect(-1.47, -0.95, 0.12, 0.95);
g.fillRect(-0.65, -0.95, 0.12, 0.95);
g.fillStyle = "#3d604d";
for (let y = -0.95; y < 0; y += 0.12) {
  g.fillRect(-1.47, y, 0.12, 0.008);
  g.fillRect(-0.65, y, 0.12, 0.008);
}
// the black iron insert, its arched opening, the firebrick inside sooted toward the top
g.fillStyle = "#2a2827";
g.fillRect(-1.35, -0.95, 0.7, 0.95);
g.fillStyle = "#3d3a38";
g.fillRect(-1.33, -0.93, 0.66, 0.03);
const arch = new Path2D();
arch.moveTo(-1.22, -0.04);
arch.lineTo(-1.22, -0.48);
arch.arc(-1.0, -0.48, 0.22, Math.PI, 0);
arch.lineTo(-0.78, -0.04);
arch.closePath();
const brick = g.createLinearGradient(0, -0.7, 0, -0.04);
brick.addColorStop(0, "#1a1210");
brick.addColorStop(0.5, "#3a2119");
brick.addColorStop(1, "#4a2a1e");
g.fillStyle = brick;
g.fill(arch);
// the white marble mantelpiece: its legs, the frieze, the shelf; grey veins
g.fillStyle = "#ebe7de";
g.fillRect(-1.62, -1.12, 0.15, 1.12);
g.fillRect(-0.53, -1.12, 0.15, 1.12);
g.fillRect(-1.62, -1.12, 1.24, 0.17);
g.fillStyle = "#f2efe8";
g.fillRect(-1.7, -1.2, 1.4, 0.08);
g.fillStyle = "#cfcac0";
g.fillRect(-1.7, -1.125, 1.4, 0.008);
const r = L.stream(33);
g.strokeStyle = "rgba(130, 128, 124, 0.45)";
g.lineWidth = 0.004;
for (let i = 0; i < 12; i++) {
  const x = -1.6 + r() * 1.2;
  const y = -1.1 + r() * (i < 6 ? 0.15 : 1.0);
  g.beginPath();
  g.moveTo(x, y);
  g.quadraticCurveTo(x + 0.04, y + 0.05, x + 0.02 + r() * 0.06, y + 0.1);
  g.stroke();
}
// on the shelf: the two brass candlesticks with white candles, the statue of Our Lady between them
for (const x of [-1.5, -0.5]) {
  g.fillStyle = L.BRASS;
  g.fillRect(x - 0.05, -1.24, 0.1, 0.04);
  g.fillRect(x - 0.015, -1.42, 0.03, 0.19);
  g.fillRect(x - 0.03, -1.44, 0.06, 0.025);
  g.fillStyle = "#f1ece0";
  g.fillRect(x - 0.018, -1.62, 0.036, 0.18);
}
// Our Lady: a blue mantle from her veiled head to the shelf, her white robe down its front, her pale face, hands joined
g.fillStyle = "#6f8fbf";
g.beginPath();
g.moveTo(-1.075, -1.2);
g.lineTo(-1.045, -1.42);
g.quadraticCurveTo(-1.0, -1.52, -0.955, -1.42);
g.lineTo(-0.925, -1.2);
g.closePath();
g.fill();
g.fillStyle = "#f0ede6";
g.beginPath();
g.moveTo(-1.025, -1.2);
g.lineTo(-1.015, -1.4);
g.lineTo(-0.985, -1.4);
g.lineTo(-0.975, -1.2);
g.closePath();
g.fill();
g.fillStyle = "#ead7c4";
g.beginPath();
g.ellipse(-1.0, -1.445, 0.017, 0.022, 0, 0, 6.3);
g.fill();
g.fillRect(-1.008, -1.36, 0.016, 0.03);
// the crucifix over the mantel: dark wood, the ivory figure
g.fillStyle = "#3a2618";
g.fillRect(-1.025, -2.5, 0.05, 0.78);
g.fillRect(-1.17, -2.3, 0.34, 0.045);
g.fillStyle = "#eee6d2";
g.beginPath();
g.arc(-1.0, -2.33, 0.022, 0, 6.3);
g.fill();
g.beginPath();
g.moveTo(-1.15, -2.285);
g.lineTo(-1.0, -2.27);
g.lineTo(-0.85, -2.285);
g.lineTo(-0.85, -2.265);
g.lineTo(-1.0, -2.24);
g.lineTo(-0.985, -2.03);
g.lineTo(-1.0, -1.94);
g.lineTo(-1.015, -2.03);
g.lineTo(-1.0, -2.24);
g.lineTo(-1.15, -2.265);
g.closePath();
g.fill();
// the foundress's portrait over where the Mother stands: a woman in a black habit and a white coif on a brown ground
L.frame(g, 0.85, -2.38, 0.3, 0.38, 0.04);
g.fillStyle = "#6a5440";
g.fillRect(0.85, -2.38, 0.3, 0.38);
g.fillStyle = "#1f1d22";
g.beginPath();
g.moveTo(0.88, -2.0);
g.quadraticCurveTo(0.9, -2.2, 1.0, -2.24);
g.quadraticCurveTo(1.1, -2.2, 1.12, -2.0);
g.closePath();
g.fill();
g.fillStyle = "#efe9dc";
g.beginPath();
g.ellipse(1.0, -2.24, 0.05, 0.065, 0, 0, 6.3);
g.fill();
g.fillStyle = "#e3c8b4";
g.beginPath();
g.ellipse(1.0, -2.235, 0.032, 0.042, 0, 0, 6.3);
g.fill();
g.fillStyle = "#1f1d22";
g.fillRect(0.94, -2.33, 0.12, 0.05);
// the radiator under the window: cream iron columns on short feet, its pipe down to the floor
g.fillStyle = "#e2dccb";
g.fillRect(1.52, -0.72, 0.86, 0.56);
g.fillStyle = "#c8c1ad";
for (let x = 1.56; x < 2.38; x += 0.06) g.fillRect(x, -0.7, 0.012, 0.52);
g.fillStyle = "#bdb6a2";
g.fillRect(1.52, -0.16, 0.86, 0.02);
g.fillRect(2.32, -0.14, 0.03, 0.14);
// the window's opening: nothing painted there
g.globalCompositeOperation = "destination-out";
g.fillRect(1.5, -2.7, 0.9, 1.9);
g.globalCompositeOperation = "source-over";
