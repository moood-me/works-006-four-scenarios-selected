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
// the door's swing: hung on its right jamb, shut facing the landing, open outward toward it by `door`
const DOOR_OPEN = 70;
// the people's places (`<id>_at`): where each stands or sits, turned how, doing what, looking at what
const stand = { motion: 'stand', loop: true };
const PLACES = {
  papa: {
    slab: { at: [0.45, 3.4], turn: 215, do: 'hands_behind', look: [-3, -2, 1.6] },
    edge: { at: [-3.25, 12.9], turn: 255, do: 'hands_behind', look: [-30, 20, 1.2] },
    door: { at: [10, 30.9], turn: 0, do: stand, look: 'lighthouse#door', reach: { r: 'door#door' } },
    boat: { at: [-1.7, 6.3], turn: 250, do: stand, look: 'boat#boat' },
    cleft: { at: [2.6, 5.0], turn: 250, do: stand, look: 'granite#cleft' },
    water: { at: [-4.1, 7.6], turn: 255, do: 'hands_behind', look: [-20, 8, 0.5] },
    stone: { at: [7.0, 27.7], turn: 40, do: stand, look: 'arrow_stone#stone' },
  },
  mama: {
    slab: { at: [-1.3, 3.35], on: [-1.3, 3.4, 0.4], turn: 150, do: 'seated', look: [3, 1, 1.3] },
    steps: { at: [9.6, 30.2], on: [9.6, 30.25, 0.34], turn: 190, do: 'seated', look: [0, 5, 1] },
    cleft: { at: [0.6, 5.3], turn: 110, do: stand, look: 'granite#cleft' },
    stand: { at: [-0.7, 4.3], turn: 170, do: stand, look: [0, 0, 1.2] },
  },
  troll: {
    boulder: { at: [-2.65, 4.4], on: [-2.65, 4.4, 0.5], turn: 240, do: 'seated', look: [-6, 0, 0.8] },
    boat: { at: [-4.4, 8.0], turn: 120, do: stand, look: 'boat#boat' },
    boat_far: { at: [-3.4, 9.6], turn: 200, do: stand, look: 'boat#boat' },
  },
  my: {
    stone: { at: [7.15, 28.0], turn: 200, do: 'sit_look', look: 'arrow_stone#stone' },
    rock: { at: [3.2, 5.9], turn: 215, do: 'sit_look', look: [0, 0, 1] },
  },
  fisher: {
    away: { at: [16.2, 27.0], turn: 35, do: stand, look: [30, 60, 1.5] },
    door: { at: [10.25, 30.9], turn: 0, do: stand, look: 'lighthouse#door', reach: { r: 'lighthouse#door' } },
    threshold: { at: [10.0, 30.4], on: [10.0, 30.35, 0.5], turn: 195, do: 'seated', look: [-10, -20, 1.5] },
  },
};
// Marks on the granite by the game's keys, painted with it (granite.js; `at` turns across, distance into the plane's
// metres): the cleft in the slab before the family, running away from the eye up the slab's near face (`cleft`: a
// long dark slit, its lips paler; packed with seaweed when weed or sprout —
// the shoot itself is the card `sprout`; point `granite#cleft`), the white patch of rime by the landing
// (`frost_patch`), the frost's trail from the water's edge up the long back to the threshold and back (`frost_step`:
// the Groke slides — two broken bands of rime, thickest at the threshold).
const CLEFT = [1.6, 4.6], PATCH = [-0.2, 5.0];
function marks(g, e, at) {
  g.save();
  g.translate(...at(...CLEFT));
  const st = e.state.cleft ?? "empty";
  g.rotate(Math.PI / 2);
  g.scale(0.85, 2.4);
  g.translate(0, -0.35);
  g.fillStyle = "rgba(246, 230, 222, 0.6)";
  g.beginPath();
  g.moveTo(-1.0, 0.3);
  g.quadraticCurveTo(-0.3, 0.12, 0.2, 0.28);
  g.quadraticCurveTo(0.6, 0.42, 1.0, 0.24);
  g.lineTo(1.0, 0.36);
  g.quadraticCurveTo(0.6, 0.56, 0.2, 0.42);
  g.quadraticCurveTo(-0.3, 0.26, -1.0, 0.44);
  g.closePath();
  g.fill();
  g.fillStyle = "#3b2a2a";
  g.beginPath();
  g.moveTo(-0.95, 0.36);
  for (const [x, y] of [[-0.6, 0.27], [-0.3, 0.22], [0.0, 0.28], [0.25, 0.34], [0.55, 0.38], [0.95, 0.3]]) g.lineTo(x, y);
  for (const [x, y] of [[0.55, 0.47], [0.25, 0.43], [0.0, 0.37], [-0.3, 0.32], [-0.6, 0.37], [-0.95, 0.4]]) g.lineTo(x, y);
  g.closePath();
  g.fill();
  if (st === "weed" || st === "sprout") {
    for (let i = 0; i < 26; i++) {
      const x = -0.85 + 1.7 * e.rnd(), y = 0.3 + 0.06 * (e.rnd() - 0.5) + 0.05 * x, r = 0.05 + 0.05 * e.rnd();
      g.fillStyle = e.rnd() < 0.5 ? "#6d5a2c" : "#55502a";
      g.beginPath();
      g.ellipse(x, y - r * 0.6, r * 1.4, r * 0.8, (e.rnd() - 0.5) * 0.6, 0, Math.PI * 2);
      g.fill();
    }
    g.strokeStyle = "#7b6a34";
    g.lineWidth = 0.012;
    for (let i = 0; i < 14; i++) {
      const x = -0.8 + 1.6 * e.rnd();
      g.beginPath();
      g.moveTo(x, 0.3);
      g.quadraticCurveTo(x + 0.06, 0.2, x + 0.12 * (e.rnd() - 0.3), 0.14);
      g.stroke();
    }
  }
  g.restore();
  e.at(...at(...CLEFT), 'cleft');
  g.save();
  g.translate(...at(...PATCH));
  if (e.state.frost_patch) {
    for (let i = 0; i < 16; i++) {
      const x = (e.rnd() - 0.5) * 1.8, y = (e.rnd() - 0.5) * 1.3, r = 0.4 + 0.5 * e.rnd();
      const s = g.createRadialGradient(x, y, 0, x, y, r);
      s.addColorStop(0, "rgba(250, 252, 255, 0.95)");
      s.addColorStop(0.65, "rgba(238, 244, 252, 0.6)");
      s.addColorStop(1, "rgba(238, 244, 252, 0)");
      g.fillStyle = s;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    g.strokeStyle = "rgba(255, 255, 255, 0.85)";
    g.lineWidth = 0.012;
    for (let i = 0; i < 90; i++) {
      const a = e.rnd() * Math.PI * 2, rr = 0.8 + 0.6 * e.rnd(), x = Math.cos(a) * rr, y = Math.sin(a) * rr * 0.75, l = 0.04 + 0.08 * e.rnd(), t = e.rnd() * Math.PI;
      g.beginPath();
      g.moveTo(x - Math.cos(t) * l, y - Math.sin(t) * l);
      g.lineTo(x + Math.cos(t) * l, y + Math.sin(t) * l);
      g.stroke();
    }
  }
  g.restore();
  if (e.state.frost_step) {
    const ways = [[[-3.6, 19.4], [1.5, 22.6], [6.0, 26.6], [9.6, 29.8]], [[9.9, 29.7], [6.6, 26.0], [2.2, 22.0], [-3.2, 19.0]]];
    for (const way of ways) {
      for (let i = 0; i < way.length - 1; i++) {
        const [a0, d0] = way[i], [a1, d1] = way[i + 1], n = Math.ceil(Math.hypot(a1 - a0, d1 - d0) / 0.35);
        for (let k = 0; k < n; k++) {
          if (e.rnd() < 0.18) continue;
          const u = k / n, [x, y] = at(a0 + (a1 - a0) * u + (e.rnd() - 0.5) * 0.3, d0 + (d1 - d0) * u + (e.rnd() - 0.5) * 0.3);
          const door = Math.hypot(a0 + (a1 - a0) * u - 9.8, d0 + (d1 - d0) * u - 29.8) < 2.5, r = 0.22 + 0.2 * e.rnd() + (door ? 0.15 : 0);
          const s = g.createRadialGradient(x, y, 0, x, y, r);
          s.addColorStop(0, "rgba(248, 252, 255, 0.85)");
          s.addColorStop(0.6, "rgba(236, 244, 252, 0.5)");
          s.addColorStop(1, "rgba(236, 244, 252, 0)");
          g.fillStyle = s;
          g.fillRect(x - r, y - r, r * 2, r * 2);
          g.strokeStyle = "rgba(255, 255, 255, 0.8)";
          g.lineWidth = 0.012;
          for (let c = 0; c < 4; c++) {
            const ang = e.rnd() * Math.PI, l = 0.05 + 0.08 * e.rnd();
            g.beginPath();
            g.moveTo(x - Math.cos(ang) * l, y - Math.sin(ang) * l);
            g.lineTo(x + Math.cos(ang) * l, y + Math.sin(ang) * l);
            g.stroke();
          }
        }
      }
    }
  }
}
return { SEA, land, shore, bundle, marks, CLEFT, PINES, BOAT, DOOR_OPEN, PLACES };
