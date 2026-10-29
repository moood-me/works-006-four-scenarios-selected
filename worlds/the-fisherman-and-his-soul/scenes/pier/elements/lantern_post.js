// The lantern post at the pier's end: a tall pole from the bay's floor (its foot, 0) up 2.2 m over the deck, an arm
// out over the boards with a hook, and the Fisherman's lantern hanging from it — a layer that swings a little in the
// breeze (animate) — while it hangs there (`lantern_at` post; boards — set down on the boards, lantern_boards; none — the
// hook empty: someone carries it). Its flame is the scene's light "lantern". The Witch's knife driven into the post at
// chest height over the boards (`knife` post): its green snakeskin handle out of the post's left side, rusty with
// `rust` (point `knife`); the post's hand-hold over the water where one holds it from the water (point `grip`)
g.fillStyle = '#4f4034';
g.fillRect(-0.07, -4.75, 0.14, 4.75);
g.fillStyle = '#3a2f27';
g.fillRect(-0.07, -2.3, 0.14, 2.3);
g.fillStyle = 'rgba(30, 24, 20, 0.45)';
g.fillRect(0.025, -4.75, 0.045, 4.75);
// the arm and its brace
g.fillStyle = '#4f4034';
g.fillRect(-0.5, -4.7, 0.5, 0.06);
g.strokeStyle = '#4f4034';
g.lineWidth = 0.035;
g.beginPath();
g.moveTo(-0.02, -4.35);
g.lineTo(-0.3, -4.66);
g.stroke();
if (e.state.knife === 'post') {
  // the handle out of the post at 1.3 m over the boards (the boards at 2.55 over the post's foot), the blade's back
  g.fillStyle = e.state.rust ? '#7a4a30' : '#b8bcc2';
  g.fillRect(-0.12, -3.87, 0.06, 0.025);
  g.fillStyle = '#4c7448';
  g.fillRect(-0.24, -3.885, 0.13, 0.04);
  g.fillStyle = 'rgba(30, 50, 30, 0.6)';
  for (let i = 0; i < 4; i++) g.fillRect(-0.235 + 0.03 * i, -3.885, 0.01, 0.04);
  e.at(-0.18, -3.865, 'knife');
}
// where a hand holds the post from the water (М9: he in the water by the pier's end, his hand on it)
e.at(-0.06, -2.3, 'grip');
if ((e.state.lantern_at ?? 'post') === 'post') e.layer('lantern', { pivot: [-0.44, -4.64], box: [-0.6, -4.66, -0.28, -4.1] }, g => {
  // the hook and the ring, the cap, the glass in its frame, the foot
  g.strokeStyle = '#2a2420';
  g.lineWidth = 0.014;
  g.beginPath();
  g.moveTo(-0.44, -4.64);
  g.lineTo(-0.44, -4.5);
  g.stroke();
  g.fillStyle = '#2f2a26';
  g.beginPath();
  g.moveTo(-0.44, -4.52);
  g.lineTo(-0.36, -4.45);
  g.lineTo(-0.52, -4.45);
  g.closePath();
  g.fill();
  g.fillStyle = '#ffe2a8';
  g.fillRect(-0.505, -4.45, 0.13, 0.2);
  g.fillStyle = '#2f2a26';
  for (const x of [-0.505, -0.443, -0.385]) g.fillRect(x, -4.45, 0.012, 0.2);
  g.fillRect(-0.52, -4.25, 0.16, 0.035);
  e.light(-0.44, -4.35, 0.14, '#ffc574', 1.2, 'flame');
});

