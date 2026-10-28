// Prologue «Hands» (scenario: «Пролог „Руки“»). Thursday, ten days before Christmas, dawn: Bill washes the coal off his
// hands in the yard (the mini-game “Hands”); the memory of Mrs Wilson’s house in the fog; the yard men, the widow’s
// extra sack, five daughters.
// Stand-ins: Furlong’s coal yard and the fog of the memory — the coal gate.
// Reads: nothing. Leaves: nothing.
import { SCENES } from '../story.js';
import { hands } from '../minigames/all.js';

export default {
  number: '', title: tr('Hands'),
  titles: ['The Yard at Dawn', 'Mrs Wilson’s House', 'The Widow’s Sack'],
  choices: [],
  steps: [
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' },
        where: tr('In truth: Furlong’s coal yard by the river, at dawn; a basin of icy water by the scales.') });
      g.title(tr('Small Things Like These'));
      await g.plate(tr('Thursday, ten days before Christmas. White fog over the river. Back from the first round, Bill washes his hands in a basin of icy water.'));
      await g.play(hands);
      await g.say('narrator', 'However hard he scrubbed, under the nails it stayed black');
    },
    async g => {
      await g.scene(SCENES.gate, { here: [],
        where: tr('In truth: the fog over the yard thickens, and a big house shows in it — Mrs Wilson’s.') });
      await g.say('narrator', 'His mother was a servant in Mrs Wilson’s house. She was sixteen. Her own people had turned her out');
      await g.plate(tr('Mrs Wilson in the doorway:'));
      await g.say('wilson', 'You’ll stay here');
      await g.say('narrator', 'The town whispered. She did not listen');
      await g.plate(tr('A boy walks behind old Ned, carrying his box of tools.'));
    },
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'neutral' },
        where: tr('In truth: Furlong’s coal yard; the fog is thinning.') });
      await g.say('worker', 'Bill, the widow Howie’s out of coal again, and not a penny on her!');
      await g.plate(tr('Bill nods. The man throws an extra sack on the cart and says to the other:'));
      await g.say('worker', 'You’ll see. They’ll cut the bonus');
      await g.say('narrator', 'Five daughters, and a present for each of them by Christmas');
    },
  ],
};
