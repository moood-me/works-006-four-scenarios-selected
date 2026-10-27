// The Fisherman's cape and the island behind it, shared by the relief, the granite's painting and the sea's (its
// shallows, the foam at the waterline): the viewer's rock and the low tongue of the cape running out to the left, his
// stone shelter on it, a cove of water ahead, the long back of the island on the right rising to the lighthouse's
// knoll, some sixty metres off. Made of the island's shapes (modules/island). Metres: across (right +), distance (ahead), the height over the viewer's rock.
const { ridge, bump, shoreOf } = kit.island;
const SEA = -1.6;
function raw(a, d) {
  return -2.6
    + ridge(a, d, 3, -6, -22, 34, 3.1, 1.6, 8.5)
    + ridge(a, d, 14, -10, 28, 54, 3.0, 3.6, 12)
    + 2.6 * bump(a, d, 28, 54, 7, 6)
    + 0.8 * bump(a, d, -3.4, 6.6, 1.8, 1.5)
    - 1.6 * bump(a, d, 6, 20, 4.5, 8);
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
  },
  mama: {
    steps: { at: [27.2, 51.1], on: [27.2, 51.1, 0.35], turn: 200, do: 'seated', look: [0, 5, 1] },
    beside: { at: [1.95, 4.6], turn: 225, do: 'sit_look', look: 'papa' },
    apart: { at: [3.7, 3.3], turn: 120, do: 'sit_look', look: [30, 20, 1] },
  },
  my: {
    rock: { at: [-3.0, 6.4], turn: 200, do: 'sit_look', look: [-20, -5, 1] },
  },
  troll: {
    near: { at: [2.7, 5.2], turn: 225, do: 'sit_look', look: 'fisher' },
  },
};
return { SEA, land, shore, net, PLACES };
