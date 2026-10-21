// A cheek of the window's deep embrasure (the wall's thickness, from the room's face out to the glass): whitewash,
// greyer toward the cold glass. Painted once; its copies stand at either side, facing each other.
const L = e.lib, d = L.WIN.deep, h = L.WIN.top - L.WIN.sill;
g.fillStyle = "#e6e0d3";
g.fillRect(-d / 2, -h, d, h);
const cold = g.createLinearGradient(-d / 2, 0, d / 2, 0);
cold.addColorStop(0, "rgba(150, 160, 170, 0)");
cold.addColorStop(1, "rgba(150, 160, 170, 0.35)");
g.fillStyle = cold;
g.fillRect(-d / 2, -h, d, h);
