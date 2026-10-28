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
