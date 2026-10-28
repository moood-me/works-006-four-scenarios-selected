// The people of «Moominpappa at Sea» as people in a scene (an element with "person"): who they are — figures of
// shapes in this world's style, round and soft as Tove Jansson draws them, a fine ink line, plain colours lit by the
// scene — and how they move: the motions in cast.data.json. cast.md says who is who and what each motion is.
// A part's lengths are a man's metres times F.fit.h (the person's height as a share of a man's 1.76 m).
const V = () => MooodShapes.V;
const HAT = [0.13, 0.12, 0.13, 1], BAND = [0.2, 0.19, 0.2, 1], TUFT = [0.86, 0.85, 0.82, 1];
// the Fisherman's net in his hands: its tarred cord, its cork floats
const CORD = [0.33, 0.29, 0.24, 1], CORK = [0.72, 0.5, 0.3, 1], UP = [0, 1, 0];
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
const SNOUT = { fwd: 0.66, down: 0.05, radii: [0.7, 0.68, 0.95] };
const snoutAt = (F, d, o) => {
  const { add, mul, unit } = V(), { at, axes: [hs, hu, hf], r } = F.head, u = unit(d), s = SNOUT.radii;
  const c = add(at, add(mul(hf, SNOUT.fwd * r), mul(hu, -SNOUT.down * r)));
  return add(c, add(add(mul(hs, u[0] * s[0] * r * o), mul(hu, u[1] * s[1] * r * o)), mul(hf, u[2] * s[2] * r * o)));
};
// the tail's: its profile and colours (F.keep: made once a figure)
// Little My's: her topknot's egg (shares of the head's radius); her face's — the simple face's expressions, her eyes
// rounder and darker
const KNOT = F => ({ crown: F.head.egg.map(e => e * F.head.r * F.head.out * 1.03), knot: [0.36, 0.5, 0.36].map(v => v * F.head.r) });
// the Fisherman's net: the bundle in his hands, the fall of it down to the stone, the floats along it
const NETLOAD = F => ({ fall: [null, null, null, null], profile: [[0, 0.05 * F.fit.h], [1.5, 0.06 * F.fit.h], [3, 0.09 * F.fit.h]], colors: [[0, CORD]],
  bundle: [0.09, 0.045, 0.07].map(v => v * F.fit.h), cork: [0.022, 0.016, 0.022].map(v => v * F.fit.h) });
const TAIL = F => ({ profile: [[0, 0.03 * F.fit.h], [1, 0.022 * F.fit.h], [2, 0.016 * F.fit.h]], colors: [[0, F.colors.skin]],
  tuft: [0.045 * F.fit.h, 0.06 * F.fit.h, 0.045 * F.fit.h] });
// ── what they carry (stage 5): things of the world in real metres — the same lantern, cup, pie in any paw — at the
// paws as the motion has them. hex → a colour [r, g, b, tone]: tone 2 — it glows (a lit globe, a match's flame)
const hex = (s, tone = 1) => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16) / 255).concat(tone);
const TIN = hex('#6f6a5e'), TIN2 = hex('#8a8474'), WIRE = hex('#4a4640'), SOOT = hex('#968e80'), RIME = hex('#dbe8f4'),
  RIME_D = hex('#b9cfe4'), GLOW = hex('#ffd68c', 2), GLOW_LOW = hex('#e0a458', 2), WICKER = hex('#b08850'), WICKER_D = hex('#8a6638'),
  WEED = hex('#5f6b3a'), WEED_D = hex('#454f2b'), CAN = hex('#9c3b2e'), PIE = hex('#c98a45'), CRUST = hex('#d9a35c'),
  BREAD = hex('#b8803f'), WOOL = hex('#7d93a6'), WOOL_D = hex('#5d7184'), BUNDLE = hex('#a89c86'), STRAP = hex('#5a4a38'),
  HEMP = hex('#a8916a'), LEAD = hex('#4a4c50'), STONE = hex('#8d8a85'), WOOD = hex('#8a6a45'), PAINT = hex('#c45a4d'),
  NEEDLE = hex('#c8ccd0'), LINEN = hex('#e2d8c3'), GRAPHITE = hex('#3a3a3c'), COVER = hex('#3f5a46'), PAGE = hex('#ece4d0'),
  MATCH = hex('#e9cf98'), FLAME = hex('#ffcf7a', 2), BOX = hex('#b5a37a'), ENAMEL = hex('#e8e4da'), IRON = hex('#55524c'),
  COAT = hex('#2a2a2e'), RAG = hex('#c9bfa8'), NET = hex('#544a3d'), FLOAT = hex('#b8804c');
// a paw: its middle (where a Moomin's round mitten closes on what it holds) and its axes
const paw = (F, n) => { const j = n === 'l' ? 'LeftHand' : 'RightHand'; return { at: F.P(`${j}Middle1`), axes: [F.side(j), F.up(j), F.fwd(j)] }; };
// level axes facing the way the hips face (what hangs, what is held level)
const levelAxes = F => { const { unit, cross } = V(), f = F.fwd('Hips'), fw = unit([f[0], 0, f[2]]); return [cross(UP, fw), UP, fw]; };
// between the two paws, a little before them (what both arms hold), and that thing's level axes
const between = (F, fwd, up) => {
  const { add, mul, mix } = V(), ax = levelAxes(F);
  return { at: add(mix(F.P('RightHandMiddle1'), F.P('LeftHandMiddle1'), 0.5), add(mul(ax[2], fwd), mul(UP, up))), axes: ax };
};
// something hanging from the right paw by its handle: its body `drop` metres below the grip, on a spring; the axes it
// hangs by (up from it to the grip)
const hanging = (F, name, drop) => {
  const { add, mul, sub, unit, cross } = V(), grip = add(paw(F, 'r').at, mul(UP, -0.03)), f = levelAxes(F)[2];
  const body = F.swing(name, add(grip, mul(UP, -drop)), 150), up = unit(sub(grip, body)), sd = unit(cross(up, f));
  return { grip, body, axes: [sd, up, cross(sd, up)] };
};
// the family's storm lantern hanging from the right paw by its bail, as lantern.js draws it standing (a tin font, the
// glass globe in its wire guard, a cap, the bail): `globe` its glass's colour, `rimed` its tin white with rime
const LANTERN = { full: { globe: GLOW, rimed: false }, low: { globe: GLOW_LOW, rimed: false }, out: { globe: SOOT, rimed: false },
  frost: { globe: RIME, rimed: true } };
const lantern = state => F => {
  const { add, mul } = V(), s = LANTERN[state], { grip, axes } = hanging(F, 'lantern', 0.23), [sd, up, fw] = axes;
  const at = d => add(grip, mul(up, -d)), tin = s.rimed ? RIME_D : TIN, tin2 = s.rimed ? RIME : TIN2;
  F.tube([add(at(0.1), mul(sd, 0.1)), add(at(0.02), mul(sd, 0.065)), at(0), add(at(0.02), mul(sd, -0.065)), add(at(0.1), mul(sd, -0.1))],
    [[0, 0.005], [4, 0.005]], [[0, WIRE]], 5, fw);
  F.ball(at(0.1), axes, [0.045, 0.03, 0.045], tin, 12);
  F.ball(at(0.13), axes, [0.06, 0.016, 0.06], tin2, 14);
  F.ball(at(0.23), axes, [0.08, 0.09, 0.08], s.globe, 16);
  for (const d of [sd, fw, mul(sd, -1), mul(fw, -1)]) F.bar(add(at(0.14), mul(d, 0.075)), add(at(0.32), mul(d, 0.075)), 0.004, 0.004, [[0, WIRE]], 4, up);
  F.ball(at(0.33), axes, [0.09, 0.016, 0.09], tin2, 14);
  F.ball(at(0.37), axes, [0.11, 0.035, 0.11], tin, 16, 3);
  F.ball(at(0.41), axes, [0.11, 0.01, 0.11], tin, 16);
  F.point('globe', at(0.23));
  F.point('flame', at(0.24));
};
// rime on the son's paws (to the wrists) or up his arms (to the elbows): a crust of it round each, a little over the
// arm, bluish white
const rime = upTo => F => {
  const { add, mul, sub } = V(), lk = F.k * F.style.limb;
  for (const n of ['Right', 'Left']) {
    const elbow = F.P(`${n}ForeArm`), wrist = F.P(`${n}Hand`), mid = F.P(`${n}HandMiddle1`), tip = add(wrist, mul(sub(mid, wrist), 1.9));
    const from = upTo === 'elbows' ? elbow : add(wrist, mul(sub(elbow, wrist), 0.25));
    F.tube([from, wrist, mid, tip], [[0, 0.04 * lk], [1, 0.034 * lk], [2, 0.05 * lk], [3, 0.02 * lk]], [[0, RIME_D], [1.6, RIME]], 10, F.side(`${n}Hand`));
  }
};
// Mama's wicker basket hanging from the right paw by its handle (and full of seaweed)
const basket = (F, weed) => {
  const { add, mul } = V(), { grip, body, axes } = hanging(F, 'basket', 0.17), [sd, up, fw] = axes;
  F.tube([add(body, add(mul(sd, -0.15), mul(up, 0.06))), add(grip, mul(sd, -0.05)), add(grip, mul(sd, 0.05)), add(body, add(mul(sd, 0.15), mul(up, 0.06)))],
    [[0, 0.01], [3, 0.01]], [[0, WICKER_D]], 6, fw);
  F.ball(body, axes, [0.17, 0.1, 0.12], WICKER, 16, 2.6);
  F.ball(add(body, mul(up, 0.08)), axes, [0.175, 0.018, 0.125], WICKER_D, 16, 2.6);
  if (weed) F.ball(add(body, mul(up, 0.1)), axes, [0.15, 0.06, 0.1], WEED, 12);
  F.point('basket', body);
};

// the Moomin face: a long round snout, small dark eyes close together high on it, fine brows, a mouth under the
// snout's end, small ears on the crown (none under a hat) — the same solids for every expression; blushing, a pink
// flush on the cheeks of the snout
const BLUSH = [0.91, 0.6, 0.6, 1];
const moominFace = blush => F => {
  const { at, axes, r, on } = F.head, [, hu] = axes, x = MOODS[F.look.expression] ?? MOODS.neutral;
  const skin = F.colors.skin, dark = [0.1, 0.09, 0.1, 1], brow = [skin[0] * 0.62, skin[1] * 0.62, skin[2] * 0.65, 1];
  F.ball(snoutAt(F, [0, 0, 0], 0), axes, SNOUT.radii.map(v => v * r), skin, F.sides);
  for (const sx of [-1, 1]) {
    F.ball(snoutAt(F, [sx * 0.28, 0.75, 0.35], 0.995), axes, [r * 0.085, r * 0.16 * x.eye, r * 0.05], dark, 10);
    F.tube([on([sx * 0.1, 0.8 + x.inner, 0.6], 1.0), on([sx * 0.22, 0.83 + (x.inner + x.outer) / 2, 0.54], 1.005), on([sx * 0.34, 0.75 + x.outer, 0.5], 1.0)],
      [[0, r * 0.012], [1, r * 0.016], [2, r * 0.01]], [[0, brow]], 6, hu);
    if (F.look.hat === 'none') F.ball(on([sx * 0.3, 0.93, -0.08], 0.94), axes, [r * 0.1, r * 0.22, r * 0.08], skin, 12);
  }
  const w = x.wide, y = -0.55;
  F.ball(snoutAt(F, [0, y - x.open, 0.8], 0.985), axes, [r * w * 0.6, r * Math.max(x.open, 0.001), r * 0.04], dark, 10);
  F.tube([snoutAt(F, [-w * 1.4, y + x.corners, 0.76], 1.01), snoutAt(F, [0, y, 0.8], 1.01), snoutAt(F, [w * 1.4, y + x.corners, 0.76], 1.01)],
    [[0, r * 0.016], [2, r * 0.016]], [[0, brow]], 6, hu);
  // blushing: a pink flush on either cheek of the snout, below the eyes (lying on it, turned as it is there)
  if (blush) for (const sx of [-1, 1]) {
    const { sub, unit, cross } = V(), c = snoutAt(F, [sx * 0.72, 0.1, 0.55], 0.985), n = unit(sub(c, snoutAt(F, [0, 0, 0], 0))), a = unit(cross(hu, n));
    F.ball(c, [a, cross(n, a), n], [r * 0.16, r * 0.11, r * 0.035], BLUSH, 10);
  }
};
// Moomintroll, the son (his look, and the same blushing: cast.md)
const TROLL = { kind: 'shapes', style: 'moomin', who: 'child', garment: 'none', hair: 'none', face: 'moomin', parts: ['tail'],
  body: { height: 0.6, head: 0.9, shoulders: 0.9, arms: 0.8, hips: 1.18, thick: 1.22 },
  colors: { skin: '#f6f3ed', top: '#f6f3ed', bottom: '#f6f3ed', shoes: '#f6f3ed' } };
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
    // Moomintroll, the son: smaller and slighter, nothing on; blushing — pink on his cheeks (a look for a while)
    troll: TROLL,
    troll_blush: { ...TROLL, face: 'moomin_blush' },
    // Little My: tiny, a girl's round face, her orange hair in a tight topknot, a red bell of a dress, bare arms and legs
    my: { kind: 'shapes', style: 'my', who: 'child', garment: 'bell', hair: 'topknot', face: 'my',
      body: { height: 0.4, head: 1, shoulders: 0.82, arms: 0.9, hips: 0.92, thick: 0.9 },
      colors: { skin: '#f2d4bf', top: '#f2d4bf', bottom: '#f2d4bf', shoes: '#f2d4bf', hair: '#d46f2a', garment: '#c23c32' } },
    // the Fisherman: thin and long, taller than Papa, a long narrow head with a drooping nose, a faded oilskin coat
    // ragged at the hem, a sou'wester pulled down; his net in his hands
    fisher: { kind: 'shapes', style: 'fisher', who: 'old', garment: 'oilcoat', hair: 'none', hat: 'souwester', face: 'fisher', parts: ['netload'],
      body: { height: 0.8, head: 1, shoulders: 0.9, arms: 0.95, hips: 0.95, thick: 1.05 },
      colors: { skin: '#e2dace', top: '#9a917c', bottom: '#625c55', shoes: '#3d3833', hat: '#c9a85c', garment: '#9a9178' } },
    // the Groke: big and round, a grey-blue mound with no neck and no feet to be seen — her cloak falls to the ground
    // over a hem white with frost; a broad face, pale round eyes, a heavy nose, a wide mouth turned down
    groke: { kind: 'shapes', style: 'groke', who: 'old', garment: 'groke', hair: 'none', hat: 'none', face: 'groke', parts: [],
      body: { height: 1.1, head: 1.3, shoulders: 1.1, arms: 0.75, hips: 1.2, thick: 1.4 },
      colors: { skin: '#a2b0bf', top: '#eef3f6', bottom: '#8494a8', shoes: '#8494a8', garment: '#8494a8' } },
  },
  shapes: {
    // the world's style: soft round shapes (the engine's soft), a head as big as a Moomin's, hardly a neck, short
    // chubby legs and arms, a pear of a body, a fine tinted ink line
    styles: {
      moomin: { from: 'soft', name: 'Moomin', head: 2.45, egg: [1.02, 0.97, 1], neck: 0.15, legs: 0.7, limb: 1.45, line: 1.7,
        trunk: { w: [1.3, 1.34, 1.26, 1.04, 0.82], d: [1.4, 1.42, 1.38, 1.18, 0.95] }, face: 'moomin' },
      // Little My's: the same soft line, a big round head, thin limbs, a slight body under her dress
      my: { from: 'moomin', name: 'Little My', head: 2.05, egg: [1, 1, 0.98], neck: 0.25, legs: 0.9, limb: 0.95,
        trunk: { w: [0.92, 0.94, 0.9, 0.9, 0.84], d: [0.96, 0.98, 0.96, 0.92, 0.88] }, face: 'my' },
      // the Fisherman's: the same soft line, a smaller long head on a thin neck, long thin limbs, a narrow body
      fisher: { from: 'moomin', name: 'Fisherman', head: 1.9, egg: [0.86, 1.14, 0.96], neck: 0.5, legs: 0.95, limb: 0.8,
        trunk: { w: [0.86, 0.88, 0.82, 0.86, 0.8], d: [0.9, 0.9, 0.86, 0.84, 0.8] }, face: 'fisher' },
      // the Groke's: the same soft line, a big wide head sunk into the shoulders, short legs, thick arms, a body
      // widening down to a mound; her cloak's hem a little ragged
      groke: { from: 'moomin', name: 'Groke', head: 2.5, egg: [1.12, 0.94, 1.02], neck: 0.02, legs: 0.62, limb: 1.7, ragged: 0.1,
        trunk: { w: [1.75, 1.75, 1.7, 1.65, 1.55], d: [1.7, 1.7, 1.65, 1.6, 1.5] }, face: 'groke' },
    },
    garments: {
      // Little My's dress: a red bell from the shoulders to above the knees, her arms and legs bare
      bell: { name: 'bell dress', hang: [{ to: 0.85, from: 'shoulders', flare: 0.55 }], bare: true },
      // the Fisherman's oilskin: from the shoulders to below the knees, a little wide, ragged at the hem
      oilcoat: { name: 'oilskin coat', hang: [{ to: 1.25, from: 'shoulders', flare: 0.22, ragged: true }], sleeves: 'garment' },
      // the Groke's cloak: from the shoulders, wide, to just above the ground — under it, from the waist, a frost-white
      // layer to the ground: its edge showing at the hem and between the tatters
      groke: { name: "the Groke's cloak", hang: [{ to: 3, from: 'waist', flare: 0.36, color: 'top', folds: false },
        { to: 2.0, from: 'shoulders', flare: 0.3, ragged: true }], sleeves: 'garment' },
    },
    hair: {
      // Little My's topknot: her hair drawn tight over the crown into a tall knot on top
      topknot: { name: 'topknot', draw: F => {
        const { add, mul } = V(), { at, axes, r, sides, square } = F.head, K = F.keep(KNOT);
        F.cap(at, axes, K.crown, [0, 0.82, -0.45], -0.02, F.colors.hair, sides, square);
        F.ball(add(at, add(mul(axes[1], r * 1.22), mul(axes[2], -r * 0.06))), axes, K.knot, F.colors.hair, F.sides);
      } },
    },
    faces: {
      // Little My's face: round dark eyes set wide, sharp brows, a small nose, a mouth that knows better
      my: { name: 'Little My', draw: F => {
        const { axes, r, on } = F.head, [, hu] = axes, x = MOODS[F.look.expression] ?? MOODS.neutral;
        const dark = [0.1, 0.08, 0.08, 1], brow = [0.55, 0.26, 0.1, 1], lips = [0.62, 0.36, 0.32, 1];
        for (const sx of [-1, 1]) {
          F.ball(on([sx * 0.34, 0.06, 0.94], 0.985), axes, [r * 0.1, r * 0.13 * x.eye, r * 0.05], dark, 10);
          F.tube([on([sx * 0.15, 0.3 + x.inner, 0.94], 0.998), on([sx * 0.3, 0.33 + (x.inner + x.outer) / 2, 0.9], 1.003), on([sx * 0.47, 0.3 + x.outer, 0.83], 0.998)],
            [[0, r * 0.03], [1, r * 0.034], [2, r * 0.02]], [[0, brow]], 6, hu);
        }
        F.ball(on([0, -0.12, 1], 0.975), axes, [r * 0.06, r * 0.07, r * 0.06], F.colors.skin, 8);
        const w = x.wide * 0.7, y = -0.36;
        F.ball(on([0, y - x.open / 2, 0.95], 0.975), axes, [r * w * 0.75, r * Math.max(x.open, 0.001), r * 0.03], dark, 10);
        F.tube([on([-w, y + x.corners * 0.9, 0.93], 0.995), on([0, y, 0.94], 1.0), on([w, y + x.corners * 1.3, 0.93], 0.995)], [[0, r * 0.018], [2, r * 0.018]], [[0, lips]], 6, hu);
      } },
      // the Fisherman's face: small dark eyes set close under heavy grey brows, a long nose drooping over a thin
      // mouth, grey stubble under the jaw — grey and weathered
      fisher: { name: 'Fisherman', draw: F => {
        const { axes, r, on } = F.head, [, hu, hf] = axes, x = MOODS[F.look.expression] ?? MOODS.neutral, { add, mul } = V();
        const dark = [0.12, 0.1, 0.1, 1], brow = [0.62, 0.6, 0.56, 1], skin = F.colors.skin, lips = [skin[0] * 0.7, skin[1] * 0.66, skin[2] * 0.64, 1];
        for (const sx of [-1, 1]) {
          F.ball(on([sx * 0.27, 0.12, 0.95], 0.985), axes, [r * 0.065, r * 0.075 * x.eye, r * 0.04], dark, 10);
          F.tube([on([sx * 0.1, 0.3 + x.inner, 0.96], 1.0), on([sx * 0.26, 0.32 + (x.inner + x.outer) / 2, 0.92], 1.012), on([sx * 0.42, 0.27 + x.outer, 0.86], 1.0)],
            [[0, r * 0.045], [1, r * 0.05], [2, r * 0.03]], [[0, brow]], 6, hu);
        }
        const root = on([0, 0.02, 1], 0.96), tip = add(root, add(mul(hf, r * 0.3), mul(hu, -r * 0.2)));
        F.tube([root, add(root, add(mul(hf, r * 0.2), mul(hu, -r * 0.05))), tip], [[0, r * 0.12], [1, r * 0.11], [2, r * 0.09]], [[0, skin]], 10, F.head.axes[0]);
        F.ball(tip, axes, [r * 0.1, r * 0.1, r * 0.1], skin, 10);
        const w = x.wide * 0.7, y = -0.42;
        F.ball(on([0, y - x.open / 2, 0.95], 0.975), axes, [r * w * 0.75, r * Math.max(x.open, 0.001), r * 0.03], dark, 10);
        F.tube([on([-w, y + x.corners, 0.93], 0.995), on([0, y, 0.94], 1.0), on([w, y + x.corners, 0.93], 0.995)], [[0, r * 0.018], [2, r * 0.018]], [[0, lips]], 6, hu);
        F.cap(F.head.at, axes, F.head.egg.map(e => e * r * F.head.out * 1.01), [0, -1, 0], 0.55, brow, F.head.sides, F.head.square);
      } },
      // the Groke's face: big pale round eyes bulging out of it, a small dark pupil in each, heavy sagging brows, a
      // broad round nose, a wide mouth drawn down at its corners — the face reads from afar; it takes <id>_mood
      groke: { name: 'Groke', draw: F => {
        const { axes, r, on } = F.head, [, hu, hf] = axes, x = MOODS[F.look.expression] ?? MOODS.neutral, { add, mul } = V();
        const pale = [0.9, 0.93, 0.94, 1], dark = [0.09, 0.1, 0.13, 1], skin = F.colors.skin, brow = [skin[0] * 0.48, skin[1] * 0.5, skin[2] * 0.56, 1];
        const nose = [skin[0] * 0.86, skin[1] * 0.87, skin[2] * 0.9, 1];
        for (const sx of [-1, 1]) {
          const eye = on([sx * 0.3, 0.14, 0.92], 1.06);
          F.ball(eye, axes, [r * 0.2, r * 0.22 * x.eye, r * 0.13], pale, 14);
          F.ball(add(eye, add(mul(hf, r * 0.125), mul(hu, -r * 0.035 * x.eye))), axes, [r * 0.06, r * 0.07 * x.eye, r * 0.03], dark, 10);
          F.tube([on([sx * 0.1, 0.4 + x.inner, 0.92], 1.05), on([sx * 0.28, 0.44 + (x.inner + x.outer) / 2, 0.88], 1.07), on([sx * 0.48, 0.33 + x.outer, 0.8], 1.05)],
            [[0, r * 0.05], [1, r * 0.06], [2, r * 0.035]], [[0, brow]], 6, hu);
        }
        F.ball(on([0, -0.1, 1], 1.02), axes, [r * 0.2, r * 0.17, r * 0.16], nose, 14);
        const w = x.wide * 1.8, y = -0.46;
        F.ball(on([0, y - x.open / 2, 0.93], 0.99), axes, [r * w * 0.75, r * Math.max(x.open, 0.001), r * 0.03], dark, 10);
        F.tube([on([-w, y - 0.05 + x.corners, 0.88], 1.03), on([0, y, 0.93], 1.035), on([w, y - 0.05 + x.corners, 0.88], 1.03)], [[0, r * 0.022], [2, r * 0.022]], [[0, brow]], 6, hu);
      } },
      // the Moomin face (moominFace above); blushing — the son's for a while (troll_blush)
      moomin: { name: 'Moomin', draw: moominFace(false) },
      moomin_blush: { name: 'Moomin, blushing', draw: moominFace(true) },
    },
    hats: {
      // the Fisherman's sou'wester: a soft dome pulled down to the brows, its brim narrow before and broad behind,
      // drooping over the nape
      souwester: { name: "sou'wester", draw: F => {
        const { add, mul, unit, cross } = V(), { at, axes: [hs, hu, hf], egg, r, out, sides, square } = F.head;
        F.cap(at, [hs, hu, hf], egg.map(e => e * r * out * 1.08), [0, 0.95, -0.25], 0.22, F.colors.hat, sides, square);
        const tilt = unit(add(hu, mul(hf, 0.32))), ax = [hs, tilt, cross(hs, tilt)];
        F.ball(add(at, add(mul(hu, r * 0.18), mul(hf, -r * 0.22))), ax, [r * 1.18, r * 0.05, r * 1.32], F.colors.hat, F.sides * 2);
      } },
      // Moominpappa's top hat: a narrow brim, a tall crown, a darker band, sat a little back on the crown
      tophat: { name: 'top hat', draw: F => {
        const { add, mul, unit, cross } = V(), { at, axes: [hs, hu, hf], r } = F.head, tilt = unit(add(hu, mul(hf, -0.14))), ax = [hs, tilt, cross(hs, tilt)];
        F.ball(add(at, add(mul(tilt, r * 0.86), mul(hf, -r * 0.06))), ax, [r * 0.92, r * 0.05, r * 0.88], HAT, F.sides * 2);
        F.ball(add(at, add(mul(tilt, r * 1.38), mul(hf, -r * 0.08))), ax, [r * 0.56, r * 0.56, r * 0.54], HAT, F.sides, 6);
        F.ball(add(at, add(mul(tilt, r * 1.0), mul(hf, -r * 0.07))), ax, [r * 0.58, r * 0.1, r * 0.56], BAND, F.sides, 6);
      } },
    },
    parts: {
      // ── what they carry (stage 5; cast.md: Parts) ──
      // the family's storm lantern in the right paw by its bail: burning, turned low, out (the globe sooty), out and
      // white with rime — its points `flame` (the scene's light "at": "<id>#flame") and `globe` (the other paw's reach)
      lantern: { name: 'lantern', draw: lantern('full') },
      lantern_low: { name: 'lantern turned low', draw: lantern('low') },
      lantern_out: { name: 'lantern out', draw: lantern('out') },
      lantern_frost: { name: 'lantern white with rime', draw: lantern('frost') },
      // Papa's ladle: its handle out of the paw, the bowl at its end
      ladle: { name: 'ladle', draw: F => {
        const { add, mul } = V(), { at, axes } = paw(F, 'r'), end = add(at, add(mul(axes[2], 0.3), mul(axes[1], -0.04)));
        F.bar(add(at, mul(axes[2], -0.04)), end, 0.009, 0.009, [[0, WOOD]], 6, axes[0]);
        F.ball(add(end, mul(axes[2], 0.04)), axes, [0.05, 0.03, 0.05], TIN, 12);
        F.point('ladle', add(end, mul(axes[2], 0.04)));
      } },
      // the son's spoon
      spoon: { name: 'spoon', draw: F => {
        const { add, mul } = V(), { at, axes } = paw(F, 'r'), end = add(at, mul(axes[2], 0.12));
        F.bar(add(at, mul(axes[2], -0.02)), end, 0.005, 0.006, [[0, TIN2]], 5, axes[0]);
        F.ball(add(end, mul(axes[2], 0.025)), axes, [0.02, 0.008, 0.028], TIN2, 8);
      } },
      // a bundle of blankets in both arms before the chest, a strap round it
      bundle: { name: 'bundle', draw: F => {
        const { at, axes } = between(F, 0.1, 0.02);
        F.ball(at, axes, [0.24, 0.15, 0.15], BUNDLE, 14, 3);
        F.ball(at, axes, [0.04, 0.155, 0.155], STRAP, 10, 3);
        F.point('bundle', at);
      } },
      // Mama's wicker basket hanging from the right paw by its handle; full of seaweed
      basket: { name: 'basket', draw: F => basket(F, false) },
      basket_weed: { name: 'basket of seaweed', draw: F => basket(F, true) },
      // the paraffin can hanging from the right paw by its handle, its spout up
      can: { name: 'paraffin can', draw: F => {
        const { add, mul } = V(), { grip, body, axes } = hanging(F, 'can', 0.15), [sd, up, fw] = axes;
        F.bar(add(grip, mul(sd, -0.05)), add(grip, mul(sd, 0.05)), 0.008, 0.008, [[0, WIRE]], 5, fw);
        F.ball(body, axes, [0.08, 0.12, 0.055], CAN, 12, 3.4);
        F.bar(add(body, add(mul(up, 0.1), mul(sd, 0.05))), add(body, add(mul(up, 0.17), mul(sd, 0.08))), 0.012, 0.009, [[0, TIN]], 6, fw);
        F.point('can', body);
      } },
      // Mama's pie in its tin, held level in both paws before the chest
      pie: { name: 'pie', draw: F => {
        const { add, mul } = V(), { at, axes } = between(F, 0.06, 0.02);
        F.ball(at, axes, [0.16, 0.025, 0.16], TIN2, 18);
        F.ball(add(at, mul(UP, 0.02)), axes, [0.145, 0.035, 0.145], PIE, 18);
        F.ball(add(at, mul(UP, 0.045)), axes, [0.08, 0.015, 0.08], CRUST, 12);
        F.point('pie', add(at, mul(UP, 0.04)));
      } },
      // a loaf of bread in both paws
      bread: { name: 'bread', draw: F => {
        const { at, axes } = between(F, 0.05, 0.02);
        F.ball(at, axes, [0.14, 0.075, 0.085], BREAD, 14);
        F.point('bread', at);
      } },
      // a folded blanket in both arms before the chest
      blanket: { name: 'blanket', draw: F => {
        const { add, mul } = V(), { at, axes } = between(F, 0.08, 0.02);
        F.ball(at, axes, [0.22, 0.09, 0.14], WOOL, 14, 3.2);
        F.ball(add(at, mul(axes[2], 0.005)), axes, [0.222, 0.025, 0.142], WOOL_D, 14, 3.2);
        F.point('blanket', at);
      } },
      // a blanket round the shoulders, closed before the chest, falling to below the waist (sitting or standing): a
      // dome over the trunk as wide as its widest (a Moomin is widest at the belly)
      blanket_wrap: { name: 'blanket round the shoulders', draw: F => {
        const { mix, sub } = V(), t = F.trunk(1), c = mix(t[2][0], t[4][0], 0.45), sd = F.side('Chest'), fw = F.fwd('Chest');
        const w = Math.max(t[1][3], t[2][3], t[3][3], t[4][3]), d = Math.max(t[1][4], t[2][4], t[3][4], t[4][4]), h = Math.hypot(...sub(t[4][0], t[1][0]));
        F.cap(c, [sd, F.up('Chest'), fw], [w * 1.14, h * 0.8, d * 1.18], [0, 1, -0.1], -0.45, WOOL, F.sides);
      } },
      // an armful of seaweed held up over the head between the paws, strands hanging from its ends
      armful: { name: 'armful of seaweed', draw: F => {
        const { add, mul } = V(), { at, axes } = between(F, 0, 0.18), [sd] = axes;
        F.ball(at, axes, [0.3, 0.14, 0.2], WEED, 16);
        F.ball(add(at, mul(UP, 0.08)), axes, [0.2, 0.08, 0.14], WEED_D, 12);
        for (const s of [-1, 1]) {
          const from = add(at, mul(sd, s * 0.24)), mid = F.swing(`weed${s}a`, add(from, mul(UP, -0.14)), 90), end = F.swing(`weed${s}b`, add(mid, mul(UP, -0.12)), 60);
          F.tube([from, mid, end], [[0, 0.03], [2, 0.012]], [[0, WEED_D]], 6, axes[2]);
        }
        F.point('armful', at);
      } },
      // the sounding rope: its coil in the left paw, the line from the right paw hanging to its lead weight
      rope: { name: 'rope', draw: F => {
        const { add, mul } = V(), l = paw(F, 'l'), r = paw(F, 'r');
        F.ball(add(l.at, mul(UP, -0.03)), levelAxes(F), [0.1, 0.035, 0.1], HEMP, 14);
        const mid = F.swing('rope1', add(r.at, mul(UP, -0.25)), 120), lead = F.swing('rope2', add(mid, mul(UP, -0.25)), 90);
        F.tube([r.at, mid, lead], [[0, 0.007], [2, 0.007]], [[0, HEMP]], 5, levelAxes(F)[2]);
        F.ball(add(lead, mul(UP, -0.04)), levelAxes(F), [0.03, 0.05, 0.03], LEAD, 10);
        F.point('coil', l.at);
        F.point('lead', add(lead, mul(UP, -0.04)));
      } },
      // a round stone in both paws
      stone: { name: 'stone', draw: F => {
        const { at, axes } = between(F, 0.03, 0);
        F.ball(at, axes, [0.08, 0.065, 0.075], STONE, 12);
        F.point('stone', at);
      } },
      // Mama's brush, its wet tip
      brush: { name: 'brush', draw: F => {
        const { add, mul } = V(), { at, axes } = paw(F, 'r'), tip = add(at, mul(axes[2], 0.2));
        F.bar(add(at, mul(axes[2], -0.06)), tip, 0.006, 0.006, [[0, WOOD]], 5, axes[0]);
        F.ball(add(tip, mul(axes[2], 0.015)), axes, [0.008, 0.008, 0.02], PAINT, 6);
        F.point('tip', add(tip, mul(axes[2], 0.03)));
      } },
      // sewing: the needle in the right paw, the cloth in the left
      sewing: { name: 'sewing', draw: F => {
        const { add, mul } = V(), r = paw(F, 'r'), l = paw(F, 'l'), eye = add(r.at, mul(r.axes[1], 0.06));
        F.bar(add(r.at, mul(r.axes[1], 0.02)), eye, 0.0025, 0.0025, [[0, NEEDLE]], 4, r.axes[2]);
        F.ball(add(l.at, mul(l.axes[2], 0.04)), l.axes, [0.12, 0.012, 0.09], LINEN, 10);
        F.point('needle', eye);
      } },
      // Papa's pencil
      pencil: { name: 'pencil', draw: F => {
        const { add, mul } = V(), { at, axes } = paw(F, 'r'), tip = add(at, mul(axes[2], 0.1));
        F.bar(add(at, mul(axes[2], -0.04)), tip, 0.005, 0.003, [[0, WOOD], [0.85, GRAPHITE]], 5, axes[0]);
        F.point('tip', tip);
      } },
      // Papa's book in the left paw, open, the pencil in the right
      book: { name: 'book', draw: F => {
        const { add, mul } = V(), l = paw(F, 'l'), r = paw(F, 'r'), page = add(l.at, mul(l.axes[1], 0.03));
        F.ball(l.at, l.axes, [0.12, 0.012, 0.09], COVER, 6, 4);
        F.ball(page, l.axes, [0.11, 0.008, 0.08], PAGE, 6, 4);
        F.bar(add(r.at, mul(r.axes[2], -0.04)), add(r.at, mul(r.axes[2], 0.1)), 0.005, 0.003, [[0, WOOD], [0.85, GRAPHITE]], 5, r.axes[0]);
        F.point('page', page);
      } },
      // a lit match in the right paw (its flame glows)
      match: { name: 'lit match', draw: F => {
        const { add, mul } = V(), { at, axes } = paw(F, 'r'), head = add(at, mul(axes[2], 0.06));
        F.bar(add(at, mul(axes[2], -0.01)), head, 0.002, 0.002, [[0, MATCH]], 4, axes[0]);
        F.ball(add(head, mul(UP, 0.012)), axes, [0.007, 0.014, 0.007], FLAME, 6);
        F.point('flame', add(head, mul(UP, 0.012)));
      } },
      // Papa's matchbox
      matchbox: { name: 'matchbox', draw: F => {
        const { add, mul } = V(), { at, axes } = paw(F, 'r'), c = add(at, mul(axes[1], -0.02));
        F.ball(c, axes, [0.025, 0.012, 0.035], BOX, 4, 6);
        F.point('matchbox', c);
      } },
      // a cup, held by its body in the right paw
      cup: { name: 'cup', draw: F => {
        const { add, mul } = V(), { at } = paw(F, 'r'), c = add(at, mul(UP, 0.03));
        F.ball(c, levelAxes(F), [0.04, 0.04, 0.04], ENAMEL, 12, 2.6);
        F.point('cup', add(c, mul(UP, 0.035)));
      } },
      // the lighthouse's big iron key (Little My)
      key: { name: 'key', draw: F => {
        const { add, mul } = V(), { at, axes } = paw(F, 'r'), end = add(at, mul(axes[2], 0.1));
        F.ball(add(at, mul(axes[2], -0.02)), axes, [0.025, 0.006, 0.025], IRON, 8);
        F.bar(at, end, 0.005, 0.005, [[0, IRON]], 5, axes[0]);
        F.ball(end, axes, [0.006, 0.006, 0.018], IRON, 4, 4);
        F.point('key', add(at, mul(axes[2], 0.05)));
      } },
      // the oil pot wrapped in Papa's frock coat, carried in both arms
      pot: { name: 'pot in the frock coat', draw: F => {
        const { add, mul } = V(), { at, axes } = between(F, 0.1, 0);
        F.ball(at, axes, [0.16, 0.15, 0.15], COAT, 14);
        F.ball(add(at, mul(UP, 0.12)), axes, [0.1, 0.02, 0.1], TIN, 12);
        F.point('pot', at);
      } },
      // a rag (the lenses)
      rag: { name: 'rag', draw: F => {
        const { add, mul } = V(), { at, axes } = paw(F, 'r');
        F.ball(add(at, mul(axes[2], 0.03)), axes, [0.06, 0.035, 0.05], RAG, 8);
      } },
      // the Fisherman's net folded and slung over his left shoulder: a roll of it over the shoulder, down his chest
      // and his back, cork floats along it
      net_shoulder: { name: 'net on the shoulder', draw: F => {
        const { add, mul } = V(), m = F.fit.h, [c, sd, fw, w, d] = F.trunk(1)[4], uc = F.up('Chest'), sh = add(c, mul(sd, w * 0.5));
        const front = add(F.trunk(1)[2][0], add(mul(fw, d * 1.3), mul(sd, w * 0.1))), back = add(F.trunk(1)[2][0], add(mul(fw, -d * 1.3), mul(sd, w * 0.4)));
        const top = add(sh, add(mul(uc, 0.07 * m), mul(sd, 0.02 * m))), pts = [front, add(sh, mul(fw, d * 1.1)), top, add(sh, mul(fw, -d * 1.1)), back];
        F.tube(pts, [[0, 0.08 * m], [2, 0.11 * m], [4, 0.08 * m]], [[0, NET]], 10, sd, 0.7);
        for (const i of [1, 3]) F.ball(add(pts[i], mul(uc, 0.08 * m)), [sd, uc, fw], [0.035 * m, 0.025 * m, 0.035 * m], FLOAT, 8);
        F.point('net', top);
      } },
      // the son's rime: on the paws to the wrists / up the arms to the elbows
      rime_paws: { name: 'rime on the paws', draw: rime('wrists') },
      rime_arms: { name: 'rime to the elbows', draw: rime('elbows') },
      // the Fisherman's net: a bundle of it in his hands, between them, the rest falling from his lap to the stone at
      // his feet, cork floats along it
      netload: { name: 'net', draw: F => {
        const { add, mul, mix } = V(), m = F.fit.h, K = F.keep(NETLOAD), hands = mix(F.P('LeftHand'), F.P('RightHand'), 0.5);
        const ax = [F.side('Hips'), F.up('Hips'), F.fwd('Hips')], feet = mix(F.P('LeftFoot'), F.P('RightFoot'), 0.5);
        const low = add(feet, add(mul(ax[2], 0.16 * m), mul(UP, -0.02 * m)));
        F.ball(add(hands, mul(UP, -0.03 * m)), ax, K.bundle, CORD, 12);
        K.fall[0] = add(hands, mul(UP, -0.05 * m));
        K.fall[1] = F.swing('net1', add(mix(hands, low, 0.4), mul(ax[2], 0.1 * m)), 140);
        K.fall[2] = F.swing('net2', add(mix(hands, low, 0.75), mul(ax[2], 0.08 * m)), 90);
        K.fall[3] = low;
        F.tube(K.fall, K.profile, K.colors, 10, ax[0], 0.45);
        for (const u of [0.3, 0.62, 0.9]) F.ball(mix(K.fall[1], K.fall[3], u), ax, K.cork, CORK, 8);
      } },
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
