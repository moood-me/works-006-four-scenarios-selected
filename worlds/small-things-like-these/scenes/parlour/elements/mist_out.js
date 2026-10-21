// Low white mist over the yard (x −6…6 about across 7 m, up to 2.2 m): soft banks thickest a little above the cobbles,
// thinning upward, with no edge anywhere (lib `blob`); its layer `mist` drifts slowly along the yard, wrapping round its
// box — the banks near its ends are painted again a box's width over, so they meet.
const L = e.lib;
const r = L.stream(47);
const banks = [];
for (let i = 0; i < 9; i++) banks.push([-6 + r() * 12, -0.6 - r() * 0.4, 1.2 + r() * 1.4, 0.3 + r() * 0.25, 0.35 + r() * 0.25]);
e.layer("mist", { drift: [0.06, 0] }, (g) => {
  for (const [x, y, rx, ry, a] of banks) {
    for (const dx of [-12, 0, 12]) L.blob(g, x + dx, y, rx, ry, a);
  }
});
