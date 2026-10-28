// I. The Crossing (scenario §5, 1.1–1.7). The sea at night: the boy sees the eyes behind the stern and says nothing;
// ⚑ the lantern in the boat; the island at dawn, the key under the arrow; inside — the keeper's wall, “Nobody again”,
// Papa's log over it, Mama's first stalk; the cape — ⚑ the Fisherman.
// Scenes: the sea (night, quiet; glance and its branches), the landing (arrive, patch / asleep; bundles), the round
// room (can_in, can_shelf, wall_read, log_write), the cape (approach and its branches).
// Reads: choices.tell. Leaves: choices.boat, choices.fisher, marks.son_given, marks.fisher, scales.garden.
import { SCENES, isle, land, moon, on } from '../story.js';
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
      g.beds({ sea: 0.45, gale: 0.25 });
      const star = g.told('night:star');
      await g.scene(SCENES.sea, { beat: 'night', here: ['papa', 'mama', 'troll', 'my', 'groke'], moods: { papa: 'smile', mama: 'tired', troll: 'afraid' },
        keys: { ...moon(22), calm: 0.8 } });
      const night = g.beat('night');
      await star;
      await g.say('papa', 'We steer by that star. The captain knows the way');
      await night;
      await g.play(tiller);
      await g.beat('quiet');
    },
    // 1.3: ⚑ the lantern in the boat
    async g => {
      g.beds({ sea: 0.45, gale: 0.2 });
      const strip = g.told('glance:strip');
      await g.scene(SCENES.sea, { beat: 'glance', here: ['papa', 'mama', 'troll', 'my', 'groke'], moods: { papa: 'neutral', mama: 'tired', troll: 'afraid' },
        keys: { ...moon(22), calm: 0.8 } }, { cut: true });
      const glance = g.beat('glance');
      await strip;
      await g.say('papa', 'The moon’s path. Pretty');
      await glance;
      const boat = await g.choose('boat', { 'lantern#flame': [
        { id: 'douse', label: tr('“Put out the lantern. We’ll go by the stars.”') },
        { id: 'keep', label: tr('“Leave it burning. Mama will wake up and be frightened.”') },
        { id: 'hold', label: tr('“Here. Shine it back, since you’re looking.”') },
      ] });
      if (boat === 'douse') {
        await g.say('papa', 'Put out the lantern. We’ll go by the stars');
        const wake = g.told('douse:wake');
        const douse = g.beat('douse');
        await wake;
        await g.say('mama', 'Where are we?');
        await g.say('papa', 'Where we ought to be');
        await douse;
      } else if (boat === 'keep') {
        await g.say('papa', 'Leave it burning. Mama will wake up and be frightened');
        await g.beat('keep');
      } else {
        await g.say('papa', 'Here. Shine it back, since you’re looking');
        const drift = g.told('hold:drift');
        const hold = g.beat('hold');
        await drift;
        await g.say('papa', 'So… a bit to the left… I think');
        await hold;
      }
      g.apply('boat');
    },
    // 1.4: the island at dawn, the key under the arrow
    async g => {
      const { boat } = g.state.choices;
      g.beds({ sea: 0.5, wind: 0.2 });
      const door = g.told('arrive:door'), arrow = g.told('arrive:arrow');
      await g.scene(SCENES.landing, { beat: 'arrive', here: ['papa', 'mama', 'troll', 'my'], moods: { papa: 'smile', mama: 'tired', troll: 'thinking' },
        keys: { ...land(23, 'dawn'), frost_patch: boat === 'keep' } }, { cut: boat === 'hold' });
      g.title(tr('23 August'));
      const arrive = g.beat('arrive');
      await door;
      await g.say('papa', 'A keeper always leaves the key. That’s how it’s done');
      await arrow;
      await g.say('my', 'There’s an arrow here. For fools');
      await arrive;
      if (boat === 'keep') {
        const seen = g.told('patch:seen');
        const patch = g.beat('patch');
        await seen;
        await g.say('mama', 'Somebody has been here');
        await g.say('papa', 'Gulls');
        await patch;
      } else if (boat === 'douse') await g.beat('asleep');
    },
    // 1.5: inside; the can on the shelf; the keeper's wall
    async g => {
      g.beds({ sea_in: 0.4, wind: 0.12 });
      await g.scene(SCENES.room, { beat: 'can_in', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', mama: 'neutral', my: 'smile', troll: 'thinking' },
        keys: { ...isle(23, 'day'), garden: -1, sill: -1, log: 0, flame: 'out' } });
      await g.beat('can_in');
      await g.play(can);
      g.gauge('paraffin');
      const mama = g.told('can_shelf:mama'), window = g.told('can_shelf:window');
      const shelf = g.beat('can_shelf');
      await mama;
      await g.say('mama', 'Enough for three lanterns');
      await window;
      await g.say('papa', 'When the wind drops I’ll sail for more. This is going to be our home');
      await shelf;
      const my = g.told('wall_read:my');
      const read = g.beat('wall_read');
      await my;
      await g.say('my', 'Wind south-west. Nobody again');
      g.mood('my', 'laugh');
      await read;
      const written = g.told('log_write:written');
      const log = g.beat('log_write');
      await written;
      await g.say('my', 'You’ve covered him up');
      await g.say('papa', 'He doesn’t need it any more');
      await log;
      g.gauge('garden');
    },
    // 1.6–1.7: the cape; ⚑ the Fisherman
    async g => {
      g.beds({ sea: 0.55, wind: 0.25 });
      await g.scene(SCENES.cape, { beat: 'approach', here: ['fisher', 'papa', 'mama'], moods: { papa: 'smile', fisher: 'neutral', mama: 'tired' },
        keys: land(23, 'day') });
      await g.beat('approach');
      const fisher = await g.choose('fisher', { 'fisher#chest': [
        { id: 'keeper', label: tr('“We are the new keepers. If anything happens — you know where to find us.”') },
        { id: 'invite', label: tr('“We have breakfast by the lighthouse. Do come.”') },
        { id: 'sit', label: tr('Sit down beside him without a word') },
      ] });
      if (fisher === 'keeper') {
        await g.say('papa', 'We are the new keepers. If anything happens — you know where to find us');
        await g.beat('keeper');
      } else if (fisher === 'invite') {
        await g.say('papa', 'We have breakfast by the lighthouse. Do come');
        const no = g.told('invite:no');
        const invite = g.beat('invite');
        await no;
        await g.say('fisher', 'No need');
        await g.say('papa', 'Mamma bakes pancakes…');
        await invite;
      } else {
        g.mood('papa', 'thinking');
        const sea = g.told('sit:sea');
        const sit = g.beat('sit');
        await sea;
        await g.say('fisher', 'The sea is good today');
        await g.say('papa', 'Good');
        await sit;
        // (meanwhile, at the lighthouse: Mama alone with the wet bundles)
        const sat = g.told('bundles:sat');
        on(g, 'bundles:fell', () => g.sound.splash(0.6));
        await g.scene(SCENES.landing, { beat: 'bundles', here: ['mama', 'papa'], moods: { mama: 'tired', papa: 'thinking' }, keys: land(23, 'day') }, { cut: true });
        const bundles = g.beat('bundles');
        await sat;
        await g.say('mama', 'All done');
        await bundles;
      }
      g.apply('fisher');
    },
  ],
};
