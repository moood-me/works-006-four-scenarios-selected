// Prologue. “Peonies” (scenario §5, П.1–П.5). June, dawn, everyone asleep: Grandmother looks for her teeth in the
// peonies; “When will you die?”; the hat on its nail, Papa asleep; the ledge in the clear water — ⚑ how far to let her
// go (it only colours).
// Scenes: the shore (peonies, teeth; ledge and its branches), the house (hat_dawn).
// Reads: nothing. Leaves: choices.bottom, marks.water, scales.
import { SCENES, hour, piece, on } from '../story.js';
import { peonies, wrist, shoulder, ledge } from '../minigames/all.js';

const DAWN = hour('dawn');

export default {
  number: '', title: tr('Peonies'),
  titles: ['Dawn', 'The Ledge'],
  choices: [
    { id: 'bottom', title: tr('Where the bottom is'), options: [{ id: 'hold', label: tr('Hold her hand') }, { id: 'go', label: tr('“Go on. I’m watching”') }, { id: 'down', label: tr('Climb down to her') }] },
  ],
  steps: [
    // П.1–П.3: dawn, the teeth in the peonies, the question; the hat on its nail, Papa asleep
    async g => {
      g.beds({ sea: 0.35 });
      await piece(g, 'peonies', {
        start: () => g.say('narrator', 'This spring Sophia’s mother died. That summer, as always, they lived on the island: Papa, Sophia and Grandmother'),
      }, async () => {
        await g.scene(SCENES.shore, { beat: 'peonies', here: ['grandma'], moods: { grandma: 'thinking' }, keys: DAWN });
        g.title(tr('The Summer Book'));
      });
      await g.play(peonies);
      g.here('sophia', true);
      await piece(g, 'teeth', {
        porch: async () => {
          await g.say('sophia', 'What are you doing?');
          await g.say('grandma', 'Looking for my teeth');
        },
        found: async () => {
          await g.say('grandma', 'Found them');
          await g.say('sophia', 'Show me');
        },
        ask: async () => {
          await g.say('sophia', 'When will you die?');
          await g.say('grandma', 'Soon. But that is not the least concern of yours');
          await g.say('sophia', 'Why?');
        },
        up: () => g.say('grandma', 'Let’s go down to the water'),
      });
      await g.scene(SCENES.house, { beat: 'hat_dawn', here: ['papa'], keys: DAWN }, { cut: true });
      await g.beat('hat_dawn');
      g.gauge('strength');
      g.gauge('sophia');
    },
    // П.4–П.5: the ledge; ⚑ where the bottom is
    async g => {
      g.beds({ sea: 0.45 });
      await piece(g, 'ledge', {
        edge: () => g.say('sophia', 'I want to see where the bottom is'),
      }, () => g.scene(SCENES.shore, { beat: 'ledge', here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'smile' }, keys: DAWN }, { cut: true }));
      const bottom = await g.choose('bottom', { 'sophia#chest': [
        { id: 'hold', label: tr('Hold her by the hand') },
        { id: 'go', label: tr('“Go on. I’m watching”') },
        { id: 'down', label: tr('Climb down to her') },
      ] });
      if (bottom === 'hold') {
        await g.beat('wrist');
        await g.play(wrist);
        g.mood('sophia', 'angry');
        await piece(g, 'wrist_after', {
          free: () => g.say('sophia', 'Let go! I can do it myself!'),
          stamp: () => g.say('sophia', 'I hate you!'),
          sat: () => g.say('grandma', 'Don’t stick to me. It’s hot'),
          hand: async () => g.mood('sophia', 'neutral'),
        });
      } else if (bottom === 'go') {
        await g.say('grandma', 'Go on. I’m watching');
        await g.beat('shoulder');
        await g.play(shoulder);
        on(g, 'slip:in', () => g.sound.splash(1));
        await piece(g, 'slip', {
          laugh: async () => g.mood('sophia', 'laugh'),
          hands: async () => g.mood('grandma', 'afraid'),
        });
      } else {
        await g.beat('down');
        await g.play(ledge);
        g.mood('sophia', 'laugh');
        g.here('papa', true);
        await piece(g, 'down_after', {
          you: () => g.say('sophia', 'You too!'),
          sat: async () => g.mood('grandma', 'tired'),
          hand: () => g.say('grandma', 'Myself'),
        });
      }
      g.apply('bottom');
    },
  ],
};
