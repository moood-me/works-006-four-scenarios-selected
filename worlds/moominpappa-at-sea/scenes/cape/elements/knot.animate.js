// The thread drawn out of the knot (`knot_pull`: the knot minigame's `knot` while it plays; 0 — the knot itself, the
// Fisherman's signature, in the close-ups after); Papa's paws there or the net alone on his knees (`knot_paws`); the
// lightning's white over it (`flash`).
e.kit.closeups.live(e, "knot", { pull: e.state.knot_pull ?? 0, paws: e.state.knot_paws ?? 1, flash: e.state.flash ?? 0 });
