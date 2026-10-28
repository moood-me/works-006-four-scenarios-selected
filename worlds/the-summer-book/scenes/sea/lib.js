// «At Sea» — what the paintings and the script share. Open water round the boat (the floor far down); the island
// itself is a picture far off (the card `island`): its waterline, for the storm's foam, is along it. The boat: its
// unseen anchor `hull` amidships (it pitches), the deck plane `boat` and everything of it on it, metres from the
// deck's middle (across, toward the stern); the camera rides `eye`, in the bow, looking aft.
const WATER = 0;
const ground = () => -30;
const edge = [];
for (let a = -110; a <= 85; a += 1.5) edge.push([a, 81.5]);
// the people's places in the boat (the island's places(): `<id>_at`), in the boat's frame, facing the bow (the way it goes)
const PLACES = {
  grandma: {
    seat: { at: [0.45, 0.2], turn: 180 },
    hand: { at: [0.45, 0.2], turn: 180, reach: { l: 'sophia#hand_r' } },
  },
  sophia: {
    bow: { at: [-0.2, -1.2], turn: 180 },
    beside: { at: [-0.4, 0.25], turn: 180 },
    hand: { at: [-0.05, 0.3], turn: 180, look: 'grandma', reach: { r: 'grandma#hand_l' } },
  },
  papa: { stern: { at: [-0.75, 3.9], turn: 180, look: 'grandma' } },
};
// the boat's side seen from inside (its x along the side, from the bow's corner aft; up from the deck): grey-white
// planking, a few ribs, the dark gunwale; `len` long, 0.75 m to the gunwale
function side(g, len) {
  g.fillStyle = '#c9c6be';
  g.fillRect(0, -0.75, len, 0.85);
  g.strokeStyle = 'rgba(120,116,108,0.25)';
  g.lineWidth = 0.01;
  for (let y = -0.45; y < 0.1; y += 0.22) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(len, y);
    g.stroke();
  }
  g.fillStyle = '#b6b0a6';
  for (let x = 0.5; x < len; x += 1.1) g.fillRect(x, -0.72, 0.05, 0.82);
  g.fillStyle = '#4a4f55';
  g.fillRect(0, -0.8, len, 0.09);
}
return { WATER, ground, edge, PLACES, side };
