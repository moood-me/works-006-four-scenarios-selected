// how far the frost has come: the ring round the Groke over the first 0.4 of `frost`, the track to the water after
const f = Math.max(0, Math.min(1, e.state.frost ?? 0));
e.uniform('ring', Math.min(1, f / 0.4));
e.uniform('track', Math.max(0, (f - 0.4) / 0.6));
