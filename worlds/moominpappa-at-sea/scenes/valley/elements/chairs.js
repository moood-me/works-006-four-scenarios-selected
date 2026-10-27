// A plain wooden chair of the veranda, seen from its front: a seat with a striped cushion, a back of three slats, four
// legs. Copies stand round the table, each turned to it.
g.fillStyle = '#8a6a48';
for (const x of [-0.2, 0.2]) {
  g.fillRect(x - 0.025, -0.3, 0.05, 0.3);
  g.fillRect(x - 0.025, -0.78, 0.05, 0.48);
}
g.fillStyle = '#9a7a56';
g.fillRect(-0.23, -0.34, 0.46, 0.05);
g.fillStyle = '#7f9fbf';
g.fillRect(-0.21, -0.37, 0.42, 0.04);
g.fillStyle = '#e9e2cf';
for (const x of [-0.15, -0.03, 0.09]) g.fillRect(x, -0.37, 0.05, 0.04);
g.fillStyle = '#9a7a56';
for (const y of [-0.74, -0.62, -0.5]) g.fillRect(-0.2, y, 0.4, 0.05);
