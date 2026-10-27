// Moominmamma in her garden on the wall, under the apple tree: a small flat sheet laid on the wall there (the arc under
// it is too slight to see). Her figure as she paints it — sitting in the grass, her red apron, her black handbag — is a
// layer as present as `wall_mama` (0 not there … 1 there: animate); where she sat, once she has gone, the grass lies
// pressed (`wall_grass`). The garden's colours are the wall's (`paints`).
const L = e.lib, P = L.PAINTS[e.state.paints] ?? L.PAINTS.green, G = 0;
if (e.state.wall_grass) {
  g.strokeStyle = P.grass;
  g.lineWidth = 0.012;
  for (let i = 0; i < 14; i++) {
    const x = -0.16 + i * 0.024;
    g.beginPath();
    g.moveTo(x, G - 0.06);
    g.quadraticCurveTo(x + 0.04, G - 0.085, x + 0.09, G - 0.07);
    g.stroke();
  }
}
e.layer("mama", {}, c => {
  c.lineWidth = 0.007;
  c.strokeStyle = L.INK;
  c.fillStyle = "#f6f3ec";
  c.beginPath();
  c.ellipse(0, G - 0.15, 0.11, 0.09, 0, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  c.beginPath();
  c.ellipse(0.02, G - 0.29, 0.07, 0.075, 0, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  c.beginPath();
  c.ellipse(0.08, G - 0.27, 0.045, 0.032, 0.2, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  c.fillStyle = "#b8473a";
  c.fillRect(-0.06, G - 0.2, 0.12, 0.1);
  c.fillStyle = "#26232a";
  c.fillRect(0.1, G - 0.13, 0.06, 0.05);
  c.fillStyle = L.INK;
  c.beginPath();
  c.arc(0.05, G - 0.31, 0.008, 0, Math.PI * 2);
  c.fill();
});
e.at(0, G - 0.22, "mama");
