// The cape outside games: its August, hour by hour. The tent going up in the evening (the parcel, the pole, the tent
// standing, a little crooked), the dusk turning to the moonlit night, the tent glowing with the fog coming in, Sophia's
// shadow on its shut door, Sophia at the thrown-back flap with the cat, Grandmother on the wet stones in the white fog,
// Grandmother behind the tent seen from the side, the last morning (the stones round its edges, Papa at the peg) and
// the cape from the sea, the shawl on the ledge.
const AT = (g, s, p) => ({ grandma_at: g, sophia_at: s, papa_at: p });
const HERE = (g, s, p) => ({ grandma_here: g, sophia_here: s, papa_here: p });
const CLEAR = {
  dawn: 0, dusk: 0, night: 0, late: 1, fog: 0, candle: 0, window: 0, tent: 'up', lean: 0, flap: 'open', shawl: 'none',
  stones: false, from: 'land', cat_pose: 'none', ...HERE(true, true, false),
};
// each beat opens on its own shot: its keys at once (a cut), then what moves in it
const beat = (name, keys, run) => ({ name, run: async s => {
  s.cut({ ...CLEAR, ...keys });
  await run(s);
} });
return [
  beat('pitching', { dusk: 0.4, tent: 'parcel', ...AT('pole', 'tie', 'by'), ...HERE(true, true, true), cat_at: 'rock', cat_pose: 'sit' }, async s => {
    await s.wait(3);
    s.set('tent', 'pole');
    await s.wait(4);
    s.set('tent', 'up');
    await s.move('lean', 0.5, { over: 1.5, ease: 'out' });
    await s.wait(3);
  }),
  beat('evening', { dusk: 1, ...AT('stand', 'tent', 'by'), ...HERE(true, true, true), cat_at: 'tent', cat_pose: 'sit' }, async s => {
    await s.wait(3);
    await s.move('night', 1, { over: 8 });
    await s.wait(2);
  }),
  beat('glow', { night: 1, candle: 1, window: 1, fog: 0.25, ...HERE(false, false, false) }, async s => {
    await s.move('fog', 0.5, { over: 8 });
  }),
  beat('shadow', { night: 1, candle: 1, flap: 'shut', ...AT('stand', 'inside', 'by'), ...HERE(false, true, false) }, async s => {
    await s.wait(6);
  }),
  beat('door', { night: 1, fog: 0.3, ...AT('stand', 'door', 'by'), ...HERE(false, true, false), cat_at: 'door', cat_pose: 'sit' }, async s => {
    await s.wait(3);
    s.set('cat_pose', 'walk');
    s.set('cat_at', 'rock');
    await s.wait(6);
    s.set('cat_pose', 'lie');
    await s.wait(2);
  }),
  beat('stones', { night: 1, fog: 1, flap: 'shut', candle: 0.4, ...AT('stone1', 'inside', 'by'), ...HERE(true, false, false) }, async s => {
    await s.wait(2);
    const [a, d] = scene.lib.PLACES.grandma.stone2.at;
    await s.person('grandma').walk([[a, d]]);
    await s.wait(3);
  }),
  beat('behind', { night: 1, fog: 0.8, flap: 'shut', candle: 1, from: 'side', ...AT('behind', 'inside', 'by'), ...HERE(true, true, false) }, async s => {
    await s.wait(6);
  }),
  beat('last', { dawn: 1, fog: 0.35, stones: true, lean: 0.5, ...AT('stand', 'tent', 'peg'), ...HERE(false, true, true), cat_at: 'tent', cat_pose: 'sit' }, async s => {
    await s.wait(6);
  }),
  beat('from the sea', { dawn: 1, fog: 0.5, stones: true, lean: 0.5, shawl: 'ledge', from: 'sea', ...HERE(false, false, false) }, async s => {
    await s.wait(4);
    await s.move('fog', 1, { over: 8 });
  }),
];
