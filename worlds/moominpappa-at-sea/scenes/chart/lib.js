// «The chart» — the play's map: Papa's sea chart (the world's module `chart`) hung SHEET metres off as one card, K metres
// a unit of the chart; the eye 1.7 m over the ground and the frame's horizon at 0.865 (scene.json), so the frame's foot
// is the sheet's foot and its top the sheet's top. The chapters' points stand POINTS metres off, in a row at the
// frame's 0.28 (the game's trees hang from them), 5.6 m apart, each over its part of the chart: the prologue over the
// valley, I off its coast, II mid-sea, III nearing the island, IV by the island on the chart, the epilogue and the
// finale over the island's plan — the first and the last half a 21:9 frame (29.4 m wide at the sheet) in from the
// sheet's ends, so a camera on any chapter sees only paper on any screen. The author's inland in the valley.
const K = 0.45, SHEET = 12.6, POINTS = 12;
const W = kit.chart.W * K, TALL = kit.chart.H * K;
const CHAPTERS = [32.7, 45.1, 57.6, 70, 82.4, 94.9, 107.3].map(x => x * K);
const AUTHOR = 9;
const ROW_UP = 1.7 + (0.865 - 0.28) * POINTS;
return { K, SHEET, POINTS, W, TALL, CHAPTERS, AUTHOR, ROW_UP };
