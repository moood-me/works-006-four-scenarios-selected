// III. Home (scenario: «III. „Дом“»). Tuesday — Wednesday. The order book; Sheila’s solo or the choir lost, Kathleen
// and the shoebox; Ш Eileen across the table (the mini-game “Hands on the Table”); the bridge at night; ⚑ Mrs Kehoe’s
// café.
// Stand-ins: the yard’s office and the bridge — the coal gate; the café — the kitchen.
// Reads: marks.convent, marks.boots. Leaves: choices.eileen, choices.cafe; marks.eileen, marks.kehoe; scales.home,
// scales.trade.
import { SCENES } from '../story.js';
import { table } from '../minigames/all.js';

export default {
  number: 'III', title: tr('Home'),
  titles: ['The Order Book', 'Sheila', 'Eileen', 'The Bridge', 'The Café'],
  choices: [
    { id: 'eileen', weight: '◆', title: tr('Eileen: “What’s it to do with us?”'), options: [{ id: 'all', label: tr('Tell her everything') }, { id: 'house', label: tr('“We’ll take her in”') }, { id: 'bundle', label: tr('Ask for a bundle') }, { id: 'none', label: tr('“It’s not our business”') }] },
    { id: 'cafe', title: tr('Mrs Kehoe: “Mind yourself”'), options: [{ id: 'coal', label: tr('“I only bring the coal”') }, { id: 'child', label: tr('Ask about her boy') }, { id: 'public', label: tr('Say it in front of people') }] },
  ],
  steps: [
    // III.1: the order book
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' },
        where: tr('In truth: the office in Furlong’s coal yard, Tuesday; the order book.') });
      if (g.state.marks.convent === 'bought') {
        await g.plate(tr('The convent’s Christmas order is doubled. Bill writes in the line.'));
        await g.say('worker', 'You’re their favourite, Bill. What did you do to please them?');
        await g.plate(tr('The other man laughs. Bill goes off to the scales.'));
      } else {
        await g.plate(tr('A note from the convent. The narrator reads it:'));
        await g.say('narrator', '“The Christmas order of coal has been given to another supplier. The weekly order as before.”');
        await g.plate(tr('Bill crosses out the line.'));
        await g.say('worker', 'We’ll get a rest, anyway');
      }
    },
    // III.2: Sheila; Kathleen and the box
    async g => {
      await g.scene(SCENES.kitchen, { here: ['eileen', 'bill', 'grace', 'sheila'], moods: { eileen: 'thinking', bill: 'tired', grace: 'smile', sheila: 'smile' } });
      await g.plate(tr('The kitchen, evening; the cake is baking.'));
      if (g.state.marks.convent === 'bought') {
        await g.plate(tr('Sheila whirls round the kitchen, arms out:'));
        await g.say('sheila', 'They gave me the solo! Mary Dougherty will cry!');
        await g.plate(tr('And from the stairs:'));
        await g.say('sheila', 'Sister said to say hello to Daddy');
        g.scale('home', 1);
        await g.say('eileen', 'Don’t gloat');
        g.mood('eileen', 'smile');
        await g.plate(tr('— and smiles herself. Bill puts down the spoon.'));
      } else {
        g.mood('sheila', 'sad');
        await g.say('sheila', 'They put me out of the choir. I didn’t do anything!');
        await g.plate(tr('Through her tears — to him:'));
        await g.say('sheila', 'You bring them their coal. Tell them!');
        await g.plate(tr('He says nothing.'));
        g.scale('home', -1);
        await g.plate(tr('Eileen looks at Bill a long time.'));
      }
      if (g.state.marks.boots) {
        await g.plate(tr('Kathleen, without asking, carries in a box from the lorry.'));
        await g.say('kathleen', 'Daddy, is this for me? For under the tree?');
        await g.say('bill', 'No, love');
        await g.say('kathleen', 'Then who?');
        await g.plate(tr('He says nothing. Close: her own shoe by the door, the sole coming away.'));
        await g.plate(tr('She puts the box on a chair so that the lid flies off onto the floor; at the bang she turns on the stairs — inside, grown-up shoes, brown, with red laces — and goes up, loud on every step. Eileen picks the lid up off the floor. Looks at the price.'));
      }
    },
    // III.2: Ш Eileen
    async g => {
      const m = g.state.marks, bought = m.convent === 'bought', box = !!m.boots;
      await g.scene(SCENES.kitchen, { here: ['eileen', 'bill'], moods: { eileen: 'thinking', bill: 'tired' } }, { cut: true });
      await g.plate(tr('The girls go up to bed. Eileen sits down opposite him: both at the table, their hands on it between them.'));
      if (box) {
        await g.plate(tr('Her hand on the box:'));
        await g.say('eileen', 'And what money is this?');
        await g.say('bill', 'The sisters gave it. For Christmas');
        await g.say('eileen', 'Gave it for the girls');
        await g.plate(tr('He says nothing.'));
      }
      await g.say('eileen', 'They tell me you sat half an hour with the Mother Superior on Sunday. Two nights now you haven’t slept. What’s up there?');
      await g.say('bill', 'There was a girl locked in the coal shed all night. Barefoot');
      await g.play(table);
      g.mood('eileen', 'neutral');
      await g.say('eileen', 'What’s it to do with us? Our girls are all right');
      await g.plate(tr('And quieter, pettily:'));
      await g.say('eileen', 'I always said Maggie Reilly thought too much of herself. And now her daughter’s gone “to an aunt”');
      await g.plate(tr('He can’t go to the priest or the guards: the sisters and the town are one.'));
      const eileen = await g.choose('eileen', { 'bill#chest': [
        { id: 'all', label: tr('Tell her everything') },
        { id: 'house', label: tr('“We’ll take her in”') },
        { id: 'bundle', label: tr('Ask for a bundle') },
        { id: 'none', label: tr('“It’s not our business”') },
      ] });
      if (eileen === 'all') {
        await g.say('bill', 'Her feet were bare. The bolt was on the outside. They took her boy. I can’t leave it so');
        await g.plate(tr('Eileen gets up and goes to the range, her back to him. A long while.'));
        if (bought) await g.say('eileen', 'And did you think of Sheila? Of Joan?');
        else await g.say('eileen', 'So that’s what Sheila was for');
        await g.plate(tr('She cries at the range, but she doesn’t leave the kitchen.'));
        if (box) await g.plate(tr('She doesn’t touch the box.'));
        await g.say('eileen', 'Father Murphy has his dinner with them every Sunday');
      } else if (eileen === 'house') {
        await g.say('bill', 'We’ll take her in, the way Mrs Wilson took Mammy. If the sisters give her up');
        await g.say('eileen', 'You’re out of your mind');
        await g.plate(tr('She looks at his hands. Gets up and moves the cake tin.'));
        if (box) {
          await g.say('eileen', 'So you’ve bought her shoes already');
          await g.plate(tr('She puts the box up on top of the dresser.'));
        }
        if (bought) {
          await g.say('eileen', 'If they give her up themselves');
          await g.plate(tr('She counts on her fingers, aloud, a long time.'));
          await g.say('eileen', 'She’ll sleep in the pantry. Not a word about her own business in front of the girls. If I hear of it, I’ll take her back myself');
          await g.wait(1200);
          await g.say('eileen', 'She’s my people. From Wexford');
          await g.plate(tr('And from the range:'));
          await g.say('eileen', 'Not before Christmas Eve. The pantry’s to be cleared');
        } else {
          await g.say('eileen', 'After what they did to Sheila, you’d go begging to them?');
          await g.plate(tr('Silence.'));
          await g.say('eileen', 'You will. You’ll say we need a girl in the house for the holidays. Let them see we’re no enemies of theirs. On Christmas Eve');
        }
        await g.say('eileen', 'Father Murphy has his dinner with them every Sunday');
      } else if (eileen === 'bundle') {
        await g.say('bill', 'Would you put up a bundle for me. Socks, a cardigan. For a girl');
        await g.plate(tr('Eileen looks at him a long time and doesn’t ask: she chooses not to know. She packs the bundle with her back to him.'));
        if (box) await g.plate(tr('The box she sets beside the bundle, without opening it.'));
        await g.say('eileen', 'Give it on Christmas Eve');
        await g.plate(tr('All that evening she doesn’t raise her eyes to him.'));
      } else {
        await g.say('bill', 'It’s not our business. You’re right');
        g.mood('eileen', 'smile');
        await g.plate(tr('Eileen breathes out, lays her floury palm over his hand — and gets up to the cake.'));
        if (box) {
          await g.say('eileen', 'Kathleen, then. They’re her size, she’ll grow into them');
          await g.plate(tr('She writes “Kathleen” on the lid and puts the box under the tree.'));
        }
        await g.plate(tr('A warm evening. At night he doesn’t sleep.'));
      }
      g.apply('eileen');
    },
    // III.3: the bridge at night
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' },
        where: tr('In truth: the bridge at night; Bill at the rail under its lamp; fog over the river, the convent on the hill, a light in one window.') });
      await g.plate(tr('Silence. The river. Fifteen seconds.'));
    },
    // III.4: ⚑ the café
    async g => {
      await g.scene(SCENES.kitchen, { here: ['bill'], moods: { bill: 'tired' },
        where: tr('In truth: Mrs Kehoe’s café, Wednesday morning — the counter, three tables; two men and the postman at one; behind her shoulder a photograph.') });
      await g.plate(tr('Behind Mrs Kehoe’s shoulder hangs a photograph: two girls at a fair, and along its edge, in ink, “Nora and May. The Fair, ’45.”'));
      await g.say('postman', 'May, the usual');
      await g.plate(tr('She leans over the counter, her eyes on the men:'));
      await g.say('kehoe', 'They say you were up there before light on Sunday. Mind yourself, Bill. They’ve a finger in every pie');
      const cafe = await g.choose('cafe', { 'bill#chest': [
        { id: 'coal', label: tr('“I only bring the coal, Mrs Kehoe. I’ve five girls”') },
        { id: 'child', label: tr('Whisper: ask her cousin at the hospital about Sara’s boy') },
        { id: 'public', label: tr('Say it, low: “A girl was locked in the coal shed all night. Barefoot”') },
      ] });
      if (cafe === 'coal') {
        await g.say('bill', 'I only bring the coal, Mrs Kehoe. I’ve five girls');
        await g.say('kehoe', 'Then bring it');
        await g.plate(tr('Without a word she puts an extra pie in his bag.'));
      } else if (cafe === 'child') {
        await g.say('bill', 'You’ve a cousin at the county hospital. Find out about a girl’s boy. Sara. The one who was in the shed on Sunday');
        await g.plate(tr('Mrs Kehoe goes pale. Close: she looks at the photograph. A long time. Wipes the counter.'));
        await g.say('kehoe', 'Mary scrubs their floors. Everything there goes through them. Ask — and they’ll be told someone was asking');
        await g.wait(1200);
        await g.say('kehoe', 'Don’t name me');
        await g.plate(tr('When he goes out, she turns the sign on the door to “Closed”. In the middle of the day.'));
      } else {
        await g.say('bill', 'A girl was locked in the coal shed all night. Barefoot');
        await g.plate(tr('The table goes quiet. The men look into their cups; the postman puts on his cap and leaves.'));
        await g.say('kehoe', 'Bill, your tea’s getting cold. Who’s for more pie?');
        await g.plate(tr('Louder than she need. She turns her back to the photograph; her hands shake over the pie.'));
      }
      g.apply('cafe');
    },
  ],
};
