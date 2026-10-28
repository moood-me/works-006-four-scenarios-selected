// The new house outside games: the moonlit night — Grandmother and Sophia come out of the forest with the lantern, the
// veranda's window is not locked; the room by the moon in its big windows — Grandmother on the bed's foot, the lantern
// on the floor, her cigarette; Sophia pulls out all the drawers and takes nothing, and leaves the seal on the table;
// the last morning in the fog, from the water: the big windows, the seal on the table.
const NIGHT = { dawn: 0, late: 0, fog: 0, night: 1, grandma_here: true, sophia_here: true, seal: false, drawers: 0, cigarette: 0 };
return [
  { name: 'the window', run: async s => {
    s.cut({ ...NIGHT, view: 'out', lantern: 'hand', grandma_at: 'path', sophia_at: 'path', sash: 0 });
    await s.wait(3);
    s.set('grandma_at', 'sash');
    s.set('sophia_at', 'sash');
    await s.wait(1);
    await s.move('sash', 1, { over: 2.5 });
    await s.wait(2);
  } },
  { name: 'the room', run: async s => {
    s.cut({ ...NIGHT, view: 'room', lantern: 'floor', grandma_at: 'bed', sophia_at: 'drawers', sash: 1 });
    await s.wait(2);
    await s.move('cigarette', 1, { over: 1 });
    await s.move('drawers', 1, { over: 5, ease: 'linear' });
    await s.wait(2);
  } },
  { name: 'the seal', run: async s => {
    s.set('sophia_at', 'table');
    await s.wait(1);
    s.set('seal', true);
    await s.wait(3);
  } },
  { name: 'the last morning', run: async s => {
    s.cut({ night: 0, dawn: 1, late: 1, fog: 0.6, view: 'sea', grandma_here: false, sophia_here: false, lantern: 'none', cigarette: 0,
      drawers: 0, sash: 0, seal: true });
    await s.wait(5);
  } },
  { name: 'the seal from the water', run: async s => {
    s.set('view', 'seal');
    await s.wait(5);
  } },
];
