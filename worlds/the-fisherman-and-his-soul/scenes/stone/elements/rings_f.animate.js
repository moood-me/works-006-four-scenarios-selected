// widening and fading round him while he stands in the water and is here
const s = e.state;
e.lib.ringsMove(e, !['boat', 'bow'].includes(s.fisherman_at) && s.fisherman_here !== false, 0.4);
