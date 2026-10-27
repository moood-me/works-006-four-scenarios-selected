// The boat «Adventure» in the cove, seen from her side, her bow on the rocks (`boat`: moored, pulled up, cracked,
// tarred; away — gone): a clinker hull of pale weathered blue with a white rail, her stub of a mast with the sail
// furled round it, a ship's lantern on the bow (out), a rope from the bow to a stone (point `boat#mooring`). Cracked:
// a split along her strakes amidships; tarred: a black stripe of tar over it. The hull is a layer: moored, her stern
// afloat, she rocks a little (animate); where she lies is the script's (boat_a, boat_d, boat_turn).
const state = e.state.boat ?? "moored";
if (state !== "away") {
  e.layer("hull", { pivot: [0.2, 0] }, c => {
    c.save();
    c.rotate(-0.07);
    // the hull: keel low, the bow up to the right
    c.fillStyle = "#7f9cb0";
    c.beginPath();
    c.moveTo(-1.75, -0.78);
    c.quadraticCurveTo(-1.82, -0.2, -1.2, -0.05);
    c.quadraticCurveTo(0.2, 0.08, 1.2, -0.08);
    c.quadraticCurveTo(1.75, -0.3, 1.92, -0.95);
    c.quadraticCurveTo(0.2, -0.72, -1.75, -0.78);
    c.closePath();
    c.fill();
    // the strakes: clinker lines along her
    c.strokeStyle = "rgba(52, 70, 86, 0.6)";
    c.lineWidth = 0.025;
    for (const k of [0.22, 0.44, 0.64]) {
      c.beginPath();
      c.moveTo(-1.76, -0.78 + k * 0.7);
      c.quadraticCurveTo(0.1, -0.7 + k * 0.78, 1.88 - k * 0.5, -0.92 + k * 0.82);
      c.stroke();
    }
    // the keel, dark, and a strip of weed
    c.fillStyle = "#3d3b3a";
    c.beginPath();
    c.moveTo(-1.3, -0.06);
    c.quadraticCurveTo(0.2, 0.12, 1.25, -0.06);
    c.lineTo(1.2, -0.02);
    c.quadraticCurveTo(0.2, 0.16, -1.25, -0.01);
    c.closePath();
    c.fill();
    // the white rail
    c.strokeStyle = "#ecebe6";
    c.lineWidth = 0.07;
    c.beginPath();
    c.moveTo(-1.76, -0.8);
    c.quadraticCurveTo(0.2, -0.74, 1.94, -0.97);
    c.stroke();
    // the mast and the furled sail
    c.fillStyle = "#6b5440";
    c.fillRect(-0.12, -2.75, 0.07, 2.0);
    c.fillStyle = "#e7dfcf";
    c.beginPath();
    c.moveTo(-0.11, -2.55);
    c.quadraticCurveTo(0.02, -1.7, -0.05, -0.9);
    c.lineTo(-0.14, -0.9);
    c.quadraticCurveTo(-0.22, -1.7, -0.11, -2.55);
    c.fill();
    c.strokeStyle = "rgba(120, 100, 80, 0.8)";
    c.lineWidth = 0.015;
    for (const y of [-2.2, -1.8, -1.4, -1.05]) {
      c.beginPath();
      c.moveTo(-0.2, y);
      c.lineTo(0.02, y + 0.03);
      c.stroke();
    }
    // the lantern on its bracket at the bow: brass, its glass dark
    c.fillStyle = "#3a3632";
    c.fillRect(1.66, -1.18, 0.04, 0.24);
    c.fillStyle = "#a5874f";
    c.fillRect(1.6, -1.42, 0.17, 0.05);
    c.fillRect(1.6, -1.2, 0.17, 0.04);
    c.fillStyle = "#58646c";
    c.fillRect(1.62, -1.37, 0.13, 0.17);
    c.fillStyle = "#a5874f";
    c.beginPath();
    c.moveTo(1.6, -1.42);
    c.lineTo(1.685, -1.5);
    c.lineTo(1.77, -1.42);
    c.fill();
    // the split along her strakes, and the tar over it
    if (state === "cracked" || state === "tarred") {
      c.strokeStyle = "#2a2622";
      c.lineWidth = 0.03;
      c.beginPath();
      c.moveTo(-0.2, -0.47);
      for (const [x, y] of [[0.05, -0.43], [0.18, -0.5], [0.4, -0.44], [0.55, -0.52], [0.8, -0.46], [0.95, -0.5]]) c.lineTo(x, y);
      c.stroke();
    }
    if (state === "tarred") {
      c.strokeStyle = "#1c1a19";
      c.lineWidth = 0.13;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(-0.3, -0.47);
      c.quadraticCurveTo(0.4, -0.5, 1.05, -0.48);
      c.stroke();
    }
    e.at(1.68, -1.3, "lantern");
    c.restore();
  });
  // the rope from the bow down to a stone
  g.strokeStyle = "#a58f6c";
  g.lineWidth = 0.025;
  g.beginPath();
  g.moveTo(1.85, -0.85);
  g.quadraticCurveTo(2.1, -0.2, 2.35, 0);
  g.stroke();
  e.at(0, -0.6, "boat");
  e.at(2.35, 0, "mooring");
}
