// The island of «The Summer Book», one for every scene that sees its sea and sky (isle.md says how to call it): the
// sky by the hour and the weather — the pearl-grey day, the August day (`late`), the June dawn, the dusk, the moonlit
// night, the storm and its lightning, the fog —, the sea (glass in a calm, crests in a storm), the mist and the fog's
// wall, the granite, and the things of the outer islands that every scene has (pines, junipers, grass in the cracks,
// skerries, wooded islets). Everything is painted once, in daylight colours; the hour and the weather are the scene's
// light (its looks: tools/isle.py) and the sky's and the sea's shaders (tools/isle/*.wgsl), moved by the state through
// the animates below — no painting reads a key that moves.
const { clamp } = anim;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
// the thick part of the fog (its second half): the air white, the sky gone — `fog` up to a half is its banks alone
const fogK = f => sm((f - 0.5) / 0.5);

// a soft round patch of colour, stretched (rx, ry its half-widths), falling off straight to nothing at its edge
function glow(g, x, y, rx, ry, color, alpha) {
  g.save();
  g.translate(x, y);
  g.scale(rx, ry);
  const r = g.createRadialGradient(0, 0, 0, 0, 0, 1);
  r.addColorStop(0, color);
  r.addColorStop(1, color + '00');
  g.globalAlpha = alpha;
  g.fillStyle = r;
  g.beginPath();
  g.arc(0, 0, 1, 0, 6.2832);
  g.fill();
  g.restore();
}
// the same, falling off softly — (1 − u²)² — as a mist's breath does
function soft(g, x, y, rx, ry, color, alpha) {
  const [r, gg, b] = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16));
  g.save();
  g.translate(x, y);
  g.scale(rx, ry);
  const grad = g.createRadialGradient(0, 0, 0, 0, 0, 1);
  for (const u of [0, 0.25, 0.5, 0.75, 1]) grad.addColorStop(u, `rgba(${r},${gg},${b},${(1 - u * u) ** 2})`);
  g.globalAlpha = alpha;
  g.fillStyle = grad;
  g.beginPath();
  g.arc(0, 0, 1, 0, 6.2832);
  g.fill();
  g.restore();
}

// ── the sky ───────────────────────────────────────────────────────────
// The sky (a sky element with the shader sky.wgsl): its colours by the hour, the suns' discs and their warmth, the
// moon at its phase are the shader's, worked out each frame from the state; painted once here are what lies over them —
// 1 the clouds (long soft streaks in their daylight colours, drifting; the shader colours them by the hour), 2 the
// storm's clouds (heavy, torn, drifting faster: white, the shader greys them), 3 the stars, 4 the lightning's bolt —,
// the suns' and the moon's glows (e.light — the sea's mirror draws their paths) and their points: "<sky>#sun" (the
// day's), "#sun_late" (August's, lower), "#sun_dawn", "#moon" — the scene's far lights come from them. o: low (where the
// sky's colours end: the scene's horizon), sun, late, dawn — [x, y] (stage heights), moon — [x, y] or null (the moon
// not in the sky ahead: its light comes from elsewhere), bolt [x, y] (where the lightning comes down from).
function sky(g, e, o) {
  const A = e.aspect;
  const H = o.low;
  const X0 = -0.3;
  const X1 = A + 0.3;
  const Y0 = -0.35;
  g.fillStyle = '#d3d6d4';
  g.fillRect(X0, Y0, X1 - X0, 1.25 - Y0);
  // the clouds: long thin streaks, drifting slowly to the right (wrapping round the layer's box: kept inside it)
  e.layer('clouds', { drift: [0.0025, 0], box: [X0, Y0, X1, H] }, c => {
    const W = X1 - X0;
    for (let i = 0; i < 14; i++) {
      const y = -0.25 + 0.55 * e.rnd();
      const len = 0.25 + 0.5 * e.rnd();
      const x = X0 + len + (W - 2 * len) * e.rnd();
      const thick = 0.008 + 0.022 * e.rnd() * (1 - (y + 0.25) / 0.8);
      glow(c, x, y, len, thick, i % 3 === 0 ? '#f4f1ea' : '#e2e5e8', 0.55);
    }
  });
  // the storm's clouds: big heavy masses low and high, overlapping, gaps between them; each painted twice a width apart
  // so that the drift wraps round
  e.layer('storm', { drift: [0.01, 0], box: [X0, Y0, X1, H] }, c => {
    const W = X1 - X0;
    for (let i = 0; i < 16; i++) {
      const x = X0 + e.rnd() * W;
      const y = -0.25 + e.rnd() * (H + 0.1);
      const w = 0.3 + e.rnd() * 0.45;
      const h = 0.05 + e.rnd() * 0.08;
      for (const off of [-W, 0, W]) {
        for (let j = 0; j < 6; j++) soft(c, x + off + (j - 2.5) * w * 0.22, y + (((j * 5) % 3) - 1) * h * 0.3, w * (0.36 - Math.abs(j - 2.5) * 0.04), h, '#ffffff', 0.95);
      }
    }
  });
  // the stars: small points over the upper sky, fewer toward the horizon
  e.layer('stars', { box: [X0, Y0, X1, H] }, c => {
    for (let i = 0; i < 150; i++) {
      const y = Y0 + Math.pow(e.rnd(), 1.3) * (H - 0.1 - Y0);
      c.globalAlpha = 0.3 + 0.6 * e.rnd() * (1 - (y - Y0) / (H - Y0));
      c.fillStyle = '#eef1fb';
      c.beginPath();
      c.arc(X0 + e.rnd() * (X1 - X0), y, 0.0012 + 0.0016 * e.rnd(), 0, 6.2832);
      c.fill();
    }
    c.globalAlpha = 1;
  });
  // the lightning: one bright forked stroke from the clouds down to the sea's line
  const [bx, by] = o.bolt;
  e.layer('bolt', { box: [bx - 0.25, by - 0.05, bx + 0.25, H + 0.02] }, c => {
    c.strokeStyle = '#ffffff';
    c.lineJoin = 'round';
    c.lineCap = 'round';
    const fork = (x, y, len, w, depth) => {
      const pts = [[x, y]];
      const branches = [];
      for (let i = 1; i <= 7; i++) {
        const [px, py] = pts[i - 1];
        const q = [px + (e.rnd() - 0.5) * 0.03, py + len / 7];
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
    fork(bx, by, H - by, 0.006, 2);
  });
  // the suns' glows and points (the discs and their warmth are the shader's)
  for (const [name, at, color] of [['sun', o.sun, '#ffe9c8'], ['sun_late', o.late, '#ffdcae'], ['sun_dawn', o.dawn, '#ffe9c8']]) {
    e.light(at[0], at[1], 0.07, color, 1.6, name);
    e.at(at[0], at[1], name);
  }
  if (o.moon) {
    e.light(o.moon[0], o.moon[1], 0.05, '#e8eeff', 0.9, 'moon');
    e.at(o.moon[0], o.moon[1], 'moon');
  }
}
// The sky's animate: the hour, the weather and the moon's phase to its shader; the suns' and the moon's glows by the
// hour (o.moon: the sky has the moon's glow — as its painting's o.moon).
function skyMove(e, o = {}) {
  const s = e.state;
  const dawn = s.dawn ?? 0;
  const dusk = s.dusk ?? 0;
  const night = s.night ?? 0;
  const late = s.late ?? 0;
  const storm = s.storm ?? 0;
  const f = fogK(s.fog ?? 0);
  e.uniform('dawn', dawn);
  e.uniform('dusk', dusk);
  e.uniform('night', night);
  e.uniform('late', late);
  e.uniform('storm', storm);
  e.uniform('flash', s.flash ?? 0);
  e.uniform('fog', s.fog ?? 0);
  e.uniform('phase', s.moon ?? 1);
  const clear = (1 - storm) * (1 - 0.85 * f);
  const day = (1 - dusk) * (1 - night);
  e.glow('sun', (1 - late) * (1 - dawn) * day * clear);
  e.glow('sun_late', late * (1 - dawn) * day * clear);
  e.glow('sun_dawn', dawn * day * clear);
  if (o.moon) e.glow('moon', night * (1 - 0.9 * storm) * (1 - 0.7 * f));
}

// ── the sea ───────────────────────────────────────────────────────────
// The sea from above — a reflecting plane: pale pearl far off, a clear cool grey-green near the rock; over it four
// layers its animate shows by the weather — `streaks`, the faint long streaks of calm (gone in a dead calm: glass),
// `crests_a` and `crests_b`, the white crests a storm raises (coming and going by turns), `foam`, washing the rocks in a
// storm. Its painting is in the plane's metres: o.centre [across, distance] and o.size [width, depth] are the plane's
// own; o.edge — [[across, distance], …] along the waterline (the foam's); o.clear — [[across, distance, rx, rz], …]:
// where the water is clear over the rock under it (the sea's paint thinned there — the bottom seen through it, the
// mirror as faint). Reads the scene's lib: WATER, ground(across, distance) — the crests keep off the land.
function sea(g, e, o) {
  const L = e.lib;
  const [CA, CD] = o.centre;
  const [W, D] = o.size;
  const X = a => a - CA;
  const Y = d => CD - d;
  const grad = g.createLinearGradient(0, -D / 2, 0, D / 2);
  const stop = (d, c) => grad.addColorStop(clamp((Y(d) + D / 2) / D, 0, 1), c);
  stop(CD + D / 2, '#d6d8d5');
  stop(600, '#ccd2d2');
  stop(150, '#b9c5c7');
  stop(40, '#9fb2b4');
  stop(0, '#8ba3a6');
  g.fillStyle = grad;
  g.fillRect(-W / 2, -D / 2, W, D);
  for (const [a, d, rx, rz] of o.clear ?? []) {
    g.save();
    g.globalCompositeOperation = 'destination-out';
    g.translate(X(a), Y(d));
    g.scale(rx, rz);
    const r = g.createRadialGradient(0, 0, 0, 0, 0, 1);
    r.addColorStop(0, 'rgba(0,0,0,0.6)');
    r.addColorStop(0.5, 'rgba(0,0,0,0.35)');
    r.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = r;
    g.beginPath();
    g.arc(0, 0, 1, 0, 6.2832);
    g.fill();
    g.restore();
  }
  // long faint streaks of calm, longer and fewer toward the viewer
  e.layer('streaks', {}, c => {
    c.lineCap = 'round';
    for (let i = 0; i < 160; i++) {
      const u = e.rnd();
      const z = 12 + 900 * u * u;
      const len = 3 + z * 0.08 * (0.5 + e.rnd());
      const x = -200 + 700 * e.rnd();
      c.strokeStyle = e.rnd() < 0.6 ? 'rgba(240,242,238,0.10)' : 'rgba(90,110,115,0.08)';
      c.lineWidth = 0.05 + z * 0.002;
      c.beginPath();
      c.moveTo(X(x), Y(z));
      c.lineTo(X(x + len), Y(z));
      c.stroke();
    }
  });
  // the storm's crests: short white strokes all over the water ahead, smaller and denser far off — two sets
  const crests = c => {
    c.strokeStyle = 'rgba(244,246,246,0.85)';
    c.lineCap = 'round';
    for (let i = 0; i < 1400; i++) {
      const d = 6 + 520 * e.rnd() ** 2;
      const a = (e.rnd() - 0.5) * (40 + d * 2.4);
      const len = 0.8 + e.rnd() * 2.2 + d * 0.012;
      const w = 0.12 + e.rnd() * 0.14 + d * 0.0025;
      if (L.ground(a, d) > L.WATER - 0.6) continue;
      c.lineWidth = w;
      c.beginPath();
      c.moveTo(X(a - len / 2), Y(d));
      c.quadraticCurveTo(X(a), Y(d) - len * 0.12, X(a + len / 2), Y(d) + len * 0.05);
      c.stroke();
    }
  };
  e.layer('crests_a', {}, crests);
  e.layer('crests_b', {}, crests);
  // the foam washing the rocks at the waterline
  e.layer('foam', {}, c => {
    c.fillStyle = 'rgba(248,249,248,0.6)';
    for (const [a, d] of o.edge) {
      const r = 0.25 + e.rnd() * 0.35;
      c.beginPath();
      c.ellipse(X(a + (e.rnd() - 0.2) * 0.5), Y(d + (e.rnd() - 0.5) * 0.4), r * 1.6, r, e.rnd() * 3.1, 0, 6.2832);
      c.fill();
    }
  });
}
// the sea's animate: the streaks gone in a calm; in a storm the two sets of crests by turns, never in step, and the
// foam beating on the rocks
function seaMove(e) {
  const calm = e.state.calm ?? 0;
  const storm = e.state.storm ?? 0;
  const t = e.t;
  e.layer('streaks').alpha = 1 - calm;
  e.layer('crests_a').alpha = storm * (0.5 + 0.5 * e.anim.noise(t * 0.45, 3));
  e.layer('crests_b').alpha = storm * (0.5 + 0.5 * e.anim.noise(t * 0.45, 11));
  e.layer('foam').alpha = storm * (0.55 + 0.45 * Math.sin(t * 1.3 + 0.6 * e.anim.noise(t * 0.2, 5)));
}

// ── the mist and the fog ──────────────────────────────────────────────
// Mist lying on the water in long banks, each layer of them drifting slowly its own way (wrapping round the box: the
// banks kept within it). Metres from its foot on the water. o: box [left, top, right, bottom], layers — [{name, n (how
// many banks), y (their foot), thick, len [min, max], color, alpha, drift, soft (falling off softly, else straight)}].
function mist(g, e, o) {
  const [x0, , x1] = o.box;
  for (const l of o.layers) {
    e.layer(l.name, { drift: [l.drift, 0], box: o.box }, c => {
      for (let i = 0; i < l.n; i++) {
        const len = l.len[0] + l.len[1] * e.rnd();
        const x = x0 + len + (x1 - x0 - 2 * len) * e.rnd();
        const y = l.y - l.thick * e.rnd();
        (l.soft ? soft : glow)(c, x, y, len, l.thick * (0.6 + 0.6 * e.rnd()), l.color, l.alpha);
      }
    });
  }
}
// The fog's wall coming in from the open sea: a white wall on the horizon, its top billowing, rising out of nothing at
// its left end, and its softer see-through crest (the layer `wall`). Metres from its foot on the water: o.len long,
// about o.high high.
function wall(g, e, o) {
  const h = o.len / 2;
  const k = o.high / 45;
  const top = x => k * (32 + 8 * Math.sin(x * 0.0105 + 0.5) + 5 * Math.sin(x * 0.0244 + 2) + 3 * Math.sin(x * 0.059));
  const edge = x => Math.min(1, (x + h) / (o.len / 3));
  e.layer('wall', {}, c => {
    c.fillStyle = '#e2e3e6';
    c.beginPath();
    c.moveTo(-h, 2);
    for (let x = -h; x <= h; x += 10) c.lineTo(x, -top(x) * edge(x));
    c.lineTo(h, 2);
    c.closePath();
    c.fill();
    c.fillStyle = 'rgba(236,237,240,0.45)';
    c.beginPath();
    c.moveTo(-h, 2);
    for (let x = -h; x <= h; x += 10) c.lineTo(x, -(top(x) + 7 * k) * edge(x));
    c.lineTo(h, 2);
    c.closePath();
    c.fill();
  });
}
// a mist's or a wall's animate: each layer as thick as the fog says — its alpha a0 + k · fog (0…1); by: {layer: [a0, k]}
function fogMove(e, by) {
  const f = e.state.fog ?? 0;
  for (const name in by) e.layer(name).alpha = clamp(by[name][0] + by[name][1] * f, 0, 1);
}

// ── the island's scripts ──────────────────────────────────────────────
// For a scene's script: the weather's own mechanics. `fog_air` (the look of the thick fog: the air white) follows
// `fog` — its second half; while `storm` is over a half, now and then a flash — `flash` up at once and down over a
// moment, sometimes twice —, the more often the stronger the storm, each strike told (`flash:strike`: the game's
// thunder). A game's own flashes set `flash` the same way.
function weather(scene) {
  const air = () => scene.set('fog_air', fogK(scene.get('fog') ?? 0));
  scene.on('change', 'fog', air);
  scene.on('move', 'fog', air);
  air();
  let next = 0;
  scene.every(0.25, () => {
    const s = scene.get('storm') ?? 0;
    if (s <= 0.5 || scene.time < next) return;
    next = scene.time + (4 + 8 * scene.random()) / s;
    scene.set('flash', 1);
    scene.move('flash', 0, { over: 0.5, ease: 'out' });
    scene.tell('flash:strike');
    if (scene.random() < 0.4) {
      scene.after(0.25, () => {
        scene.set('flash', 0.8);
        scene.move('flash', 0, { over: 0.6, ease: 'out' });
      });
    }
  });
}

// For a scene's script: each person of `PLACES` is where `<id>_at` names — PLACES[id][name]: {at: [across,
// distance], turn, look, reach, on (a seat: [across, distance, elevation] or {on: element, at: [...]}), do (what they
// do there: a motion of the cast; unless said, their own `does`)} — their place's keys `<id>_a`, `<id>_d` (the person's "place"),
// `<id>_turn`, `<id>_look`, `<id>_reach`, `<id>_on`, `<id>_do` set at once. Put again only when `<id>_at` asks another
// place than `<id>_placed`: a scene opened again goes on as it was, and what a piece set since stays.
function places(scene, PLACES) {
  const put = id => {
    const at = scene.get(`${id}_at`);
    const p = PLACES[id][at];
    if (!p) {
      scene.warn(`${id}_at: no place "${at}" — the places: ${Object.keys(PLACES[id]).join(', ')}`);
      return;
    }
    if (scene.get(`${id}_placed`) === at) return;
    scene.set(`${id}_a`, p.at[0]);
    scene.set(`${id}_d`, p.at[1]);
    scene.set(`${id}_turn`, p.turn);
    scene.set(`${id}_look`, p.look ?? null);
    scene.set(`${id}_reach`, p.reach ?? null);
    scene.set(`${id}_on`, p.on ?? null);
    scene.set(`${id}_do`, p.do ?? null);
    scene.set(`${id}_placed`, at);
  };
  for (const id in PLACES) {
    scene.on('change', `${id}_at`, () => put(id));
    put(id);
  }
}

// ── the granite ───────────────────────────────────────────────────────
// The island's granite from above — a draped plane over the scene's land (e.lib: coast(z) — the line the rock is laid
// along, shore(z) — where the sea meets it, across at a distance): pinkish-grey rock worn smooth, mottled with lighter
// and darker grains long along the slope, the dark wet band at the water and the rock under it, cracks running down to
// the sea, lichen in yellow and grey-green. o: centre [CX, CZ] and size [W, D] (the plane's), z [Z0, Z1] (the stretch
// of the shore painted), east (how far across the wet band runs out under the sea), mottle [n, spread], band [the
// two upper bands' widths], cracks [n, z span, spread], lichen [n, z span, spread, r0, r1]. Returns what the scene's
// own painting of the land goes on with: X, Y (a world point to the plane's), blob(across, distance, rx, rz, color,
// alpha), edge ([[across, distance], …] along the waterline).
function granite(g, e, o) {
  const L = e.lib;
  const [CX, CZ] = o.centre;
  const [W, D] = o.size;
  const [Z0, Z1] = o.z;
  const X = x => x - CX;
  const Y = z => CZ - z;
  const blob = (x, z, rx, rz, color, alpha) => {
    g.globalAlpha = alpha;
    g.fillStyle = color;
    g.beginPath();
    g.ellipse(X(x), Y(z), rx, rz, 0, 0, 6.2832);
    g.fill();
  };
  g.globalAlpha = 1;
  g.fillStyle = '#b3a9a1';
  g.fillRect(-W / 2, -D / 2, W, D);
  for (let i = 0; i < o.mottle[0]; i++) {
    const z = Z0 + (Z1 - Z0) * e.rnd();
    const x = L.coast(z) - 1 - o.mottle[1] * e.rnd() * e.rnd();
    blob(x, z, 0.4 + 1.6 * e.rnd(), 0.3 + 1.2 * e.rnd(), e.rnd() < 0.5 ? '#c3b9b0' : '#a1978f', 0.35);
  }
  const edge = [];
  for (let z = Z0; z <= Z1; z += 0.5) edge.push([L.shore(z), z]);
  const band = (inland, color, alpha) => {
    g.globalAlpha = alpha;
    g.fillStyle = color;
    g.beginPath();
    edge.forEach(([x, z], i) => (i ? g.lineTo(X(x - inland), Y(z)) : g.moveTo(X(x - inland), Y(z))));
    g.lineTo(X(o.east), Y(Z1));
    g.lineTo(X(o.east), Y(Z0));
    g.closePath();
    g.fill();
  };
  band(o.band[0], '#9b928b', 0.6);
  band(o.band[1], '#7f7974', 0.8);
  band(-0.05, '#5f6a68', 1);
  g.lineCap = 'round';
  g.strokeStyle = '#6f6862';
  const [nc, zc, sc] = o.cracks;
  for (let i = 0; i < nc; i++) {
    const z = Z0 + zc * e.rnd();
    let x = L.coast(z) - sc * e.rnd();
    let zz = z;
    g.globalAlpha = 0.55;
    g.lineWidth = 0.02 + 0.03 * e.rnd();
    g.beginPath();
    g.moveTo(X(x), Y(zz));
    const n = 3 + Math.floor(5 * e.rnd());
    for (let k = 0; k < n; k++) {
      x += 0.5 + 0.6 * e.rnd();
      zz += (e.rnd() - 0.5) * 0.9;
      g.lineTo(X(x), Y(zz));
    }
    g.stroke();
  }
  const LICHEN = ['#cdb46a', '#d9d6c6', '#97a184', '#b9b58f'];
  const [nl, zl, sl, r0, r1] = o.lichen;
  for (let i = 0; i < nl; i++) {
    const z = Z0 + zl * e.rnd();
    const x = L.coast(z) - 0.6 - sl * e.rnd();
    const r = r0 + r1 * e.rnd() * e.rnd();
    blob(x, z, r, r * (0.7 + 0.4 * e.rnd()), LICHEN[i % 4], 0.75);
  }
  return { X, Y, blob, edge };
}

// ── the things of the outer islands ───────────────────────────────────
// A pine of the outer islands: a crooked grey-brown trunk bent by the wind, flat dark crowns in tiers leaning one way
// (the layer `crown` sways about the trunk's top). Metres from its foot; about 9 m tall; box [-2.2, -9.3, 3.6, 0.3].
function pine(g, e) {
  g.strokeStyle = '#6b5d52';
  g.lineCap = 'round';
  g.lineWidth = 0.34;
  g.beginPath();
  g.moveTo(0, 0.1);
  g.bezierCurveTo(0.2, -2.5, -0.5, -4.5, 0.4, -6.2);
  g.bezierCurveTo(0.9, -7.2, 1.3, -7.8, 1.6, -8.4);
  g.stroke();
  g.lineWidth = 0.12;
  g.beginPath();
  g.moveTo(0.1, -4.6);
  g.lineTo(1.5, -5.4);
  g.moveTo(0.3, -6.1);
  g.lineTo(-1.1, -6.9);
  g.stroke();
  const tier = (c, x, y, w, h, color) => {
    c.fillStyle = color;
    c.beginPath();
    c.moveTo(x - w * 0.5, y);
    c.bezierCurveTo(x - w * 0.45, y - h * 0.9, x - w * 0.1, y - h, x + w * 0.15, y - h * 0.95);
    c.bezierCurveTo(x + w * 0.4, y - h * 0.9, x + w * 0.55, y - h * 0.4, x + w * 0.5, y);
    c.closePath();
    c.fill();
  };
  e.layer('crown', { pivot: [0.4, -6], wind: { strength: 0.12, gust: 0.4 } }, c => {
    tier(c, 1.6, -5.2, 2.6, 0.9, '#4d5a53');
    tier(c, -0.9, -6.6, 2.4, 0.9, '#4a564f');
    tier(c, 1.6, -7.9, 3.4, 1.3, '#56635b');
    tier(c, 0.5, -8.6, 2.2, 0.9, '#5d6a61');
  });
}
// A juniper on the rock: a low dense mound, dark blue-green, ragged at the edge (the layer `bush` stirs in the wind).
// Metres from its foot; about 0.9 m tall, 1.6 m wide; box [-1, -1, 1, 0.1].
function juniper(g, e) {
  e.layer('bush', { pivot: [0, 0], wind: { strength: 0.05, gust: 0.3 } }, c => {
    c.fillStyle = '#46564e';
    c.beginPath();
    c.moveTo(-0.85, 0.05);
    for (let i = 0; i <= 16; i++) {
      const a = Math.PI - (Math.PI * i) / 16;
      const r = 0.8 + 0.12 * e.rnd();
      c.lineTo(Math.cos(a) * r, -Math.sin(a) * r * 1.05);
    }
    c.lineTo(0.85, 0.05);
    c.closePath();
    c.fill();
    for (let i = 0; i < 18; i++) {
      const a = Math.PI * e.rnd();
      const r = 0.75 * e.rnd();
      c.fillStyle = e.rnd() < 0.5 ? '#56675d' : '#3c4b44';
      c.beginPath();
      c.ellipse(Math.cos(a) * r, -Math.sin(a) * r, 0.18, 0.12, 0, 0, 6.2832);
      c.fill();
    }
  });
}
// A tuft of thin grass in a crack of the rock, dry at the tips (the layer `blades` bends in the wind). Metres from its
// foot; about 0.4 m tall; box [-0.25, -0.5, 0.25, 0.05].
function tuft(g, e) {
  e.layer('blades', { pivot: [0, 0], wind: { strength: 0.5, gust: 0.5 } }, c => {
    c.lineCap = 'round';
    for (let i = 0; i < 14; i++) {
      const x = (e.rnd() - 0.5) * 0.18;
      const top = 0.22 + 0.2 * e.rnd();
      const lean = (e.rnd() - 0.4) * 0.22;
      c.strokeStyle = i % 3 === 0 ? '#b6ad8a' : i % 3 === 1 ? '#8c9670' : '#7a8562';
      c.lineWidth = 0.012;
      c.beginPath();
      c.moveTo(x, 0.02);
      c.quadraticCurveTo(x + lean * 0.3, -top * 0.6, x + lean, -top);
      c.stroke();
    }
  });
}
// A bare skerry far out: a low smooth back of granite, rounded like a whale, a paler crown where the gulls sit. Metres
// from its foot at the waterline; 40 m long, 5 m high; box [-20.5, -5.4, 20.5, 0.7].
function skerry(g) {
  g.fillStyle = '#8f8b88';
  g.beginPath();
  g.moveTo(-20, 0.6);
  g.bezierCurveTo(-15, -1.5, -9, -4.8, -2, -5);
  g.bezierCurveTo(5, -5.2, 11, -2.6, 20, 0.6);
  g.closePath();
  g.fill();
  g.fillStyle = '#a7a29d';
  g.beginPath();
  g.moveTo(-9, -3.2);
  g.bezierCurveTo(-5, -4.9, 2, -5.1, 7, -3.6);
  g.bezierCurveTo(2, -4.2, -4, -4.1, -9, -3.2);
  g.closePath();
  g.fill();
  g.fillStyle = '#6f6c6a';
  g.fillRect(-20, 0, 40, 0.6);
}
// A wooded islet far out: a granite shoulder and on it a dark crowd of wind-bent spruce and pine, flat-topped. Metres
// from its foot at the waterline; 90 m long, about 14 m high; box [-46, -15, 46, 0.7].
function islet(g, e) {
  g.fillStyle = '#8a8784';
  g.beginPath();
  g.moveTo(-45, 0.6);
  g.bezierCurveTo(-36, -3, -20, -5, 0, -5.4);
  g.bezierCurveTo(20, -5.2, 34, -3, 45, 0.6);
  g.closePath();
  g.fill();
  g.fillStyle = '#596360';
  g.beginPath();
  g.moveTo(-34, -3.4);
  for (let i = 0; i <= 28; i++) {
    const x = -34 + (68 * i) / 28;
    const top = -5 - 9 * Math.sin((Math.PI * i) / 28) * (0.75 + 0.25 * e.rnd());
    g.lineTo(x - 0.8, top + 1.5);
    g.lineTo(x + 0.6, top);
  }
  g.lineTo(34, -3.4);
  g.closePath();
  g.fill();
  g.fillStyle = '#6f6c6a';
  g.fillRect(-45, 0, 90, 0.6);
}

return { sm, fogK, glow, soft, sky, skyMove, sea, seaMove, mist, wall, fogMove, weather, places, granite, pine, juniper, tuft, skerry, islet };
