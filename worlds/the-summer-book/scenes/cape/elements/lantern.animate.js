// the candle in the lantern: `candle` (its light is the scene's light "candle", on the same key); no flame, no glow
// while the tent is not up
const up = e.lib.tentShown(e.state, 'up');
if (up) e.layer('flame').alpha = e.state.candle ?? 0;
e.glow('flame', up);
