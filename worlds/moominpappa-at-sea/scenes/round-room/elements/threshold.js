// The door's threshold, seen from above (x across the doorway, y toward the room): one long slab of the island's pink
// granite through the wall's thickness, worn smooth in a hollow at the middle.
const L = e.lib, w = 2 * L.DOOR.half, d = L.DOOR.deep;
g.fillStyle = "#c9a197";
g.fillRect(-w / 2, -d / 2, w, d);
const worn = g.createRadialGradient(0, 0.05, 0, 0, 0.05, 0.35);
worn.addColorStop(0, "rgba(232, 206, 196, 0.6)");
worn.addColorStop(1, "rgba(232, 206, 196, 0)");
g.fillStyle = worn;
g.fillRect(-w / 2, -d / 2, w, d);
g.fillStyle = "rgba(110, 80, 74, 0.35)";
for (let i = 0; i < 40; i++) g.fillRect(-w / 2 + e.rnd() * w, -d / 2 + e.rnd() * d, 0.012, 0.012);
