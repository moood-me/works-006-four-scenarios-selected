// The middle of the island: the viewer on a granite shoulder looking down into a hollow among granite backs and up
// toward the lighthouse on its knoll beyond the pines. Close below, a soft mossy clearing on the left (the son's,
// with his ring of stones) and the black pool in its granite basin on the right with a rock at its lip; the land
// rising beyond them through the pines to the knoll.
// Beyond, all round, the island falls away to the sea. Made with the island's shapes (modules/island).
// Metres: across (right +), distance (ahead), the height over the viewer's ground.
const { bump, shoreOf } = kit.island;
const SEA = -4.5;
function base(a, d) {
  const r = Math.hypot((a - 3) / 40, (d - 22) / 34);
  return 0.05 * d
    - 50 * Math.max(0, r - 0.82) ** 1.5
    + 1.3 * bump(a, d, -5.8, 6.5, 2.6, 3.2)
    + 1.1 * bump(a, d, 7.2, 7, 2.6, 3)
    + 0.5 * bump(a, d, 0, -0.5, 5, 2.4)
    - 0.2 * bump(a, d, -1.8, 5.2, 2.4, 2)
    + 3.5 * bump(a, d, 2, 44, 10, 9);
}
// the pool's basin: inside it the land is a level floor half a metre under the ground at its middle, coming up to the
// land round it over a steep rim (m — how much of the floor there is there: 1 inside, 0 outside)
const B0 = base(1.7, 6.2);
function raw(a, d) {
  const x = (a - 1.7) / 1.8, z = (d - 6.2) / 1.25, q = x * x + z * z, m = Math.exp(-q * q * q);
  return base(a, d) * (1 - m) + (B0 - 0.5) * m;
}
const H0 = raw(0, 0);
const land = (a, d) => raw(a, d) - H0;
// the pool: its middle, half-widths, and its water's level — over its basin's floor, under the ground round it
const POOL = { a: 1.7, d: 6.2, ra: 1.55, rd: 1.05, level: B0 - 0.25 - H0 };
// the son's ring of stones: its middle, its radius
const RING = { a: -1.8, d: 5.2, r: 0.85 };
// the rock at the pool's lip, where the rope is tied and coiled; where the rope goes into the water
const ROCK = { a: 3.8, d: 6.1 }, ROPE = { a: POOL.a + 0.8, d: POOL.d - 0.5 };
// the lighthouse, up on the knoll beyond the pines
const LIGHTHOUSE = { a: 2, d: 44 };
// the pines that close in toward the lighthouse (pines 0 → 1): each where it stands at 0, [across, distance]; at 1 it
// has crept SHIFT metres toward the lighthouse (pine<k>_a, pine<k>_d — the scene's script moves them)
const PINES = [[-3.6, 7.6], [-2, 9.4], [5.4, 9.6], [0.8, 10.8], [-5.4, 10.4], [3.4, 12.6], [-1.2, 14]];
const SHIFT = 3.5;
const pineAt = (k, u) => {
  const [a, d] = PINES[k], da = LIGHTHOUSE.a - a, dd = LIGHTHOUSE.d - d, l = Math.hypot(da, dd);
  return [a + da / l * SHIFT * u, d + dd / l * SHIFT * u];
};
// where the land meets the sea (the island's painters ask it)
const shore = shoreOf(land, SEA, -60, 66, -30, 80);
return { SEA, land, shore, POOL, RING, ROCK, ROPE, LIGHTHOUSE, PINES, pineAt };
