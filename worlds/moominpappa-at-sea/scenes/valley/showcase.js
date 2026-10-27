// «Moominvalley» outside games: the garden turning to evening, the little fire in the moss and the ladle's steam, the
// Groke far off on the beach and the grass whitening round her; night on the veranda, the chart under the lamp; the
// supper; the basket packed; the evening of the 22nd at the jetty, the lantern lit on the bow, the Groke's frost
// going down to the water.
return [
  {
    name: 'evening',
    run: async s => {
      s.set('where', 'garden');
      await s.move('dusk', 1, { over: 5 });
      await s.wait(1);
    },
  },
  {
    name: 'fire',
    run: async s => {
      s.set('moss', 'smoulder');
      await s.wait(2.5);
      await s.move('smoke', 1, { over: 4 });
      await s.wait(1.5);
      s.set('moss', 'burnt');
      await s.wait(1.5);
    },
  },
  {
    name: 'groke',
    run: async s => {
      const next = s.shot({ camera_x: -8, camera_z: 18 });
      await s.until(() => next.ready);
      next.cut();
      await s.move('frost', 0.4, { over: 4 });
      await s.wait(1.5);
    },
  },
  {
    name: 'map',
    run: async s => {
      s.set('night', 1);
      s.set('lamps', 1);
      s.set('where', 'map');
      await s.wait(2.5);
      s.set('chart', 1);
      await s.wait(3.5);
      s.set('chart', 0);
      await s.wait(1);
    },
  },
  {
    name: 'supper',
    run: async s => {
      s.set('night', 0.55);
      s.set('where', 'supper');
      await s.wait(4);
    },
  },
  {
    name: 'basket',
    run: async s => {
      s.set('candles', 'basket');
      s.set('basket', 1);
      await s.wait(2.5);
      s.set('candles', 'shelf');
      await s.wait(1.5);
      s.set('paints', true);
      await s.wait(2.5);
      s.set('basket', 0);
      await s.wait(0.5);
    },
  },
  {
    name: 'jetty',
    run: async s => {
      s.set('night', 0);
      s.set('lamps', 0);
      s.set('dusk', 1);
      s.set('where', 'jetty');
      await s.wait(1.5);
      s.set('lantern_bow', 1);
      await s.wait(1.5);
      await s.move('frost', 1, { over: 5 });
      await s.wait(2);
    },
  },
];
