// the rime spreads as the ring of frost does (the first 0.4 of `frost`)
e.uniform('ring', Math.min(1, Math.max(0, e.state.frost ?? 0) / 0.4));
