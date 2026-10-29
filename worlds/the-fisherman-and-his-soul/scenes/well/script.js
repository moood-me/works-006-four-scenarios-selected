// The well's mechanics: the hour (hours.md: `time` sets the looks' numbers at once); the dance round the well — while
// `round` is set the Fisherman and the Witch go round it on a circle, on its opposite sides, each turned to the other
// across it (lib.ROUND), the Witch off the rim; `stumble` (a pulse 1 → 0) throws him a step out of the circle and back
const L = scene.lib;
scene.kit.hours.follow(scene, 'time', L.TIME);
const R = L.ROUND;
// where the two are on the circle at its angle (radians, the Fisherman's; she across from him), turned to each other
const put = () => {
  const a = Number(scene.get('round_angle')) || 0;
  const out = 0.3 * (Number(scene.get('stumble')) || 0);
  const f = R.r + out, w = R.r;
  scene.set('fisherman_a', R.at[0] + f * Math.sin(a));
  scene.set('fisherman_d', R.at[1] - f * Math.cos(a));
  scene.set('witch_a', R.at[0] - w * Math.sin(a));
  scene.set('witch_d', R.at[1] + w * Math.cos(a));
  const deg = a * 180 / Math.PI;
  scene.set('fisherman_turn', (((-deg) % 360) + 360) % 360);
  scene.set('witch_turn', (((180 - deg) % 360) + 360) % 360);
};
// going round: a lap in R.lap seconds, on and on while `round` holds (a step of the clock at a time)
const step = () => {
  if (!scene.get('round')) return;
  scene.move('round_angle', (Number(scene.get('round_angle')) || 0) + (2 * Math.PI) / R.steps, { over: R.lap / R.steps, ease: 'linear' });
};
const start = () => {
  scene.set('witch_on', null);
  put();
  step();
};
scene.every(R.lap / R.steps, step);
scene.on('change', 'round', v => { if (v) start(); });
const dancing = () => { if (scene.get('round')) put(); };
scene.on('move', 'round_angle', dancing);
scene.on('change', 'round_angle', dancing);
scene.on('move', 'stumble', dancing);
scene.on('change', 'stumble', dancing);
if (scene.get('round')) start();
// The pieces (lib.film, played by `beat` through the world's `beats`)
scene.kit.beats.play(scene, L.film(scene));
