// The Fisherman's cape and the island behind it, shared by the relief, the granite's painting and the sea's (its
// shallows, the foam at the waterline): the viewer's rock and the low tongue of the cape running out to the left, his
// stone shelter on it, a cove of water ahead, the long back of the island on the right rising to the lighthouse's
// knoll, a hundred steps off. Metres: across (right +), distance (ahead), the height over the viewer's rock.
const SEA = -1.6;
function bump(a, d, ca, cd, ra, rd) {
  const x = (a - ca) / ra, z = (d - cd) / rd;
  return Math.exp(-(x * x + z * z));
}
// a granite back along a segment: h0 at its start, h1 at its end, its half-width w
function ridge(a, d, a0, d0, a1, d1, h0, h1, w) {
  const ux = a1 - a0, uz = d1 - d0, t = Math.max(0, Math.min(1, ((a - a0) * ux + (d - d0) * uz) / (ux * ux + uz * uz)));
  const px = a - (a0 + ux * t), pz = d - (d0 + uz * t);
  return (h0 + (h1 - h0) * t) * Math.exp(-(px * px + pz * pz) / (w * w));
}
function raw(a, d) {
  return -2.6
    + ridge(a, d, 3, -6, -22, 36, 3.1, 1.6, 8.5)
    + ridge(a, d, 14, -10, 34, 64, 3.0, 3.6, 13)
    + 2.6 * bump(a, d, 34, 64, 8, 7)
    + 1.1 * bump(a, d, -3.6, 8.6, 2.0, 1.6)
    - 1.6 * bump(a, d, 8, 24, 5, 10);
}
const H0 = raw(0, 0);
function land(a, d) {
  return raw(a, d) - H0;
}
// where the land meets the sea: calls fn(across, distance, h) on a grid over the land where its height is within
// [lo, hi] of the sea's
function shore(lo, hi, step, fn) {
  for (let a = -34; a <= 56; a += step) {
    for (let d = -10; d <= 80; d += step) {
      const h = land(a, d) - SEA;
      if (h >= lo && h <= hi) fn(a, d, h);
    }
  }
}
// the lighthouse (as on the landing rocks): its profile, [radius, height] from the top down (metres) — the cap, the
// lantern's glass, the gallery, the tapering tower, the plinth; its length, and how far along it a height is
const PROFILE = [[0, 14.3], [0.4, 14.2], [0.8, 13.85], [0.98, 13.4], [1.02, 13.3], [1.02, 11.95], [1.55, 11.9], [1.55, 11.2],
  [1.3, 11.15], [1.28, 11.05], [1.92, 0.45], [2.2, 0.42], [2.2, 0]];
const LENGTHS = [0];
for (let i = 1; i < PROFILE.length; i++) {
  LENGTHS.push(LENGTHS[i - 1] + Math.hypot(PROFILE[i][0] - PROFILE[i - 1][0], PROFILE[i][1] - PROFILE[i - 1][1]));
}
const TOWER = {
  profile: PROFILE,
  len: LENGTHS[LENGTHS.length - 1],
  at(h) {
    for (let i = 1; i < PROFILE.length; i++) {
      const h0 = PROFILE[i - 1][1], h1 = PROFILE[i][1];
      if (h <= h0 && h >= h1) return LENGTHS[i - 1] + (LENGTHS[i] - LENGTHS[i - 1]) * (h0 - h) / (h0 - h1 || 1);
    }
    return h > PROFILE[0][1] ? 0 : LENGTHS[LENGTHS.length - 1];
  },
};
const TOWER_ROUND = 2 * Math.PI * 1.6;
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
return { SEA, land, shore, TOWER, TOWER_ROUND, net };
