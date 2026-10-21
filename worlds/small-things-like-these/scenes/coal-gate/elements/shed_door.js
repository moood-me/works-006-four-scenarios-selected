// The shed's door, swung right out into the yard (painted from its hinge, x 0…0.95): weathered planks, two ledges,
// the long iron bolt across near its free edge — the bolt that was drawn from the outside.
g.fillStyle = "#5e5144";
g.fillRect(0, -1.9, 0.95, 1.9);
g.fillStyle = "#4c4137";
for (let x = 0.19; x < 0.95; x += 0.19) g.fillRect(x - 0.01, -1.9, 0.02, 1.9);
g.fillStyle = "#54493e";
g.fillRect(0, -1.6, 0.95, 0.12);
g.fillRect(0, -0.45, 0.95, 0.12);
const foot = g.createLinearGradient(0, 0, 0, -0.8);
foot.addColorStop(0, "rgba(40, 38, 36, 0.6)");
foot.addColorStop(1, "rgba(40, 38, 36, 0)");
g.fillStyle = foot;
g.fillRect(0, -0.8, 0.95, 0.8);
g.fillStyle = "#1e1d1d";
g.fillRect(0.45, -1.06, 0.48, 0.05);
g.fillRect(0.5, -1.12, 0.06, 0.17);
g.fillRect(0.82, -1.1, 0.04, 0.13);
