// The beach on the island's lee side, the viewer on the strand close to the water's edge where the Groke comes: the
// sea on the left, a flat strand of wet and dry sand along the water, the sand rising on the right to a low dune, and
// off to the right beyond the dune the granite knoll with the lighthouse (out of the picture: the Groke, facing it,
// is seen side-on).
// Made with the island's shapes (modules/island).
// Metres: across (right +), distance (ahead), the height over the viewer's sand.
// The waterline runs straight ahead at across WATER; the strand is level from it to STRAND metres inland (where the
// Groke sits: her frost lies flat on it), then the sand rises to the dune; under the sea it shelves down.
const { shoreOf } = kit.island;
const WATER = -3.4, STRAND = 4.6, RAW0 = 0.1;
function raw(a, d) {
  const x = a - WATER;
  const shelf = Math.min(x, 0) * 0.3 + Math.min(x + 3, 0) * 0.3;
  const rise = Math.min(Math.max(x - STRAND, 0) * 0.16, 2.2);
  const u = (a - 5.6) / 2.2, v = (d - 7.5) / 6;
  return RAW0 + Math.max(shelf, -2.6) + rise + 1.7 * Math.exp(-u * u - v * v) + knoll(a, d);
}
// the granite knoll the lighthouse stands on
function knoll(a, d) {
  const p = (a - 34) / 10, q = (d - 5) / 9;
  return 6.5 * Math.exp(-p * p - q * q);
}
const H0 = raw(0, 0);
const land = (a, d) => raw(a, d) - H0;
// the sea's level, and the strand's (where the Groke's frost lies)
const SEA = RAW0 - 0.1 - H0, FLAT = RAW0 - H0;
// where the Groke is (groke_at), [across, distance]: far off at the water's edge; nearer the lighthouse, up the strand;
// nearer still; waist-deep in the sea
const SEATS = {
  edge: [-2.9, 6.8],
  near: [-2.3, 6.4],
  closest: [-1.7, 6.1],
  water: [-5.6, 8.6],
};
// where the son stands (troll_at), [across, distance]: far — off to the right, up the sand; near — three steps back from
// the stone; beside — by the Groke on the viewer's side of her (worked out from her place: BESIDE off it)
const TROLL = { far: [2.8, 3.9], near: [0.7, 4.1] };
const BESIDE = [-0.3, -0.95];
// the flat stone at the water's edge, where the lantern is set; the lighthouse's lantern up on the knoll
const STONE = [-0.5, 4.9], LIGHTHOUSE = [34, 5];
// which way one at [a, d] faces to look at [a2, d2] (a person's turn: 0 away from the viewer, 90 to the right)
const turnTo = (a, d, a2, d2) => (Math.atan2(a2 - a, d2 - d) * 180 / Math.PI + 360) % 360;
// where the land meets the sea (the island's painters ask it): fn(across, distance, h) where h is within [lo, hi]
const shore = shoreOf(land, SEA, -20, 40, -8, 70);
return { WATER, STRAND, SEA, FLAT, land, shore, knoll, SEATS, TROLL, BESIDE, STONE, LIGHTHOUSE, turnTo };
