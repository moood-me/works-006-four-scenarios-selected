// «The Cape» — the land's shape (relief.js reads it) and what the paintings and the script share. The island's far end:
// one bare granite back going down into the open sea on the right and ahead; on the left the island goes on and rises,
// far off, to the pines and the house. The viewer stands on the rock; the sea's edge runs from near on the right away
// to the left. Sophia's tent stands on the rock before the water (the anchor `tent`); the wet stones of the path come
// down to it from the island; in the rock's sea face behind it a crevice with a ledge over the water (`ledge`).
const { clamp } = anim;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
const soft = x => (x > 20 ? x : Math.log(1 + Math.exp(x)));
// the line the rock is laid along: metres across at a distance (near on the right, bending away to the left)
const coast = z => 8 - 0.55 * z + 0.42 * soft(z - 13);
function raw(x, z) {
  const s = coast(z) - x;
  let h = -1.1 + 1.1 * sm((s + 2) / 5);
  // low rounded backs of rock
  h += 0.3 * Math.exp(-((x + 3) ** 2 + (z - 9) ** 2) / 6) + 0.2 * Math.exp(-((x - 4.5) ** 2 + (z - 4) ** 2) / 4);
  h += 0.1 * Math.sin(0.8 * x + 0.5 * z) * Math.sin(0.55 * z - 0.35 * x) * sm((s - 0.5) / 3);
  // inland the island rises to the pines and the house
  h += 7 * sm((s - 6) / 26) * sm((z - 12) / 30);
  // and ends: beyond 95 m ahead and 60 m to the left it goes down under the sea
  h -= 9 * sm((z - 92) / 14) + 9 * sm((-x - 58) / 12);
  return h;
}
const ZERO = raw(0, 0);
const ground = (x, z) => raw(x, z) - ZERO;
// the sea's surface, metres (the viewer stands at 0 on the rock)
const WATER = -0.75 - ZERO;
// where the sea meets the rock at a distance: metres across
function shore(z) {
  let a = coast(z) - 4;
  let b = coast(z) + 4;
  for (let i = 0; i < 24; i++) {
    const m = (a + b) / 2;
    if (ground(m, z) > WATER) a = m;
    else b = m;
  }
  return (a + b) / 2;
}
// the waterline, [[across, distance], …] (the island's sea washes it in a storm)
const edge = [];
for (let z = -5; z <= 100; z += 0.5) edge.push([shore(z), z]);

// a soft round glow, stretched (rx, ry its half-widths), falling off smoothly to nothing
function glow(g, x, y, rx, ry, color, alpha) {
  const [r, gg, b] = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16));
  g.save();
  g.translate(x, y);
  g.scale(rx, ry);
  const grad = g.createRadialGradient(0, 0, 0, 0, 0, 1);
  for (const u of [0, 0.25, 0.5, 0.75, 1]) grad.addColorStop(u, `rgba(${r},${gg},${b},${(1 - u * u) ** 2})`);
  g.globalAlpha = alpha;
  g.fillStyle = grad;
  g.beginPath();
  g.arc(0, 0, 1, 0, 6.2832);
  g.fill();
  g.restore();
}
// a slope of the tent's roof, pale canvas seen from above (both slopes, tent_slope_r and tent_slope_l): a seam along
// the ridge, two seams down it, the hem darker where it meets the rock. Metres from its middle, x along the ridge
// (1.9 m), y down the slope (1.4 m). Painted only while the tent stands (`tent`: changes between steps, or once as
// it goes up)
function tentSlope(g, e) {
  if (!tentShown(e.state, 'up')) return;
  g.fillStyle = '#e6dfcf';
  g.fillRect(-0.95, -0.7, 1.9, 1.4);
  g.strokeStyle = 'rgba(150,140,120,0.5)';
  g.lineWidth = 0.012;
  for (const x of [-0.32, 0.32]) {
    g.beginPath();
    g.moveTo(x, -0.7);
    g.lineTo(x, 0.7);
    g.stroke();
  }
  g.fillStyle = '#d3cab6';
  g.fillRect(-0.95, -0.7, 1.9, 0.04);
  g.fillRect(-0.95, 0.62, 1.9, 0.08);
}
// whether a thing of the tent is there in its state — `tent`: parcel · pole · up (1 or 0)
const tentShown = (state, of) => ((state.tent ?? 'up') === of ? 1 : 0);

// the tent: its anchor (where its front's foot is, facing 215), and a point of it — [across, distance] in its own frame
// (across to its right, distance back from its front) — in the world's metres
const TENT = { at: [2.4, 6.6], facing: 215 };
const F = (TENT.facing * Math.PI) / 180;
const onTent = (x, d) => [TENT.at[0] - Math.cos(F) * x - Math.sin(F) * d, TENT.at[1] + Math.sin(F) * x - Math.cos(F) * d];
// the facing of someone in the tent's frame (degrees: 180 out of its door)
const tentTurn = t => TENT.facing - 180 + t;

// the seats (the `seat` element's copies): a low stone halfway down the path, one behind the tent by its far corner (its
// back stands at the water's edge), one by the last stone of the path (where she rests, weak, on her way down) and one
// by the first (where she sits down in the dark minigame, `rest`)
const SEATS = { half: [-1.6, 9.6], back: onTent(-1.05, 1.6), rest: [-0.85, 5.75], first: [-3.0, 11.15] };
const SEAT_TOP = 0.32; // (0.42 high, sunk 0.1 into the rock)
const seat = k => [SEATS[k][0], SEATS[k][1], SEAT_TOP];
const DEG = 180 / Math.PI;
// the way someone at p faces to look at q (degrees, as a person's turn: 0 away from the start, 90 to its right)
const face = (p, q) => (Math.atan2(q[0] - p[0], q[1] - p[1]) * DEG + 360) % 360;

// the path's stones and, above the highest, where it goes on up out of sight — behind the big boulder up the slope
const S1 = [-3.4, 10.6];
const S2 = [-1.1, 8.9];
const S3 = [-0.1, 6.2];
const TOP = [-6.2, 14.4];
// round the tent's left side to its back (behind_sit, before_dawn)
const ROUND = onTent(-1.35, 0.25);
const DOOR = onTent(0, -0.05);

// the people's places (`<id>_at` names one): where each stands, facing, what they look at and reach for there, what
// they do (a motion of the cast, looped) and what they sit on. Grandmother and Sophia as approved first.
const PLACES = {
  grandma: {
    stand: { at: [-0.4, 4.4], turn: 160, look: [6, 1, 0], do: 'hands_behind' },
    top: { at: TOP, turn: 150 },
    pole: { at: onTent(-0.62, -0.1), turn: tentTurn(110), look: 'sophia', reach: { r: 'pole#grip', l: 'pole#grip' }, do: 'hold_pole' },
    stone1: { at: S1, turn: face(S1, S2), look: 'path#stone2' },
    stone2: { at: S2, turn: face(S2, S3), look: 'path#stone3' },
    stone3: { at: S3, turn: face(S3, TENT.at), look: 'tent_front#door' },
    rest: { at: SEATS.rest, turn: face(SEATS.rest, TENT.at), look: 'tent', do: 'sit_stone', on: seat('rest') },
    half: { at: SEATS.half, turn: 140, look: 'tent', do: 'sit_stone', on: seat('half') },
    door: { at: onTent(-0.5, -0.5), turn: tentTurn(45), look: 'tent_front#door' },
    // (in the tent the floor's edge is a low seat: not on the ground — the long skirt, cast.md)
    inside: { at: onTent(-0.32, 0.9), turn: tentTurn(180), look: 'sophia', do: 'sit_stone', on: [...onTent(-0.32, 0.9), 0.22] },
    behind: { at: SEATS.back, turn: tentTurn(59), look: 'tent_back#palm', do: 'sit_stone', on: seat('back') },
  },
  sophia: {
    parcel: { at: onTent(-0.55, 0.35), turn: face(onTent(-0.55, 0.35), onTent(0.1, 0.6)), look: 'parcel#parcel', do: 'kneel' },
    tent: { at: [1.4, 5.6], turn: 200, look: 'grandma' },
    tie: { at: onTent(0.75, -0.7), turn: tentTurn(200), look: 'peg#peg', do: 'tie' },
    pet: { at: onTent(1.05, -0.65), turn: face(onTent(1.05, -0.65), onTent(0.75, -0.25)), look: 'cat#back', do: 'crouch' },
    door: { at: onTent(0.05, -0.2), turn: tentTurn(180), look: [-6, 2, 4], do: 'hug_knees' },
    lie: { at: onTent(0.1, 0.45), turn: tentTurn(180), do: 'lie_side' },
    inside: { at: onTent(0, 0.8), turn: tentTurn(180), do: 'hug_knees' },
    path: { at: [0.6, 5.4], turn: 210, look: 'grandma' },
    by_half: { at: [-2.15, 9.0], turn: face([-2.15, 9.0], SEATS.half), look: 'grandma' },
    half: { at: [-2.15, 9.2], turn: 120, look: 'grandma', do: 'sit_ground' },
    top: { at: TOP, turn: 150 },
  },
  papa: {
    top: { at: TOP, turn: 150 },
    path: { at: S1, turn: face(S1, S2), look: 'tent' },
    by: { at: onTent(-1.6, -0.9), turn: tentTurn(150), look: 'tent' },
    lamp: { at: onTent(-0.1, -0.6), turn: tentTurn(0), look: 'lantern' },
    mother: { at: [0.4, 4.75], turn: face([0.4, 4.75], [-0.4, 4.4]), look: 'grandma' },
    peg: { at: onTent(-0.6, -0.95), turn: tentTurn(90), look: 'peg#peg', reach: { r: 'peg#peg' }, do: 'crouch' },
    half: { at: [-1.0, 9.25], turn: face([-1.0, 9.25], SEATS.half), look: 'grandma' },
    door: { at: onTent(-0.75, -0.75), turn: tentTurn(20), look: 'grandma' },
  },
};
// the cat's places (cat_at): where he is and which way he faces (1 right, −1 left); `off` — over the rocks out of
// sight, behind the juniper (he walks there and is `none`); `fog` — out of the white behind the tent's back
const CAT = {
  tent: { at: onTent(0.75, -0.25), dir: -1 },
  door: { at: onTent(-0.3, -0.3), dir: 1 },
  rock: { at: [0.6, 3.6], dir: 1 },
  off: { at: [-4.55, 7.0], dir: -1 },
  fog: { at: onTent(0.2, 2.4), dir: -1 },
};

// the camera from the land (the scene's own: as it starts) and from the sea (`from: sea` — out on the water to the
// right, looking back at the cape: the tent's back, the crevice and its ledge), from the side (`from: side` — up the
// path on the left, looking across the tent to the sea: whoever sits behind it)
const VIEWS = {
  land: { camera_x: 0, camera_z: 0, camera_h: 0, camera_yaw: 0, camera_pitch: 0 },
  sea: { camera_x: 13, camera_z: 4.5, camera_h: -0.9, camera_yaw: -62, camera_pitch: 0 },
  side: { camera_x: -0.5, camera_z: 5.5, camera_h: -0.5, camera_yaw: 52, camera_pitch: 0 },
};

// ── the camera of the pieces ────────────────────────────────────────
// every camera key at once (a cut or a ready shot sets them all: no offset of a shot before is left over)
const CAM0 = {
  camera_target: null, camera_shot: 'full', camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_h: 0,
  camera_yaw: 0, camera_look: 0, camera_pitch: 0, camera_roll: 0,
};
const HORIZON = 0.45;
const EYE = 1.7;
// a shot by hand: the eye at [across, distance, height over the land there] (over the sea: over its water), turned and
// its lens shifted (camera_look: what stands stays upright) so that the point `at` ([across, distance, height over the
// land there]) is at [fx, fy] of a 16:9 frame — the middle 4:3 is fx 0.125…0.875; the top 12 % is the minigame's hint,
// the bottom 20 % the subtitles'
const over = (a, d) => Math.max(ground(a, d), WATER);
function aim(eye, at, fx = 0.5, fy = 0.42) {
  const [ea, ed, eh] = eye;
  const [pa, pd, ph] = at;
  const ey = over(ea, ed) + eh;
  const py = ground(pa, pd) + ph;
  const da = pa - ea;
  const dd = pd - ed;
  const r = Math.atan((fx - 0.5) * (16 / 9));
  const fwd = Math.hypot(da, dd) * Math.cos(r);
  return {
    ...CAM0, camera_x: ea, camera_z: ed, camera_h: ey - ground(ea, ed) - EYE,
    camera_yaw: (Math.atan2(da, dd) - r) * DEG, camera_look: HORIZON - (py - ey) / fwd - fy,
  };
}
const view = name => ({ ...CAM0, ...VIEWS[name] });
// the pieces' shots, each named by what it holds
const SHOTS = {
  // the tent going up: the parcel, Sophia, Grandmother by her place
  pitch: aim([0.3, 2.0, 1.5], [1.4, 6.2, 0.7], 0.5, 0.47),
  // the pole minigame: pole#grip and both faces
  pole: aim([0.85, 3.3, 1.2], [2.2, 6.3, 0.9], 0.5, 0.44),
  // the stones down to the tent and the tent: Papa coming with the lantern
  path: aim([0.2, 1.4, 1.6], [0.2, 8.4, 0.7], 0.5, 0.5),
  // Papa by the tent and Sophia: «That's the law»
  law: aim([0.3, 3.3, 1.3], [1.0, 6.2, 1.25], 0.5, 0.42),
  // the far window over the rock
  window: aim([0.3, 3.3, 1.3], [-27, 60, 3.2], 0.45, 0.38),
  // Papa and his mother: «The window is yours»
  mother: aim([-1.3, 2.3, 1.5], [0.0, 4.6, 1.5], 0.5, 0.4),
  // Sophia and the cat by the tent
  pet: aim([1.6, 3.6, 1.0], [3.0, 6.1, 0.4], 0.5, 0.5),
  // up the path: whoever goes up, out of sight behind the boulder
  up: aim([0.9, 2.0, 1.6], [-2.4, 10.0, 0.9], 0.5, 0.48),
  // the door at dusk: Sophia sitting in it, Grandmother before her, low on the two faces (the choice: sophia#chest)
  goodnight: aim([0.95, 4.5, 0.95], [2.0, 6.45, 1.0], 0.5, 0.47),
  // from the door's side: Sophia's back, Grandmother going up the path
  leave: aim([3.4, 4.3, 1.25], [-1.5, 10.0, 0.9], 0.5, 0.45),
  // over Grandmother's shoulder at the second stone, down to Sophia at the door
  back: aim([-2.2, 10.8, 1.6], [2.3, 6.4, 0.5], 0.4, 0.55),
  // the tent at night from the land, the fog coming
  night: aim([0.3, 2.6, 1.5], [2.4, 6.8, 0.6], 0.55, 0.47),
  // the path in the fog from below: the three stones and the first one (the fog and dark minigames)
  fog: aim([1.4, 2.4, 1.6], [-1.5, 8.6, 0.7], 0.5, 0.48),
  // the two at the door, the flap thrown back
  door: aim([0.4, 3.9, 1.05], [2.0, 6.45, 1.0], 0.5, 0.44),
  // through the open door, low: inside the tent
  in_tent: aim([1.75, 5.05, 0.75], [2.7, 7.4, 0.35], 0.5, 0.5),
  // the stones and the tent, wide: going up the path
  stones: aim([1.1, 2.3, 1.6], [-0.2, 8.4, 0.7], 0.5, 0.48),
  // Grandmother on the halfway stone, her face
  half: aim([0.1, 7.4, 1.15], [-1.5, 9.5, 0.9], 0.5, 0.42),
  // from behind her on the halfway stone down to the tent
  over_half: aim([-2.9, 11.1, 1.9], [1.6, 6.8, 0.5], 0.5, 0.52),
  // the two on the halfway stone, close
  half_two: aim([-0.4, 7.7, 1.0], [-1.9, 9.35, 0.8], 0.5, 0.42),
  // Sophia at the open flap, over her shoulder: the far window's patch up the island
  flap_window: aim([3.4, 4.6, 0.9], [-27, 60, 3.2], 0.42, 0.36),
  // Sophia's face at the flap, close
  flap_face: aim([1.6, 5.3, 0.65], [2.3, 6.4, 0.55], 0.5, 0.44),
  // close on Grandmother behind the tent, her face, the canvas by it (the knock minigame: tent_back#palm)
  behind: aim([4.0, 8.95, 1.15], [2.6, 8.45, 0.9], 0.45, 0.44),
  // from the sea's side, beyond the tent's back: Grandmother on the stone by it, facing this way
  behind_wide: aim([4.7, 9.7, 1.4], [2.8, 8.3, 0.7], 0.5, 0.46),
  // her way round the tent: the stone by the last one, the tent
  round: aim([1.2, 2.8, 1.5], [0.9, 7.2, 0.6], 0.5, 0.5),
  // the cape at the last morning: Papa at the peg, Sophia, Grandmother at the door
  peg: aim([3.2, 3.4, 1.35], [1.6, 6.1, 0.9], 0.5, 0.45),
  // the crevice from the sea, near: the ledge over the water
  shawl: aim([7.2, 7.4, 0.8], [3.35, 9.2, 0.15], 0.5, 0.45),
};

// ── the pieces (notes.md «Pieces»; the module beats) ────────────────
// Each piece: `from` — where its people are, the tent, its door, the candle, the window, the cat and the camera (the
// play's keys — the hour, the weather, `lean`, `shawl`, `stones`, `knocks`, `lamp_hand`, `weak`, `sophia_night`, who of
// Grandmother and Sophia is here — are the game's); `run` — the piece, telling its moments. A piece that follows
// another (`after`) goes on from where that one ended: its `from` is that end, its `run` puts nobody anywhere; another
// frame is a ready cut that sets every camera key.
const loop = m => ({ motion: m, loop: true });
const GAIT = { grandma: 'old_walk', sophia: null, papa: null };
function at(id, place, more = {}) {
  const p = PLACES[id][place];
  return {
    [`${id}_at`]: place, [`${id}_placed`]: place, [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_on`]: p.on ?? null,
    [`${id}_turn`]: p.turn, [`${id}_do`]: p.do ? loop(p.do) : null, [`${id}_look`]: p.look ?? null,
    [`${id}_reach`]: p.reach ?? null, [`${id}_gait`]: GAIT[id], [`${id}_with`]: null, [`${id}_wear`]: null, ...more,
  };
}
// the cat out of sight; the tent standing, its door open, the candle and the window out
const CAT_OFF = { cat_at: 'off', cat_placed: 'off', cat_pose: 'none', cat_a: CAT.off.at[0], cat_d: CAT.off.at[1], cat_dir: CAT.off.dir };
const UP = { tent: 'up', flap: 'open', candle: 0, window: 0, stones_laid: 0 };
// someone walks to a place at their gait (by the points between), then is there as the place says — sitting down onto
// its seat when it has one (o.sit: a motion done once; o.rise: one getting up first), facing, looking, doing and
// reaching as it says; the place's keys set as they arrive (the script puts nobody again). Already there: only what
// they do, look at and reach for.
async function goTo(s, id, place, via = [], o = {}) {
  const p = PLACES[id][place];
  const who = s.person(id);
  if (s.get(`${id}_placed`) !== place) {
    who.reach(null);
    if (o.rise) await who.do(o.rise);
    who.on(null);
    s.set(`${id}_do`, null);
    await who.walk([...via, p.at]);
    await who.turn(p.turn);
    if (o.sit) await who.do(o.sit);
    if (p.on) who.on(p.on);
    s.set(`${id}_placed`, place);
    s.set(`${id}_at`, place);
  }
  if (p.do) who.do(p.do, { loop: true });
  else s.set(`${id}_do`, null);
  who.look(p.look ?? null);
  who.reach(p.reach ?? null);
}
// someone walks off up the path out of sight (behind the boulder) and is gone
async function goUp(s, id, via) {
  const who = s.person(id);
  who.on(null);
  who.reach(null);
  who.look(null);
  s.set(`${id}_do`, null);
  await who.walk([...via, TOP]);
  who.here(false);
  s.set(`${id}_placed`, 'top');
  s.set(`${id}_at`, 'top');
}
// the cat walks to a place at his pace and stays there in a pose (`none` — gone)
async function catTo(s, place, pose = 'sit', via = []) {
  const c = CAT[place];
  s.set('cat_dir', c.at[0] >= (s.get('cat_a') ?? 0) ? 1 : -1);
  s.set('cat_pose', 'walk');
  await s.path(['cat_a', 'cat_d'], [...via, c.at], { speed: 0.45 });
  s.set('cat_dir', c.dir);
  s.set('cat_placed', place);
  s.set('cat_at', place);
  s.set('cat_pose', pose);
}
// the camera taken to a shot over a while (its keys moved; the operator off)
function glideTo(s, shot, over = 2) {
  s.set('camera_target', null);
  for (const k of ['camera_x', 'camera_z', 'camera_h', 'camera_yaw', 'camera_look']) s.move(k, shot[k], { over, ease: 'inOut' });
}
// a ready cut: the shot made ready, then cut to as soon as it is
async function cutTo(s, values) {
  const shot = s.shot(values);
  await s.until(() => shot.ready);
  shot.cut();
}
// the night going toward dawn, before the eyes
const toDawn = (s, over) => s.all(s.move('night', 0.4, { over }), s.move('dawn', 0.6, { over }), s.move('fog', 0.5, { over }));
// two walking together, she on his arm: each at their gait, he slowed to hers (`lead_walk`)
const arm = (s, g, p) => s.all(s.person('grandma').walk([g]), s.person('papa').walk([p]));
const beside = ([a, d]) => [a - 0.5, d - 0.1];

const FILM = {
  // 4.2 — Sophia unrolls the parcel and stands the pole up; Grandmother takes it in both hands; Sophia goes to the peg
  // (the pole minigame's pose: pole#grip, both faces)
  pitch: {
    from: () => ({
      ...at('grandma', 'stand'), ...at('sophia', 'parcel'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP,
      tent: 'parcel', ...SHOTS.pitch,
    }),
    run: async s => {
      const so = s.person('sophia');
      s.tell('pitch:cape');
      await s.wait(2.5);
      await so.do('get_up');
      s.set('sophia_do', null);
      so.reach({ r: 'pole#top' });
      s.set('tent', 'pole');
      glideTo(s, SHOTS.pole, 3);
      await goTo(s, 'grandma', 'pole');
      so.reach(null);
      s.tell('pitch:pole');
      await goTo(s, 'sophia', 'tie');
      await s.wait(1.5);
    },
  },
  // 4.2 — the tent stands (after the minigame, a ready cut); Papa comes down the stones with the lantern and sets it in
  // the tent at its back (the canvas glows); «That's the law»; the window up there; «The window is yours»
  law: {
    after: 'pitch',
    from: () => ({ ...at('grandma', 'pole'), ...at('sophia', 'tie'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, tent: 'pole', ...SHOTS.pole }),
    run: async s => {
      const papa = s.person('papa');
      await cutTo(s, { tent: 'up', ...SHOTS.path });
      papa.here(true);
      papa.with(['lantern']);
      const down = goTo(s, 'papa', 'lamp', [S1, S2, S3]);
      await s.wait(1);
      s.tell('law:lantern');
      await s.all(goTo(s, 'grandma', 'stand'), goTo(s, 'sophia', 'tent'), down);
      await papa.do('put_down');
      papa.with(null);
      s.move('candle', 1, { over: 2, ease: 'out' });
      await goTo(s, 'papa', 'by');
      papa.look('sophia');
      s.person('sophia').look('papa');
      glideTo(s, SHOTS.law, 2);
      await s.wait(1.5);
      s.tell('law:law');
      await s.wait(5);
      glideTo(s, SHOTS.window, 3);
      await s.wait(2.5);
      s.tell('law:window');
      await s.wait(3);
      glideTo(s, SHOTS.mother, 3);
      await goTo(s, 'papa', 'mother');
      s.person('grandma').look('papa');
      s.tell('law:yours');
      await s.wait(4);
    },
  },
  // 4.2 «gift» — the cat comes over the rocks while Papa is still here and sits by the tent; Sophia crouches and strokes
  // him; he goes off to catch birds
  cat_comes: {
    after: 'law',
    from: () => ({ ...at('grandma', 'stand', { grandma_look: 'papa' }), ...at('sophia', 'tent'), ...at('papa', 'mother'), papa_here: true, ...CAT_OFF, ...UP, candle: 1, ...SHOTS.mother }),
    run: async s => {
      const so = s.person('sophia');
      glideTo(s, SHOTS.pet, 3);
      await catTo(s, 'tent');
      await goTo(s, 'sophia', 'pet');
      so.reach({ r: 'cat#back' });
      so.do('pet', { loop: true });
      s.tell('cat_comes:sit');
      await s.wait(4);
      so.reach(null);
      so.do('crouch', { loop: true });
      await catTo(s, 'off', 'none');
      s.tell('cat_comes:gone');
      await s.wait(1);
    },
  },
  // 4.2 — Papa goes up the stones and out of sight
  up_path: {
    after: ['law', 'cat_comes'],
    from: () => ({ ...at('grandma', 'stand', { grandma_look: 'papa' }), ...at('sophia', 'tent'), ...at('papa', 'mother'), papa_here: true, ...CAT_OFF, ...UP, candle: 1, ...SHOTS.mother }),
    run: async s => {
      glideTo(s, SHOTS.up, 3);
      s.person('grandma').look('papa');
      await goUp(s, 'papa', [S3, S2, S1]);
      s.tell('up_path:gone');
      s.person('grandma').look('tent');
      await s.wait(1);
    },
  },
  // 4.2 «stayed» — on his way back, not looking at her: «Mamma, I'll write to the doctor» — «In autumn. In town»; he
  // goes up the stones in silence
  doctor: {
    after: ['law', 'cat_comes'],
    from: () => ({ ...at('grandma', 'stand', { grandma_look: 'papa' }), ...at('sophia', 'tent'), ...at('papa', 'mother'), papa_here: true, ...CAT_OFF, ...UP, candle: 1, ...SHOTS.mother }),
    run: async s => {
      const papa = s.person('papa');
      glideTo(s, SHOTS.mother, 2);
      await papa.turn(face(PLACES.papa.mother.at, S3));
      papa.look('path#stone3');
      s.person('grandma').look('papa');
      await s.wait(1);
      s.tell('doctor:say');
      await s.wait(6);
      glideTo(s, SHOTS.up, 3);
      await goUp(s, 'papa', [S3, S2, S1]);
      s.tell('doctor:gone');
      await s.wait(1);
    },
  },
  // 4.3 — Sophia sits at the open door hugging her knees, Grandmother before her; low on both faces (the choice
  // `night`: sophia#chest)
  goodnight: {
    after: 'up_path',
    from: () => ({
      ...at('grandma', 'door', { grandma_look: 'sophia' }), ...at('sophia', 'door', { sophia_look: 'grandma' }), ...at('papa', 'top'),
      papa_here: false, ...CAT_OFF, ...UP, candle: 1, ...SHOTS.goodnight,
    }),
    run: async s => {
      glideTo(s, SHOTS.goodnight, 3);
      const rise = s.get('sophia_do') ? 'get_up' : null;
      await s.all(goTo(s, 'sophia', 'door', [], { rise, sit: 'sit_down' }), goTo(s, 'grandma', 'door'));
      s.person('grandma').look('sophia');
      s.person('sophia').look('grandma');
      s.tell('goodnight:door');
      await s.wait(1.5);
    },
  },
  // 4.3 «call» — she turns to go; Sophia catches her by the sleeve: «And you'll really hear?» — «Really»
  sleeve: {
    after: 'goodnight',
    from: () => ({
      ...at('grandma', 'door', { grandma_look: 'sophia' }), ...at('sophia', 'door', { sophia_look: 'grandma' }), ...at('papa', 'top'),
      papa_here: false, ...CAT_OFF, ...UP, candle: 1, ...SHOTS.goodnight,
    }),
    run: async s => {
      const gm = s.person('grandma');
      const so = s.person('sophia');
      await gm.turn(face(PLACES.grandma.door.at, S3));
      gm.look('path#stone3');
      s.tell('sleeve:turn');
      await s.wait(0.6);
      so.reach({ r: 'grandma#hand_l' });
      await s.wait(0.8);
      gm.look('sophia');
      s.tell('sleeve:catch');
      await s.wait(4);
      so.reach(null);
      await s.wait(1);
    },
  },
  // 4.3 «call», «knock» — Grandmother goes up the stones into the dusk; Sophia at the door watches her go
  leave: {
    after: ['goodnight', 'sleeve'],
    from: () => ({
      ...at('grandma', 'door', { grandma_look: 'sophia' }), ...at('sophia', 'door', { sophia_look: 'grandma' }), ...at('papa', 'top'),
      papa_here: false, ...CAT_OFF, ...UP, candle: 1, ...SHOTS.goodnight,
    }),
    run: async s => {
      s.person('sophia').look('grandma');
      glideTo(s, SHOTS.leave, 3);
      await goUp(s, 'grandma', [S3, S2, S1]);
      s.tell('leave:gone');
      s.person('sophia').look('path#stone1');
      await s.wait(1.5);
    },
  },
  // 4.3 «scared» — she goes up; Sophia does not watch her go; at the second stone Grandmother looks back: over her
  // shoulder, Sophia at the door hugging her knees, not waving
  no_wave: {
    after: 'goodnight',
    from: () => ({
      ...at('grandma', 'door', { grandma_look: 'sophia' }), ...at('sophia', 'door', { sophia_look: 'grandma' }), ...at('papa', 'top'),
      papa_here: false, ...CAT_OFF, ...UP, candle: 1, ...SHOTS.goodnight,
    }),
    run: async s => {
      const gm = s.person('grandma');
      s.person('sophia').look([...onTent(0.3, -1.2), 0]);
      glideTo(s, SHOTS.up, 3);
      await goTo(s, 'grandma', 'stone2', [S3]);
      await gm.turn(face(S2, DOOR));
      gm.look('sophia');
      await cutTo(s, SHOTS.back);
      s.tell('no_wave:back');
      await s.wait(3);
    },
  },
  // (the showcase's) the moonlit night: the tent glowing, Sophia's shadow on its laced door; the fog comes in from the
  // sea; the candle blurs, gutters and goes out
  candle_out: {
    from: () => ({ ...at('grandma', 'top'), ...at('sophia', 'inside'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, flap: 'shut', candle: 1, ...SHOTS.night }),
    run: async s => {
      s.tell('candle_out:glow');
      await s.wait(2.5);
      await s.move('fog', 0.8, { over: 6 });
      s.tell('candle_out:fog');
      await s.move('candle', 0, { over: 3, ease: 'in' });
      s.tell('candle_out:out');
      await s.wait(2);
    },
  },
  // 4.5 «go», «behind» — out of the white Grandmother comes down to the first stone, the lantern before her or none
  // (the fog and dark minigames' pose: the stones, her face)
  fog_way: {
    from: () => ({ ...at('grandma', 'top'), ...at('sophia', 'inside'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, flap: 'shut', ...SHOTS.fog }),
    run: async s => {
      if (s.get('lamp_hand')) s.person('grandma').with(['lantern']);
      await goTo(s, 'grandma', 'stone1');
      s.tell('fog_way:stone');
      await s.wait(1);
    },
  },
  // 4.5 «go», strength ≥ 2 — at the door she knocks three times (or stoops to it: «It's me»); a ready cut: Sophia has
  // thrown back the flap, her face up
  knock_in: {
    after: 'fog_way',
    from: () => ({ ...at('grandma', 'stone3'), ...at('sophia', 'inside'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, flap: 'shut', ...SHOTS.fog }),
    run: async s => {
      const gm = s.person('grandma');
      const knocks = s.get('knocks');
      glideTo(s, SHOTS.door, 3);
      await goTo(s, 'grandma', 'door');
      if (knocks) gm.reach({ r: 'tent_front#door' });
      const knock = gm.do(knocks ? 'knock' : 'put_down');
      s.tell('knock_in:knock');
      await knock;
      gm.reach(null);
      s.set('grandma_do', null);
      await s.wait(0.8);
      await cutTo(s, { flap: 'open', ...at('sophia', 'door', { sophia_do: loop('kneel'), sophia_look: 'grandma' }), grandma_look: 'sophia', ...SHOTS.door });
      s.tell('knock_in:open');
      await s.wait(2.5);
    },
  },
  // 4.5 «go» — she stoops in and sits beside her; Sophia lies down clutching her hand; the night goes toward dawn
  in_tent: {
    after: 'knock_in',
    from: () => ({
      ...at('grandma', 'door', { grandma_look: 'sophia' }), ...at('sophia', 'door', { sophia_do: loop('kneel'), sophia_look: 'grandma' }), ...at('papa', 'top'),
      papa_here: false, ...CAT_OFF, ...UP, ...SHOTS.door,
    }),
    run: async s => {
      const gm = s.person('grandma');
      const so = s.person('sophia');
      glideTo(s, SHOTS.in_tent, 3);
      gm.with(null);
      await s.all(goTo(s, 'sophia', 'lie', [], { rise: 'get_up', sit: 'lie_down' }), (async () => {
        await gm.do('put_down');
        await goTo(s, 'grandma', 'inside', [onTent(-0.1, -0.3), onTent(-0.15, 0.3)], { sit: 'sit_down' });
      })());
      so.reach({ l: 'grandma#hand_r' });
      gm.reach({ r: 'sophia#hand_l' });
      s.tell('in_tent:hand');
      await s.wait(3);
      await toDawn(s, 8);
      s.tell('in_tent:dawn');
      await s.wait(1.5);
    },
  },
  // 4.5 «go» — she cannot get up; Sophia runs up for Papa; he comes down with her, helps his mother out and leads her up
  // the stones by the arm
  fetch: {
    after: 'in_tent',
    from: () => ({
      ...at('grandma', 'inside', { grandma_reach: { r: 'sophia#hand_l' } }), ...at('sophia', 'lie', { sophia_reach: { l: 'grandma#hand_r' } }),
      ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, ...SHOTS.in_tent,
    }),
    run: async s => {
      const gm = s.person('grandma');
      const so = s.person('sophia');
      const papa = s.person('papa');
      so.reach(null);
      gm.reach(null);
      await gm.do('try_rise');
      gm.do('sit_stone', { loop: true });
      s.tell('fetch:cant');
      glideTo(s, SHOTS.stones, 3);
      await so.do('get_up');
      so.gait('run');
      s.move('fog', 0.35, { over: 10 });
      await goUp(s, 'sophia', [onTent(0.05, -0.3), onTent(-0.3, -0.9), S3, S2, S1]);
      so.gait(null);
      s.tell('fetch:run');
      await s.wait(2);
      papa.here(true);
      so.here(true);
      papa.gait('walk_fast');
      await s.all(goTo(s, 'papa', 'door', [S1, S2, S3]), goTo(s, 'sophia', 'tent', [S1, S2, S3]));
      papa.gait(null);
      s.tell('fetch:papa');
      await s.wait(2);
      papa.reach({ r: 'grandma#hand_r' });
      gm.reach({ r: 'papa#hand_r' });
      await gm.do('rise_slow');
      s.set('grandma_do', null);
      s.set('grandma_placed', 'door');
      s.set('grandma_at', 'door');
      gm.reach({ l: 'papa#hand_r' });
      papa.reach({ r: 'grandma#hand_l' });
      papa.gait('lead_walk');
      s.tell('fetch:home');
      so.walk([[S3[0] + 0.6, S3[1] - 0.4]]);
      await s.all(gm.walk([onTent(-0.6, -0.5), S3, S2]), papa.walk([onTent(-1.0, -0.6), beside(S3), beside(S2)]));
    },
  },
  // 4.5 «go», strength ≤ 1 — at the second stone everything spins: she sways and sits down on the halfway stone; «Stay
  // there! I'm here!»
  sit_half: {
    after: 'fog_way',
    from: () => ({ ...at('grandma', 'stone2'), ...at('sophia', 'inside'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, flap: 'shut', ...SHOTS.fog }),
    run: async s => {
      const gm = s.person('grandma');
      glideTo(s, SHOTS.half, 3);
      const sway = gm.do('sway');
      s.tell('sit_half:spin');
      await sway;
      await goTo(s, 'grandma', 'half', [], { sit: 'sit_down' });
      await s.wait(0.8);
      s.tell('sit_half:shout');
      await s.wait(2.5);
    },
  },
  // 4.5 «go», strength ≤ 1 — a ready cut from behind her: Sophia throws back the flap and comes out wrapped in her
  // blanket, up the stones to the voice, and finds her
  found: {
    after: 'sit_half',
    from: () => ({ ...at('grandma', 'half'), ...at('sophia', 'inside'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, flap: 'shut', ...SHOTS.half }),
    run: async s => {
      await cutTo(s, { flap: 'open', ...at('sophia', 'door', { sophia_do: null, sophia_with: ['blanket'], sophia_look: 'path#stone3' }), ...SHOTS.over_half });
      s.tell('found:out');
      await s.wait(1);
      await goTo(s, 'sophia', 'by_half', [onTent(-0.3, -0.7), S3]);
      glideTo(s, SHOTS.half_two, 2.5);
      s.person('grandma').look('sophia');
      s.tell('found:found');
      await s.wait(3);
    },
  },
  // 4.5 «go», strength ≤ 1, «Sophia knows» — she turns at once to the house; Grandmother catches her hand: «Not today.
  // Sit with me»; she sits down beside her
  turn_home: {
    after: 'found',
    from: () => ({
      ...at('grandma', 'half', { grandma_look: 'sophia' }), ...at('sophia', 'by_half', { sophia_with: ['blanket'] }), ...at('papa', 'top'),
      papa_here: false, ...CAT_OFF, ...UP, ...SHOTS.half_two,
    }),
    run: async s => {
      const so = s.person('sophia');
      const gm = s.person('grandma');
      await so.turn(face(PLACES.sophia.by_half.at, S1));
      so.look('path#stone1');
      s.tell('turn_home:turn');
      await so.walk([[-2.3, 9.45]]);
      gm.reach({ l: 'sophia#hand_r' });
      so.reach({ r: 'grandma#hand_l' });
      await s.wait(0.6);
      so.look('grandma');
      s.tell('turn_home:caught');
      await s.wait(3);
      so.reach(null);
      gm.reach(null);
      s.set('sophia_placed', 'by_half');
      await goTo(s, 'sophia', 'half', [], { sit: 'sit_down' });
      s.tell('turn_home:sat');
      await s.wait(1);
    },
  },
  // 4.5 «go», strength ≤ 1 — beside her under the blanket, hand in hand, she talks and talks; toward dawn
  till_dawn: {
    after: ['found', 'turn_home'],
    from: () => ({
      ...at('grandma', 'half', { grandma_look: 'sophia' }), ...at('sophia', 'by_half', { sophia_with: ['blanket'] }), ...at('papa', 'top'),
      papa_here: false, ...CAT_OFF, ...UP, ...SHOTS.half_two,
    }),
    run: async s => {
      const so = s.person('sophia');
      const gm = s.person('grandma');
      await goTo(s, 'sophia', 'half', [], { sit: 'sit_down' });
      await so.do('drape');
      so.with(['blanket_round']);
      gm.with(['blanket_round']);
      so.reach({ r: 'grandma#hand_l' });
      gm.reach({ l: 'sophia#hand_r' });
      so.do('talk_sitting', { loop: true });
      s.tell('till_dawn:talk');
      await toDawn(s, 9);
      s.tell('till_dawn:dawn');
      await s.wait(1.5);
    },
  },
  // 4.5 «go», strength ≤ 1 — Papa comes down fast out of the thinning white, finds them, lifts his mother by the arm and
  // leads her up, stopping twice; Sophia after them with the blanket
  papa_finds: {
    after: 'till_dawn',
    from: () => ({
      ...at('grandma', 'half', { grandma_look: 'sophia', grandma_with: ['blanket_round'], grandma_reach: { l: 'sophia#hand_r' } }),
      ...at('sophia', 'half', { sophia_with: ['blanket_round'], sophia_reach: { r: 'grandma#hand_l' } }), ...at('papa', 'top'),
      papa_here: false, ...CAT_OFF, ...UP, ...SHOTS.half_two,
    }),
    run: async s => {
      const papa = s.person('papa');
      const gm = s.person('grandma');
      const so = s.person('sophia');
      glideTo(s, SHOTS.over_half, 3);
      papa.here(true);
      papa.gait('walk_fast');
      const down = goTo(s, 'papa', 'half', [S1]);
      await s.wait(1.5);
      s.tell('papa_finds:come');
      await down;
      papa.gait(null);
      gm.look('papa');
      so.do('sit_ground', { loop: true });
      s.tell('papa_finds:found');
      await s.wait(2);
      so.reach(null);
      gm.reach({ r: 'papa#hand_r' });
      papa.reach({ r: 'grandma#hand_r' });
      await gm.do('rise_slow');
      gm.on(null);
      s.set('grandma_do', null);
      gm.with(null);
      so.with(['blanket']);
      papa.reach({ r: 'grandma#hand_l' });
      gm.reach({ l: 'papa#hand_r' });
      papa.gait('lead_walk');
      s.tell('papa_finds:home');
      glideTo(s, SHOTS.stones, 3);
      await so.do('get_up');
      s.set('sophia_do', null);
      const mid = [(SEATS.half[0] + S1[0]) / 2, (SEATS.half[1] + S1[1]) / 2];
      for (const g of [mid, S1]) {
        await s.all(arm(s, g, beside(g)), so.walk([[g[0] + 0.6, g[1] - 0.6]]));
        await s.wait(1.2);
      }
      s.set('grandma_placed', 'stone1');
      s.set('grandma_at', 'stone1');
    },
  },
  // 4.5 «lamp» — under the moon in the light fog Sophia sits at the thrown-back flap and looks up at the blurred patch
  // of the window (over her shoulder); her face close: she cries, whispers and lies down, or sits on, huddled
  flap_moon: {
    from: () => ({
      ...at('grandma', 'top'), ...at('sophia', 'door', { sophia_look: 'far_window#window' }), ...at('papa', 'top'), papa_here: false, ...CAT_OFF,
      ...UP, window: 1, ...SHOTS.flap_window,
    }),
    run: async s => {
      const so = s.person('sophia');
      await s.wait(1);
      s.tell('flap_moon:window');
      await s.wait(3);
      const night = s.get('sophia_night') ?? 'whisper';
      await cutTo(s, { sophia_look: [0.4, 3.6, 0.3], ...SHOTS.flap_face });
      if (night === 'cry') so.do('cry', { loop: true });
      if (night === 'whisper') so.do('whisper', { loop: true });
      s.tell('flap_moon:night');
      await s.wait(4);
      if (night === 'whisper') await goTo(s, 'sophia', 'lie', [], { rise: 'get_up', sit: 'lie_down' });
      else so.do('hug_knees', { loop: true });
      s.tell('flap_moon:down');
      await s.wait(2);
    },
  },
  // 4.5 «lamp», «behind», «gift» — out of the fog the wet cat comes over the rocks and lies down at the tent's door
  cat_fog: {
    after: ['flap_moon', 'behind_sit'],
    from: () => ({ ...at('grandma', 'top'), ...at('sophia', 'door'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, window: 1, ...SHOTS.flap_face }),
    run: async s => {
      s.set('cat_a', CAT.fog.at[0]);
      s.set('cat_d', CAT.fog.at[1]);
      s.set('cat_placed', 'fog');
      s.set('cat_at', 'fog');
      await catTo(s, 'door', 'lie', [onTent(1.15, 0.2)]);
      s.tell('cat_fog:lie');
      await s.wait(2);
    },
  },
  // 4.5 «lamp» — the morning: the fog thinning, Papa comes down the stones; out of the white Sophia comes up to meet him,
  // wet, by herself, and goes on past him up the path; he looks at the empty tent
  out_of_white: {
    from: () => ({ ...at('grandma', 'top'), ...at('sophia', 'door'), ...at('papa', 'top'), papa_here: true, ...CAT_OFF, ...UP, ...SHOTS.stones }),
    run: async s => {
      const papa = s.person('papa');
      s.move('fog', 0.4, { over: 8 });
      const down = papa.walk([S1, [S2[0] - 0.4, S2[1] + 0.1]]);
      s.tell('out_of_white:thin');
      await s.wait(1.5);
      const up = goTo(s, 'sophia', 'path', [onTent(-0.3, -0.8)], { rise: 'get_up' });
      await s.all(down, up);
      await papa.turn(face([S2[0] - 0.4, S2[1] + 0.1], S3));
      await s.person('sophia').walk([[S3[0] + 0.2, S3[1] + 0.5]]);
      s.tell('out_of_white:meet');
      papa.look('sophia');
      const past = goUp(s, 'sophia', [[S2[0] + 0.5, S2[1] - 0.1], S1]);
      await s.wait(1.5);
      papa.look('tent');
      await past;
      await s.wait(1);
    },
  },
  // 4.5 «behind» — at the last stone she gets her breath (weak: sits down on the stone by it a moment), goes round the
  // tent slowly and sits on the wet stone at its back, in her shawl; a ready cut from beyond the tent's back, her face
  // this way; Sophia inside, quiet
  behind_sit: {
    after: 'fog_way',
    from: () => ({ ...at('grandma', 'stone3'), ...at('sophia', 'inside'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, flap: 'shut', ...SHOTS.fog }),
    run: async s => {
      const gm = s.person('grandma');
      glideTo(s, SHOTS.round, 3);
      gm.look(null);
      const rest = gm.do('catch_breath');
      s.tell('behind_sit:rest');
      await rest;
      s.set('grandma_do', null);
      if (s.get('weak')) {
        await goTo(s, 'grandma', 'rest', [], { sit: 'sit_down' });
        await s.wait(3);
      }
      await goTo(s, 'grandma', 'behind', [ROUND], { rise: s.get('weak') ? 'rise_slow' : null, sit: 'sit_down' });
      await cutTo(s, SHOTS.behind_wide);
      s.tell('behind_sit:sat');
      await s.wait(2.5);
      s.tell('behind_sit:quiet');
      await s.wait(2.5);
    },
  },
  // 4.5 «behind» — Sophia inside talks aloud to herself; close on Grandmother listening, the canvas by her face; at the
  // end her palm comes up near the canvas (the knock minigame: tent_back#palm)
  alone_talk: {
    after: ['behind_sit', 'cat_fog'],
    from: () => ({ ...at('grandma', 'behind'), ...at('sophia', 'inside'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, flap: 'shut', ...SHOTS.behind_wide }),
    run: async s => {
      await cutTo(s, SHOTS.behind);
      s.person('sophia').do('talk_sitting', { loop: true });
      s.tell('alone_talk:talk');
      await s.wait(4);
      s.tell('alone_talk:mama');
      await s.wait(4);
      s.tell('alone_talk:three');
      await s.wait(2);
      s.person('grandma').reach({ r: 'tent_back#palm' });
      await s.wait(1.5);
    },
  },
  // 4.5 «behind» — toward dawn she gets up slowly holding the rock; the shawl slips off into the crevice and stays on its
  // ledge; she goes up the stones holding them, into the white
  before_dawn: {
    after: 'alone_talk',
    from: () => ({
      ...at('grandma', 'behind', { grandma_reach: { r: 'tent_back#palm' } }), ...at('sophia', 'inside'), ...at('papa', 'top'), papa_here: false,
      ...CAT_OFF, ...UP, flap: 'shut', ...SHOTS.behind,
    }),
    run: async s => {
      const gm = s.person('grandma');
      s.person('sophia').do('hug_knees', { loop: true });
      gm.reach(null);
      s.move('night', 0.6, { over: 12 });
      s.move('dawn', 0.4, { over: 12 });
      glideTo(s, SHOTS.behind_wide, 3);
      await gm.do('rise_slow');
      gm.on(null);
      s.set('grandma_do', null);
      s.tell('before_dawn:up');
      s.set('shawl', 'ledge');
      gm.wear({ garment: 'long_dress' });
      s.tell('before_dawn:shawl');
      await s.wait(1);
      glideTo(s, SHOTS.stones, 4);
      await goUp(s, 'grandma', [ROUND, S3, S2, S1]);
      s.tell('before_dawn:gone');
      await s.wait(1);
    },
  },
  // «The Tent» — the last morning: Papa takes hold of the peg: «The winter will carry it off» — «It won't. It's mine»;
  // Grandmother lays her palm on the canvas
  peg: {
    from: () => ({
      ...at('grandma', 'door', { grandma_look: 'papa' }), ...at('sophia', 'tent', { sophia_look: 'papa' }), ...at('papa', 'peg'), papa_here: true,
      ...CAT_OFF, ...UP, ...SHOTS.peg,
    }),
    run: async s => {
      const gm = s.person('grandma');
      await s.wait(1);
      s.tell('peg:peg');
      await s.wait(3.5);
      s.tell('peg:mine');
      await s.wait(3);
      gm.reach({ r: 'tent_front#door' });
      gm.look('tent_front#door');
      s.tell('peg:palm');
      await s.wait(2.5);
    },
  },
  // «The Tent» — he stands a long time, lets go of the peg and lays stones along the tent's edges, one by one
  // (`stones_laid`); he straightens up by it: «You'll winter with us…»
  weigh: {
    after: 'peg',
    from: () => ({
      ...at('grandma', 'door', { grandma_reach: { r: 'tent_front#door' }, grandma_look: 'tent_front#door' }), ...at('sophia', 'tent', { sophia_look: 'papa' }),
      ...at('papa', 'peg'), papa_here: true, ...CAT_OFF, ...UP, ...SHOTS.peg,
    }),
    run: async s => {
      const papa = s.person('papa');
      await s.wait(1.5);
      papa.reach(null);
      s.tell('weigh:let');
      await s.wait(1);
      papa.do('crouch', { loop: true });
      papa.look('stones_front');
      await s.move('stones_laid', 0.3, { over: 3 });
      s.set('papa_do', null);
      await papa.walk([onTent(1.15, 0.35)]);
      await papa.turn(tentTurn(270));
      papa.do('crouch', { loop: true });
      papa.look('stones_side');
      await s.move('stones_laid', 1, { over: 5 });
      s.set('stones', true);
      s.tell('weigh:stones');
      s.set('papa_do', null);
      await papa.walk([onTent(0.2, -1.3)]);
      await papa.turn(face(onTent(0.2, -1.3), PLACES.grandma.door.at));
      papa.look('grandma');
      s.tell('weigh:winter');
      await s.wait(3);
    },
  },
  // «The Tent», the last frame — from the sea: the tent grey on the cape, its flaps beating; the fog closes over it
  tent_shot: {
    from: () => ({ ...at('grandma', 'top'), ...at('sophia', 'top'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, ...view('sea') }),
    run: async s => {
      await s.wait(2);
      s.tell('tent_shot:flap');
      await s.wait(2);
      await s.move('fog', 0.85, { over: 7 });
      s.tell('tent_shot:white');
      await s.wait(1);
    },
  },
  // «The Shawl on the Stone», the last frame — from the sea, near: the grey patch on the ledge over the water; the fog
  // closes
  shawl_shot: {
    from: () => ({ ...at('grandma', 'top'), ...at('sophia', 'top'), ...at('papa', 'top'), papa_here: false, ...CAT_OFF, ...UP, ...SHOTS.shawl }),
    run: async s => {
      await s.wait(1.5);
      s.tell('shawl_shot:patch');
      await s.wait(2.5);
      await s.move('fog', 0.85, { over: 7 });
      s.tell('shawl_shot:white');
      await s.wait(1);
    },
  },
};

// the play's keys the showcase gives each piece (in a game the game gives them)
const DUSK = { dawn: 0, dusk: 1, night: 0, late: 1, fog: 0 };
const NIGHT = { dawn: 0, dusk: 0, night: 1, late: 1 };
const SHOW = {
  pitch: { ...DUSK, lean: 0.5, grandma_here: true, sophia_here: true, shawl: 'none', stones: false },
  goodnight: { night: 0.3 },
  candle_out: { ...NIGHT, fog: 0.3, grandma_here: false, sophia_here: true },
  fog_way: { ...NIGHT, fog: 0.85, grandma_here: true, lamp_hand: false },
  behind_sit: { weak: true },
  flap_moon: { ...NIGHT, fog: 0.5, grandma_here: false, sophia_night: 'whisper' },
  peg: { dawn: 1, dusk: 0, night: 0, late: 1, fog: 0.6, grandma_here: true, sophia_here: true },
  tent_shot: { grandma_here: false, sophia_here: false, fog: 0.6 },
  shawl_shot: { fog: 0.6 },
};
function setAll(s, values) {
  for (const k in values) s.set(k, values[k]);
}
const SHOWFILM = Object.fromEntries(Object.entries(FILM).map(([k, b]) => [k, {
  ...b,
  from: () => ({ ...(SHOW[k] ?? {}), ...b.from() }),
  run: async s => {
    setAll(s, SHOW[k] ?? {});
    await b.run(s);
  },
}]));

return {
  WATER, coast, ground, shore, sm, edge, glow, tentSlope, tentShown, TENT, onTent, tentTurn, SEATS, SEAT_TOP, PLACES, CAT,
  VIEWS, SHOTS, FILM, SHOWFILM,
};
