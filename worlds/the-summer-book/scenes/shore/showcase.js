// The shore outside games: the summer on it, hour by hour. The June dawn at the water's edge, the day coming; Sophia on
// the shelf in the clear water, chest-deep; Eriksson rowing in to the pier and away; the July calm, the graves, Papa
// behind the veranda's glass; the evening at the nets; the full moon's path; the storm; the morning after it, the wrack
// and the dinghy going round; August; the last morning in the fog, the big boat, the dinghy out along the shore; the
// island in the fog by night.
const AT = (g, s, p) => ({ grandma_at: g, sophia_at: s, papa_at: p });
const CLEAR = {
  dawn: 0, dusk: 0, night: 0, late: 0, calm: 0, storm: 0, fog: 0, rowboat: 0, net: false, chair: 'none', shell: false,
  graves: 0, weed: false, boat_out: false, dinghy: 'moored', dinghy_at: 0, big_boat: false, luggage: false,
};
// each beat opens on its own shot: its keys at once (a cut), then what moves in it
const beat = (name, keys, run) => ({ name, run: async s => {
  s.cut({ ...CLEAR, ...keys });
  await run(s);
} });
return [
  beat('dawn', { dawn: 1, ...AT('water', 'water', 'lawn') }, async s => {
    await s.wait(4);
    await s.move('dawn', 0, { over: 8 });
  }),
  beat('shelf', { dawn: 1, ...AT('ledge', 'shelf', 'lawn') }, async s => {
    await s.wait(6);
  }),
  beat('eriksson', { ...AT('pier', 'pier', 'lawn') }, async s => {
    await s.move('rowboat', 1, { over: 14, ease: 'out' });
    await s.wait(3);
    await s.move('rowboat', 0, { over: 14, ease: 'in' });
  }),
  beat('calm', { graves: 3, ...AT('warm', 'graves', 'veranda') }, async s => {
    await s.move('calm', 1, { over: 5 });
    await s.wait(3);
  }),
  beat('nets', { dusk: 0.6, net: true, ...AT('net', 'porch', 'net') }, async s => {
    await s.move('dusk', 1, { over: 6 });
  }),
  beat('moon', { night: 1, boat_out: true, ...AT('ledge', 'edge', 'veranda') }, async s => {
    await s.wait(7);
  }),
  beat('storm', { night: 1, ...AT('porch', 'porch', 'veranda') }, async s => {
    await s.move('storm', 1, { over: 4 });
    await s.wait(10);
  }),
  beat('after', { weed: true, shell: true, chair: 'set', dinghy: 'circles', ...AT('path', 'warm', 'pier') }, async s => {
    await s.wait(14);
  }),
  beat('august', { late: 1, chair: 'shoved', rowboat: 1, ...AT('gate', 'pier', 'lawn') }, async s => {
    await s.wait(6);
  }),
  beat('last', { late: 1, dawn: 1, fog: 0.6, big_boat: true, luggage: true, dinghy: 'out', ...AT('gangway', 'gangway', 'gangway') }, async s => {
    await s.move('dinghy_at', 1, { over: 20, ease: 'linear' });
  }),
  beat('fog', { night: 1, fog: 1, ...AT('warm', 'warm', 'veranda') }, async s => {
    await s.wait(8);
  }),
];
