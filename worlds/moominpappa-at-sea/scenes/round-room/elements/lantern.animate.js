// How much the flame burns: its glow and its light (e.glow), the globe lit from within (u_lit) — by `flame`, none while
// the lantern is not in the room.
const S = e.state, k = (S.lantern_at ?? "table") === "none" ? 0 : e.lib.FLAME[S.flame ?? "full"] ?? 1;
e.glow("flame", k);
e.uniform("lit", k);
