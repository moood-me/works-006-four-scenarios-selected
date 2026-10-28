// The last present: a small dead bird on the basket's lid at the cat's paws (`cat_bird`; Sophia drops it overboard).
// Metres from the middle of its foot; 0.18 m long.
if (!e.state.cat_bird) return;
g.fillStyle = '#7a6a58';
g.beginPath();
g.ellipse(0, -0.035, 0.08, 0.035, 0.1, 0, 6.2832);
g.fill();
g.fillStyle = '#5c4f42';
g.beginPath();
g.arc(0.075, -0.045, 0.022, 0, 6.2832);
g.fill();
g.fillStyle = '#c9b48e';
g.beginPath();
g.moveTo(0.095, -0.05);
g.lineTo(0.118, -0.045);
g.lineTo(0.095, -0.04);
g.fill();
