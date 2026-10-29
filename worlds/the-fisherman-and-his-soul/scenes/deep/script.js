// The deep's mechanics: the Fisherman put at his named place (lib.PLACES) by `fisherman_at` — at once, as a cut puts
// him —, the two turned half toward each other, half toward the viewer, and looking at each other while both are here;
// `hands` — her hand in his while he sits beside her; `years` — his look years on (white hair); `mermaid_near` — she
// slides along the slab nearer him (М4: her seat moved). On opening, a place
// not yet put (`fisherman_placed`) is put there.
const L = scene.lib;
const both = () => scene.get('fisherman_here') !== false && scene.get('mermaid_here') !== false;
const put = () => {
  const keys = L.place(scene.get('fisherman_at'), scene.state);
  if (keys) for (const k in keys) scene.set(k, keys[k]);
};
// she turned to where he is now; each looking at the other while both are here
const face = () => {
  scene.set('mermaid_turn', L.turnOf('mermaid', 'sand', scene.state));
  const at = scene.get('fisherman_at');
  if (scene.get('fisherman_placed') === at && L.PLACES.fisherman[at]) {
    scene.set('fisherman_turn', L.turnOf('fisherman', at, scene.state));
  }
  scene.set('fisherman_look', both() ? 'mermaid' : null);
  scene.set('mermaid_look', both() ? 'fisherman' : null);
};
// her right hand in his left, while he sits beside her
const hands = () => {
  const on = scene.get('hands') === true && scene.get('fisherman_at') === 'sand' && both();
  scene.set('fisherman_reach', on ? { l: 'mermaid#hand_r' } : null);
  scene.set('mermaid_reach', on ? { r: 'fisherman#hand_l' } : null);
};
const years = () => scene.set('fisherman_wear', scene.get('years') === true ? scene.kit.cast.characters.fisherman_old : null);
scene.on('change', 'fisherman_at', () => { put(); face(); hands(); });
for (const key of ['fisherman_here', 'mermaid_here']) scene.on('change', key, () => { face(); hands(); });
scene.on('change', 'hands', hands);
scene.on('change', 'years', years);
if (scene.get('fisherman_placed') !== scene.get('fisherman_at')) { put(); face(); }
hands();
years();
// she slides along the slab toward him: her seat from its right (0) to beside him (1)
const near = () => {
  const u = Math.min(1, Math.max(0, Number(scene.get('mermaid_near')) || 0));
  scene.set('mermaid_on', [0.58 - 0.5 * u, 4.22, 0.4]);
};
scene.on('change', 'mermaid_near', near);
scene.on('move', 'mermaid_near', near);
near();
// The pieces (lib.film, played by `beat` through the world's `beats`)
scene.kit.beats.play(scene, L.film(scene));
