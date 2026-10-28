// The beds' heads against the far wall: white iron rails, a little arched, rods, brass knobs — Grandmother's (u
// −0.95…−0.05, 1.0 m high) and Sophia's (0.15…0.9, 0.85 m). Metres from the frame's x −1.7 at the floor.
const head = (x0, w, rail) => {
  g.fillStyle = '#e8e6df';
  g.fillRect(x0, -rail, 0.035, rail + 0.02);
  g.fillRect(x0 + w - 0.035, -rail, 0.035, rail + 0.02);
  g.beginPath();
  g.moveTo(x0, -rail + 0.06);
  g.quadraticCurveTo(x0 + w / 2, -rail - 0.08, x0 + w, -rail + 0.06);
  g.lineTo(x0 + w, -rail + 0.09);
  g.quadraticCurveTo(x0 + w / 2, -rail - 0.05, x0, -rail + 0.09);
  g.closePath();
  g.fill();
  g.fillRect(x0, -0.42, w, 0.03);
  for (let k = 1; k < 7; k++) g.fillRect(x0 + (k * w) / 7 - 0.008, -rail + 0.05, 0.016, rail - 0.45);
  g.fillStyle = '#c9b06e';
  for (const x of [x0 + 0.0175, x0 + w - 0.0175]) {
    g.beginPath();
    g.arc(x, -rail - 0.02, 0.028, 0, 6.2832);
    g.fill();
  }
};
head(-0.95, 0.9, 1.0);
head(0.15, 0.75, 0.85);
