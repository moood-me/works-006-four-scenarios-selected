// The sea's mechanics.
// - The island stands where `island` says (lib.js ISLAND_AT): far out of sight, ahead, astern — put at once.
// - What follows behind comes nearer with `trail`: the Groke swims at the strip's near end (her place).
// - The lantern: burning on the bow, in Papa's paw, in the son's paws, or out (`lantern_at`) — the three lights read the
//   shares worked out here (`lantern_bow_on`, `lantern_papa_on`, `lantern_troll_on`).
// - The boat's nose off the star (`heading`) turns her; the swell (`wave` its height) lifts and drops her bow, slowly.
// - The island's lightning (a storm over a half) and its beam.
// - The pieces, as the game names them (`beat`; lib.FILM, the module beats).
const L = scene.lib;
function island() {
  scene.set('isle_d', L.ISLAND_AT[scene.get('island')] ?? L.ISLAND_AT.none);
}
function trail() {
  scene.set('groke_a', L.GROKE_ACROSS);
  scene.set('groke_d', L.trailNear(Math.max(-1.5, Math.min(1, scene.get('trail') ?? 0))));
}
function lantern() {
  const at = scene.get('lantern_at') ?? 'bow';
  scene.set('lantern_bow_on', at === 'bow' ? 1 : 0);
  scene.set('lantern_papa_on', at === 'papa' ? 1 : 0);
  scene.set('lantern_troll_on', at === 'troll' ? 1 : 0);
}
function heading() {
  scene.set('boat_facing', 180 + 9 * Math.max(-1, Math.min(1, scene.get('heading') ?? 0)));
}
island();
trail();
lantern();
heading();
scene.on('change', 'island', island);
scene.on('change', 'trail', trail);
scene.on('move', 'trail', trail);
scene.on('change', 'lantern_at', lantern);
scene.on('change', 'heading', heading);
scene.on('move', 'heading', heading);
// the swell: every few seconds the bow goes up or down a little, more as the waves are higher
let up = 1;
scene.every(2.6, () => {
  up = -up;
  const amp = 0.8 + 4 * Math.max(0, Math.min(1, scene.get('wave') ?? 0));
  scene.move('boat_pitch', up * amp, { over: 2.6, ease: 'inOut' });
});
scene.kit.island.lightning(scene);
scene.kit.island.beam(scene);
scene.kit.beats.play(scene, L.FILM);
