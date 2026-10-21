// The coal shed's front (on `shed`; x −1.7…1.5): whitewashed rubble gone grey with coal dust, darker toward the foot
// and round the door; a slate eave along its top; the doorway at x 0…0.95, 1.9 m high, open (the leaf is `shed_door`);
// on the frame to the right of it the bolt's iron staple, where the bolt goes when it is drawn from outside.
e.lib.rubble(g, 41, -1.7, -2.5, 3.2, 2.55, "#9a958b", ["#c6c1b4", "#bcb7aa", "#cdc8bc", "#b3aea1"], 0.26);
const grime = g.createLinearGradient(0, 0, 0, -2.5);
grime.addColorStop(0, "rgba(58, 56, 54, 0.5)");
grime.addColorStop(0.5, "rgba(58, 56, 54, 0.15)");
grime.addColorStop(1, "rgba(58, 56, 54, 0)");
g.fillStyle = grime;
g.fillRect(-1.7, -2.5, 3.2, 2.55);
const sooty = g.createRadialGradient(0.47, -0.9, 0.3, 0.47, -0.9, 1.3);
sooty.addColorStop(0, "rgba(40, 38, 38, 0.42)");
sooty.addColorStop(1, "rgba(40, 38, 38, 0)");
g.fillStyle = sooty;
g.fillRect(-0.9, -2.3, 2.4, 2.35);
// the door's frame
g.fillStyle = "#4b4038";
g.fillRect(-0.06, -1.96, 0.06, 1.96);
g.fillRect(0.95, -1.96, 0.06, 1.96);
g.fillRect(-0.06, -2.02, 1.07, 0.08);
// the staple for the bolt
g.fillStyle = "#1e1d1d";
g.fillRect(1.05, -1.09, 0.1, 0.12);
// the eave: slates over the top, frost along their edge
g.fillStyle = "#4a4d52";
g.fillRect(-1.78, -2.78, 3.36, 0.3);
g.fillStyle = "#3a3c40";
for (let x = -1.78; x < 1.58; x += 0.22) g.fillRect(x, -2.78, 0.02, 0.3);
g.fillStyle = "#e6ebef";
g.fillRect(-1.78, -2.8, 3.36, 0.04);
// the doorway: open — what is inside is seen
g.globalCompositeOperation = "destination-out";
g.fillRect(0, -1.9, 0.95, 1.95);
g.globalCompositeOperation = "source-over";
