// The narrow pier of wall between the window and the door (a bent sheet of the room's circle): whitewash over the dado.
const L = e.lib, { width: W, bend } = L.WALLS.b, H = L.H;
L.whitewash(g, e, -W / 2, W / 2, 0, H);
e.form(e.kit.bend(W, H, bend), { ground: "#ece6d9" });
