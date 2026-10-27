// The beach's mechanics: the island's lightning and beam; the pieces (lib.js `film`), played by `beat` through the
// world's `beats`; and what the minigames move. Opened without a piece, the people stand where the play's keys say
// (groke_at, troll_at): the Groke facing the lantern on the stone while it is there, else the lighthouse; the son
// facing her (beside her, as she faces), the blanket by him.
scene.kit.island.lightning(scene);
scene.kit.island.beam(scene);
const L = scene.lib;
if (!scene.get('beat')) {
  const [ga, gd] = L.SEATS[scene.get('groke_at')] ?? L.SEATS.edge;
  const to = scene.get('lantern_stone') !== 'none' ? L.STONE : L.LIGHTHOUSE, gt = L.turnTo(ga, gd, to[0], to[1]);
  const beside = scene.get('troll_at') === 'beside';
  const [ta, td] = beside ? [ga + L.BESIDE[0], gd + L.BESIDE[1]] : L.TROLL[scene.get('troll_at')] ?? L.TROLL.near;
  const tt = beside ? gt : L.turnTo(ta, td, ga, gd), b = L.BLANKET([ta, td]);
  for (const [k, v] of [['groke_a', ga], ['groke_d', gd], ['groke_turn', gt], ['troll_a', ta], ['troll_d', td], ['troll_turn', tt],
    ['blanket_a', b.blanket_a], ['blanket_d', b.blanket_d], ['seahorses_away', scene.get('seahorses') === 'gone' ? 1 : 0]]) scene.set(k, v);
}
scene.kit.beats.play(scene, L.film(scene));
// «Следом» (follow, follow_at 0…1): the son down the dune's path to the stone, as far as `follow`; Papa down after him
// from over the dune, as far as `follow_at` — each walks there at his own pace as the minigame moves them
// (each a walk at the person's own gait to where the act now says: a new one replaces the one going)
const put = (id, p) => scene.person(id).walk([p]);
const follow = () => put('troll', L.along(L.DOWN, scene.get('follow')));
const followAt = () => put('papa', L.along(L.PAPA_DOWN.slice(0, 2), scene.get('follow_at')));
// «Рядом» (walk 0…1, walk_at −1…1): the two up the way onto the dune's top, the son as far as `walk`, Papa beside him
// on his right, as far ahead (+) or behind (−) of him as `walk_at` says (a metre at the most)
const walk = () => {
  const u = scene.get('walk'), [a, d] = L.along(L.UP, u), [a2, d2] = L.along(L.UP, Math.min(1, u + 0.05));
  const l = Math.hypot(a2 - a, d2 - d) || 1, fa = (a2 - a) / l, fd = (d2 - d) / l, k = scene.get('walk_at');
  put('troll', [a, d]);
  put('papa', [a + fa * k + fd * 0.6, d + fd * k - fa * 0.6]);
};
for (const [key, fn] of [['follow', follow], ['follow_at', followAt], ['walk', walk], ['walk_at', walk]]) {
  scene.on('change', key, () => fn());
  scene.on('move', key, () => fn());
}
