// The deep stone sill of the window, seen from above (x across the window, y toward the room): whitewashed, worn grey
// where elbows lean, and on it Moominmamma's first painted garden — a stem, then a few flowers in her own greens —,
// her brush and a little pot of paint by them.
const L = e.lib, w = 2 * L.WIN.half, d = L.WIN.deep;
g.fillStyle = "#e2dccf";
g.fillRect(-w / 2, -d / 2, w, d);
const worn = g.createLinearGradient(0, d / 2, 0, -d / 2);
worn.addColorStop(0, "rgba(140, 132, 122, 0.35)");
worn.addColorStop(0.4, "rgba(140, 132, 122, 0)");
g.fillStyle = worn;
g.fillRect(-w / 2, -d / 2, w, d);
// the garden, growing from the room's edge toward the glass
L.flower(g, -0.3, 0.26, 0.36, 0.06, "#e9e4f2", "#e3b23c");
L.flower(g, -0.12, 0.27, 0.27, -0.05, "#8fb4d8", "#f1e2a0");
L.flower(g, 0.08, 0.26, 0.32, 0.04, "#f0c6cf", "#d98e3a");
L.flower(g, 0.27, 0.27, 0.22, 0.07, "#f2e7a0", "#c8742c");
// the pot of green paint and the brush laid across it
g.fillStyle = "#8a8f88";
g.beginPath();
g.arc(0.38, 0.12, 0.05, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#4f7d45";
g.beginPath();
g.arc(0.38, 0.12, 0.038, 0, Math.PI * 2);
g.fill();
g.strokeStyle = "#8a5a32";
g.lineWidth = 0.012;
g.beginPath();
g.moveTo(0.28, 0.2);
g.lineTo(0.46, 0.02);
g.stroke();
e.at(-0.1, 0.0, "garden");
