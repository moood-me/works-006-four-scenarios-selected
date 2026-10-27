// The family's storm lantern set on the flat stone (lantern_stone) — the world's one lantern (modules/lantern): lit
// (its flame full), turned low, out; not there (none: only its light, put out).
const v = e.state.lantern_stone;
e.kit.lantern.paint(g, e, { flame: v === 'lit' ? 'full' : v === 'none' ? 'out' : v, here: v !== 'none' });
