// The jam jar on the sill with Moominmamma's brushes standing in it, put away and not touched again (`brushes`: jar).
// Otherwise nothing.
if (e.state.brushes === "jar") {
  g.fillStyle = "rgba(196, 212, 218, 0.85)";
  g.fillRect(-0.05, -0.11, 0.1, 0.11);
  g.fillStyle = "rgba(240, 246, 248, 0.5)";
  g.fillRect(-0.035, -0.1, 0.015, 0.09);
  g.strokeStyle = "#8a5a32";
  g.lineCap = "round";
  for (const [x, top, lean] of [[-0.025, -0.3, -0.03], [0, -0.33, 0.01], [0.02, -0.28, 0.04]]) {
    g.lineWidth = 0.01;
    g.beginPath();
    g.moveTo(x, -0.02);
    g.lineTo(x + lean, top);
    g.stroke();
  }
  e.at(0, -0.2, "jar");
}
