// the dinghy rides the water: a quick small lift and roll, never in step with the boats
const h = e.layer('hull');
h.y = 0.012 * e.anim.drift(e.t * 0.6, 6);
h.rotate = 0.02 * e.anim.drift(e.t * 0.35, 7);
