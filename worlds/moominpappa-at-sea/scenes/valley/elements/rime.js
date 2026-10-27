// The dune grass round where the Groke stands, gone white with rime: tufts of stiff whitened blades and a frosty haze
// at their feet, standing before her (an upright card, so that it reads from far off, where the frost on the sand is
// a thin line). Its shader (rime.wgsl) shows it out from the middle as far as the ring of frost has come (`frost`).
const blades = (x0, n, h) => {
  for (let i = 0; i < n; i++) {
    const x = x0 + (e.rnd() - 0.5) * 0.28, hh = h * (0.5 + 0.6 * e.rnd()), lean = (e.rnd() - 0.5) * 0.25;
    g.strokeStyle = e.rnd() < 0.6 ? '#f4f7fb' : '#dfe8f0';
    g.lineWidth = 0.014 + 0.01 * e.rnd();
    g.beginPath();
    g.moveTo(x, 0);
    g.quadraticCurveTo(x + lean * 0.3, -hh * 0.6, x + lean, -hh);
    g.stroke();
  }
};
const haze = g.createLinearGradient(0, -0.14, 0, 0);
haze.addColorStop(0, 'rgba(240, 246, 252, 0)');
haze.addColorStop(1, 'rgba(240, 246, 252, 0.85)');
g.fillStyle = haze;
g.fillRect(-1.15, -0.14, 2.3, 0.14);
g.lineCap = 'round';
for (let x = -1.0; x <= 1.0; x += 0.17) blades(x, 7, 0.32 + 0.12 * Math.cos(x * 1.4));
