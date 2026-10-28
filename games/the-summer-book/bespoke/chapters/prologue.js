// Prologue. “Peonies” (scenario §5, П.1–П.5). June, dawn, everyone asleep: Grandmother looks for her teeth in the
// peonies; “When will you die?”; the ledge in the clear water — ⚑ how far to let her go (it only colours).
// Reads: nothing. Leaves: choices.bottom, marks.water, scales.
import { SCENES } from '../story.js';
import { peonies, wrist, shoulder, ledge } from '../minigames/all.js';

export default {
  number: '', title: tr('Peonies'),
  titles: ['Dawn', 'The Ledge'],
  choices: [
    { id: 'bottom', title: tr('Where the bottom is'), options: [{ id: 'hold', label: tr('Hold her hand') }, { id: 'go', label: tr('“Go on. I’m watching”') }, { id: 'down', label: tr('Climb down to her') }] },
  ],
  steps: [
    // П.1–П.3: dawn, the teeth in the peonies, the question
    async g => {
      await g.scene(SCENES.shore, { here: ['grandma'], moods: { grandma: 'thinking' } });
      g.title(tr('The Summer Book'));
      await g.say('narrator', 'This spring Sophia’s mother died. That summer, as always, they lived on the island: Papa, Sophia and Grandmother');
      await g.plate(tr('June, dawn; everyone is asleep. Grandmother sits in the peonies by the porch, feeling about in the earth with her hand.'));
      await g.play(peonies);
      g.here('sophia', true);
      g.mood('sophia', 'surprised');
      await g.plate(tr('Sophia comes out on the porch in her nightdress.'));
      await g.say('sophia', 'What are you doing?');
      await g.say('grandma', 'Looking for my teeth');
      await g.say('grandma', 'Found them');
      await g.say('sophia', 'Show me');
      await g.plate(tr('Grandmother shows her and puts them in. Not a trace of shame.'));
      g.mood('sophia', 'neutral');
      await g.say('sophia', 'When will you die?');
      await g.say('grandma', 'Soon. But that is not the least concern of yours');
      await g.say('sophia', 'Why?');
      await g.plate(tr('Grandmother gets up slowly, holding on to the porch rail, and instead of an answer:'));
      await g.say('grandma', 'Let’s go down to the water');
      await g.plate(tr('In the doorway behind them a straw hat hangs on its nail. Behind the window Papa is asleep.'));
      g.gauge('strength');
      g.gauge('sophia');
    },
    // П.4–П.5: the ledge; ⚑ where the bottom is
    async g => {
      await g.scene(SCENES.shore, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'smile' } }, { cut: true });
      await g.plate(tr('Clear water, and under it a ledge; further out it is dark. Sophia stands on the very edge.'));
      await g.say('sophia', 'I want to see where the bottom is');
      const bottom = await g.choose('bottom', { 'sophia#chest': [
        { id: 'hold', label: tr('Hold her by the hand') },
        { id: 'go', label: tr('“Go on. I’m watching”') },
        { id: 'down', label: tr('Climb down to her') },
      ] });
      if (bottom === 'hold') {
        await g.plate(tr('Sophia leans out over the water with Grandmother’s hand on her wrist; on the bottom there is seaweed and a white stone.'));
        await g.play(wrist);
        g.mood('sophia', 'angry');
        await g.say('sophia', 'Let go! I can do it myself!');
        await g.plate(tr('Grandmother does not let go. On the rock Sophia stamps her foot:'));
        await g.say('sophia', 'I hate you!');
        await g.plate(tr('And a minute later she sits down right up against her.'));
        await g.say('grandma', 'Don’t stick to me. It’s hot');
        g.mood('sophia', 'neutral');
        await g.plate(tr('They sit without a word; then Grandmother, not looking, holds out her hand, and Sophia takes it.'));
      } else if (bottom === 'go') {
        await g.say('grandma', 'Go on. I’m watching');
        await g.play(shoulder);
        g.here('sophia', false);
        await g.plate(tr('Sophia steps onto the ledge, slips and sits down in the water up to her chest; she gasps — and laughs, wet and proud.'));
        g.mood('grandma', 'afraid');
        await g.plate(tr('On the rock Grandmother’s hands are shaking. Only you see it.'));
      } else {
        await g.play(ledge);
        g.mood('sophia', 'laugh');
        await g.plate(tr('Slowly Grandmother climbs down into the cold water, knee-deep, and the two of them stand on the ledge together.'));
        await g.say('sophia', 'You too!');
        g.mood('grandma', 'tired');
        await g.plate(tr('Getting back up does not work at once, and Grandmother sits a long time on the edge of the rock with her feet in the water. Papa comes out of the house, climbs down without a word and holds out his hand.'));
        g.here('papa', true);
        await g.say('grandma', 'Myself');
        await g.plate(tr('She climbs out by herself, slowly; Papa stands beside her till she is on her feet.'));
      }
      g.apply('bottom');
    },
  ],
};
