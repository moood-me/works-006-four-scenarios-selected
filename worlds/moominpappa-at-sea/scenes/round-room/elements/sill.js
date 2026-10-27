// The deep stone sill of the window, seen from above (x across the window, y toward the room): whitewashed, worn grey
// where elbows lean. On it Moominmamma's first painted garden (`sill`: −1 bare; 0 her first stem alone; 1–4 that many
// flowers by it), in her `paints`; her pot of paint and her brush laid by it (`brushes`: sill —
// or put away in the jar, its own element).
const L = e.lib, S = e.state, w = 2 * L.WIN.half, d = L.WIN.deep, P = L.PAINTS[S.paints] ?? L.PAINTS.green;
g.fillStyle = "#e2dccf";
g.fillRect(-w / 2, -d / 2, w, d);
const worn = g.createLinearGradient(0, d / 2, 0, -d / 2);
worn.addColorStop(0, "rgba(140, 132, 122, 0.35)");
worn.addColorStop(0.4, "rgba(140, 132, 122, 0)");
g.fillStyle = worn;
g.fillRect(-w / 2, -d / 2, w, d);
const n = S.sill ?? -1;
if (n >= 0) {
  // the garden, growing from the room's edge toward the glass: the stem first, then the flowers about it
  L.flower(g, -0.12, 0.27, 0.27, -0.05, null, null, P.leaf);
  const blooms = [[-0.3, 0.26, 0.36, 0.06], [0.08, 0.26, 0.32, 0.04], [0.27, 0.27, 0.22, 0.07], [-0.42, 0.27, 0.2, -0.04]];
  for (let i = 0; i < n; i++) {
    const [fx, fy, h, lean] = blooms[i];
    L.flower(g, fx, fy, h, lean, P.petals[i % 4], P.heart, P.leaf);
  }
  // the pot of paint
  g.fillStyle = "#8a8f88";
  g.beginPath();
  g.arc(0.4, 0.12, 0.05, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = P.leaf;
  g.beginPath();
  g.arc(0.4, 0.12, 0.038, 0, Math.PI * 2);
  g.fill();
  if ((S.brushes ?? "sill") === "sill") {
    g.strokeStyle = "#8a5a32";
    g.lineWidth = 0.012;
    g.beginPath();
    g.moveTo(0.3, 0.22);
    g.lineTo(0.48, 0.04);
    g.stroke();
    g.fillStyle = P.petals[0];
    g.beginPath();
    g.arc(0.3, 0.22, 0.012, 0, Math.PI * 2);
    g.fill();
  }
}
e.at(-0.1, 0.0, "garden");
