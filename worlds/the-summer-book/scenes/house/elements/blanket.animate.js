// seen as `under` says; its edge held up as `cover` says (sagging, it turns down over the opening), the point with it
const k = +(e.state.under ?? 0);
const sag = 1 - Math.max(0, Math.min(1, +(e.state.cover ?? 1)));
e.layer('wool').alpha = k;
e.layer('edge').alpha = k;
e.layer('edge').rotate = -0.5 * sag;
e.at(0.2, -0.25 + 0.2 * sag, 'edge');
