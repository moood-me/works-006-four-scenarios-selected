// The glazed side with the door out onto the gallery: the same frame and parapet, the iron door in the middle — its
// lower half plate, its upper half glass —, a handle.
const L = e.lib, w = L.WS / 2, P = L.PARAPET, f = "#3c4f4b", dw = 0.36, dh = 2.0;
g.fillStyle = "#e3dfd6";
g.fillRect(-w, -P, w - dw, P);
g.fillRect(dw, -P, w - dw, P);
g.fillStyle = f;
g.fillRect(-w, -P - 0.06, w - dw, 0.08);
g.fillRect(dw, -P - 0.06, w - dw, 0.08);
g.fillRect(-w, -L.H, 2 * w, 0.07);
g.fillRect(-w, -L.H, 0.06, L.H);
g.fillRect(w - 0.06, -L.H, 0.06, L.H);
g.fillRect(-dw - 0.05, -dh - 0.05, 0.05, dh + 0.05);
g.fillRect(dw, -dh - 0.05, 0.05, dh + 0.05);
g.fillRect(-dw, -dh - 0.05, 2 * dw, 0.05);
g.fillRect(-dw, -dh * 0.5, 2 * dw, dh * 0.5);
g.fillRect(-dw, -dh * 0.75, 2 * dw, 0.035);
g.fillStyle = "#b08d4a";
g.fillRect(dw - 0.1, -1.0, 0.05, 0.03);
