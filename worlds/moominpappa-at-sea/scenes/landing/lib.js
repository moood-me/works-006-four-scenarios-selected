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
// the boat moored (her bow on the rocks of the cove, her stern afloat), pulled up the rocks, and off out of the cove
// (`boat_off` 1 — the family in her, leaving): [across, distance, turn]
const BOAT = { moored: [-3.9, 8.6, 195], up: [-3.2, 6.6, 200], off: [-15, 17, 230] };
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
    water: { at: [-3.4, 12.2], turn: 255, do: 'hands_behind', look: [-20, 14, 0.5] },
    stone: { at: [7.0, 27.7], turn: 40, do: stand, look: 'arrow_stone#stone' },
    steps_foot: { at: [8.6, 28.2], turn: 25, do: stand, look: 'lighthouse#door' },
    patch: { at: [0.6, 5.6], turn: 230, do: stand, look: [-0.2, 5.0, 0] },
    boat_walk: { at: [1.2, 4.6], turn: 250, do: stand, look: [-30, 40, 3] },
    above_water: { at: [0.6, 5.4], turn: 250, do: stand, look: [-20, 9, 0.3] },
    mooring: { at: [-1.3, 7.6], turn: 250, do: { motion: 'crouched', loop: true }, look: 'boat#mooring' },
    in_boat: { at: [-3.9, 8.6], on: 'boat#seat_a', turn: 195, do: 'seated', look: [-30, 20, 1.5] },
  },
  mama: {
    slab: { at: [-1.3, 3.35], on: [-1.3, 3.4, 0.4], turn: 150, do: 'seated', look: [3, 1, 1.3] },
    steps: { at: [9.6, 30.2], on: [9.6, 30.25, 0.34], turn: 190, do: 'seated', look: [0, 5, 1] },
    cleft: { at: [0.6, 5.3], turn: 110, do: stand, look: 'granite#cleft' },
    stand: { at: [-0.7, 4.3], turn: 170, do: stand, look: [0, 0, 1.2] },
    cove: { at: [-2.0, 7.0], turn: 250, do: stand, look: [-6, 8, 0] },
    patch: { at: [-0.9, 6.1], turn: 160, do: stand, look: [-0.2, 5.0, 0] },
    boat_side: { at: [-2.6, 7.2], turn: 250, do: stand, look: 'boat#boat' },
    in_boat: { at: [-3.9, 8.6], on: 'boat#seat_b', turn: 195, do: 'seated', look: [-30, 20, 1] },
  },
  troll: {
    boulder: { at: [-2.65, 4.4], on: [-2.65, 4.4, 0.5], turn: 240, do: 'seated', look: [-6, 0, 0.8] },
    boat: { at: [-4.4, 8.0], turn: 120, do: stand, look: 'boat#boat' },
    boat_far: { at: [-3.4, 9.6], turn: 200, do: stand, look: 'boat#boat' },
    in_boat: { at: [-3.9, 8.6], on: 'boat#seat_c', turn: 195, do: 'seated', look: [-30, 10, 1] },
  },
  my: {
    stone: { at: [7.05, 28.75], turn: 175, do: 'sit_look', look: 'arrow_stone#stone' },
    rock: { at: [3.2, 5.9], turn: 215, do: 'sit_look', look: [0, 0, 1] },
    below_door: { at: [8.6, 29.0], turn: 30, do: stand, look: 'door#door' },
    in_boat: { at: [-3.9, 8.6], on: 'boat#bow', turn: 195, do: 'sit_look', look: [-30, 20, 1] },
  },
  fisher: {
    away: { at: [16.2, 27.0], turn: 35, do: stand, look: [30, 60, 1.5] },
    door: { at: [10.25, 30.9], turn: 0, do: stand, look: 'lighthouse#door', reach: { r: 'lighthouse#door' } },
    threshold: { at: [10.0, 30.4], on: [10.0, 30.35, 0.5], turn: 195, do: 'seated', look: [-10, -20, 1.5] },
    path: { at: [14.5, 26.5], turn: 300, do: stand, look: 'lighthouse#door' },
  },
};
// Marks on the granite by the game's keys, painted with it (granite.js; `at` turns across, distance into the plane's
// metres): the cleft in the slab before the family, running away from the eye up the slab's near face (`cleft`: a
// long dark slit, its lips paler; packed with seaweed when weed or sprout —
// the shoot itself is the card `sprout`; point `granite#cleft`), the white patch of rime by the landing
// (`frost_patch`), the frost's trail from the water's edge up the long back to the threshold and back (`frost_step`:
// the Groke slides — two broken bands of rime, thickest at the threshold).
const CLEFT = [1.6, 4.6], PATCH = [-0.2, 5.0], PATCH_AT = [-0.2, 5.0, 0];
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
// ── the pieces (notes.md «Pieces»; the module beats) ─────────────────
// Each piece: `from` — where its people stand and its camera (the play's keys — the hour, the weather, the boat, the
// cleft … — are the game's and are not touched here), `run` — the piece, telling its moments. Its people are put at a
// place with `at` (all their keys at once, `<id>_placed` with them, so the script's `places` leaves them be).
const loop = m => ({ motion: m, loop: true });
function at(id, place, more = {}) {
  const p = PLACES[id][place];
  return {
    [`${id}_at`]: place, [`${id}_placed`]: place, [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_on`]: p.on ?? null,
    [`${id}_turn`]: p.turn, [`${id}_do`]: p.do, [`${id}_look`]: p.look ?? null, [`${id}_reach`]: p.reach ?? null,
    [`${id}_with`]: null, [`${id}_wear`]: null, [`${id}_gait`]: null, ...more,
  };
}
// the camera: the scene's own (the whole landing), or framing a target
const CAM0 = { camera_target: null, camera_shot: 'full', camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_h: 0, camera_yaw: 0, camera_look: 0, camera_pitch: 0 };
const cam = (target, shot, frame, more = {}) => ({ ...CAM0, camera_target: target, camera_shot: shot, camera_frame: frame ?? null, ...more });
// a cut inside a piece: its shot made ready when the piece begins (`ready`), cut to when it is time
const ready = (s, values) => s.shot(values);
function setAll(s, values) {
  for (const k in values) s.set(k, values[k]);
}
async function cutTo(s, shot) {
  await s.until(() => shot.ready);
  shot.cut();
}
// where the beam points from the lighthouse at a place (degrees, as `beam_turn` goes: 0 the far side, 90 the right)
const bearingTo = (a, d) => ((Math.atan2(a - 10, d - 33) * 180) / Math.PI + 360) % 360;
const turnNear = (s, b) => () => {
  const t = (((s.get('beam_turn') ?? 0) % 360) + 360) % 360;
  return Math.abs(((t - b + 540) % 360) - 180) < 8;
};

// the door seen between the pines that crept up to it, from just below the steps
const DOOR_CAM = { ...CAM0, camera_x: 9.7, camera_z: 26.2, camera_h: 0.75, camera_yaw: 3, camera_look: 0.04 };

const FILM = {
  // 1.4 — the door locked; My by the arrow stone; the key
  arrive: {
    from: () => ({ ...at('papa', 'steps_foot'), ...at('mama', 'slab'), ...at('troll', 'boulder'), ...at('my', 'stone'), ...cam('papa', 'wide', [0.45, 0.5]) }),
    run: async s => {
      const papa = s.person('papa'), my = s.person('my');
      const toMy = ready(s, { ...CAM0, camera_x: 7.0, camera_z: 27.15, camera_h: -1.2, camera_yaw: 8, camera_look: 0.02 });
      await papa.walk([[9.95, 30.75]]);
      papa.turn(0);
      papa.reach({ r: 'door#door' });
      await s.wait(1.4);
      s.tell('arrive:door');
      await s.wait(2.6);
      papa.reach(null);
      papa.look('my');
      await cutTo(s, toMy);
      my.look('arrow_stone#stone');
      await s.wait(1);
      s.tell('arrive:arrow');
      await s.wait(2.4);
      s.set('my_with', ['key']);
      my.look([8.2, 27.4, 1.3]);
      s.tell('arrive:key');
      await s.wait(1.6);
    },
  },
  // 1.4 «keep» — the white patch by the landing
  patch: {
    after: 'arrive',
    from: () => ({ ...at('papa', 'patch'), ...at('mama', 'patch'), ...at('troll', 'boulder'), ...cam('mama', 'wide', [0.35, 0.5]) }),
    run: async s => {
      s.camera({ target: 'mama', shot: 'wide', frame: [0.35, 0.5], glide: 1.5 });
      s.person('mama').look(PATCH_AT);
      await s.wait(1.6);
      s.person('papa').look(PATCH_AT);
      s.tell('patch:seen');
      await s.wait(4);
      s.person('papa').look('mama');
      await s.wait(1.5);
    },
  },
  // 1.4 «douse» — Mama falls asleep sitting on the bundle
  asleep: {
    after: 'arrive',
    from: () => ({ ...at('mama', 'slab'), ...at('troll', 'boulder'), ...cam('mama', 'medium', [0.45, 0.45]) }),
    run: async s => {
      s.camera({ target: 'mama', shot: 'medium', frame: [0.45, 0.45], glide: 1.6 });
      s.set('mama_mood', 'tired');
      await s.wait(2);
      s.person('mama').look([-1.3, 3.6, 0.2]);
      await s.wait(1.2);
      s.set('mama_do', loop('doze'));
      s.tell('asleep:asleep');
      await s.wait(3);
    },
  },
  // 1.7 «sit» — Mama alone with the wet bundles; one falls in; on the step, wringing her sleeve, «All done already»
  bundles: {
    from: () => ({ ...at('mama', 'cove', { mama_with: ['bundle'], mama_gait: 'carry_walk' }), ...cam('mama', 'wide', [0.5, 0.5]) }),
    run: async s => {
      const mama = s.person('mama');
      const toSteps = ready(s, { ...at('mama', 'steps', { mama_do: loop('wring') }), ...at('papa', 'steps_foot'), bundles: 'steps', ...cam('mama', 'full', [0.45, 0.5]) });
      await mama.walk([[-3.0, 8.0]]);
      s.set('mama_with', null);
      mama.look([-4.6, 8.4, -0.3]);
      s.tell('bundles:fell');
      await s.wait(1);
      await mama.do('crouch');
      mama.do('crouched', { loop: true });
      await s.wait(2.2);
      await mama.do('crouch_rise');
      s.set('mama_with', ['bundle']);
      s.set('mama_mood', 'tired');
      s.tell('bundles:wet');
      await s.wait(1.5);
      await cutTo(s, toSteps);
      await s.wait(1.5);
      await s.person('papa').walk([[9.4, 29.2]]);
      s.person('papa').look('mama');
      mama.look('papa');
      s.tell('bundles:sat');
      await s.wait(3);
    },
  },
  // 2.4 «weed» — seaweed packed into the cleft; she laughs
  weed: {
    from: () => ({ ...at('papa', 'cleft', { papa_do: loop('crouched') }), ...at('mama', 'cleft', { mama_with: ['basket_weed'] }), ...cam('sprout', 'wide', [0.5, 0.55]) }),
    run: async s => {
      const packed = ready(s, { cleft: 'weed', ...at('papa', 'cleft'), ...at('mama', 'cleft', { mama_with: ['basket'] }), ...cam('mama', 'full', [0.4, 0.5]) });
      await s.wait(2.5);
      s.person('mama').do('put_down');
      await s.wait(2);
      await cutTo(s, packed);
      s.person('mama').look('papa');
      s.tell('weed:packed');
      await s.wait(4);
      s.set('mama_mood', 'laugh');
      s.tell('weed:laugh');
      await s.wait(2.5);
    },
  },
  // 2.4 «pool»/«fisher» — the evening of the 23rd: Mama comes up from the water wet, her basket empty
  wet_back: {
    from: () => ({ ...at('mama', 'cove', { mama_with: ['basket'], mama_gait: 'hand_walk', mama_mood: 'tired' }), ...cam('mama', 'wide', [0.5, 0.5]) }),
    run: async s => {
      const mama = s.person('mama');
      await mama.walk([[-1.2, 6.0], [0.4, 4.8]]);
      mama.look([0.4, 4.0, 0.3]);
      s.tell('wet_back:empty');
      await s.wait(2.5);
    },
  },
  // 2.5 — dusk: Papa alone on the rocks at the edge, a wave over his boots
  dusk: {
    from: () => ({ ...at('papa', 'edge'), ...CAM0, camera_x: -0.6, camera_z: 7.4, camera_h: -0.3, camera_yaw: -22, camera_look: 0.04 }),
    run: async s => {
      await s.wait(2.5);
      s.set('edge_splash', (s.get('edge_splash') ?? 0) + 1);
      await s.wait(1.2);
      s.tell('dusk:stood');
      await s.wait(4);
      s.set('edge_splash', (s.get('edge_splash') ?? 0) + 1);
      await s.wait(3);
    },
  },
  // 3.1 — the pines at the threshold; Papa leans on the door (the door minigame next)
  pines: {
    from: () => ({ ...at('papa', 'door', { papa_do: loop('lean_door') }), ...at('my', 'below_door'), ...DOOR_CAM }),
    run: async s => {
      await s.wait(2);
      s.tell('pines:push');
      await s.wait(5);
    },
  },
  // 3.1 — the door open; the rime's trail at the threshold; the Fisherman far off
  door_open: {
    after: 'pines',
    from: () => ({ ...at('papa', 'door'), ...DOOR_CAM }),
    run: async s => {
      const far = ready(s, { ...cam('fisher', 'wide', [0.6, 0.5]) });
      const papa = s.person('papa');
      s.set('papa_do', { motion: 'stand', loop: true });
      papa.reach(null);
      await s.wait(0.8);
      papa.look([9.6, 29.4, 0]);
      s.tell('door_open:frost');
      await s.wait(3);
      papa.look('fisher');
      await cutTo(s, far);
      s.tell('door_open:fisher');
      await s.wait(3.5);
    },
  },
  // 4.1 — the grey morning: down to the boat, the son beside or on the far side of the hull (troll_at, the play's)
  storm_coming: {
    from: () => ({ ...at('papa', 'boat_walk'), ...cam('papa', 'wide', [0.55, 0.5]) }),
    run: async s => {
      const papa = s.person('papa');
      papa.look([-30, 40, 3]);
      await s.wait(1.2);
      s.tell('storm_coming:sky');
      await s.wait(2.5);
      await papa.walk([[-1.7, 6.3]]);
      await papa.turn(250);
      papa.look('boat#boat');
      s.set('papa_do', loop('pull_rope'));
      s.camera({ target: 'boat', shot: 'wide', frame: [0.5, 0.5], glide: 1.5 });
      await s.wait(1.5);
    },
  },
  // 4.1 — the boat up the rocks (act boat_up); the son walks off first
  boat_up: {
    after: 'storm_coming',
    from: () => ({ ...at('papa', 'boat'), ...cam('boat', 'wide', [0.5, 0.5]) }),
    run: async s => {
      s.set('papa_do', loop('stand'));
      await s.wait(1);
      s.set('boat', 'up');
      s.tell('boat_up:up');
      await s.wait(1);
      s.person('troll').walk([[0.4, 3.0]]);
      await s.wait(2.5);
      s.person('papa').look('troll');
      await s.wait(2);
    },
  },
  // 4.4 «cape» — Papa out of the door into the storm with the lantern, toward the cape
  out_storm: {
    from: () => ({ ...at('papa', 'door', { papa_with: ['lantern'], papa_gait: 'lantern_walk', papa_turn: 180, papa_reach: null, papa_look: null }), papa_lantern: 1, ...cam('papa', 'wide', [0.45, 0.55]) }),
    run: async s => {
      const papa = s.person('papa');
      await papa.walk([[8.4, 28.4], [6.6, 26.4]]);
      s.tell('out_storm:out');
      await s.wait(0.6);
      await s.wait(1);
    },
  },
  // 4.5 — the calm dawn; Papa at the water by papa_shore (the play's)
  calm: {
    from: () => ({ ...at('papa', 'above_water'), ...CAM0 }),
    run: async s => {
      const papa = s.person('papa'), how = s.get('papa_shore') ?? 'silent';
      await s.wait(2);
      if (how === 'none') {
        s.tell('calm:water');
        await s.wait(4);
        return;
      }
      s.camera({ target: 'papa', shot: 'wide', frame: [0.5, 0.5], glide: 2 });
      await papa.walk([[-1.6, 10.6], [-3.4, 12.2]]);
      await papa.turn(255);
      papa.look([-20, 14, 0.2]);
      if (how === 'crouch') {
        await papa.do('crouch');
        papa.do('crouched', { loop: true });
      }
      if (how === 'glance') papa.look([-25, 9, 1.2]);
      s.tell('calm:water');
      await s.wait(3.5);
      if (how === 'glance') {
        papa.look('boat#boat');
        await papa.walk([[-2.0, 8.4]]);
        papa.look('boat#boat');
      }
      await s.wait(1.5);
    },
  },
  // 4.5 — all day at the boat: the split caulked, the tar drying
  caulk: {
    after: 'calm',
    from: () => ({ ...at('papa', 'boat', { papa_do: loop('crouched') }), ...cam('boat', 'wide', [0.5, 0.5]) }),
    run: async s => {
      const tarred = ready(s, { boat: 'tarred', ...at('papa', 'boat', { papa_do: loop('crouched') }), ...cam('boat', 'full', [0.5, 0.5]) });
      s.camera({ target: 'boat', shot: 'wide', frame: [0.5, 0.5], glide: 1.5 });
      if (s.get('papa_at') !== 'boat') await s.person('papa').walk([[-1.7, 6.3]]);
      s.set('papa_do', loop('crouched'));
      await s.wait(2.5);
      await cutTo(s, tarred);
      s.tell('caulk:done');
      await s.wait(3);
    },
  },
  // «Boat» — the key under the arrow stone; at the mooring (the mooring minigame next)
  leave: {
    from: () => ({ ...at('papa', 'stone', { papa_with: ['key'] }), ...at('mama', 'stand', { mama_with: ['basket'], mama_gait: 'hand_walk' }), ...cam('papa', 'wide', [0.45, 0.5]) }),
    run: async s => {
      const toBoat = ready(s, { ...at('papa', 'mooring', { papa_do: loop('crouched') }), ...at('mama', 'boat_side', { mama_with: ['basket'] }), ...cam('boat#mooring', 'wide', [0.5, 0.5]) });
      await s.person('papa').do('crouch');
      s.set('papa_with', null);
      s.tell('leave:key');
      await s.wait(2);
      await s.person('papa').do('crouch_rise');
      await cutTo(s, toBoat);
      await s.wait(1.5);
      s.tell('leave:ready');
      await s.wait(1.5);
    },
  },
  // «Boat» — the mooring let go (act mooring): the boat slides off with them in her
  cast_off: {
    after: 'leave',
    from: () => ({ ...at('papa', 'in_boat'), ...at('mama', 'in_boat'), ...at('troll', 'in_boat'), ...at('my', 'in_boat'), ...cam('boat', 'wide', [0.5, 0.5]) }),
    run: async s => {
      s.camera({ target: 'boat', shot: 'wide', frame: [0.5, 0.5], glide: 2 });
      await s.move('boat_off', 1, { over: 8, ease: 'inOut' });
      s.tell('cast_off:off');
      await s.wait(1);
    },
  },
  // «Boat» — as the boat goes: the Fisherman with his net at the stone and the locked door, seen between the pines; close
  // as he lifts his hand after her
  fisher_door: {
    from: () => ({ ...at('fisher', 'path', { fisher_with: ['net_shoulder'], fisher_wear: { parts: [] } }), ...cam('fisher', 'wide', [0.5, 0.55]) }),
    run: async s => {
      const fisher = s.person('fisher');
      await fisher.walk([[8.2, 28.2]]);
      fisher.look('arrow_stone#stone');
      await fisher.do('crouch');
      s.tell('fisher_door:stone');
      await s.wait(1.4);
      await fisher.do('crouch_rise');
      await fisher.walk([[10.25, 30.9]]);
      await fisher.turn(0);
      fisher.reach({ r: 'door#door' });
      s.tell('fisher_door:palm');
      await s.wait(2.5);
      if (s.get('fisher_hand')) {
        s.camera({ target: 'fisher', shot: 'medium', frame: [0.5, 0.5], glide: 2 });
        fisher.reach(null);
        await fisher.turn(200);
        fisher.look([-30, -20, 1]);
        await fisher.do('lift_hand');
        s.tell('fisher_door:hand');
        await s.wait(2.5);
      }
    },
  },
  // «Pie», full — the Fisherman's palm on the door, he sits on the threshold; Papa passes him
  threshold: {
    from: () => ({ ...at('fisher', 'path', { fisher_with: ['matchbox'] }), ...at('papa', 'steps_foot'), ...cam('fisher', 'wide', [0.45, 0.5]) }),
    run: async s => {
      const fisher = s.person('fisher'), papa = s.person('papa');
      await fisher.walk([[10.25, 30.9]]);
      await fisher.turn(0);
      fisher.reach({ r: 'door#door' });
      s.tell('threshold:palm');
      await s.wait(2.5);
      fisher.reach(null);
      await fisher.turn(195);
      s.set('fisher_on', PLACES.fisher.threshold.on);
      await fisher.do('sit_down');
      fisher.do('seated', { loop: true });
      fisher.look([-10, -20, 1.5]);
      s.tell('threshold:sat');
      await papa.walk([[9.6, 30.2]]);
      papa.look('fisher');
      await s.wait(2);
    },
  },
  // «Beam» — the beam over the landing: Little My on the rocks, lit and left
  beam_pass: {
    from: () => ({ ...at('my', 'rock'), ...cam('my', 'wide', [0.5, 0.55]) }),
    run: async s => {
      await s.until(turnNear(s, bearingTo(3.2, 5.9)));
      s.tell('beam_pass:my');
      await s.wait(2.5);
    },
  },
  // «Stair» — each morning Papa down to the tarred boat, a paw on the mooring, a look up at the dark lantern, back
  mooring_touch: {
    from: () => ({ ...at('papa', 'above_water'), ...cam('papa', 'wide', [0.5, 0.5]) }),
    run: async s => {
      const papa = s.person('papa');
      await papa.walk([[-1.7, 8.0]]);
      papa.look('boat#mooring');
      await papa.do('crouch');
      papa.reach({ r: 'boat#mooring' });
      s.tell('mooring_touch:touch');
      await s.wait(2);
      papa.reach(null);
      await papa.do('crouch_rise');
      papa.look('lighthouse#lantern');
      s.tell('mooring_touch:dark');
      await s.wait(2.5);
      await papa.walk([[0.8, 5.2]]);
    },
  },
  // common shots — the arrow stone close, then the cleft
  look_marks: {
    from: () => ({ ...cam('arrow_stone', 'close', [0.5, 0.5]) }),
    run: async s => {
      const cleft = ready(s, { ...cam('sprout', 'close', [0.5, 0.45]) });
      await s.wait(2.5);
      await cutTo(s, cleft);
      s.tell('look_marks:cleft');
      await s.wait(2.5);
    },
  },
};
// the play's keys the showcase gives each piece (in a game the game gives them)
const SHOW = {
  arrive: { dawn: 1, bundles: 'slab', fisher_here: false },
  patch: { dawn: 1, frost_patch: true },
  asleep: { dawn: 1 },
  bundles: { dawn: 0, bundles: 'steps', papa_here: true, troll_here: false, my_here: false },
  weed: { dawn: 0, bundles: 'none', cleft: 'empty', troll_here: false, my_here: false },
  wet_back: { dawn: 0, dusk: 0.4, papa_here: false },
  dusk: { dusk: 1, mama_here: false },
  pines: { dusk: 0, dawn: 0.5, pines: 1, door: 0 },
  door_open: { door: 1, frost_step: true, fisher_here: true },
  storm_coming: { dawn: 0, storm: 0.35, troll_at: 'boat', fisher_here: false },
  boat_up: { boat_up: 1 },
  out_storm: { storm: 1, night: 1, moon: 1 },
  calm: { storm: 0, night: 0, dawn: 0.6, driftwood: true, boat: 'cracked', papa_shore: 'crouch' },
  caulk: {},
  leave: { dawn: 0, driftwood: false, mama_here: true, troll_here: true, my_here: true },
  cast_off: { mooring: 1 },
  fisher_door: { boat: 'away', boat_off: 0, fisher_here: true, fisher_hand: true },
  threshold: { night: 0.7, dusk: 0.3 },
  beam_pass: { night: 1, dusk: 0, lighthouse_lit: 1, beam: 1, my_here: true },
  mooring_touch: { night: 0, lighthouse_lit: 0, beam: 0, boat: 'tarred' },
  look_marks: { cleft: 'sprout' },
};
// (a piece that follows the one before in the showcase is not cut to: its play's keys are set as it begins)
const SHOWFILM = Object.fromEntries(Object.entries(FILM).map(([k, b]) => [k, {
  ...b,
  from: () => ({ ...SHOW[k], ...b.from() }),
  run: async s => {
    setAll(s, SHOW[k]);
    await b.run(s);
  },
}]));

return { FILM, SHOWFILM, SEA, land, shore, bundle, marks, CLEFT, PINES, BOAT, DOOR_OPEN, PLACES };
