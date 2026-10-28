// the grate glows while the jam cooks
e.layer('fire').alpha = Math.max(0, Math.min(1, e.state.jam ?? 0));
