// «The open sea» outside games: the night crossing — the strip of rime and the Groke in it coming nearer; the lantern
// in the son's paws shining back and the rime creeping over the stern to him; dawn; then by day, going home, the
// island astern with its dark lighthouse.
return [
  {
    name: 'night',
    run: async s => {
      s.set('night', 1);
      s.set('moon', 0.35);
      await s.wait(2);
      await s.move('trail', 0.75, { over: 6 });
      await s.wait(1);
    },
  },
  {
    name: 'lantern',
    run: async s => {
      s.set('lantern_at', 'troll');
      await s.wait(1.5);
      await s.move('frost_boat', 1, { over: 5 });
      await s.wait(1);
    },
  },
  {
    name: 'dawn',
    run: async s => {
      s.set('lantern_at', 'out');
      s.move('trail', 0, { over: 6 });
      s.move('dawn', 1, { over: 6 });
      await s.move('night', 0, { over: 6 });
      await s.wait(1);
    },
  },
  {
    name: 'home',
    run: async s => {
      const next = s.shot({ dawn: 0, frost_boat: 0, island: 'behind', groke_here: false, fisher_here: true });
      await s.until(() => next.ready);
      next.cut();
      await s.wait(4);
    },
  },
];
