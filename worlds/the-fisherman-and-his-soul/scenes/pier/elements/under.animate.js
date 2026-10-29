// as bright as `under_light`
const k = e.anim.clamp(e.state.under_light ?? 0, 0, 1);
e.layer('pale').alpha = k;
e.glow('pale', k);
