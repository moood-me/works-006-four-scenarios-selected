// the rope is in the water while some is let down and it is not coiled up; as it is pulled (rope moving) it trembles
// and the rings spread
const s = e.state, down = !s.coil && s.rope > 0.001 ? 1 : 0, v = Math.min(1, Math.abs(e.speed("rope")) * 3);
const line = e.layer("line"), rings = e.layer("rings");
line.alpha = down;
line.rotate = 0.04 * v * Math.sin(e.t * 13);
rings.alpha = down * (0.35 + 0.65 * v);
rings.scale = 1 + 0.15 * Math.sin(e.t * 2.2);
