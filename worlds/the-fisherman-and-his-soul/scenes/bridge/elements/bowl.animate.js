// the bowl rocks a moment each time a copper is knocked out of it (`copper` counted up), settling
const m = e.mem;
const n = e.state.copper ?? 0;
if (m.n == null) m.n = n;
if (n !== m.n) { m.n = n; m.at = e.t; }
const since = m.at == null ? 99 : e.t - m.at;
e.layer('bowl').rotate = since < 2 ? 0.25 * Math.exp(-2.2 * since) * Math.sin(since * 14) : 0;
