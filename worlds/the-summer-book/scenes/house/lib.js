// «The House» — the house's frame, the land round it, where people stand and where the camera looks from. Everything of
// the house is laid on the unseen anchor `veranda` at the veranda's far corner (across CX, distance CZ, facing 225): in
// its frame x runs right along the back wall, z away behind it, y up from the floor (0.3 m over the land). The veranda
// is x 0…6.4, z −6.4…0 (its glazing at x 0, the house's wall with the doorway at z 0); behind that wall the room, x
// −2.7…2.3, z 0.1…3.8 (its window onto the cape in the far wall, the second door in the right wall to the entry). Round
// the house the rock falls to the sea; from the room's far side a long back of granite runs down to the cape, where
// Sophia's tent stands. tools/house.py writes scene.json from the same numbers — keep them the same.
const { clamp } = anim;
const CX = -0.6;
const CZ = 7;
const K = Math.SQRT1_2;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
// the house's frame from the world's metres, and back
const lx = (a, d) => K * (a - CX - (d - CZ));
const lz = (a, d) => K * (a - CX + (d - CZ));
const wa = (x, z) => CX + K * (x + z);
const wd = (x, z) => CZ + K * (z - x);
// a way in the frame (dx, dz) as a bearing in the world (degrees: 0 ahead, 90 to the right)
const bearing = (dx, dz) => (Math.atan2(dx + dz, dz - dx) * 180) / Math.PI;
// the sea's surface, metres
const WATER = -4.4;
// the land's fall by how far out from the house's walls (s metres)
const drop = s => 0.6 * sm(s / 1.2) + 4.5 * sm((s - 0.8) / 8);
// how far out from the house a point of the frame is: the veranda and the rest of the house (x 0…7, z −7…3.9) and
// the room jutting out on the left behind the veranda (x −2.8…0, z 0…3.9)
const out = (x, z) => Math.min(Math.max(-x, x - 7, -z - 7, z - 3.9), Math.max(-x - 2.8, x, -z, z - 3.9));
// the back of granite from the room's window down to the cape: from W (by the window) to T (the cape, where the tent
// stands), u 0…1 along it, v metres aside
const W = [wa(0.3, 3.8), wd(0.3, 3.8)];
const T = [22.4, 71.3];
const RA = T[0] - W[0];
const RD = T[1] - W[1];
const RL = Math.hypot(RA, RD);
function ridge(a, d) {
  const pa = a - W[0];
  const pd = d - W[1];
  const u = (pa * RA + pd * RD) / (RL * RL);
  const v = Math.abs(pa * RD - pd * RA) / RL;
  const w = 6 + 4 * Math.sin(Math.PI * clamp(u, 0, 1));
  let h = -0.5 - 2.5 * sm(u);
  h += 0.25 * Math.sin(0.31 * a + 0.2 * d) * Math.sin(0.17 * d - 0.23 * a);
  h -= 5.5 * sm((v - w) / 6);
  h -= 6 * sm((-u * RL) / 4);
  h -= 6 * sm(((u - 1) * RL) / 7);
  return h;
}
// whether a point is on the back's crest (its middle, along the way down to the cape)
function crest(a, d) {
  const pa = a - W[0];
  const pd = d - W[1];
  const u = (pa * RA + pd * RD) / (RL * RL);
  const v = Math.abs(pa * RD - pd * RA) / RL;
  return u > 0.02 && u < 1.02 && v < 0.7 * (6 + 4 * Math.sin(Math.PI * clamp(u, 0, 1)));
}
// the land's height: level under the house, falling away to the sea all round it, and the cape's back behind it
const ground = (a, d) => Math.max(-drop(out(lx(a, d), lz(a, d))), ridge(a, d));
// the waterline round the house and along the cape ([[across, distance], …]: the storm's foam) — from a ring well out
// at sea in toward the land's middle, where the water first meets the rock
const edge = [];
for (let i = 0; i < 160; i++) {
  const t = (i / 160) * 2 * Math.PI;
  const sa = Math.sin(t);
  const sd = Math.cos(t);
  const ca = 6 + 22 * sa;
  const cd = 32 + 50 * sd;
  const at = r => ground(ca - sa * r * 22, cd - sd * r * 50) > WATER;
  if (at(0) || !at(1)) continue;
  let lo = 0;
  let hi = 1;
  for (let k = 0; k < 20; k++) {
    const r = (lo + hi) / 2;
    if (at(r)) hi = r;
    else lo = r;
  }
  edge.push([ca - sa * hi * 22, cd - sd * hi * 50]);
}
// the tent on the cape (its candle's place) and the moon over the sea beyond it, as world points to look at
const TENT = [T[0], T[1], 1.0];
const MOON = [wa(0.3, 3.8) + 200 * Math.sin(0.384), wd(0.3, 3.8) + 200 * Math.cos(0.384), 30];
// where things stand by their keys, in the frame (x, z, y — over the floor): the lamp on the night table, in the window
// (burnt out there at dawn), under the blanket on Grandmother's bed, not in the room
const LAMP = { table: [-0.52, 3.6, 0.6], window: [0.05, 3.71, 0.84], burnt: [0.05, 3.71, 0.84], bed: [-2.2, 2.85, 0.52], none: [0.05, 3.71, 0.84] };
// how high the lamp is lifted at the glass (`lamp_up` 1)
const LIFT = 0.42;
// the hat on its nail by the door (facing the veranda), lying on Sophia's bed (face up), gone
const HAT = { nail: [2.45, -0.03, 1.38, 180, 0], bed: [-1.12, 2.45, 0.52, 180, 90], none: [2.45, -0.03, 1.38, 180, 0] };
// Papa's camp bed along the veranda's back wall, or in the room before the window onto the cape
// (x, z, facing; in the room its head under the window, along the room)
const COT = { veranda: [4.6, -0.45, 180], room: [0.3, 2.8, 90] };
// the doctor's drops (`drops_at`): on the sill, on the floor by the armchair (Papa set them by her), in a hand
const DROPS = { sill: [0.62, 3.72, 0.82], chair: [0.92, 3.5, 0], held: [0.62, 3.72, 0.82] };
// Papa's lantern going out to the cape and back: from the porch round the house (u 0) to the tent (u 1)
const FAR0 = [wa(2.6, 4.6), wd(2.6, 4.6)];
const far = u => [FAR0[0] + (T[0] - 1.5 - FAR0[0]) * u, FAR0[1] + (T[1] - 2.5 - FAR0[1]) * u];

// ── the pieces (modules/beats; notes.md "Pieces") ───────────────────────────────────────────────────────────────────
// Everything below is in the house's frame: [x, z] on the floor, y over it (the floor is FL over the land, which is
// level under the house). People are put by the piece's `from` (where they are, what they do, sit on, hold, reach for,
// look at); the camera is each piece's own, set whole (an eye and the point it looks at). The game sets only the hour
// and the weather, who is here, the moods and the play's keys (notes.md "The keys of the play"); `film(scene, true)` —
// the showcase's — gives each piece its step's hour, play and people too.
const FL = 0.3;
const DEG = Math.PI / 180;
// a point of the frame as the world's [across, distance, elevation over the land]
const W3 = (x, z, y = 0) => [wa(x, z), wd(x, z), y + FL];
// which way one at [x, z] faces to face [tx, tz] (a person's turn: the world's bearing)
const TURN = (x, z, tx, tz) => bearing(tx - x, tz - z);
// the camera: an eye [x, z, y] looking at [x, z, y] — all its keys (the eye 1.4 over the floor at camera_h 0); or at a
// point of the world ([across, distance, elevation])
const EYE0 = 1.4;
function CAM([ex, ez, ey], [tx, tz, ty]) {
  const r = Math.hypot(tx - ex, tz - ez);
  return { camera_target: null, camera_x: wa(ex, ez), camera_z: wd(ex, ez), camera_h: ey - EYE0, camera_yaw: bearing(tx - ex, tz - ez),
    camera_pitch: Math.atan2(ty - ey, r) / DEG, camera_look: 0, camera_roll: 0 };
}
function CAMW([ex, ez, ey], [ta, td, te]) {
  const a = wa(ex, ez), d = wd(ex, ez), r = Math.hypot(ta - a, td - d);
  return { camera_target: null, camera_x: a, camera_z: d, camera_h: ey - EYE0, camera_yaw: Math.atan2(ta - a, td - d) / DEG,
    camera_pitch: Math.atan2(te - FL - ey, r) / DEG, camera_look: 0, camera_roll: 0 };
}
// the shots: [eye, at]
const SHOT = {
  // the veranda: past the hat to Papa asleep; his table from beyond its far end along the glazing (his face, the
  // bench, the doorway and the hat beyond); supper from the doorway's end of the table; the cup from its far end;
  // close on Papa at his table; Grandmother coming to it through the glass door; Papa on his cot; the glass door from
  // the veranda's middle; the cot and the doorway wide
  hat0: [[1.0, -2.6, 1.4], [2.45, -0.03, 1.25]],
  hat1: [[2.3, -3.0, 1.3], [3.3, -0.3, 0.95]],
  table: [[0.7, -4.0, 1.45], [1.5, -1.3, 0.95]],
  supper: [[0.55, -0.4, 1.3], [1.1, -1.95, 0.85]],
  cup: [[0.35, -3.7, 1.35], [0.8, -2.0, 0.85]],
  papa: [[0.3, -3.9, 1.2], [1.2, -2.45, 1.0]],
  cough: [[2.9, -3.4, 1.5], [1.4, -1.8, 1.0]],
  sniff: [[2.0, 0.6, 1.6], [0.2, 2.9, 0.9]],
  cot: [[3.25, -2.05, 1.2], [4.05, -0.5, 0.6]],
  door: [[3.8, -3.6, 1.5], [1.9, -0.2, 1.0]],
  ver: [[3.0, -3.9, 1.5], [2.6, -0.6, 0.9]],
  // the room: from its doorway; both beds from their foot on the right, from the foot on the left (the backs of the two
  // on their beds' edges); Sophia's pillow from the foot; the window from behind the one standing there; the faces at
  // the window from beside the night table; the lamp at the glass and her face by it (from the window's right); the
  // second door from the beds' side; the window and the armchair from the second door's corner; the palm by the candle
  // from the left corner; the two on Sophia's bed from the right; Sophia sitting up; the blanket from beside Sophia's
  // bed; the hat on Sophia's bed; the doorway from the window's side; Sophia at the sill from the second door's corner
  room: [[2.0, 0.45, 1.55], [-0.9, 3.0, 0.7]],
  beds: [[-0.3, 1.35, 1.35], [-1.65, 3.05, 0.65]],
  bedsL: [[-2.3, 0.7, 1.55], [-1.75, 2.75, 0.6]],
  pillow: [[-1.5, 1.05, 1.4], [-1.1, 3.1, 0.65]],
  window: [[1.25, 1.75, 1.2], [0.05, 3.5, 1.25]],
  face_s: [[-1.2, 3.2, 1.05], [0.1, 3.38, 0.75]],
  face_g: [[-1.2, 3.15, 1.45], [-0.05, 3.3, 1.3]],
  lamp: [[1.15, 2.85, 1.35], [-0.15, 3.4, 1.1]],
  door2: [[-0.6, 1.2, 1.5], [2.3, 1.75, 1.0]],
  corner: [[2.0, 0.6, 1.6], [0.0, 3.0, 0.8]],
  m7b: [[-2.45, 1.0, 1.4], [-1.85, 3.0, 0.75]],
  m8c: [[0.1, 2.1, 1.2], [-1.0, 3.0, 0.95]],
  up: [[-0.35, 2.2, 1.15], [-1.175, 3.2, 0.85]],
  under: [[-0.6, 1.9, 1.15], [-1.95, 2.75, 0.8]],
  hat_bed: [[-0.45, 1.55, 1.25], [-1.12, 2.45, 0.6]],
  doorway: [[-0.45, 2.4, 1.45], [1.725, 0.1, 1.3]],
};
const CAMS = Object.fromEntries(Object.entries(SHOT).map(([k, [e, t]]) => [k, CAM(e, t)]));
// the beds (seats and lying places: [x, z, the top]) and what one there faces; the room's and the veranda's spots
const BED = 0.5;
const PL = {
  // Grandmother's bed (the left one): lying, sitting up in it, on its edge facing Sophia's bed
  g_lie: [[-2.05, 2.85, BED], [-2.05, 1.0]],
  g_up: [[-2.05, 3.15, BED], [-2.05, 1.0]],
  g_edge: [[-1.9, 2.55, BED], [0, 2.55]],
  g_near: [[-1.9, 2.1, BED], [0, 2.1]],
  g_head: [[-1.88, 3.2, BED], [0, 3.2]],
  // under the blanket: Grandmother half up holding its edge, Sophia beside her
  g_under: [[-2.0, 3.05, BED], [-2.0, 1.0]],
  s_under: [[-2.4, 2.95, BED], [-2.4, 1.0]],
  // Sophia's bed (the right one): lying, sitting up, on its right edge (her back to Grandmother), kneeling at its left
  // edge toward Grandmother, lying on her side face away from her
  s_lie: [[-1.175, 3.0, BED], [-1.175, 1.0]],
  s_up: [[-1.175, 3.2, BED], [-1.175, 1.0]],
  s_edge: [[-0.95, 2.7, BED], [1, 2.7]],
  s_kneel: [[-1.45, 2.95, BED], [-3, 2.95]],
  s_wall: [[-1.175, 3.0, BED], [1, 3.0]],
  // the armchair by the window
  chair: [[1.35, 3.08, 0.45], [1.0, 1.8]],
  // the veranda: Papa's chair at his table's end, the bench along the table, Papa's cot (lying: his feet to the
  // veranda's end; up: sitting on it), the floor at the glass door's threshold, his back to the jamb
  p_chair: [[1.2, -2.45, 0.46], [0, -2.45]],
  b_g: [[1.05, -1.75, 0.44], [0, -1.75]],
  b_s: [[1.05, -1.2, 0.44], [0, -1.2]],
  cot_lie: [[4.5, -0.5, 0.42], [6, -0.5]],
  cot_up: [[4.1, -0.5, 0.42], [6, -0.5]],
  thresh: [[1.5, -0.3, 0], [2.4, 0.6]],
};
const SPOT = {
  // the room
  g_foot: [-2.05, 1.45], s_foot: [-1.15, 1.7], foot_r: [-0.55, 1.6], s_side: [-0.5, 2.65], s_pet: [-0.6, 3.0],
  s_win: [0.1, 3.38], g_win: [-0.05, 3.3], lamp_side: [-0.15, 3.3], by_chair: [0.8, 2.8], box: [-0.45, 2.3],
  door2: [1.85, 1.65], door2_s: [1.6, 1.95], thr2: [2.35, 1.95], entry: [2.95, 1.95], hook: [3.45, 1.15], outer: [3.75, 1.95],
  in_door: [1.725, 0.55], room_in: [1.2, 1.3], sill: [0.55, 3.35],
  // the veranda
  ver_door: [1.725, -0.6], under_hat: [2.35, -0.5], hat_round: [2.9, -0.7], ver_mid: [3.2, -2.2], cot_side: [4.0, -1.1],
  cot_head: [3.85, -1.0], table_p: [1.3, -1.75], table_g: [0.5, -2.85], s_ver: [4.6, -2.3], out1: [5.0, -3.6], out2: [6.0, -5.9],
  // outside: the porch beyond the entry's outer door
  porch: [4.4, 1.95], round: [4.4, 3.2],
};
// the cat's places ([x, z, y]): on Sophia's bed by her pillow, on the window's sill by the half-open leaf, on the
// floor, at the second door, in the entry, and out under the window on the rock
const groundAt = (x, z) => ground(wa(x, z), wd(x, z)) - FL;
const CAT = { pillow: [-0.95, 3.15, BED + 0.04], sill: [0.42, 3.71, 0.84], floor: [-0.45, 2.55, 0], door2: [2.0, 1.9, 0], entry: [3.1, 1.8, 0],
  out: [0.5, 4.6, groundAt(0.5, 4.6)] };
const IDS = ['grandma', 'sophia', 'papa'];
const GAIT = { grandma: 'old_walk', sophia: null, papa: null };
// the step's hour and weather (the showcase's: the game sets them), and the play's keys as the empty play has them
const HOUR = { dawn: 0, dusk: 0, night: 0, late: 0, calm: 0, storm: 0, flash: 0, fog: 0, moon: 1 };
const PLAY = { hat: 'nail', teabox: false, drops: 'none', cot: 'veranda', papa_watch: false, secret: false, cat: false, take_lantern: true,
  sophia_hand: false, kick: false, hold_hand: false, knew: false, sophia_knows: false, wall: false };
// the house's own keys at rest: what a piece moves begins from here (the things, the lights, the doors, the cat)
const REST = { bird: false, lamp: 'table', lamp_lit: 0, lamp_up: 0, supper: false, packed: false, candle: 0, casement: 0, creak: 0,
  tent_light: 0, far_light: 0, far_light_at: 0, under: 0, cover: 1, cup: false, tilt: 0, drops_at: 'sill', storm_lantern: true,
  grandma_lantern: 0, papa_lantern: 0, cot_carried: false, cat_pose: 'none', cat_dir: 1 };

function film(scene, show = false) {
  // someone standing at [x, z], facing [tx, tz]: nothing in the hands, looking ahead, doing nothing
  const STAND = (id, [x, z], [tx, tz], more = {}) => ({
    [`${id}_a`]: wa(x, z), [`${id}_d`]: wd(x, z), [`${id}_turn`]: TURN(x, z, tx, tz), [`${id}_do`]: 'stand', [`${id}_on`]: null,
    [`${id}_with`]: null, [`${id}_reach`]: null, [`${id}_look`]: null, [`${id}_gait`]: GAIT[id], [`${id}_still`]: false, ...more });
  // sitting or lying at a place of PL, doing its loop
  const AT = (id, place, motion, more = {}) => {
    const [[x, z, top], face] = PL[place];
    return STAND(id, [x, z], face, { [`${id}_on`]: W3(x, z, top), [`${id}_do`]: { motion, loop: true }, ...more });
  };
  const CATAT = (place, pose = 'sit', dir = 1) => {
    const [x, z, y] = CAT[place];
    return { cat_x: x, cat_z: z, cat_y: y, cat_pose: pose, cat_dir: dir };
  };
  // a piece's opening values: the house's own keys at rest, its people, things, camera (and, showing, its step's)
  const OPEN = (...parts) => Object.assign({}, REST, ...parts);
  const P = (s, id) => s.person(id);
  const pt = ([x, z]) => [wa(x, z), wd(x, z)];
  const walk = (p, ...spots) => p.walk(spots.map(pt));
  const face = (p, [x, z], [tx, tz]) => p.turn(TURN(x, z, tx, tz));
  async function to(p, spot, toward) {
    await walk(p, spot);
    if (toward) await face(p, spot, toward);
  }
  // sitting down onto a place (from standing before it) and up off it: the motions done once, the seat held between
  async function sit(s, id, place, loop = 'seated', down = 'sit_down') {
    const [[x, z, top], [tx, tz]] = PL[place], p = P(s, id);
    await p.go(down, { to: pt([x, z]), turn: TURN(x, z, tx, tz) });
    p.on(W3(x, z, top));
    p.do(loop, { loop: true });
  }
  async function rise(s, id, place, up = 'rise') {
    const [[x, z]] = PL[place], p = P(s, id);
    p.on(null);
    await p.go(up, { from: pt([x, z]) });
  }
  // in a bed: from one way of lying or sitting to another, the body's way there a motion done once
  async function inBed(s, id, place, loop, how) {
    const [[x, z, top], [tx, tz]] = PL[place], p = P(s, id);
    s.set(`${id}_turn`, TURN(x, z, tx, tz));
    p.on(W3(x, z, top));
    if (how) await p.do(how);
    p.do(loop, { loop: true });
  }
  // a moment the game speaks on: told, then held for its line
  const moment = async (s, name, hold = 2.5) => {
    s.tell(name);
    if (hold) await s.wait(hold);
  };
  // the camera moved to a shot over seconds (its turn the short way round)
  function cam(s, name, over = 2) {
    const v = CAMS[name];
    return s.all(s.turn('camera_yaw', v.camera_yaw, over), ...['camera_x', 'camera_z', 'camera_h', 'camera_pitch'].map(k => s.move(k, v[k], { over })));
  }
  // a cut made ready (its values: a shot and what it places) and cut to when asked
  const ready = (s, name, more = {}) => s.shot({ ...CAMS[name], ...more });
  // the cat walking at his pace to a place, then as he is told
  async function catTo(s, ...places) {
    for (const place of places) {
      const [x, z, y] = CAT[place];
      s.set('cat_dir', x >= (s.get('cat_x') ?? x) ? 1 : -1);
      s.set('cat_pose', 'walk');
      await s.path(['cat_x', 'cat_z', 'cat_y'], [[x, z, y]], { speed: 0.45 });
    }
    s.set('cat_pose', 'sit');
  }
  const flash = s => {
    s.set('flash', 1);
    s.move('flash', 0, { over: 0.6, ease: 'out' });
    s.tell('flash:strike');
  };
  // Papa's chair, Grandmother and Sophia on the bench, Papa writing
  const TABLE3 = () => [AT('papa', 'p_chair', 'seated'), AT('grandma', 'b_g', 'seated'), AT('sophia', 'b_s', 'seated')];
  const ASLEEP = () => [AT('grandma', 'g_lie', 'lie_bed'), AT('sophia', 's_lie', 'lie_bed')];
  const COT_SLEEP = (more = {}) => AT('papa', 'cot_lie', 'lie_bed', more);
  // Grandmother's lamp moved along with her hands on it, to a place of LAMP
  async function lampTo(s, place, over = 1.4) {
    const [x, z, y] = LAMP[place];
    await s.path(['lamp_x', 'lamp_z', 'lamp_e'], [[x, z, y]], { over });
    s.set('lamp', place);
  }

  const B = {
    // ── Prologue ──
    // П.3: June, dawn, everyone asleep; past the hat on its nail, Papa asleep on his cot beyond it
    hat_dawn: {
      show: { hour: { dawn: 1 }, here: ['papa'] },
      from: () => OPEN(COT_SLEEP(), CAMS.hat0),
      run: async s => {
        await moment(s, 'hat_dawn:hat', 1.5);
        await cam(s, 'hat1', 5);
        await moment(s, 'hat_dawn:papa', 1.5);
      },
    },
    // ── I. 1.1 ──
    // a June morning: Papa at his table, Sophia along the veranda under the hat without raising her eyes, Grandmother
    // takes her knife and her pouch off the table
    morning: {
      show: { hour: {}, here: IDS },
      from: () => OPEN(AT('papa', 'p_chair', 'write'), STAND('grandma', SPOT.table_g, [0.45, -1.5]), STAND('sophia', SPOT.s_ver, SPOT.under_hat),
        CAMS.ver),
      run: async s => {
        const sophia = P(s, 'sophia'), grandma = P(s, 'grandma');
        sophia.look(W3(1.9, -0.3, 0));
        await walk(sophia, SPOT.under_hat);
        await moment(s, 'morning:hat', 0.6);
        const table = ready(s, 'supper');
        await walk(sophia, SPOT.ver_door, SPOT.in_door, SPOT.room_in);
        sophia.look(null);
        table.cut();
        grandma.reach({ r: W3(0.45, -2.3, 0.76) });
        await s.wait(1);
        grandma.reach(null);
        grandma.with(['knife', 'pouch']);
        grandma.look('papa');
        await moment(s, 'morning:knife', 3);
      },
    },
    // she goes to the glass door and through; with `papa_look` Papa raises his head and watches her go
    morning_go: {
      after: ['morning'],
      show: { hour: {}, here: ['grandma', 'papa'] },
      from: () => OPEN(AT('papa', 'p_chair', 'write'), STAND('grandma', SPOT.table_g, [0.45, -1.5], { grandma_with: ['knife', 'pouch'] }), CAMS.supper),
      run: async s => {
        const grandma = P(s, 'grandma'), papa = P(s, 'papa');
        if (s.get('papa_watch')) {
          papa.do('seated', { loop: true });
          papa.look('grandma');
        }
        await walk(grandma, [1.6, -3.0], [1.6, -1.2], SPOT.ver_door);
        await moment(s, 'morning_go:door', 0.4);
        await walk(grandma, SPOT.in_door, SPOT.room_in);
        await s.wait(1.5);
        papa.look(null);
        papa.do('write', { loop: true });
        await s.wait(1);
      },
    },
    // 1.3: supper on the veranda, the three at the table; with `secret` Sophia turns and looks at Grandmother, else at
    // her plate, and Papa chews and says nothing
    supper_table: {
      show: { hour: { dusk: 0.5 }, here: IDS },
      from: () => OPEN(...TABLE3(), { supper: true }, CAMS.supper),
      run: async s => {
        P(s, 'papa').look(W3(0.6, -2.1, 0.75));
        await moment(s, 'supper_table:sat', 4.5);
        if (s.get('secret')) P(s, 'sophia').look('grandma');
        else {
          P(s, 'sophia').look(W3(0.6, -1.15, 0.75));
          P(s, 'papa').do('chew', { loop: true });
        }
        await moment(s, 'supper_table:look', 3);
      },
    },
    // ── II. 2.2 the bird ──
    // a July morning: the dead bird on Sophia's pillow, the cat beside it waiting; she sits up, sees, scrambles out;
    // Grandmother sits up — the choice's pose: the pillow, the bird, the cat, Sophia by her bed
    bird_pillow: {
      show: { hour: { calm: 1 }, here: ['grandma', 'sophia'] },
      from: () => OPEN(...ASLEEP(), { bird: true }, CATAT('pillow', 'sit', -1), CAMS.pillow),
      run: async s => {
        const sophia = P(s, 'sophia'), grandma = P(s, 'grandma');
        await moment(s, 'bird_pillow:seen', 2.5);
        await inBed(s, 'sophia', 's_up', 'sit_bed', 'sit_up');
        sophia.look('pillow#pillow');
        await rise(s, 'sophia', 's_up', 'get_up_bed');
        await to(sophia, SPOT.s_side, [-1.175, 3.5]);
        sophia.look('cat#cat');
        sophia.mood('angry');
        inBed(s, 'grandma', 'g_up', 'sit_bed', 'sit_up');
        grandma.look('sophia');
        await moment(s, 'bird_pillow:shout', 2);
      },
    },
    // «gift»: she looks at the cat a long time; strokes him for the first time; lays the bird in the old tea box
    gift: {
      after: ['bird_pillow'],
      show: { hour: { calm: 1 }, here: ['grandma', 'sophia'] },
      from: () => OPEN(AT('grandma', 'g_up', 'sit_bed', { grandma_look: 'sophia' }), STAND('sophia', SPOT.s_side, [-1.175, 3.5], { sophia_look: 'cat#cat' }),
        { bird: true }, CATAT('pillow', 'sit', -1), CAMS.pillow),
      run: async s => {
        const sophia = P(s, 'sophia');
        sophia.mood('neutral');
        await moment(s, 'gift:look', 3);
        await to(sophia, SPOT.s_pet, [-0.95, 3.15]);
        sophia.reach({ r: 'cat#back' });
        sophia.do('pet', { loop: true });
        await moment(s, 'gift:stroke', 3);
        sophia.reach({ r: 'pillow#pillow' });
        sophia.do('stand');
        await s.wait(0.8);
        s.set('bird', false);
        sophia.reach(null);
        sophia.with(['bird']);
        s.set('teabox', true);
        await to(sophia, SPOT.box, [-0.62, 2.35]);
        await sophia.do('crouch');
        sophia.with(null);
        await moment(s, 'gift:box', 2);
      },
    },
    // the next morning: a new bird, the cat waiting; she wrinkles her nose and puts it into the same box with two fingers
    gift_again: {
      show: { hour: { calm: 1 }, play: { teabox: true }, here: ['grandma', 'sophia'] },
      from: () => OPEN(AT('grandma', 'g_up', 'sit_bed'), STAND('sophia', SPOT.s_side, [-1.175, 3.5], { sophia_look: 'pillow#pillow' }), { bird: true },
        CATAT('pillow', 'sit', -1), CAMS.pillow),
      run: async s => {
        const sophia = P(s, 'sophia');
        await moment(s, 'gift_again:bird', 2);
        sophia.mood('disgusted');
        await to(sophia, SPOT.s_pet, [-1.175, 3.5]);
        sophia.reach({ r: 'pillow#pillow' });
        await s.wait(1);
        s.set('bird', false);
        sophia.reach(null);
        sophia.with(['bird']);
        await to(sophia, SPOT.box, [-0.62, 2.35]);
        await sophia.do('crouch');
        sophia.with(null);
        await moment(s, 'gift_again:box', 2);
      },
    },
    // «out»: Grandmother wraps the bird in a pillowcase and carries it out by the second door; the cat walks out first
    bird_out: {
      after: ['bird_pillow'],
      show: { hour: { calm: 1 }, here: ['grandma', 'sophia'] },
      from: () => OPEN(AT('grandma', 'g_up', 'sit_bed', { grandma_look: 'sophia' }), STAND('sophia', SPOT.s_side, [-1.175, 3.5], { sophia_look: 'cat#cat' }),
        { bird: true }, CATAT('pillow', 'sit', -1), CAMS.pillow),
      run: async s => {
        const grandma = P(s, 'grandma'), sophia = P(s, 'sophia');
        await inBed(s, 'grandma', 'g_head', 'seated', 'shift');
        grandma.look('pillow#pillow');
        grandma.reach({ r: 'pillow#pillow', l: 'pillow#pillow' });
        await s.wait(1.2);
        s.set('bird', false);
        grandma.reach(null);
        grandma.with(['pillowcase']);
        await moment(s, 'bird_out:wrapped', 1.5);
        sophia.look('grandma');
        const door = ready(s, 'door2');
        s.sequence(async c => {
          await catTo(c, 'floor', 'door2', 'entry');
          c.set('cat_pose', 'none');
        });
        await rise(s, 'grandma', 'g_head', 'get_up_bed');
        door.cut();
        await walk(grandma, SPOT.g_foot, SPOT.foot_r, SPOT.door2);
        await s.move('creak', 0.85, { over: 1.2 });
        await walk(grandma, SPOT.thr2, SPOT.entry, SPOT.outer);
        grandma.here(false);
        await s.move('creak', 0.35, { over: 1.5 });
        await moment(s, 'bird_out:gone', 1.5);
      },
    },
    // ── II. 2.3 Ш1 the moon ──
    // the full moon's night: Sophia at the window, Grandmother sits up, Papa still on his cot, his eyes open; her face
    // close — the choice's pose
    moon_window: {
      show: { hour: { night: 1, calm: 1 }, here: IDS },
      from: () => OPEN(STAND('sophia', SPOT.s_win, [-0.9, 4.3], { sophia_look: MOON }), AT('grandma', 'g_lie', 'lie_bed'), COT_SLEEP(), CAMS.window),
      run: async s => {
        await moment(s, 'moon_window:water', 3);
        await inBed(s, 'grandma', 'g_up', 'sit_bed', 'sit_up');
        P(s, 'grandma').look('sophia');
        await moment(s, 'moon_window:sit', 3);
        const papa = ready(s, 'cot', { papa_look: W3(4.2, -1.5, 2.6) });
        const face = ready(s, 'face_s');
        await s.until(() => papa.ready);
        papa.cut();
        await moment(s, 'moon_window:cot', 3);
        await s.until(() => face.ready);
        face.cut();
        await moment(s, 'moon_window:face', 1.5);
      },
    },
    // «gone»: she cries, goes to her bed and sits on its edge, her back to Grandmother; Papa gets up and goes out along
    // the veranda; Grandmother to her own bed's edge, her palm on the blanket between the beds — М5а's pose
    gone: {
      after: ['moon_window'],
      show: { hour: { night: 1, calm: 1 }, here: IDS },
      from: () => OPEN(STAND('sophia', SPOT.s_win, [-0.9, 4.3], { sophia_look: MOON }), AT('grandma', 'g_up', 'sit_bed', { grandma_look: 'sophia' }),
        COT_SLEEP(), CAMS.face_s),
      run: async s => {
        const sophia = P(s, 'sophia'), grandma = P(s, 'grandma'), papa = P(s, 'papa');
        sophia.mood('sad');
        await moment(s, 'gone:lie', 3);
        const beds = ready(s, 'beds'), ver = ready(s, 'cot');
        sophia.look(null);
        await s.until(() => beds.ready);
        beds.cut();
        await walk(sophia, [-0.2, 2.9], SPOT.s_side);
        await sit(s, 'sophia', 's_edge', 'cry');
        await moment(s, 'gone:cry', 2);
        const back = ready(s, 'bedsL');
        await s.until(() => ver.ready);
        ver.cut();
        await rise(s, 'papa', 'cot_lie', 'get_up_cot');
        await walk(papa, SPOT.ver_mid, SPOT.out1, SPOT.out2);
        papa.here(false);
        await moment(s, 'gone:papa', 1);
        await s.until(() => back.ready);
        back.cut();
        await inBed(s, 'grandma', 'g_edge', 'seated', 'shift');
        grandma.look('sophia');
        grandma.reach({ r: 'beds#gap' });
        await moment(s, 'gone:near', 2);
      },
    },
    // after М5а: Sophia comes over to her by herself, sits close against her, goes quiet
    gone_near: {
      after: ['gone'],
      show: { hour: { night: 1, calm: 1 }, here: ['grandma', 'sophia'] },
      from: () => OPEN(AT('sophia', 's_edge', 'cry'), AT('grandma', 'g_edge', 'seated', { grandma_reach: { r: 'beds#gap' }, grandma_look: 'sophia' }),
        CAMS.bedsL),
      run: async s => {
        const sophia = P(s, 'sophia'), grandma = P(s, 'grandma');
        await rise(s, 'sophia', 's_edge');
        await walk(sophia, SPOT.foot_r, SPOT.s_foot, [-1.9, 1.55]);
        grandma.reach(null);
        await sit(s, 'sophia', 'g_near', 'lean');
        sophia.mood('neutral');
        sophia.look(null);
        grandma.reach({ r: 'sophia#back' });
        await moment(s, 'gone_near:quiet', 3);
      },
    },
    // «gone», the morning: the hat on Sophia's bed; Papa in the doorway sees it, stands, does not touch it, goes to sit
    // at his table with his back to the room
    hat_bed: {
      show: { hour: {}, play: { hat: 'bed' }, here: IDS },
      from: () => OPEN(STAND('papa', SPOT.ver_door, SPOT.in_door), STAND('grandma', SPOT.g_foot, [-2.05, 3.0]), STAND('sophia', SPOT.s_win, [0.1, 4.5]),
        CAMS.hat_bed),
      run: async s => {
        const papa = P(s, 'papa');
        await moment(s, 'hat_bed:hat', 2);
        const doorway = ready(s, 'doorway'), table = ready(s, 'papa');
        await walk(papa, [1.725, 0.15]);
        await s.until(() => doorway.ready);
        doorway.cut();
        papa.look('hat#hat');
        await moment(s, 'hat_bed:papa', 3.5);
        papa.look(null);
        await walk(papa, SPOT.ver_door, SPOT.table_p);
        table.cut();
        await walk(papa, [1.45, -2.45]);
        await sit(s, 'papa', 'p_chair', 'seated');
        await moment(s, 'hat_bed:back', 3);
      },
    },
    // «sky»: their lines at the window; she waves to the moon; Papa on his cot breathes out; she lies down, Grandmother
    // on her bed's edge takes her hand between the beds — М5б's pose
    sky: {
      after: ['moon_window'],
      show: { hour: { night: 1, calm: 1 }, here: IDS },
      from: () => OPEN(STAND('sophia', SPOT.s_win, [-0.9, 4.3], { sophia_look: MOON }), AT('grandma', 'g_up', 'sit_bed', { grandma_look: 'sophia' }),
        COT_SLEEP({ papa_look: W3(4.2, -1.5, 2.6) }), CAMS.face_s),
      run: async s => {
        const sophia = P(s, 'sophia'), grandma = P(s, 'grandma');
        await moment(s, 'sky:moon', 3.5);
        await moment(s, 'sky:soon', 4);
        sophia.reach({ r: MOON });
        await sophia.do('wave');
        sophia.reach(null);
        await moment(s, 'sky:wave', 1);
        const ver = ready(s, 'cot'), beds = ready(s, 'beds');
        await s.until(() => ver.ready);
        ver.cut();
        await P(s, 'papa').do('sigh');
        await moment(s, 'sky:breath', 1.5);
        beds.cut();
        await walk(sophia, [-0.2, 2.9], SPOT.s_side);
        await sit(s, 'sophia', 's_edge', 'seated');
        await inBed(s, 'sophia', 's_lie', 'lie_bed', 'lie_down');
        await inBed(s, 'grandma', 'g_edge', 'seated', 'shift');
        grandma.reach({ r: 'sophia#hand_l' });
        sophia.reach({ l: 'grandma#hand_r' });
        await s.wait(1.5);
      },
    },
    // «sky», the morning: Sophia makes her bed, whispers to Grandmother; on the veranda, singing, she walks round the hat
    sky_morning: {
      show: { hour: {}, here: ['grandma', 'sophia'] },
      from: () => OPEN(STAND('sophia', SPOT.s_side, [-1.175, 3.0]), AT('grandma', 'g_edge', 'seated'), CAMS.beds),
      run: async s => {
        const sophia = P(s, 'sophia');
        sophia.reach({ r: W3(-1.0, 3.0, 0.55), l: W3(-1.0, 2.6, 0.55) });
        await sophia.do('make_bed');
        sophia.reach(null);
        await walk(sophia, SPOT.foot_r, [-1.4, 1.7]);
        await face(sophia, [-1.4, 1.7], [-1.9, 2.55]);
        sophia.look('grandma');
        sophia.mood('smile');
        await moment(s, 'sky_morning:whisper', 2.5);
        sophia.look(null);
        const hat = ready(s, 'ver');
        await walk(sophia, SPOT.room_in, SPOT.in_door);
        hat.cut();
        await walk(sophia, SPOT.ver_door, [2.0, -0.9], [2.45, -1.05], SPOT.hat_round, [2.45, -0.45], [2.0, -0.7]);
        sophia.look('hat#hat');
        await moment(s, 'sky_morning:hat', 2);
      },
    },
    // «moon»: Grandmother gets up, takes Sophia by the hand, leads her to the second door — М5в's pose, her hand on its
    // handle, Sophia's in her other
    to_door: {
      after: ['moon_window'],
      show: { hour: { night: 1, calm: 1 }, here: IDS },
      from: () => OPEN(STAND('sophia', SPOT.s_win, [-0.9, 4.3], { sophia_look: MOON }), AT('grandma', 'g_up', 'sit_bed', { grandma_look: 'sophia' }),
        COT_SLEEP(), CAMS.face_s),
      run: async s => {
        const grandma = P(s, 'grandma'), sophia = P(s, 'sophia');
        const room = ready(s, 'room'), door = ready(s, 'door2');
        await s.until(() => room.ready);
        room.cut();
        await rise(s, 'grandma', 'g_up', 'get_up_bed');
        await walk(grandma, SPOT.g_foot, SPOT.foot_r, [-0.3, 2.9]);
        await face(grandma, [-0.3, 2.9], SPOT.s_win);
        await face(sophia, SPOT.s_win, [-0.3, 2.9]);
        sophia.look('grandma');
        grandma.reach({ r: 'sophia#hand_l' });
        sophia.reach({ l: 'grandma#hand_r' });
        await moment(s, 'to_door:hand', 1.5);
        door.cut();
        await s.all(walk(grandma, [0.6, 2.2], SPOT.door2), walk(sophia, [0.35, 2.5], SPOT.door2_s));
        await face(grandma, SPOT.door2, [2.3, 1.68]);
        grandma.reach({ l: 'door2#handle', r: 'sophia#hand_l' });
        grandma.look('door2#handle');
        await s.wait(1);
      },
    },
    // after М5в (the door turned by `creak`): the two through into the entry and gone; the door left ajar
    door_out: {
      after: ['to_door'],
      show: { hour: { night: 1, calm: 1 }, here: ['grandma', 'sophia', 'papa'] },
      from: () => OPEN(STAND('grandma', SPOT.door2, [2.3, 1.68], { grandma_reach: { l: 'door2#handle', r: 'sophia#hand_l' } }),
        STAND('sophia', SPOT.door2_s, [2.3, 1.68], { sophia_reach: { l: 'grandma#hand_r' } }), COT_SLEEP(), { creak: 1 }, CAMS.door2),
      run: async s => {
        const grandma = P(s, 'grandma'), sophia = P(s, 'sophia');
        if ((s.get('creak') ?? 0) < 0.8) await s.move('creak', 0.9, { over: 1 });
        grandma.reach({ r: 'sophia#hand_l' });
        await s.all(walk(grandma, SPOT.thr2, SPOT.entry, SPOT.outer), walk(sophia, [2.1, 2.05], [2.7, 2.1], [3.45, 2.1]));
        grandma.here(false);
        sophia.here(false);
        await s.move('creak', 0.5, { over: 1.2 });
        await moment(s, 'door_out:gone', 1.5);
      },
    },
    // «moon», the morning: Papa at his table looks up at Grandmother coming through the glass door, her shawl on her own
    // shoulders again; she coughs
    cough: {
      show: { hour: {}, here: ['grandma', 'papa'] },
      from: () => OPEN(AT('papa', 'p_chair', 'write'), STAND('grandma', SPOT.in_door, SPOT.ver_door), CAMS.cough),
      run: async s => {
        const grandma = P(s, 'grandma'), papa = P(s, 'papa');
        await walk(grandma, SPOT.ver_door, [1.5, -1.25]);
        papa.do('seated', { loop: true });
        papa.look('grandma');
        await moment(s, 'cough:said', 2.5);
        await grandma.do('cough');
        await moment(s, 'cough:cough', 1.5);
      },
    },
    // ── III. 3.3 the evening ──
    // dusk on the veranda: Papa at his table, Grandmother across with her cup; he speaks without looking up — М7а's
    // pose, her cup over the table
    doctor: {
      show: { hour: { dusk: 1 }, here: ['grandma', 'papa'] },
      from: () => OPEN(AT('papa', 'p_chair', 'write'), AT('grandma', 'b_g', 'seated', { grandma_reach: { r: 'table#cup', l: 'table#cup' }, grandma_look: 'table#cup' }),
        { cup: true }, CAMS.cup),
      run: async s => {
        await moment(s, 'doctor:said', 4);
      },
    },
    // after М7а: a long silence; Papa begins, does not finish, gets up and goes out along the veranda; she alone
    doctor_after: {
      after: ['doctor'],
      show: { hour: { dusk: 1 }, here: ['grandma', 'papa'] },
      from: () => OPEN(AT('papa', 'p_chair', 'write'), AT('grandma', 'b_g', 'seated', { grandma_reach: { r: 'table#cup', l: 'table#cup' } }), { cup: true },
        CAMS.cup),
      run: async s => {
        const papa = P(s, 'papa'), grandma = P(s, 'grandma');
        await s.wait(2.5);
        grandma.look('papa');
        await moment(s, 'doctor_after:chair', 3);
        papa.do('seated', { loop: true });
        papa.look('grandma');
        await moment(s, 'doctor_after:cant', 3);
        await rise(s, 'papa', 'p_chair');
        await walk(papa, SPOT.ver_mid, SPOT.out1, SPOT.out2);
        papa.here(false);
        grandma.look('table#cup');
        await moment(s, 'doctor_after:gone', 2);
      },
    },
    // night: Grandmother lying with her eyes shut; Sophia up with the candle, kneels at her bed's edge and lays her
    // palm on Grandmother's breast — М7б's pose, both faces in the candle's light
    palm_night: {
      show: { hour: { night: 1 }, here: ['grandma', 'sophia'] },
      from: () => OPEN(...ASLEEP(), CAMS.m7b),
      run: async s => {
        const sophia = P(s, 'sophia');
        await inBed(s, 'sophia', 's_up', 'sit_bed', 'sit_up');
        sophia.with(['candle']);
        await s.move('candle', 1, { over: 1.2 });
        await moment(s, 'palm_night:up', 2);
        await inBed(s, 'sophia', 's_kneel', 'kneel_bed', 'kneel_up');
        sophia.look('grandma');
        sophia.reach({ l: 'grandma#chest' });
        await moment(s, 'palm_night:palm', 2);
      },
    },
    // after М7б: «Not today»; back to her bed, the candle blown out
    not_today: {
      after: ['palm_night'],
      show: { hour: { night: 1 }, here: ['grandma', 'sophia'] },
      from: () => OPEN(AT('grandma', 'g_lie', 'lie_bed'), AT('sophia', 's_kneel', 'kneel_bed', { sophia_with: ['candle'], sophia_look: 'grandma' }),
        { candle: 1 }, CAMS.m7b),
      run: async s => {
        const sophia = P(s, 'sophia');
        await moment(s, 'not_today:whisper', 2);
        sophia.reach(null);
        sophia.look(null);
        await inBed(s, 'sophia', 's_lie', 'lie_bed', 'lie_down');
        await sophia.do('blow');
        await s.move('candle', 0, { over: 0.4 });
        sophia.with(null);
        await moment(s, 'not_today:out', 1.5);
      },
    },
    // ── III. 3.4 the storm ──
    // the next night, the storm: lightning, the house shakes; Sophia sits up, Grandmother too — the choice's pose
    thunder: {
      show: { hour: { night: 1, storm: 1 }, here: IDS },
      from: () => OPEN(...ASLEEP(), COT_SLEEP(), CAMS.beds),
      run: async s => {
        flash(s);
        await inBed(s, 'sophia', 's_up', 'sit_bed', 'sit_up');
        P(s, 'sophia').mood('afraid');
        await moment(s, 'thunder:up', 1.5);
        await inBed(s, 'grandma', 'g_up', 'sit_bed', 'sit_up');
        P(s, 'grandma').look('sophia');
        P(s, 'sophia').look('grandma');
        await cam(s, 'up', 2);
        await moment(s, 'thunder:asked', 2.5);
      },
    },
    // «porch»: Grandmother gets up, takes Sophia by the hand, out by the second door
    porch_go: {
      after: ['thunder'],
      show: { hour: { night: 1, storm: 1 }, here: IDS },
      from: () => OPEN(AT('grandma', 'g_up', 'sit_bed', { grandma_look: 'sophia' }), AT('sophia', 's_up', 'sit_bed', { sophia_look: 'grandma' }), COT_SLEEP(),
        CAMS.up),
      run: async s => {
        const grandma = P(s, 'grandma'), sophia = P(s, 'sophia');
        const door = ready(s, 'door2');
        await s.all(rise(s, 'grandma', 'g_up', 'get_up_bed'), rise(s, 'sophia', 's_up', 'get_up_bed'));
        await s.all(walk(grandma, SPOT.g_foot, [-0.9, 1.5]), walk(sophia, SPOT.s_side, [-0.55, 1.8]));
        grandma.reach({ r: 'sophia#hand_l' });
        sophia.reach({ l: 'grandma#hand_r' });
        door.cut();
        await s.all(walk(grandma, [0.6, 1.5], SPOT.door2), walk(sophia, [0.4, 1.85], SPOT.door2_s));
        await s.move('creak', 1, { over: 1.2 });
        await s.all(walk(grandma, SPOT.thr2, SPOT.entry, SPOT.outer), walk(sophia, [2.1, 2.05], [2.7, 2.1], [3.45, 2.1]));
        grandma.here(false);
        sophia.here(false);
        await moment(s, 'porch_go:out', 1.5);
      },
    },
    // «porch», Papa not knowing: the veranda in the storm; he raises himself at the creak of the door, looks out, lies
    // down again face to the wall
    storm_cot: {
      show: { hour: { night: 1, storm: 1 }, here: ['papa'] },
      from: () => OPEN(COT_SLEEP(), CAMS.cot),
      run: async s => {
        const papa = P(s, 'papa');
        await s.wait(0.8);
        await inBed(s, 'papa', 'cot_up', 'sit_bed', 'sit_up');
        papa.look(W3(1.725, 0.4, 1.1));
        await moment(s, 'storm_cot:up', 2);
        papa.look(null);
        s.set('papa_turn', TURN(4.5, -0.5, 6, -0.5));
        await inBed(s, 'papa', 'cot_lie', 'lie_wall', 'lie_down');
        await moment(s, 'storm_cot:wall', 2);
      },
    },
    // «blanket»: Grandmother up for her lamp, Sophia into Grandmother's bed; the lamp lit under the blanket pulled over
    // both, its edge held up — М8б's pose
    under: {
      after: ['thunder'],
      show: { hour: { night: 1, storm: 1 }, here: IDS },
      from: () => OPEN(AT('grandma', 'g_up', 'sit_bed', { grandma_look: 'sophia' }), AT('sophia', 's_up', 'sit_bed', { sophia_look: 'grandma' }), COT_SLEEP(),
        CAMS.up),
      run: async s => {
        const grandma = P(s, 'grandma');
        const room = ready(s, 'room');
        await s.until(() => room.ready);
        room.cut();
        await rise(s, 'grandma', 'g_up', 'get_up_bed');
        await walk(grandma, SPOT.g_foot, SPOT.foot_r, SPOT.lamp_side);
        await face(grandma, SPOT.lamp_side, [-0.52, 3.6]);
        grandma.reach({ r: 'lamp#lamp' });
        await s.move('lamp_lit', 1, { over: 1 });
        // (her way back round the beds with the lamp: a cut — she is in her bed with it, Sophia beside her)
        const [lx, lz, le] = LAMP.bed;
        const blanket = ready(s, 'under', { ...AT('grandma', 'g_under', 'half_up', { grandma_reach: { r: 'blanket#edge' } }), ...AT('sophia', 's_under', 'lie_bed'),
          lamp: 'bed', lamp_x: lx, lamp_z: lz, lamp_e: le, under: 1, cover: 1 });
        await s.until(() => blanket.ready);
        blanket.cut();
        await moment(s, 'under:under', 1.5);
      },
    },
    // after М8б: the glow under the blanket, Grandmother singing, Sophia asleep; Papa from his cot to the glass door,
    // sits on the floor at its threshold, his back to the jamb, till dawn
    song: {
      after: ['under'],
      show: { hour: { night: 1, storm: 1 }, here: IDS },
      from: () => OPEN(AT('grandma', 'g_under', 'half_up', { grandma_reach: { r: 'blanket#edge' } }), AT('sophia', 's_under', 'lie_bed'), COT_SLEEP(),
        { lamp: 'bed', lamp_x: LAMP.bed[0], lamp_z: LAMP.bed[1], lamp_e: LAMP.bed[2], lamp_lit: 1, under: 1, cover: 1 }, CAMS.under),
      run: async s => {
        const papa = P(s, 'papa');
        await moment(s, 'song:sing', 5);
        await moment(s, 'song:asleep', 2.5);
        const door = ready(s, 'door');
        await s.until(() => door.ready);
        door.cut();
        await rise(s, 'papa', 'cot_lie', 'get_up_cot');
        await walk(papa, SPOT.cot_side, [2.3, -0.9], SPOT.ver_door);
        await face(papa, SPOT.ver_door, SPOT.in_door);
        papa.look(W3(-1.9, 2.8, 0.7));
        await moment(s, 'song:papa', 2);
        await sit(s, 'papa', 'thresh', 'sit_threshold', 'sit_floor');
        await moment(s, 'song:sat', 3);
      },
    },
    // «notyou»: Grandmother sits on the edge of Sophia's bed; Sophia clutches her sleeve — М8в's pose
    notyou: {
      after: ['thunder'],
      show: { hour: { night: 1, storm: 1 }, here: IDS },
      from: () => OPEN(AT('grandma', 'g_up', 'sit_bed', { grandma_look: 'sophia' }), AT('sophia', 's_up', 'sit_bed', { sophia_look: 'grandma' }), COT_SLEEP(),
        CAMS.up),
      run: async s => {
        const grandma = P(s, 'grandma'), sophia = P(s, 'sophia');
        const near = ready(s, 'm8c');
        await rise(s, 'grandma', 'g_up', 'get_up_bed');
        await walk(grandma, SPOT.g_foot, SPOT.foot_r, [-0.45, 2.75]);
        await s.until(() => near.ready);
        near.cut();
        await sit(s, 'grandma', 's_edge', 'seated');
        grandma.look('sophia');
        sophia.reach({ r: 'grandma#hand_l' });
        await moment(s, 'notyou:clutch', 1.5);
      },
    },
    // after М8в (the fingers let go): the silence, her question; she turns to the wall and sleeps under the loudest
    // thunder
    notyou_after: {
      after: ['notyou'],
      show: { hour: { night: 1, storm: 1 }, here: IDS },
      from: () => OPEN(AT('grandma', 's_edge', 'seated', { grandma_look: 'sophia' }), AT('sophia', 's_up', 'sit_bed', { sophia_look: 'grandma' }), COT_SLEEP(),
        CAMS.m8c),
      run: async s => {
        const sophia = P(s, 'sophia');
        sophia.reach(null);
        await s.wait(2.5);
        await moment(s, 'notyou_after:ask', 4);
        sophia.look(null);
        await inBed(s, 'sophia', 's_wall', 'lie_side', 'lie_down');
        flash(s);
        await moment(s, 'notyou_after:wall', 2);
      },
    },
    // ── IV. 4.1–4.2 ──
    // an August day: the bottle on the sill; Sophia runs in by the second door with the parcel and sniffs it
    sniff: {
      show: { hour: { late: 1 }, play: { drops: 'full' }, here: ['grandma', 'sophia'] },
      from: () => OPEN(STAND('sophia', SPOT.entry, SPOT.thr2, { sophia_with: ['parcel'], sophia_gait: 'run' }), STAND('grandma', [-0.3, 2.1], SPOT.thr2),
        { creak: 1 }, CAMS.sniff),
      run: async s => {
        const sophia = P(s, 'sophia'), grandma = P(s, 'grandma');
        await walk(sophia, SPOT.thr2, [1.3, 2.4], SPOT.sill);
        sophia.gait(null);
        grandma.look('sophia');
        await face(sophia, SPOT.sill, [0.62, 3.72]);
        sophia.look('drops#bottle');
        sophia.reach({ l: 'drops#bottle' });
        await sophia.do('sniff');
        sophia.mood('disgusted');
        sophia.reach(null);
        await face(sophia, SPOT.sill, [-0.3, 2.1]);
        sophia.look('grandma');
        await moment(s, 'sniff:sniff', 3);
      },
    },
    // «stayed»: an August dusk, Papa at his table writes in the list for the post
    doctor_list: {
      show: { hour: { dusk: 1, late: 1 }, here: ['papa'] },
      from: () => OPEN(AT('papa', 'p_chair', 'write', { papa_look: W3(0.7, -2.3, 0.74) }), CAMS.papa),
      run: async s => {
        await moment(s, 'doctor_list:write', 4);
      },
    },
    // ── IV. 4.4 the night ──
    // Grandmother at the half-open window looking at the cape, the tent glowing; with `cat` the cat on the sill; the fog
    // comes in from the sea, the tent's light blurs and goes out
    night_window: {
      show: { hour: { night: 1, late: 1, fog: 0.3 }, play: { cat: true }, here: ['grandma', 'papa'] },
      from: get => OPEN(STAND('grandma', SPOT.g_win, [-1.0, 4.3], { grandma_look: TENT }), COT_SLEEP(), { casement: 0.3, tent_light: 1 },
        CATAT('sill', get('cat') ? 'sit' : 'none', -1), CAMS.window),
      run: async s => {
        await moment(s, 'night_window:tent', 4);
        s.tell('night_window:fog');
        await s.move('fog', 0.8, { over: 7 });
        await s.move('tent_light', 0, { over: 3 });
        await moment(s, 'night_window:out', 3);
      },
    },
    // the silence: with `cat` he gets off the sill and goes out over it into the fog; her face close, her reflection
    // in the glass, the white nothing — the choice's pose
    night_face: {
      after: ['night_window'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, play: { cat: true }, here: ['grandma', 'papa'] },
      from: get => OPEN(STAND('grandma', SPOT.g_win, [-1.0, 4.3], { grandma_look: TENT }), COT_SLEEP(), { casement: 0.3 },
        CATAT('sill', get('cat') ? 'sit' : 'none', -1), CAMS.window),
      run: async s => {
        if (s.get('cat') && s.get('cat_pose') !== 'none') {
          P(s, 'grandma').look('cat#cat');
          await catTo(s, 'out');
          s.set('cat_pose', 'none');
          P(s, 'grandma').look(TENT);
        }
        await moment(s, 'night_face:cat', 1.5);
        await cam(s, 'face_g', 3);
        await moment(s, 'night_face:face', 1.5);
      },
    },
    // ── IV. 4.5 Ш3, the fog's night ──
    // «go», «behind»: from the window to the second door, held so it does not creak; with `take_lantern` Papa's storm
    // lantern off its hook in the entry, lit — without it her shawl drawn round her; out; Papa does not wake
    go_out: {
      after: ['night_face'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, here: ['grandma', 'papa'] },
      from: () => OPEN(STAND('grandma', SPOT.g_win, [-1.0, 4.3], { grandma_look: TENT }), COT_SLEEP(), { casement: 0.3 }, CAMS.face_g),
      run: async s => {
        const grandma = P(s, 'grandma');
        const door = ready(s, 'door2');
        grandma.look(null);
        await s.until(() => door.ready);
        door.cut();
        await walk(grandma, [0.6, 2.6], SPOT.door2);
        await face(grandma, SPOT.door2, [2.3, 1.68]);
        grandma.reach({ l: 'door2#handle' });
        await moment(s, 'go_out:door', 0.5);
        await s.move('creak', 0.4, { over: 3, ease: 'linear' });
        grandma.reach(null);
        if (s.get('take_lantern')) {
          await walk(grandma, SPOT.thr2, SPOT.hook);
          grandma.reach({ r: W3(3.95, 1.0, 1.55) });
          await s.wait(0.8);
          s.set('storm_lantern', false);
          grandma.reach(null);
          grandma.with(['storm_lantern']);
          await s.move('grandma_lantern', 1, { over: 0.8 });
          await walk(grandma, SPOT.outer);
        } else {
          await grandma.do('shawl');
          await walk(grandma, SPOT.thr2, SPOT.entry, SPOT.outer);
        }
        grandma.here(false);
        await moment(s, 'go_out:gone', 1.5);
      },
    },
    // «papa»: from the window through the glass door to Papa on his cot; she wakes him; he gets up at once and takes
    // the big lantern; she her cardigan, to go too; at the doorway, not looking at her, he says it and goes out
    wake: {
      after: ['night_face'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, here: ['grandma', 'papa'] },
      from: () => OPEN(STAND('grandma', SPOT.g_win, [-1.0, 4.3], { grandma_look: TENT }), COT_SLEEP(), { casement: 0.3 }, CAMS.face_g),
      run: async s => {
        const grandma = P(s, 'grandma'), papa = P(s, 'papa');
        const ver = ready(s, 'ver');
        grandma.look(null);
        await walk(grandma, [0.6, 2.4], SPOT.room_in, SPOT.in_door);
        ver.cut();
        await walk(grandma, SPOT.ver_door, SPOT.cot_head);
        grandma.reach({ r: 'papa#shoulder_l' });
        await moment(s, 'wake:woke', 1.5);
        grandma.reach(null);
        await walk(grandma, [3.2, -1.3]);
        await rise(s, 'papa', 'cot_lie', 'get_up_cot');
        papa.with(['big_lantern']);
        await s.move('papa_lantern', 1, { over: 0.6 });
        await s.all(grandma.do('cardigan'), walk(papa, [3.2, -1.9], [2.5, -1.3]));
        grandma.with(['cardigan']);
        await walk(grandma, SPOT.ver_door);
        await moment(s, 'wake:sit', 2.5);
        await walk(papa, SPOT.ver_mid, SPOT.out1, SPOT.out2);
        papa.here(false);
        s.set('papa_lantern', 0);
        grandma.look(W3(5.0, -3.6, 1.2));
        await moment(s, 'wake:gone', 1.5);
      },
    },
    // back at the window she lights the lamp and lifts it to the glass; below, Papa's lantern goes down the cape's back
    // into the white — М10б's pose, the lamp at the glass, her face by it
    shine: {
      after: ['wake'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, here: ['grandma'] },
      from: () => OPEN(STAND('grandma', SPOT.ver_door, SPOT.out1, { grandma_with: ['cardigan'] }), CAMS.ver),
      run: async s => {
        const grandma = P(s, 'grandma');
        const [x, z, y] = LAMP.window;
        const win = ready(s, 'lamp', { ...STAND('grandma', SPOT.lamp_side, [0.05, 3.71], { grandma_with: ['cardigan'], grandma_reach: { r: 'lamp#lamp', l: 'lamp#lamp' },
          grandma_look: 'lamp#lamp' }), lamp: 'window', lamp_x: x, lamp_z: z, lamp_e: y, far_light: 1, far_light_at: 0.05 });
        await s.until(() => win.ready);
        win.cut();
        s.move('far_light_at', 0.6, { over: 22, ease: 'linear' });
        await s.move('lamp_lit', 1, { over: 1 });
        grandma.look(TENT);
        await moment(s, 'shine:raise', 1.5);
      },
    },
    // a long time nothing; then out of the white one light comes up the cape's back; near the house the two — with
    // `sophia_hand` Sophia walking holding Papa's hand, asleep on her feet, else beside him by herself, cross; they come
    // in by the second door
    light_back: {
      after: ['shine'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, here: IDS },
      from: () => OPEN(STAND('grandma', SPOT.lamp_side, [0.05, 3.71], { grandma_with: ['cardigan'], grandma_reach: { r: 'lamp#lamp', l: 'lamp#lamp' }, grandma_look: TENT }),
        { lamp: 'window', lamp_x: LAMP.window[0], lamp_z: LAMP.window[1], lamp_e: LAMP.window[2], lamp_lit: 1, far_light: 0, far_light_at: 0.6 }, CAMS.window),
      run: async s => {
        const papa = P(s, 'papa'), sophia = P(s, 'sophia'), grandma = P(s, 'grandma');
        const hand = !!s.get('sophia_hand');
        // (out in the white only his light is seen: the two come into sight where it is near)
        papa.here(false);
        sophia.here(false);
        s.set('far_light', 0);
        s.set('far_light_at', 0.32);
        await cam(s, 'window', 3);
        await moment(s, 'light_back:light', 1);
        await s.move('far_light', 1, { over: 1.5 });
        await s.move('far_light_at', 0.18, { over: 7, ease: 'linear' });
        const [pa, pd] = far(0.18), [sa, sd] = far(0.185);
        s.set('papa_a', pa + 0.35);
        s.set('papa_d', pd);
        s.set('sophia_a', sa - 0.35);
        s.set('sophia_d', sd);
        papa.with(['big_lantern']);
        s.set('papa_lantern', 1);
        s.set('far_light', 0);
        papa.here(true);
        sophia.here(true);
        if (hand) {
          papa.reach({ r: 'sophia#hand_l' });
          sophia.reach({ l: 'papa#hand_r' });
          sophia.do('sleepy_walk', { loop: true });
        } else sophia.mood('angry');
        grandma.look('papa');
        const there = [far(0.0), [wa(...SPOT.round), wd(...SPOT.round)], [wa(...SPOT.porch), wd(...SPOT.porch)]];
        const paths = side => there.map(([a, d]) => [a + side, d]);
        const going = s.all(papa.walk(paths(0.35)), sophia.walk(paths(-0.35)));
        await moment(s, 'light_back:near', 3);
        await going;
        // (round the corner, in at the porch: in the entry, coming through the second door)
        const door = ready(s, 'door2', { ...STAND('papa', [2.95, 1.75], SPOT.thr2, { papa_with: ['big_lantern'], papa_reach: hand ? { r: 'sophia#hand_l' } : null }),
          ...STAND('sophia', [2.95, 2.25], SPOT.thr2, { sophia_reach: hand ? { l: 'papa#hand_r' } : null, sophia_do: hand ? { motion: 'sleepy_walk', loop: true } : 'stand' }),
          creak: 1, grandma_reach: null, grandma_look: 'sophia' });
        await s.until(() => door.ready);
        door.cut();
        await s.all(walk(papa, [2.35, 1.75], [1.85, 1.7]), walk(sophia, [2.4, 2.25], [1.9, 2.35]));
      },
    },
    // in the room Papa takes Sophia to her bed; with `kick` she stops on the threshold first and kicks it; she lies down
    // face to the wall without undressing
    back_in: {
      after: ['light_back'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, play: { kick: true }, here: IDS },
      from: () => OPEN(STAND('papa', [1.85, 1.7], [0, 2.5], { papa_with: ['big_lantern'], papa_lantern: 1 }), STAND('sophia', [1.9, 2.35], [0, 2.5]),
        STAND('grandma', SPOT.lamp_side, [0.05, 3.71], { grandma_with: ['cardigan'], grandma_look: 'sophia' }),
        { lamp: 'window', lamp_x: LAMP.window[0], lamp_z: LAMP.window[1], lamp_e: LAMP.window[2], lamp_lit: 1, creak: 1 }, CAMS.door2),
      run: async s => {
        const sophia = P(s, 'sophia'), papa = P(s, 'papa');
        papa.reach(null);
        sophia.reach(null);
        sophia.do('stand');
        if (s.get('kick')) {
          await face(sophia, [1.9, 2.35], [2.3, 2.0]);
          await sophia.do('kick');
        }
        sophia.look('grandma');
        await moment(s, 'back_in:threshold', 3);
        sophia.look(null);
        await cam(s, 'beds', 2.5);
        await walk(sophia, [1.2, 2.2], SPOT.foot_r, SPOT.s_side);
        await sit(s, 'sophia', 's_edge', 'seated');
        await inBed(s, 'sophia', 's_wall', 'lie_side', 'lie_down');
        await moment(s, 'back_in:wall', 2);
      },
    },
    // dawn comes: moving away from the window Grandmother sways, Papa catches her; she sits down in the armchair; with
    // `hold_hand` he takes her hand and holds it; with `sophia_knows` Sophia raises herself on her bed
    elbow: {
      after: ['back_in'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, play: { hold_hand: true, sophia_knows: true }, here: IDS },
      from: () => OPEN(STAND('papa', [1.85, 1.7], [0, 2.5], { papa_with: ['big_lantern'] }), AT('sophia', 's_wall', 'lie_side'),
        STAND('grandma', SPOT.lamp_side, [0.05, 3.71], { grandma_with: ['cardigan'] }),
        { lamp: 'window', lamp_x: LAMP.window[0], lamp_z: LAMP.window[1], lamp_e: LAMP.window[2], lamp_lit: 1, creak: 1 }, CAMS.corner),
      run: async s => {
        const grandma = P(s, 'grandma'), papa = P(s, 'papa');
        const cut = ready(s, 'corner');
        await s.until(() => cut.ready);
        cut.cut();
        await papa.do('put_down');
        papa.with(null);
        s.set('papa_lantern', 0);
        s.move('night', 0, { over: 8 });
        s.move('dawn', 1, { over: 8 });
        s.move('lamp_lit', 0, { over: 5 });
        await walk(papa, [1.2, 2.5]);
        await walk(grandma, [0.35, 3.0]);
        await grandma.do('sway');
        await moment(s, 'elbow:sway', 0.5);
        papa.reach({ r: 'grandma#hand_l' });
        await walk(papa, [0.75, 2.75]);
        await moment(s, 'elbow:caught', 3);
        await sit(s, 'grandma', 'chair', 'armchair');
        if (s.get('hold_hand')) papa.reach({ r: 'grandma#hand_r' });
        else papa.reach(null);
        papa.look('grandma');
        await moment(s, 'elbow:sat', 3);
        if (s.get('sophia_knows')) {
          await inBed(s, 'sophia', 's_up', 'sit_bed', 'sit_up');
          P(s, 'sophia').look('papa');
        }
        await moment(s, 'elbow:sophia', 3);
      },
    },
    // «papa», «I'll hear» and Sophia called: the morning; Sophia to Grandmother in the armchair, says it, goes off after
    // Papa through the glass door
    papa_came: {
      show: { hour: { late: 1 }, here: IDS },
      from: () => OPEN(AT('grandma', 'chair', 'armchair'), STAND('sophia', SPOT.s_side, [1.35, 3.0]), AT('papa', 'p_chair', 'write'), CAMS.corner),
      run: async s => {
        const sophia = P(s, 'sophia');
        await walk(sophia, [0.6, 2.65]);
        await face(sophia, [0.6, 2.65], [1.35, 3.08]);
        sophia.look('grandma');
        await moment(s, 'papa_came:said', 3);
        sophia.look(null);
        const ver = ready(s, 'table');
        await walk(sophia, SPOT.room_in, SPOT.in_door);
        ver.cut();
        await walk(sophia, SPOT.ver_door, [1.55, -1.5]);
        sophia.look('papa');
        await moment(s, 'papa_came:follows', 1.5);
      },
    },
    // «lamp»: she lights the lamp and sets it in the window, standing by it — М10в's pose
    lamp_window: {
      after: ['night_face'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, here: ['grandma', 'papa'] },
      from: () => OPEN(STAND('grandma', SPOT.g_win, [-1.0, 4.3], { grandma_look: TENT }), COT_SLEEP(), { casement: 0.3 }, CAMS.face_g),
      run: async s => {
        const grandma = P(s, 'grandma');
        await cam(s, 'lamp', 2);
        await walk(grandma, SPOT.lamp_side);
        await face(grandma, SPOT.lamp_side, [-0.52, 3.6]);
        grandma.reach({ r: 'lamp#lamp', l: 'lamp#lamp' });
        await s.move('lamp_lit', 1, { over: 1 });
        await lampTo(s, 'window');
        await face(grandma, SPOT.lamp_side, [0.05, 3.71]);
        grandma.look('lamp#lamp');
        await moment(s, 'lamp_window:set', 1);
        grandma.look(TENT);
      },
    },
    // Sophia called: she opens her mouth to call back — and does not; she raises the lamp higher
    lamp_higher: {
      after: ['lamp_window'],
      show: { hour: { night: 1, late: 1, fog: 0.8 }, here: ['grandma', 'papa'] },
      from: () => OPEN(STAND('grandma', SPOT.lamp_side, [0.05, 3.71], { grandma_reach: { r: 'lamp#lamp', l: 'lamp#lamp' }, grandma_look: TENT }), COT_SLEEP(),
        { casement: 0.3, lamp: 'window', lamp_x: LAMP.window[0], lamp_z: LAMP.window[1], lamp_e: LAMP.window[2], lamp_lit: 1 }, CAMS.lamp),
      run: async s => {
        const grandma = P(s, 'grandma');
        grandma.mood('surprised');
        await s.wait(1);
        grandma.mood('sad');
        await s.move('lamp_up', 1, { over: 1.5 });
        await moment(s, 'lamp_higher:raise', 2);
      },
    },
    // «lamp», the morning: Grandmother dozing in the armchair, the lamp burnt out; Papa covers her with a blanket and
    // looks out at the cape — still white; with `knew` he looks at the lamp, sets the drops by her
    chair_dawn: {
      show: { hour: { dawn: 1, late: 1, fog: 0.8 }, play: { drops: 'full', knew: true }, here: ['grandma', 'papa'] },
      from: () => OPEN(AT('grandma', 'chair', 'doze'), STAND('papa', SPOT.room_in, SPOT.by_chair), { lamp: 'burnt', lamp_x: LAMP.burnt[0], lamp_z: LAMP.burnt[1],
        lamp_e: LAMP.burnt[2] }, CAMS.corner),
      run: async s => {
        const papa = P(s, 'papa'), grandma = P(s, 'grandma');
        papa.with(['plaid']);
        await to(papa, SPOT.by_chair, [1.35, 3.08]);
        papa.reach({ r: 'grandma#shoulder_r', l: 'grandma#shoulder_l' });
        await papa.do('drape');
        papa.reach(null);
        papa.with(null);
        grandma.with(['plaid']);
        await moment(s, 'chair_dawn:cover', 2.5);
        await to(papa, [0.5, 3.2], [0.4, 4.5]);
        papa.look(TENT);
        await s.wait(1.5);
        if (s.get('knew')) papa.look('lamp#lamp');
        await moment(s, 'chair_dawn:lamp', 3);
        if (s.get('knew') && s.get('drops') !== 'none') {
          papa.reach({ r: 'drops#bottle' });
          await s.wait(0.8);
          s.set('drops_at', 'held');
          papa.reach(null);
          papa.with(['drops']);
          await to(papa, SPOT.by_chair, [1.0, 3.5]);
          await papa.do('put_down');
          papa.with(null);
          s.set('drops_at', 'chair');
          await moment(s, 'chair_dawn:drops', 1.5);
          await to(papa, [0.5, 3.2], [0.4, 4.5]);
        } else s.tell('chair_dawn:drops');
        papa.look(TENT);
        await s.wait(1.5);
      },
    },
    // «lamp», Sophia did not call: the morning on the veranda, she sits down at the table without a word
    breakfast: {
      show: { hour: { late: 1 }, here: IDS },
      from: () => OPEN(...TABLE3(), { supper: true }, CAMS.supper),
      run: async s => {
        P(s, 'sophia').do('eat', { loop: true });
        P(s, 'sophia').look(W3(0.6, -1.15, 0.75));
        await moment(s, 'breakfast:lamp', 3);
        P(s, 'grandma').look('sophia');
        await moment(s, 'breakfast:knock', 4);
      },
    },
    // «lamp», «heard»: the evening; Papa carries his camp bed from the veranda into the room, sets it under the window;
    // Grandmother on her bed watches
    cot_moved: {
      show: { hour: { dusk: 1, late: 1 }, here: ['grandma', 'papa'] },
      from: () => OPEN(STAND('papa', SPOT.cot_side, [4.6, -0.45]), AT('grandma', 'g_edge', 'seated', { grandma_look: W3(1.725, 0.2, 1.4) }), CAMS.ver),
      run: async s => {
        const papa = P(s, 'papa');
        papa.reach({ r: 'cot#grip', l: 'cot#grip' });
        await s.wait(0.8);
        s.set('cot_carried', true);
        papa.gait('carry_walk');
        await moment(s, 'cot_moved:carry', 0.5);
        const room = ready(s, 'room');
        await walk(papa, [2.9, -1.2], [1.725, -1.1], SPOT.ver_door);
        room.cut();
        P(s, 'grandma').look('papa');
        await walk(papa, SPOT.in_door, [1.0, 1.5], [0.85, 2.3]);
        papa.gait(null);
        await papa.do('put_down');
        papa.reach(null);
        s.set('cot_carried', false);
        s.set('cot', 'room');
        await face(papa, [0.85, 2.3], [0.3, 2.8]);
        await moment(s, 'cot_moved:set', 3);
      },
    },
    // «behind» + «Sophia knows»: the evening; Sophia in by the second door; with `wall` she lies down face to the wall
    // without undressing, else she says it and sits on her bed's edge; Grandmother on her bed says nothing
    evening_wall: {
      show: { hour: { dusk: 1, late: 1 }, play: { wall: true }, here: ['grandma', 'sophia'] },
      from: () => OPEN(AT('grandma', 'g_edge', 'seated'), STAND('sophia', SPOT.thr2, [0, 2.0]), { creak: 0.7 }, CAMS.room),
      run: async s => {
        const sophia = P(s, 'sophia'), grandma = P(s, 'grandma');
        grandma.look('sophia');
        await walk(sophia, [1.3, 2.0], SPOT.foot_r, SPOT.s_side);
        await face(sophia, SPOT.s_side, [-1.9, 2.55]);
        sophia.look('grandma');
        sophia.mood('angry');
        await moment(s, 'evening_wall:said', 3);
        sophia.look(null);
        await sit(s, 'sophia', 's_edge', 'seated');
        if (s.get('wall')) await inBed(s, 'sophia', 's_wall', 'lie_side', 'lie_down');
        grandma.look(null);
        await moment(s, 'evening_wall:wall', 2);
      },
    },
    // ── Epilogue ──
    // «Mama: moon», the last morning: the veranda emptied; Sophia, going, touches the straw hat on its nail
    hat_leave: {
      show: { hour: { dawn: 1, late: 1, fog: 0.6 }, here: ['sophia'] },
      from: () => OPEN(STAND('sophia', SPOT.in_door, SPOT.ver_door), { packed: true }, CAMS.hat1),
      run: async s => {
        const sophia = P(s, 'sophia');
        await walk(sophia, SPOT.ver_door, SPOT.under_hat);
        await face(sophia, SPOT.under_hat, [2.45, -0.03]);
        sophia.look('hat#hat');
        sophia.reach({ r: 'hat#hat' });
        await moment(s, 'hat_leave:touch', 2);
        sophia.reach(null);
        sophia.look(null);
        await walk(sophia, SPOT.ver_mid, SPOT.out1, SPOT.out2);
        sophia.here(false);
        await s.wait(1);
      },
    },
  };
  // the showcase's: each piece opens at its step's hour, with its play's keys and its people here
  const shown = b => {
    const here = Object.fromEntries(IDS.map(id => [`${id}_here`, b.show.here.includes(id)]));
    return { ...HOUR, ...b.show.hour, ...PLAY, ...(b.show.play ?? {}), ...here };
  };
  // (a piece's `from` reads the play's keys by `get`: the game's as they are; showing, its step's)
  const opening = b => {
    if (!show) return () => b.from(k => scene.get(k));
    return () => {
      const v = shown(b);
      return { ...v, ...b.from(k => (k in v ? v[k] : scene.get(k))) };
    };
  };
  return Object.fromEntries(Object.entries(B).map(([name, b]) => [name, { after: b.after, from: opening(b), run: b.run }]));
}

return { CX, CZ, K, lx, lz, wa, wd, bearing, ground, ridge, crest, out, WATER, edge, sm, W, T, TENT, MOON, LAMP, LIFT, HAT, COT, DROPS, CAT, far, film };
