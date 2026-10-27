// The close-up moved by the scene's keys (the mini-game's, the piece's).
const S = e.state;
e.kit.closeups.live(e, "handle", { give: S.give ?? 0 });
