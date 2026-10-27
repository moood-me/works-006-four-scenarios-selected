// the dusk and the night cross-faded by `night`
const n = e.state.night;
e.layer('dusk').alpha = 1 - n;
e.layer('clouds_dusk').alpha = 1 - n;
e.layer('night').alpha = n;
e.layer('clouds_night').alpha = n;
