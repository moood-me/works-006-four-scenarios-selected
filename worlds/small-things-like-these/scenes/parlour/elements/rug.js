// The rug from above (x −1.45…1.45, y −0.875…0.875 toward the viewer; its centre at (0.2, 3.3)): an old Turkey rug,
// its madder field faded, a navy border with an ivory running motif, a central medallion; worn paler where a guest's
// feet go before the low chair.
const r = e.lib.stream(73);
g.fillStyle = "#3c4a63";
g.fillRect(-1.45, -0.875, 2.9, 1.75);
g.fillStyle = "#e3d8bf";
g.fillRect(-1.38, -0.805, 2.76, 1.61);
g.fillStyle = "#3c4a63";
g.fillRect(-1.35, -0.775, 2.7, 1.55);
// the running motif on the border
g.fillStyle = "#d9cdb0";
for (let x = -1.3; x < 1.32; x += 0.11) {
  for (const y of [-0.825, 0.825]) {
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + 0.04, y - 0.02);
    g.lineTo(x + 0.08, y);
    g.lineTo(x + 0.04, y + 0.02);
    g.closePath();
    g.fill();
  }
}
// the madder field
g.fillStyle = "#8a3a33";
g.fillRect(-1.25, -0.675, 2.5, 1.35);
for (let i = 0; i < 60; i++) {
  g.fillStyle = r() < 0.5 ? "rgba(60, 20, 18, 0.18)" : "rgba(210, 150, 120, 0.12)";
  g.fillRect(-1.25 + r() * 2.4, -0.675 + r() * 1.3, 0.08 + r() * 0.2, 0.04);
}
// the medallion: a navy lozenge, an ivory ring, a madder heart
g.fillStyle = "#33405a";
g.beginPath();
g.moveTo(0, -0.5);
g.lineTo(0.6, 0);
g.lineTo(0, 0.5);
g.lineTo(-0.6, 0);
g.closePath();
g.fill();
g.fillStyle = "#e3d8bf";
g.beginPath();
g.ellipse(0, 0, 0.28, 0.22, 0, 0, 6.3);
g.fill();
g.fillStyle = "#9a4a3e";
g.beginPath();
g.ellipse(0, 0, 0.2, 0.15, 0, 0, 6.3);
g.fill();
// corner pieces
g.fillStyle = "#33405a";
for (const [x, y] of [[-1.25, -0.675], [1.25, -0.675], [-1.25, 0.675], [1.25, 0.675]]) {
  g.beginPath();
  g.arc(x, y, 0.22, 0, 6.3);
  g.fill();
}
// worn paler before the chair (world (−0.05, 3.1) → x −0.25, y 0.2)
const worn = g.createRadialGradient(-0.25, 0.2, 0.05, -0.25, 0.2, 0.55);
worn.addColorStop(0, "rgba(220, 190, 160, 0.3)");
worn.addColorStop(1, "rgba(220, 190, 160, 0)");
g.fillStyle = worn;
g.fillRect(-0.85, -0.4, 1.2, 1.2);
