// I. The Crossing (scenario §5, 1.1–1.7). The sea at night: the boy sees the eyes behind the stern and says nothing;
// ⚑ the lantern in the boat; the island at dawn, the key under the arrow; inside — the keeper's wall, “Nobody again”,
// Papa's log over it, Mama's first stalk; the cape — ⚑ the Fisherman.
// Stand-ins: the sea at night — the landing.
// Reads: choices.tell. Leaves: choices.boat, choices.fisher, marks.son_given, marks.fisher, scales.garden.
import { SCENES } from '../story.js';
import { tiller, can } from '../minigames/all.js';

export default {
  number: 'I', title: tr('The Crossing'),
  titles: ['The Sea at Night', 'The Lantern in the Boat', 'The Island at Dawn', 'Inside', 'The Cape'],
  choices: [
    { id: 'boat', title: tr('The lantern in the boat'), options: [{ id: 'douse', label: tr('Put it out') }, { id: 'keep', label: tr('Leave it burning') }, { id: 'hold', label: tr('Give it to the son') }] },
    { id: 'fisher', title: tr('The Fisherman'), options: [{ id: 'keeper', label: tr('“We are the new keepers”') }, { id: 'invite', label: tr('Ask him to breakfast') }, { id: 'sit', label: tr('Sit beside him in silence') }] },
  ],
  steps: [
    // 1.1–1.2: the sea at night, the eyes behind the stern; the tiller
    async g => {
      await g.scene(SCENES.landing, { here: ['papa', 'mama', 'troll'], moods: { papa: 'smile', mama: 'tired', troll: 'afraid' },
        where: tr('In truth: the open sea at night; the boat Adventure under the stars, the lantern on her bow.') });
      await g.say('papa', 'We steer by that star. The captain knows the way');
      await g.plate(tr('Mama is asleep under a blanket; Little My sits up the mast. In the stern Moomintroll sees a white strip of frost on the water behind them — and in it, two eyes.'));
      await g.plate(tr('He pulls his paws in from the gunwale and edges up against sleeping Mama, close. He looks at the grown-ups — and says nothing. Then he turns to look back again.'));
      await g.play(tiller);
      await g.plate(tr('Silence. The boat under the stars, only the water. The boy keeps looking back.'));
    },
    // 1.3: ⚑ the lantern in the boat
    async g => {
      await g.scene(SCENES.landing, { here: ['papa', 'mama', 'troll'], moods: { papa: 'neutral', mama: 'tired', troll: 'afraid' },
        where: tr('In truth: the open sea at night, the boat Adventure.') }, { cut: true });
      await g.plate(tr('Papa sees where his son is looking and glances round: a white strip on the water.'));
      await g.say('papa', 'The moon’s path. Pretty');
      await g.plate(tr('The eyes he does not see: he has to look ahead.'));
      const boat = await g.choose('boat', { papa: [
        { id: 'douse', label: tr('“Put out the lantern. We’ll go by the stars.”') },
        { id: 'keep', label: tr('“Leave it burning. Mama will wake up and be frightened.”') },
        { id: 'hold', label: tr('“Here. Shine it back, since you’re looking.”') },
      ] });
      if (boat === 'douse') {
        await g.say('papa', 'Put out the lantern. We’ll go by the stars');
        await g.plate(tr('The boat goes on by moonlight; the strip falls behind and is gone. Mama wakes up in the dark.'));
        await g.say('mama', 'Where are we?');
        await g.say('papa', 'Where we ought to be');
        await g.plate(tr('She does not sleep till morning; on the island she falls asleep sitting up, on the bundle of blankets.'));
      } else if (boat === 'keep') {
        await g.say('papa', 'Leave it burning. Mama will wake up and be frightened');
        await g.plate(tr('Papa tucks the blanket round Mama. The strip comes nearer; now the boy sees the eyes clearly, presses into sleeping Mama, his paws on the gunwale shaking. Papa looks ahead and does not see it.'));
      } else {
        await g.say('papa', 'Here. Shine it back, since you’re looking');
        await g.plate(tr('Papa gives the lantern to his son. The boy, shaking, holds the beam on the Groke with both paws — she follows the light behind the stern. Papa steers without a light:'));
        await g.say('papa', 'So… a bit to the left… I think');
        await g.plate(tr('The boat drifts. Frost creeps along the stern to the boy, his paws on the lantern turn white, and he does not let go. At dawn Mama sees his paws, throws off her blanket and rubs them; he goes ashore wrapped in her blanket.'));
      }
      g.apply('boat');
    },
    // 1.4: the island at dawn, the key under the arrow
    async g => {
      await g.scene(SCENES.landing, { here: ['papa', 'mama', 'troll'], moods: { papa: 'smile', mama: 'tired', troll: 'thinking' } });
      await g.plate(tr('23 August. Bare pink rocks, a white lighthouse, wind. The door is locked.'));
      await g.say('papa', 'A keeper always leaves the key. That’s how it’s done');
      await g.plate(tr('Little My is already sitting by a stone with an arrow scratched on it.'));
      await g.say('my', 'There’s an arrow here. For fools');
      await g.plate(tr('The key is under the stone.'));
      if (g.state.choices.boat === 'keep') {
        await g.plate(tr('On the rocks by the landing — a white patch.'));
        await g.say('mama', 'Somebody has been here');
        await g.say('papa', 'Gulls');
      }
    },
    // 1.5: inside; the can on the shelf; the keeper's wall
    async g => {
      await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', mama: 'neutral', my: 'smile', troll: 'thinking' } });
      await g.plate(tr('Papa carries in the can of paraffin.'));
      await g.play(can);
      g.gauge('paraffin');
      await g.say('mama', 'Enough for three lanterns');
      await g.plate(tr('Papa looks out of the window at the white crests.'));
      await g.say('papa', 'When the wind drops I’ll sail for more. This is going to be our home');
      await g.plate(tr('The walls are written over in pencil.'));
      await g.say('my', 'Wind south-west. Nobody again');
      g.mood('my', 'laugh');
      await g.plate(tr('She roars with laughter. Under the line, a knot of fishing net — the eye stays on it a moment.'));
      await g.plate(tr('Papa writes his log on the wall, right over “Nobody again”: “23 August. Arrived.”'));
      await g.say('my', 'You’ve covered him up');
      await g.say('papa', 'He doesn’t need it any more');
      await g.plate(tr('Papa writes standing, high up. Mama, crouching by the basket with her back to him, finds a place on the windowsill and paints the first stalk there.'));
      g.gauge('garden');
    },
    // 1.6–1.7: the cape; ⚑ the Fisherman
    async g => {
      await g.scene(SCENES.cape, { here: ['fisher', 'papa', 'mama'], moods: { papa: 'smile', fisher: 'neutral', mama: 'tired' } });
      await g.plate(tr('Papa walks round “his” island and comes out on the cape behind a stranger’s back: a man with a net on his knees, sitting side-on to the lighthouse. He does not turn round.'));
      const fisher = await g.choose('fisher', { fisher: [
        { id: 'keeper', label: tr('“We are the new keepers. If anything happens — you know where to find us.”') },
        { id: 'invite', label: tr('“We have breakfast by the lighthouse. Do come.”') },
        { id: 'sit', label: tr('Sit down beside him without a word') },
      ] });
      if (fisher === 'keeper') {
        await g.say('papa', 'We are the new keepers. If anything happens — you know where to find us');
        await g.plate(tr('At the word “keepers” the Fisherman turns his head — and turns away. Papa leaves pleased; the Fisherman watches his back, then the lighthouse.'));
      } else if (fisher === 'invite') {
        await g.say('papa', 'We have breakfast by the lighthouse. Do come');
        await g.say('fisher', 'No need');
        await g.say('papa', 'Mamma bakes pancakes…');
        g.here('fisher', false);
        await g.plate(tr('The Fisherman gets up with his net and goes off further over the rocks. Papa stands alone: he forced himself on him. From that day Mama leaves bread for him on a stone.'));
      } else {
        g.mood('papa', 'thinking');
        await g.plate(tr('A long pause. The wind.'));
        await g.say('fisher', 'The sea is good today');
        await g.say('papa', 'Good');
        await g.plate(tr('They sit. By the lighthouse Mama hauls the wet bundles up the steps alone; one slips into the water, she fishes it out, wet to the elbows.'));
        await g.plate(tr('When Papa comes back everything is in. She is sitting on a step, wringing out her sleeve.'));
        await g.say('mama', 'All done');
      }
      g.apply('fisher');
    },
  ],
};
