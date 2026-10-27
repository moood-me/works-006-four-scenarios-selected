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
return { C, R, H, DEG, WIN, DOOR, DOOR_R, W0, W1, D0, D1, WALLS, at, wallX, DOOR_FACING, DOOR_SWING, arch, SEA, land, shore, STAIR,
  LANTERN, DADO,
  whitewash, knot, write, scribble, PAINTS, flower, moomin, myFigure, INK };
