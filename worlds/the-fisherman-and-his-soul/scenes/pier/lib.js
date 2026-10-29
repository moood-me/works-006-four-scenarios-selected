// What the pier's script and its pieces share.
//
// The hours (hours.md): the numbers each word of `light` sets — night (the moon high), dawn (a misty dawn, a pale sun),
// noon (a bright day, the feast), evening (the moon rising low behind the pier's end), morning (a pale morning; its mist
// is the game's `mist`).
const LIGHT = {
  night: { dusk: 0, dawn: 0, day: 0 },
  dawn: { dusk: 0, dawn: 1, day: 0 },
  noon: { dusk: 0, dawn: 0, day: 1 },
  evening: { dusk: 1, dawn: 0, day: 0 },
  morning: { dusk: 0, dawn: 1, day: 0.55 },
};
// The two views (`view`): the sea — the scene's own camera, out over the bay to the stone; the shore — standing on the
// sand 7.5 m right of the start, looking back along the beach toward the land: the water's edge running away on the
// right, the hut, the widow's boat, the pier crossing to the sea in the middle distance, the bank and the field on the left
const VIEW = {
  sea: { camera_x: 0, camera_z: 0, camera_yaw: 0, camera_look: 0 },
  shore: { camera_x: 7.5, camera_z: 0.8, camera_yaw: 250, camera_look: 0.02 },
};
// The people's named places (places.md): at — [across, distance, elevation over the land (in the water)], turn, on — a
// seat. On the pier: the boards at its end by the post (end), its edge sat on with the legs over the water (edge), the
// root (walk: gone up the pier); in the water: by the pier's end to the waist (shallows), by the lantern post holding it
// (post), gone under (under), to the shoulders by the stone (stone); on the shore: by the hut, kneeling by her on the
// sand, the field's edge, by the widow's boat; the feast on the boards (1.3)
const PLACES = {
  fisherman: {
    end: { at: [-0.15, 4.75], turn: 150 },
    edge: { at: [-0.35, 3.5], turn: 135, on: [-0.35, 3.5, 2.18] },
    level: { at: [-2.0, 2.75], turn: 225 },
    shallows: { at: [0.95, 5.3, 0.97], turn: 200 },
    post: { at: [1.05, 4.8, 0.75], turn: 225 },
    under: { at: [1.4, 5.6, 0], turn: 200 },
    hut: { at: [1.4, -2.6], turn: 70 },
    sand: { at: [1.0, 0.3], turn: 20 },
    field: { at: [-2.4, -10.2], turn: 60 },
  },
  soul: {
    end: { at: [-0.9, 4.1], turn: 160 },
    edge: { at: [-0.75, 3.1], turn: 135, on: [-0.75, 3.1, 1.88] },
    walk: { at: [-6.0, -1.2], turn: 225 },
    hut: { at: [2.0, -2.0], turn: 260 },
  },
  mermaid: {
    pier: { at: [1.3, 4.4, 0.8], turn: 225 },
    stone: { at: [1.8, 5.6, 0.85], turn: 220 },
    sand: { at: [1.0, 1.0, 0], turn: 90 },
  },
  girl: { feast: { at: [-2.3, 2.7], turn: 120 } },
  woman_a: { feast: { at: [-3.2, 1.9], turn: 70 }, shore: { at: [2.0, -0.6], turn: 260 } },
  woman_b: { feast: { at: [-3.6, 1.4], turn: 60 }, shore: { at: [2.4, -0.2], turn: 250 } },
  widow: { boat: { at: [-0.6, -3.3], turn: 70 }, sand: { at: [1.9, -0.3], turn: 250 }, away: { at: [8.5, 1.0], turn: 80 } },
  widow_girl: { boat: { at: [-0.2, -3.8], turn: 70 }, field: { at: [-3.6, -10.9], turn: 60 } },
  widow_boy: { boat: { at: [0.25, -3.1], turn: 70 }, end: { at: [-0.55, 4.45], turn: 150, on: [-0.55, 4.45, 2.55] }, field: { at: [-3.2, -11.2], turn: 60 } },
  witch: { shore: { at: [2.6, 0.1], turn: 270 }, end: { at: [-0.25, 4.55], turn: 150 } },
  priest: { shore: { at: [0.2, -0.6], turn: 80 }, end: { at: [-0.1, 4.65], turn: 150 }, post: { at: [0.45, 4.3], turn: 60 }, mound: { at: [-2.0, -10.5], turn: 250 } },
};
// The wave (`wave` 0…1): the sheet of sea coming over the sand — its middle ahead (surge_d) and its height (surge_e);
// under the water till 0.3 (the sea only darkens), over the edge, up the sand to the hut at 1, raised a little there
function surge(w) {
  const k = Math.max(0, (w - 0.3) / 0.7);
  return { surge_d: 6.4 - 5 * k, surge_e: w < 0.3 ? -0.9 : -0.6 + 0.9 * k };
}
// The bundle drawn up the sand (`drag` 0…1): from the water's edge to the field's edge
const DRAG = [[0.8, 1.0], [-2.0, -10.6]];
function dragged(u) {
  return { bundle_a: DRAG[0][0] + (DRAG[1][0] - DRAG[0][0]) * u, bundle_d: DRAG[0][1] + (DRAG[1][1] - DRAG[0][1]) * u };
}
return { LIGHT, VIEW, PLACES, surge, dragged, DRAG };
