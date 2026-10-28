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

// the people's places (`<id>_at` names one): where each stands, facing, what they look at and reach for there, and —
// sitting — what they do and what they sit on (`do`, `on`: the script's). Grandmother and Sophia first in the clearing.
const PLACES = {
  grandma: {
    clearing: { at: [-0.9, 3.5], turn: 160, look: 'stump' },
    stump: { at: STUMP, turn: 175, look: 'sophia', do: 'sit_stone', on: [STUMP[0], STUMP[1], STUMP_TOP] },
    trunk: { at: [-0.95, 4.85], turn: 265, look: 'trunk#branch', reach: { r: 'trunk#palm' } },
    moss: { at: [0.1, 5.4], turn: 185, look: [0, 30, -2], do: 'sit_ground' },
    path1: { at: [-1.0, 7.5], turn: 200, look: 'path#stone2' },
    path2: { at: [-1.8, 10.0], turn: 200, look: 'path#stone3' },
    path3: { at: [-2.8, 12.8], turn: 190 },
  },
  sophia: {
    clearing: { at: [0.3, 2.9], turn: 200, look: 'grandma' },
    moss: { at: [1.25, 3.25], turn: 210, look: 'moss#beetle' },
    stump: { at: [1.3, 4.3], turn: 215, look: 'grandma' },
    crevice: { at: [2.1, 5.3], turn: 140, look: 'crevice#pack' },
    path1: { at: [-0.6, 7.2], turn: 200, look: 'grandma' },
  },
};
return { WATER, ground, sm, edge, STUMP, STUMP_TOP, TRUNK, PLACES };
