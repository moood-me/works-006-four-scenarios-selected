// Epilogue (scenario §5, §10). 27 August, the second quiet day. What the camera passes in every finale, by the play's
// marks (a sheet); then the ending the three hinges decide (story.js facts): “The Beam” (the Lighthouse), “A Boat to
// the Valley” (Home), “A Pie on the Cape” (the Shore), “Halfway up the Stair” (holding the incompatible) — each full,
// or late (decided only in the storm).
// Scenes: the landing on the quiet morning; each finale where it plays — the lantern room and the beam's way (the room,
// the cape, the shore), the landing and the sea going home, the room and the cape at the pie, the room and its stair.
// Reads: everything (facts). Leaves: nothing.
import { SCENES, facts, isle } from '../story.js';
import { beam, mooring, pie, bread, matches, stair } from '../minigames/all.js';

// the room on the 27th (look: the hour): the storm's damage gone, the lantern empty; Mama — at the table, or in the
// garden on the wall (her figure under the apple tree, the table empty)
const room = (look, f, keys = {}) => ({ ...isle(27, look), lantern_at: 'table', flame: 'out', basket: f.basket, wall_mama: f.wall === 'walk' ? 1 : 0, ...keys });
// the shore on the morning after night 3 (scenario 4.7): the dark circle where she sat with the boy, or her white track
// into the sea; the hollow on the dune where Papa sat
const sand = f => (f.night3 === 'right' ? { groke_at: 'water', track: 1, frost: 0.3 } : { warm: 1, frost: 0.3, dune_dent: f.night3 === 'dune' });

export default {
  number: '', title: tr('Epilogue'),
  titles: ['What the Camera Passes', 'The Finale'],
  choices: [],
  steps: [
    // the common shots (§10), by the marks
    async g => {
      const f = facts(g.state), m = g.state.marks;
      await g.scene(SCENES.landing, { here: [], keys: { ...isle(27, 'morning'), pines: 1, boat: 'tarred', bundles: 'none', cleft: f.day === 'weed' ? 'sprout' : 'empty' } });
      await g.plate(tr('27 August: the second quiet day. The boat is tarred, the driftwood on the rocks has dried, the stove has dried out.'));
      const lines = [];
      if (f.tell === 'asked') lines.push(tr('The wall: Mama’s garden in green, her own paints.'));
      else lines.push(tr('The wall: Mama’s garden in red and blue — red lead and window paint, not hers.'));
      if (f.garden <= 1) lines.push(tr('The garden is unfinished; by the gate, a little Papa.'));
      else lines.push(tr('So much of the garden is painted: {n} of 4.', { n: f.garden }));
      if (f.wall === 'walk') lines.push(tr('At some moment Mama is in the garden again: a figure under the apple tree, the table empty.'));
      else if (f.wall === 'call') lines.push(tr('The brushes dry in a jar, the apple tree without leaves; Mama at the table.'));
      else lines.push(tr('Two cups on the table.'));
      if (f.line27) lines.push(tr('The line of 27 August by the floor, wiped clean.'));
      else lines.push(tr('The line of 27 August by the floor, under dust.'));
      lines.push(tr('The stone with the arrow.'));
      if (f.day === 'weed') lines.push(tr('The cleft by the landing: a green sprout.'));
      else lines.push(tr('The cleft by the landing: bare.'));
      if (f.day === 'pool') lines.push(tr('The rock by the pool: the coiled rope, and in the log, “Depth: more than the rope.”'));
      if (f.fisher === 'keeper') lines.push(tr('The cape: the Fisherman turns away.'));
      else if (f.fisher === 'invite') lines.push(tr('The cape: the Fisherman lifts a hand.'));
      else lines.push(tr('The cape: the Fisherman looks Papa’s way.'));
      if (f.day === 'fisher' && f.fisher === 'sit') lines.push(tr('His net is spread out, and Papa sees the place he untangled.'));
      else if (f.day === 'fisher') lines.push(tr('Catching Papa’s look, the Fisherman rolls up his net.'));
      if (f.night3 === 'go') lines.push(tr('The shore: dark sand under the Groke, the boy beside her.'));
      else if (f.night3 === 'right') lines.push(tr('The shore: a white track into the water; the boy alone, looking at the sea.'));
      else lines.push(tr('The shore: the boy by the Groke; he walks past Papa.'));
      if (f.groke > 0) lines.push(tr('Less frost: she was given light.'));
      if (f.glance === 'never') lines.push(tr('The boy does not look at Papa once.'));
      else if (f.glance === 'once') lines.push(tr('Once, the boy turns to look at Papa.'));
      else lines.push(tr('The boy looks at the sea.'));
      if (f.night1 === 'lamp' && f.lampKept) lines.push(tr('The camp bed up top is slept in: the promise kept.'));
      else if (f.night1 === 'lamp') lines.push(tr('The camp bed up top is empty: the promise broken.'));
      if (f.basket) lines.push(tr('Mama’s basket, packed, by the door: the term was not kept.'));
      if (m.son_later) lines.push(tr('The stone in the boy’s paws; the ring in the clearing is one stone short.'));
      await g.sheet(tr('What the camera passes'), lines);
    },
    // the finale
    async g => {
      const f = facts(g.state), m = g.state.marks;
      if (f.ending === 'beam') {
        const up = { here: ['papa'], moods: { papa: 'smile' }, keys: { ...isle(27, 'night'), lenses: 1, flame: 'lit', cot: f.night1 !== 'lamp' ? 'none' : f.lampKept ? 'taken' : 'empty' } };
        if (f.basket) await g.scene(SCENES.room, { here: ['mama'], moods: { mama: 'neutral' }, keys: room('morning', f, { wall_mama: 0 }) });
        else await g.scene(SCENES.top, up);
        g.title(tr('The Beam'));
        if (f.basket) await g.plate(tr('In the first shot Mama unpacks her basket without a word.'));
        if (f.lit && f.form === 'full') await g.plate(tr('The lighthouse is lit. It caught in the storm, and from the 27th it burns every night: on quiet days the warm oil runs by itself, and by the first wind Papa has brought a new can on the mended boat.'));
        else {
          await g.plate(tr('A week later. Papa sailed for paraffin and for a week learnt the lamp by himself, till the oil ran.'));
          await g.say('my', 'It’s you who can’t');
          await g.say('papa', 'I can now');
          if (f.form === 'late') await g.plate(tr('All week Papa sleeps up top; every evening Mama puts his cup on the table, and by morning it is full.'));
        }
        if (f.basket) await g.scene(SCENES.top, up);
        await g.plate(tr('Papa on the gallery is writing the Big Book about the Sea.'));
        await g.play(beam);
        await g.scene(SCENES.room, { here: f.wall === 'walk' ? [] : ['mama'], moods: { mama: 'neutral' },
          keys: room('night', f, { apple_leaves: f.wall !== 'call', cups: f.wall === 'wait' ? 2 : 1 }) }, { cut: true });
        if (f.wall === 'walk') await g.plate(tr('The beam passes Mama: the table empty, she is under the apple tree on the wall.'));
        else if (f.wall === 'call') await g.plate(tr('The beam passes Mama: at the table, by the leafless apple tree.'));
        else await g.plate(tr('The beam passes Mama: at the table, by two cups.'));
        await g.scene(SCENES.cape, { here: ['fisher', 'my'], keys: { ...isle(27, 'night'), lighthouse_lit: 1 } }, { cut: true });
        await g.plate(tr('My on a rock. The Fisherman on the cape.'));
        await g.scene(SCENES.shore, { here: f.night3 === 'right' ? ['troll'] : ['troll', 'groke'],
          keys: { ...isle(27, 'night'), lighthouse_lit: 1, ...sand(f), troll_at: f.night3 === 'right' ? 'far' : 'beside' } }, { cut: true });
        if (f.night3 === 'right') await g.plate(tr('The shore: empty sand and a white track into the water; the boy alone by the water.'));
        else await g.plate(tr('The shore: the boy on dark sand by the Groke. The Groke reaches toward the beam, and it goes on.'));
        await g.scene(SCENES.room, { here: ['my'], moods: { my: 'smile' }, keys: room('night', f, { line27: 'clean' }) }, { cut: true });
        await g.plate(tr('My lies on her stomach by the wall and reads the lowest lines, the way she read them all:'));
        await g.say('my', '“I am forty today. Nobody knows.” Ha. I know');
        await g.plate(tr('And she looks out of the window, at the cape.'));
        await g.say('narrator', 'The lighthouse shone far. For everyone who was at sea');
        await g.plate(tr('Last shot: the beam goes out to sea past the window, behind which is the table.'));
      } else if (f.ending === 'boat') {
        await g.scene(SCENES.landing, { here: ['papa', 'mama', 'troll', 'my'], moods: { papa: 'smile', mama: 'smile', troll: 'sad' },
          keys: { ...isle(27, 'morning'), pines: 1, boat: 'tarred', bundles: 'none', papa_at: 'stone', mama_at: 'stand', troll_at: 'boat', my_at: 'rock' } });
        g.title(tr('A Boat to the Valley'));
        await g.plate(tr('A quiet morning, 27 August. The boat at the landing, a black stripe of tar on her side. Mama carries the basket. Papa puts the key back under the stone with the arrow.'));
        await g.play(mooring);
        if (f.termKept) {
          await g.say('mama', 'Full moon');
          await g.say('papa', 'The captain keeps his word');
          await g.say('my', 'The captain didn’t light it');
        }
        const boat = { ...isle(27, 'day'), view: 'aft', island: 'behind', lantern_at: 'out', trail: 0 };
        await g.scene(SCENES.sea, { here: ['papa', 'mama', 'troll', 'my'], moods: { papa: 'smile', mama: 'smile', troll: 'sad' }, keys: boat });
        await g.plate(tr('Papa tells about the storm already a little differently from how it was.'));
        await g.say('my', 'That’s not how it was');
        await g.plate(tr('The boy in the stern looks at the shore till the horizon.'));
        await g.scene(SCENES.shore, { here: [], keys: { ...isle(27, 'morning'), ...sand(f) } }, { cut: true });
        if (f.night3 === 'go') await g.plate(tr('On the morning sand you can see how night 3 ended: a dark circle where she sat with the boy.'));
        else if (f.night3 === 'right') await g.plate(tr('On the morning sand you can see how night 3 ended: a white track into the water.'));
        else await g.plate(tr('On the morning sand you can see how night 3 ended: a dark circle, and a hollow on the dune where Papa sat.'));
        if (f.form === 'late') await g.scene(SCENES.room, { here: [], keys: room('morning', f, { garden: 4, wall_mama: 0 }) }, { cut: true });
        if (f.form === 'late') await g.plate(tr('The garden on the wall is finished; leaving, Mama silently leaves her paints on the windowsill.'));
        await g.scene(SCENES.sea, { here: ['papa', 'mama', 'troll', 'my', 'fisher'], moods: { papa: 'smile', mama: 'smile', troll: 'sad' }, keys: boat }, { cut: true });
        await g.plate(tr('From the boat: the Fisherman, his net over his shoulder, comes up to the lighthouse, bends to the stone with the arrow and lays his palm on the closed door.'));
        if (f.fisher === 'invite') await g.plate(tr('He turns and lifts his hand after them.'));
        await g.plate(tr('Last shot: the dark lighthouse astern, the Fisherman at its door.'));
      } else if (f.ending === 'pie') {
        await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', mama: 'smile', my: 'smile', troll: 'neutral' },
          keys: room('morning', f, { wall_mama: 0, cups: 2, tea: 1 }) });
        g.title(tr('A Pie on the Cape'));
        if (f.basket) await g.plate(tr('In the first shot Mama unpacks her basket without a word.'));
        await g.plate(tr('Morning. Papa at the table tells about the night on the cape:'));
        await g.say('papa', 'A wave — higher than the lighthouse. And we sit there. Like two rocks');
        await g.say('my', 'You’ve told that one');
        await g.say('papa', 'Yesterday it wasn’t like that');
        if (f.form === 'full') {
          await g.say('papa', 'Today is his birthday');
          await g.say('my', 'At last');
          await g.plate(tr('Mama bakes a pie on the dried driftwood, with jam from the valley; My gathers shells. The Fisherman will not come into the lighthouse, so the pie goes to the cape.'));
          await g.scene(SCENES.cape, { here: ['fisher', 'papa'], moods: { papa: 'smile', fisher: 'neutral' },
            keys: { ...isle(27, 'night'), papa_at: 'stand' } });
          await g.play(pie);
          g.set('pie', true);
          g.set('papa_at', 'beside');
          await g.plate(tr('The Fisherman sits side-on to the lighthouse. Papa sets the pie down beside him; the Fisherman does not look at it. A long pause, the wind; then, not looking, he breaks off a piece and eats it without a word.'));
          await g.say('fisher', 'The sea is good today');
          await g.plate(tr('The lighthouse is dark; they sit in the moonlight.'));
          if (f.spoke) {
            await g.plate(tr('Papa puts his matchbox into the Fisherman’s palm.'));
            await g.play(matches);
            g.set('matchbox', 'palm');
            await g.say('fisher', 'No need');
            await g.plate(tr('— and closes his hand. When they all get up, the Fisherman gets up too — for the first time in front of them — and goes not over the rocks but to the lighthouse. He lays his palm on the door, does not open it, and sits down on the threshold facing the sea, the matchbox in his fist.'));
          } else {
            await g.plate(tr('Papa puts his matchbox on the stone beside the Fisherman.'));
            await g.play(matches);
            g.set('matchbox', 'stone');
            await g.plate(tr('While they are there, he does not take it; Papa looks back from the path — the stone is empty.'));
          }
          g.here('mama', true);
          g.set('mama_at', f.night3 === 'go' ? 'apart' : 'beside');
          g.here('my', true);
          if (f.night3 === 'dune') await g.plate(tr('Each in a corner of their own. The boy does not come to the pie.'));
          else if (f.night3 === 'go') await g.plate(tr('Each in a corner of their own. The boy is by the Groke, on dark sand.'));
          else await g.plate(tr('Each in a corner of their own. The boy alone by the water, looking at the sea.'));
          if (f.night3 === 'go') await g.plate(tr('My on a rock. Papa watches the Fisherman all evening. Mama sits apart, facing the shore where the boy is — then gets up first, lightly:'));
          else await g.plate(tr('My on a rock. Papa watches the Fisherman all evening. Mama sits beside Papa — then gets up first, lightly:'));
          await g.say('mama', 'I’ll go and wash the tin');
          await g.plate(tr('Papa, not turning round:'));
          await g.say('papa', 'Go on, go on');
          await g.plate(tr('She leaves the cape alone.'));
          await g.scene(SCENES.room, { here: f.wall === 'walk' ? [] : ['mama'], moods: { mama: 'tired' },
            keys: room('night', f, { cups: f.wall === 'walk' ? 1 : 2, tea: 0 }) });
          if (f.wall === 'walk') {
            await g.plate(tr('She washes the tin, lays her palm on the painted veranda and goes into the garden. Papa comes back to an empty room: one cup on the table, a figure under the apple tree.'));
            await g.plate(tr('Last shot: the empty table.'));
          } else {
            await g.plate(tr('She washes the tin, pours two cups and waits at the table. Papa comes back — Mama is asleep on the bench, his cup beside her gone cold.'));
            await g.plate(tr('Last shot: the cold cup.'));
          }
        } else {
          await g.scene(SCENES.room, { here: ['papa', 'mama', 'my'], moods: { papa: 'thinking', mama: 'neutral', my: 'smile' }, keys: room('dusk', f, { wall_mama: 0 }) });
          await g.plate(tr('All day nobody knows what day it is. In the evening Papa writes in the log:'));
          g.set('log', 2);
          await g.say('papa', '“27 August. Quiet.”');
          await g.plate(tr('My, lying on her stomach by the wall, wipes the dust off the lowest lines and reads them aloud, the way she read “Nobody again”:'));
          g.set('line27', 'stripe');
          await g.say('my', '“I am forty today. Nobody knows.” Forty! Old!');
          g.mood('my', 'laugh');
          await g.plate(tr('She roars with laughter and crawls on to the next. Papa looks from his fresh line to the one by the floor: the same date. Then at the knot under it — the one he saw on the net under the lightning.'));
          await g.plate(tr('No time to bake. Mama silently wraps some bread for him and stays at home.'));
          if (f.sheets === 2) await g.plate(tr('Before he goes, Papa warms the pan and lights the lighthouse with his own matchbox.'));
          else await g.plate(tr('The lighthouse stays dark.'));
          await g.scene(SCENES.cape, { here: ['fisher', 'papa'], moods: { papa: 'thinking', fisher: 'neutral' },
            keys: { ...isle(27, 'night'), papa_at: 'behind', lighthouse_lit: f.sheets === 2 ? 1 : 0 } });
          await g.play(bread);
          if (f.sheets === 2) await g.plate(tr('Papa alone, under the beam. The Fisherman takes the bread without turning round and does not lift his head to the beam:'));
          else await g.plate(tr('Papa alone, in the moonlight. The Fisherman takes the bread without turning round:'));
          await g.say('fisher', 'You shouldn’t have');
          if (f.spoke) await g.say('fisher', 'Tomorrow will be quiet too');
          await g.plate(tr('Papa puts the matchbox he lit the lamp with on the stone.'));
          await g.play(matches);
          g.set('matchbox', 'stone');
          await g.scene(SCENES.room, { here: f.wall === 'walk' ? [] : ['mama'], moods: { mama: 'tired' },
            keys: room('night', f, { log: 2, line27: 'stripe', cups: f.wall === 'walk' ? 1 : 2, tea: 0 }) });
          if (f.wall === 'walk') await g.plate(tr('At home Mama lays her palm on the painted veranda and goes into the garden; Papa comes back to an empty room.'));
          else await g.plate(tr('At home Mama sets out two cups and waits; Papa comes back — she is asleep on the bench, his cup gone cold.'));
          await g.plate(tr('Last shot: the matchbox on the stone; before it, the line on the wall and a clean strip under it from My’s finger.'));
        }
      } else {
        await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'neutral', my: 'smile', troll: 'neutral' },
          keys: room('day', f, { wall_mama: 0, lantern_at: f.night1 === 'turns' ? 'stair' : 'table', clouds: f.wall !== 'call', cups: 1, tea: 1 }) });
        g.title(tr('Halfway up the Stair'));
        await g.plate(tr('A few quiet days after the storm. The can is empty. The boat is tarred; every morning Papa goes down to her, touches the mooring line and comes back.'));
        if (f.sheets === 2) await g.plate(tr('On a quiet evening Papa warms the pan, lights the lighthouse — and comes down without staying by the lamp: the beam shines outward and does not reach the room.'));
        else await g.plate(tr('The lighthouse is dark.'));
        if (f.night1 === 'turns') await g.plate(tr('The empty lantern on the middle step, where it stood that night.'));
        else await g.plate(tr('The empty lantern on the table.'));
        if (f.wall === 'call') await g.plate(tr('The brushes dry in their jar; Mama sits with her tea, looking at the leafless apple tree.'));
        else await g.plate(tr('Mama paints clouds over the apple tree.'));
        if (f.basket) await g.plate(tr('The basket still stands by the door.'));
        await g.plate(tr('Nobody has decided either to go or to stay. Papa tells My about the storm:'));
        await g.say('papa', 'Up top and down below. The captain is in time everywhere');
        await g.plate(tr('Mama, putting down the tea:'));
        await g.say('mama', 'You were everywhere');
        await g.plate(tr('My runs her finger along the knot of the net and smirks out of the window, at the cape.'));
        g.here('papa', false);
        await g.play(stair);
        await g.say('narrator', 'Papa sat on the stair. The sea was silent');
        await g.plate(tr('Last shot: the empty lantern.'));
      }
    },
  ],
};
