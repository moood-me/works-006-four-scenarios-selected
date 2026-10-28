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
    door: { at: [-0.05, 11.75], turn: 10, look: 'bed#seat' },
    bed: { at: [SEAT[0], SEAT[1]], turn: 130, look: 'sophia', do: 'sit_stone', on: SEAT },
  },
  sophia: {
    path: { at: [-2.9, 5.5], turn: 25, look: 'sash#sash' },
    sash: { at: [-1.25, 8.25], turn: 345, look: 'sash#sash' },
    veranda: { at: [-0.85, 9.95], turn: 15 },
    door: { at: [0.55, 11.7], turn: 350 },
    bed: { at: [0.15, 13.85], turn: 250, look: 'grandma' },
    drawers: { at: [1.75, 15.2], turn: 90, look: 'chest#drawers' },
    table: { at: [0.35, 15.25], turn: 10, look: 'table#seal' },
  },
};

// the views (`view`): where the camera stands (x, z), how high the eye is over the sea level's datum (the start's rock
// is 0), which way it looks — as the camera's keys from the start (camera_h: the eye's height less 1.7 m over the land
// under it)
const V = (x, z, eye, yaw, look = 0) => ({ camera_x: x, camera_z: z, camera_h: eye - 1.7 - ground(x, z), camera_yaw: yaw, camera_look: look });
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
// The front, facing the room: white, a fine shadow line round it, two small wooden knobs.
function drawerFront(g) {
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
return { WATER, ground, coast, edge, sm, HOUSE, BED, CHEST, TABLE, LANTERN, SEAT, PLACES, VIEW, pulled, drawerFront, drawerSide, drawerIn };
