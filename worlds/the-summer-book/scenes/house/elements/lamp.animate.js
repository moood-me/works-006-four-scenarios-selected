// the lamp alight as `lamp_lit` says, while it is on its table or in the window
const s = e.state.lamp;
const lit = s === 'table' || s === 'window' ? +(e.state.lamp_lit ?? 0) : 0;
e.glow('flame', lit);
e.layer('flame').alpha = lit;
