// The beach outside games: Mama gathering weed, the son and the sea-horses that laugh and swim off; dusk, the Groke
// coming up out of the sea to sit facing the lighthouse; the night she howls at its little light; the son's lantern on
// the stone and her swaying over it; the last night, the son beside her and the blanket, the sand going dark; the
// night she goes into the sea; the morning sand.
const DAY = { dawn: 0, dusk: 0, night: 0 }, DUSK = { dawn: 0, dusk: 1, night: 0 }, NIGHT = { dawn: 0, dusk: 0, night: 1 };
const HERE = (...ids) => Object.fromEntries(['groke', 'troll', 'papa', 'mama'].map(id => [`${id}_here`, ids.includes(id)]));
// the play's keys each piece is shown in (the game's, in a game)
const PARTY = {
  weed: { ...DAY, ...HERE('mama'), seahorses: 'here', frost: 0, warm: 0, track: 0, lantern_stone: 'none', blanket: false },
  seahorses: { ...DAY, ...HERE('troll'), seahorses: 'here' },
  laugh: { ...DAY, ...HERE('troll') },
  dusk_sit: { ...DUSK, ...HERE('groke'), groke_at: 'edge', track: 1, moon: 0.4 },
  howl: { ...NIGHT, ...HERE('groke'), track: 0, frost: 0.5, lighthouse_lit: 0.3 },
  gift: { ...NIGHT, ...HERE('groke', 'troll'), groke_at: 'near', frost: 0.4, lighthouse_lit: 0 },
  wide: { ...NIGHT, ...HERE('groke'), groke_at: 'closest', moon: 1, lantern_stone: 'none' },
  beside: { ...NIGHT, ...HERE('groke', 'troll') },
  blanket: { ...NIGHT, ...HERE('groke', 'troll') },
  leave: { ...NIGHT, ...HERE('groke'), groke_at: 'edge', warm: 0, blanket: false, frost: 0.6 },
  morning: { ...DAY, dawn: 1, ...HERE(), groke_at: 'closest', warm: 1, frost: 0.3, track: 0, dune_dent: true },
};
// (each piece cut to its start after its play's keys are set — its start reads them — unless it follows the one
// before; not the beats module's showcase, which makes the next start ready before those keys are set)
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
