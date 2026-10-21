// The people of «Small Things Like These» as the engine's people (an element with "person"): figures of shapes in this
// world's style `keegan` — the engine's flat geometry, plain colours lit by the scene's own light, faces with eyes,
// brows and a mouth that read — and what they carry. cast.md says who is who. A part's lengths are a man's metres
// times F.fit.h (the person's height as a share of 1.76 m) or F.k (thickness); the points a part names (F.point) are
// the person's: "bill#flame".
const V = () => MooodShapes.V;
const IRON = [0.19, 0.19, 0.2, 1], GLASS = [1, 0.8, 0.52, 2], LINEN = [0.95, 0.94, 0.91, 1], VEIL = [0.1, 0.1, 0.12, 1];
const COAL_HANDS = [0.16, 0.15, 0.15, 1], RED_HANDS = [0.84, 0.4, 0.36, 1], SILVER = [0.72, 0.72, 0.74, 1];
const FLOUR_HANDS = [0.92, 0.88, 0.8, 1];
// the world's face's expressions (the engine's names): brows' inner and outer ends, the eye's opening, the mouth's
// half-width, its corners, how open — 'thinking' a cool, measuring look (the Mother Superior's), 'tired' heavy lids
const KEEGAN_MOODS = {
  neutral: { inner: 0, outer: 0, eye: 1, wide: 0.17, corners: 0, open: 0 },
  smile: { inner: 0.01, outer: 0.01, eye: 0.85, wide: 0.2, corners: 0.06, open: 0 },
  laugh: { inner: 0.03, outer: 0.02, eye: 0.5, wide: 0.2, corners: 0.07, open: 0.08 },
  sad: { inner: 0.08, outer: -0.06, eye: 0.85, wide: 0.15, corners: -0.05, open: 0 },
  angry: { inner: -0.09, outer: 0.03, eye: 0.8, wide: 0.14, corners: -0.03, open: 0 },
  surprised: { inner: 0.09, outer: 0.09, eye: 1.35, wide: 0.09, corners: 0, open: 0.09 },
  afraid: { inner: 0.1, outer: 0, eye: 1.35, wide: 0.15, corners: -0.035, open: 0.05 },
  disgusted: { inner: -0.06, outer: -0.01, eye: 0.75, wide: 0.15, corners: -0.04, open: 0 },
  thinking: { inner: -0.05, outer: 0.02, eye: 0.7, wide: 0.13, corners: -0.012, open: 0 },
  tired: { inner: 0.03, outer: -0.06, eye: 0.55, wide: 0.15, corners: -0.025, open: 0 },
};
// the hand's axes: across the palm, up the hand, out of the fist
const axesOf = (F, h) => [F.side(h), F.up(h), F.fwd(h)];
// both hands in a colour of their own: over each the engine's hand, a ball a little bigger — Bill's black with coal
// that never washes off, Sara's red from the laundry's water (a little bigger: the frame's one red)
function hands(F, colour, size = 0.05) {
  const { mix } = V(), r = size * F.k;
  for (const s of ['Left', 'Right']) {
    F.ball(mix(F.P(s + 'Hand'), F.P(s + 'HandMiddle1'), 0.45), axesOf(F, s + 'Hand'), [r, r, r * 0.88], colour, 10);
  }
}
return {
  ...data,
  characters: {
    // Bill Furlong, 39, the coal merchant: a mustard overcoat (the frame's one warm cloth), a tweed cap, a dark green
    // scarf, black hands
    bill: { kind: 'shapes', style: 'keegan', who: 'man', garment: 'overcoat', hair: 'short', hat: 'cap', scarf: true, parts: ['coal_hands'],
      body: { height: 1.0, shoulders: 1.06, thick: 1.04 },
      colors: { skin: '#d9a98e', hair: '#5e4636', top: '#cfc7b6', garment: '#b5862c', bottom: '#5a534a', hat: '#4d4a42', shoes: '#2a2521', accent: '#3f4b3c' } },
    // Bill at home: the coat on its hook, the cap off — his white shirt and a bottle-green waistcoat (his scarf's
    // green: he reads against the cream walls and the brown of the range); the hands as black
    bill_home: { kind: 'shapes', style: 'keegan', who: 'man', garment: 'waistcoat', hair: 'short', parts: ['coal_hands'],
      body: { height: 1.0, shoulders: 1.06, thick: 1.04 },
      colors: { skin: '#d9a98e', hair: '#5e4636', top: '#ebe7de', garment: '#2f4a3b', bottom: '#4e4a44', shoes: '#2a2521' } },
    // Eileen Furlong, his wife: a wine-coloured dress under a washed-blue wraparound pinafore, her hair pinned up,
    // flour on her hands
    eileen: { kind: 'shapes', style: 'keegan', who: 'woman', garment: 'pinafore', hair: 'bun', parts: ['floury_hands'],
      body: { height: 0.94, thick: 0.96, shoulders: 0.9 },
      colors: { skin: '#e6c2a8', hair: '#5a3a29', top: '#6e3c44', garment: '#7f98b0', bottom: '#8c7666', shoes: '#2b2420' } },
    // Sheila, twelve, who sings in the nuns' choir: the convent school's navy pleated skirt, a grey jumper, a ponytail
    sheila: { kind: 'shapes', style: 'keegan', who: 'school', garment: 'skirt', hair: 'ponytail', socks: true,
      colors: { skin: '#eccbb2', hair: '#3d2b22', top: '#8a8e95', garment: '#2e3550', shoes: '#2f2520', socks: '#d6d2ca' } },
    // Grace, about eight, who steals raisins from the cake: a muted green frock, white socks, auburn hair in a bob
    grace: { kind: 'shapes', style: 'keegan', who: 'child', garment: 'frock', hair: 'bob', socks: true,
      colors: { skin: '#efd0b8', hair: '#8b5532', top: '#6f8768', garment: '#6f8768', shoes: '#3a2a22', socks: '#e0dbd2' } },
    // Sara Redmond, seventeen, a girl of the laundry: a thin nightgown greyed with coal dust, barefoot, long dark hair,
    // red hands
    sara: { kind: 'shapes', style: 'keegan', who: 'woman', garment: 'nightgown', hair: 'straight', barefoot: 'both', parts: ['red_hands'],
      body: { height: 0.9, thick: 0.74, shoulders: 0.84, neck: 1.05 },
      colors: { skin: '#e6c6b0', hair: '#3b2b22', top: '#cdc9bf', garment: '#cdc9bf' } },
    // the Mother Superior: a black habit to the ground, a white coif round the face under a black veil, a white
    // guimpe on the breast, a small cross; pale hands
    mother: { kind: 'shapes', style: 'keegan', who: 'woman', garment: 'habit', hair: 'none', hat: 'veil', parts: ['guimpe', 'cross'],
      body: { height: 0.96, thick: 0.98, shoulders: 0.92 },
      colors: { skin: '#efdcd0', hair: '#5e534d', top: '#29272e', garment: '#29272e', bottom: '#29272e', shoes: '#18171a' } },
    // Bill in a house not his own, his coat given away: the old tweed jacket he works in under it, the green scarf, the
    // cap off and held in his right hand; the hands as black
    bill_work: { kind: 'shapes', style: 'keegan', who: 'man', garment: 'jacket', hair: 'short', scarf: true, parts: ['coal_hands', 'cap_in_hand'],
      body: { height: 1.0, shoulders: 1.06, thick: 1.04 },
      colors: { skin: '#d9a98e', hair: '#3a2c24', top: '#cfc7b6', garment: '#86785f', bottom: '#6a6258', hat: '#7a705f', shoes: '#2a2521', accent: '#3f4b3c' } },
    // Sara in Bill's mustard coat over her nightgown, still barefoot: the coat to below her knees, the nightgown under it
    sara_coat: { kind: 'shapes', style: 'keegan', who: 'woman', garment: 'bills_coat', hair: 'straight', barefoot: 'both', parts: ['red_hands'],
      body: { height: 0.9, thick: 0.74, shoulders: 0.84, neck: 1.05 },
      colors: { skin: '#e6c6b0', hair: '#3b2b22', top: '#cdc9bf', garment: '#b5862c' } },
  },
  shapes: {
    // the world's style: the engine's flat geometry with the world's own face (`keegan`, below), the head a little larger
    styles: { keegan: { from: 'flat', name: 'Small Things', face: 'keegan', head: 1.22, line: 0.9 } },
    // the world's face: eyes, brows, a nose and a mouth drawn bold enough to read at six to nine metres — the eye a white
    // with a dark iris in it (a wide eye shows its white: fear), brows thick and dark, the mouth a full line of darker
    // lips. Drawn for each expression the engine knows (`<id>_mood`), the same solids every time (the face goes over
    // from one to another on the GPU): brows' inner and outer ends raised (+) or lowered, the eye's opening, the mouth's
    // half-width, its corners up (+) or down, how open
    faces: { keegan: { name: 'Small Things', draw: F => {
      const X = KEEGAN_MOODS, x = X[F.look.expression] ?? X.neutral, { axes, r: rh, on } = F.head, [, hu] = axes;
      const tone = (c, k) => [c[0] * k[0], c[1] * k[1], c[2] * k[2], c[3] ?? 1];
      const iris = [0.12, 0.09, 0.08, 1], white = [0.94, 0.92, 0.88, 1], brow = tone(F.colors.hair, [0.6, 0.6, 0.6]);
      const lips = tone(F.colors.skin, [0.66, 0.46, 0.44]), nose = tone(F.colors.skin, [0.95, 0.93, 0.92]);
      for (const sx of [-1, 1]) {
        F.ball(on([sx * 0.34, 0.07, 0.93], 0.975), axes, [rh * 0.14, rh * 0.1 * x.eye, rh * 0.04], white, 10);
        F.ball(on([sx * 0.33, 0.065, 0.95], 0.99), axes, [rh * 0.082, rh * Math.min(0.088, 0.096 * x.eye), rh * 0.035], iris, 10);
        F.tube([on([sx * 0.14, 0.32 + x.inner, 0.94], 0.995), on([sx * 0.32, 0.35 + (x.inner + x.outer) / 2, 0.9], 1.0), on([sx * 0.5, 0.3 + x.outer, 0.82], 0.995)],
          [[0, rh * 0.06], [1, rh * 0.065], [2, rh * 0.042]], [[0, brow]], 6, hu);
      }
      F.ball(on([0, -0.1, 1], 0.97), axes, [rh * 0.09, rh * 0.13, rh * 0.12], nose, 10);
      const w = x.wide, y = -0.4;
      F.ball(on([0, y - x.open / 2, 0.95], 0.975), axes, [rh * w * 0.75, rh * x.open, rh * 0.03], iris, 10);
      F.tube([on([-w, y + x.corners, 0.93], 0.995), on([0, y, 0.94], 1.0), on([w, y + x.corners, 0.93], 0.995)], [[0, rh * 0.042], [1, rh * 0.05], [2, rh * 0.042]], [[0, lips]], 6, hu);
    } } },
    garments: {
      // a man's overcoat: from the shoulders to the knee, long sleeves, a plain hem
      overcoat: { name: 'overcoat', hang: [{ to: 1.1, from: 'shoulders', flare: 0.14 }], sleeves: 'garment' },
      // a nightgown: from the shoulders to mid-calf, long sleeves
      nightgown: { name: 'nightgown', hang: [{ to: 1.75, from: 'shoulders', flare: 0.22 }], sleeves: 'garment' },
      // a nun's habit: from the shoulders to the ankles, wide sleeves
      habit: { name: 'habit', hang: [{ to: 2.25, from: 'shoulders', flare: 0.3 }], sleeves: 'garment', wide: 0.3 },
      // a waistcoat over a shirt: the trunk to the hips, the shirt's sleeves
      waistcoat: { name: 'waistcoat', hang: [{ to: 0.15, from: 'shoulders', flare: 0.04, folds: false }] },
      // a dress to mid-calf (the top's colour) under a wraparound pinafore from the shoulders to the knee
      pinafore: { name: 'pinafore', hang: [{ to: 1.75, from: 'waist', flare: 0.28, color: 'top', off: 0.94 }, { to: 1.3, from: 'shoulders', flare: 0.2 }] },
      // a child's frock from the shoulders to the knee, long sleeves, the legs bare under it (the socks the look's)
      frock: { name: 'frock', hang: [{ to: 1.0, from: 'shoulders', flare: 0.32 }], sleeves: 'garment', bare: true },
      // a man's overcoat on a girl: from the shoulders to below her knees, its sleeves; under it her nightgown to the ankle
      // (the top's colour)
      bills_coat: { name: "Bill's coat over a nightgown", hang: [{ to: 1.95, from: 'shoulders', flare: 0.22, color: 'top', off: 0.94 }, { to: 1.45, from: 'shoulders', flare: 0.26 }], sleeves: 'garment' },
    },
    hats: {
      // a white coif round all the head but the face, a black veil over it from the brow back, hanging down the back
      veil: { name: 'veil', draw: F => {
        const { add, mul } = V(), { at, axes, egg, r, out, sides, square } = F.head, [hs, hu, hf] = axes, m = F.fit.h;
        F.cap(at, axes, egg.map(e => e * r * out * 1.1), [0, 0.05, -1], -0.72, LINEN, sides, square);
        F.cap(at, axes, egg.map(e => e * r * out * 1.2), [0, 0.75, -0.66], 0.02, VEIL, sides, square);
        const top = add(at, add(mul(hu, r * 0.25), mul(hf, -r * 0.85)));
        const mid = F.swing('veil1', add(top, add([0, -0.17 * m, 0], mul(F.fwd('Chest'), -0.05 * F.k))), 150);
        const end = F.swing('veil2', add(mid, add([0, -0.2 * m, 0], mul(F.fwd('Chest'), -0.03 * F.k))), 90);
        F.tube([top, mid, end], [[0, r * 0.95], [1, r * 1.15], [2, r * 1.3]], [[0, VEIL]], sides, hs, 0.35);
      } },
    },
    parts: {
      // Bill's hands, black with coal
      coal_hands: { name: 'coal-black hands', draw: F => hands(F, COAL_HANDS) },
      // Sara's hands, red from the laundry
      red_hands: { name: 'red hands', draw: F => hands(F, RED_HANDS, 0.05) },
      // Eileen's hands, white with flour
      floury_hands: { name: 'floury hands', draw: F => hands(F, FLOUR_HANDS) },
      // a white guimpe over the breast and the shoulders, under the chin
      guimpe: { name: 'guimpe', draw: F => {
        const { add, mul } = V(), m = F.fit.h, k = F.k, fc = F.fwd('Chest'), uc = F.up('Chest');
        F.ball(add(F.P('Neck1'), add(mul(fc, 0.04 * k), mul(uc, -0.08 * m))), [F.side('Chest'), uc, fc], [0.2 * k, 0.12 * m, 0.11 * k], LINEN, 16);
      } },
      // a small dark cross on a cord on the breast
      cross: { name: 'cross', draw: F => {
        const { add, mul } = V(), m = F.fit.h, k = F.k, fc = F.fwd('Chest'), uc = F.up('Chest'), sc = F.side('Chest');
        const c = add(F.P('Chest'), add(mul(fc, 0.13 * k), mul(uc, -0.04 * m)));
        F.bar(add(c, mul(uc, 0.045 * m)), add(c, mul(uc, -0.05 * m)), 0.007 * m, 0.007 * m, [[0, SILVER]], 5, sc);
        F.bar(add(c, mul(sc, -0.025 * m)), add(c, mul(sc, 0.025 * m)), 0.007 * m, 0.007 * m, [[0, SILVER]], 5, uc);
      } },
      // a hurricane lantern hanging from the left hand by its bail, swinging a little late; its glass glows and is the
      // person's point `flame` — the scene's light shines from it ("at": "<id>#flame")
      lantern: { name: 'hand lantern', draw: F => {
        const { add, mul, sub, unit, cross, level } = V(), m = F.fit.h, h = F.P('LeftHand');
        const mid = F.swing('lantern', add(h, [0, -0.2 * m, 0]), 90), up = unit(sub(h, mid));
        const side = unit(cross(up, level(F.fwd('Hips')))), axes = [side, up, cross(side, up)];
        F.bar(h, add(mid, mul(up, 0.1 * m)), 0.004 * m, 0.004 * m, [[0, IRON]], 5, side);
        F.ball(add(mid, mul(up, 0.09 * m)), axes, [0.05 * m, 0.022 * m, 0.05 * m], IRON, 10);
        F.ball(mid, axes, [0.042 * m, 0.068 * m, 0.042 * m], GLASS, 12);
        F.ball(add(mid, mul(up, -0.085 * m)), axes, [0.058 * m, 0.026 * m, 0.058 * m], IRON, 10);
        F.point('flame', mid);
      } },
      // a tweed cap held by its peak in the right hand, hanging down beside the thigh (swinging a little late as the hand
      // moves): its crown a flat round, the peak in the fingers
      cap_in_hand: { name: 'cap in hand', draw: F => {
        const { add, mul, sub, unit, cross, level } = V(), m = F.fit.h, k = F.k, h = F.P('RightHand');
        const out = unit(level(sub(h, F.P('Hips')))), mid = F.swing('cap', add(h, add([0, -0.11 * m, 0], mul(out, 0.025 * k))), 110);
        const up = unit(sub(h, mid)), fw = unit(cross(out, up)), axes = [out, up, fw];
        F.ball(mid, axes, [0.022 * k, 0.11 * m, 0.12 * m], F.colors.hat, 14);
        F.ball(add(h, mul(up, -0.015 * m)), axes, [0.02 * k, 0.03 * m, 0.075 * m], F.colors.hat, 10);
      } },
    },
  },
};
