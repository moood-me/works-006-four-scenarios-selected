// A slimmer fir, its tiers tighter (14 m at scale 1): one layer that the wind bends a little from its foot
e.layer('tree', { pivot: [0, 0], wind: { strength: 0.05, gust: 0.3 } }, g => {
  g.scale(0.72, 1);
  e.lib.fir(g, 14, 2, { body: '#3a5848', under: '#283f34', trunk: '#47382c' });
});
