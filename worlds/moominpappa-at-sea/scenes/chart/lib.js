// «The chart» — the play's map: Papa's sea chart (the world's module `chart`) hung SHEET metres off as one card, K metres
// a unit of the chart; the eye 1.7 m over the ground and the frame's horizon at 0.865 (scene.json), so the frame's foot
// is the sheet's foot and its top the sheet's top. The chapters' points stand POINTS metres off, in a row at the
// frame's 0.28 (the game's trees hang from them), each over its part of the chart: the prologue over the valley, I over
// the open sea, II–IV over the island and its plan, the epilogue and then the finale at the plan's far side; the author's at the sheet's
// left edge.
const K = 0.45, SHEET = 12.6, POINTS = 12;
const W = kit.chart.W * K, TALL = kit.chart.H * K;
const CHAPTERS = [8, 32, 49, 61, 73, 85, 97].map(x => x * K);
const AUTHOR = 0.4;
const ROW_UP = 1.7 + (0.865 - 0.28) * POINTS;
return { K, SHEET, POINTS, W, TALL, CHAPTERS, AUTHOR, ROW_UP };
