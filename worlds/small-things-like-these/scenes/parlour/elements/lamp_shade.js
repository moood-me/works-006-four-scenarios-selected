// The lamp's shade, lit from inside (1.02…1.31 m up): a pleated parchment shade, narrow at the top, the bulb's warmth
// strongest low in it; its glow `bulb` — the scene's light `lamp` shines from it on the faces round the table.
const shade = new Path2D();
shade.moveTo(-0.09, -0.29);
shade.lineTo(0.09, -0.29);
shade.lineTo(0.18, -0.02);
shade.lineTo(-0.18, -0.02);
shade.closePath();
const glow = g.createLinearGradient(0, -0.29, 0, -0.02);
glow.addColorStop(0, "#e9d2a2");
glow.addColorStop(1, "#fbe8c0");
g.fillStyle = glow;
g.fill(shade);
g.save();
g.clip(shade);
g.fillStyle = "rgba(170, 130, 70, 0.25)";
for (let k = -8; k <= 8; k++) {
  g.beginPath();
  g.moveTo(k * 0.011, -0.29);
  g.lineTo(k * 0.022, -0.02);
  g.lineTo(k * 0.022 + 0.006, -0.02);
  g.lineTo(k * 0.011 + 0.003, -0.29);
  g.closePath();
  g.fill();
}
g.restore();
g.fillStyle = "#a07a3c";
g.fillRect(-0.18, -0.025, 0.36, 0.012);
g.fillRect(-0.09, -0.295, 0.18, 0.01);
e.light(0, -0.06, 0.22, "#ffdca8", 1, "bulb");
