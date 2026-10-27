// the sky's light follows the looks
const s = e.state, k = v => Math.max(0, Math.min(1, v ?? 0));
e.uniform('dusk', k(s.dusk));
e.uniform('night', k(s.night));
e.uniform('dawn', k(s.dawn));
