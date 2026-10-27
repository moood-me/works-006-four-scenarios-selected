// The Fisherman's cape and the island behind it, shared by the relief, the granite's painting and the sea's (its
// shallows, the foam at the waterline): the viewer's rock and the low tongue of the cape running out to the left, his
// stone shelter on it, a cove of water ahead, the long back of the island on the right rising to the lighthouse's
// knoll, some sixty metres off. Made of the island's shapes (modules/island). Metres: across (right +), distance (ahead), the height over the viewer's rock.
const { ridge, bump, shoreOf } = kit.island;
const SEA = -1.6;
function raw(a, d) {
  return -2.6
    + ridge(a, d, 3, -6, -22, 34, 3.1, 1.6, 8.5)
    + ridge(a, d, 14, -10, 28, 54, 3.0, 3.6, 12)
    + 2.6 * bump(a, d, 28, 54, 7, 6)
    + 0.8 * bump(a, d, -3.4, 6.6, 1.8, 1.5)
    - 1.6 * bump(a, d, 6, 20, 4.5, 8);
}
const H0 = raw(0, 0);
function land(a, d) {
  return raw(a, d) - H0;
}
// where the land meets the sea (the island's painters ask it): fn(across, distance, h) where h is within [lo, hi]
const shore = shoreOf(land, SEA, -34, 56, -10, 80);
// a fishing net seen flat (metres, y down): diamond meshes of `cell` metres between its top edge and its bottom,
// top(x) and bottom(x), from x0 to x1 — each mesh its two upper sides, one path
function net(g, x0, x1, top, bottom, cell, color) {
  g.strokeStyle = color;
  g.lineWidth = cell * 0.08;
  g.lineJoin = "round";
  g.beginPath();
  const h = cell * 0.5;
  for (let x = x0, i = 0; x <= x1 + 1e-6; x += h, i++) {
    const t = top(x), b = bottom(x);
    for (let y = t + (i % 2) * h; y + h <= b + 1e-6; y += cell) {
      g.moveTo(x - h, y + h);
      g.lineTo(x, y);
      g.lineTo(x + h, y + h);
    }
  }
  g.stroke();
}
return { SEA, land, shore, net };
