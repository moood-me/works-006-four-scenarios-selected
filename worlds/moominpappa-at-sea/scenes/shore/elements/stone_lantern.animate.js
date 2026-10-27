// lantern_stone: none — not there; lit — the globe aglow, the flame trembling, its light on; low — the same, dim;
// out — cold glass, dark
const s = e.state.lantern_stone, here = s === "none" ? 0 : 1, lit = s === "lit" ? 1 : s === "low" ? 0.35 : 0;
e.layer("tin").alpha = here;
const f = 0.88 + 0.08 * Math.sin(e.t * 9.1) + 0.04 * Math.sin(e.t * 23.7);
e.layer("flame").alpha = lit * f;
e.glow("flame", lit * f);
