// The three wooden steps down from the veranda, seen from the front: grey-brown treads with lighter nosings, white
// stringers either side. Metres from their foot on the ground.
for (let i = 0; i < 3; i++) {
  const y = -(i + 1) * 0.193;
  g.fillStyle = i % 2 ? '#9c8466' : '#a78e6e';
  g.fillRect(-0.4, y, 0.8, 0.193);
  g.fillStyle = '#cbb796';
  g.fillRect(-0.4, y, 0.8, 0.03);
}
g.fillStyle = '#f2efe6';
g.fillRect(-0.44, -0.6, 0.06, 0.6);
g.fillRect(0.38, -0.6, 0.06, 0.6);
