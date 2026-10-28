// The window over the street (x −0.72…0.72; the opening x −0.6…0.6, 1.0…2.3 m up): a sash window, cream-painted
// casing and bars, six panes over six; frost feathered into the lower corners of the panes; a net half-curtain on a
// rod across the lower sash, the street's lights seen through it (the glass is `window_glass`).
const r = e.lib.stream(81);
const frame = new Path2D();
frame.rect(-0.72, -2.4, 1.44, 1.48);
frame.rect(-0.6, -2.3, 1.2, 1.3);
g.fillStyle = "#e7e0cf";
g.fill(frame, "evenodd");
// the bars: the meeting rail, the uprights, the glazing bars
g.fillStyle = "#e2dbc9";
g.fillRect(-0.6, -1.68, 1.2, 0.05);
for (const x of [-0.2, 0.2]) g.fillRect(x - 0.015, -2.3, 0.03, 1.3);
for (const y of [-1.99, -1.35]) g.fillRect(-0.6, y - 0.012, 1.2, 0.024);
// frost in the lower corners of the panes
g.fillStyle = "rgba(240, 244, 248, 0.55)";
for (const [px, py] of [[-0.6, -1.68], [-0.2, -1.68], [0.2, -1.68], [-0.6, -1.0], [-0.2, -1.0], [0.2, -1.0]]) {
  for (let i = 0; i < 14; i++) {
    const a = r() * 0.4;
    const b = r() * 0.1;
    g.beginPath();
    g.ellipse(px + 0.015 + a, py - 0.015 - b * (1 - a / 0.4), 0.02 + r() * 0.03, 0.01 + r() * 0.015, r(), 0, 6.3);
    g.fill();
  }
}
// the net half-curtain on its rod: see-through, with a scalloped hem and a faint pattern
g.fillStyle = "#b8b2a4";
g.fillRect(-0.62, -1.56, 1.24, 0.015);
g.fillStyle = "rgba(244, 240, 230, 0.55)";
g.beginPath();
g.moveTo(-0.6, -1.55);
g.lineTo(0.6, -1.55);
g.lineTo(0.6, -1.08);
for (let x = 0.6; x >= -0.6; x -= 0.1) g.quadraticCurveTo(x - 0.05, -1.03, x - 0.1, -1.08);
g.closePath();
g.fill();
g.fillStyle = "rgba(255, 255, 255, 0.3)";
for (let x = -0.55; x < 0.6; x += 0.1) for (let y = -1.5; y < -1.12; y += 0.09) g.fillRect(x, y, 0.04, 0.04);
