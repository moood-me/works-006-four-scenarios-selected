// How much the lantern burns: by `lantern_flame`, none while it is not here.
const S = e.state, K = e.kit.lantern;
K.move(e, (S.lantern_at ?? "none") === "none" ? 0 : K.FLAME[S.lantern_flame ?? "full"] ?? 1);
