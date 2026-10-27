// «The chart» outside games: the view goes chapter by chapter from the valley to the island, Papa's course pencilled
// across the sea on the way (chapter I), then over the island's plan to the epilogue and the finale.
const NAMES = ['prologue', 'the crossing', 'the lighthouse', 'the garden', 'the storm', 'epilogue', 'the finale'];
return NAMES.map((name, i) => ({
  name,
  run: async s => {
    s.set('shown', i);
    await s.wait(1.2);
    if (i === 1) await s.move('route', 1, { over: 4, ease: 'inOut' });
    await s.wait(1.8);
  },
}));
