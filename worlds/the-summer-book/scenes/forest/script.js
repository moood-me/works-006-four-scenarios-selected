// The forest's mechanics, all from the state (a scene opened again goes on as it was): the island's weather (the
// thick fog's look); the people at their places (`<id>_at`: lib.PLACES — sitting ones on the stump or the moss, doing
// what the place says).
const L = scene.lib;
const isle = scene.kit.isle;
isle.weather(scene);

// what a place has them do and sit on (before the island's places: they mark the place as put)
const sit = id => {
  const at = scene.get(`${id}_at`);
  const p = L.PLACES[id][at];
  if (!p || scene.get(`${id}_placed`) === at) return;
  scene.set(`${id}_do`, p.do ?? 'stand');
  scene.set(`${id}_on`, p.on ?? null);
};
for (const id in L.PLACES) {
  scene.on('change', `${id}_at`, () => sit(id));
  sit(id);
}
isle.places(scene, L.PLACES);
