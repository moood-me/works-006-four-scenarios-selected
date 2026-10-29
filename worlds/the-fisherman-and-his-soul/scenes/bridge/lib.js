// What the town's houses share: a house painted flat, its front toward the viewer — plain limewashed walls, a steep
// roof, windows in rows, some lit (their glass warm and glowing: e.light, a glow and a little light of its own), a
// door. In metres, its foot's middle at the origin. `k` — the kind: its width, its floors, the eave and the ridge, how
// many windows a floor, which of them are lit (by `seed`)
function house(g, e, k) {
  const hash = (n, s) => anim.hash(n, k.seed * 37 + s);
  const w = k.width;
  const eave = k.eave;
  g.fillStyle = k.wall;
  g.fillRect(-w / 2, -eave, w, eave);
  // a darker plinth and the shade under the eave
  g.fillStyle = 'rgba(70, 60, 52, 0.35)';
  g.fillRect(-w / 2, -0.5, w, 0.5);
  g.fillStyle = 'rgba(40, 34, 30, 0.3)';
  g.fillRect(-w / 2, -eave, w, 0.25);
  // the roof: a gable over the front, or a hip seen from the front
  g.fillStyle = k.roof;
  g.beginPath();
  g.moveTo(-w / 2 - 0.3, -eave + 0.05);
  if (k.hip) {
    g.lineTo(-w / 2 + 1.2, -k.ridge);
    g.lineTo(w / 2 - 1.2, -k.ridge);
  } else {
    g.lineTo(0, -k.ridge);
  }
  g.lineTo(w / 2 + 0.3, -eave + 0.05);
  g.closePath();
  g.fill();
  // a chimney
  g.fillRect(w * 0.18, -k.ridge + 0.3, 0.45, 1.2);
  // the windows: rows of them, lit or dark
  const cols = k.cols;
  let n = 0;
  for (let f = 0; f < k.floors; f++) {
    const y = -1.15 - f * 2.4 - 1.1;
    for (let c = 0; c < cols; c++) {
      const x = -w / 2 + (w * (c + 0.5)) / cols - 0.35;
      if (f === 0 && c === k.door) {
        g.fillStyle = '#3a2e28';
        g.fillRect(x - 0.05, -2.1, 0.8, 2.1);
        continue;
      }
      const lit = hash(n++, 1) < k.lit;
      g.fillStyle = '#4a3c32';
      g.fillRect(x - 0.06, y - 0.06, 0.82, 1.27);
      g.fillStyle = lit ? '#ffd08a' : '#2c3442';
      g.fillRect(x, y, 0.7, 1.15);
      g.fillStyle = '#4a3c32';
      g.fillRect(x + 0.33, y, 0.04, 1.15);
      g.fillRect(x, y + 0.52, 0.7, 0.04);
      if (lit) e.light(x + 0.35, y + 0.6, 0.8, '#ffc070', 1.6 + 0.6 * hash(n, 2), `w${n}`);
    }
  }
}
// the hours (hours.md): the numbers each word of `time` sets
const TIME = {
  night: { dusk: 0, dawn: 0, day: 0 },
  evening: { dusk: 1, dawn: 0, day: 0 },
  morning: { dusk: 0, dawn: 0, day: 1 },
};
// the people's named places (places.md): at — [across, distance], turn, on — a seat. The lane before the bridge's head
// (where he comes off it), under the bridge's end on the landing by the water (3.1), the bridge's head, its middle, before
// the potter's stall, before his door (the door at 7.4 on the right), the doorway; the beggar sat against the far
// parapet midway (on a stone step at its foot), facing the road
const LANE = { at: [-0.5, 8.4], turn: 110 };
const UNDER = { at: [-2.3, 11.6], turn: 250 };
const HEAD = { at: [-0.8, 12.2], turn: 270 };
const MID = { at: [-11.6, 12.0], turn: 270 };
const STALL = { at: [1.0, 9.6], turn: 60 };
const DOOR = { at: [1.75, 7.4], turn: 90 };
const PLACES = {
  fisherman: { lane: LANE, under: UNDER, head: HEAD, mid: MID, stall: STALL, door: DOOR },
  soul: { lane: LANE, under: UNDER, head: HEAD, mid: MID, stall: STALL, door: DOOR },
  potter: { door: { at: [1.8, 7.6], turn: 235 }, stall: { at: [2.25, 10.5], turn: 250 }, doorway: { at: [2.35, 7.4], turn: 270 } },
  beggar: { parapet: { at: [-9.2, 13.55], turn: 180, on: [-9.2, 13.5, 3.82] } },
};
return { house, TIME, PLACES };
