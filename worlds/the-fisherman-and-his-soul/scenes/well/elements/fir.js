// A fir of the wood round the glade (12 m at scale 1; the copies stand round it, each its own size, turn and tint):
// one layer that the wind bends a little from its foot
e.layer('tree', { pivot: [0, 0], wind: { strength: 0.05, gust: 0.3 } }, g => {
  e.lib.fir(g, 12, 1, { body: '#40604c', under: '#2b4337', trunk: '#4a3a2e' });
});
