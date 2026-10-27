// how much it burns: as much as its light is on (the piece `douse` turns it down before it is out)
e.kit.lantern.move(e, Math.max(0, Math.min(1, e.state.lantern_bow_on ?? 0)));
