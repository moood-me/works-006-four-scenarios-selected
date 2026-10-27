// The fog coming in from the open sea: a white wall lying on the horizon ahead and to the right, its top billowing,
// rising out of nothing at its left end, and its softer see-through crest. Metres from its foot on the water; 1800 m
// long, about 45 m high.
const top = x => 32 + 8 * Math.sin(x * 0.0105 + 0.5) + 5 * Math.sin(x * 0.0244 + 2) + 3 * Math.sin(x * 0.059);
const edge = x => Math.min(1, (x + 900) / 600);
g.fillStyle = '#e2e3e6';
g.beginPath();
g.moveTo(-900, 2);
for (let x = -900; x <= 900; x += 10) g.lineTo(x, -top(x) * edge(x));
g.lineTo(900, 2);
g.closePath();
g.fill();
g.fillStyle = 'rgba(236,237,240,0.45)';
g.beginPath();
g.moveTo(-900, 2);
for (let x = -900; x <= 900; x += 10) g.lineTo(x, -(top(x) + 7) * edge(x));
g.lineTo(900, 2);
g.closePath();
g.fill();
