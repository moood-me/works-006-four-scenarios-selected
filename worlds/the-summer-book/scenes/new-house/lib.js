// «The New House» — the land, the house's numbers, where people stand, where the things that move are, and where the
// camera looks from. The house stands on the island's far side, on the granite over the water: its long axis runs
// ahead (distance), its land gable with the glazed veranda toward the start (z 9), its sea gable with the four big
// windows over the water (z 16.6); x −3…3 its outer walls, the floor 0.45 m over the rock. Inside: the veranda (z 9…11)
// and the big room (z 11…16.6) — the wide bed with its head to the left wall, the chest of drawers against the right
// wall, the table under the sea windows. Behind it the rock falls to the sea; ahead of the start it rises a little
// toward the forest. tools/new-house.py writes scene.json from the same numbers — keep them the same.
const { clamp } = anim;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
// the house: its outer walls, its inner faces, the floor and the walls' height over it (metres)
const HOUSE = { x0: -3, x1: 3, z0: 9, z1: 16.6, inX: 2.88, inZ0: 9.12, inZ1: 16.48, mid: 11, floor: 0.45, wall: 2.6 };
// the sea's surface
const WATER = -2.4;
// the waterline's way across the island's north shore (its distance at each across): close behind the house, bending
// back toward the start far on either side
const coast = x => 19.4 - 0.006 * x * x + 1.8 * Math.sin(0.13 * x);
// how far out of the house's footprint a point is (0 inside it)
const out = (x, z) => Math.max(Math.abs(x) - 3.6, 8.4 - z, z - 17.2, 0);
function raw(x, z) {
  const s = z - coast(x);
  let h = -2.8 * sm((s + 2.2) / 2.4) - 5 * sm((s - 0.2) / 12);
  h += 0.8 * sm((-z - 4) / 30);
  h += 0.18 * Math.sin(0.5 * x + 0.3 * z) * Math.sin(0.37 * z - 0.42 * x) * sm(out(x, z) / 2);
  return h;
}
const ZERO = raw(0, 0);
const ground = (x, z) => raw(x, z) - ZERO;
// the waterline (the storm's foam): where the rock goes under the water, across the shore
const edge = [];
for (let x = -46; x <= 46; x += 1.5) {
  let a = coast(x) - 5;
  let b = coast(x) + 8;
  for (let i = 0; i < 22; i++) {
    const m = (a + b) / 2;
    if (ground(x, m) > WATER) a = m;
    else b = m;
  }
  edge.push([x, (a + b) / 2]);
}

// the bed (its head to the left wall): its top over the floor, and the seat at its foot's edge
const BED = { x0: -2.88, x1: -0.9, z0: 13.3, z1: 15, top: 0.48 };
// the chest of drawers against the right wall: its front, its sides, how far a drawer comes out, the drawers' feet
// over the floor (top, middle, bottom)
const CHEST = { front: 2.43, back: 2.88, z0: 14.6, z1: 15.8, top: 0.9, pull: 0.34, feet: [0.6, 0.33, 0.06] };
// the table under the sea windows: its top over the floor; the seal lies at its left end, the lantern stands at its right
const TABLE = { x0: -0.1, x1: 1.3, z0: 15.6, z1: 16.3, top: 0.74 };
// where Grandmother's lantern stands (`lantern`): on the table, or on the floor before her at the bed's foot — x, z,
// its foot over the land
const LANTERN = { table: [1.15, 15.9, HOUSE.floor + TABLE.top], floor: [-0.42, 13.72, HOUSE.floor] };
// the seat on the bed's foot: where she sits (her hips over the edge)
const SEAT = [-0.98, 14.15, HOUSE.floor + BED.top];

// the people's places (`<id>_at` names one): where each stands, facing, what they look at and reach for there, and —
// sitting — what they do and what they sit on (the script's). Outside on the rock and at the veranda's window; inside
// the veranda; in the room by the door, at the bed, the drawers, the table.
const PLACES = {
  grandma: {
    path: { at: [-2.0, 6.2], turn: 215, look: 'sophia' },
    sash: { at: [-2.25, 8.45], turn: 5, look: 'sash#sash', reach: { r: 'sash#sash' } },
    veranda: { at: [-1.7, 9.8], turn: 25 },
    door: { at: [-0.3, 12.1], turn: 10, look: 'bed#seat' },
    bed: { at: [SEAT[0], SEAT[1]], turn: 130, look: 'sophia', do: 'sit_stone', on: SEAT },
  },
  sophia: {
    path: { at: [-2.9, 5.5], turn: 25, look: 'sash#sash' },
    sash: { at: [-1.25, 8.25], turn: 345, look: 'sash#sash' },
    veranda: { at: [-0.85, 9.95], turn: 15 },
    door: { at: [0.4, 12.2], turn: 350 },
    bed: { at: [0.15, 13.85], turn: 250, look: 'grandma' },
    drawers: { at: [1.9, 15.2], turn: 90, look: 'chest#drawers' },
    table: { at: [0.35, 15.25], turn: 10, look: 'table#seal' },
  },
};

// the views (`view`): where the camera stands (x, z), how high the eye is over the sea level's datum (the start's rock
// is 0), which way it looks — as the camera's keys from the start (camera_h: the eye's height less 1.7 m over what the
// engine stands the eye on there: the room's floor inside the house, the sea's surface over the water, else the rock —
// so a glide over the water keeps its height over the water)
const under = (x, z) => (Math.abs(x) <= HOUSE.inX && z >= HOUSE.inZ0 && z <= HOUSE.inZ1 ? ground(x, z) + HOUSE.floor : Math.max(ground(x, z), WATER));
const V = (x, z, eye, yaw, look = 0) => ({ camera_x: x, camera_z: z, camera_h: eye - 1.7 - under(x, z), camera_yaw: yaw, camera_look: look });
const VIEW = {
  // outside on the rock at night, from the front's left: the veranda's glazing and its window, the long side's big
  // black windows
  out: V(-7.5, 2.5, 1.7, 32, -0.04),
  // the room from inside its door: the bed on the left, the table under the sea windows (the moon in them), the drawers
  // on the right
  room: V(0.4, 11.3, HOUSE.floor + 1.45, -2),
  // from the water behind the house, a boat's height over it: the sea gable, its big windows, the rock, the trees
  sea: V(-3.5, 38, WATER + 2.0, 172, -0.06),
  // nearer, from the water, low: the big windows close, the table's edge through the glass, the seal on it against
  // the dark room
  seal: V(0.55, 21.0, WATER + 3.3, 180, -0.28),
};
// the drawers' way out (`drawers` 0…1: one after another, the top first) — how far each is pulled
const pulled = (k, u) => CHEST.pull * sm(u * 3 - k);

// The three drawers are alike — each an unseen anchor (`drawer<k>`, moved out by `drawer<k>_x`) carrying its front,
// its near side and its inside: painted by these. Metres from the anchor (the front's middle at the drawer's foot).
// The front, facing the room: white, a fine shadow line round it, two small wooden knobs (the point `knob`: the near
// one, where a hand pulls it).
function drawerFront(g, e) {
  g.fillStyle = '#f4f3ef';
  g.fillRect(-0.56, -0.25, 1.12, 0.25);
  g.strokeStyle = 'rgba(150,146,138,0.55)';
  g.lineWidth = 0.006;
  g.strokeRect(-0.555, -0.247, 1.11, 0.244);
  g.fillStyle = '#c9a77c';
  for (const x of [-0.28, 0.28]) {
    g.beginPath();
    g.arc(x, -0.13, 0.022, 0, 6.2832);
    g.fill();
  }
  e.at(0.28, -0.13, 'knob');
}
// the near side, running from the front back into the chest: plain pale wood, dovetails at the front
function drawerSide(g) {
  g.fillStyle = '#e2cfae';
  g.fillRect(0, -0.21, 0.42, 0.21);
  g.fillStyle = '#d2bc97';
  for (let y = -0.2; y < -0.01; y += 0.05) g.fillRect(0, y, 0.025, 0.025);
}
// the inside from above: an empty clean bottom of pale wood lined with new white paper, the sides' top edges round it
function drawerIn(g) {
  g.fillStyle = '#ddc9a6';
  g.fillRect(-0.21, -0.55, 0.42, 1.1);
  g.fillStyle = '#f6f4ee';
  g.fillRect(-0.19, -0.53, 0.38, 1.06);
  g.strokeStyle = 'rgba(176,186,196,0.35)';
  g.lineWidth = 0.004;
  for (let y = -0.5; y < 0.53; y += 0.06) {
    g.beginPath();
    g.moveTo(-0.18, y);
    g.lineTo(0.18, y);
    g.stroke();
  }
}

// ── the pieces (stage 5: notes.md «Pieces»; the module beats) ─────────────────────────────────────────────────────
// Each piece's `from`: where its people are and what they do (at), its camera (every camera key: nothing left over from
// the shot before), its own keys. The game sets only the play's keys (the hour of the step, `seal` in the epilogue).
// The people's motions and parts are the cast's (package Л): a motion it has not made yet stands in (the engine's).
const stand = { motion: 'stand', loop: true };
function at(id, place, more = {}) {
  const p = PLACES[id][place];
  return {
    [`${id}_here`]: true, [`${id}_at`]: place, [`${id}_placed`]: place, [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1],
    [`${id}_on`]: p.on ?? null, [`${id}_turn`]: p.turn, [`${id}_do`]: p.do ?? stand, [`${id}_look`]: p.look ?? null,
    [`${id}_reach`]: p.reach ?? null, [`${id}_gait`]: null, [`${id}_with`]: null, ...more,
  };
}
const CAM0 = { camera_target: null, camera_shot: 'full', camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_h: 0, camera_yaw: 0, camera_look: 0, camera_pitch: 0, camera_roll: 0 };
const view = name => ({ ...CAM0, ...VIEW[name] });
// a hand-set camera cut to (made ready first: shown whole), and one moved to over a moment
async function cutTo(s, values) {
  const shot = s.shot({ ...CAM0, ...values });
  await s.until(() => shot.ready);
  shot.cut();
}
function glideTo(s, values, over = 2) {
  s.set('camera_target', null);
  for (const k of ['camera_x', 'camera_z', 'camera_h', 'camera_yaw', 'camera_look']) s.move(k, values[k] ?? 0, { over, ease: 'inOut' });
}
// the night of 3.3 at the new house (the moon full over the sea); the last morning seen from the water
const NIGHT = { dawn: 0, dusk: 0, night: 1, storm: 0, flash: 0, fog: 0, cigarette: 0, sash: 0, drawers: 0 };
const MORNING = { dawn: 1, dusk: 0, night: 0, late: 1, storm: 0, flash: 0, fog: 0.6, cigarette: 0, sash: 0, drawers: 0, lantern: 'none', grandma_here: false, sophia_here: false };
// the camera's own shots: the window near, from the rock's left; the table under the windows, the seal, the moon
const WINDOW_NEAR = { ...CAM0, ...V(-4.6, 5.4, 1.6, 28, -0.02) };
const TABLE_CAM = { ...CAM0, ...V(0.9, 13.2, HOUSE.floor + 1.35, -12, 0.06) };
// the room from its right near corner: the bed and Grandmother, the big windows with the moon, the doorway behind
const ROOM_IN = { ...CAM0, ...V(2.45, 12.0, HOUSE.floor + 1.45, -42, 0.02) };
// Grandmother on the bed, from before her on the right: she and her cigarette, medium
const SMOKE_CAM = { ...CAM0, ...V(0.6, 12.6, HOUSE.floor + 1.0, -45, 0.04) };
// her face close, between her and Sophia: she looks a little past the lens at the girl
const FACE_CAM = { ...CAM0, ...V(0.3, 14.0, HOUSE.floor + 1.05, -83, 0.02) };
// Sophia at the chest of drawers from the middle of the room, low: the drawers coming out one after another, her
// turning back toward Grandmother (and the lens)
const DRAWER_CAM = { ...CAM0, ...V(0.2, 13.4, HOUSE.floor + 1.2, 48, 0.06) };
// where Grandmother stands before the bed's foot to sit on it, and where both go out (into the veranda, out of sight)
const BEDSIDE = [-0.55, 13.85];
const OUT = [0.1, 10.3];
// where Sophia stands in the room looking round, after coming in
const ROOM_MID = [0.7, 13.4];
const FILM = {
  // 3.3 «moss» — out of the dead trees onto the rock, the lantern in her hand; the veranda's window is not locked
  window: {
    from: () => ({ ...NIGHT, ...at('grandma', 'path', { grandma_a: -2.6, grandma_d: 3.6, grandma_turn: 10, grandma_look: 'front', grandma_with: ['lantern'] }),
      ...at('sophia', 'path', { sophia_a: -3.4, sophia_d: 3.2, sophia_turn: 15, sophia_look: 'front' }), lantern: 'hand', seal: false, ...view('out') }),
    run: async s => {
      const grandma = s.person('grandma');
      const sophia = s.person('sophia');
      s.tell('window:come');
      glideTo(s, WINDOW_NEAR, 6);
      await s.all(grandma.walk([PLACES.grandma.sash.at]), sophia.walk([PLACES.sophia.sash.at]));
      grandma.turn(PLACES.grandma.sash.turn);
      sophia.turn(PLACES.sophia.sash.turn);
      grandma.look('sash#sash');
      sophia.look('sash#sash');
      grandma.reach({ r: 'sash#sash' });
      await s.wait(1);
      await s.move('sash', 1, { over: 2.5, ease: 'inOut' });
      s.tell('window:open');
      grandma.reach(null);
      grandma.look('sophia');
      sophia.look('grandma');
      await s.wait(2.5);
    },
  },
  // 3.3 «moss» — inside (the climbing in is not shown: a cut): new, clean, the moon in the big windows; she sits on the bed's foot
  inside: {
    from: () => ({ ...NIGHT, sash: 1, ...at('grandma', 'door', { grandma_with: ['lantern'] }), ...at('sophia', 'door', { sophia_look: 'win_sea' }), lantern: 'hand',
      seal: false, ...ROOM_IN }),
    run: async s => {
      const grandma = s.person('grandma');
      const sophia = s.person('sophia');
      s.tell('inside:in');
      await s.wait(2.5);
      sophia.walk([ROOM_MID]);
      await grandma.walk([BEDSIDE]);
      await grandma.turn(PLACES.grandma.bed.turn);
      // the lantern set on the floor at her feet; she sits down onto the bed's foot
      await grandma.do('put_down');
      grandma.with(null);
      s.set('lantern', 'floor');
      await grandma.do('sit_down');
      grandma.on(SEAT);
      grandma.do('sit_stone', { loop: true });
      grandma.look('sophia');
      s.tell('inside:sat');
      await s.wait(2);
    },
  },
  // 3.3 «moss» — the packet out of her pocket, a cigarette, a match; she smokes (the game, with «quit»: «For an occasion like this»)
  smoke: {
    after: 'inside',
    from: () => ({ ...NIGHT, sash: 1, ...at('grandma', 'bed'), ...at('sophia', 'door', { sophia_a: ROOM_MID[0], sophia_d: ROOM_MID[1], sophia_look: 'win_sea' }),
      lantern: 'floor', seal: false, ...SMOKE_CAM }),
    run: async s => {
      const grandma = s.person('grandma');
      glideTo(s, SMOKE_CAM, 2.5);
      // the packet out of her pocket, a cigarette out of it; a match struck and held to it; she smokes, seated
      await s.wait(1);
      grandma.with(['packet']);
      grandma.look('grandma#packet');
      await s.wait(1);
      s.tell('smoke:packet');
      await s.wait(1.5);
      grandma.with(['packet', 'cigarette']);
      await s.wait(1);
      grandma.with(['cigarette', 'match']);
      await s.move('cigarette', 1, { over: 0.8 });
      grandma.with(['cigarette']);
      grandma.look('sophia');
      s.tell('smoke:lit');
      await s.wait(2.5);
    },
  },
  // 3.3 «moss» — Sophia pulls the drawers out one after another, takes nothing, turns to Grandmother («Nobody has died here»)
  drawers: {
    after: 'smoke',
    from: () => ({ ...NIGHT, sash: 1, cigarette: 1, ...at('grandma', 'bed', { grandma_with: ['cigarette'] }),
      ...at('sophia', 'door', { sophia_a: ROOM_MID[0], sophia_d: ROOM_MID[1], sophia_look: 'win_sea' }),
      lantern: 'floor', seal: false, ...DRAWER_CAM }),
    run: async s => {
      const sophia = s.person('sophia');
      await cutTo(s, DRAWER_CAM);
      await sophia.walk([PLACES.sophia.drawers.at]);
      await sophia.turn(PLACES.sophia.drawers.turn);
      for (let k = 0; k < 3; k++) {
        const knob = `drawer${k + 1}_front#knob`;
        sophia.look(knob);
        sophia.reach({ r: knob });
        await s.wait(0.5);
        await s.move('drawers', (k + 1) / 3, { over: 1.2, ease: 'inOut' });
        sophia.reach(null);
        await s.wait(0.8);
      }
      s.tell('drawers:open');
      await s.wait(1.5);
      sophia.look('grandma');
      await sophia.turn(235);
      s.tell('drawers:turn');
      await s.wait(2);
    },
  },
  // 3.3 «moss» — Grandmother looks at her, close; a pause; «Come on» — she gets up with the lantern
  look: {
    after: 'drawers',
    from: () => ({ ...NIGHT, sash: 1, drawers: 1, cigarette: 1, ...at('grandma', 'bed', { grandma_with: ['cigarette'] }),
      ...at('sophia', 'drawers', { sophia_turn: 235, sophia_look: 'grandma' }),
      lantern: 'floor', seal: false, ...FACE_CAM }),
    run: async s => {
      const grandma = s.person('grandma');
      await cutTo(s, FACE_CAM);
      grandma.look('sophia');
      await s.wait(1.5);
      s.tell('look:face');
      await s.wait(3);
      await s.move('cigarette', 0, { over: 0.6 });
      grandma.with(null);
      // a cut back to the room; there she gets up slowly, steps to the lantern and takes it up
      await cutTo(s, ROOM_IN);
      grandma.on(null);
      await grandma.do('rise_slow');
      await grandma.walk([BEDSIDE]);
      await grandma.turn(200);
      grandma.look('lantern#lantern');
      await grandma.do('pick_up');
      s.set('lantern', 'hand');
      grandma.with(['lantern']);
      grandma.look('sophia');
      s.tell('look:up');
      await s.wait(2);
    },
  },
  // 3.3 «moss» — going, Sophia lays the wooden seal on the table; they go out; the room empty, the seal in the moonlight
  seal: {
    after: 'look',
    from: () => ({ ...NIGHT, sash: 1, drawers: 1, ...at('grandma', 'door', { grandma_a: BEDSIDE[0], grandma_d: BEDSIDE[1], grandma_turn: 200, grandma_look: 'sophia',
      grandma_with: ['lantern'] }),
      ...at('sophia', 'drawers', { sophia_turn: 235, sophia_look: 'grandma' }), lantern: 'hand', seal: false, ...TABLE_CAM }),
    run: async s => {
      const grandma = s.person('grandma');
      const sophia = s.person('sophia');
      glideTo(s, TABLE_CAM, 2);
      await sophia.walk([PLACES.sophia.table.at]);
      await sophia.turn(PLACES.sophia.table.turn);
      sophia.look('table#seal');
      // the seal out of her pocket, in her hand, laid on the table
      sophia.with(['seal']);
      await s.wait(0.8);
      sophia.reach({ r: 'table#seal' });
      await s.wait(1.2);
      sophia.with(null);
      s.set('seal', true);
      sophia.reach(null);
      s.tell('seal:left');
      await s.wait(1.5);
      await s.all(grandma.walk([[0.1, 11.9], OUT]), sophia.walk([[0.45, 12.0], OUT]));
      s.set('grandma_here', false);
      s.set('sophia_here', false);
      s.tell('seal:gone');
      await s.wait(3);
    },
  },
  // the epilogue's common shot from the water: the last morning, the black windows; nearer — the seal in the window (by `seal`)
  from_sea: {
    from: () => ({ ...MORNING, ...view('sea') }),
    run: async s => {
      s.tell('from_sea:windows');
      await s.wait(2.5);
      glideTo(s, VIEW.seal, 4);
      await s.wait(4);
      s.tell('from_sea:seal');
      await s.wait(2.5);
    },
  },
};
return { WATER, ground, coast, edge, sm, HOUSE, BED, CHEST, TABLE, LANTERN, SEAT, PLACES, VIEW, pulled, drawerFront, drawerSide, drawerIn, FILM };
