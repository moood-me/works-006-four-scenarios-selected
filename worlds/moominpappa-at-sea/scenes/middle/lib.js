// The middle of the island: a hollow among granite backs, looking up toward the lighthouse on its knoll beyond the
// pines. A soft mossy clearing in the near left (the son's, with his ring of stones), the black pool in a granite basin
// on the right with a rock at its lip, the land rising beyond them through the pines to the knoll.
// Beyond, all round, the island falls away to the sea. Made with the island's shapes (modules/island).
// Metres: across (right +), distance (ahead), the height over the viewer's ground.
const { bump, shoreOf } = kit.island;
const SEA = -4.5;
function base(a, d) {
  const r = Math.hypot((a - 3) / 40, (d - 22) / 34);
  return 0.05 * d
    - 50 * Math.max(0, r - 0.82) ** 1.5
    + 1.3 * bump(a, d, -7.5, 9, 3, 4.5)
    + 1.1 * bump(a, d, 9.5, 10, 3, 3.5)
    + 0.6 * bump(a, d, 1.5, 2, 4, 2)
    - 0.25 * bump(a, d, -1, 6.5, 2.6, 2.2)
    + 3.5 * bump(a, d, 4, 44, 10, 9);
}
// the pool's basin: inside it the land is a level floor half a metre under the ground at its middle, coming up to the
// land round it over a steep rim (m — how much of the floor there is there: 1 inside, 0 outside)
const B0 = base(3.8, 9);
function raw(a, d) {
  const x = (a - 3.8) / 1.8, z = (d - 9) / 1.25, q = x * x + z * z, m = Math.exp(-q * q * q);
  return base(a, d) * (1 - m) + (B0 - 0.5) * m;
}
const H0 = raw(0, 0);
const land = (a, d) => raw(a, d) - H0;
// the pool: its middle, half-widths, and its water's level — over its basin's floor, under the ground round it
const POOL = { a: 3.8, d: 9, ra: 1.55, rd: 1.05, level: B0 - 0.25 - H0 };
// the son's ring of stones: its middle, its radius
const RING = { a: -1, d: 6.4, r: 0.85 };
// the rock at the pool's lip, where the rope is tied and coiled
const ROCK = { a: 5.7, d: 8.7 };
// the lighthouse, up on the knoll beyond the pines
const LIGHTHOUSE = { a: 4, d: 44 };
// the pines that close in toward the lighthouse (pines 0 → 1): each where it stands at 0, [across, distance]; at 1 it
// has crept SHIFT metres toward the lighthouse (pine<k>_a, pine<k>_d — the scene's script moves them)
const PINES = [[-4.2, 10.5], [-2.6, 12.8], [2.4, 13.6], [-0.4, 15.5], [5.8, 13.4], [-5.8, 14.5], [1.6, 18.5]];
const SHIFT = 3.5;
const pineAt = (k, u) => {
  const [a, d] = PINES[k], da = LIGHTHOUSE.a - a, dd = LIGHTHOUSE.d - d, l = Math.hypot(da, dd);
  return [a + da / l * SHIFT * u, d + dd / l * SHIFT * u];
};
// where the land meets the sea (the island's painters ask it)
const shore = shoreOf(land, SEA, -60, 66, -30, 80);
return { SEA, land, shore, POOL, RING, ROCK, LIGHTHOUSE, PINES, pineAt };
