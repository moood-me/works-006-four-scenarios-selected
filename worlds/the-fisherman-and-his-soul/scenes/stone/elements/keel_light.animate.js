// as bright as `pass_light` (0 → 1 → 0, moved by the piece), only while the boat is here
const k = e.state.boat ? e.anim.clamp(e.state.pass_light ?? 0, 0, 1) : 0;
e.layer('pale').alpha = k;
e.glow('pass', k);
