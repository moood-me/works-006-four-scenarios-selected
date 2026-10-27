// A pine of the outer islands: a crooked grey-brown trunk bent by the wind, flat dark crowns in tiers leaning one way
// (the layer `crown` sways about the trunk's top). Metres from its foot; about 9 m tall.
g.strokeStyle = '#6b5d52';
g.lineCap = 'round';
g.lineWidth = 0.34;
g.beginPath();
g.moveTo(0, 0.1);
g.bezierCurveTo(0.2, -2.5, -0.5, -4.5, 0.4, -6.2);
g.bezierCurveTo(0.9, -7.2, 1.3, -7.8, 1.6, -8.4);
g.stroke();
g.lineWidth = 0.12;
g.beginPath();
g.moveTo(0.1, -4.6);
g.lineTo(1.5, -5.4);
g.moveTo(0.3, -6.1);
g.lineTo(-1.1, -6.9);
g.stroke();
const tier = (c, x, y, w, h, color) => {
  c.fillStyle = color;
  c.beginPath();
  c.moveTo(x - w * 0.5, y);
  c.bezierCurveTo(x - w * 0.45, y - h * 0.9, x - w * 0.1, y - h, x + w * 0.15, y - h * 0.95);
  c.bezierCurveTo(x + w * 0.4, y - h * 0.9, x + w * 0.55, y - h * 0.4, x + w * 0.5, y);
  c.closePath();
  c.fill();
};
e.layer('crown', { pivot: [0.4, -6], wind: { strength: 0.12, gust: 0.4 } }, c => {
  tier(c, 1.6, -5.2, 2.6, 0.9, '#4d5a53');
  tier(c, -0.9, -6.6, 2.4, 0.9, '#4a564f');
  tier(c, 1.6, -7.9, 3.4, 1.3, '#56635b');
  tier(c, 0.5, -8.6, 2.2, 0.9, '#5d6a61');
});
