// the boat rides the still water: a slow lift and a slower roll, never in step
const h = e.layer('hull');
h.y = 0.015 * e.anim.drift(e.t * 0.35, 1);
h.rotate = 0.012 * e.anim.drift(e.t * 0.22, 2);
