// II. “The Calm” (scenario §5, 2.1–2.3). July, the sea like glass: the cat who does not love her, back to back, the
// pebble, the empty new house — “At night. Some day”; Sophia’s prayer; Grandmother sits down on the way. ⚑ The bird on
// the pillow (colours). The full moon — ⚑ the first hinge: “Where is Mama now?”
// Scenes: the shore (calm, calm_after; graves; cat_rail; moon_path), the house (bird_pillow and its branches;
// moon_window and its branches; hat_bed, sky_morning, cough).
// Reads: nothing. Leaves: choices.bird, choices.mama, marks.someday, marks.notsoon, marks.cat, marks.mama, scales.
import { SCENES, hour, piece, on } from '../story.js';
import { pebble, palm, hand, door } from '../minigames/all.js';

const DAY = hour('day'), NIGHT = hour('night');

export default {
  number: 'II', title: tr('The Calm'),
  titles: ['The Calm', 'The Bird', 'The Moon'],
  choices: [
    { id: 'bird', title: tr('The bird on the pillow'), options: [{ id: 'gift', label: tr('“It’s a present”') }, { id: 'bury', label: tr('“Let’s bury it”') }, { id: 'out', label: tr('“I’ll clear it away. And him — out”') }] },
    { id: 'mama', title: tr('Where is Mama now?'), weight: '⚑', options: [{ id: 'gone', label: tr('“She isn’t here any more”') }, { id: 'sky', label: tr('“In heaven. She sees you”') }, { id: 'moon', label: tr('Take her out to the water') }] },
  ],
  steps: [
    // 2.1: the calm (the dead calm is silence: no bed)
    async g => {
      g.beds({});
      await piece(g, 'calm', {
        cat: async () => g.title(tr('July')),
        gone: async () => {
          g.mood('sophia', 'sad');
          await g.say('sophia', 'Why doesn’t he love me? I feed him');
          await g.say('grandma', 'What do you think?');
          g.mood('sophia', 'angry');
          await g.say('sophia', 'Don’t ask back!');
          g.mood('grandma', 'angry');
          await g.say('grandma', 'Then don’t ask me anything either!');
        },
      }, () => g.scene(SCENES.shore, { beat: 'calm', here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'smile' }, keys: { ...DAY, calm: 1 } }));
      await g.play(pebble);
      on(g, 'calm_after:second', () => g.sound.splash(0.25));
      await piece(g, 'calm_after', {
        still: async () => g.mood('grandma', 'neutral'),
        roof: async () => {
          g.mood('sophia', 'smile');
          await g.say('sophia', 'Let’s climb in there!');
          await g.say('grandma', 'At night. Some day');
          await g.say('sophia', 'Promise?');
          g.mood('grandma', 'smile');
          await g.say('grandma', 'We’ll see');
          g.mark('someday', 'given', tr('Half a promise: the new house, “at night, some day.”'));
        },
        pray: async () => {
          g.mood('sophia', 'thinking');
          await g.say('sophia', 'God, let something happen. Something big');
        },
      });
    },
    // 2.2: ⚑ the bird on the pillow
    async g => {
      g.beds({ sea_in: 0.25 });
      await piece(g, 'bird_pillow', {
        shout: () => g.say('sophia', 'Murderer! I hate you!'),
      }, () => g.scene(SCENES.house, { beat: 'bird_pillow', here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'angry' }, keys: DAY }));
      const bird = await g.choose('bird', { 'pillow#pillow': [
        { id: 'gift', label: tr('“He brought it for you. A present. He doesn’t know any other way”') },
        { id: 'bury', label: tr('“Let’s go and bury it”') },
        { id: 'out', label: tr('“I’ll clear it away. And him — out of the door”') },
      ] });
      if (bird === 'gift') {
        await g.say('grandma', 'He brought it for you. A present. He doesn’t know any other way');
        g.mood('sophia', 'thinking');
        on(g, 'gift:stroke', () => g.sound.purr(4));
        await g.beat('gift');
        await g.scene(SCENES.house, { beat: 'gift_again', here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'disgusted' }, keys: DAY });
        await g.beat('gift_again');
      } else if (bird === 'bury') {
        await g.say('grandma', 'Let’s go and bury it');
        g.beds({ sea: 0.35 });
        on(g, 'graves:bird', () => g.sound.knife());
        await piece(g, 'graves', {
          song: () => g.say('sophia_song', 'Mm… la-a, la-la… mm-mm… la-a-a', 'sophia'),
          here: async () => {
            await g.say('sophia', 'Where is it now?');
            await g.say('grandma', 'Here');
          },
        }, () => g.scene(SCENES.shore, { beat: 'graves', here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'thinking' }, keys: DAY }, { cut: true }));
      } else {
        await g.say('grandma', 'I’ll clear it away. And him — out of the door');
        await g.beat('bird_out');
        g.beds({ sea: 0.3 });
        await g.scene(SCENES.shore, { beat: 'cat_rail', here: [], keys: hour('dusk') });
        await g.beat('cat_rail');
      }
      g.apply('bird');
    },
    // 2.3: the full moon; ⚑ Where is Mama now?
    async g => {
      g.beds({ sea_in: 0.2 });
      await piece(g, 'moon_window', {
        water: () => g.say('sophia', 'Grandmother. The moon’s in the water'),
        sit: () => g.say('sophia', 'And where is Mama now?'),
      }, () => g.scene(SCENES.house, { beat: 'moon_window', here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'sad', papa: 'sad' }, keys: NIGHT }));
      const mama = await g.choose('mama', { 'sophia#chest': [
        { id: 'gone', label: tr('“I don’t know. She isn’t here any more. That’s for ever”') },
        { id: 'sky', label: tr('“In heaven. And she sees you”') },
        { id: 'moon', label: tr('Don’t answer. Take her by the hand and out to the water') },
      ] });
      if (mama === 'gone') {
        await g.say('grandma', 'I don’t know. She isn’t here any more. That’s for ever');
        await piece(g, 'gone', {
          lie: async () => {
            g.mood('sophia', 'angry');
            await g.say('sophia', 'You’re lying');
            await g.say('grandma', 'No');
          },
          cry: async () => g.mood('sophia', 'sad'),
          papa: async () => g.sound.door(),
        });
        // (the palm taken away: Sophia comes over late)
        g.set('slips', (await g.play(palm)).slips > 0);
        await g.beat('gone_near');
        await g.scene(SCENES.house, { beat: 'hat_bed', here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'sad', papa: 'sad' }, keys: DAY });
        await g.beat('hat_bed');
      } else if (mama === 'sky') {
        await g.say('grandma', 'In heaven. And she sees you');
        g.mood('sophia', 'thinking');
        await piece(g, 'sky', {
          moon: async () => {
            await g.say('sophia', 'Does she see the moon too?');
            await g.say('grandma', 'The moon too');
          },
          soon: async () => {
            await g.say('sophia', 'And you won’t go away? You said soon');
            await g.say('grandma', 'Soon is how old people say it. The way you say it, not soon');
          },
          wave: async () => g.mood('sophia', 'smile'),
        });
        const { slips } = await g.play(hand); // (let go before she slept: in the morning she comes to her late)
        await piece(g, 'sky_morning', {
          whisper: () => g.say('sophia', 'Mama sees'),
        }, () => g.scene(SCENES.house, { beat: 'sky_morning', here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'smile', papa: 'neutral' }, keys: { ...DAY, slips: slips > 0 } }));
      } else {
        await g.beat('to_door');
        // the door's creak (the motif of the night: again in the fog), slow — and if it creaked aloud, Papa coughs
        const { creaked } = await g.play(door);
        g.sound.creak({ slow: !creaked });
        if (creaked) g.sound.cough();
        await g.beat('door_out');
        g.beds({ sea: 0.3 });
        await piece(g, 'moon_path', {
          path: async () => {
            await g.say('sophia', 'And Mama…');
            await g.say('grandma', 'Look');
          },
        }, () => g.scene(SCENES.shore, { beat: 'moon_path', here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'thinking' }, keys: NIGHT }, { cut: true }));
        g.beds({ sea_in: 0.25 });
        on(g, 'cough:cough', () => g.sound.cough({ wall: false }));
        await piece(g, 'cough', {
          said: () => g.say('papa', 'Mamma, it’s cold at night'),
        }, () => g.scene(SCENES.house, { beat: 'cough', here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'tired', papa: 'neutral' }, keys: DAY }));
      }
      g.apply('mama');
    },
  ],
};
