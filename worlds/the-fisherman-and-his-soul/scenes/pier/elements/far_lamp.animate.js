// along the road: the shore (0+), the bridge's end (0.5), up the hill (1 — at its top, going over); none at 0
const u = e.state.far_lantern ?? 0;
const P = [[-160, -1], [-40, -3], [60, -12], [92, -16]];
const s = Math.min(2.999, Math.max(0, u * 3));
const i = Math.floor(s);
const f = s - i;
const lamp = e.layer('lamp');
lamp.x = P[i][0] + (P[i + 1][0] - P[i][0]) * f;
lamp.y = P[i][1] + (P[i + 1][1] - P[i][1]) * f;
e.glow('flame', u > 0 ? 1 : 0);
