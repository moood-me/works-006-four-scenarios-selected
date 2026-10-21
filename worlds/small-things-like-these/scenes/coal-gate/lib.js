// The Coal Gate — what its paintings share: rubble stone in courses, cobbles with frost, a heap of coal, a hanging
// lamp, low mist.
// Everything is painted in the day's colours; the dark morning is the scene's light.

// a steady random 0…1 stream from a seed (the same every painting)
function stream(seed) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// rubble stone laid in courses over the rect x, y, w, h (y down): the mortar the rect's colour, a clear joint round
// every stone; each stone a rough block (its corners knocked off unevenly) in one of the tones, the courses of uneven
// height and the stones of uneven length
function rubble(g, seed, x, y, w, h, mortar, tones, course = 0.3) {
  const r = stream(seed);
  g.save();
  g.beginPath();
  g.rect(x, y, w, h);
  g.clip();
  g.fillStyle = mortar;
  g.fillRect(x, y, w, h);
  const paths = tones.map(() => new Path2D());
  const joint = 0.014;
  const j = () => (r() - 0.5) * 0.028;
  let cy = y + h;
  while (cy > y + 0.02) {
    const ch = Math.min(course * (0.8 + r() * 0.4), cy - y);
    if (ch < 0.1) break;
    let cx = x - r() * 0.4;
    while (cx < x + w) {
      const sw = course * (0.9 + r() * 1.0);
      const p = paths[Math.floor(r() * tones.length)];
      const l = cx + joint;
      const rt = cx + sw - joint;
      const t = cy - ch + joint;
      const b = cy - joint;
      p.moveTo(l + 0.03 + j(), t + j());
      p.lineTo(rt - 0.02 + j(), t + j());
      p.lineTo(rt + j(), b - 0.03 + j());
      p.lineTo(l + 0.02 + j(), b + j());
      p.lineTo(l + j(), t + ch * (0.3 + r() * 0.3));
      p.closePath();
      cx += sw;
    }
    cy -= ch;
  }
  tones.forEach((t, i) => {
    g.fillStyle = t;
    g.fill(paths[i]);
  });
  g.restore();
}

// cobbles seen from above over the rect x, y, w, h, in rows; then frost — a pale veil of rime and fine white specks,
// fewer where `bare(x, y)` says the coal dust and the feet have worn it (0 rimed … 1 bare)
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
  g.fillStyle = "rgba(226, 232, 238, 0.3)";
  g.fillRect(x, y, w, h);
  const rime = new Path2D();
  for (let i = 0; i < w * h * 5; i++) {
    const px = x + r() * w;
    const py = y + r() * h;
    if (r() < bare(px, py)) continue;
    const s = 0.012 + r() * 0.025;
    rime.moveTo(px + s, py);
    rime.ellipse(px, py, s, s * 0.7, 0, 0, 6.3);
  }
  g.fillStyle = "rgba(240, 244, 248, 0.75)";
  g.fill(rime);
}

// a heap of coal over a base line: a black mass piled to a top, covered in angular lumps of three blacks, the
// upper edges of many of them glinting — the sheen of coal, its colour; whatever light falls on it is the scene's
function coal(g, seed, cx, base, halfW, top, n) {
  const r = stream(seed);
  g.fillStyle = "#141314";
  g.beginPath();
  g.moveTo(cx - halfW, base);
  g.quadraticCurveTo(cx - halfW * 0.35, base - top * 1.1, cx, base - top);
  g.quadraticCurveTo(cx + halfW * 0.4, base - top * 1.05, cx + halfW, base);
  g.closePath();
  g.fill();
  const tones = ["#1d1c1f", "#29282c", "#333238"];
  const lumps = tones.map(() => new Path2D());
  const glints = new Path2D();
  for (let i = 0; i < n; i++) {
    const u = r() * 2 - 1;
    const px = cx + u * halfW * 0.94;
    const hmax = top * (1 - u * u) * 0.96;
    const py = base - r() * hmax;
    const s = 0.05 + r() * 0.08;
    const tilt = (r() - 0.5) * 0.6;
    const p = lumps[Math.floor(r() * tones.length)];
    p.moveTo(px - s, py + tilt * s);
    p.lineTo(px - s * 0.4, py - s * 0.75);
    p.lineTo(px + s * 0.7, py - s * 0.6 - tilt * s);
    p.lineTo(px + s, py + s * 0.25);
    p.lineTo(px + s * 0.1, py + s * 0.6);
    p.closePath();
    if (r() < 0.4) {
      glints.moveTo(px - s * 0.4, py - s * 0.75);
      glints.lineTo(px + s * 0.7, py - s * 0.6 - tilt * s);
    }
  }
  tones.forEach((t, i) => {
    g.fillStyle = t;
    g.fill(lumps[i]);
  });
  g.strokeStyle = "#5c5f67";
  g.lineWidth = 0.01;
  g.lineCap = "round";
  g.stroke(glints);
}

// a hanging lantern under its bracket (its foot at the anchor, 0.8 m tall): the iron hood, the glass lit — the glow
// `flame`; the arm it hangs from goes `arm` metres to the right (to the wall it is fixed to; 0 — straight up)
function lamp(g, e, arm) {
  g.strokeStyle = "#202021";
  g.lineWidth = 0.03;
  g.beginPath();
  g.moveTo(-0.02, -0.75);
  g.lineTo(-0.02, -0.45);
  if (arm > 0) {
    g.moveTo(-0.04, -0.75);
    g.lineTo(arm, -0.75);
    g.moveTo(arm * 0.4, -0.75);
    g.lineTo(arm, -0.55);
  } else {
    g.moveTo(-0.02, -0.7);
    g.lineTo(0, -0.55);
  }
  g.stroke();
  g.fillStyle = "#1f1f20";
  g.beginPath();
  g.moveTo(-0.13, -0.42);
  g.lineTo(0, -0.52);
  g.lineTo(0.13, -0.42);
  g.closePath();
  g.fill();
  g.fillStyle = "#f6e2b4";
  g.fillRect(-0.09, -0.42, 0.18, 0.26);
  g.strokeStyle = "#1f1f20";
  g.lineWidth = 0.02;
  g.strokeRect(-0.09, -0.42, 0.18, 0.26);
  g.fillStyle = "#1f1f20";
  g.fillRect(-0.11, -0.16, 0.22, 0.04);
  e.light(0, -0.29, 0.22, "#ffd08a", 1, "flame");
}

// low white mist lying over the ground from x0 to x1 (the element's box [-12, -1.6, 12, 1.2]): thick at the foot and
// thinning up to 1.6 m, soft banks in it, fading out toward its two ends; it runs on below the foot, where the painting
// lies on the ground toward the eye, so it meets the ground with no edge. On a layer (`mist`) its animate sways slowly
// to and fro (lib `mistSway`) — its ends fade, so it never shows an edge.
function mist(e, seed, strength, x0, x1) {
  e.layer("mist", {}, (c) => {
    const a = (k) => `rgba(236, 240, 244, ${(k * strength).toFixed(3)})`;
    c.save();
    c.beginPath();
    c.rect(x0, -1.6, x1 - x0, 2.8);
    c.clip();
    const low = c.createLinearGradient(0, 1.2, 0, -1.6);
    low.addColorStop(0, a(0));
    low.addColorStop(0.43, a(0.55));
    low.addColorStop(0.62, a(0.32));
    low.addColorStop(1, a(0));
    c.fillStyle = low;
    c.fillRect(x0, -1.6, x1 - x0, 2.8);
    const r = stream(seed);
    const n = Math.max(2, Math.round((x1 - x0) / 3));
    for (let i = 0; i < n; i++) {
      const x = x0 + 1.5 + ((x1 - x0 - 3) * i) / (n - 1) + (r() - 0.5) * 0.8;
      const y = -0.35 - r() * 0.5;
      const rx = 1.2 + r() * 0.8;
      const bank = c.createRadialGradient(x, y, 0, x, y, rx);
      bank.addColorStop(0, a(0.35));
      bank.addColorStop(1, a(0));
      c.fillStyle = bank;
      c.beginPath();
      c.ellipse(x, y, rx, rx * 0.32, 0, 0, 6.3);
      c.fill();
    }
    // its ends fade out: the paint taken away toward each end
    c.globalCompositeOperation = "destination-out";
    for (const [from, to] of [[x0, x0 + 2], [x1, x1 - 2]]) {
      const fade = c.createLinearGradient(from, 0, to, 0);
      fade.addColorStop(0, "rgba(0, 0, 0, 1)");
      fade.addColorStop(1, "rgba(0, 0, 0, 0)");
      c.fillStyle = fade;
      c.fillRect(Math.min(from, to), -1.6, 2, 2.8);
    }
    c.restore();
  });
}

// the mist's slow sway (in its animate): its layer to and fro by `reach` metres, once in about a minute and a half
function mistSway(e, reach) {
  e.layer("mist").x = reach * e.anim.drift(e.t * 0.012, e.id.length);
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

return { stream, rubble, cobbles, coal, lamp, mist, mistSway, tree };
