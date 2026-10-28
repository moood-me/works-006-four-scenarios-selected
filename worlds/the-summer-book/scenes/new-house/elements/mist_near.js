// The morning's fog lying low on the water close behind the house, in loose banks drifting slowly along the shore —
// there only as the fog comes (modules/isle.md: mist; its animate). Metres from its foot on the water; 240 m long.
e.kit.isle.mist(g, e, {
  box: [-120, -7, 120, 1.5],
  layers: [
    { name: 'bank', n: 7, y: -0.8, thick: 2.6, len: [16, 34], color: '#f2f2ee', alpha: 0.5, drift: 0.5 },
    { name: 'low', n: 6, y: -0.2, thick: 1.4, len: [20, 40], color: '#f5f4f0', alpha: 0.45, drift: -0.35 },
  ],
});
