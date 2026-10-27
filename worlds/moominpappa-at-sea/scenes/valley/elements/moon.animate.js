// the moon is out as far as the night is
const n = Math.max(0, Math.min(1, e.state.night ?? 0));
e.layer('disc').alpha = n;
e.glow('glow', n);
