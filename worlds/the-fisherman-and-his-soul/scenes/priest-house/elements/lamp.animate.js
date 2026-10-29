// the lantern sways on its hook in the draught from the door: a damped swing pushed a little, never in a cycle one can
// see
const m = e.mem;
m.a ??= 0;
m.v ??= 0;
const push = 0.18 * e.anim.drift(e.t * 0.2, 7);
m.v += (-12 * m.a - 0.9 * m.v + push) * e.dt;
m.a += m.v * e.dt;
e.layer('lantern').rotate = m.a;
