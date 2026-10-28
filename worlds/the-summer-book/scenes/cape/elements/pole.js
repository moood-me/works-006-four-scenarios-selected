// The tent going up (`tent: pole`): the front pole stood upright, the canvas hanging slack from its top and lying in
// folds on the rock about its foot (painted only in that state; the slack canvas stirs in the wind). Metres from the pole's foot. Its points: `grip` (where hands hold the pole), `top`.
if (e.lib.tentShown(e.state, 'pole')) e.layer('pole', { pivot: [0, 0], wind: { strength: 0.04, gust: 0.6 } }, c => {
  // the canvas, slack: hanging from the top, spread out on the rock
  c.fillStyle = '#ddd5c2';
  c.beginPath();
  c.moveTo(0, -1.2);
  c.bezierCurveTo(-0.25, -0.9, -0.55, -0.3, -0.85, 0.02);
  c.lineTo(0.85, 0.02);
  c.bezierCurveTo(0.6, -0.25, 0.3, -0.85, 0, -1.2);
  c.closePath();
  c.fill();
  c.strokeStyle = 'rgba(150,140,120,0.55)';
  c.lineWidth = 0.014;
  for (const s of [-1, 1]) {
    c.beginPath();
    c.moveTo(0, -1.15);
    c.quadraticCurveTo(s * 0.22, -0.55, s * 0.5, 0.0);
    c.stroke();
  }
  c.fillStyle = '#cfc6b1';
  c.beginPath();
  c.ellipse(-0.45, -0.03, 0.38, 0.06, 0, 0, 6.2832);
  c.ellipse(0.5, -0.03, 0.32, 0.05, 0, 0, 6.2832);
  c.fill();
  // the pole
  c.fillStyle = '#8b7558';
  c.fillRect(-0.018, -1.24, 0.036, 1.26);
});
e.at(0, -0.75, 'grip');
e.at(0, -1.2, 'top');
