// Papa's box of matches (`matchbox`): left on the Fisherman's stone beside him, or in the Fisherman's palm — a small
// yellow box with a blue label, its striking sides brown. A layer its animate carries: on the stone where it lies,
// in his right hand as it moves; not there at all — none.
e.layer("box", { box: [-1.6, -1.2, 1.0, 0.2] }, c => {
  c.fillStyle = "#d9b44a";
  c.fillRect(-0.035, -0.024, 0.07, 0.024);
  c.fillStyle = "#3f5d8a";
  c.fillRect(-0.022, -0.02, 0.044, 0.016);
  c.fillStyle = "#6a4a32";
  c.fillRect(-0.035, -0.024, 0.07, 0.004);
  e.at(0, -0.012, "box");
});
