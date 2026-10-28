// The forest's mechanics, all from the state (a scene opened again goes on as it was): the island's weather (the
// thick fog's look); the people at their places (`<id>_at`: lib.PLACES, put by the island's `places`); Grandmother's
// lantern alight in her hand (`lamp_lit`: while she carries it, swinging dimmer as `lantern_sway` says), the match
// and the cigarette's smoke (`match_lit`, `smoking`: while she has them); the stones minigame's `step` walking the two
// along the path and its `grab` (Sophia catching her skirt); the pieces (lib.FILM, the module beats).
const L = scene.lib;
const isle = scene.kit.isle;
isle.weather(scene);
isle.places(scene, L.PLACES);

// Grandmother's lantern: alight while it is in her hand, its light wavering as the minigame swings it; the struck match
// and the cigarette's smoke while she has them (the cast's parts: the lights at their points)
const lamp = () => {
  const has = scene.get('grandma_with') ?? [];
  scene.set('lamp_lit', has.includes('lantern') ? 1 - 0.4 * (scene.get('lantern_sway') ?? 0) : 0);
  scene.set('match_lit', has.includes('match') ? 1 : 0);
  scene.set('smoking', has.includes('cigarette') ? 1 : 0);
};
scene.on('change', 'grandma_with', lamp);
scene.on('change', 'lantern_sway', lamp);
scene.on('move', 'lantern_sway', lamp);
lamp();

// the stones minigame (night_path): `step` 1…3 walks the two along the path to that stone, each at their pace, by the
// stones between; on Grandmother's arrival `step:stone<n>` is told. `grab`: Sophia's hand on her skirt
const ids = ['grandma', 'sophia'];
scene.on('change', 'step', async v => {
  if (scene.get('beat') !== 'night_path') return;
  const n = Math.max(1, Math.min(3, Math.round(+v || 0)));
  const from = Math.max(1, Math.min(3, Number(String(scene.get('grandma_at')).replace('path', '')) || 1));
  const ways = ids.map(id => [1, 2, 3].slice(Math.min(from, n), n).map(k => L.PLACES[id][`path${k}`].at));
  const walks = ids.map((id, i) => (ways[i].length ? scene.person(id).walk(ways[i]) : null));
  const went = await walks[0];
  if (went && went !== 'done') return;
  for (const id of ids) {
    const p = L.PLACES[id][`path${n}`];
    scene.person(id).turn(p.turn);
    scene.set(`${id}_placed`, `path${n}`);
    scene.set(`${id}_at`, `path${n}`);
  }
  scene.tell(`step:stone${n}`);
});
const grab = () => scene.person('sophia').reach(scene.get('grab') ? { l: 'grandma#hips' } : null);
scene.on('change', 'grab', grab);

scene.kit.beats.play(scene, L.FILM);
