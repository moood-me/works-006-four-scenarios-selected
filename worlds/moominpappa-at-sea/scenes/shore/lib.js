// The beach on the island's lee side, the viewer on the strand close to the water's edge where the Groke comes: the
// sea on the left, a flat strand of wet and dry sand along the water, the sand rising on the right to a low dune, and
// off to the right beyond the dune the granite knoll with the lighthouse (out of the picture: the Groke, facing it,
// is seen side-on).
// Made with the island's shapes (modules/island).
// Metres: across (right +), distance (ahead), the height over the viewer's sand.
// The waterline runs straight ahead at across WATER; the strand is level from it to STRAND metres inland (where the
// Groke sits: her frost lies flat on it), then the sand rises to the dune; under the sea it shelves down.
const { shoreOf } = kit.island;
const WATER = -3.4, STRAND = 4.6, RAW0 = 0.1;
function raw(a, d) {
  const x = a - WATER;
  const shelf = Math.min(x, 0) * 0.3 + Math.min(x + 3, 0) * 0.3;
  const rise = Math.min(Math.max(x - STRAND, 0) * 0.16, 2.2);
  const u = (a - 5.6) / 2.2, v = (d - 7.5) / 6;
  return RAW0 + Math.max(shelf, -2.6) + rise + 1.7 * Math.exp(-u * u - v * v) + knoll(a, d);
}
// the granite knoll the lighthouse stands on
function knoll(a, d) {
  const p = (a - 34) / 10, q = (d - 5) / 9;
  return 6.5 * Math.exp(-p * p - q * q);
}
const H0 = raw(0, 0);
const land = (a, d) => raw(a, d) - H0;
// the sea's level, and the strand's (where the Groke's frost lies)
const SEA = RAW0 - 0.1 - H0, FLAT = RAW0 - H0;
// where the Groke is (groke_at), [across, distance]: far off at the water's edge; nearer the lighthouse, up the strand;
// nearer still; waist-deep in the sea
const SEATS = {
  edge: [-2.9, 6.8],
  near: [-2.3, 6.4],
  closest: [-1.7, 6.1],
  water: [-5.4, 8.2],
};
// where the son stands (troll_at), [across, distance]: far — off to the right, up the sand; near — three steps back from
// the stone; beside — by the Groke on the viewer's side of her (worked out from her place: BESIDE off it)
const TROLL = { far: [2.8, 3.9], near: [0.7, 4.1] };
const BESIDE = [-0.3, -0.95];
// the flat stone at the water's edge, where the lantern is set; the lighthouse's lantern up on the knoll
const STONE = [-0.5, 4.9], LIGHTHOUSE = [34, 5];
// which way one at [a, d] faces to look at [a2, d2] (a person's turn: 0 away from the viewer, 90 to the right)
const turnTo = (a, d, a2, d2) => (Math.atan2(a2 - a, d2 - d) * 180 / Math.PI + 360) % 360;
// where the land meets the sea (the island's painters ask it): fn(across, distance, h) where h is within [lo, hi]
const shore = shoreOf(land, SEA, -20, 40, -8, 70);
// ── the pieces (notes.md: «Pieces»; the world's `beats` plays them by `beat`) ──────────────────────────────
// Where people come from and go to on the beach (across, distance): the way in from the right, over the dune's low end
// from the lighthouse; the water's edge by the stone; Mama's way off along the beach; the dune's path down to the
// stone (the son's, «Следом»); the way from the right up onto the dune's top («До дюны»); the son by the water alone.
const ENTRY = [3.4, 3], NEAR_ENTRY = [1.9, 3.3], WEED = [-3.2, 5.2], AWAY = [-3, 15], SEAHORSE_SPOT = [-3.4, 6.2], SEAHORSES = [-4.6, 5.4];
const AT_STONE = [0.2, 4.4], BACKED = [0.9, 3.7], DUNE_TOP = [5.2, 7.5], OVER_DUNE = [7.6, 9.2];
const DOWN = [[4.6, 6.6], [3, 5.6], [1.6, 5]], PAPA_DOWN = [[6.9, 8.8], [5.6, 7.9], [5.2, 7.5]];
const UP = [[7.6, 3], [6.6, 4.6], [5.6, 6.4], [5.2, 7.5]], ALONE = [-3, 5.4], PAST = [[2, 6.4], [5.2, 7.9], [8.4, 9.6]];
// the lighthouse's lantern room (the Groke looks up to its little light): a point over the land there
const LANTERN_ROOM = [LIGHTHOUSE[0], LIGHTHOUSE[1], 12.6];
const seatOf = at => SEATS[at] ?? SEATS.edge;
// in the shallows off her place, where she comes up out of the sea
const SHALLOWS = at => { const [a, d] = seatOf(at); return [WATER - 0.9, d + 0.5]; };
const besideOf = at => { const [a, d] = seatOf(at); return [a + BESIDE[0], d + BESIDE[1]]; };
// a person put somewhere, standing, as a cut finds them: their place and turn, nothing in the hands, looking ahead,
// on their feet, standing — and anything else given
const AT = (id, [a, d], turn, more = {}) => ({ [`${id}_a`]: a, [`${id}_d`]: d, [`${id}_turn`]: turn, [`${id}_do`]: 'stand',
  [`${id}_with`]: null, [`${id}_look`]: null, [`${id}_gait`]: null, [`${id}_on`]: null, [`${id}_wear`]: null, ...more });
const LOOP = motion => ({ motion, loop: true });
// the point u (0…1) of the way along points, by length
const along = (pts, u) => {
  const seg = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); total += l; }
  let left = Math.max(0, Math.min(1, u)) * total;
  for (let i = 0; i < seg.length; i++) {
    if (left <= seg[i] || i === seg.length - 1) { const k = seg[i] ? Math.min(1, left / seg[i]) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]; }
    left -= seg[i];
  }
  return pts[pts.length - 1];
};
// the camera: the scene's own view (the beach along the water); a person framed
const VIEW = { camera_target: null, camera_shot: null, camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_yaw: 0, camera_h: 0, camera_look: 0 };
// the camera brought nearer one at p: `dist` metres from them along the line the viewer sees them by, turned to them,
// `h` metres lower (one sitting or crouched), the gaze lowered `look` screen heights — the scene's camera put there, no operator (one framing a big seated
// figure close stands inside it)
const NEAR = ([a, d], dist, h = 0, look = 0) => {
  const l = Math.hypot(a, d), k = Math.max(0, 1 - dist / l);
  return { ...VIEW, camera_x: a * k, camera_z: d * k, camera_yaw: Math.atan2(a, d) * 180 / Math.PI, camera_h: -h, camera_look: look };
};
// the camera moved there over seconds; cut there, the shot made ready first (what it shows comes whole)
const CAM_KEYS = ['camera_x', 'camera_z', 'camera_yaw', 'camera_h', 'camera_look'];
const dolly = (s, cam, over = 2.5) => s.all(...CAM_KEYS.map(k => s.move(k, cam[k], { over })));
const cutTo = async (s, values) => {
  const shot = s.shot(values);
  await s.until(() => shot.ready);
  shot.cut();
};
// where the blanket lies: on the sand by the son sitting at [a, d], on the viewer's side of him; where Mama stands to
// lay it, and where she comes from (a few steps off, toward the lighthouse's side)
const BLANKET = ([a, d]) => ({ blanket_a: a + 0.1, blanket_d: d - 0.75 });
const BLANKET_SPOT = ([a, d]) => [a + 0.8, d - 0.95];
const BLANKET_FROM = at => { const [a, d] = BLANKET_SPOT(besideOf(at)); return [a + 1.6, d - 0.6]; };

// The film, for the scene (its keys read as each piece begins). A piece's `from` puts what it does not move itself —
// the people's places, what they do and hold, the camera, the scene's own keys; never the hour, the weather or who is
// here (the game's).
function film(scene) {
  const get = k => scene.get(k);
  // the view, the sea-horses gone if they are (only the day's pieces show them here)
  const view = (more = {}) => ({ ...VIEW, seahorses_away: get('seahorses') === 'gone' ? 1 : 0, ...more });
  const toLight = at => { const [a, d] = seatOf(at); return turnTo(a, d, LIGHTHOUSE[0], LIGHTHOUSE[1]); };
  const toStone = ([a, d]) => turnTo(a, d, STONE[0], STONE[1]);
  // the Groke sitting at her place (groke_at) facing the lighthouse, or the lantern on the stone if it is there
  const grokeSat = (more = {}) => {
    const at = get('groke_at'), p = seatOf(at), lit = get('lantern_stone') !== 'none';
    return AT('groke', p, lit ? toStone(p) : toLight(at), { groke_do: LOOP('sit_look'), groke_mood: 'sad', groke_look: lit ? 'stone#lantern' : LANTERN_ROOM, ...more });
  };
  // the son sitting beside her on the viewer's side, facing as she does
  const trollBeside = (more = {}) => {
    const at = get('groke_at'), p = besideOf(at);
    return { ...AT('troll', p, toLight(at), { troll_do: LOOP('huddle'), ...more }), ...BLANKET(p) };
  };
  // walk one along points at their gait, then turn
  const go = async (s, id, pts, turn, gait = null) => {
    const p = s.person(id);
    p.gait(gait);
    await p.walk(pts);
    p.gait(null);
    if (turn != null) await p.turn(turn);
  };
  return {
    // 2.3: Mama with her basket down to the water for weed, gathering it crouched, then off along the beach
    weed: {
      from: () => ({ ...VIEW, camera_yaw: -8, seahorses_away: 0, ...AT('mama', ENTRY, 250, { mama_with: ['basket'] }) }),
      run: async s => {
        const mama = s.person('mama');
        await go(s, 'mama', [[2, 3.6], WEED], 260, 'hand_walk');
        await mama.do('crouch');
        mama.do('crouched', { loop: true });
        await s.wait(1.5);
        s.tell('weed:water');
        await s.wait(3);
        mama.with(['basket_weed']);
        await mama.do('crouch_rise');
        // (she sets off along the beach: the piece ends as she goes, a few steps on — she walks on after it)
        await go(s, 'mama', [[-3.3, 8]], null, 'hand_walk');
        s.person('mama').walk([AWAY]);
      },
    },
    // 2.3: the son down to the water by the sea-horses, crouching to them
    seahorses: {
      from: () => ({ ...VIEW, camera_yaw: -16, seahorses_away: 0, ...AT('troll', ENTRY, 250, { troll_mood: 'thinking' }) }),
      run: async s => {
        const troll = s.person('troll'), turn = turnTo(...SEAHORSE_SPOT, ...SEAHORSES);
        await go(s, 'troll', [[2, 4.6], SEAHORSE_SPOT], turn);
        troll.look('seahorses');
        await troll.do('crouch');
        troll.do('crouched', { loop: true });
        await dolly(s, NEAR(SEAHORSE_SPOT, 3.2, 0.4));
        s.tell('seahorses:crouch');
        await s.wait(1);
      },
    },
    // 2.3: they laugh and swim off; his face close, looking down — he blushes
    laugh: {
      after: 'seahorses',
      from: () => ({ ...NEAR(SEAHORSE_SPOT, 3.2, 0.4), seahorses_away: 0,
        ...AT('troll', SEAHORSE_SPOT, turnTo(...SEAHORSE_SPOT, ...SEAHORSES), { troll_do: LOOP('crouched'), troll_look: 'seahorses' }) }),
      run: async s => {
        const troll = s.person('troll');
        s.set('seahorses', 'gone');
        await s.move('seahorses_away', 0.5, { over: 3, ease: 'in' });
        s.tell('laugh:gone');
        s.move('seahorses_away', 1, { over: 3, ease: 'linear' });
        // (his face close, blushing — the flush is a look: the shot said ahead, cut to whole)
        await cutTo(s, { ...NEAR(SEAHORSE_SPOT, 1.8, 0.7), troll_wear: { face: 'moomin_blush' }, troll_mood: 'sad',
          troll_look: [SEAHORSE_SPOT[0] - 0.3, SEAHORSE_SPOT[1] - 0.6, 0] });
        await s.wait(1.5);
        s.tell('laugh:face');
        await s.wait(2);
      },
    },
    // 2.4 «Водоросли»: Papa heaps weed from Mama's basket into his arms, over his head, and turns toward the dune
    armful_load: {
      from: () => ({ ...view(), camera_yaw: -8,
        ...AT('mama', [-2.7, 5.9], 300, { mama_with: ['basket_weed'], mama_look: 'papa', mama_mood: 'neutral' }),
        ...AT('papa', [-3.3, 5.2], 60, { papa_look: 'mama', papa_mood: 'smile' }) }),
      run: async s => {
        const papa = s.person('papa');
        await s.wait(1);
        await papa.do('take');
        papa.with(['armful']);
        papa.do('hold_high', { loop: true });
        await s.wait(1);
        s.tell('armful_load:up');
        papa.look(null);
        await papa.turn(80);
        await s.wait(1);
      },
    },
    // 2.6: frost whitens on the strand; the Groke comes up out of the shallows and sits down facing the lighthouse
    dusk_sit: {
      from: () => ({ ...view(), frost: 0, ...AT('groke', SHALLOWS(get('groke_at')), toLight(get('groke_at')), { groke_mood: 'sad' }) }),
      run: async s => {
        const groke = s.person('groke'), at = get('groke_at');
        s.move('frost', 0.4, { over: 5 });
        await go(s, 'groke', [seatOf(at)], toLight(at), 'glide');
        await groke.do('sit_floor');
        groke.do('sit_look', { loop: true });
        await dolly(s, NEAR(seatOf(at), 3.6, 0.7, -0.05));
        s.tell('dusk_sit:sat');
        await s.wait(1.5);
      },
    },
    // Ш1 «Наверх»: she looks up at the far little light in the lantern room and howls
    howl: {
      from: () => ({ ...view(NEAR(seatOf(get('groke_at')), 3.6, 0.7, -0.05)), ...grokeSat() }),
      run: async s => {
        const groke = s.person('groke');
        groke.look(LANTERN_ROOM);
        await dolly(s, NEAR(seatOf(get('groke_at')), 2.6, 0.8, -0.08));
        await s.wait(1);
        s.tell('howl:howl');
        await s.wait(4);
      },
    },
    // Ш1 «Сыну», 3.6 «Не открывать глаз»: the son sets the lantern on the stone and backs off; she rises and sways over it
    gift: {
      from: () => ({ ...view(), lantern_stone: 'none', hand_lit: 1, ...grokeSat(),
        ...AT('troll', ENTRY, 250, { troll_with: ['lantern'], troll_mood: 'afraid', troll_look: 'groke' }) }),
      run: async s => {
        const troll = s.person('troll'), groke = s.person('groke');
        await go(s, 'troll', [[2.2, 3.6], AT_STONE], toStone(AT_STONE), 'lantern_walk');
        await troll.do('put_down');
        troll.with(null);
        s.set('hand_lit', 0);
        s.set('lantern_stone', 'lit');
        s.tell('gift:set');
        troll.gait('back_away');
        await troll.walk([BACKED]);
        troll.gait(null);
        groke.look('stone#lantern');
        await groke.do('rise_floor');
        const near = [STONE[0] - 0.9, STONE[1] + 0.7];
        await go(s, 'groke', [near], toStone(near), 'glide');
        groke.do('sway', { loop: true });
        await dolly(s, NEAR(near, 4.2));
        s.tell('gift:sway');
        await s.wait(3);
      },
    },
    // Ш1 «По очереди»: she is waist-deep in the sea; the son brings the dim lantern; she comes out and sits far off;
    // he turns the wick up for her
    wade: {
      from: () => ({ ...view(), groke_at: 'water', lantern_stone: 'none', hand_lit: 0.4,
        ...AT('groke', SEATS.water, 280, { groke_mood: 'sad' }),
        ...AT('troll', NEAR_ENTRY, 250, { troll_with: ['lantern_low'], troll_mood: 'afraid' }) }),
      run: async s => {
        const troll = s.person('troll'), groke = s.person('groke');
        // (he runs down with the dim light; she turns to it as he comes — the first moment within a few seconds)
        await s.all(go(s, 'troll', [AT_STONE], toStone(AT_STONE), 'run'),
          (async () => { await s.wait(1.5); groke.look('troll#flame'); await groke.turn(turnTo(...SEATS.water, ...STONE)); })());
        s.tell('wade:turn');
        await troll.do('put_down');
        troll.with(null);
        s.set('hand_lit', 0);
        s.set('lantern_stone', 'low');
        groke.look('stone#lantern');
        troll.gait('back_away');
        await troll.walk([BACKED]);
        troll.gait(null);
        await go(s, 'groke', [SEATS.edge], toStone(SEATS.edge), 'glide');
        s.set('groke_at', 'edge');
        await groke.do('sit_floor');
        groke.do('sit_look', { loop: true });
        s.tell('wade:sat');
        await go(s, 'troll', [AT_STONE], toStone(AT_STONE));
        await troll.do('crouch');
        s.set('lantern_stone', 'lit');
        s.tell('wade:wick');
        await troll.do('crouch_rise');
        await s.wait(1);
      },
    },
    // 3.5: the Groke sitting by the stones in the night, her frost about her
    night2: {
      from: () => ({ ...view(), ...grokeSat() }),
      run: async s => {
        await s.wait(2);
        s.tell('night2:sat');
        await dolly(s, NEAR(seatOf(get('groke_at')), 3.6, 0.7, -0.05), 3);
        await s.wait(2);
      },
    },
    // 3.6 «Пойти следом»: the son going down the dune's path with the lantern, Papa coming over the dune behind him
    follow_start: {
      from: () => ({ ...view({ camera_yaw: 12 }), lantern_stone: 'none', hand_lit: 1, ...grokeSat(),
        ...AT('troll', DUNE_TOP, turnTo(...DUNE_TOP, ...DOWN[0]), { troll_with: ['lantern'], troll_mood: 'sad' }),
        ...AT('papa', OVER_DUNE, turnTo(...OVER_DUNE, ...PAPA_DOWN[1]), { papa_mood: 'thinking', papa_look: 'troll' }) }),
      run: async s => {
        await s.all(go(s, 'troll', [DOWN[0]], null, 'lantern_walk'), go(s, 'papa', [PAPA_DOWN[0]]));
        s.tell('follow_start:ready');
      },
    },
    // after the minigame: the son sets the lantern on the stone, the Groke rises toward it, Papa stops on the dune
    follow_end: {
      after: 'follow_start',
      from: () => ({ ...view({ camera_yaw: 12 }), lantern_stone: 'none', hand_lit: 1, ...grokeSat(),
        ...AT('troll', DOWN[2], toStone(DOWN[2]), { troll_with: ['lantern'], troll_mood: 'sad' }),
        ...AT('papa', PAPA_DOWN[1], turnTo(...PAPA_DOWN[1], ...STONE), { papa_mood: 'thinking', papa_look: 'troll' }) }),
      run: async s => {
        const troll = s.person('troll'), groke = s.person('groke'), papa = s.person('papa');
        await go(s, 'troll', [AT_STONE], toStone(AT_STONE), 'lantern_walk');
        await troll.do('put_down');
        troll.with(null);
        s.set('hand_lit', 0);
        s.set('lantern_stone', 'lit');
        groke.look('stone#lantern');
        await groke.do('rise_floor');
        await groke.turn(toStone(seatOf(get('groke_at'))));
        s.tell('follow_end:rise');
        await go(s, 'papa', [DUNE_TOP], turnTo(...DUNE_TOP, ...STONE));
        s.tell('follow_end:stop');
        if (get('follow_close')) {
          const p = besideOf(get('groke_at'));
          await go(s, 'troll', [p], turnTo(...p, ...SEATS.water));
          await troll.do('sit_floor');
          troll.do('huddle', { loop: true });
        }
        await s.wait(1.5);
      },
    },
    // 4.6: the frost round her wide; she howls
    wide: {
      from: () => ({ ...view(), frost: 1, ...grokeSat() }),
      run: async s => {
        const groke = s.person('groke');
        await s.wait(1);
        groke.look(LANTERN_ROOM);
        await dolly(s, NEAR(seatOf(get('groke_at')), 3.6, 0.7, -0.05));
        s.tell('wide:howl');
        await s.wait(3);
      },
    },
    // 4.7 «Пусть идёт»: the son comes without a lantern and sits down beside her; the frost creeps over his paws and arms
    beside: {
      from: () => ({ ...view(), frost: 1, warm: 0, blanket: false, ...grokeSat(),
        ...AT('troll', ENTRY, 250, { troll_mood: 'tired', troll_look: 'groke' }) }),
      run: async s => {
        const troll = s.person('troll'), at = get('groke_at'), p = besideOf(at);
        await go(s, 'troll', [[2, 4.2], p], toLight(at));
        await troll.do('sit_floor');
        troll.do('huddle', { loop: true });
        troll.look(null);
        s.tell('beside:sat');
        await dolly(s, NEAR(p, 3, 0.5));
        troll.with(['rime_paws']);
        await s.wait(2.5);
        troll.with(['rime_arms']);
        s.tell('beside:white');
        await s.wait(1.5);
      },
    },
    // Mama comes from the lighthouse with the blanket, lays it on the sand by him and goes back; the frost stops, the sand under her darkens
    blanket: {
      after: 'beside',
      from: () => ({ ...view(), frost: 1, warm: 0, blanket: false, ...grokeSat(), ...trollBeside({ troll_with: ['rime_arms'] }),
        ...AT('mama', BLANKET_FROM(get('groke_at')), 250, { mama_with: ['blanket'], mama_mood: 'neutral' }) }),
      run: async s => {
        const mama = s.person('mama'), at = get('groke_at');
        mama.here(true);
        const b = BLANKET(besideOf(at));
        s.set('blanket_a', b.blanket_a);
        s.set('blanket_d', b.blanket_d);
        const spot = BLANKET_SPOT(besideOf(at));
        await go(s, 'mama', [spot], turnTo(...spot, b.blanket_a, b.blanket_d), 'carry_walk');
        await mama.do('put_down');
        mama.with(null);
        s.set('blanket', true);
        s.tell('blanket:laid');
        s.move('frost', 0.7, { over: 6 });
        await s.all(s.move('warm', 1, { over: 6 }), (async () => { await go(s, 'mama', [ENTRY], null); mama.here(false); })());
        s.person('groke').mood('neutral');
        s.tell('blanket:warm');
        await s.wait(1.5);
      },
    },
    // 4.7 «До дюны»: Papa and the son side by side coming from the right onto the dune's path
    dune_start: {
      from: () => ({ ...view({ camera_yaw: 52 }), frost: 1, ...AT('groke', SEATS.edge, toLight('edge'), { groke_do: LOOP('sit_look'), groke_mood: 'sad' }),
        ...AT('troll', [UP[0][0] + 0.9, UP[0][1] - 1.4], 330, { troll_mood: 'neutral' }),
        ...AT('papa', [UP[0][0] + 1.5, UP[0][1] - 1.6], 330, { papa_mood: 'thinking' }) }),
      run: async s => {
        await s.all(go(s, 'troll', [UP[0]]), go(s, 'papa', [[UP[0][0] + 0.6, UP[0][1] - 0.2]]));
        s.tell('dune_start:ready');
      },
    },
    // on the dune's top: the son stops, says it, and goes on down alone; Papa sits down on the dune
    dune_stop: {
      after: 'dune_start',
      from: () => ({ ...view({ camera_yaw: 52 }), frost: 1, ...AT('groke', SEATS.edge, toLight('edge'), { groke_do: LOOP('sit_look'), groke_mood: 'sad' }),
        ...AT('troll', DUNE_TOP, turnTo(...DUNE_TOP, ...ALONE), { troll_mood: 'neutral' }),
        ...AT('papa', [DUNE_TOP[0] + 0.6, DUNE_TOP[1] + 0.3], turnTo(DUNE_TOP[0] + 0.6, DUNE_TOP[1] + 0.3, ...ALONE), { papa_mood: 'thinking', papa_look: 'troll' }) }),
      run: async s => {
        const papa = s.person('papa'), troll = s.person('troll');
        await dolly(s, NEAR(DUNE_TOP, 4.5), 2);
        s.tell('dune_stop:say');
        await s.wait(1.5);
        dolly(s, { ...VIEW, camera_yaw: 25 }, 3);
        await go(s, 'troll', [[3, 6], [0.6, 5.2], ALONE], turnTo(...ALONE, ...SEATS.edge));
        troll.look('groke');
        await papa.do('sit_floor');
        papa.do('huddle', { loop: true });
        s.tell('dune_stop:sat');
        await s.wait(1);
      },
    },
    // the night: she keeps off, the frost reaches him; toward dawn she comes and sits beside him; the sand darkens
    dawn_beside: {
      after: 'dune_stop',
      from: () => ({ ...view(), frost: 1, warm: 0, groke_at: 'edge', ...AT('groke', SEATS.edge, toLight('edge'), { groke_do: LOOP('sit_look'), groke_mood: 'sad' }),
        ...AT('troll', ALONE, turnTo(...ALONE, ...SEATS.edge), { troll_do: LOOP('huddle'), troll_look: 'groke' }),
        ...AT('papa', [DUNE_TOP[0] + 0.6, DUNE_TOP[1] + 0.3], 250, { papa_do: LOOP('huddle'), papa_look: 'troll' }) }),
      run: async s => {
        const troll = s.person('troll'), groke = s.person('groke');
        troll.with(['rime_paws']);
        s.tell('dawn_beside:frost');
        await s.move('dawn', 0.6, { over: 6 });
        await groke.do('rise_floor');
        const p = [ALONE[0] + 0.3, ALONE[1] + 0.9];
        await go(s, 'groke', [p], toLight('edge'), 'glide');
        await groke.do('sit_floor');
        groke.do('sit_look', { loop: true });
        s.set('groke_a', p[0]);
        await s.move('warm', 1, { over: 4 });
        s.tell('dawn_beside:sat');
        await s.wait(1);
      },
    },
    // at dawn the son gets up and walks up the dune past Papa, and does not stop
    past: {
      after: 'dawn_beside',
      from: () => ({ ...view(), dawn: 0.6, ...AT('troll', ALONE, 250, { troll_do: LOOP('huddle'), troll_with: ['rime_paws'] }),
        ...AT('papa', [DUNE_TOP[0] + 0.6, DUNE_TOP[1] + 0.3], 250, { papa_do: LOOP('huddle'), papa_look: 'troll' }) }),
      run: async s => {
        const troll = s.person('troll');
        await troll.do('rise_floor');
        await go(s, 'troll', [PAST[0], PAST[1]], null);
        s.tell('past:passed');
        await go(s, 'troll', [PAST[2]], null);
        troll.here(false);
      },
    },
    // 4.7 «Мама права»: she howls; toward morning she walks into the sea and is gone, her white trail to the water
    leave: {
      from: () => ({ ...view(), track: 0, ...grokeSat() }),
      run: async s => {
        const groke = s.person('groke'), at = get('groke_at');
        groke.look(LANTERN_ROOM);
        await dolly(s, NEAR(seatOf(at), 3.6, 0.7, -0.05));
        s.tell('leave:howl');
        await s.wait(3);
        dolly(s, VIEW, 3);
        s.move('dawn', 0.5, { over: 6 });
        await groke.do('rise_floor');
        groke.look(null);
        const [a, d] = seatOf(at);
        s.move('track', 1, { over: 6 });
        await go(s, 'groke', [[a - 2.4, d + 0.4], [a - 4.6, d + 1]], null, 'glide');
        groke.here(false);
        s.tell('leave:gone');
        await s.wait(1);
      },
    },
    // «Луч»: the beam comes round over the shore; the Groke (if she is here) reaches toward it as it goes on
    beam: {
      from: () => (get('groke_here') ? { ...view(), ...grokeSat(), ...trollBeside() }
        : { ...view(), ...AT('troll', ALONE, 270, { troll_look: [-12, 9, 1] }) }),
      run: async s => {
        await s.wait(2);
        if (get('groke_here')) await s.person('groke').do('reach_toward');
        s.tell('beam:pass');
        await s.wait(2);
      },
    },
    // the morning sand after night 3, as the keys say
    morning: {
      from: () => (view()),
      run: async s => {
        await s.wait(2);
        s.tell('morning:held');
        await s.wait(2);
      },
    },
    // «Пирог»: each in his own corner — the son on the dark sand by the Groke, or alone at the water's edge
    corner: {
      from: () => (get('groke_here') ? { ...view(), ...grokeSat(), ...trollBeside() }
        : { ...view(), ...AT('troll', ALONE, 270, { troll_look: [-12, 9, 1] }) }),
      run: async s => {
        await s.wait(3);
        s.tell('corner:held');
        await s.wait(3);
      },
    },
    // the son by the water and how he looks (glance): never at Papa, once up at the dune, or out to sea
    look_son: {
      from: () => ({ ...view(NEAR(ALONE, 2.6, 0.4)), ...AT('troll', ALONE, 260,
        { troll_look: get('glance') === 'never' ? [ALONE[0] - 0.8, ALONE[1] - 0.4, 0] : [-12, 9, 1], troll_mood: 'neutral' }) }),
      run: async s => {
        const troll = s.person('troll');
        await s.wait(1.5);
        if (get('glance') === 'once') {
          troll.look([DUNE_TOP[0], DUNE_TOP[1], 1.2]);
          await s.wait(1.5);
          s.tell('look_son:turn');
          troll.look([-12, 9, 1]);
        }
        await s.wait(1.5);
        s.tell('look_son:held');
        await s.wait(1);
      },
    },
  };
}

return { WATER, STRAND, SEA, FLAT, land, shore, knoll, SEATS, TROLL, BESIDE, STONE, LIGHTHOUSE, BLANKET, turnTo, film, along, DOWN, PAPA_DOWN, UP };
