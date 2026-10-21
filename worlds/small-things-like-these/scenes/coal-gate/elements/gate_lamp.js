// The lamp over the coal gate: an iron bracket out of the wall and a lantern hanging from it, its glass lit — the glow
// `flame`, whose light the scene's `gate_light` is.
g.strokeStyle = "#202021";
g.lineWidth = 0.03;
g.beginPath();
g.moveTo(-0.02, -0.75);
g.lineTo(-0.02, -0.45);
g.moveTo(-0.02, -0.7);
g.lineTo(0, -0.55);
g.stroke();
g.fillStyle = "#1f1f20";
g.beginPath();
g.moveTo(-0.13, -0.42);
g.lineTo(0, -0.52);
g.lineTo(0.13, -0.42);
g.closePath();
g.fill();
g.fillStyle = "#f6e2b4";
g.fillRect(-0.09, -0.42, 0.18, 0.26);
g.strokeStyle = "#1f1f20";
g.lineWidth = 0.02;
g.strokeRect(-0.09, -0.42, 0.18, 0.26);
g.fillStyle = "#1f1f20";
g.fillRect(-0.11, -0.16, 0.22, 0.04);
e.light(0, -0.29, 0.22, "#ffd08a", 1, "flame");
