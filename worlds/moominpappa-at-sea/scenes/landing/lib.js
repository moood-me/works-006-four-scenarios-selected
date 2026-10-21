// The island's land, shared by the relief, the granite's painting and the sea's (its wet rim, its foam): smooth
// granite whalebacks — the viewer's rock, the slab the family stands on, the long back up to the lighthouse's knoll —
// a cove on the left where the boat lies, rocks beyond it, a low reef far right; under the sea everywhere else.
// Metres: across (right +), distance (ahead), the height over the viewer's rock.
const SEA = -1.3;
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
  return -2.2
    + ridge(a, d, -1, -4, 10, 33, 2.8, 4, 10.5)
    + 0.6 * bump(a, d, 0.5, 5.5, 3.5, 2)
    + 1.6 * bump(a, d, 10, 33, 4.5, 4)
    + 2.3 * bump(a, d, -15, 19, 6, 3)
    + 1.4 * bump(a, d, 22, 37, 7, 3)
    - 2.6 * bump(a, d, -8.5, 10, 3.6, 4.5);
}
const H0 = raw(0, 0);
function land(a, d) {
  return raw(a, d) - H0;
}
// where the land meets the sea: calls fn(across, distance, h) on a grid over the island where the land's height is
// within [lo, hi] of the sea's
function shore(lo, hi, step, fn) {
  for (let a = -26; a <= 32; a += step) {
    for (let d = -8; d <= 47; d += step) {
      const h = land(a, d) - SEA;
      if (h >= lo && h <= hi) fn(a, d, h);
    }
  }
}
// the lighthouse's profile, [radius, height] from the top down (metres): the cap, the lantern's glass, the gallery,
// the tapering tower, the plinth; its length, and how far along it a height on it is (the painting's rows)
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
// the painting's width: the way round at the tower's middle
const TOWER_ROUND = 2 * Math.PI * 1.6;
return { SEA, land, shore, TOWER, TOWER_ROUND };
