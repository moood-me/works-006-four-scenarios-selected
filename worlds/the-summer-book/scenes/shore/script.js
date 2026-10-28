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
function dinghy(was) {
  const st = scene.get('dinghy') ?? 'moored';
  if (st === 'moored') {
    const [a, d, f] = L.DINGHY.moored;
    // from its circles it rows in to the pier (a way, as the oars go); else it is there
    if (was === 'circles') scene.path(['dinghy_a', 'dinghy_d', 'dinghy_f'], [[a + 0.8, d - 1.2, f + 20], [a, d, f]], { speed: 0.5 });
    else {
      scene.set('dinghy_a', a);
      scene.set('dinghy_d', d);
      scene.set('dinghy_f', f);
    }
  } else if (st === 'out') out();
  else lap();
}
scene.on('change', 'dinghy', (to, was) => dinghy(was));
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
// М2а `pull` past 0.8, М2б `let` — Sophia leaning over the water; М4 `pebble_hand` — the hand with the pebble over the
// water; `sophia_grab` — Sophia grabs her hand (М8а, М2в); `lean` — her body after the mini-game's arrow (М2в, М8а)
const mix = (a, b, u) => a + (b - a) * u;
let stepTo = null;
const acts = {
  stems: u => scene.set('grandma_reach', { r: [mix(-5.75, -5.5, u), mix(13.75, 13.95, u), mix(0.4, 0.22, u)] }),
  // (past 0.8 the wrist is let go: Sophia leans out over the water)
  pull: u => {
    scene.set('sophia_reach', { l: [mix(1.05, 0.6, u), mix(5.75, 5.9, u), mix(0.55, 0.75, u)] });
    if (u > 0.8) {
      scene.set('grandma_reach', null);
      scene.set('sophia_do', 'lean_over');
    }
  },
  // (Sophia leans on toward the shelf as the hand opens; past 0.6 it is off her shoulder)
  let: u => {
    scene.set('grandma_reach', u < 0.6 ? { r: 'sophia#shoulder_r' } : null);
    scene.set('sophia_do', u > 0.2 ? 'lean_over' : null);
  },
  // М4: Grandmother's hand with the pebble out over the glass water
  pebble_hand: u => scene.set('grandma_reach', { r: [mix(-0.5, 0.9, u), mix(6.4, 7.0, u), mix(0.55, 0.45, u)] }),
  // М8а, М2в: Sophia grabs Grandmother's hand (past a half)
  sophia_grab: u => scene.set('sophia_reach', u > 0.5 ? { r: 'grandma#hand_r', l: 'grandma#hand_r' } : null),
  // М2в, М8а: Grandmother's body following the mini-game's arrow (−1 left … 1 right): turned that way off her place's
  // facing, her arms out to the other side for balance
  lean: u => {
    const p = L.PLACES.grandma[scene.get('grandma_at')];
    if (p) scene.set('grandma_turn', p.turn + 14 * u);
    const a = scene.get('grandma_a') ?? 0;
    const d = scene.get('grandma_d') ?? 0;
    scene.set('grandma_reach', Math.abs(u) > 0.15 ? { r: [a + 0.7 - 0.4 * u, d - 0.2, 1.1], l: [a - 0.7 - 0.4 * u, d - 0.2, 1.1] } : null);
  },
  // (one walk to the end she is going to, at her own pace — down past a half, back up below it: no fits)
  step: u => {
    const to = u > 0.5 ? L.PLACES.grandma.knee.at : L.SPOT.edge;
    if (stepTo !== to) {
      stepTo = to;
      scene.person('grandma').walk([to]);
    }
  },
  parcel: u => {
    scene.set('grandma_with', u < 0.5 ? ['parcel'] : null);
    scene.set('sophia_with', u < 0.5 ? null : ['parcel']);
  },
};
for (const [key, fn] of Object.entries(acts)) {
  scene.on('change', key, () => fn(scene.get(key) ?? 0));
  scene.on('move', key, () => fn(scene.get(key) ?? 0));
}
