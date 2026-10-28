// How much the lantern burns: by `flame`, none while it is not in the room.
const S = e.state, K = e.kit.lantern;
K.move(e, (S.lantern_at ?? "table") === "none" ? 0 : K.FLAME[S.flame ?? "full"] ?? 1);
