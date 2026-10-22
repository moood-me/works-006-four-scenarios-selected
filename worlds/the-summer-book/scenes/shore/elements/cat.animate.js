// the tail's tip stirs: still most of the time, a slow flick now and then
const n = e.anim.drift(e.t * 0.4, 7);
e.layer('tail').rotate = 0.25 * Math.max(0, n) * Math.max(0, n);
