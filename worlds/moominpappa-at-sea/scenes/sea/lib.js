// The open sea (С2) — what the elements and the script share. Metres. The boat «Adventure» lies at the world's start,
// her bow toward the start's back (her anchor `boat` faces 180: in her own frame across, distance and up are the
// world's), her stern toward the view: the camera rides her from before the bow, looking aft over everyone at what
// follows behind (scene.json `camera`). The sea's floor lies deep everywhere (`land`): no shore, the island module's
// sea paints only its open water (SEA its height).
const SEA = 0, FLOOR = -1.2;
const land = () => FLOOR;
const shore = () => {};
// the boat, in her frame (distance toward the stern): her length from the stem to the transom, her seats
const BOW = -2.2, STERN = 2.2;
const SEATS = {
  papa: [0.32, 1.45, 0.38], // on the stern thwart by the tiller
  mama: [-0.24, -0.3, 0.38], // on the middle thwart, asleep under the blanket
  troll: [-0.3, 1.95, 0.46], // on the stern deck, at the very back
  my: [0, -1.2, 2.24], // up the mast, on its crosstree
};
// her hull: ribs from the bow to the stern — [distance, half-beam, the rail's height, the keel's]
const RIBS = [[-2.2, 0.04, 0.8, 0.3], [-1.6, 0.5, 0.67, -0.2], [-0.8, 0.75, 0.59, -0.29], [0, 0.8, 0.56, -0.32],
  [0.9, 0.76, 0.58, -0.3], [1.6, 0.66, 0.61, -0.24], [2.2, 0.53, 0.65, -0.12]];
// one rib's points from the port rail down round the keel up to the starboard rail ([x, y, z] in the hull's form: x
// across, y up, z toward its front — the bow)
function rib([d, w, rail, keel]) {
  const H = rail - keel, k = [[1, 0], [0.97, 0.25], [0.85, 0.55], [0.55, 0.85], [0, 1]];
  const side = k.map(([x, y]) => [-w * x, rail - H * y, -d]);
  return [...side, ...side.slice(0, -1).reverse().map(([x, y, z]) => [-x, y, z])];
}
// where what follows behind is, by `trail` (0 — far astern … 1 — at the stern): the near end of the white strip of rime
// on the water, and the Groke swimming in it
const trailNear = t => STERN + 2 + (1 - t) * 50;
const GROKE_ACROSS = 0.7;
// where the island is, by `island`: far out of sight ahead in the night (none), ahead of the bow at dawn (ahead —
// behind the camera), astern by day as they sail home (behind — seen over the stern)
const ISLAND_AT = { none: -6000, ahead: -260, behind: 230 };
return { SEA, FLOOR, land, shore, BOW, STERN, SEATS, RIBS, rib, trailNear, GROKE_ACROSS, ISLAND_AT };
