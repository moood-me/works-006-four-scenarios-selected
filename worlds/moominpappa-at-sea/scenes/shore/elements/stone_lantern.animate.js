// how much it burns now: by lantern_stone (lit — full, low — turned low, out or not there — none)
const v = e.state.lantern_stone, F = e.kit.lantern.FLAME;
e.kit.lantern.move(e, v === 'lit' ? F.full : v === 'low' ? F.low : 0);
