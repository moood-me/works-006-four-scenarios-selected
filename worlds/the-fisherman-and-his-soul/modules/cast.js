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
// the Fisherman's lantern hanging from a hand by its bail, swinging a little late as the hand moves: a dark iron cap and
// foot, the glass between them glowing (tone 2); the flame is the person's point `flame` — the scene's light shines
// from it ("at": "<id>#flame")
function lantern(F, hand) {
  const { add, sub, mul, dot, cross, unit } = V();
  const m = F.fit.h;
  const h = F.P(hand);
  const mid = F.swing('lantern', add(h, [0, -0.2 * m, 0]), 60);
  const up = unit(sub(h, mid));
  const fwd = unit(sub(F.fwd('Hips'), mul(up, dot(F.fwd('Hips'), up))));
  const axes = [cross(up, fwd), up, fwd];
  F.bar(add(mid, mul(up, 0.1 * m)), h, 0.005 * m, 0.005 * m, [[0, IRON]], 5, fwd);
  F.ball(add(mid, mul(up, 0.085 * m)), axes, [0.05 * m, 0.022 * m, 0.05 * m], IRON, 8, 2.4);
  F.ball(mid, axes, [0.04 * m, 0.065 * m, 0.04 * m], FLAME, 8, 2.4);
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
  },
  shapes: {
    // the world's style: the engine's flat geometry — straight edges, clean colours under the scene's light — with a
    // simple face (eyes, brows, a mouth) so that faces read
    styles: { bay: { from: 'flat', name: 'The Bay', line: 0.8, face: 'simple' } },
    parts: {
      lantern: { name: 'lantern', draw: F => lantern(F, 'RightHand') },
      tambourine: { name: 'tambourine', draw: F => tambourine(F) },
    },
  },
};
