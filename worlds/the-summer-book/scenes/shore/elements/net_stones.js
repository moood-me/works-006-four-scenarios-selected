// Two low grey stones on the rock at the pier's root, where Papa sits at his net of an evening and Grandmother beside
// him. Metres from the middle of their foot; 1.8 m along. Points: `papa` (the left one's top), `grandma` (the right
// one's).
g.fillStyle = '#958e86';
g.beginPath();
g.ellipse(-0.55, -0.18, 0.36, 0.24, 0, 0, 6.2832);
g.fill();
g.beginPath();
g.ellipse(0.55, -0.17, 0.32, 0.22, 0.1, 0, 6.2832);
g.fill();
g.fillStyle = '#a9a29a';
g.beginPath();
g.ellipse(-0.55, -0.36, 0.28, 0.06, 0, 0, 6.2832);
g.fill();
g.beginPath();
g.ellipse(0.55, -0.34, 0.24, 0.05, 0, 0, 6.2832);
g.fill();
e.at(-0.55, -0.4, 'papa');
e.at(0.55, -0.38, 'grandma');
