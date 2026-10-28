// The cape's mechanics, all from the state (a scene opened again goes on as it was): the island's weather (the thick
// fog's look); the people at their places (`<id>_at`: lib.PLACES — sitting ones on their seat, doing what the place
// says); the cat at his (`cat_at`: lib.CAT — walking, he goes there at his pace and tells `cat:arrived`); the tent
// leaning as crooked as `lean` says; the camera from the land, the sea or the side (`from`: lib.VIEWS, a cut).
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

// the cat: put at his place, or — walking — he goes there
async function cat() {
  const at = scene.get('cat_at');
  const c = L.CAT[at];
  if (!c) {
    scene.warn(`cat_at: no place "${at}" — the places: ${Object.keys(L.CAT).join(', ')}`);
    return;
  }
  if (scene.get('cat_placed') === at) return;
  scene.set('cat_placed', at);
  const a0 = scene.get('cat_a');
  if (scene.get('cat_pose') === 'walk' && typeof a0 === 'number') {
    scene.set('cat_dir', c.at[0] >= a0 ? 1 : -1);
    const way = await scene.path(['cat_a', 'cat_d'], [c.at], { speed: 0.45 });
    if (way !== 'done') return;
    scene.set('cat_dir', c.dir);
    scene.tell('cat:arrived');
    return;
  }
  scene.set('cat_a', c.at[0]);
  scene.set('cat_d', c.at[1]);
  scene.set('cat_dir', c.dir);
}
scene.on('change', 'cat_at', cat);
cat();

// the tent leaning back, as crooked as the pole went up (`lean` 0…1 → up to 9°)
const lean = () => scene.set('tent_tilt', 9 * (scene.get('lean') ?? 0));
scene.on('change', 'lean', lean);
scene.on('move', 'lean', lean);
lean();

// where the camera is: a cut to that view
const view = () => {
  const v = L.VIEWS[scene.get('from') ?? 'land'];
  if (v) scene.cut(v);
};
scene.on('change', 'from', view);
if ((scene.get('from') ?? 'land') !== 'land') view();
