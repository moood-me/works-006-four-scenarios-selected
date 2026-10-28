// The lidded wicker basket in the bow: the cat Mappe sits on its lid (`basket` cat: the element `cat`) — or the lid is
// shut down and strapped, him in it (`basket` shut). Metres from the middle of its foot; 0.6 m wide. Point: `lid`.
g.fillStyle = '#b38f5c';
g.fillRect(-0.3, -0.4, 0.6, 0.4);
g.strokeStyle = 'rgba(110,80,40,0.6)';
g.lineWidth = 0.012;
for (let y = -0.34; y < 0; y += 0.06) {
  g.beginPath();
  g.moveTo(-0.3, y);
  g.lineTo(0.3, y);
  g.stroke();
}
g.fillStyle = '#9c7a4a';
g.fillRect(-0.32, -0.46, 0.64, 0.07);
if (e.state.basket !== 'cat') {
  g.fillStyle = '#4a3a30';
  g.fillRect(-0.03, -0.46, 0.06, 0.46);
}
e.at(0, -0.46, 'lid');
