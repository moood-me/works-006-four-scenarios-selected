// The blanket Moominmamma lays on the sand behind her son (blanket), from above (the plane's metres): a folded
// oatmeal wool blanket with a red stripe at each end, a corner turned back. Its place is set by the scene behind
// wherever the son sits by the Groke (blanket_a, blanket_d).
e.layer("blanket", {}, c => {
  c.fillStyle = "#b9a888";
  c.beginPath();
  c.moveTo(-0.55, -0.32);
  c.lineTo(0.56, -0.3);
  c.lineTo(0.58, 0.3);
  c.lineTo(-0.1, 0.33);
  c.lineTo(-0.52, 0.12);
  c.closePath();
  c.fill();
  c.fillStyle = "#a2473c";
  c.fillRect(-0.55, -0.3, 0.1, 0.5);
  c.fillRect(0.44, -0.3, 0.1, 0.6);
  c.fillStyle = "#cfc0a2";
  c.beginPath();
  c.moveTo(-0.52, 0.12);
  c.lineTo(-0.1, 0.33);
  c.lineTo(-0.2, 0.05);
  c.closePath();
  c.fill();
  c.strokeStyle = "rgba(60, 70, 90, 0.5)";
  c.lineWidth = 0.012;
  for (const y of [-0.15, 0, 0.15]) {
    c.beginPath();
    c.moveTo(-0.4, y);
    c.lineTo(0.42, y + 0.01);
    c.stroke();
  }
});
