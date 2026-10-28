// Grandmother's cup in her hands (`cup`, 3.3): a white enamel cup with a blue rim, tea in it — tipped as `tilt` says
// (−1…1, М7а). Painted once in a layer about its foot; its animate keeps it at her hands. The point `cup`.
e.layer('cup', { pivot: [0, 0] }, c => {
  c.fillStyle = '#ecebe6';
  c.beginPath();
  c.moveTo(-0.045, -0.085);
  c.lineTo(0.045, -0.085);
  c.lineTo(0.038, 0);
  c.lineTo(-0.038, 0);
  c.closePath();
  c.fill();
  c.fillStyle = '#4c6478';
  c.fillRect(-0.047, -0.09, 0.094, 0.01);
  c.fillRect(-0.039, -0.006, 0.078, 0.006);
  c.strokeStyle = '#ecebe6';
  c.lineWidth = 0.01;
  c.beginPath();
  c.arc(0.05, -0.045, 0.022, -1.3, 1.3);
  c.stroke();
});
