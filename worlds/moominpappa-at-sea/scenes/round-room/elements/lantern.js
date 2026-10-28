// The storm lantern (modules/lantern), the room's only light at night: where `lantern_at` says (the script moves its
// place: lantern_a/d/e — the table, the stair's middle tread, the floor by the boy's bunk; none — not in the room),
// its flame by `flame`.
const S = e.state;
e.kit.lantern.paint(g, e, { flame: S.flame ?? "full", here: (S.lantern_at ?? "table") !== "none" });
