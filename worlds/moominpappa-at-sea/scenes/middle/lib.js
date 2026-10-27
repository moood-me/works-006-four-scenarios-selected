// The middle of the island: the viewer on a granite shoulder looking down into a hollow among granite backs and up
// toward the lighthouse on its knoll beyond the pines. Close below, a soft mossy clearing on the left (the son's,
// with his ring of stones) and the black pool in its granite basin on the right with a rock at its lip; the land
// rising beyond them through the pines to the knoll.
// Beyond, all round, the island falls away to the sea. Made with the island's shapes (modules/island).
// Metres: across (right +), distance (ahead), the height over the viewer's ground.
const { bump, shoreOf } = kit.island;
const SEA = -4.5;
function base(a, d) {
  const r = Math.hypot((a - 3) / 40, (d - 22) / 34);
  return 0.05 * d
    - 50 * Math.max(0, r - 0.82) ** 1.5
    + 1.3 * bump(a, d, -5.8, 6.5, 2.6, 3.2)
    + 1.1 * bump(a, d, 7.2, 7, 2.6, 3)
    + 0.5 * bump(a, d, 0, -0.5, 5, 2.4)
    - 0.2 * bump(a, d, -1.8, 5.2, 2.4, 2)
    + 3.5 * bump(a, d, 2, 44, 10, 9);
}
// the pool's basin: inside it the land is a level floor half a metre under the ground at its middle, coming up to the
// land round it over a steep rim (m — how much of the floor there is there: 1 inside, 0 outside)
const B0 = base(1.7, 6.2);
function raw(a, d) {
  const x = (a - 1.7) / 1.8, z = (d - 6.2) / 1.25, q = x * x + z * z, m = Math.exp(-q * q * q);
  return base(a, d) * (1 - m) + (B0 - 0.5) * m;
}
const H0 = raw(0, 0);
const land = (a, d) => raw(a, d) - H0;
// the pool: its middle, half-widths, and its water's level — over its basin's floor, under the ground round it
const POOL = { a: 1.7, d: 6.2, ra: 1.55, rd: 1.05, level: B0 - 0.25 - H0 };
// the son's ring of stones: its middle, its radius
const RING = { a: -1.8, d: 5.2, r: 0.85 };
// the rock at the pool's lip, where the rope is tied and coiled; where the rope goes into the water
const ROCK = { a: 3.8, d: 6.1 }, ROPE = { a: POOL.a + 0.8, d: POOL.d - 0.5 };
// the lighthouse, up on the knoll beyond the pines
const LIGHTHOUSE = { a: 2, d: 44 };
// the pines that close in toward the lighthouse (pines 0 → 1): each where it stands at 0, [across, distance]; at 1 it
// has crept SHIFT metres toward the lighthouse (pine<k>_a, pine<k>_d — the scene's script moves them)
const PINES = [[-3.6, 7.6], [-2, 9.4], [5.4, 9.6], [0.8, 10.8], [-5.4, 10.4], [3.4, 12.6], [-1.2, 14]];
const SHIFT = 3.5;
const pineAt = (k, u) => {
  const [a, d] = PINES[k], da = LIGHTHOUSE.a - a, dd = LIGHTHOUSE.d - d, l = Math.hypot(da, dd);
  return [a + da / l * SHIFT * u, d + dd / l * SHIFT * u];
};
// where the land meets the sea (the island's painters ask it)
const shore = shoreOf(land, SEA, -60, 66, -30, 80);
// which way one at [a, d] faces to look at [a2, d2] (a person's turn: 0 away from the viewer, 90 to the right)
const turnTo = (a, d, a2, d2) => (Math.atan2(a2 - a, d2 - d) * 180 / Math.PI + 360) % 360;
// ── the pieces (notes.md: «Pieces»; the world's `beats` plays them by `beat`) ──────────────────────────────
// Where people come and go (across, distance): down the path from among the pines into the hollow; the place where Papa
// looks round (the choice of his day); the clearing's edge; the pool's lip by the rock, facing the rope's way in; the
// way the armful goes — from the pines on the left down through the ring and off to the right toward the landing.
const PATH = [[0.9, 10], [0.4, 7.6]], LOOK_ROUND = [0.5, 5.2], EDGE = [-3, 4.4], LIP = [3.3, 5.4], MY_ROCK = [-3.4, 5.6];
const ARMFUL = [[-4.4, 8.8], [-3, 6.4], [-1.8, 5.2], [0.6, 3.4], [3.2, 2.2], [6, 1.6]];
// the way he carries it while the player keeps it up («Охапка», armful_way 0 → 1): from where he stood to the ring's
// edge, where the piece after it walks him on through the ring
const ARMFUL_WAY = [ARMFUL[1], [-2.5, 5.95]];
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
const AT = (id, [a, d], turn, more = {}) => ({ [`${id}_a`]: a, [`${id}_d`]: d, [`${id}_turn`]: turn, [`${id}_do`]: 'stand',
  [`${id}_with`]: null, [`${id}_look`]: null, [`${id}_gait`]: null, [`${id}_on`]: null, [`${id}_wear`]: null, ...more });
const LOOP = motion => ({ motion, loop: true });
const VIEW = { camera_target: null, camera_shot: null, camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_yaw: 0, camera_h: 0, camera_look: 0 };
// the camera brought nearer one at p: `dist` metres from them along the line the viewer sees them by, turned to them,
// `h` metres lower, the gaze lowered `look` screen heights — the scene's camera put there (no operator: framing close it may stand in what is before them)
const NEAR = ([a, d], dist, h = 0, look = 0) => {
  const l = Math.hypot(a, d), k = Math.max(0, 1 - dist / l);
  return { ...VIEW, camera_x: a * k, camera_z: d * k, camera_yaw: Math.atan2(a, d) * 180 / Math.PI, camera_h: -h, camera_look: look };
};
const CAM_KEYS = ['camera_x', 'camera_z', 'camera_yaw', 'camera_h', 'camera_look'];
// the armful's way through the clearing, framed nearer
const ARMFUL_VIEW = NEAR([-2.4, 5.8], 4.6, 0, 0.02);
const dolly = (s, cam, over = 2.5) => s.all(...CAM_KEYS.map(k => s.move(k, cam[k], { over })));
// where the son crouches to lay the stones: at the ring's far side, facing the viewer across it
const RING_SPOT = [RING.a + 0.3, RING.d + RING.r + 0.35];

// The film, for the scene (its keys read as each piece begins). A piece's `from` puts what it does not move itself —
// the people's places, what they do and hold, the camera, the scene's own keys; never the hour, the weather or who is
// here (the game's).
function film(scene) {
  const get = k => scene.get(k);
  const go = async (s, id, pts, turn, gait = null) => {
    const p = s.person(id);
    p.gait(gait);
    await p.walk(pts);
    p.gait(null);
    if (turn != null) await p.turn(turn);
  };
  // lay the stones of the ring one by one, crouched at its far side (ring_n up to 9): a new ring, or a broken one laid
  // back; `from` — how many are laid already (a piece may begin with him at it)
  const lay = async (s, again, from = 0) => {
    const troll = s.person('troll');
    if (!from) {
      s.set('ring', again ? 'broken' : 'set');
      s.set('ring_n', 0);
      await go(s, 'troll', [RING_SPOT], turnTo(...RING_SPOT, RING.a, RING.d));
      troll.look('ring#stones');
      await troll.do('crouch');
      troll.do('crouched', { loop: true });
    }
    for (let n = from + 1; n <= 9; n++) {
      await s.wait(0.45);
      s.set('ring_n', n);
    }
    s.set('ring', 'set');
  };
  const myBusy = () => (get('my_here') ? AT('my', MY_ROCK, 120, { my_do: LOOP('crouched'), my_mood: 'smile', my_look: [MY_ROCK[0] - 0.4, MY_ROCK[1] + 0.3, 0] }) : {});
  return {
    // 2.4: Papa comes down into the hollow and looks round — the pool, the pines, the paths; the pose for «День Папы»
    day: {
      from: () => ({ ...VIEW, ...AT('papa', PATH[0], turnTo(...PATH[0], ...LOOK_ROUND), { papa_mood: 'thinking' }) }),
      run: async s => {
        const papa = s.person('papa');
        await go(s, 'papa', [PATH[1], LOOK_ROUND], 175);
        papa.look('pool#water');
        await s.wait(1.5);
        papa.look('ground#path');
        await s.wait(1.2);
        papa.look(null);
        await dolly(s, NEAR(LOOK_ROUND, 3.2));
        s.tell('day:look');
      },
    },
    // 2.3: the son down the path into the clearing; he lays the stones in a ring one by one; My busy on her rock
    ring: {
      from: () => ({ ...VIEW, ring: 'set', ring_n: 4, ...myBusy(),
        ...AT('troll', RING_SPOT, turnTo(...RING_SPOT, RING.a, RING.d), { troll_mood: 'thinking', troll_look: 'ring#stones', troll_do: LOOP('crouched') }) }),
      run: async s => {
        await lay(s, false, 4);
        s.tell('ring:set');
        await s.person('troll').do('crouch_rise');
        await dolly(s, NEAR(RING_SPOT, 3.2, 0.2, 0.1));
        await s.wait(1.5);
      },
    },
    // 2.4 «Омут»: Papa to the rock with the rope and its weight, ties it, stands at the lip paying it out — the pose for
    // «Лот» (the minigame moves `rope`)
    sound_ready: {
      from: () => ({ ...VIEW, rope: 0, coil: false, ...AT('papa', PATH[0], 160, { papa_with: ['rope'], papa_mood: 'thinking' }) }),
      run: async s => {
        const papa = s.person('papa');
        await go(s, 'papa', [PATH[1], LIP], turnTo(...LIP, ROPE.a, ROPE.d));
        await papa.do('crouch');
        await papa.do('crouch_rise');
        papa.look('pool#water');
        papa.do('lower_rope', { loop: true });
        s.tell('sound_ready:ready');
      },
    },
    // all the rope is out and there is no bottom: Papa looks into the pool; behind his back the pines creep
    sound_after: {
      after: 'sound_ready',
      from: () => ({ ...VIEW, coil: false, ...AT('papa', LIP, turnTo(...LIP, ROPE.a, ROPE.d), { papa_with: ['rope'], papa_look: 'pool#water', papa_do: LOOP('lower_rope') }) }),
      run: async s => {
        const papa = s.person('papa');
        await s.move('rope', 1, { over: 1.5 });
        papa.do('stand');
        papa.with(null);
        papa.mood('surprised');
        await dolly(s, NEAR(LIP, 3));
        s.tell('sound_after:look');
        await s.wait(1.5);
        papa.mood('smile');
        dolly(s, VIEW, 3);
        await s.move('pines', Math.min(1, get('pines') + 0.4), { over: 6 });
        s.tell('sound_after:pines');
        await s.wait(1);
      },
    },
    // 2.4 «Водоросли»: Papa comes down from the pines with the armful over his head; the son at the clearing's edge —
    // the pose for «Охапка» (the minigame moves `sway`)
    armful_in: {
      from: () => ({ ...ARMFUL_VIEW, ring: 'set', ring_n: 9, ...AT('papa', ARMFUL[0], turnTo(...ARMFUL[0], ...ARMFUL[1]), { papa_with: ['armful'], papa_mood: 'smile' }),
        ...AT('troll', EDGE, turnTo(...EDGE, ...ARMFUL[1]), { troll_mood: 'neutral', troll_look: 'papa' }) }),
      run: async s => {
        await go(s, 'papa', [ARMFUL[1]], null, 'carry_high');
        s.person('papa').do('hold_high', { loop: true });
        // (he walks on under it as the minigame moves armful_way — at the armful's gait)
        s.person('papa').gait('carry_high');
        s.tell('armful_in:ready');
      },
    },
    // he walks straight through the ring and knocks it apart, and goes off toward the landing; the son looks at his back
    armful_through: {
      after: 'armful_in',
      from: () => ({ ...ARMFUL_VIEW, ring: 'set', ring_n: 9, ...AT('papa', ARMFUL[1], turnTo(...ARMFUL[1], ...ARMFUL[2]), { papa_with: ['armful'], papa_mood: 'smile', papa_do: LOOP('hold_high') }),
        ...AT('troll', EDGE, turnTo(...EDGE, ...ARMFUL[1]), { troll_mood: 'neutral', troll_look: 'papa' }) }),
      run: async s => {
        const papa = s.person('papa'), troll = s.person('troll');
        papa.gait('carry_high');
        await papa.walk([ARMFUL[2]]);
        s.set('ring', 'broken');
        s.set('ring_n', 0);
        troll.mood('sad');
        s.tell('armful_through:kick');
        await papa.walk(ARMFUL.slice(3));
        papa.gait(null);
        papa.here(false);
        s.tell('armful_through:gone');
        await s.wait(1);
      },
    },
    // the son sets the stones back, one by one
    regather: {
      after: 'armful_through',
      from: () => ({ ...VIEW, ring: 'broken', ring_n: 0, ...AT('troll', EDGE, 100, { troll_mood: 'sad' }) }),
      run: async s => {
        await lay(s, true);
        await s.person('troll').do('crouch_rise');
        s.tell('regather:done');
        await s.wait(1);
      },
    },
    // the common shots: the rock at the pool with the coiled rope; the ring one stone short
    rope_shot: {
      from: () => ({ ...NEAR([ROCK.a, ROCK.d], 4, 0, 0.1), coil: true, rope: 0 }),
      run: async s => {
        await s.wait(2);
        s.tell('rope_shot:held');
        await s.wait(2);
      },
    },
    ring_shot: {
      from: () => ({ ...NEAR([RING.a, RING.d], 3.4, 0, 0.2), ring: 'one_missing', ring_n: 9 }),
      run: async s => {
        await s.wait(2);
        s.tell('ring_shot:held');
        await s.wait(2);
      },
    },
  };
}

return { SEA, land, shore, POOL, RING, ROCK, ROPE, LIGHTHOUSE, PINES, pineAt, turnTo, film, ARMFUL, ARMFUL_WAY, along };
