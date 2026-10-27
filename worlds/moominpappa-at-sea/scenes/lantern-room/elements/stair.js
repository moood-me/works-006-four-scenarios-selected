// The stair coming up through the hatch, seen down the hole: the ladder's two worn rails and its top treads going down
// to the left into the dark of the tower; its point, the hatch.
const L = e.lib, d = 2.4;
g.fillStyle = "#2e2a28";
g.fillRect(-0.4, -d, 0.8, d);
g.fillStyle = "#7d6248";
for (const x of [-0.3, 0.28]) g.fillRect(x, -d, 0.05, d);
for (let i = 0; i < 9; i++) {
  const y = -d + 0.05 + i * 0.27;
  g.fillStyle = "#a68660";
  g.fillRect(-0.3, y, 0.63, 0.05);
  g.fillStyle = "rgba(20, 16, 14, 0.5)";
  g.fillRect(-0.3, y + 0.05, 0.63, 0.015);
}
const dark = g.createLinearGradient(0, -d, 0, 0);
dark.addColorStop(0, "rgba(16, 14, 14, 0)");
dark.addColorStop(1, "rgba(16, 14, 14, 0.8)");
g.fillStyle = dark;
g.fillRect(-0.4, -d, 0.8, d);
e.at(0, -d, "hatch");
