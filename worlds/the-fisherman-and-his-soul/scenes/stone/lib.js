// What the stone's elements and its script share.
//
// The places of its people (metres; the viewer on the pier at 0, the water at -0.63): `at` — [across, distance,
// elevation over the bay's floor there]; `on` — a seat (her place on the stone's top); `do` — what they do there; `turn`
// — where they face when the other is not here (with the other here, `turnOf`).
//   fisherman: boat — standing in his boat by its bow, over the boards; shallows — knee-deep on the sandbar at the
//     stone's right front (1.1); water — in the deep water before the stone to the shoulders (3С.1);
//   mermaid: stone — sitting on the edge of its flat top, her tail hanging down its front; water — to the shoulders in
//     the water at its left front; net — to the shoulders in the water off the boat's bow, in his net (П.3).
const PLACES = {
  fisherman: {
    boat: { at: [-1.88, 5.59, 0], turn: 130 },
    shallows: { at: [2.4, 5.8, 0], turn: 225 },
    water: { at: [0.2, 4.9, 0.52], turn: 150 },
  },
  mermaid: {
    stone: { at: [0.78, 6.4, 0], on: [0.78, 6.4, 3.15], do: 'seated', turn: 215 },
    water: { at: [0.1, 5.6, 0.77], turn: 200 },
    net: { at: [-0.5, 5.7, 0.77], turn: 240 },
  },
};
const OTHER = { fisherman: 'mermaid', mermaid: 'fisherman' };
// where one faces at their place: half toward the other (when the other is here), half toward the viewer — so that both
// faces are seen as they look at each other
function turnOf(id, at, state) {
  const p = PLACES[id][at];
  const other = OTHER[id];
  const q = PLACES[other][state[`${other}_at`]];
  if (!q || state[`${other}_here`] === false) return p.turn;
  const b = Math.atan2(q.at[0] - p.at[0], q.at[1] - p.at[1]) * 180 / Math.PI;
  const d = ((180 - b + 540) % 360) - 180;
  return (b + d / 2 + 360) % 360;
}
// the keys that put one at a named place at once
function place(id, at, state) {
  const p = PLACES[id][at];
  if (!p) return null;
  const other = OTHER[id];
  return {
    [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_e`]: p.at[2], [`${id}_placed`]: at,
    [`${id}_on`]: p.on ?? null, [`${id}_do`]: p.do ?? null, [`${id}_turn`]: turnOf(id, at, state),
    [`${id}_look`]: state[`${other}_here`] === false ? null : other,
  };
}
// the boat's ribs from the stem to the stern: [along (− toward the bow), half its beam, its rail and its keel over the
// water], and one rib's points from the left rail down round the keel up to the right rail ([x, y, z] of the hull's form:
// x across, y up, z toward the bow)
const RIBS = [[-1.7, 0.03, 0.62, 0.2], [-1.3, 0.36, 0.55, -0.12], [-0.7, 0.58, 0.5, -0.24], [0, 0.66, 0.47, -0.27],
  [0.7, 0.62, 0.48, -0.25], [1.3, 0.55, 0.52, -0.2], [1.6, 0.5, 0.54, -0.15]];
function rib([d, w, rail, keel]) {
  const H = rail - keel;
  const k = [[1, 0], [0.97, 0.25], [0.85, 0.55], [0.55, 0.85], [0, 1]];
  const side = k.map(([x, y]) => [-w * x, rail - H * y, -d]);
  return [...side, ...side.slice(0, -1).reverse().map(([x, y, z]) => [-x, y, z])];
}
// rings on the water round someone standing in it (seen from above: circles), each a layer that widens and fades
// (their animate: `ringsMove`)
function rings(e) {
  for (let k = 0; k < 3; k++) {
    e.layer(`ring${k}`, { pivot: [0, 0], box: [-0.8, -0.8, 0.8, 0.8] }, g => {
      g.strokeStyle = 'rgba(214, 232, 240, 0.55)';
      g.lineWidth = 0.025;
      g.beginPath();
      g.arc(0, 0, 0.62, 0, Math.PI * 2);
      g.stroke();
    });
  }
}
// each ring widens and fades, a third of the way behind the one before, slowly; none while `shown` is false
function ringsMove(e, shown, phase) {
  for (let k = 0; k < 3; k++) {
    const u = (e.t / 4.5 + k / 3 + phase) % 1;
    const ring = e.layer(`ring${k}`);
    ring.scale = 0.45 + 0.55 * u;
    ring.alpha = shown ? Math.sin(Math.PI * u) * (1 - u) : 0;
  }
}
return { PLACES, OTHER, turnOf, place, RIBS, rib, rings, ringsMove };
