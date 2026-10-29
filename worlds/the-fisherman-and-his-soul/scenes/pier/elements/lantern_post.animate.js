// the lantern sways on its hook while it hangs there (`lantern_at` post): a damped swing pushed by the breeze, never in
// a cycle one can see
if ((e.state.lantern_at ?? 'post') !== 'post') return;
const m = e.mem;
m.a ??= 0;
m.v ??= 0;
const push = 0.35 * e.anim.drift(e.t * 0.25, 3);
m.v += (-12 * m.a - 0.9 * m.v + push) * e.dt;
m.a += m.v * e.dt;
e.layer('lantern').rotate = m.a;
