// The wall over the window, up to the ceiling (the room's circle between the window's cheeks): its painting's foot is
// the window's top, so the whitewash is laid at the wall's own heights, moved down by that much.
const L = e.lib, h = L.H - L.WIN.top, { width: w, bend } = L.WALLS.win;
g.save();
g.translate(0, L.WIN.top);
L.whitewash(g, e, -w / 2, w / 2, L.WIN.top, L.H);
g.restore();
e.form(e.kit.bend(w, h, bend), { ground: "#ece6d9" });
