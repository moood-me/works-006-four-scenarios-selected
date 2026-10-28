// The shore's mechanics, all from the state (a scene opened again goes on as it was): the island's weather (the thick
// fog's look, the storm's lightning, the sea's mirror); the pieces (lib.film, played by `beat` through the world's
// `beats`); what the mini-games' keys show (below); the people at their places (`<id>_at`: lib.PLACES); Eriksson's boat along its
// way by `rowboat` (turned round at the pier as he leaves); the dinghy moored, going round in circles, or out along the
// shore by `dinghy_at`; the cat at his place (`cat_at`: lib.CAT — walking, he goes there at his pace and tells
// `cat:arrived`).
const L = scene.lib;
const isle = scene.kit.isle;
isle.weather(scene, L.MIRROR);
isle.places(scene, L.PLACES);
const deg = r => (r * 180) / Math.PI;
// a point along a quadratic curve through three points (u 0…1)
const curve = (P, u) => {
  const [a, b, c] = P;
  const v = 1 - u;
  return [v * v * a[0] + 2 * u * v * b[0] + u * u * c[0], v * v * a[1] + 2 * u * v * b[1] + u * u * c[1]];
};

// Eriksson's boat: where `rowboat` says along its way
function rowboat() {
  const [a, d] = curve(L.ROWBOAT, scene.get('rowboat') ?? 0);
  scene.set('rowboat_a', a);
  scene.set('rowboat_d', d);
}
scene.on('move', 'rowboat', rowboat);
scene.on('change', 'rowboat', (to, from) => {
  // rowing away he turns the boat round first (bow to the right); coming in, bow to the left
  if (to < from) scene.turn('rowboat_f', 0, 3);
  else scene.set('rowboat_f', 180);
  rowboat();
});
rowboat();

// the dinghy: its facing for a way (dx, dz) — the bow (its painting's right) along it
const facing = (dx, dz) => 180 + deg(Math.atan2(-dz, dx));
const C = L.DINGHY.circle;
const LAP = 26;
function lap() {
  if (scene.get('dinghy') !== 'circles') return;
  const pts = [];
  const f0 = scene.get('dinghy_f') ?? 180;
  // from where on the circle it is now (a lap begun again goes on round, it does not cut across)
  const p0 = Math.atan2((scene.get('dinghy_d') ?? C[1]) - C[1], (scene.get('dinghy_a') ?? C[0]) - C[0]);
  let prev = null;
  for (let i = 1; i <= 16; i++) {
    const p = p0 + (2 * Math.PI * i) / 16;
    let f = facing(-Math.sin(p), Math.cos(p));
    if (prev === null) f += 360 * Math.round((f0 - f) / 360);
    else f += 360 * Math.round((prev - f) / 360);
    prev = f;
    pts.push([C[0] + C[2] * Math.cos(p), C[1] + C[2] * Math.sin(p), f]);
  }
  scene.path(['dinghy_a', 'dinghy_d', 'dinghy_f'], pts, { over: LAP, ease: 'linear' });
}
// along the way out: where dinghy_at says, facing along it
function out() {
  const W = L.DINGHY.out;
  const u = Math.max(0, Math.min(1, scene.get('dinghy_at') ?? 0)) * (W.length - 1);
  const i = Math.min(W.length - 2, Math.floor(u));
  const k = u - i;
  const [a0, d0] = W[i];
  const [a1, d1] = W[i + 1];
  scene.set('dinghy_a', a0 + (a1 - a0) * k);
  scene.set('dinghy_d', d0 + (d1 - d0) * k);
  scene.set('dinghy_f', facing(a1 - a0, d1 - d0));
}
function dinghy() {
  const st = scene.get('dinghy') ?? 'moored';
  if (st === 'moored') {
    const [a, d, f] = L.DINGHY.moored;
    scene.set('dinghy_a', a);
    scene.set('dinghy_d', d);
    scene.set('dinghy_f', f);
  } else if (st === 'out') out();
  else lap();
}
scene.on('change', 'dinghy', dinghy);
scene.on('change', 'dinghy_at', () => scene.get('dinghy') === 'out' && out());
scene.on('move', 'dinghy_at', () => scene.get('dinghy') === 'out' && out());
scene.every(LAP, lap);
dinghy();

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
    const way = await scene.path(['cat_a', 'cat_d', 'cat_e'], [c.at], { speed: 0.45 });
    if (way !== 'done') return;
    scene.set('cat_dir', c.dir);
    scene.tell('cat:arrived');
    return;
  }
  scene.set('cat_a', c.at[0]);
  scene.set('cat_d', c.at[1]);
  scene.set('cat_e', c.at[2]);
  scene.set('cat_dir', c.dir);
}
scene.on('change', 'cat_at', cat);
cat();

// the pieces: the game sets `beat` (and `beat_next`)
scene.kit.beats.play(scene, L.film(scene));

// What the mini-games move, shown by the scene (each from its key, at once or as it moves):
// М1 `stems` — Grandmother's hand goes in among the peony's stems
// М2а `pull` — Sophia pulls her hand from Grandmother's (her hand drawn back from the wrist's hold)
// М2б `let` — the shoulder goes from under the hand: Sophia leans on toward the shelf
// М2в `step` — Grandmother steps down from the edge to knee-deep on the shelf, at her own pace
// М8а `gust` — the wind's gusts on the porch (the look `gust`: the wind up, the rain driven)
// М9а `parcel` — the parcel from Grandmother's hands into Sophia's (over a half: Sophia's)
const mix = (a, b, u) => a + (b - a) * u;
const acts = {
  stems: u => scene.set('grandma_reach', { r: [mix(-5.75, -5.5, u), mix(13.75, 13.95, u), mix(0.4, 0.22, u)] }),
  pull: u => scene.set('sophia_reach', { l: [mix(1.05, 0.6, u), mix(5.75, 5.9, u), mix(0.55, 0.75, u)] }),
  let: u => scene.set('grandma_reach', u < 0.6 ? { r: 'sophia#shoulder_r' } : null),
  step: u => scene.person('grandma').walk([[mix(L.SPOT.edge[0], L.PLACES.grandma.knee.at[0], u), mix(L.SPOT.edge[1], L.PLACES.grandma.knee.at[1], u)]]),
  parcel: u => {
    scene.set('grandma_with', u < 0.5 ? ['parcel'] : null);
    scene.set('sophia_with', u < 0.5 ? null : ['parcel']);
  },
};
for (const [key, fn] of Object.entries(acts)) {
  scene.on('change', key, () => fn(scene.get(key) ?? 0));
  scene.on('move', key, () => fn(scene.get(key) ?? 0));
}
