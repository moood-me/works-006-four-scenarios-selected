// The pier's mechanics: the hour (hours.md: `light` sets the looks' numbers at once); the view (`view`: the sea — the
// scene's own camera; the shore — looking back along the beach: the camera's keys set at once, a cut); the people at
// their named places (places.md); the wave's sheet over the sand (`wave` → surge_d, surge_e); the bundle drawn up the
// sand (`drag` → bundle_a, bundle_d); the snow falling while there is snow (`snow` → snowfall)
const L = scene.lib;
scene.kit.hours.follow(scene, 'light', L.LIGHT);
scene.kit.places.follow(scene, L.PLACES);
const setAll = o => { for (const k in o) scene.set(k, o[k]); };
const view = () => { const v = L.VIEW[scene.get('view')]; if (v) setAll(v); };
scene.on('change', 'view', view);
if (scene.get('view') === 'shore') view();
const wave = () => setAll(L.surge(Number(scene.get('wave')) || 0));
scene.on('change', 'wave', wave);
scene.on('move', 'wave', wave);
wave();
const drag = () => setAll(L.dragged(Math.min(1, Math.max(0, Number(scene.get('drag')) || 0))));
scene.on('change', 'drag', drag);
scene.on('move', 'drag', drag);
drag();
const snow = () => scene.set('snowfall', scene.get('snow') ? 0.6 : 0);
scene.on('change', 'snow', snow);
snow();
