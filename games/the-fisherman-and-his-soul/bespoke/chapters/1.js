// I. The Shadow at his Feet (scenario §5, 1.1–1.12). The stone: “send away your soul”; the Priest drives him out; the
// feast on the pier — the sign “Stop” (danced or passed by); the Witch at the well, the dance at full moon, the man in
// black velvet, the sign he makes without thinking; the choice with the Witch; moonrise: the shadow rises — the Soul
// asks for a heart; the choice of the heart; the knife; the sea takes him.
// Stand-ins: the stone — the pier; the Priest's house — the bridge (the Priest is heard, not seen); the feast on the
// pier — the pier (the girl is heard, not seen).
// Reads: marks.net. Leaves: choices.stop, witch, heart; marks.danced, witch, come; scales.soul, song.
import { SCENES } from '../story.js';
import { dance, knife } from '../minigames/all.js';

export default {
  number: 'I', title: tr('The Shadow at his Feet'),
  titles: ['The Stone', 'The Priest', 'The Feast', 'The Well', 'The Dance', 'The Witch', 'Moonrise', 'The Heart', 'The Knife'],
  choices: [
    { id: 'stop', title: tr('The girl dancing on the pier'), options: [{ id: 'danced', label: tr('Stopped, and danced') }, { id: 'passed', label: tr('Passed by, looked back once') }] },
    { id: 'witch', title: tr('The Witch'), options: [{ id: 'demand', label: tr('“You promised.”') }, { id: 'dance', label: tr('“Again. Without him. Till dawn.”') }] },
    { id: 'heart', title: tr('The heart'), options: [{ id: 'ask', label: tr('“And what would I love her with?”') }, { id: 'cut', label: tr('Not to look. To cut.') }, { id: 'come', label: tr('“Come here once a year”') }] },
  ],
  steps: [
    // 1.1: the stone
    async g => {
      await g.scene(SCENES.pier, { here: ['fisherman', 'mermaid'], moods: { fisherman: 'thinking', mermaid: 'smile' },
        where: tr('In truth: by the stone, moonlight; he stands knee-deep in the water.') });
      await g.say('fisherman', 'Be my wife');
      await g.say('mermaid', 'You have a human soul. Send it away — and I will love you');
      await g.say('fisherman', 'What use is a soul to me? I have never seen it. Never touched it. I do not know it');
      g.mood('mermaid', 'laugh');
      await g.plate(tr('She laughs and beats the water with her tail.'));
      await g.say('mermaid', 'Send it away — and come');
      await g.say('fisherman', 'I will come tomorrow');
      await g.say('mermaid', 'What is “tomorrow”?');
      g.here('mermaid', false);
      await g.plate(tr('She laughs and goes under the water. She asked it the way one asks to take off a wet shirt — not knowing what she asks.'));
    },
    // 1.2: the Priest
    async g => {
      await g.scene(SCENES.bridge, { here: ['fisherman'], moods: { fisherman: 'neutral' },
        where: tr('In truth: the Priest’s white house on the hill, morning; candles, a table for an altar. The Priest is heard, not seen yet.') });
      await g.say('fisherman', 'Father, I love a girl of the sea. My soul is in the way. How do I send it away?');
      await g.plate(tr('The Priest rises and makes the sign — palm to the brow and to the heart.'));
      await g.say('priest', 'The soul is worth more than all the gold in the world. The sea-folk are accursed. Keep away from them');
      g.mood('fisherman', 'angry');
      await g.plate(tr('The Fisherman gets up so sharply that the bench falls, and does not hear him out.'));
      await g.say('fisherman', 'If it is worth so much — I do not need it');
      await g.say('priest', 'Begone!');
      g.mood('fisherman', 'sad');
      await g.plate(tr('The door. On the threshold, from a boy’s habit, the Fisherman makes the same sign — and, noticing, drops his hand.'));
    },
    // 1.3: the feast on the pier; the sign “Stop”
    async g => {
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'neutral' },
        where: tr('In truth: the pier at noon, a feast in the village. The dancing girl and the women are heard, not seen yet.') });
      await g.plate(tr('Noon. On the pier a girl dances barefoot, the others clap. The Fisherman walks past, toward the wood.'));
      await g.say('women', 'By the well in the fir wood lives one who knows');
      await g.plate(tr('He comes level with the dancing girl.'));
      const stop = await g.interrupt('stop', { fisherman: [{ id: 'danced', label: tr('Stop') }] }, { id: 'passed' }, 5000);
      if (stop === 'danced') {
        await g.plate(tr('He stops and looks at her feet. She pulls him by the sleeve.'));
        await g.say('girl', 'Dance, fisherman!');
        g.mood('fisherman', 'laugh');
        await g.plate(tr('Two clumsy steps — and he laughs, for the first time in the game. His shadow on the boards dances with him.'));
      } else {
        await g.plate(tr('He walks past. He looks back once.'));
      }
      g.apply('stop');
    },
    // 1.4: the well
    async g => {
      await g.scene(SCENES.well, { here: ['fisherman', 'witch'], moods: { fisherman: 'neutral', witch: 'smile' },
        where: tr('In truth: the well in the fir wood, evening (the moon is not up yet).') });
      await g.plate(tr('The red-haired Witch sits on the rim of the well, swinging her bare feet.'));
      await g.say('witch', 'What do you want? Wind? Fish? No. I know. To send your soul away');
      await g.say('fisherman', 'Tell me how');
      await g.say('witch', 'The price is a dance. Tonight, at full moon, here');
      await g.say('fisherman', 'Only a dance?');
      g.mood('witch', 'laugh');
      await g.say('witch', 'Only');
      g.mood('witch', 'smile');
      await g.plate(tr('She looks at him longer than she needs to.'));
    },
    // 1.5: the dance; the man in black velvet
    async g => {
      await g.scene(SCENES.well, { here: ['fisherman', 'witch'], moods: { fisherman: 'neutral', witch: 'laugh' },
        where: tr('In truth: the same well, midnight, the moon over the firs.') });
      await g.plate(tr('The Witch beats her tambourine; they dance facing each other round the well.'));
      await g.play(dance);
      g.here('velvet', true);
      await g.plate(tr('By the last fir stands a man in black velvet, pale, watching. The Witch pulls the Fisherman toward him.'));
      await g.say('witch', 'Bow to him');
      g.mood('fisherman', 'thinking');
      await g.plate(tr('Without thinking, the Fisherman makes the sign — palm to the brow and to the heart. The man in black turns away and goes into the wood.'));
      g.here('velvet', false);
      g.mood('witch', 'afraid');
      await g.plate(tr('The Witch cries out; the dance falls apart.'));
    },
    // 1.6: the choice with the Witch
    async g => {
      await g.scene(SCENES.well, { here: ['fisherman', 'witch'], moods: { fisherman: 'neutral', witch: 'angry' } }, { cut: true });
      await g.plate(tr('The Witch by the rim of the well, breathing hard.'));
      await g.say('witch', 'You broke the dance. The bargain is not kept');
      await g.plate(tr('She watches him stand there and not go.'));
      const w = await g.choose('witch', { fisherman: [
        { id: 'demand', label: tr('“You promised.”') },
        { id: 'dance', label: tr('“Again. Without him. Till dawn.”') },
      ] });
      if (w === 'demand') {
        await g.say('fisherman', 'You promised');
        await g.plate(tr('She looks at him a long time.'));
        await g.say('witch', 'I promised');
        await g.plate(tr('In a whisper she tells him the rule — and throws a knife at his feet.'));
        await g.say('witch', 'Take it. Cut. You will see for yourself what comes of a man without one');
        g.mood('witch', 'sad');
        await g.plate(tr('She turns away to the well.'));
      } else {
        await g.say('fisherman', 'Again. Without him. Till dawn');
        g.mood('witch', 'surprised');
        await g.plate(tr('She stands still — then laughs, a different laugh.'));
        g.mood('witch', 'smile');
        await g.plate(tr('They dance, the two of them, slowly, till the moon grows pale. At dawn she gives him the knife and the rule without a word, and keeps his hand on the hilt longer than she needs to.'));
      }
      await g.plate(tr('The rule: “At moonrise stand by the water with your back to the moon. The shadow at your feet is the body of your soul. Cut it from your feet with this knife.” The knife has a handle of green snakeskin.'));
      g.apply('witch');
    },
    // 1.7–1.8: moonrise; the shadow rises
    async g => {
      const { witch } = g.state.choices;
      await g.scene(SCENES.pier, { here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: 'neutral' },
        where: tr('In truth: the pier, the next evening, moonrise; she is by the stone, up to her shoulders in the water.') });
      await g.plate(tr('The Fisherman on the pier with his back to the moon; his shadow is long, right down to the water. By the stone the Mermaid watches.'));
      if (witch === 'dance') {
        g.mood('mermaid', 'sad');
        await g.say('mermaid', 'You smell of the wood');
        await g.plate(tr('And nothing more.'));
      }
      g.here('soul', true);
      g.mood('soul', 'afraid');
      await g.plate(tr('The shadow rises from the boards — a man with his face; the water shows through him.'));
      await g.say('soul', 'I have been with you all your life. Do not drive me away. And if you do — do not send me without a heart. The world is cruel. Give me your heart; with it I shall not be lost');
      await g.plate(tr('His own voice, quieter. Fear — not a plea for mercy.'));
    },
    // 1.9: the choice of the heart
    async g => {
      await g.scene(SCENES.pier, { here: ['fisherman', 'soul', 'mermaid'], moods: { fisherman: 'thinking', soul: 'afraid', mermaid: 'neutral' } }, { cut: true });
      const h = await g.choose('heart', { fisherman: [
        { id: 'ask', label: tr('“And what would I love her with?”') },
        { id: 'cut', label: tr('Not look at it. Cut.') },
        { id: 'come', label: tr('“My heart is hers. But come here once a year — I will come out to you.”') },
      ] });
      if (h === 'ask') {
        await g.say('fisherman', 'And what would I love her with, then?');
        g.mood('soul', 'neutral');
        await g.say('soul', 'Then I shall be cruel. You chose it yourself. Once a year I will come here and call');
      } else if (h === 'cut') {
        await g.plate(tr('He looks at the water. The Soul talks to the very last.'));
        await g.say('soul', 'Once a year I will come and…');
        await g.plate(tr('It breaks off in the middle of the word.'));
      } else {
        await g.say('fisherman', 'My heart is hers. But come here once a year. I will come out to you');
        g.mood('soul', 'neutral');
        await g.say('soul', 'I will come. You promised');
        g.here('mermaid', false);
        await g.plate(tr('By the stone the Mermaid goes under the water, and does not come up for a long while.'));
        g.here('mermaid', true);
      }
      g.gauge('soul');
      g.apply('heart');
    },
    // 1.10–1.11: the knife; the sea takes him
    async g => {
      await g.scene(SCENES.pier, { here: ['fisherman', 'soul', 'mermaid'], moods: { fisherman: 'neutral', soul: 'neutral', mermaid: 'neutral' } }, { cut: true });
      await g.play(knife);
      await g.plate(tr('The shadow comes away; the Soul stands apart. The Fisherman drives the knife into the post of the pier and leaves his lantern on the boards.'));
      g.here('fisherman', false);
      await g.plate(tr('He walks into the water, away from the pier, toward the stone. The Mermaid waits by the stone till he is far from the Soul — then laughs, takes his hand, and they go under.'));
      g.mood('soul', 'sad');
      await g.plate(tr('On the pier the Soul picks up his lantern and looks at the water.'));
      await g.say('narrator', 'And the sea took him');
    },
  ],
};
