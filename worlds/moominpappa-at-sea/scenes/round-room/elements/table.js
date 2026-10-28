// The table top from above (x across, y toward the viewer): three thick pine planks, scrubbed pale, a knot or two, a
// ring where a mug stood.
const w = 1.5, d = 0.8;
g.fillStyle = "#c6a77f";
g.fillRect(-w / 2, -d / 2, w, d);
for (let i = 0; i < 3; i++) {
  const y = -d / 2 + (i * d) / 3;
  g.fillStyle = i % 2 ? "rgba(120, 90, 60, 0.12)" : "rgba(250, 236, 210, 0.12)";
  g.fillRect(-w / 2, y, w, d / 3);
  g.fillStyle = "rgba(70, 50, 36, 0.6)";
  g.fillRect(-w / 2, y, w, 0.012);
}
g.strokeStyle = "rgba(110, 80, 56, 0.25)";
g.lineWidth = 0.005;
for (let i = 0; i < 40; i++) {
  const y = -d / 2 + e.rnd() * d, x = -w / 2 + e.rnd() * w * 0.6;
  g.beginPath();
  g.moveTo(x, y);
  g.quadraticCurveTo(x + 0.3, y + (e.rnd() - 0.5) * 0.02, x + 0.4 + e.rnd() * 0.4, y);
  g.stroke();
}
g.fillStyle = "rgba(90, 60, 40, 0.5)";
g.beginPath();
g.ellipse(-0.42, 0.12, 0.035, 0.02, 0.3, 0, Math.PI * 2);
g.fill();
g.strokeStyle = "rgba(110, 70, 50, 0.3)";
g.lineWidth = 0.008;
g.beginPath();
g.arc(-0.2, -0.18, 0.045, 0, Math.PI * 2);
g.stroke();
g.strokeStyle = "rgba(70, 50, 36, 0.7)";
g.lineWidth = 0.02;
g.strokeRect(-w / 2, -d / 2, w, d);
