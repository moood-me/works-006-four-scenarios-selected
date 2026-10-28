// The island in the fog (`fog` over a half): low white banks close over the water and the rock, drifting slowly both
// ways (modules/isle.md: mist). Metres from its foot; 160 m long.
e.kit.isle.mist(g, e, {
  box: [-80, -9, 80, 1],
  layers: [
    { name: 'far', n: 10, y: -1.5, thick: 4, len: [14, 30], color: '#eef0f1', alpha: 0.55, drift: 0.35, soft: true },
    { name: 'near', n: 8, y: -0.6, thick: 2.6, len: [10, 24], color: '#f4f4f4', alpha: 0.5, drift: -0.25, soft: true },
  ],
});
