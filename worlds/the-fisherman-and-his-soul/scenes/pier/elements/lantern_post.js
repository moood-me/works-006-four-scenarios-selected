// The lantern post at the pier's end: a tall pole from the bay's floor (its foot, 0) up 2.2 m over the deck, an arm
// out over the boards with a hook, and the Fisherman's lantern hanging from it — a layer that swings a little in the
// breeze (animate). Its flame is the scene's light "lantern"
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
e.layer('lantern', { pivot: [-0.44, -4.64], box: [-0.6, -4.66, -0.28, -4.1] }, g => {
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
