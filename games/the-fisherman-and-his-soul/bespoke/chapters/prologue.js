// Prologue. “The Net” (scenario §5, П.1–П.6). Night, the boat by the stone; the heavy net; the little Mermaid asleep
// in it; ⚑-less choice of how he lets her go (net: for a word / for nothing); the evenings after.
// Stand-ins: the boat by the stone — the pier.
// Reads: nothing. Leaves: choices.net, marks.net, scales.song.
import { SCENES } from '../story.js';
import { net, release } from '../minigames/all.js';

export default {
  number: '', title: tr('The Net'),
  titles: ['Night', 'Let Her Go', 'Evenings'],
  choices: [
    { id: 'net', title: tr('The net'), options: [{ id: 'word', label: tr('For her word') }, { id: 'free', label: tr('For nothing') }] },
  ],
  steps: [
    // П.1–П.3: night, the net, the Mermaid in it
    async g => {
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'neutral' },
        where: tr('In truth: the boat by the stone in the bay, at night; the lantern on her bow.') });
      g.title(tr('The Fisherman and his Soul'));
      await g.wait(3000);
      await g.say('narrator', 'Every evening the young Fisherman went out upon the sea, and threw his nets into the water');
      await g.plate(tr('The moon’s path on the water, the boat by the stone, a lantern on the bow. The Fisherman draws in his net — it is heavy, the boat heels.'));
      await g.play(net);
      await g.say('fisherman', 'Either all the fish of the sea — or trouble');
      g.here('mermaid', true);
      g.mood('mermaid', 'neutral');
      await g.plate(tr('In the net, asleep, lies a little Mermaid: her hair is like wet gold, her tail is silver. She opens her eyes — and struggles.'));
      g.mood('mermaid', 'afraid');
      await g.say('mermaid', 'Let me go! I am the only daughter of an old father. He is alone');
      await g.plate(tr('He holds the edge of the net so that the thread does not cut her arm, and looks at her, and cannot look away.'));
    },
    // П.4: the choice — how he lets her go
    async g => {
      await g.scene(SCENES.pier, { here: ['fisherman', 'mermaid'], moods: { fisherman: 'thinking', mermaid: 'afraid' },
        where: tr('In truth: the boat by the stone; she is in his net.') }, { cut: true });
      const how = await g.choose('net', { fisherman: [
        { id: 'word', label: tr('“I will let you go if you come whenever I call, and sing to me.”') },
        { id: 'free', label: tr('“Swim.”') },
      ] });
      if (how === 'word') {
        await g.say('fisherman', 'I will let you go if you come whenever I call, and sing to me');
        g.mood('mermaid', 'neutral');
        await g.plate(tr('She looks up at him from the net.'));
        await g.say('mermaid', 'I will come. I swear it by the sea');
        await g.play(release);
        g.here('mermaid', false);
        await g.plate(tr('She goes under the water and does not look back.'));
      } else {
        await g.say('fisherman', 'Swim');
        await g.play(release);
        g.mood('mermaid', 'surprised');
        await g.plate(tr('She lingers by the side of the boat.'));
        await g.say('mermaid', 'Do you want nothing?');
        await g.plate(tr('He says nothing. She goes — and turns once to look at him.'));
        g.here('mermaid', false);
      }
      g.apply('net');
      g.gauge('song');
    },
    // П.5: the evenings
    async g => {
      const { net: how } = g.state.choices;
      await g.scene(SCENES.pier, { here: ['fisherman', 'mermaid'], moods: { fisherman: 'smile', mermaid: 'smile' },
        where: tr('In truth: the stone in the bay, evening after evening.') });
      if (how === 'word') {
        await g.plate(tr('The evenings go by one after another. Every evening he calls — and she is on the stone; every evening she sings, and the fish come into his net. She sings looking at the fish.'));
      } else {
        g.here('mermaid', false);
        await g.plate(tr('The first nights — an empty sea; he sits in the boat till dawn.'));
        g.here('mermaid', true);
        await g.plate(tr('Then she is on the stone by herself, before any call, and sings looking at him. And then again an evening when the stone is empty and the net is empty: he does not call, he only waits.'));
      }
      await g.plate(tr('Mornings: the market on the square beyond the bridge, an hour’s walk. The potter takes his fish; the Fisherman does not count the money, and by noon he is already walking back to the water.'));
      await g.say('narrator', 'And he had more fish than all the fishermen of the bay; but he looked only at the stone');
    },
  ],
};
