// «At Sea» — what the paintings and the script share. Open water round the boat (the floor far down); the island
// itself is a picture far off (the card `island`): its waterline, for the storm's foam, is along it. The boat: its
// unseen anchor `hull` amidships (it pitches), the deck plane `boat` and everything of it on it, metres from the
// deck's middle (across, toward the stern); the camera rides `eye`, in the bow, looking aft.
const WATER = 0;
const ground = () => -30;
const edge = [];
for (let a = -110; a <= 85; a += 1.5) edge.push([a, 81.5]);
// the people's places in the boat (the island's places(): `<id>_at`), in the boat's frame, facing the bow (the way it
// goes): seated on the thwarts (`on` the hull, the seat's top 0.42 m over the deck), Sophia on the bow on the deck
const SEAT = 0.42;
const PLACES = {
  grandma: {
    seat: { at: [0.45, 0.1], turn: 180, on: { on: 'hull', at: [0.45, -0.2, SEAT] }, do: 'sit_stone' },
    hand: { at: [0.45, 0.1], turn: 180, on: { on: 'hull', at: [0.45, -0.2, SEAT] }, do: 'sit_stone', reach: { l: 'sophia#hand_r' } },
  },
  sophia: {
    bow: { at: [-0.2, -0.9], turn: 180, do: 'sit_look' },
    beside: { at: [-0.4, 0.1], turn: 180, on: { on: 'hull', at: [-0.4, -0.2, SEAT] }, do: 'seated' },
    hand: { at: [-0.1, 0.1], turn: 180, on: { on: 'hull', at: [-0.1, -0.2, SEAT] }, do: 'seated', look: 'grandma', reach: { r: 'grandma#hand_l' } },
  },
  papa: { stern: { at: [-0.75, 3.7], turn: 180, on: { on: 'hull', at: [-0.75, 3.9, SEAT] }, do: 'seated', look: 'grandma' } },
};
// the boat's side seen from inside (its x along the side, from the bow's corner aft; up from the deck): grey-white
// planking, a few ribs, the dark gunwale; `len` long, 0.75 m to the gunwale
function side(g, len) {
  g.fillStyle = '#c9c6be';
  g.fillRect(0, -0.75, len, 0.85);
  g.strokeStyle = 'rgba(120,116,108,0.25)';
  g.lineWidth = 0.01;
  for (let y = -0.45; y < 0.1; y += 0.22) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(len, y);
    g.stroke();
  }
  g.fillStyle = '#b6b0a6';
  for (let x = 0.5; x < len; x += 1.1) g.fillRect(x, -0.72, 0.05, 0.82);
  g.fillStyle = '#4a4f55';
  g.fillRect(0, -0.8, len, 0.09);
}
// the sea's mirror on a still day (the island's weather moves it by the storm and the calm)
const MIRROR = { strength: 0.45, rough: 0.25, ripple: 0.2 };

// ── the pieces (stage 5: notes.md «Pieces»; played by the world's `beats`) ──────────────────────────────
// In the boat's frame (across, toward the stern); the camera rides `eye` in the bow, looking aft. Where Sophia and
// Grandmother sit is the play's (`sophia_at`, `grandma_at`); the pieces put them there, and move only what is theirs.
const BOAT_D = 6.6;
const AWAY = 360;
const turnTo = (a, d, a2, d2) => (Math.atan2(a2 - a, d2 - d) * 180 / Math.PI + 360) % 360;
function AT(id, at, more = {}) {
  const named = typeof at === 'string';
  const p = named ? PLACES[id][at] : { at, turn: more.turn ?? 180 };
  const { turn, ...rest } = more;
  return {
    ...(named ? { [`${id}_at`]: at, [`${id}_placed`]: at } : {}),
    [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_turn`]: p.turn, [`${id}_look`]: p.look ?? null, [`${id}_reach`]: p.reach ?? null,
    [`${id}_on`]: p.on ?? null, [`${id}_do`]: p.do ?? null, [`${id}_with`]: null, [`${id}_wear`]: null, [`${id}_gait`]: null, ...rest,
  };
}
const VIEW = { camera_target: null, camera_shot: null, camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_yaw: 0,
  camera_h: 0, camera_look: 0 };
// the camera, riding the eye in the bow, brought nearer one at [across, along] of the boat: `dist` metres from them along
// the line from the eye, turned to them, `h` metres lower, the gaze lowered `look` (their faces are to the bow: to it)
const EYE_Z = -3.2;
const BNEAR = ([a, z], dist, h = 0, look = 0) => {
  const dz = z - EYE_Z;
  const k = Math.max(0, 1 - dist / Math.hypot(a, dz));
  return { ...VIEW, camera_x: a * k, camera_z: dz * k, camera_yaw: Math.atan2(a, dz) * 180 / Math.PI, camera_h: -h, camera_look: look };
};
const CAM = ['camera_x', 'camera_z', 'camera_yaw', 'camera_h', 'camera_look'];
const SAY = (...lines) => lines.reduce((t, l) => t + 0.3 + 0.06 * l.length, 0);
// the camera turned from the boat toward a point of the world (the island's window, the cape, the new house) when the
// boat is `island` out: its yaw (degrees, + right) — the boat's frame looks the way the world's distance grows
const YAW = ([a, d], island) => Math.atan2(a, d - (BOAT_D - AWAY * island)) * 180 / Math.PI;
const WINDOW = [-26, 82];
const CAPE = [72, 81];
const NEW_HOUSE = [-92, 112];

function film(scene) {
  const get = k => scene.get(k);
  // the people where the play seats them (the pieces' `from`)
  const SEATS = () => ({ ...AT('grandma', get('grandma_at') ?? 'seat'), ...AT('sophia', get('sophia_at') ?? 'beside'), ...AT('papa', 'stern') });
  // where one sits now (their place), and the shots of them: close (the face), medium (to the waist)
  const at = id => [get(`${id}_a`) ?? 0, get(`${id}_d`) ?? 0];
  const CLOSE = id => BNEAR(at(id), 1.3, id === 'papa' ? 0.1 : 0.3, 0.04);
  const MEDIUM = id => BNEAR(at(id), 2.0, 0.2, 0.06);
  const HANDS = () => BNEAR([(at('grandma')[0] + at('sophia')[0]) / 2, at('grandma')[1]], 1.6, 0.55, 0.14);
  const dolly = (s, cam, over = 2.5) => {
    s.set('camera_target', null);
    return s.all(...CAM.map(k => s.move(k, cam[k] ?? 0, { over })));
  };
  const cutTo = async (s, values) => {
    const shot = s.shot(values);
    await s.until(() => shot.ready);
    shot.cut();
  };
  const put = (s, id, at) => {
    for (const [k, v] of Object.entries(AT(id, at, Array.isArray(at) ? { turn: get(`${id}_turn`) } : {}))) s.set(k, v);
  };
  const tell = async (s, moment, wait = 0) => {
    s.tell(moment);
    if (wait) await s.wait(wait);
  };
  return {
    aboard: {
      from: () => ({ ...VIEW, island: 0.15, sway: 0, ...SEATS() }),
      run: async s => {
        s.move('island', 0.25, { over: 6, ease: 'in' });
        await s.wait(1);
        await tell(s, 'aboard:motor', 1.5);
        if (get('counted')) {
          s.person('sophia').look('grandma');
          await cutTo(s, CLOSE('sophia'));
          await tell(s, 'aboard:count', 3);
        } else await tell(s, 'aboard:count');
      },
    },
    come_over: {
      from: () => ({ ...VIEW, island: 0.2, sway: 0, ...AT('grandma', 'seat'), ...AT('sophia', 'bow'), ...AT('papa', 'stern') }),
      run: async s => {
        s.move('island', 0.35, { over: 9, ease: 'in' });
        await s.wait(3);
        s.person('sophia').look('grandma');
        await s.person('sophia').do('rise_floor');
        put(s, 'sophia', [-0.2, -0.9]);
        await s.person('sophia').walk([[-0.1, 0.05]]);
        put(s, 'sophia', 'hand');
        put(s, 'grandma', 'hand');
        await tell(s, 'come_over:sat', 1.5);
        await cutTo(s, HANDS());
      },
    },
    hand_in_hand: {
      from: () => ({ ...VIEW, island: 0.2, sway: 0, ...AT('grandma', 'hand'), ...AT('sophia', 'hand'), ...AT('papa', 'stern') }),
      run: async s => {
        await s.wait(1.5);
        await cutTo(s, HANDS());
      },
    },
    eyes_closed: {
      after: ['come_over', 'hand_in_hand'],
      from: () => ({ ...VIEW, island: 0.35, ...AT('grandma', 'hand'), ...AT('sophia', 'hand'), ...AT('papa', 'stern') }),
      run: async s => {
        s.move('island', 0.6, { over: 10, ease: 'linear' });
        await dolly(s, VIEW, 2);
        s.person('grandma').mood('eyes_closed');
        await cutTo(s, CLOSE('grandma'));
        await tell(s, 'eyes_closed:smile', 5);
      },
    },
    swell: {
      from: () => ({ ...VIEW, island: 0.25, sway: 0.6, ...SEATS() }),
      run: async s => {
        await s.wait(0.8);
        await cutTo(s, MEDIUM('grandma'));
      },
    },
    motor: {
      from: () => ({ ...VIEW, island: 0.3, sway: 0, ...SEATS() }),
      run: async s => {
        await s.move('island', 0.45, { over: 3, ease: 'linear' });
        await tell(s, 'motor:go');
      },
    },
    look_house: {
      from: () => ({ ...VIEW, island: 0.45, ...SEATS() }),
      run: async s => {
        s.person('sophia').look('new_house#windows');
        await cutTo(s, CLOSE('sophia'));
        await s.wait(0.8);
        await dolly(s, { ...VIEW, camera_yaw: YAW(NEW_HOUSE, 0.45) }, 2);
        await tell(s, 'look_house:look', 1);
      },
    },
    cat_gift: {
      after: ['look_house'],
      from: () => ({ ...VIEW, island: 0.45, basket: 'cat', ...SEATS() }),
      run: async s => {
        const so = s.person('sophia');
        s.set('cat_bird', true);
        await cutTo(s, BNEAR([-0.85, -0.9], 1.4, 0.6, 0.12));
        await tell(s, 'cat_gift:bird', 2);
        so.look('cat#cat');
        so.mood('disgusted');
        so.reach({ r: [-0.85, -0.95, 0.5] });
        await s.wait(1);
        s.set('cat_bird', false);
        so.reach({ r: [-1.5, -0.6, 0.3] });
        await tell(s, 'cat_gift:over', 1.5);
        so.mood('smile');
        so.reach({ r: 'cat#back' });
        await tell(s, 'cat_gift:stroke', 3);
        so.reach(null);
      },
    },
    sky: {
      after: ['look_house', 'cat_gift'],
      from: () => ({ ...VIEW, island: 0.45, ...SEATS() }),
      run: async s => {
        const mark = get('storm_mark');
        if (mark === 'porch') {
          s.person('sophia').look([0, 10, 8]);
          s.person('sophia').mood('laugh');
          await cutTo(s, CLOSE('sophia'));
        } else if (mark === 'blanket') {
          s.set('papa_with', ['blanket_fold']);
          s.set('papa_do', null);
          s.set('papa_on', null);
          await s.person('papa').walk([[0.0, 0.8]]);
          await s.person('papa').do('drape');
          s.set('papa_with', null);
          s.set('grandma_with', ['blanket_round']);
          s.set('sophia_with', ['blanket_round']);
        } else {
          await cutTo(s, MEDIUM('sophia'));
          await s.person('sophia').do('fold_hands');
        }
        await tell(s, 'sky:sign', 1.5);
      },
    },
    window_talk: {
      after: ['look_house', 'cat_gift', 'sky'],
      from: () => ({ ...VIEW, island: 0.5, ...SEATS() }),
      run: async s => {
        const gm = s.person('grandma');
        const hat = get('sign_hat');
        gm.look(hat === 'bag' ? 'papa' : hat === 'on' ? 'sophia#head' : 'island#window');
        await cutTo(s, CLOSE('grandma'));
        await tell(s, 'window_talk:look', 2);
        gm.look('papa');
        await tell(s, 'window_talk:said', SAY('She wouldn’t have let herself be led either') + 2.5);
        s.person('papa').look('grandma');
        await cutTo(s, CLOSE('papa'));
        await tell(s, 'window_talk:papa', SAY('She wouldn’t'));
        s.person('sophia').look('grandma');
        await cutTo(s, CLOSE('sophia'));
        await s.wait(1);
        s.person('sophia').look('papa');
        await tell(s, 'window_talk:sophia', 2);
        if (get('song')) {
          await cutTo(s, MEDIUM('grandma'));
          await tell(s, 'window_talk:song', 6);
        }
      },
    },
    tent_talk: {
      after: ['look_house', 'cat_gift', 'sky'],
      from: () => ({ ...VIEW, island: 0.5, ...SEATS() }),
      run: async s => {
        s.person('sophia').look('papa');
        s.person('sophia').mood('smile');
        await cutTo(s, MEDIUM('sophia'));
        await tell(s, 'tent_talk:tell', 4);
        await tell(s, 'tent_talk:mama', SAY('…and Mama would have got into the tent too!') + 1);
        s.person('sophia').mood('sad');
        s.set('papa_do', null);
        s.set('papa_on', null);
        await s.person('papa').walk([[-0.6, 0.9]]);
        s.person('papa').reach({ r: 'sophia#head' });
        await cutTo(s, CLOSE('sophia'));
        await tell(s, 'tent_talk:hand', 3);
        await dolly(s, VIEW, 2);
        await tell(s, 'tent_talk:again', SAY('Next summer again!', 'Again', 'We’ll see'));
        await tell(s, 'tent_talk:once', get('late_form') ? SAY('Why only once?') + 2 : 0);
      },
    },
    oars_boat: {
      after: ['look_house', 'cat_gift', 'sky'],
      from: () => ({ ...VIEW, island: 0.15, dinghy: true, ...AT('grandma', [1.0, 0.6], { turn: 270 }),
        ...AT('sophia', PLACES.sophia.bow.at, { turn: 180, sophia_do: PLACES.sophia.bow.do }), ...AT('papa', [0.6, 0.9], { turn: 90 }) }),
      run: async s => {
        s.person('papa').reach({ r: 'grandma#elbow_l' });
        await tell(s, 'oars_boat:board', 2);
        put(s, 'grandma', get('grandma_at') ?? 'seat');
        if (!get('learned')) {
          await cutTo(s, CLOSE('papa'));
          await tell(s, 'oars_boat:tremble', 3);
          if (get('nets') === 'net') s.person('papa').reach({ r: 'grandma#hand_r' });
          await tell(s, 'oars_boat:hand', get('nets') === 'net' ? 3 : SAY('Mamma?', 'I’ll tell you later'));
        }
        s.person('papa').reach(null);
        put(s, 'sophia', get('sophia_at') ?? 'beside');
        await dolly(s, VIEW, 1.5);
        await tell(s, 'oars_boat:seat', 2);
        if (get('counted')) {
          await cutTo(s, CLOSE('sophia'));
          await tell(s, 'oars_boat:count', 3);
        }
        if (get('ask_mama')) {
          s.person('sophia').look('papa');
          await cutTo(s, CLOSE('sophia'));
          await tell(s, 'oars_boat:ask', SAY('Did Mama row like that?') + 3);
          await cutTo(s, CLOSE('papa'));
          await tell(s, 'oars_boat:better', SAY('Better'));
        } else {
          await s.person('papa').walk([[0.4, 3.0], [0.4, 4.3]]);
          await s.person('papa').do('tie');
          await tell(s, 'oars_boat:tie', 1);
          await s.person('papa').walk([PLACES.papa.stern.at]);
          put(s, 'papa', 'stern');
        }
      },
    },
    promise: {
      after: ['window_talk', 'tent_talk', 'oars_boat', 'shawl_talk', 'sky'],
      from: () => ({ ...VIEW, island: 0.55, ...SEATS() }),
      run: async s => {
        const so = s.person('sophia');
        if (get('mama') === 'sky') {
          so.look('grandma');
          await cutTo(s, CLOSE('sophia'));
          await tell(s, 'promise:said', SAY('You promised: not soon', 'I did', 'Promise again'));
          await cutTo(s, CLOSE('grandma'));
          await tell(s, 'promise:silent', SAY('Greedy') + 1.5);
          so.look([-1.5, -2, 0.8]);
          await cutTo(s, MEDIUM('sophia'));
          await tell(s, 'promise:away', 2);
        } else if (get('mama') === 'moon') {
          so.look('grandma');
          await cutTo(s, CLOSE('sophia'));
          await tell(s, 'promise:whisper', SAY('You never did tell me where Mama is'));
          s.person('grandma').reach({ r: [1.8, 1.0, -0.3] });
          await cutTo(s, MEDIUM('grandma'));
          await tell(s, 'promise:point', SAY('Look', '“Look” again!'));
          so.look([2.5, 2, -0.4]);
          await tell(s, 'promise:looks', 2.5);
          s.person('grandma').reach(null);
        }
      },
    },
    window_last: {
      after: ['window_talk', 'promise'],
      from: () => ({ ...VIEW, island: 0.55, ...SEATS() }),
      run: async s => {
        await tell(s, 'window_last:narrator');
        s.move('fog', 0.85, { over: 12 });
        s.move('island', 1, { over: 12, ease: 'inOut' });
        await dolly(s, { ...VIEW, camera_yaw: YAW(WINDOW, 0.7), camera_h: 0.3 }, 6);
        await s.until(() => (get('island') ?? 0) >= 0.99);
        await tell(s, 'window_last:window', 1);
      },
    },
    oars_last: {
      after: ['oars_boat', 'promise', 'sky'],
      from: () => ({ ...VIEW, island: 0.55, ...SEATS() }),
      run: async s => {
        s.move('fog', 0.85, { over: 10 });
        s.move('island', 1, { over: 10, ease: 'inOut' });
        const where = get('sophia_at');
        await cutTo(s, where === 'hand' ? HANDS() : BNEAR(at('grandma'), 1.5, 0.55, 0.14));
        await s.until(() => (get('island') ?? 0) >= 0.99);
        await tell(s, 'oars_last:hands', 1.5);
      },
    },
    shawl_talk: {
      after: ['look_house', 'cat_gift', 'sky'],
      from: () => ({ ...VIEW, island: 0.5, ...SEATS() }),
      run: async s => {
        const so = s.person('sophia');
        so.look(get('called') ? 'papa' : 'grandma');
        await cutTo(s, MEDIUM('sophia'));
        await tell(s, 'shawl_talk:tell', get('called') ? SAY('I called. Nobody came. It was frightening. Then morning') : 5);
        if (get('called')) {
          s.person('papa').look('grandma');
          await cutTo(s, CLOSE('papa'));
        }
        await tell(s, 'shawl_talk:papa', get('called') ? 2.5 : 0);
        await tell(s, 'shawl_talk:knock', get('knock') ? SAY('You didn’t knock') : 0);
        await cutTo(s, CLOSE('grandma'));
        await tell(s, 'shawl_talk:silent', 2.5);
        so.look('island#cape');
        await dolly(s, { ...VIEW, camera_yaw: YAW(CAPE, 0.5) }, 3);
        await tell(s, 'shawl_talk:patch', SAY('What’s that?', 'A stone'));
      },
    },
  };
}
return { WATER, ground, edge, PLACES, side, MIRROR, film };
