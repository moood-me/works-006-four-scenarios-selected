// Loose stones on the slab in the foreground: a few rounded granite pebbles and broken flakes, greyer than the rock,
// lying where the ice left them (one painting, its stones parts at their own depths).
const kinds = [[-2.6, 1.6, 0.34, 0.2], [2.9, 1.9, 0.26, 0.15], [-0.4, 0.9, 0.18, 0.1], [3.6, 3.0, 0.42, 0.24], [-4.2, 2.6, 0.22, 0.13], [1.9, 1.2, 0.12, 0.07]];
for (const [dx, dz, w, h] of kinds) {
  e.part(dx, dz, p => {
    p.fillStyle = "#b6a19d";
    p.beginPath();
    p.moveTo(-w, 0);
    p.quadraticCurveTo(-w * 1.05, -h * 0.8, -w * 0.3, -h);
    p.quadraticCurveTo(w * 0.6, -h * 1.05, w, -h * 0.3);
    p.quadraticCurveTo(w * 1.08, 0, w * 0.9, 0.01);
    p.closePath();
    p.fill();
    p.fillStyle = "rgba(240, 226, 218, 0.5)";
    p.beginPath();
    p.ellipse(-w * 0.2, -h * 0.8, w * 0.45, h * 0.18, -0.1, 0, Math.PI * 2);
    p.fill();
  }, [-w * 1.2, -h * 1.2, w * 1.2, 0.05]);
}
