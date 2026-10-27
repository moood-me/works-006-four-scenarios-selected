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
// a bundle of blankets seen from the side, its foot at (x, 0): a soft round heap w wide and h tall, an ochre woollen
// blanket with grey-blue checks, a rope round it; wet — darker, dripping
function bundle(g, x, w, h, wet) {
  g.save();
  g.beginPath();
  g.ellipse(x, -h * 0.48, w / 2, h * 0.52, 0, 0, Math.PI * 2);
  g.clip();
  g.fillStyle = wet ? "#8f7a55" : "#c9a065";
  g.fillRect(x - w / 2, -h, w, h);
  g.strokeStyle = wet ? "rgba(60, 74, 90, 0.75)" : "rgba(92, 112, 132, 0.7)";
  g.lineWidth = 0.03;
  for (let k = -w / 2; k < w / 2; k += 0.11) {
    g.beginPath();
    g.moveTo(x + k, -h);
    g.lineTo(x + k + 0.04, 0);
    g.stroke();
  }
  for (let y = -h + 0.06; y < 0; y += 0.1) {
    g.beginPath();
    g.moveTo(x - w / 2, y);
    g.lineTo(x + w / 2, y);
    g.stroke();
  }
  g.fillStyle = "#a2895f";
  g.fillRect(x - w / 2, -h * 0.45, w, 0.04);
  g.restore();
  if (wet) {
    g.fillStyle = "rgba(90, 104, 116, 0.5)";
    g.beginPath();
    g.ellipse(x, 0.01, w * 0.55, 0.05, 0, 0, Math.PI * 2);
    g.fill();
  }
}
// Where the game's keys put things (the scene's script sets them; the elements stand by the keys it sets):
// the three pines that creep up to the door overnight — [across, distance] where they stand at `pines` 0 and at 1;
const PINES = [[2.6, 23.0, 8.8, 29.9], [15.8, 25.5, 11.4, 30.0], [4.2, 31.5, 12.1, 31.3]];
// the boat moored (her bow on the rocks of the cove, her stern afloat) and pulled up the rocks: [across, distance, turn]
const BOAT = { moored: [-3.9, 8.6, 195], up: [-3.2, 6.6, 200] };
// the door's swing: shut facing the landing, open outward toward it by `door`
const DOOR_OPEN = 70;
// the people's places (`<id>_at`): where each stands or sits, turned how, doing what, looking at what
const stand = { motion: 'stand', loop: true };
const PLACES = {
  papa: {
    slab: { at: [0.45, 3.4], turn: 215, do: 'hands_behind', look: [-3, -2, 1.6] },
    edge: { at: [-3.25, 12.9], turn: 255, do: 'hands_behind', look: [-30, 20, 1.2] },
    door: { at: [10, 30.9], turn: 0, do: stand, look: 'lighthouse#door', reach: { r: 'door#door' } },
    boat: { at: [-1.7, 6.3], turn: 250, do: stand, look: 'boat#boat' },
    cleft: { at: [-0.2, 11.4], turn: 250, do: stand, look: 'cleft#cleft' },
    water: { at: [-4.1, 7.6], turn: 255, do: 'hands_behind', look: [-20, 8, 0.5] },
    stone: { at: [7.0, 27.7], turn: 40, do: stand, look: 'arrow_stone#stone' },
  },
  mama: {
    slab: { at: [-1.3, 3.35], on: [-1.3, 3.4, 0.4], turn: 150, do: 'seated', look: [3, 1, 1.3] },
    steps: { at: [9.6, 30.2], on: [9.6, 30.25, 0.34], turn: 190, do: 'seated', look: [0, 5, 1] },
    cleft: { at: [-2.1, 11.0], turn: 110, do: stand, look: 'cleft#cleft' },
    stand: { at: [-0.7, 4.3], turn: 170, do: stand, look: [0, 0, 1.2] },
  },
  troll: {
    boulder: { at: [-2.65, 4.4], on: [-2.65, 4.4, 0.5], turn: 240, do: 'seated', look: [-6, 0, 0.8] },
    boat: { at: [-4.4, 8.0], turn: 120, do: stand, look: 'boat#boat' },
  },
  my: {
    stone: { at: [7.15, 28.0], turn: 200, do: 'sit_look', look: 'arrow_stone#stone' },
    rock: { at: [4.6, 11.5], turn: 210, do: 'sit_look', look: [0, 0, 1] },
  },
  fisher: {
    away: { at: [16.2, 27.0], turn: 35, do: stand, look: [30, 60, 1.5] },
    door: { at: [10.25, 30.9], turn: 0, do: stand, look: 'lighthouse#door', reach: { r: 'lighthouse#door' } },
    threshold: { at: [10.0, 30.4], on: [10.0, 30.35, 0.5], turn: 195, do: 'seated', look: [-10, -20, 1.5] },
  },
};
return { SEA, land, shore, bundle, PINES, BOAT, DOOR_OPEN, PLACES };
