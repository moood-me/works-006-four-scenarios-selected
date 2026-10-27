// The world's close-ups of paws and things: seven shots for the inserts of «Moominpappa at Sea»'s scenes — `knot` (the
// Fisherman's tarred net, a hard knot in it, Papa's paws drawing its thread), `needle` (Mama's paws threading a needle
// in the lantern's light), `handle` (the lantern's bail, Papa's paw letting it go, the son's closing on it), `match`
// (a lit match brought to the burner's wick against the draught), `matchbox` (Papa's matchbox laid into the
// Fisherman's palm), `mooring` (the mooring rope through the ring in the rock, slipping from Papa's paw), `paws` (the
// son's paws white with rime round the lantern, Mama's coming to rub them). No faces. The paws are Jansson's: round,
// white, soft short fingers, a fine tinted ink line; the Fisherman's hand thin, grey and knotted out of his faded
// oilskin sleeve. Their light is painted: the lantern's warm, the moon's cold, the lightning's white.
//   paint(g, e, shot) is an insert's code: the shot painted once, each thing that moves a layer. live(e, shot, now) is
// its animate: `now` — what moves — only sets the layers' numbers and marks the points that move. The painting reads
// no key of the scene. closeups.md says how a scene uses it.
//   A shot's own units: the frame's height, the origin in the frame's middle (y down); the background is painted out
// to ±1.3 of the frame's height (21:9 whole), the paws, the things and the points within the middle 4:3.
const { clamp, span, ease, noise } = anim;
const TAU = 2 * Math.PI;
const num = (v, d) => (typeof v === 'number' && Number.isFinite(v) ? v : d);
const unit01 = (v, d) => clamp(num(v, d), 0, 1);

// (colours: a module stands by itself — the same lantern, moon, Moomin white and oilskin as the world's cast and scenes)
const rgbOf = (c) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
const mixc = (a, b, u) => `#${rgbOf(a).map((v, i) => Math.round(v + (rgbOf(b)[i] - v) * u).toString(16).padStart(2, '0')).join('')}`;
const rgba = (c, a) => `rgba(${rgbOf(c).join(',')},${a})`;
const LAMP = '#ffc874', MOON = '#bcd0ea', DAY = '#f3ead8', DAWN = '#f6c9a8', FLASH = '#eef4ff';
const INK = '#3d4656', TAR = '#3a3129', CORK = '#b8804f', ROPE = '#b89a6a', BRASS = '#b08a44';
// the paws: the Moomins' white (Papa's, Mama's, the son's — a touch bluer), the Fisherman's grey hand; his sleeve
const SKIN = { papa: '#f4f1ea', mama: '#f4f1ea', troll: '#f6f3ed', fisher: '#d9d0c2' };
const OILSKIN = '#9a9178';

// ── shapes ──
function oval(g, x, y, rx, ry, turn, colour) {
  g.fillStyle = colour;
  g.beginPath();
  g.ellipse(x, y, rx, ry, turn, 0, TAU);
  g.fill();
}
function line(g, x0, y0, x1, y1, w, colour) {
  g.strokeStyle = colour;
  g.lineWidth = w;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x0, y0);
  g.lineTo(x1, y1);
  g.stroke();
}
// a soft pool of colour fading out from a point (a wash, a glow painted in)
function pool(g, x, y, r, colour, strength) {
  const gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, rgba(colour, strength));
  gr.addColorStop(1, rgba(colour, 0));
  g.fillStyle = gr;
  g.fillRect(x - r, y - r, 2 * r, 2 * r);
}
// a round-ended shape from one circle to another
function capsule(g, x0, y0, r0, x1, y1, r1) {
  const a = Math.atan2(y1 - y0, x1 - x0);
  g.beginPath();
  g.arc(x0, y0, r0, a + Math.PI / 2, a - Math.PI / 2);
  g.arc(x1, y1, r1, a - Math.PI / 2, a + Math.PI / 2);
  g.closePath();
}
// a closed smooth shape through the middles of its points' sides
function blob(g, pts) {
  const n = pts.length, mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  g.beginPath();
  g.moveTo(...mid(pts[n - 1], pts[0]));
  for (let i = 0; i < n; i++) g.quadraticCurveTo(...pts[i], ...mid(pts[i], pts[(i + 1) % n]));
  g.closePath();
}
// a cord along points (a smooth line through them)
function cord(g, pts, w, colour) {
  g.strokeStyle = colour;
  g.lineWidth = w;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(...pts[0]);
  for (let i = 1; i < pts.length - 1; i++) g.quadraticCurveTo(...pts[i], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2);
  g.lineTo(...pts[pts.length - 1]);
  g.stroke();
}
// watercolour: a ground's wash broken by soft blots of its own darker and lighter, a few grains of the paper
function wash(g, rnd, [x0, y0, x1, y1], colour, n, k = 0.18) {
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * rnd(), y = y0 + (y1 - y0) * rnd(), r = 0.06 + 0.22 * rnd();
    pool(g, x, y, r, rnd() < 0.5 ? mixc(colour, '#000000', 0.35) : mixc(colour, '#ffffff', 0.3), k * (0.4 + 0.6 * rnd()));
  }
  for (let i = 0; i < n * 6; i++) {
    g.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    g.fillRect(x0 + (x1 - x0) * rnd(), y0 + (y1 - y0) * rnd(), 0.004, 0.003);
  }
}
const turned = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
const add2 = (p, q) => [p[0] + q[0], p[1] + q[1]];
const sub2 = (p, q) => [p[0] - q[0], p[1] - q[1]];
const lerp2 = (p, q, u) => [p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u];

// ── the paw ──
// One paw for every shot. Its own units are its length (the wrist to the middle finger's tip, laid flat): the wrist at
// (0, 0), the fingers toward +x, the thumb on the −y side. A spec places and poses it:
//   at — the wrist in the shot; angle — where the fingers point (radians, 0 to the right, + clockwise); L — its length;
//   side — 1, or −1: mirrored (the thumb on the other side); kind — "moomin" (round, white, three soft short fingers
//   and a thumb) or "fisher" (thin, grey, four long knotted fingers, the oilskin's sleeve); skin; curl — each finger's,
//   0 straight … 1 curled in (seen flat it shortens, its end turned under); thumb — its curl; arm — the forearm's
//   length, in paws (it runs out of the frame); light — { dir: where the light comes from (shot units), colour, k };
//   parts — which of "arm", "palm", "thumb", "fingers" are painted.
const KIND = {
  moomin: {
    palm: { c: [0.32, 0], r: [0.3, 0.29] },
    fingers: [{ y: -0.15, len: 0.28, r: 0.095 }, { y: 0, len: 0.33, r: 0.1 }, { y: 0.15, len: 0.28, r: 0.095 }],
    base: 0.52, thumb: { root: [0.3, -0.2], dir: -0.55, len: 0.2, r: 0.085 }, wrist: 0.19, elbow: 0.23,
  },
  fisher: {
    palm: { c: [0.28, 0], r: [0.27, 0.2] },
    fingers: [{ y: -0.15, len: 0.4, r: 0.045 }, { y: -0.05, len: 0.47, r: 0.047 }, { y: 0.05, len: 0.44, r: 0.045 }, { y: 0.15, len: 0.34, r: 0.04 }],
    base: 0.48, thumb: { root: [0.14, -0.17], dir: -0.75, len: 0.36, r: 0.05 }, wrist: 0.12, elbow: 0.14, sleeve: 0.1,
  },
};
const PAW = { side: 1, kind: 'moomin', curl: null, thumb: 0, arm: 1.6, parts: ['arm', 'palm', 'fingers', 'thumb'] };
// where a point of the paw's own units is in the shot
const pawPoint = (o, [x, y]) => add2(o.at, turned([x * o.L, y * o.L * o.side], o.angle));
// a paw placed so that its own point p lands on the shot's point target
const placed = (o, p, target) => ({ ...o, at: sub2(target, sub2(pawPoint({ ...o, at: [0, 0] }, p), [0, 0])) });
// each finger: its base and its tip (the paw's own units), as curled
function fingerOf(o, K, i) {
  const f = K.fingers[i], c = (o.curl ?? [])[i] ?? 0, len = f.len * (1 - 0.62 * c);
  return { a: [K.base, f.y], b: [K.base + len, f.y * (1 + 0.15 * (1 - c))], r: f.r, c };
}
const thumbOf = (o, K) => {
  const t = K.thumb, len = t.len * (1 - 0.55 * (o.thumb ?? 0));
  return { a: t.root, b: add2(t.root, [Math.cos(t.dir) * len, Math.sin(t.dir) * len]), r: t.r };
};
// a fingertip in the shot (0: the first finger, the thumb's side) — what a paw pinches with
const tipOf = (o, i) => { const K = KIND[o.kind], f = fingerOf(o, K, i); return pawPoint(o, [f.b[0] + f.r * 0.6, f.b[1]]); };
// the paw's shading: its colour lit from the light's side, darker and bluer away from it (in the paw's own units)
const lightOf = (o) => o.light ?? { dir: [-0.6, -0.8], colour: DAY, k: 0.3 };
function litDir(o) {
  const d = turned(lightOf(o).dir, -o.angle), ld = [d[0], d[1] * o.side], n = Math.hypot(ld[0], ld[1]) || 1;
  return [ld[0] / n, ld[1] / n];
}
function shade(g, o, c, r, base) {
  const L = lightOf(o), u = litDir(o);
  const gr = g.createLinearGradient(c[0] + u[0] * r, c[1] + u[1] * r, c[0] - u[0] * r, c[1] - u[1] * r);
  gr.addColorStop(0, mixc(base, L.colour, L.k));
  gr.addColorStop(0.55, base);
  gr.addColorStop(1, mixc(base, '#7a8aa8', 0.32));
  return gr;
}
function paw(g, spec, rnd) {
  const o = { ...PAW, ...spec }, K = KIND[o.kind], fine = 0.0045 / o.L, skin = o.skin;
  g.save();
  g.translate(...o.at);
  g.rotate(o.angle);
  g.scale(o.L, o.L * o.side);
  const ink = (w = fine) => { g.strokeStyle = rgba(INK, 0.75); g.lineWidth = w; g.lineJoin = 'round'; g.stroke(); };
  if (o.parts.includes('arm')) {
    // the forearm back out of the frame (the Fisherman's in his sleeve, its cuff ragged)
    const back = -o.arm, L = lightOf(o), up = litDir(o)[1] < 0 ? -1 : 1;
    g.beginPath();
    g.moveTo(0.1, -K.wrist);
    g.quadraticCurveTo(back * 0.45, -K.elbow * 1.08, back, -K.elbow);
    g.lineTo(back, K.elbow);
    g.quadraticCurveTo(back * 0.45, K.elbow * 1.08, 0.1, K.wrist);
    g.closePath();
    const gr = g.createLinearGradient(0, up * K.elbow, 0, -up * K.elbow);
    gr.addColorStop(0, mixc(skin, L.colour, L.k * 0.8));
    gr.addColorStop(0.5, skin);
    gr.addColorStop(1, mixc(skin, '#7a8aa8', 0.3));
    g.fillStyle = gr;
    g.fill();
    ink();
    if (K.sleeve) {
      const s0 = -0.12, sw = K.elbow + 0.1;
      g.beginPath();
      g.moveTo(s0, -sw);
      for (let i = 0; i <= 6; i++) g.lineTo(s0 + (i % 2 ? 0.035 : 0) + 0.01 * rnd(), -sw + (2 * sw * i) / 6);
      g.lineTo(back, sw + 0.04);
      g.lineTo(back, -sw - 0.04);
      g.closePath();
      const gs = g.createLinearGradient(0, up * sw, 0, -up * sw);
      gs.addColorStop(0, mixc(OILSKIN, L.colour, L.k * 0.7));
      gs.addColorStop(1, mixc(OILSKIN, '#3a3a3c', 0.35));
      g.fillStyle = gs;
      g.fill();
      ink();
      g.strokeStyle = rgba(mixc(OILSKIN, '#000000', 0.4), 0.5);
      g.lineWidth = fine * 0.8;
      for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(s0 - 0.15 - 0.3 * i, -sw * 0.8); g.quadraticCurveTo(s0 - 0.25 - 0.3 * i, 0, s0 - 0.17 - 0.3 * i, sw * 0.8); g.stroke(); }
    }
  }
  if (o.parts.includes('fingers')) for (let i = 0; i < K.fingers.length; i++) {
    const f = fingerOf(o, K, i);
    capsule(g, ...f.a, f.r * (o.kind === 'fisher' ? 1.1 : 1.05), ...f.b, f.r);
    g.fillStyle = shade(g, o, f.b, f.r * 2, skin);
    g.fill();
    ink();
    // a finger curled in: its end turned under, a shade across it; the Fisherman's knuckles
    if (f.c > 0.35) { g.beginPath(); g.arc(f.b[0] - f.r * 0.3, f.b[1], f.r * 0.8, -1.2, 1.2); g.strokeStyle = rgba(INK, 0.35); g.lineWidth = fine * 0.8; g.stroke(); }
    if (o.kind === 'fisher') for (const u of [0.4, 0.75]) oval(g, f.a[0] + (f.b[0] - f.a[0]) * u, f.a[1] + (f.b[1] - f.a[1]) * u, f.r * 0.55, f.r * 0.9, 0, rgba('#7d6f5e', 0.35));
  }
  if (o.parts.includes('palm')) {
    const P = K.palm;
    g.beginPath();
    g.ellipse(...P.c, P.r[0], P.r[1], 0, 0, TAU);
    g.fillStyle = shade(g, o, P.c, P.r[0] * 1.2, skin);
    g.fill();
    ink();
    if (o.kind === 'fisher') {
      // his hand's tendons and veins
      g.strokeStyle = rgba('#8a7c6a', 0.4);
      g.lineWidth = fine * 0.9;
      for (const y of [-0.1, -0.03, 0.04, 0.11]) { g.beginPath(); g.moveTo(0.06, y * 0.5); g.quadraticCurveTo(0.28, y * 0.9, 0.46, y * 1.1); g.stroke(); }
    }
  }
  if (o.parts.includes('thumb')) {
    const t = thumbOf(o, K);
    capsule(g, ...t.a, t.r * 1.15, ...t.b, t.r);
    g.fillStyle = shade(g, o, t.b, t.r * 2, skin);
    g.fill();
    ink();
  }
  g.restore();
}
// rime on a paw: white crystals and a frosted bloom over its palm and fingers, laid as the paw lies
function rimeOn(g, spec, rnd, n) {
  const o = { ...PAW, ...spec }, K = KIND[o.kind];
  const spots = [K.palm.c, ...K.fingers.map((_, i) => fingerOf(o, K, i).b), thumbOf(o, K).b];
  for (const s of spots) pool(g, ...pawPoint(o, s), o.L * 0.22, '#e8f2fb', 0.55);
  for (let i = 0; i < n; i++) {
    const s = spots[Math.floor(rnd() * spots.length)], j = [(rnd() - 0.5) * 0.36, (rnd() - 0.5) * 0.3];
    const [x, y] = pawPoint(o, add2(s, j)), r = o.L * (0.012 + 0.02 * rnd()), a = rnd() * Math.PI;
    for (let k = 0; k < 3; k++) {
      const b = a + (k * Math.PI) / 3;
      line(g, x - Math.cos(b) * r, y - Math.sin(b) * r, x + Math.cos(b) * r, y + Math.sin(b) * r, 0.0025, 'rgba(250,253,255,0.95)');
    }
    oval(g, x, y, r * 0.35, r * 0.35, 0, 'rgba(220,236,250,0.9)');
  }
}

// ── a shot's frame ──
const W = 1.3, H = 0.62;
const FULL = [-W, -H, W, H];

// ── knot ── the Fisherman's tarred net close on his oilskin lap, cork floats along its head-rope, a hard knot in its
// mesh; Papa's paws at it — the left holding the net, the right drawing the thread out. `pull`: the thread drawn out
// (the knot hard → loose, the thread longer, the right paw with its end); `paws`: Papa's paws there; `flash`: the
// lightning's white over it all.
const KNOT = (() => {
  const K = [-0.08, -0.02], T0 = [0.14, 0.05], T1 = [0.46, 0.13], D0 = Math.hypot(...sub2(T0, K));
  const light = { dir: [-0.7, -0.7], colour: DAY, k: 0.3 };
  const r0 = { kind: 'moomin', skin: SKIN.papa, L: 0.34, light, curl: [0.75, 0.55, 0.85], thumb: 0.3, side: -1, angle: -2.35 };
  const right = (() => { const o = { ...r0, at: [0, 0] }; const tip = tipOf(o, 0); return { ...o, at: sub2(add2(T0, [0.02, 0.01]), tip) }; })();
  const left = placed({ kind: 'moomin', skin: SKIN.papa, L: 0.34, light, curl: [0.6, 0.6, 0.6], thumb: 0.5, side: 1, angle: -0.75 }, [0.55, 0], [-0.36, 0.14]);
  return { K, T0, T1, D0, light, right, left };
})();
const knotThread = (pull) => lerp2(KNOT.T0, KNOT.T1, ease.inOut(pull));
function paintKnot(g, C) {
  const P = KNOT, rnd = C.e.rnd;
  // his oilskin over the knees, folds of it, the grey evening on it
  const gr = g.createLinearGradient(-0.6, -H, 0.6, H);
  gr.addColorStop(0, mixc(OILSKIN, DAY, 0.2));
  gr.addColorStop(1, mixc(OILSKIN, '#3c3a36', 0.35));
  g.fillStyle = gr;
  g.fillRect(...FULL.slice(0, 2), 2 * W, 2 * H);
  wash(g, rnd, FULL, OILSKIN, 40);
  for (let i = 0; i < 9; i++) {
    const x = -W + (2 * W * (i + rnd())) / 9;
    cord(g, [[x, -H], [x + 0.1 * (rnd() - 0.5), 0], [x + 0.15 * (rnd() - 0.5), H]], 0.03, rgba('#2e2b26', 0.12));
  }
  // the net: diamonds of tarred cord, sagging, over the whole lap; the head-rope with its cork floats up top
  const S = 0.085;
  for (let k = -24; k <= 24; k++) {
    const pts = [], pts2 = [];
    for (let y = -H - 0.05; y <= H + 0.05; y += 0.05) {
      const sag = 0.02 * Math.sin(y * 6 + k);
      pts.push([k * S + (y + H) * 0.55 + sag + 0.006 * (rnd() - 0.5), y]);
      pts2.push([k * S - (y + H) * 0.55 + sag + 0.006 * (rnd() - 0.5), y]);
    }
    cord(g, pts, 0.006, rgba(TAR, 0.85));
    cord(g, pts2, 0.006, rgba(TAR, 0.85));
  }
  cord(g, [[-W, -0.47], [-0.4, -0.44], [0.3, -0.48], [W, -0.45]], 0.014, TAR);
  for (let x = -W + 0.1; x < W; x += 0.26) {
    oval(g, x, -0.46 + 0.01 * Math.sin(x * 5), 0.045, 0.026, 0.1, CORK);
    oval(g, x - 0.012, -0.468, 0.022, 0.01, 0.1, rgba('#ffffff', 0.25));
  }
  // the knot: hard — a dense black tangle; loose — a few open loops (the two cross-faded by `pull`)
  C.layer('hard', P.K, [-0.14, -0.14, 0.14, 0.14], (g2) => {
    pool(g2, ...P.K, 0.13, '#000000', 0.25);
    for (let i = 0; i < 26; i++) {
      g2.strokeStyle = rgba(i % 3 ? TAR : '#5a4c3e', 0.95);
      g2.lineWidth = 0.008;
      g2.beginPath();
      g2.ellipse(P.K[0] + 0.035 * (rnd() - 0.5), P.K[1] + 0.035 * (rnd() - 0.5), 0.02 + 0.03 * rnd(), 0.012 + 0.02 * rnd(), rnd() * Math.PI, 0, TAU);
      g2.stroke();
    }
  });
  C.layer('loose', P.K, [-0.2, -0.2, 0.2, 0.2], (g2) => {
    for (let i = 0; i < 5; i++) {
      g2.strokeStyle = rgba(TAR, 0.9);
      g2.lineWidth = 0.008;
      g2.beginPath();
      g2.ellipse(P.K[0] + 0.05 * (rnd() - 0.5), P.K[1] + 0.05 * (rnd() - 0.5), 0.05 + 0.05 * rnd(), 0.03 + 0.04 * rnd(), rnd() * Math.PI, 0, TAU);
      g2.stroke();
    }
  });
  // the thread out of the knot: painted along +x from the knot (D0 long), turned and drawn out to its end by live
  C.layer('thread', P.K, [P.K[0] - 0.02, P.K[1] - 0.04, P.K[0] + P.D0 + 0.03, P.K[1] + 0.04], (g2) => {
    const pts = [];
    for (let u = 0; u <= 1.0001; u += 0.1) pts.push([P.K[0] + P.D0 * u, P.K[1] + 0.008 * Math.sin(u * 14)]);
    cord(g2, pts, 0.009, TAR);
    cord(g2, pts, 0.003, rgba('#8a7458', 0.6));
  });
  C.layer('paw_l', [0, 0], [-W, -0.1, 0.1, H], (g2) => paw(g2, P.left, rnd));
  C.layer('paw_r', P.T0, [-0.2, -0.25, W, H], (g2) => paw(g2, P.right, rnd));
  // the lightning: a cold white over it all
  C.layer('flash', [0, 0], FULL, (g2) => {
    g2.fillStyle = rgba(FLASH, 0.42);
    g2.fillRect(-W, -H, 2 * W, 2 * H);
  }, { blend: 'add' });
  C.at(...P.K, 'knot');
}
function liveKnot(L, now) {
  const P = KNOT, pull = unit01(now.pull, 0), paws = unit01(now.paws, 1), flash = unit01(now.flash, 0), T = knotThread(pull);
  const d = sub2(T, P.K);
  L.set('hard', { alpha: 1 - ease.smooth(span(pull, 0.2, 0.8)) });
  L.set('loose', { alpha: ease.smooth(span(pull, 0.2, 0.8)) });
  L.set('thread', { rotate: Math.atan2(d[1], d[0]), sx: Math.hypot(...d) / P.D0, sy: 1 });
  L.set('paw_l', { alpha: paws });
  L.set('paw_r', { x: T[0] - P.T0[0], y: T[1] - P.T0[1], alpha: paws });
  L.set('flash', { alpha: flash });
  L.at(...T, 'thread');
  L.at(...P.K, 'knot');
}

// ── needle ── Mama's paws in the lantern's light over her red apron and the linen in her lap: the needle held up in her
// left, the thread's end in her right going to its eye. `thread`: the end to the eye (0.85) and through (1); `low`: the
// wick turned low (the light dimmer, warmer).
const NEEDLE = (() => {
  const E = [-0.06, -0.2], foot = [-0.075, 0.06], Th0 = [0.33, -0.13], Th1 = [-0.15, -0.215];
  const light = { dir: [-0.8, 0.6], colour: LAMP, k: 0.45 };
  const left = placed({ kind: 'moomin', skin: SKIN.mama, L: 0.3, light, curl: [0.7, 0.75, 0.8], thumb: 0.35, side: 1, angle: -1.75 }, [0.62, -0.05], [-0.07, -0.03]);
  const r0 = { kind: 'moomin', skin: SKIN.mama, L: 0.3, light, curl: [0.55, 0.7, 0.8], thumb: 0.25, side: -1, angle: -2.9, arm: 3 };
  const right = (() => { const o = { ...r0, at: [0, 0] }; return { ...o, at: sub2(add2(Th0, [0.045, 0.005]), tipOf(o, 0)) }; })();
  return { E, foot, Th0, Th1, light, left, right };
})();
const needleEnd = (t) => (t < 0.85 ? lerp2(NEEDLE.Th0, NEEDLE.E, ease.inOut(t / 0.85)) : lerp2(NEEDLE.E, NEEDLE.Th1, (t - 0.85) / 0.15));
function paintNeedle(g, C) {
  const P = NEEDLE, rnd = C.e.rnd;
  // the round room at night behind her paws, warm brown going dark at the sides
  const gr = g.createRadialGradient(-0.5, 0.5, 0.05, -0.3, 0.2, 1.5);
  gr.addColorStop(0, '#c28a4c');
  gr.addColorStop(0.45, '#6b4a33');
  gr.addColorStop(1, '#2a1f1b');
  g.fillStyle = gr;
  g.fillRect(-W, -H, 2 * W, 2 * H);
  wash(g, rnd, FULL, '#6b4a33', 36);
  // her lap: the red apron, the linen she sews on it
  g.beginPath();
  g.moveTo(-W, 0.3);
  g.quadraticCurveTo(0, 0.2, W, 0.32);
  g.lineTo(W, H);
  g.lineTo(-W, H);
  g.closePath();
  g.fillStyle = '#b3524a';
  g.fill();
  wash(g, rnd, [-W, 0.25, W, H], '#b3524a', 16);
  blob(g, [[-0.5, 0.36], [-0.05, 0.3], [0.4, 0.38], [0.5, 0.58], [-0.1, 0.62], [-0.55, 0.58]]);
  g.fillStyle = '#e8e0cf';
  g.fill();
  g.strokeStyle = rgba(INK, 0.5);
  g.lineWidth = 0.004;
  g.stroke();
  cord(g, [[-0.3, 0.45], [-0.05, 0.43], [0.2, 0.46]], 0.003, rgba('#7a5a40', 0.7));
  // the lantern's light from below on the left
  C.layer('glow', [-0.55, 0.45], [-W, -0.2, 0.2, H], (g2) => pool(g2, -0.55, 0.45, 0.75, LAMP, 0.45), { blend: 'add', flicker: 0.25 });
  // the needle in her left paw, its eye up
  paw(g, P.left, rnd);
  line(g, ...P.foot, ...P.E, 0.007, '#c9ccd2');
  line(g, P.foot[0] + 0.002, P.foot[1], P.E[0] + 0.002, P.E[1], 0.002, '#ffffff');
  g.strokeStyle = '#9da1aa';
  g.lineWidth = 0.003;
  g.beginPath();
  g.ellipse(P.E[0], P.E[1] + 0.012, 0.004, 0.011, Math.atan2(P.E[0] - P.foot[0], P.foot[1] - P.E[1]), 0, TAU);
  g.stroke();
  // her right paw with the thread's end; the thread from it down to the linen
  C.layer('hand', P.Th0, [-0.3, -0.45, 2.2, H], (g2) => {
    cord(g2, [P.Th0, [P.Th0[0] + 0.05, P.Th0[1] + 0.02], [0.45, 0.15], [0.3, 0.44]], 0.004, '#3c4f7a');
    paw(g2, P.right, rnd);
  });
  // the wick turned low: the room's light dimmer and warmer
  C.layer('dim', [0, 0], FULL, (g2) => { g2.fillStyle = 'rgba(40,20,8,0.55)'; g2.fillRect(-W, -H, 2 * W, 2 * H); });
  C.at(...P.E, 'eye');
}
function liveNeedle(L, now) {
  const P = NEEDLE, t = unit01(now.thread, 0), low = unit01(now.low, 0), Th = needleEnd(t);
  L.set('hand', { x: Th[0] - P.Th0[0], y: Th[1] - P.Th0[1] });
  L.set('glow', { alpha: 1 - 0.55 * low });
  L.set('dim', { alpha: low });
  L.at(...Th, 'thread');
  L.at(...P.E, 'eye');
}

// ── handle ── night, the table: the lantern burning, its wire bail up; Papa's paw round the bail, the son's smaller paw
// beside it. `give`: Papa's paw opens and goes off up to the right; the son's closes on the bail and holds it.
const HANDLE = (() => {
  const Pp = [0.1, -0.24], Sp = [-0.12, -0.235];
  const light = { dir: [0, 1], colour: LAMP, k: 0.5 };
  const papa = (curl) => placed({ kind: 'moomin', skin: SKIN.papa, L: 0.36, light, curl, thumb: curl[0] * 0.8, side: -1, angle: 1.85, arm: 1.3 }, [0.5, 0], Pp);
  const troll = (curl) => placed({ kind: 'moomin', skin: SKIN.troll, L: 0.28, light, curl, thumb: curl[0] * 0.8, side: 1, angle: 1.3, arm: 1.3 }, [0.5, 0], Sp);
  return { Pp, Sp, light, papa, troll };
})();
// the storm lantern close: the font, the globe in its wire guard, the cap, the bail up to (0, top) — lit or not
function lanternBig(g, [x, y], s, lit) {
  // y: the globe's middle; s: its scale (the globe's half-height)
  const k = s / 0.09;
  g.fillStyle = '#6f6a5e';
  g.beginPath();
  g.ellipse(x, y + 0.2 * k, 0.12 * k, 0.03 * k, 0, 0, TAU);
  g.fill();
  g.fillRect(x - 0.12 * k, y + 0.12 * k, 0.24 * k, 0.08 * k);
  g.fillStyle = '#8a8474';
  g.fillRect(x - 0.1 * k, y + 0.09 * k, 0.2 * k, 0.035 * k);
  const glass = g.createRadialGradient(x, y, 0.01 * k, x, y, 0.11 * k);
  glass.addColorStop(0, lit ? '#fff1c8' : '#c8c2b6');
  glass.addColorStop(1, lit ? '#e2b876' : '#8e877b');
  g.fillStyle = glass;
  g.beginPath();
  g.moveTo(x - 0.055 * k, y + 0.09 * k);
  g.bezierCurveTo(x - 0.12 * k, y + 0.05 * k, x - 0.12 * k, y - 0.06 * k, x - 0.055 * k, y - 0.1 * k);
  g.lineTo(x + 0.055 * k, y - 0.1 * k);
  g.bezierCurveTo(x + 0.12 * k, y - 0.06 * k, x + 0.12 * k, y + 0.05 * k, x + 0.055 * k, y + 0.09 * k);
  g.closePath();
  g.fill();
  if (lit) {
    g.fillStyle = '#fff6d8';
    g.beginPath();
    g.moveTo(x, y - 0.05 * k);
    g.quadraticCurveTo(x + 0.02 * k, y + 0.01 * k, x, y + 0.03 * k);
    g.quadraticCurveTo(x - 0.02 * k, y + 0.01 * k, x, y - 0.05 * k);
    g.fill();
  }
  g.strokeStyle = '#4a4640';
  g.lineWidth = 0.008 * k;
  for (const dx of [-0.085, 0, 0.085]) {
    g.beginPath();
    g.moveTo(x + dx * 0.7 * k, y + 0.09 * k);
    g.quadraticCurveTo(x + dx * 1.3 * k, y, x + dx * 0.7 * k, y - 0.1 * k);
    g.stroke();
  }
  g.fillStyle = '#6f6a5e';
  g.fillRect(x - 0.065 * k, y - 0.13 * k, 0.13 * k, 0.035 * k);
  g.beginPath();
  g.moveTo(x - 0.05 * k, y - 0.13 * k);
  g.lineTo(x, y - 0.17 * k);
  g.lineTo(x + 0.05 * k, y - 0.13 * k);
  g.fill();
}
function bail(g, x, y0, top, half, w) {
  g.strokeStyle = '#4a4640';
  g.lineWidth = w;
  g.beginPath();
  g.moveTo(x - half, y0);
  g.bezierCurveTo(x - half * 1.25, top + (y0 - top) * 0.15, x - half * 0.5, top, x, top);
  g.bezierCurveTo(x + half * 0.5, top, x + half * 1.25, top + (y0 - top) * 0.15, x + half, y0);
  g.stroke();
}
function paintHandle(g, C) {
  const P = HANDLE, rnd = C.e.rnd;
  // the round room's dark behind, the table's top below, the lantern's warmth round it
  const gr = g.createLinearGradient(0, -H, 0, H);
  gr.addColorStop(0, '#26293a');
  gr.addColorStop(0.6, '#3a3340');
  gr.addColorStop(1, '#4a3a30');
  g.fillStyle = gr;
  g.fillRect(-W, -H, 2 * W, 2 * H);
  wash(g, rnd, FULL, '#33303c', 32);
  g.fillStyle = '#6b5340';
  g.fillRect(-W, 0.33, 2 * W, H - 0.33);
  wash(g, rnd, [-W, 0.33, W, H], '#6b5340', 12);
  line(g, -W, 0.33, W, 0.33, 0.004, rgba(INK, 0.6));
  pool(g, 0, 0.08, 0.7, LAMP, 0.45);
  lanternBig(g, [0, 0.12], 0.13, true);
  bail(g, 0, 0.0, -0.245, 0.165, 0.011);
  C.layer('glow', [0, 0.12], [-0.6, -0.5, 0.6, 0.62], (g2) => pool(g2, 0, 0.12, 0.45, LAMP, 0.55), { blend: 'add', flicker: 0.2 });
  // the son's paw: open by the bail, then closed on it
  C.layer('troll_open', P.Sp, [-W, -H, 0.1, 0.1], (g2) => paw(g2, P.troll([0.1, 0.1, 0.15]), rnd));
  C.layer('troll_shut', P.Sp, [-W, -H, 0.1, 0.1], (g2) => paw(g2, P.troll([0.85, 0.9, 0.9]), rnd));
  // Papa's paw: round the bail, then opening and going off
  C.layer('papa_shut', P.Pp, [-0.1, -H, W, 0.15], (g2) => paw(g2, P.papa([0.9, 0.9, 0.85]), rnd));
  C.layer('papa_open', P.Pp, [-0.1, -H, W, 0.15], (g2) => paw(g2, P.papa([0.1, 0.15, 0.1]), rnd));
}
function liveHandle(L, now) {
  const P = HANDLE, give = unit01(now.give, 0), open = ease.smooth(span(give, 0, 0.35)), go = ease.inOut(span(give, 0.3, 1));
  const off = [0.32 * go, -0.42 * go];
  L.set('papa_shut', { x: off[0], y: off[1], alpha: (1 - open) * (1 - go) });
  L.set('papa_open', { x: off[0], y: off[1], alpha: open * (1 - go) });
  const shut = ease.smooth(span(give, 0.1, 0.5));
  L.set('troll_open', { alpha: 1 - shut });
  L.set('troll_shut', { alpha: shut });
  L.at(...add2(P.Pp, off), 'papa');
  L.at(...P.Sp, 'troll');
}

// ── match ── the lantern room in the dark: the burner's brass and its wick, the lens drum's glass behind; Papa's paw
// bringing a lit match to the wick, the draught bending its flame. `match`: from far to the wick; `lit`: the wick
// catching; `out`: the match's flame blown out (a wisp of smoke).
const MATCH = (() => {
  const Wk = [0.2, -0.03], F0 = [-0.4, 0.14], F1 = [0.13, -0.01];
  const light = { dir: [1, -0.4], colour: LAMP, k: 0.4 };
  // the paw holds the match's foot between its first finger and thumb; the match runs from there to its head at F0
  const o = { kind: 'moomin', skin: SKIN.papa, L: 0.32, light, curl: [0.7, 0.85, 0.9], thumb: 0.45, side: 1, angle: -0.55 };
  const grip = [-0.5, 0.2];
  const hand = { ...o, at: sub2(grip, sub2(tipOf({ ...o, at: [0, 0] }, 0), [0, 0])) };
  return { Wk, F0, F1, light, hand, grip };
})();
function paintMatch(g, C) {
  const P = MATCH, rnd = C.e.rnd;
  const gr = g.createLinearGradient(0, -H, 0, H);
  gr.addColorStop(0, '#1d2433');
  gr.addColorStop(1, '#2c2a30');
  g.fillStyle = gr;
  g.fillRect(-W, -H, 2 * W, 2 * H);
  wash(g, rnd, FULL, '#252a36', 30);
  // the lens drum's glass behind the burner: tall panes, their prisms catching a little light
  for (let i = -4; i <= 4; i++) {
    const x = P.Wk[0] + i * 0.13;
    g.fillStyle = rgba('#5d7090', 0.18 + 0.06 * (i % 2));
    g.fillRect(x - 0.06, -H, 0.12, 0.5);
    for (let y = -0.55; y < -0.12; y += 0.05) line(g, x - 0.055, y, x + 0.055, y + 0.012, 0.004, rgba('#a9bdd8', 0.18));
  }
  // the burner: a brass collar, the wick tube, the wick's black end
  const b = P.Wk;
  g.fillStyle = BRASS;
  g.beginPath();
  g.ellipse(b[0], b[1] + 0.13, 0.17, 0.04, 0, 0, TAU);
  g.fill();
  g.fillRect(b[0] - 0.17, b[1] + 0.13, 0.34, 0.5);
  g.fillStyle = mixc(BRASS, '#000000', 0.3);
  g.fillRect(b[0] - 0.17, b[1] + 0.3, 0.34, 0.33);
  g.fillStyle = '#8c7240';
  g.fillRect(b[0] - 0.05, b[1] + 0.015, 0.1, 0.12);
  oval(g, b[0], b[1] + 0.015, 0.05, 0.012, 0, '#6b5630');
  oval(g, b[0], b[1] + 0.008, 0.035, 0.01, 0, '#1a1614');
  wash(g, rnd, [b[0] - 0.17, b[1] + 0.1, b[0] + 0.17, H], BRASS, 6);
  g.strokeStyle = rgba(INK, 0.6);
  g.lineWidth = 0.004;
  g.strokeRect(b[0] - 0.17, b[1] + 0.13, 0.34, 0.5);
  // the wick catching: its flame from the wick, its warmth
  C.layer('wickglow', b, [-0.6, -H, W, H], (g2) => pool(g2, b[0], b[1] - 0.05, 0.55, LAMP, 0.6), { blend: 'add', flicker: 0.3 });
  C.layer('wick', b, [b[0] - 0.06, b[1] - 0.2, b[0] + 0.06, b[1] + 0.01], (g2) => {
    g2.fillStyle = '#ffd98a';
    g2.beginPath();
    g2.moveTo(b[0], b[1] - 0.17);
    g2.quadraticCurveTo(b[0] + 0.045, b[1] - 0.04, b[0], b[1]);
    g2.quadraticCurveTo(b[0] - 0.045, b[1] - 0.04, b[0], b[1] - 0.17);
    g2.fill();
    oval(g2, b[0], b[1] - 0.04, 0.015, 0.03, 0, '#fff8e6');
  }, { blend: 'add', flicker: 0.4 });
  // the match in his paw: the stick from his grip to its head at F0
  C.layer('hand', P.F0, [-2.2, -0.2, 0.1, H], (g2) => {
    line(g2, ...P.grip, ...P.F0, 0.012, '#d9c7a0');
    oval(g2, ...P.F0, 0.014, 0.012, 0, '#6b2a20');
    paw(g2, P.hand, rnd);
  });
  // its flame, bent by the draught (turned by live), and its light on the paw
  C.layer('mflame', P.F0, [P.F0[0] - 0.14, P.F0[1] - 0.16, P.F0[0] + 0.14, P.F0[1] + 0.1], (g2) => {
    pool(g2, P.F0[0], P.F0[1] - 0.02, 0.12, LAMP, 0.6);
    g2.fillStyle = '#ffd27a';
    g2.beginPath();
    g2.moveTo(P.F0[0], P.F0[1] - 0.09);
    g2.quadraticCurveTo(P.F0[0] + 0.03, P.F0[1] - 0.01, P.F0[0], P.F0[1] + 0.01);
    g2.quadraticCurveTo(P.F0[0] - 0.03, P.F0[1] - 0.01, P.F0[0], P.F0[1] - 0.09);
    g2.fill();
    oval(g2, P.F0[0], P.F0[1] - 0.015, 0.009, 0.018, 0, '#fff6e0');
  }, { blend: 'add', flicker: 0.5 });
  // blown out: a wisp of smoke up from its head
  C.layer('smoke', P.F0, [P.F0[0] - 0.08, P.F0[1] - 0.3, P.F0[0] + 0.08, P.F0[1]], (g2) => {
    cord(g2, [P.F0, [P.F0[0] + 0.03, P.F0[1] - 0.08], [P.F0[0] - 0.02, P.F0[1] - 0.16], [P.F0[0] + 0.02, P.F0[1] - 0.26]], 0.012, 'rgba(200,205,215,0.35)');
  }, { drift: [0, -0.02], shimmer: 0.4 });
  C.at(...b, 'wick');
}
function liveMatch(L, now) {
  const P = MATCH, m = unit01(now.match, 0), lit = unit01(now.lit, 0), out = unit01(now.out, 0);
  const F = lerp2(P.F0, P.F1, ease.inOut(m)), off = sub2(F, P.F0), t = L.e.t;
  L.set('hand', { x: off[0], y: off[1] });
  L.set('mflame', { x: off[0], y: off[1], rotate: 0.35 * noise(t * 1.7, 3) - 0.15, alpha: 1 - out });
  L.set('smoke', { x: off[0], y: off[1], alpha: out * 0.9 });
  L.set('wick', { sx: 0.3 + 0.7 * lit, sy: lit, alpha: lit > 0 ? 1 : 0 });
  L.set('wickglow', { alpha: lit });
  L.at(...F, 'flame');
  L.at(...P.Wk, 'wick');
}

// ── matchbox ── the moonlit cape: the granite behind, the Fisherman's thin grey hand open out of his oilskin sleeve,
// palm up; Papa's paw laying his matchbox in it. `give`: the box from Papa's paw into the palm (from 0.8 the paw lets
// go and goes back); `close`: the Fisherman's fingers close on it.
const MATCHBOX = (() => {
  const Pm = [0.2, 0.07], B0 = [-0.34, -0.15], B1 = [0.19, 0.04];
  const light = { dir: [0.4, -1], colour: MOON, k: 0.45 };
  // his hand from below on the right, palm up (seen from the palm's side), the fingers toward the upper left
  const fisher = (curl) => placed({ kind: 'fisher', skin: SKIN.fisher, L: 0.46, light, curl, thumb: curl[0] * 0.7, side: -1, angle: -2.55, arm: 1.6 }, [0.3, 0], Pm);
  const papa = placed({ kind: 'moomin', skin: SKIN.papa, L: 0.34, light, curl: [0.65, 0.75, 0.8], thumb: 0.4, side: 1, angle: 0.35, arm: 3 }, [0.85, 0.05], add2(B0, [-0.02, 0.0]));
  return { Pm, B0, B1, light, fisher, papa };
})();
function matchboxOf(g, [x, y], turn) {
  g.save();
  g.translate(x, y);
  g.rotate(turn);
  g.fillStyle = '#c8b27a';
  g.fillRect(-0.06, -0.035, 0.12, 0.07);
  g.fillStyle = '#2f4a7a';
  g.fillRect(-0.05, -0.025, 0.1, 0.05);
  g.fillStyle = '#e6d6a8';
  g.fillRect(-0.03, -0.012, 0.06, 0.024);
  g.fillStyle = '#6b3a28';
  g.fillRect(-0.06, -0.035, 0.12, 0.008);
  g.strokeStyle = rgba(INK, 0.7);
  g.lineWidth = 0.004;
  g.strokeRect(-0.06, -0.035, 0.12, 0.07);
  g.restore();
}
function paintMatchbox(g, C) {
  const P = MATCHBOX, rnd = C.e.rnd;
  // the granite in moonlight: pink gone blue-grey, lichen, a crack
  const gr = g.createLinearGradient(-W, -H, W, H);
  gr.addColorStop(0, '#7d8aa3');
  gr.addColorStop(1, '#3e4558');
  g.fillStyle = gr;
  g.fillRect(-W, -H, 2 * W, 2 * H);
  wash(g, rnd, FULL, '#646a82', 40, 0.22);
  for (let i = 0; i < 14; i++) pool(g, -W + 2 * W * rnd(), -H + 2 * H * rnd(), 0.03 + 0.04 * rnd(), '#b8b98a', 0.3);
  cord(g, [[-1.1, -0.5], [-0.6, -0.3], [-0.2, -0.38], [0.5, -0.2], [1.2, -0.3]], 0.006, rgba('#20242e', 0.6));
  pool(g, -0.3, -0.5, 0.8, MOON, 0.25);
  // his hand, its fingers open (the closing ones a layer over the box)
  paw(g, { ...P.fisher([0.1, 0.05, 0.1, 0.15]), parts: ['arm', 'palm', 'thumb'] }, rnd);
  C.layer('f_open', P.Pm, [-0.3, -0.4, 0.5, 0.4], (g2) => paw(g2, { ...P.fisher([0.1, 0.05, 0.1, 0.15]), parts: ['fingers'] }, rnd));
  // the box (moved by live from Papa's paw to the palm), Papa's paw holding it
  C.layer('box', P.B0, [P.B0[0] - 0.09, P.B0[1] - 0.09, P.B0[0] + 0.09, P.B0[1] + 0.09], (g2) => matchboxOf(g2, P.B0, 0.15));
  C.layer('papa', P.B0, [-2.2, -H, 0.1, 0.3], (g2) => paw(g2, P.papa, rnd));
  C.layer('f_shut', P.Pm, [-0.3, -0.4, 0.5, 0.4], (g2) => paw(g2, { ...P.fisher([0.95, 0.95, 0.95, 0.9]), parts: ['fingers', 'thumb'] }, rnd));
  C.at(...P.Pm, 'palm');
}
function liveMatchbox(L, now) {
  const P = MATCHBOX, give = unit01(now.give, 0), close = unit01(now.close, 0);
  const u = ease.inOut(span(give, 0, 0.8)), back = ease.inOut(span(give, 0.8, 1));
  const B = lerp2(P.B0, P.B1, u), off = sub2(B, P.B0);
  L.set('box', { x: off[0], y: off[1], rotate: -0.15 * u });
  L.set('papa', { x: off[0] - 0.3 * back, y: off[1] - 0.25 * back, alpha: 1 - back });
  L.set('f_open', { alpha: 1 - ease.smooth(close) });
  L.set('f_shut', { alpha: ease.smooth(close) });
  L.at(...B, 'box');
  L.at(...P.Pm, 'palm');
}

// ── mooring ── a quiet morning: the pink granite by the water, the iron ring let into it, the boat's mooring rope
// through it, its end in Papa's paw. `free`: the paw opens, the rope slips off the ring into the water.
const MOORING = (() => {
  const Rg = [-0.17, -0.06], Rp = [0.22, 0.05];
  const light = { dir: [-0.8, -0.5], colour: DAWN, k: 0.4 };
  const papa = (curl) => placed({ kind: 'moomin', skin: SKIN.papa, L: 0.36, light, curl, thumb: curl[0] * 0.8, side: -1, angle: -2.6, arm: 2.5 }, [0.55, 0], Rp);
  return { Rg, Rp, light, papa };
})();
function paintMooring(g, C) {
  const P = MOORING, rnd = C.e.rnd;
  // the granite, pink in the morning, its grain; the water below with the light on it
  const gr = g.createLinearGradient(0, -H, 0, 0.35);
  gr.addColorStop(0, '#d9ab9c');
  gr.addColorStop(1, '#a87d76');
  g.fillStyle = gr;
  g.fillRect(-W, -H, 2 * W, H + 0.35);
  wash(g, rnd, [-W, -H, W, 0.35], '#c49488', 44, 0.2);
  for (let i = 0; i < 120; i++) oval(g, -W + 2 * W * rnd(), -H + (H + 0.33) * rnd(), 0.004, 0.003, 0, rgba(rnd() < 0.5 ? '#5a4a48' : '#f3e2d8', 0.45));
  g.beginPath();
  g.moveTo(-W, 0.36);
  for (let x = -W; x <= W; x += 0.1) g.lineTo(x, 0.34 + 0.02 * Math.sin(x * 7));
  g.lineTo(W, H);
  g.lineTo(-W, H);
  g.closePath();
  g.fillStyle = '#7f95a8';
  g.fill();
  C.layer('glints', [0, 0.45], [-W, 0.34, W, H], (g2) => {
    for (let i = 0; i < 60; i++) { const x = -W + 2 * W * rnd(), y = 0.38 + 0.22 * rnd(); line(g2, x, y, x + 0.03 + 0.03 * rnd(), y, 0.004, 'rgba(255,240,225,0.55)'); }
  }, { drift: [0.02, 0], shimmer: 0.5 });
  // the iron ring let into the rock, rust on it
  oval(g, P.Rg[0], P.Rg[1] - 0.09, 0.03, 0.02, 0, '#3a2c26');
  g.strokeStyle = '#4a3a32';
  g.lineWidth = 0.022;
  g.beginPath();
  g.ellipse(P.Rg[0], P.Rg[1], 0.07, 0.085, 0, 0, TAU);
  g.stroke();
  g.strokeStyle = rgba('#b0623a', 0.6);
  g.lineWidth = 0.008;
  g.stroke();
  // the rope: from the water up over the ring and round it, its end on to his paw (one layer: it slips away whole)
  C.layer('rope', P.Rg, [-W, -0.3, 0.6, H], (g2) => {
    const pts = [[-0.7, H], [-0.45, 0.25], [-0.24, 0.02], [P.Rg[0] + 0.02, P.Rg[1] - 0.08], [P.Rg[0] + 0.1, P.Rg[1] - 0.02], [0.02, 0.05], P.Rp];
    cord(g2, pts, 0.026, '#7a6040');
    cord(g2, pts, 0.018, ROPE);
    for (let i = 0; i < 40; i++) {
      const s = pts[1 + Math.floor(rnd() * (pts.length - 2))];
      line(g2, s[0] + 0.03 * (rnd() - 0.5), s[1] + 0.03 * (rnd() - 0.5), s[0] + 0.03 * (rnd() - 0.5) + 0.01, s[1] + 0.01, 0.003, rgba('#5c4630', 0.5));
    }
  });
  C.layer('shut', P.Rp, [-0.1, -0.3, W, H], (g2) => paw(g2, P.papa([0.85, 0.9, 0.85]), rnd));
  C.layer('open', P.Rp, [-0.1, -0.3, W, H], (g2) => paw(g2, P.papa([0.05, 0.1, 0.1]), rnd));
}
function liveMooring(L, now) {
  const P = MOORING, free = unit01(now.free, 0), open = ease.smooth(span(free, 0, 0.3)), slip = ease.in(span(free, 0.3, 1));
  L.set('shut', { alpha: 1 - open });
  L.set('open', { alpha: open, x: 0.04 * open, y: -0.03 * open });
  L.set('rope', { x: -0.35 * slip, y: 0.45 * slip, rotate: 0.5 * slip, alpha: 1 - span(free, 0.75, 1) });
  L.at(...P.Rp, 'rope');
}

// ── paws ── night in the boat: the dark stern's planks, the black sea beyond; the son's paws round the burning lantern,
// white with rime; Mama's paws come down over his and rub them. `frost`: the rime on his paws; `rub`: Mama's paws over
// his, rubbing; `thaw`: the rime going, his paws warming.
const PAWS = (() => {
  const C0 = [0, 0.13], Lc = [0, 0.02];
  const light = { dir: [0, -1], colour: LAMP, k: 0.5 };
  const left = placed({ kind: 'moomin', skin: SKIN.troll, L: 0.27, light, curl: [0.75, 0.8, 0.8], thumb: 0.4, side: -1, angle: -0.95 }, [0.6, 0], [-0.135, 0.15]);
  const right = placed({ kind: 'moomin', skin: SKIN.troll, L: 0.27, light, curl: [0.75, 0.8, 0.8], thumb: 0.4, side: 1, angle: -2.19 }, [0.6, 0], [0.135, 0.15]);
  const mamaL = placed({ kind: 'moomin', skin: SKIN.mama, L: 0.34, light, curl: [0.35, 0.35, 0.4], thumb: 0.2, side: 1, angle: 0.35, arm: 3 }, [0.55, 0], [-0.08, 0.16]);
  const mamaR = placed({ kind: 'moomin', skin: SKIN.mama, L: 0.34, light, curl: [0.35, 0.35, 0.4], thumb: 0.2, side: -1, angle: Math.PI - 0.35, arm: 3 }, [0.55, 0], [0.08, 0.16]);
  return { C0, Lc, light, left, right, mamaL, mamaR };
})();
function paintPaws(g, C) {
  const P = PAWS, rnd = C.e.rnd;
  // the sea at night up top, the stern's planks below, wet and grey-brown
  const sea = g.createLinearGradient(0, -H, 0, -0.1);
  sea.addColorStop(0, '#1b2638');
  sea.addColorStop(1, '#2c3b52');
  g.fillStyle = sea;
  g.fillRect(-W, -H, 2 * W, H);
  for (let i = 0; i < 50; i++) { const x = -W + 2 * W * rnd(), y = -H + 0.5 * rnd(); line(g, x, y, x + 0.04, y, 0.003, rgba(MOON, 0.35)); }
  for (let k = 0; k < 6; k++) {
    const y = -0.15 + k * 0.14;
    g.fillStyle = k % 2 ? '#5d4c3d' : '#544436';
    g.fillRect(-W, y, 2 * W, 0.14);
    line(g, -W, y, W, y, 0.004, rgba('#1e1812', 0.7));
  }
  wash(g, rnd, [-W, -0.15, W, H], '#56463a', 26);
  pool(g, ...P.Lc, 0.75, LAMP, 0.4);
  // the lantern, burning, held between his paws
  lanternBig(g, P.Lc, 0.12, true);
  bail(g, P.Lc[0], P.Lc[1] - 0.12, -0.33, 0.15, 0.01);
  C.layer('glow', P.Lc, [-0.7, -0.6, 0.7, 0.62], (g2) => pool(g2, ...P.Lc, 0.4, LAMP, 0.5), { blend: 'add', flicker: 0.25 });
  // his paws, a little blue with cold; the rime over them; his warmth coming back
  paw(g, P.left, rnd);
  paw(g, P.right, rnd);
  C.layer('cold', P.C0, [-0.6, -0.1, 0.6, H], (g2) => {
    for (const o of [P.left, P.right]) { g2.save(); g2.globalAlpha = 0.45; paw(g2, { ...o, skin: '#a9bfd8' }, rnd); g2.restore(); }
  });
  C.layer('rime', P.C0, [-0.6, -0.1, 0.6, H], (g2) => { rimeOn(g2, P.left, rnd, 46); rimeOn(g2, P.right, rnd, 46); });
  C.layer('warm', P.C0, [-0.6, -0.1, 0.6, H], (g2) => {
    for (const o of [P.left, P.right]) { const c = pawPoint(o, [0.4, 0]); pool(g2, ...c, 0.12, '#f2a8a0', 0.4); }
  });
  // Mama's paws, coming down from above over his
  C.layer('mama', P.C0, [-W, -H, W, 0.4], (g2) => { paw(g2, P.mamaL, rnd); paw(g2, P.mamaR, rnd); });
}
function livePaws(L, now) {
  const P = PAWS, frost = unit01(now.frost, 1), rub = unit01(now.rub, 0), thaw = unit01(now.thaw, 0), t = L.e.t;
  const cold = frost * (1 - thaw);
  L.set('rime', { alpha: cold });
  L.set('cold', { alpha: cold });
  L.set('warm', { alpha: thaw * 0.8 });
  const come = ease.out(rub), r = rub > 0.5 ? (rub - 0.5) * 2 : 0;
  L.set('mama', { x: 0.018 * r * Math.sin(t * 7), y: -0.45 * (1 - come) + 0.01 * r * Math.cos(t * 7), alpha: span(rub, 0, 0.25) });
  L.at(...P.C0, 'paws');
}

const SHOTS = {
  knot: { paint: paintKnot, live: liveKnot, first: 'hard' },
  needle: { paint: paintNeedle, live: liveNeedle, first: 'glow' },
  handle: { paint: paintHandle, live: liveHandle, first: 'glow' },
  match: { paint: paintMatch, live: liveMatch, first: 'wickglow' },
  matchbox: { paint: paintMatchbox, live: liveMatchbox, first: 'f_open' },
  mooring: { paint: paintMooring, live: liveMooring, first: 'glints' },
  paws: { paint: paintPaws, live: livePaws, first: 'glow' },
};
// where a shot stands on the stage (stage heights): the whole frame, its middle at the frame's
function frameOf(e) {
  const ax = e.aspect / 2, ay = 0.5;
  return { ax, ay, to: (x, y) => [ax + x, ay + y] };
}

// paint(g, e, shot) — an insert's code. shot — "knot" | "needle" | "handle" | "match" | "matchbox" | "mooring" |
// "paws". The painting reads no key of the scene
function paint(g, e, shot) {
  const S = SHOTS[shot];
  if (!S) { e.warn(`closeups: no shot "${shot}"`); return; }
  const { ax, ay, to } = frameOf(e);
  const C = {
    e,
    // a layer of the shot, painted in the shot's units: what it turns and scales about, the box its paint fits in, the
    // engine's own motion of it (flicker, shimmer, blend, drift)
    layer(name, pivot, box, fn, opts) {
      e.layer(name, { ...opts, pivot: to(...pivot), box: [...to(box[0], box[1]), ...to(box[2], box[3])] }, (g2) => {
        g2.translate(ax, ay);
        fn(g2);
      });
    },
    // the canvas transform of the moment already maps shot units to the stage: pass them as they are
    at: (x, y, name) => e.at(x, y, name),
  };
  g.save();
  g.translate(ax, ay);
  S.paint(g, C);
  g.restore();
}

// live(e, shot, now) — an insert's animate: nothing painted, the layers moved and the moving points marked. now (a
// field missing — its default): knot { pull, paws, flash }, needle { thread, low }, handle { give }, match { match,
// lit, out }, matchbox { give, close }, mooring { free }, paws { frost, rub, thaw }
function live(e, shot, now) {
  const S = SHOTS[shot];
  // (nothing of it to move while it is not painted — closed, or its layers not there yet)
  if (!S || !e.layer(S.first).scaleX) return;
  const { to } = frameOf(e);
  S.live({
    e,
    // a layer moved (the shot's units), turned about its pivot (radians, clockwise), scaled about it, shown, dimmed
    set(name, { x = 0, y = 0, rotate = 0, scale = 1, sx = scale, sy = scale, alpha = 1, brightness = 1 }) {
      const h = e.layer(name);
      h.x = x;
      h.y = y;
      h.rotate = rotate;
      h.scaleX = sx;
      h.scaleY = sy;
      h.alpha = alpha;
      h.brightness = brightness;
    },
    at: (x, y, name) => e.at(...to(x, y), name),
  }, now ?? {});
}

return { paint, live };
