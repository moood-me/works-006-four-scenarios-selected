// The middle of the island outside games: the son laying his ring of stones, My busy on her rock; Papa coming down to
// choose his day; the rope down into the pool with no bottom, and the pines creeping behind his back; the armful carried
// through the ring, and the son laying it again; the rope coiled on the rock, the ring one stone short.
const HERE = (...ids) => Object.fromEntries(['troll', 'papa', 'mama', 'my'].map(id => [`${id}_here`, ids.includes(id)]));
const DAY = { dawn: 0, dusk: 0, night: 0 };
// the play's keys each piece is shown in (the game's, in a game)
const PARTY = {
  ring: { ...DAY, ...HERE('troll', 'my'), pines: 0, coil: false, rope: 0 },
  day: { ...DAY, ...HERE('papa') },
  sound_ready: { ...DAY, ...HERE('papa') },
  sound_after: { ...DAY, ...HERE('papa') },
  armful_in: { ...DAY, ...HERE('papa', 'troll'), rope: 0 },
  armful_through: { ...DAY, ...HERE('papa', 'troll') },
  regather: { ...DAY, ...HERE('troll') },
  rope_shot: { ...DAY, dusk: 0.6, ...HERE() },
  ring_shot: { ...DAY, dusk: 0.6, ...HERE() },
};
// (each piece cut to its start after its play's keys are set — its start reads them — unless it follows the one
// before)
const film = scene.lib.film(scene), order = Object.keys(PARTY);
return order.map((name, i) => ({
  name,
  run: async s => {
    for (const [k, v] of Object.entries(PARTY[name])) s.set(k, v);
    const b = film[name];
    if (b.from && !(i > 0 && [].concat(b.after ?? []).includes(order[i - 1]))) s.cut(b.from());
    await b.run(s);
  },
}));
