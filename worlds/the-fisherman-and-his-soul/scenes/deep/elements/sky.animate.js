// the shader's numbers from the state: the dusk's dimming; the lantern far above going from the left of the middle to
// the right as `far_light` goes 0 → 1, coming in at its start and fading out at its end
const s = e.state;
const k = s.far_light ?? 0;
e.uniform('dusk', s.dusk ?? 0);
e.uniform('lx', e.aspect * (0.38 + 0.5 * k));
e.uniform('lamp', k <= 0 ? 0 : e.anim.span(k, 0, 0.08) * (1 - e.anim.span(k, 0.85, 1)));
