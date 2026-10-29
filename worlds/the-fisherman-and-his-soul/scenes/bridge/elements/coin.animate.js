// the coin falls as a copper is knocked out (`copper` counted up): from the coping to the water in 0.76 s, gathering
// speed, then gone (the splash is the particles')
const m = e.mem;
const n = e.state.copper ?? 0;
if (m.n == null) m.n = n;
if (n !== m.n) { m.n = n; m.at = e.t; }
const since = m.at == null ? 99 : e.t - m.at;
const coin = e.layer('coin');
const falling = since < 0.76;
coin.alpha = falling ? 1 : 0;
coin.y = falling ? 0.5 * 9.8 * since * since : 0;
coin.rotate = since * 9;
