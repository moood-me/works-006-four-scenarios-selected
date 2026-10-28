// The forest outside games: a June day in the clearing (Grandmother on the stump, the wooden animals in the moss, the
// seal laid among them), her palm on the dead trunk, Sophia at the crevice, the close end of July with its grey band
// on the horizon and the forest spinning, the night and the path to the other side, Papa's lantern far on the water.
const AT = (g, s) => ({ grandma_at: g, sophia_at: s });
const CLEAR = { dawn: 0, dusk: 0, night: 0, late: 0, fog: 0, band: 0, spin: 0, animals: 4, pack: 'none', boat_out: false };
const beat = (name, keys, run) => ({ name, run: async s => {
  s.cut({ ...CLEAR, ...keys });
  await run(s);
} });
return [
  beat('june', { ...AT('stump', 'stump') }, async s => {
    await s.wait(4);
    s.set('animals', 5);
    await s.wait(4);
  }),
  beat('the trunk', { animals: 5, ...AT('trunk', 'moss') }, async s => {
    await s.wait(6);
  }),
  beat('the packet', { animals: 5, pack: 'in', ...AT('clearing', 'crevice') }, async s => {
    await s.wait(5);
  }),
  beat('end of july', { animals: 5, late: 1, band: 0.4, ...AT('moss', 'stump') }, async s => {
    await s.move('band', 1, { over: 6 });
    await s.move('spin', 1, { over: 3 });
    await s.wait(4);
    await s.move('spin', 0, { over: 3 });
  }),
  beat('night', { animals: 5, late: 1, night: 1, boat_out: true, pack: 'taken', ...AT('path1', 'path1') }, async s => {
    await s.wait(2);
    const [a, d] = scene.lib.PLACES.grandma.path2.at;
    await s.person('grandma').walk([[a, d]]);
    await s.wait(3);
  }),
];
