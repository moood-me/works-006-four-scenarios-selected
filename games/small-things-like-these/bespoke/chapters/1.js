// I. Coal (scenario: «I. „Уголь“»). Thursday. Mrs Kehoe in her door; ⚑ the barefoot boy on the road; ⚑ the chapel —
// the girl who stands up and asks to be taken to the river (the mini-game “The Look”); the kitchen in the evening (the
// mini-game “The Cake”), the coins counted.
// Stand-ins: the street, the road and the chapel — the coal gate.
// Reads: nothing. Leaves: choices.road, choices.chapel, marks.boy, marks.name, marks.aloud, scales.trade.
import { SCENES } from '../story.js';
import { gaze, cake } from '../minigames/all.js';

export default {
  number: 'I', title: tr('Coal'),
  titles: ['The Street', 'The Road', 'The Chapel', 'The Kitchen'],
  choices: [
    { id: 'road', title: tr('The barefoot boy'), options: [{ id: 'coins', label: tr('Stop, give him the coins') }, { id: 'pass', label: tr('Drive on') }] },
    { id: 'chapel', title: tr('The girl in the chapel'), options: [{ id: 'leave', label: tr('“Wrong door” — and go') }, { id: 'toffee', label: tr('His name, and toffees') }, { id: 'aloud', label: tr('Ask aloud') }] },
  ],
  steps: [
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'neutral' },
        where: tr('In truth: the main street in the morning; Mrs Kehoe in the door of her café; at the end of the street, the hill and the convent, steam over its wall.') });
      await g.plate(tr('Bill drives his lorry out of the yard. Mrs Kehoe in the door of her café nods up at the hill:'));
      await g.say('kehoe', 'Going up there today? Tell them my pie’s better than theirs');
    },
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' },
        where: tr('In truth: the road out of town, seen from the lorry’s cab.') }, { cut: true });
      await g.plate(tr('In the cab, on the dashboard, a child’s drawing: five girls and a lorry. By the roadside a boy is dragging a bundle of sticks — barefoot on the frost.'));
      await g.plate(tr('He can’t give him a lift: the back is full, and the boy is going the other way. At home there are five, every coin counted, and the sisters don’t like him late. And the boy is barefoot.'));
      const road = await g.choose('road', { lorry: [
        { id: 'coins', label: tr('Stop and give him the coins') },
        { id: 'pass', label: tr('Drive on: you’re late as it is') },
      ] });
      if (road === 'coins') await g.plate(tr('The boy stands with the coins in his palm and watches the lorry go.'));
      else await g.plate(tr('In the mirror the boy picks up his sticks.'));
      g.apply('road');
    },
    async g => {
      await g.scene(SCENES.gate, { here: ['bill', 'sara'], moods: { bill: 'tired', sara: 'afraid' },
        where: tr('In truth: the convent chapel — a long floor, girls on their knees with buckets, in thin dresses; the laundry roaring behind the wall.') });
      await g.plate(tr('Bill has tipped the coal; there is no one at the shed, and the docket must be signed. He goes looking for a sister and opens the wrong door.'));
      await g.plate(tr('Girls on their knees scrub the floor, in nothing but their dresses. All of them on their knees; he in the doorway.'));
      await g.play(gaze);
      await g.plate(tr('One of them has stood up — barefoot, her hands red. Close, her face:'));
      await g.say('sara', 'Mister, take me away. Just as far as the river. I can do anything');
      await g.plate(tr('He can’t take her now, and it shows: a sister is near, it is broad day, she is barefoot.'));
      const chapel = await g.choose('chapel', { 'sara#chest': [
        { id: 'leave', label: tr('Say he has the wrong door, and go') },
        { id: 'toffee', label: tr('Whisper his name, and set a bag of toffees on her bucket') },
        { id: 'aloud', label: tr('Ask the sister aloud: “Why are they on their knees in this cold?”') },
      ] });
      if (chapel === 'leave') {
        await g.plate(tr('She goes down on her knees again. A sister shows him out politely and signs the docket.'));
      } else if (chapel === 'toffee') {
        await g.say('bill', 'My name’s Bill. I come Thursdays, with the coal');
        await g.plate(tr('She covers the bag with her palm and hides it in her sleeve.'));
      } else {
        await g.say('bill', 'Why are they on their knees in this cold?');
        await g.say('sister', 'Work purifies, Mr Furlong');
        g.here('mother', true);
        g.mood('mother', 'thinking');
        await g.plate(tr('All the girls look at him. At the end of the corridor stands the Mother Superior; Bill does not see her.'));
      }
      g.apply('chapel');
      await g.plate(tr('Silence. The cab: Bill’s hand straightens the drawing on the dashboard and stays on it. The engine, the river.'));
    },
    async g => {
      await g.scene(SCENES.kitchen, { here: ['eileen', 'bill', 'grace', 'sheila'], moods: { eileen: 'thinking', bill: 'tired', grace: 'smile', sheila: 'smile' } });
      await g.plate(tr('The Furlongs’ kitchen, evening. Sheila at the window sings “Silent Night”.'));
      await g.say('sheila', 'Sister said whoever sings it best gets the solo at midnight Mass');
      await g.plate(tr('Loretta writes her letter to Santa, covering it with her hand. Eileen counts the coins in the tin.'));
      await g.play(cake);
      await g.plate(tr('At the end Bill eats a cherry himself.'));
      await g.say('bill', 'Grace, that’s enough');
      if (g.state.choices.road === 'coins') {
        await g.plate(tr('Eileen counts the coins again.'));
        await g.say('eileen', 'Again?');
        await g.say('loretta', 'Who to, Daddy?');
        await g.say('bill', 'A boy. He’d no shoes');
        await g.say('eileen', 'Five of them. And each one will have a present, if you give nothing more away');
      } else {
        await g.plate(tr('Eileen counts the coins again.'));
        await g.say('eileen', 'It’s right');
        g.mood('eileen', 'smile');
        await g.plate(tr('And for the first time this evening she smiles at him.'));
        await g.say('eileen', 'Five of them. And each one will have a present');
      }
      await g.say('sheila', 'And Mary Dougherty sings in her daddy’s socks. Her shoes have holes, you can hear them squelch');
      await g.say('eileen', 'Sheila');
      await g.plate(tr('Kathleen looks over Loretta’s shoulder — Loretta throws herself over the letter:'));
      await g.say('loretta', 'Don’t look!');
      await g.plate(tr('Eileen wraps the first cake in paper — not the smallest — and sets it by the door.'));
      await g.say('eileen', 'That’s for the widow Howie. Since you’re giving her the coal as well');
    },
  ],
};
