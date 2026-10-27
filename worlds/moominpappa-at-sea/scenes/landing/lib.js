// The landing rocks' land, shared by the relief, the granite's painting and the sea's (its wet rim, its foam): smooth
// granite whalebacks — the viewer's rock, the slab the family stands on, the long back up to the lighthouse's knoll —
// a cove on the left where the boat lies, rocks beyond it, a low reef far right; under the sea everywhere else. Made of
// the island's shapes (modules/island). Metres: across (right +), distance (ahead), the height over the viewer's rock.
const { ridge, bump, shoreOf } = kit.island;
const SEA = -1.3;
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
// where the land meets the sea (the island's painters ask it): fn(across, distance, h) where h is within [lo, hi]
const shore = shoreOf(land, SEA, -26, 32, -8, 47);
return { SEA, land, shore };
