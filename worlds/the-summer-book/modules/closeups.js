// The world's close-ups of hands and small things: fourteen shots for the inserts of «The Summer Book»'s scenes —
// `teeth` (Grandmother's false teeth lifted out of the peony bed by Sophia's fingers), `stems` (Grandmother's old hand
// drawing a peony stem out of the earth), `knife` (her hands carving a seal out of driftwood), `match` (a match struck
// and held to her cigarette), `gunwale` (her two hands pushing Eriksson's boat off), `knot` (her fingers drawing the
// thread out of a hard knot in the net), `tremble` (her hands flat on the wet rock, shaking), `gap` (the gap between
// the two beds by moonlight, her open palm, Sophia's hand coming into it), `breast` (Sophia's palm on her breast in
// the candle's light), `sleeve` (Sophia's fingers on Grandmother's sleeve, letting go), `string` (the parcel's bow
// pulled), `palm` (Grandmother's palm by the tent's glowing canvas at night, knocking), `oars` (Sophia's hands on the
// oars, Grandmother's over them, lifting away), `rail` (her hand leaving the gangway's rope rail in the fog). No faces.
// Human hands: Grandmother's thin and old, the knuckles big, out of her dark-blue sleeve; Sophia's small, a child's,
// sunburnt. Painted in the world's flat way: straight-edged shapes in quiet colours, each lit side a plain lighter
// facet; their light is painted (the pearl-grey day, the moon's blue, a candle's or a match's warm).
//   paint(g, e, shot) is an insert's code: the shot painted once, each thing that moves a layer. live(e, shot, now) is
// its animate: `now` — what moves — only sets the layers' numbers and marks the points. The painting reads no key of
// the scene. closeups.md says how a scene uses it.
//   A shot's own units: the frame's height, the origin in the frame's middle (y down); the background is painted out
// to ±1.3 of the frame's height (21:9 whole), the hands, the things and the points within the middle 4:3.
const { clamp, span, ease, noise } = anim;
const TAU = 2 * Math.PI;
const num = (v, d) => (typeof v === 'number' && Number.isFinite(v) ? v : d);
const unit01 = (v, d) => clamp(num(v, d), 0, 1);

// (colours: a module stands by itself — the same skins, dress, frock, canvas, boats and rock as the world's cast and
// scenes)
const rgbOf = (c) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
const mixc = (a, b, u) => `#${rgbOf(a).map((v, i) => Math.round(v + (rgbOf(b)[i] - v) * u).toString(16).padStart(2, '0')).join('')}`;
const rgba = (c, a) => `rgba(${rgbOf(c).join(',')},${a})`;
const DAY = '#f1efe8', MOON = '#b8c8e4', CANDLE = '#ffc983', FLAME = '#ffd98e', NIGHT = '#27314d';
const SKIN = { grandma: '#d7b49c', sophia: '#dba183' };
const DRESS = '#3f4a5c', NIGHTIE = '#ebe6dc', FROCK = '#c47f6c';
const EARTH = '#6f5b49', ROOT = '#c6a67f', LEAF = '#4f6a4c', LEAF2 = '#5f7a57', STEM = '#6e7a48';
const GRANITE = '#b1a798', TAR = '#3a3129', WOOD = '#a8a294', FRESH = '#dcc79f', CANVAS = '#e2dac8';

// ── flat shapes ──
const add2 = (p, q) => [p[0] + q[0], p[1] + q[1]];
const sub2 = (p, q) => [p[0] - q[0], p[1] - q[1]];
const mul2 = (p, k) => [p[0] * k, p[1] * k];
const lerp2 = (p, q, u) => [p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u];
const turned = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
const unit = (p) => { const n = Math.hypot(p[0], p[1]) || 1; return [p[0] / n, p[1] / n]; };
function path(g, pts) {
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
  g.closePath();
}
// a straight-edged shape: filled, its edge drawn if asked
function poly(g, pts, fill, edge, w) {
  path(g, pts);
  if (fill) { g.fillStyle = fill; g.fill(); }
  if (edge) { g.strokeStyle = edge; g.lineWidth = w; g.lineJoin = 'round'; g.stroke(); }
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
function polyline(g, pts, w, colour) {
  g.strokeStyle = colour;
  g.lineWidth = w;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
  g.stroke();
}
// a many-sided round thing (a knuckle, a clod, a crumb): straight sides, a little uneven
function gon(g, x, y, r, n, fill, rnd, k = 0.25, ry = r) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU, q = 1 - k / 2 + k * (rnd ? rnd() : 0.5);
    pts.push([x + Math.cos(a) * r * q, y + Math.sin(a) * ry * q]);
  }
  poly(g, pts, fill);
  return pts;
}
// light painted in: a soft pool fading out from a point (a candle's, a lamp's, the moon's on a thing)
function pool(g, x, y, r, colour, strength) {
  const gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, rgba(colour, strength));
  gr.addColorStop(1, rgba(colour, 0));
  g.fillStyle = gr;
  g.fillRect(x - r, y - r, 2 * r, 2 * r);
}
// flat bands across the whole frame, top to bottom (a sky, water, a wall going lighter or darker)
function bands(g, y0, y1, colours) {
  const h = (y1 - y0) / colours.length;
  colours.forEach((c, i) => { g.fillStyle = c; g.fillRect(-W, y0 + i * h, 2 * W, h + 0.002); });
}

// ── the hand ──
// One human hand for every shot. Its own units are its length (the wrist to the middle finger's tip, laid flat): the
// wrist at (0, 0), the fingers toward +x, the thumb on the −y side. A spec places and poses it:
//   who — "grandma" (thin and old, the knuckles big, tendons and veins on its back) or "sophia" (small, a child's,
//   sunburnt); at — the wrist in the shot; angle — where the fingers point (radians, 0 to the right, + clockwise); L —
//   its length; side — 1, or −1: mirrored (seen from its back, side 1 is a right hand, −1 a left; from the palm the
//   other way round); view — "back" or "palm"; curl — each finger's (index … little), 0 straight … 1 curled in (seen
//   from above it shortens, its end turned under); thumb — its curl (across the palm); spread — the fingers fanned;
//   arm — the forearm's length, in hands (it runs out of the frame); sleeve — "dress" (Grandmother's dark-blue sleeve to
//   the wrist), "nightie" (a white nightdress's sleeve on the forearm), "bare"; light — { dir: toward the light (shot
//   units), colour, k }; skin — its colour if not its own; tone — one flat colour for all of it (a shadow of it);
//   parts — which of "arm", "palm", "fingers", "thumb".
const KINDS = {
  grandma: {
    skin: SKIN.grandma, wrist: 0.12, palmW: 0.2, kx: 0.5, knuckle: 1.3, old: true, sleeve: 'dress',
    fingers: [{ y: -0.145, len: 0.44, w: 0.057, a: -0.1 }, { y: -0.048, len: 0.5, w: 0.06, a: -0.03 }, { y: 0.048, len: 0.47, w: 0.057, a: 0.04 }, { y: 0.14, len: 0.38, w: 0.05, a: 0.12 }],
    thumb: { root: [0.16, -0.13], dir: -0.8, len: 0.38, w: 0.066 },
  },
  sophia: {
    skin: SKIN.sophia, wrist: 0.135, palmW: 0.205, kx: 0.56, knuckle: 1, old: false, sleeve: 'bare',
    fingers: [{ y: -0.148, len: 0.37, w: 0.07, a: -0.1 }, { y: -0.05, len: 0.43, w: 0.073, a: -0.03 }, { y: 0.05, len: 0.4, w: 0.07, a: 0.04 }, { y: 0.143, len: 0.32, w: 0.063, a: 0.12 }],
    thumb: { root: [0.2, -0.14], dir: -0.78, len: 0.32, w: 0.08 },
  },
};
const HAND = { side: 1, view: 'back', curl: [0, 0, 0, 0], thumb: 0, spread: 0, arm: 6, parts: ['arm', 'palm', 'fingers', 'thumb'] };
// where a point of the hand's own units is in the shot
const handPoint = (o, [x, y]) => add2(o.at, turned([x * o.L, y * o.L * (o.side ?? 1)], o.angle));
// a hand placed so that its own point p lands on the shot's point target
const placed = (o, p, target) => ({ ...o, at: sub2(target, handPoint({ ...o, at: [0, 0] }, p)) });
// a hand placed so that the tips of its index and thumb meet at the shot's point target (a pinch)
function pinched(o, target) {
  const o0 = { ...HAND, ...o, at: [0, 0] }, m = lerp2(tipOf(o0, 0), tipOf(o0, 4), 0.5);
  return { ...o, at: sub2(target, m) };
}
// a finger's joints (the hand's own units), as curled and spread: its knuckle, its joints, its tip. Seen from above,
// a curling finger folds away: its outer joints go under one by one, a fist shows only the first ones and the knuckles
function fingerOf(o, K, i) {
  const f = K.fingers[i], c = (o.curl ?? [])[i] ?? 0, a = f.a * (1 + 1.6 * (o.spread ?? 0));
  const segs = [0.46 * (1 - 0.4 * c), 0.31 * Math.max(0, 1 - 1.5 * c), 0.23 * Math.max(0, 1 - 2 * c)].map((r) => r * f.len).filter((l) => l > 0.01);
  const pts = [[K.kx - 0.03, f.y]];
  for (const l of segs) { const p = pts[pts.length - 1]; pts.push([p[0] + Math.cos(a) * l, p[1] + Math.sin(a) * l]); }
  return { pts, w: f.w, c };
}
function thumbOf(o, K) {
  const t = K.thumb, c = o.thumb ?? 0, a = t.dir + 0.95 * c, len = t.len * (1 - 0.3 * c);
  const p1 = add2(t.root, [Math.cos(a) * len * 0.55, Math.sin(a) * len * 0.55]);
  const a2 = a + 0.35 * c;
  return { pts: [t.root, p1, add2(p1, [Math.cos(a2) * len * 0.45, Math.sin(a2) * len * 0.45])], w: t.w };
}
// a fingertip in the shot (0: the index, 4: the thumb) — what a hand pinches with
function tipOf(o, i) {
  const K = KINDS[o.who], f = i < 4 ? fingerOf(o, K, i) : thumbOf(o, K), n = f.pts.length;
  const d = unit(sub2(f.pts[n - 1], f.pts[n - 2]));
  return handPoint(o, add2(f.pts[n - 1], mul2(d, f.w * 0.5)));
}
// toward the light, in the hand's own units
function lightIn(o) {
  const L = o.light ?? { dir: [-0.5, -1], colour: DAY, k: 0.3 };
  const d = turned(L.dir, -o.angle);
  return unit([d[0], d[1] * (o.side ?? 1)]);
}
// a finger or a thumb: straight-sided joints tapering to a cut tip; the half toward the light a lighter facet
function digit(g, ch, cols, ld, fine, nails, old, knuckle) {
  const pts = ch.pts, n = pts.length - 1;
  for (let j = 0; j < n; j++) {
    const p0 = pts[j], q = pts[j + 1], d = unit(sub2(q, p0)), nn = [-d[1], d[0]];
    const wa = ch.w * (1 - 0.1 * j), wb = ch.w * (1 - 0.1 * (j + 1));
    const p = sub2(p0, mul2(d, wa * 0.4)), s = nn[0] * ld[0] + nn[1] * ld[1] >= 0 ? 1 : -1;
    const tip = j === n - 1, under = tip && ch.c > 0.55, cl = under ? 0.45 : 0.75;
    const cap = tip ? [add2(q, add2(mul2(d, wb * cl), mul2(nn, wb * 0.6))), add2(q, add2(mul2(d, wb * cl), mul2(nn, -wb * 0.6)))] : [add2(q, mul2(d, wb * 0.2))];
    const whole = tip
      ? [add2(p, mul2(nn, wa)), add2(q, mul2(nn, wb)), cap[0], cap[1], add2(q, mul2(nn, -wb)), add2(p, mul2(nn, -wa))]
      : [add2(p, mul2(nn, wa)), add2(q, mul2(nn, wb)), add2(q, mul2(nn, -wb)), add2(p, mul2(nn, -wa))];
    poly(g, whole, cols.base);
    const mid = tip ? add2(q, mul2(d, wb * cl)) : q;
    poly(g, [p, add2(p, mul2(nn, s * wa)), add2(q, mul2(nn, s * wb)), ...(tip ? [s > 0 ? cap[0] : cap[1]] : []), mid], under ? cols.knuckle : cols.lit);
    poly(g, whole, null, cols.edge, fine);
    if (under && cols.edge) line(g, ...add2(q, mul2(nn, wb * 0.7)), ...add2(q, mul2(nn, -wb * 0.7)), fine * 0.8, cols.edge);
    if (tip && nails && !under) {
      const a0 = sub2(q, mul2(d, wb * 0.55)), a1 = add2(q, mul2(d, wb * 0.55));
      poly(g, [add2(a0, mul2(nn, wb * 0.55)), add2(a1, mul2(nn, wb * 0.45)), add2(a1, mul2(nn, -wb * 0.45)), add2(a0, mul2(nn, -wb * 0.55))], cols.nail, cols.edge, fine * 0.7);
    }
    // an old hand's joints: big bony knuckles
    if (old && j < n - 1 && knuckle) {
      const r = wb * 0.62 * knuckle;
      const k = [];
      for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; k.push(add2(q, [Math.cos(a) * r * 1.05, Math.sin(a) * r])); }
      poly(g, k, cols.knuckle, cols.edge, fine * 0.8);
    }
  }
}
function hand(g, spec, rnd) {
  const o = { ...HAND, ...spec }, K = KINDS[o.who], fine = 0.004 / o.L, side = o.side ?? 1;
  const skin = o.skin ?? K.skin, L = o.light ?? { dir: [-0.5, -1], colour: DAY, k: 0.3 }, ld = lightIn(o);
  const palmView = o.view === 'palm';
  const base0 = palmView ? mixc(skin, '#f2cfc0', 0.25) : skin;
  const cols = o.tone
    ? { base: o.tone, lit: o.tone, under: o.tone, edge: null, nail: o.tone, knuckle: o.tone }
    : {
      base: mixc(base0, '#6d6f88', 0.12), lit: mixc(base0, L.colour, L.k), under: mixc(base0, '#5a3e36', 0.22),
      edge: rgba(mixc(skin, '#33201a', 0.6), 0.75), nail: mixc(skin, '#fff4ec', 0.4), knuckle: mixc(skin, L.colour, L.k * 0.6),
    };
  g.save();
  g.translate(o.at[0], o.at[1]);
  g.rotate(o.angle);
  g.scale(o.L, o.L * side);
  const lit = (up) => (up === ld[1] < 0 ? cols.lit : cols.base);
  if (o.parts.includes('arm')) {
    const back = -o.arm, w0 = K.wrist, w1 = K.wrist * (K.old ? 1.45 : 1.6);
    poly(g, [[0.05, -w0], [back, -w1], [back, 0], [0.05, 0]], lit(true));
    poly(g, [[0.05, 0], [back, 0], [back, w1], [0.05, w0]], lit(false));
    poly(g, [[0.05, -w0], [back, -w1], [back, w1], [0.05, w0]], null, cols.edge, fine);
    if (!K.old && !o.tone) line(g, -0.05, w0 * 0.3, -0.5, w0 * 0.5, fine * 0.8, rgba(mixc(skin, '#33201a', 0.4), 0.35));
    const sleeve = o.sleeve ?? K.sleeve;
    if (sleeve !== 'bare') {
      // the sleeve: Grandmother's dark-blue dress to the wrist, a nightdress's white higher up the forearm
      const s0 = sleeve === 'dress' ? -0.05 : -0.42, sw0 = sleeve === 'dress' ? w0 * 1.5 : w0 * 1.9, sw1 = sw0 * 1.35;
      const cl = o.tone ?? (sleeve === 'dress' ? DRESS : NIGHTIE);
      const sl = o.tone ?? mixc(cl, L.colour, L.k * 0.6), sd = o.tone ?? mixc(cl, '#1c2030', 0.18);
      poly(g, [[s0, -sw0], [back, -sw1], [back, 0], [s0 + 0.01, 0]], ld[1] < 0 ? sl : sd);
      poly(g, [[s0 + 0.01, 0], [back, 0], [back, sw1], [s0, sw0]], ld[1] < 0 ? sd : sl);
      if (!o.tone) {
        poly(g, [[s0, -sw0], [back, -sw1], [back, sw1], [s0, sw0]], null, rgba(mixc(cl, '#000000', 0.5), 0.7), fine);
        // its cuff, its folds (straight creases)
        if (sleeve === 'dress') poly(g, [[s0, -sw0], [s0 - 0.07, -sw0 * 1.04], [s0 - 0.07, sw0 * 1.04], [s0, sw0]], mixc(cl, '#000000', 0.15));
        else for (let i = 0; i < 5; i++) { const y = -sw0 + (2 * sw0 * (i + 0.5)) / 5; poly(g, [[s0, y - 0.02], [s0 + 0.035, y], [s0, y + 0.02]], cl, rgba('#8a8478', 0.6), fine * 0.7); }
        for (let i = 0; i < 3; i++) line(g, s0 - 0.25 - 0.35 * i, -sw0 * 0.9, s0 - 0.38 - 0.35 * i, sw0 * 0.6, fine * 0.9, rgba(mixc(cl, '#000000', 0.45), 0.45));
      }
    }
  }
  const pw = K.palmW, kx = K.kx;
  const top = [[0, 0], [0, -K.wrist], [0.2, -pw * 0.97], [kx - 0.02, -pw], [kx + 0.02, -pw * 0.35], [kx + 0.03, 0]];
  const bot = [[0, 0], [kx + 0.03, 0], [kx + 0.03, pw * 0.3], [kx - 0.03, pw * 0.93], [0.18, pw * 0.88], [0, K.wrist]];
  const palm = () => {
    poly(g, top, lit(true));
    poly(g, bot, lit(false));
    poly(g, [...top.slice(1), ...bot.slice(2)], null, cols.edge, fine);
    if (o.tone) return;
    if (palmView) {
      // the palm's creases, straight strokes
      const cr = rgba(mixc(skin, '#5a3328', 0.5), 0.5);
      polyline(g, [[kx - 0.08, -pw * 0.75], [kx - 0.16, -pw * 0.2], [kx - 0.12, pw * 0.5]], fine, cr);
      polyline(g, [[0.2, -pw * 0.85], [0.17, -pw * 0.3], [0.06, pw * 0.1]], fine, cr);
      polyline(g, [[kx - 0.04, -pw * 0.4], [kx - 0.22, 0], [0.14, pw * 0.3]], fine * 0.8, cr);
    } else if (K.old) {
      // the back of an old hand: tendons to the knuckles, a vein, a few brown spots
      for (const f of K.fingers) line(g, 0.04, f.y * 0.35, kx - 0.04, f.y, fine * 1.1, rgba(mixc(skin, '#ffffff', 0.35), 0.55));
      polyline(g, [[0.02, 0.03], [0.14, -0.02], [0.26, 0.04], [0.36, 0.0]], fine * 1.2, rgba('#7d86a0', 0.5));
      for (let i = 0; i < 4; i++) gon(g, 0.12 + 0.3 * rnd(), (rnd() - 0.5) * pw, 0.012 + 0.008 * rnd(), 6, rgba('#8a5f45', 0.35), rnd);
      for (const f of K.fingers) gon(g, kx - 0.03, f.y, f.w * 0.8, 7, cols.knuckle);
    }
  };
  const fingers = () => {
    if (!o.parts.includes('fingers')) return;
    for (let i = 3; i >= 0; i--) digit(g, fingerOf(o, K, i), cols, ld, fine, !palmView && !o.tone, K.old && !palmView && !o.tone, K.knuckle);
  };
  const thumb = () => { if (o.parts.includes('thumb')) digit(g, { ...thumbOf(o, K), c: 0 }, cols, ld, fine, !palmView && !o.tone, K.old && !palmView && !o.tone, K.knuckle); };
  if (palmView) { if (o.parts.includes('palm')) palm(); fingers(); thumb(); }
  else { thumb(); if (o.parts.includes('palm')) palm(); fingers(); }
  g.restore();
}

// ── a shot's frame ──
const W = 1.3, H = 0.62;
const FULL = [-W, -H, W, H];

// ── teeth ── the peony bed by the porch: dark green leaves above, the earth below with the peonies' pale roots in it;
// Grandmother's false teeth among them, Sophia's small fingers holding them by the back. `show`: the fingers lift them
// out of the earth and up, the crumbs falling off.
const TEETH = (() => {
  const T0 = [0.02, 0.16], T1 = [0.02, -0.08];
  const light = { dir: [-0.4, -1], colour: DAY, k: 0.35 };
  const hand = pinched({ who: 'sophia', L: 0.3, light, curl: [0.3, 0.7, 0.8, 0.85], thumb: 0.35, side: 1, angle: 2.35 }, add2(T0, [0.1, -0.03]));
  return { T0, T1, light, hand };
})();
const teethAt = (show) => lerp2(TEETH.T0, TEETH.T1, ease.inOut(show));
function denture(g, at, rnd) {
  g.save();
  g.translate(at[0], at[1]);
  g.scale(1.25, 1.25);
  const x = 0, y = 0;
  // the pink gum's arch on top, the row of teeth hanging below it (seen from the front)
  poly(g, [[x - 0.088, y - 0.012], [x - 0.07, y - 0.04], [x - 0.03, y - 0.05], [x + 0.03, y - 0.05], [x + 0.07, y - 0.04], [x + 0.088, y - 0.012], [x + 0.08, y + 0.004], [x - 0.08, y + 0.004]], '#d98e88', rgba('#6b3a36', 0.7), 0.003);
  poly(g, [[x - 0.07, y - 0.04], [x - 0.03, y - 0.05], [x + 0.03, y - 0.05], [x + 0.02, y - 0.03], [x - 0.05, y - 0.025]], '#eaaaa2');
  for (let i = 0; i < 8; i++) {
    const u = (i + 0.5) / 8 - 0.5, tx = x + u * 0.15, w = 0.0085 + 0.005 * (1 - Math.abs(u) * 2), h = 0.026 + 0.012 * (1 - Math.abs(u) * 2);
    poly(g, [[tx - w, y], [tx + w, y], [tx + w * 0.85, y + h], [tx - w * 0.85, y + h]], '#efe9d6', rgba('#8a826c', 0.8), 0.002);
    poly(g, [[tx - w, y], [tx - w * 0.2, y], [tx - w * 0.25, y + h], [tx - w * 0.85, y + h]], '#f9f6ec');
  }
  g.restore();
}
function paintTeeth(g, C) {
  const P = TEETH, rnd = C.e.rnd;
  // the bed: the peony's leaves up top, the earth below, flat
  bands(g, -H, -0.12, [LEAF, '#567252', LEAF2]);
  for (let i = 0; i < 60; i++) {
    const x = -W + 2 * W * rnd(), y = -H + 0.5 * rnd(), a = rnd() * TAU, r = 0.07 + 0.08 * rnd();
    poly(g, [[x - Math.cos(a) * r, y - Math.sin(a) * r * 0.5], [x + Math.sin(a) * r * 0.3, y - Math.cos(a) * r * 0.25], [x + Math.cos(a) * r, y + Math.sin(a) * r * 0.5], [x - Math.sin(a) * r * 0.3, y + Math.cos(a) * r * 0.25]], rnd() < 0.5 ? LEAF : mixc(LEAF2, DAY, 0.15 * rnd()));
  }
  for (const [x, y] of [[-0.95, -0.42], [0.82, -0.46], [1.15, -0.3]]) for (let k = 0; k < 7; k++) gon(g, x + 0.06 * Math.cos(k), y + 0.05 * Math.sin(k * 1.7), 0.06, 6, k % 2 ? '#f3e2df' : '#e7a9b0', rnd);
  poly(g, [[-W, -0.12], [-0.6, -0.15], [-0.1, -0.11], [0.4, -0.16], [W, -0.12], [W, H], [-W, H]], EARTH);
  for (let i = 0; i < 70; i++) gon(g, -W + 2 * W * rnd(), -0.1 + 0.7 * rnd(), 0.015 + 0.03 * rnd(), 5, rnd() < 0.5 ? '#5f4d3e' : '#7d6853', rnd, 0.4);
  // the roots: pale knobbly tubers through the earth
  for (const [x, y, a] of [[-0.55, 0.05, 0.4], [-0.3, 0.2, -0.3], [0.45, 0.02, -0.5], [0.7, 0.22, 0.2], [-0.85, 0.28, 0.1]]) {
    const d = [Math.cos(a), Math.sin(a)];
    for (let k = 0; k < 4; k++) gon(g, x + d[0] * k * 0.07, y + d[1] * k * 0.07, 0.04 - k * 0.005, 6, k % 2 ? ROOT : mixc(ROOT, '#8a6a48', 0.2), rnd, 0.3, 0.03);
  }
  C.layer('lift', P.T0, [-0.3, -H, W, 0.35], (g2) => {
    denture(g2, P.T0, rnd);
    hand(g2, P.hand, rnd);
  });
  // earth on the teeth (goes as they come up), crumbs falling off them
  C.layer('dirt', P.T0, [P.T0[0] - 0.1, P.T0[1] - 0.06, P.T0[0] + 0.1, P.T0[1] + 0.05], (g2) => {
    for (let i = 0; i < 16; i++) gon(g2, P.T0[0] + (rnd() - 0.5) * 0.16, P.T0[1] + (rnd() - 0.4) * 0.06, 0.005 + 0.007 * rnd(), 5, rnd() < 0.5 ? '#5a4838' : '#77624c', rnd, 0.5);
  });
  C.layer('fall', P.T0, [P.T0[0] - 0.1, P.T0[1], P.T0[0] + 0.1, P.T0[1] + 0.1], (g2) => {
    for (let i = 0; i < 10; i++) gon(g2, P.T0[0] + (rnd() - 0.5) * 0.12, P.T0[1] + 0.04 + 0.05 * rnd(), 0.004 + 0.005 * rnd(), 5, '#5f4d3e', rnd, 0.5);
  });
  // the earth's near lumps, over the teeth's lower half while they lie in it
  C.layer('front', [0, 0.3], [-W, 0.1, W, H], (g2) => {
    const pts = [[-W, 0.2]];
    for (let x = -W; x <= W + 0.01; x += 0.08) pts.push([x, 0.17 + 0.03 * Math.sin(x * 9) + 0.015 * rnd()]);
    poly(g2, [...pts, [W, H], [-W, H]], mixc(EARTH, '#000000', 0.08));
    for (let i = 0; i < 26; i++) gon(g2, -W + 2 * W * rnd(), 0.19 + 0.35 * rnd(), 0.02 + 0.035 * rnd(), 6, rnd() < 0.5 ? '#5f4d3e' : '#80694f', rnd, 0.4);
    gon(g2, P.T0[0] - 0.06, 0.185, 0.04, 6, '#7a6450', rnd, 0.3, 0.025);
    gon(g2, P.T0[0] + 0.04, 0.19, 0.035, 6, '#6a5644', rnd, 0.3, 0.022);
  });
}
function liveTeeth(L, now) {
  const P = TEETH, show = unit01(now.show, 0), T = teethAt(show), off = sub2(T, P.T0);
  L.set('lift', { x: off[0], y: off[1] });
  L.set('dirt', { x: off[0], y: off[1], alpha: 1 - 0.75 * ease.smooth(span(show, 0.2, 0.9)) });
  const f = span(show, 0.15, 0.7);
  L.set('fall', { x: off[0], y: off[1] + 0.22 * f, alpha: f > 0 && f < 1 ? Math.sin(Math.PI * f) : 0 });
  L.at(...T, 'teeth');
  L.at(...T);
}

// ── stems ── the peonies close: their red-green stems up out of the earth, the leaves dark behind; Grandmother's old
// hand down in the earth round one stem, drawing it slowly. `pull`: the stem drawn up out of the earth, its root
// coming, the earth parting round it.
const STEMS = (() => {
  const G0 = [0.0, 0.18], LIFT = 0.3;
  const light = { dir: [-0.5, -1], colour: DAY, k: 0.32 };
  const hand = placed({ who: 'grandma', L: 0.36, light, curl: [0.85, 0.88, 0.88, 0.85], thumb: 0.65, side: 1, angle: Math.PI - 0.12 }, [0.52, 0], G0);
  return { G0, LIFT, light, hand };
})();
const stemGrip = (pull) => add2(STEMS.G0, [0, -STEMS.LIFT * ease.inOut(pull)]);
function stalk(g, x, y0, y1, w, rnd) {
  poly(g, [[x - w, y0], [x + w * 0.7, y0], [x + w, y1], [x - w * 0.8, y1]], STEM);
  poly(g, [[x - w, y0], [x - w * 0.2, y0], [x - w * 0.1, y1], [x - w * 0.8, y1]], mixc(STEM, '#9a4e44', 0.35));
  for (let k = 0; k < 2; k++) {
    const y = y0 + (y1 - y0) * (0.25 + 0.35 * k + 0.1 * rnd()), s = k % 2 ? 1 : -1;
    poly(g, [[x, y], [x + s * 0.09, y - 0.07], [x + s * 0.2, y - 0.06], [x + s * 0.1, y - 0.01]], LEAF2, rgba('#2c3a2a', 0.5), 0.003);
    line(g, x, y, x + s * 0.17, y - 0.055, 0.003, rgba('#2c3a2a', 0.5));
  }
}
function paintStems(g, C) {
  const P = STEMS, rnd = C.e.rnd;
  bands(g, -H, 0.22, ['#4a6347', LEAF, '#55704f']);
  for (let i = 0; i < 40; i++) {
    const x = -W + 2 * W * rnd(), y = -H + 0.7 * rnd(), r = 0.1 + 0.08 * rnd(), a = rnd() * TAU;
    poly(g, [[x - Math.cos(a) * r, y - Math.sin(a) * r * 0.5], [x + Math.sin(a) * r * 0.3, y - Math.cos(a) * r * 0.3], [x + Math.cos(a) * r, y + Math.sin(a) * r * 0.5], [x - Math.sin(a) * r * 0.3, y + Math.cos(a) * r * 0.3]], rnd() < 0.5 ? '#45603f' : mixc(LEAF2, DAY, 0.12));
  }
  for (const [x, y] of [[-0.9, -0.4], [0.55, -0.48], [1.05, -0.38]]) for (let k = 0; k < 8; k++) gon(g, x + 0.07 * Math.cos(k * 0.8), y + 0.06 * Math.sin(k * 1.3), 0.07, 6, k % 2 ? '#f3e2df' : '#e7a9b0', rnd);
  for (const x of [-1.0, -0.62, -0.34, 0.27, 0.5, 0.86, 1.12]) stalk(g, x, -H, 0.24, 0.012, rnd);
  poly(g, [[-W, 0.22], [W, 0.21], [W, H], [-W, H]], EARTH);
  for (let i = 0; i < 50; i++) gon(g, -W + 2 * W * rnd(), 0.24 + 0.36 * rnd(), 0.015 + 0.03 * rnd(), 5, rnd() < 0.5 ? '#5f4d3e' : '#7d6853', rnd, 0.4);
  // the earth opening round the stem's foot
  C.layer('hole', [0, 0.23], [-0.15, 0.18, 0.15, 0.3], (g2) => poly(g2, [[-0.08, 0.235], [-0.04, 0.215], [0.05, 0.215], [0.09, 0.24], [0.03, 0.27], [-0.05, 0.265]], '#3d3128'));
  // the stem, its root and her hand on it: drawn up together
  C.layer('pull', P.G0, [-0.3, -H, W, H], (g2) => {
    stalk(g2, 0, -H, 0.24, 0.022, rnd);
    for (let k = 0; k < 5; k++) gon(g2, 0.035 * Math.cos(k * 1.3), -0.4 + 0.03 * Math.sin(k * 2), 0.04, 6, k % 2 ? '#e7a9b0' : '#f3e2df', rnd);
    poly(g2, [[-0.015, 0.24], [0.015, 0.24], [0.02, 0.3], [-0.02, 0.3]], '#8a6a48');
    for (let k = 0; k < 5; k++) gon(g2, 0.03 * Math.sin(k * 2.1), 0.3 + k * 0.045, 0.045 - k * 0.005, 6, k % 2 ? ROOT : mixc(ROOT, '#8a6a48', 0.25), rnd, 0.3, 0.03);
    for (let k = 0; k < 6; k++) line(g2, 0.03 * Math.sin(k), 0.33 + k * 0.03, 0.08 * (k % 2 ? 1 : -1), 0.38 + k * 0.035, 0.003, '#a88a64');
    hand(g2, P.hand, rnd);
  });
  // the earth before them: it hides the root while it is down
  C.layer('earth', [0, 0.3], [-W, 0.2, W, H], (g2) => {
    const pts = [];
    for (let x = -W; x <= W + 0.01; x += 0.07) pts.push([x, 0.235 + 0.012 * Math.sin(x * 13)]);
    poly(g2, [...pts, [W, H], [-W, H]], mixc(EARTH, '#000000', 0.05));
    for (let i = 0; i < 30; i++) gon(g2, -W + 2 * W * rnd(), 0.26 + 0.34 * rnd(), 0.02 + 0.03 * rnd(), 6, rnd() < 0.5 ? '#5f4d3e' : '#80694f', rnd, 0.4);
  });
  C.layer('clod_l', [-0.06, 0.24], [-0.16, 0.18, 0.0, 0.3], (g2) => { gon(g2, -0.06, 0.235, 0.045, 6, '#7a6450', rnd, 0.3, 0.028); gon(g2, -0.1, 0.25, 0.03, 5, '#6a5644', rnd, 0.3); });
  C.layer('clod_r', [0.06, 0.24], [0.0, 0.18, 0.16, 0.3], (g2) => { gon(g2, 0.06, 0.238, 0.042, 6, '#80694f', rnd, 0.3, 0.026); gon(g2, 0.1, 0.252, 0.028, 5, '#5f4d3e', rnd, 0.3); });
}
function liveStems(L, now) {
  const P = STEMS, pull = unit01(now.pull, 0), G = stemGrip(pull), u = ease.smooth(span(pull, 0, 0.5));
  L.set('pull', { y: G[1] - P.G0[1] });
  L.set('hole', { alpha: u, sx: 0.6 + 0.4 * u, sy: 0.6 + 0.4 * u });
  L.set('clod_l', { x: -0.06 * u, y: 0.01 * u, rotate: -0.35 * u });
  L.set('clod_r', { x: 0.06 * u, y: 0.01 * u, rotate: 0.35 * u });
  L.at(...G, 'stem');
  L.at(...G);
}

// ── knife ── in the forest, over her dark-blue lap: Grandmother's left hand holding a piece of grey driftwood, her right
// with the knife at its far end, the pale shavings curling off; out of the wood comes a seal. `carve`: the wood
// becoming the seal (the log, then roughed out, then the seal), the knife stroking along it; `flaw`: one flipper only.
const KNIFE = (() => {
  const Wd = [0.0, -0.03], B0 = [0.26, -0.07];
  const light = { dir: [-0.6, -1], colour: DAY, k: 0.32 };
  const left = placed({ who: 'grandma', L: 0.33, light, curl: [0.8, 0.82, 0.85, 0.85], thumb: 0.55, side: -1, angle: -1.25 }, [0.62, 0], [-0.4, 0.0]);
  const right = placed({ who: 'grandma', L: 0.33, light, curl: [0.88, 0.9, 0.9, 0.88], thumb: 0.6, side: 1, angle: -1.85 }, [0.62, 0], [0.44, -0.01]);
  return { Wd, B0, light, left, right };
})();
// the seal's outline, about the wood's middle (its head to the right)
const SEAL = [[-0.3, -0.03], [-0.37, -0.07], [-0.34, -0.005], [-0.37, 0.05], [-0.29, 0.02], [-0.16, 0.05], [0.05, 0.055], [0.17, 0.035], [0.23, 0.012], [0.285, 0.0], [0.28, -0.025], [0.22, -0.06], [0.1, -0.065], [-0.1, -0.05]];
const knifeStroke = (carve) => [-0.12 * ease.inOut(carve) + 0.025 * Math.sin(carve * TAU * 6), 0.006 * Math.sin(carve * TAU * 6 + 1)];
function paintKnife(g, C) {
  const P = KNIFE, rnd = C.e.rnd, o = P.Wd, at = (p) => add2(o, p);
  // the forest floor beyond: moss, a grey rock, pine needles; her lap close, the dark-blue dress in flat folds
  bands(g, -H, -0.15, ['#8a957a', '#7d8a6a', '#76835f']);
  poly(g, [[-W, -0.32], [-0.6, -0.4], [-0.1, -0.36], [0.2, -0.42], [0.7, -0.35], [W, -0.4], [W, -0.15], [-W, -0.15]], '#a5a196');
  poly(g, [[-0.6, -0.4], [-0.1, -0.36], [-0.3, -0.3]], '#b7b3a8');
  for (let i = 0; i < 40; i++) { const x = -W + 2 * W * rnd(), y = -H + 0.12 * rnd(); line(g, x, y, x + 0.05, y + 0.02 * (rnd() - 0.5), 0.003, rgba('#5a4a38', 0.6)); }
  poly(g, [[-W, -0.18], [-0.5, -0.13], [0.3, -0.16], [W, -0.12], [W, H], [-W, H]], DRESS);
  for (const [x0, x1] of [[-0.9, -0.6], [-0.2, 0.1], [0.55, 0.9]]) poly(g, [[x0, -0.14], [x1, -0.15], [x1 + 0.1, H], [x0 - 0.05, H]], mixc(DRESS, DAY, 0.12));
  for (const x of [-0.75, -0.3, 0.3, 0.75]) line(g, x, -0.12, x + 0.12, H, 0.006, rgba('#1d2330', 0.5));
  // the shavings already fallen on her lap (more as she carves)
  C.layer('litter', [0, 0.25], [-0.6, 0.05, 0.7, 0.45], (g2) => {
    for (let i = 0; i < 18; i++) {
      const x = -0.4 + 1.0 * rnd(), y = 0.12 + 0.28 * rnd(), r = 0.012 + 0.012 * rnd();
      polyline(g2, [[x - r, y], [x, y - r], [x + r, y], [x, y + r * 0.6], [x - r * 0.4, y]], 0.005, i % 3 ? FRESH : '#c9b285');
    }
  });
  // the stub she holds (always the grey wood)
  poly(g, [at([-0.52, -0.05]), at([-0.33, -0.06]), at([-0.31, 0.05]), at([-0.5, 0.055])], WOOD, rgba('#4e4a44', 0.7), 0.004);
  // the wood: whole, roughed out, the seal — cross-faded by `carve`
  C.layer('log', o, [-0.55, -0.2, 0.45, 0.15], (g2) => {
    const pts = [[-0.34, -0.06], [-0.1, -0.075], [0.15, -0.065], [0.32, -0.05], [0.34, 0.0], [0.31, 0.05], [0.05, 0.065], [-0.2, 0.06], [-0.34, 0.05]].map(at);
    poly(g2, pts, WOOD, rgba('#4e4a44', 0.7), 0.004);
    poly(g2, [at([-0.34, -0.06]), at([-0.1, -0.075]), at([0.15, -0.065]), at([0.32, -0.05]), at([0.3, -0.02]), at([-0.33, -0.02])], '#bdb8ab');
    for (let k = 0; k < 5; k++) line(g2, ...at([-0.3, -0.04 + k * 0.02]), ...at([0.28, -0.035 + k * 0.019]), 0.002, rgba('#77736a', 0.6));
  });
  C.layer('rough', o, [-0.55, -0.2, 0.45, 0.15], (g2) => {
    const pts = [[-0.34, -0.06], [-0.2, -0.07], [0.05, -0.07], [0.2, -0.065], [0.3, -0.03], [0.3, 0.03], [0.15, 0.05], [0.05, 0.1], [-0.05, 0.06], [-0.34, 0.05]].map(at);
    poly(g2, pts, mixc(FRESH, WOOD, 0.45), rgba('#4e4a44', 0.7), 0.004);
    poly(g2, [at([0.1, -0.065]), at([0.2, -0.065]), at([0.3, -0.03]), at([0.28, 0.0]), at([0.12, -0.02])], FRESH);
    poly(g2, [at([-0.34, -0.06]), at([-0.2, -0.07]), at([-0.05, -0.07]), at([-0.15, -0.03]), at([-0.33, -0.03])], WOOD);
  });
  // the far flipper behind the body (not there in the flawed carving)
  C.layer('flipper', o, [-0.2, -0.05, 0.1, 0.15], (g2) => poly(g2, [at([-0.01, 0.04]), at([-0.07, 0.105]), at([-0.1, 0.1]), at([-0.05, 0.045])], mixc(FRESH, '#8a6a48', 0.25), rgba('#4e4a44', 0.7), 0.004));
  C.layer('seal', o, [-0.55, -0.2, 0.45, 0.15], (g2) => {
    poly(g2, SEAL.map(at), FRESH, rgba('#5a4a36', 0.8), 0.004);
    poly(g2, [[-0.3, -0.03], [-0.1, -0.05], [0.1, -0.065], [0.22, -0.06], [0.28, -0.025], [0.15, -0.02], [-0.1, -0.015]].map(at), '#ead9b6');
    poly(g2, [[-0.16, 0.05], [0.05, 0.055], [0.17, 0.035], [0.1, 0.02], [-0.1, 0.025]].map(at), '#c4ab7e');
    gon(g2, ...at([0.215, -0.03]), 0.007, 6, '#3a3028');
    line(g2, ...at([0.27, -0.008]), ...at([0.285, -0.004]), 0.003, '#3a3028');
    // the near flipper
    poly(g2, [at([0.05, 0.045]), at([0.12, 0.1]), at([0.07, 0.11]), at([0.0, 0.055])], '#d2bb8f', rgba('#5a4a36', 0.8), 0.004);
    for (let k = 0; k < 4; k++) line(g2, ...at([-0.25 + k * 0.12, -0.04]), ...at([-0.22 + k * 0.12, 0.03]), 0.0025, rgba('#a88a5c', 0.6));
  });
  C.layer('lhand', [-0.4, 0], [-1.6, -0.3, 0.0, H], (g2) => hand(g2, P.left, rnd));
  // the knife in her right hand: the blade out of her fist along the wood, the curls of shaving at its edge
  C.layer('knife', P.B0, [-0.1, -0.35, W, H], (g2) => {
    poly(g2, [[0.36, -0.035], [0.52, -0.02], [0.52, 0.02], [0.36, 0.0]], '#7a5a3a');
    poly(g2, [[0.37, -0.04], [P.B0[0], P.B0[1] - 0.012], [P.B0[0] - 0.01, P.B0[1] + 0.004], [0.37, -0.012]], '#c9ccd2', rgba('#3d4656', 0.8), 0.003);
    poly(g2, [[0.37, -0.04], [P.B0[0], P.B0[1] - 0.012], [0.37, -0.028]], '#eef0f3');
    hand(g2, P.right, rnd);
  });
  C.layer('curls', P.B0, [P.B0[0] - 0.12, P.B0[1] - 0.12, P.B0[0] + 0.08, P.B0[1] + 0.06], (g2) => {
    for (let k = 0; k < 3; k++) {
      const c = add2(P.B0, [-0.02 - 0.03 * k, -0.035 - 0.02 * k]), r = 0.018 + 0.006 * k;
      polyline(g2, [[c[0] + r, c[1] + r], [c[0] - r, c[1] + r * 0.6], [c[0] - r, c[1] - r * 0.7], [c[0] + r * 0.6, c[1] - r], [c[0] + r * 0.5, c[1] + r * 0.1], [c[0] - r * 0.3, c[1]]], 0.006, k % 2 ? FRESH : '#e8d6ae');
    }
  });
  C.at(...P.Wd, 'wood');
}
function liveKnife(L, now) {
  const P = KNIFE, carve = unit01(now.carve, 0), flaw = unit01(now.flaw, 0) >= 0.5 ? 1 : 0;
  const s = knifeStroke(carve), B = add2(P.B0, s);
  const a = ease.smooth(span(carve, 0.05, 0.5)), b = ease.smooth(span(carve, 0.5, 0.95));
  L.set('log', { alpha: 1 - a });
  L.set('rough', { alpha: a * (1 - b) });
  L.set('seal', { alpha: b });
  L.set('flipper', { alpha: b * (1 - flaw) });
  L.set('knife', { x: s[0], y: s[1] });
  L.set('curls', { x: s[0], y: s[1], alpha: carve > 0 && carve < 1 ? ease.smooth(span(carve, 0.02, 0.1)) : 0 });
  L.set('litter', { alpha: ease.smooth(span(carve, 0.05, 0.7)) });
  L.at(...B, 'blade');
  L.at(...P.Wd, 'wood');
  L.at(...P.Wd);
}

// ── match ── close to her: the grey shawl, the dark-blue dress below; Grandmother's left hand with the matchbox, her
// right striking a match on it and bringing it up to the cigarette's end at the frame's top edge; the thin smoke.
// `strike`: the match struck (its flame from 0.3) and brought up to the cigarette; `lit`: the cigarette's ember
// catching, the smoke; `night`: the day's light gone to night's blue, the flame the light.
const MATCH = (() => {
  const F0 = [-0.17, 0.11], Fs = [-0.02, 0.0], F1 = [0.19, -0.29], E = [0.215, -0.355], Cg = [0.275, -0.56];
  const STICK = [0.075, 0.085];
  const light = { dir: [-0.5, -1], colour: DAY, k: 0.32 };
  const boxAt = [-0.27, 0.13];
  const left = placed({ who: 'grandma', L: 0.33, light, curl: [0.7, 0.72, 0.78, 0.8], thumb: 0.5, side: -1, angle: -0.55 }, [0.62, 0.02], boxAt);
  const r0 = { who: 'grandma', L: 0.33, light, curl: [0.35, 0.8, 0.85, 0.88], thumb: 0.3, side: 1, angle: -2.25 };
  const right = pinched(r0, add2(F0, STICK));
  return { F0, Fs, F1, E, Cg, STICK, light, boxAt, left, right };
})();
const flameAt = (strike) => (strike < 0.3 ? lerp2(MATCH.F0, MATCH.Fs, ease.out(strike / 0.3)) : lerp2(MATCH.Fs, MATCH.F1, ease.inOut((strike - 0.3) / 0.7)));
function teardrop(g, [x, y], h, w, colour) {
  poly(g, [[x, y - h], [x + w * 0.7, y - h * 0.45], [x + w, y - h * 0.1], [x + w * 0.6, y + h * 0.15], [x, y + h * 0.2], [x - w * 0.6, y + h * 0.15], [x - w, y - h * 0.1], [x - w * 0.7, y - h * 0.45]], colour);
}
function paintMatch(g, C) {
  const P = MATCH, rnd = C.e.rnd;
  // her shawl in flat grey facets, the dress below
  bands(g, -H, 0.2, ['#a4a39d', '#a9a8a2', '#a7a6a0']);
  for (let i = 0; i < 9; i++) { const x = -W + (2 * W * i) / 9; poly(g, [[x, -H], [x + 0.18, -H], [x + 0.3, 0.2], [x + 0.08, 0.2]], i % 2 ? '#b4b3ad' : '#9b9a94'); }
  for (let i = 0; i < 30; i++) { const x = -W + 2 * W * rnd(), y = -H + 0.7 * rnd(); line(g, x, y, x + 0.02, y + 0.04, 0.003, rgba('#7f7e78', 0.5)); }
  poly(g, [[-W, 0.18], [-0.3, 0.22], [0.4, 0.17], [W, 0.21], [W, H], [-W, H]], DRESS);
  poly(g, [[-0.2, 0.21], [0.1, 0.19], [0.2, H], [-0.15, H]], mixc(DRESS, DAY, 0.1));
  // the cigarette down from her lips (out of the frame)
  poly(g, [add2(P.Cg, [-0.011, 0]), add2(P.Cg, [0.011, 0]), add2(P.E, [0.011, -0.003]), add2(P.E, [-0.011, 0.003])], '#f4f1ea', rgba('#7a7468', 0.7), 0.003);
  poly(g, [add2(P.E, [-0.011, 0.003]), add2(P.E, [0.011, -0.003]), add2(P.E, [0.01, 0.01]), add2(P.E, [-0.009, 0.013])], '#8a8580');
  // her left hand with the box, the striking side toward the match
  C.layer('box', P.boxAt, [-1.6, -0.2, 0.1, H], (g2) => {
    const b = P.boxAt;
    hand(g2, { ...P.left, parts: ['arm', 'palm', 'thumb'] }, rnd);
    poly(g2, [add2(b, [-0.065, -0.04]), add2(b, [0.065, -0.05]), add2(b, [0.07, 0.03]), add2(b, [-0.06, 0.04])], '#e3d7b6', rgba('#3d4656', 0.8), 0.003);
    poly(g2, [add2(b, [-0.05, -0.028]), add2(b, [0.05, -0.036]), add2(b, [0.054, 0.018]), add2(b, [-0.046, 0.026])], '#2f4a7a');
    poly(g2, [add2(b, [-0.025, -0.015]), add2(b, [0.03, -0.02]), add2(b, [0.032, 0.006]), add2(b, [-0.023, 0.011])], '#e8c34a');
    poly(g2, [add2(b, [0.065, -0.05]), add2(b, [0.085, -0.05]), add2(b, [0.09, 0.03]), add2(b, [0.07, 0.03])], '#6b3a28');
    hand(g2, { ...P.left, parts: ['fingers'] }, rnd);
  });
  // the match in her right hand: the stick from her fingers to its head (where the flame is)
  C.layer('hand', P.F0, [-0.3, -0.25, W, H + 0.5], (g2) => {
    poly(g2, [add2(P.F0, [-0.004, 0.004]), add2(P.F0, [0.004, -0.004]), add2(add2(P.F0, P.STICK), [0.005, -0.004]), add2(add2(P.F0, P.STICK), [-0.004, 0.005])], '#e0cfa4');
    gon(g2, ...P.F0, 0.011, 7, '#7a2c22');
    hand(g2, P.right, rnd);
  });
  // night: the day gone to the moon's blue over all (the flame and its light over it)
  C.layer('night', [0, 0], FULL, (g2) => { g2.fillStyle = NIGHT; g2.fillRect(-W, -H, 2 * W, 2 * H); });
  C.layer('glow', P.F0, [P.F0[0] - 0.5, P.F0[1] - 0.5, P.F0[0] + 0.5, P.F0[1] + 0.5], (g2) => pool(g2, P.F0[0], P.F0[1] - 0.03, 0.48, CANDLE, 0.55), { blend: 'add', flicker: 0.25 });
  C.layer('flare', P.F0, [P.F0[0] - 0.1, P.F0[1] - 0.12, P.F0[0] + 0.1, P.F0[1] + 0.06], (g2) => {
    pool(g2, P.F0[0], P.F0[1] - 0.02, 0.09, '#fff2c8', 0.9);
    teardrop(g2, P.F0, 0.09, 0.04, '#ffe0a0');
  }, { blend: 'add' });
  C.layer('flame', P.F0, [P.F0[0] - 0.08, P.F0[1] - 0.1, P.F0[0] + 0.08, P.F0[1] + 0.04], (g2) => {
    teardrop(g2, add2(P.F0, [0, -0.006]), 0.065, 0.022, FLAME);
    teardrop(g2, add2(P.F0, [0, -0.008]), 0.03, 0.01, '#fff6e0');
  }, { blend: 'add', flicker: 0.35 });
  // the cigarette catching: its ember, the thin smoke up out of the frame
  C.layer('ember', P.E, [P.E[0] - 0.06, P.E[1] - 0.06, P.E[0] + 0.06, P.E[1] + 0.06], (g2) => {
    pool(g2, P.E[0], P.E[1] + 0.006, 0.04, '#ff8a4a', 0.6);
    poly(g2, [add2(P.E, [-0.01, 0.004]), add2(P.E, [0.01, -0.002]), add2(P.E, [0.009, 0.01]), add2(P.E, [-0.008, 0.013])], '#ff7a3a');
  }, { blend: 'add', flicker: 0.3 });
  C.layer('smoke', P.E, [P.E[0] - 0.25, -H, P.E[0] + 0.1, P.E[1] + 0.02], (g2) => {
    polyline(g2, [add2(P.E, [0, 0.01]), add2(P.E, [-0.02, -0.04]), add2(P.E, [0.0, -0.09]), add2(P.E, [-0.05, -0.14]), add2(P.E, [-0.03, -0.2]), add2(P.E, [-0.09, -0.3])], 0.007, 'rgba(236,236,240,0.55)');
  }, { drift: [0, -0.015], shimmer: 0.5 });
  C.at(...P.E, 'ember');
}
function liveMatch(L, now) {
  const P = MATCH, strike = unit01(now.strike, 0), lit = unit01(now.lit, 0), night = unit01(now.night, 0);
  const F = flameAt(strike), off = sub2(F, P.F0), on = strike >= 0.3 ? 1 : 0;
  L.set('hand', { x: off[0], y: off[1] });
  L.set('flare', { x: off[0], y: off[1], alpha: on * (1 - ease.smooth(span(strike, 0.3, 0.42))) });
  L.set('flame', { x: off[0], y: off[1], alpha: on });
  L.set('glow', { x: off[0], y: off[1], alpha: on * (0.25 + 0.75 * night) });
  L.set('night', { alpha: 0.58 * night });
  L.set('ember', { alpha: lit });
  L.set('smoke', { alpha: 0.85 * lit });
  L.at(...F, 'flame');
  L.at(...P.E, 'ember');
  L.at(...F);
}

// ── gunwale ── from the jetty: Eriksson's tarred boat's side close, its grey gunwale across the frame, the pale water
// beyond; Grandmother's two hands on the gunwale. `push`: the hands push off and open; the boat's side slides away.
const GUNWALE = (() => {
  const Y = -0.06, Hd = [0, -0.07];
  const light = { dir: [-0.4, -1], colour: DAY, k: 0.32 };
  const pose = (curl, spread, thumb) => [
    placed({ who: 'grandma', L: 0.34, light, curl, spread, thumb, side: -1, angle: -Math.PI / 2 + 0.22 }, [0.72, 0], [-0.21, Y + 0.02]),
    placed({ who: 'grandma', L: 0.34, light, curl, spread, thumb, side: 1, angle: -Math.PI / 2 - 0.22 }, [0.72, 0], [0.21, Y + 0.02]),
  ];
  return { Y, Hd, light, grip: pose([0.72, 0.75, 0.75, 0.72], 0, 0.3), open: pose([0.05, 0.05, 0.08, 0.1], 0.45, 0) };
})();
function paintGunwale(g, C) {
  const P = GUNWALE, rnd = C.e.rnd;
  // the water, pale under the pearl-grey day, flat streaks of light on it; a skerry far off
  bands(g, -H, H, ['#cbd2d2', '#b9c4c6', '#adbabd', '#a5b3b7', '#9fadb2', '#99a8ae']);
  poly(g, [[-W, -0.45], [-0.8, -0.47], [-0.55, -0.46], [-0.5, -0.44], [-W, -0.43]], '#8f9796');
  for (let i = 0; i < 70; i++) { const x = -W + 2 * W * rnd(), y = -0.42 + 1.0 * rnd(), w = 0.04 + 0.1 * rnd(); poly(g, [[x, y], [x + w, y - 0.002], [x + w, y + 0.004], [x, y + 0.006]], rgba(rnd() < 0.6 ? '#eef1ef' : '#7d8e95', 0.45)); }
  // the boat's side: the grey gunwale on top, the tarred strakes below (slides away as one)
  C.layer('boat', [0, P.Y], [-2.4, -0.2, 2.4, 0.42], (g2) => {
    poly(g2, [[-2.4, P.Y - 0.035], [2.4, P.Y - 0.03], [2.4, P.Y], [-2.4, P.Y - 0.004]], '#a6a49d');
    poly(g2, [[-2.4, P.Y - 0.004], [2.4, P.Y], [2.4, P.Y + 0.04], [-2.4, P.Y + 0.035]], '#8c8a84', rgba('#3a3530', 0.7), 0.003);
    for (let k = 0; k < 4; k++) {
      const y = P.Y + 0.035 + k * 0.1;
      poly(g2, [[-2.4, y], [2.4, y + 0.005], [2.4, y + 0.1], [-2.4, y + 0.095]], k % 2 ? '#4a4440' : '#544d48');
      line(g2, -2.4, y + 0.003, 2.4, y + 0.008, 0.005, rgba('#8a827a', 0.5));
    }
    for (let i = 0; i < 9; i++) gon(g2, -1.2 + 0.3 * i, P.Y + 0.018, 0.006, 6, '#6a625a');
    line(g2, -2.4, P.Y + 0.435, 2.4, P.Y + 0.44, 0.008, rgba('#2e2a28', 0.6));
  });
  C.layer('grip', P.Hd, [-1.6, -0.4, 1.6, H], (g2) => { for (const o of P.grip) hand(g2, o, rnd); });
  C.layer('open', P.Hd, [-1.6, -0.4, 1.6, H], (g2) => { for (const o of P.open) hand(g2, o, rnd); });
}
function liveGunwale(L, now) {
  const P = GUNWALE, push = unit01(now.push, 0), open = ease.smooth(span(push, 0.05, 0.35));
  const reach = -0.05 * ease.out(span(push, 0, 0.35)), slide = ease.inOut(span(push, 0.15, 1));
  L.set('grip', { y: reach, alpha: 1 - open });
  L.set('open', { y: reach, alpha: open });
  L.set('boat', { x: 0.35 * slide, y: -0.22 * slide, scale: 1 - 0.3 * slide });
  L.at(P.Hd[0], P.Hd[1] + reach, 'hands');
  L.at(P.Hd[0], P.Hd[1] + reach);
}

// ── knot ── on the rock by the boathouse: the net's tarred mesh close over the pale granite, cork floats along its
// head-rope, a hard knot in it; Grandmother's fingers at the thread. `pull`: the thread drawn out of the knot (the
// knot hard → loose, the thread longer, her right hand with its end).
const KNOT = (() => {
  const K = [-0.07, -0.04], T0 = [0.13, 0.03], T1 = [0.42, 0.1], D0 = Math.hypot(...sub2(T0, K));
  const light = { dir: [-0.5, -1], colour: DAY, k: 0.32 };
  const right = pinched({ who: 'grandma', L: 0.33, light, curl: [0.3, 0.75, 0.82, 0.86], thumb: 0.35, side: 1, angle: -2.5 }, T0);
  const left = placed({ who: 'grandma', L: 0.33, light, curl: [0.55, 0.6, 0.62, 0.65], thumb: 0.45, side: -1, angle: -0.85 }, [0.6, 0], [-0.38, 0.09]);
  return { K, T0, T1, D0, light, right, left };
})();
const knotThread = (pull) => lerp2(KNOT.T0, KNOT.T1, ease.inOut(pull));
function paintKnot(g, C) {
  const P = KNOT, rnd = C.e.rnd;
  // the granite in flat slabs, a crack or two, the grey-green lichen
  bands(g, -H, H, ['#bcb3a5', '#b5ac9e', GRANITE, '#aaa092']);
  for (let i = 0; i < 12; i++) { const x = -W + 2 * W * rnd(), y = -H + 2 * H * rnd(); poly(g, [[x, y], [x + 0.3, y - 0.05], [x + 0.36, y + 0.12], [x + 0.05, y + 0.16]], rgba(rnd() < 0.5 ? '#c7beb0' : '#9c9284', 0.6)); }
  polyline(g, [[-1.1, -0.45], [-0.6, -0.3], [-0.2, -0.36], [0.5, -0.22], [1.2, -0.3]], 0.005, rgba('#5a524a', 0.6));
  for (let i = 0; i < 12; i++) gon(g, -W + 2 * W * rnd(), -H + 2 * H * rnd(), 0.02 + 0.03 * rnd(), 7, rgba('#9aa07a', 0.55), rnd, 0.4);
  // the net: diamonds of tarred cord over the rock, a little slack; the head-rope with its corks up top
  const S = 0.09;
  for (let k = -24; k <= 24; k++) {
    const a = [], b = [];
    for (let y = -0.45; y <= H + 0.05; y += 0.1) {
      const sag = 0.012 * Math.sin(y * 7 + k);
      a.push([k * S + (y + 0.45) * 0.55 + sag, y]);
      b.push([k * S - (y + 0.45) * 0.55 + sag, y]);
    }
    polyline(g, a, 0.006, rgba(TAR, 0.85));
    polyline(g, b, 0.006, rgba(TAR, 0.85));
  }
  polyline(g, [[-W, -0.46], [-0.4, -0.44], [0.3, -0.47], [W, -0.45]], 0.013, TAR);
  for (let x = -W + 0.1; x < W; x += 0.26) poly(g, [[x - 0.045, -0.47], [x + 0.045, -0.475], [x + 0.045, -0.44], [x - 0.045, -0.435]], '#b8804f', rgba('#4a3020', 0.6), 0.003);
  C.layer('hard', P.K, [-0.14, -0.14, 0.14, 0.14], (g2) => {
    gon(g2, ...P.K, 0.06, 8, rgba('#000000', 0.18));
    for (let i = 0; i < 24; i++) {
      const c = add2(P.K, [0.035 * (rnd() - 0.5), 0.035 * (rnd() - 0.5)]), r = 0.016 + 0.024 * rnd(), a = rnd() * Math.PI;
      const pts = [];
      for (let k = 0; k < 6; k++) { const t = a + (k / 6) * TAU; pts.push(add2(c, [Math.cos(t) * r, Math.sin(t) * r * 0.6])); }
      g2.strokeStyle = i % 3 ? TAR : '#5a4c3e';
      g2.lineWidth = 0.008;
      path(g2, pts);
      g2.stroke();
    }
  });
  C.layer('loose', P.K, [-0.2, -0.2, 0.2, 0.2], (g2) => {
    for (let i = 0; i < 5; i++) {
      const c = add2(P.K, [0.05 * (rnd() - 0.5), 0.05 * (rnd() - 0.5)]), r = 0.05 + 0.04 * rnd(), a = rnd() * Math.PI;
      const pts = [];
      for (let k = 0; k < 7; k++) { const t = a + (k / 7) * TAU; pts.push(add2(c, [Math.cos(t) * r, Math.sin(t) * r * 0.55])); }
      g2.strokeStyle = TAR;
      g2.lineWidth = 0.008;
      path(g2, pts);
      g2.stroke();
    }
  });
  // the thread out of the knot: painted along +x from the knot (D0 long), turned and drawn out to its end by live
  C.layer('thread', P.K, [P.K[0] - 0.02, P.K[1] - 0.04, P.K[0] + P.D0 + 0.03, P.K[1] + 0.04], (g2) => {
    const pts = [];
    for (let u = 0; u <= 1.0001; u += 0.125) pts.push([P.K[0] + P.D0 * u, P.K[1] + 0.008 * Math.sin(u * 14)]);
    polyline(g2, pts, 0.009, TAR);
    polyline(g2, pts, 0.003, rgba('#8a7458', 0.6));
  });
  C.layer('hand_l', [-0.38, 0.09], [-1.6, -0.2, 0.1, H], (g2) => hand(g2, P.left, rnd));
  C.layer('hand_r', P.T0, [-0.1, -0.25, W, H], (g2) => hand(g2, P.right, rnd));
  C.at(...P.K, 'knot');
}
function liveKnot(L, now) {
  const P = KNOT, pull = unit01(now.pull, 0), T = knotThread(pull), d = sub2(T, P.K);
  L.set('hard', { alpha: 1 - ease.smooth(span(pull, 0.2, 0.8)) });
  L.set('loose', { alpha: ease.smooth(span(pull, 0.2, 0.8)) });
  L.set('thread', { rotate: Math.atan2(d[1], d[0]), sx: Math.hypot(...d) / P.D0, sy: 1 });
  L.set('hand_r', { x: T[0] - P.T0[0], y: T[1] - P.T0[1] });
  L.at(...T, 'thread');
  L.at(...P.K, 'knot');
  L.at(...P.K);
}

// ── tremble ── down at the water's edge: Grandmother's two hands flat on the wet granite, the fingers spread, shaking.
// `shake`: how much they shake (0 — still).
const TREMBLE = (() => {
  const Hd = [0, -0.02];
  const light = { dir: [-0.4, -1], colour: DAY, k: 0.34 };
  const left = placed({ who: 'grandma', L: 0.34, light, curl: [0.05, 0.05, 0.06, 0.08], spread: 0.55, thumb: 0, side: -1, angle: -Math.PI / 2 + 0.38 }, [0.35, 0], [-0.23, 0.0]);
  const right = placed({ who: 'grandma', L: 0.34, light, curl: [0.05, 0.05, 0.06, 0.08], spread: 0.55, thumb: 0, side: 1, angle: -Math.PI / 2 - 0.38 }, [0.35, 0], [0.23, 0.0]);
  return { Hd, light, left, right };
})();
function paintTremble(g, C) {
  const P = TREMBLE, rnd = C.e.rnd;
  // the wet granite: darker where the water runs, flat slabs, sheen in pale strips
  bands(g, -H, H, ['#9c958b', '#948d84', '#8d867e', '#878079']);
  for (let i = 0; i < 14; i++) { const x = -W + 2 * W * rnd(), y = -H + 2 * H * rnd(); poly(g, [[x, y], [x + 0.32, y - 0.04], [x + 0.36, y + 0.13], [x + 0.03, y + 0.15]], rgba(rnd() < 0.5 ? '#a7a095' : '#7d776f', 0.6)); }
  polyline(g, [[-1.2, -0.2], [-0.7, -0.26], [-0.45, -0.12], [0.1, -0.2], [0.6, -0.08], [1.2, -0.14]], 0.006, rgba('#4f4a44', 0.6));
  poly(g, [[-W, -H], [W, -H], [W, -0.4], [0.4, -0.37], [-0.3, -0.41], [-W, -0.38]], '#8fa2aa');
  C.layer('wet', [0, 0], FULL, (g2) => {
    for (let i = 0; i < 50; i++) { const x = -W + 2 * W * rnd(), y = -0.36 + 0.95 * rnd(), w = 0.04 + 0.12 * rnd(); poly(g2, [[x, y], [x + w, y - 0.004], [x + w, y + 0.003], [x, y + 0.006]], rgba('#e8eef0', 0.4)); }
  }, { shimmer: 0.3 });
  C.layer('hand_l', [-0.23, 0.2], [-1.6, -0.4, 0.2, H], (g2) => hand(g2, P.left, rnd));
  C.layer('hand_r', [0.23, 0.2], [-0.2, -0.4, 1.6, H], (g2) => hand(g2, P.right, rnd));
}
function liveTremble(L, now) {
  const P = TREMBLE, shake = unit01(now.shake, 1), t = L.e.t, a = 0.006 * shake;
  L.set('hand_l', { x: a * noise(t * 13, 1), y: a * noise(t * 11, 2), rotate: 0.012 * shake * noise(t * 9, 3) });
  L.set('hand_r', { x: a * noise(t * 12, 4), y: a * noise(t * 14, 5), rotate: 0.012 * shake * noise(t * 10, 6) });
  L.at(...P.Hd, 'hands');
  L.at(...P.Hd);
}

// ── gap ── the two beds from above by moonlight: Grandmother's grey blanket on the left, Sophia's patched quilt on the
// right, the narrow dark gap of the floor between; Grandmother's old hand lying open on her blanket's edge, palm up,
// Sophia's small hand on her quilt. `palm`: Grandmother's palm there (0: only the blankets); `hand`: Sophia's hand come
// over the gap into hers.
const GAP = (() => {
  const Pg = [-0.2, -0.01], H1 = [-0.14, 0.0], REACH = 0.42;
  const light = { dir: [0.6, -1], colour: MOON, k: 0.4 };
  const moonSkin = (s) => mixc(s, '#7d8cb0', 0.22);
  const gran = placed({ who: 'grandma', L: 0.34, light, skin: moonSkin(SKIN.grandma), view: 'palm', curl: [0.22, 0.25, 0.3, 0.35], thumb: 0.15, spread: 0.2, side: 1, angle: -0.12, sleeve: 'nightie' }, [0.32, 0], Pg);
  const soph = placed({ who: 'sophia', L: 0.25, light, skin: moonSkin(SKIN.sophia), curl: [0.25, 0.3, 0.32, 0.35], thumb: 0.2, side: -1, angle: Math.PI + 0.1, sleeve: 'nightie' }, [0.85, 0], H1);
  return { Pg, H1, REACH, light, gran, soph };
})();
function paintGap(g, C) {
  const P = GAP, rnd = C.e.rnd, moon = (c) => mixc(c, '#53618a', 0.35);
  // the floor's boards in the gap
  bands(g, -H, H, [moon('#6f6558')]);
  for (let i = 0; i < 6; i++) line(g, -0.1, -H + i * 0.22, 0.2, -H + i * 0.22 + 0.01, 0.004, rgba('#2a2a38', 0.6));
  // Grandmother's bed: the grey wool blanket, its edge folded over toward the gap
  poly(g, [[-W, -H], [-0.04, -H], [-0.05, H], [-W, H]], moon('#878b8f'));
  poly(g, [[-0.12, -H], [-0.04, -H], [-0.05, H], [-0.13, H]], moon('#9a9ea2'));
  for (const y of [-0.3, 0.32]) poly(g, [[-W, y], [-0.04, y], [-0.04, y + 0.025], [-W, y + 0.025]], moon('#6f7478'));
  for (let i = 0; i < 8; i++) { const x = -1.1 + 0.13 * i; line(g, x, -H, x - 0.08, H, 0.005, rgba('#3c4258', 0.25)); }
  // Sophia's bed: the old faded quilt in patches
  const Q = ['#c99a86', '#9fb1b8', '#d8cfb8', '#a9b49a', '#c4a39b', '#b9c3c6'];
  for (let i = 0; i < 10; i++) for (let j = 0; j < 8; j++) {
    const x = 0.09 + i * 0.13, y = -H + j * 0.16;
    poly(g, [[x, y], [x + 0.13, y], [x + 0.13, y + 0.16], [x, y + 0.16]], moon(Q[(i * 5 + j * 2) % 6]), rgba('#2e3448', 0.35), 0.003);
  }
  poly(g, [[0.08, -H], [0.12, -H], [0.12, H], [0.08, H]], moon('#d8d2c4'));
  // the moon's light across them from the window
  C.layer('moon', [0.4, -0.4], FULL, (g2) => {
    poly(g2, [[-0.7, -H], [0.3, -H], [1.0, H], [0.0, H]], rgba(MOON, 0.18));
    pool(g2, -0.1, -0.05, 0.6, MOON, 0.18);
  }, { blend: 'add' });
  C.layer('gran', P.Pg, [-W, -0.3, 0.2, 0.3], (g2) => hand(g2, P.gran, rnd));
  C.layer('soph', P.H1, [-0.3, -0.3, W + P.REACH, 0.3], (g2) => hand(g2, P.soph, rnd));
  C.at(...P.Pg, 'palm');
}
function liveGap(L, now) {
  const P = GAP, palm = unit01(now.palm, 1), come = ease.inOut(unit01(now.hand, 0));
  L.set('gran', { x: -0.06 * (1 - ease.out(palm)), alpha: palm });
  L.set('soph', { x: P.REACH * (1 - come) });
  L.at(...P.Pg, 'palm');
  L.at(...P.Pg);
}

// ── breast ── night in her bed: Sophia's white nightdress close, her small palm flat on her breast, the candle's light
// on it from below. `flicker`: the candle's flame stirring (its light and her hand's shadow moving; 0 — still).
const BREAST = (() => {
  const Pc = [0.0, -0.02];
  const light = { dir: [0.2, 1], colour: CANDLE, k: 0.3 };
  const hand0 = { who: 'sophia', L: 0.32, light, curl: [0.08, 0.06, 0.08, 0.12], spread: 0.15, thumb: 0.1, side: 1, angle: -2.05, sleeve: 'nightie' };
  const hand = placed(hand0, [0.33, 0], Pc);
  return { Pc, light, hand };
})();
function paintBreast(g, C) {
  const P = BREAST, rnd = C.e.rnd;
  // the room dark-warm at the sides, the nightdress filling the middle, lighter toward the candle below
  bands(g, -H, H, ['#4a3a34', '#54423a', '#5e4a3f']);
  poly(g, [[-0.86, -H], [0.86, -H], [0.95, H], [-0.95, H]], '#cfc7b8');
  const cols = ['#d4ccbd', '#ddd5c5', '#e6dccb', '#efe4d0'];
  cols.forEach((c, i) => { const y0 = -0.3 + i * 0.22; poly(g, [[-0.9 - 0.02 * i, y0], [0.9 + 0.02 * i, y0], [0.95, H], [-0.95, H]], c); });
  for (let i = 0; i < 9; i++) { const x = -0.7 + 0.175 * i; line(g, x, -0.32, x + 0.03 * Math.sin(i), H, 0.004, rgba('#a69a86', 0.55)); }
  // the nightdress's yoke up top, its frilled edge, the buttons down its front
  poly(g, [[-0.87, -H], [0.87, -H], [0.89, -0.36], [-0.89, -0.36]], '#c9c1b2');
  const fr = [];
  for (let i = 0; i <= 50; i++) fr.push([-0.88 + 0.0352 * i, -0.36 + (i % 2 ? 0.022 : 0)]);
  polyline(g, fr, 0.005, '#e9e2d4');
  for (let i = 0; i < 4; i++) gon(g, -0.33, -0.44 + 0.2 * i, 0.012, 6, '#f6f1e6', null, 0);
  // the candle's light up from below (stirring at `flicker`)
  C.layer('light', [0, 0.6], FULL, (g2) => pool(g2, 0.1, 0.62, 0.95, CANDLE, 0.3), { blend: 'add' });
  // her hand's shadow thrown up on the cloth
  C.layer('shadow', P.Pc, [-0.6, -H, 0.8, H], (g2) => hand(g2, { ...P.hand, at: add2(P.hand.at, [0.01, -0.035]), tone: 'rgba(90,70,60,0.28)' }, rnd));
  C.layer('hand', P.Pc, [-0.6, -H, 1.6, H], (g2) => hand(g2, P.hand, rnd));
  C.layer('warm', P.Pc, [-0.4, -0.4, 0.4, 0.4], (g2) => pool(g2, P.Pc[0] + 0.03, P.Pc[1] + 0.12, 0.25, CANDLE, 0.1), { blend: 'add' });
}
function liveBreast(L, now) {
  const P = BREAST, f = unit01(now.flicker, 0), t = L.e.t;
  const n1 = noise(t * 7.3, 2), n2 = noise(t * 5.1, 3);
  L.set('light', { alpha: 1 - 0.3 * f * (0.5 + 0.5 * n1) });
  L.set('warm', { alpha: 1 - 0.35 * f * (0.5 + 0.5 * n1) });
  L.set('shadow', { x: 0.014 * f * n2, y: 0.008 * f * n1 });
  L.at(...P.Pc, 'palm');
  L.at(...P.Pc);
}

// ── sleeve ── the house by day, the boards of its wall behind: Grandmother's arm across the frame in her dark-blue
// sleeve, her old hand at the left; Sophia's small fingers holding the sleeve at the wrist. `let`: the fingers open
// and let go, the hand drawing back down.
const SLEEVE = (() => {
  const S = [-0.06, -0.01], BACK = 0.09;
  const light = { dir: [-0.5, -1], colour: DAY, k: 0.32 };
  const gran = placed({ who: 'grandma', L: 0.34, light, curl: [0.3, 0.35, 0.4, 0.45], thumb: 0.2, side: -1, angle: Math.PI - 0.25 }, [0, 0], [-0.25, -0.03]);
  const soph = (curl, thumb, spread) => placed({ who: 'sophia', L: 0.25, light, curl, thumb, spread, side: 1, angle: -Math.PI / 2 - 0.15 }, [0.6, 0], S);
  return { S, BACK, light, gran, shut: soph([0.85, 0.88, 0.88, 0.86], 0.6, 0), open: soph([0.1, 0.12, 0.15, 0.2], 0.05, 0.35) };
})();
function paintSleeve(g, C) {
  const P = SLEEVE, rnd = C.e.rnd;
  // the wall's boards, the floor's line far below
  for (let i = 0; i < 20; i++) { const x = -W + i * 0.135; poly(g, [[x, -H], [x + 0.135, -H], [x + 0.135, H], [x, H]], i % 2 ? '#ddd6c6' : '#d3cbba', rgba('#9a8f80', 0.7), 0.003); }
  poly(g, [[-W, 0.38], [W, 0.38], [W, H], [-W, H]], '#a8a295');
  line(g, -W, 0.38, W, 0.38, 0.005, rgba('#6b6458', 0.7));
  pool(g, -0.7, -0.4, 0.9, DAY, 0.3);
  hand(g, P.gran, rnd);
  // the sleeve gathered where she holds it
  C.layer('pinch', P.S, [P.S[0] - 0.15, P.S[1] - 0.12, P.S[0] + 0.15, P.S[1] + 0.12], (g2) => {
    for (const [dx, dy] of [[-0.1, -0.05], [-0.1, 0.05], [0.11, -0.05], [0.11, 0.06], [0.0, -0.07]]) line(g2, P.S[0] + dx * 0.25, P.S[1] + dy * 0.3, P.S[0] + dx, P.S[1] + dy, 0.005, rgba('#1b2130', 0.55));
  });
  C.layer('shut', P.S, [-0.5, -0.3, 0.5, H], (g2) => hand(g2, P.shut, rnd));
  C.layer('open', P.S, [-0.5, -0.3, 0.5, H], (g2) => hand(g2, P.open, rnd));
}
function liveSleeve(L, now) {
  const P = SLEEVE, lt = unit01(now.let, 0), open = ease.smooth(span(lt, 0, 0.45)), back = P.BACK * ease.inOut(span(lt, 0.3, 1));
  L.set('shut', { y: back, alpha: 1 - open });
  L.set('open', { y: back, alpha: open });
  L.set('pinch', { alpha: 1 - open });
  L.at(P.S[0], P.S[1] + back, 'fingers');
  L.at(P.S[0], P.S[1] + back);
}

// ── string ── on the rock: the parcel in its brown paper tied with white string, Grandmother's hands holding it out at
// its two sides; Sophia's small fingers at the string's bow on top. `pull`: the bow pulled (her hand going up and off
// with the string's end), the string loose, the paper opening.
const STRING = (() => {
  const B = [0.0, -0.07], E0 = [0.07, -0.085], E1 = [0.36, -0.3], D0 = Math.hypot(...sub2(E0, B));
  const light = { dir: [-0.5, -1], colour: DAY, k: 0.32 };
  const left = placed({ who: 'grandma', L: 0.33, light, curl: [0.55, 0.55, 0.6, 0.62], thumb: 0.2, side: -1, angle: -0.55 }, [0.62, 0], [-0.28, 0.06]);
  const right = placed({ who: 'grandma', L: 0.33, light, curl: [0.55, 0.55, 0.6, 0.62], thumb: 0.2, side: 1, angle: -Math.PI + 0.55 }, [0.62, 0], [0.28, 0.05]);
  const soph = pinched({ who: 'sophia', L: 0.26, light, curl: [0.3, 0.72, 0.8, 0.85], thumb: 0.35, side: 1, angle: 2.4 }, E0);
  return { B, E0, E1, D0, light, left, right, soph };
})();
const stringEnd = (pull) => lerp2(STRING.E0, STRING.E1, ease.inOut(pull));
function paintString(g, C) {
  const P = STRING, rnd = C.e.rnd;
  // the sea up top, the granite below in flat slabs
  bands(g, -H, -0.3, ['#c9d0d0', '#b8c3c5']);
  poly(g, [[-W, -0.33], [-0.5, -0.36], [0.2, -0.32], [W, -0.36], [W, H], [-W, H]], GRANITE);
  for (let i = 0; i < 12; i++) { const x = -W + 2 * W * rnd(), y = -0.3 + 0.9 * rnd(); poly(g, [[x, y], [x + 0.3, y - 0.04], [x + 0.35, y + 0.12], [x + 0.03, y + 0.14]], rgba(rnd() < 0.5 ? '#c4bbad' : '#9b9183', 0.6)); }
  for (let i = 0; i < 10; i++) gon(g, -W + 2 * W * rnd(), -0.25 + 0.8 * rnd(), 0.02 + 0.03 * rnd(), 7, rgba('#9aa07a', 0.55), rnd, 0.4);
  // the parcel: its top seen from above and in front, its front face
  const top = [[-0.23, -0.15], [0.21, -0.165], [0.25, 0.0], [-0.25, 0.015]], front = [[-0.25, 0.015], [0.25, 0.0], [0.25, 0.11], [-0.25, 0.125]];
  poly(g, front, '#9f7a4f', rgba('#4a3420', 0.7), 0.004);
  poly(g, top, '#b88f60', rgba('#4a3420', 0.7), 0.004);
  poly(g, [[-0.23, -0.15], [0.21, -0.165], [0.0, -0.07]], '#c49d6e');
  for (const [a, b] of [[[-0.2, -0.12], [0.1, -0.03]], [[0.15, -0.14], [-0.15, -0.02]], [[-0.24, 0.05], [0.24, 0.04]]]) line(g, ...a, ...b, 0.0025, rgba('#7a5a38', 0.5));
  C.layer('shut', P.B, [-0.3, -0.2, 0.3, 0.15], (g2) => {
    // the string tied round both ways, down the front
    line(g2, -0.24, -0.068, 0.23, -0.083, 0.008, '#ece4cf');
    line(g2, -0.01, -0.158, 0.01, 0.008, 0.008, '#ece4cf');
    line(g2, 0.01, 0.008, 0.01, 0.12, 0.008, '#ece4cf');
    line(g2, -0.25, 0.015, -0.25, 0.125, 0.008, '#ece4cf');
  });
  C.layer('bow', P.B, [-0.12, -0.15, 0.12, 0.02], (g2) => {
    poly(g2, [P.B, [-0.07, -0.11], [-0.085, -0.075], [-0.06, -0.06]], '#f4eedc', rgba('#7a6a50', 0.8), 0.003);
    poly(g2, [P.B, [0.05, -0.12], [0.075, -0.09], [0.05, -0.07]], '#f4eedc', rgba('#7a6a50', 0.8), 0.003);
    line(g2, ...P.B, -0.05, -0.02, 0.007, '#ece4cf');
    gon(g2, ...P.B, 0.012, 6, '#e3d9c0');
  });
  C.layer('loose', P.B, [-0.32, -0.2, 0.32, 0.2], (g2) => {
    polyline(g2, [[-0.24, -0.06], [-0.15, -0.05], [-0.08, -0.08], [0.0, -0.06], [0.1, -0.09], [0.18, -0.07]], 0.007, '#ece4cf');
    polyline(g2, [[-0.04, -0.15], [-0.02, -0.1], [0.03, -0.06], [0.0, 0.0], [0.04, 0.05], [0.0, 0.12]], 0.007, '#ece4cf');
  });
  // the paper opening: its top's flaps lifted, the inside (pale tissue) seen
  C.layer('open', P.B, [-0.35, -0.3, 0.35, 0.05], (g2) => {
    poly(g2, [[-0.2, -0.14], [0.18, -0.15], [0.22, -0.01], [-0.22, 0.0]], '#ece6d8');
    poly(g2, [[-0.23, -0.15], [0.21, -0.165], [0.16, -0.27], [-0.18, -0.26]], '#c49d6e', rgba('#4a3420', 0.7), 0.004);
    poly(g2, [[-0.25, 0.015], [-0.23, -0.15], [-0.34, -0.1], [-0.33, 0.03]], '#a8835a', rgba('#4a3420', 0.7), 0.004);
    for (let k = 0; k < 4; k++) line(g2, -0.15 + 0.1 * k, -0.12, -0.12 + 0.1 * k, -0.02, 0.003, rgba('#b9b0a0', 0.8));
  });
  // the string's end from the bow to her fingers: painted along +x, turned and drawn out by live
  C.layer('end', P.B, [P.B[0] - 0.01, P.B[1] - 0.02, P.B[0] + P.D0 + 0.02, P.B[1] + 0.02], (g2) => line(g2, P.B[0], P.B[1], P.B[0] + P.D0, P.B[1], 0.007, '#ece4cf'));
  C.layer('hands', [0, 0.05], [-1.6, -0.3, 1.6, H], (g2) => { hand(g2, P.left, rnd); hand(g2, P.right, rnd); });
  C.layer('soph', P.E0, [-0.1, -H, W, 0.1], (g2) => hand(g2, P.soph, rnd));
  C.at(...P.B, 'bow');
}
function liveString(L, now) {
  const P = STRING, pull = unit01(now.pull, 0), E = stringEnd(pull), d = sub2(E, P.B);
  const untie = ease.smooth(span(pull, 0.1, 0.5)), open = ease.smooth(span(pull, 0.6, 1));
  L.set('soph', { x: E[0] - P.E0[0], y: E[1] - P.E0[1] });
  L.set('end', { rotate: Math.atan2(d[1], d[0]), sx: Math.hypot(...d) / P.D0, sy: 1, alpha: 1 - open });
  L.set('bow', { alpha: 1 - untie });
  L.set('shut', { alpha: 1 - untie });
  L.set('loose', { alpha: untie * (1 - open) });
  L.set('open', { alpha: open });
  L.at(...P.B, 'bow');
  L.at(...P.B);
}

// ── palm ── night on the cape, behind the tent: its canvas filling the frame, glowing faintly from the lantern inside,
// the deep blue night past its slanting edge; Grandmother's old hand close to it, not touching. `near`: the palm's
// nearness to the canvas (1 touching — it goes from her, smaller, the canvas's light on it); `knock`: knocks given
// (each whole step her knuckles go to the cloth and back).
const PALM = (() => {
  const Pp = [0.0, -0.04];
  const light = { dir: [0.3, -1], colour: '#efe2c0', k: 0.32 };
  const skin = mixc(SKIN.grandma, '#3d4866', 0.3);
  const o = (curl, thumb, spread) => placed({ who: 'grandma', L: 0.36, light, skin, curl, thumb, spread, side: 1, angle: -Math.PI / 2 - 0.12 }, [0.32, 0], Pp);
  return { Pp, light, open: o([0.08, 0.06, 0.1, 0.14], 0.05, 0.25), fist: o([0.92, 0.94, 0.94, 0.92], 0.7, 0) };
})();
function paintPalm(g, C) {
  const P = PALM, rnd = C.e.rnd;
  // the night past the tent's slanting edge, a few stars
  bands(g, -H, H, [NIGHT, '#2c3653', '#323c58']);
  for (let i = 0; i < 30; i++) gon(g, -W + 1.1 * rnd(), -H + 0.5 * rnd(), 0.003, 4, rgba('#e8ecf6', 0.8));
  // the canvas, faintly lit from inside: flat panels, the seams, the back pole's shadow through it
  const edge = [[-W, -0.02], [-0.45, -H - 0.05], [W, -H - 0.05], [W, H], [-W, H]];
  poly(g, edge, mixc(CANVAS, NIGHT, 0.38));
  for (let i = 0; i < 6; i++) { const x = -0.9 + 0.45 * i; poly(g, [[x, -H], [x + 0.2, -H], [x + 0.2, H], [x, H]], rgba(mixc(CANVAS, NIGHT, 0.3), 0.6)); }
  for (const x of [-0.45, 0.45]) line(g, x, -H, x, H, 0.005, rgba('#6b6558', 0.6));
  poly(g, [[0.28, -H], [0.31, -H], [0.31, H], [0.28, H]], rgba('#5a5244', 0.45));
  line(g, -W, -0.02, -0.45, -H - 0.05, 0.008, '#8b8270');
  C.layer('glow', [0.25, 0], FULL, (g2) => pool(g2, 0.25, -0.05, 1.0, '#ffd9a0', 0.32), { blend: 'add', flicker: 0.12 });
  // where her knuckles press: the cloth dimpled
  C.layer('dent', P.Pp, [P.Pp[0] - 0.2, P.Pp[1] - 0.2, P.Pp[0] + 0.2, P.Pp[1] + 0.2], (g2) => {
    gon(g2, P.Pp[0], P.Pp[1] - 0.06, 0.09, 8, rgba('#5a5040', 0.18));
    for (let k = 0; k < 6; k++) { const a = (k / 6) * TAU; line(g2, P.Pp[0] + Math.cos(a) * 0.06, P.Pp[1] - 0.06 + Math.sin(a) * 0.05, P.Pp[0] + Math.cos(a) * 0.12, P.Pp[1] - 0.06 + Math.sin(a) * 0.09, 0.003, rgba('#5a5040', 0.2)); }
  });
  C.layer('open', P.Pp, [-0.6, -H, 0.6, H], (g2) => hand(g2, P.open, rnd));
  C.layer('fist', P.Pp, [-0.6, -H, 0.6, H], (g2) => hand(g2, P.fist, rnd));
  // the canvas's light on her hand as it comes near
  C.layer('lit', P.Pp, [P.Pp[0] - 0.3, P.Pp[1] - 0.35, P.Pp[0] + 0.3, P.Pp[1] + 0.25], (g2) => pool(g2, P.Pp[0], P.Pp[1] - 0.08, 0.22, '#ffd9a0', 0.18), { blend: 'add' });
  C.at(...P.Pp, 'palm');
}
function livePalm(L, now) {
  const P = PALM, near = unit01(now.near, 0.6), knock = clamp(num(now.knock, 0), 0, 3);
  const f = knock - Math.floor(knock), fist = ease.smooth(clamp(knock * 4, 0, 1));
  const eff = near + (1 - near) * Math.sin(Math.PI * f) * fist, s = 1.08 - 0.16 * eff;
  L.set('open', { scale: s, alpha: 1 - fist });
  L.set('fist', { scale: s, alpha: fist });
  L.set('lit', { scale: s, alpha: 0.2 + 0.8 * eff });
  L.set('dent', { alpha: ease.smooth(span(eff, 0.9, 1)) });
  L.at(...P.Pp, 'palm');
  L.at(...P.Pp);
}

// ── oars ── in the dinghy in the fog: the two oars' looms in from the sides, their handles close together in front of
// Sophia, her small hands on them; Grandmother's old hands over hers. `let`: Grandmother's hands lift off and away.
const OARS = (() => {
  const Hd = [0, 0.03];
  const light = { dir: [-0.3, -1], colour: DAY, k: 0.32 };
  const grip = (x) => [x, 0.06 - (Math.abs(x) - 0.06) * 0.237];
  const soph = [-1, 1].map((s) => placed({ who: 'sophia', L: 0.25, light, curl: [0.82, 0.84, 0.86, 0.86], thumb: 0.55, side: s, angle: -Math.PI / 2 - s * 0.2 }, [0.55, 0], grip(s * 0.2)));
  const gran = [-1, 1].map((s) => placed({ who: 'grandma', L: 0.33, light, curl: [0.55, 0.58, 0.6, 0.62], thumb: 0.4, side: s, angle: -Math.PI / 2 - s * 0.3 }, [0.5, 0], add2(grip(s * 0.2), [s * 0.03, 0.035])));
  return { Hd, light, grip, soph, gran };
})();
function paintOars(g, C) {
  const P = OARS, rnd = C.e.rnd;
  // the fog over the water beyond the bow, the dinghy's pale blue-grey inside close
  bands(g, -H, 0.1, ['#e2e4e2', '#d8dcdb', '#ccd3d3', '#c3cbcc']);
  poly(g, [[-W, 0.0], [-0.6, 0.04], [0.6, 0.04], [W, 0.0], [W, H], [-W, H]], '#9fb0b6');
  poly(g, [[-W, 0.2], [W, 0.2], [W, 0.32], [-W, 0.32]], '#a58f6c', rgba('#5a4a36', 0.6), 0.004);
  poly(g, [[-W, 0.2], [W, 0.2], [W, 0.23], [-W, 0.23]], '#c9b98a');
  for (let i = 0; i < 4; i++) line(g, -W, 0.36 + 0.07 * i, W, 0.36 + 0.07 * i, 0.004, rgba('#6c7c84', 0.5));
  // the oars: pale wooden looms in from the sides, darker worn handles
  for (const s of [-1, 1]) {
    const a = [s * 1.45, -0.27], h0 = P.grip(s * 0.36), h1 = P.grip(s * 0.06);
    const d = unit(sub2(h1, a)), n = [-d[1], d[0]];
    poly(g, [add2(a, mul2(n, 0.024)), add2(h0, mul2(n, 0.02)), add2(h0, mul2(n, -0.02)), add2(a, mul2(n, -0.024))], '#c9b98a', rgba('#5a4a36', 0.7), 0.004);
    poly(g, [add2(a, mul2(n, 0.024 * s)), add2(h0, mul2(n, 0.02 * s)), h0, a], '#d8cba0');
    poly(g, [add2(h0, mul2(n, 0.016)), add2(h1, mul2(n, 0.016)), add2(h1, mul2(n, -0.016)), add2(h0, mul2(n, -0.016))], '#9c8564', rgba('#4a3a28', 0.7), 0.004);
  }
  for (const o of P.soph) hand(g, o, rnd);
  C.layer('gran', P.Hd, [-1.6, -0.4, 1.6, H], (g2) => { for (const o of P.gran) hand(g2, o, rnd); });
  C.layer('fog', [0, -0.3], [-W, -H, W, 0.1], (g2) => {
    for (let i = 0; i < 6; i++) poly(g2, [[-W + 0.5 * i, -0.3 + 0.05 * (i % 3)], [-W + 0.5 * i + 0.8, -0.32], [-W + 0.5 * i + 0.9, -0.25], [-W + 0.5 * i - 0.1, -0.22]], rgba('#f2f3f1', 0.35));
  }, { drift: [0.015, 0] });
  C.at(...P.Hd, 'hands');
}
function liveOars(L, now) {
  const P = OARS, lt = unit01(now.let, 0), lift = ease.out(span(lt, 0, 0.3)), away = ease.inOut(span(lt, 0.25, 1));
  L.set('gran', { y: -0.05 * lift + 0.45 * away, alpha: 1 - span(lt, 0.7, 1) });
  L.at(...P.Hd, 'hands');
  L.at(...P.Hd);
}

// ── rail ── the gangway to the big boat in the fog: its hand rail a rope on grey wooden posts, rising to the right
// across the frame and sagging between them, the boat's grey side looming in the white; Grandmother's hand on the
// rope. `let`: the hand opens and leaves the rope.
const RAIL = (() => {
  const A = [-1.45, 0.32], Bp = [1.45, -0.3], POSTS = [-2.75, -0.95, 0.85, 2.65], SAG = 0.04;
  const ang = Math.atan2(Bp[1] - A[1], Bp[0] - A[0]);
  const line0 = (x) => A[1] + ((x - A[0]) / (Bp[0] - A[0])) * (Bp[1] - A[1]);
  // the rope: the line from post top to post top, sagging between them
  const ropeY = (x) => {
    let k = 0;
    while (k < POSTS.length - 2 && x > POSTS[k + 1]) k++;
    const u = clamp((x - POSTS[k]) / (POSTS[k + 1] - POSTS[k]), 0, 1);
    return line0(x) + SAG * 4 * u * (1 - u);
  };
  const Rh = [0.02, ropeY(0.02)];
  const light = { dir: [-0.3, -1], colour: '#f4f4f2', k: 0.3 };
  const o = (curl, thumb, spread) => placed({ who: 'grandma', L: 0.34, light, curl, thumb, spread, side: 1, angle: ang - Math.PI / 2 }, [0.55, 0], add2(Rh, [0, -0.005]));
  return { A, Bp, POSTS, ropeY, Rh, ang, light, shut: o([0.82, 0.84, 0.86, 0.86], 0.55, 0), open: o([0.08, 0.08, 0.1, 0.15], 0.05, 0.3) };
})();
function paintRail(g, C) {
  const P = RAIL, rnd = C.e.rnd;
  // the fog: white going grey toward the water; the big boat's side a dim shape up to the right
  bands(g, -H, H, ['#e6e7e4', '#e0e2df', '#d8dbd9', '#ced3d2', '#c4cacb', '#bcc3c5']);
  poly(g, [[0.25, -0.25], [W, -0.36], [W, H], [0.4, H], [0.3, 0.1]], rgba('#9aa0a3', 0.55));
  poly(g, [[0.25, -0.25], [W, -0.36], [W, -0.32], [0.26, -0.21]], rgba('#7c8285', 0.55));
  C.layer('fog', [0, 0], FULL, (g2) => {
    for (let i = 0; i < 8; i++) { const x = -W + 0.4 * i, y = -0.35 + 0.12 * (i % 4); poly(g2, [[x, y], [x + 0.9, y - 0.03], [x + 1.0, y + 0.06], [x - 0.05, y + 0.08]], rgba('#f4f5f3', 0.2)); }
  }, { drift: [0.02, 0] });
  // the gangway's grey planks below; the posts (as the shore's gangway: grey wood) with the rope over their tops
  poly(g, [[-W, 0.5], [W, 0.06], [W, H], [-W, H]], '#8f8880');
  for (const x of P.POSTS) {
    const y = P.ropeY(x);
    poly(g, [[x - 0.03, y - 0.03], [x + 0.03, y - 0.03], [x + 0.03, H], [x - 0.03, H]], '#7a7168', rgba('#4a443c', 0.6), 0.004);
    poly(g, [[x - 0.03, y - 0.03], [x - 0.005, y - 0.03], [x - 0.005, H], [x - 0.03, H]], '#8c8378');
  }
  const pts = [];
  for (let x = -W - 0.05; x <= W + 0.05; x += 0.05) pts.push([x, P.ropeY(x)]);
  polyline(g, pts, 0.026, '#8a7f6a');
  polyline(g, pts, 0.018, '#b8ab92');
  // its lay: short twists along it
  for (let x = -W; x <= W; x += 0.035) { const y = P.ropeY(x); line(g, x - 0.008, y - 0.008, x + 0.008, y + 0.008, 0.003, rgba('#7a6f5a', 0.7)); }
  C.layer('shut', P.Rh, [-0.5, -0.4, W, H + 0.3], (g2) => hand(g2, P.shut, rnd));
  C.layer('open', P.Rh, [-0.5, -0.4, W, H + 0.3], (g2) => hand(g2, P.open, rnd));
  C.layer('mist', [0, 0], FULL, (g2) => { g2.fillStyle = rgba('#eef0ee', 1); g2.fillRect(-W, -H, 2 * W, 2 * H); });
}
function liveRail(L, now) {
  const P = RAIL, lt = unit01(now.let, 0), open = ease.smooth(span(lt, 0, 0.35)), go = ease.inOut(span(lt, 0.3, 1));
  const off = [-0.06 * go, -0.2 * go];
  L.set('shut', { x: off[0], y: off[1], alpha: 1 - open });
  L.set('open', { x: off[0], y: off[1], alpha: open * (1 - span(lt, 0.8, 1)) });
  L.set('mist', { alpha: 0.08 });
  L.at(...add2(P.Rh, off), 'hand');
  L.at(...add2(P.Rh, off));
}

const SHOTS = {
  teeth: { paint: paintTeeth, live: liveTeeth, first: 'lift' },
  stems: { paint: paintStems, live: liveStems, first: 'pull' },
  knife: { paint: paintKnife, live: liveKnife, first: 'log' },
  match: { paint: paintMatch, live: liveMatch, first: 'hand' },
  gunwale: { paint: paintGunwale, live: liveGunwale, first: 'boat' },
  knot: { paint: paintKnot, live: liveKnot, first: 'hard' },
  tremble: { paint: paintTremble, live: liveTremble, first: 'hand_l' },
  gap: { paint: paintGap, live: liveGap, first: 'gran' },
  breast: { paint: paintBreast, live: liveBreast, first: 'hand' },
  sleeve: { paint: paintSleeve, live: liveSleeve, first: 'shut' },
  string: { paint: paintString, live: liveString, first: 'bow' },
  palm: { paint: paintPalm, live: livePalm, first: 'open' },
  oars: { paint: paintOars, live: liveOars, first: 'gran' },
  rail: { paint: paintRail, live: liveRail, first: 'shut' },
};
// where a shot stands on the stage (stage heights): the whole frame, its middle at the frame's
function frameOf(e) {
  const ax = e.aspect / 2, ay = 0.5;
  return { ax, ay, to: (x, y) => [ax + x, ay + y] };
}

// paint(g, e, shot) — an insert's code; shot — one of SHOTS' names. The painting reads no key of the scene
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

// live(e, shot, now) — an insert's animate: nothing painted, the layers moved and the points marked. now (a field
// missing — its default): teeth { show }, stems { pull }, knife { carve, flaw }, match { strike, lit, night },
// gunwale { push }, knot { pull }, tremble { shake }, gap { palm, hand }, breast { flicker }, sleeve { let },
// string { pull }, palm { near, knock }, oars { let }, rail { let }
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
    // a point (the shot's units): named — `<shot>#<name>`; unnamed — the shot's own (its main thing)
    at: (x, y, name) => (name ? e.at(...to(x, y), name) : e.at(...to(x, y))),
  }, now ?? {});
}

return { paint, live };
