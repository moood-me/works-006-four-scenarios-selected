// Moominvalley at the end of August — what the elements and the script share. Metres: across (right +), distance
// (ahead), heights over the viewer's ground.
//   The land: the garden level before the eye, the house on a low knoll ahead right, the hills rising behind it to the
// right and far off; the stream (STREAM_A) running straight from a low wooded rise at the back down past the garden
// toward the eye; on the left the meadow going down to a strip of beach and the sea (the coast wavers along `coast`);
// far off the coast becomes a high wooded headland. The sea and the stream lie at WATER.
const WATER = -0.45, BEACH = -0.32, STREAM_A = -4.6;
const sm = (x, a, b) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const bump = (a, d, ca, cd, ra, rd) => {
  const x = (a - ca) / ra, z = (d - cd) / rd;
  return Math.exp(-(x * x + z * z));
};
// how far into the sea a point is: 0 at the meadow's edge … the beach from SHORE[0] to SHORE[1], the water's edge at
// SHORE[1], the sea floor beyond
const SHORE = [7, 8.4, 13, 15];
const coast = (a, d) => -(a + 0.9 * Math.sin(d * 0.13) + 0.5 * Math.sin(d * 0.05 + 1));
function land(a, d) {
  // the garden, the house's knoll, the hills behind (higher to the right), the headland far on the left, the low rise
  // the stream comes out of
  let h = 0.25 * bump(a, d, 7.5, 18, 7, 6)
    + 6.5 * sm(d, 38, 100) * sm(a, -6, 20)
    + 3.8 * sm(d, 75, 140) * (1 - sm(a, -6, 20))
    + 1.4 * bump(a, d, -4, 40, 9, 7);
  // the stream's bed, from its rise down toward the eye
  const x = (a - STREAM_A) / 0.95, k = Math.exp(-x * x) * (1 - sm(d, 29, 33));
  h = h * (1 - k) - 0.85 * k;
  // down to the beach and into the sea
  const s = coast(a, d), b = sm(s, SHORE[0], SHORE[1]);
  const beach = BEACH - 1.3 * sm(s, SHORE[2], SHORE[3]);
  return h * (1 - b) + beach * b;
}
// where the Groke stands on the beach (far off, on the left), and where her track meets the water
const GROKE = [-10.6, 36], GROKE_WATER = [-12.6, 36.4];
// the house: a round blue tower, its red cone of a roof with a little spire, a plinth — its profile, [radius, height]
// from the top down; how far along it a height is (its painting's rows); the way round its wall (its painting's width)
const HOUSE_AT = [8.2, 19.5];
const PROFILE = [[0, 10.3], [0.1, 10.2], [0.1, 9.6], [0.35, 9.5], [3.35, 6.75], [3.02, 6.66], [2.9, 6.6], [2.9, 0.22], [3.06, 0.16],
  [3.06, 0]];
const LENGTHS = [0];
for (let i = 1; i < PROFILE.length; i++) {
  LENGTHS.push(LENGTHS[i - 1] + Math.hypot(PROFILE[i][0] - PROFILE[i - 1][0], PROFILE[i][1] - PROFILE[i - 1][1]));
}
const HOUSE = {
  profile: PROFILE,
  len: LENGTHS[LENGTHS.length - 1],
  round: 2 * Math.PI * 2.9,
  // the painting's row (metres down from its top) of a height on the house
  at(h) {
    for (let i = 1; i < PROFILE.length; i++) {
      const h0 = PROFILE[i - 1][1], h1 = PROFILE[i][1];
      if (h <= h0 && h >= h1) return LENGTHS[i - 1] + ((LENGTHS[i] - LENGTHS[i - 1]) * (h0 - h)) / (h0 - h1 || 1);
    }
    return h > PROFILE[0][1] ? 0 : LENGTHS[LENGTHS.length - 1];
  },
};
// the veranda before the house's door: its floor's middle, size, height (scene.json `veranda`); what stands on it is
// placed in its frame ([across, toward its back, up]) — the table, the chairs round it, the little stove, the shelf
const VERANDA = { at: [7.4, 15.3], width: 4.6, depth: 2.6, floor: 0.72 };
// the jetty: its deck's middle, size, height (scene.json `jetty`); the post at its near end My sits on (in its frame)
const JETTY = { at: [-14.0, 24.0], width: 4.6, depth: 1.1, deck: -0.15, post: [-2.15, -0.45, 0.4] };
const SEATS = { back: [-0.2, 0.72, 0.32], left: [-1.25, -0.1, 0.32], right: [0.85, -0.1, 0.32], stool: [-0.75, -0.82, 0.5] };
// the boat «Adventure»: moored by the jetty, and her way out along the shore as she leaves (`boat_a`, `boat_d`); the
// seats in her (her frame: she faces the start, so her across is the viewer's mirrored; distance behind her painted
// side; up from the waterline) — Papa at the tiller in the stern, Mama and the son amidships, My on the bow
const BOAT = {
  moored: [-15.4, 22.85],
  away: [[-17.2, 26.5], [-20.5, 33], [-24.5, 42]],
  seats: { papa: [-1.3, 0.35, 0.25], mama: [-0.45, 0.35, 0.25], troll: [0.35, 0.35, 0.25], my: [1.45, 0.3, 0.5] },
};
const v = (x, y) => [VERANDA.at[0] + x, VERANDA.at[1] + y];
const seat = s => ({ on: 'veranda', at: SEATS[s] });
const loop = m => ({ motion: m, loop: true });
// Where each person can be (the pieces put them there): [across, distance], their seat (`_on`), turn, motion, look.
const P = (at, turn, does, look, on) => ({ at, turn, do: loop(does), look: look ?? null, on: on ?? null });
const inBoat = who => ({ on: 'boat', at: BOAT.seats[who] });
const PLACES = {
  papa: {
    path: P([5.2, 12.7], 250, 'hands_behind'),
    tree: P([1.5, 8.6], 245, 'hands_behind', 'moss#fire'),
    back: P(v(-0.2, 0.72), 180, 'seated', 'table', seat('back')),
    jetty_root: P([-11.6, 24.0], 270, 'hands_behind'),
    table: P(v(0.45, -0.7), 200, 'hands_behind', 'mama'),
    boat: P(BOAT.moored, 90, 'steer', null, inBoat('papa')),
  },
  mama: {
    stove: P([6.2, 14.55], 262, 'stir', 'stove#pan'),
    left: P(v(-1.25, -0.1), 90, 'seated', 'table', seat('left')),
    table: P(v(-0.25, -0.62), 15, 'hands_behind', 'table'),
    boat: P(BOAT.moored, 90, 'seated', 'papa', inBoat('mama')),
  },
  troll: {
    stream: P([-3.45, 10.2], 238, 'sit_look', [STREAM_A, 11.6, 0.4]),
    right: P(v(0.85, -0.1), 270, 'seated', 'papa', seat('right')),
    boat: P(BOAT.moored, 270, 'seated', 'groke', inBoat('troll')),
  },
  my: {
    stream: P([-3.3, 11.5], 222, 'hands_behind', [STREAM_A, 12.6, 0.4]),
    stool: P(v(-0.75, -0.82), 40, 'seated', 'papa', seat('stool')),
    post: P([-16.15, 23.55], 150, 'seated', 'papa', { on: 'jetty', at: JETTY.post }),
    boat: P(BOAT.moored, 90, 'seated', null, inBoat('my')),
  },
  groke: {
    beach: P(GROKE, 131, 'hands_behind', 'window_lit'),
  },
};
// ── the pieces (notes.md «Pieces»; the module beats) ─────────────────
// Each piece: `from` — where its people are, the camera, what of the place goes with it (the jam on the stove, the
// lamps, the luggage, the boat, the inserts); the play's keys (the hour, the moon, `paints`) are the game's and are not
// touched here. `run` — the piece, telling its moments.
function at(id, place, more = {}) {
  const p = PLACES[id][place];
  return {
    [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_on`]: p.on, [`${id}_turn`]: p.turn, [`${id}_do`]: p.do,
    [`${id}_look`]: p.look, [`${id}_reach`]: null, [`${id}_with`]: null, [`${id}_gait`]: null, ...more,
  };
}
const CAM0 = { camera_target: null, camera_shot: 'full', camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_h: 0, camera_yaw: 0, camera_look: 0 };
const cam = (target, shot, frame, more = {}) => ({ ...CAM0, camera_target: target, camera_shot: shot, camera_frame: frame ?? null, ...more });
// the place's own as a piece begins: the jam on the stove, the lamps, the luggage on the jetty, the bow lantern, the
// boat moored, the inserts shut
const PLACE0 = { jam: 0, lamps: 0, luggage: 0, lantern_bow: 0, boat_a: BOAT.moored[0], boat_d: BOAT.moored[1], chart: 0, basket: 0 };
// a cut inside a piece: its shot made ready ahead (`ready`), cut to when it is time
const ready = (s, values) => s.shot(values);
async function cutTo(s, shot) {
  await s.until(() => shot.ready);
  shot.cut();
}
// П.1–П.3: Mama at the stove, the children by the stream, the Groke far off on the beach; the house's window lit early
const GARDEN = () => ({ ...PLACE0, jam: 1, lamps: 0.5, ...at('mama', 'stove'), ...at('troll', 'stream'), ...at('my', 'stream'), ...at('groke', 'beach') });
// the pose for М1: Papa beside the moss, the moss (apple#moss) in the middle of 4:3
const LADLE = () => cam('papa', 'wide', [0.65, 0.55]);
const FILM = {
  // П.1: the garden at the end of August; Papa strolls along the path to the apple tree
  garden: {
    from: () => ({ ...GARDEN(), moss: 'green', smoke: 0, frost: 0, ...at('papa', 'path', { papa_gait: 'stroll' }), ...CAM0 }),
    run: async s => {
      const papa = s.person('papa');
      await s.wait(1.5);
      s.tell('garden:walk');
      const walk = papa.walk([[3.6, 11.4], [2.2, 9.6], [1.5, 8.6]]);
      await s.wait(2);
      s.camera({ target: 'papa', shot: 'wide', frame: [0.55, 0.55], glide: 4 });
      await walk;
      papa.turn(245);
      papa.look('moss#fire');
      s.camera({ target: 'papa', shot: 'wide', frame: [0.65, 0.55], glide: 2.5 });
      await s.wait(2);
      s.tell('garden:tree');
      await s.wait(1);
    },
  },
  // П.2: the thread of smoke; Papa's face lights up; the ladle — the pose for М1
  smoke: {
    after: 'garden',
    from: () => ({ ...GARDEN(), moss: 'green', smoke: 0, frost: 0, ...at('papa', 'tree'), ...LADLE() }),
    run: async s => {
      s.set('moss', 'smoulder');
      s.set('smoke', 0);
      const face = ready(s, cam('papa', 'close', [0.5, 0.45]));
      await s.wait(2);
      s.set('papa_mood', 'surprised');
      await cutTo(s, face);
      await s.wait(0.8);
      s.set('papa_mood', 'smile');
      s.tell('smoke:seen');
      await s.wait(1.5);
      const pose = ready(s, LADLE());
      s.set('papa_with', ['ladle']);
      await cutTo(s, pose);
      await s.wait(0.8);
    },
  },
  // П.3: nobody gasps — Mama comes to the spot and goes back to her jam; My; Papa alone with the ladle
  spot: {
    after: 'smoke',
    from: () => ({ ...GARDEN(), moss: 'burnt', smoke: 1, frost: 0, ...at('papa', 'tree', { papa_with: ['ladle'] }), ...LADLE() }),
    run: async s => {
      const papa = s.person('papa'), mama = s.person('mama'), my = s.person('my');
      s.set('moss', 'burnt');
      papa.look(null);
      s.tell('spot:shout');
      await s.wait(2);
      s.camera({ target: 'papa', shot: 'wide', frame: [0.7, 0.55], glide: 3 });
      s.set('mama_do', loop('hands_behind'));
      await mama.walk([[6.95, 14.2], [7.0, 13.4], [4.0, 12.0], [1.2, 10.4], [0.35, 9.65]]);
      mama.turn(200);
      mama.look('moss#fire');
      await s.wait(0.8);
      s.tell('spot:mama');
      await s.wait(2.5);
      s.tell('spot:back');
      const back = mama.walk([[1.2, 10.4], [4.0, 12.0], [7.0, 13.4], [6.95, 14.2], [6.2, 14.55]]);
      await s.wait(1.2);
      await my.walk([[-1.8, 10.0], [-0.5, 9.5]]);
      my.look('moss#fire');
      s.tell('spot:my');
      await s.wait(2.2);
      await my.walk([[-1.8, 10.0], [-3.3, 11.5]]);
      papa.look('moss#fire');
      s.set('papa_mood', 'thinking');
      s.camera({ target: 'papa', shot: 'medium', frame: [0.5, 0.5], glide: 2.5 });
      await back;
      mama.turn(262);
      s.set('mama_do', loop('stir'));
      s.tell('spot:alone');
      await s.wait(2);
    },
  },
  // П.3: far off on the beach the Groke looks at the lit window; the grass round her whitens
  groke_far: {
    after: 'spot',
    from: () => ({ ...GARDEN(), moss: 'burnt', smoke: 1, frost: 0, ...at('papa', 'tree', { papa_with: ['ladle'] }), ...cam('papa', 'medium', [0.5, 0.5]) }),
    run: async s => {
      s.camera({ target: 'groke', shot: 'wide', frame: [0.5, 0.6], glide: 4 });
      await s.wait(2);
      await s.move('frost', 0.4, { over: 5 });
      s.tell('groke_far:white');
      await s.wait(1);
    },
  },
  // П.4: night on the veranda — Papa alone at the chart under the lamp; the chart close: the pose for ⚑ tell
  map: {
    from: () => ({ ...PLACE0, lamps: 1, ...at('papa', 'back'), ...at('groke', 'beach'), ...cam('papa', 'full', [0.5, 0.55]) }),
    run: async s => {
      s.camera({ target: 'papa', shot: 'medium', frame: [0.5, 0.45], glide: 4 });
      await s.wait(4);
      s.tell('map:face');
      await s.wait(1.5);
      await s.move('chart', 1, { over: 0.6 });
      s.tell('map:chart');
      await s.wait(1);
    },
  },
  // П.5 «to everyone»: the supper — Papa's news, the son's spoon, Mama silent
  supper: {
    from: () => ({ ...PLACE0, lamps: 1, ...at('papa', 'back'), ...at('mama', 'left'), ...at('troll', 'right', { troll_with: ['spoon'] }), ...at('my', 'stool'),
      ...cam('table', 'wide', [0.5, 0.68]) }),
    run: async s => {
      const son = ready(s, cam('troll', 'close', [0.5, 0.45]));
      await s.wait(1);
      s.set('papa_do', 'rise_half');
      s.tell('supper:said');
      await s.wait(3);
      s.set('troll_do', 'seated_push');
      await cutTo(s, son);
      await s.wait(1);
      s.set('troll_with', null);
      s.set('troll_do', loop('seated'));
      s.person('troll').look('papa');
      s.tell('supper:spoon');
      await s.wait(2.5);
      const papa = ready(s, cam('papa', 'medium', [0.5, 0.45]));
      await cutTo(s, papa);
      s.tell('supper:beam');
      await s.wait(2.5);
      const mama = ready(s, cam('mama', 'close', [0.5, 0.45]));
      await cutTo(s, mama);
      s.person('mama').look([7.2, 15.2, 1.0]);
      await s.wait(1.5);
      s.tell('supper:mama');
      await s.wait(1.5);
    },
  },
  // П.5 «to Mama»: late evening, the two at the chart; Mama looks at the dot a long time
  late: {
    from: () => ({ ...PLACE0, lamps: 1, ...at('papa', 'back'), ...at('mama', 'left'), ...cam('table', 'wide', [0.5, 0.65]) }),
    run: async s => {
      const face = ready(s, cam('mama', 'close', [0.5, 0.45]));
      await s.wait(1.5);
      await s.move('chart', 1, { over: 0.5 });
      await s.wait(2.5);
      await s.move('chart', 0, { over: 0.5 });
      await cutTo(s, face);
      await s.wait(1.5);
      s.tell('late:look');
      await s.wait(3);
      const both = ready(s, cam('table', 'wide', [0.5, 0.65]));
      await cutTo(s, both);
      s.person('mama').look('papa');
      s.tell('late:yes');
      await s.wait(2);
    },
  },
  // П.5, the morning after «to Mama»: My on the post; Papa packs the boat alone
  morning: {
    from: () => ({ ...PLACE0, luggage: 1, ...at('papa', 'jetty_root', { papa_with: ['bundle'], papa_gait: 'carry_walk' }), ...at('my', 'post'),
      ...CAM0, camera_x: -11.5, camera_z: 15 }),
    run: async s => {
      const papa = s.person('papa');
      s.camera({ target: 'my', shot: 'full', frame: [0.4, 0.55], glide: 2 });
      await s.wait(2);
      s.tell('morning:my');
      await s.wait(2.5);
      s.camera({ target: 'papa', shot: 'wide', frame: [0.5, 0.55], glide: 2.5 });
      await papa.walk([[-14.6, 24.0]]);
      await papa.do('put_down');
      s.set('papa_with', null);
      s.set('papa_gait', null);
      s.tell('morning:pack');
      await papa.walk([[-12.6, 24.05]]);
      papa.turn(260);
      await s.wait(1);
    },
  },
  // П.6: Mama packs the basket (the insert): hat, notebook, sweater; the candles in and back on the shelf; the jar
  // under the sweater; the paints last on top — or nothing more (the play's `paints`)
  basket: {
    from: () => ({ ...PLACE0, ...at('mama', 'table'), ...at('papa', 'table'), packed: 0, candles: 'shelf', ...cam('mama', 'full', [0.5, 0.55]) }),
    run: async s => {
      await s.wait(1);
      await s.move('basket', 1, { over: 0.6 });
      for (let k = 1; k <= 3; k++) {
        await s.wait(1);
        s.set('packed', k);
      }
      await s.wait(1);
      s.set('candles', 'basket');
      s.tell('basket:candles');
      await s.wait(4);
      s.set('candles', 'shelf');
      await s.wait(1);
      s.set('packed', 4);
      s.tell('basket:jam');
      await s.wait(2);
      if (s.get('paints')) s.set('packed', 5);
      s.tell('basket:paints');
      await s.wait(1.5);
    },
  },
  // П.6: the evening of the 22nd — the boat pushes off with her lantern on the bow; the Groke walks down to the water
  push_off: {
    from: () => ({ ...PLACE0, lamps: 0.4, frost: 0.4, ...at('papa', 'boat'), ...at('mama', 'boat', { mama_with: ['basket'] }), ...at('troll', 'boat'),
      ...at('my', 'boat'), ...at('groke', 'beach'), ...CAM0, camera_x: -11.5, camera_z: 15 }),
    run: async s => {
      await s.wait(1.5);
      await s.move('lantern_bow', 1, { over: 0.8 });
      s.tell('push_off:lantern');
      await s.wait(1.5);
      s.camera({ target: 'boat', shot: 'wide', frame: [0.4, 0.55], glide: 3 });
      const away = s.path(['boat_a', 'boat_d'], [BOAT.moored, ...BOAT.away], { speed: 1.4, ease: 'inOut' });
      await s.wait(3);
      s.tell('push_off:away');
      await s.wait(3);
      const groke = s.person('groke');
      s.camera({ target: 'groke', shot: 'wide', frame: [0.55, 0.6], glide: 3.5 });
      groke.look('boat#lantern');
      s.set('groke_gait', 'glide');
      s.move('frost', 1, { over: 6 });
      await groke.walk([GROKE_WATER]);
      s.tell('push_off:groke');
      await s.any(away, s.wait(2));
      await s.wait(1);
    },
  },
};
// the play's keys the showcase gives each piece (in a game the game gives them)
const SHOW = {
  garden: { dusk: 1, night: 0, dawn: 0 },
  smoke: {},
  spot: {},
  groke_far: {},
  map: { dusk: 0, night: 1 },
  supper: { dusk: 0.6, night: 0.5 },
  late: { dusk: 0, night: 1 },
  morning: { night: 0, dawn: 0.7 },
  basket: { dawn: 0, paints: true },
  push_off: { dusk: 1 },
};
// (a piece that follows the one before in the showcase is not cut to: its play's keys are set as it begins)
const SHOWFILM = Object.fromEntries(Object.entries(FILM).map(([k, b]) => [k, {
  ...b,
  from: () => ({ ...SHOW[k], ...b.from() }),
  run: async s => {
    for (const key in SHOW[k]) s.set(key, SHOW[k][key]);
    await b.run(s);
  },
}]));
return { WATER, BEACH, STREAM_A, SHORE, coast, land, sm, GROKE, GROKE_WATER, HOUSE_AT, HOUSE, VERANDA, SEATS, JETTY, BOAT, PLACES, FILM, SHOWFILM };
