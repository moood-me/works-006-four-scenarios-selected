// The coal shed's front (on `shed`; x −1.7…1.5): whitewashed rubble gone grey with coal dust — streaked down from the
// eave, black at the foot and round the door, Bill's black handprints on the frame by the bolt and by the door —; the
// shovel and the riddle on their nails, the week's sacks chalked in five-bar gates; a slate eave along its top; the
// doorway at x 0…0.95, 1.9 m high, open (the leaf is `shed_door`); on the frame to the right of it the bolt's iron
// staple, where the bolt goes when it is drawn from outside.
e.lib.rubble(g, 41, -1.7, -2.5, 3.2, 2.55, "#a9a8a3", ["#bdbcb6", "#b6b5af", "#c3c2bc", "#b0afa9"], 0.19);
const grime = g.createLinearGradient(0, 0, 0, -2.5);
grime.addColorStop(0, "rgba(58, 56, 54, 0.5)");
grime.addColorStop(0.5, "rgba(58, 56, 54, 0.15)");
grime.addColorStop(1, "rgba(58, 56, 54, 0)");
g.fillStyle = grime;
g.fillRect(-1.7, -2.5, 3.2, 2.55);
const sooty = g.createRadialGradient(0.47, -0.9, 0.3, 0.47, -0.9, 1.3);
sooty.addColorStop(0, "rgba(40, 38, 38, 0.42)");
sooty.addColorStop(1, "rgba(40, 38, 38, 0)");
g.fillStyle = sooty;
g.fillRect(-0.9, -2.3, 2.4, 2.35);
// the door's frame
g.fillStyle = "#4b4038";
g.fillRect(-0.06, -1.96, 0.06, 1.96);
g.fillRect(0.95, -1.96, 0.06, 1.96);
g.fillRect(-0.06, -2.02, 1.07, 0.08);
// the staple for the bolt
g.fillStyle = "#1e1d1d";
g.fillRect(1.05, -1.09, 0.1, 0.12);
// coal dust run down the stone in streaks from the eave's drip, blacker at the foot where the coal is shovelled
const r = e.lib.stream(43);
for (let i = 0; i < 9; i++) {
  const x = -1.6 + r() * 1.5;
  const w = 0.04 + r() * 0.1;
  const top = -2.45 + r() * 0.5;
  const streak = g.createLinearGradient(0, top, 0, 0);
  streak.addColorStop(0, "rgba(36, 34, 34, 0.32)");
  streak.addColorStop(1, "rgba(36, 34, 34, 0)");
  g.fillStyle = streak;
  g.fillRect(x, top, w, -top * (0.4 + r() * 0.5));
}
const foot = g.createLinearGradient(0, 0, 0, -0.5);
foot.addColorStop(0, "rgba(24, 23, 24, 0.7)");
foot.addColorStop(1, "rgba(24, 23, 24, 0)");
g.fillStyle = foot;
g.fillRect(-1.7, -0.5, 3.2, 0.55);
// Bill's black hands on the stone: where he takes hold of the frame to swing the sacks in, by the bolt and by the
// door — the coal's mark, as on his hands
function hand(x, y, a, k) {
  g.save();
  g.translate(x, y);
  g.rotate(a);
  g.fillStyle = `rgba(22, 21, 22, ${k})`;
  g.beginPath();
  g.ellipse(0, 0, 0.045, 0.055, 0, 0, 6.3);
  g.fill();
  for (const [fx, fl] of [[-0.036, 0.05], [-0.013, 0.07], [0.011, 0.068], [0.032, 0.058]]) {
    g.beginPath();
    g.roundRect(fx - 0.009, -0.05 - fl, 0.018, fl, 0.009);
    g.fill();
  }
  g.beginPath();
  g.ellipse(0.055, 0.005, 0.012, 0.03, -0.7, 0, 6.3);
  g.fill();
  g.restore();
}
hand(1.12, -1.32, 0.15, 0.6);
hand(1.2, -1.45, 0.3, 0.35);
hand(-0.16, -1.25, -0.1, 0.55);
hand(-0.2, -1.05, -0.2, 0.3);
// the shovel and the riddle hung on their nails left of the door
g.strokeStyle = "#6b5440";
g.lineWidth = 0.035;
g.lineCap = "round";
g.beginPath();
g.moveTo(-1.02, -1.98);
g.lineTo(-1.0, -0.92);
g.stroke();
g.fillStyle = "#6b5440";
g.fillRect(-1.1, -2.02, 0.18, 0.035);
g.fillStyle = "#2c2c2e";
g.beginPath();
g.moveTo(-1.13, -0.92);
g.lineTo(-0.87, -0.92);
g.lineTo(-0.89, -0.5);
g.quadraticCurveTo(-1.0, -0.44, -1.11, -0.5);
g.closePath();
g.fill();
g.fillStyle = "#1e1e20";
g.fillRect(-1.03, -0.97, 0.06, 0.07);
g.fillStyle = "#2a2828";
g.beginPath();
g.arc(-1.0, -2.0, 0.015, 0, 6.3);
g.arc(-0.48, -1.72, 0.015, 0, 6.3);
g.fill();
g.strokeStyle = "#7d6750";
g.lineWidth = 0.035;
g.beginPath();
g.arc(-0.48, -1.47, 0.24, 0, 6.3);
g.stroke();
g.strokeStyle = "rgba(48, 46, 46, 0.7)";
g.lineWidth = 0.006;
g.save();
g.beginPath();
g.arc(-0.48, -1.47, 0.22, 0, 6.3);
g.clip();
g.beginPath();
for (let d = -0.22; d <= 0.22; d += 0.035) {
  g.moveTo(-0.7, -1.47 + d);
  g.lineTo(-0.26, -1.47 + d);
  g.moveTo(-0.48 + d, -1.69);
  g.lineTo(-0.48 + d, -1.25);
}
g.stroke();
g.restore();
// the week's deliveries chalked on the stone by the door: five-bar gates
g.strokeStyle = "rgba(238, 238, 232, 0.8)";
g.lineWidth = 0.014;
g.beginPath();
for (let k = 0; k < 3; k++) {
  const x = -0.8 + k * 0.17;
  for (let i = 0; i < 4; i++) {
    g.moveTo(x + i * 0.03, -0.98);
    g.lineTo(x + i * 0.03 + 0.005, -0.83);
  }
  if (k < 2) {
    g.moveTo(x - 0.015, -0.86);
    g.lineTo(x + 0.11, -0.96);
  }
}
g.stroke();
// the eave: slates over the top, frost along their edge
g.fillStyle = "#4a4d52";
g.fillRect(-1.78, -2.78, 3.36, 0.3);
g.fillStyle = "#3a3c40";
for (let x = -1.78; x < 1.58; x += 0.22) g.fillRect(x, -2.78, 0.02, 0.3);
g.fillStyle = "#e6ebef";
g.fillRect(-1.78, -2.8, 3.36, 0.04);
// the doorway: open — what is inside is seen
g.globalCompositeOperation = "destination-out";
g.fillRect(0, -1.9, 0.95, 1.95);
g.globalCompositeOperation = "source-over";
