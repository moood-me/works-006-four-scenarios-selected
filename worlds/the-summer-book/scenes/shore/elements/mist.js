// A low white mist lying on the sea at the horizon, in two thin banks drifting slowly opposite ways (modules/isle.md:
// mist). Metres from its foot on the water; 1600 m long.
e.kit.isle.mist(g, e, {
  box: [-800, -16, 800, 2],
  layers: [
    { name: 'far', n: 12, y: -2, thick: 6, len: [60, 160], color: '#eef0ee', alpha: 0.55, drift: 1.2 },
    { name: 'near', n: 9, y: -1, thick: 4, len: [60, 160], color: '#f4f3ef', alpha: 0.45, drift: -0.8 },
  ],
});
