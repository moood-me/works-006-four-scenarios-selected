// How much the flame burns: its glow and its light (e.glow), the globe lit from within (u_lit) — none while the
// lantern is not here.
const S = e.state, k = (S.lantern_at ?? "none") === "none" ? 0 : e.lib.FLAME[S.lantern_flame ?? "full"] ?? 1;
e.glow("flame", k);
e.uniform("lit", k);
