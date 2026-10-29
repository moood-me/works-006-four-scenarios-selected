// What the town's houses share: a house painted flat, its front toward the viewer — plain limewashed walls, a steep
// roof, windows in rows, some lit (their glass warm and glowing: e.light, a glow and a little light of its own), a
// door. In metres, its foot's middle at the origin. `k` — the kind: its width, its floors, the eave and the ridge, how
// many windows a floor, which of them are lit (by `seed`)
function house(g, e, k) {
  const hash = (n, s) => anim.hash(n, k.seed * 37 + s);
  const w = k.width;
  const eave = k.eave;
  g.fillStyle = k.wall;
  g.fillRect(-w / 2, -eave, w, eave);
  // a darker plinth and the shade under the eave
  g.fillStyle = 'rgba(70, 60, 52, 0.35)';
  g.fillRect(-w / 2, -0.5, w, 0.5);
  g.fillStyle = 'rgba(40, 34, 30, 0.3)';
  g.fillRect(-w / 2, -eave, w, 0.25);
  // the roof: a gable over the front, or a hip seen from the front
  g.fillStyle = k.roof;
  g.beginPath();
  g.moveTo(-w / 2 - 0.3, -eave + 0.05);
  if (k.hip) {
    g.lineTo(-w / 2 + 1.2, -k.ridge);
    g.lineTo(w / 2 - 1.2, -k.ridge);
  } else {
    g.lineTo(0, -k.ridge);
  }
  g.lineTo(w / 2 + 0.3, -eave + 0.05);
  g.closePath();
  g.fill();
  // a chimney
  g.fillRect(w * 0.18, -k.ridge + 0.3, 0.45, 1.2);
  // the windows: rows of them, lit or dark
  const cols = k.cols;
  let n = 0;
  for (let f = 0; f < k.floors; f++) {
    const y = -1.15 - f * 2.4 - 1.1;
    for (let c = 0; c < cols; c++) {
      const x = -w / 2 + (w * (c + 0.5)) / cols - 0.35;
      if (f === 0 && c === k.door) {
        g.fillStyle = '#3a2e28';
        g.fillRect(x - 0.05, -2.1, 0.8, 2.1);
        continue;
      }
      const lit = hash(n++, 1) < k.lit;
      g.fillStyle = '#4a3c32';
      g.fillRect(x - 0.06, y - 0.06, 0.82, 1.27);
      g.fillStyle = lit ? '#ffd08a' : '#2c3442';
      g.fillRect(x, y, 0.7, 1.15);
      g.fillStyle = '#4a3c32';
      g.fillRect(x + 0.33, y, 0.04, 1.15);
      g.fillRect(x, y + 0.52, 0.7, 0.04);
      if (lit) e.light(x + 0.35, y + 0.6, 0.8, '#ffc070', 1.6 + 0.6 * hash(n, 2), `w${n}`);
    }
  }
}
// the hours (hours.md): the numbers each word of `time` sets
const TIME = {
  night: { dusk: 0, dawn: 0, day: 0 },
  evening: { dusk: 1, dawn: 0, day: 0 },
  morning: { dusk: 0, dawn: 0, day: 1 },
};
// the people's named places (places.md): at — [across, distance], turn, on — a seat. The lane before the bridge's head
// (where he comes off it), under the bridge's end on the landing by the water (3.1), the bridge's head, its middle, before
// the potter's stall, before his door (the door at 7.4 on the right), the doorway; the beggar sat against the far
// parapet midway (on a stone step at its foot), facing the road
const LANE = { at: [-0.5, 8.4], turn: 110 };
const UNDER = { at: [-2.3, 11.6], turn: 250 };
const HEAD = { at: [-0.8, 12.2], turn: 270 };
const MID = { at: [-11.6, 12.0], turn: 270 };
const STALL = { at: [1.0, 9.6], turn: 60 };
const DOOR = { at: [1.75, 7.4], turn: 90 };
const PLACES = {
  fisherman: { lane: LANE, under: UNDER, head: HEAD, mid: MID, stall: STALL, door: DOOR },
  soul: { lane: LANE, under: UNDER, head: HEAD, mid: MID, stall: STALL, door: DOOR },
  potter: { door: { at: [1.8, 7.6], turn: 235 }, stall: { at: [2.25, 10.5], turn: 250 }, doorway: { at: [2.35, 7.4], turn: 270 } },
  beggar: { parapet: { at: [-9.2, 13.55], turn: 180, on: [-9.2, 13.5, 3.82] } },
};
// The bridge's pieces (the game's contract, game.md «Stage 5 — pieces»; notes.md «Pieces»): played by the world's
// `beats` from the script. `film(scene)` → {name: {from, after, run}}.
function film(scene) {
  const P = kit.pieces;
  const at = (id, name) => P.at(PLACES, id, name);
  const DO0 = { fisherman_do: null, potter_do: null, soul_do: null, fisherman_reach: null, potter_reach: null, square: false, door: 1, door_turn: 350 };
  // the potter at his door with his daughter by the hand (stage 2's look)
  const HOME = { ...at('potter', 'door'), potter_reach: { l: 'daughter#hand_r' }, daughter_reach: { r: 'potter#hand_l' }, daughter_a: 2.15, daughter_d: 7.0 };
  // on the bridge: its road at 12 m out (the middle at −11.6, the head at −0.8)
  const ROAD_FAR = [-20, 12.0];
  // the beggar's piece is filmed from the camera's own place on the bridge's road (a `walk` scene's operator films from
  // the viewer's side: the Fisherman facing the far parapet would be his back, the bowl hidden behind him): looking
  // along the road toward the far bank, the middle ahead; and down at the bowl. Heights over the road (the `deck` walk
  // plane is the floor under the eye)
  const ON_ROAD = { ...P.CAM0, camera_x: -5.2, camera_z: 12.0, camera_yaw: 270, camera_h: -0.1 };
  const AT_BOWL = { ...P.CAM0, camera_x: -7.4, camera_z: 12.7, camera_yaw: 268, camera_h: -0.5, camera_look: 0.18 };
  const film = {
    // ── Prologue: the morning market ──
    market: {
      from: () => ({ ...TIME.morning, time: 'morning', ...DO0, ...at('potter', 'stall'), potter_look: 'fisherman', ...at('fisherman', 'mid'),
        fisherman_with: ['fish'], ...P.CAM0 }),
      run: async s => {
        const him = s.person('fisherman');
        // he comes off the bridge to the potter's stall, gives the fish, takes the coins without counting them
        await P.go(s, 'fisherman', [[-0.8, 12.2], PLACES.fisherman.stall.at], 60);
        him.look('potter');
        P.frame(s, P.shot('fisherman', 'medium', [0.4, 0.42]), 2);
        await him.do('hold_out');
        s.set('fisherman_with', null);
        await P.tell(s, 'market:give', 1);
        // and walks back over the bridge
        P.frame(s, P.CAM0, 2.5);
        him.look(null);
        await P.go(s, 'fisherman', [[-0.8, 12.2], [-8, 12.0]]);
        await P.tell(s, 'market:end', 0.5);
      },
    },
    // ── Chapter III «Город» ──
    under_bridge: {
      from: () => ({ ...TIME.evening, time: 'evening', ...DO0, ...HOME, ...at('fisherman', 'under'), fisherman_with: ['lantern'], fisherman_do: 'sit_ground',
        fisherman_look: [-6, 14, 1.0], ...P.shot('fisherman', 'full', [0.5, 0.5]) }),
      run: async s => {
        P.loop(s, 'fisherman', 'sit_ground');
        await P.tell(s, 'under_bridge:sat', 5);
      },
    },
    over_bridge: {
      from: () => ({ ...TIME.night, time: 'night', ...DO0, ...HOME, fisherman_with: ['lantern'], fisherman_a: -14, fisherman_d: 12.0, fisherman_turn: 90,
        fisherman_placed: 'mid', fisherman_at: 'mid', ...P.CAM0 }),
      run: async s => {
        await P.tell(s, 'over_bridge:walk');
        await P.go(s, 'fisherman', [PLACES.fisherman.head.at], 70);
        s.set('fisherman_at', 'head');
        s.set('fisherman_placed', 'head');
        s.person('fisherman').look([4, 60, 12]);
        await P.tell(s, 'over_bridge:head', 2);
      },
    },
    square: {
      from: () => ({ ...TIME.night, time: 'night', ...DO0, square: true, ...at('potter', 'stall'), potter_look: 'fisherman', potter_reach: null,
        musician_a_do: 'play_fiddle', musician_b_do: 'play_pipe', ...at('fisherman', 'head'), fisherman_with: ['lantern'], ...P.CAM0 }),
      run: async s => {
        P.loop(s, 'musician_a', 'play_fiddle');
        P.loop(s, 'musician_b', 'play_pipe');
        await P.go(s, 'fisherman', [PLACES.fisherman.stall.at], 60);
        s.person('fisherman').look('potter');
        P.frame(s, P.shot('fisherman', 'medium', [0.4, 0.42]), 2);
        await P.tell(s, 'square:met', 2);
      },
    },
    hand_itself: {
      after: 'square',
      from: () => ({ ...TIME.night, time: 'night', ...DO0, square: true, ...at('potter', 'stall'), potter_look: 'fisherman', potter_reach: null,
        musician_a_do: 'play_fiddle', musician_b_do: 'play_pipe', ...at('fisherman', 'stall'), fisherman_with: ['lantern'], fisherman_look: 'potter',
        ...P.shot('fisherman#hand_r', 'close', [0.5, 0.5]) }),
      run: async s => {
        P.open(s, P.shot('fisherman#hand_r', 'close', [0.5, 0.5]));
        const him = s.person('fisherman');
        // his right hand reaches by itself for the coppers; he looks at it
        him.reach({ r: 'stall#coppers' });
        await s.wait(1.2);
        him.look('fisherman#hand_r');
        await P.tell(s, 'hand_itself:reach', 1.5);
        // catches it with the left and puts it behind his back
        him.reach(null);
        await him.do('wrist_behind');
        await P.tell(s, 'hand_itself:caught', 0.5);
        P.frame(s, P.shot('fisherman', 'close', [0.5, 0.4]), 1.5);
        him.look('potter');
        await s.wait(2);
      },
    },
    shrug_back: {
      after: 'hand_itself',
      from: () => ({ ...TIME.night, time: 'night', ...DO0, square: true, ...at('potter', 'stall'), potter_look: 'fisherman', potter_reach: null,
        musician_a_do: 'play_fiddle', musician_b_do: 'play_pipe', ...at('fisherman', 'stall'), fisherman_with: ['lantern'], fisherman_look: 'potter',
        ...P.shot('potter', 'medium', [0.5, 0.42]) }),
      run: async s => {
        P.open(s, P.shot('potter', 'medium', [0.5, 0.42]));
        await s.person('potter').do('shrug');
        s.person('fisherman').look(null);
        await P.tell(s, 'shrug_back:turn', 0.3);
        P.frame(s, P.CAM0, 2.5);
        await P.go(s, 'fisherman', [[-0.8, 12.2], [-6, 12.0]]);
      },
    },
    bridge_dawn: {
      from: () => ({ ...TIME.morning, time: 'morning', ...DO0, ...HOME, ...at('fisherman', 'head'), fisherman_turn: 270, fisherman_with: ['lantern'], ...P.CAM0 }),
      run: async s => {
        // back over the bridge toward the sea; he stops midway
        await P.go(s, 'fisherman', [PLACES.fisherman.mid.at], 270);
        s.set('fisherman_at', 'mid');
        s.set('fisherman_placed', 'mid');
        P.frame(s, P.shot('fisherman', 'medium', [0.5, 0.42]), 2);
        await P.tell(s, 'bridge_dawn:stop', 3);
        P.frame(s, P.CAM0, 2);
        await P.go(s, 'fisherman', [ROAD_FAR]);
        await P.tell(s, 'bridge_dawn:on', 0.5);
      },
    },
    beggar: {
      from: () => ({ ...TIME.night, time: 'night', ...DO0, ...HOME, ...at('beggar', 'parapet'), beggar_do: 'sleep_wall', beggar_mood: 'eyes_closed',
        fisherman_with: ['lantern'], fisherman_a: -3, fisherman_d: 12.2, fisherman_turn: 270, fisherman_at: 'mid', fisherman_placed: 'mid', ...P.CAM0 }),
      run: async s => {
        const him = s.person('fisherman');
        P.loop(s, 'beggar', 'sleep_wall');
        // he comes to the middle; his hand reaches for the bowl, the other catches it; he stands trembling
        await P.go(s, 'fisherman', [[-8.6, 12.6]], 20);
        him.look('bowl#coins');
        await P.cut(s, ON_ROAD);
        him.reach({ r: 'bowl#coins' });
        await P.tell(s, 'beggar:reach', 2);
        him.reach(null);
        await him.do('wrist_behind');
        await P.tell(s, 'beggar:caught', 1);
        // the bowl rocks, a copper falls into the river; the old man sleeps on
        await P.cut(s, AT_BOWL);
        await s.wait(1.5);
        s.set('copper', (Number(s.get('copper')) || 0) + 1);
        await P.tell(s, 'beggar:copper', 2.5);
      },
    },
    // ── Chapter III «Без него» ──
    soul_town: {
      from: () => ({ ...TIME.evening, time: 'evening', ...DO0, ...HOME, ...at('soul', 'mid'), soul_with: ['lantern'], fisherman_here: false, ...P.CAM0 }),
      run: async s => {
        s.set('fisherman_here', false);
        // the Soul comes off the bridge to the potter at his door
        await P.go(s, 'soul', [[-0.8, 12.2], PLACES.soul.door.at], 90);
        s.person('soul').look('potter');
        s.set('potter_look', 'soul');
        P.frame(s, P.shot('soul', 'medium', [0.4, 0.42]), 2);
        await P.tell(s, 'soul_town:met', 2);
      },
    },
    rumour: {
      from: () => ({ ...TIME.morning, time: 'morning', ...DO0, ...HOME, woman_a_a: 1.55, woman_a_d: 5.0, woman_a_turn: 150, woman_a_look: 'woman_b',
        woman_b_a: 1.0, woman_b_d: 4.5, woman_b_turn: 60, woman_b_look: 'woman_a', fisherman_here: false, ...P.CAM0 }),
      run: async s => {
        s.set('fisherman_here', false);
        s.person('woman_a').do('whisper');
        await P.tell(s, 'rumour:say', 4);
        P.loop(s, 'woman_b', 'whisper');
        await s.wait(3);
      },
    },
    door_potter: {
      from: () => ({ ...TIME.morning, time: 'morning', ...DO0, door: 0, door_turn: 270, ...at('potter', 'doorway'), potter_here: false, daughter_here: false,
        potter_reach: null, daughter_reach: null, ...at('fisherman', 'door'), fisherman_with: ['lantern', 'cup'], ...P.shot('fisherman', 'medium', [0.35, 0.42]) }),
      run: async s => {
        await s.wait(1);
        // the potter opens; the daughter behind him
        await s.move('door', 1, { over: 1.2 });
        s.set('potter_here', true);
        s.set('daughter_a', 2.6);
        s.set('daughter_d', 7.6);
        s.set('daughter_here', true);
        s.person('potter').look('fisherman');
        await P.tell(s, 'door_potter:open', 2);
        // he holds out the cup
        await s.person('fisherman').do('hold_out');
        P.frame(s, P.shot('fisherman#cup', 'medium', [0.45, 0.5]), 1.5);
        await P.tell(s, 'door_potter:cup', 2);
      },
    },
    door_shut: {
      after: 'door_potter',
      from: () => ({ ...TIME.morning, time: 'morning', ...DO0, ...at('potter', 'doorway'), potter_reach: null, daughter_reach: null, daughter_a: 2.6,
        daughter_d: 7.6, ...at('fisherman', 'door'), fisherman_with: ['lantern', 'cup'], ...P.shot('potter', 'medium', [0.5, 0.42]) }),
      run: async s => {
        P.open(s, P.shot('potter', 'medium', [0.5, 0.42]));
        // he takes the cup and shuts the door — slowly, or at once
        s.set('fisherman_with', ['lantern']);
        s.set('potter_with', ['cup']);
        await P.tell(s, 'door_shut:take', 2);
        s.set('potter_here', false);
        s.set('daughter_here', false);
        P.frame(s, P.shot('door_leaf', 'full', [0.5, 0.45]), 1.5);
        await s.move('door', 0, { over: s.get('slow') ? 4 : 0.7, ease: s.get('slow') ? 'inOut' : 'in' });
        await P.tell(s, 'door_shut:shut', 1);
      },
    },
  };
  return film;
}
return { film, house, TIME, PLACES };
