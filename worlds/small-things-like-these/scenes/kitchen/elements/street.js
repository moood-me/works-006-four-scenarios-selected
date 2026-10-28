// The houses across the street, seen out of the window (11 m off; x −5…5, x 0 at 3.6 m right of the start's line):
// two-storey terraced fronts — a pale pink one with a dark blue door under a fanlight and a wide window, a cream one
// beyond — the kerb and the pavement at their foot, frost white on the window sills and the slates; a street lamp's
// post before them. What is lit in their windows and the lamp are `street_lit`.
g.fillStyle = "#d9b9ac";
g.fillRect(-5, -6.2, 5.6, 6.25);
g.fillStyle = "#e3dbc4";
g.fillRect(0.6, -6.0, 4.4, 6.05);
// the roofs and their frost
g.fillStyle = "#59606a";
g.fillRect(-5, -6.9, 5.6, 0.75);
g.fillRect(0.6, -6.7, 4.4, 0.75);
g.fillStyle = "#e8edf1";
g.fillRect(-5, -6.95, 5.6, 0.06);
g.fillRect(0.6, -6.75, 4.4, 0.06);
// the pink house: the door, its fanlight's frame, the steps; the wide window's frame (its panes are lit)
g.fillStyle = "#2e3f5e";
g.fillRect(-1.55, -2.25, 0.95, 2.1);
g.fillStyle = "#e9e3d2";
g.fillRect(-1.62, -2.66, 1.09, 0.41);
g.fillStyle = "#cfc9b9";
g.fillRect(-1.7, -0.15, 1.25, 0.15);
g.fillStyle = "#e9e3d2";
g.fillRect(-0.05, -2.36, 1.3, 1.46);
g.fillRect(-0.1, -0.95, 1.4, 0.08);
g.fillStyle = "#f0f4f7";
g.fillRect(-0.1, -0.97, 1.4, 0.025);
// upstairs windows, dark
g.fillStyle = "#e9e3d2";
for (const x of [-3.6, -1.5, 0.1, 2.0, 3.6]) g.fillRect(x, -5.3, 0.95, 1.3);
g.fillStyle = "#3b4352";
for (const x of [-3.6, -1.5, 0.1, 2.0, 3.6]) g.fillRect(x + 0.06, -5.24, 0.83, 1.18);
// the cream house's door and window below
g.fillStyle = "#6a3b34";
g.fillRect(2.1, -2.2, 0.9, 2.05);
g.fillStyle = "#3b4352";
g.fillRect(3.4, -2.3, 1.2, 1.35);
// the pavement's kerb
g.fillStyle = "#9a9a96";
g.fillRect(-5, -0.15, 10, 0.2);
// the lamp's post
g.fillStyle = "#3e4448";
g.fillRect(-0.74, -4.4, 0.08, 4.4);
g.fillRect(-0.74, -4.45, 0.45, 0.05);
