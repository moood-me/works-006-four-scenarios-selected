// A lantern far away on the right — on the shore road and up the hill to the town (the Soul going with his lantern):
// a glow only, too far to light anything; a layer its animate carries along the road by `far_light`. Metres, origin
// where the road leaves the bay's shore
e.layer('lamp', { box: [-8, -8, 8, 8] }, g => {
  e.light(0, 0, 7, '#ffc274', 1.6, 'flame');
});
