// the boat rides the water: a slow lift and a slower roll, never in step; more of both in a storm
const h = e.layer('hull');
const k = 1 + 3 * (e.state.storm ?? 0);
h.y = 0.02 * k * e.anim.drift(e.t * 0.4, 4);
h.rotate = 0.015 * k * e.anim.drift(e.t * 0.25, 5);
