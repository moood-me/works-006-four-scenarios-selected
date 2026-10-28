// The sea outside games: the last morning of August in its pieces — the motor, Sophia coming over from the bow to take
// Grandmother's hand, her eyes closed, the island going by, the new house's black windows, the cat's last present, the
// blanket over the two of them, the talk about the hat, the moon's «Look», the island gone into the white. Each piece in
// its play's keys (the game's, in a game).
const MORNING = { late: 1, dawn: 1, fog: 0.6, dusk: 0, night: 0, storm: 0, calm: 0 };
const ALL = { grandma_here: true, sophia_here: true, papa_here: true };
const PARTY = {
  aboard: { ...MORNING, ...ALL, grandma_at: 'seat', sophia_at: 'beside', basket: 'shut', dinghy: true, counted: true },
  come_over: { ...MORNING, ...ALL, basket: 'shut', dinghy: true },
  eyes_closed: { ...MORNING, ...ALL },
  motor: { ...MORNING, ...ALL, grandma_at: 'hand', sophia_at: 'hand', basket: 'cat' },
  look_house: { ...MORNING, ...ALL, grandma_at: 'hand', sophia_at: 'hand', basket: 'cat' },
  cat_gift: { ...MORNING, ...ALL, grandma_at: 'hand', sophia_at: 'hand' },
  sky: { ...MORNING, ...ALL, grandma_at: 'hand', sophia_at: 'hand', storm_mark: 'blanket' },
  window_talk: { ...MORNING, ...ALL, grandma_at: 'seat', sophia_at: 'beside', sign_hat: 'on', song: true },
  promise: { ...MORNING, ...ALL, grandma_at: 'seat', sophia_at: 'beside', mama: 'moon' },
  window_last: { ...MORNING, ...ALL, grandma_at: 'seat', sophia_at: 'beside' },
};
const film = scene.lib.film(scene);
const order = Object.keys(PARTY);
const follows = (name, prev) => [].concat(film[name].after ?? []).includes(prev);
return order.map((name, i) => ({
  name,
  run: async s => {
    for (const [k, v] of Object.entries(PARTY[name])) s.set(k, v);
    const b = film[name];
    if (b.from && !(i > 0 && follows(name, order[i - 1]))) s.cut(b.from());
    await b.run(s);
  },
}));
