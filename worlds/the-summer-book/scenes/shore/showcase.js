// The shore outside games: the summer in its pieces — the dawn of the teeth in the peonies, the shelf and Sophia in
// the water, Eriksson and the gunwale, the evening at the nets, the July calm and the pebbles, the full moon's path,
// the storm on the porch, the dinghy going round, the post and the chair by the gate, the dawn on the porch, the last
// morning and the way to the boat, the oars, the island from the water. Each piece in its play's keys (the game's, in a
// game: the hour, the weather, who is here, the marks).
const NONE = { dawn: 0, dusk: 0, night: 0, late: 0, calm: 0, storm: 0, fog: 0, weed: false, boat_out: false, big_boat: false, luggage: false,
  chair: 'none', shell: false, graves: 0, hat: 'nail' };
const HERE = (...ids) => Object.fromEntries(['grandma', 'sophia', 'papa', 'eriksson'].map(id => [`${id}_here`, ids.includes(id)]));
const DAWN = { ...NONE, dawn: 1 };
const LAST = { ...NONE, late: 1, dawn: 1, fog: 0.6, big_boat: true, luggage: true };
const PARTY = {
  peonies: { ...DAWN, ...HERE('grandma') },
  teeth: { ...DAWN, ...HERE('grandma', 'sophia') },
  ledge: { ...DAWN, ...HERE('grandma', 'sophia') },
  shoulder: { ...DAWN, ...HERE('grandma', 'sophia') },
  slip: { ...DAWN, ...HERE('grandma', 'sophia') },
  eriksson: { ...NONE, ...HERE('grandma', 'sophia'), skirt: true },
  eriksson_off: { ...NONE, ...HERE('grandma', 'sophia', 'eriksson'), skirt: true },
  nets: { ...NONE, dusk: 1, ...HERE('grandma', 'papa') },
  net: { ...NONE, dusk: 1, ...HERE('grandma', 'papa') },
  net_after: { ...NONE, dusk: 1, ...HERE('grandma', 'papa') },
  calm: { ...NONE, calm: 1, ...HERE('grandma', 'sophia') },
  calm_after: { ...NONE, calm: 1, graves: 0, ...HERE('grandma', 'sophia', 'papa') },
  moon_path: { ...NONE, night: 1, ...HERE('grandma', 'sophia') },
  rail: { ...NONE, night: 1, storm: 1, ...HERE('grandma', 'sophia') },
  rail_after: { ...NONE, night: 1, storm: 1, knew: true, ...HERE('grandma', 'sophia', 'papa') },
  circles: { ...NONE, weed: true, ask_back: true, ...HERE('grandma', 'sophia', 'papa') },
  post: { ...NONE, late: 1, ...HERE('grandma', 'sophia', 'papa') },
  post_after: { ...NONE, late: 1, ...HERE('grandma', 'sophia', 'papa', 'eriksson') },
  gate: { ...NONE, late: 1, knew: true, ...HERE('grandma', 'papa') },
  porch_dawn: { ...NONE, late: 1, dawn: 1, fog: 0.4, ...HERE('grandma') },
  jacket: { ...NONE, late: 1, dawn: 1, fog: 0.4, ...HERE('grandma', 'papa') },
  last_morning: { ...LAST, ...HERE('grandma', 'sophia', 'papa'), sign_smoke: 'shell', sign_hat: 'on', sign_bird: 'graves', graves: 5 },
  signs: { ...LAST, ...HERE('grandma', 'sophia', 'papa'), sign_smoke: 'shell', sign_hat: 'on', sign_bird: 'graves', graves: 5, shell: true },
  walk_arm: { ...LAST, ...HERE('grandma', 'sophia', 'papa') },
  elbow: { ...LAST, ...HERE('grandma', 'sophia', 'papa') },
  dinghy_board: { ...LAST, ...HERE('grandma', 'sophia', 'papa'), weak: true, knew: true },
  oars_after: { ...LAST, ...HERE('grandma', 'sophia', 'papa') },
  from_water: { ...LAST, ...HERE(), chair: 'set', graves: 5, hat: 'none' },
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
