// A copper falling from the beggar's bowl over the parapet into the river (`copper`): a small coin, a layer its animate
// drops from the coping down to the water — nothing else of it. Metres, the water's surface below at y 0, the coping at
// −2.3
e.layer('coin', { box: [-0.06, -2.4, 0.06, 0.05] }, g => {
  g.fillStyle = '#c98f4c';
  g.beginPath();
  g.ellipse(0, -2.8, 0.03, 0.03, 0, 0, Math.PI * 2);
  g.fill();
});
