// The Coal Gate — what its paintings share: rubble stone in courses, cobbles with frost, a soft lump of coal.
// Everything is painted in the day's colours; the dark morning is the scene's light.

// a steady random 0…1 stream from a seed (the same every painting)
function stream(seed) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// rubble stone laid in courses over the rect x, y, w, h (y down): the mortar the rect's colour, each stone a rounded
// block in one of the tones, a little uneven
function rubble(g, seed, x, y, w, h, base, tones, course = 0.3) {
  const r = stream(seed);
  g.fillStyle = base;
  g.fillRect(x, y, w, h);
  const paths = tones.map(() => new Path2D());
  for (let cy = y + h; cy > y + 0.02; cy -= course) {
    const ch = Math.min(course, cy - y);
    if (ch < 0.12) break;
    let cx = x - r() * 0.4;
    while (cx < x + w) {
      const sw = 0.28 + r() * 0.45;
      const inset = 0.025 + r() * 0.02;
      const top = cy - ch + inset + r() * 0.03;
      paths[Math.floor(r() * tones.length)].roundRect(cx + inset, top, sw - inset * 2, cy - inset - top, 0.06);
      cx += sw;
    }
  }
  tones.forEach((t, i) => {
    g.fillStyle = t;
    g.fill(paths[i]);
  });
}

// cobbles seen from above over the rect x, y, w, h, in rows; then frost — fine white rime over them, thinner where
// `bare(x, y)` says the coal dust and the feet have worn it (0 rimed … 1 bare)
function cobbles(g, seed, x, y, w, h, tones, bare) {
  const r = stream(seed);
  g.fillStyle = "#6e7175";
  g.fillRect(x, y, w, h);
  const paths = tones.map(() => new Path2D());
  for (let cy = y; cy < y + h; cy += 0.34) {
    let cx = x - r() * 0.3;
    while (cx < x + w) {
      const sw = 0.32 + r() * 0.18;
      paths[Math.floor(r() * tones.length)].roundRect(cx + 0.025, cy + 0.025, sw - 0.05, 0.29, 0.08);
      cx += sw;
    }
  }
  tones.forEach((t, i) => {
    g.fillStyle = t;
    g.fill(paths[i]);
  });
  const rime = new Path2D();
  for (let i = 0; i < w * h * 5; i++) {
    const px = x + r() * w;
    const py = y + r() * h;
    if (r() < bare(px, py)) continue;
    rime.moveTo(px + 0.05, py);
    rime.ellipse(px, py, 0.05 + r() * 0.07, 0.03 + r() * 0.04, r() * 3, 0, 6.3);
  }
  g.fillStyle = "rgba(232, 238, 243, 0.62)";
  g.fill(rime);
}

// a heap of coal lumps over a base line: lumps piled to a top, each a dark facet with a lighter glint edge
function coal(g, seed, cx, base, halfW, top, n) {
  const r = stream(seed);
  g.fillStyle = "#1c1b1c";
  g.beginPath();
  g.moveTo(cx - halfW, base);
  g.quadraticCurveTo(cx - halfW * 0.35, base - top * 1.1, cx, base - top);
  g.quadraticCurveTo(cx + halfW * 0.4, base - top * 1.05, cx + halfW, base);
  g.closePath();
  g.fill();
  const lumps = new Path2D();
  const glints = new Path2D();
  for (let i = 0; i < n; i++) {
    const u = r() * 2 - 1;
    const px = cx + u * halfW * 0.92;
    const hmax = top * (1 - u * u);
    const py = base - r() * hmax;
    const s = 0.04 + r() * 0.07;
    lumps.moveTo(px - s, py);
    lumps.lineTo(px - s * 0.3, py - s * 0.8);
    lumps.lineTo(px + s * 0.8, py - s * 0.5);
    lumps.lineTo(px + s, py + s * 0.3);
    lumps.lineTo(px, py + s * 0.6);
    lumps.closePath();
    glints.moveTo(px - s * 0.3, py - s * 0.8);
    glints.lineTo(px + s * 0.8, py - s * 0.5);
  }
  g.fillStyle = "#29282a";
  g.fill(lumps);
  g.strokeStyle = "#6a6a70";
  g.lineWidth = 0.008;
  g.stroke(glints);
}

// a bare winter tree: a trunk and branches forking up to the twigs, from (0, 0) up `height` metres
function tree(g, seed, height, colour) {
  const r = stream(seed);
  g.strokeStyle = colour;
  g.lineCap = "round";
  const limb = (x, y, a, len, w, depth) => {
    const x2 = x + Math.sin(a) * len;
    const y2 = y - Math.cos(a) * len;
    g.lineWidth = w;
    g.beginPath();
    g.moveTo(x, y);
    g.quadraticCurveTo(x + Math.sin(a + (r() - 0.5) * 0.5) * len * 0.5, y - Math.cos(a) * len * 0.5, x2, y2);
    g.stroke();
    if (depth === 0) return;
    const forks = depth > 4 ? 2 : 2 + Math.floor(r() * 2);
    for (let i = 0; i < forks; i++) {
      const spread = (i / (forks - 1 || 1) - 0.5) * (0.9 + r() * 0.5);
      limb(x2, y2, a + spread + (r() - 0.5) * 0.3, len * (0.68 + r() * 0.12), w * 0.66, depth - 1);
    }
  };
  limb(0, 0, (r() - 0.5) * 0.1, height * 0.3, height * 0.045, 6);
}

return { stream, rubble, cobbles, coal, tree };
