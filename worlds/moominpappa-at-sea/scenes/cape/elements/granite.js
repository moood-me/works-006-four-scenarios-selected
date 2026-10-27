// The island's granite (modules/island) over the cape and the island's back: the plane's centre at across 10, distance
// 35; a big plane, so its detail is thickest near the viewer and its cracks finer; tufts of the dry grass are the
// element `grass`. The rocks Papa holds on to in the storm are knobs of the land (lib HOLDS): their tops are
// `granite#hold1…3`.
e.kit.island.granite(g, e, { points: e.lib.HOLDS.map(([a, d], i) => [a, d, `hold${i + 1}`]), centre: [10, 35], size: [100, 92], marks: [90, 1100, 320, 140], near: [0.5, 0.15, 0.45, 0.4], crack: [0.018, 0.03, 0.5, 0.55, -0.9, 0.4], pools: [[2.4, 2.6, 0.45, 0.26, 0.3], [-5.6, 11.5, 0.55, 0.3, -0.2], [21, 34, 0.6, 0.3, 0.4], [3.6, 6.4, 0.3, 0.18, 0]] });
