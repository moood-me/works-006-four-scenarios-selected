// The gallery's rail, one side of it (copies: the four sides seen through the glass): iron stanchions, a top rail and a
// middle rail, a kick-plate at the foot. Its point: the rail (where a hand holds it).
const L = e.lib, w = L.RAIL_W / 2, f = "#2f3437";
g.fillStyle = f;
for (const x of [-w, -w / 3, w / 3, w]) g.fillRect(x - 0.02, -1.05, 0.04, 1.05);
g.fillRect(-w, -1.08, 2 * w, 0.05);
g.fillRect(-w, -0.56, 2 * w, 0.03);
g.fillRect(-w, -0.1, 2 * w, 0.1);
e.at(0.3, -1.06, "rail");
