// The wall over and about the door's arch, up to the ceiling: a flat sheet across the chord between the jambs (the
// wall's curve over a metre is a few centimetres), whitewash with the arch cut out of it.
const L = e.lib, w = L.DOOR.half, H = L.H, s = L.DOOR.spring;
g.save();
g.beginPath();
g.rect(-w, -H, 2 * w, H - s);
g.moveTo(-w, -s);
g.arc(0, -s, w, Math.PI, 0);
g.closePath();
g.clip("evenodd");
L.whitewash(g, e, -w, w, s, H);
g.restore();
