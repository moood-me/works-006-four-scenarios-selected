// the fire as high as `fire`: low, it sinks to embers
const k = e.anim.clamp(e.state.fire ?? 1, 0, 1);
const f = e.layer('fire');
f.scaleY = 0.35 + 0.65 * k;
f.alpha = 0.45 + 0.55 * k;
