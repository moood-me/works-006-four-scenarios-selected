// The island's granite (modules/island) over this land: the plane's centre at across 2, distance 17.5; a few rain
// pools in the hollows of the slab and the long back; the marks of the play on it (the cleft, the rime).
e.kit.island.granite(g, e, { centre: [2, 17.5], size: [64, 66], pools: [[2.6, 7.5, 0.5, 0.3, 0.3], [3.4, 12.5, 0.7, 0.35, -0.2], [6.6, 21.5, 0.45, 0.25, 0.5], [-2.3, 9.8, 0.35, 0.22, 0]] });
// the marks the game's keys put on it: the cleft, the rime (lib.marks)
e.lib.marks(g, e, (a, d) => [a - 2, 17.5 - d]);
