// the globe glows as far as the lamps are lit
e.layer('lit').alpha = Math.max(0, Math.min(1, e.state.lamps ?? 0));
