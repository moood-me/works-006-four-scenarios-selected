// The Fisherman's cape and the island behind it, shared by the relief, the granite's painting and the sea's (its
// shallows, the foam at the waterline): the viewer's rock and the low tongue of the cape running out to the left, his
// stone shelter on it, a cove of water ahead, the long back of the island on the right rising to the lighthouse's
// knoll, some sixty metres off. Made of the island's shapes (modules/island). Metres: across (right +), distance (ahead), the height over the viewer's rock.
const { ridge, bump, shoreOf } = kit.island;
const SEA = -1.6;
// the rocks on the way over the cape from the island's back to the Fisherman — knobs of its granite Papa holds on to
// in the storm: [across, distance, height]; the granite names their tops `granite#hold1…3`
const HOLDS = [[3.2, 5.6, 0.32], [1.8, 6.4, 0.38], [0.4, 6.6, 0.3]];
function raw(a, d) {
  return -2.6
    + ridge(a, d, 3, -6, -22, 34, 3.1, 1.6, 8.5)
    + ridge(a, d, 14, -10, 28, 54, 3.0, 3.6, 12)
    + 2.6 * bump(a, d, 28, 54, 7, 6)
    + 0.8 * bump(a, d, -3.4, 6.6, 1.8, 1.5)
    - 1.6 * bump(a, d, 6, 20, 4.5, 8)
    + HOLDS.reduce((s, [ha, hd, hh]) => s + hh * bump(a, d, ha, hd, 0.75, 0.55), 0);
}
const H0 = raw(0, 0);
function land(a, d) {
  return raw(a, d) - H0;
}
// where the land meets the sea (the island's painters ask it): fn(across, distance, h) where h is within [lo, hi]
const shore = shoreOf(land, SEA, -34, 56, -10, 80);
// a fishing net seen flat (metres, y down): diamond meshes of `cell` metres between its top edge and its bottom,
// top(x) and bottom(x), from x0 to x1 — each mesh its two upper sides, one path
function net(g, x0, x1, top, bottom, cell, color) {
  g.strokeStyle = color;
  g.lineWidth = cell * 0.08;
  g.lineJoin = "round";
  g.beginPath();
  const h = cell * 0.5;
  for (let x = x0, i = 0; x <= x1 + 1e-6; x += h, i++) {
    const t = top(x), b = bottom(x);
    for (let y = t + (i % 2) * h; y + h <= b + 1e-6; y += cell) {
      g.moveTo(x - h, y + h);
      g.lineTo(x, y);
      g.lineTo(x + h, y + h);
    }
  }
  g.stroke();
}
// the people's places (`<id>_at`; the scene's script puts them there): where each stands or sits, turned how, doing
// what, looking at what
const stand = { motion: 'stand', loop: true };
const PLACES = {
  fisher: {
    seat: { at: [-0.9, 3.6], on: [-0.9, 3.6, 0.3], turn: 250, do: 'seated', look: [-40, 8, 1.2] },
    away: { at: [-1.2, 10.5], turn: 300, do: stand, look: [-60, 30, 1.5] },
  },
  papa: {
    beside: { at: [0.75, 4.15], turn: 215, do: 'sit_look', look: [-40, 24, 1] },
    behind: { at: [1.3, 4.7], turn: 245, do: 'hands_behind', look: 'fisher' },
    net: { at: [0.75, 4.15], turn: 235, do: 'sit_look', look: 'net#knot' },
    under: { at: [-0.15, 3.85], turn: 240, do: 'sit_look', look: [-40, 8, 1] },
    stand: { at: [1.7, 4.4], turn: 245, do: stand, look: 'fisher' },
    from_island: { at: [4.6, 3.4], turn: 270, do: stand, look: 'fisher' },
    leaving: { at: [5.0, 3.2], turn: 270, do: stand, look: 'seat' },
  },
  mama: {
    steps: { at: [27.2, 51.1], on: [27.2, 51.1, 0.35], turn: 200, do: 'seated', look: [0, 5, 1] },
    beside: { at: [1.95, 4.6], turn: 225, do: 'sit_look', look: 'papa' },
    apart: { at: [3.7, 3.3], turn: 120, do: 'sit_look', look: [30, 20, 1] },
    path_in: { at: [3.5, 3.0], turn: 280, do: stand, look: 'bread#stone' },
  },
  my: {
    rock: { at: [-3.0, 6.4], turn: 200, do: 'sit_look', look: [-20, -5, 1] },
  },
  troll: {
    near: { at: [2.7, 5.2], turn: 225, do: 'sit_look', look: 'fisher' },
  },
};
// ── the pieces (notes.md «Pieces»; the module beats) ─────────────────
// Each piece: `from` — where its people stand and its camera (the play's keys — the hour, the weather, the net, the
// bread, the pie, the matchbox, Mama's place, the Fisherman's mark — are the game's), `run` — the piece, telling its
// moments. Its people are put at a place with `at` (all their keys at once, `<id>_placed` with them).
const loop = m => ({ motion: m, loop: true });
function at(id, place, more = {}) {
  const p = PLACES[id][place];
  return {
    [`${id}_at`]: place, [`${id}_placed`]: place, [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_on`]: p.on ?? null,
    [`${id}_turn`]: p.turn, [`${id}_do`]: p.do, [`${id}_look`]: p.look ?? null, [`${id}_reach`]: null,
    [`${id}_gait`]: null, ...more,
  };
}
const CAM0 = { camera_target: null, camera_shot: 'full', camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_h: 0, camera_yaw: 0, camera_look: 0, camera_pitch: 0 };
const cam = (target, shot, frame, more = {}) => ({ ...CAM0, camera_target: target, camera_shot: shot, camera_frame: frame ?? null, ...more });
const ready = (s, values) => s.shot(values);
function setAll(s, values) {
  for (const k in values) s.set(k, values[k]);
}
// the operator framing a target, the camera's own offsets (left by a hand-set shot before) brought back to none
function frame(s, o) {
  for (const k of ['camera_x', 'camera_z', 'camera_h', 'camera_yaw', 'camera_look']) s.move(k, 0, { over: o.glide ?? 1.5, ease: 'inOut' });
  return s.camera(o);
}
async function cutTo(s, shot) {
  await s.until(() => shot.ready);
  shot.cut();
}
// the way over the rocks from the island's back to the Fisherman: where Papa stands before the first hold, at each
// hold (granite#hold1…3: lib HOLDS), and by him — `cross` (0…3, the storm) and `carry` (0…1, the pie, the bread) put
// him along it (the script)
const WAY = [[4.6, 5.0], ...HOLDS.map(([a, d]) => [a + 0.15, d - 0.55]), [0.3, 4.4]];
WAY.forEach(([a, d], k) => { PLACES.papa[`way${k}`] = { at: [a, d], turn: 280, do: stand, look: 'fisher' }; });
// where the beam points from the lighthouse at the Fisherman (degrees, as `beam_turn` goes)
const BEAM_AT_HIM = ((Math.atan2(-0.9 - 28, 3.6 - 54) * 180) / Math.PI + 360) % 360;
// the beam's tilt from the lantern down to the Fisherman's chest (degrees, `beam_tilt`)
const TILT_AT_HIM = (Math.atan2(land(-0.9, 3.6) + 0.9 - (land(28, 54) - 0.45 + 12.6), Math.hypot(28.9, 50.4)) * 180) / Math.PI;
const turnNear = (s, b) => () => {
  const t = (((s.get('beam_turn') ?? 0) % 360) + 360) % 360;
  return Math.abs(((t - b + 540) % 360) - 180) < 8;
};
const KNOT_SHOT = 'knot_open';
// the camera before the two on the cape's left, low, turned to them: their faces (close — nearer)
const FACES = { ...CAM0, camera_x: -2.7, camera_z: 2.3, camera_h: -0.55, camera_yaw: 55, camera_look: 0.05 };
const FACES_CLOSE = { ...CAM0, camera_x: -1.9, camera_z: 2.75, camera_h: -0.7, camera_yaw: 62, camera_look: 0.06 };
// the way over the rocks seen from the right, the cape and the Fisherman beyond
const WAY_CAM = { ...CAM0, camera_x: 5.8, camera_z: -0.6, camera_h: 0.3, camera_yaw: -28, camera_look: 0.08 };
// the camera moved to a place over a moment (each key; a cut is `s.cut`/a shot)
function glideTo(s, values, over = 1.8) {
  s.set('camera_target', null);
  for (const k of ['camera_x', 'camera_z', 'camera_h', 'camera_yaw', 'camera_look']) s.move(k, values[k], { over, ease: 'inOut' });
}
// the knot close after the knot is undone: the knot itself — the Fisherman's sign, the same as under the keeper's
// lines on the wall (the scenario's «the same knot») —, not the tangle's thread
// a wave coming in over the rocks (the key `wave`, the surge's): up, held a moment at its peak (`peak` — its moment
// told there), back
async function wave(s, peak) {
  await s.move('wave', 1, { over: 1.4, ease: 'in' });
  if (peak) s.tell(peak);
  await s.wait(0.8);
  await s.move('wave', 0, { over: 2.2, ease: 'out' });
}
async function knotClose(s, paws = 1) {
  s.set('knot_paws', paws);
  s.set('knot_pull', 0);
  s.set(KNOT_SHOT, 1);
  await s.wait(2.5);
  s.set(KNOT_SHOT, 0);
}

const FILM = {
  // 1.6 — Papa comes onto the cape behind the Fisherman; he does not turn (the choice: fisher#chest)
  approach: {
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'from_island'), ...FACES }),
    run: async s => {
      const papa = s.person('papa');
      await papa.walk([[1.3, 4.7]]);
      await papa.turn(245);
      papa.look('fisher');
      s.tell('approach:behind');
      glideTo(s, FACES_CLOSE, 2);
      await s.wait(2);
    },
  },
  // 1.7 «keeper» — he turns his head at «keepers», and away; Papa goes off pleased; he looks at the lighthouse
  keeper: {
    after: 'approach',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'behind'), ...FACES }),
    run: async s => {
      const fisher = s.person('fisher'), papa = s.person('papa');
      fisher.look('papa');
      s.tell('keeper:turn');
      await s.wait(1.6);
      fisher.look([-40, 2, 1.2]);
      s.set('papa_mood', 'smile');
      await s.wait(1);
      frame(s, { target: 'fisher', shot: 'wide', frame: [0.4, 0.5], glide: 2 });
      await papa.walk([[4.6, 3.4], [7.5, 3.0]]);
      fisher.look('lighthouse#lantern');
      s.tell('keeper:gone');
      await s.wait(2.5);
    },
  },
  // 1.7 «invite» — «No need»; he gets up with his net and goes further off; Papa alone
  invite: {
    after: 'approach',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'behind'), ...FACES }),
    run: async s => {
      const fisher = s.person('fisher');
      s.tell('invite:no');
      await s.wait(3.5);
      await fisher.do('rise');
      s.set('fisher_on', null);
      s.tell('invite:up');
      frame(s, { target: 'papa', shot: 'wide', frame: [0.55, 0.5], glide: 2 });
      await fisher.walk([[-2.6, 6.2], [-1.2, 10.5]]);
      s.set('papa_mood', 'sad');
      s.tell('invite:gone');
      await s.wait(2);
    },
  },
  // 1.7 «sit» — Papa sits down beside him; the long pause; «The sea is good today» — «Good»
  sit: {
    after: 'approach',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'behind'), ...FACES }),
    run: async s => {
      const papa = s.person('papa');
      await papa.walk([[0.75, 4.15]]);
      await papa.turn(215);
      await papa.do('sit_floor');
      papa.do('sit_look', { loop: true });
      papa.look([-40, 24, 1]);
      s.tell('sit:sat');
      glideTo(s, FACES, 2.5);
      await s.wait(4);
      s.tell('sit:sea');
      await s.wait(4);
    },
  },
  // 2.3 «invited» — Mama on her way puts a loaf on the flat stone and goes on
  bread: {
    from: () => ({ ...at('mama', 'path_in', { mama_with: ['bread'], mama_gait: 'carry_walk' }), ...cam('bread', 'wide', [0.5, 0.55]) }),
    run: async s => {
      const mama = s.person('mama');
      await mama.walk([[-2.0, 5.0]]);
      mama.look('bread#stone');
      await mama.do('put_down');
      s.set('mama_with', null);
      s.set('bread', true);
      s.tell('bread:left');
      s.set('mama_gait', null);
      await mama.walk([[-4.5, 7.6]]);
    },
  },
  // 2.4 «sat beside» — Papa sits as the first time; the knot in the net before him (the knot minigame)
  net_sit: {
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'net', { papa_do: loop('mend_net') }), ...cam('net#knot', 'wide', [0.5, 0.55]) }),
    run: async s => {
      await s.wait(2);
      frame(s, { target: 'net#knot', shot: 'full', frame: [0.5, 0.5], glide: 2 });
      await s.wait(2);
      s.tell('net_sit:ready');
      await s.wait(1);
    },
  },
  // 2.4 «sat beside» — the knot undone: he does not take the net away; «Why isn't he lit?» — «He shines outward»; the knot close
  net_ask: {
    after: 'net_sit',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'net'), ...FACES }),
    run: async s => {
      const fisher = s.person('fisher'), papa = s.person('papa');
      glideTo(s, FACES);
      fisher.look('papa#hand_r');
      await s.wait(2);
      papa.look('fisher');
      s.tell('net_ask:asked');
      await s.wait(3);
      fisher.look([-60, 30, 1.2]);
      await s.wait(2.5);
      s.tell('net_ask:answer');
      await s.wait(3);
      s.tell('net_ask:knot');
      await knotClose(s);
    },
  },
  // 2.4 «keeper»/«invited» — he sees Papa coming and goes; the net stays caught; Papa sits down at it (the knot minigame)
  net_left: {
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'from_island'), ...cam('fisher', 'full', [0.45, 0.5]) }),
    run: async s => {
      const fisher = s.person('fisher'), papa = s.person('papa');
      fisher.look('papa');
      await s.wait(1);
      await fisher.do('rise');
      s.set('fisher_on', null);
      fisher.walk([[-2.6, 6.2], [-1.2, 10.5]]);
      await papa.walk([[1.3, 4.7]]);
      s.tell('net_left:gone');
      await papa.walk([[0.75, 4.15]]);
      await papa.turn(235);
      await papa.do('sit_floor');
      papa.do('mend_net', { loop: true });
      papa.look('net#knot');
      frame(s, { target: 'net#knot', shot: 'full', frame: [0.5, 0.5], glide: 2 });
      await s.wait(1.5);
      s.tell('net_left:ready');
    },
  },
  // 2.4 — he comes back fast, takes the net out of Papa's paws and goes; the knot close
  net_taken: {
    after: 'net_left',
    from: () => ({ ...at('fisher', 'away'), ...at('papa', 'net', { papa_do: loop('mend_net') }), ...cam('papa', 'wide', [0.5, 0.5]) }),
    run: async s => {
      const fisher = s.person('fisher'), papa = s.person('papa');
      frame(s, { target: 'papa', shot: 'wide', frame: [0.5, 0.5], glide: 1.5 });
      await fisher.walk([[-0.2, 4.6]]);
      fisher.reach({ r: 'net#knot' });
      await s.wait(1);
      s.set('net', 'dry');
      fisher.reach(null);
      s.set('papa_do', loop('sit_look'));
      s.tell('net_taken:taken');
      fisher.walk([[-2.6, 6.2], [-1.2, 10.5]]);
      papa.look('papa#hand_r');
      await s.wait(3);
      s.tell('net_taken:knot');
      await knotClose(s);
    },
  },
  // 4.3 — the storm at night: the wave in under him; he does not get up
  under_wave: {
    from: () => ({ ...at('fisher', 'seat'), ...FACES }),
    run: async s => {
      await s.wait(1.5);
      await wave(s, 'under_wave:wave');
      await s.wait(1);
    },
  },
  // 4.4 «cape» — Papa with the lantern over the rocks (the rocks minigame: granite#hold1…3)
  crossing: {
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'way0', { papa_with: ['lantern'], papa_gait: 'lantern_walk' }), papa_lantern: 1, cross: 0, ...WAY_CAM }),
    run: async s => {
      await s.wait(2.5);
      s.person('papa').look('granite#hold1');
      s.tell('crossing:ready');
      await s.wait(1);
    },
  },
  // 4.4 — the lantern blows out; «You won't get me!»; the moon in a rent of the clouds
  blown: {
    after: 'crossing',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'way3', { papa_with: ['lantern'] }), papa_lantern: 1, ...WAY_CAM }),
    run: async s => {
      const papa = s.person('papa');
      await s.wait(1);
      s.move('papa_lantern', 0, { over: 0.4 });
      s.set('papa_with', ['lantern_out']);
      await s.wait(0.8);
      papa.look([-40, 10, 2]);
      await papa.do('shout');
      s.tell('blown:out');
      await s.wait(2.5);
    },
  },
  // 4.4 — the sleeve; he does not move; Papa sits beside him under the same wave
  sleeve: {
    after: 'blown',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'way3', { papa_with: ['lantern_out'] }), papa_lantern: 0, ...WAY_CAM }),
    run: async s => {
      const papa = s.person('papa');
      glideTo(s, FACES, 3);
      await papa.walk([[-0.1, 4.0]]);
      papa.reach({ r: 'fisher#hand_r' });
      papa.do('pull_rope', { loop: true });
      await s.wait(2.5);
      papa.reach(null);
      s.tell('sleeve:let_go');
      await papa.do('sit_floor');
      papa.do('sit_look', { loop: true });
      papa.look([-40, 8, 1]);
      await s.wait(1.2);
      await wave(s, 'sleeve:wave');
      await s.wait(1);
    },
  },
  // 4.4 — lightning: both faces close; the knot on his knees close
  lightning: {
    after: 'sleeve',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'under', { papa_with: ['lantern_out'] }), ...FACES_CLOSE }),
    run: async s => {
      const faces = s.shot({ ...FACES_CLOSE });
      await cutTo(s, faces);
      s.set('flash', 1);
      s.move('flash', 0, { over: 0.8, ease: 'out' });
      s.tell('lightning:faces');
      await s.wait(2.5);
      s.set('flash', 0.8);
      s.move('flash', 0, { over: 0.8, ease: 'out' });
      s.tell('lightning:knot');
      await knotClose(s, 0);
    },
  },
  // 4.4, otherwise — he says nothing; under the waves, the storm thinning toward dawn
  till_dawn: {
    after: 'lightning',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'under', { papa_with: ['lantern_out'] }), ...cam('fisher', 'full', [0.45, 0.5]) }),
    run: async s => {
      glideTo(s, FACES, 3);
      s.move('storm', 0.6, { over: 8 });
      s.move('night', 0.6, { over: 8 });
      await s.wait(5);
      s.tell('till_dawn:stay');
      await s.wait(4);
    },
  },
  // 4.4, «sat beside» — «On a night like this he should be burning»; his palm on his knee, pressing, as a burner is held
  spoke: {
    after: 'lightning',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'under', { papa_with: ['lantern_out'] }), ...FACES }),
    run: async s => {
      const fisher = s.person('fisher');
      glideTo(s, FACES);
      fisher.look('lighthouse#lantern');
      await s.wait(1.5);
      s.tell('spoke:line');
      await s.wait(3);
      fisher.reach({ r: [-1.25, 3.35, 0.42] });
      s.person('papa').look('fisher#hand_r');
      s.tell('spoke:palm');
      await s.wait(2.5);
      fisher.reach(null);
      await s.wait(2);
    },
  },
  // 4.4 «lighthouse», two sheets — the beam over the storm and the cape; he lifts his face to the light
  beam_cape: {
    from: () => ({ ...at('fisher', 'seat'), ...FACES }),
    run: async s => {
      s.move('beam_tilt', TILT_AT_HIM, { over: 2, ease: 'inOut' });
      await s.until(turnNear(s, BEAM_AT_HIM - 20));
      s.person('fisher').look('lighthouse#lantern');
      await s.until(turnNear(s, BEAM_AT_HIM));
      s.tell('beam_cape:face');
      await s.wait(3);
      s.move('beam_tilt', -1, { over: 2, ease: 'inOut' });
    },
  },
  // «Pie» — Papa sets out over the stones with the pie (the carry minigame)
  pie_way: {
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'way0', { papa_with: ['pie'], papa_gait: 'carry_walk', papa_do: loop('hold') }), carry: 0, ...WAY_CAM }),
    run: async s => {
      await s.wait(2.5);
      s.tell('pie_way:ready');
      await s.wait(1);
    },
  },
  // «Pie» — the pie set down; a long pause; he breaks off a piece and eats; «The sea is good today»
  pie: {
    after: 'pie_way',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'way4', { papa_with: ['pie'] }), ...FACES }),
    run: async s => {
      const papa = s.person('papa'), fisher = s.person('fisher');
      glideTo(s, FACES, 3);
      await papa.walk([[0.1, 3.7]]);
      await papa.do('put_down');
      s.set('papa_with', null);
      s.set('pie', true);
      s.tell('pie:set');
      await papa.walk([[0.75, 4.15]]);
      await papa.turn(215);
      await papa.do('sit_floor');
      papa.do('sit_look', { loop: true });
      await s.wait(4);
      fisher.reach({ r: 'pie#pie' });
      await s.wait(1.2);
      fisher.reach(null);
      fisher.do('eat', { loop: true });
      s.tell('pie:eat');
      await s.wait(3);
      s.tell('pie:sea');
      glideTo(s, FACES);
      await s.wait(3);
    },
  },
  // «Pie», «spoke» — the matchbox into his palm; «No need» — his fist closes on it
  matches_palm: {
    after: 'pie',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'beside'), pie: true, ...FACES }),
    run: async s => {
      s.person('papa').reach({ r: 'fisher#hand_r' });
      await s.wait(1.2);
      s.set('matchbox', 'palm');
      s.person('papa').reach(null);
      s.tell('matches_palm:no');
      await s.wait(3);
    },
  },
  // «Pie» otherwise, late «Pie» — the matchbox on the stone beside him
  matches_stone: {
    after: ['pie', 'bread_take'],
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'beside'), ...cam('seat', 'full', [0.45, 0.55]) }),
    run: async s => {
      frame(s, { target: 'seat', shot: 'full', frame: [0.45, 0.55], glide: 1.5 });
      s.person('papa').reach({ r: 'box#box' });
      await s.wait(1.2);
      s.set('matchbox', 'stone');
      s.person('papa').reach(null);
      s.tell('matches_stone:left');
      await s.wait(2.5);
    },
  },
  // «Pie» — Mama gets up first, «I'll go wash the tin» — «Go, go»; she goes off alone; they all stand
  pie_leave: {
    after: ['matches_palm', 'matches_stone'],
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'beside'), ...cam(null, 'full', null) }),
    run: async s => {
      const mama = s.person('mama');
      frame(s, { target: 'papa', shot: 'wide', frame: [0.5, 0.5], glide: 2 });
      await mama.do('rise_floor');
      s.tell('pie_leave:up');
      await s.wait(2.5);
      s.tell('pie_leave:go');
      await s.wait(1.5);
      await mama.walk([[4.6, 3.4], [7.5, 3.0]]);
      s.tell('pie_leave:gone');
      await s.person('papa').do('rise_floor');
      if (s.get('fisher_mark') === 'sat') {
        await s.person('fisher').do('rise');
        s.set('fisher_on', null);
      }
      await s.wait(1.5);
    },
  },
  // «Pie», full — from the path Papa looks back: the stone empty
  stone_empty: {
    after: 'pie_leave',
    from: () => ({ ...at('papa', 'leaving'), ...cam('seat', 'wide', [0.4, 0.55]) }),
    run: async s => {
      // (it follows `pie_leave`: a cut to Papa on the path looking back, the stone in the frame)
      await cutTo(s, ready(s, { ...at('papa', 'leaving'), matchbox: 'none', ...cam('seat', 'wide', [0.4, 0.55]) }));
      s.person('papa').look('seat');
      await s.wait(1.5);
      s.tell('stone_empty:empty');
      await s.wait(3);
    },
  },
  // late «Pie» — the last frame: the matchbox on the stone, held
  box_shot: {
    from: () => ({ matchbox: 'stone', ...cam('box#box', 'close', [0.5, 0.5]) }),
    run: async s => {
      await s.wait(1.5);
      s.tell('box_shot:box');
      await s.wait(3);
    },
  },
  // late «Pie» — Papa alone sets out over the stones with the bread (the carry minigame)
  bread_way: {
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'way0', { papa_with: ['bread'], papa_gait: 'carry_walk', papa_do: loop('hold') }), carry: 0, ...WAY_CAM }),
    run: async s => {
      await s.wait(2.5);
      s.tell('bread_way:ready');
      await s.wait(1);
    },
  },
  // late «Pie» — he takes the bread without turning; «There was no need» (and with «spoke»: «It'll be calm tomorrow too»)
  bread_take: {
    after: 'bread_way',
    from: () => ({ ...at('fisher', 'seat'), ...at('papa', 'way4', { papa_with: ['bread'] }), ...FACES }),
    run: async s => {
      const papa = s.person('papa'), fisher = s.person('fisher');
      glideTo(s, FACES);
      await papa.walk([[0.0, 3.8]]);
      papa.reach({ r: 'fisher#hand_r' });
      fisher.reach({ r: 'papa#hand_r' });
      await s.wait(1.2);
      s.set('papa_with', null);
      s.set('fisher_with', ['bread']);
      papa.reach(null);
      fisher.reach(null);
      s.tell('bread_take:line');
      await s.wait(3);
      s.tell('bread_take:more');
      await papa.walk([[0.75, 4.15]]);
      await papa.turn(215);
      await papa.do('sit_floor');
      papa.do('sit_look', { loop: true });
      await s.wait(1);
    },
  },
  // «Beam» — the beam over the cape: the Fisherman on his stone, lit and left
  beam_pass: {
    from: () => ({ ...at('fisher', 'seat'), ...cam('fisher', 'full', [0.45, 0.5]) }),
    run: async s => {
      s.move('beam_tilt', TILT_AT_HIM, { over: 2, ease: 'inOut' });
      await s.until(turnNear(s, BEAM_AT_HIM));
      s.tell('beam_pass:fisher');
      await s.wait(2.5);
      s.move('beam_tilt', -1, { over: 2, ease: 'inOut' });
    },
  },
  // common shots — the Fisherman by his mark, his net by «Net»
  look_fisher: {
    from: () => ({ ...at('fisher', 'seat'), ...cam('fisher', 'full', [0.45, 0.5]) }),
    run: async s => {
      const fisher = s.person('fisher'), mark = s.get('fisher_mark') ?? 'keeper';
      if (mark === 'keeper') fisher.look([-60, -10, 1.2]);
      else if (mark === 'sat') fisher.look([0.75, 4.15, 0.8]);
      await s.wait(1.5);
      if (mark === 'invited') await fisher.do('lift_hand');
      s.tell('look_fisher:net');
      await s.wait(2.5);
    },
  },
};
// the play's keys the showcase gives each piece (in a game the game gives them)
const SHOW = {
  approach: { mama_at: 'steps' },
  sit: {},
  bread: { bread: false, fisher_here: false, papa_here: false },
  net_sit: { fisher_here: true, papa_here: true, net: 'knot', mama_here: false },
  net_ask: { net: 'mended' },
  under_wave: { night: 1, storm: 1, moon: 1, papa_here: false },
  crossing: { papa_here: true },
  blown: {},
  sleeve: {},
  lightning: {},
  spoke: { fisher_mark: 'sat' },
  beam_cape: { lighthouse_lit: 1, beam: 1 },
  pie_way: { storm: 0, night: 0.7, dusk: 0.3, lighthouse_lit: 0, beam: 0, net: 'folded', bread: false, mama_at: 'beside', mama_here: true },
  pie: {},
  matches_palm: {},
  pie_leave: {},
  stone_empty: {},
  look_fisher: { night: 0, dusk: 0, net: 'mended', fisher_mark: 'invited', mama_here: false, papa_here: false },
};
const SHOWFILM = Object.fromEntries(Object.entries(FILM).map(([k, b]) => [k, {
  ...b,
  from: () => ({ ...(SHOW[k] ?? {}), ...b.from() }),
  run: async s => {
    setAll(s, SHOW[k] ?? {});
    await b.run(s);
  },
}]));

return { FILM, SHOWFILM, WAY, SEA, land, shore, net, PLACES, HOLDS };
