// The stone's mechanics: its people put at their named places (lib.PLACES) by `fisherman_at` and `mermaid_at` — at
// once, as a cut puts them —, each turned half toward the other, half toward the viewer, and looking at the other
// while the other is here. On opening, one whose place was not yet put (`<id>_placed`) is put there.
const L = scene.lib;
const put = id => {
  const keys = L.place(id, scene.get(`${id}_at`), scene.state);
  if (keys) for (const k in keys) scene.set(k, keys[k]);
};
// the other one, still at their named place, turned and looking anew
const face = id => {
  const at = scene.get(`${id}_at`);
  if (scene.get(`${id}_placed`) !== at || !L.PLACES[id][at]) return;
  const other = L.OTHER[id];
  scene.set(`${id}_turn`, L.turnOf(id, at, scene.state));
  scene.set(`${id}_look`, scene.get(`${other}_here`) === false ? null : other);
};
for (const id of ['fisherman', 'mermaid']) {
  scene.on('change', `${id}_at`, () => { put(id); face(L.OTHER[id]); });
  scene.on('change', `${id}_here`, () => face(L.OTHER[id]));
  if (scene.get(`${id}_placed`) !== scene.get(`${id}_at`)) put(id);
}
// The hour (hours.md): `light` sets the looks' numbers at once
scene.kit.hours.follow(scene, 'light', L.LIGHT);
// The boat heeling as he hauls: `heel` 0…1 as the boat's tilt, its bow dipping
const tilt = () => scene.set('boat_tilt', -6 * (Number(scene.get('heel')) || 0));
scene.on('change', 'heel', tilt);
scene.on('move', 'heel', tilt);
// The pieces (lib.film, played by `beat` through the world's `beats`)
scene.kit.beats.play(scene, L.film(scene));
