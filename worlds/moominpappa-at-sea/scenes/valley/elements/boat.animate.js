// the bow lantern's glass glows when it is lit; the boat (and the lantern with her) rocks a little on the swell
e.layer('lit').alpha = Math.max(0, Math.min(1, e.state.lantern_bow ?? 0));
const r = 0.012 * Math.sin(e.t * 0.9) + 0.006 * Math.sin(e.t * 1.7 + 1);
e.layer('hull').rotate = r;
e.layer('lit').rotate = r;
