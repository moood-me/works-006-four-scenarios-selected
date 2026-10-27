// Three sea-horses in the shallows off the flat stone, seen side-on: small pale-green, glowing faintly from within,
// curled tails under the water, heads and manes up out of it, a ring on the water round each. Each its own layer, so
// they bob out of step and, when they go (seahorses_away), swim off to the left out of sight.
const kinds = [[0, 0, 1, 1], [0.75, 0.25, 0.85, -1], [-0.7, 0.4, 0.75, 1]];
kinds.forEach(([x, z, k, dir], i) => {
  e.layer(`h${i}`, { box: [-7.5 + x, -0.9, 1 + x, 0.25], depth: -z }, c => {
    c.save();
    c.translate(x, 0);
    c.scale(dir * k, k);
    // the ring on the water
    c.strokeStyle = "rgba(236, 246, 244, 0.55)";
    c.lineWidth = 0.025;
    c.beginPath();
    c.ellipse(0.02, 0, 0.32, 0.06, 0, 0, Math.PI * 2);
    c.stroke();
    // the body: a curled S — chest out, a snout, a mane down the neck
    c.fillStyle = "#b9ded2";
    c.beginPath();
    c.moveTo(-0.08, 0.02);
    c.bezierCurveTo(-0.16, -0.18, -0.1, -0.38, 0.02, -0.48);
    c.bezierCurveTo(0.06, -0.55, 0.06, -0.62, 0.01, -0.66);
    c.lineTo(0.2, -0.66);
    c.lineTo(0.21, -0.61);
    c.lineTo(0.08, -0.58);
    c.bezierCurveTo(0.12, -0.46, 0.14, -0.3, 0.1, -0.16);
    c.bezierCurveTo(0.08, -0.06, 0.1, 0, 0.12, 0.02);
    c.closePath();
    c.fill();
    c.fillStyle = "#e6f6ee";
    c.beginPath();
    c.ellipse(0.02, -0.25, 0.05, 0.13, 0.15, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#86c0b0";
    for (let j = 0; j < 6; j++) {
      c.beginPath();
      c.ellipse(-0.08 + j * 0.008, -0.56 + j * 0.07, 0.035, 0.02, 0.6, 0, Math.PI * 2);
      c.fill();
    }
    c.fillStyle = "#1c2a2a";
    c.beginPath();
    c.arc(0.06, -0.62, 0.014, 0, Math.PI * 2);
    c.fill();
    c.restore();
    e.light(x + 0.02 * dir * k, -0.35 * k, 0.5, "#c8f0e0", 0.55, `glow${i}`);
  });
});
e.at(0, -0.4);
