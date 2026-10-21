// The Mermaid's tail behind her, against the stone: a silver-green fluke risen out of the water, curving over — a layer that rocks
// slowly on its root (animate). Origin at the water where it comes out
e.layer('fluke', { pivot: [0, 0], box: [-0.6, -0.75, 0.35, 0.04] }, g => {
  g.fillStyle = '#8fb9b2';
  g.beginPath();
  g.moveTo(-0.08, 0.02);
  g.bezierCurveTo(-0.1, -0.25, -0.05, -0.4, -0.12, -0.5);
  g.bezierCurveTo(-0.28, -0.58, -0.45, -0.66, -0.56, -0.72);
  g.bezierCurveTo(-0.42, -0.55, -0.3, -0.5, -0.2, -0.5);
  g.bezierCurveTo(-0.12, -0.6, 0.1, -0.68, 0.3, -0.7);
  g.bezierCurveTo(0.15, -0.6, 0.0, -0.5, -0.02, -0.44);
  g.bezierCurveTo(0.03, -0.3, 0.07, -0.1, 0.08, 0.02);
  g.closePath();
  g.fill();
  g.strokeStyle = 'rgba(70, 112, 110, 0.7)';
  g.lineWidth = 0.012;
  for (const [x1, y1] of [[-0.45, -0.66], [-0.32, -0.6], [0.18, -0.67], [0.06, -0.6]]) {
    g.beginPath();
    g.moveTo(-0.1, -0.48);
    g.lineTo(x1, y1);
    g.stroke();
  }
  g.fillStyle = 'rgba(210, 236, 230, 0.6)';
  g.fillRect(-0.05, -0.4, 0.025, 0.35);
});
