// What the potter's room shares: its walls' plaster (warm limewash gone a little smoky, a band of ochre along the foot),
// the people's named places (places.md) and the Fisherman's way from the bench to the shelf (М5, `carry`).
//   wall(g, seed, left, right, top) — in metres, its foot at y 0, `top` negative (the ceiling's height)
const PLASTER = '#d9cbb2';
const BAND = '#9a7a52';
function wall(g, seed, left, right, top) {
  g.save();
  g.beginPath();
  g.rect(left, top, right - left, -top + 0.02);
  g.clip();
  g.fillStyle = PLASTER;
  g.fillRect(left, top, right - left, -top + 0.02);
  for (let i = 0; i < 22; i++) {
    const x = left + (right - left) * anim.hash(i, seed);
    const y = top + -top * anim.hash(i, seed + 1);
    const w = 0.2 + 0.4 * anim.hash(i, seed + 2);
    g.fillStyle = anim.hash(i, seed + 3) > 0.5 ? 'rgba(180, 160, 130, 0.16)' : 'rgba(236, 226, 206, 0.2)';
    g.beginPath();
    g.ellipse(x, y, w, w * 0.6, 0, 0, Math.PI * 2);
    g.fill();
  }
  // smoke-darkened under the ceiling
  const smoke = g.createLinearGradient(0, top, 0, top + 0.6);
  smoke.addColorStop(0, 'rgba(90, 70, 50, 0.35)');
  smoke.addColorStop(1, 'rgba(90, 70, 50, 0)');
  g.fillStyle = smoke;
  g.fillRect(left, top, right - left, 0.6);
  g.fillStyle = BAND;
  g.fillRect(left, -0.3, right - left, 0.32);
  g.restore();
}
// the places: on the bench by the hearth (sat), before it (stand), lying on it asleep (lie: the seat), at the shelf, at
// the door, by the hearth, by the bed, kneeling by the daughter's pallet; the daughter on her pallet, behind her father
// (the seat point 0.2 m behind the seat's middle: the cast's `seated` puts the hips that far before it)
const SEAT = [-0.5, 4.37, 0.45];
const PLACES = {
  fisherman: {
    bench: { at: [-0.5, 4.17], turn: 180, on: SEAT },
    stand: { at: [-0.5, 3.45], turn: 160 },
    shelf: { at: [0.6, 4.45], turn: 0 },
    door: { at: [2.15, 1.65], turn: 90 },
  },
  potter: {
    shelf: { at: [1.05, 4.35], turn: 230 },
    hearth: { at: [-1.4, 4.3], turn: 200 },
    bed: { at: [2.1, 3.0], turn: 200 },
    door: { at: [2.05, 1.65], turn: 270 },
    by_daughter: { at: [-1.5, 3.4], turn: 270 },
  },
  daughter: {
    pallet: { at: [-2.1, 3.6], turn: 180 },
    behind: { at: [1.35, 4.65], turn: 210 },
    door: { at: [2.1, 2.3], turn: 250 },
  },
  soul: {
    door: { at: [2.15, 1.65], turn: 270 },
    shelf: { at: [0.6, 4.45], turn: 0 },
    over_girl: { at: [-1.5, 3.0], turn: 250 },
  },
};
// the way the cup is carried (М5): from before the bench to the shelf (to its right, behind it), `carry` 0 → 1
const CARRY = [[-0.5, 3.45], [0.6, 4.45]];
return { wall, PLASTER, BAND, PLACES, CARRY, SEAT };
