// the luggage is on the jetty in the set-ups that have it there
e.layer('all').alpha = Math.max(0, Math.min(1, e.state.luggage ?? 0));
