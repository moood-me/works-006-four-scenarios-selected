// The Furlongs' kitchen — what its paintings share: a steady random stream, painted boards (the wainscot, the
// ceiling), the room's two wall tones, a blue-and-white plate. Everything is painted in the day's colours; the
// evening is the scene's light (the lamp over the table, the range's fire, the night at the window).

// a steady random 0…1 stream from a seed (the same every painting)
function stream(seed) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// the walls' colours: the distempered wall above the dado rail, the painted tongue-and-groove below it
const WALL = "#e2d5b6";
const PANEL = "#8e9f88";
const PANEL_LINE = "#7a8a74";
const RAIL = "#6f6352";

// boards standing side by side over the rect x, y, w, h (y down): the rect's colour with a groove every `width`
// metres, each board a touch lighter or darker
function boards(g, seed, x, y, w, h, base, groove, width) {
  const r = stream(seed);
  g.fillStyle = base;
  g.fillRect(x, y, w, h);
  for (let bx = x; bx < x + w; bx += width) {
    const k = r();
    g.fillStyle = k < 0.33 ? "rgba(255, 255, 255, 0.06)" : k < 0.66 ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0)";
    g.fillRect(bx, y, Math.min(width, x + w - bx), h);
    g.fillStyle = groove;
    g.fillRect(bx, y, 0.012, h);
  }
}

// a wall of the room over x0…x1, from the floor (0) to `top` (negative, y up): the panelling to the dado, the rail,
// the distemper above, a skirting at the foot
function wall(g, seed, x0, x1, top) {
  const w = x1 - x0;
  g.fillStyle = WALL;
  g.fillRect(x0, top, w, -top + 0.02);
  boards(g, seed, x0, -1.05, w, 1.07, PANEL, PANEL_LINE, 0.1);
  g.fillStyle = RAIL;
  g.fillRect(x0, -1.1, w, 0.06);
  g.fillStyle = "#5b5144";
  g.fillRect(x0, -0.14, w, 0.16);
  // the distemper a little greyer toward the ceiling, from the range's smoke over the years
  const smoke = g.createLinearGradient(0, top, 0, -1.1);
  smoke.addColorStop(0, "rgba(120, 104, 80, 0.22)");
  smoke.addColorStop(1, "rgba(120, 104, 80, 0)");
  g.fillStyle = smoke;
  g.fillRect(x0, top, w, -1.1 - top);
}

// a blue-and-white plate standing on its edge, seen face on, centred at cx, cy, radius r
function plate(g, cx, cy, r) {
  g.fillStyle = "#eef0ee";
  g.beginPath();
  g.arc(cx, cy, r, 0, 6.3);
  g.fill();
  g.strokeStyle = "#3f5f93";
  g.lineWidth = r * 0.12;
  g.beginPath();
  g.arc(cx, cy, r * 0.82, 0, 6.3);
  g.stroke();
  g.fillStyle = "#5f7fb0";
  g.beginPath();
  g.arc(cx, cy, r * 0.38, 0, 6.3);
  g.fill();
}

return { stream, WALL, PANEL, PANEL_LINE, RAIL, boards, wall, plate };
