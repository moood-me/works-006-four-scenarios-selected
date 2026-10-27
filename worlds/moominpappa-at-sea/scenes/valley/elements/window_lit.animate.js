// the window is lit as far as the lamps are
const k = Math.max(0, Math.min(1, e.state.lamps ?? 0));
e.layer('lit').alpha = k;
