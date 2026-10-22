// The game's mini-games at stage 3 (scenario §7), each a stub (stub.js): its name, its gesture, what the hands will do
// and the mood, the plate's line, the point its mark stands on — in the scene the step plays it on (stand-in scenes:
// the landing for the valley, the sea, the pool and the shore; the round room for the lantern room).
import { stub } from './stub.js';

const HOLD = tr('hold'), LET_GO = tr('let go'), PULL = tr('pull slowly'), BALANCE = tr('balance'), STILL = tr('touch nothing');

// prologue
export const ladle = stub({ title: tr('The Ladle'), gesture: HOLD, at: 'papa',
  about: tr('The ladle held over the little fire till the smoke turns white. Let go too soon — Papa blows on his paw: “Ow.” A moment of being needed.'),
  phrase: tr('A thread of smoke out of the moss under the apple tree.') });
// chapter 1
export const tiller = stub({ title: tr('The Tiller'), gesture: BALANCE, at: 'boat',
  about: tr('The bow kept on the star through three waves. Blown off — “Just as planned.” Leading your own.'),
  phrase: tr('A star over the bow, and three waves coming.') });
export const can = stub({ title: tr('The Can'), gesture: BALANCE, at: 'shelf#paraffin',
  about: tr('The full can carried over the threshold and set on the shelf. A splash — Mama wipes the threshold. Keeping the light safe.'),
  phrase: tr('A full can, and a high threshold.') });
// chapter 2
export const match = stub({ title: tr('The Match'), gesture: PULL, at: 'lantern#flame',
  about: tr('A match brought to the wick against the draught. Out halfway — he strikes another. Hope.'),
  phrase: tr('A wick, a match, and a draught from the gallery.') });
export const lead = stub({ title: tr('The Lead'), gesture: PULL, at: 'papa',
  about: tr('The rope with its weight let down into the black pool, and down, and down. Excitement.'),
  phrase: tr('A rope with a weight, and black water with no bottom.') });
export const armful = stub({ title: tr('The Armful'), gesture: BALANCE, at: 'papa',
  about: tr('An armful of seaweed higher than his head, carried without seeing his feet. Spilt — Mama laughs. Together.'),
  phrase: tr('Seaweed higher than his head.') });
export const knot = stub({ title: tr('The Knot'), gesture: PULL, at: 'fisher',
  about: tr('A thread drawn slowly out of the knot in the net. Silently, beside him.'),
  phrase: tr('A net pulled into a knot.') });
export const steady = stub({ title: tr('Steady'), gesture: HOLD, at: 'wall_a#keeper',
  about: tr('The lantern held sideways to the sooty wall: in the slanting light the grooves under the soot show. It trembles — the letters jump. Work.'),
  phrase: tr('Soot on the wall, and pencil under it.') });
export const thread = stub({ title: tr('The Thread'), gesture: PULL, at: 'mama',
  about: tr('Papa threads Mama’s needle; his paws are big, and it comes out funny. A small thing for two.'),
  phrase: tr('A needle, a thread, and big paws.') });
export const lantern = stub({ title: tr('The Lantern'), gesture: LET_GO, at: 'lantern#flame',
  about: tr('The boy takes hold of the handle; Papa opens his paw. Not let go — the boy pulls harder. Giving what is yours.'),
  phrase: tr('One handle, and two paws on it.') });
export const half = stub({ title: tr('Half a Light'), gesture: HOLD, at: 'wall_a#keeper',
  about: tr('A sheet held to the turned-down flame: the grooves do not show, and he is afraid to turn it up — there would not be enough for his son. Nothing to be seen.'),
  phrase: tr('A low flame, and grey grooves.') });
// chapter 3
export const door = stub({ title: tr('The Door'), gesture: PULL, at: 'lighthouse#door',
  about: tr('Leaning on the door against the pines; it gives a palm’s width at a time. Too hard — it bangs into a pine, and My roars with laughter. Stubbornness.'),
  phrase: tr('Pines against the door.') });
export const palm = stub({ title: tr('The Palm'), gesture: HOLD, at: 'wall_a',
  about: tr('His palm held on the painted gate while he calls. Calling her back.'),
  phrase: tr('A painted gate, and plaster under the paw.') });
export const dust = stub({ title: tr('Dust'), gesture: PULL, at: 'wall_a#keeper',
  about: tr('Sitting on the floor while he waits, he wipes the dust off the lowest line with his paw. Too hard — a cloud of dust, and Papa sneezes. Waiting, keeping the hands busy.'),
  phrase: tr('Dust by the floor, and a line under it.') });
export const asleep = stub({ title: tr('Asleep'), gesture: STILL, at: 'papa',
  about: tr('Ten seconds of touching nothing. The boy takes the lantern and freezes, looking at his father; a sign “open your eyes” comes up — touched, their eyes meet, and the boy knows that his father knows. Letting go on the sly.'),
  phrase: tr('A creak, and a hand on the lantern.') });
export const after = stub({ title: tr('After Him'), gesture: BALANCE, at: 'troll',
  about: tr('Keeping the distance behind the boy. Too near — he sits down by the Groke with his back to his father. Knowing.'),
  phrase: tr('A boy with a lantern, and steps behind him.') });
// chapter 4
export const boat = stub({ title: tr('The Boat'), gesture: PULL, at: 'boat',
  about: tr('The boat pulled up the rocks, the two of them, in time. A jerk — the boy looks round. Together, without words.'),
  phrase: tr('A heavy boat, and two pulling.') });
export const burner = stub({ title: tr('The Burner'), gesture: tr('hold, then let go'), at: 'lantern#flame',
  about: tr('The burner held; let go when the flame turns blue. Not let go in five seconds — the flame tears loose by itself and Papa snatches his paw away. Whether it catches is decided by the sheets and the oil, not by the hands. Stubbornness.'),
  phrase: tr('The burner, the storm, and the last paraffin.') });
export const hold = stub({ title: tr('The Door in the Storm'), gesture: HOLD, at: 'papa',
  about: tr('The door held through the blows of the sea. It shudders. Fear, together.'),
  phrase: tr('A door, and the sea behind it.') });
export const rocks = stub({ title: tr('Over the Rocks'), gesture: PULL, at: 'fisher',
  about: tr('Step by step over the rocks, holding to the rock. For someone else.'),
  phrase: tr('Rocks, foam, and a lantern in the wind.') });
export const both = stub({ title: tr('The Burner, and Run'), gesture: tr('hold, let go sooner'), at: 'lantern#flame',
  about: tr('The burner held — and before it turns blue he is asked to let go: below, the door has banged. Not let go — in five seconds a second blow, and the paw slips by itself. Not in time.'),
  phrase: tr('The burner — and the door banging below.') });
export const shoulder = stub({ title: tr('The Shoulder'), gesture: LET_GO, at: 'troll',
  about: tr('The paw taken off the son’s shoulder. Allowing.'),
  phrase: tr('A paw on a small shoulder.') });
export const keep = stub({ title: tr('Holding Him'), gesture: HOLD, at: 'troll',
  about: tr('The son’s shoulder held for ten seconds. Let go sooner — the boy stands a long time in the doorway, but does not go. Holding back.'),
  phrase: tr('A paw on a small shoulder.') });
export const beside = stub({ title: tr('As Far as the Dune'), gesture: BALANCE, at: 'troll',
  about: tr('Walking beside the boy, not getting ahead. Being near.'),
  phrase: tr('Two in the moonlight, one a little ahead.') });
// the finales
export const beam = stub({ title: tr('The Beam'), gesture: STILL, at: 'lantern#flame',
  about: tr('Touching nothing: the beam goes over the island by itself and lights each one in turn, lingering on none.'),
  phrase: tr('The beam goes round.') });
export const mooring = stub({ title: tr('The Mooring'), gesture: LET_GO, at: 'boat',
  about: tr('The mooring line let go.'),
  phrase: tr('A mooring line, and a quiet sea.') });
export const pie = stub({ title: tr('To the Cape'), gesture: BALANCE, at: 'seat',
  about: tr('Mama’s pie carried over the rocks to the cape. A wobble — My: “You’ll drop it.” Carrying to a stranger.'),
  phrase: tr('A pie, and the rocks to the cape.') });
export const bread = stub({ title: tr('To the Cape'), gesture: BALANCE, at: 'seat',
  about: tr('Bread carried alone over the rocks to the cape. Carrying to a stranger.'),
  phrase: tr('Bread, and the rocks to the cape.') });
export const matches = stub({ title: tr('The Matchbox'), gesture: LET_GO, at: 'fisher',
  about: tr('Papa’s matchbox let go — into the Fisherman’s palm, or onto the stone beside him. Giving the right to light it.'),
  phrase: tr('A matchbox, and a hand that does not take it.') });
export const stair = stub({ title: tr('The Stair'), gesture: STILL, at: 'stair#stair',
  about: tr('Touching nothing: the shot begins with Papa already sitting on the middle step, between the lantern room and the room.'),
  phrase: tr('The middle of the stair.') });
