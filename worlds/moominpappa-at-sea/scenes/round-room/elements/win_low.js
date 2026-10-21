// The wall under the window (the room's circle between the window's two cheeks, from the floor to the sill): the dado.
const L = e.lib, { width: w, bend } = L.WALLS.win;
L.whitewash(g, e, -w / 2, w / 2, 0, L.WIN.sill);
e.form(e.kit.bend(w, L.WIN.sill, bend), { ground: "#93a7ad" });
