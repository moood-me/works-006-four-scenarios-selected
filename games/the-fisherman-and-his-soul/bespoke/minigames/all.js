// The game's mini-games at stage 3 (scenario §7), each a stub (stub.js): its name, its gesture, what the hands will do
// and the mood, the plate's line, the point its mark stands on — in the scene the step plays it on (stand-in scenes:
// the pier for the boat, the stone and the deep; the bridge for the potter's house).
// The dictionary of gestures (§7): pull slowly — to draw out, to decide; let go — to let someone go; trace the
// outline — to cut away; touch nothing — to listen, not to take; hold — not to let go; rhythm — someone else's dance;
// balance — to carry quietly.
import { stub } from './stub.js';

const HOLD = tr('hold'), LET_GO = tr('hold, then let go'), PULL = tr('pull slowly'), BALANCE = tr('balance'), STILL = tr('touch nothing'),
  TRACE = tr('trace the outline'), RHYTHM = tr('rhythm');

// prologue
export const net = stub({ title: tr('The Net'), gesture: PULL, at: 'fisherman',
  about: tr('The heavy net drawn up hand over hand, slowly; the boat heels. Pulled too hard — the net tears at the edge, and the hole is seen on the rail of the pier all through the game. Either all the fish of the sea, or trouble.'),
  phrase: tr('A heavy net, and the boat heeling.') });
export const release = stub({ title: tr('Letting Her Go'), gesture: LET_GO, at: 'mermaid',
  about: tr('A finger held on the knot of the net — and lifted when she grows still. Not let go — the knot slides by itself and she slips out without looking at him. Letting go.'),
  phrase: tr('A knot of the net, and a small hand in it.') });
// chapter 1
export const dance = stub({ title: tr('The Dance'), gesture: RHYTHM, at: 'witch',
  about: tr('Taps to the Witch’s tambourine, round the well, facing her. Out of step — he stumbles, and she pulls him by the hands harder and laughs. Someone else’s dance.'),
  phrase: tr('A tambourine, the full moon, and two dancing round the well.') });
export const knife = stub({ title: tr('The Knife'), gesture: TRACE, at: 'soul',
  about: tr('The knife drawn along the shadow at his feet, heel to toe. An uneven cut — the Soul’s left hand stays blurred, like smoke, to the end of the game. Cutting away a part of himself.'),
  phrase: tr('A long shadow on the boards, and a knife with a green snakeskin handle.') });
// chapter 2
export const song = stub({ title: tr('The Song'), gesture: STILL, at: 'mermaid',
  about: tr('Ten seconds of touching nothing while she sings. Touched — she stops, laughs and begins again, nearer; after two touches she sings holding his hand. Listening, not taking.'),
  phrase: tr('Four notes under the water.') });
// chapter 3
export const cup = stub({ title: tr('The Cup'), gesture: BALANCE, at: 'cottage',
  about: tr('The silver cup set back on the shelf behind the bread, without a sound. It rings — the potter turns, sees it on the shelf, looks at his guest a long time and gives no bread. Carrying quietly.'),
  phrase: tr('A silver cup, a shelf, and the potter’s back.') });
// chapter 3, without him
export const post = stub({ title: tr('The Post'), gesture: LET_GO, at: 'lantern_post',
  about: tr('A finger held on the post of the pier — and let go: he goes under the water. Not let go — the fingers slip by themselves, and he goes under without looking back at the pier. The pair of the prologue’s knot: letting go of the shore.'),
  phrase: tr('The post of the pier, and the water below.') });
// chapter 4
export const knife2 = stub({ title: tr('The Knife, Again'), gesture: TRACE, at: 'lantern_post',
  about: tr('The same gesture as at moonrise, with the rusty knife — and the knife goes through the shadow as through water, even when the line is true. Not tried — he throws the knife on the boards, then drives it back into the post. A knife cuts once.'),
  phrase: tr('A rusty knife, and a shadow that is one again.') });
export const net2 = stub({ title: tr('The Net, for the Children'), gesture: PULL, at: 'fisherman',
  about: tr('The net drawn up from the widow’s boat, slowly. Pulled too hard — half a net; the children get fish all the same. Deciding for others.'),
  phrase: tr('The widow’s boat, his lantern on the bow, his net.') });
export const hold = stub({ title: tr('Holding Her'), gesture: HOLD, at: 'mermaid',
  about: tr('Her hand held in his while the wave comes, ten seconds. It slips — he stays beside her, their fingers almost touching (it shows in the epilogue). Not letting go.'),
  phrase: tr('Her cold hand, and the black wave coming.') });
export const drag = stub({ title: tr('The Net, Up the Shore'), gesture: PULL, at: 'fisherman',
  about: tr('Her body wrapped in his net, drawn up the shore, backing away, slowly. Too hard — the wave reaches his knees, the net tears wider; he draws her out all the same. The same net that drew her out in the prologue.'),
  phrase: tr('A net with her in it, the shore, and the sea behind.') });
