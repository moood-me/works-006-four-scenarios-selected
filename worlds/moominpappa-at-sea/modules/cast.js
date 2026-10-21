// The people of «Moominpappa at Sea» as people in a scene (an element with "person"): who they are — figures of
// shapes in this world's style, round and soft as Tove Jansson draws them, a fine ink line, plain colours lit by the
// scene — and how they move: the motions in cast.data.json. cast.md says who is who and what each motion is.
// A part's lengths are a man's metres times F.fit.h (the person's height as a share of a man's 1.76 m).
const V = () => MooodShapes.V;
const HAT = [0.13, 0.12, 0.13, 1], BAND = [0.2, 0.19, 0.2, 1], TUFT = [0.86, 0.85, 0.82, 1];
// a face's expressions (the names <id>_mood takes), as the Moomin face shows them: its brows' inner and outer ends up
// (+) or down, its eyes opened (1 at rest) or narrowed, its mouth's half-width, its corners up (+) or down, how open
// (shares of the head's radius)
const MOODS = {
  neutral: { inner: 0, outer: 0, eye: 1, wide: 0.2, corners: 0, open: 0 },
  smile: { inner: 0.02, outer: 0.02, eye: 0.9, wide: 0.24, corners: 0.07, open: 0 },
  laugh: { inner: 0.04, outer: 0.03, eye: 0.55, wide: 0.26, corners: 0.08, open: 0.08 },
  sad: { inner: 0.08, outer: -0.05, eye: 0.9, wide: 0.18, corners: -0.06, open: 0 },
  angry: { inner: -0.08, outer: 0.03, eye: 0.85, wide: 0.17, corners: -0.04, open: 0 },
  surprised: { inner: 0.09, outer: 0.09, eye: 1.3, wide: 0.12, corners: 0, open: 0.09 },
  afraid: { inner: 0.1, outer: 0.01, eye: 1.25, wide: 0.17, corners: -0.04, open: 0.05 },
  disgusted: { inner: -0.05, outer: -0.01, eye: 0.8, wide: 0.17, corners: -0.05, open: 0 },
  thinking: { inner: -0.03, outer: 0.04, eye: 0.9, wide: 0.13, corners: -0.015, open: 0 },
  tired: { inner: 0.02, outer: -0.05, eye: 0.55, wide: 0.17, corners: -0.02, open: 0 },
};
// the snout: an egg out of the front of the head, a little low — its centre, half-widths (across, up, forward) as
// shares of the head's radius; a point on it where it faces d (out of it by o)
const SNOUT = { fwd: 0.66, down: 0.24, radii: [0.56, 0.52, 0.86] };
const snoutAt = (F, d, o) => {
  const { add, mul, unit } = V(), { at, axes: [hs, hu, hf], r } = F.head, u = unit(d), s = SNOUT.radii;
  const c = add(at, add(mul(hf, SNOUT.fwd * r), mul(hu, -SNOUT.down * r)));
  return add(c, add(add(mul(hs, u[0] * s[0] * r * o), mul(hu, u[1] * s[1] * r * o)), mul(hf, u[2] * s[2] * r * o)));
};
// the tail's: its profile and colours (F.keep: made once a figure)
const TAIL = F => ({ profile: [[0, 0.03 * F.fit.h], [1, 0.022 * F.fit.h], [2, 0.016 * F.fit.h]], colors: [[0, F.colors.skin]],
  tuft: [0.045 * F.fit.h, 0.06 * F.fit.h, 0.045 * F.fit.h] });
return {
  ...data,
  characters: {
    // Moominpappa: the tallest, a black top hat, nothing else — a round white body, a long snout, a tail
    papa: { kind: 'shapes', style: 'moomin', who: 'man', garment: 'none', hair: 'none', hat: 'tophat', face: 'moomin', parts: ['tail'],
      body: { height: 0.72, head: 1, shoulders: 0.9, arms: 0.74, hips: 1.25, thick: 1.32 },
      colors: { skin: '#f4f1ea', top: '#f4f1ea', bottom: '#f4f1ea', shoes: '#f4f1ea', hat: '#232124' } },
    // Moominmamma: round and a little shorter, her apron on (Jansson's is striped; here one quiet red)
    mama: { kind: 'shapes', style: 'moomin', who: 'woman', garment: 'apron', hair: 'none', face: 'moomin', parts: ['tail'],
      body: { height: 0.69, head: 1.02, shoulders: 0.92, arms: 0.74, hips: 1.32, thick: 1.42 },
      colors: { skin: '#f4f1ea', top: '#f4f1ea', bottom: '#f4f1ea', shoes: '#f4f1ea', garment: '#c45a4d' } },
    // Moomintroll, the son: smaller and slighter, nothing on
    troll: { kind: 'shapes', style: 'moomin', who: 'child', garment: 'none', hair: 'none', face: 'moomin', parts: ['tail'],
      body: { height: 0.6, head: 0.9, shoulders: 0.9, arms: 0.8, hips: 1.18, thick: 1.22 },
      colors: { skin: '#f6f3ed', top: '#f6f3ed', bottom: '#f6f3ed', shoes: '#f6f3ed' } },
  },
  shapes: {
    // the world's style: soft round shapes (the engine's soft), a head as big as a Moomin's, hardly a neck, short
    // chubby legs and arms, a pear of a body, a fine tinted ink line
    styles: {
      moomin: { from: 'soft', name: 'Moomin', head: 2.45, egg: [1.02, 0.97, 1], neck: 0.15, legs: 0.7, limb: 1.45, line: 1.7,
        trunk: { w: [1.3, 1.34, 1.26, 1.04, 0.82], d: [1.4, 1.42, 1.38, 1.18, 0.95] }, face: 'moomin' },
    },
    faces: {
      // the Moomin face: a long round snout, small dark eyes close together high on it, fine brows, a mouth under
      // the snout's end, small ears on the crown (none under a hat) — the same solids for every expression
      moomin: { name: 'Moomin', draw: F => {
        const { at, axes, r, on } = F.head, [, hu] = axes, x = MOODS[F.look.expression] ?? MOODS.neutral;
        const skin = F.colors.skin, dark = [0.1, 0.09, 0.1, 1], brow = [skin[0] * 0.55, skin[1] * 0.55, skin[2] * 0.58, 1];
        F.ball(snoutAt(F, [0, 0, 0], 0), axes, SNOUT.radii.map(v => v * r), skin, F.sides);
        for (const sx of [-1, 1]) {
          F.ball(on([sx * 0.2, 0.2, 0.97], 0.99), axes, [r * 0.075, r * 0.145 * x.eye, r * 0.045], dark, 10);
          F.tube([on([sx * 0.09, 0.42 + x.inner, 0.92], 1.0), on([sx * 0.2, 0.46 + (x.inner + x.outer) / 2, 0.88], 1.005), on([sx * 0.31, 0.42 + x.outer, 0.84], 1.0)],
            [[0, r * 0.016], [1, r * 0.02], [2, r * 0.014]], [[0, brow]], 6, hu);
          if (F.look.hat === 'none') F.ball(on([sx * 0.3, 0.93, -0.08], 0.94), axes, [r * 0.1, r * 0.22, r * 0.08], skin, 12);
        }
        const w = x.wide, y = -0.66;
        F.ball(snoutAt(F, [0, y - x.open, 0.74], 0.985), axes, [r * w * 0.6, r * Math.max(x.open, 0.001), r * 0.04], dark, 10);
        F.tube([snoutAt(F, [-w * 1.6, y + x.corners, 0.7], 1.01), snoutAt(F, [0, y, 0.74], 1.01), snoutAt(F, [w * 1.6, y + x.corners, 0.7], 1.01)],
          [[0, r * 0.016], [2, r * 0.016]], [[0, brow]], 6, hu);
      } },
    },
    hats: {
      // Moominpappa's top hat: a narrow brim, a tall crown, a darker band, sat a little back on the crown
      tophat: { name: 'top hat', draw: F => {
        const { add, mul, unit, cross } = V(), { at, axes: [hs, hu, hf], r } = F.head, tilt = unit(add(hu, mul(hf, -0.14))), ax = [hs, tilt, cross(hs, tilt)];
        F.ball(add(at, add(mul(tilt, r * 0.86), mul(hf, -r * 0.06))), ax, [r * 0.92, r * 0.05, r * 0.88], HAT, F.sides * 2);
        F.ball(add(at, add(mul(tilt, r * 1.38), mul(hf, -r * 0.08))), ax, [r * 0.56, r * 0.56, r * 0.54], HAT, F.sides, 6);
        F.ball(add(at, add(mul(tilt, r * 1.0), mul(hf, -r * 0.07))), ax, [r * 0.58, r * 0.1, r * 0.56], BAND, F.sides, 6);
      } },
    },
    parts: {
      // the tail: out of the back of the seat, hanging and swinging a little late, a tuft at its end
      tail: { name: 'tail', draw: F => {
        const { add, mul } = V(), m = F.fit.h, k = F.k, back = F.fwd('Hips'), K = F.keep(TAIL);
        const base = add(F.P('Hips'), add(mul(back, -0.17 * k), mul(F.up('Hips'), -0.06 * m)));
        const mid = F.swing('tail1', add(base, add(mul(back, -0.13 * m), [0, -0.08 * m, 0])), 120);
        const end = F.swing('tail2', add(mid, add(mul(back, -0.07 * m), [0, -0.13 * m, 0])), 70);
        F.tube([base, mid, end], K.profile, K.colors, 8, F.side('Hips'), 0.6);
        F.ball(end, [F.side('Hips'), F.up('Hips'), back], K.tuft, TUFT, 10);
      } },
    },
  },
};
