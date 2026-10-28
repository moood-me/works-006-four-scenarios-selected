// II. “The Calm” (scenario §5, 2.1–2.3). July, the sea like glass: the cat who does not love her, back to back, the
// pebble, the empty new house — “At night. Some day”; Sophia’s prayer; Grandmother sits down on the way. ⚑ The bird on
// the pillow (colours). The full moon — ⚑ the first hinge: “Where is Mama now?”
// Reads: marks.smoke. Leaves: choices.bird, choices.mama, marks.cat, marks.mama, marks.someday, marks.notsoon, scales.
import { SCENES } from '../story.js';
import { pebble, palm, hand, door } from '../minigames/all.js';

export default {
  number: 'II', title: tr('The Calm'),
  titles: ['The Calm', 'The Bird', 'The Moon'],
  choices: [
    { id: 'bird', title: tr('The bird on the pillow'), options: [{ id: 'gift', label: tr('“It’s a present”') }, { id: 'bury', label: tr('“Let’s bury it”') }, { id: 'out', label: tr('“I’ll clear it away. And him — out”') }] },
    { id: 'mama', title: tr('Where is Mama now?'), weight: '⚑', options: [{ id: 'gone', label: tr('“She isn’t here any more”') }, { id: 'sky', label: tr('“In heaven. She sees you”') }, { id: 'moon', label: tr('Take her out to the water') }] },
  ],
  steps: [
    // 2.1: the calm
    async g => {
      await g.scene(SCENES.shore, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'smile' } });
      g.title(tr('July'));
      await g.plate(tr('Heat; the sea like glass, not a sound. Grandmother and Sophia sit on the warm rock. Mappe the cat walks past; Sophia reaches for him with both hands — he goes away before she touches him, without looking back.'));
      g.mood('sophia', 'sad');
      await g.say('sophia', 'Why doesn’t he love me? I feed him');
      await g.say('grandma', 'What do you think?');
      g.mood('sophia', 'angry');
      await g.say('sophia', 'Don’t ask back!');
      g.mood('grandma', 'angry');
      await g.say('grandma', 'Then don’t ask me anything either!');
      await g.plate(tr('Grandmother is cross herself, like a little girl, and moves round to sit with her back to her. They sit back to back and sulk.'));
      await g.play(pebble);
      g.mood('grandma', 'neutral');
      await g.plate(tr('The rings spread and die away; nothing else happens. Then, without turning round, Grandmother holds a second pebble out behind her. Sophia takes it and throws it too.'));
      g.mood('sophia', 'smile');
      await g.plate(tr('Over the forest you can see the roof of the new house on the other side of the island, its windows black, empty all summer.'));
      await g.say('sophia', 'Let’s climb in there!');
      await g.say('grandma', 'At night. Some day');
      await g.say('sophia', 'Promise?');
      g.mood('grandma', 'smile');
      await g.say('grandma', 'We’ll see');
      g.mark('someday', 'given', tr('Half a promise: the new house, “at night, some day.”'));
      await g.wait(10000); // (the silence)
      g.mood('sophia', 'thinking');
      await g.plate(tr('Sophia gets on her knees.'));
      await g.say('sophia', 'God, let something happen. Something big');
      await g.plate(tr('Grandmother hears it and says nothing. On the way to the house she suddenly sits down on the stone by the gate, for two seconds, and gets up. In the window Papa raises his head from his papers and looks. Sophia does not see: she runs on ahead.'));
    },
    // 2.2: ⚑ the bird on the pillow
    async g => {
      await g.scene(SCENES.house, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'angry' } });
      await g.plate(tr('Morning. On Sophia’s pillow, a dead bird; beside it the cat sits and waits.'));
      await g.say('sophia', 'Murderer! I hate you!');
      const bird = await g.choose('bird', { 'grandma#chest': [
        { id: 'gift', label: tr('“He brought it for you. A present. He doesn’t know any other way”') },
        { id: 'bury', label: tr('“Let’s go and bury it”') },
        { id: 'out', label: tr('“I’ll clear it away. And him — out of the door”') },
      ] });
      if (bird === 'gift') {
        await g.say('grandma', 'He brought it for you. A present. He doesn’t know any other way');
        g.mood('sophia', 'thinking');
        await g.plate(tr('Sophia looks at the cat for a long time. Then, for the first time, she strokes him, carefully; the cat puts up with it and does not go. She puts the bird in an old tea box.'));
        await g.plate(tr('Next morning there is a new bird on the pillow, and the cat sits beside it and waits. Without a word, wrinkling her nose, Sophia puts it with two fingers into the same box.'));
      } else if (bird === 'bury') {
        await g.say('grandma', 'Let’s go and bury it');
        await g.scene(SCENES.shore, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'thinking' } });
        await g.plate(tr('On the shore, a hole in the sand between the stones. Grandmother carves a bird out of a chip of wood and sets it on top.'));
        await g.say('sophia_song', 'Mm… la-a, la-la… mm-mm… la-a-a', 'sophia');
        await g.say('sophia', 'Where is it now?');
        await g.say('grandma', 'Here');
        await g.plate(tr('Sophia lays a shell on top. From that day she buries everything dead she finds — a fly, a fish head, a dry crab — and each time she holds out a chip of wood to Grandmother without a word. Grandmother carves bird after bird; a row of little graves with shells grows on the shore.'));
      } else {
        await g.say('grandma', 'I’ll clear it away. And him — out of the door');
        await g.plate(tr('Quickly Grandmother wraps the bird in a pillowcase and carries it away, so that Sophia does not look at it any more. From that day the cat is put out for the night; he sleeps on the veranda rail and does not ask to come in.'));
      }
      g.apply('bird');
    },
    // 2.3: the full moon; ⚑ Where is Mama now?
    async g => {
      await g.scene(SCENES.house, { here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'sad', papa: 'sad' } });
      await g.plate(tr('Night, a full moon. Sophia stands at the window in her nightdress.'));
      await g.say('sophia', 'Grandmother. The moon’s in the water');
      await g.plate(tr('Grandmother sits up in bed. Sophia, not turning round:'));
      await g.say('sophia', 'And where is Mama now?');
      await g.plate(tr('Behind the glass door, on the veranda, Papa’s camp bed stops creaking: he is not asleep. Sophia’s face, close, in the moonlight.'));
      const mama = await g.choose('mama', { 'sophia#chest': [
        { id: 'gone', label: tr('“I don’t know. She isn’t here any more. That’s for ever”') },
        { id: 'sky', label: tr('“In heaven. And she sees you”') },
        { id: 'moon', label: tr('Don’t answer. Take her by the hand and out to the water') },
      ] });
      if (mama === 'gone') {
        await g.say('grandma', 'I don’t know. She isn’t here any more. That’s for ever');
        g.mood('sophia', 'angry');
        await g.say('sophia', 'You’re lying');
        await g.say('grandma', 'No');
        g.mood('sophia', 'sad');
        await g.plate(tr('Silence. Then Sophia cries — loudly, for the first time this summer — and goes from the window to her own bed and sits on its edge with her back to Grandmother. On the veranda Papa gets up and goes out on the porch, closing the door quietly.'));
        g.here('papa', false);
        await g.plate(tr('Grandmother cannot hug. She moves to the edge of her own bed, very near.'));
        await g.play(palm);
        await g.plate(tr('Sophia comes over to her by herself and goes quiet.'));
        await g.plate(tr('In the morning the hat is not on its nail: it is on Sophia’s bed. Papa sees it from the doorway, stands a long time, does not touch it, and sits down at his table with his back to the room. All day Sophia does not talk to Grandmother.'));
      } else if (mama === 'sky') {
        await g.say('grandma', 'In heaven. And she sees you');
        g.mood('sophia', 'thinking');
        await g.say('sophia', 'Does she see the moon too?');
        await g.say('grandma', 'The moon too');
        await g.say('sophia', 'And you won’t go away? You said soon');
        await g.say('grandma', 'Soon is how old people say it. The way you say it, not soon');
        g.mood('sophia', 'smile');
        await g.plate(tr('Sophia waves to the moon. On the veranda Papa breathes out, long.'));
        await g.play(hand);
        await g.plate(tr('In the morning Sophia makes her bed herself and whispers to Grandmother:'));
        await g.say('sophia', 'Mama sees');
        await g.plate(tr('All day she is cheerful and sings. The hat is on its nail; Sophia walks round it.'));
      } else {
        await g.play(door);
        await g.scene(SCENES.shore, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'thinking' },
          where: tr('In truth: the rocks by the water at night, the moon’s path up to their feet.') });
        await g.plate(tr('Night on the rocks; the moon’s path comes right up to their feet.'));
        await g.say('sophia', 'And Mama…');
        await g.say('grandma', 'Look');
        await g.plate(tr('They look. It is cold; Grandmother puts her shawl round Sophia and stays in her cardigan. On the veranda Papa does not come out.'));
        await g.plate(tr('In the morning:'));
        await g.say('papa', 'Mamma, it’s cold at night');
        await g.plate(tr('Grandmother coughs.'));
      }
      g.apply('mama');
    },
  ],
};
