// The right wall, seen along its length (x from the back wall at 4.4 m ahead, running toward the start): the panelling
// and the distemper as the back wall's; a glass-fronted mahogany bookcase (x 0.3…1.3) — the order's ledgers and bound
// books behind the glass, cupboard doors below.
const L = e.lib;
const r = L.stream(35);
L.wall(g, 36, -0.05, 3.95, -3.6);
g.fillStyle = L.MAHOGANY;
g.fillRect(0.3, -2.15, 1.0, 2.15);
g.fillStyle = "#4a2618";
g.fillRect(0.26, -2.2, 1.08, 0.06);
// the books on three shelves behind the glass
for (const y of [-2.05, -1.65, -1.25]) {
  let x = 0.36;
  while (x < 1.24) {
    const w = 0.03 + r() * 0.04;
    const h = 0.26 + r() * 0.1;
    g.fillStyle = ["#3d4a5c", "#6a2a26", "#2f4a38", "#7a6a4a", "#2a2a2e"][Math.floor(r() * 5)];
    g.fillRect(x, y + 0.36 - h, w, h);
    g.fillStyle = "rgba(220, 190, 120, 0.35)";
    g.fillRect(x, y + 0.36 - h + 0.04, w, 0.012);
    x += w + 0.004;
  }
  g.fillStyle = "#4a2618";
  g.fillRect(0.34, y + 0.36, 0.92, 0.02);
}
// the glass doors' frames over them
g.strokeStyle = "#4a2618";
g.lineWidth = 0.03;
g.strokeRect(0.34, -2.1, 0.46, 1.25);
g.strokeRect(0.8, -2.1, 0.46, 1.25);
g.fillStyle = "rgba(200, 210, 220, 0.12)";
g.fillRect(0.34, -2.1, 0.92, 1.25);
// the cupboard below
g.fillStyle = "#4e2a1c";
g.fillRect(0.36, -0.8, 0.43, 0.68);
g.fillRect(0.81, -0.8, 0.43, 0.68);
g.fillStyle = L.BRASS;
g.fillRect(0.76, -0.5, 0.02, 0.05);
g.fillRect(0.82, -0.5, 0.02, 0.05);
