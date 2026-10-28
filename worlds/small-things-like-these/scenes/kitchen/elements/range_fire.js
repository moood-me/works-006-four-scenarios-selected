// What glows in the firebox's slot (on the range's face, just before it): the coals' orange behind the bars; the fire's
// glow `fire` — the scene's light `fire` shines from it.
g.fillStyle = "#ffb15a";
g.fillRect(-0.06, -0.025, 0.12, 0.05);
g.fillStyle = "#2a1a12";
for (let x = -0.045; x < 0.06; x += 0.03) g.fillRect(x, -0.025, 0.008, 0.05);
e.light(0, 0, 0.14, "#ff9a4a", 0.9, "fire");
