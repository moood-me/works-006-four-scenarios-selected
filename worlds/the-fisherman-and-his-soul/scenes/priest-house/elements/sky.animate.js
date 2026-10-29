// the dawn shown over the night as the morning comes; the moon's glow going with the night
const m = e.anim.clamp(e.state.morning ?? 0, 0, 1);
e.uniform('dawn', m);
e.glow('glow', 1 - m);
