// the big boat lies heavy on the water: a slow lift, a slower roll
if (!e.state.big_boat) return;
const h = e.layer('hull');
h.y = 0.01 * e.anim.drift(e.t * 0.25, 8);
h.rotate = 0.006 * e.anim.drift(e.t * 0.18, 9);
