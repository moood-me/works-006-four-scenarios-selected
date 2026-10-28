// The house's own little scenario: the June morning on the veranda; the room by day, the bird on Sophia's pillow; dusk
// and supper on the veranda; the full moon's night, Sophia at the window; the storm, the lamp by the beds; the night
// of the fog, Grandmother at the window, the tent's candle going out, Papa's lantern going into the white; the dawn,
// the lamp burnt out; the second door.
return [
  { name: 'morning', run: async s => { await s.wait(5); } },
  { name: 'room', run: async s => {
    s.set('grandma_at', 'bed'); s.set('sophia_at', 'bed'); s.set('papa_at', 'doorway'); s.set('bird', true); s.set('teabox', true);
    s.set('view', 'room');
    await s.wait(5);
  } },
  { name: 'supper', run: async s => {
    s.set('bird', false); s.set('teabox', false); s.set('supper', true);
    s.set('grandma_at', 'table'); s.set('sophia_at', 'door'); s.set('papa_at', 'table'); s.set('view', 'veranda');
    await s.move('dusk', 1, { over: 4 });
    await s.wait(1);
  } },
  { name: 'moon', run: async s => {
    s.set('supper', false); s.set('dusk', 0); s.set('night', 1); s.set('hat', 'bed');
    s.set('sophia_at', 'window'); s.set('grandma_at', 'bed'); s.set('papa_at', 'cot'); s.set('view', 'window');
    await s.wait(5);
  } },
  { name: 'storm', run: async s => {
    s.set('hat', 'nail'); s.set('sophia_at', 'bed'); s.set('view', 'room'); s.set('lamp_lit', 1);
    await s.move('storm', 1, { over: 3 });
    await s.wait(5);
  } },
  { name: 'fog', run: async s => {
    s.set('storm', 0); s.set('flash', 0); s.set('lamp_lit', 0); s.set('late', 1); s.set('drops', 'full'); s.set('sophia_here', false);
    s.set('tent_light', 1); s.set('casement', 0.6); s.set('grandma_at', 'window'); s.set('view', 'window');
    await s.wait(2);
    await s.move('fog', 1, { over: 6 });
    await s.move('tent_light', 0, { over: 2 });
    s.set('far_light', 1);
    await s.move('far_light_at', 0.6, { over: 8, ease: 'linear' });
  } },
  { name: 'dawn', run: async s => {
    s.set('far_light', 0); s.set('far_light_at', 0); s.set('night', 0); s.set('dawn', 1); s.set('fog', 0.6);
    s.set('lamp', 'burnt'); s.set('grandma_at', 'chair'); s.set('cot', 'room'); s.set('casement', 0); s.set('view', 'room');
    await s.wait(5);
  } },
  { name: 'door', run: async s => {
    s.set('grandma_at', 'door2'); s.set('papa_at', 'door2'); s.set('view', 'door');
    await s.move('creak', 1, { over: 3 });
    await s.wait(2);
  } },
];
