// The people of «The Summer Book» as the engine's people: who they are — figures of shapes in this world's style, plain
// straight-edged shapes in quiet colours lit by the scene's own light — and how they move (the motions in
// cast.data.json). cast.md says who is who. A part's lengths that go with the body are a man's metres times F.fit.h
// (the person's height as a share of a man's 1.76 m) or F.k (thickness); what is carried is in real metres (the same
// lantern in any hand).
const V = () => MooodShapes.V;
const UP = [0, 1, 0];
// hex → a colour [r, g, b, tone]: tone 2 — it glows (a lit globe, a flame, an ember)
const hex = (s, tone = 1) => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16) / 255).concat(tone);
const ENAMEL = [0.9, 0.89, 0.85, 1];
const RIM = [0.24, 0.3, 0.42, 1];
const TIN = hex('#6f6a5e'), TIN2 = hex('#8f8a7c'), WIRE = hex('#45423d'), GLOW = hex('#ffd68c', 2), FLAME = hex('#ffcf7a', 2),
  EMBER = hex('#ff8a3c', 2), WAX = hex('#efe6d2'), MATCH = hex('#e9cf98'), STEEL = hex('#c3c7cb'), HAFT = hex('#5a4030'),
  DRIFT = hex('#a49d90'), DRIFT_D = hex('#8a8376'), SEAL = hex('#7d7366'), FEATHER = hex('#6e6458'), FEATHER_L = hex('#a3998a'),
  LINEN = hex('#ece6da'), LEATHER = hex('#7a5638'), PACK = hex('#e4e0d4'), PACK_BAND = hex('#3f5a7a'), PAPER = hex('#a8865c'),
  STRING = hex('#e2d6b8'), CLOTH = hex('#8c8270'), CLOTH_D = hex('#6e6556'), GLASS_BROWN = hex('#6a3f22'), CORK = hex('#b8804f'),
  SHEET = hex('#f1ece0'), GRAPHITE = hex('#3a3a3c'), WOOD = hex('#8a6a45'), NET = hex('#4f463a'), STONE = hex('#8d8a85'),
  SHELL = hex('#f2ebe0'), WICKER = hex('#b08850'), WICKER_D = hex('#8a6638'), STRAW = hex('#dcc48c'), STRAW_D = hex('#b89c62'),
  RIBBON = hex('#7a8a9a'), WOOL = hex('#8f9aa6'), WOOL_D = hex('#717c88'), SHAWL = hex('#a7a6a0'), JACKET = hex('#3a3a3e'),
  CARDIGAN = hex('#8a7a66');

// ── where a hand holds ──
// a hand's grip (between the wrist and the knuckles), the way its fingers point (along), across its palm from the
// little finger to the forefinger (across: a handle lies so in a fist)
const hand = (F, n) => {
  const { mix, sub, unit } = V(), s = n === 'l' ? 'Left' : 'Right', w = F.P(`${s}Hand`), m = F.P(`${s}HandMiddle1`);
  return { at: mix(w, m, 0.7), along: unit(sub(m, w)), across: unit(sub(F.P(`${s}HandIndex1`), F.P(`${s}HandPinky1`))), side: s };
};
// three axes from a direction (y along it) and a hint (x across)
const axesOf = (y, hint) => { const { unit, cross } = V(), z = unit(cross(hint, y)), x = cross(y, z); return [x, y, z]; };
// level axes facing the way the hips face (what hangs, what is held level)
const levelAxes = F => { const { unit, cross } = V(), f = F.fwd('Hips'), fw = unit([f[0], 0, f[2]]); return [cross(UP, fw), UP, fw]; };
// between the two hands, a little before them (what both hold), and that thing's level axes
const between = (F, fwd, up) => {
  const { add, mul, mix } = V(), ax = levelAxes(F);
  return { at: add(mix(hand(F, 'r').at, hand(F, 'l').at, 0.5), add(mul(ax[2], fwd), mul(UP, up))), axes: ax };
};
// something hanging from a hand by its handle: its body `drop` metres below the grip, on a spring; the axes it hangs by
const hanging = (F, n, name, drop) => {
  const { add, mul, sub, unit, cross } = V(), grip = add(hand(F, n).at, mul(UP, -0.02)), f = levelAxes(F)[2];
  const body = F.swing(name, add(grip, mul(UP, -drop)), 150), up = unit(sub(grip, body)), sd = unit(cross(up, f));
  return { grip, body, axes: [sd, up, cross(sd, up)] };
};
// a storm lantern hanging by its bail (cast.md: `lantern` — the small one with its candle, left hand; `big_lantern` —
// Papa's paraffin one, right hand): a tin base, the glass globe in its wire guard glowing, a cap, the bail
const lantern = (n, s) => F => {
  const { add, mul } = V(), { grip, axes } = hanging(F, n, n === 'l' ? 'lantern' : 'big_lantern', 0.2 * s), [sd, up, fw] = axes;
  const at = d => add(grip, mul(up, -d * s));
  F.tube([add(at(0.1), mul(sd, 0.085 * s)), add(at(0.02), mul(sd, 0.05 * s)), at(0), add(at(0.02), mul(sd, -0.05 * s)), add(at(0.1), mul(sd, -0.085 * s))],
    [[0, 0.004], [4, 0.004]], [[0, WIRE]], 5, fw);
  F.ball(at(0.1), axes, [0.04 * s, 0.025 * s, 0.04 * s], TIN, 12);
  F.ball(at(0.12), axes, [0.055 * s, 0.012 * s, 0.055 * s], TIN2, 14, 3);
  F.ball(at(0.2), axes, [0.062 * s, 0.075 * s, 0.062 * s], GLOW, 14);
  for (const d of [sd, fw, mul(sd, -1), mul(fw, -1)]) F.bar(add(at(0.125), mul(d, 0.062 * s)), add(at(0.28), mul(d, 0.062 * s)), 0.003, 0.003, [[0, WIRE]], 4, up);
  F.ball(at(0.29), axes, [0.075 * s, 0.03 * s, 0.075 * s], TIN, 14, 3);
  F.ball(at(0.31), axes, [0.08 * s, 0.01 * s, 0.08 * s], TIN2, 14);
  F.point('globe', at(0.2));
  F.point('flame', at(0.21));
};
// what is worn round the trunk over the figure (the shawl, the jacket, the cardigan, a blanket): a dome over the trunk's
// sections as wide as its widest, `x` wider (over the upper arms) and `z` deeper, from the shoulders down by `low` (of
// the trunk's height), toward `d0`
const dome = (F, colour, x, z, low, d0, edge) => {
  const { mix, sub, add, mul } = V(), t = F.trunk(1), sd = F.side('Chest'), fw = F.fwd('Chest'), uc = F.up('Chest');
  const w = Math.max(t[1][3], t[2][3], t[3][3], t[4][3]), d = Math.max(t[1][4], t[2][4], t[3][4], t[4][4]), h = Math.hypot(...sub(t[4][0], t[1][0]));
  const c = add(mix(t[1][0], t[4][0], 0.55), mul(uc, -low * h));
  F.cap(c, [sd, uc, fw], [w * x, h * (0.62 + low), d * z], d0, edge, colour, F.sides);
  return { w, d, h, sd, fw, uc };
};
// a sleeve along an arm from the shoulder to the wrist (a garment over the figure's own)
const sleeve = (F, s, colour) => {
  const k = F.k;
  F.tube([F.P(`${s}Arm`), F.P(`${s}ForeArm`), F.P(`${s}Hand`)], [[0, 0.068 * k], [1, 0.058 * k], [2, 0.05 * k]], [[0, colour]], 8, F.fwd(`${s}ForeArm`));
};

return {
  ...data,
  characters: {
    // Grandmother: old, small and thin, white hair in a bun, a long dark-blue dress, a grey shawl over the shoulders,
    // dark stockings
    grandma: {
      kind: 'shapes', style: 'summer', who: 'woman', garment: 'shawl_dress', hair: 'bun', socks: true,
      body: { height: 0.9, thick: 0.8, shoulders: 0.86, neck: 0.9 },
      colors: {
        skin: '#d7b49c', hair: '#e8e4dc', top: '#3f4a5c', garment: '#3f4a5c', accent: '#a7a6a0',
        socks: '#3a3a3e', shoes: '#2a2724',
      },
    },
    // Sophia, six: small and quick, short fair hair, a faded coral cotton frock, barefoot
    sophia: {
      kind: 'shapes', style: 'summer', who: 'child', garment: 'frock', hair: 'bob', barefoot: 'both',
      body: { height: 0.64, thick: 0.78, shoulders: 0.86 },
      colors: { skin: '#e2bea2', hair: '#d8bf8a', top: '#c47f6c', garment: '#c47f6c' },
    },
    // Papa: tall and lean, dark hair, a dark green-grey knitted sweater, grey trousers
    papa: {
      kind: 'shapes', style: 'summer', who: 'man', garment: 'none', hair: 'short',
      body: { height: 1.02, thick: 1.0, shoulders: 1.0 },
      colors: { skin: '#d2ab8f', hair: '#4a3a2e', top: '#56635b', bottom: '#5b5e63', shoes: '#2b2826' },
    },
    // Eriksson: an old fisherman from the far skerries, Grandmother's age, square and weathered: a dark cap, grey hair
    // under it, a cream fisherman's sweater, dark trousers, sea boots; he never comes ashore — he sits on his boat's
    // thwart (`sit_bench`)
    eriksson: {
      kind: 'shapes', style: 'summer', who: 'man', garment: 'none', hair: 'short', hat: 'cap',
      body: { height: 0.95, thick: 1.08, shoulders: 1.04 },
      colors: {
        skin: '#b98468', hair: '#b4afa6', top: '#d9d1bd', bottom: '#3c3f45', shoes: '#26282b', hat: '#2e3440',
      },
    },
  },
  shapes: {
    // the world's style: the engine's flat geometry — straight edges, plain colours, lit by the scene; faces readable
    styles: { summer: { from: 'flat', name: 'The Summer Book', line: 0.8, face: 'simple' } },
    garments: {
      // an old woman's long dress, the sleeves to the wrist, and a shawl over the shoulders down to the elbows
      shawl_dress: {
        name: 'dress and shawl',
        hang: [
          { to: 1.9, from: 'waist', flare: 0.4, off: 0.94 },
          { to: 0.45, from: 'shoulders', flare: 0.32, color: 'accent', folds: false },
        ],
        sleeves: 'garment', bare: true, bodice: true,
      },
      // the same long dress without the shawl (Grandmother's while the shawl is round Sophia, or lost:
      // `grandma_wear: {"garment": "long_dress"}`)
      long_dress: {
        name: 'long dress',
        hang: [{ to: 1.9, from: 'waist', flare: 0.4, off: 0.94 }],
        sleeves: 'garment', bare: true, bodice: true,
      },
      // a child's short frock: to the knee, bare arms, bare legs below it
      frock: { name: 'little frock', hang: [{ to: 1.05, from: 'waist', flare: 0.4, off: 0.94 }], short: true, bare: true, bodice: true },
    },
    hats: {
      // the straw hat (Sophia's, too big for her: `sophia_wear: {"hat": "straw"}`): a wide brim, a round low crown, a
      // faded ribbon round it
      straw: { name: 'straw hat', draw: F => {
        const { add, mul, unit, cross } = V(), { at: head, axes: [hs, hu, hf], r: rh } = F.head, tilt = unit(add(hu, mul(hf, 0.1))), axes = [hs, tilt, cross(hs, tilt)];
        F.ball(add(head, mul(hu, rh * 0.42)), axes, [rh * 2.1, rh * 0.05, rh * 2.0], STRAW, F.sides * 2);
        F.ball(add(head, mul(hu, rh * 0.62)), axes, [rh * 1.06, rh * 0.5, rh * 1.04], STRAW_D, F.sides, 2.4);
        F.ball(add(head, mul(hu, rh * 0.5)), axes, [rh * 1.08, rh * 0.1, rh * 1.06], RIBBON, F.sides, 2.4);
      } },
    },
    faces: {
      // Grandmother's face with the eyes closed (`grandma_wear: {"face": "closed"}`): the lids down — thin dark arcs —,
      // the brows, the nose, the mouth at rest; calm (it takes no `<id>_mood`)
      closed: { name: 'eyes closed', draw: F => {
        const { axes, r: rh, on } = F.head, [, hu] = axes, dark = [0.2, 0.16, 0.15], brow = F.colors.hair.map(v => v * 0.75);
        const lips = F.colors.skin.map(v => v * 0.72);
        for (const sx of [-1, 1]) {
          F.tube([on([sx * 0.22, 0.06, 0.95], 0.995), on([sx * 0.33, 0.04, 0.94], 1.0), on([sx * 0.44, 0.06, 0.9], 0.995)],
            [[0, rh * 0.016], [1, rh * 0.02], [2, rh * 0.016]], [[0, dark]], 6, hu);
          F.tube([on([sx * 0.16, 0.33, 0.93], 0.995), on([sx * 0.3, 0.34, 0.9], 1.0), on([sx * 0.45, 0.29, 0.84], 0.995)],
            [[0, rh * 0.026], [1, rh * 0.03], [2, rh * 0.02]], [[0, brow]], 6, hu);
        }
        F.ball(on([0, -0.1, 1], 0.97), axes, [rh * 0.085, rh * 0.12, rh * 0.11], F.colors.skin.map(v => v * 0.97), 10);
        F.tube([on([-0.12, -0.37, 0.93], 0.995), on([0, -0.38, 0.94], 1.0), on([0.12, -0.37, 0.93], 0.995)], [[0, rh * 0.016], [2, rh * 0.016]], [[0, lips]], 6, hu);
      } },
    },
    parts: {
      // an enamel mug held in both hands before the chest: between the hands, upright
      mug: {
        name: 'mug',
        draw: F => {
          const { mix, add } = V();
          const m = F.fit.h;
          const c = mix(F.P('RightHand'), F.P('LeftHand'), 0.5);
          const foot = add(c, [0, -0.05 * m, 0]);
          const top = add(c, [0, 0.05 * m, 0]);
          F.bar(foot, top, 0.042 * m, 0.042 * m, [[0, ENAMEL], [0.9, RIM]], 12, [1, 0, 0]);
          F.point('mug', top);
        },
      },
      // ── lights in the hand (cast.md: the scene's light "at": "<id>#flame") ──
      // the small storm lantern with its candle, hanging by its bail in the left hand, burning
      lantern: { name: 'lantern', draw: lantern('l', 0.85) },
      // Papa's big paraffin storm lantern, hanging by its bail in the right hand, burning
      big_lantern: { name: 'big lantern', draw: lantern('r', 1.15) },
      // a lit candle in a tin holder held level in the right hand before the chest
      candle: { name: 'candle', draw: F => {
        const { add, mul } = V(), g = hand(F, 'r'), ax = levelAxes(F), base = add(g.at, mul(UP, 0.02));
        F.ball(base, ax, [0.045, 0.008, 0.045], TIN2, 12);
        F.bar(base, add(base, mul(UP, 0.08)), 0.011, 0.011, [[0, WAX]], 8, ax[0]);
        const flame = add(base, mul(UP, 0.1));
        F.ball(flame, ax, [0.007, 0.016, 0.007], FLAME, 6);
        F.point('flame', flame);
      } },
      // a lit match in the right hand, pointing out of the fingers (its flame glows)
      match: { name: 'lit match', draw: F => {
        const { add, mul } = V(), g = hand(F, 'r'), head = add(g.at, mul(g.along, 0.07));
        F.bar(add(g.at, mul(g.along, 0.01)), head, 0.0018, 0.0018, [[0, MATCH]], 4, g.across);
        const flame = add(head, mul(UP, 0.012));
        F.ball(flame, levelAxes(F), [0.006, 0.013, 0.006], FLAME, 6);
        F.point('flame', flame);
      } },
      // a lit cigarette between the right hand's first two fingers, its ember glowing (the smoke is the scene's)
      cigarette: { name: 'cigarette', draw: F => {
        const { add, mul, mix } = V(), g = hand(F, 'r'), at = mix(F.P('RightHandIndex2'), F.P('RightHandMiddle2'), 0.5), tip = add(at, mul(g.along, 0.045));
        F.bar(add(at, mul(g.along, -0.025)), tip, 0.0032, 0.0032, [[0, WAX]], 5, g.across);
        const ember = add(tip, mul(g.along, 0.004));
        F.ball(ember, axesOf(g.along, g.across), [0.0045, 0.005, 0.0045], EMBER, 6);
        F.point('ember', ember);
      } },
      // ── in the hand ──
      // Grandmother's clasp knife, open: the haft across the right fist, the blade out past the forefinger
      knife: { name: 'knife', draw: F => {
        const { add, mul } = V(), g = hand(F, 'r'), a = add(g.at, mul(g.across, -0.045)), b = add(g.at, mul(g.across, 0.035));
        F.bar(a, b, 0.011, 0.011, [[0, HAFT]], 6, g.along);
        const tip = add(b, mul(g.across, 0.075));
        F.bar(b, tip, 0.009, 0.002, [[0, STEEL]], 4, g.along, 0.2);
        F.point('blade', add(b, mul(g.across, 0.04)));
      } },
      // a piece of grey driftwood in the left hand (what she carves; the shore's `chip` is the same)
      driftwood: { name: 'driftwood', draw: F => driftwood(F) },
      chip: { name: 'chip of driftwood', draw: F => driftwood(F) },
      // the little wooden seal she carved, in the right hand: a long grey-brown body, its head up
      seal: { name: 'wooden seal', draw: F => {
        const { add, mul } = V(), g = hand(F, 'r'), ax = axesOf(g.across, g.along), c = add(g.at, mul(g.along, 0.02));
        F.ball(c, ax, [0.022, 0.045, 0.02], SEAL, 10);
        F.ball(add(c, add(mul(g.across, 0.045), mul(UP, 0.012))), ax, [0.015, 0.016, 0.015], SEAL, 8);
        F.point('seal', c);
      } },
      // a dead bird held by two fingers of the right hand, hanging
      bird: { name: 'dead bird', draw: F => {
        const { add, mul } = V(), { grip, body, axes } = hanging(F, 'r', 'bird', 0.07), [, up] = axes;
        F.bar(grip, add(body, mul(up, 0.03)), 0.003, 0.003, [[0, FEATHER]], 4, axes[0]);
        F.ball(body, axes, [0.03, 0.05, 0.028], FEATHER, 10);
        F.ball(add(body, mul(up, -0.055)), axes, [0.018, 0.02, 0.018], FEATHER_L, 8);
        F.point('bird', body);
      } },
      // the dead bird wrapped in a pillowcase, held in both hands
      pillowcase: { name: 'bird in a pillowcase', draw: F => {
        const { at, axes } = between(F, 0.04, 0);
        F.ball(at, axes, [0.11, 0.07, 0.07], LINEN, 12);
        F.point('bundle', at);
      } },
      // Grandmother's leather tobacco pouch in the left hand
      pouch: { name: 'tobacco pouch', draw: F => {
        const { add, mul } = V(), g = hand(F, 'l'), c = add(g.at, mul(g.along, 0.02));
        F.ball(c, axesOf(g.along, g.across), [0.045, 0.06, 0.022], LEATHER, 10);
        F.point('pouch', c);
      } },
      // a packet of cigarettes in the left hand
      packet: { name: 'packet of cigarettes', draw: F => {
        const { add, mul } = V(), g = hand(F, 'l'), ax = axesOf(g.along, g.across), c = add(g.at, mul(g.along, 0.015));
        F.ball(c, ax, [0.03, 0.045, 0.011], PACK, 4, 6);
        F.ball(add(c, mul(g.along, 0.02)), ax, [0.031, 0.008, 0.012], PACK_BAND, 4, 6);
        F.point('packet', c);
      } },
      // a small grey pebble in the right hand
      pebble: { name: 'pebble', draw: F => {
        const { add, mul } = V(), g = hand(F, 'r'), c = add(g.at, mul(g.along, 0.025));
        F.ball(c, axesOf(g.along, g.across), [0.02, 0.016, 0.018], STONE, 8);
        F.point('pebble', c);
      } },
      // a white shell in the right hand
      shell: { name: 'shell', draw: F => {
        const { add, mul } = V(), g = hand(F, 'r'), c = add(g.at, mul(g.along, 0.025));
        F.ball(c, axesOf(g.along, g.across), [0.03, 0.012, 0.024], SHELL, 8);
        F.point('shell', c);
      } },
      // a little brown bottle in the right hand, its cork
      drops: { name: 'little bottle', draw: F => {
        const { add, mul } = V(), g = hand(F, 'r'), base = add(g.at, mul(UP, -0.03));
        F.bar(base, add(base, mul(UP, 0.07)), 0.016, 0.016, [[0, GLASS_BROWN]], 8, levelAxes(F)[0]);
        F.bar(add(base, mul(UP, 0.07)), add(base, mul(UP, 0.09)), 0.007, 0.007, [[0, CORK]], 6, levelAxes(F)[0]);
        F.point('bottle', add(base, mul(UP, 0.04)));
      } },
      // Papa's list: a sheet in the left hand, a pencil in the right
      list: { name: 'list', draw: F => {
        const { add, mul } = V(), l = hand(F, 'l'), r = hand(F, 'r'), page = add(l.at, mul(l.along, 0.06));
        F.ball(page, axesOf(l.along, l.across), [0.075, 0.1, 0.004], SHEET, 4, 6);
        F.bar(add(r.at, mul(r.along, -0.03)), add(r.at, mul(r.along, 0.08)), 0.004, 0.003, [[0, WOOD], [0.85, GRAPHITE]], 5, r.across);
        F.point('page', page);
      } },
      // a parcel in brown paper tied with string, in both hands before the chest; the bow on top
      parcel: { name: 'parcel', draw: F => {
        const { add, mul } = V(), { at, axes } = between(F, 0.06, 0.02), [sd, up] = axes;
        F.ball(at, axes, [0.12, 0.06, 0.09], PAPER, 4, 6);
        F.ball(at, axes, [0.123, 0.062, 0.006], STRING, 4, 6);
        F.ball(at, axes, [0.006, 0.062, 0.093], STRING, 4, 6);
        const bow = add(at, mul(up, 0.066));
        for (const s of [-1, 1]) F.ball(add(bow, mul(sd, s * 0.014)), axes, [0.014, 0.006, 0.009], STRING, 6);
        F.point('parcel', at);
        F.point('string', bow);
      } },
      // a heap of tangled net on the knees between the hands (seated), cork floats in it
      net: { name: 'net on the knees', draw: F => {
        const { add, mul, mix } = V(), ax = levelAxes(F), hands = mix(hand(F, 'r').at, hand(F, 'l').at, 0.5);
        const lap = mix(F.P('RightShin'), F.P('LeftShin'), 0.5), c = add(mix(hands, lap, 0.35), mul(UP, -0.02));
        F.ball(c, ax, [0.2, 0.05, 0.13], NET, 12);
        for (const s of [-1, 1]) F.ball(add(c, add(mul(ax[0], s * 0.12), mul(UP, 0.04))), ax, [0.025, 0.018, 0.025], CORK, 8);
        F.point('net', c);
      } },
      // a folded blanket carried in both arms before the chest
      blanket_fold: { name: 'folded blanket', draw: F => {
        const { add, mul } = V(), { at, axes } = between(F, 0.08, 0.02);
        F.ball(at, axes, [0.24, 0.09, 0.15], WOOL, 14, 3.2);
        F.ball(add(at, mul(axes[2], 0.005)), axes, [0.242, 0.025, 0.152], WOOL_D, 14, 3.2);
        F.point('blanket', at);
      } },
      // the lidded wicker basket hanging from the right hand by its handle (the cat in it)
      basket: { name: 'lidded basket', draw: F => {
        const { add, mul } = V(), { grip, body, axes } = hanging(F, 'r', 'basket', 0.17), [sd, up, fw] = axes;
        F.tube([add(body, add(mul(sd, -0.16), mul(up, 0.08))), add(grip, mul(sd, -0.05)), add(grip, mul(sd, 0.05)), add(body, add(mul(sd, 0.16), mul(up, 0.08)))],
          [[0, 0.01], [3, 0.01]], [[0, WICKER_D]], 6, fw);
        F.ball(body, axes, [0.2, 0.11, 0.14], WICKER, 14, 3);
        F.ball(add(body, mul(up, 0.1)), axes, [0.205, 0.025, 0.145], WICKER_D, 14, 3);
        F.point('basket', body);
      } },
      // the straw hat held by its brim in the right hand, hanging beside her
      hat: { name: 'straw hat in the hand', draw: F => {
        const { add, mul } = V(), { body, axes } = hanging(F, 'r', 'hat', 0.15), [sd, up, fw] = axes;
        F.ball(body, [sd, fw, up], [0.2, 0.012, 0.19], STRAW, 16);
        F.ball(add(body, mul(fw, 0.04)), [sd, fw, up], [0.1, 0.07, 0.1], STRAW_D, 12);
        F.point('hat', body);
      } },
      // ── worn over the figure ──
      // Papa's bundle of belongings on his right shoulder
      bundle: { name: 'bundle on the shoulder', draw: F => {
        const { add, mul } = V(), m = F.fit.h, uc = F.up('Chest'), fw = F.fwd('Chest'), sd = F.side('Chest');
        const c = add(F.P('RightArm'), add(mul(uc, 0.13 * m), mul(fw, -0.04 * m)));
        F.ball(c, [sd, uc, fw], [0.13 * m, 0.11 * m, 0.14 * m], CLOTH, 12);
        F.ball(add(c, mul(uc, 0.1 * m)), [sd, uc, fw], [0.04 * m, 0.03 * m, 0.04 * m], CLOTH_D, 8);
        F.point('bundle', c);
      } },
      // a blanket wrapped round the shoulders and the trunk, closed before the chest (sitting or standing)
      blanket: { name: 'blanket round the shoulders', draw: F => { dome(F, WOOL, 1.75, 1.45, 0.3, [0, 1, -0.1], -0.55); } },
      // one blanket round two sitting side by side: over this one's shoulders and back, open before — the two halves
      // meet between them (each of the two has it)
      blanket_round: { name: 'blanket round two', draw: F => { dome(F, WOOL, 1.75, 1.45, 0.25, [0, 1, -0.55], -0.3); } },
      // Grandmother's grey shawl round the shoulders of someone else (on Sophia it falls to her knees)
      shawl: { name: 'shawl', draw: F => { dome(F, SHAWL, 1.75, 1.4, 0.6, [0, 1, -0.05], -0.7); } },
      // Papa's dark jacket over the shoulders, the sleeves hanging empty
      jacket: { name: 'jacket over the shoulders', draw: F => {
        const { add, mul } = V(), m = F.fit.h, { w, sd, uc } = dome(F, JACKET, 1.7, 1.35, 0.15, [0, 1, -0.08], -0.45);
        for (const s of [-1, 1]) {
          const top = add(F.P('Chest'), add(mul(sd, s * w * 1.6), mul(uc, 0.02 * m)));
          const mid = F.swing(`jsleeve${s}a`, add(top, mul(UP, -0.24 * m)), 110), end = F.swing(`jsleeve${s}b`, add(mid, mul(UP, -0.22 * m)), 80);
          F.tube([top, mid, end], [[0, 0.05 * m], [2, 0.045 * m]], [[0, JACKET]], 8, F.fwd('Chest'), 0.5);
        }
      } },
      // a knitted cardigan, worn: over the trunk to the hips, the sleeves to the wrists
      cardigan: { name: 'cardigan', draw: F => {
        dome(F, CARDIGAN, 1.15, 1.2, 0.1, [0, 1, 0], -0.45);
        sleeve(F, 'Left', CARDIGAN);
        sleeve(F, 'Right', CARDIGAN);
      } },
    },
  },
};
// (a piece of driftwood in the left hand, grey and worn)
function driftwood(F) {
  const { add, mul } = V(), g = hand(F, 'l'), ax = axesOf(g.across, g.along), c = add(g.at, mul(g.along, 0.02));
  F.ball(c, ax, [0.022, 0.06, 0.02], DRIFT, 8, 3);
  F.ball(add(c, mul(g.across, 0.045)), ax, [0.016, 0.02, 0.015], DRIFT_D, 6, 3);
  F.point('wood', c);
}
