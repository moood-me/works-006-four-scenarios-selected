// The rings a pebble makes on the glass water (`rings`: how many pebbles thrown — each throw a new set): seen from
// above, three thin pale rings about where it fell, flattened by the eye's low angle by the engine (a plane). Each is a
// layer the animate grows and fades over a few seconds after the throw. Metres from their middle; 4 m across.
for (const name of ['r1', 'r2', 'r3']) {
  e.layer(name, { pivot: [0, 0] }, c => {
    c.strokeStyle = 'rgba(236,240,240,0.75)';
    c.lineWidth = 0.035;
    c.beginPath();
    c.arc(0, 0, 1, 0, 6.2832);
    c.stroke();
  });
}
