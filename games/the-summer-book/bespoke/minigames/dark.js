// М10а «The Stones in the Fog» without the lantern (Ш3 «behind», the cape in the moonlit fog) — path.js says it. With
// her strength at 1 or less she sits down at the second stone to get her breath.
import { path } from './path.js';

export default path({ title: tr('The Stones in the Fog'), about: 11, slip: 'rest', breath: s => s.scales.strength <= 1,
  phrase: tr('Wet stones, fog white under the moon, and no lantern.') });
