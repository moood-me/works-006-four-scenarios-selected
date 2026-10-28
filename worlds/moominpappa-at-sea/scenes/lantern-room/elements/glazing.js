// A glazed seaward side of the lantern (copies: three sides): a parapet of white-painted iron plate with its rivets up
// to the sill, and over it the glass in its dark green iron frame — a post at either edge and down the middle, a bar
// across; the glass itself is clear: the gallery, the sea and the sky are beyond it.
const L = e.lib, w = L.WS / 2, P = L.PARAPET, f = "#3c4f4b";
g.fillStyle = "#e3dfd6";
g.fillRect(-w, -P, 2 * w, P);
g.fillStyle = "rgba(90, 86, 80, 0.5)";
for (let x = -w + 0.08; x < w; x += 0.16) {
  g.beginPath();
  g.arc(x, -P + 0.06, 0.01, 0, Math.PI * 2);
  g.arc(x, -0.06, 0.01, 0, Math.PI * 2);
  g.fill();
}
g.fillStyle = f;
g.fillRect(-w, -P - 0.06, 2 * w, 0.08);
g.fillRect(-w, -L.H, 2 * w, 0.07);
g.fillRect(-w, -L.H, 0.06, L.H - P);
g.fillRect(w - 0.06, -L.H, 0.06, L.H - P);
g.fillRect(-0.025, -L.H, 0.05, L.H - P);
g.fillRect(-w, -(P + L.H) / 2 - 0.02, 2 * w, 0.04);
