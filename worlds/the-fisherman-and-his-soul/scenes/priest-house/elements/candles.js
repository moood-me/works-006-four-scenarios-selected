// A candle on the altar (0.55 m at scale 1): a brass stick with its drip-pan, a tall white candle, and its flame — a
// layer that flickers; its glow is the candle's light (lights "candles", every copy's own)
g.fillStyle = '#b08a48';
g.fillRect(-0.06, -0.012, 0.12, 0.012);
g.fillRect(-0.014, -0.11, 0.028, 0.1);
g.fillRect(-0.045, -0.125, 0.09, 0.016);
g.fillStyle = '#f4efe0';
g.fillRect(-0.018, -0.44, 0.036, 0.315);
g.fillStyle = 'rgba(200, 190, 170, 0.5)';
g.fillRect(0.008, -0.44, 0.01, 0.315);
g.fillStyle = '#2b2622';
g.fillRect(-0.002, -0.46, 0.004, 0.02);
e.layer('flame', { flicker: 0.35, blend: 'add', box: [-0.04, -0.54, 0.04, -0.44] }, g => {
  g.fillStyle = '#ffd88a';
  g.beginPath();
  g.moveTo(0, -0.535);
  g.quadraticCurveTo(0.022, -0.48, 0, -0.448);
  g.quadraticCurveTo(-0.022, -0.48, 0, -0.535);
  g.fill();
  e.light(0, -0.485, 0.035, '#ffcf7a', 1.3, 'flame');
});
