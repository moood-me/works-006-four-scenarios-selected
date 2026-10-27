// The close-up moved by the scene's keys (the mini-game's, the piece's).
const S = e.state;
e.kit.closeups.live(e, "paws", { frost: 1, rub: S.paws_rub ?? 0, thaw: S.paws_thaw ?? 0 });
