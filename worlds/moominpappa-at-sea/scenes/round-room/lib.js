// The round room at the foot of the lighthouse: a circle of whitewashed wall round the point C (across, distance),
// radius R, H high under a ceiling of beams; the walls are bent sheets (forms) of that circle, the window's and the
// door's columns between them. An angle round the room (degrees) is measured as a bearing from C: 0 straight ahead,
// + to the right. tools/round_room.py writes scene.json from the same numbers (keep the two the same).
const C = [0, 3.8], R = 3.6, H = 3.6, DEG = Math.PI / 180;
// the window: the middle's angle, the half-width (metres along the wall), the sill and the top, how thick the wall is.
// The door is the lighthouse's own (modules/island DOOR): its arch as wide, as high over its sill — the room's floor;
// its opening is cut straight across the wall (its two jambs a chord apart); `spring` — where its arch begins.
const WIN = { mid: 24, half: 0.6, sill: 0.65, top: 2.3, deep: 0.6 };
const ID = kit.island.DOOR, DOOR = { mid: 44, half: ID.half, top: ID.top - ID.sill, spring: ID.top - ID.sill - ID.half, deep: 0.6 };
const [W0, W1] = [WIN.mid - WIN.half / R / DEG, WIN.mid + WIN.half / R / DEG];
const D0 = DOOR.mid - Math.asin(DOOR.half / R) / DEG, D1 = DOOR.mid + Math.asin(DOOR.half / R) / DEG;
// the door's plane: the chord between its jambs, this far from C
const DOOR_R = Math.sqrt(R * R - DOOR.half * DOOR.half);
// the walls (bent sheets of the circle): each from angle a to b — its middle, its width along the wall, its bend
const wall = (a, b) => ({ mid: (a + b) / 2, width: R * (b - a) * DEG, bend: a - b });
const WALLS = { a: wall(-150, W0), b: wall(W1, D0), c: wall(D1, 150), win: wall(W0, W1) };
// where an angle of the room is at r from C: [across, distance]
const at = (theta, r = R) => [C[0] + r * Math.sin(theta * DEG), C[1] + r * Math.cos(theta * DEG)];
// x on a wall's painting (metres along the wall from its middle) of an angle, its middle at `mid`
const wallX = (theta, mid) => R * (theta - mid) * DEG;
// the door: its leaf hangs on the hinge at its left (seen from the room), facing the room when shut; open, it turns
// SWING degrees into the room, along the wall toward the window
const DOOR_FACING = DOOR.mid + 180, DOOR_SWING = 85;
// the arch of the opening, drawn as a path: from the foot of one jamb up, over, down the other (x across the doorway,
// y down, its foot at 0), widened by `out` all round
function arch(g, out = 0) {
  const w = DOOR.half + out;
  g.moveTo(-w, 0);
  g.lineTo(-w, -DOOR.spring);
  g.arc(0, -DOOR.spring, w, Math.PI, 0);
  g.lineTo(w, 0);
}
// The land the room stands on (the relief; the island's painters read it — SEA, land, shore): inside the tower the
// floor (0); round it the lighthouse's knoll, its top 0.42 below the door's sill, falling to the sea some twenty metres
// off; out beyond the window, the low granite tongue of the Fisherman's cape
const { bump, ridge, shoreOf } = kit.island;
const SEA = -5, FOOT = R + DOOR.deep + 0.05;
function land(a, d) {
  const x = a - C[0], z = d - C[1], r = Math.sqrt(x * x + z * z);
  if (r < FOOT) return 0;
  const k = (r - FOOT) / 9;
  return -ID.sill - 4.9 * (1 - Math.exp(-k * k)) + 0.5 * bump(a, d, 9, 14, 3, 4) + 0.35 * bump(a, d, 15, 7, 4, 3)
    + ridge(a, d, 6, 96, 40, 128, 2.8, 1.4, 7);
}
const shore = shoreOf(land, SEA, -30, 60, -25, 140);
// where the storm lantern stands (`lantern_at`): [across, distance, elevation] — on the table; on the stair's middle
// tread (its end, just before the stringer); on the floor by the boy's bunk; `none` — not in the room (its place kept)
const STAIR = { theta: -48, r: 3.3, facing: 132, run: 2.3, treads: 13 };
const stairAt = (() => {
  const [a, d] = at(STAIR.theta, STAIR.r), f = STAIR.facing * DEG, mid = Math.ceil(STAIR.treads / 2), h = (mid * H) / (STAIR.treads + 1);
  return [a + 0.1 * Math.sin(f), d + 0.1 * Math.cos(f), h + 0.045];
})();
const LANTERN = { table: [0.12, 4.4, 0.72], stair: stairAt, bunk: [...at(-80, 2.55), 0], none: [0.12, 4.4, 0.72] };

// the whitewash every wall shares: a pale lime white, the blue-grey dado below with its dark rule, a few damp clouds
// and hairline cracks (each wall's own e.rnd), over the painting's box [x0, x1] × [−top, −bottom] (wall heights)
const DADO = 0.95;
function whitewash(g, e, x0, x1, bottom, top) {
  g.fillStyle = "#ece6d9";
  g.fillRect(x0, -top, x1 - x0, top - bottom);
  if (bottom < DADO) {
    g.fillStyle = "#93a7ad";
    g.fillRect(x0, -Math.min(DADO, top), x1 - x0, Math.min(DADO, top) - bottom);
    if (top > DADO) {
      g.fillStyle = "#4f5f68";
      g.fillRect(x0, -DADO - 0.025, x1 - x0, 0.03);
    }
  }
  const n = Math.ceil((x1 - x0) * 3);
  for (let i = 0; i < n; i++) {
    const x = x0 + e.rnd() * (x1 - x0), y = -bottom - e.rnd() * (top - bottom), r = 0.25 + e.rnd() * 0.7;
    const s = g.createRadialGradient(x, y, 0, x, y, r);
    s.addColorStop(0, e.rnd() < 0.6 ? "rgba(178, 170, 156, 0.22)" : "rgba(255, 252, 244, 0.35)");
    s.addColorStop(1, "rgba(178, 170, 156, 0)");
    g.fillStyle = s;
    g.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  g.strokeStyle = "rgba(120, 112, 104, 0.45)";
  g.lineWidth = 0.008;
  for (let i = 0; i < n / 3; i++) {
    let x = x0 + e.rnd() * (x1 - x0), y = -bottom - e.rnd() * (top - bottom);
    g.beginPath();
    g.moveTo(x, y);
    for (let k = 0; k < 4; k++) {
      x += (e.rnd() - 0.5) * 0.18;
      y += 0.06 + e.rnd() * 0.1;
      g.lineTo(x, y);
    }
    g.stroke();
  }
}
// the keeper's knot, drawn small in pencil under each of his lines: a loop, its two ends crossing through it
function knot(g, x, y, s) {
  g.beginPath();
  g.ellipse(x, y, s, s * 0.6, 0, 0, Math.PI * 2);
  g.moveTo(x - s * 1.8, y + s * 0.9);
  g.quadraticCurveTo(x - s * 0.2, y + s * 0.2, x + s * 0.4, y - s * 0.9);
  g.moveTo(x + s * 1.8, y + s * 0.9);
  g.quadraticCurveTo(x + s * 0.2, y + s * 0.2, x - s * 0.4, y - s * 0.9);
  g.stroke();
}
// a line written on the wall at (x, y) — its baseline —, `size` metres tall, slanted: → its width
function write(g, text, x, y, size, color, slant) {
  g.save();
  g.translate(x, y);
  g.rotate(slant);
  g.scale(0.01, 0.01);
  g.fillStyle = color;
  g.font = `italic ${Math.round(size * 100)}px Georgia, serif`;
  g.fillText(text, 0, 0);
  const w = g.measureText(text).width * 0.01;
  g.restore();
  return w;
}
// an illegible pencil line `len` metres long
function scribble(g, e, x, y, len, size, color) {
  g.strokeStyle = color;
  g.lineWidth = size * 0.09;
  g.beginPath();
  g.moveTo(x, y);
  let px = x;
  while (px < x + len) {
    const step = size * (0.25 + e.rnd() * 0.35);
    g.quadraticCurveTo(px + step * 0.5, y - size * (0.3 + e.rnd() * 0.5), px + step, y - (e.rnd() < 0.2 ? size * 0.45 : 0));
    px += step;
    if (e.rnd() < 0.18) {
      px += size * 0.35;
      g.moveTo(px, y);
    }
  }
  g.stroke();
}
// Moominmamma's paints (`paints`): her own — greens, a sky blue, pinks and yellows; or the red lead for boats and the
// blue for window frames from the keeper's store, with which everything comes out red and blue, not hers
const PAINTS = {
  green: { leaf: "#5f9150", leafDark: "#3f6e3c", grass: "#7aa35a", trunk: "#7a5a3c", water: "#7fb0cf", house: "#5b7fb8",
    roof: "#9a5a4c", petals: ["#f0c6cf", "#f2e7a0", "#e9e4f2", "#8fb4d8"], heart: "#d98e3a", sky: "#cfe0ee", path: "#d8c49a", apple: "#c8402e" },
  red_blue: { leaf: "#3d5f9a", leafDark: "#2c4778", grass: "#4a6aa6", trunk: "#a8452c", water: "#3d5f9a", house: "#b5482f",
    roof: "#3d5f9a", petals: ["#b5482f", "#3d5f9a", "#c8604a", "#5a78b0"], heart: "#8a3020", sky: "#b9c6dc", path: "#c8907a", apple: "#b5482f" },
};
// a painted flower of Moominmamma's: a curving stem from (x, y) up by h, two leaves, a round head of petals
function flower(g, x, y, h, lean, petal, heart, leaf) {
  const tx = x + lean, ty = y - h;
  g.strokeStyle = leaf;
  g.lineWidth = h * 0.05;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(x, y);
  g.quadraticCurveTo(x - lean * 0.4, y - h * 0.55, tx, ty);
  g.stroke();
  g.fillStyle = leaf;
  for (const [k, side] of [[0.35, -1], [0.55, 1]]) {
    const lx = x + lean * k * 0.3, ly = y - h * k;
    g.beginPath();
    g.ellipse(lx + side * h * 0.1, ly, h * 0.11, h * 0.04, side * -0.6, 0, Math.PI * 2);
    g.fill();
  }
  if (!petal) return;
  g.fillStyle = petal;
  const r = h * 0.11;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    g.beginPath();
    g.ellipse(tx + Math.cos(a) * r, ty + Math.sin(a) * r, r * 0.85, r * 0.55, a, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = heart;
  g.beginPath();
  g.arc(tx, ty, r * 0.6, 0, Math.PI * 2);
  g.fill();
}
// a little Moomin figure as Moominmamma paints them on the wall — a round white body, a snout, a tail: standing at
// (x, y) (its feet), h tall; `apron` — her own red apron; `bag` — the black handbag on her arm; `basket` — a basket
const INK = "rgba(60, 56, 64, 0.85)";
function moomin(g, x, y, h, { apron = null, bag = false, basket = false, hat = false, flip = false } = {}) {
  g.save();
  g.translate(x, y);
  if (flip) g.scale(-1, 1);
  g.lineWidth = h * 0.025;
  g.strokeStyle = INK;
  g.fillStyle = "#f6f3ec";
  g.beginPath();
  g.ellipse(0, -h * 0.32, h * 0.2, h * 0.3, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.beginPath();
  g.ellipse(h * 0.05, -h * 0.74, h * 0.15, h * 0.16, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.beginPath();
  g.ellipse(h * 0.18, -h * 0.7, h * 0.1, h * 0.07, 0.2, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.fillStyle = INK;
  g.beginPath();
  g.arc(h * 0.12, -h * 0.79, h * 0.018, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.moveTo(-h * 0.18, -h * 0.2);
  g.quadraticCurveTo(-h * 0.38, -h * 0.18, -h * 0.36, -h * 0.34);
  g.stroke();
  if (apron) {
    g.fillStyle = apron;
    g.fillRect(-h * 0.12, -h * 0.42, h * 0.26, h * 0.32);
  }
  if (hat) {
    g.fillStyle = "#26232a";
    g.fillRect(-h * 0.06, -h * 1.05, h * 0.2, h * 0.16);
    g.fillRect(-h * 0.11, -h * 0.9, h * 0.3, h * 0.03);
  }
  if (bag) {
    g.fillStyle = "#26232a";
    g.fillRect(h * 0.14, -h * 0.38, h * 0.12, h * 0.1);
  }
  if (basket) {
    g.fillStyle = "#b8935a";
    g.beginPath();
    g.ellipse(h * 0.26, -h * 0.28, h * 0.12, h * 0.07, 0, 0, Math.PI);
    g.fill();
    g.strokeStyle = "#8a6a3c";
    g.beginPath();
    g.arc(h * 0.26, -h * 0.3, h * 0.1, Math.PI, 0);
    g.stroke();
  }
  g.restore();
}
// Little My as painted: a tiny red dress, an orange topknot
function myFigure(g, x, y, h) {
  g.strokeStyle = INK;
  g.lineWidth = h * 0.03;
  g.fillStyle = "#c8452e";
  g.beginPath();
  g.moveTo(x, y - h * 0.62);
  g.lineTo(x + h * 0.2, y - h * 0.12);
  g.lineTo(x - h * 0.2, y - h * 0.12);
  g.closePath();
  g.fill();
  g.beginPath();
  g.moveTo(x - h * 0.06, y - h * 0.12);
  g.lineTo(x - h * 0.08, y);
  g.moveTo(x + h * 0.06, y - h * 0.12);
  g.lineTo(x + h * 0.08, y);
  g.stroke();
  g.fillStyle = "#f2dcc6";
  g.beginPath();
  g.arc(x, y - h * 0.74, h * 0.14, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.fillStyle = "#e0782c";
  g.beginPath();
  g.ellipse(x, y - h * 0.95, h * 0.05, h * 0.1, 0, 0, Math.PI * 2);
  g.fill();
}
// ── the people's places and the film (modules/beats; notes.md "Pieces") ─────────────────────────────────────────────
// seats: [across, distance, top, turn] — Mama's stool at the table's end, the bench behind the table (facing the
// room), the table's corner (My), the floor by the keeper's wall (Papa, waiting), the window's outer ledge (My outside)
const SEAT = {
  stool: [-1.05, 4.25, 0.45, 115], bench_l: [-0.32, 5.1, 0.44, 180], bench_r: [0.38, 5.1, 0.44, 180], corner: [0.78, 4.6, 0.72, 250],
  wall: [...at(-37, 3.2), 0, 323],
  // (a seat's top is over the land there: outside the tower the knoll is lower than the floor)
  sill_out: [...at(WIN.mid, R + WIN.deep + 0.12), WIN.sill - land(...at(WIN.mid, R + WIN.deep + 0.12)), WIN.mid + 180],
};
// standing places: [across, distance, turn]
const SPOT = {
  out: [...at(DOOR.mid, R + 1.2), DOOR.mid + 180], threshold: [...at(DOOR.mid, R - 0.15), DOOR.mid + 180], door: [...at(DOOR.mid, R - 0.6), DOOR.mid],
  door_back: [...at(DOOR.mid - 4, R - 0.45), DOOR.mid + 180], shelf: [...at(6, 2.95), 6], window: [...at(WIN.mid, 3.2), WIN.mid],
  window_l: [...at(WIN.mid - 7, 3.05), WIN.mid - 10], stair: [-2.7, 4.6, 110], stair_step: [...at(-50, 2.95), 132], gate: [...at(-19.5, 3.1), 340],
  garden: [...at(-11, 3.05), 349], line: [...at(-41, 3.05), 319], bunk: [...at(-80, 2.95), 280], table_l: [-0.95, 4.5, 90],
  table_r: [1.05, 4.5, 270], table_front: [0.15, 3.75, 0], stove: [...at(68, 2.45), 68], centre: [0.8, 3.6, 200],
};
const PEOPLE = ["papa", "mama", "my", "troll"];
// eyes from beside: on Papa at the gate (his right profile); along the keeper's wall low (whoever is at the line); at
// the sill from its right
// (and on the boy at the window from its right, past the table)
const EYE = { gate: [...at(-3, 2.95), 1.35], line: [...at(-18, 2.6), 0.95], sill: [...at(WIN.mid - 14, 2.5), 1.5], window: [...at(WIN.mid + 30, 2.3), 1.4] };
// the light at each hour (the party's: the pieces move it only where the step's own time passes before the eyes)
function film(scene) {
  // the lanterns carried lit: how much each burns (the light at its flame, `<id>_lamp`)
  const LIT = { lantern: 1, lantern_low: 0.45 }, LAMPS = { papa_lamp: 1, troll_lamp: 1 };
  const kit = scene.kit;
  const loop = motion => ({ motion, loop: true });
  // someone standing at a place: [a, d, turn], doing a loop (stand by default), looking at something
  const STAND = (id, [a, d, turn], more = {}) => {
    const v = { [`${id}_a`]: a, [`${id}_d`]: d, [`${id}_turn`]: turn, [`${id}_do`]: "stand", [`${id}_on`]: null, [`${id}_with`]: null,
      [`${id}_reach`]: null, [`${id}_look`]: null, ...more };
    const lamp = (v[`${id}_with`] ?? []).find(x => x.startsWith("lantern"));
    if (`${id}_lamp` in LAMPS) v[`${id}_lamp`] = lamp ? LIT[lamp] ?? 0 : 0;
    return v;
  };
  const SIT = (id, seat, more = {}) => {
    const [a, d, top, turn] = SEAT[seat];
    return STAND(id, [a, d, turn], { [`${id}_do`]: loop(top > 0 ? "seated" : "huddle"), [`${id}_on`]: top > 0 ? [a, d, top] : null, ...more });
  };
  // the points the cameras look at: [across, distance, height]
  const POINTS = {
    "door#threshold": [...at(DOOR.mid, R), 0.4], "door#door": [...at(DOOR.mid, R), 1.0], "shelf#paraffin": [...at(6, 3.48), 2.0],
    "sill#garden": [...at(WIN.mid, R + 0.3), 0.65], "casement#window": [...at(WIN.mid, R + 0.5), 1.45], "cup#cup": [-0.42, 4.3, 0.8],
    "lantern#flame": [LANTERN.table[0], LANTERN.table[1], 0.95], table: [0, 4.45, 0.75], "wall_a#garden": [...at(-8, R), 1.6],
    "wall_a#line27": [...at(-41, R), 0.45], "wall_a#log": [...at(-33, R), 1.5], "wall_a#nobody": [...at(-37, R), 1.55],
    "wall_a#keeper": [...at(-33, R), 2.0], "wall_a#gate": [...at(-19.5, R), 1.2], "wall_mama#mama": [...at(-10.5, R), 1.2], "stair#stair": [...at(-48, 3.3), 1.3],
    "stove#stove": [...at(68, 3.1), 0.7], "basket#basket": [...at(31, 3.2), 0.3], "mama#hands": [-1.05, 4.25, 0.7],
  };
  // the cameras: the room wide (the scene's own view), or a view set straight at something — a point of the room
  // (POINTS) or someone (their head) — from the start's side, as near as the shot says, the eye a little over it;
  // close on someone, they turn to the camera (their face in the shot). Set by values (a cut) or moved (`cam`).
  const WIDE = { camera_target: null, camera_x: 0, camera_z: 0, camera_h: 0, camera_yaw: 0, camera_pitch: 0 };
  const SHOTS = { close: 1.4, medium: 2.2, full: 3.3, wide: 5.2 };
  const HEAD = { papa: 1.05, mama: 0.95, troll: 0.85, my: 0.6 };
  const ON = (target, shot = "medium", lift = 0) => ({ __on: [target, shot, lift] });
  function viewOf([target, shot, lift], get) {
    const who = HEAD[target], p = who ? [get(`${target}_a`), get(`${target}_d`), who] : POINTS[target];
    const dist = typeof shot === "number" ? 2 * shot : SHOTS[shot], up = (who ? 0.2 : 0.35) + lift;
    const [a, d, h] = p, r = Math.hypot(a, d), k = Math.max(0, 1 - dist / r), near = Math.min(dist, r);
    const v = { camera_target: null, camera_x: a * k, camera_z: d * k, camera_h: h + up - 1.7, camera_yaw: Math.atan2(a, d) / DEG,
      camera_pitch: -Math.atan2(up, near) / DEG };
    // (close on someone: they turn to the eye)
    const face = who && shot === "close" ? { [`${target}_turn`]: Math.atan2(a * k - a, d * k - d) / DEG, [`${target}_look`]: null } : {};
    return [v, face];
  }
  const resolve = values => {
    if (!values.__on) return values;
    const on = values.__on, out = { ...values };
    delete out.__on;
    const [v, face] = viewOf(on, k => out[k]);
    return Object.assign(out, v, face);
  };
  // a view from an eye of its own ([across, distance, height]) at a point — where the start's side cannot see a face
  // or a hand (someone at the wall, out on the gallery): from beside them
  const FROM = (eye, [ta, td, th]) => {
    const [ea, ed, eh] = eye, r = Math.hypot(ta - ea, td - ed);
    return { camera_target: null, camera_x: ea, camera_z: ed, camera_h: eh - 1.7, camera_yaw: Math.atan2(ta - ea, td - ed) / DEG,
      camera_pitch: Math.atan2(th - eh, r) / DEG };
  };
  async function cam(s, values, over = 1.5) {
    let v = values, face = {};
    if (values.__on) [v, face] = viewOf(values.__on, k => s.get(k));
    for (const [k, t] of Object.entries(face)) {
      if (!k.endsWith("_turn")) continue;
      s.person(k.slice(0, -5)).turn(t);
      s.person(k.slice(0, -5)).look(null);
    }
    const moves = Object.entries(v).filter(([k]) => k !== "camera_target").map(([k, x]) => s.move(k, x, { over }));
    await Promise.all(moves);
  }
  // a shot's values: the room's internal keys at rest, everyone at the supper's places, then the piece's own
  const ROOM = (...parts) => resolve(Object.assign({ lantern_x: 0, ...WIDE },
    STAND("papa", SPOT.stair), SIT("mama", "stool"), SIT("my", "corner"), STAND("troll", SPOT.window), ...parts));
  const cut = (s, values) => s.cut({ ...values });
  const walk = (p, ...spots) => p.walk(spots.map(([a, d]) => [a, d]));
  const to = async (p, spot) => {
    await walk(p, spot);
    await p.turn(spot[2]);
  };
  async function sit(s, id, seat) {
    const [a, d, top, turn] = SEAT[seat], p = s.person(id);
    await p.go(top > 0 ? "sit_down" : "sit_floor", { to: [a, d], turn });
    if (top > 0) p.on([a, d, top]);
    p.do(top > 0 ? "seated" : "huddle", { loop: true });
  }
  async function rise(s, id, seat) {
    const [a, d, top] = SEAT[seat], p = s.person(id);
    p.on(null);
    await p.go(top > 0 ? "rise" : "rise_floor", { from: [a, d] });
  }
  // a moment the game speaks on: told, then held for the line
  const moment = async (s, name, hold = 2.5) => {
    s.tell(name);
    if (hold) await s.wait(hold);
  };
  const P = (s, id) => s.person(id);
  // something in the hands: a lantern carried lit lights by the scene's light at its flame (`<id>_lamp`), out — not
  const hold = (s, id, parts) => {
    const p = s.person(id);
    p.with(parts);
    const lamp = parts && parts.find(x => x.startsWith("lantern"));
    if (`${id}_lamp` in LAMPS) s.set(`${id}_lamp`, lamp ? LIT[lamp] ?? 0 : 0);
  };

  const F = {
    // 1.5 Inside: Papa in at the door with the can, the others after him; he stops on the threshold
    can_in: {
      from: () => ROOM(STAND("papa", SPOT.out, { papa_with: ["can"], papa_gait: "carry_walk" }), STAND("mama", SPOT.out), STAND("my", SPOT.out),
        STAND("troll", SPOT.out), { door: 1, ...ON("door#threshold", "full") }),
      run: async s => {
        const papa = P(s, "papa");
        s.set("mama_here", false);
        s.set("my_here", false);
        s.set("troll_here", false);
        await walk(papa, SPOT.threshold);
        papa.do("hold", { loop: true });
        await moment(s, "can_in:threshold", 0.5);
      },
    },
    // the can onto the shelf; Mama looks into it; Papa to the window
    can_shelf: {
      after: "can_in",
      from: () => ROOM(STAND("papa", SPOT.threshold, { papa_with: ["can"], papa_do: loop("hold") }), STAND("mama", SPOT.door_back),
        STAND("my", SPOT.table_r), STAND("troll", SPOT.window_l), { door: 1, ...ON("shelf#paraffin", "full") }),
      run: async s => {
        const papa = P(s, "papa"), mama = P(s, "mama");
        for (const id of ["mama", "my", "troll"]) s.set(`${id}_here`, true);
        papa.gait("carry_walk");
        await to(papa, SPOT.shelf);
        await papa.do("put_table");
        hold(s, "papa", null);
        papa.gait(null);
        await walk(mama, SPOT.shelf.map((v, i) => (i === 0 ? v - 0.6 : v)));
        mama.look("shelf#paraffin");
        await moment(s, "can_shelf:mama", 3);
        cam(s, ON("papa", "medium"));
        await to(papa, SPOT.window);
        papa.look("casement#window");
        await moment(s, "can_shelf:window", 3.5);
      },
    },
    // My reads the keeper's wall; the camera on the knot
    wall_read: {
      from: () => ROOM(STAND("my", [...at(-36, 3.0), 324], { my_look: "wall_a#nobody" }), STAND("papa", SPOT.window), STAND("mama", SPOT.table_l),
        { ...ON("wall_a#nobody", "medium") }),
      run: async s => {
        await moment(s, "wall_read:my", 3.5);
        await cam(s, ON("wall_a#nobody", 0.6), 2.5);
        await moment(s, "wall_read:knot", 2.5);
      },
    },
    // Papa writes over "Nobody again"; Mama paints the first stem on the sill
    log_write: {
      after: "wall_read",
      from: () => ROOM(STAND("my", [...at(-36, 3.0), 324], { my_look: "papa" }), STAND("papa", SPOT.window), STAND("mama", SPOT.window_l),
        { ...ON("wall_a#log", "medium") }),
      run: async s => {
        const papa = P(s, "papa"), mama = P(s, "mama");
        hold(s, "papa", ["pencil"]);
        await to(papa, [...at(-34, 3.05), 326]);
        papa.reach({ r: "wall_a#log" });
        papa.do("write_high", { loop: true });
        await s.wait(2);
        s.set("log", Math.max(1, s.get("log") ?? 0));
        papa.do("stand");
        papa.reach(null);
        await moment(s, "log_write:written", 4);
        cam(s, FROM(EYE.sill, POINTS["sill#garden"]));
        hold(s, "mama", ["brush"]);
        await to(mama, [...at(WIN.mid - 2, 3.2), WIN.mid]);
        mama.reach({ r: "sill#garden" });
        await s.wait(1.5);
        s.set("sill", Math.max(0, s.get("sill") ?? -1));
        await moment(s, "log_write:stem", 2.5);
      },
    },
    // 2.6 Supper: Mama paints the sill, the stove cold, the lantern on the table; Papa looks at the hatch; Mama sews
    supper: {
      from: () => ROOM(STAND("mama", SPOT.window_l, { mama_with: ["brush"], mama_reach: { r: "sill#garden" } }), STAND("papa", SPOT.stair),
        SIT("my", "corner"), STAND("troll", SPOT.window), { ...ON("sill#garden", 0.9) }),
      run: async s => {
        const mama = P(s, "mama"), papa = P(s, "papa");
        mama.do("paint", { loop: true });
        await moment(s, "supper:sill", 3);
        mama.reach(null);
        hold(s, "mama", ["sewing"]);
        cam(s, WIDE);
        await walk(mama, SPOT.table_l);
        await sit(s, "mama", "stool");
        papa.look("stair#hatch");
        await moment(s, "supper:hatch", 3.5);
        papa.look("lantern#flame");
        mama.look("mama#needle");
        mama.do("sew", { loop: true });
        cam(s, ON("mama", "medium"));
        await moment(s, "supper:sew", 3);
      },
    },
    // "Take it, take it": the lantern across the table to Papa and back, twice; the boy asks for it
    give: {
      after: "supper",
      from: () => ROOM(SIT("mama", "stool", { mama_with: ["sewing"], mama_do: loop("sew") }), { ...ON("lantern#flame", "full") }),
      run: async s => {
        const mama = P(s, "mama"), papa = P(s, "papa");
        mama.reach({ r: "lantern#flame" });
        await s.move("lantern_x", 0.45, { over: 1.2 });
        mama.reach(null);
        await moment(s, "give:give1", 3);
        await walk(papa, SPOT.table_l.map((v, i) => (i === 0 ? v + 0.15 : v)));
        await s.move("lantern_x", 0, { over: 1.2 });
        await walk(papa, SPOT.stair);
        mama.reach({ r: "lantern#flame" });
        await s.move("lantern_x", 0.45, { over: 1.2 });
        mama.reach(null);
        await moment(s, "give:give2", 2.5);
        P(s, "troll").look("casement#window");
        cam(s, ON("troll", "medium"));
        await moment(s, "give:ask", 5);
        cam(s, ON("lantern#flame", "wide"));
        for (const id of PEOPLE) P(s, id).look("lantern#flame");
        await s.wait(2);
      },
    },
    // Night: Papa fills the lantern from the can; the pose for the choice: the lantern in the middle, his face
    fill: {
      after: "give",
      from: () => ROOM(STAND("papa", SPOT.shelf), SIT("mama", "stool", { mama_with: ["sewing"] }), { lantern_x: 0.45, ...ON("papa", "medium") }),
      run: async s => {
        const papa = P(s, "papa");
        hold(s, "papa", ["can"]);
        await to(papa, [0.2, 5.5, 180]);
        papa.reach({ r: "lantern#flame" });
        await s.wait(1.5);
        s.set("paraffin", Math.max(0, (s.get("paraffin") ?? 3) - 1));
        papa.reach(null);
        await moment(s, "fill:poured", 1);
        hold(s, "papa", null);
        await cam(s, ON("papa", "close"));
        await s.wait(0.5);
      },
    },
    // Ш1 "Up": he carries the lantern up; the room in moonlight
    n1_lamp: {
      after: "fill",
      from: () => ROOM(STAND("papa", [0.2, 5.5, 180]), { lantern_x: 0.45, ...WIDE }),
      run: async s => {
        const papa = P(s, "papa");
        s.set("lantern_at", "none");
        hold(s, "papa", ["lantern"]);
        papa.gait("lantern_walk");
        await walk(papa, SPOT.stair);
        papa.here(false);
        papa.gait(null);
        hold(s, "papa", null);
        P(s, "mama").do("seated");
        await moment(s, "n1_lamp:up", 3);
      },
    },
    // Ш1 "To Mama": the term; Papa by her needle — the pose for "The Thread"
    n1_mama: {
      after: "fill",
      from: () => ROOM(STAND("papa", SPOT.table_r), SIT("mama", "stool", { mama_with: ["sewing"] }), { lantern_x: 0.45, ...ON("papa", "medium") }),
      run: async s => {
        await moment(s, "n1_mama:term", 6);
        const papa = P(s, "papa");
        await to(papa, [-1.25, 4.8, 160]);
        papa.look("mama#hands");
        await cam(s, ON("mama#hands", "close"));
        await s.move("needle_open", 1, { over: 0.6 });
      },
    },
    n1_mama_sat: {
      after: "n1_mama",
      from: () => ROOM(SIT("mama", "stool"), STAND("papa", [-1.25, 4.8, 160]), { lantern_x: 0.45, needle_open: 0, ...ON("mama", "medium") }),
      run: async s => {
        const papa = P(s, "papa"), mama = P(s, "mama");
        if (s.get("needle_open") > 0) await s.move("needle_open", 0, { over: 0.5 });
        await rise(s, "mama", "stool");
        await walk(mama, [-0.6, 5.3]);
        await sit(s, "mama", "bench_l");
        await walk(papa, [0.4, 5.35]);
        await sit(s, "papa", "bench_r");
        cam(s, ON("lantern#flame", "full"));
        await moment(s, "n1_mama_sat:sat", 3);
        mama.reach({ r: "lantern#flame" });
        await s.wait(1);
        s.set("flame", "low");
        mama.reach(null);
        await moment(s, "n1_mama_sat:low", 3);
      },
    },
    // Ш1 "To the son", after "The Lantern": he goes out with it; Mama looks Papa in the face
    n1_son: {
      after: "fill",
      from: () => ROOM(STAND("papa", SPOT.table_r), STAND("troll", [0.9, 4.0, 300]), SIT("mama", "stool", { mama_with: ["sewing"] }),
        { lantern_x: 0.45, handle_open: 0, ...ON("troll", "medium") }),
      run: async s => {
        const troll = P(s, "troll");
        if (s.get("handle_open") > 0) await s.move("handle_open", 0, { over: 0.5 });
        if (!s.get("son_given")) troll.look("papa");
        s.set("lantern_at", "none");
        hold(s, "troll", ["lantern"]);
        troll.mood("sad");
        await moment(s, "n1_son:hand", 1.5);
        troll.gait("hand_walk");
        await s.move("door", 0.8, { over: 1.2 });
        await walk(troll, SPOT.door, SPOT.out);
        troll.here(false);
        await s.move("door", 0, { over: 1.5 });
        await moment(s, "n1_son:gone", 2);
        const mama = P(s, "mama");
        mama.look("papa");
        mama.do("seated");
        cam(s, ON("mama", "close"));
        await moment(s, "n1_son:face", 3);
      },
    },
    // Ш1 "By turns": the wick down; Mama sews by it; Papa at the stair; up; she to the window
    n1_turns: {
      after: "fill",
      from: () => ROOM(STAND("papa", SPOT.table_r), SIT("mama", "stool", { mama_with: ["sewing"], mama_do: loop("sew") }), { lantern_x: 0.45, ...WIDE }),
      run: async s => {
        const papa = P(s, "papa"), mama = P(s, "mama");
        papa.reach({ r: "lantern#flame" });
        await s.wait(1);
        s.set("flame", "low");
        papa.reach(null);
        await moment(s, "n1_turns:low", 2);
        await to(papa, SPOT.stair);
        mama.do("seated");
        await moment(s, "n1_turns:stair", 3);
        papa.here(false);
        await rise(s, "mama", "stool");
        await to(mama, SPOT.window_l);
        mama.do("sew", { loop: true });
        cam(s, ON("mama", "medium"));
        await moment(s, "n1_turns:window", 3);
      },
    },
    // towards morning: the lantern on the middle step; the boy takes it and runs out
    n1_step: {
      from: () => ROOM(STAND("papa", SPOT.stair, { papa_with: ["lantern_low"] }), STAND("troll", SPOT.bunk), { lantern_at: "none", ...WIDE }),
      run: async s => {
        const papa = P(s, "papa"), troll = P(s, "troll");
        await walk(papa, SPOT.stair_step);
        await papa.do("put_table");
        hold(s, "papa", null);
        s.set("lantern_at", "stair");
        await moment(s, "n1_step:set", 2);
        papa.here(false);
        await walk(troll, SPOT.stair_step);
        s.set("lantern_at", "none");
        hold(s, "troll", ["lantern_low"]);
        troll.gait("run");
        await s.move("door", 1, { over: 0.8 });
        await walk(troll, SPOT.door, SPOT.out);
        troll.here(false);
        troll.gait(null);
        await moment(s, "n1_step:ran", 2);
      },
    },
    // Ш1 "To the son", dawn: the lantern by his bunk, the line in the low light, the flame out
    dawn_line: {
      from: () => ROOM(STAND("troll", SPOT.door, { troll_with: ["lantern_low"] }), STAND("papa", SPOT.stair), SIT("mama", "stool"),
        { lantern_at: "none", ...WIDE }),
      run: async s => {
        const troll = P(s, "troll"), papa = P(s, "papa");
        await walk(troll, SPOT.bunk);
        await troll.do("put_down");
        hold(s, "troll", null);
        s.set("lantern_at", "bunk");
        s.set("flame", "low");
        await moment(s, "dawn_line:bunk", 2);
        await walk(papa, SPOT.line);
        papa.look("wall_a#line27");
        await cam(s, FROM(EYE.line, POINTS["wall_a#line27"]), 2.5);
        await moment(s, "dawn_line:line", 4);
        s.set("flame", "out");
        await moment(s, "dawn_line:out", 2);
      },
    },
    // Ш1 "By turns", morning: the empty lantern in rime on the step; Papa shakes it
    dawn_stair: {
      from: () => ROOM(STAND("papa", SPOT.stair_step), { lantern_at: "stair", ...ON("papa", "medium") }),
      run: async s => {
        const papa = P(s, "papa");
        s.set("lantern_at", "none");
        hold(s, "papa", ["lantern_frost"]);
        await papa.do("shake_lantern");
        await moment(s, "dawn_stair:shake", 3);
      },
    },
    // 3.1 Morning: the boy's white paws, Mama rubs them; the garden grown on the wall
    morning: {
      from: () => ROOM(SIT("troll", "bench_r", { troll_with: ["rime_paws"] }), STAND("mama", SPOT.table_l, { mama_with: ["cup"] }),
        STAND("papa", SPOT.door), STAND("my", [...at(-15, 3.0), 345]), { ...ON("troll", "medium") }),
      run: async s => {
        const mama = P(s, "mama"), troll = P(s, "troll");
        await mama.do("startle");
        hold(s, "mama", null);
        await walk(mama, [0.4, 4.85]);
        mama.reach({ r: "troll#hands", l: "troll#hands" });
        mama.do("rub_paws", { loop: true });
        P(s, "papa").look("troll#hands");
        if (s.get("son_look") === "up") troll.look("papa");
        s.set("paws_rub", 0);
        s.set("paws_thaw", 0);
        await s.move("paws_open", 1, { over: 0.6 });
        s.move("paws_rub", 1, { over: 1 });
        s.move("paws_thaw", 1, { over: 4 });
        await moment(s, "morning:paws", 4);
        await s.move("paws_open", 0, { over: 0.6 });
        mama.reach(null);
        mama.do("stand");
        P(s, "my").look("wall_a#gate");
        await cam(s, ON("wall_a#garden", 1.6), 2.5);
        await moment(s, "morning:wall", 4);
      },
    },
    // 3.2 Into the wall: noon; Mama finishes the branch and steps in under the apple tree; My on the sill outside
    into_wall: {
      from: () => ROOM(STAND("mama", SPOT.garden, { mama_with: ["brush"], mama_reach: { r: "wall_a#apple" } }), SIT("my", "sill_out"),
        { papa_here: false, troll_here: false, ...ON("mama", "full") }),
      run: async s => {
        const mama = P(s, "mama");
        mama.do("paint", { loop: true });
        await moment(s, "into_wall:branch", 3);
        mama.reach(null);
        hold(s, "mama", null);
        await walk(mama, [...at(-11, 2.5)]);
        mama.look("wall_a#apple");
        if ((s.get("garden") ?? 0) <= 1) await mama.do("rub_eyes");
        else mama.look("table");
        await s.wait(1.5);
        await walk(mama, SPOT.garden);
        mama.here(false);
        await s.move("wall_mama", 1, { over: 1.5 });
        await cam(s, ON("wall_mama#mama", 0.5), 2);
        await moment(s, "into_wall:in", 3);
      },
    },
    // 3.3 The empty room: Papa down from the hatch, the cold tea, My in the door, his palm on the gate
    empty_room: {
      after: "into_wall",
      from: () => ROOM(STAND("papa", SPOT.stair), STAND("my", SPOT.door, { my_turn: DOOR.mid + 180 }), { mama_here: false, troll_here: false,
        cups: 1, tea: 0, door: 0.8, ...WIDE }),
      run: async s => {
        const papa = P(s, "papa"), my = P(s, "my");
        s.set("papa_here", true);
        s.set("my_here", true);
        await walk(papa, SPOT.table_l);
        papa.look("cup#cup");
        await moment(s, "empty_room:down", 2.5);
        my.look("wall_a#garden");
        await moment(s, "empty_room:my", 5);
        await to(papa, SPOT.gate);
        papa.look("wall_mama#mama");
        papa.reach({ r: "wall_a#gate" });
        await cam(s, FROM(EYE.gate, [SPOT.gate[0], SPOT.gate[1], 1.1]));
        await moment(s, "empty_room:gate", 1);
      },
    },
    // Ш2 "Walking", dusk: Mama out of the wall; only My sees
    w_walk: {
      from: () => ROOM(SIT("my", "sill_out", { my_look: "wall_mama#mama" }), { papa_here: false, troll_here: false, mama_here: false, wall_mama: 1,
        ...ON("wall_mama#mama", "full") }),
      run: async s => {
        await s.move("wall_mama", 0, { over: 1.5 });
        s.set("wall_grass", true);
        s.set("mama_here", true);
        cam(s, ON("my", "medium"));
        await moment(s, "w_walk:out", 3);
      },
    },
    // Ш2 "Calling", after "The Palm": Mama out at once; the brushes into the jar
    w_call: {
      after: "empty_room",
      from: () => ROOM(STAND("papa", SPOT.gate, { papa_reach: { r: "wall_a#gate" } }), { mama_here: false, wall_mama: 1,
        ...FROM(EYE.gate, [SPOT.gate[0], SPOT.gate[1], 1.1]) }),
      run: async s => {
        const papa = P(s, "papa"), mama = P(s, "mama");
        await s.move("wall_mama", 0, { over: 1.2 });
        s.set("wall_grass", true);
        s.set("mama_a", SPOT.garden[0]);
        s.set("mama_d", SPOT.garden[1] - 0.4);
        mama.here(true);
        mama.turn(170);
        papa.reach(null);
        papa.do("stand");
        papa.look("mama");
        await moment(s, "w_call:out", 4);
        await walk(mama, [...at(WIN.mid + 5, 3.1)]);
        mama.reach({ r: "jar#jar" });
        await s.wait(1);
        s.set("brushes", "jar");
        mama.reach(null);
        await moment(s, "w_call:jar", 3);
      },
    },
    // Ш2 "Waiting": the cup, Papa on the floor by the wall; the light goes on toward dusk; the pose for "Dust"
    w_wait: {
      after: "empty_room",
      from: () => ROOM(STAND("papa", SPOT.gate), { mama_here: false, wall_mama: 1, cups: 1, tea: 1, troll_here: false, my_here: false, ...WIDE }),
      run: async s => {
        await sit(s, "papa", "wall");
        P(s, "papa").look("wall_mama#mama");
        s.move("dusk", 0.5, { over: 10 });
        await s.move("tea", 0, { over: 6 });
        s.set("tea", 1);
        P(s, "papa").look("wall_a#line27");
        P(s, "papa").reach({ r: "wall_a#line27" });
        await cam(s, FROM(EYE.line, POINTS["wall_a#line27"]), 2);
        await moment(s, "w_wait:sit", 0.5);
      },
    },
    w_wait_son: {
      after: "w_wait",
      from: () => ROOM(SIT("papa", "wall", { papa_reach: { r: "wall_a#line27" } }), { mama_here: false, wall_mama: 1, cups: 1, tea: 0.4, troll_here: false,
        my_here: false, dusk: 0.5, ...FROM(EYE.line, POINTS["wall_a#line27"]) }),
      run: async s => {
        const papa = P(s, "papa"), troll = P(s, "troll"), mama = P(s, "mama");
        papa.reach(null);
        await moment(s, "w_wait_son:line", 4);
        s.set("troll_a", SPOT.threshold[0]);
        s.set("troll_d", SPOT.threshold[1]);
        s.set("troll_turn", SPOT.threshold[2]);
        hold(s, "troll", ["stone"]);
        troll.here(true);
        await s.move("door", 0.9, { over: 1 });
        cam(s, ON("troll", "medium"));
        await moment(s, "w_wait_son:son", 4);
        papa.do("lift_hand");
        await moment(s, "w_wait_son:hush", 3);
        hold(s, "troll", null);
        s.set("stone", true);
        troll.here(false);
        await s.move("door", 0, { over: 1.2 });
        await moment(s, "w_wait_son:stone", 1.5);
        cam(s, WIDE);
        await s.move("dusk", 1, { over: 3 });
        await s.move("wall_mama", 0, { over: 1.2 });
        s.set("wall_grass", true);
        s.set("mama_a", SPOT.garden[0]);
        s.set("mama_d", SPOT.garden[1] - 0.4);
        mama.here(true);
        await moment(s, "w_wait_son:out", 2);
        await walk(mama, [-0.2, 4.15]);
        mama.reach({ r: "cup#cup" });
        await moment(s, "w_wait_son:cup", 2);
        mama.reach(null);
        await walk(mama, [...at(-33, 3.1)]);
        await mama.go("sit_floor", { to: [...at(-33, 3.1)], turn: 327 });
        mama.do("huddle", { loop: true });
        cam(s, ON("papa", "full"));
        await moment(s, "w_wait_son:beside", 3);
      },
    },
    // 3.5 Night 2, "Calling": Mama asleep at the table; the wick down; the boy's hand on the lantern
    n2_call: {
      from: () => ROOM(SIT("mama", "bench_l", { mama_do: loop("doze") }), SIT("papa", "bench_r", { papa_do: loop("doze") }),
        STAND("troll", SPOT.bunk), { ...WIDE }),
      run: async s => {
        const papa = P(s, "papa"), troll = P(s, "troll");
        papa.do("seated");
        papa.reach({ r: "lantern#flame" });
        await s.wait(1);
        s.set("flame", "low");
        papa.reach(null);
        papa.do("doze", { loop: true });
        await walk(troll, [0.25, 3.95]);
        troll.turn(0);
        troll.reach({ r: "lantern#flame" });
        s.set("eyes", 0);
        papa.look("troll#hands");
        await cam(s, ON("lantern#flame", "full"));
        await moment(s, "n2_call:hand", 0.5);
      },
    },
    // 3.5 Night 2, "Waiting": Papa dozing by the cup; Mama turns the wick low; the boy's hand on the lantern
    n2_wait: {
      from: () => ROOM(SIT("papa", "wall", { papa_do: loop("doze_floor") }), STAND("mama", SPOT.table_r), STAND("troll", SPOT.bunk), { cups: 1, ...WIDE }),
      run: async s => {
        const mama = P(s, "mama"), troll = P(s, "troll"), papa = P(s, "papa");
        mama.reach({ r: "lantern#flame" });
        await s.wait(1);
        s.set("flame", "low");
        mama.reach(null);
        await moment(s, "n2_wait:low", 3);
        await walk(mama, SPOT.bunk.map((v, i) => (i === 1 ? v + 0.8 : v)));
        mama.here(false);
        await walk(troll, [0.25, 3.95]);
        troll.turn(0);
        troll.reach({ r: "lantern#flame" });
        s.set("eyes", 0);
        papa.look("troll#hands");
        await cam(s, ON("lantern#flame", "full"));
        await moment(s, "n2_wait:hand", 0.5);
      },
    },
    // 3.5 Night 2, "Walking" below: Mama lying awake facing the wall, humming
    n2_walk: {
      from: () => ROOM(STAND("mama", SPOT.bunk, { mama_do: loop("lie_side"), mama_on: [...at(-98, 3.1), 0.62] }), { papa_here: false, ...ON("mama", "full") }),
      run: async s => {
        await moment(s, "n2_walk:hum", 5);
      },
    },
    // 3.6 "Don't open your eyes": the boy still with the lantern, looking at his father — the pose for "Asleep"
    n2_sleep: {
      after: ["n2_call", "n2_wait"],
      from: () => ROOM(STAND("troll", [0.25, 3.95, 300], { troll_with: ["lantern_low"], troll_do: loop("hold_lantern"), troll_look: "papa" }),
        SIT("papa", "bench_r", { papa_do: loop("doze") }), { lantern_at: "none", eyes: 0, ...ON("troll", "medium") }),
      run: async s => {
        const troll = P(s, "troll");
        troll.reach(null);
        s.set("lantern_at", "none");
        hold(s, "troll", ["lantern_low"]);
        troll.do("hold_lantern", { loop: true });
        troll.look("papa");
        await cam(s, ON("troll", "medium"));
        await moment(s, "n2_sleep:still", 1);
      },
    },
    n2_sleep_gone: {
      after: "n2_sleep",
      from: () => ROOM(STAND("troll", [0.25, 3.95, 300], { troll_with: ["lantern_low"] }), { lantern_at: "none", ...WIDE }),
      run: async s => {
        const troll = P(s, "troll");
        troll.gait("lantern_walk");
        await s.move("door", 0.8, { over: 1 });
        await walk(troll, SPOT.door, SPOT.out);
        troll.here(false);
        troll.gait(null);
        await s.move("door", 0, { over: 1.2 });
        await moment(s, "n2_sleep_gone:gone", 2);
      },
    },
    // 3.6 "Put it back": he sets it down and stands at the window till dawn
    n2_put: {
      after: ["n2_call", "n2_wait"],
      from: () => ROOM(STAND("troll", [0.25, 3.95, 0], { troll_reach: { r: "lantern#flame" } }), SIT("papa", "bench_r"), { ...ON("troll", "medium") }),
      run: async s => {
        const troll = P(s, "troll");
        // (Papa awake where he lay, looking at the boy's back)
        s.set("eyes", 1);
        troll.reach(null);
        await moment(s, "n2_put:down", 2);
        await to(troll, SPOT.window);
        cam(s, FROM(EYE.window, POINTS["casement#window"]));
        await moment(s, "n2_put:window", 3);
      },
    },
    // 3.6 "Follow": out after him
    n2_follow: {
      after: ["n2_call", "n2_wait"],
      from: () => ROOM(STAND("troll", [0.25, 3.95, 0], { troll_with: ["lantern_low"] }), STAND("papa", SPOT.table_l), { lantern_at: "none", ...WIDE }),
      run: async s => {
        const troll = P(s, "troll"), papa = P(s, "papa");
        troll.reach(null);
        s.set("lantern_at", "none");
        hold(s, "troll", ["lantern_low"]);
        troll.gait("lantern_walk");
        await s.move("door", 0.9, { over: 1 });
        await walk(troll, SPOT.door, SPOT.out);
        troll.here(false);
        s.set("eyes", 1);
        if (s.get("papa_on")) await rise(s, "papa", "bench_r");
        else {
          papa.on(null);
          await papa.do("rise_floor");
        }
        await walk(papa, SPOT.door, SPOT.out);
        papa.here(false);
        await moment(s, "n2_follow:out", 2);
      },
    },
    // 3.6 Morning after "Follow": My and Papa at the table
    n2_morning: {
      from: () => ROOM(SIT("papa", "bench_r"), SIT("my", "corner", { my_look: "papa" }), { troll_here: false, ...ON("my", "medium") }),
      run: async s => {
        await moment(s, "n2_morning:my", 5);
      },
    },
    // 4.1 Breakfast: Papa boasts; My
    breakfast: {
      from: () => ROOM(SIT("papa", "bench_r"), SIT("mama", "stool"), SIT("my", "corner"), SIT("troll", "bench_l"), { ...ON("papa", "medium") }),
      run: async s => {
        await moment(s, "breakfast:boast", 6);
        P(s, "my").look("papa");
        cam(s, ON("my", "medium"));
        await moment(s, "breakfast:my", 6);
      },
    },
    breakfast_leave: {
      after: "breakfast",
      from: () => ROOM(SIT("papa", "bench_r"), SIT("mama", "stool"), SIT("my", "corner"), SIT("troll", "bench_l"), { ...WIDE }),
      run: async s => {
        await rise(s, "troll", "bench_l");
        await s.move("door", 0.9, { over: 1 });
        await walk(P(s, "troll"), SPOT.door, SPOT.out);
        P(s, "troll").here(false);
        P(s, "mama").look("door");
        await s.move("door", 0, { over: 1.2 });
        await moment(s, "breakfast_leave:leave", 2);
      },
    },
    // 4.2 The oil: the stove with the whole bundle, the pot wrapped and carried up; cold bread
    oil: {
      from: () => ROOM(STAND("papa", SPOT.stove), SIT("mama", "stool"), SIT("my", "corner"), { troll_here: false, ...ON("stove#stove", "full") }),
      run: async s => {
        const papa = P(s, "papa");
        await papa.do("crouch");
        s.set("firewood", false);
        s.set("stove", "fire");
        await papa.do("crouch_rise");
        papa.do("stir", { loop: true });
        await moment(s, "oil:fire", 3);
        hold(s, "papa", ["pot"]);
        papa.gait("carry_walk");
        cam(s, WIDE);
        await walk(papa, SPOT.stair);
        papa.here(false);
        papa.gait(null);
        await moment(s, "oil:up", 3);
        hold(s, "mama", ["bread"]);
        await moment(s, "oil:bread", 3);
      },
    },
    // 4.3 The storm: the stove flooded, the door, the window
    storm: {
      from: () => ROOM(STAND("papa", SPOT.centre), STAND("mama", SPOT.table_r), STAND("my", SPOT.window_l), STAND("troll", SPOT.table_l), { ...WIDE }),
      run: async s => {
        s.set("stove", "flooded");
        s.set("steam", 1);
        for (const id of PEOPLE) P(s, id).look("stove#stove");
        await moment(s, "storm:flood", 3);
        s.move("steam", 0, { over: 6 });
        await s.move("door", 0.25, { over: 0.4 });
        for (const id of PEOPLE) P(s, id).look("door#door");
        await s.move("door", 0.05, { over: 0.8 });
        await moment(s, "storm:door", 3);
        for (const id of PEOPLE) P(s, id).look("stair#hatch");
        await moment(s, "storm:glass", 2.5);
        await cam(s, ON("casement#window", "full"));
        await moment(s, "storm:window", 0.5);
      },
    },
    // 4.3 Mama by her garden: the sleeve, the shutters, the gate (her paints under her apron when they are her own)
    storm_sleeve: {
      after: "storm",
      from: () => ROOM(STAND("papa", SPOT.centre), STAND("mama", SPOT.window_l), { ...ON("mama", "full") }),
      run: async s => {
        const mama = P(s, "mama");
        mama.reach({ r: "casement#window" });
        await s.wait(1.5);
        s.set("shutters", true);
        mama.reach(null);
        await walk(mama, [SPOT.centre[0] - 0.45, SPOT.centre[1]]);
        mama.reach({ l: "papa#hand_r" });
        await moment(s, "storm_sleeve:held", 2);
        if (s.get("paints") === "green") await moment(s, "storm_sleeve:paints", 2);
      },
    },
    storm_shutters: {
      after: "storm",
      from: () => ROOM(STAND("papa", SPOT.centre), STAND("mama", SPOT.window_l), { ...ON("mama", "full") }),
      run: async s => {
        const mama = P(s, "mama");
        mama.reach({ r: "casement#window" });
        await s.wait(1.5);
        s.set("shutters", true);
        mama.reach(null);
        await moment(s, "storm_shutters:tied", 2);
        if (s.get("paints") === "green") await moment(s, "storm_shutters:paints", 2);
      },
    },
    storm_gate: {
      after: "storm",
      from: () => ROOM(STAND("papa", SPOT.centre), STAND("mama", SPOT.window_l), { ...ON("mama", "full") }),
      run: async s => {
        const mama = P(s, "mama");
        mama.reach({ r: "casement#window" });
        await s.wait(1.5);
        s.set("shutters", true);
        mama.reach(null);
        await to(mama, SPOT.gate);
        mama.reach({ r: "wall_a#gate" });
        await moment(s, "storm_gate:gate", 2.5);
        mama.reach(null);
        if (s.get("paints") === "green") await moment(s, "storm_gate:paints", 2);
      },
    },
    // 4.3 The full moon in a break; My at the window, delighted; the pose for Ш3: Papa's face
    storm_moon: {
      after: ["storm_sleeve", "storm_shutters", "storm_gate"],
      from: () => ROOM(STAND("papa", SPOT.centre), STAND("mama", SPOT.table_r), STAND("my", SPOT.window), STAND("troll", SPOT.table_l), { ...WIDE }),
      run: async s => {
        const my = P(s, "my");
        my.mood("laugh");
        my.look("casement#window");
        P(s, "mama").look("casement#window");
        s.set("flash", 1);
        s.move("flash", 0, { over: 0.6, ease: "out" });
        await moment(s, "storm_moon:moon", 3);
        cam(s, ON("my", "medium"));
        await moment(s, "storm_moon:my", 3);
        await cam(s, ON("papa", "close"));
      },
    },
    // 4.4 Ш3 "The door": the last paraffin into the lantern, the order; the pose for "The Door"
    st_door: {
      after: "storm_moon",
      from: () => ROOM(STAND("papa", SPOT.table_r), STAND("mama", SPOT.table_l), STAND("my", SPOT.window_l), STAND("troll", SPOT.centre), { ...WIDE }),
      run: async s => {
        const papa = P(s, "papa");
        await walk(papa, SPOT.table_r);
        hold(s, "papa", ["can"]);
        papa.reach({ r: "lantern#flame" });
        await s.wait(1.2);
        s.set("paraffin", 0);
        s.set("lantern_at", "table");
        s.set("flame", "full");
        papa.reach(null);
        hold(s, "papa", null);
        await moment(s, "st_door:fill", 2);
        papa.turn(270);
        await moment(s, "st_door:order", 3.5);
        for (const id of PEOPLE) P(s, id).look("door#door");
        await to(papa, SPOT.door);
        papa.do("lean_door", { loop: true });
        papa.reach({ r: "door#door", l: "door#door" });
        await cam(s, ON("door#door", "full"));
      },
    },
    st_door_sat: {
      after: "st_door",
      from: () => ROOM(STAND("papa", SPOT.door), { ...WIDE }),
      run: async s => {
        const backs = [[...at(DOOR.mid - 9, R - 0.4), DOOR.mid + 180], [...at(DOOR.mid - 3, R - 0.4), DOOR.mid + 180],
          [...at(DOOR.mid + 3, R - 0.4), DOOR.mid + 180], [...at(DOOR.mid + 9, R - 0.4), DOOR.mid + 180]];
        const order = ["mama", "papa", "my", "troll"];
        P(s, "papa").reach(null);
        await Promise.all(order.map(async (id, i) => {
          const p = P(s, id);
          await walk(p, backs[i]);
          await p.go("sit_floor", { to: [backs[i][0], backs[i][1]], turn: backs[i][2] });
          p.do("huddle", { loop: true });
        }));
        await cam(s, ON("door#door", "full"));
        await moment(s, "st_door_sat:sat", 1.5);
        P(s, "my").look("papa");
        await moment(s, "st_door_sat:story", 6);
        await moment(s, "st_door_sat:told", 3);
        for (const id of order) P(s, id).mood("laugh");
        await moment(s, "st_door_sat:laugh", 2.5);
        for (const id of order) P(s, id).mood("neutral");
        P(s, "mama").look(s.get("mama_to") === "apple" ? "wall_a#apple" : "papa");
        cam(s, ON("mama", "close"));
        await moment(s, "st_door_sat:home", 4);
        s.set("flash", 1);
        s.move("flash", 0, { over: 0.6, ease: "out" });
        cam(s, ON("casement#window", "full"));
        await moment(s, "st_door_sat:flash", 3);
      },
    },
    // 4.4 Ш3, Papa goes: the lines, the last paraffin, out at the door or up the hatch, Mama after him
    st_go: {
      after: "storm_moon",
      from: () => ROOM(STAND("papa", SPOT.table_r), STAND("mama", SPOT.table_l), STAND("my", SPOT.window_l), STAND("troll", SPOT.centre), { ...WIDE }),
      run: async s => {
        const papa = P(s, "papa");
        await moment(s, "st_go:say", 5);
        await walk(papa, SPOT.table_r);
        hold(s, "papa", ["can"]);
        papa.reach({ r: "lantern#flame" });
        await s.wait(1);
        s.set("paraffin", 0);
        papa.reach(null);
        hold(s, "papa", ["lantern"]);
        s.set("lantern_at", "none");
        await moment(s, "st_go:fill", 2);
        papa.gait("lantern_walk");
        await walk(papa, SPOT.door);
        await s.move("door", 1, { over: 0.6 });
        await walk(papa, SPOT.out);
        papa.here(false);
        papa.gait(null);
        await s.move("door", 0, { over: 1 });
        await moment(s, "st_go:gone", 1.5);
        cam(s, ON("mama", "close"));
        await moment(s, "st_go:after", 3);
      },
    },
    // 4.4 Ш3, Papa gone: Mama and the children hold the door in the dark
    st_left: {
      from: () => ROOM(STAND("mama", SPOT.door, { mama_do: loop("lean_door"), mama_reach: { r: "door#door", l: "door#door" } }),
        STAND("my", [...at(DOOR.mid - 9, R - 0.5), DOOR.mid], { my_do: loop("lean_door") }), STAND("troll", [...at(DOOR.mid + 9, R - 0.5), DOOR.mid],
          { troll_do: loop("lean_door") }), { papa_here: false, lantern_at: "none", ...ON("door#door", "full") }),
      run: async s => {
        await s.move("door", 0.12, { over: 0.4 });
        await s.move("door", 0, { over: 0.6 });
        await moment(s, "st_left:held", 3);
      },
    },
    // 4.4 Ш3 "The burner, and run": he comes down — the wave already in; the door already held
    st_run: {
      from: () => ROOM(STAND("papa", SPOT.stair), STAND("mama", SPOT.door, { mama_do: loop("lean_door") }), STAND("my", [...at(DOOR.mid - 9, R - 0.5), DOOR.mid]),
        STAND("troll", [...at(DOOR.mid + 9, R - 0.5), DOOR.mid]), { wet: true, ...WIDE }),
      run: async s => {
        await walk(P(s, "papa"), SPOT.door_back);
        P(s, "papa").turn(DOOR.mid);
        await moment(s, "st_run:in", 3);
      },
    },
    // 4.5 Calm: drips, the empty can, the flooded stove; Mama's basket by the door
    calm: {
      from: () => ROOM(STAND("mama", SPOT.shelf), { papa_here: false, ...ON("stove#stove", "full") }),
      run: async s => {
        const packed = s.get("basket") === true;
        if (packed) {
          s.set("basket", false);
          hold(s, "mama", ["basket"]);
        }
        s.set("drip", 1);
        await moment(s, "calm:drip", 3);
        if (packed) {
          const mama = P(s, "mama");
          mama.gait("hand_walk");
          await walk(mama, [...at(31, 2.9)]);
          await mama.do("put_down");
          hold(s, "mama", null);
          mama.gait(null);
          s.set("basket", true);
          cam(s, ON("basket#basket", "full"));
          await moment(s, "calm:basket", 3);
        }
      },
    },
    // 4.6 Night 3: the boy at the door without a lantern; Mama; Papa's paw on his shoulder
    night3: {
      from: () => ROOM(STAND("troll", SPOT.door), STAND("papa", SPOT.centre), STAND("mama", SPOT.table_l), { ...WIDE }),
      run: async s => {
        const troll = P(s, "troll"), papa = P(s, "papa");
        if (s.get("stone")) {
          s.set("stone", false);
          hold(s, "troll", ["stone"]);
        }
        const look = s.get("son_look");
        if (look === "papa") {
          troll.look("papa");
          await s.wait(1.2);
        }
        troll.look(look === "away" ? "door#door" : null);
        await moment(s, "night3:door", 3);
        cam(s, ON("mama", "medium"));
        await moment(s, "night3:mama", 6);
        await walk(papa, [...at(DOOR.mid - 8, R - 0.55)]);
        papa.turn(DOOR.mid + 60);
        troll.turn(DOOR.mid + 180);
        papa.reach({ r: "troll#shoulder_l" });
        await cam(s, ON("troll", "close"));
        await moment(s, "night3:shoulder", 0.5);
      },
    },
    // 4.7 "Let him go": he goes; Mama with the blanket out after him
    n3_go: {
      after: "night3",
      from: () => ROOM(STAND("troll", SPOT.door), STAND("papa", [...at(DOOR.mid - 8, R - 0.55), DOOR.mid + 60]), STAND("mama", SPOT.table_l), { ...WIDE }),
      run: async s => {
        const troll = P(s, "troll"), mama = P(s, "mama");
        P(s, "papa").reach(null);
        await s.move("door", 0.9, { over: 1 });
        await walk(troll, SPOT.out);
        troll.here(false);
        await moment(s, "n3_go:out", 2);
        hold(s, "mama", ["blanket"]);
        mama.gait("carry_walk");
        await walk(mama, SPOT.door, SPOT.out);
        mama.here(false);
        mama.gait(null);
        await moment(s, "n3_go:blanket", 2);
      },
    },
    // Mama at the window till morning, Papa behind; at dawn the boy in the door in the blanket; she rubs his paws, tea
    n3_dawn: {
      from: () => ROOM(STAND("mama", SPOT.window), STAND("papa", [...at(WIN.mid, 2.5), WIN.mid]), { troll_here: false, ...ON("mama", "full") }),
      run: async s => {
        const troll = P(s, "troll"), mama = P(s, "mama");
        await moment(s, "n3_dawn:window", 3);
        await s.move("dawn", 1, { over: 4 });
        s.set("troll_a", SPOT.threshold[0]);
        s.set("troll_d", SPOT.threshold[1]);
        s.set("troll_turn", SPOT.threshold[2]);
        hold(s, "troll", ["blanket_wrap", "rime_arms"]);
        troll.here(true);
        await s.move("door", 0.9, { over: 1 });
        cam(s, ON("troll", "close"));
        await moment(s, "n3_dawn:dawn", 4);
        await walk(troll, [0.4, 4.85]);
        await sit(s, "troll", "bench_r");
        await walk(mama, [-0.3, 5.3]);
        await sit(s, "mama", "bench_l");
        mama.reach({ r: "troll#hands", l: "troll#hands" });
        s.set("paws_rub", 0);
        s.set("paws_thaw", 0);
        await s.move("paws_open", 1, { over: 0.6 });
        s.move("paws_rub", 1, { over: 1 });
        s.move("paws_thaw", 1, { over: 4 });
        await moment(s, "n3_dawn:rub", 3);
        await s.move("paws_open", 0, { over: 0.6 });
        mama.reach(null);
        s.set("cups", 1);
        s.set("tea", 1);
        cam(s, ON("cup#cup", "full"));
        await moment(s, "n3_dawn:tea", 2.5);
      },
    },
    // 4.7 "Mama's right": the boy at the window
    n3_right: {
      after: "night3",
      from: () => ROOM(STAND("troll", SPOT.door), STAND("papa", [...at(DOOR.mid - 8, R - 0.55), DOOR.mid + 60]), { ...WIDE }),
      run: async s => {
        const troll = P(s, "troll");
        P(s, "papa").reach(null);
        if (s.get("son_look") === "away") {
          troll.mood("afraid");
          troll.look("casement#window");
        } else troll.look(null);
        await to(troll, SPOT.window);
        cam(s, FROM(EYE.window, POINTS["casement#window"]));
        await moment(s, "n3_right:window", 3);
      },
    },
    // dawn: Mama covers him at the window with the blanket
    n3_cover: {
      from: () => ROOM(STAND("troll", SPOT.window), STAND("mama", SPOT.window_l, { mama_with: ["blanket"] }), { ...ON("troll", "full") }),
      run: async s => {
        const mama = P(s, "mama");
        await walk(mama, [...at(WIN.mid - 3, 2.95)]);
        await mama.do("tuck");
        hold(s, "mama", null);
        hold(s, "troll", ["blanket_wrap"]);
        await moment(s, "n3_cover:blanket", 3);
      },
    },
    // 4.7 "Come on. I'll go to the dune": out together
    n3_dune: {
      after: "night3",
      from: () => ROOM(STAND("troll", SPOT.door), STAND("papa", [...at(DOOR.mid - 8, R - 0.55), DOOR.mid + 60]), { ...WIDE }),
      run: async s => {
        const troll = P(s, "troll"), papa = P(s, "papa");
        papa.reach(null);
        await s.move("door", 0.9, { over: 1 });
        walk(troll, SPOT.out);
        await walk(papa, SPOT.door, SPOT.out);
        troll.here(false);
        papa.here(false);
        await moment(s, "n3_dune:out", 2);
      },
    },
    // Mama at the window with the blanket; two cups, one goes cold
    n3_cups: {
      from: () => ROOM(STAND("mama", SPOT.window, { mama_with: ["blanket"] }), { papa_here: false, troll_here: false, cups: 2, tea: 1, ...ON("cup#cup", "full") }),
      run: async s => {
        await moment(s, "n3_cups:cups", 2);
        await s.move("tea", 0, { over: 5 });
        await moment(s, "n3_cups:cold", 2.5);
      },
    },
    // Epilogue at the term: Mama unpacks her basket
    unpack: {
      from: () => ROOM(STAND("mama", [...at(31, 2.85), WIN.mid + 7]), { basket: true, ...ON("mama", "full") }),
      run: async s => {
        const mama = P(s, "mama");
        await mama.do("pick_up");
        s.set("basket", false);
        hold(s, "mama", ["basket"]);
        mama.gait("hand_walk");
        await walk(mama, SPOT.shelf);
        await mama.do("put_table");
        hold(s, "mama", null);
        mama.gait(null);
        await moment(s, "unpack:unpack", 2);
      },
    },
    // Epilogue "The Beam": Mama by her mark — at the table by two cups, by the bare tree, or under the apple tree
    e_beam: {
      from: () => ROOM(SIT("mama", "bench_l"), { papa_here: false, troll_here: false, ...ON("mama", "full") }),
      run: async s => {
        if ((s.get("wall_mama") ?? 0) > 0.5) {
          s.set("mama_here", false);
          cam(s, ON("wall_mama#mama", 0.6));
        }
        await moment(s, "e_beam:mama", 4);
      },
    },
    e_beam_my: {
      after: "e_beam",
      from: () => ROOM(STAND("my", SPOT.line, { my_do: loop("crouched"), my_look: "wall_a#line27" }), { papa_here: false, troll_here: false,
        ...FROM(EYE.line, POINTS["wall_a#line27"]) }),
      run: async s => {
        s.set("line27", "stripe");
        await moment(s, "e_beam_my:my", 5);
        P(s, "my").look("casement#window");
        await moment(s, "e_beam_my:look", 2.5);
        P(s, "my").look("casement#window");
        await cam(s, ON("casement#window", "full"), 2.5);
        await moment(s, "e_beam_my:window", 4);
        // (held still on the window: the game cuts outside to the beam)
        await s.wait(1);
      },
    },
    // Epilogue "The Boat": Mama carries her basket out
    e_basket: {
      from: () => ROOM(STAND("mama", [...at(31, 2.85), WIN.mid + 7]), { basket: true, papa_here: false, ...WIDE }),
      run: async s => {
        const mama = P(s, "mama");
        await mama.do("pick_up");
        s.set("basket", false);
        hold(s, "mama", ["basket"]);
        mama.gait("hand_walk");
        await s.move("door", 1, { over: 1 });
        await walk(mama, SPOT.door, SPOT.out);
        mama.here(false);
        await moment(s, "e_basket:out", 3);
      },
    },
    // Epilogue "The Pie", morning: Papa tells the night on the cape
    e_story: {
      from: () => ROOM(SIT("papa", "bench_r"), SIT("my", "corner"), STAND("mama", SPOT.stove), { ...ON("papa", "medium") }),
      run: async s => {
        await moment(s, "e_story:story", 7);
        P(s, "my").look("papa");
        await moment(s, "e_story:birthday", 4);
      },
    },
    e_pie: {
      after: "e_story",
      from: () => ROOM(SIT("papa", "bench_r"), SIT("my", "corner"), STAND("mama", SPOT.stove), { ...WIDE }),
      run: async s => {
        const mama = P(s, "mama"), papa = P(s, "papa");
        s.set("stove", "fire");
        mama.do("stir", { loop: true });
        cam(s, ON("mama", "full"));
        await moment(s, "e_pie:pie", 4);
        await rise(s, "papa", "bench_r");
        hold(s, "papa", ["pie"]);
        papa.gait("carry_walk");
        await s.move("door", 1, { over: 1 });
        await walk(papa, SPOT.door, SPOT.out);
        papa.here(false);
        await moment(s, "e_pie:out", 2);
      },
    },
    // Epilogue "The Pie", home — Mama was with him: two cups; he comes back, she asleep, his cup cold
    e_home_was: {
      from: () => ROOM(SIT("mama", "bench_l"), { papa_here: false, troll_here: false, my_here: false, cups: 2, tea: 1, ...ON("cup#cup", "full") }),
      run: async s => {
        await moment(s, "e_home_was:cups", 2.5);
        P(s, "mama").do("doze", { loop: true });
        await s.move("tea", 0, { over: 4 });
        s.set("papa_a", SPOT.threshold[0]);
        s.set("papa_d", SPOT.threshold[1]);
        s.set("papa_turn", SPOT.threshold[2]);
        P(s, "papa").here(true);
        await walk(P(s, "papa"), SPOT.table_r);
        await moment(s, "e_home_was:back", 3);
      },
    },
    // — Mama was not: her palm on the painted veranda, into the garden; the empty room, one cup
    e_home_away: {
      from: () => ROOM(STAND("mama", [...at(4, 3.1), 4]), { papa_here: false, troll_here: false, my_here: false, cups: 1, tea: 0, ...ON("mama", "full") }),
      run: async s => {
        const mama = P(s, "mama");
        mama.reach({ r: "wall_a#garden" });
        await moment(s, "e_home_away:veranda", 2.5);
        mama.here(false);
        await s.move("wall_mama", 1, { over: 1.5 });
        s.set("papa_a", SPOT.threshold[0]);
        s.set("papa_d", SPOT.threshold[1]);
        s.set("papa_turn", SPOT.threshold[2]);
        P(s, "papa").here(true);
        await walk(P(s, "papa"), SPOT.table_r);
        cam(s, ON("cup#cup", "full"));
        await moment(s, "e_home_away:back", 3);
      },
    },
    // Epilogue, the late "Pie": his "27 August. Calm."; My at the low lines; the same date; the knot; bread
    e_late: {
      from: () => ROOM(STAND("papa", [...at(-34, 3.05), 326], { papa_with: ["pencil"] }), STAND("my", SPOT.line, { my_do: loop("crouched") }),
        STAND("mama", SPOT.table_l), { troll_here: false, ...ON("wall_a#log", "medium") }),
      run: async s => {
        const papa = P(s, "papa");
        papa.reach({ r: "wall_a#log" });
        papa.do("write_high", { loop: true });
        await s.wait(2);
        s.set("log", 2);
        papa.reach(null);
        papa.do("stand");
        await moment(s, "e_late:log", 2);
        s.set("line27", "stripe");
        cam(s, FROM(EYE.line, POINTS["wall_a#line27"]));
        await moment(s, "e_late:my", 6);
        papa.look("wall_a#line27");
        await moment(s, "e_late:knot", 3);
        hold(s, "mama", ["bread"]);
        cam(s, ON("mama", "medium"));
        await moment(s, "e_late:bread", 3);
      },
    },
    // Epilogue "The Stair": the empty lantern; Mama painting clouds or with her tea; the storm told; "You were
    // everywhere"; My's finger on the knot — the pose for "The Stair"
    e_stair: {
      from: () => ROOM(STAND("mama", SPOT.garden, { mama_with: ["brush"] }), SIT("papa", "bench_r"), SIT("my", "corner"), { troll_here: false, ...WIDE }),
      run: async s => {
        const mama = P(s, "mama"), my = P(s, "my");
        if (s.get("brushes") !== "jar") {
          mama.reach({ r: "wall_a#apple" });
          mama.do("paint", { loop: true });
          await s.wait(2);
          s.set("clouds", true);
          mama.reach(null);
        } else {
          hold(s, "mama", ["cup"]);
          mama.look("wall_a#apple");
        }
        await moment(s, "e_stair:story", 6);
        mama.look("papa");
        cam(s, ON("mama", "close"));
        await moment(s, "e_stair:everywhere", 4);
        await to(my, [...at(-36, 3.0), 324]);
        my.reach({ r: "wall_a#keeper" });
        cam(s, ON("wall_a#keeper", 0.7));
        await moment(s, "e_stair:knot", 3);
        const papa = P(s, "papa");
        await rise(s, "papa", "bench_r");
        await walk(papa, SPOT.stair_step);
        papa.on(stairAt);
        papa.turn(STAIR.facing);
        papa.do("sit_step", { loop: true });
        await cam(s, ON("stair#stair", "full"), 2);
      },
    },
    e_step: {
      after: "e_stair",
      from: () => ROOM(STAND("papa", [...SPOT.stair_step.slice(0, 2), STAIR.facing], { papa_on: stairAt, papa_do: loop("sit_step") }),
        { troll_here: false, mama_here: false, my_here: false, ...ON("stair#stair", "full") }),
      run: async s => {
        await moment(s, "e_step:step", 4);
      },
    },
    // the common frames of the finales
    shot_wall: {
      from: () => ROOM({ papa_here: false, troll_here: false, my_here: false, ...ON("wall_a#garden", 2.2) }),
      run: async s => {
        await moment(s, "shot_wall:seen", 4);
      },
    },
    shot_table: {
      from: () => ROOM({ ...ON("table", "wide") }),
      run: async s => {
        await moment(s, "shot_table:seen", 3.5);
      },
    },
  };
  return F;
}
return { C, R, H, DEG, WIN, DOOR, DOOR_R, W0, W1, D0, D1, WALLS, at, wallX, DOOR_FACING, DOOR_SWING, arch, SEA, land, shore, STAIR,
  LANTERN, DADO, SEAT, SPOT, film,
  whitewash, knot, write, scribble, PAINTS, flower, moomin, myFigure, INK };
