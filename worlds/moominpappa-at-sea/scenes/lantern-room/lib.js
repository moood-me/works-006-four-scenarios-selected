// The lantern room at the top of the lighthouse: a ten-sided room round the lamp at C (across, distance), its corners
// R from C, seen from its open side (the four sides nearest the viewer are not built). Its landward sides are solid —
// boarded, whitewashed; the one nearest the burner black with soot over the keeper's pencil —, its seaward sides glazed
// over a parapet, the gallery outside them with its rail, the sea far below. An angle round the room (degrees) is a
// bearing from C: 0 straight ahead, + to the right. tools/lantern_room.py writes scene.json from the same numbers.
const C = [0, 4.0], R = 2.8, H = 2.6, PARAPET = 1.0, DEG = Math.PI / 180;
const SIDE = 36, RS = R * Math.cos((SIDE / 2) * DEG), WS = 2 * R * Math.sin((SIDE / 2) * DEG);
// where an angle of the room is at r from C: [across, distance]
const at = (theta, r = R) => [C[0] + r * Math.sin(theta * DEG), C[1] + r * Math.cos(theta * DEG)];
// the gallery outside the glass: its floor out to GR, its rail's corners at RAIL
const GR = 3.6, RAIL = 3.55, RAIL_S = RAIL * Math.cos((SIDE / 2) * DEG), RAIL_W = 2 * RAIL * Math.sin((SIDE / 2) * DEG);
// the lamp: its pedestal, the lens drum (its radius, foot and top) with the burner's flame inside, its cap
const LENS = { r: 0.38, foot: 0.9, top: 1.95, flame: 1.4 };
// the hatch in the floor, where the stair comes up: its centre, its half-size; the stair under it goes down to the
// left (people on it stand lower the further left: the relief's pit)
const HATCH = { a: -1.6, d: 4.6, half: 0.35 };
// the land (the relief; the island's painters read it — SEA, land, shore): the floor up here (0) and round the tower
// as far as the viewer stands, the sea sixteen metres below and nothing else in sight
const SEA = -16;
function land(a, d) {
  const x = a - C[0], z = d - C[1];
  if (Math.abs(a - HATCH.a) < HATCH.half && Math.abs(d - HATCH.d) < HATCH.half) {
    return -0.25 - 0.4 * Math.max(0, Math.min(1, (HATCH.a + HATCH.half - a) / (2 * HATCH.half)));
  }
  if (x * x + z * z < 23) return 0;
  return SEA - 3;
}
const shore = () => {};
// the whitewashed boards of the solid sides and the parapet: over the box [x0, x1] × [−top, −bottom]
function boards(g, e, x0, x1, bottom, top) {
  g.save();
  g.beginPath();
  g.rect(x0, -top, x1 - x0, top - bottom);
  g.clip();
  g.fillStyle = "#e9e5dc";
  g.fillRect(x0, -top, x1 - x0, top - bottom);
  g.fillStyle = "rgba(120, 112, 100, 0.3)";
  for (let x = x0 + 0.14; x < x1; x += 0.14) g.fillRect(x, -top, 0.006, top - bottom);
  for (let i = 0; i < (x1 - x0) * 4; i++) {
    const px = x0 + e.rnd() * (x1 - x0), py = -bottom - e.rnd() * (top - bottom), r = 0.15 + e.rnd() * 0.4;
    const s = g.createRadialGradient(px, py, 0, px, py, r);
    s.addColorStop(0, e.rnd() < 0.6 ? "rgba(178, 170, 156, 0.18)" : "rgba(255, 252, 244, 0.3)");
    s.addColorStop(1, "rgba(178, 170, 156, 0)");
    g.fillStyle = s;
    g.fillRect(px - r, py - r, 2 * r, 2 * r);
  }
  g.restore();
}
// a pencil line of the keeper's, `size` metres tall, from (x, y) its baseline; wrapped to `width` metres a line,
// `lead` apart → the lines it took
function writeWrapped(g, text, x, y, size, width, lead, color) {
  g.save();
  g.translate(x, y);
  g.scale(0.01, 0.01);
  g.fillStyle = color;
  g.font = `italic ${Math.round(size * 100)}px Georgia, serif`;
  const words = text.split(" "), rows = [];
  let row = "";
  for (const w of words) {
    const next = row ? `${row} ${w}` : w;
    if (g.measureText(next).width * 0.01 > width && row) {
      rows.push(row);
      row = w;
    } else row = next;
  }
  if (row) rows.push(row);
  rows.forEach((r, i) => g.fillText(r, 0, (i * lead) / 0.01));
  g.restore();
  return rows.length;
}
// ── the people's places and the film (modules/beats; notes.md "Pieces") ─────────────────────────────────────────────
// [across, distance, turn]: by the lamp; at the sooty wall; by the barrel; in the hatch (My, the boy — the relief's
// pit); out through the glazed door and along the gallery to its front
const SPOT = {
  lamp: [0.62, 3.55, 305], soot: [...at(-36, 1.95), 324], barrel: [-1.75, 3.35, 290], hatch: [HATCH.a + 0.25, HATCH.d, 120],
  hatch_deep: [HATCH.a - 0.23, HATCH.d - 0.02, 130], up: [-0.95, 4.25, 120], cot: [1.3, 4.2, 90], door_in: [...at(108, 2.3), 288],
  gallery: [...at(40, RAIL - 0.35), 40],
  // (writing his book on the gallery's right side, where the room's view sees him over the parapet, half turned to it)
  write: [...at(78, RAIL - 0.4), 235],
};
const GALLERY_WAY = [at(108, 2.3), at(108, RAIL - 0.35), at(90, RAIL - 0.35), at(72, RAIL - 0.35), at(56, RAIL - 0.35), at(40, RAIL - 0.35)];
const COT_BED = [1.75, 4.3, 0.42];
// eyes from beside: inside by the glass on the right, on Papa out on the gallery (raised over the beam's cone); by the
// lamp's left, on whoever holds the lantern to the soot
const EYE = { gallery: [...at(64, 1.7), 1.95], soot: [...at(30, 1.2), 1.9], lamp: [-0.9, 1.2, 2.45],
  // out on the gallery behind him, over the beam's cone: Papa writing, whole, the lit lantern room beyond
  writing: [...at(112, RAIL - 0.2), 1.95] };
function film(scene) {
  // the lanterns carried lit: how much each burns (the light at its flame, `<id>_lamp`)
  const LIT = { lantern: 1, lantern_low: 0.45 }, LAMPS = { papa_lamp: 1, troll_lamp: 1 };
  const loop = motion => ({ motion, loop: true });
  const STAND = (id, [a, d, turn], more = {}) => {
    const v = { [`${id}_a`]: a, [`${id}_d`]: d, [`${id}_turn`]: turn, [`${id}_do`]: "stand", [`${id}_on`]: null, [`${id}_with`]: null,
      [`${id}_reach`]: null, [`${id}_look`]: null, ...more };
    const lamp = (v[`${id}_with`] ?? []).find(x => x.startsWith("lantern"));
    if (`${id}_lamp` in LAMPS) v[`${id}_lamp`] = lamp ? LIT[lamp] ?? 0 : 0;
    return v;
  };
  // the points the cameras look at: [across, distance, height]
  const POINTS = {
    "burner#lens": [...C, 1.4], "burner#wick": [...C, 1.35], "barrel#oil": [...at(-100, 2.2), 0.85], "soot#grooves": [...at(-36, RS), 1.75],
    "sheets#sheet": [C[0], C[1] - 0.12, 0.5], "cot#cot": [1.75, 4.3, 0.42], "crack#glass": [...at(36, RS), 1.75], "lantern#flame": [...at(-40, 1.6), 0.25],
  };
  // the cameras: the room wide (the scene's own view), or a view set straight at something — a point of the room
  // (POINTS) or someone (their head) — from the start's side, as near as the shot says, the eye a little over it;
  // close on someone, they turn to the camera (their face in the shot). Set by values (a cut) or moved (`cam`).
  const WIDE = { camera_target: null, camera_x: 0, camera_z: 0, camera_h: 0, camera_yaw: 0, camera_pitch: 0 };
  const SHOTS = { close: 1.4, medium: 2.2, full: 3.3, wide: 5.2 };
  const HEAD = { papa: 1.05, mama: 0.95, troll: 0.85, my: 0.6 };
  const ON = (target, shot = "medium", lift = 0) => ({ __on: [target, shot, lift] });
  // (where the lamp burns: the eye raised so the beam's cone passes under it — no glare through the lens into the eye)
  const HIGH = 0.65;
  function viewOf([target, shot, lift], get) {
    const who = HEAD[target], p = who ? [get(`${target}_a`), get(`${target}_d`), who] : POINTS[target];
    const dist = typeof shot === "number" ? 2 * shot : SHOTS[shot], up = (who ? 0.2 : 0.35) + lift;
    const [a, d, h] = p, r = Math.hypot(a, d), k = Math.max(0, 1 - dist / r), near = Math.min(dist, r);
    const v = { camera_target: null, camera_x: a * k, camera_z: d * k, camera_h: h + up - 1.7, camera_yaw: Math.atan2(a, d) / DEG,
      camera_pitch: -Math.atan2(up, near) / DEG };
    // (close on someone: they turn to the eye)
    const face = who && shot === "close" ? { [`${target}_turn`]: Math.atan2(a * k - a, d * k - d) / DEG, [`${target}_look`]: null } : {};
    return [v, face];
  }
  const resolve = values => {
    if (!values.__on) return values;
    const on = values.__on, out = { ...values };
    delete out.__on;
    const [v, face] = viewOf(on, k => out[k]);
    return Object.assign(out, v, face);
  };
  // a view from an eye of its own ([across, distance, height]) at a point — where the start's side cannot see a face
  // or a hand (someone at the wall, out on the gallery): from beside them
  const FROM = (eye, [ta, td, th]) => {
    const [ea, ed, eh] = eye, r = Math.hypot(ta - ea, td - ed);
    return { camera_target: null, camera_x: ea, camera_z: ed, camera_h: eh - 1.7, camera_yaw: Math.atan2(ta - ea, td - ed) / DEG,
      camera_pitch: Math.atan2(th - eh, r) / DEG };
  };
  async function cam(s, values, over = 1.5) {
    let v = values, face = {};
    if (values.__on) [v, face] = viewOf(values.__on, k => s.get(k));
    for (const [k, t] of Object.entries(face)) {
      if (!k.endsWith("_turn")) continue;
      s.person(k.slice(0, -5)).turn(t);
      s.person(k.slice(0, -5)).look(null);
    }
    const moves = Object.entries(v).filter(([k]) => k !== "camera_target").map(([k, x]) => s.move(k, x, { over }));
    await Promise.all(moves);
  }
  const ROOM = (...parts) => resolve(Object.assign({ ...WIDE, camera_pitch: 0 }, STAND("papa", SPOT.lamp, { papa_look: "burner#wick" }),
    STAND("my", SPOT.hatch), STAND("troll", SPOT.hatch_deep), ...parts));
  const walk = (p, ...spots) => p.walk(spots.map(([a, d]) => [a, d]));
  const to = async (p, spot) => {
    await walk(p, spot);
    await p.turn(spot[2]);
  };
  const moment = async (s, name, hold = 2.5) => {
    s.tell(name);
    if (hold) await s.wait(hold);
  };
  const P = (s, id) => s.person(id);
  // something in the hands: a lantern carried lit lights by the scene's light at its flame (`<id>_lamp`), out — not
  const hold = (s, id, parts) => {
    const p = s.person(id);
    p.with(parts);
    const lamp = parts && parts.find(x => x.startsWith("lantern"));
    if (`${id}_lamp` in LAMPS) s.set(`${id}_lamp`, lamp ? LIT[lamp] ?? 0 : 0);
  };
  // Papa up through the hatch: seen first standing in it, then stepping out onto the boards
  const comeUp = async (s, spot, parts) => {
    const papa = P(s, "papa");
    s.set("papa_a", SPOT.hatch[0]);
    s.set("papa_d", SPOT.hatch[1]);
    hold(s, "papa", parts);
    papa.here(true);
    await walk(papa, SPOT.up);
    await to(papa, spot);
  };
  const strikeFlame = async (s, papa) => {
    hold(s, "papa", ["match"]);
    await papa.do("strike");
    papa.reach({ r: "burner#wick" });
  };

  return {
    // 2.1 The lamp: the cloudy lenses, a finger in the oil, the grooves under the soot; the pose for "The Match"
    lamp_look: {
      from: () => ROOM(STAND("papa", SPOT.lamp, { papa_look: "burner#lens" }), { ...ON("burner#lens", "full") }),
      run: async s => {
        const papa = P(s, "papa");
        await to(papa, SPOT.barrel);
        papa.reach({ r: "barrel#oil" });
        cam(s, ON("barrel#oil", "medium"));
        await moment(s, "lamp_look:oil", 3);
        papa.reach(null);
        await to(papa, SPOT.soot);
        papa.reach({ r: "soot#grooves" });
        cam(s, ON("soot#grooves", 0.9));
        await moment(s, "lamp_look:soot", 3);
        papa.reach(null);
        await to(papa, SPOT.lamp);
        papa.look("burner#wick");
        await cam(s, ON("burner#wick", "medium"));
        await s.move("match_open", 1, { over: 0.6 });
        await moment(s, "lamp_look:wick", 0.5);
      },
    },
    // 2.2 The flame smokes and goes out; My in the hatch
    smoke_out: {
      after: "lamp_look",
      from: () => ROOM({ my_here: false, match_open: 0, ...ON("burner#wick", "medium") }),
      run: async s => {
        s.set("flame", "smoky");
        s.set("match_open", 0);
        await s.wait(3);
        s.set("flame", "out");
        await moment(s, "smoke_out:out", 3);
        P(s, "my").here(true);
        P(s, "my").look("papa");
        P(s, "papa").look("my");
        cam(s, ON("my", "medium"));
        await moment(s, "smoke_out:my", 4);
      },
    },
    // Ш1 "Up": Papa up with the lantern; the pose for "Steady" — the lantern held slanting at the soot
    n1_up: {
      from: () => ROOM({ papa_here: false, my_here: false, troll_here: false, lantern_at: "none", ...WIDE }),
      run: async s => {
        await comeUp(s, SPOT.soot, ["lantern"]);
        const papa = P(s, "papa");
        papa.do("hold_lantern_side", { loop: true });
        papa.look("soot#grooves");
        await cam(s, FROM(EYE.soot, POINTS["soot#grooves"]));
        await moment(s, "n1_up:wall", 0.5);
      },
    },
    // he reads; paraffin on the burner, a match: blue, out; the sheet pinned; the camp bed
    n1_read: {
      after: "n1_up",
      from: () => ROOM(STAND("papa", SPOT.soot, { papa_with: ["lantern"], papa_do: loop("hold_lantern_side") }), { my_here: false, troll_here: false,
        lantern_at: "none", slant: 1, ...FROM(EYE.soot, POINTS["soot#grooves"]) }),
      run: async s => {
        const papa = P(s, "papa");
        await moment(s, "n1_read:read", 6);
        papa.do("stand");
        await to(papa, SPOT.lamp);
        s.set("slant", 0);
        await strikeFlame(s, papa);
        s.set("flame", "blue");
        cam(s, ON("burner#wick", "medium"));
        await s.wait(2.5);
        s.set("flame", "out");
        hold(s, "papa", ["lantern"]);
        papa.reach(null);
        await moment(s, "n1_read:out", 3);
        papa.reach({ r: "sheets#sheet" });
        s.set("sheets", Math.max(1, s.get("sheets") ?? 0));
        await s.wait(1);
        papa.reach(null);
        await papa.do("put_down");
        hold(s, "papa", null);
        s.set("lantern_at", "floor");
        s.set("cot", "made");
        cam(s, WIDE);
        await moment(s, "n1_read:sheet", 3);
      },
    },
    // Ш1 "To the son": Papa up by the cold lamp, listening
    n1_cold: {
      from: () => ROOM(STAND("papa", SPOT.lamp, { papa_look: "burner#lens" }), { my_here: false, troll_here: false, ...ON("papa", "medium") }),
      run: async s => {
        P(s, "papa").mood("sad");
        await moment(s, "n1_cold:listen", 13);
      },
    },
    // Ш1 "By turns": up with the low lantern; the pose for "Half a Light"
    n1_half: {
      from: () => ROOM({ papa_here: false, my_here: false, troll_here: false, lantern_at: "none", ...WIDE }),
      run: async s => {
        await comeUp(s, SPOT.soot, ["lantern_low"]);
        const papa = P(s, "papa");
        papa.do("hold_lantern_side", { loop: true });
        papa.look("soot#grooves");
        await cam(s, FROM(EYE.soot, POINTS["soot#grooves"]));
        await moment(s, "n1_half:wall", 0.5);
      },
    },
    // towards morning he takes the lantern down
    n1_down: {
      after: "n1_half",
      from: () => ROOM(STAND("papa", SPOT.soot, { papa_with: ["lantern_low"] }), { my_here: false, troll_here: false, lantern_at: "none", ...WIDE }),
      run: async s => {
        const papa = P(s, "papa");
        papa.gait("lantern_walk");
        await walk(papa, SPOT.up, SPOT.hatch);
        papa.here(false);
        papa.gait(null);
        await moment(s, "n1_down:down", 2);
      },
    },
    // 3.2 Noon: Papa rubbing the lenses
    lenses: {
      from: () => ROOM(STAND("papa", SPOT.lamp, { papa_with: ["rag"] }), { my_here: false, troll_here: false, ...ON("burner#lens", "full") }),
      run: async s => {
        const papa = P(s, "papa");
        papa.reach({ r: "burner#lens" });
        papa.do("wipe", { loop: true });
        await s.move("lenses", 1, { over: 6 });
        await moment(s, "lenses:wiped", 2);
      },
    },
    // Ш2 "Walking": by the lamp till dusk — wiping, matches, talking to the burner
    w_lamp: {
      from: () => ROOM(STAND("papa", SPOT.lamp, { papa_with: ["rag"] }), { my_here: false, troll_here: false, ...ON("papa", "full") }),
      run: async s => {
        const papa = P(s, "papa");
        papa.reach({ r: "burner#lens" });
        papa.do("wipe", { loop: true });
        s.move("lenses", 1, { over: 4 });
        s.move("dusk", 1, { over: 12 });
        await s.wait(4);
        papa.do("stand");
        await strikeFlame(s, papa);
        await s.wait(2);
        papa.reach(null);
        hold(s, "papa", null);
        papa.look("burner#wick");
        await s.wait(4);
        cam(s, ON("papa", "medium"));
        await moment(s, "w_lamp:dusk", 3);
      },
    },
    // 3.5 "Walking": Papa asleep by the lamp; the boy in the hatch reaching for the lantern; the pose for 3.6
    n2_asleep: {
      from: () => ROOM(STAND("papa", [-0.4, 4.85, 200], { papa_do: loop("doze_floor") }), { my_here: false, troll_here: false, lantern_at: "floor",
        slant: 0, eyes: 0, ...WIDE }),
      run: async s => {
        const troll = P(s, "troll");
        await s.wait(2);
        troll.here(true);
        troll.reach({ r: "lantern#flame" });
        troll.look("lantern#flame");
        P(s, "papa").look("troll");
        await cam(s, ON("lantern#flame", "full"));
        await moment(s, "n2_asleep:hatch", 0.5);
      },
    },
    // 3.6 "Put it back", by the lamp: the next piece read by the slanting lantern; the sheet
    n2_read: {
      after: "n2_asleep",
      from: () => ROOM(STAND("papa", [-0.4, 4.85, 200]), { my_here: false, lantern_at: "floor", ...WIDE }),
      run: async s => {
        const papa = P(s, "papa"), troll = P(s, "troll");
        s.set("eyes", 1);
        troll.reach(null);
        await walk(troll, SPOT.hatch_deep);
        troll.here(false);
        await papa.do("rise_floor");
        s.set("lantern_at", "none");
        s.set("lantern_flame", "full");
        hold(s, "papa", ["lantern"]);
        await to(papa, SPOT.soot);
        papa.do("hold_lantern_side", { loop: true });
        await s.move("slant", 1, { over: 1.5 });
        cam(s, FROM(EYE.soot, POINTS["soot#grooves"]));
        await moment(s, "n2_read:wall", 2);
        await moment(s, "n2_read:read", 6);
        papa.do("stand");
        await to(papa, SPOT.lamp);
        s.set("slant", 0);
        papa.reach({ r: "sheets#sheet" });
        s.set("sheets", Math.min(2, (s.get("sheets") ?? 0) + 1));
        await s.wait(1);
        papa.reach(null);
        cam(s, ON("sheets#sheet", "medium"));
        await moment(s, "n2_read:sheet", 3);
      },
    },
    // 3.6 "Don't open your eyes" / "Follow": the boy down with the lantern; the camp bed empty
    n2_taken: {
      after: "n2_asleep",
      from: () => ROOM(STAND("papa", [-0.4, 4.85, 200], { papa_do: loop("doze_floor") }), { my_here: false, lantern_at: "floor", ...WIDE }),
      run: async s => {
        const troll = P(s, "troll");
        troll.reach(null);
        s.set("lantern_at", "none");
        hold(s, "troll", ["lantern"]);
        await walk(troll, SPOT.hatch_deep);
        troll.here(false);
        s.set("cot", s.get("cot") === "none" ? "none" : "empty");
        await moment(s, "n2_taken:gone", 3);
      },
    },
    // 3.6 «Следом», by the lamp: the boy down the hatch with the lantern, Papa up off the floor and after him
    n2_follow_up: {
      after: "n2_asleep",
      from: () => ROOM(STAND("papa", [-0.4, 4.85, 200], { papa_do: loop("doze_floor") }), { my_here: false, lantern_at: "floor", eyes: 1, ...WIDE }),
      run: async s => {
        const troll = P(s, "troll"), papa = P(s, "papa");
        s.set("eyes", 1);
        troll.reach(null);
        s.set("lantern_at", "none");
        hold(s, "troll", ["lantern"]);
        await walk(troll, SPOT.hatch_deep);
        troll.here(false);
        await papa.do("rise_floor");
        await walk(papa, SPOT.up, SPOT.hatch);
        papa.here(false);
        s.set("cot", s.get("cot") === "none" ? "none" : "empty");
        await moment(s, "n2_follow_up:out", 2);
      },
    },
    // 4.2 (the showcase) the pot by the lamp
    pot_up: {
      from: () => ROOM({ papa_here: false, my_here: false, troll_here: false, ...WIDE }),
      run: async s => {
        await comeUp(s, SPOT.lamp, ["pot"]);
        await P(s, "papa").do("put_down");
        hold(s, "papa", null);
        s.set("pot", true);
        await moment(s, "pot_up:set", 2);
      },
    },
    // 4.4 Ш3 "The lighthouse": on the gallery shouting at the storm; a wave cracks the glass; what is by the lamp; the
    // pose for "The Burner"
    st_gallery: {
      from: () => ROOM(STAND("papa", SPOT.gallery), { my_here: false, troll_here: false, ...FROM(EYE.gallery, [SPOT.gallery[0], SPOT.gallery[1], 1.05]) }),
      run: async s => {
        const papa = P(s, "papa");
        await papa.do("shout");
        await moment(s, "st_gallery:shout", 4);
        s.set("gallery_glass", "cracked");
        s.set("flash", 1);
        s.move("flash", 0, { over: 0.6, ease: "out" });
        cam(s, ON("crack#glass", "full"));
        await moment(s, "st_gallery:wave", 3);
        await walk(papa, ...GALLERY_WAY.slice().reverse().map(p => [...p, 0]));
        await to(papa, SPOT.lamp);
        cam(s, ON("sheets#sheet", "full"));
        await moment(s, "st_gallery:sheets", 3);
        papa.look("burner#wick");
        papa.reach({ r: "burner#wick" });
        await cam(s, ON("burner#wick", "medium"));
        await moment(s, "st_gallery:wick", 0.5);
      },
    },
    // two sheets: the oil runs, the lamp burns and turns, the beam out over the storm; Papa on the gallery laughing
    // (the eye raised over the beam's cone)
    st_lit: {
      after: "st_gallery",
      from: () => ROOM(STAND("papa", SPOT.lamp), { my_here: false, troll_here: false, ...ON("burner#lens", "full", HIGH) }),
      run: async s => {
        const papa = P(s, "papa");
        papa.reach(null);
        s.set("flame", "lit");
        await moment(s, "st_lit:lit", 3);
        await walk(papa, ...GALLERY_WAY.map(p => [...p, 0]));
        papa.turn(40);
        papa.mood("laugh");
        cam(s, FROM(EYE.gallery, [SPOT.gallery[0], SPOT.gallery[1], 1.05]));
        await moment(s, "st_lit:laugh", 4);
      },
    },
    // fewer sheets: blue, out; lightning — his face; he listens by the cold lamp
    st_out: {
      after: "st_gallery",
      from: () => ROOM(STAND("papa", SPOT.lamp), { my_here: false, troll_here: false, ...ON("burner#wick", "medium") }),
      run: async s => {
        const papa = P(s, "papa");
        s.set("flame", "blue");
        await s.wait(2.5);
        s.set("flame", "flare");
        await s.wait(0.8);
        s.set("flame", "out");
        papa.reach(null);
        await moment(s, "st_out:out", 2);
        s.set("flash", 1);
        s.move("flash", 0, { over: 0.7, ease: "out" });
        cam(s, ON("papa", "close"), 0.3);
        await moment(s, "st_out:flash", 3);
        papa.mood("sad");
        await moment(s, "st_out:listen", 4);
      },
    },
    // Ш3 "The burner, and run": at the burner with the last paraffin — the pose
    st_both: {
      from: () => ROOM({ papa_here: false, my_here: false, troll_here: false, ...WIDE }),
      run: async s => {
        await comeUp(s, SPOT.lamp, ["can"]);
        const papa = P(s, "papa");
        hold(s, "papa", null);
        papa.reach({ r: "burner#wick" });
        s.set("flame", "blue");
        await cam(s, ON("burner#wick", "medium"));
        await moment(s, "st_both:wick", 0.5);
      },
    },
    st_both_down: {
      after: "st_both",
      from: () => ROOM(STAND("papa", SPOT.lamp), { my_here: false, troll_here: false, flame: "blue", ...WIDE }),
      run: async s => {
        const papa = P(s, "papa");
        papa.reach(null);
        papa.look("stair#hatch");
        await moment(s, "st_both_down:bang", 2);
        papa.gait("run");
        const down = walk(papa, SPOT.up, SPOT.hatch);
        await s.wait(1);
        s.set("flame", "out");
        await down;
        papa.here(false);
        papa.gait(null);
        await moment(s, "st_both_down:down", 2);
      },
    },
    // 4.5 the lamp burnt out at dawn
    burnt_out: {
      from: () => ROOM({ papa_here: false, my_here: false, troll_here: false, flame: "lit", ...ON("burner#lens", "full", HIGH) }),
      run: async s => {
        await s.move("dawn", 1, { over: 4 });
        await moment(s, "burnt_out:low", 2);
        s.set("flame", "out");
        cam(s, ON("burner#lens", "full"));
        await moment(s, "burnt_out:out", 3);
      },
    },
    // Epilogue "The Beam": Papa writing on the gallery, the lamp burning; ("in a week") My in the hatch
    e_write: {
      from: () => ROOM(STAND("papa", SPOT.write, { papa_with: ["book"], papa_do: loop("hold"), papa_look: "papa#page" }), { my_here: false,
        troll_here: false, flame: "lit", lenses: 1, ...FROM(EYE.writing, [SPOT.write[0], SPOT.write[1], 0.9]) }),
      run: async s => {
        // (his words come while the beam looks away from him, out over the sea on the other side: his face not washed
        // white by it — the beam's bearing from the lamp, `beam_turn`, round the far side of his)
        const away = (((Math.atan2(SPOT.write[0] - C[0], SPOT.write[1] - C[1]) / DEG + 180) % 360) + 360) % 360;
        await s.until(() => {
          const t = (((s.get("beam_turn") ?? 0) % 360) + 360) % 360;
          return Math.abs(((t - away + 540) % 360) - 180) < 30;
        });
        await moment(s, "e_write:write", 5);
        P(s, "my").here(true);
        P(s, "my").look("papa");
        cam(s, ON("my", "medium", HIGH));
        await moment(s, "e_write:my", 5);
        // the pose of «Луч» (watch, don't touch): the lit lamp turning, the beam out through the glass, Papa writing on
        // the gallery beyond it — the eye raised over the beam's cone, the frame's top left free
        await cam(s, FROM(EYE.lamp, [1.0, 4.8, 1.3]), 2);
      },
    },
    // Epilogue "The Stair", the late "Pie": the pot warmed, the lamp lit by his matchbox, and down without staying
    e_light: {
      from: () => ROOM({ papa_here: false, my_here: false, troll_here: false, ...WIDE }),
      run: async s => {
        await comeUp(s, SPOT.lamp, ["pot"]);
        const papa = P(s, "papa");
        await papa.do("put_down");
        s.set("pot", true);
        await strikeFlame(s, papa);
        s.set("flame", "lit");
        papa.reach(null);
        hold(s, "papa", null);
        cam(s, ON("burner#lens", "full", HIGH));
        await moment(s, "e_light:lit", 3);
        await walk(papa, SPOT.up, SPOT.hatch);
        papa.here(false);
        await moment(s, "e_light:down", 2);
      },
    },
    // the common frame: the camp bed by the promise
    shot_cot: {
      from: () => ROOM({ papa_here: false, my_here: false, troll_here: false, ...ON("cot#cot", "full") }),
      run: async s => {
        if (s.get("cot") === "taken") {
          s.set("papa_here", true);
          s.set("papa_a", COT_BED[0]);
          s.set("papa_d", COT_BED[1]);
          P(s, "papa").on(COT_BED);
          P(s, "papa").do("lie", { loop: true });
        }
        await moment(s, "shot_cot:seen", 3.5);
      },
    },
  };
}
return { C, R, H, PARAPET, DEG, SIDE, RS, WS, at, GR, RAIL, RAIL_S, RAIL_W, LENS, HATCH, SEA, land, shore, boards,
  writeWrapped, SPOT, film };
