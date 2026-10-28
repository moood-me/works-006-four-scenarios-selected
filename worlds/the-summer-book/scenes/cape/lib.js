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

// the seats: a low stone halfway down the path, and one behind the tent by its far corner (its back stands at the
// water's edge) — the `seat` element's copies
const SEATS = { half: [-1.6, 9.6], back: onTent(-1.05, 1.6) };
const SEAT_TOP = 0.32; // (0.42 high, sunk 0.1 into the rock)
const seat = k => [SEATS[k][0], SEATS[k][1], SEAT_TOP];

// the people's places (`<id>_at` names one): where each stands, facing, what they look at and reach for there, and —
// sitting — what they do and what they sit on (`do`, `on`: the script's). Grandmother and Sophia as approved first.
const PLACES = {
  grandma: {
    stand: { at: [-0.4, 4.4], turn: 160, look: [6, 1, 0], do: 'hands_behind' },
    pole: { at: onTent(-0.62, -0.1), turn: tentTurn(110), look: 'sophia', reach: { r: 'pole#grip', l: 'pole#grip' } },
    stone1: { at: [-3.4, 10.6], turn: 160, look: 'tent' },
    stone2: { at: [-1.1, 8.9], turn: 150, look: 'tent' },
    stone3: { at: [-0.1, 6.2], turn: 120, look: 'tent' },
    half: { at: SEATS.half, turn: 140, look: 'tent', do: 'sit_stone', on: seat('half') },
    door: { at: onTent(-0.5, -0.5), turn: tentTurn(45), look: 'tent_front#door' },
    behind: { at: SEATS.back, turn: tentTurn(59), look: 'tent_back#palm', reach: { r: 'tent_back#palm' }, do: 'sit_stone', on: seat('back') },
  },
  sophia: {
    tent: { at: [1.4, 5.6], turn: 200, look: 'grandma' },
    tie: { at: onTent(0.75, -0.7), turn: tentTurn(200), look: 'peg#peg' },
    door: { at: onTent(0.05, -0.2), turn: tentTurn(180), look: [-6, 2, 4] },
    inside: { at: onTent(0, 0.8), turn: tentTurn(180), do: 'hug_knees' },
    path: { at: [0.6, 5.4], turn: 210, look: 'grandma' },
  },
  papa: {
    by: { at: onTent(-1.6, -0.9), turn: tentTurn(150), look: 'tent' },
    peg: { at: onTent(-0.6, -0.95), turn: tentTurn(90), look: 'peg#peg' },
    path: { at: [-3.4, 10.6], turn: 160, look: 'tent' },
  },
};
// the cat's places (cat_at): where he is and which way he faces (1 right, −1 left)
const CAT = {
  tent: { at: onTent(0.75, -0.25), dir: -1 },
  door: { at: onTent(-0.3, -0.3), dir: 1 },
  rock: { at: [0.6, 3.6], dir: 1 },
};

// the camera from the land (the scene's own: as it starts) and from the sea (`from: sea` — out on the water to the
// right, looking back at the cape: the tent's back, the crevice and its ledge), from the side (`from: side` — up the
// path on the left, looking across the tent to the sea: whoever sits behind it)
const VIEWS = {
  land: { camera_x: 0, camera_z: 0, camera_h: 0, camera_yaw: 0, camera_pitch: 0 },
  sea: { camera_x: 13, camera_z: 4.5, camera_h: -0.9, camera_yaw: -62, camera_pitch: 0 },
  side: { camera_x: -0.5, camera_z: 5.5, camera_h: -0.5, camera_yaw: 52, camera_pitch: 0 },
};
return { WATER, coast, ground, shore, sm, edge, glow, tentSlope, tentShown, TENT, onTent, tentTurn, SEATS, SEAT_TOP, PLACES, CAT, VIEWS };
