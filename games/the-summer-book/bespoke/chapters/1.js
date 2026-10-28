// I. “The Magic Forest” (scenario §5, 1.1–1.5). The house in the morning, the hat on its nail; the forest — the seal,
// the palm on the trunk; ⚑ the cigarette (and the supper, the shell on the rail); Eriksson with the post: “Don’t hold
// your girl back”; the nets in the evening — ⚑ what to tell Papa. All of it only colours.
// Scenes: the house (morning, morning_go; supper_table), the forest (carve, seal_set, trunk; match and its branches),
// the shore (shell; eriksson, eriksson_off; nets and its branches).
// Reads: choices.bottom. Leaves: choices.smoke, choices.nets, marks.seal, marks.smoke, marks.nets, marks.say.
import { SCENES, hour, piece, on } from '../story.js';
import { knife, push, net } from '../minigames/all.js';

const DAY = hour('day'), DUSK = hour('dusk');

export default {
  number: 'I', title: tr('The Magic Forest'),
  titles: ['The House', 'The Forest', 'The Cigarette', 'Eriksson', 'The Nets'],
  choices: [
    { id: 'smoke', title: tr('The cigarette'), options: [{ id: 'secret', label: tr('“It’s our secret”') }, { id: 'tell', label: tr('“Tell him if you want”') }, { id: 'quit', label: tr('“You’re right”') }] },
    { id: 'nets', title: tr('“Tell me, if anything”'), options: [{ id: 'say', label: tr('“I’ll tell you”') }, { id: 'nothing', label: tr('“Nothing to tell”') }, { id: 'net', label: tr('Take the other end of the net') }] },
  ],
  steps: [
    // 1.1: the house in the morning
    async g => {
      g.beds({ sea_in: 0.3 });
      await piece(g, 'morning', {
        knife: async () => {
          await g.say('papa', 'Mamma, don’t go far');
          await g.say('grandma', 'I won’t');
        },
      }, () => g.scene(SCENES.house, { beat: 'morning', here: ['papa', 'grandma', 'sophia'], moods: { papa: 'thinking', grandma: 'neutral', sophia: 'sad' }, keys: DAY }));
      g.title(tr('June'));
      await g.beat('morning_go');
    },
    // 1.2: the forest; the knife; the palm on the trunk
    async g => {
      g.beds({ wind: 0.3, trees: 0.4 });
      await g.scene(SCENES.forest, { beat: 'carve', here: ['grandma', 'sophia'], moods: { grandma: 'thinking', sophia: 'smile' }, keys: DAY });
      await g.beat('carve');
      await g.play(knife);
      await piece(g, 'seal_set', {
        forest: () => g.say('sophia', 'This is their forest. They live here when we’re not here'),
      });
      g.mark('seal', true, null);
      await piece(g, 'trunk', { still: async () => g.mood('grandma', 'tired') });
    },
    // 1.3: ⚑ the cigarette
    async g => {
      g.beds({ wind: 0.3, trees: 0.4 });
      on(g, 'match:strike', () => g.sound.strike());
      await piece(g, 'match', {
        behind: async () => {
          g.mood('sophia', 'angry');
          await g.say('sophia', 'Papa doesn’t allow it!');
        },
      }, () => g.scene(SCENES.forest, { beat: 'match', here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'neutral' }, keys: DAY }, { cut: true }));
      const smoke = await g.choose('smoke', { 'grandma#chest': [
        { id: 'secret', label: tr('“It’s our secret”') },
        { id: 'tell', label: tr('“Tell him if you want. You decide”') },
        { id: 'quit', label: tr('“You’re right”') },
      ] });
      if (smoke === 'secret') {
        await g.say('grandma', 'It’s our secret');
        g.mood('sophia', 'smile');
        await g.say('sophia', 'Ours');
        await g.beat('ours');
        g.beds({ sea_in: 0.3 });
        await piece(g, 'supper_table', {
          sat: async () => {
            await g.say('papa', 'Mamma, you’re coughing');
            await g.say('sophia', 'It’s the wind!');
          },
        }, () => g.scene(SCENES.house, { beat: 'supper_table', here: ['papa', 'grandma', 'sophia'], moods: { papa: 'neutral', grandma: 'neutral', sophia: 'smile' }, keys: hour('dusk') }));
      } else if (smoke === 'tell') {
        await g.say('grandma', 'Tell him if you want. You decide');
        g.mood('sophia', 'thinking');
        await g.beat('think');
        g.beds({ sea_in: 0.3 });
        await piece(g, 'supper_table', {
          sat: () => g.say('sophia', 'Grandmother smokes'),
        }, () => g.scene(SCENES.house, { beat: 'supper_table', here: ['papa', 'grandma', 'sophia'], moods: { papa: 'neutral', grandma: 'neutral', sophia: 'thinking' }, keys: hour('dusk') }));
        g.beds({ sea: 0.35 });
        await g.scene(SCENES.shore, { beat: 'shell', here: ['grandma', 'papa'], moods: { grandma: 'neutral', papa: 'thinking' }, keys: DAY });
        await g.beat('shell');
      } else {
        await g.say('grandma', 'You’re right');
        await piece(g, 'quit', { pocket: async () => g.mood('grandma', 'sad') });
      }
      g.apply('smoke');
    },
    // 1.4: Eriksson with the post; push off
    async g => {
      g.beds({ sea: 0.45 });
      await piece(g, 'eriksson', {
        post: async () => {
          await g.say('eriksson', 'You’ve got old');
          await g.say('grandma', 'And you haven’t?');
          await g.say('eriksson', 'Me too. Get in, we’ll go out to the nets. Like before');
        },
        knees: () => g.say('grandma', 'Some other time'),
        look: () => g.say('eriksson', 'Don’t hold your girl back'),
      }, () => g.scene(SCENES.shore, { beat: 'eriksson', here: ['grandma', 'sophia', 'eriksson'], moods: { grandma: 'neutral', sophia: 'thinking', eriksson: 'neutral' }, keys: DAY }));
      await g.play(push);
      await piece(g, 'eriksson_off', {
        ask: async () => {
          await g.say('sophia', 'What did he say?');
          await g.say('grandma', 'That he’s old');
        },
      });
    },
    // 1.5: the nets in the evening; ⚑ “tell me, if anything”
    async g => {
      g.beds({ sea: 0.35 });
      await piece(g, 'nets', {
        sat: async () => {
          await g.say('papa', 'Mamma. Tell me, if anything');
          await g.wait(1500);
          await g.say('papa', 'I’m not going to be the last to know any more');
        },
      }, () => g.scene(SCENES.shore, { beat: 'nets', here: ['papa', 'grandma'], moods: { papa: 'thinking', grandma: 'neutral' }, keys: DUSK }));
      const nets = await g.choose('nets', { 'grandma#chest': [
        { id: 'say', label: tr('“I’ll tell you”') },
        { id: 'nothing', label: tr('“There’s nothing to tell”') },
        { id: 'net', label: tr('Take the other end of the net without a word') },
      ] });
      if (nets === 'say') {
        await g.say('grandma', 'I’ll tell you');
        await g.beat('nets_say');
      } else if (nets === 'nothing') {
        await g.say('grandma', 'There’s nothing to tell');
        await g.say('papa', 'All right');
        await g.beat('nets_nothing');
      } else {
        await g.beat('net');
        await g.play(net);
        on(g, 'net_after:together', () => g.sound.rustle());
        await piece(g, 'net_after', {
          thanks: () => g.say('papa', 'Thank you, Mamma'),
          ask: () => g.say('papa', 'So you’ll tell me, if anything?'),
        });
      }
      g.apply('nets');
    },
  ],
};
