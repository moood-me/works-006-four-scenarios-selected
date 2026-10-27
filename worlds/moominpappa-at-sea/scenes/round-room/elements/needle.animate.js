// The close-up moved by the scene's keys (the mini-game's, the piece's).
const S = e.state;
e.kit.closeups.live(e, "needle", { thread: S.thread ?? 0, low: S.flame === "low" ? 1 : 0 });
