// «The Magic Forest» — the land's shape (relief.js reads it) and what the paintings and the script share. The island's
// crown in the middle, where nothing grows tall: a clearing of moss and grey granite among dead trees twisted by the
// wind, a stump in it; past the trees the land goes down ahead to the open sea far below.
const { clamp } = anim;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
// the land: the clearing nearly level, rising a little to the left and the right, going down ahead past the trees to
// the sea (below WATER beyond about 70 m)
function raw(x, z) {
  let h = -4.6 * sm((z - 22) / 46);
  h += 0.7 * sm((-x - 4) / 9) + 0.5 * sm((x - 5) / 9);
  h += 0.12 * Math.sin(0.7 * x + 0.4 * z) * Math.sin(0.5 * z - 0.3 * x);
  return h;
}
const ZERO = raw(0, 0);
const ground = (x, z) => raw(x, z) - ZERO;
// the sea's surface, metres (far below the clearing)
const WATER = -4 - ZERO;
// the waterline the island's sea washes in a storm: far ahead, across
const edge = [];
for (let x = -120; x <= 120; x += 2) {
  let a = 20;
  let b = 140;
  for (let i = 0; i < 24; i++) {
    const m = (a + b) / 2;
    if (ground(x, m) > WATER) a = m;
    else b = m;
  }
  edge.push([x, (a + b) / 2]);
}

// the stump, the hero trunk, the crevice: where they stand
const STUMP = [0.7, 3.8];
const STUMP_TOP = 0.42;
const TRUNK = [-1.5, 4.8];

const DEG = 180 / Math.PI;
// the way someone at p faces to look at q (degrees, as a person's turn: 0 away from the start, 90 to its right)
const face = (p, q) => (Math.atan2(q[0] - p[0], q[1] - p[1]) * DEG + 360) % 360;
const SEAT = [STUMP[0], STUMP[1], STUMP_TOP];
// the path's stones (the path's points `stone1…3`), where it goes on to the other side out of sight among the dead
// trees, and the clearing's edge toward the house, out of the frame on the left
const P1 = [-1.0, 7.5];
const P2 = [-1.8, 10.0];
const P3 = [-2.8, 12.8];
const FAR = [-3.7, 16.2];
const EDGE = [-5.4, 2.4];
// at the boulder's crack (crevice#pack: on its left side) and the red beetle in the moss (moss#beetle)
const CRACK = [2.05, 5.93];
const BEETLE = [1.45, 3.05];

// the people's places (`<id>_at` names one): where each stands, facing, what they look at and reach for there, what
// they do (a motion of the cast, looped) and what they sit on. Grandmother and Sophia first in the clearing.
const PLACES = {
  grandma: {
    clearing: { at: [-0.9, 3.5], turn: 160, look: 'stump' },
    edge: { at: EDGE, turn: 90 },
    stump: { at: STUMP, turn: 175, look: 'sophia', do: 'sit_stone', on: SEAT },
    up: { at: [0.75, 3.45], turn: 185, look: [0, 30, -2] },
    trunk: { at: [-0.95, 4.85], turn: 265, look: 'trunk#branch', reach: { r: 'trunk#palm' } },
    crevice: { at: [1.55, 5.75], turn: face([1.55, 5.75], CRACK), look: 'crevice#pack' },
    moss: { at: [0.1, 5.4], turn: 185, look: [0, 30, -2], do: 'sit_ground' },
    path1: { at: P1, turn: face(P1, P2), look: 'path#stone2' },
    path2: { at: P2, turn: face(P2, P3), look: 'path#stone3' },
    path3: { at: P3, turn: face(P3, FAR) },
    far: { at: FAR, turn: 200 },
  },
  sophia: {
    clearing: { at: [0.3, 2.9], turn: 200, look: 'grandma' },
    edge: { at: [EDGE[0] + 0.3, EDGE[1] - 0.5], turn: 90 },
    moss: { at: [1.25, 3.25], turn: 210, look: 'moss#beetle', do: 'crouch' },
    animals: { at: [0.05, 2.75], turn: 180, look: 'animals#animals', do: 'crouch' },
    stump: { at: [1.3, 4.3], turn: 215, look: 'grandma' },
    behind: { at: [1.2, 4.3], turn: face([1.2, 4.3], [0.4, 3.0]), look: 'grandma' },
    near: { at: [1.2, 4.15], turn: 240, look: 'grandma', do: 'crouch' },
    beside: { at: [1.2, 3.55], turn: 250, look: 'grandma', do: 'sit_ground' },
    nose: { at: [1.6, 3.35], turn: 200, look: 'moss#beetle', do: 'nose_moss' },
    aside: { at: [-0.7, 2.6], turn: face([-0.7, 2.6], STUMP), look: 'grandma', do: 'hug_knees' },
    trees: { at: [3.6, 7.8], turn: 30 },
    crevice: { at: [2.1, 5.3], turn: 140, look: 'crevice#pack' },
    path1: { at: [P1[0] + 0.55, P1[1] - 0.1], turn: face(P1, P2), look: 'grandma' },
    path2: { at: [P2[0] + 0.55, P2[1] - 0.1], turn: face(P2, P3), look: 'grandma' },
    path3: { at: [P3[0] + 0.55, P3[1] - 0.1], turn: face(P3, FAR), look: 'grandma' },
    far: { at: FAR, turn: 200 },
  },
  papa: {
    edge: { at: [EDGE[0], EDGE[1] + 0.6], turn: 90 },
    lift: { at: [0.15, 3.65], turn: face([0.15, 3.65], STUMP), look: 'grandma' },
  },
};

// ── the camera of the pieces ────────────────────────────────────────
// every camera key at once (a cut or a ready shot sets them all: no offset of a shot before is left over)
const CAM0 = {
  camera_target: null, camera_shot: 'full', camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_h: 0,
  camera_yaw: 0, camera_look: 0, camera_pitch: 0, camera_roll: 0,
};
const HORIZON = 0.42;
const EYE = 1.7;
// a shot by hand: the eye at [across, distance, height over the land there], turned and its lens shifted (camera_look:
// what stands stays upright) so that the point `at` ([across, distance, height over the land there]) is at [fx, fy] of
// a 16:9 frame — the middle 4:3 is fx 0.125…0.875; the top 12 % is the minigame's hint, the bottom 20 % the subtitles'
function aim(eye, at, fx = 0.5, fy = 0.42) {
  const [ea, ed, eh] = eye;
  const [pa, pd, ph] = at;
  const ey = ground(ea, ed) + eh;
  const py = ground(pa, pd) + ph;
  const da = pa - ea;
  const dd = pd - ed;
  const r = Math.atan((fx - 0.5) * (16 / 9));
  const fwd = Math.hypot(da, dd) * Math.cos(r);
  return {
    ...CAM0, camera_x: ea, camera_z: ed, camera_h: eh - EYE,
    camera_yaw: (Math.atan2(da, dd) - r) * DEG, camera_look: HORIZON - (py - ey) / fwd - fy,
  };
}
// the pieces' shots, each named by what it holds
const SHOTS = {
  // the clearing: the dead trees, the stump, Sophia with her animals
  clearing: aim([0.1, 0.4, 1.6], [0.2, 4.2, 0.7], 0.5, 0.52),
  // Grandmother on the stump, her hands with the knife before her (the knife minigame), her face
  carve: aim([1.05, 2.0, 1.2], [0.7, 3.8, 0.9], 0.5, 0.42),
  // the two by the stump: Sophia among the animals, Grandmother on it
  animals: aim([-0.4, 1.3, 1.15], [0.45, 3.5, 0.7], 0.5, 0.48),
  // her face close at the trunk, her palm on it; Sophia small aside with the animals
  trunk: aim([-2.3, 3.9, 1.45], [-0.95, 4.85, 1.4], 0.32, 0.4),
  // the stump: Grandmother on it in front, Sophia at her shoulder (the choice `smoke`: grandma#chest)
  smoke: aim([0.45, 2.1, 1.1], [0.9, 3.95, 0.95], 0.5, 0.42),
  // the clearing wide: who goes off between the trees, who sits apart
  wide: aim([0.6, 0.3, 1.5], [0.2, 4.2, 0.8], 0.5, 0.5),
  // the boulder and its crack
  crevice: aim([-0.1, 2.3, 1.4], [1.6, 5.6, 0.8], 0.5, 0.48),
  // Grandmother standing by the stump (the moss minigame: grandma#chest), Sophia with the animals
  swim: aim([-0.2, 0.6, 1.4], [0.5, 3.4, 0.8], 0.5, 0.5),
  // close: Sophia's face over her, Grandmother bowed on the stump (the choice `head`: sophia#chest)
  face: aim([0.55, 2.75, 1.0], [1.15, 4.1, 0.8], 0.5, 0.42),
  // Papa and his mother by the stump
  lift: aim([0.6, 1.6, 1.4], [0.45, 3.7, 1.2], 0.5, 0.42),
  // low on the beetle in the moss
  beetle: aim([1.15, 2.3, 0.5], [1.45, 3.05, 0.03], 0.55, 0.55),
  // her hand on the stump's edge, shaking
  hand: aim([0.9, 2.95, 0.75], [0.85, 3.6, 0.45], 0.5, 0.5),
  // the two faces by the stump, low
  faces: aim([0.4, 1.9, 0.95], [0.95, 3.65, 0.8], 0.5, 0.45),
  // the night: the path ahead, its stones, the two at the first one with the lantern (the stones minigame)
  path: aim([0.9, 4.2, 1.5], [-1.6, 10.0, 0.6], 0.5, 0.48),
  // the night: at the boulder
  pack: aim([0.2, 3.3, 1.35], [1.8, 5.8, 0.85], 0.5, 0.48),
};

// ── the pieces (notes.md «Pieces»; the module beats) ────────────────
// Each piece: `from` — where its people are and the camera (the play's keys — the hour, `animals`, `pack`, `band`,
// `boat_out`, `brave`, `sophia_back`, who of Grandmother and Sophia is here — are the game's); `run` — the piece,
// telling its moments. A piece that follows another (`after`) goes on from where that one ended: its `from` is that
// end, its `run` puts nobody anywhere; another frame is a ready cut that sets every camera key.
const loop = m => ({ motion: m, loop: true });
const GAIT = { grandma: 'old_walk', sophia: null, papa: null };
function at(id, place, more = {}) {
  const p = PLACES[id][place];
  return {
    [`${id}_at`]: place, [`${id}_placed`]: place, [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_on`]: p.on ?? null,
    [`${id}_turn`]: p.turn, [`${id}_do`]: p.do ? loop(p.do) : null, [`${id}_look`]: p.look ?? null,
    [`${id}_reach`]: p.reach ?? null, [`${id}_gait`]: GAIT[id], [`${id}_with`]: null, ...more,
  };
}
const PAPA_OFF = { ...at('papa', 'edge'), papa_here: false };
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
// someone walks off out of sight (to the edge, or to the other side among the trees) and is gone
async function goOff(s, id, place, via = []) {
  const who = s.person(id);
  who.on(null);
  who.reach(null);
  who.look(null);
  s.set(`${id}_do`, null);
  await who.walk([...via, PLACES[id][place].at]);
  who.here(false);
  s.set(`${id}_placed`, place);
  s.set(`${id}_at`, place);
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
// Grandmother up off the stump, standing by it
async function rise(s) {
  const gm = s.person('grandma');
  await gm.do('rise_slow');
  gm.on(null);
  s.set('grandma_do', null);
  s.set('grandma_placed', 'up');
  s.set('grandma_at', 'up');
}

const FILM = {
  // 1.2 — the grey dead trees creaking in the wind; Sophia crouched with her four animals; Grandmother comes from the
  // clearing's edge to the stump, sits down and takes out her knife and the driftwood (the knife minigame's pose)
  carve: {
    from: () => ({ ...at('grandma', 'clearing'), ...at('sophia', 'animals'), ...PAPA_OFF, spin: 0, ...SHOTS.clearing }),
    run: async s => {
      const gm = s.person('grandma');
      s.tell('carve:trees');
      await s.wait(2);
      glideTo(s, SHOTS.carve, 4);
      await goTo(s, 'grandma', 'stump', [], { sit: 'sit_down' });
      gm.with(['knife', 'driftwood']);
      gm.do('carve', { loop: true });
      gm.look('grandma#hands');
      s.tell('carve:sat');
      await s.wait(1.5);
    },
  },
  // 1.2 — the seal is done; Sophia takes it from her hand and sets it in the moss with the others (`animals` 4 → 5)
  seal_set: {
    after: 'carve',
    from: () => ({
      ...at('grandma', 'stump', { grandma_do: loop('carve'), grandma_look: 'grandma#hands', grandma_with: ['knife', 'driftwood'] }),
      ...at('sophia', 'animals'), ...PAPA_OFF, spin: 0, ...SHOTS.carve,
    }),
    run: async s => {
      const gm = s.person('grandma');
      const so = s.person('sophia');
      gm.with(['knife', 'seal']);
      gm.do('sit_stone', { loop: true });
      s.tell('seal_set:seal');
      glideTo(s, SHOTS.animals, 3);
      await goTo(s, 'sophia', 'stump', [], { rise: 'get_up' });
      so.reach({ r: 'grandma#hand_r' });
      gm.reach({ r: 'sophia#hand_r' });
      await s.wait(1);
      gm.reach(null);
      so.reach(null);
      gm.with(['knife']);
      so.with(['seal']);
      gm.look('sophia');
      await goTo(s, 'sophia', 'animals');
      await so.do('put_down');
      so.with(null);
      s.set('animals', 5);
      so.do('crouch', { loop: true });
      s.tell('seal_set:forest');
      await s.wait(3);
    },
  },
  // 1.2 — Grandmother gets up, goes to the trunk, reaches for the dry branch — and stands still, her palm on the trunk,
  // her eyes closed (her face close, Sophia small beyond); then back to the stump to carve
  trunk: {
    after: 'seal_set',
    from: () => ({ ...at('grandma', 'stump', { grandma_look: 'sophia', grandma_with: ['knife'] }), ...at('sophia', 'animals'), ...PAPA_OFF, spin: 0, animals: 5, ...SHOTS.animals }),
    run: async s => {
      const gm = s.person('grandma');
      await goTo(s, 'grandma', 'trunk', [], { rise: 'rise_slow' });
      gm.reach({ r: 'trunk#branch' });
      s.tell('trunk:reach');
      glideTo(s, SHOTS.trunk, 2.5);
      await s.wait(1.5);
      gm.reach({ r: 'trunk#palm' });
      gm.look(null);
      s.tell('trunk:still');
      await s.wait(3);
      glideTo(s, SHOTS.animals, 3);
      await goTo(s, 'grandma', 'stump', [], { sit: 'sit_down' });
      gm.do('carve', { loop: true });
      gm.look('grandma#hands');
      s.tell('trunk:back');
      await s.wait(1);
    },
  },
  // 1.3 — Sophia wanders off to her animals; Grandmother takes a cigarette out of the pouch and strikes a match; Sophia
  // has come round behind her (the choice `smoke`: grandma#chest, both faces)
  match: {
    after: 'trunk',
    from: () => ({
      ...at('grandma', 'stump', { grandma_do: loop('carve'), grandma_look: 'grandma#hands', grandma_with: ['knife'] }), ...at('sophia', 'animals'),
      ...PAPA_OFF, spin: 0, animals: 5, ...SHOTS.animals,
    }),
    run: async s => {
      const gm = s.person('grandma');
      const so = s.person('sophia');
      glideTo(s, SHOTS.smoke, 3);
      const round = goTo(s, 'sophia', 'behind', [[2.2, 3.4], [2.0, 4.6]], { rise: 'get_up' });
      gm.with(['pouch']);
      gm.do('sit_stone', { loop: true });
      await s.wait(1);
      gm.with(['cigarette', 'match']);
      const strike = gm.do('strike');
      s.tell('match:strike');
      await strike;
      gm.with(['cigarette']);
      gm.do('smoke', { loop: true });
      await round;
      gm.look(null);
      s.tell('match:behind');
      await s.wait(1);
    },
  },
  // 1.3 «secret» — she smokes on; Sophia walks off between the trees importantly, chest out, hands behind her back
  ours: {
    after: 'match',
    from: () => ({ ...at('grandma', 'stump', { grandma_do: loop('smoke'), grandma_look: null, grandma_with: ['cigarette'] }), ...at('sophia', 'behind'), ...PAPA_OFF, spin: 0, animals: 5, ...SHOTS.smoke }),
    run: async s => {
      const so = s.person('sophia');
      glideTo(s, SHOTS.wide, 3);
      so.gait('proud_walk');
      const off = goTo(s, 'sophia', 'trees', [[2.4, 5.0]]);
      s.tell('ours:proud');
      await off;
      so.gait(null);
      s.person('grandma').look('sophia');
      await s.wait(1.5);
    },
  },
  // 1.3 «tell» — Sophia sits down on the moss a little way off, her chin on her knees, looking at her; she smokes
  think: {
    after: 'match',
    from: () => ({ ...at('grandma', 'stump', { grandma_do: loop('smoke'), grandma_look: null, grandma_with: ['cigarette'] }), ...at('sophia', 'behind'), ...PAPA_OFF, spin: 0, animals: 5, ...SHOTS.smoke }),
    run: async s => {
      glideTo(s, SHOTS.wide, 3);
      await goTo(s, 'sophia', 'aside', [[1.6, 2.9]], { sit: 'sit_down' });
      s.tell('think:think');
      await s.wait(3);
    },
  },
  // 1.3 «quit» — she puts the cigarette out on a stone, gets up, pushes the packet deep into the boulder's crack (a ready
  // cut to it); Sophia pleased, then bored, kicking the moss; Grandmother pats her empty pocket
  quit: {
    after: 'match',
    from: () => ({ ...at('grandma', 'stump', { grandma_do: loop('smoke'), grandma_look: null, grandma_with: ['cigarette'] }), ...at('sophia', 'behind'), ...PAPA_OFF, spin: 0, animals: 5, ...SHOTS.smoke }),
    run: async s => {
      const gm = s.person('grandma');
      const so = s.person('sophia');
      await gm.do('put_out');
      gm.with(['packet']);
      s.tell('quit:out');
      glideTo(s, SHOTS.crevice, 3);
      await goTo(s, 'grandma', 'crevice', [], { rise: 'rise_slow' });
      gm.reach({ r: 'crevice#pack' });
      await s.wait(0.8);
      await cutTo(s, { pack: 'in', grandma_with: null, ...SHOTS.pack });
      s.tell('quit:in');
      await s.wait(1.5);
      gm.reach(null);
      so.look('grandma');
      await goTo(s, 'sophia', 'animals');
      so.do('kick', { loop: true });
      gm.do('pat_pocket');
      s.tell('quit:pocket');
      await s.wait(2.5);
    },
  },
  // 3.1 — Sophia crouched setting out her animals; Grandmother gets up off the stump — and the ground swims (the moss
  // minigame's pose: grandma#chest, the trees still)
  swim: {
    from: () => ({ ...at('grandma', 'stump', { grandma_look: 'sophia' }), ...at('sophia', 'animals'), ...PAPA_OFF, spin: 0, ...SHOTS.swim }),
    run: async s => {
      s.tell('swim:animals');
      await s.wait(2.5);
      await rise(s);
      s.person('grandma').do('sway', { loop: true });
      s.person('grandma').look(null);
      s.tell('swim:up');
      await s.wait(1);
    },
  },
  // 3.1 — the spin eases away; she sits down heavily on the stump, her head on her knees; Sophia runs up (with `brave`:
  // comes quickly, squats and looks into her face without a word); close on Sophia's face (the choice `head`)
  fall: {
    after: 'swim',
    from: () => ({ ...at('grandma', 'up', { grandma_do: loop('sway'), grandma_look: null }), ...at('sophia', 'animals'), ...PAPA_OFF, spin: 0, ...SHOTS.swim }),
    run: async s => {
      const gm = s.person('grandma');
      const so = s.person('sophia');
      s.move('spin', 0, { over: 2, ease: 'out' });
      await goTo(s, 'grandma', 'stump', [], { sit: 'sit_heavy' });
      gm.do('dizzy', { loop: true });
      s.tell('fall:sat');
      so.gait('run');
      await goTo(s, 'sophia', 'near', [], { rise: 'get_up' });
      so.gait(null);
      s.tell('fall:near');
      await cutTo(s, SHOTS.face);
      s.tell('fall:face');
      await s.wait(1.5);
    },
  },
  // 3.2 «papa» — Sophia runs off toward the house and out of sight; Grandmother alone on the stump, the trees creaking
  run_papa: {
    after: 'fall',
    from: () => ({ ...at('grandma', 'stump', { grandma_do: loop('dizzy'), grandma_look: null }), ...at('sophia', 'near'), ...PAPA_OFF, spin: 0, ...SHOTS.face }),
    run: async s => {
      const so = s.person('sophia');
      glideTo(s, SHOTS.wide, 3);
      await so.do('get_up');
      so.gait('run');
      await goOff(s, 'sophia', 'edge');
      so.gait(null);
      s.tell('run_papa:gone');
      await s.wait(2.5);
    },
  },
  // 3.2 «papa» — Papa comes quickly, Sophia behind him, and lifts his mother up by the arm; she pulls away; he does not
  // let go; she stops
  papa_comes: {
    after: 'run_papa',
    from: () => ({ ...at('grandma', 'stump', { grandma_do: loop('dizzy'), grandma_look: null }), ...at('sophia', 'edge'), sophia_here: false, ...PAPA_OFF, spin: 0, ...SHOTS.wide }),
    run: async s => {
      const papa = s.person('papa');
      const gm = s.person('grandma');
      const so = s.person('sophia');
      papa.here(true);
      so.here(true);
      papa.gait('walk_fast');
      const come = goTo(s, 'papa', 'lift', [[-2.5, 2.9]]);
      const after = goTo(s, 'sophia', 'stump', [[-2.6, 2.4], [-0.6, 2.6]]);
      await s.wait(1.5);
      s.tell('papa_comes:come');
      await come;
      papa.gait(null);
      glideTo(s, SHOTS.lift, 2.5);
      papa.reach({ r: 'grandma#hand_l' });
      gm.reach({ l: 'papa#hand_r' });
      await rise(s);
      gm.look('papa');
      s.tell('papa_comes:lift');
      await gm.do('pull_away');
      gm.reach({ l: 'papa#hand_r' });
      await after;
      s.tell('papa_comes:held');
      await s.wait(2);
    },
  },
  // 3.2 «papa» — he leads her slowly toward the house; by the trees he turns his head to Sophia; she stays, looking after
  // them, and does not go to play
  lead_home: {
    after: 'papa_comes',
    from: () => ({
      ...at('grandma', 'up', { grandma_look: 'papa', grandma_reach: { l: 'papa#hand_r' } }), ...at('sophia', 'stump'),
      ...at('papa', 'lift', { papa_reach: { r: 'grandma#hand_l' } }), papa_here: true, spin: 0, ...SHOTS.lift,
    }),
    run: async s => {
      const papa = s.person('papa');
      const gm = s.person('grandma');
      const so = s.person('sophia');
      glideTo(s, SHOTS.wide, 3);
      papa.gait('lead_walk');
      s.tell('lead_home:go');
      await s.all(gm.walk([[-2.0, 3.0]]), papa.walk([[-2.2, 3.5]]));
      papa.look('sophia');
      s.tell('lead_home:play');
      await s.wait(3);
      papa.look(null);
      so.look('grandma');
      await s.all(goOff(s, 'grandma', 'edge'), goOff(s, 'papa', 'edge'));
      papa.gait(null);
      s.tell('lead_home:back');
      await s.wait(2);
    },
  },
  // 3.2 «sophia» — with `sophia_back` she first steps back, fists clenched; she comes close (the questions); she sits
  // down on the moss beside the stump and counts aloud; at last Grandmother lifts her head and gets up slowly
  count: {
    after: 'fall',
    from: () => ({ ...at('grandma', 'stump', { grandma_do: loop('dizzy'), grandma_look: null }), ...at('sophia', 'near'), ...PAPA_OFF, spin: 0, ...SHOTS.face }),
    run: async s => {
      const so = s.person('sophia');
      const gm = s.person('grandma');
      const near = PLACES.sophia.near;
      if (s.get('sophia_back')) {
        await so.do('get_up');
        s.set('sophia_do', null);
        so.gait('back_away');
        await so.walk([[1.55, 4.55]]);
        so.gait(null);
        await so.turn(face([1.55, 4.55], STUMP));
        so.do('fists', { loop: true });
        s.tell('count:back');
        await s.wait(3);
        s.set('sophia_do', null);
        await so.walk([near.at]);
        await so.turn(near.turn);
        so.do(near.do, { loop: true });
      } else {
        s.tell('count:back');
        await s.wait(1.5);
      }
      glideTo(s, SHOTS.faces, 3);
      s.tell('count:ask');
      await s.wait(3);
      await goTo(s, 'sophia', 'beside', [], { rise: 'get_up', sit: 'sit_down' });
      so.do('count', { loop: true });
      s.tell('count:sit');
      await s.wait(4);
      gm.look('sophia');
      await rise(s);
      gm.look('sophia');
      so.look('grandma');
      s.tell('count:up');
      await so.do('get_up');
      s.set('sophia_do', null);
    },
  },
  // 3.2 «moss» — Sophia sits on the moss by the stump, her nose in it; low on the red beetle; they laugh; her hand on the
  // stump's edge shaking (Sophia does not see); the two faces: «Tonight — that house» — «Really?!»
  beetle: {
    after: 'fall',
    from: () => ({ ...at('grandma', 'stump', { grandma_do: loop('dizzy'), grandma_look: null }), ...at('sophia', 'near'), ...PAPA_OFF, spin: 0, ...SHOTS.face }),
    run: async s => {
      const gm = s.person('grandma');
      const so = s.person('sophia');
      gm.do('sit_stone', { loop: true });
      gm.look('sophia');
      await goTo(s, 'sophia', 'nose', [], { rise: 'get_up', sit: 'sit_down' });
      s.tell('beetle:nose');
      await s.wait(1.5);
      await cutTo(s, SHOTS.beetle);
      s.tell('beetle:beetle');
      s.set('grandma_mood', 'laugh');
      s.set('sophia_mood', 'laugh');
      await s.wait(3);
      gm.reach({ l: [STUMP[0] + 0.22, STUMP[1] - 0.12, STUMP_TOP] });
      await cutTo(s, SHOTS.hand);
      s.tell('beetle:hand');
      await s.wait(3);
      s.set('grandma_mood', null);
      s.set('sophia_mood', null);
      gm.reach(null);
      await goTo(s, 'sophia', 'beside', [], { rise: 'get_up', sit: 'sit_down' });
      await cutTo(s, SHOTS.faces);
      s.tell('beetle:house');
      await s.wait(3);
    },
  },
  // 3.3 «moss» — late evening into night; Papa's lantern far out on the water at the nets; the two come into the
  // clearing with the lantern; at the boulder (with `pack` in she takes the packet out); on to the path's first stone
  // (the stones minigame's pose)
  night_path: {
    from: () => ({ ...at('grandma', 'edge', { grandma_with: ['lantern'] }), ...at('sophia', 'edge'), ...PAPA_OFF, spin: 0, ...SHOTS.pack }),
    run: async s => {
      const gm = s.person('grandma');
      s.tell('night_path:boat');
      await s.all(goTo(s, 'grandma', 'crevice', [[-2.0, 3.6], [0.2, 4.7]]), goTo(s, 'sophia', 'crevice', [[-2.2, 3.1], [0.4, 4.2], [1.5, 4.6]]));
      if (s.get('pack') === 'in') {
        gm.reach({ r: 'crevice#pack' });
        await s.wait(1);
        await cutTo(s, { pack: 'taken', ...SHOTS.pack });
        gm.reach(null);
        gm.with(['lantern', 'packet']);
      }
      s.tell('night_path:pack');
      await s.wait(1.5);
      glideTo(s, SHOTS.path, 3);
      await s.all(goTo(s, 'grandma', 'path1', [[0.3, 6.2]]), goTo(s, 'sophia', 'path1', [[0.8, 6.0]]));
      s.person('sophia').look('path#stone2');
      s.tell('night_path:stone');
      await s.wait(1);
    },
  },
  // 3.3 «moss» — on between the dead trees to the other side, the lantern's light going among the trunks, and gone
  into_trees: {
    after: 'night_path',
    from: () => ({
      ...at('grandma', 'path3', { grandma_with: ['lantern'] }), ...at('sophia', 'path3'), ...PAPA_OFF, spin: 0,
      ...SHOTS.path,
    }),
    run: async s => {
      await s.all(goOff(s, 'grandma', 'far'), goOff(s, 'sophia', 'far', [[P3[0] + 0.5, P3[1] + 0.4]]));
      s.tell('into_trees:gone');
      await s.wait(2);
    },
  },
};

// the play's keys the showcase gives each piece (in a game the game gives them)
const NIGHT = { dawn: 0, dusk: 0, night: 1, late: 1 };
const SHOW = {
  carve: { dawn: 0, dusk: 0, night: 0, late: 0, band: 0, animals: 4, pack: 'none', boat_out: false, grandma_here: true, sophia_here: true },
  quit: {},
  swim: { late: 1, band: 1, animals: 5 },
  fall: { brave: false },
  beetle: {},
  night_path: { ...NIGHT, band: 0, boat_out: true, pack: 'in' },
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

return { WATER, ground, sm, edge, STUMP, STUMP_TOP, TRUNK, PLACES, SHOTS, FILM, SHOWFILM };
