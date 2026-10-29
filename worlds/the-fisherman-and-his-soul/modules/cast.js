// The people of «The Fisherman and His Soul» as people in a scene (an element with "person"): figures of shapes in
// this world's style — the engine's flat geometry, plain quiet colours lit by the scene's own light (moon, lantern,
// the glow of the water), small simple faces that read at a distance. cast.md says who is who.
// The Soul is the Fisherman's own figure — the same body, the same face — in the colours of a shadow: cold, dark,
// no warmth in the skin.
const FISHER_BODY = { height: 1, thick: 0.9, shoulders: 1.02, neck: 1.05 };
const V = () => MooodShapes.V;
const IRON = [0.17, 0.15, 0.14, 1];
const FLAME = [1, 0.84, 0.52, 2];
const HOOP = [0.55, 0.38, 0.24, 1];
const SKIN = [0.88, 0.8, 0.66, 1];
const BRASS = [0.78, 0.64, 0.36, 1];
const GLASS_OUT = [0.36, 0.34, 0.3, 1];
// the Fisherman's lantern hanging from a hand by its bail, swinging a little late as the hand moves: a dark iron cap and
// foot, the glass between them glowing (tone 2); the flame is the person's point `flame` — the scene's light shines
// from it ("at": "<id>#flame")
function lantern(F, hand, glass = FLAME) {
  const { add, sub, mul, dot, cross, unit } = V();
  const m = F.fit.h;
  const h = F.P(hand);
  const mid = F.swing('lantern', add(h, [0, -0.2 * m, 0]), 60);
  const up = unit(sub(h, mid));
  const fwd = unit(sub(F.fwd('Hips'), mul(up, dot(F.fwd('Hips'), up))));
  const axes = [cross(up, fwd), up, fwd];
  F.bar(add(mid, mul(up, 0.1 * m)), h, 0.005 * m, 0.005 * m, [[0, IRON]], 5, fwd);
  F.ball(add(mid, mul(up, 0.085 * m)), axes, [0.05 * m, 0.022 * m, 0.05 * m], IRON, 8, 2.4);
  F.ball(mid, axes, [0.04 * m, 0.065 * m, 0.04 * m], glass, 8, 2.4);
  F.ball(add(mid, mul(up, -0.072 * m)), axes, [0.048 * m, 0.012 * m, 0.048 * m], IRON, 8, 2.4);
  F.point('flame', mid);
}
// the Witch's tambourine lying on her lap, between her hands: a wooden hoop, a pale skin, a few brass jingles in its rim;
// held up off the dress a little; its middle is her point `tambourine`
function tambourine(F) {
  const { add, sub, mix, mul, cross, unit } = V();
  const m = F.fit.h;
  const c = add(add(mix(F.P('LeftHand'), F.P('RightHand'), 0.5), [0, 0.1 * m, 0]), mul(F.fwd('Hips'), 0.04 * m));
  const across = unit(sub(F.P('RightHand'), F.P('LeftHand')));
  const n = unit(add([0, 1, 0], mul(F.fwd('Hips'), 0.5)));
  const y = unit(cross(n, across));
  const axes = [across, n, y];
  F.ball(c, axes, [0.13 * m, 0.022 * m, 0.13 * m], HOOP, 16);
  F.ball(add(c, mul(n, 0.012 * m)), axes, [0.12 * m, 0.012 * m, 0.12 * m], SKIN, 16);
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI * 2 + 0.4;
    const at = add(c, add(mul(across, Math.cos(a) * 0.13 * m), mul(y, Math.sin(a) * 0.13 * m)));
    F.ball(at, axes, [0.02 * m, 0.012 * m, 0.02 * m], BRASS, 8);
  }
  F.point('tambourine', c);
}
// the Mermaid's tail over her legs: one silver-green tube from her hips down between her knees to her ankles,
// wide enough to take both legs in it, tapering, and a wide flat fluke where her feet are (her feet in it) — sitting on the stone it hangs down its front;
// in the water it is under it (the scene gives it: `<id>_with: ["tail"]`)
const TAIL = [0.55, 0.72, 0.69, 1];
const FLUKE = [0.47, 0.64, 0.62, 1];
function tail(F) {
  const { add, sub, mul, mix, cross, unit } = V();
  const m = F.fit.h;
  const ankles = mix(F.P('LeftFoot'), F.P('RightFoot'), 0.5);
  F.tube([mix(F.P('LeftLeg'), F.P('RightLeg'), 0.5), mix(F.P('LeftShin'), F.P('RightShin'), 0.5), ankles],
    [[0, 0.19 * m], [1, 0.17 * m], [2, 0.1 * m]], [[0, TAIL]], 12, F.fwd('Hips'));
  const along = unit(sub(mix(F.P('LeftToeEnd'), F.P('RightToeEnd'), 0.5), ankles));
  const across = unit(sub(F.P('LeftFoot'), F.P('RightFoot')));
  F.ball(add(ankles, mul(along, 0.1 * m)), [across, unit(cross(across, along)), along], [0.24 * m, 0.03 * m, 0.15 * m], FLUKE, 12);
}
// ── the things of chapter 1 on (stage 5): what the people hold, carry, wear ──
const SNAKE = [0.3, 0.46, 0.27, 1];
const STEEL = [0.8, 0.82, 0.84, 1];
const RUST = [0.52, 0.32, 0.2, 1];
const SILVER = [0.86, 0.87, 0.9, 1];
const CANVAS = [0.55, 0.48, 0.36, 1];
const STRAP = [0.36, 0.28, 0.2, 1];
const CRUST = [0.72, 0.5, 0.28, 1];
const GOLD = [0.92, 0.74, 0.32, 1];
const CLOTH = [0.42, 0.38, 0.44, 1];
const WOOD = [0.56, 0.32, 0.16, 1];
const WOOD_DARK = [0.22, 0.15, 0.1, 1];
const REED = [0.8, 0.7, 0.46, 1];
// a hand's own axes: along it from the wrist to the knuckles, across it (index to little finger), and the third — so
// what goes with the hand alone goes with it rigidly (a knife in the fist, a ring on a finger)
function handAxes(F, hand) {
  const { sub, cross, unit } = V();
  const along = unit(sub(F.P(`${hand}Middle1`), F.P(hand)));
  const across = unit(sub(F.P(`${hand}Index1`), F.P(`${hand}Pinky1`)));
  return [along, across, unit(cross(along, across))];
}
// the Witch's knife in the right fist: a short handle of green snakeskin in the palm, the blade on past the knuckles —
// pointing as the hand points (a thrust into a post, a cut along the boards); rusty from chapter 4 (`knife_rusty`);
// its point `blade` (the blade's middle)
function knife(F, blade) {
  const { add, mul, cross } = V();
  const m = F.fit.h;
  const [along, across] = handAxes(F, 'RightHand');
  const h = F.P('RightHand');
  const g0 = add(h, mul(along, 0.03 * m));
  const g1 = add(h, mul(along, 0.12 * m));
  const tip = add(g1, mul(along, 0.17 * m));
  F.bar(g0, g1, 0.016 * m, 0.016 * m, [[0, SNAKE]], 6, across);
  F.ball(g1, [across, along, cross(across, along)], [0.03 * m, 0.008 * m, 0.012 * m], IRON, 6);
  F.bar(g1, tip, 0.02 * m, 0.003 * m, [[0, blade]], 4, across, 0.18);
  F.point('blade', add(g1, mul(along, 0.08 * m)));
}
// the potter's silver cup held upright in the right hand: a foot, a stem, a bowl; its point `cup` (the bowl)
function cup(F) {
  const { add, mul, cross, unit, level } = V();
  const m = F.fit.h;
  const [along] = handAxes(F, 'RightHand');
  const up = [0, 1, 0];
  const fw = unit(level(F.fwd('Hips')));
  const axes = [unit(cross(up, fw)), up, fw];
  const c = add(F.P('RightHand'), mul(along, 0.07 * m));
  F.ball(add(c, [0, -0.045 * m, 0]), axes, [0.032 * m, 0.008 * m, 0.032 * m], SILVER, 10);
  F.bar(add(c, [0, -0.045 * m, 0]), add(c, [0, 0.015 * m, 0]), 0.007 * m, 0.007 * m, [[0, SILVER]], 6, axes[0]);
  const bowl = add(c, [0, 0.05 * m, 0]);
  F.ball(bowl, axes, [0.045 * m, 0.042 * m, 0.045 * m], SILVER, 12);
  F.point('cup', bowl);
}
// a shoulder bag of canvas: its strap from the right shoulder across the chest to the bag on the left hip, the bag
// swinging a little late as he goes
function bag(F) {
  const { add, mul } = V();
  const m = F.fit.h;
  const fc = F.fwd('Chest');
  const top = add(F.P('RightArm'), [0, 0.02 * m, 0]);
  const front = F.clear(add(F.P('Chest'), mul(fc, 0.13 * m)), 1, 0.02 * m);
  const hip = add(F.P('LeftLeg'), mul(fc, 0.04 * m));
  const at = F.swing('bag', add(hip, [0, 0.06 * m, 0]), 80);
  F.bar(top, front, 0.012 * m, 0.012 * m, [[0, STRAP]], 5, fc, 0.3);
  F.bar(front, at, 0.012 * m, 0.012 * m, [[0, STRAP]], 5, fc, 0.3);
  F.ball(at, [F.side('Hips'), [0, 1, 0], fc], [0.12 * m, 0.1 * m, 0.05 * m], CANVAS, 8, 3);
}
// a round loaf held between the hands (given, taken); its point `bread`
function bread(F) {
  const { add, mix } = V();
  const m = F.fit.h;
  const c = add(mix(F.P('LeftHand'), F.P('RightHand'), 0.5), [0, 0.04 * m, 0]);
  F.ball(c, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [0.1 * m, 0.06 * m, 0.1 * m], CRUST, 12);
  F.point('bread', c);
}
// a gold ring on the third finger of the right hand (seen close); its point `ring`
function ring(F) {
  const { add, mul, cross } = V();
  const m = F.fit.h;
  const [along, across] = handAxes(F, 'RightHand');
  const at = add(F.P('RightHandRing1'), mul(along, 0.015 * m));
  F.ball(at, [across, along, cross(across, along)], [0.014 * m, 0.006 * m, 0.014 * m], GOLD, 10);
  F.point('ring', at);
}
// the Witch's tambourine held up in the left hand as she dances (the other beating it): the hoop over the hand, its
// face turned out from her; its point `tambourine`
function tambourineHand(F) {
  const { add, sub, mul, cross, unit, level } = V();
  const m = F.fit.h;
  const [along] = handAxes(F, 'LeftHand');
  const c = add(F.P('LeftHand'), mul(along, 0.1 * m));
  const out = unit(level(sub(c, F.P('Chest'))));
  const up = [0, 1, 0];
  const s = unit(cross(up, out));
  const axes = [s, out, up];
  F.ball(c, axes, [0.13 * m, 0.022 * m, 0.13 * m], HOOP, 16);
  F.ball(add(c, mul(out, 0.012 * m)), axes, [0.12 * m, 0.012 * m, 0.12 * m], SKIN, 16);
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI * 2 + 0.4;
    F.ball(add(c, add(mul(s, Math.cos(a) * 0.13 * m), mul(up, Math.sin(a) * 0.13 * m))), axes, [0.02 * m, 0.012 * m, 0.02 * m], BRASS, 8);
  }
  F.point('tambourine', c);
}
// the widow's bundles: one tied in a cloth hanging from her right hand, a bigger one on her back
function bundles(F) {
  const { add, mul } = V();
  const m = F.fit.h;
  const fc = F.fwd('Chest');
  const hang = F.swing('bundle', add(F.P('RightHand'), [0, -0.14 * m, 0]), 70);
  F.ball(hang, [F.side('Hips'), [0, 1, 0], fc], [0.13 * m, 0.12 * m, 0.1 * m], CLOTH, 10, 2.4);
  F.ball(add(F.P('Spine2'), mul(fc, -0.17 * m)), [F.side('Chest'), F.up('Chest'), fc], [0.19 * m, 0.17 * m, 0.1 * m], CANVAS, 10, 2.6);
}
// an old man's grey beard: full and rounded under the chin, of his hair's colour
function beard(F) {
  const h = F.head;
  F.ball(h.on([0, -0.62, 0.62], 1.0), h.axes, [h.r * 0.58, h.r * 0.62, h.r * 0.42], F.colors.hair, h.sides);
}
// a girl's ribbon: a bow at the back of her head in the accent's colour, an end of it hanging
function ribbon(F) {
  const { add } = V();
  const h = F.head;
  const at = h.on([0, 0.18, -0.98], 1.06);
  F.ball(at, h.axes, [h.r * 0.42, h.r * 0.2, h.r * 0.12], F.colors.accent, 8);
  const end = F.swing('ribbon', add(at, [0, -0.13 * F.fit.h, 0]), 120);
  F.bar(at, end, h.r * 0.12, h.r * 0.1, [[0, F.colors.accent]], 5, h.axes[0], 0.25);
}
// a fiddle under the chin on the left shoulder, its neck to the left hand; the bow in the right hand
function fiddle(F) {
  const { add, sub, mul, cross, unit, mix } = V();
  const m = F.fit.h;
  const base = add(mix(F.P('Neck1'), F.P('LeftArm'), 0.55), mul(F.fwd('Chest'), 0.05 * m));
  const way = unit(sub(F.P('LeftHand'), base));
  const s = unit(cross([0, 1, 0], way));
  const n = unit(cross(way, s));
  F.ball(add(base, mul(way, 0.13 * m)), [s, n, way], [0.1 * m, 0.035 * m, 0.17 * m], WOOD, 12, 2.4);
  F.bar(add(base, mul(way, 0.28 * m)), F.P('LeftHand'), 0.013 * m, 0.011 * m, [[0, WOOD_DARK]], 5, s);
  const [along] = handAxes(F, 'RightHand');
  const hold = add(F.P('RightHand'), mul(along, 0.06 * m));
  F.bar(add(hold, mul(along, -0.06 * m)), add(hold, mul(along, 0.5 * m)), 0.005 * m, 0.004 * m, [[0, WOOD_DARK]], 4, s);
}
// a small reed pipe from the lips toward the hands
function pipe(F) {
  const { add, sub, mul, unit, mix } = V();
  const m = F.fit.h;
  const lips = F.head.on([0, -0.4, 1], 1.02);
  const way = unit(sub(mix(F.P('LeftHand'), F.P('RightHand'), 0.5), lips));
  F.bar(lips, add(lips, mul(way, 0.3 * m)), 0.011 * m, 0.013 * m, [[0, REED]], 6, F.head.axes[0]);
}
return {
  ...data,
  characters: {
    // the young Fisherman: lean, sunburnt, dark hair cut short, an undyed linen shirt, rolled sea-blue trousers, barefoot
    fisherman: { kind: 'shapes', style: 'bay', who: 'man', garment: 'tunic', hair: 'short', barefoot: 'both',
      body: FISHER_BODY,
      colors: { skin: '#c99872', hair: '#33251c', top: '#e2d8c4', bottom: '#4f6372' } },
    // his Soul — his shadow standing up: the same man, the same face, all in the slate and ink of a shadow at night
    soul: { kind: 'shapes', style: 'bay', who: 'man', garment: 'tunic', hair: 'short', barefoot: 'both',
      body: FISHER_BODY,
      colors: { skin: '#5d6884', hair: '#141824', top: '#2e3548', bottom: '#1f2433' } },
    // the Mermaid: small and slight, pearl-pale, her hair wet gold to the waist; in the water to the shoulders or the
    // waist, never ashore (below the water nothing of her is seen)
    mermaid: { kind: 'shapes', style: 'bay', who: 'woman', garment: 'none', hair: 'long',
      body: { height: 0.88, thick: 0.78, shoulders: 0.84, neck: 1.08 },
      colors: { skin: '#ecd9c9', hair: '#d6a94a', top: '#ecd9c9', bottom: '#8fb7b0' } },
    // the Witch of the well in the fir wood: tall, a long loose fall of red hair, a plain moss-green dress, barefoot
    witch: { kind: 'shapes', style: 'bay', who: 'woman', garment: 'dress', hair: 'long', barefoot: 'both',
      body: { height: 0.97, thick: 0.86, shoulders: 0.92, neck: 1.06 },
      colors: { skin: '#ecc7a6', hair: '#c9452a', top: '#5a6b44', garment: '#5a6b44', bottom: '#5a6b44' } },
    // the man in black velvet at the edge of the wood: tall, thin, a pale still face, black hair, all in black
    velvet: { kind: 'shapes', style: 'bay', who: 'man', garment: 'frockcoat', hair: 'short',
      body: { height: 1.04, thick: 0.82, shoulders: 0.98, neck: 1.1 },
      colors: { skin: '#ebe5df', hair: '#121016', top: '#1c1922', garment: '#1f1a27', bottom: '#16131b', shoes: '#0e0c10' } },
    // the potter by the bridge in the town: a widower, broad and heavy-handed, greying brown hair, a clay-brown apron
    // over a pale work shirt
    potter: { kind: 'shapes', style: 'bay', who: 'man', garment: 'apron', hair: 'short',
      body: { height: 0.98, thick: 1.12, shoulders: 1.08, neck: 1.0 },
      colors: { skin: '#d6a882', hair: '#6b5a4a', top: '#cfc2a4', garment: '#8c6648', bottom: '#4b4038', shoes: '#2e2622' } },
    // his little daughter, six or so: a plain madder-red dress, brown hair loose to the shoulders
    daughter: { kind: 'shapes', style: 'bay', who: 'child', garment: 'dress', hair: 'long',
      body: { height: 0.66, head: 1.18, legs: 0.94, arms: 0.95, shoulders: 0.86, thick: 0.8 },
      colors: { skin: '#efd3b9', hair: '#7a5534', top: '#a5524a', garment: '#a5524a', bottom: '#a5524a', shoes: '#3a2a24' } },
    // the Priest of the bay, in his white house on the hill: an ageing man, upright, grey hair cut short, a weathered
    // face, a black cassock to the ankles (the cast's garment `cassock`) — the darkest thing in his white room
    priest: { kind: 'shapes', style: 'bay', who: 'man', garment: 'cassock', hair: 'short',
      body: { height: 1.0, thick: 0.96, shoulders: 0.97, neck: 1.0 },
      colors: { skin: '#dcb092', hair: '#a29c94', top: '#2e2a33', garment: '#2e2a33', bottom: '#2e2a33', shoes: '#1c1a1e' } },
    // two women of the village — the Priest's flock (the sermon in his house, the sign they make): one in a slate-blue
    // dress with a kerchief over her hair (`hood`), one in a brown dress, her hair in a bun, a pale shawl at her neck
    woman_a: { kind: 'shapes', style: 'bay', who: 'woman', garment: 'dress', hair: 'bun', hood: true,
      body: { height: 0.93, thick: 0.98, shoulders: 0.92, neck: 1.0 },
      colors: { skin: '#e4b998', hair: '#4e3a2c', top: '#5f7088', garment: '#5f7088', bottom: '#5f7088', shoes: '#3a2e26' } },
    woman_b: { kind: 'shapes', style: 'bay', who: 'woman', garment: 'dress', hair: 'bun', scarf: true,
      body: { height: 0.9, thick: 1.04, shoulders: 0.95, neck: 0.98 },
      colors: { skin: '#d9a985', hair: '#6a5240', top: '#8a6448', garment: '#8a6448', bottom: '#8a6448', shoes: '#3a2e26', accent: '#e2d6bc' } },
    // the Fisherman years on, under the water (the ending «Два огня»): the same man, his hair gone white — a scene gives
    // it as his `fisherman_wear` (the look's object, scene.kit.cast.characters.fisherman_old)
    fisherman_old: { kind: 'shapes', style: 'bay', who: 'man', garment: 'tunic', hair: 'short', barefoot: 'both',
      body: FISHER_BODY,
      colors: { skin: '#c4977a', hair: '#ebe8e1', top: '#e2d8c4', bottom: '#4f6372' } },
    // the girl who dances barefoot on the pier at the feast (1.3): fifteen or so, slight, a light linen dress, brown hair
    // long and loose, a red ribbon in it
    girl: { kind: 'shapes', style: 'bay', who: 'woman', garment: 'dress', hair: 'long', barefoot: 'both', parts: ['ribbon'],
      body: { height: 0.88, thick: 0.8, shoulders: 0.86, neck: 1.06 },
      colors: { skin: '#efcfb2', hair: '#6e4a2c', top: '#ece2cc', garment: '#ece2cc', bottom: '#ece2cc', accent: '#c4413a' } },
    // the widow of the bay (chapter 4): a woman worn thin, a dark shawl over her head, a plain grey-brown dress
    widow: { kind: 'shapes', style: 'bay', who: 'woman', garment: 'dress', hair: 'bun', hood: true,
      body: { height: 0.92, thick: 0.86, shoulders: 0.9, neck: 1.0 },
      colors: { skin: '#dcb196', hair: '#3e3029', top: '#4a4048', garment: '#3b3540', bottom: '#5c5248', shoes: '#2e2622' } },
    // her children, barefoot: the elder a girl of nine in a faded blue dress, the younger a boy of six in a shirt too big
    widow_girl: { kind: 'shapes', style: 'bay', who: 'child', garment: 'dress', hair: 'long', barefoot: 'both',
      body: { height: 0.74, head: 1.14, legs: 0.95, arms: 0.95, shoulders: 0.86, thick: 0.8 },
      colors: { skin: '#eccaa8', hair: '#8a6038', top: '#7d93a8', garment: '#7d93a8', bottom: '#7d93a8' } },
    widow_boy: { kind: 'shapes', style: 'bay', who: 'child', garment: 'tunic', hair: 'short', barefoot: 'both',
      body: { height: 0.65, head: 1.2, legs: 0.93, arms: 0.95, shoulders: 0.86, thick: 0.84 },
      colors: { skin: '#e6c09c', hair: '#9a7444', top: '#d8cfba', bottom: '#5d5a52' } },
    // the old beggar asleep on the bridge (3.7б): stooped, a ragged brown coat, a grey beard and grey hair
    beggar: { kind: 'shapes', style: 'bay', who: 'old', garment: 'coat', hair: 'short', parts: ['beard'],
      body: { height: 0.93, thick: 0.9, shoulders: 0.94, neck: 0.95 },
      colors: { skin: '#c99c7e', hair: '#b8b2a8', top: '#8a7d68', garment: '#5a4a3a', bottom: '#4a4038', shoes: '#2a2420' } },
    // the two musicians on the square at night (3.2): one with a fiddle, in a red waistcoat and a cap; one, younger, with
    // a reed pipe, in green
    musician_a: { kind: 'shapes', style: 'bay', who: 'man', garment: 'jacket', hair: 'short', hat: 'cap', parts: ['fiddle'],
      body: { height: 0.98, thick: 1.0, shoulders: 1.0, neck: 1.0 },
      colors: { skin: '#d8a882', hair: '#2e2620', top: '#e2d8c2', garment: '#8e3a30', bottom: '#3a3640', shoes: '#241e1c', hat: '#2a2428' } },
    musician_b: { kind: 'shapes', style: 'bay', who: 'man', garment: 'tunic', hair: 'short', parts: ['pipe'],
      body: { height: 0.95, thick: 0.86, shoulders: 0.96, neck: 1.04 },
      colors: { skin: '#e4b896', hair: '#5a3a24', top: '#6f8a5a', bottom: '#4a4a3c', shoes: '#2a2420' } },
  },
  shapes: {
    // the world's style: the engine's flat geometry — straight edges, clean colours under the scene's light — with a
    // simple face (eyes, brows, a mouth) so that faces read
    styles: { bay: { from: 'flat', name: 'The Bay', line: 0.8, face: 'simple' } },
    // a frock coat: fitted, its skirts to the knees, the sleeves of its cloth
    // a cassock: plain, close at the shoulders, its skirts straight down to the ankles, the sleeves of its cloth
    garments: {
      frockcoat: { name: 'frock coat', hang: [{ to: 0.95, from: 'shoulders', flare: 0.12 }], sleeves: 'garment' },
      cassock: { name: 'cassock', hang: [{ to: 1.38, from: 'shoulders', flare: 0.16 }], sleeves: 'garment' },
    },
    parts: {
      lantern: { name: 'lantern', draw: F => lantern(F, 'RightHand') },
      lantern_out: { name: 'lantern, put out', draw: F => lantern(F, 'RightHand', GLASS_OUT) },
      tambourine: { name: 'tambourine', draw: F => tambourine(F) },
      tail: { name: 'tail', draw: F => tail(F) },
      knife: { name: 'knife', draw: F => knife(F, STEEL) },
      knife_rusty: { name: 'rusty knife', draw: F => knife(F, RUST) },
      cup: { name: 'silver cup', draw: F => cup(F) },
      bag: { name: 'shoulder bag', draw: F => bag(F) },
      bread: { name: 'loaf', draw: F => bread(F) },
      ring: { name: 'ring', draw: F => ring(F) },
      tambourine_hand: { name: 'tambourine held up', draw: F => tambourineHand(F) },
      bundles: { name: 'bundles', draw: F => bundles(F) },
      beard: { name: 'beard', draw: F => beard(F) },
      ribbon: { name: 'ribbon', draw: F => ribbon(F) },
      fiddle: { name: 'fiddle', draw: F => fiddle(F) },
      pipe: { name: 'pipe', draw: F => pipe(F) },
    },
  },
};
