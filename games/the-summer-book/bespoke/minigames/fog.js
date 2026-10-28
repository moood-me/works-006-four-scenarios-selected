// М10а «The Stones in the Fog» (Ш3 «go», the cape in the fog, with the lantern) — path.js says it. With her strength
// at 1 or less it ends at the second stone (the piece `sit_half`: she sits down halfway).
import { path } from './path.js';

export default path({ title: tr('The Stones in the Fog'), about: 9, slip: 'dip', short: s => s.scales.strength <= 1,
  phrase: tr('Wet stones, white fog, and somewhere the tent.') });
