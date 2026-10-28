// the forest spinning (`spin` 0…1): the trees wheel about their feet all as one, as a dizzy head sees them
const k = e.state.spin ?? 0;
const t = e.t * 1.3;
e.layer('tree').rotate = k * 0.09 * Math.sin(t + e.anim.noise(t * 0.3, 7) * 2);
e.layer('tree').x = k * 0.5 * Math.sin(t * 0.8 + 1.1);
