// The Mother Superior's parlour — what its paintings share: a steady random stream, the room's walls (varnished
// pine panelling to the dado, a pale distemper above, a picture rail, a cornice), boards, a gilt frame, a soft blob
// for the mist outside. Everything is painted in the day's colours; the early morning is the scene's light (the fire,
// the lamp on the tea table, the dark at the window).

// a steady random 0…1 stream from a seed (the same every painting)
function stream(seed) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// the room's colours: a pale stone-green distemper above, varnished pine below, dark rails
const WALL = "#dcdac6";
const WALL_HIGH = "#e4e2d2";
const PANEL = "#8a6444";
const PANEL_LINE = "#6e4e34";
const RAIL = "#4c3524";
const SKIRT = "#3d2a1d";
const MAHOGANY = "#5a3122";
const BRASS = "#c09a4c";

// boards standing side by side over the rect x, y, w, h (y down): the base colour with a groove every `width` metres,
// each board a touch lighter or darker
function boards(g, seed, x, y, w, h, base, groove, width) {
  const r = stream(seed);
  g.fillStyle = base;
  g.fillRect(x, y, w, h);
  for (let bx = x; bx < x + w; bx += width) {
    const k = r();
    g.fillStyle = k < 0.33 ? "rgba(255, 240, 210, 0.07)" : k < 0.66 ? "rgba(40, 20, 10, 0.07)" : "rgba(0, 0, 0, 0)";
    g.fillRect(bx, y, Math.min(width, x + w - bx), h);
    g.fillStyle = groove;
    g.fillRect(bx, y, 0.01, h);
  }
}

// a wall of the room over x0…x1, from the floor (0) up to `top` (negative, y up): the distemper, a lighter band over
// the picture rail and the cornice under the ceiling; the panelling to the dado rail, the skirting at its foot
function wall(g, seed, x0, x1, top) {
  const w = x1 - x0;
  g.fillStyle = WALL;
  g.fillRect(x0, top, w, -top + 0.02);
  g.fillStyle = WALL_HIGH;
  g.fillRect(x0, top, w, -2.75 - top);
  g.fillStyle = RAIL;
  g.fillRect(x0, -2.78, w, 0.035);
  g.fillStyle = "#efecdf";
  g.fillRect(x0, top, w, 0.12);
  g.fillStyle = "#c9c5b2";
  g.fillRect(x0, top + 0.12, w, 0.025);
  boards(g, seed, x0, -1.0, w, 1.02, PANEL, PANEL_LINE, 0.11);
  g.fillStyle = RAIL;
  g.fillRect(x0, -1.05, w, 0.06);
  g.fillStyle = SKIRT;
  g.fillRect(x0, -0.16, w, 0.18);
}

// a gilt frame round the rect x, y, w, h (its inside), `b` wide
function frame(g, x, y, w, h, b) {
  g.fillStyle = "#a8873f";
  g.fillRect(x - b, y - b, w + 2 * b, h + 2 * b);
  g.fillStyle = "#d1b46a";
  g.fillRect(x - b * 0.6, y - b * 0.6, w + 1.2 * b, h + 1.2 * b);
  g.fillStyle = "#8a6c30";
  g.fillRect(x - b * 0.2, y - b * 0.2, w + 0.4 * b, h + 0.4 * b);
}

// a soft white blob of mist centred at x, y, its half-sizes rx, ry, as dense as `a` in its middle — squashed whole with
// its gradient, so it has no edge
function blob(g, x, y, rx, ry, a) {
  g.save();
  g.translate(x, y);
  g.scale(rx, ry);
  const m = g.createRadialGradient(0, 0, 0, 0, 0, 1);
  m.addColorStop(0, `rgba(226, 232, 238, ${a})`);
  m.addColorStop(0.55, `rgba(226, 232, 238, ${a * 0.45})`);
  m.addColorStop(1, "rgba(226, 232, 238, 0)");
  g.fillStyle = m;
  g.beginPath();
  g.arc(0, 0, 1, 0, 6.3);
  g.fill();
  g.restore();
}

return { stream, WALL, WALL_HIGH, PANEL, PANEL_LINE, RAIL, SKIRT, MAHOGANY, BRASS, boards, wall, frame, blob };
