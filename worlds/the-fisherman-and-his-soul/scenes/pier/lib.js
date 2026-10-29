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
// The pier's pieces (the game's contract, game.md «Stage 5 — pieces»; notes.md «Pieces»): played by the world's
// `beats` from the script. `film(scene)` → {name: {from, after, run}}. The sea's pieces look out over the bay (the
// scene's camera, or the operator on someone); the shore's (`view` shore) look back along the beach — framed shots
// there are the operator's on its own way (from the land toward the sea: the sea behind the people).
function film(scene) {
  const P = kit.pieces;
  const at = (id, name) => P.at(PLACES, id, name);
  // what every piece begins with unless it says otherwise: nothing in hands, nothing done, nothing reached for
  const NONE = { fisherman_do: null, soul_do: null, mermaid_do: null, girl_do: null, woman_a_do: null, woman_b_do: null, widow_do: null,
    widow_girl_do: null, widow_boy_do: null, witch_do: null, priest_do: null, fisherman_reach: null, soul_reach: null, mermaid_reach: null,
    girl_reach: null, fisherman_with: null, soul_with: null, witch_with: null, priest_with: null, widow_with: null, fisherman_on: null, soul_on: null,
    widow_boy_on: null, mermaid_on: null, cut: 0, cut_rough: false, under_light: 0, far_lantern: 0, wave: 0, bundle: false, drag: 0, mist: 0, snow: false,
    lantern_lit: 1, mermaid_steps: false, fisherman_look: null, soul_look: null, mermaid_look: null };
  // the sea's view at an hour; the shore's
  const SEA = light => ({ view: 'sea', ...VIEW.sea, ...LIGHT[light], light });
  const SHORE = light => ({ view: 'shore', ...VIEW.shore, ...LIGHT[light], light, hut: 'none', shawl: false, widow_boat: false, mound: false,
    linen: false, shells: false });
  const WIDE_SHORE = { ...P.CAM0, ...VIEW.shore };
  // the shore's nearer cameras, each its own place on the sand or the bank (the operator would film them from the land,
  // the bank in its way): by the hut and the water's edge; by the widow's boat; low over her on the sand; up on the
  // bank by the field's edge
  const SHORE_HUT = { ...P.CAM0, camera_x: 5.0, camera_z: 0.6, camera_yaw: 255 };
  const SHORE_WIDOW = { ...P.CAM0, camera_x: 4.8, camera_z: 0.4, camera_yaw: 240, camera_look: 0.03 };
  const SHORE_SAND = { ...P.CAM0, camera_x: 3.3, camera_z: 1.3, camera_yaw: 262, camera_look: 0.14 };
  const SHORE_FIELD = { ...P.CAM0, camera_x: 0.6, camera_z: -7.8, camera_yaw: 222, camera_look: 0.06 };
  const put = (s, o) => { for (const [k, v] of Object.entries(o)) s.set(k, v); };
  // an object without some of its keys (a piece's `from` that leaves a key to the game)
  const without = (o, ...ks) => Object.fromEntries(Object.entries(o).filter(([k]) => !ks.includes(k)));
  // spots on the boards: the post's side (where one stands to drive the knife in), the pier's root
  const BY_POST = [0.3, 4.6];
  const ROOT = [-6.4, -1.6];
  const STONE_IN = [1.8, 5.6];
  // the camera's own places on the pier (the operator always films from the shore's side — a face turned to the sea is
  // its back): behind the pier's end over the water, looking back at the boards (the Soul's face as it turns to him);
  // nearer the boards, the scene's own view
  const CAM_BACK = { ...P.CAM0, camera_x: -0.4, camera_z: 5.7, camera_yaw: 195, camera_h: 0.45 };
  const CAM_NEAR = { ...P.CAM0, camera_x: 0.2, camera_z: 1.6 };
  const film = {
    // ── Chapter I ──
    feast: {
      from: () => ({ ...SEA('noon'), ...NONE, knife: 'none', ...at('fisherman', 'end'), ...at('girl', 'feast'), ...at('woman_a', 'feast'),
        ...at('woman_b', 'feast'), girl_do: 'dance_light', woman_a_do: 'clap', woman_b_do: 'clap', ...P.CAM0 }),
      run: async s => {
        P.loop(s, 'girl', 'dance_light');
        P.loop(s, 'woman_a', 'clap');
        P.loop(s, 'woman_b', 'clap');
        await s.wait(3);
        P.loop(s, 'woman_a', 'whisper');
        P.loop(s, 'woman_b', 'whisper');
        await P.tell(s, 'feast:whisper', 2);
        // he walks in from the pier's end toward the shore
        await P.go(s, 'fisherman', [PLACES.fisherman.level.at]);
        put(s, at('fisherman', 'level'));
        s.person('fisherman').look('girl');
        P.frame(s, P.shot('fisherman', 'medium', [0.55, 0.42]), 2);
        await P.tell(s, 'feast:level', 1.5);
      },
    },
    danced: {
      after: 'feast',
      from: () => ({ ...SEA('noon'), ...NONE, ...at('fisherman', 'level'), ...at('girl', 'feast'), ...at('woman_a', 'feast'), ...at('woman_b', 'feast'),
        girl_do: 'dance_light', woman_a_do: 'clap', woman_b_do: 'clap', ...P.shot('fisherman', 'medium', [0.55, 0.42]) }),
      run: async s => {
        P.open(s, { ...at('fisherman', 'level'), ...P.shot('fisherman', 'medium', [0.55, 0.42]) });
        const him = s.person('fisherman');
        // he stops, looks at her bare feet; she pulls his sleeve
        him.look('girl#feet');
        await s.wait(1.5);
        s.set('girl_reach', { r: 'fisherman#hand_l' });
        await P.tell(s, 'danced:pull', 1.5);
        s.set('girl_reach', null);
        // he dances, clumsily, and laughs; his shadow on the boards dances with him
        P.frame(s, P.CAM0, 2);
        him.mood('laugh');
        await him.do('clumsy_dance');
        await P.tell(s, 'danced:laugh', 2);
      },
    },
    passed: {
      after: 'feast',
      from: () => ({ ...SEA('noon'), ...NONE, ...at('fisherman', 'level'), ...at('girl', 'feast'), ...at('woman_a', 'feast'), ...at('woman_b', 'feast'),
        girl_do: 'dance_light', woman_a_do: 'clap', woman_b_do: 'clap', ...P.shot('fisherman', 'medium', [0.5, 0.42]) }),
      run: async s => {
        P.open(s, { ...at('fisherman', 'level'), ...P.shot('fisherman', 'medium', [0.5, 0.42]) });
        // he walks on toward the shore; looks back once
        const walking = P.go(s, 'fisherman', [ROOT]);
        await s.wait(2);
        await s.person('fisherman').do('look_back', { going: true });
        await P.tell(s, 'passed:look', 0.5);
        await walking;
      },
    },
    moonrise: {
      from: () => ({ ...SEA('evening'), ...NONE, knife: 'none', lantern_at: 'post', ...at('fisherman', 'end'), fisherman_turn: 20,
        ...at('mermaid', 'stone'), mermaid_look: 'fisherman', soul_here: false, ...P.CAM0 }),
      run: async s => {
        s.set('soul_here', false);
        // his back to the moon rising behind the pier's end: his shadow long down the boards toward the water
        await P.tell(s, 'moonrise:shadow', 5);
        if (s.get('smell')) P.frame(s, P.shot('mermaid', 'close', [0.5, 0.42]), 2);
        await P.tell(s, 'moonrise:her', 3);
      },
    },
    shadow_rises: {
      after: 'moonrise',
      from: () => ({ ...SEA('evening'), ...NONE, knife: 'none', ...at('fisherman', 'end'), fisherman_turn: 20, ...at('mermaid', 'stone'),
        ...at('soul', 'end'), soul_turn: 200, ...P.shot('soul', 'medium', [0.5, 0.45]) }),
      run: async s => {
        P.open(s, { ...at('soul', 'end'), soul_turn: 200, ...P.shot('soul', 'medium', [0.5, 0.45]) });
        // the shadow rises from the boards: his own face
        s.set('soul_here', true);
        const soul = s.person('soul');
        await soul.do('rise_ground');
        await P.tell(s, 'shadow_rises:up', 0.5);
        soul.look('fisherman');
        await P.cut(s, CAM_BACK);
        await P.tell(s, 'shadow_rises:face', 2);
        P.loop(s, 'soul', 'plead');
        await s.wait(2);
      },
    },
    heart_cut: {
      after: 'shadow_rises',
      from: () => ({ ...SEA('evening'), ...NONE, ...at('fisherman', 'end'), fisherman_turn: 20, ...at('mermaid', 'stone'), ...at('soul', 'end'), soul_turn: 200,
        soul_do: 'plead', soul_look: 'fisherman', ...CAM_BACK }),
      run: async s => {
        P.open(s, { soul_here: true, ...CAM_BACK });
        P.loop(s, 'soul', 'plead');
        // he turns to the water — to the stone
        await s.person('fisherman').turn(60);
        s.person('fisherman').look('mermaid');
        await P.tell(s, 'heart_cut:turn', 2);
        P.frame(s, P.shot('fisherman', 'medium', [0.4, 0.42]), 2);
        await s.wait(2);
      },
    },
    heart_come: {
      after: 'shadow_rises',
      from: () => ({ ...SEA('evening'), ...NONE, ...at('fisherman', 'end'), ...at('mermaid', 'stone'), ...at('soul', 'end'), soul_do: 'plead',
        ...P.shot('rock', 'wide', [0.5, 0.5]) }),
      run: async s => {
        P.open(s, P.shot('rock', 'wide', [0.5, 0.5]));
        // by the stone she sinks, and comes up after a long while
        await s.move('mermaid_e', 0, { over: 1.8, ease: 'in' });
        s.set('mermaid_here', false);
        await P.tell(s, 'heart_come:under', 3.5);
        s.set('mermaid_here', true);
        await s.move('mermaid_e', PLACES.mermaid.stone.at[2], { over: 1.8, ease: 'out' });
        await P.tell(s, 'heart_come:up', 1);
      },
    },
    knife_ready: {
      after: ['shadow_rises', 'heart_cut', 'heart_come'],
      from: () => ({ ...SEA('evening'), ...NONE, ...at('fisherman', 'end'), ...at('mermaid', 'stone'), ...at('soul', 'end'), soul_do: 'plead',
        ...P.shot('fisherman', 'full', [0.5, 0.55]) }),
      run: async s => {
        P.open(s, { ...at('fisherman', 'end'), ...P.shot('fisherman', 'full', [0.5, 0.55]) });
        // he takes the knife and crouches at his heels, over the edge of his shadow
        s.set('fisherman_with', ['knife']);
        s.person('fisherman').look('cutline#heel');
        await s.person('fisherman').do('kneel');
        P.loop(s, 'fisherman', 'kneel');
        await P.tell(s, 'knife_ready:end', 0.5);
      },
    },
    cut: {
      after: 'knife_ready',
      from: () => ({ ...SEA('evening'), ...NONE, cut: 1, ...at('fisherman', 'end'), fisherman_with: ['knife'], fisherman_do: 'kneel', ...at('mermaid', 'stone'),
        ...at('soul', 'end'), soul_here: true, ...CAM_NEAR }),
      run: async s => {
        P.open(s, { ...at('fisherman', 'end'), fisherman_with: ['knife'], ...CAM_NEAR });
        const him = s.person('fisherman');
        him.do('stand', { loop: true });
        // the Soul steps apart, a metre
        await P.go(s, 'soul', [[-1.55, 3.6]], 160);
        await P.tell(s, 'cut:apart', 0.5);
        // he drives the knife into the post, and sets the lantern down on the boards
        await P.go(s, 'fisherman', [BY_POST], 100);
        await him.do('stab_post');
        s.set('fisherman_with', null);
        s.set('knife', 'post');
        await P.tell(s, 'cut:post', 0.8);
        s.set('lantern_at', 'boards');
        await s.wait(1);
      },
    },
    into_sea: {
      after: 'cut',
      from: () => ({ ...SEA('evening'), ...NONE, cut: 1, knife: 'post', lantern_at: 'boards', ...at('fisherman', 'end'), fisherman_a: BY_POST[0],
        fisherman_d: BY_POST[1], ...at('mermaid', 'stone'), ...at('soul', 'end'), soul_a: -1.55, soul_d: 3.6, soul_here: true, ...P.CAM0 }),
      run: async s => {
        const him = s.person('fisherman');
        // he walks off the pier's end into the water toward the stone
        await P.go(s, 'fisherman', [[0.55, 5.1]]);
        put(s, at('fisherman', 'shallows'));
        await P.go(s, 'fisherman', [STONE_IN], 60, 'wade');
        await P.tell(s, 'into_sea:far', 1);
        // she laughs, takes his hand; both go under
        s.person('mermaid').mood('laugh');
        s.set('mermaid_reach', { r: 'fisherman#hand_l' });
        await s.wait(1.5);
        await s.all(s.move('fisherman_e', 0, { over: 2, ease: 'in' }), s.move('mermaid_e', 0, { over: 2, ease: 'in' }));
        s.set('fisherman_here', false);
        s.set('mermaid_here', false);
        await P.tell(s, 'into_sea:under', 1);
        // the Soul picks up the lantern and looks at the water
        P.frame(s, P.shot('soul', 'medium', [0.45, 0.45]), 2);
        await P.go(s, 'soul', [[0.15, 4.25]], 60);
        s.set('lantern_at', 'none');
        s.set('soul_with', ['lantern']);
        s.person('soul').look(STONE_IN.concat([0]));
        await P.tell(s, 'into_sea:soul', 2);
      },
    },
    // ── Chapter II ──
    come_out: {
      from: () => ({ ...SEA('dawn'), ...NONE, mist: 1, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern'], fisherman_here: false,
        ...at('fisherman', 'shallows'), fisherman_e: 0, ...P.CAM0 }),
      run: async s => {
        s.set('fisherman_here', false);
        await s.person('soul').do('call_out');
        await P.tell(s, 'come_out:call', 1);
        // he comes up out of the water to his waist
        s.set('fisherman_here', true);
        s.person('fisherman').look('soul');
        await s.move('fisherman_e', PLACES.fisherman.shallows.at[2], { over: 2.5, ease: 'out' });
        P.frame(s, P.shot('soul', 'medium', [0.35, 0.45]), 2);
        await P.tell(s, 'come_out:up', 2);
      },
    },
    law: {
      after: 'come_out',
      from: () => ({ ...SEA('dawn'), ...NONE, mist: 1, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern'],
        ...at('fisherman', 'shallows'), ...at('mermaid', 'stone'), mermaid_here: false, ...P.shot('rock', 'wide', [0.5, 0.5]) }),
      run: async s => {
        P.open(s, { ...at('mermaid', 'stone'), mermaid_e: 0, ...P.shot('rock', 'wide', [0.5, 0.5]) });
        // by the stone she comes up, and comes no nearer
        s.set('mermaid_here', true);
        await s.move('mermaid_e', PLACES.mermaid.stone.at[2], { over: 2, ease: 'out' });
        await P.tell(s, 'law:up', 1.5);
      },
    },
    sit_edge: {
      after: 'law',
      from: () => ({ ...SEA('dawn'), ...NONE, mist: 1, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern'],
        ...at('fisherman', 'shallows'), ...at('mermaid', 'stone'), ...P.CAM0 }),
      run: async s => {
        // he climbs onto the boards and sits on the pier's edge beside the Soul, not touching
        put(s, { ...at('fisherman', 'edge'), fisherman_do: 'sit_edge' });
        put(s, { ...at('soul', 'edge'), soul_do: 'sit_edge' });
        P.loop(s, 'fisherman', 'sit_edge');
        P.loop(s, 'soul', 'sit_edge');
        P.frame(s, P.shot('fisherman', 'medium', [0.6, 0.45]), 0);
        await P.tell(s, 'sit_edge:sat', 4);
        await s.person('soul').do('laugh');
        P.loop(s, 'soul', 'sit_edge');
        await P.tell(s, 'sit_edge:laugh', 2);
        // by the stone she turns her back
        P.frame(s, P.CAM0, 2.5);
        await s.person('mermaid').turn(30);
        await P.tell(s, 'sit_edge:back', 3);
      },
    },
    to_song: {
      after: 'law',
      from: () => ({ ...SEA('dawn'), ...NONE, mist: 1, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern'],
        ...at('fisherman', 'shallows'), ...at('mermaid', 'stone'), ...P.shot('soul', 'medium', [0.45, 0.45]) }),
      run: async s => {
        P.open(s, P.shot('soul', 'medium', [0.45, 0.45]));
        // he sinks into the water toward the stone
        await s.move('fisherman_e', 0, { over: 2, ease: 'in' });
        s.set('fisherman_here', false);
        await P.tell(s, 'to_song:under', 1.5);
        // the Soul alone looks at the water, and puts out the lantern
        s.person('soul').look([1.2, 5.6, 0]);
        P.frame(s, P.shot('soul#flame', 'close', [0.5, 0.5]), 2);
        await s.wait(2);
        await s.move('lantern_lit', 0, { over: 1.5 });
        s.set('soul_with', ['lantern_out']);
        await P.tell(s, 'to_song:out', 2);
      },
    },
    ring: {
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern', 'ring'],
        ...at('fisherman', 'shallows'), ...P.shot('soul#ring', 'close', [0.5, 0.5]) }),
      run: async s => {
        // the Soul raises the hand with the ring
        await s.person('soul').do('hold_out');
        await P.tell(s, 'ring:shown', 1);
        P.frame(s, P.shot('soul', 'medium', [0.45, 0.45]), 2);
        await s.wait(2);
      },
    },
    laugh_go: {
      after: 'ring',
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern', 'ring'],
        ...at('fisherman', 'shallows'), ...P.shot('soul', 'medium', [0.45, 0.45]) }),
      run: async s => {
        P.open(s, P.shot('soul', 'medium', [0.45, 0.45]));
        const soul = s.person('soul');
        // a short angry laugh (hard) or a tired one; then away up the pier
        soul.mood(s.get('hard') ? 'angry' : 'tired');
        await soul.do('laugh');
        await P.tell(s, 'laugh_go:laugh', 0.5);
        P.frame(s, P.CAM0, 2);
        await P.go(s, 'soul', [ROOT]);
        s.set('soul_here', false);
        await P.tell(s, 'laugh_go:gone', 1);
      },
    },
    third_year: {
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_a: -1.4, soul_d: 3.5, soul_with: ['lantern'],
        ...at('fisherman', 'shallows'), mermaid_here: false, ...P.shot('soul', 'medium', [0.45, 0.45]) }),
      run: async s => {
        s.set('mermaid_here', false);
        // the Soul walks to the pier's end, nearer him
        await P.go(s, 'soul', [PLACES.soul.end.at], 120);
        s.person('soul').look('fisherman');
        await P.tell(s, 'third_year:near', 3);
        // the camera to the stone: under the water her faint light (her song), or the stone empty
        P.frame(s, P.shot('rock', 'wide', [0.5, 0.5]), 2.5);
        if (s.get('song')) s.move('under_light', 0.6, { over: 2 });
        await P.tell(s, 'third_year:stone', 3);
      },
    },
    go_day: {
      after: 'third_year',
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern'], ...at('fisherman', 'shallows'),
        ...at('mermaid', 'stone'), mermaid_here: false, ...P.CAM0 }),
      run: async s => {
        P.open(s, { ...P.CAM0 });
        const him = s.person('fisherman');
        him.mood('laugh');
        await him.do('laugh');
        // three strides through the shallows up onto the boards, wet
        put(s, at('fisherman', 'end'));
        await P.tell(s, 'go_day:up', 1);
        // the Soul gives him the lantern and steps into his shadow
        P.frame(s, P.shot('fisherman', 'medium', [0.5, 0.45]), 1.5);
        s.set('soul_with', null);
        s.set('fisherman_with', ['lantern']);
        await P.go(s, 'soul', [PLACES.fisherman.end.at]);
        s.set('soul_here', false);
        await P.tell(s, 'go_day:in', 1);
        // by the stone she sees, and goes under
        put(s, at('mermaid', 'stone'));
        s.set('mermaid_here', true);
        await P.cut(s, P.shot('mermaid', 'close', [0.5, 0.42]));
        await s.wait(1);
        await s.move('mermaid_e', 0, { over: 2, ease: 'in' });
        s.set('mermaid_here', false);
        await P.tell(s, 'go_day:her', 0.5);
        // he turns to the water; then goes off up the pier, almost running
        await P.cut(s, P.shot('fisherman', 'medium', [0.5, 0.45]));
        await him.turn(40);
        await P.tell(s, 'go_day:turn', 2);
        P.frame(s, P.CAM0, 2);
        await P.go(s, 'fisherman', [ROOT], null, 'run');
        s.set('fisherman_here', false);
        await P.tell(s, 'go_day:gone', 1);
      },
    },
    stay_day: {
      after: 'third_year',
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern'], ...at('fisherman', 'shallows'),
        mermaid_here: false, ...P.shot('fisherman', 'medium', [0.5, 0.45]) }),
      run: async s => {
        P.open(s, P.shot('fisherman', 'medium', [0.5, 0.45]));
        // he turns to the water
        await s.person('fisherman').turn(40);
        await P.tell(s, 'stay_day:turn', 2);
        // the Soul walks off up the pier with the lantern, and over the hill — its light seen a long while
        P.frame(s, P.CAM0, 2);
        await P.go(s, 'soul', [ROOT]);
        s.set('soul_here', false);
        await s.move('far_lantern', 1, { over: 8, ease: 'linear' });
        await P.tell(s, 'stay_day:gone', 1);
      },
    },
    fourth_year: {
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern', 'cup'],
        ...at('fisherman', 'shallows'), fisherman_e: 0, fisherman_here: false, mermaid_here: false, ...P.shot('soul', 'medium', [0.45, 0.45]) }),
      run: async s => {
        s.set('mermaid_here', false);
        s.set('fisherman_here', true);
        await s.move('fisherman_e', PLACES.fisherman.shallows.at[2], { over: 2.5, ease: 'out' });
        await P.tell(s, 'fourth_year:up', 2);
        P.frame(s, P.shot('soul#cup', 'close', [0.5, 0.5]), 2);
        await s.wait(2.5);
        P.frame(s, P.shot('rock', 'wide', [0.5, 0.5]), 2.5);
        if (s.get('song')) s.move('under_light', 0.6, { over: 2 });
        await P.tell(s, 'fourth_year:stone', 3);
      },
    },
    late_go: {
      after: 'fourth_year',
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern', 'cup'],
        ...at('fisherman', 'shallows'), mermaid_here: false, ...P.shot('lantern_post#knife', 'close', [0.5, 0.5]) }),
      run: async s => {
        P.open(s, P.shot('lantern_post#knife', 'close', [0.5, 0.5]));
        // he looks long at the knife in the post
        put(s, { ...at('fisherman', 'end'), fisherman_a: BY_POST[0], fisherman_d: BY_POST[1] });
        s.person('fisherman').look('lantern_post#knife');
        await P.tell(s, 'late_go:knife', 3);
        // the Soul gives him the lantern and the cup and goes into his shadow
        P.frame(s, P.shot('fisherman', 'medium', [0.5, 0.45]), 2);
        s.set('soul_with', null);
        s.set('fisherman_with', ['lantern', 'cup']);
        await P.go(s, 'soul', [BY_POST]);
        s.set('soul_here', false);
        await P.tell(s, 'late_go:in', 1);
        // by the stone she sees, goes under
        put(s, at('mermaid', 'stone'));
        s.set('mermaid_here', true);
        await P.cut(s, P.shot('rock', 'wide', [0.5, 0.5]));
        await s.wait(1);
        await s.move('mermaid_e', 0, { over: 2, ease: 'in' });
        s.set('mermaid_here', false);
        await P.tell(s, 'late_go:her', 0.5);
        // he speaks to the water
        await P.cut(s, P.shot('fisherman', 'medium', [0.5, 0.45]));
        s.person('fisherman').look(STONE_IN.concat([0]));
        await P.tell(s, 'late_go:water', 3);
      },
    },
    turn_away: {
      after: 'fourth_year',
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern', 'cup'],
        ...at('fisherman', 'shallows'), mermaid_here: false, ...P.shot('fisherman', 'medium', [0.5, 0.45]) }),
      run: async s => {
        P.open(s, P.shot('fisherman', 'medium', [0.5, 0.45]));
        // he turns his back to the pier, his hand on its post
        put(s, at('fisherman', 'post'));
        s.set('fisherman_turn', 45);
        s.set('fisherman_reach', { r: 'lantern_post#grip' });
        await P.tell(s, 'turn_away:hand', 2);
      },
    },
    sink: {
      after: 'turn_away',
      from: () => ({ ...SEA('dawn'), ...NONE, knife: 'post', lantern_at: 'none', ...at('soul', 'end'), soul_with: ['lantern', 'cup'],
        ...at('fisherman', 'post'), fisherman_turn: 45, mermaid_here: false, ...P.shot('fisherman', 'medium', [0.5, 0.45]) }),
      run: async s => {
        P.open(s, { ...at('fisherman', 'post'), fisherman_turn: 45, ...P.shot('fisherman', 'medium', [0.5, 0.45]) });
        s.set('fisherman_reach', null);
        // he looks once at the pier (unless his fingers slipped), and goes under
        if (s.get('looked') !== false) {
          s.person('fisherman').look('soul');
          await s.wait(1.5);
          s.person('fisherman').look(null);
        }
        P.frame(s, P.CAM0, 2);
        await s.move('fisherman_e', 0, { over: 2, ease: 'in' });
        put(s, at('fisherman', 'under'));
        s.set('fisherman_here', false);
        await P.tell(s, 'sink:under', 1);
      },
    },
    // ── Chapter IV ──
    call_her: {
      // (its hour — morning in the mist, night, evening — is the game's: `light`, `mist`)
      from: () => ({ view: 'sea', ...VIEW.sea, ...without(NONE, 'mist'), knife: 'post', lantern_at: 'none', ...at('fisherman', 'end'), fisherman_a: BY_POST[0],
        fisherman_d: BY_POST[1], fisherman_turn: 100, fisherman_with: ['lantern'], mermaid_here: false, soul_here: false,
        ...P.shot('fisherman', 'medium', [0.45, 0.45]) }),
      run: async s => {
        const him = s.person('fisherman');
        // he hangs the lantern on the post
        await him.do('hang_lantern');
        s.set('fisherman_with', null);
        s.set('lantern_at', 'post');
        await P.tell(s, 'call_her:hung', 0.5);
        await him.turn(40);
        await him.do('call_out');
        await P.tell(s, 'call_her:call', 1);
        // the camera to the stone: under the water a pale light that stays and does not rise
        P.frame(s, P.shot('rock', 'wide', [0.5, 0.55]), 2.5);
        await s.move('under_light', 1, { over: 2.5 });
        await P.tell(s, 'call_her:light', 3);
      },
    },
    knife_rust: {
      after: 'call_her',
      from: () => ({ ...SEA('night'), ...NONE, knife: 'post', rust: true, lantern_at: 'post', under_light: 1, ...at('fisherman', 'end'),
        fisherman_a: BY_POST[0], fisherman_d: BY_POST[1], fisherman_turn: 100, mermaid_here: false, soul_here: false, ...P.shot('lantern_post#knife', 'close', [0.5, 0.5]) }),
      run: async s => {
        P.open(s, { fisherman_a: BY_POST[0], fisherman_d: BY_POST[1], fisherman_turn: 100, ...P.shot('lantern_post#knife', 'close', [0.5, 0.5]) });
        // he pulls the knife out of the post
        s.set('rust', true);
        await s.person('fisherman').do('pull_knife');
        s.set('knife', 'none');
        s.set('fisherman_with', ['knife_rusty']);
        await P.tell(s, 'knife_rust:out', 0.5);
        // back to where he stands at the pier's end (the edge of his shadow at his soles: М6)
        P.frame(s, P.shot('fisherman', 'medium', [0.45, 0.45]), 2);
        await P.go(s, 'fisherman', [PLACES.fisherman.end.at], PLACES.fisherman.end.turn);
        await s.person('fisherman').do('kneel');
        P.loop(s, 'fisherman', 'kneel');
      },
    },
    knife_back: {
      after: 'knife_rust',
      from: () => ({ ...SEA('night'), ...NONE, knife: 'none', rust: true, lantern_at: 'post', ...at('fisherman', 'end'), fisherman_with: ['knife_rusty'],
        fisherman_do: 'kneel', mermaid_here: false, soul_here: false, ...P.shot('fisherman', 'medium', [0.45, 0.45]) }),
      run: async s => {
        P.open(s, { fisherman_with: ['knife_rusty'], ...P.shot('fisherman', 'medium', [0.45, 0.45]) });
        const him = s.person('fisherman');
        him.do('stand', { loop: true });
        await P.tell(s, 'knife_back:through', 2);
        // (thrown: he throws the knife on the boards, then picks it up)
        if (s.get('thrown')) {
          await him.do('throw_down');
          s.set('fisherman_with', null);
          s.set('knife', 'boards');
          await s.wait(2);
          await him.do('kneel');
          s.set('knife', 'none');
          s.set('fisherman_with', ['knife_rusty']);
          him.do('stand', { loop: true });
        }
        // he drives it back into the post
        await P.go(s, 'fisherman', [BY_POST], 100);
        await him.do('stab_post');
        s.set('fisherman_with', null);
        s.set('knife', 'post');
        await P.tell(s, 'knife_back:post', 1.5);
      },
    },
    night_alone: {
      from: () => ({ ...SEA('night'), ...NONE, knife: 'post', rust: true, lantern_at: 'post', ...at('fisherman', 'end'), mermaid_here: false,
        soul_here: false, ...P.CAM0 }),
      run: async s => {
        await P.tell(s, 'night_alone:end', 6);
      },
    },
    // ── «Белые цветы» ──
    knife_sea: {
      from: () => ({ ...SEA('morning'), ...NONE, mist: 1, knife: 'post', rust: true, lantern_at: 'post', fisherman_here: false, soul_here: false,
        mermaid_here: false, ...at('priest', 'post'), ...P.shot('priest', 'medium', [0.45, 0.45]) }),
      run: async s => {
        const priest = s.person('priest');
        await priest.do('pull_knife');
        s.set('knife', 'none');
        s.set('priest_with', ['knife_rusty']);
        await P.tell(s, 'knife_sea:out', 0.5);
        await priest.turn(40);
        await priest.do('throw_far');
        s.set('priest_with', null);
        await P.tell(s, 'knife_sea:thrown', 2);
      },
    },
    bless_sea: {
      from: () => ({ ...SEA('morning'), ...NONE, rust: true, fisherman_here: false,
        soul_here: false, mermaid_here: false, ...at('priest', 'end'), priest_turn: 40, ...P.CAM0 }),
      run: async s => {
        await s.wait(1);
        await s.person('priest').do('bless');
        await P.tell(s, 'bless_sea:bless', 1.5);
      },
    },
    hook_empty: {
      from: () => ({ ...SEA('morning'), ...NONE, mist: 1, knife: 'none', lantern_at: 'none', fisherman_here: false, soul_here: false, mermaid_here: false,
        ...at('priest', 'end'), priest_turn: 40, ...P.CAM0, camera_z: -0.4 }),
      run: async s => {
        await s.move('camera_z', 0.4, { over: 9 });
        await P.tell(s, 'hook_empty:end', 1);
      },
    },
    // ── «Фонарь на мостках» ──
    post_knife: {
      from: () => ({ ...SEA('morning'), ...NONE, knife: 'post', rust: true, lantern_at: 'post', ...at('fisherman', 'end'), fisherman_a: BY_POST[0],
        fisherman_d: BY_POST[1], fisherman_turn: 100, mermaid_here: false, soul_here: false, ...P.shot('lantern_post#knife', 'close', [0.5, 0.5]) }),
      run: async s => {
        await s.person('fisherman').do('pull_knife');
        s.set('knife', 'none');
        s.set('fisherman_with', ['knife_rusty']);
        await P.tell(s, 'post_knife:out', 1.5);
      },
    },
    old_lantern: {
      from: () => ({ ...SEA('night'), ...NONE, years: true, knife: 'none', lantern_at: 'none', ...at('fisherman', 'end'), fisherman_turn: 40,
        fisherman_with: ['lantern'], ...at('widow_boy', 'end'), mermaid_here: false, soul_here: false, ...P.CAM0, camera_z: -0.3 }),
      run: async s => {
        s.set('years', true);
        // the widow's boy beside him, knotting a new net — or he alone
        if (s.get('boy')) {
          s.set('widow_boy_here', true);
          P.loop(s, 'widow_boy', 'knot_net');
        } else s.set('widow_boy_here', false);
        await s.move('camera_z', 0.5, { over: 12 });
        await P.tell(s, 'old_lantern:end', 1);
      },
    },
    // ── «Два огня» ──
    soul_leaves: {
      from: () => ({ ...SEA('morning'), ...NONE, knife: 'post', rust: true, lantern_at: 'none', ...at('soul', 'end'), fisherman_here: false, mermaid_here: false,
        soul_with: ['cup', 'lantern'], ...P.shot('soul', 'medium', [0.5, 0.45]) }),
      run: async s => {
        const hard = s.get('hard');
        // the lantern dark and no turn (hard), or burning, and once it turns to the water
        if (hard) {
          s.set('soul_with', ['cup', 'lantern_out']);
          s.set('lantern_lit', 0);
          s.tell('soul_leaves:turn');
        } else {
          await s.person('soul').turn(40);
          await P.tell(s, 'soul_leaves:turn', 2);
        }
        P.frame(s, P.CAM0, 2);
        await P.go(s, 'soul', [ROOT]);
        s.set('soul_here', false);
        s.set('far_lantern', 0.01);
        await s.move('far_lantern', 1, { over: 6, ease: 'linear' });
        await P.tell(s, 'soul_leaves:gone', 1);
      },
    },
    witch_knife: {
      from: () => ({ ...SEA('night'), ...NONE, knife: 'post', rust: true, lantern_at: 'none', fisherman_here: false, soul_here: false, mermaid_here: false,
        ...at('witch', 'end'), witch_a: BY_POST[0], witch_d: BY_POST[1], witch_turn: 100, ...P.shot('witch', 'medium', [0.45, 0.45]) }),
      run: async s => {
        await s.person('witch').do('pull_knife');
        s.set('knife', 'none');
        s.set('witch_with', ['knife_rusty']);
        await P.tell(s, 'witch_knife:out', 1);
        P.frame(s, P.CAM0, 2);
        await P.go(s, 'witch', [ROOT]);
        s.set('witch_here', false);
        await P.tell(s, 'witch_knife:gone', 1);
      },
    },
    witch_dance: {
      from: () => ({ ...SEA('night'), ...NONE, knife: 'none', lantern_at: 'none', fisherman_here: false, soul_here: false, mermaid_here: false,
        ...at('witch', 'end'), witch_with: ['tambourine_hand'], witch_do: 'dance_tambourine', ...P.CAM0 }),
      run: async s => {
        P.loop(s, 'witch', 'dance_tambourine');
        await P.tell(s, 'witch_dance:end', 10);
      },
    },
    // ── The shore (chapter 4 and the finales) ──
    winter: {
      from: () => ({ ...SHORE('dawn'), ...NONE, hut: 'none', ...at('fisherman', 'hut'), fisherman_do: 'weave', mermaid_here: false, soul_here: false,
        ...WIDE_SHORE }),
      run: async s => {
        P.loop(s, 'fisherman', 'weave');
        await s.wait(3);
        s.set('hut', 'half');
        await s.wait(3);
        s.set('hut', 'built');
        await P.tell(s, 'winter:hut', 1);
        s.set('snow', true);
        s.set('light', 'morning');
        // he stands by the water and calls
        s.person('fisherman').do('stand', { loop: true });
        await P.go(s, 'fisherman', [[2.5, 1.0]], 20);
        await s.person('fisherman').do('call_out');
        await P.tell(s, 'winter:snow', 1);
      },
    },
    witch_shore: {
      from: () => ({ ...SHORE('morning'), ...NONE, snow: true, hut: 'built', ...at('fisherman', 'hut'), fisherman_do: 'sit_ground', ...at('witch', 'shore'),
        witch_a: 6.5, witch_d: 1.0, witch_turn: 270, mermaid_here: false, soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        P.loop(s, 'fisherman', 'sit_ground');
        const her = s.person('witch');
        await P.go(s, 'witch', [[2.6, 0.1]], 250);
        her.look('fisherman');
        P.frame(s, SHORE_HUT, 2);
        await P.tell(s, 'witch_shore:stop', 1);
        if (s.get('witch_way') === 'danced') {
          // she lays bread and her shawl by the hut, and goes, looking back
          await P.go(s, 'witch', [[1.2, -1.6]]);
          await her.do('lay_down');
          s.set('shawl', true);
          P.frame(s, WIDE_SHORE, 2);
          await P.go(s, 'witch', [[-3, -0.2]]);
          await her.do('look_back');
        } else {
          // she stops, laughs, and walks on
          her.mood('laugh');
          await her.do('laugh');
          P.frame(s, WIDE_SHORE, 2);
          await P.go(s, 'witch', [[-3, -0.2]]);
        }
        await P.go(s, 'witch', [[-9, 0.2]]);
        s.set('witch_here', false);
        await P.tell(s, 'witch_shore:gone', 1);
      },
    },
    widow: {
      from: () => ({ ...SHORE('dawn'), ...NONE, hut: 'built', widow_boat: true, ...at('fisherman', 'hut'), ...at('widow', 'boat'), ...at('widow_girl', 'boat'),
        ...at('widow_boy', 'boat'), mermaid_here: false, soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        // she comes to him (looking at him long, and keeping the children behind her, if she has heard he is a thief)
        if (s.get('thief')) {
          s.person('widow').look('fisherman');
          await s.wait(2);
          await s.person('widow').do('shield');
        }
        await P.go(s, 'widow', [PLACES.widow.sand.at], 300);
        s.person('widow').look('fisherman');
        s.person('fisherman').look('widow');
        P.frame(s, SHORE_WIDOW, 2);
        await P.tell(s, 'widow:say', 3);
        await P.tell(s, 'widow:boat', 3);
        // the children look at the net on the rail
        s.person('widow_girl').look('rail');
        s.person('widow_boy').look('rail');
        P.frame(s, { ...SHORE_WIDOW, camera_z: -0.6, camera_x: 3.4 }, 2);
        await P.tell(s, 'widow:net', 2);
      },
    },
    widow_goes: {
      from: () => ({ ...SHORE('morning'), ...NONE, hut: 'built', widow_boat: true, ...at('widow', 'boat'), widow_with: ['bundles'], ...at('widow_girl', 'boat'),
        ...at('widow_boy', 'boat'), fisherman_here: false, mermaid_here: false, soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        // she leads the children away along the shore toward the bridge; the boy looks back at the net on the rail
        const away = PLACES.widow.away.at;
        const w = P.go(s, 'widow', [[3.5, 0.2], away]);
        const g = P.go(s, 'widow_girl', [[3.2, -0.3], [away[0] - 0.5, away[1] - 0.5]]);
        await s.wait(0.8);
        const b = P.go(s, 'widow_boy', [[2.8, 0.1]]);
        await b;
        s.person('widow_boy').look('rail');
        P.frame(s, SHORE_HUT, 1.5);
        await s.person('widow_boy').do('look_back');
        await P.tell(s, 'widow_goes:look', 0.5);
        P.frame(s, WIDE_SHORE, 2);
        await P.go(s, 'widow_boy', [[away[0] + 0.4, away[1] + 0.5]]);
        await s.all(w, g);
        for (const id of ['widow', 'widow_girl', 'widow_boy']) s.set(`${id}_here`, false);
        await P.tell(s, 'widow_goes:gone', 1);
      },
    },
    dawn_shore: {
      from: () => ({ ...SHORE('dawn'), ...NONE, hut: 'built', widow_boat: true, ...at('fisherman', 'sand'), fisherman_a: 2.0, fisherman_d: 1.25,
        fisherman_with: ['net_catch'], ...at('widow', 'sand'), ...at('widow_girl', 'boat'), widow_girl_a: 1.3, widow_girl_d: 0.6, ...at('widow_boy', 'boat'),
        widow_boy_a: 0.7, widow_boy_d: 0.6, ...at('mermaid', 'sand'), mermaid_do: 'lie_still', mermaid_mood: 'eyes_closed', soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        // he comes up from the water's edge with the full net; the widow sees the fish
        await P.go(s, 'fisherman', [[1.6, 0.0]], 270);
        s.person('widow').look('fisherman#hands');
        P.frame(s, SHORE_HUT, 2);
        await P.tell(s, 'dawn_shore:fish', 3);
        // the children by something on the sand step apart: her
        P.frame(s, WIDE_SHORE, 2);
        await s.all(P.go(s, 'widow_girl', [[1.6, 1.3]]), P.go(s, 'widow_boy', [[0.3, 1.2]]));
        await P.cut(s, SHORE_SAND);
        await P.tell(s, 'dawn_shore:apart', 2);
      },
    },
    wave_lays: {
      from: () => ({ ...SHORE('night'), ...NONE, hut: 'built', ...at('fisherman', 'sand'), mermaid_here: false, soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        // a black wave comes in and lays her at his feet
        await s.move('wave', 0.75, { over: 2.5, ease: 'in' });
        put(s, { ...at('mermaid', 'sand'), mermaid_do: 'lie_still', mermaid_mood: 'eyes_closed' });
        s.set('mermaid_here', true);
        await s.move('wave', 0, { over: 3, ease: 'out' });
        await P.cut(s, SHORE_SAND);
        await P.tell(s, 'wave_lays:laid', 2);
      },
    },
    kneel_kiss: {
      after: ['dawn_shore', 'wave_lays'],
      from: () => ({ ...SHORE('dawn'), ...NONE, hut: 'built', ...at('fisherman', 'sand'), ...at('mermaid', 'sand'), mermaid_do: 'lie_still',
        mermaid_mood: 'eyes_closed', soul_here: false, ...SHORE_SAND }),
      run: async s => {
        P.open(s, { ...at('fisherman', 'sand'), fisherman_with: null, ...SHORE_SAND });
        const him = s.person('fisherman');
        him.look('mermaid');
        await him.do('kneel');
        await him.do('bend_over');
        await P.tell(s, 'kneel_kiss:kiss', 2);
      },
    },
    sea_comes: {
      after: 'kneel_kiss',
      from: () => ({ ...SHORE('dawn'), ...NONE, hut: 'built', ...at('fisherman', 'sand'), fisherman_do: 'kneel', ...at('mermaid', 'sand'), mermaid_do: 'lie_still',
        soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        P.open(s, WIDE_SHORE);
        // the sea darkens and comes
        await s.move('wave', 0.3, { over: 4 });
        await P.tell(s, 'sea_comes:dark', 1);
        // (the children run up the shore, if they are there)
        if (s.get('children')) {
          for (const id of ['widow_girl', 'widow_boy']) s.set(`${id}_here`, true);
          P.go(s, 'widow_girl', [[-1, -8]], null, 'run');
          P.go(s, 'widow_boy', [[-1.6, -8.4]], null, 'run');
        }
        await P.tell(s, 'sea_comes:run', 3);
      },
    },
    covered: {
      after: 'sea_comes',
      from: () => ({ ...SHORE('dawn'), ...NONE, hut: 'built', wave: 0.3, ...at('fisherman', 'sand'), fisherman_do: 'kneel', ...at('mermaid', 'sand'),
        mermaid_do: 'lie_still', soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        P.open(s, WIDE_SHORE);
        await s.move('wave', 1, { over: 3, ease: 'in' });
        await P.tell(s, 'covered:end', 3);
      },
    },
    wrap: {
      after: 'sea_comes',
      from: () => ({ ...SHORE('dawn'), ...NONE, hut: 'built', wave: 0.3, ...at('fisherman', 'sand'), fisherman_do: 'kneel', ...at('mermaid', 'sand'),
        mermaid_do: 'lie_still', soul_here: false, ...SHORE_SAND }),
      run: async s => {
        P.open(s, SHORE_SAND);
        // he wraps her in his net
        await s.wait(2);
        s.set('mermaid_here', false);
        s.set('bundle', true);
        s.set('drag', 0);
        await P.tell(s, 'wrap:end', 2);
        // he stands, his hands on the rope, ready to draw it (М8б)
        s.person('fisherman').do('stand', { loop: true });
        put(s, { fisherman_a: -0.5, fisherman_d: 0.2, fisherman_turn: 70 });
        s.set('fisherman_reach', { r: 'bundle#rope', l: 'bundle#rope' });
      },
    },
    fall_by: {
      after: 'wrap',
      from: () => ({ ...SHORE('dawn'), ...NONE, hut: 'built', wave: 0.3, bundle: true, drag: 1, ...at('fisherman', 'field'), mermaid_here: false,
        soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        P.open(s, { ...WIDE_SHORE, drag: 1, fisherman_reach: null });
        // the wave strikes the hut and carries it off
        await s.move('wave', 0.9, { over: 2.5, ease: 'in' });
        s.set('hut', 'gone');
        await P.tell(s, 'fall_by:hut', 0.5);
        await s.move('wave', 0.3, { over: 3 });
        // up at the field's edge he drops down beside her
        P.frame(s, SHORE_FIELD, 2);
        put(s, at('fisherman', 'field'));
        await s.person('fisherman').do('fall_beside');
        await P.tell(s, 'fall_by:fell', 2);
      },
    },
    // «Белые цветы» on the shore
    morning_two: {
      from: () => ({ ...SHORE('morning'), ...NONE, mist: 1, lantern_at: 'post', hut: 'gone', ...at('fisherman', 'sand'), fisherman_a: 0.9, fisherman_d: 0.55,
        fisherman_do: 'lie_still', ...at('mermaid', 'sand'), mermaid_do: 'lie_still', mermaid_mood: 'eyes_closed', ...at('priest', 'shore'), priest_a: -4,
        priest_d: -3, soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        P.loop(s, 'fisherman', 'lie_still');
        // holding her — or (apart) beside her, fingers almost touching
        s.set('fisherman_reach', s.get('apart') ? { r: [1.0, 0.8, 0.05] } : { r: 'mermaid#hand_l' });
        // the Priest walks down the shore to bless the sea, and stops by them
        await P.go(s, 'priest', [PLACES.priest.shore.at], 80);
        s.person('priest').look('mermaid');
        P.frame(s, SHORE_SAND, 2);
        await P.tell(s, 'morning_two:stop', 3);
      },
    },
    field_corner: {
      from: () => ({ ...SHORE('noon'), ...NONE, linen: true, hut: 'gone', fisherman_here: false, mermaid_here: false, soul_here: false,
        ...at('widow_girl', 'field'), widow_girl_a: -1.5, widow_girl_d: -7, ...at('widow_boy', 'field'), widow_boy_a: -1.0, widow_boy_d: -7.2,
        ...SHORE_FIELD }),
      run: async s => {
        // the widow's children come and lay shells there — or nobody
        const lay = s.get('shells');
        s.set('shells', false);
        if (lay) {
          for (const id of ['widow_girl', 'widow_boy']) s.set(`${id}_here`, true);
          await s.all(P.go(s, 'widow_girl', [PLACES.widow_girl.field.at], 300), P.go(s, 'widow_boy', [PLACES.widow_boy.field.at], 300));
          await s.all(s.person('widow_girl').do('lay_down'), s.person('widow_boy').do('lay_down'));
          s.set('shells', true);
        } else {
          for (const id of ['widow_girl', 'widow_boy']) s.set(`${id}_here`, false);
          await s.wait(6);
        }
        await P.tell(s, 'field_corner:end', 2);
      },
    },
    // «Фонарь на мостках» on the shore
    mound_morning: {
      from: () => ({ ...SHORE('morning'), ...NONE, mound: true, hut: 'gone', knife: 'none', fisherman_a: -1.0, fisherman_d: -6.5, fisherman_at: 'field',
        fisherman_placed: 'field', fisherman_with: ['knife_rusty'], mermaid_here: false, soul_here: false, ...WIDE_SHORE }),
      run: async s => {
        const him = s.person('fisherman');
        // he comes up with the knife and sets it at the mound's head
        await P.go(s, 'fisherman', [[-3.7, -11.2]], 70);
        P.frame(s, SHORE_FIELD, 2);
        await him.do('lay_down');
        s.set('fisherman_with', null);
        s.set('knife', 'mound');
        await P.tell(s, 'mound_morning:knife', 1);
        // and sits down beside it
        P.loop(s, 'fisherman', 'sit_ground');
        await P.tell(s, 'mound_morning:sat', 3);
      },
    },
    priest_mound: {
      after: 'mound_morning',
      from: () => ({ ...SHORE('morning'), ...NONE, mound: true, hut: 'gone', knife: 'mound', fisherman_a: -3.7, fisherman_d: -11.2, fisherman_at: 'field',
        fisherman_placed: 'field', fisherman_turn: 70, fisherman_do: 'sit_ground', ...at('priest', 'mound'), priest_a: 1, priest_d: -9, mermaid_here: false,
        soul_here: false, ...SHORE_FIELD }),
      run: async s => {
        P.open(s, { ...at('priest', 'mound'), priest_a: 1, priest_d: -9, ...SHORE_FIELD });
        const priest = s.person('priest');
        // the Priest comes up to the mound
        await P.go(s, 'priest', [PLACES.priest.mound.at], 250);
        priest.look('fisherman');
        await P.tell(s, 'priest_mound:who', 4);
        // «Begone!» — the Fisherman does not get up
        await priest.do('point_away');
        await P.tell(s, 'priest_mound:begone', 2);
        await P.go(s, 'priest', [[3, -9]]);
        s.set('priest_here', false);
        await P.tell(s, 'priest_mound:gone', 1);
      },
    },
  };
  return film;
}
return { film, LIGHT, VIEW, PLACES, surge, dragged, DRAG };
