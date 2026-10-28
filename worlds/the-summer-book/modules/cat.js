// Mappe, the cat of «The Summer Book»: big, grey and wild, seen side-on — sitting, lying or walking. Each pose is a
// layer painted once (with its tail, and the walk's four legs, as layers of their own); which pose is seen is the
// engine's: the element's animate shows one and hides the others by a key (cat_pose), cross-fading in a moment, so
// the cat sits down or gets up in the middle of a beat without a painting made again. Where he is, the scene's
// `place` keys say (cat_at): walking, his card is carried by the engine and his legs step by the way he goes.
// cat.md says how a scene takes him.

// the poses, and the box the element paints in (metres round where he stands, his paws on the ground at 0; he faces
// +x — the right — and is mirrored by `dir`)
const POSES = ['sit', 'lie', 'walk', 'none'];
const BOX = [-0.46, -0.56, 0.46, 0.03];
// his colours: the fur, its darker side (the far legs, the stripes), the eye
const FUR = '#6f7274', DARK = '#5f6264', EYE = '#c9c07a';
// the walk: the shoulders' and the hips' pivots, a stride (metres a whole step goes), how far a leg swings (radians)
const SHOULDER = [0.15, -0.22], HIP = [-0.17, -0.23], STRIDE = 0.36, SWING = 0.38;
// each layer's pivot (what it turns about; mirrored with him)
const PIVOTS = {
  sit: [0, 0], sit_tail: [-0.1, -0.02],
  lie: [0, 0], lie_tail: [-0.24, -0.04],
  walk_fl: SHOULDER, walk_hl: HIP, walk: [0, 0], walk_fr: SHOULDER, walk_hr: HIP, walk_tail: [-0.24, -0.27],
};
// which layers each pose shows
const SHOWS = {
  sit: ['sit', 'sit_tail'], lie: ['lie', 'lie_tail'],
  walk: ['walk_fl', 'walk_hl', 'walk', 'walk_fr', 'walk_hr', 'walk_tail'], none: [],
};
// the points of each pose: his head ("<id>#cat" — and his own e.at), his back where a hand strokes him ("<id>#back")
const POINTS = {
  sit: { cat: [0.09, -0.3], back: [-0.02, -0.25] },
  lie: { cat: [0.2, -0.16], back: [-0.04, -0.15] },
  walk: { cat: [0.28, -0.32], back: [0, -0.32] },
};

function ears(g, x, y) {
  g.beginPath();
  g.moveTo(x - 0.04, y - 0.06);
  g.lineTo(x - 0.02, y - 0.13);
  g.lineTo(x + 0.02, y - 0.07);
  g.closePath();
  g.moveTo(x + 0.03, y - 0.06);
  g.lineTo(x + 0.06, y - 0.12);
  g.lineTo(x + 0.08, y - 0.04);
  g.closePath();
  g.fill();
}
function eye(g, x, y) {
  g.fillStyle = EYE;
  g.beginPath();
  g.arc(x, y, 0.012, 0, Math.PI * 2);
  g.fill();
}
// a leg hanging from its pivot to the ground, a little narrower at the paw
function leg(g, [x, y], colour) {
  g.fillStyle = colour;
  g.beginPath();
  g.moveTo(x - 0.03, y);
  g.lineTo(x + 0.03, y);
  g.lineTo(x + 0.022, -0.012);
  g.quadraticCurveTo(x + 0.03, 0.004, x + 0.0, 0.004);
  g.lineTo(x - 0.025, 0.004);
  g.lineTo(x - 0.022, -0.012);
  g.closePath();
  g.fill();
}
function tail(g, from, c1, to, width) {
  g.strokeStyle = DARK;
  g.lineCap = 'round';
  g.lineWidth = width;
  g.beginPath();
  g.moveTo(from[0], from[1]);
  g.quadraticCurveTo(c1[0], c1[1], to[0], to[1]);
  g.stroke();
}

// Its code: every pose painted once, as layers (nothing read from the state). The element's box — BOX.
function paint(g, e) {
  const L = (name, fn) => e.layer(name, { pivot: PIVOTS[name] }, fn);
  // sitting side-on, his tail round to the front
  L('sit', c => {
    c.fillStyle = FUR;
    c.beginPath();
    c.ellipse(0, -0.14, 0.13, 0.16, 0.15, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.ellipse(0.09, -0.3, 0.085, 0.075, 0, 0, Math.PI * 2);
    c.fill();
    ears(c, 0.1, -0.3);
    c.fillStyle = DARK;
    c.fillRect(0.04, -0.07, 0.035, 0.08);
    c.fillRect(0.09, -0.07, 0.035, 0.08);
    eye(c, 0.15, -0.31);
  });
  L('sit_tail', c => tail(c, [-0.1, -0.02], [-0.22, 0.0], [-0.2, -0.12], 0.05));
  // lying like a loaf, the head up, the paws tucked before him
  L('lie', c => {
    c.fillStyle = FUR;
    c.beginPath();
    c.ellipse(-0.03, -0.085, 0.25, 0.085, 0, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.ellipse(0.2, -0.16, 0.08, 0.07, 0, 0, Math.PI * 2);
    c.fill();
    ears(c, 0.2, -0.16);
    c.fillStyle = DARK;
    c.beginPath();
    c.ellipse(0.2, -0.012, 0.06, 0.016, 0, 0, Math.PI * 2);
    c.fill();
    eye(c, 0.255, -0.17);
  });
  L('lie_tail', c => tail(c, [-0.24, -0.04], [-0.3, 0.01], [-0.12, 0.0], 0.045));
  // walking: the body level, the head forward, the tail up; the far legs darker behind, the near ones before
  L('walk_fl', c => leg(c, SHOULDER, DARK));
  L('walk_hl', c => leg(c, HIP, DARK));
  L('walk', c => {
    c.fillStyle = FUR;
    c.beginPath();
    c.ellipse(-0.01, -0.26, 0.25, 0.085, -0.04, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.moveTo(0.16, -0.31);
    c.quadraticCurveTo(0.24, -0.33, 0.26, -0.27);
    c.lineTo(0.18, -0.21);
    c.closePath();
    c.fill();
    c.beginPath();
    c.ellipse(0.28, -0.32, 0.08, 0.07, 0, 0, Math.PI * 2);
    c.fill();
    ears(c, 0.28, -0.32);
    eye(c, 0.335, -0.33);
  });
  L('walk_fr', c => leg(c, SHOULDER, FUR));
  L('walk_hr', c => leg(c, HIP, FUR));
  L('walk_tail', c => tail(c, [-0.24, -0.27], [-0.4, -0.3], [-0.36, -0.5], 0.045));
  e.at(...POINTS.sit.cat);
}

// Its animate: pose — what he is doing now ('sit' | 'lie' | 'walk' | 'none': not seen), dir — 1 facing right (as
// painted), −1 mirrored. The pose cross-fades in a quarter of a second (at once after a cut); walking, the legs step
// by the way the element goes (e.spot), the body bobs; the tail stirs now and then. Marks "<id>#cat" and "<id>#back".
function move(e, pose, dir = 1) {
  const m = e.mem, dt = Math.min(e.dt || 0, 0.1);
  m.w ??= {};
  const fresh = e.cut < 0.05 || m.pose === undefined;
  m.pose = pose;
  // how far he has walked: the legs' phase (a step a half stride)
  const s = e.spot, step = m.at ? Math.hypot(s.across - m.at[0], s.distance - m.at[1]) : 0;
  m.at = [s.across, s.distance];
  if (pose === 'walk' && !fresh && step < 1) m.phase = (m.phase ?? 0) + step / STRIDE;
  const ph = (m.phase ?? 0) * Math.PI * 2, n = e.anim.drift(e.t * 0.4, 7), flick = 0.25 * Math.max(0, n) * Math.max(0, n);
  for (const p of POSES) {
    if (p === 'none') continue;
    const goal = p === pose ? 1 : 0, w = fresh ? goal : (m.w[p] ?? goal);
    m.w[p] = goal > w ? Math.min(goal, w + dt * 4) : Math.max(goal, w - dt * 4);
    for (const name of SHOWS[p]) {
      const l = e.layer(name), pv = PIVOTS[name];
      let r = 0, y = 0;
      if (name === 'sit_tail') r = flick;
      else if (name === 'lie_tail') r = -0.6 * flick;
      else if (name === 'walk_tail') r = 0.12 * Math.sin(ph * 0.5) + flick * 0.4;
      else if (name === 'walk_fr' || name === 'walk_hl') r = SWING * Math.sin(ph);
      else if (name === 'walk_fl' || name === 'walk_hr') r = -SWING * Math.sin(ph);
      if (p === 'walk') y = -0.008 * Math.abs(Math.cos(ph));
      l.alpha = m.w[p];
      l.rotate = dir < 0 ? -r : r;
      l.scaleX = dir < 0 ? -1 : 1;
      l.x = dir < 0 ? -2 * pv[0] : 0;
      l.y = y;
    }
  }
  const pts = POINTS[pose];
  if (pts) {
    e.at(pts.cat[0] * dir, pts.cat[1]);
    e.at(pts.cat[0] * dir, pts.cat[1], 'cat');
    e.at(pts.back[0] * dir, pts.back[1], 'back');
  }
}

return { POSES, BOX, POINTS, paint, move };
