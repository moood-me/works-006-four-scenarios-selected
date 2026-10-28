// The cape's mechanics: the storm's lightning and the beam (the island's); the Fisherman's net in his hands unless it
// is folded (`net`: his look's net taken off by `fisher_wear`, the folded roll is the element `net`); the people at their places (`<id>_at`: lib.PLACES, put by the island's `places`); Papa along the
// way over the rocks by the minigames' keys — `cross` (0…3: at each hold, the storm) and `carry` (0…1: the pie, the
// bread); the pieces (lib.FILM, the module beats).
const L = scene.lib;
scene.kit.island.lightning(scene);
scene.kit.island.beam(scene);
function net() {
  scene.set('fisher_wear', (scene.get('net') ?? 'dry') === 'folded' ? { parts: [] } : null);
}
scene.on('change', 'net', net);
net();
scene.kit.island.places(scene, L.PLACES);
// Papa along the way, walking at his gait (lantern_walk, carry_walk — the piece's): `u` 0…4 (way0 before the first
// hold … way4 by him), to where the minigame's key goes, only while a piece of the way plays
const along = u => {
  const k = Math.max(0, Math.min(L.WAY.length - 2, Math.floor(u))), f = Math.max(0, Math.min(1, u - k)), [a0, d0] = L.WAY[k], [a1, d1] = L.WAY[k + 1];
  scene.person('papa').walk([[a0 + (a1 - a0) * f, d0 + (d1 - d0) * f]]);
};
const onWay = () => ['crossing', 'pie_way', 'bread_way'].includes(scene.get('beat'));
scene.on('change', 'cross', v => onWay() && along(+v || 0));
scene.on('change', 'carry', v => onWay() && along(4 * (+v || 0)));
// the knot minigame's pull shown in the close-up while Papa works the knot (net_sit, net_left)
const pull = () => ['net_sit', 'net_left'].includes(scene.get('beat')) && scene.set('knot_pull', scene.get('knot') ?? 0);
scene.on('change', 'knot', pull);
scene.on('move', 'knot', pull);
// what Papa carries over the stones tips as the carry minigame's `carry_tilt` (−1 … 1) says: his paws uneven before
// his chest, the pie or the bread tilting with them; level again (the motion's own hands) when it is 0
const tilt = () => {
  const t = scene.get('carry_tilt') ?? 0;
  if (!onWay() || Math.abs(t) < 0.02) return scene.set('papa_reach', null);
  const a = scene.get('papa_a'), d = scene.get('papa_d'), f = ((scene.get('papa_turn') ?? 280) * Math.PI) / 180;
  const fx = Math.sin(f), fz = Math.cos(f), cx = a + fx * 0.28, cz = d + fz * 0.28, h = 0.55;
  scene.set('papa_reach', { r: [cx + fz * 0.14, cz - fx * 0.14, h - 0.12 * t], l: [cx - fz * 0.14, cz + fx * 0.14, h + 0.12 * t] });
};
scene.on('change', 'carry_tilt', tilt);
scene.on('move', 'carry_tilt', tilt);
scene.kit.beats.play(scene, L.FILM);
