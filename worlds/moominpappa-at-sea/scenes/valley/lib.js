// Moominvalley at the end of August — what the elements and the script share. Metres: across (right +), distance
// (ahead), heights over the viewer's ground.
//   The land: the garden level before the eye, the house on a low knoll ahead right, the hills rising behind it to the
// right and far off; the stream (STREAM_A) running straight from a low wooded rise at the back down past the garden
// toward the eye; on the left the meadow going down to a strip of beach and the sea (the coast wavers along `coast`);
// far off the coast becomes a high wooded headland. The sea and the stream lie at WATER.
const WATER = -0.45, BEACH = -0.32, STREAM_A = -4.6;
const sm = (x, a, b) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const bump = (a, d, ca, cd, ra, rd) => {
  const x = (a - ca) / ra, z = (d - cd) / rd;
  return Math.exp(-(x * x + z * z));
};
// how far into the sea a point is: 0 at the meadow's edge … the beach from SHORE[0] to SHORE[1], the water's edge at
// SHORE[1], the sea floor beyond
const SHORE = [7, 8.4, 13, 15];
const coast = (a, d) => -(a + 0.9 * Math.sin(d * 0.13) + 0.5 * Math.sin(d * 0.05 + 1));
function land(a, d) {
  // the garden, the house's knoll, the hills behind (higher to the right), the headland far on the left, the low rise
  // the stream comes out of
  let h = 0.25 * bump(a, d, 7.5, 18, 7, 6)
    + 6.5 * sm(d, 38, 100) * sm(a, -6, 20)
    + 3.8 * sm(d, 75, 140) * (1 - sm(a, -6, 20))
    + 1.4 * bump(a, d, -4, 40, 9, 7);
  // the stream's bed, from its rise down toward the eye
  const x = (a - STREAM_A) / 0.95, k = Math.exp(-x * x) * (1 - sm(d, 29, 33));
  h = h * (1 - k) - 0.85 * k;
  // down to the beach and into the sea
  const s = coast(a, d), b = sm(s, SHORE[0], SHORE[1]);
  const beach = BEACH - 1.3 * sm(s, SHORE[2], SHORE[3]);
  return h * (1 - b) + beach * b;
}
// where the Groke stands on the beach (far off, on the left), and where her track meets the water
const GROKE = [-10.6, 36], GROKE_WATER = [-12.6, 36.4];
// the house: a round blue tower, its red cone of a roof with a little spire, a plinth — its profile, [radius, height]
// from the top down; how far along it a height is (its painting's rows); the way round its wall (its painting's width)
const HOUSE_AT = [8.2, 19.5];
const PROFILE = [[0, 10.3], [0.1, 10.2], [0.1, 9.6], [0.35, 9.5], [3.35, 6.75], [3.02, 6.66], [2.9, 6.6], [2.9, 0.22], [3.06, 0.16],
  [3.06, 0]];
const LENGTHS = [0];
for (let i = 1; i < PROFILE.length; i++) {
  LENGTHS.push(LENGTHS[i - 1] + Math.hypot(PROFILE[i][0] - PROFILE[i - 1][0], PROFILE[i][1] - PROFILE[i - 1][1]));
}
const HOUSE = {
  profile: PROFILE,
  len: LENGTHS[LENGTHS.length - 1],
  round: 2 * Math.PI * 2.9,
  // the painting's row (metres down from its top) of a height on the house
  at(h) {
    for (let i = 1; i < PROFILE.length; i++) {
      const h0 = PROFILE[i - 1][1], h1 = PROFILE[i][1];
      if (h <= h0 && h >= h1) return LENGTHS[i - 1] + ((LENGTHS[i] - LENGTHS[i - 1]) * (h0 - h)) / (h0 - h1 || 1);
    }
    return h > PROFILE[0][1] ? 0 : LENGTHS[LENGTHS.length - 1];
  },
};
// the veranda before the house's door: its floor's middle, size, height (scene.json `veranda`); what stands on it is
// placed in its frame ([across, toward its back, up]) — the table, the chairs round it, the little stove, the shelf
const VERANDA = { at: [7.4, 15.3], width: 4.6, depth: 2.6, floor: 0.72 };
// the jetty: its deck's middle, size, height (scene.json `jetty`); the post at its near end My sits on (in its frame)
const JETTY = { at: [-14.0, 24.0], width: 4.6, depth: 1.1, deck: -0.15, post: [-2.15, -0.45, 0.4] };
const SEATS = { back: [-0.2, 0.72, 0.32], left: [-1.25, -0.1, 0.32], right: [0.85, -0.1, 0.32], stool: [-0.75, -0.82, 0.5] };
const v = (x, y) => [VERANDA.at[0] + x, VERANDA.at[1] + y];
const seat = s => ({ on: 'veranda', at: SEATS[s] });
// The set-ups the game names by `where` (the script puts them as one cut): where each person is, sits, faces and looks,
// the camera, and what of the place goes with it (the jam steaming on the stove, the luggage on the jetty). A person the game has not here is placed all the same.
const P = (a, d, turn, does, look, on) => ({ a, d, turn, does, look: look ?? null, on: on ?? null });
const SETUPS = {
  // П.1–П.3: Mama at her jam on the veranda, the children by the stream, Papa in the garden by the apple tree; the
  // Groke far off on the shore
  garden: {
    people: {
      papa: P(1.5, 8.6, 245, 'hands_behind', 'apple#moss'),
      mama: P(6.2, 14.55, 262, 'hands_behind', 'stove#pan'),
      troll: P(-3.45, 10.2, 238, 'sit_look', [STREAM_A, 11.6, 0.4]),
      my: P(-3.35, 11.5, 222, 'sit_look', [STREAM_A, 12.6, 0.4]),
      groke: P(GROKE[0], GROKE[1], 131, 'hands_behind', 'window_lit'),
    },
    camera: {},
    keys: { jam: 1, luggage: 0 },
  },
  // П.4: night on the veranda, Papa alone at the chart under the lamp
  map: {
    people: {
      papa: P(...v(-0.2, 0.72), 180, 'seated', 'table', seat('back')),
      mama: P(6.2, 14.55, 262, 'hands_behind'),
      troll: P(-3.45, 10.2, 238, 'sit_look'),
      my: P(-3.35, 11.5, 222, 'sit_look'),
      groke: P(GROKE[0], GROKE[1], 131, 'hands_behind', 'window_lit'),
    },
    camera: { camera_target: 'table', camera_shot: 'wide', camera_frame: [0.5, 0.68] },
    keys: { jam: 0, luggage: 0 },
  },
  // П.5: supper on the veranda, the four round the table (late: Papa and Mama only — the game says who is here)
  supper: {
    people: {
      papa: P(...v(-0.2, 0.72), 180, 'seated', 'table', seat('back')),
      mama: P(...v(-1.25, -0.1), 90, 'seated', 'table', seat('left')),
      troll: P(...v(0.85, -0.1), 270, 'seated', 'papa', seat('right')),
      my: P(...v(-0.75, -0.82), 40, 'seated', 'papa', seat('stool')),
      groke: P(GROKE[0], GROKE[1], 131, 'hands_behind', 'window_lit'),
    },
    camera: { camera_target: 'table', camera_shot: 'wide', camera_frame: [0.5, 0.68] },
    keys: { jam: 0, luggage: 0 },
  },
  // П.5, the morning after «to Mama»; П.6: at the jetty by the boat, the basket packed; the Groke on the beach beyond
  jetty: {
    people: {
      papa: P(-14.4, 24.0, 200, 'hands_behind', 'boat'),
      mama: P(-13.4, 24.05, 168, 'hands_behind', 'luggage'),
      troll: P(-12.5, 24.1, 205, 'hands_behind', [GROKE[0], GROKE[1], 1]),
      my: P(-16.15, 23.55, 150, 'seated', 'papa', { on: 'jetty', at: JETTY.post }),
      groke: P(GROKE[0], GROKE[1], 200, 'hands_behind', 'boat#lantern'),
    },
    camera: { camera_x: -11.5, camera_z: 15 },
    keys: { jam: 0, luggage: 1 },
  },
};
// the camera's keys a set-up does not name are put back to the scene's own
const CAMERA = { camera_target: null, camera_shot: 'full', camera_frame: null, camera_x: 0, camera_z: 0 };
return { WATER, BEACH, STREAM_A, SHORE, coast, land, sm, GROKE, GROKE_WATER, HOUSE_AT, HOUSE, VERANDA, SEATS, JETTY, SETUPS, CAMERA };
