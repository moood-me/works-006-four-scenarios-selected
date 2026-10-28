// I. “The Magic Forest” (scenario §5, 1.1–1.5). The house in the morning, the hat on its nail; the forest — the seal,
// the palm on the trunk; ⚑ the cigarette; Eriksson with the post: “Don’t hold your girl back”; the nets in the evening —
// ⚑ what to tell Papa. All of it only colours.
// Eriksson is in no scene yet: a plate, his voice (his boat is the shore's).
// Reads: marks.water. Leaves: choices.smoke, choices.nets, marks.smoke, marks.nets, marks.say.
import { SCENES } from '../story.js';
import { knife, push, net } from '../minigames/all.js';

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
      await g.scene(SCENES.house, { here: ['papa', 'grandma', 'sophia'], moods: { papa: 'thinking', grandma: 'neutral', sophia: 'sad' },
        keys: { view: 'veranda', papa_at: 'table', grandma_at: 'door', sophia_at: 'door' } });
      g.title(tr('June'));
      await g.plate(tr('Morning. Papa at his table on the veranda by the window: papers, coffee. The hat on its nail by the door; Sophia walks under it without raising her eyes. Grandmother takes her knife and her tobacco pouch.'));
      await g.say('papa', 'Mamma, don’t go far');
      await g.say('grandma', 'I won’t');
      if (g.state.marks.water === 'together') await g.plate(tr('Papa raises his head and watches her go, all the way to the door.'));
    },
    // 1.2: the forest; the knife; the palm on the trunk
    async g => {
      await g.scene(SCENES.forest, { here: ['grandma', 'sophia'], moods: { grandma: 'thinking', sophia: 'smile' }, keys: { grandma_at: 'stump', sophia_at: 'moss' } });
      await g.plate(tr('Grey dead trees twisted by the wind, moss. Grandmother sits down on a stump and carves an animal out of driftwood.'));
      await g.play(knife);
      g.set('animals', 5);
      g.mark('seal', true, null);
      await g.plate(tr('A seal. Sophia sets the animals in the moss.'));
      await g.say('sophia', 'This is their forest. They live here when we’re not here');
      g.mood('grandma', 'tired');
      g.set('grandma_at', 'trunk');
      await g.plate(tr('Grandmother gets up to reach a dry branch — and stands still with her palm on the trunk and her eyes closed, three seconds. Sophia does not see. Then she sits down again and carves.'));
      g.set('grandma_at', 'stump');
    },
    // 1.3: ⚑ the cigarette
    async g => {
      await g.scene(SCENES.forest, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'angry' }, keys: { grandma_at: 'stump', sophia_at: 'stump' } }, { cut: true });
      await g.plate(tr('Grandmother thinks Sophia has gone off to her animals; she takes a cigarette out of the pouch and strikes a match. Sophia is behind her.'));
      await g.say('sophia', 'Papa doesn’t allow it!');
      const smoke = await g.choose('smoke', { 'grandma#chest': [
        { id: 'secret', label: tr('“It’s our secret”') },
        { id: 'tell', label: tr('“Tell him if you want. You decide”') },
        { id: 'quit', label: tr('“You’re right”') },
      ] });
      if (smoke === 'secret') {
        await g.say('grandma', 'It’s our secret');
        g.mood('sophia', 'smile');
        await g.say('sophia', 'Ours');
        await g.plate(tr('She says it importantly, and goes about all day puffed up with it. At supper —'));
        await g.say('papa', 'Mamma, you’re coughing');
        await g.say('sophia', 'It’s the wind!');
        await g.plate(tr('— loudly, and she looks at Grandmother.'));
      } else if (smoke === 'tell') {
        await g.say('grandma', 'Tell him if you want. You decide');
        g.mood('sophia', 'thinking');
        await g.plate(tr('Sophia thinks it over till evening. At supper, looking at her plate:'));
        await g.say('sophia', 'Grandmother smokes');
        await g.plate(tr('Papa says nothing and chews. In the morning a big shell lies on the veranda rail, an ashtray. Nobody mentions it. Now Grandmother smokes on the veranda, by the shell, under Papa’s look over his papers.'));
      } else {
        await g.say('grandma', 'You’re right');
        g.set('pack', 'in');
        await g.plate(tr('Grandmother puts the cigarette out on a stone and pushes the packet deep into a crevice. Sophia is pleased — and at once bored: there is no secret.'));
        g.mood('grandma', 'sad');
        await g.plate(tr('All day Grandmother pats her empty pocket.'));
      }
      g.apply('smoke');
    },
    // 1.4: Eriksson with the post; push off
    async g => {
      const { water } = g.state.marks;
      await g.scene(SCENES.shore, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'thinking' }, keys: { rowboat: 1, grandma_at: 'pier', sophia_at: 'pier' } });
      await g.plate(tr('A rowing boat comes in to the pier: Eriksson, an old fisherman from the far skerries. He does not come ashore; he hands over the post. Grandmother goes down to the pier.'));
      await g.say('eriksson', 'You’ve got old');
      await g.say('grandma', 'And you haven’t?');
      await g.say('eriksson', 'Me too. Get in, we’ll go out to the nets. Like before');
      await g.plate(tr('Grandmother takes hold of the gunwale with both hands, as before, and stands so — her hands on the gunwale, her face to the sea. Then she looks at her knees.'));
      await g.say('grandma', 'Some other time');
      if (water === 'let') await g.plate(tr('Sophia stands by herself on the edge of the pier. Eriksson looks not at her but at Grandmother’s hands, still on the gunwale.'));
      else await g.plate(tr('Eriksson looks at Sophia: she is holding Grandmother by the skirt.'));
      await g.say('eriksson', 'Don’t hold your girl back');
      await g.play(push);
      g.set('rowboat', 0);
      await g.plate(tr('Eriksson rows away without saying goodbye.'));
      await g.say('sophia', 'What did he say?');
      await g.say('grandma', 'That he’s old');
    },
    // 1.5: the nets in the evening; ⚑ “tell me, if anything”
    async g => {
      await g.scene(SCENES.shore, { here: ['papa', 'grandma'], moods: { papa: 'thinking', grandma: 'neutral' }, keys: { dusk: 1, net: true, papa_at: 'net', grandma_at: 'net' } });
      await g.plate(tr('Evening. Papa by the boat, untangling a net. Grandmother brings him coffee and sits down beside him on a stone.'));
      await g.say('papa', 'Mamma. Tell me, if anything');
      await g.wait(1500);
      await g.say('papa', 'I’m not going to be the last to know any more');
      const nets = await g.choose('nets', { 'grandma#chest': [
        { id: 'say', label: tr('“I’ll tell you”') },
        { id: 'nothing', label: tr('“There’s nothing to tell”') },
        { id: 'net', label: tr('Take the other end of the net without a word') },
      ] });
      if (nets === 'say') {
        await g.say('grandma', 'I’ll tell you');
        await g.plate(tr('Papa nods and goes on untangling. He drinks the coffee and gives back the cup.'));
      } else if (nets === 'nothing') {
        await g.say('grandma', 'There’s nothing to tell');
        await g.say('papa', 'All right');
        await g.plate(tr('He untangles in silence, faster. When she goes, he watches her go.'));
      } else {
        await g.play(net);
        await g.plate(tr('They untangle it together, not a word.'));
        await g.say('papa', 'Thank you, Mamma');
        await g.plate(tr('And, already bent over the net again, not looking:'));
        await g.say('papa', 'So you’ll tell me, if anything?');
        await g.plate(tr('She does not answer. He does not ask again and goes on untangling alone.'));
      }
      g.apply('nets');
    },
  ],
};
