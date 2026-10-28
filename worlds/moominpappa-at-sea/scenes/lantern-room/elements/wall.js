// A solid landward side of the lantern room (copies: two sides): white-painted boards from the floor to the top,
// an iron rib at either edge.
const L = e.lib, w = L.WS / 2;
L.boards(g, e, -w, w, 0, L.H);
g.fillStyle = "#3c4f4b";
g.fillRect(-w, -L.H, 0.05, L.H);
g.fillRect(w - 0.05, -L.H, 0.05, L.H);
