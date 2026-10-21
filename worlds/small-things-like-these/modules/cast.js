// The people of «Small Things Like These» as the engine's people (an element with "person"): figures of shapes in this
// world's style `keegan` — the engine's flat geometry, plain colours lit by the scene's own light, faces with eyes,
// brows and a mouth that read — and what they carry. cast.md says who is who. A part's lengths are a man's metres
// times F.fit.h (the person's height as a share of 1.76 m) or F.k (thickness); the points a part names (F.point) are
// the person's: "bill#flame".
const V = () => MooodShapes.V;
const IRON = [0.19, 0.19, 0.2, 1], GLASS = [1, 0.8, 0.52, 2], LINEN = [0.95, 0.94, 0.91, 1], VEIL = [0.1, 0.1, 0.12, 1];
const COAL_HANDS = [0.16, 0.15, 0.15, 1], RED_HANDS = [0.8, 0.43, 0.38, 1], SILVER = [0.72, 0.72, 0.74, 1];
const FLOUR_HANDS = [0.92, 0.88, 0.8, 1];
// the hand's axes: across the palm, up the hand, out of the fist
const axesOf = (F, h) => [F.side(h), F.up(h), F.fwd(h)];
// both hands in a colour of their own: over each the engine's hand, a ball a little bigger — Bill's black with coal
// that never washes off, Sara's red from the laundry's water
function hands(F, colour) {
  const { mix } = V(), r = 0.05 * F.k;
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
      colors: { skin: '#d9a98e', hair: '#3a2c24', top: '#cfc7b6', garment: '#b5862c', bottom: '#34312d', hat: '#4d4a42', shoes: '#211e1b', accent: '#3f4b3c' } },
    // Bill at home: the coat on its hook, the cap off — his shirt and a brown waistcoat; the hands as black
    bill_home: { kind: 'shapes', style: 'keegan', who: 'man', garment: 'waistcoat', hair: 'short', parts: ['coal_hands'],
      body: { height: 1.0, shoulders: 1.06, thick: 1.04 },
      colors: { skin: '#d9a98e', hair: '#3a2c24', top: '#d8d1c2', garment: '#4f4338', bottom: '#34312d', shoes: '#211e1b' } },
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
      colors: { skin: '#ecd9cc', hair: '#6b5f58', top: '#1f1d23', garment: '#1f1d23', bottom: '#1f1d23', shoes: '#141316' } },
  },
  shapes: {
    // the world's style: the engine's flat geometry with a face that reads (eyes, brows, a mouth), the head a little larger
    styles: { keegan: { from: 'flat', name: 'Small Things', face: 'simple', head: 1.16, line: 0.9 } },
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
    },
    hats: {
      // a white coif round all the head but the face, a black veil over it from the brow back, hanging down the back
      veil: { name: 'veil', draw: F => {
        const { add, mul } = V(), { at, axes, egg, r, out, sides, square } = F.head, [hs, hu, hf] = axes, m = F.fit.h;
        F.cap(at, axes, egg.map(e => e * r * out * 1.1), [0, 0.05, -1], -0.5, LINEN, sides, square);
        F.cap(at, axes, egg.map(e => e * r * out * 1.2), [0, 0.75, -0.66], -0.12, VEIL, sides, square);
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
      red_hands: { name: 'red hands', draw: F => hands(F, RED_HANDS) },
      // Eileen's hands, white with flour
      floury_hands: { name: 'floury hands', draw: F => hands(F, FLOUR_HANDS) },
      // a white guimpe over the breast and the shoulders, under the chin
      guimpe: { name: 'guimpe', draw: F => {
        const { add, mul } = V(), m = F.fit.h, k = F.k, fc = F.fwd('Chest'), uc = F.up('Chest');
        F.ball(add(F.P('Neck1'), add(mul(fc, 0.035 * k), mul(uc, -0.07 * m))), [F.side('Chest'), uc, fc], [0.17 * k, 0.09 * m, 0.1 * k], LINEN, 16);
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
    },
  },
};
