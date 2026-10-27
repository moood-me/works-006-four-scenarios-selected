// The shelf on the wall over Moominmamma's garden: a plank on two iron brackets, and on it the green can of paraffin —
// three measures, a night of the lantern each, Moominpappa's three strokes on its label, one struck through for each
// measure gone (`paraffin` 3…0; empty, its cap off beside it) —, a jar of jam that nobody asked for, a candle-less
// candlestick.
g.fillStyle = "#8c6e50";
g.fillRect(-0.45, -0.04, 0.9, 0.04);
g.strokeStyle = "#3a3634";
g.lineWidth = 0.015;
for (const x of [-0.33, 0.33]) {
  g.beginPath();
  g.moveTo(x, 0);
  g.lineTo(x, 0.18);
  g.lineTo(x - 0.12 * Math.sign(x), 0);
  g.stroke();
}
// the paraffin can (as on the landing): a squarish green tin, a screw cap, a wire handle
g.save();
g.translate(-0.15, -0.04);
g.fillStyle = "#5f7559";
g.fillRect(-0.13, -0.33, 0.26, 0.33);
g.fillStyle = "rgba(30, 40, 30, 0.25)";
g.fillRect(0.05, -0.33, 0.08, 0.33);
g.fillStyle = "#c7b98a";
g.fillRect(-0.11, -0.27, 0.17, 0.12);
const left = Math.max(0, Math.min(3, e.state.paraffin ?? 3));
g.strokeStyle = "#2c2a30";
g.lineWidth = 0.012;
for (let i = 0; i < 3; i++) {
  const sx = -0.08 + i * 0.05;
  g.beginPath();
  g.moveTo(sx, -0.25);
  g.lineTo(sx + 0.008, -0.17);
  g.stroke();
}
g.lineWidth = 0.008;
for (let i = left; i < 3; i++) {
  const sx = -0.08 + i * 0.05;
  g.beginPath();
  g.moveTo(sx - 0.02, -0.2);
  g.lineTo(sx + 0.03, -0.225);
  g.stroke();
}
g.fillStyle = "#3a3d38";
if (left > 0) g.fillRect(-0.09, -0.38, 0.06, 0.05);
else g.fillRect(-0.29, -0.04, 0.06, 0.04);
g.strokeStyle = "#3a3d38";
g.lineWidth = 0.013;
g.beginPath();
g.moveTo(0.02, -0.33);
g.quadraticCurveTo(0.07, -0.43, 0.11, -0.33);
g.stroke();
g.restore();
e.at(-0.15, -0.2, "paraffin");
// the jam jar: red under a paper cover tied with string
g.fillStyle = "#a83a34";
g.fillRect(0.14, -0.2, 0.12, 0.16);
g.fillStyle = "#efe6d2";
g.fillRect(0.13, -0.23, 0.14, 0.04);
// the candlestick, empty
g.fillStyle = "#a5874f";
g.beginPath();
g.ellipse(0.38, -0.05, 0.05, 0.015, 0, 0, Math.PI * 2);
g.fill();
g.fillRect(0.37, -0.15, 0.02, 0.1);
g.fillRect(0.355, -0.16, 0.05, 0.015);
