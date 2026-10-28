// The game's mini-games till stage 5 (scenario §7), each a stub (stub.js): its name, its gesture (the scenario's dictionary:
// hold — to keep, to be near; let go — to let her go, by herself; pull slowly — carefully, to make up one's mind; touch
// nothing — to wait it out, to keep silent; balance — to carry, to hold on), what the hands will do, what is felt and
// how it may go, the plate's line, the point its mark stands on — in the scene the step plays it on (its contract's
// points or offers).
import { stub } from './stub.js';

const HOLD = tr('hold'), LET_GO = tr('let go'), PULL = tr('pull slowly'), BALANCE = tr('balance'), STILL = tr('touch nothing');

// prologue
export const peonies = stub({ title: tr('The Peonies'), gesture: PULL, at: 'grandma#chest',
  about: tr('Parting the peony stalks slowly, without breaking them, till something shines in the earth. A stalk broken — Grandmother: “Oh well.” The funny humiliation of being old.'),
  phrase: tr('The peonies are thick, and somewhere under them are her teeth.') });
export const wrist = stub({ title: tr('The Wrist'), gesture: HOLD, at: 'sophia#chest',
  about: tr('An old hand on the child’s wrist while she leans out over the water. Held long — she pulls harder to get free; let go too soon — she sways over the water and Grandmother grabs her again. Not to give her up.'),
  phrase: tr('Sophia leans out over the water, and the ledge goes down into the dark.') });
export const shoulder = stub({ title: tr('The Shoulder'), gesture: LET_GO, at: 'sophia#chest',
  about: tr('The fingers on her shoulder opened. Opened late — Sophia shakes the hand off herself. Letting her go.'),
  phrase: tr('Under the clear water a ledge, and the girl’s shoulder under an old hand.') });
export const ledge = stub({ title: tr('The Ledge'), gesture: BALANCE, at: 'rock#shelf',
  about: tr('Climbing down the slippery rock into the cold water, knee-deep, keeping her balance. A slip — Sophia grabs her. Together.'),
  phrase: tr('Slippery rock, cold water, and the ledge under it.') });
// chapter I
export const knife = stub({ title: tr('The Knife'), gesture: PULL, at: 'grandma#chest',
  about: tr('Shaving after shaving off the driftwood, slowly, till it is a seal. A jerk — the seal has one flipper. Her own work in her hands.'),
  phrase: tr('A piece of driftwood, a knife, and somewhere inside it a seal.') });
export const push = stub({ title: tr('Push Off'), gesture: LET_GO, at: 'rowboat#gunwale',
  about: tr('A palm on the gunwale — and the boat pushed off. Held too long — Eriksson pushes off with his oar himself. Letting the old life go.'),
  phrase: tr('Two old hands on the gunwale, and the boat wants to go.') });
export const net = stub({ title: tr('The Net'), gesture: PULL, at: 'net#knot',
  about: tr('The thread drawn slowly out of the knot, the two of them, without a word. A jerk — the knot tightens and Papa undoes it himself. Side by side without words.'),
  phrase: tr('A net pulled into a knot, and two pairs of hands.') });
// chapter II
export const pebble = stub({ title: tr('The Pebble'), gesture: LET_GO, at: 'grandma#chest',
  about: tr('A pebble let fall into the glassy water: rings, and nothing more happens. Making peace without words. (Skipped — she throws it without looking, a long breath later.)'),
  phrase: tr('The sea like glass, and a pebble in an old hand.') });
export const palm = stub({ title: tr('The Palm'), gesture: HOLD, at: 'beds#gap',
  about: tr('A palm on the blanket between the two beds, not reaching out. Taken away — Sophia does not come over at once, sits a long time looking at it. Being near without an embrace.'),
  phrase: tr('Two beds side by side, and a gap of a blanket between them.') });
export const hand = stub({ title: tr('The Hand'), gesture: HOLD, at: 'sophia#chest',
  about: tr('Her small hand held till she falls asleep. Let go too soon — in her sleep she gropes over the blanket and finds the hand herself. Comforting.'),
  phrase: tr('A small hand in an old one, and the moon in the window.') });
export const door = stub({ title: tr('The Door'), gesture: PULL, at: 'door2#handle',
  about: tr('The creaking door opened slowly, so as to wake no one. It creaks — on the veranda Papa coughs. Leading her out on the sly.'),
  phrase: tr('The second door creaks, and Papa sleeps on the veranda.') });
// chapter III
export const moss = stub({ title: tr('The Moss'), gesture: BALANCE, at: 'grandma#chest',
  about: tr('The horizon kept level while the forest spins; kept — it spins more quietly. Not kept — Grandmother sits longer and Sophia comes closer. Holding on.'),
  phrase: tr('The ground swims, and the grey trees go round.') });
export const cup = stub({ title: tr('The Cup'), gesture: BALANCE, at: 'table#cup',
  about: tr('The cup held level while he talks. Coffee spilt — Papa looks at her hand. Keeping a straight face.'),
  phrase: tr('A full cup, and Papa talking about the doctor.') });
export const still = stub({ title: tr('Not a Move'), gesture: STILL, at: 'sophia#chest',
  about: tr('Ten seconds of touching nothing under the child’s palm. Touched — Sophia: “You’re not asleep?” and goes away. Pretending to sleep.'),
  phrase: tr('A candle, and a small palm on an old breast.') });
export const stones = stub({ title: tr('The Stones'), gesture: BALANCE, at: 'path#stone2',
  about: tr('Over the stones with the lantern, through the forest at night. The lantern sways — Sophia grabs her skirt. A night outing.'),
  phrase: tr('Stones in the dark, and a lantern in an old hand.') });
export const rail = stub({ title: tr('The Rail'), gesture: HOLD, at: 'porch#rail',
  about: tr('Holding on to the porch rail in the wind and the rain. Let go — Grandmother sways and Sophia grabs her cardigan. Together against the sky.'),
  phrase: tr('Rain, white sky, and the porch rail wet under the hands.') });
export const blanket = stub({ title: tr('The Blanket'), gesture: HOLD, at: 'sophia#chest',
  about: tr('The edge of the blanket held over the two of them while she sings. It slips — the thunder is louder. Covering her.'),
  phrase: tr('Thunder, and a blanket over two heads.') });
export const sleeve = stub({ title: tr('The Sleeve'), gesture: LET_GO, at: 'sophia#chest',
  about: tr('Her fingers unclenched from the sleeve. Unclenched late — Sophia lets go of the sleeve herself, finger by finger. Taking the blame off her.'),
  phrase: tr('Small fingers clutching an old sleeve.') });
// chapter IV
export const parcel = stub({ title: tr('The Parcel'), gesture: LET_GO, at: 'sophia#chest',
  about: tr('Her hands opened while Sophia pulls the parcel to herself. Held long — the string snaps, Sophia sits down on the pier with the parcel and laughs. The present is hers, not mine.'),
  phrase: tr('A parcel with a label, and Sophia pulling it her way.') });
export const pole = stub({ title: tr('The Pole'), gesture: HOLD, at: 'pole#grip',
  about: tr('The tent pole held while Sophia ties the ropes. It trembles — the tent stands crooked; Sophia: “That’s how it should be.” Helping — and not doing it for her.'),
  phrase: tr('A pole on bare rock, and a girl tying knots.') });
export const fog = stub({ title: tr('The Stones in the Fog'), gesture: BALANCE, at: 'path#stone2',
  about: tr('Over the wet stones in the fog, the lantern a circle of light in the white. A slip — the lantern goes out and lights again. To her.'),
  phrase: tr('Wet stones, white fog, and somewhere the tent.') });
export const dark = stub({ title: tr('The Stones in the Fog'), gesture: BALANCE, at: 'path#stone2',
  about: tr('Over the wet stones without a lantern, by the moonlit fog, stone by stone, so that Sophia does not hear. A slip — she sits down and waits, then goes on. Slowly, to her.'),
  phrase: tr('Wet stones, fog white under the moon, and no lantern.') });
export const lamp = stub({ title: tr('The Lamp'), gesture: HOLD, at: 'lamp#lamp',
  about: tr('The lamp raised to the glass and held there while his light goes off into the fog. Lowered — Papa’s light in the fog is lost for a moment and found again. Shining.'),
  phrase: tr('A lamp at the window, and a light going away into the white.') });
export const wait = stub({ title: tr('Waiting'), gesture: STILL, at: 'grandma#chest',
  about: tr('Fifteen seconds of touching nothing. Touched — Grandmother’s hand jerks toward the door and comes back. Not stepping in.'),
  phrase: tr('A lamp in the window, and the cape white with fog.') });
export const knock = stub({ title: tr('Three Times'), gesture: STILL, at: 'tent_back#palm',
  about: tr('Twelve seconds of touching nothing, a palm by the canvas — not knocking. Touched — Grandmother’s hand trembles by the canvas and draws back. Being there and keeping silent.'),
  phrase: tr('Wet canvas, and a girl talking on the other side of it.') });
// epilogue
export const gangway = stub({ title: tr('The Gangway'), gesture: LET_GO, at: 'gangway#rail',
  about: tr('Her palm let go of the gangway rail, the last time. (Skipped — the hand opens by itself, a long breath later.)'),
  phrase: tr('The gangway rail, and the boat waiting.') });
export const hold = stub({ title: tr('Sophia’s Hand'), gesture: HOLD, at: 'sophia#chest',
  about: tr('Sophia’s hand held until the island is gone. (Skipped — the hands hold by themselves.)'),
  phrase: tr('A small hand, and the island going into the white.') });
export const oars = stub({ title: tr('The Oars'), gesture: LET_GO, at: 'dinghy#oars',
  about: tr('Grandmother’s hands lying over Sophia’s on the oars — opened. The dinghy goes crooked, then straight. (Skipped — the hands open by themselves.)'),
  phrase: tr('Two pairs of hands on the oars, and a hundred strokes to the boat.') });
export const upright = stub({ title: tr('Sitting Upright'), gesture: BALANCE, at: 'grandma#chest',
  about: tr('Sitting upright in the rocking boat. (Skipped — she sits so by herself.)'),
  phrase: tr('A rocking boat, and the fog closing behind.') });
