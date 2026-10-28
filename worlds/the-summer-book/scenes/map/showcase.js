// «The Map» outside games: the view goes chapter by chapter along Papa's drawing of the island — the house and the
// pier, the magic forest, the calm bay, the new house under the storm's cloud, the cape and its tent, the big boat
// going out into the fog.
const NAMES = ['the peonies', 'the magic forest', 'the calm', 'the storm', 'the fog', 'august'];
return NAMES.map((name, i) => ({
  name,
  run: async s => {
    s.set('shown', i);
    await s.wait(3.5);
  },
}));
