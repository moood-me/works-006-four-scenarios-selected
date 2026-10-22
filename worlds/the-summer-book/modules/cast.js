// The people of «The Summer Book» as the engine's people: who they are — figures of shapes in this world's style, plain
// straight-edged shapes in quiet colours lit by the scene's own light — and how they move (the motions in
// cast.data.json). cast.md says who is who. A part's lengths are a man's metres times F.fit.h (the person's height as a
// share of a man's 1.76 m).
const V = () => MooodShapes.V;
const ENAMEL = [0.9, 0.89, 0.85, 1];
const RIM = [0.24, 0.3, 0.42, 1];
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
          { to: 0.4, from: 'shoulders', flare: 0.22, color: 'accent', folds: false },
        ],
        sleeves: 'garment', bare: true, bodice: true,
      },
      // a child's short frock: to the knee, bare arms, bare legs below it
      frock: { name: 'little frock', hang: [{ to: 1.05, from: 'waist', flare: 0.4, off: 0.94 }], short: true, bare: true, bodice: true },
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
    },
  },
};
