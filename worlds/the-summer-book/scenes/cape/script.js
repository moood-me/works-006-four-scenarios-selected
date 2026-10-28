// The cape's mechanics, all from the state (a scene opened again goes on as it was): the island's weather (the thick
// fog's look); the people at their places (`<id>_at`: lib.PLACES, put by the island's `places`); the cat at his
// (`cat_at`: lib.CAT — walking, he goes there at his pace and tells `cat:arrived`); the tent leaning as crooked as
// `lean` says; Grandmother's lantern alight in her hand (`lamp_lit`: while she carries it, dipping as `lantern_dip`
// says); the stones minigame's `step` walking her down the path, its `rest` sitting her down by a stone, its `balance`
// putting a hand out; the camera from the land, the sea or the side (`from`: lib.VIEWS, a cut); the pieces (lib.FILM, the module beats).
const L = scene.lib;
const isle = scene.kit.isle;
isle.weather(scene);
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

// Grandmother's lantern: alight while it is in her hand, dipping as the dark minigame's `lantern_dip` says
const lamp = () => {
  const held = (scene.get('grandma_with') ?? []).includes('lantern');
  scene.set('lamp_lit', held ? 1 - 0.85 * (scene.get('lantern_dip') ?? 0) : 0);
};
scene.on('change', 'grandma_with', lamp);
scene.on('change', 'lantern_dip', lamp);
scene.on('move', 'lantern_dip', lamp);
lamp();

// the fog and dark minigames (fog_way): `step` 1…3 walks Grandmother down the path to that stone at her pace, by the
// stones between; on arrival `step:stone<n>` is told
const STONES = [L.PLACES.grandma.stone1, L.PLACES.grandma.stone2, L.PLACES.grandma.stone3];
scene.on('change', 'step', async v => {
  if (scene.get('beat') !== 'fog_way') return;
  const n = Math.max(1, Math.min(3, Math.round(+v || 0)));
  const from = Math.max(1, Math.min(3, Number(String(scene.get('grandma_at')).replace('stone', '')) || 1));
  const way = STONES.slice(Math.min(from, n), n).map(p => p.at);
  const gm = scene.person('grandma');
  resting++; // (a rest still going is over)
  if (way.length) {
    gm.look(null);
    if ((await gm.walk(way)) !== 'done') return;
  }
  const p = STONES[n - 1];
  gm.turn(p.turn);
  gm.look(p.look);
  scene.set('grandma_placed', `stone${n}`);
  scene.set('grandma_at', `stone${n}`);
  scene.tell(`step:stone${n}`);
});

// the dark minigame's `rest` (during fog_way): true — she sits down where she stands, on the low stone by it (by the
// first stone its own, at the second the halfway stone seat:0, at the last the one by it); false — she gets up and is
// back on the stone, facing on down the path (a newer `rest` or `step` takes over whatever is still going)
const SEAT_BY = { stone1: 'first', stone2: 'half', stone3: 'rest' };
let resting = 0, sat = false;
scene.on('change', 'rest', async v => {
  if (scene.get('beat') !== 'fog_way') return;
  const stone = String(scene.get('grandma_at'));
  const k = SEAT_BY[stone];
  if (!k) return;
  const gm = scene.person('grandma');
  const my = ++resting;
  const still = () => my === resting && scene.get('beat') === 'fog_way';
  if (v) {
    const at = L.SEATS[k];
    gm.look(null);
    if ((await gm.walk([at])) !== 'done' || !still()) return;
    await gm.turn((Math.atan2(L.TENT.at[0] - at[0], L.TENT.at[1] - at[1]) * 180 / Math.PI + 360) % 360);
    if (!still()) return;
    await gm.do('sit_down');
    if (!still()) return;
    gm.on([at[0], at[1], L.SEAT_TOP]);
    gm.do('sit_stone', { loop: true });
    gm.look('tent');
    sat = true;
    return;
  }
  const p = L.PLACES.grandma[stone];
  if (sat) {
    sat = false;
    gm.on(null);
    scene.set('grandma_do', null);
    await gm.do('rise_slow');
    if (!still()) return;
  }
  if ((await gm.walk([p.at])) !== 'done' || !still()) return;
  gm.turn(p.turn);
  gm.look(p.look);
});

// the minigames' `balance` (during fog_way, standing): tipping on the wet stones she puts a hand out that way — the
// further she tips, the further out (−1 her left … 1 her right; a little either way: none)
const balance = () => {
  if (scene.get('beat') !== 'fog_way' || scene.get('rest')) return;
  const b = Math.max(-1, Math.min(1, +scene.get('balance') || 0));
  const gm = scene.person('grandma');
  if (Math.abs(b) < 0.15) {
    gm.reach(null);
    return;
  }
  const t = ((+scene.get('grandma_turn') || 0) * Math.PI) / 180, side = Math.sign(b), out = 0.45 + 0.35 * Math.abs(b);
  const a = +scene.get('grandma_a') || 0, d = +scene.get('grandma_d') || 0;
  const p = [a + Math.cos(t) * side * out + Math.sin(t) * 0.15, d - Math.sin(t) * side * out + Math.cos(t) * 0.15, 1.05 - 0.25 * Math.abs(b)];
  gm.reach(side > 0 ? { r: p } : { l: p });
};
scene.on('change', 'balance', balance);
scene.on('move', 'balance', balance);

// where the camera is, for a still (the pieces set their own shots): a cut to that view
const view = () => {
  const v = L.VIEWS[scene.get('from') ?? 'land'];
  if (v) scene.cut(v);
};
scene.on('change', 'from', view);
if ((scene.get('from') ?? 'land') !== 'land') view();

scene.kit.beats.play(scene, L.FILM);
