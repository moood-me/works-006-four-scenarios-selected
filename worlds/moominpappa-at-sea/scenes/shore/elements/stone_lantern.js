// The family's storm lantern set on the flat stone (lantern_stone): a tin font, its glass globe in a wire guard, a cap
// and a bail handle. Lit, its globe glows warm (a layer of light) and its flame lights the sand, the son and the Groke
// (e.light "flame", taken over in "lights" for its reach); out, the globe is cold clear glass. Its animate shows it.
e.layer("tin", {}, c => {
  c.fillStyle = "#6f6a5e";
  c.beginPath();
  c.ellipse(0, -0.03, 0.11, 0.03, 0, 0, Math.PI * 2);
  c.fill();
  c.fillRect(-0.11, -0.1, 0.22, 0.07);
  c.fillStyle = "#8a8474";
  c.fillRect(-0.09, -0.12, 0.18, 0.03);
  c.fillStyle = "rgba(190, 204, 214, 0.55)";
  c.beginPath();
  c.moveTo(-0.05, -0.12);
  c.bezierCurveTo(-0.11, -0.16, -0.11, -0.26, -0.05, -0.3);
  c.lineTo(0.05, -0.3);
  c.bezierCurveTo(0.11, -0.26, 0.11, -0.16, 0.05, -0.12);
  c.closePath();
  c.fill();
  c.strokeStyle = "#4a4640";
  c.lineWidth = 0.008;
  for (const x of [-0.085, 0, 0.085]) {
    c.beginPath();
    c.moveTo(x * 0.7, -0.12);
    c.quadraticCurveTo(x * 1.25, -0.21, x * 0.7, -0.3);
    c.stroke();
  }
  c.fillStyle = "#6f6a5e";
  c.fillRect(-0.06, -0.33, 0.12, 0.03);
  c.beginPath();
  c.moveTo(-0.045, -0.33);
  c.lineTo(0, -0.37);
  c.lineTo(0.045, -0.33);
  c.fill();
  c.lineWidth = 0.01;
  c.beginPath();
  c.moveTo(-0.1, -0.1);
  c.quadraticCurveTo(-0.13, -0.44, 0, -0.45);
  c.quadraticCurveTo(0.13, -0.44, 0.1, -0.1);
  c.stroke();
});
e.layer("flame", { blend: "add" }, c => {
  const glass = c.createRadialGradient(0, -0.2, 0.01, 0, -0.2, 0.1);
  glass.addColorStop(0, "rgba(255, 220, 150, 1)");
  glass.addColorStop(1, "rgba(230, 170, 90, 0.5)");
  c.fillStyle = glass;
  c.beginPath();
  c.moveTo(-0.05, -0.12);
  c.bezierCurveTo(-0.11, -0.16, -0.11, -0.26, -0.05, -0.3);
  c.lineTo(0.05, -0.3);
  c.bezierCurveTo(0.11, -0.26, 0.11, -0.16, 0.05, -0.12);
  c.closePath();
  c.fill();
  c.fillStyle = "#fff0c8";
  c.beginPath();
  c.moveTo(0, -0.25);
  c.quadraticCurveTo(0.022, -0.2, 0, -0.17);
  c.quadraticCurveTo(-0.022, -0.2, 0, -0.25);
  c.fill();
});
e.light(0, -0.21, 0.16, "#ffc874", 1.3, "flame");
e.at(0, -0.21, "flame");
