// the cut drawn out along the line from the heel as `cut` goes 0 → 1
const k = e.anim.clamp(e.state.cut ?? 0, 0, 1);
const l = e.layer('cut');
l.scale = Math.max(0.001, k);
l.alpha = k > 0 ? 1 : 0;
e.glow('edge', k > 0 && k < 1 ? 1 : 0);
