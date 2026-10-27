// where the strip begins: just behind the Groke, as near as `trail` brings her; with her not here, no strip
const t = Math.max(-1.5, Math.min(1, e.state.trail ?? 0));
e.uniform('near', e.state.groke_here === false ? 1000 : e.lib.trailNear(t) - 0.6);
