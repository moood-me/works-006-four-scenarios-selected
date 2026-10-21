// Rings on the water round the Mermaid (seen from above: circles), each a layer that widens and fades out, one
// after another (animate)
for (let k = 0; k < 3; k++) {
  e.layer(`ring${k}`, { pivot: [0, 0], box: [-0.8, -0.8, 0.8, 0.8] }, g => {
    g.strokeStyle = 'rgba(214, 232, 240, 0.55)';
    g.lineWidth = 0.025;
    g.beginPath();
    g.arc(0, 0, 0.62, 0, Math.PI * 2);
    g.stroke();
  });
}
