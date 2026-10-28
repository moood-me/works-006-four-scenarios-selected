// The sea outside games: the last morning of August, in the thin morning fog — the boat leaving the island, everyone
// in it, the dinghy in tow; Sophia on the bow, the cat on the basket; the swell, Sophia's hand in Grandmother's; the
// island going away into the white.
const MORNING = { late: 1, dawn: 1, fog: 0.6, dusk: 0, night: 0, storm: 0, calm: 0 };
const beat = (name, keys, run) => ({ name, run: async s => {
  s.cut({ ...MORNING, ...keys });
  await run(s);
} });
return [
  beat('leave', { island: 0, sway: 0, basket: 'shut', dinghy: true, sophia_at: 'beside', grandma_at: 'seat' }, async s => {
    await s.move('island', 0.25, { over: 18 });
  }),
  beat('bow', { island: 0.3, basket: 'cat', sophia_at: 'bow', grandma_at: 'seat' }, async s => {
    await s.move('island', 0.45, { over: 10 });
  }),
  beat('swell', { island: 0.5, sway: 0, sophia_at: 'hand', grandma_at: 'hand' }, async s => {
    await s.move('sway', 1, { over: 4 });
    await s.wait(8);
    await s.move('sway', 0, { over: 4 });
  }),
  beat('gone', { island: 0.55, sophia_at: 'hand', grandma_at: 'hand' }, async s => {
    await s.all(s.move('island', 1, { over: 24 }), s.move('fog', 0.85, { over: 24 }));
  }),
];
