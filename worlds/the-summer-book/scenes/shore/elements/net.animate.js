// the tangle loosens as the knot is worked (`knot`, the mini-game's)
if (!e.state.net) return;
e.layer('tangle').alpha = 1 - (e.state.knot ?? 0);
