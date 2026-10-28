// The ceiling, seen from below (a plane turned face down: x across, y away from the viewer; its centre the room's
// middle): whitewashed boards between dark beams that run out from a round boss like a wheel's spokes, and the square
// hatch over the top of the stair, up to the lantern room.
const L = e.lib, R = L.R + 0.05;
g.save();
g.beginPath();
g.arc(0, 0, R, 0, Math.PI * 2);
g.clip();
g.fillStyle = "#ddd6c8";
g.fillRect(-R, -R, 2 * R, 2 * R);
g.strokeStyle = "rgba(120, 110, 96, 0.35)";
g.lineWidth = 0.01;
for (let r = 0.6; r < R; r += 0.22) {
  g.beginPath();
  g.arc(0, 0, r, 0, Math.PI * 2);
  g.stroke();
}
g.fillStyle = "#4a3b30";
for (let i = 0; i < 8; i++) {
  g.save();
  g.rotate((i / 8) * Math.PI * 2);
  g.fillRect(0.3, -0.08, R, 0.16);
  g.restore();
}
g.beginPath();
g.arc(0, 0, 0.42, 0, Math.PI * 2);
g.fill();
g.restore();
// the hatch: a dark square, its frame
const hx = -1.45, hy = 2.85;
g.fillStyle = "#5a4a3c";
g.fillRect(hx - 0.45, hy - 0.42, 0.9, 0.84);
g.fillStyle = "#1c1a1c";
g.fillRect(hx - 0.37, hy - 0.34, 0.74, 0.68);
