// II. The Shed (scenario: «II. „Сарай“»). Sunday, before light. The frozen bolt (the mini-game “The Bolt”), the girl
// from the chapel on the coal; ⚑ “I’ll ask where he is”; the Mother Superior’s parlour (the mini-game “The Cup”), the
// lie of hide-and-seek — the interruption “The bolt was drawn from the outside” (a choice at stage 3), or ⚑ the shoes;
// Ш the envelope; Kathleen at the porch.
// Stand-ins: the yard of Furlong’s house — the coal gate; the porch — the kitchen.
// Reads: marks.name, marks.aloud. Leaves: choices.shed, .bolt, .plea, .envelope; marks.promise, .punished, .shoes,
// .convent, .boots; scales.trade.
import { SCENES } from '../story.js';
import { bolt, cup } from '../minigames/all.js';

export default {
  number: 'II', title: tr('The Shed'),
  titles: ['The Shed', 'The Parlour', 'The Bolt', 'The Shoes', 'The Envelope', 'Sunday'],
  choices: [
    { id: 'shed', title: tr('“Aren’t you going to ask where he is?”'), options: [{ id: 'promise', label: tr('“I’ll ask where he is”') }, { id: 'silent', label: tr('Say nothing') }] },
    { id: 'bolt', title: tr('“They locked me in by mistake”'), options: [{ id: 'out', label: tr('“The bolt was drawn from the outside”') }, { id: 'hold', label: tr('Let it pass') }] },
    { id: 'plea', title: tr('Sara goes'), options: [{ id: 'silent', label: tr('Say nothing') }, { id: 'shoes', label: tr('“Some shoes for her”') }] },
    { id: 'envelope', weight: '◆', title: tr('The envelope'), options: [{ id: 'girls', label: tr('Take it, for the girls') }, { id: 'boots', label: tr('Take it, for shoes for her') }, { id: 'table', label: tr('Leave it on the table') }] },
  ],
  steps: [
    // II.1: the shed; ⚑ the promise
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' } });
      await g.plate(tr('Sunday, still dark, frost. On Saturday evening the sisters rang: the coal had run out before the holiday wash. Bill has come before light, to be back in time for Mass with his family.'));
      await g.plate(tr('Close: his key on its ring turns in the coal gate, as always. The shed’s bolt is drawn from the outside, and frozen.'));
      await g.play(bolt);
      g.here('sara', true);
      g.mood('sara', 'afraid');
      await g.plate(tr('He lifts his lantern: inside, on the coal, sits a girl in a nightgown, barefoot, black with coal dust; the light on her face. The one from the chapel. She has spent the night here.'));
      if (g.state.marks.name) {
        await g.say('sara', 'You’re Bill. Thursdays');
        await g.wait(1200);
        await g.say('sara', 'Are there any toffees left?');
        await g.plate(tr('He takes off his coat; cut — the coat is on her.'));
        await g.say('bill', 'Come into the warm');
        await g.plate(tr('She looks past him, at the laundry windows.'));
        await g.say('sara', 'I asked where my boy is. Twice');
        await g.plate(tr('He nods at the lorry beyond the gate — she steps back into the shed.'));
        await g.say('sara', 'They’d only bring me back');
        await g.plate(tr('And, looking at him:'));
        await g.say('sara', 'Aren’t you going to ask where he is?');
      } else {
        await g.plate(tr('She shrinks.'));
        await g.say('bill', 'I’m the coal man');
        await g.say('sara', 'I came for coal. For the kitchen');
        await g.plate(tr('Quickly, at the floor, with a smile. He holds out his coat — she won’t take it. He lays it on the coal beside her and turns to the bolt; cut — the coat is on her. He nods at the lorry — she shakes her head and steps back. Then, past him, as if to no one:'));
        await g.say('sara', 'I only asked where my boy is');
      }
      const shed = await g.choose('shed', { bill: [
        { id: 'promise', label: tr('“I’ll ask where he is”') },
        { id: 'silent', label: tr('Say nothing') },
      ] });
      if (shed === 'promise') {
        await g.say('bill', 'I’ll ask where he is');
        await g.plate(tr('She nods, not believing him.'));
      } else await g.plate(tr('She nods, as if she had thought as much, and looks at the windows.'));
      g.apply('shed');
      await g.plate(tr('Over the yard the bell rings for work: six. Sara gets up by herself before she knows she has — habit is stronger than fear.'));
      await g.say('sara', 'Not across the yard');
      await g.plate(tr('She leads him to the kitchen’s back door. The cook nods Sara to a bench and goes upstairs. A minute later the Mother Superior comes down.'));
      g.here('mother', true);
      g.mood('mother', 'thinking');
      await g.say('mother', 'Mr Furlong. Come through to me. Sara, you too');
      await g.plate(tr('That is how he learns her name.'));
    },
    // II.2: the parlour, the cup, the lie
    async g => {
      await g.scene(SCENES.parlour, { here: ['mother', 'bill', 'sara'], moods: { mother: 'thinking', bill: 'tired', sara: 'afraid' } });
      await g.plate(tr('A fire, a ticking clock; the laundry can’t be heard here. The Mother at the window; Bill in the low armchair with a cup of tea; Sara by the door, barefoot, in his coat.'));
      if (g.state.marks.aloud) await g.say('mother', 'You took an interest in our girls in the chapel, Mr Furlong');
      await g.plate(tr('She asks after his daughters, each by name; she knows Sheila wants the solo.'));
      await g.play(cup);
      await g.say('mother', 'Sister Bernadette says the coal was wet last time. Wet coal weighs heavier, Mr Furlong');
      await g.say('bill', 'I’ll take it off, Mother');
      await g.plate(tr('A pause. The clock.'));
      await g.say('mother', 'Sara, tell Mr Furlong how you came to be in the shed');
      if (g.state.marks.promise) await g.plate(tr('Before she answers, Sara raises her eyes to him for a second and drops them: to ask here would be to have her locked up again. He does not ask.'));
      await g.say('sara', 'We were playing hide-and-seek, Mother. They locked me in by mistake');
    },
    // II.2: the interruption — “The bolt was drawn from the outside”
    async g => {
      await g.scene(SCENES.parlour, { here: ['mother', 'bill', 'sara'], moods: { mother: 'thinking', bill: 'tired', sara: 'neutral' } }, { cut: true });
      await g.sheet(tr('An interruption, to be'), [
        tr('On “by mistake” a sign shows at the top of the screen for three seconds: a bolt, and under it his words, “The bolt was outside.”'),
        tr('Tapped — the words break out of Bill. Not tapped — the sign goes. For now: the choice.'),
      ]);
      const out = await g.choose('bolt', { bill: [
        { id: 'out', label: tr('“The bolt was drawn from the outside, Mother”') },
        { id: 'hold', label: tr('Let the sign pass') },
      ] });
      if (out === 'out') {
        await g.say('bill', 'The bolt was drawn from the outside, Mother');
        g.mood('bill', 'neutral');
        await g.plate(tr('He puts down the cup and stands; she does not turn from the window. The clock.'));
        await g.say('mother', 'All the more reason for us to find out who did it. Sara, go');
        g.mood('sara', 'afraid');
        await g.plate(tr('In the doorway Sara looks back — not gratefully: frightened. What has he done. Through the window he sees her led not to the refectory but down another corridor.'));
        g.here('sara', false);
      }
      g.apply('bolt');
    },
    // II.2: ⚑ the shoes — the sign has passed
    async g => {
      if (g.state.choices.bolt === 'out') return;
      await g.scene(SCENES.parlour, { here: ['mother', 'bill', 'sara'], moods: { mother: 'thinking', bill: 'tired', sara: 'neutral' } }, { cut: true });
      const plea = await g.choose('plea', { mother: [
        { id: 'silent', label: tr('Say nothing') },
        { id: 'shoes', label: tr('“She could do with some kind of shoes, Mother”') },
      ] });
      if (plea === 'silent') {
        await g.say('mother', 'Go on, you’ll be fed');
        await g.plate(tr('Sara does not look at him.'));
      } else {
        await g.say('bill', 'She could do with some kind of shoes, Mother');
        await g.say('mother', 'Of course. We have everything');
        await g.wait(1200);
        await g.say('mother', 'Sister Bernadette will keep an eye on her, since you ask for her');
        g.mood('sara', 'neutral');
        await g.plate(tr('In the doorway Sara looks back at him — quick, angry.'));
      }
      g.here('sara', false);
      g.apply('plea');
    },
    // II.3: Ш the envelope
    async g => {
      await g.scene(SCENES.parlour, { here: ['mother', 'bill'], moods: { mother: 'smile', bill: 'tired' } }, { cut: true });
      await g.plate(tr('Cut: the coat lies on the chair by the door; Sara is gone. Bill gets up to leave. The Mother at the window; behind her, steam over the laundry.'));
      await g.say('mother', 'The town brings them to us itself, Mr Furlong. Where would they be, if not here?');
      await g.plate(tr('The clock. She comes from the window and lays on the table an envelope with a Christmas card; there is money inside.'));
      await g.say('mother', 'For your girls');
      await g.wait(1200);
      await g.say('mother', 'I was one of nine myself. I know what Christmas is');
      await g.plate(tr('The clock, louder than ever.'));
      const envelope = await g.choose('envelope', { table_top: [
        { id: 'girls', label: tr('Take it: “For the girls, at Christmas”') },
        { id: 'boots', label: tr('Take it — and spend it on shoes for her') },
        { id: 'table', label: tr('Leave it on the table') },
      ] });
      if (envelope === 'girls') {
        await g.say('bill', 'Thank you, Mother');
        await g.plate(tr('From now on the envelope lies on the dashboard.'));
      } else if (envelope === 'boots') {
        await g.say('bill', 'Thank you, Mother');
        await g.plate(tr('Aloud, the same thanks: she does not know what the money will go on. On Monday — a box from the shoe shop on the lorry’s seat.'));
      } else {
        await g.say('bill', 'The girls have all they need, Mother');
        await g.plate(tr('She does not take the envelope up until he has gone.'));
      }
      g.apply('envelope');
    },
    // Sunday: the laundry at work; Kathleen at the porch
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' } });
      await g.plate(tr('The yard, steam from the laundry windows.'));
      await g.say('narrator', 'It was Sunday. In the laundry they were working');
      if (g.state.marks.convent === 'bought') await g.plate(tr('In the cab Bill opens the card, counts the money and puts it away without looking.'));
      await g.scene(SCENES.kitchen, { here: ['bill'], moods: { bill: 'tired' },
        where: tr('In truth: the porch of the Furlongs’ house; Kathleen in her coat with the little ones.') });
      await g.say('kathleen', 'We’ll be late because of you. Mammy said to wait');
      await g.say('bill', 'Go on, then. You’re not babies');
      await g.plate(tr('Sharp, not raising his voice; he has never spoken to her like that. Kathleen takes the little ones off without looking back. Bill looks at his black hands.'));
    },
  ],
};
