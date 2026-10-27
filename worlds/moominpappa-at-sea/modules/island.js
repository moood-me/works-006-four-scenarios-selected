// The island of «Moominpappa at Sea», one for every scene that sees its sea and sky: the land's shapes (a scene's own
// land is made of them), the lighthouse, its steps, the black pines, the granite, the sea, and the sky by the hour —
// day, dawn, dusk, the moonlit night, the storm and its lightning. Everything is painted once, in daylight colours; the
// hour and the weather are the scene's light (its looks, tools/island.py) and the sky's and the sea's shaders, set
// each frame by their animates from the state (dawn, dusk, night, storm, flash). island.md says how to call it.

// ── the land ──────────────────────────────────────────────────────────
// a round knoll: 1 at (ca, cd), falling off over ra across and rd ahead
function bump(a, d, ca, cd, ra, rd) {
  const x = (a - ca) / ra, z = (d - cd) / rd;
  return Math.exp(-(x * x + z * z));
}
// a granite back along a segment: h0 at its start, h1 at its end, its half-width w
function ridge(a, d, a0, d0, a1, d1, h0, h1, w) {
  const ux = a1 - a0, uz = d1 - d0, t = Math.max(0, Math.min(1, ((a - a0) * ux + (d - d0) * uz) / (ux * ux + uz * uz)));
  const px = a - (a0 + ux * t), pz = d - (d0 + uz * t);
  return (h0 + (h1 - h0) * t) * Math.exp(-(px * px + pz * pz) / (w * w));
}
// where a land meets its sea: a function (lo, hi, step, fn) calling fn(across, distance, h) on a grid over [a0, a1] ×
// [d0, d1] where the land's height over the sea is within [lo, hi] — what a scene's lib gives as its `shore`
function shoreOf(land, SEA, a0, a1, d0, d1) {
  return (lo, hi, step, fn) => {
    for (let a = a0; a <= a1; a += step) {
      for (let d = d0; d <= d1; d += step) {
        const h = land(a, d) - SEA;
        if (h >= lo && h <= hi) fn(a, d, h);
      }
    }
  };
}

// ── the lighthouse ────────────────────────────────────────────────────
// its profile, [radius, height] from the top down (metres): the cap, the lantern's glass, the gallery, the tapering
// tower, the plinth; its length, and how far along it a height on it is (the painting's rows)
const PROFILE = [[0, 14.3], [0.4, 14.2], [0.8, 13.85], [0.98, 13.4], [1.02, 13.3], [1.02, 11.95], [1.55, 11.9], [1.55, 11.2],
  [1.3, 11.15], [1.28, 11.05], [1.92, 0.45], [2.2, 0.42], [2.2, 0]];
const LENGTHS = [0];
for (let i = 1; i < PROFILE.length; i++) {
  LENGTHS.push(LENGTHS[i - 1] + Math.hypot(PROFILE[i][0] - PROFILE[i - 1][0], PROFILE[i][1] - PROFILE[i - 1][1]));
}
const TOWER = {
  profile: PROFILE,
  len: LENGTHS[LENGTHS.length - 1],
  at(h) {
    for (let i = 1; i < PROFILE.length; i++) {
      const h0 = PROFILE[i - 1][1], h1 = PROFILE[i][1];
      if (h <= h0 && h >= h1) return LENGTHS[i - 1] + (LENGTHS[i] - LENGTHS[i - 1]) * (h0 - h) / (h0 - h1 || 1);
    }
    return h > PROFILE[0][1] ? 0 : LENGTHS[LENGTHS.length - 1];
  },
};
// the painting's width: the way round at the tower's middle
const TOWER_ROUND = 2 * Math.PI * 1.6;
// the door, as the tower's painting has it: its half-width, its sill and the top of its arch (metres up the tower)
const DOOR = { half: 0.5, sill: 0.42, top: 2.25 };

// The lighthouse: a white tower turned on a lathe (a form), tapering up to a dark gallery and the lantern under a black
// cap; the door at its foot facing the start, two small windows up the tower, weather streaks down the whitewash. Its
// painting is the tower unrolled: the way round (its front in the middle) by the profile's length, top down. The
// lantern's glass is dark, or warm when the lamp burns (`lighthouse_lit` over a half: the scene repaints it on that
// key alone — "redraw"); its flame is the e.light "lantern" (the scene's light `lantern` takes it, on
// `lighthouse_lit`). `opts.doorway`: the door is a card of its own (door(g, e)) — the tower shows the dark doorway
// behind it.
function lighthouse(g, e, opts = {}) {
  const P = TOWER, W = TOWER_ROUND, L = P.len, y = h => -L + P.at(h), lit = (e.state.lighthouse_lit ?? 0) > 0.5;
  g.fillStyle = '#f2efe9';
  g.fillRect(-W / 2, -L, W, L);
  // the whitewash's streaks and the damp near the foot
  for (let i = 0; i < 70; i++) {
    const x = (e.rnd() - 0.5) * W, top = y(10.5 - e.rnd() * 9), len = 0.6 + e.rnd() * 3;
    g.fillStyle = `rgba(150, 146, 140, ${0.08 + e.rnd() * 0.12})`;
    g.fillRect(x, top, 0.04 + e.rnd() * 0.08, len);
  }
  const damp = g.createLinearGradient(0, y(1.6), 0, y(0));
  damp.addColorStop(0, 'rgba(160, 150, 140, 0)');
  damp.addColorStop(1, 'rgba(150, 132, 122, 0.55)');
  g.fillStyle = damp;
  g.fillRect(-W / 2, y(1.6), W, y(0) - y(1.6));
  // the plinth: granite blocks
  g.fillStyle = '#c9a097';
  g.fillRect(-W / 2, y(0.42), W, y(0) - y(0.42));
  g.strokeStyle = 'rgba(110, 82, 78, 0.6)';
  g.lineWidth = 0.03;
  for (let x = -W / 2; x < W / 2; x += 0.7) {
    g.beginPath();
    g.moveTo(x, y(0.42));
    g.lineTo(x, y(0));
    g.stroke();
  }
  // the gallery's parapet, the lantern's glass and its bars, the cap
  g.fillStyle = '#2d3034';
  g.fillRect(-W / 2, y(11.95), W, y(11.15) - y(11.95));
  g.fillStyle = lit ? '#f1d48c' : '#3b4651';
  g.fillRect(-W / 2, y(13.3), W, y(11.95) - y(13.3));
  const glint = g.createLinearGradient(-W / 2, 0, W / 2, 0);
  glint.addColorStop(0, 'rgba(190, 206, 220, 0)');
  glint.addColorStop(0.38, 'rgba(190, 206, 220, 0.4)');
  glint.addColorStop(0.46, 'rgba(190, 206, 220, 0)');
  glint.addColorStop(1, 'rgba(190, 206, 220, 0)');
  g.fillStyle = glint;
  g.fillRect(-W / 2, y(13.3), W, y(11.95) - y(13.3));
  g.fillStyle = '#1f2226';
  for (let x = -W / 2; x < W / 2; x += W / 10) g.fillRect(x - 0.05, y(13.3), 0.1, y(11.95) - y(13.3));
  g.fillRect(-W / 2, y(12.65) - 0.04, W, 0.08);
  g.fillStyle = '#26252a';
  g.fillRect(-W / 2, -L, W, y(13.3) + L);
  // the door: dark red-brown boards in an arch, an iron ring — or, when the door is a card of its own, the dark
  // doorway behind it
  const arch = () => {
    g.beginPath();
    g.moveTo(-DOOR.half, y(DOOR.sill));
    g.lineTo(-DOOR.half, y(DOOR.top - DOOR.half));
    g.arc(0, y(DOOR.top - DOOR.half), DOOR.half, Math.PI, 0);
    g.lineTo(DOOR.half, y(DOOR.sill));
    g.closePath();
  };
  if (opts.doorway) {
    g.fillStyle = '#2a2220';
    arch();
    g.fill();
  } else {
    g.fillStyle = '#6e3c33';
    arch();
    g.fill();
    g.strokeStyle = 'rgba(40, 22, 20, 0.6)';
    g.lineWidth = 0.03;
    for (const x of [-0.25, 0, 0.25]) {
      g.beginPath();
      g.moveTo(x, y(0.45));
      g.lineTo(x, y(2.15));
      g.stroke();
    }
    g.strokeStyle = '#2a2626';
    g.lineWidth = 0.035;
    g.beginPath();
    g.arc(0.3, y(1.25), 0.07, 0, Math.PI * 2);
    g.stroke();
  }
  for (const h of [5.2, 8.6]) {
    g.fillStyle = '#3a434c';
    g.fillRect(-0.22, y(h + 0.7), 0.44, 0.7);
    g.fillStyle = '#8a7e74';
    g.fillRect(-0.28, y(h) - 0.06, 0.56, 0.08);
  }
  e.at(0, y(1.2), 'door');
  e.at(0, y(12.6), 'lantern');
  e.light(0, y(12.6), 1.1, '#ffd27e', 1.6, 'lantern');
  e.form(e.kit.revolve(P.profile), { closed: 'u', ground: '#f2efe9' });
}

// The lighthouse door as a card of its own, painted from its hinge (its foot at the sill): dark red-brown boards
// under an arch, an iron ring at its free edge. opts.hinge: "left" (default — x 0 at the left jamb, the door to x 1.0)
// or "right" (hung on the right jamb, seen from outside: the door from x −1.0 to 0). A scene turns it about its hinge
// ("place": {"facing": key}: + opens toward the viewer a door hung on the left, − one hung on the right). Its point
// "<id>#door".
function door(g, e, opts = {}) {
  const w = DOOR.half * 2, h = DOOR.top - DOOR.sill;
  g.save();
  if (opts.hinge === 'right') g.translate(-w, 0);
  g.fillStyle = '#6e3c33';
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(0, -(h - DOOR.half));
  g.arc(DOOR.half, -(h - DOOR.half), DOOR.half, Math.PI, 0);
  g.lineTo(w, 0);
  g.closePath();
  g.fill();
  g.strokeStyle = 'rgba(40, 22, 20, 0.6)';
  g.lineWidth = 0.03;
  for (const x of [0.25, 0.5, 0.75]) {
    g.beginPath();
    g.moveTo(x, -0.03);
    g.lineTo(x, -(h - 0.1));
    g.stroke();
  }
  g.strokeStyle = '#2a2626';
  g.lineWidth = 0.035;
  g.beginPath();
  g.arc(opts.hinge === 'right' ? 0.2 : 0.8, -0.83, 0.07, 0, Math.PI * 2);
  g.stroke();
  e.at(0.5, -0.9, 'door');
  g.restore();
}

// The steps up to the lighthouse door: rough granite slabs laid up the knoll's face, greyer than the rock, their edges
// worn round.
function steps(g, e) {
  for (let i = 0; i < 3; i++) {
    const y = -i * 0.17, w = 1.5 - i * 0.14;
    g.fillStyle = i % 2 ? '#b7a4a0' : '#c2aea8';
    g.beginPath();
    g.moveTo(-w / 2, y);
    g.lineTo(-w / 2 + 0.05, y - 0.17);
    g.lineTo(w / 2 - 0.04, y - 0.17);
    g.lineTo(w / 2, y);
    g.closePath();
    g.fill();
    g.fillStyle = 'rgba(90, 70, 70, 0.45)';
    g.fillRect(-w / 2, y - 0.03, w, 0.03);
  }
}

// A small crooked island pine, the kind that grows in a crack of the granite: a black trunk bent away from the wind,
// thin crooked limbs, ragged dark tufts of needles at their ends, thinner on the windward side (the crown a layer the
// wind sways). Box [-1.9, -3.75, 1.75, 0.1]; its point "<id>#crown".
const BARK = '#272321', NEEDLES = ['#1e2620', '#26302a', '#18201b', '#2e3a31'];
const LIMBS = [[-0.42, -1.3, 0.95, -1.75], [-0.52, -1.7, -1.05, -2.05], [-0.48, -2.05, 0.75, -2.45], [-0.42, -2.4, -0.85, -2.7], [-0.36, -2.75, 0.4, -3.05], [-0.34, -3.05, -0.4, -3.3]];
function pine(g, e) {
  g.fillStyle = BARK;
  g.beginPath();
  g.moveTo(-0.13, 0);
  g.bezierCurveTo(-0.15, -0.9, -0.66, -1.35, -0.5, -2.25);
  g.bezierCurveTo(-0.44, -2.65, -0.3, -2.9, -0.36, -3.1);
  g.lineTo(-0.3, -3.1);
  g.bezierCurveTo(-0.24, -2.9, -0.36, -2.6, -0.39, -2.25);
  g.bezierCurveTo(-0.5, -1.45, -0.02, -0.95, 0.11, 0);
  g.closePath();
  g.fill();
  g.strokeStyle = BARK;
  g.lineCap = 'round';
  g.lineWidth = 0.06;
  for (const [x1, x2] of [[-0.1, -0.5], [0.08, 0.42], [0, 0.2]]) {
    g.beginPath();
    g.moveTo(0, -0.05);
    g.quadraticCurveTo(x1, 0.02, x2, 0.04);
    g.stroke();
  }
  // limbs: from the trunk out and up, mostly to the right (downwind), crooked; tufts of short needle strokes round
  // each limb's end and along it
  e.layer('crown', { pivot: [-0.4, -1.4], wind: { strength: 0.35, gust: 0.6, scale: 6 } }, c => {
    c.strokeStyle = BARK;
    c.lineCap = 'round';
    for (const [x0, y0, x1, y1] of LIMBS) {
      c.lineWidth = 0.045;
      c.beginPath();
      c.moveTo(x0, y0);
      c.quadraticCurveTo((x0 + x1) / 2, y0 - 0.25, x1, y1);
      c.stroke();
    }
    c.lineWidth = 0.035;
    for (const [x0, y0, x1, y1] of LIMBS) {
      for (let t = 0.35; t <= 1.01; t += 0.22) {
        const cx = x0 + (x1 - x0) * t, cy = y0 + (y1 - y0) * t - 0.08 * t, r = 0.18 + 0.2 * t;
        c.fillStyle = NEEDLES[Math.floor(e.rnd() * 4)];
        c.beginPath();
        c.ellipse(cx, cy, r * 1.25, r * 0.55, (e.rnd() - 0.5) * 0.4, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = NEEDLES[Math.floor(e.rnd() * 4)];
        for (let k = 0; k < 9; k++) {
          const a = e.rnd() * Math.PI * 2, l = r * (1.05 + e.rnd() * 0.5);
          c.beginPath();
          c.moveTo(cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.3);
          c.lineTo(cx + Math.cos(a) * l * 1.2, cy + Math.sin(a) * l * 0.55 - 0.04);
          c.stroke();
        }
      }
    }
  });
  e.at(-0.35, -2.2, 'crown');
}

// ── the granite and the sea ───────────────────────────────────────────
// a soft round patch of colour (rgb "r, g, b"), painted
function blot(g, x, y, r, color, alpha) {
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(${color}, ${alpha})`);
  s.addColorStop(1, `rgba(${color}, 0)`);
  g.fillStyle = s;
  g.fillRect(x - r, y - r, r * 2, r * 2);
}

// The island's granite from above — a draped plane over the scene's land (e.lib: SEA, land, shore): pink, with greyer
// and warmer drifts through it, rusty and grey-green lichen on the dry tops, the long joints and cracks the ice left,
// rain pools in its hollows, and the dark wet rim where the sea washes it. opts: centre [across, distance] and size
// [width, depth] (the plane's), pools [[across, distance, rx, ry, turn], …]; marks — how many drifts, specks, lichens,
// cracks; near — for a big plane, the share of each of them anywhere (the rest near the viewer: the detail thickest
// there; none: all anywhere); crack — [width, its spread, the dark ones' alpha, the pale ones', the long ones' way and
// the short ones' way (radians, on the plane)]; points — [[across, distance, name], …]: named points on the land
// ("<id>#name", lifted onto it — a rock of the land a game points at).
function granite(g, e, opts) {
  const [CA, CD] = opts.centre, [W, D] = opts.size, L = e.lib, at = (a, d) => [a - CA, CD - d];
  const [nDrift, nSpeck, nLichen, nCrack] = opts.marks ?? [60, 900, 260, 110];
  const near = opts.near ?? null, [cw, cs, ca, cl, way, across] = opts.crack ?? [0.035, 0.06, 0.75, 0.7, -1.1, 0.3];
  // a point on the plane anywhere (its own metres), within wx by wy
  const any = (wx, wy) => [(e.rnd() - 0.5) * wx, (e.rnd() - 0.5) * wy];
  // a point on the land (across, distance): a share k of them anywhere, the rest near the viewer
  const spot = k => (e.rnd() < k ? [CA + (e.rnd() - 0.5) * (W - 2), CD + (e.rnd() - 0.5) * (D - 2)] : [(e.rnd() - 0.5) * 30, -6 + 26 * e.rnd() ** 1.4]);
  g.fillStyle = '#d6a79c';
  g.fillRect(-W / 2, -D / 2, W, D);
  // drifts of colour in the stone: grey, warmer rose, pale
  for (let i = 0; i < nDrift; i++) {
    const [x, y] = near ? at(...spot(near[0])) : any(W - 2, D - 2), r = 2 + e.rnd() * 6, k = e.rnd();
    blot(g, x, y, r, k < 0.4 ? '168, 154, 158' : k < 0.75 ? '214, 146, 128' : '238, 210, 196', 0.45 + e.rnd() * 0.3);
  }
  // the speckle of the grain: small dots, dark and light
  for (let i = 0; i < nSpeck; i++) {
    const [x, y] = near ? at(...spot(near[1])) : any(W - 4, D - 6), r = 0.012 + e.rnd() * 0.03;
    g.fillStyle = e.rnd() < 0.5 ? 'rgba(120, 92, 90, 0.3)' : 'rgba(248, 228, 218, 0.35)';
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  // lichen: rusty orange and grey-green rosettes on the higher, drier stone
  for (let i = 0; i < nLichen; i++) {
    const [a, d] = near ? spot(near[2]) : [CA + (e.rnd() - 0.5) * (W - 2), CD + (e.rnd() - 0.5) * (D - 2)];
    if (L.land(a, d) - L.SEA < 0.9) continue;
    const [x, y] = at(a, d), r = 0.2 + e.rnd() * 0.6;
    blot(g, x, y, r, e.rnd() < 0.55 ? '206, 146, 72' : '158, 164, 132', 0.55 + e.rnd() * 0.25);
  }
  // the joints and cracks: long gently wandering lines, a few short ones across them
  g.lineCap = 'round';
  for (let i = 0; i < nCrack; i++) {
    let [x, y] = near ? at(...spot(near[3])) : any(W - 4, D - 4), ang = e.rnd() < 0.6 ? way + e.rnd() * 0.4 : across + e.rnd() * 0.5;
    const n = 3 + Math.floor(e.rnd() * 6);
    g.strokeStyle = e.rnd() < 0.75 ? `rgba(104, 70, 68, ${ca})` : `rgba(246, 232, 224, ${cl})`;
    g.lineWidth = cw + e.rnd() * cs;
    g.beginPath();
    g.moveTo(x, y);
    for (let s = 0; s < n; s++) {
      ang += (e.rnd() - 0.5) * 0.5;
      x += Math.cos(ang) * (0.8 + e.rnd() * 1.6);
      y += Math.sin(ang) * (0.8 + e.rnd() * 1.6);
      g.lineTo(x, y);
    }
    g.stroke();
  }
  // rain pools in the hollows of the higher stone: grey-blue, a pale rim
  for (const [a, d, rx, ry, t] of opts.pools ?? []) {
    const [x, y] = at(a, d);
    g.fillStyle = 'rgba(236, 222, 214, 0.8)';
    g.beginPath();
    g.ellipse(x, y, rx + 0.06, ry + 0.06, t, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#8ea3b2';
    g.beginPath();
    g.ellipse(x, y, rx, ry, t, 0, Math.PI * 2);
    g.fill();
  }
  // the wet rim: darker and browner down to the water, where the swell washes the stone
  L.shore(-0.1, 0.55, 0.45, (a, d, h) => {
    const [x, y] = at(a, d);
    blot(g, x, y, 0.75, '104, 80, 82', 0.4 * (1 - h / 0.55));
  });
  for (const [a, d, name] of opts.points ?? []) e.at(...at(a, d), name);
}

// The sea from above — a reflecting plane over the scene's land (e.lib): grey-blue, a lighter green-grey over the
// shallows round the rocks; two layers its shader (sea.wgsl) shows by turns — the white crests the wind raises all
// over it (they come and go; more of them, faster, in a storm), the foam washing round the rocks at the waterline.
// opts: D — how far out its centre is (2400 × 3000 m, the crests ahead of the start); round — all round the start
// (its centre at the start, 6000 × 6000 m, the crests on every side out to `reach` metres, 520 unless said: a scene
// whose camera turns, or rides a boat).
function sea(g, e, opts) {
  const round = !!opts.round, D = round ? 0 : opts.D, L = e.lib, reach = opts.reach ?? 520;
  const [w, h] = round ? [6000, 6000] : [2400, 3000];
  g.fillStyle = '#4f7896';
  g.fillRect(-w / 2, -h / 2, w, h);
  // the shallows: where the granite runs on under the water
  L.shore(-1.4, 0, 0.8, (a, d, h) => {
    const k = 1 + h / 1.4, s = g.createRadialGradient(a, D - d, 0, a, D - d, 1.3);
    s.addColorStop(0, `rgba(132, 166, 166, ${0.5 * k})`);
    s.addColorStop(1, 'rgba(132, 166, 166, 0)');
    g.fillStyle = s;
    g.fillRect(a - 1.3, D - d - 1.3, 2.6, 2.6);
  });
  e.layer('crests', {}, c => {
    c.strokeStyle = 'rgba(244, 246, 246, 0.85)';
    c.lineCap = 'round';
    for (let i = 0; i < (round ? 7000 : 2600); i++) {
      let d = 4 + reach * e.rnd() ** 2, a = (e.rnd() - 0.5) * (40 + d * 2.4);
      if (round) {
        const r = d, t = e.rnd() * Math.PI * 2;
        a = r * Math.sin(t);
        d = r * Math.cos(t);
      }
      if (L.land(a, d) > L.SEA - 0.6) continue;
      const far = round ? Math.hypot(a, d) : d, len = 0.8 + e.rnd() * 2.2 + far * 0.012;
      c.lineWidth = 0.14 + e.rnd() * 0.16 + far * 0.0025;
      c.beginPath();
      c.moveTo(a - len / 2, D - d);
      c.quadraticCurveTo(a, D - d - len * 0.12, a + len / 2, D - d + len * 0.05);
      c.stroke();
    }
  });
  e.layer('foam', {}, c => {
    c.fillStyle = 'rgba(248, 249, 248, 0.55)';
    L.shore(-0.32, 0.02, 0.4, (a, d) => {
      const r = 0.22 + e.rnd() * 0.3;
      c.beginPath();
      c.ellipse(a + (e.rnd() - 0.5) * 0.3, D - d + (e.rnd() - 0.5) * 0.3, r * 1.4, r, e.rnd() * 3.1, 0, Math.PI * 2);
      c.fill();
    });
  });
}
// the sea's animate: the storm and the calm to its shader
function seaMove(e) {
  e.uniform('storm', e.state.storm ?? 0);
  e.uniform('calm', e.state.calm ?? 0);
}

// ── the sky ───────────────────────────────────────────────────────────
// The sky by the hour (a sky element with the shader sky.wgsl): its colours — day, dawn, dusk, night, the storm's
// grey — are the shader's, worked out from the state each frame (no painting is made again for the hour); painted
// once here are what lies over them, each white, coloured by the shader by the hour: 1 the clouds (long soft lumps
// drifting with the wind), 2 the storm's clouds (heavy, torn, faster, with gaps), 3 the stars, 4 the moon at its phase
// (`moon` 0…1: a thin crescent → full; its point "<sky>#moon" — the light `moon` comes from it — and its glow
// "moon", which the sea's mirror draws out into a path), 5 the lightning's bolt. opts: moon [x, y], bolt [x, y]
// (stage heights), low — where the sky's colours end at the bottom (as the shader's uniform `low`); round — painted a
// whole turn round (2π stage heights about the gaze, its ends meeting: the sky element's "box" says so too —
// tools/island.py sky(round=True)) for a scene whose camera turns; else the stage and its margins.
function sky(g, e, opts) {
  const A = e.aspect, round = !!opts.round, L = round ? A / 2 - Math.PI : -0.3, R = round ? A / 2 + Math.PI : A + 0.3, W = R - L, H = opts.low, more = W / (A + 0.6);
  g.fillStyle = '#a6b6b8';
  g.fillRect(L, -0.35, W, 1.6);
  // clouds: long soft lumps, each painted three times a width apart so the drift wraps round seamlessly; white —
  // the shader colours them by the hour and by where they are
  const clouds = [];
  for (let i = 0; i < Math.round(11 * more); i++) {
    const y = 0.06 + e.rnd() * 0.42;
    clouds.push({ x: L + e.rnd() * W, y, w: 0.18 + e.rnd() * 0.32, h: 0.018 + e.rnd() * 0.03 });
  }
  const lump = (c, cx, cy, rx, ry, a0, a1) => {
    const s = c.createRadialGradient(cx, cy, 0, cx, cy, rx);
    s.addColorStop(0, `rgba(255, 255, 255, ${a0})`);
    s.addColorStop(0.6, `rgba(255, 255, 255, ${a1})`);
    s.addColorStop(1, 'rgba(255, 255, 255, 0)');
    c.fillStyle = s;
    c.save();
    c.translate(cx, cy);
    c.scale(1, ry / rx);
    c.translate(-cx, -cy);
    c.beginPath();
    c.arc(cx, cy, rx, 0, Math.PI * 2);
    c.fill();
    c.restore();
  };
  e.layer('clouds', { drift: [0.0022, 0], box: [L, -0.35, R, H] }, c => {
    for (const cl of clouds) {
      for (const off of [-W, 0, W]) {
        for (let j = 0; j < 4; j++) {
          lump(c, cl.x + off + (j - 1.5) * cl.w * 0.3, cl.y + (j % 2) * cl.h * 0.4, cl.w * (0.45 - Math.abs(j - 1.5) * 0.08), cl.h, 0.5, 0.22);
        }
      }
    }
  });
  // the storm's clouds: big heavy masses low and high, overlapping, with gaps between them where the sky (and the
  // moon) shows; the shader darkens their bellies
  const masses = [];
  for (let i = 0; i < Math.round(16 * more); i++) {
    const y = -0.2 + e.rnd() * 0.7;
    masses.push({ x: L + e.rnd() * W, y, w: 0.3 + e.rnd() * 0.45, h: 0.06 + e.rnd() * 0.08 });
  }
  e.layer('storm', { drift: [0.012, 0], box: [L, -0.35, R, H] }, c => {
    for (const m of masses) {
      for (const off of [-W, 0, W]) {
        for (let j = 0; j < 6; j++) {
          lump(c, m.x + off + (j - 2.5) * m.w * 0.22, m.y + ((j * 5) % 3 - 1) * m.h * 0.3, m.w * (0.36 - Math.abs(j - 2.5) * 0.04), m.h, 0.95, 0.7);
        }
      }
    }
  });
  // the stars: small points over the upper sky, a few brighter
  e.layer('stars', { box: [L, -0.35, R, H] }, c => {
    for (let i = 0; i < Math.round(700 * more); i++) {
      const x = L + e.rnd() * W, y = -0.35 + (H + 0.3) * e.rnd() ** 1.3, r = 0.0007 + 0.0016 * e.rnd() ** 4;
      c.fillStyle = `rgba(255, 255, 255, ${0.35 + 0.65 * e.rnd()})`;
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fill();
    }
  });
  // the moon at its phase: its lit part white, the rest of the disc dark and faint (the shader tells them apart by
  // their lightness); a soft ring of light round it
  const [mx, my] = opts.moon, r = 0.032, f = 0.12 + 0.88 * Math.max(0, Math.min(1, e.state.moon ?? 1));
  e.layer('moon', { box: [mx - 0.2, my - 0.2, mx + 0.2, my + 0.2] }, c => {
    const halo = c.createRadialGradient(mx, my, r, mx, my, 0.19);
    halo.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
    halo.addColorStop(1, 'rgba(255, 255, 255, 0)');
    c.fillStyle = halo;
    c.fillRect(mx - 0.2, my - 0.2, 0.4, 0.4);
    c.fillStyle = 'rgba(0, 0, 0, 0.85)';
    c.beginPath();
    c.arc(mx, my, r, 0, Math.PI * 2);
    c.fill();
    // the lit part: the right half and an ellipse of the terminator — added (gibbous) or cut away (crescent)
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.arc(mx, my, r, -Math.PI / 2, Math.PI / 2);
    const k = Math.abs(2 * f - 1) * r;
    if (f >= 0.5) c.ellipse(mx, my, k, r, 0, Math.PI / 2, Math.PI * 1.5);
    else c.ellipse(mx, my, k, r, 0, Math.PI / 2, Math.PI * 1.5, true);
    c.closePath();
    c.fill();
    e.at(mx, my, 'moon');
    e.light(mx, my, r * 1.6, '#e8eeff', 0.9, 'moon');
  });
  // the lightning: one bright forked stroke from the clouds down to the sea's line
  const [bx, by] = opts.bolt;
  e.layer('bolt', { box: [bx - 0.25, by - 0.05, bx + 0.25, H + 0.02] }, c => {
    c.strokeStyle = '#ffffff';
    c.lineJoin = 'round';
    c.lineCap = 'round';
    // a jagged stroke down from (x, y), `len` long; a few branches off it, thinner, each stroked after it
    const fork = (x, y, len, w, depth) => {
      const pts = [[x, y]], branches = [];
      for (let i = 1; i <= 7; i++) {
        const [px, py] = pts[i - 1], q = [px + (e.rnd() - 0.5) * 0.03, py + len / 7];
        pts.push(q);
        if (depth > 0 && e.rnd() < 0.3) branches.push(q);
      }
      c.lineWidth = w;
      c.beginPath();
      c.moveTo(x, y);
      for (const [px, py] of pts) c.lineTo(px, py);
      c.stroke();
      for (const [px, py] of branches) fork(px, py, len * 0.4, w * 0.55, depth - 1);
    };
    fork(bx, by, H - by, 0.008, 2);
  });
}
// the sky's animate: the hour, the storm and the flash to its shader; the moon's glow by night, all but gone in a storm
function skyMove(e) {
  const s = e.state, night = s.night ?? 0, storm = s.storm ?? 0;
  e.uniform('dawn', s.dawn ?? 0);
  e.uniform('dusk', s.dusk ?? 0);
  e.uniform('night', night);
  e.uniform('storm', storm);
  e.uniform('flash', s.flash ?? 0);
  e.glow('moon', night * (1 - 0.9 * storm));
}

// ── the storm ─────────────────────────────────────────────────────────
// The storm's lightning, for a scene's script: while `storm` is over a half, now and then a flash — `flash` up at once
// and down over a moment, sometimes twice — the more often the stronger the storm. A game's own flashes (its moments)
// set `flash` the same way.
function lightning(scene) {
  let next = 0;
  scene.every(0.25, () => {
    const s = scene.get('storm') ?? 0;
    if (s <= 0.5 || scene.time < next) return;
    next = scene.time + (3 + 7 * scene.random()) / s;
    scene.set('flash', 1);
    scene.move('flash', 0, { over: 0.5, ease: 'out' });
    if (scene.random() < 0.4) {
      scene.after(0.25, () => {
        scene.set('flash', 0.8);
        scene.move('flash', 0, { over: 0.6, ease: 'out' });
      });
    }
  });
}

// ── the people at their places ────────────────────────────────────────
// For a scene's script: each person of `PLACES` stands where `<id>_at` names — PLACES[id][name]: {at: [across,
// distance], on (a seat: [across, distance, elevation]), turn, do (a motion), look, reach} — their place's keys
// `<id>_a`, `<id>_d` (the person's "place"), `<id>_on`, `<id>_turn`, `<id>_do`, `<id>_look`, `<id>_reach` set at once.
// Kept in the state: put again only when `<id>_at` asks another place than `<id>_placed` (the one they were put at) —
// a scene opened again goes on as it was.
function places(scene, PLACES) {
  const put = id => {
    const at = scene.get(`${id}_at`), p = PLACES[id][at];
    if (!p || scene.get(`${id}_placed`) === at) return;
    scene.set(`${id}_a`, p.at[0]);
    scene.set(`${id}_d`, p.at[1]);
    scene.set(`${id}_on`, p.on ?? null);
    scene.set(`${id}_turn`, p.turn);
    scene.set(`${id}_do`, p.do);
    scene.set(`${id}_look`, p.look ?? null);
    scene.set(`${id}_reach`, p.reach ?? null);
    scene.set(`${id}_placed`, at);
  };
  for (const id in PLACES) {
    scene.on('change', `${id}_at`, () => put(id));
    put(id);
  }
}

return { places, bump, ridge, shoreOf, TOWER, TOWER_ROUND, DOOR, lighthouse, door, steps, pine, granite, sea, seaMove, sky, skyMove, lightning };
