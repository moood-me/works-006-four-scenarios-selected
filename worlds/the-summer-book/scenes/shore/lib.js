// «The Shore by the House» — the land's shape (relief.js reads it) and what the paintings share. The island is one
// smooth granite back sloping into the sea: the water's edge runs from near the viewer's right away to the left, the
// rock rises gently inland to the grass, the house and the pines on the island's crown; past it the island ends and
// the sea goes on.
const { clamp } = anim;
// the sea's surface, metres (the viewer stands at 0 on the rock)
const WATER = -0.55;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
// the line the rock is laid along (where it is about half a metre over the sea), metres across at a distance
// (it bulges out round the house, 19 m ahead, where the island is broadest)
const coast = z => 2.4 - 0.2 * z + 1.6 * Math.exp(-(((z - 19) / 5) ** 2)) + 0.3 * Math.sin(1.1 * z + 1);
// the shelf: off the rock where the two stand, a level ledge of granite 0.72 m under the water, about two metres wide
// (between distances SHELF_Z0 and SHELF_Z1), and past it the deep — beyond three metres out the sea floor falls away
const SHELF = 0.72;
const SHELF_Z0 = 4.2;
const SHELF_Z1 = 7.6;
function raw(x, z) {
  const s = coast(z) - x;
  let h = -1.1 + 1.1 * sm((s + 2.5) / 5.7);
  h += 0.45 * sm((s - 4) / 10);
  h += 3.2 * sm((z - 18) / 16) * sm((s - 5) / 9);
  h += 0.12 * Math.sin(0.9 * x + 0.5 * z) * Math.sin(0.6 * z - 0.4 * x) * sm((s - 0.8) / 3.2);
  // the island ends: beyond 50 m ahead and 40 m to the left it goes down under the sea
  h -= 4.6 * sm((z - 48) / 14) + 4.6 * sm((-x - 38) / 12);
  // the shelf (its level set below, once ZERO is known) and the deep
  const m = sm((z - SHELF_Z0) / 0.8) * sm((SHELF_Z1 - z) / 0.8) * sm((0.1 - s) / 0.5) * sm((s + 3.1) / 0.4);
  return h * (1 - m) + SHELF_AT * m - 2.6 * sm((-s - 2.6) / 1.4) * (1 - m);
}
let SHELF_AT = 0;
const ZERO = raw(0, 0);
SHELF_AT = WATER - SHELF + ZERO;
const ground = (x, z) => raw(x, z) - ZERO;
// where the sea meets the rock at a distance: metres across (the rock falls toward the sea along x there)
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
for (let z = -4; z <= 60; z += 0.4) edge.push([shore(z), z]);
// the people's places (the island's places(): `<id>_at` names one) — where each stands, facing, and what they look at
// and reach for there; the approved look's: Grandmother and Sophia at the water's edge hand in hand, Papa on the grass
const PLACES = {
  grandma: {
    water: { at: [0.2, 4.0], turn: 150, look: [8, 5, 0.2], reach: { l: 'sophia#hand_r' } },
    ledge: { at: [0.15, 5.55], turn: 110, look: 'rock#shelf' },
    warm: { at: [-0.8, 6.0], turn: 150, on: [-0.8, 6.3, 0.3], do: 'sit_stone' },
    warm_back: { at: [-0.8, 6.0], turn: 20, on: [-0.8, 6.3, 0.3], do: 'sit_stone' },
    edge_sit: { at: [0.55, 5.1], turn: 120, on: [0.65, 5.25, 0.15], do: 'sit_stone', look: 'rock#shelf' },
    path: { at: [-3.4, 8.8], turn: 160 },
    gate: { at: [-3.3, 11.2], turn: 170 },
    porch: { at: [-6.9, 13.3], turn: 180 },
    peonies: { at: [-7.5, 13.9], turn: 195 },
    pier: { at: [7.2, 16.0], turn: 95, look: 'rowboat#gunwale' },
    net: { at: [-1.05, 14.1], turn: 200, on: [-1.05, 14.4, 0.38], do: 'sit_stone', look: 'papa' },
    stone: { at: [-3.06, 11.6], turn: 190, on: [-3.06, 11.9, 0.42], do: 'sit_stone' },
    chair: { at: [-3.7, 11.2], turn: 250, look: 'chair#back' },
    landing: { at: [-6.25, 13.95], turn: 200 },
    pier_back: { at: [5.2, 16.0], turn: 95 },
    pier_root: { at: [-0.4, 15.7], turn: 200 },
    graves: { at: [-2.4, 9.1], turn: 110, on: [-2.4, 9.3, 0.22], do: 'sit_stone', look: 'graves#pit' },
    gangway: { at: [-4.1, 26.5], turn: 120, look: 'gangway#rail' },
    step: { at: [-6.35, 13.4], turn: 200, on: [-6.35, 13.62, 0.2], do: 'sit_stone' },
    knee: { at: [1.45, 5.6], turn: 230, look: 'sophia' },
    dinghy: { at: [1.6, 14.6], turn: 90, on: { on: 'dinghy', at: [-0.75, 0.25, 0.3] }, do: 'sit_stone' },
  },
  sophia: {
    water: { at: [0.68, 4.27], turn: 150, look: 'grandma', reach: { r: 'grandma#hand_l' } },
    edge: { at: [1.0, 5.5], turn: 110, look: 'rock#shelf' },
    shelf: { at: [2.6, 5.8], turn: 230, look: 'grandma' },
    warm: { at: [-0.45, 5.75], turn: 170, do: 'hug_knees' },
    edge_sit: { at: [0.95, 5.65], turn: 120, do: 'hug_knees' },
    graves: { at: [-1.3, 8.8], turn: 230, look: 'graves#pit' },
    pier_edge: { at: [6.6, 15.55], turn: 110, look: 'rowboat#gunwale' },
    landing: { at: [-5.8, 13.95], turn: 200 },
    step_by: { at: [-6.0, 13.3], turn: 200, on: [-5.95, 13.6, 0.2], do: 'seated' },
    pier_sit: { at: [2.5, 15.5], turn: 110, do: 'hug_knees' },
    pier_root: { at: [-0.9, 15.4], turn: 200 },
    bundle: { at: [-3.9, 25.6], turn: 20, on: [-3.9, 25.8, 0.35], do: 'seated', look: 'grandma' },
    porch: { at: [-6.2, 13.4], turn: 200 },
    pier: { at: [6.5, 16.0], turn: 95, look: 'rowboat#gunwale' },
    gangway: { at: [-4.6, 26.1], turn: 120 },
    dinghy: { at: [1.6, 14.6], turn: 270, on: { on: 'dinghy', at: [0.05, 0.25, 0.3] }, do: 'seated' },
  },
  papa: {
    lawn: { at: [-3, 8], turn: 150, look: 'grandma', reach: { r: [-2.893, 7.715, 1.15], l: [-2.807, 7.765, 1.15] } },
    veranda: { at: [-8.29, 16.85], turn: 165 },
    porch: { at: [-6.0, 13.0], turn: 170 },
    pier: { at: [1.0, 15.95], turn: 120 },
    net: { at: [-2.15, 14.1], turn: 160, on: [-2.15, 14.4, 0.4], do: 'seated', look: 'net#knot' },
    door_in: { at: [-6.05, 14.15], turn: 200 },
    landing_rail: { at: [-6.5, 14.2], turn: 270, reach: { r: 'porch#rail' } },
    step: { at: [-5.95, 13.3], turn: 200, on: [-5.95, 13.6, 0.2], do: 'seated' },
    step_by: { at: [-5.6, 13.2], turn: 230, look: 'grandma' },
    step_by_stand: { at: [-5.6, 13.2], turn: 230, look: 'grandma' },
    pier_root: { at: [-0.2, 15.9], turn: 200 },
    gangway: { at: [-3.4, 26.8], turn: 110 },
    dinghy: { at: [1.6, 14.6], turn: 90, on: { on: 'dinghy', at: [0.8, 0.25, 0.3] }, do: 'seated' },
  },
};
// the cat's places (cat_at): [across, distance, elevation over the land] and which way he faces (1 right, −1 left) —
// on the porch's landing, lying on its rail, on the path above the rock (where he comes from), on the rock past the
// two of them, and away behind the juniper by the path (where he goes out of sight)
const CAT = {
  away: { at: [-2.4, 12.3, 0], dir: -1 },
  porch: { at: [-6.09, 13.97, 0.62], dir: 1 },
  rail: { at: [-6.87, 14.53, 1.48], dir: 1 },
  path: { at: [-2.6, 7.9, 0], dir: 1 },
  past: { at: [1.0, 9.4, 0], dir: 1 },
};
// Eriksson's boat: from far out on the right, out of sight (rowboat 0), along the shore to the pier's end (1)
const ROWBOAT = [[70, 30], [30, 19], [10.6, 14.9]];
// the dinghy: moored by the pier's root; its circles before the rock (centre, radius); its way out along the shore
// to the gangway (dinghy_at 0 → 1)
const DINGHY = { moored: [1.6, 14.6, 180], circle: [4.0, 12.0, 1.5], out: [[1.6, 14.6], [2.8, 19], [2.4, 23], [-0.6, 26.2]] };
// the sea's mirror on a still day (the island's weather moves it by the storm and the calm)
const MIRROR = { strength: 0.5, rough: 0.1, ripple: 0.1 };

// ── the pieces (stage 5: notes.md «Pieces»; played by the world's `beats`) ──────────────────────────────
// where things are that the pieces walk people to (metres: across, distance)
const SPOT = {
  door: [-6.05, 14.25], landing: [-6.1, 13.97], foot: [-6.45, 13.25], peonies: [-5.9, 13.3],
  above: [-1.6, 7.4], edge: [0.6, 5.2], water: [0.2, 4.0], path_mid: [-3.4, 9.6], gate: [-3.6, 11.3],
  pier_root: [-0.6, 15.6], pier_mid: [3.0, 16.0], pier_end: [7.2, 16.0], by_boat: [-1.2, 14.0],
  shore_a: [-1.6, 17], shore_b: [-2.6, 21], shore_c: [-3.6, 24.5], gangway: [-4.1, 26.5],
};
// Papa coming down from the door / the veranda to the rock
const PAPA_DOWN = [[-6.0, 13.0], [-4.6, 10.6], [-3.0, 8.0], [-0.3, 5.8]];
const turnTo = (a, d, a2, d2) => (Math.atan2(a2 - a, d2 - d) * 180 / Math.PI + 360) % 360;
// a person's keys at a place of lib.PLACES (or at [across, distance], facing `turn`), with more of their keys over it
// (a raw position leaves `<id>_at` as it is: the island's places() puts them only when it changes)
function AT(id, at, more = {}) {
  const named = typeof at === 'string';
  const p = named ? PLACES[id][at] : { at, turn: more[`${id}_turn`] ?? more.turn ?? 180 };
  const { turn, ...rest } = more;
  return {
    ...(named ? { [`${id}_at`]: at, [`${id}_placed`]: at } : {}),
    [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_turn`]: p.turn, [`${id}_look`]: p.look ?? null, [`${id}_reach`]: p.reach ?? null,
    [`${id}_on`]: p.on ?? null, [`${id}_do`]: p.do ?? null, [`${id}_with`]: null, [`${id}_wear`]: null, [`${id}_gait`]: null, ...rest,
  };
}
// the camera: the scene's own view; the operator on someone (a shot), their point at `frame` of the frame
const VIEW = { camera_target: null, camera_shot: null, camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_yaw: 0,
  camera_h: 0, camera_look: 0 };
const SHOT = (target, shot = 'medium', frame = [0.5, 0.45], glide = 1.5) => ({ ...VIEW, camera_target: target, camera_shot: shot,
  camera_frame: frame, camera_glide: glide });
// the scene's camera brought nearer one at p: `dist` metres from them along the line the viewer sees them by, turned
// to them, `h` metres lower, the gaze lowered `look` screen heights
const NEAR = ([a, d], dist, h = 0, look = 0) => {
  const l = Math.hypot(a, d);
  const k = Math.max(0, 1 - dist / l);
  return { ...VIEW, camera_x: a * k, camera_z: d * k, camera_yaw: Math.atan2(a, d) * 180 / Math.PI, camera_h: -h, camera_look: look };
};
// the camera at [x, z] (from the start), turned `yaw` (degrees, + right): out over the water looking in at the island
const OFF = (x, z, yaw, h = 0) => ({ ...VIEW, camera_x: x, camera_z: z, camera_yaw: yaw, camera_h: h });
// the porch from the grass on its right (the gate stands on the line from the start: the camera keeps clear of it):
// the step and the landing, wide and near
const PORCH = { ...OFF(-2.8, 12.2, -74, 0), camera_look: 0.03 };
const PORCH_NEAR = { ...OFF(-4.3, 12.8, -78, -0.25), camera_look: 0.06 };
// the shore path to the big boat, from the water; the dinghy by the pier, from the water
const PATH_CAM = { ...OFF(1.0, 20.5, -75, 0.2), camera_look: 0.02 };
// the last stretch of the path to the gangway's foot, from the water (the short walks)
const GANGWAY_CAM = { ...OFF(1.0, 20.5, -50, 0.2), camera_look: 0.02 };
const DINGHY_CAM = { ...OFF(2.6, 12.4, -20, 0.1), camera_look: 0.05 };
// the calm's pebble: Grandmother sitting turned along the shore, seen from ahead of her (her face, the glass water)
const PEBBLE_CAM = { ...OFF(0.1, 9.4, -165, -0.25), camera_look: 0.1 };
const CAM = ['camera_x', 'camera_z', 'camera_yaw', 'camera_h', 'camera_look'];
// a line's time, roughly as the game's voice takes it (0.3 s and 0.06 a letter) — the pieces leave it
const SAY = (...lines) => lines.reduce((t, l) => t + 0.3 + 0.06 * l.length, 0);

function film(scene) {
  const get = k => scene.get(k);
  // (her shawl lost behind the tent — «За палаткой», «Платок»: she is in the dress alone from then on)
  const ATS = (id, at, more = {}) => AT(id, at, id === 'grandma' && get('shawl_lost') ? { grandma_wear: { garment: 'long_dress' }, ...more } : more);
  // the camera moved there over seconds (its own keys; a shot's target let go first); cut to a shot made ready
  const dolly = (s, cam, over = 2.5) => {
    s.set('camera_target', null);
    return s.all(...CAM.map(k => s.move(k, cam[k] ?? 0, { over })));
  };
  const frame = (s, values) => {
    for (const k of CAM) s.set(k, 0);
    for (const [k, v] of Object.entries(values)) s.set(k, v);
  };
  const cutTo = async (s, values) => {
    const shot = s.shot(values);
    await s.until(() => shot.ready);
    shot.cut();
  };
  // walk one along points at their gait (steps), then turn
  const go = async (s, id, pts, turn = null, gait = null) => {
    const p = s.person(id);
    if (gait) p.gait(gait);
    await p.walk(pts);
    if (gait) p.gait(null);
    if (turn != null) await p.turn(turn);
  };
  // put one at a place of PLACES (set at once, as the place says)
  const put = (s, id, at) => {
    for (const [k, v] of Object.entries(ATS(id, at, Array.isArray(at) ? { turn: get(`${id}_turn`) } : {}))) s.set(k, v);
  };
  // 12: walk to a place (steps), then be there as the place says (sat down, turned)
  const settle = async (s, id, at, gait = null) => {
    await go(s, id, [PLACES[id][at].at], null, gait);
    put(s, id, at);
  };
  const tell = async (s, moment, wait = 0) => {
    s.tell(moment);
    if (wait) await s.wait(wait);
  };
  return {
    // ── Prologue ──
    peonies: {
      from: () => ({ ...(PORCH), stems: 0, sophia_here: false,
        ...ATS('grandma', 'step', { grandma_reach: { r: 'peony:2#stems' }, grandma_look: 'peony:2#stems' }) }),
      run: async s => {
        await s.wait(1.5);
        await tell(s, 'peonies:start', SAY('This spring Sophia’s mother died. That summer, as always, they lived on the island: Papa, Sophia and Grandmother'));
        await dolly(s, PORCH_NEAR, 3);
        await tell(s, 'peonies:hand', 1.5);
      },
    },
    teeth: {
      after: 'peonies',
      from: () => ({ ...(PORCH_NEAR), ...ATS('grandma', 'step') }),
      run: async s => {
        const gm = s.person('grandma');
        gm.reach(null);
        await tell(s, 'teeth:glint', 1.5);
        put(s, 'sophia', [SPOT.door[0], SPOT.door[1]]);
        s.set('sophia_turn', 200);
        await go(s, 'sophia', [SPOT.landing], 200);
        s.person('sophia').look('grandma');
        gm.look('sophia');
        await tell(s, 'teeth:porch', SAY('What are you doing?', 'Looking for my teeth'));
        await tell(s, 'teeth:found', SAY('Found them', 'Show me'));
        s.set('teeth_show', 0);
        s.set('teeth_open', 1);
        await s.move('teeth_show', 1, { over: 2.5 });
        await tell(s, 'teeth:in', 1.5);
        s.set('teeth_open', 0);
        await cutTo(s, SHOT('sophia', 'close', [0.42, 0.42], 0));
        await tell(s, 'teeth:ask', SAY('When will you die?', 'Soon. But that is not the least concern of yours', 'Why?') + 0.5);
        await cutTo(s, SHOT('grandma', 'medium', [0.5, 0.45], 0));
        gm.reach({ r: 'porch#rail' });
        await gm.do('rise_slow');
        put(s, 'grandma', PLACES.grandma.step.at);
        await settle(s, 'grandma', 'porch', 'old_walk');
        await tell(s, 'teeth:up', SAY('Let’s go down to the water'));
      },
    },
    ledge: {
      from: () => ({ ...VIEW, rings: 0, ...ATS('grandma', SPOT.above, { turn: 140 }), ...AT('sophia', [-1.0, 7.0], { turn: 140 }) }),
      run: async s => {
        await s.all(go(s, 'sophia', [[0.4, 6.0], [1.0, 5.5]], 110), go(s, 'grandma', [[-0.3, 6.0], SPOT.edge], 115));
        put(s, 'sophia', 'edge');
        put(s, 'grandma', 'ledge');
        await cutTo(s, NEAR([0.6, 5.5], 2.8, 0.1, 0.18));
        await tell(s, 'ledge:edge', SAY('I want to see where the bottom is'));
      },
    },
    wrist: {
      after: 'ledge',
      from: () => ({ ...NEAR([0.6, 5.5], 2.8, 0.1, 0.18), pull: 0, ...ATS('grandma', 'ledge'), ...AT('sophia', 'edge') }),
      run: async s => {
        await s.person('sophia').do('lean_over');
        s.person('grandma').reach({ r: 'sophia#hand_l' });
        await cutTo(s, NEAR([0.6, 5.5], 2.4, 0.2, 0.22));
        await tell(s, 'wrist:bottom', 1);
      },
    },
    wrist_after: {
      after: 'wrist',
      from: () => ({ ...NEAR([0.6, 5.5], 2.4, 0.2, 0.06), ...ATS('grandma', 'ledge', { grandma_reach: { r: 'sophia#hand_l' } }), ...AT('sophia', 'edge') }),
      run: async s => {
        const gm = s.person('grandma');
        const so = s.person('sophia');
        so.mood('angry');
        await tell(s, 'wrist_after:free', SAY('Let go! I can do it myself!'));
        gm.reach(null);
        await go(s, 'sophia', [[0.3, 5.9]], 250);
        await so.do('stamp');
        await tell(s, 'wrist_after:stamp', SAY('I hate you!') + 1.5);
        await settle(s, 'grandma', 'edge_sit');
        await settle(s, 'sophia', 'edge_sit');
        await dolly(s, NEAR([0.8, 5.4], 2.4, 0.6, 0.1), 2);
        await tell(s, 'wrist_after:sat', SAY('Don’t stick to me. It’s hot') + 2);
        gm.reach({ l: 'sophia#hand_r' });
        so.reach({ r: 'grandma#hand_l' });
        so.mood('neutral');
        await tell(s, 'wrist_after:hand', 3);
      },
    },
    shoulder: {
      after: 'ledge',
      from: () => ({ ...NEAR([0.6, 5.5], 2.8, 0.1, 0.18), let: 0, ...ATS('grandma', 'ledge'), ...AT('sophia', 'edge') }),
      run: async s => {
        s.person('grandma').reach({ r: 'sophia#shoulder_r' });
        await cutTo(s, NEAR([0.6, 5.5], 2.4, 0.15, 0.2));
      },
    },
    slip: {
      after: 'shoulder',
      from: () => ({ ...NEAR([0.8, 5.4], 2.6, 0.15, 0.05), ...ATS('grandma', 'ledge'), ...AT('sophia', 'edge') }),
      run: async s => {
        const so = s.person('sophia');
        s.person('grandma').reach(null);
        await go(s, 'sophia', [[1.6, 5.7], PLACES.sophia.shelf.at], 230);
        put(s, 'sophia', 'shelf');
        s.set('splash', (get('splash') ?? 0) + 1);
        await tell(s, 'slip:in', 1.5);
        so.mood('laugh');
        await dolly(s, NEAR(PLACES.sophia.shelf.at, 3.2, -0.1, 0.06), 2);
        await tell(s, 'slip:laugh', 2.5);
        s.set('tremble_open', 1);
        await tell(s, 'slip:hands', 3);
        s.set('tremble_open', 0);
      },
    },
    down: {
      after: 'ledge',
      from: () => ({ ...NEAR([0.6, 5.5], 2.8, 0.1, 0.18), step: 0, ...ATS('grandma', 'ledge'), ...AT('sophia', 'edge') }),
      run: async s => {
        await cutTo(s, NEAR([0.6, 5.5], 2.8, 0.1, 0.24));
      },
    },
    down_after: {
      after: 'down',
      from: () => ({ ...NEAR([0.9, 5.4], 3.2, 0.2, 0.06), ...ATS('grandma', 'knee'), ...AT('sophia', 'edge'), ...AT('papa', SPOT.door, { turn: 200 }) }),
      run: async s => {
        const so = s.person('sophia');
        put(s, 'papa', SPOT.door);
        s.set('papa_turn', 200);
        await settle(s, 'sophia', 'shelf');
        so.mood('laugh');
        await tell(s, 'down_after:you', SAY('You too!') + 1);
        await settle(s, 'grandma', 'edge_sit');
        s.person('grandma').mood('tired');
        await tell(s, 'down_after:sat', 2);
        await s.all(dolly(s, VIEW, 3), go(s, 'papa', PAPA_DOWN.concat([[0.25, 5.6]]), 120));
        s.person('papa').reach({ r: 'grandma#hand_r' });
        await tell(s, 'down_after:hand', SAY('Myself') + 0.5);
        s.person('papa').reach(null);
        await s.person('grandma').do('rise_slow');
        put(s, 'grandma', SPOT.edge);
        await settle(s, 'grandma', 'ledge');
        await tell(s, 'down_after:up', 2);
      },
    },
    // ── Chapter I ──
    eriksson: {
      from: () => ({ ...NEAR(SPOT.pier_end, 6, 0, 0.02), rowboat: 0, eriksson_here: true,
        ...ATS('grandma', 'pier'), ...AT('sophia', get('skirt') ? 'pier' : 'pier_edge', get('skirt') ? { sophia_reach: { r: 'grandma#hips' } } : {}) }),
      run: async s => {
        await s.move('rowboat', 1, { over: 12, ease: 'out' });
        await tell(s, 'eriksson:in', 1);
        await tell(s, 'eriksson:post', SAY('You’ve got old', 'And you haven’t?', 'Me too. Get in, we’ll go out to the nets. Like before'));
        s.person('grandma').reach({ r: 'rowboat#gunwale', l: 'rowboat#gunwale' });
        s.person('grandma').look([20, 30, 1]);
        await cutTo(s, SHOT('grandma', 'medium', [0.42, 0.42], 0));
        await tell(s, 'eriksson:gunwale', 3);
        s.person('grandma').look([7.4, 15.6, -0.3]);
        await tell(s, 'eriksson:knees', SAY('Some other time'));
        s.set('eriksson_look', get('skirt') ? 'sophia' : 'grandma#hands');
        await cutTo(s, { ...OFF(8.4, 12.6, 50, 0.1), camera_look: 0.03 });
        await tell(s, 'eriksson:look', SAY('Don’t hold your girl back'));
        s.person('grandma').reach({ r: 'rowboat#gunwale' });
        await cutTo(s, SHOT('grandma#hand_r', 'medium', [0.5, 0.52], 0));
      },
    },
    eriksson_off: {
      after: 'eriksson',
      from: () => ({ ...NEAR(SPOT.pier_end, 6, 0, 0.02), rowboat: 0.85, eriksson_here: true, ...ATS('grandma', 'pier'),
        ...AT('sophia', get('skirt') ? 'pier' : 'pier_edge') }),
      run: async s => {
        s.person('grandma').reach(null);
        s.set('eriksson_look', null);
        if (get('oar')) {
          s.person('eriksson').reach({ r: 'pier#end' });
          await s.wait(1.2);
          s.person('eriksson').reach(null);
        }
        await dolly(s, NEAR(SPOT.pier_end, 7.5, 0, 0.02), 2);
        await s.move('rowboat', 0, { over: 12, ease: 'in' });
        await tell(s, 'eriksson_off:gone', 0.5);
        s.set('eriksson_here', false);
        s.person('sophia').look('grandma');
        await cutTo(s, SHOT('sophia', 'medium', [0.5, 0.45], 0));
        await tell(s, 'eriksson_off:ask', SAY('What did he say?', 'That he’s old'));
      },
    },
    shell: {
      from: () => ({ ...(PORCH), shell: false, ...ATS('grandma', SPOT.foot, { turn: 30, grandma_with: ['cigarette'] }),
        ...AT('papa', 'veranda', { papa_look: 'grandma', papa_do: 'write' }) }),
      run: async s => {
        await s.wait(1);
        s.set('shell', true);
        await tell(s, 'shell:shell', 3);
        await cutTo(s, SHOT('papa', 'close', [0.55, 0.45], 0));
        await tell(s, 'shell:look', 4);
      },
    },
    nets: {
      from: () => ({ ...NEAR(SPOT.by_boat, 4.5, 0.3, 0.04), net: true, knot: 0, ...AT('papa', 'net'),
        ...ATS('grandma', [-3.0, 11.6], { turn: 160, grandma_with: ['mug'] }) }),
      run: async s => {
        await go(s, 'grandma', [[-1.9, 13.2], [-1.4, 13.7]], 300);
        s.person('grandma').with(null);
        s.person('papa').with(['mug']);
        await tell(s, 'nets:coffee', 1.5);
        await settle(s, 'grandma', 'net');
        await s.wait(1.5);
        await tell(s, 'nets:sat', SAY('Mamma. Tell me, if anything', 'I’m not going to be the last to know any more') + 1.5);
        s.person('papa').with(null);
        // the choice's pose: the two faces from before them (they sit facing the start), aimed between them
        s.person('grandma').look(null);
        await cutTo(s, NEAR([-1.6, 14.25], 3.4, 0.35, 0.1));
      },
    },
    nets_say: {
      after: 'nets',
      from: () => ({ ...NEAR(SPOT.by_boat, 3.6, 0.4, 0.05), net: true, ...AT('papa', 'net'), ...ATS('grandma', 'net') }),
      run: async s => {
        s.person('papa').with(['mug']);
        await s.person('papa').do('drink');
        s.person('papa').with(null);
        s.person('grandma').with(['mug']);
        await tell(s, 'nets_say:cup', 2.5);
      },
    },
    nets_nothing: {
      after: 'nets',
      from: () => ({ ...NEAR(SPOT.by_boat, 3.6, 0.4, 0.05), net: true, ...AT('papa', 'net'), ...ATS('grandma', 'net') }),
      run: async s => {
        s.person('papa').do('untangle_fast', { loop: true });
        await tell(s, 'nets_nothing:fast', SAY('All right') + 2);
        await s.person('grandma').do('rise_slow');
        put(s, 'grandma', [-1.05, 14.0]);
        await go(s, 'grandma', [[-1.9, 13.0], [-3.0, 11.4]], 200);
        s.person('papa').look('grandma');
        await tell(s, 'nets_nothing:watch', 3);
      },
    },
    net: {
      after: 'nets',
      from: () => ({ ...NEAR(SPOT.by_boat, 3.6, 0.4, 0.05), net: true, knot: 0, ...AT('papa', 'net'), ...ATS('grandma', 'net') }),
      run: async s => {
        s.person('grandma').reach({ r: 'net#knot', l: 'net#knot' });
        s.person('grandma').look('net#knot');
        await cutTo(s, SHOT('net#knot', 'medium', [0.5, 0.5], 0));
      },
    },
    net_after: {
      after: 'net',
      from: () => ({ ...NEAR(SPOT.by_boat, 3.6, 0.4, 0.05), net: true, knot: 1, ...AT('papa', 'net'),
        ...ATS('grandma', 'net', { grandma_reach: { r: 'net#knot', l: 'net#knot' } }) }),
      run: async s => {
        await dolly(s, NEAR(SPOT.by_boat, 3.6, 0.4, 0.05), 1.5);
        if (get('net_self')) s.person('grandma').reach(null);
        await tell(s, 'net_after:together', 3);
        s.person('papa').look('grandma');
        await tell(s, 'net_after:thanks', SAY('Thank you, Mamma'));
        s.person('papa').look('net#knot');
        await tell(s, 'net_after:ask', SAY('So you’ll tell me, if anything?') + 2);
        s.person('grandma').reach(null);
        await tell(s, 'net_after:alone', 3);
      },
    },
    // ── Chapter II ──
    calm: {
      from: () => ({ ...NEAR([-0.4, 6.4], 4.2, 0.4, 0.05), rings: 0, cat_at: 'path', cat_placed: 'path', cat_a: -2.6, cat_d: 7.9, cat_e: 0, cat_pose: 'sit',
        cat_dir: 1, ...ATS('grandma', 'warm'), ...AT('sophia', 'warm') }),
      run: async s => {
        const so = s.person('sophia');
        await s.wait(2);
        s.set('cat_pose', 'walk');
        s.set('cat_at', 'past');
        so.look('cat#cat');
        await tell(s, 'calm:cat', 1.5);
        so.reach({ r: 'cat#back', l: 'cat#back' });
        await s.wait(1.5);
        so.reach(null);
        s.set('cat_at', 'away');
        await tell(s, 'calm:gone', SAY('Why doesn’t he love me? I feed him', 'What do you think?', 'Don’t ask back!', 'Then don’t ask me anything either!'));
        await s.until(() => Math.hypot((get('cat_a') ?? 0) - CAT.away.at[0], (get('cat_d') ?? 0) - CAT.away.at[1]) < 0.05);
        s.set('cat_pose', 'none');
        const gm = s.person('grandma');
        s.set('grandma_on', null);
        await gm.do('rise');
        put(s, 'grandma', PLACES.grandma.warm.at);
        await gm.turn(PLACES.grandma.warm_back.turn);
        await gm.do('sit_down');
        put(s, 'grandma', 'warm_back');
        await tell(s, 'calm:back', 2);
        s.set('grandma_with', ['pebble']);
        s.person('grandma').look([2.2, 7.6, -0.55]);
        // the pose of М4: her face from ahead along the shore, the water on her right, the pebble in her hand
        await cutTo(s, PEBBLE_CAM);
      },
    },
    calm_after: {
      after: 'calm',
      from: () => ({ ...PEBBLE_CAM, rings: 1, cat_pose: 'none', grandma_with: null, ...ATS('grandma', 'warm_back'), ...AT('sophia', 'warm') }),
      run: async s => {
        await dolly(s, NEAR([-0.4, 6.4], 4.2, 0.4, 0.05), 1.5);
        await tell(s, 'calm_after:still', 3);
        s.person('grandma').reach({ r: 'sophia#hand_l' });
        s.person('sophia').reach({ r: 'grandma#hand_r' });
        await s.wait(1.5);
        s.person('grandma').reach(null);
        s.person('sophia').reach(null);
        await s.person('sophia').do('throw');
        s.set('rings', (get('rings') ?? 0) + 1);
        await tell(s, 'calm_after:second', 3);
        s.person('sophia').look('far_roof#roof');
        s.person('grandma').look('far_roof#roof');
        await dolly(s, { ...VIEW, camera_yaw: -6, camera_look: -0.04 }, 3);
        await tell(s, 'calm_after:roof', SAY('Let’s climb in there!', 'At night. Some day', 'Promise?', 'We’ll see'));
        await dolly(s, NEAR([-0.4, 6.4], 4.2, 0.4, 0.05), 3);
        await tell(s, 'calm_after:silence', 10);
        await s.person('sophia').do('kneel_pray');
        s.person('sophia').do('kneeling', { loop: true });
        await tell(s, 'calm_after:pray', SAY('God, let something happen. Something big') + 1);
        await dolly(s, VIEW, 2);
        await s.person('grandma').do('rise_slow');
        put(s, 'grandma', [-0.8, 6.1]);
        await go(s, 'grandma', [[-2.6, 9.4], [-3.06, 11.5]], 190);
        put(s, 'grandma', 'stone');
        await tell(s, 'calm_after:stone', 2);
        await s.person('grandma').do('rise_slow');
        put(s, 'grandma', PLACES.grandma.stone.at);
        await go(s, 'grandma', [PLACES.grandma.gate.at], PLACES.grandma.gate.turn, 'old_walk');
        put(s, 'grandma', 'gate');
        put(s, 'papa', 'veranda');
        s.person('papa').look('grandma');
        await tell(s, 'calm_after:papa', 2);
        put(s, 'sophia', [-0.1, 6.8]);
        s.person('sophia').gait('run');
        await go(s, 'sophia', [[-2.8, 9.4], [-5.0, 12.4], SPOT.foot]);
        s.person('sophia').gait(null);
        await tell(s, 'calm_after:run', 1);
      },
    },
    graves: {
      from: () => ({ ...NEAR([-1.9, 9.4], 3.6, 0.5, 0.08), graves: 0, ...ATS('grandma', 'graves'), ...AT('sophia', 'graves') }),
      run: async s => {
        s.person('grandma').with(['knife', 'chip']);
        s.person('grandma').do('carve', { loop: true });
        await s.wait(3);
        s.person('grandma').with(null);
        s.set('graves', 1);
        await tell(s, 'graves:bird', 2);
        await tell(s, 'graves:song', 5);
        await tell(s, 'graves:here', SAY('Where is it now?', 'Here'));
        s.person('sophia').reach({ r: 'graves#pit' });
        await tell(s, 'graves:shell', 2);
        s.person('sophia').reach(null);
        for (const n of [2, 3, 4, 5]) {
          await cutTo(s, { ...NEAR([-1.9, 9.4], 3.6 - 0.2 * n, 0.5, 0.08), graves: n });
          if (n === 2) s.tell('graves:row');
          await s.wait(1.6);
        }
      },
    },
    cat_rail: {
      from: () => ({ ...(PORCH), cat_at: 'rail', cat_placed: 'rail', cat_a: -6.87, cat_d: 14.53, cat_e: 1.48,
        cat_pose: 'lie', cat_dir: 1 }),
      run: async s => {
        await s.wait(1.5);
        await tell(s, 'cat_rail:rail', 4);
      },
    },
    moon_path: {
      from: () => ({ ...VIEW, ...ATS('grandma', SPOT.foot, { turn: 150 }), ...AT('sophia', [-6.0, 13.1], { turn: 150, sophia_reach: { r: 'grandma#hand_l' } }) }),
      run: async s => {
        s.person('grandma').reach({ l: 'sophia#hand_r' });
        await s.all(go(s, 'grandma', [[-4.4, 10.4], [-2.0, 7.0], SPOT.water], 150), go(s, 'sophia', [[-3.9, 10.6], [-1.5, 7.2], PLACES.sophia.water.at], 150));
        put(s, 'grandma', 'water');
        put(s, 'sophia', 'water');
        s.person('grandma').look('sky#moon');
        await tell(s, 'moon_path:path', SAY('And Mama…', 'Look') + 1);
        await cutTo(s, SHOT('sophia', 'medium', [0.45, 0.45], 0));
        await s.person('grandma').do('drape');
        s.set('grandma_wear', { garment: 'long_dress' });
        s.set('sophia_with', ['shawl']);
        await tell(s, 'moon_path:shawl', 3);
        await cutTo(s, { ...(PORCH) });
        await tell(s, 'moon_path:veranda', 3);
      },
    },
    // ── Chapter III ──
    home_late: {
      from: () => ({ ...(PORCH), boat_out: true, ...ATS('grandma', SPOT.path_mid, { turn: 200 }),
        ...AT('sophia', [-3.0, 9.4], { turn: 200 }) }),
      run: async s => {
        await s.all(go(s, 'grandma', [[-5.2, 12.4], SPOT.foot], 200, 'old_walk'), go(s, 'sophia', [[-4.6, 12.4], [-5.8, 13.0]], 220));
        put(s, 'grandma', 'step');
        s.person('grandma').mood('tired');
        await tell(s, 'home_late:sat', 2.5);
        await cutTo(s, { ...VIEW, camera_yaw: 18, camera_look: -0.02 });
        await tell(s, 'home_late:lantern', 3);
        await cutTo(s, SHOT('sophia', 'medium', [0.5, 0.45], 0));
        s.person('sophia').mood('laugh');
        await tell(s, 'home_late:crazy', SAY('You’re crazy!', 'Yes'));
      },
    },
    step_beside: {
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step'), ...AT('papa', SPOT.door, { turn: 200 }) }),
      run: async s => {
        await go(s, 'papa', [SPOT.landing, [-5.9, 13.4]], 200);
        put(s, 'papa', 'step');
        await tell(s, 'step_beside:sat', 6);
        await s.person('grandma').do('rise_slow');
        put(s, 'grandma', 'porch');
        await tell(s, 'step_beside:up', 2);
      },
    },
    rail: {
      from: () => ({ ...(PORCH), gust: 0, ...ATS('grandma', SPOT.door, { turn: 200 }), ...AT('sophia', SPOT.door, { turn: 200 }),
        ...AT('papa', [-6.0, 14.9], { turn: 200 }) }),
      run: async s => {
        await s.all(go(s, 'grandma', [SPOT.landing], 200), go(s, 'sophia', [[-5.75, 13.95]], 200));
        put(s, 'grandma', 'landing');
        put(s, 'sophia', 'landing');
        await dolly(s, { ...PORCH, camera_h: PORCH.camera_h + 0.3 }, 1.5);
      },
    },
    rail_after: {
      after: 'rail',
      from: () => ({ ...(PORCH), ...ATS('grandma', 'landing'), ...AT('sophia', 'landing') }),
      run: async s => {
        await dolly(s, PORCH, 1.5);
        s.person('sophia').mood('laugh');
        await tell(s, 'rail_after:shriek', 2);
        await tell(s, 'rail_after:sky', SAY('It isn’t you. It’s the sky. Look at it') + 1);
        await tell(s, 'rail_after:creak', 2);
        if (get('knew')) {
          await settle(s, 'papa', 'door_in');
          s.set('papa_with', ['blanket_fold']);
          s.person('papa').look('grandma');
          await tell(s, 'rail_after:papa', SAY('Mamma. Indoors') + 2);
          await s.person('papa').do('drape');
          s.set('papa_with', null);
          s.set('grandma_with', ['blanket_round']);
          s.set('sophia_with', ['blanket_round']);
          await tell(s, 'rail_after:blanket', 2);
        } else {
          await dolly(s, PORCH_NEAR, 3);
        }
      },
    },
    circles: {
      from: () => ({ ...OFF(4.6, 9.4, -24, 0.2), weed: true, dinghy: 'circles', ...AT('sophia', 'dinghy'), ...AT('papa', 'pier'),
        ...ATS('grandma', 'step') }),
      run: async s => {
        await s.wait(4);
        await tell(s, 'circles:straight', 3);
        s.set('dinghy', 'moored');
        await s.until(() => Math.hypot((get('dinghy_a') ?? 0) - DINGHY.moored[0], (get('dinghy_d') ?? 0) - DINGHY.moored[1]) < 0.05);
        s.person('sophia').look('papa');
        await cutTo(s, { ...OFF(3.6, 11.6, -31, 0.2), camera_look: 0.04 });
        await tell(s, 'circles:tent', SAY('I want a tent. My own. To sleep on my own'));
        await cutTo(s, NEAR(PLACES.papa.pier.at, 3.2, 0, 0.02));
        s.set('papa_with', ['list']);
        s.person('papa').do('write', { loop: true });
        await tell(s, 'circles:list', SAY('I’ll order one') + 1);
        if (get('ask_back')) {
          s.person('sophia').look('grandma');
          await cutTo(s, DINGHY_CAM);
          await tell(s, 'circles:turn', SAY('And will you come?', 'We’ll see'));
        }
      },
    },
    // ── Chapter IV ──
    post: {
      from: () => ({ ...NEAR(SPOT.pier_end, 6, 0, 0.02), rowboat: 0, eriksson_here: true, ...ATS('grandma', 'pier'),
        ...AT('sophia', 'pier_edge'), ...AT('papa', 'veranda') }),
      run: async s => {
        await s.move('rowboat', 1, { over: 12, ease: 'out' });
        await tell(s, 'post:in', 1);
        s.person('sophia').reach({ r: 'rowboat#gunwale', l: 'rowboat#gunwale' });
        await s.wait(1);
        s.set('sophia_with', ['parcel']);
        s.person('sophia').reach(null);
        await go(s, 'sophia', [[6.6, 16.0]], 90);
        await tell(s, 'post:grab', SAY('Is it mine?'));
        s.set('parcel', 0);
        s.person('sophia').reach({ r: 'grandma#hands', l: 'grandma#hands' });
        await cutTo(s, SHOT('grandma#hands', 'medium', [0.5, 0.5], 0));
      },
    },
    post_after: {
      after: 'post',
      from: () => ({ ...NEAR(SPOT.pier_end, 6, 0, 0.02), rowboat: 1, eriksson_here: true, parcel: 1, ...ATS('grandma', 'pier'),
        ...AT('sophia', [6.6, 16.0], { turn: 90, sophia_with: ['parcel'] }), ...AT('papa', 'veranda') }),
      run: async s => {
        s.person('sophia').reach(null);
        if (get('parcel_long')) {
          s.set('sophia_do', 'hug_knees');
          s.person('sophia').look('rowboat#seat');
        }
        await dolly(s, NEAR(SPOT.pier_end, 6, 0, 0.02), 1.5);
        await tell(s, 'post_after:ask', SAY('Will you put it up yourself?', 'Myself!') + 1);
      },
    },
    gate: {
      from: () => ({ ...NEAR([-3.5, 11.6], 5, 0.2, 0.03), chair: 'set', rowboat: 1, eriksson_here: true, ...ATS('grandma', 'stone'), ...AT('papa', 'veranda'),
        ...AT('sophia', 'pier') }),
      run: async s => {
        await tell(s, 'gate:sat', 2.5);
        await tell(s, 'gate:call', SAY('To the nets?'));
        await s.person('grandma').do('rise_slow');
        put(s, 'grandma', PLACES.grandma.stone.at);
        await go(s, 'grandma', [PLACES.grandma.chair.at], PLACES.grandma.chair.turn, 'old_walk');
        put(s, 'grandma', 'chair');
        await tell(s, 'gate:up', 1);
        await cutTo(s, SHOT('papa', 'close', [0.5, 0.42], 0));
        await tell(s, 'gate:papa', SAY('Mamma. You mustn’t'));
        await cutTo(s, NEAR([-3.6, 11.3], 3, 0.1, 0.03));
        s.person('grandma').reach({ r: 'chair#back' });
        await s.wait(1.5);
        await s.person('grandma').do('shove');
        s.person('grandma').reach(null);
        s.set('chair', 'shoved');
        await tell(s, 'gate:shove', 1.5);
        await go(s, 'grandma', [PLACES.grandma.stone.at], PLACES.grandma.stone.turn, 'old_walk');
        put(s, 'grandma', 'stone');
        await tell(s, 'gate:sat2', 2);
        s.set('eriksson_look', 'chair#back');
        await cutTo(s, { ...OFF(8.4, 12.6, 50, 0.1), camera_look: 0.03 });
        await tell(s, 'gate:chair', SAY('They’ve tied you up', 'I tied myself'));
        await cutTo(s, NEAR(SPOT.pier_end, 7, 0, 0.02));
        s.set('eriksson_look', null);
        await s.move('rowboat', 0, { over: 10, ease: 'in' });
        await tell(s, 'gate:off');
        s.set('eriksson_here', false);
      },
    },
    foot: {
      after: 'post_after',
      from: () => ({ ...NEAR(SPOT.pier_end, 6, 0, 0.02), rowboat: 1, eriksson_here: true, ...ATS('grandma', 'pier_back'), ...AT('sophia', [6.6, 16.0], { turn: 90 }) }),
      run: async s => {
        await tell(s, 'foot:call', SAY('Will you come out to the nets?'));
        await go(s, 'grandma', [SPOT.pier_end], 95);
        put(s, 'grandma', 'pier');
        s.person('grandma').reach({ r: 'rowboat#gunwale', l: 'rowboat#gunwale', foot_r: 'rowboat#seat' });
        await cutTo(s, SHOT('grandma', 'medium', [0.45, 0.45], 0));
        await tell(s, 'foot:on', 2);
        s.person('grandma').reach(null);
        await tell(s, 'foot:off', SAY('Some other time', 'There aren’t many other times left for us'));
        await cutTo(s, NEAR(SPOT.pier_end, 7, 0, 0.02));
        await s.move('rowboat', 0, { over: 10, ease: 'in' });
        await tell(s, 'foot:gone');
        s.set('eriksson_here', false);
      },
    },
    porch_stay: {
      from: () => ({ ...PORCH, rowboat: 1, eriksson_here: true, ...ATS('grandma', 'step'), ...AT('papa', 'veranda') }),
      run: async s => {
        await tell(s, 'porch_stay:call', SAY('Will you come out to the nets?'));
        s.person('grandma').look('rowboat#seat');
        s.person('grandma').mood('tired');
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'porch_stay:look', SAY('Off you go') + 1);
        await cutTo(s, { ...OFF(8.4, 12.6, 50, 0.1), camera_look: 0.03 });
        s.set('eriksson_look', 'grandma');
        await s.wait(2.5);
        s.set('eriksson_look', null);
        await s.move('rowboat', 0, { over: 10, ease: 'in' });
        await tell(s, 'porch_stay:gone');
        s.set('eriksson_here', false);
        s.person('papa').look('grandma');
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'porch_stay:papa', 2.5);
      },
    },
    porch_dawn: {
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step', { grandma_mood: 'tired' }),
        ...(get('shawl_lost') ? { ...AT('papa', [-6.0, 14.9], { turn: 200 }), ...AT('sophia', [-1.6, 8.0], { turn: 330 }) }
          : { ...AT('papa', 'step_by_stand'), ...AT('sophia', [-6.9, 13.0], { turn: 120 }) }) }),
      run: async s => {
        await s.wait(2);
        await tell(s, 'porch_dawn:sat', 4);
      },
    },
    jacket: {
      after: 'porch_dawn',
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step'), ...AT('papa', SPOT.door, { turn: 200, papa_with: ['jacket'] }) }),
      run: async s => {
        await go(s, 'papa', [SPOT.landing, [-6.0, 13.35]], 220);
        await s.person('papa').do('drape');
        s.set('papa_with', null);
        s.set('grandma_with', ['jacket']);
        s.person('papa').look([-6.35, 13.5, 0.05]);
        await tell(s, 'jacket:hem', SAY('You were there', 'Don’t tell her') + 1);
      },
    },
    learns: {
      after: ['porch_dawn', 'jacket'],
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step'), ...AT('papa', 'step_by'),
        ...(get('sophia_here') ? AT('sophia', [-6.9, 13.0], { turn: 120 }) : {}) }),
      run: async s => {
        if (get('papa_at') !== 'step_by') {
          await go(s, 'papa', [SPOT.landing]);
          await settle(s, 'papa', 'step_by');
        }
        s.person('papa').look('grandma');
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'learns:said', SAY('You promised to tell me', 'You wouldn’t have let me', 'I wouldn’t'));
        s.person('papa').reach({ r: 'grandma#hand_r' });
        s.person('grandma').reach({ r: 'papa#hand_r' });
        await tell(s, 'learns:hand', 2.5);
        // (Sophia, when she is here — on the porch with them in «Идти»)
        if (get('sophia_here') && Math.hypot((get('sophia_a') ?? 0) + 6.9, (get('sophia_d') ?? 0) - 13.0) > 1) {
          await go(s, 'sophia', [[-6.9, 13.0]], 120);
        }
        await tell(s, 'learns:sophia', get('sophia_here') && !get('shawl_lost') ? SAY('I didn’t tell. She told me not to') + 1 : 0);
      },
    },
    run_to: {
      after: ['learns', 'jacket'],
      from: () => ({ ...VIEW, ...ATS('grandma', 'step'), ...AT('papa', 'step_by'), ...AT('sophia', [-1.6, 8.0], { turn: 330 }) }),
      run: async s => {
        s.person('papa').reach(null);
        s.person('grandma').reach(null);
        s.person('papa').look([60, 60, 3]);
        await s.wait(1.5);
        s.person('papa').walk([[-5.4, 12.2], [-4.4, 10.8], [-2.0, 7.6], [1.5, 3.0]]);
        put(s, 'sophia', [-1.6, 8.0]);
        s.person('sophia').gait('run');
        await go(s, 'sophia', [[-3.4, 9.8], [-5.2, 12.4], [-5.8, 13.0]], 220);
        s.person('sophia').gait(null);
        s.person('sophia').look('grandma');
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'run_to:sees', 2);
      },
    },
    count: {
      after: 'run_to',
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step'), ...AT('papa', [-4.6, 11.4], { turn: 30 }), ...AT('sophia', [-5.8, 13.0], { turn: 220 }) }),
      run: async s => {
        await go(s, 'papa', [[-5.5, 12.6]], 60);
        s.person('sophia').mood('afraid');
        s.person('sophia').reach({ r: 'papa#hand_l', l: 'papa#hand_l' });
        await tell(s, 'count:sleeve', SAY('She isn’t getting up! She said — then to you!', 'I know', 'I didn’t tell. She told me not to'));
        s.person('sophia').reach(null);
        s.person('papa').look('grandma');
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'count:look', 2);
        put(s, 'sophia', 'step_by');
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'count:count', 5);
        s.person('papa').reach({ r: 'grandma#hand_l' });
        await s.person('grandma').do('rise_slow');
        put(s, 'grandma', 'porch');
        await s.all(go(s, 'grandma', [SPOT.landing, SPOT.door], null, 'old_walk'), go(s, 'papa', [[-6.3, 13.9], [-6.2, 14.3]]));
        await tell(s, 'count:in', 2);
      },
    },
    hem: {
      after: 'run_to',
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step'), ...AT('papa', [-5.3, 12.4], { turn: turnTo(-5.3, 12.4, -6.35, 13.6) }),
        ...AT('sophia', [-5.8, 13.0], { turn: 220 }) }),
      run: async s => {
        await go(s, 'papa', [[-5.3, 12.4]], turnTo(-5.3, 12.4, -6.35, 13.6));
        s.person('sophia').mood('angry');
        await tell(s, 'hem:said', SAY('I called and you didn’t come!', 'And you didn’t knock!'));
        await tell(s, 'hem:silent', 2.5);
        s.person('sophia').reach({ r: 'grandma#hips' });
        await s.person('sophia').do('hit_knee');
        s.person('sophia').reach({ r: 'grandma#hips', l: 'grandma#hips' });
        await tell(s, 'hem:cling', 3);
      },
    },
    alone: {
      after: 'run_to',
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step'), ...AT('sophia', [-5.8, 13.0], { turn: 220 }) }),
      run: async s => {
        s.person('sophia').mood('smile');
        await tell(s, 'alone:said', SAY('I was alone! All night! By myself!'));
        s.person('sophia').mood('afraid');
        await tell(s, 'alone:stop', 2);
        await settle(s, 'sophia', 'step_by');
        s.person('sophia').reach({ r: 'grandma#hand_l' });
        await tell(s, 'alone:sleeve', 3);
        await cutTo(s, { ...(PORCH), ...AT('sophia', [-4.8, 11.8], { turn: 230 }) });
        await tell(s, 'alone:later', SAY('You didn’t knock!') + 1);
        await cutTo(s, { ...(PORCH), dusk: 1, ...AT('sophia', 'step_by', { sophia_with: ['mug'] }) });
        s.person('sophia').reach({ r: 'grandma#hand_l' });
        await tell(s, 'alone:coffee', 3);
      },
    },
    called_porch: {
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step'), ...AT('papa', 'step_by_stand'), ...AT('sophia', [-5.6, 12.8], { turn: 230 }) }),
      run: async s => {
        s.person('sophia').mood('angry');
        await tell(s, 'called_porch:said', SAY('I called!', 'And you didn’t knock!'));
        s.person('papa').look('grandma');
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'called_porch:eyes', SAY('I heard') + 1);
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'called_porch:hate', SAY('I hate you!'));
        s.person('sophia').gait('run');
        await cutTo(s, PORCH);
        await go(s, 'sophia', [[-4.4, 12.0], [-2.0, 14.0], SPOT.pier_root, PLACES.sophia.pier_sit.at]);
        s.person('sophia').gait(null);
        put(s, 'sophia', 'pier_sit');
        await cutTo(s, PORCH_NEAR);
        await tell(s, 'called_porch:woken', SAY('You could have woken me', 'You would have gone'));
      },
    },
    // ── Epilogue ──
    last_morning: {
      from: () => ({ ...NEAR(SPOT.pier_root, 9, 0, 0.02), camera_yaw: -6, ...ATS('grandma', 'pier_root'), ...AT('sophia', 'pier_root'), ...AT('papa', 'pier_root') }),
      run: async s => {
        await dolly(s, NEAR(SPOT.pier_root, 7, 0, 0.02), 2);
        await tell(s, 'last_morning:boat', 1);
      },
    },
    signs: {
      after: 'last_morning',
      from: () => ({ ...NEAR(SPOT.pier_root, 7, 0, 0.02), camera_yaw: -6, ...ATS('grandma', 'pier_root'), ...AT('sophia', 'pier_root'), ...AT('papa', 'pier_root') }),
      run: async s => {
        const smoke = get('sign_smoke');
        const group = NEAR([-0.5, 15.6], 4.2, 0, 0.03);
        if (smoke === 'pouch') {
          s.set('sophia_with', ['pouch']);
          s.person('sophia').reach({ r: 'grandma#hand_l' });
          await cutTo(s, group);
        } else if (smoke === 'shell') {
          await cutTo(s, { ...(PORCH), ...AT('papa', 'landing_rail') });
          s.set('shell', false);
          s.set('papa_with', ['shell']);
        } else {
          if (smoke === 'packet') s.set('grandma_with', ['packet']);
          s.person('grandma').reach({ r: 'grandma#hips' });
          await cutTo(s, group);
        }
        await tell(s, 'signs:smoke', 1.6);
        s.person('sophia').reach(null);
        s.person('grandma').reach(null);
        s.set('papa_with', null);
        const hat = get('sign_hat');
        if (hat !== 'nail') {
          if (hat === 'on') s.set('sophia_wear', { hat: 'straw' });
          else s.set('papa_with', ['hat']);
          await cutTo(s, { ...NEAR([-0.5, 15.6], 3.6, 0, 0.03), ...AT('papa', 'pier_root', { papa_with: hat === 'on' ? null : ['hat'] }) });
          if (hat === 'on') s.person('papa').reach({ r: 'sophia#head' });
          await tell(s, 'signs:hat', 1.6);
          s.person('papa').reach(null);
        }
        const bird = get('sign_bird');
        if (bird === 'graves') {
          await cutTo(s, { ...NEAR([-1.9, 9.4], 3.4, 0.4, 0.06), ...AT('sophia', 'graves') });
          s.person('sophia').reach({ r: 'graves#pit' });
          await tell(s, 'signs:bird', 1.8);
          s.person('sophia').reach(null);
        } else if (bird === 'basket') {
          s.set('papa_with', ['basket']);
          await cutTo(s, NEAR([-0.5, 15.6], 4.2, 0, 0.03));
          await tell(s, 'signs:bird', 1.8);
        }
      },
    },
    walk_self: {
      from: () => ({ ...GANGWAY_CAM, ...ATS('grandma', [-3.0, 23.2], { turn: 340 }), ...AT('sophia', [-3.5, 22.6], { turn: 340 }), ...AT('papa', [-2.6, 23.6], { turn: 340 }) }),
      run: async s => {
        await s.all(go(s, 'grandma', [SPOT.shore_c, SPOT.gangway], 120, 'old_walk'),
          go(s, 'papa', [SPOT.shore_c, [-3.4, 26.8]], 110), go(s, 'sophia', [[-4.6, 26.1]], 120));
        await tell(s, 'walk_self:there');
      },
    },
    walk_arm: {
      from: () => ({ ...GANGWAY_CAM, ...ATS('grandma', [-3.0, 23.2], { turn: 340 }), ...AT('sophia', [-3.5, 22.6], { turn: 340 }), ...AT('papa', [-2.6, 23.6], { turn: 340 }) }),
      run: async s => {
        s.person('papa').reach({ l: 'grandma#hand_r' });
        s.person('grandma').reach({ r: 'papa#hand_l' });
        await s.all(go(s, 'grandma', [SPOT.shore_c, SPOT.gangway], 120, 'old_walk'),
          go(s, 'papa', [[-3.2, 24.6], [-3.6, 26.7]], 110, 'old_walk'), go(s, 'sophia', [[-4.6, 26.1]], 120));
        await tell(s, 'walk_arm:there');
      },
    },
    walk_slow: {
      from: () => ({ ...PATH_CAM, luggage: true, ...ATS('grandma', SPOT.shore_b, { turn: 200 }), ...AT('sophia', 'bundle'),
        ...AT('papa', [-3.4, 26.8], { turn: 300, papa_with: ['bundle', 'knife'] }) }),
      run: async s => {
        s.person('sophia').look('grandma');
        s.person('papa').look('grandma');
        s.person('grandma').reach({ r: [-2.2, 22.4, 0.4] });
        await go(s, 'grandma', [[-3.0, 22.8]], null, 'old_walk');
        await tell(s, 'walk_slow:stones', 1);
        s.person('grandma').reach({ r: 'gangway#rail' });
        await go(s, 'grandma', [SPOT.shore_c, SPOT.gangway], 120, 'old_walk');
        await tell(s, 'walk_slow:there');
      },
    },
    elbow: {
      after: ['walk_self', 'walk_arm', 'walk_slow'],
      from: () => ({ ...SHOT('grandma', 'medium', [0.5, 0.45], 0), ...ATS('grandma', 'gangway'), ...AT('papa', 'gangway'), ...AT('sophia', 'gangway') }),
      run: async s => {
        await cutTo(s, SHOT('grandma', 'medium', [0.5, 0.45], 0));
        s.person('papa').reach({ l: 'grandma#elbow_r' });
        await tell(s, 'elbow:taken', 2);
        s.person('grandma').reach({ r: 'gangway#rail' });
        await cutTo(s, SHOT('gangway#rail', 'medium', [0.5, 0.5], 0));
      },
    },
    catch: {
      after: ['walk_self', 'walk_arm', 'walk_slow'],
      from: () => ({ ...SHOT('grandma', 'medium', [0.5, 0.45], 0), ...ATS('grandma', 'gangway'), ...AT('papa', [-3.6, 25.6], { turn: 20 }), ...AT('sophia', 'gangway') }),
      run: async s => {
        await s.all(cutTo(s, SHOT('grandma', 'medium', [0.5, 0.45], 0)), go(s, 'papa', [[-3.6, 25.6]], 20));
        s.person('papa').look('grandma');
        await tell(s, 'catch:behind', SAY('Don’t catch me. I won’t fall'));
        s.person('sophia').look('papa');
        await tell(s, 'catch:look', 1.5);
        s.person('sophia').look('grandma');
        await tell(s, 'catch:stop', SAY('Well, hold me, since you’re catching'));
        s.person('grandma').reach({ r: 'gangway#rail' });
        await cutTo(s, SHOT('gangway#rail', 'medium', [0.5, 0.5], 0));
      },
    },
    tent_walk: {
      from: () => ({ ...GANGWAY_CAM, big_boat: true, ...ATS('grandma', [-3.0, 23.2], { turn: 340 }), ...AT('sophia', [-3.5, 22.6], { turn: 340 }), ...AT('papa', [-2.6, 23.6], { turn: 340, papa_with: ['bundle'] }) }),
      run: async s => {
        await s.all(go(s, 'grandma', [SPOT.shore_c, SPOT.gangway], 120, 'old_walk'),
          go(s, 'papa', [[-3.4, 26.8]], 110), go(s, 'sophia', [[-4.6, 26.1]], 120));
        await tell(s, 'tent_walk:board', 1);
        s.person('sophia').look('grandma');
        await tell(s, 'tent_walk:count', get('counted') ? 3 : 0);
        if (get('knock_broken')) await s.wait(2);
        s.person('sophia').reach({ r: 'grandma#hand_l' });
        await tell(s, 'tent_walk:hand', 2);
      },
    },
    shawl_walk: {
      from: () => ({ ...(PORCH), ...ATS('grandma', 'step', { grandma_with: ['jacket'] }), ...AT('sophia', [-5.8, 13.0], { turn: 220 }),
        ...AT('papa', 'gangway') }),
      run: async s => {
        await tell(s, 'shawl_walk:jacket', SAY('Where’s your shawl?', 'I lost it') + 1);
        await s.person('grandma').do('rise_slow');
        put(s, 'grandma', PLACES.grandma.step.at);
        await settle(s, 'grandma', 'porch', 'old_walk');
        await cutTo(s, { ...PATH_CAM, ...ATS('grandma', SPOT.shore_b, { turn: 200, grandma_with: ['jacket'] }) });
        await go(s, 'grandma', [SPOT.shore_c, SPOT.gangway], 120, 'old_walk');
        await tell(s, 'shawl_walk:there', 1);
        s.person('papa').look('grandma');
        await cutTo(s, SHOT('papa', 'medium', [0.5, 0.45], 0));
        await tell(s, 'shawl_walk:doctor', SAY('In town — a doctor') + 1);
      },
    },
    dinghy_board: {
      from: () => ({ ...DINGHY_CAM, dinghy: 'moored', dinghy_at: 0, ...ATS('grandma', 'pier_root'), ...AT('sophia', 'pier_root'), ...AT('papa', 'pier_root') }),
      run: async s => {
        await go(s, 'sophia', [[1.2, 15.2]]);
        put(s, 'sophia', 'dinghy');
        await tell(s, 'dinghy_board:oars', 2);
        if (get('weak')) {
          s.person('papa').reach({ r: 'grandma#hips', l: 'grandma#hips' });
          await s.wait(1);
          s.person('papa').reach(null);
        }
        await go(s, 'grandma', [[0.7, 15.1]], null, 'old_walk');
        put(s, 'grandma', 'dinghy');
        await tell(s, 'dinghy_board:stern', 2);
        if (get('heard')) {
          await go(s, 'papa', [[1.6, 15.3]]);
          put(s, 'papa', 'dinghy');
          s.set('papa_with', ['bundle']);
          await tell(s, 'dinghy_board:bow_in', 3);
        } else {
          s.person('papa').reach({ r: 'dinghy#bow' });
          s.person('papa').look('sophia');
          await tell(s, 'dinghy_board:hold', 3);
          if (get('knew')) {
            s.person('grandma').reach({ r: 'papa#hand_r' });
            await tell(s, 'dinghy_board:hand', SAY('The winter is yours. The hundred strokes are ours') + 2);
            s.person('grandma').reach(null);
          }
          await tell(s, 'dinghy_board:push', SAY('Along the shore. So that I can see'));
          s.person('papa').reach(null);
        }
        await cutTo(s, DINGHY_CAM);
        await tell(s, 'dinghy_board:sophia', SAY('You didn’t come then'));
        if (get('knock_broken')) {
          await s.person('sophia').do('shake');
          await tell(s, 'dinghy_board:shake', SAY('Myself!') + 1);
        }
        s.person('grandma').reach({ r: 'dinghy#oars', l: 'dinghy#oars' });
        s.set('dinghy', 'out');
        await cutTo(s, { ...OFF(2.2, 13.2, -15, 0), camera_look: 0.09 });
      },
    },
    oars_after: {
      after: 'dinghy_board',
      from: () => ({ ...PATH_CAM, dinghy: 'out', dinghy_at: 0.4, ...ATS('grandma', 'dinghy'), ...AT('sophia', 'dinghy'),
        ...(get('heard') ? AT('papa', 'dinghy') : AT('papa', [-1.4, 17.6], { turn: 20, papa_with: ['bundle'] })) }),
      run: async s => {
        s.set('dinghy', 'out');
        s.person('grandma').reach(null);
        const walk = get('heard') ? null : go(s, 'papa', [SPOT.shore_b, SPOT.shore_c, [-3.4, 26.8]], 110);
        s.move('dinghy_at', 1, { over: 18, ease: 'inOut' });
        await dolly(s, PATH_CAM, 6);
        await tell(s, 'oars_after:straight', 3);
        s.person('grandma').reach({ r: 'dinghy#oars' });
        await s.wait(1.2);
        s.person('grandma').reach(null);
        await tell(s, 'oars_after:hand', 2);
        await s.until(() => (get('dinghy_at') ?? 0) >= 0.99);
        if (walk) await walk;
        await tell(s, 'oars_after:there', 1);
      },
    },
    from_water: {
      from: () => ({ ...OFF(6, 9, -64, 0.4), hat: get('hat'), grandma_here: false, sophia_here: false, papa_here: false }),
      run: async s => {
        await s.move('camera_z', 11, { over: 2, ease: 'linear' });
        await tell(s, 'from_water:door');
        await cutTo(s, OFF(5, 8, -70, 0.3));
        await s.move('camera_z', 9.5, { over: 2, ease: 'linear' });
        await tell(s, 'from_water:gate');
        await cutTo(s, OFF(5, 12, -82, 0.6));
        await s.move('camera_z', 13.5, { over: 2, ease: 'linear' });
        await tell(s, 'from_water:rail');
        if ((get('graves') ?? 0) > 0) {
          await cutTo(s, OFF(4, 6, -60, 0.2));
          await s.move('camera_z', 7.2, { over: 2, ease: 'linear' });
          await tell(s, 'from_water:graves');
        }
      },
    },
  };
}
return { WATER, SHELF, coast, ground, shore, sm, edge, PLACES, ROWBOAT, DINGHY, CAT, MIRROR, SPOT, film };
