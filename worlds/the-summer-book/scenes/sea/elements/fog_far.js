// The fog's first breath over the water (`fog` up to a half): low white banks drifting in over the sea far out, in two
// layers going slowly opposite ways (modules/isle.md: mist). Metres from its foot on the water; 400 m long.
e.kit.isle.mist(g, e, {
  box: [-200, -10, 200, 1],
  layers: [
    { name: 'far', n: 14, y: -1.5, thick: 3.5, len: [18, 50], color: '#eef0f2', alpha: 0.6, drift: 0.6, soft: true },
    { name: 'near', n: 10, y: -0.6, thick: 2.2, len: [18, 50], color: '#f3f3f4', alpha: 0.5, drift: -0.4, soft: true },
  ],
});
