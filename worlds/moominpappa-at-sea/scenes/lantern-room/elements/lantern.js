// The storm lantern carried up (modules/lantern): on the floor by the sooty wall (`lantern_at`: floor) or not here
// (none); its flame by `lantern_flame`.
const S = e.state;
e.kit.lantern.paint(g, e, { flame: S.lantern_flame ?? "full", here: (S.lantern_at ?? "none") !== "none" });
