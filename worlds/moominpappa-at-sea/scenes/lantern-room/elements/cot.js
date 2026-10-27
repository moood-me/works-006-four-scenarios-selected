// The camp bed along the glass (`cot`), from above (x across, y toward the viewer): none; made — a grey blanket pulled
// square over its canvas, a pillow; empty — set up, its blanket folded at its foot, nobody sleeps there; taken — slept
// in, the blanket thrown back, the pillow dented, his hat laid by it. Its point: the bed.
const s = e.state.cot ?? "none";
if (s !== "none") {
  const w = 0.68, d = 1.85;
  g.fillStyle = "#8d8a6e";
  g.fillRect(-w / 2, -d / 2, w, d);
  g.fillStyle = "#5a4a3a";
  g.fillRect(-w / 2, -d / 2, 0.035, d);
  g.fillRect(w / 2 - 0.035, -d / 2, 0.035, d);
  if (s === "made") {
    g.fillStyle = "#7c8794";
    g.fillRect(-w / 2 + 0.03, -d / 2 + 0.42, w - 0.06, d - 0.47);
    g.fillStyle = "#e9e4d6";
    g.fillRect(-w / 2 + 0.07, -d / 2 + 0.07, w - 0.14, 0.3);
  } else if (s === "empty") {
    g.fillStyle = "#7c8794";
    g.fillRect(-w / 2 + 0.05, d / 2 - 0.32, w - 0.1, 0.27);
    g.fillStyle = "rgba(60, 64, 72, 0.4)";
    for (let k = 0; k < 3; k++) g.fillRect(-w / 2 + 0.05, d / 2 - 0.29 + k * 0.08, w - 0.1, 0.01);
  } else {
    g.fillStyle = "#7c8794";
    g.beginPath();
    g.moveTo(-w / 2 + 0.03, d / 2 - 0.05);
    g.lineTo(w / 2 - 0.03, d / 2 - 0.05);
    g.lineTo(w / 2 - 0.03, -0.05);
    g.quadraticCurveTo(0.1, -0.25, -w / 2 + 0.03, 0.05);
    g.closePath();
    g.fill();
    g.fillStyle = "rgba(240, 236, 226, 0.4)";
    g.beginPath();
    g.ellipse(0.02, -0.3, 0.22, 0.32, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#e9e4d6";
    g.fillRect(-w / 2 + 0.07, -d / 2 + 0.07, w - 0.14, 0.3);
    g.fillStyle = "rgba(160, 150, 136, 0.6)";
    g.beginPath();
    g.ellipse(0, -d / 2 + 0.22, 0.12, 0.08, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#26232a";
    g.beginPath();
    g.ellipse(w / 2 + 0.16, -d / 2 + 0.25, 0.12, 0.12, 0, 0, Math.PI * 2);
    g.fill();
  }
  e.at(0, 0, "cot");
}
