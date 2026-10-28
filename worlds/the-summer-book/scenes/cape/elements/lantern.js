// The candle lantern Papa brought, set at the back of the tent (there while the tent stands): a tin frame, four glass
// sides, a candle in it (the layer `flame` and its light, faded by `candle` in animate). Metres from its foot; 0.3 m
// tall.
e.light(0, -0.145, 0.06, '#ffd08a', 1, 'flame');
e.at(0, -0.15);
if (!e.lib.tentShown(e.state, 'up')) return;
g.fillStyle = '#5b5f62';
g.fillRect(-0.075, -0.03, 0.15, 0.03);
g.fillRect(-0.075, -0.25, 0.15, 0.025);
g.beginPath();
g.moveTo(-0.06, -0.25);
g.lineTo(0, -0.3);
g.lineTo(0.06, -0.25);
g.closePath();
g.fill();
g.strokeStyle = '#5b5f62';
g.lineWidth = 0.008;
g.beginPath();
g.arc(0, -0.31, 0.025, Math.PI, 0);
g.stroke();
g.fillStyle = 'rgba(200,210,214,0.35)';
g.fillRect(-0.065, -0.225, 0.13, 0.195);
g.fillStyle = '#5b5f62';
for (const x of [-0.075, 0.065]) g.fillRect(x, -0.25, 0.01, 0.22);
g.fillStyle = '#efe8d8';
g.fillRect(-0.016, -0.12, 0.032, 0.09);
e.layer('flame', {}, c => {
  c.fillStyle = '#ffe2a0';
  c.beginPath();
  c.ellipse(0, -0.145, 0.012, 0.025, 0, 0, 6.2832);
  c.fill();
});
