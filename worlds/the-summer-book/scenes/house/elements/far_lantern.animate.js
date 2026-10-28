// the lantern out and alight as `far_light` says
const k = +(e.state.far_light ?? 0);
e.glow('flame', k);
e.layer('frame').alpha = k;
e.layer('glass').alpha = k;
