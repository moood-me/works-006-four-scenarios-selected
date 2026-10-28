// The sea's mechanics, all from the state: the island's weather (and the sea's mirror); the people at their places in
// the boat; the boat out from the island by `island` (its distance); its pitch on the swell by `sway`; the pieces
// (lib.film, played by `beat` through the world's `beats`).
const L = scene.lib;
const isle = scene.kit.isle;
isle.weather(scene, L.MIRROR);
isle.places(scene, L.PLACES);
const out = () => scene.set('boat_d', 6.6 - 360 * (scene.get('island') ?? 0));
scene.on('change', 'island', out);
scene.on('move', 'island', out);
out();
// the swell: the bow up and down, slowly, never quite in time; harder with `sway`
let up = 1;
const swell = () => {
  const k = 0.6 + 4.4 * (scene.get('sway') ?? 0);
  up = -up;
  scene.move('boat_pitch', up * k * (0.8 + 0.4 * scene.random()), { over: 2.4, ease: 'inOut' });
};
scene.every(2.4, swell);
swell();
scene.kit.beats.play(scene, L.film(scene));
// М11 «Сидеть прямо»: Grandmother's body following the mini-game's arrow (`lean`, −1 left … 1 right): turned that way,
// her hands out to the other side to the gunwale and the thwart
scene.on('move', 'lean', () => lean());
scene.on('change', 'lean', () => lean());
function lean() {
  const u = scene.get('lean') ?? 0;
  scene.set('grandma_turn', 180 + 14 * u);
  const a = scene.get('grandma_a') ?? 0;
  const d = scene.get('grandma_d') ?? 0;
  scene.set('grandma_reach', Math.abs(u) > 0.15 ? { r: [a + 0.5 - 0.3 * u, d - 0.4, 0.45], l: [a - 0.5 - 0.3 * u, d - 0.4, 0.45] } : null);
}
