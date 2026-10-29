// The lamp over the threshold: an iron hook out of the wall over the doorway, a short chain and a lantern hanging from
// it — a layer that sways a little in the draught from the open door (animate). Its flame is the scene's light "lamp"
g.fillStyle = '#2b2622';
g.fillRect(-0.05, -3.06, 0.1, 0.05);
g.fillRect(-0.012, -3.03, 0.024, 0.08);
e.layer('lantern', { pivot: [0, -2.96], box: [-0.14, -2.97, 0.14, -2.36] }, g => {
  g.strokeStyle = '#2b2622';
  g.lineWidth = 0.012;
  g.beginPath();
  g.moveTo(0, -2.96);
  g.lineTo(0, -2.8);
  g.stroke();
  g.fillStyle = '#2f2a26';
  g.beginPath();
  g.moveTo(0, -2.82);
  g.lineTo(0.1, -2.72);
  g.lineTo(-0.1, -2.72);
  g.closePath();
  g.fill();
  g.fillStyle = '#ffe2a8';
  g.fillRect(-0.085, -2.72, 0.17, 0.26);
  g.fillStyle = '#2f2a26';
  for (const x of [-0.085, -0.006, 0.073]) g.fillRect(x, -2.72, 0.012, 0.26);
  g.fillRect(-0.1, -2.46, 0.2, 0.04);
  e.light(0, -2.6, 0.12, '#ffc574', 1.2, 'flame');
});
