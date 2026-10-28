// «The Map» — the play's map: the island as Papa drew it, in ink and watercolour on a long sheet of paper (he draws for
// books), hung SHEET metres off as one card; the eye 1.7 m over the ground and the frame's horizon at 0.865
// (scene.json), so the frame's foot is the sheet's foot and its top the sheet's top. The chapters' points stand POINTS
// metres off, in a row at the frame's 0.28 (the game's trees hang from them), STEP metres apart, each over its part of
// the drawing: the prologue over the house and the pier, I over the magic forest, II over the calm bay, III over the
// new house on the far side (the storm's cloud above it), IV over the cape and its tent, the epilogue over the big boat
// going out into the fog — the first and the last half a 21:9 frame (14.7 m wide at the sheet) in from the sheet's
// ends, so a camera on any chapter sees only paper on any screen. The author's sign over the sea on the left, by the
// drawing's title. Sheet metres: u across from the sheet's left end, v down from its top.
const SHEET = 12.6;
const POINTS = 12;
const HALF = (SHEET * 7) / 3 / 2;
const STEP = 5.6;
const CHAPTERS = [0, 1, 2, 3, 4, 5].map(i => HALF + STEP * i);
const W = CHAPTERS[5] + HALF;
const AUTHOR = 8.5;
// (a point at the frame's 0.28 from the top, POINTS metres off: its height over the ground)
const ROW_UP = 1.7 + (0.865 - 0.28) * POINTS;
return { SHEET, POINTS, HALF, STEP, CHAPTERS, W, AUTHOR, ROW_UP };
