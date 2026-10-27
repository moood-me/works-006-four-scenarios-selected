// The beach on the island's lee side, looking along it: the sea on the left, a flat strand of wet and dry sand along
// the water, the sand rising on the right to a low dune, and beyond the dune the granite knoll with the lighthouse.
// Made with the island's shapes (modules/island).
// Metres: across (right +), distance (ahead), the height over the viewer's sand.
// The waterline runs straight ahead at across WATER; the strand is level from it to STRAND metres inland (where the
// Groke sits: her frost lies flat on it), then the sand rises to the dune; under the sea it shelves down.
const { shoreOf } = kit.island;
const WATER = -3.2, STRAND = 4.6, RAW0 = 0.1;
function raw(a, d) {
  const x = a - WATER;
  const shelf = Math.min(x, 0) * 0.16 + Math.min(x + 3, 0) * 0.3;
  const rise = Math.min(Math.max(x - STRAND, 0) * 0.16, 2.2);
  const u = (a - 6.6) / 2.4, v = (d - 11) / 9;
  return RAW0 + Math.max(shelf, -2.6) + rise + 1.7 * Math.exp(-u * u - v * v) + knoll(a, d);
}
// the granite knoll the lighthouse stands on
function knoll(a, d) {
  const p = (a - 26) / 10, q = (d - 48) / 9;
  return 6.5 * Math.exp(-p * p - q * q);
}
const H0 = raw(0, 0);
const land = (a, d) => raw(a, d) - H0;
// the sea's level, and the strand's (where the Groke's frost lies)
const SEA = RAW0 - 0.1 - H0, FLAT = RAW0 - H0;
// where the Groke is (groke_at), [across, distance]: far off at the water's edge; nearer the lighthouse, up the strand;
// nearer still; waist-deep in the sea
const SEATS = {
  edge: [-2.4, 13],
  near: [-1.4, 11.8],
  closest: [0, 10.9],
  water: [-7, 14],
};
// where the son stands (troll_at), [across, distance]: far — near the viewer; near — three steps back from the stone;
// beside — by the Groke, at her left (worked out from her place: BESIDE off it)
const TROLL = { far: [2.6, 4.2], near: [0.2, 8.4] };
const BESIDE = [1.05, -0.4];
// the flat stone at the water's edge, where the lantern is set; the lighthouse's lantern up on the knoll
const STONE = [-1.2, 9.6], LIGHTHOUSE = [26, 48];
// which way one at [a, d] faces to look at [a2, d2] (a person's turn: 0 away from the viewer, 90 to the right)
const turnTo = (a, d, a2, d2) => (Math.atan2(a2 - a, d2 - d) * 180 / Math.PI + 360) % 360;
// where the land meets the sea (the island's painters ask it): fn(across, distance, h) where h is within [lo, hi]
const shore = shoreOf(land, SEA, -20, 40, -8, 70);
return { WATER, STRAND, SEA, FLAT, land, shore, knoll, SEATS, TROLL, BESIDE, STONE, LIGHTHOUSE, turnTo };
