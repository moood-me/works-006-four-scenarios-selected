scene.kit.island.lightning(scene);
scene.kit.island.beam(scene);
// The beach's mechanics: where the Groke is (groke_at) and where the son stands (troll_at) put them there and turn
// them — the Groke to the lantern on the stone while it is there, else to the lighthouse; the son to her — and lay the
// blanket behind him; the sea-horses swim off when they go (seahorses → gone). Set when the scene opens, at once;
// changed while it plays, the son walks there at his own pace and the Groke is put in her new place.
const L = scene.lib;
const groke = () => L.SEATS[scene.get('groke_at')] ?? L.SEATS.edge;
const trollAt = () => {
  const at = scene.get('troll_at');
  if (at !== 'beside') return L.TROLL[at] ?? L.TROLL.far;
  const [a, d] = groke();
  return [a + L.BESIDE[0], d + L.BESIDE[1]];
};
// what the Groke faces: the lantern on the stone while it is there, else the lighthouse's lantern up on the knoll
const grokeTurn = () => {
  const [a, d] = groke(), to = scene.get('lantern_stone') !== 'none' ? L.STONE : L.LIGHTHOUSE;
  return L.turnTo(a, d, to[0], to[1]);
};
const placeGroke = () => {
  const [a, d] = groke();
  scene.set('groke_a', a);
  scene.set('groke_d', d);
  scene.set('groke_turn', grokeTurn());
};
// the son faces her (beside her, he faces as she does); the blanket lies on the sand behind him
const trollTurn = ([a, d]) => (scene.get('troll_at') === 'beside' ? grokeTurn() : L.turnTo(a, d, ...groke()));
const placeBlanket = ([a, d], turn) => {
  const t = turn * Math.PI / 180;
  scene.set('blanket_a', a - Math.sin(t) * 0.75);
  scene.set('blanket_d', d - Math.cos(t) * 0.75);
};
const placeTroll = walk => {
  const p = trollAt(), turn = trollTurn(p);
  placeBlanket(p, turn);
  if (!walk) {
    scene.set('troll_a', p[0]);
    scene.set('troll_d', p[1]);
    scene.set('troll_turn', turn);
    return;
  }
  scene.sequence(async s => {
    await s.person('troll').walk([p]);
    await s.person('troll').turn(turn);
  }, { name: 'troll_to' });
};
placeGroke();
placeTroll(false);
scene.set('seahorses_away', scene.get('seahorses') === 'gone' ? 1 : 0);
scene.on('change', 'groke_at', () => { placeGroke(); if (scene.get('troll_at') === 'beside') placeTroll(false); });
scene.on('change', 'lantern_stone', () => scene.set('groke_turn', grokeTurn()));
scene.on('change', 'troll_at', () => placeTroll(true));
scene.on('change', 'seahorses', v => { if (v === 'gone') scene.move('seahorses_away', 1, { over: 6, ease: 'in' }); else scene.set('seahorses_away', 0); });
