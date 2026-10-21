// The people of «The Fisherman and His Soul» as people in a scene (an element with "person"): figures of shapes in
// this world's style — the engine's flat geometry, plain quiet colours lit by the scene's own light (moon, lantern,
// the glow of the water), small simple faces that read at a distance. cast.md says who is who.
// The Soul is the Fisherman's own figure — the same body, the same face — in the colours of a shadow: cold, dark,
// no warmth in the skin.
const FISHER_BODY = { height: 1, thick: 0.9, shoulders: 1.02, neck: 1.05 };
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
  },
  shapes: {
    // the world's style: the engine's flat geometry — straight edges, clean colours under the scene's light — with a
    // simple face (eyes, brows, a mouth) so that faces read
    styles: { bay: { from: 'flat', name: 'The Bay', line: 0.8, face: 'simple' } },
  },
};
