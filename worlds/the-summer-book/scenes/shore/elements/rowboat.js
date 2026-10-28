// Eriksson's boat: an old clinker rowing boat from the far skerries, tarred dark, a grey rubbing strake, the oars
// shipped along the thwarts, a fish box in the stern; seen side-on, bow to the left (the way he comes in). It rides
// the water (the layer `hull`, rocked by animate). Metres from the middle of its waterline; 4.2 m long. Points: `seat`
// (the middle thwart, where he sits), `gunwale` (the near gunwale by the bow: where hands hold it from the pier).
e.layer('hull', { pivot: [0, 0] }, c => {
  c.fillStyle = '#4a4440';
  c.beginPath();
  c.moveTo(-2.15, -0.8);
  c.bezierCurveTo(-1.9, -0.3, -1.4, 0.1, -0.6, 0.13);
  c.lineTo(1.4, 0.13);
  c.bezierCurveTo(1.8, 0.05, 2.0, -0.3, 2.05, -0.62);
  c.lineTo(-2.15, -0.8);
  c.closePath();
  c.fill();
  c.strokeStyle = 'rgba(150,140,128,0.45)';
  c.lineWidth = 0.02;
  for (let k = 1; k < 4; k++) {
    c.beginPath();
    c.moveTo(-2.1 + k * 0.12, -0.78 + k * 0.2);
    c.bezierCurveTo(-1, -0.74 + k * 0.2, 1, -0.64 + k * 0.18, 2 - k * 0.06, -0.6 + k * 0.17);
    c.stroke();
  }
  c.fillStyle = '#8c8a84';
  c.beginPath();
  c.moveTo(-2.18, -0.84);
  c.lineTo(2.08, -0.66);
  c.lineTo(2.05, -0.57);
  c.lineTo(-2.14, -0.74);
  c.closePath();
  c.fill();
  // the oars shipped, their blades over the stern, and the fish box
  c.strokeStyle = '#9c8564';
  c.lineWidth = 0.045;
  c.beginPath();
  c.moveTo(-1.2, -0.86);
  c.lineTo(2.5, -0.74);
  c.stroke();
  c.fillStyle = '#9c8564';
  c.fillRect(2.2, -0.79, 0.5, 0.1);
  c.fillStyle = '#7d6a52';
  c.fillRect(1.15, -0.98, 0.55, 0.26);
  e.at(-0.2, -0.75, 'seat');
  e.at(-1.4, -0.82, 'gunwale');
});
