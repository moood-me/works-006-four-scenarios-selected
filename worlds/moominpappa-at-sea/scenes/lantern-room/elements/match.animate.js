// The close-up moved by the scene's keys (the mini-game's, the piece's).
const S = e.state;
e.kit.closeups.live(e, "match", { match: S.match ?? 0, lit: S.flame === "smoky" || S.flame === "lit" ? 1 : 0, out: S.match_out ?? 0 });
