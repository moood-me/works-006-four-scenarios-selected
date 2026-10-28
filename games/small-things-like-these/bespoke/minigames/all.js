// The game's mini-games at stage 3 (scenario «Мини-игры»), each a stub (stub.js): its name, its gesture (the one
// dictionary of gestures of the whole game), what the hands will do and the feeling, the plate's line, the point its
// mark stands on — in the scene the step plays it on (stand-in scenes: the coal gate for the yard, the chapel, the road,
// the street and the square; the parlour for the Christmas table).
import { stub } from './stub.js';

const RUB = tr('rub'), PULL = tr('pull slowly'), HOLD = tr('hold'), STILL = tr('touch nothing'), BALANCE = tr('keep balance');

// the prologue; short in chapter IV
export const hands = stub({ title: tr('Hands'), gesture: RUB, at: 'bill#hands',
  about: tr('Rubbing a palm in the basin; the water goes black. Six seconds, and it ends by itself: there is no failing here — under the nails it stays black. What does not wash off.'),
  phrase: tr('A basin of icy water, and black hands.') });
export const handsAgain = stub({ title: tr('Hands'), gesture: RUB, at: 'bill#hands',
  about: tr('The same basin, three seconds: the hands remember the prologue.'),
  phrase: tr('The basin again.') });
// chapter I
export const gaze = stub({ title: tr('The Look'), gesture: PULL, at: 'sara#chest',
  about: tr('His look slides down to the floor by itself; the player draws it up, along the faces, to the one who has stood up. Two seconds on her — done. Left on the floor six seconds: she asks from her knees, louder, and from the far door a sister: “To your bucket.” Shame, and looking all the same.'),
  phrase: tr('A long floor, girls on their knees, and one of them standing.') });
export const cake = stub({ title: tr('The Cake'), gesture: HOLD, at: 'bowl',
  about: tr('A handful of raisins and cherries held over the bowl and let fall into the dough, six times; Grace reaches for the bowl. Too slow — Grace has made off with three, raisins in her cheek. The warmth of the house.'),
  phrase: tr('A bowl of dough, and Grace’s hand.') });
// chapter II
export const bolt = stub({ title: tr('The Bolt'), gesture: PULL, at: 'shed_door',
  about: tr('The frozen bolt pulled; a jerk clangs. About fifteen seconds. A clang — a face turns in a window (no one comes out), and the bolt gives. Cold, and the fear of waking the house.'),
  phrase: tr('A bolt drawn from the outside, and frost on it.') });
export const cup = stub({ title: tr('The Cup'), gesture: BALANCE, at: 'tea',
  about: tr('At each of her sentences the cup slides toward the saucer’s edge; keep it there, till “I’ll take it off, Mother.” Spilt — she silently hands him a napkin. Pressure by politeness.'),
  phrase: tr('A cup on a saucer, and a polite voice.') });
// chapter III
export const table = stub({ title: tr('Hands on the Table'), gesture: HOLD, at: 'table_top',
  about: tr('A finger held on his black hands on the table; at each of her sentences the fingers want to clench. Let go — he takes his hands down to his knees, and Eileen speaks looking at the empty table. Not hiding your hands from your own.'),
  phrase: tr('Black hands on a scrubbed table.') });
// chapter IV
export const hammer = stub({ title: tr('The Hammer'), gesture: HOLD, at: 'bill#hands',
  about: tr('Held five seconds: his fingers find the worn places on the handle. Let go — it slips onto the frost; Bill picks it up and holds it as anyone would. The hand of a father he never knew.'),
  phrase: tr('An old hammer, its handle worn to another man’s palm.') });
export const boltAgain = stub({ title: tr('The Bolt'), gesture: PULL, at: 'shed_door',
  about: tr('The same gesture — but the bolt goes at the first pull. The hand remembers.'),
  phrase: tr('The same bolt.') });
export const hand = stub({ title: tr('The Hand'), gesture: STILL, at: 'sara#chest',
  about: tr('His hand held out; touch nothing — she comes by herself in eight seconds (four if she knows his name; punished — four, but she stops at arm’s length and looks him in the face). Touched twice — she comes out later by herself and stands apart. Not frightening her away.'),
  phrase: tr('An open door, and a hand held out.') });
// the finales
export const town = stub({ title: tr('Through the Town'), gesture: HOLD, at: 'sara#chest',
  about: tr('Held — Bill walks; people coming toward them — Sara slows; let go — wait for her. To the turn home, about thirty seconds. Gone on ahead — he goes back to her, and people look longer. Fear, and a strange lightness.'),
  phrase: tr('A lit street, people from vespers, and a girl in his coat.') });
export const file = stub({ title: tr('The File'), gesture: PULL, at: 'gate',
  about: tr('His look drawn along the faces of the file — it does not slide down now. Two seconds on the lamp over the coal gate (she is not in the file); if she is being taken to Dublin — two seconds on her at the car. Slid down — onto the frost by the bars; or he sees only her feet by the car. Finding one among many.'),
  phrase: tr('Girls in file with candles, behind the bars.') });
export const cracker = stub({ title: tr('The Cracker'), gesture: PULL, at: 'sara#chest',
  about: tr('He pulls his end, Sara pulls the other — bang. No failing: if he does not pull, Sara tugs by herself and the crown falls into the plate. Reaching her across the table.'),
  phrase: tr('A Christmas cracker across the table.') });
export const cloth = stub({ title: tr('The Tablecloth'), gesture: HOLD, at: 'table_top',
  about: tr('A finger held on his hands on the cloth while she asks — till his “Eat, Sara.” Let go — his hand rises and halfway drops; “Eat, Sara” comes quicker. Keeping silent before the one who wants to know.'),
  phrase: tr('His hands on the Christmas cloth.') });
export const glass = stub({ title: tr('The Glass'), gesture: RUB, at: 'window',
  about: tr('Rubbing the misted window; it mists over again. Three wipes, or ten seconds untouched — it mists over by itself. No failing. What cannot be seen from here.'),
  phrase: tr('A misted window on Christmas night.') });
