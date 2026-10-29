// Prologue. “The Net” (scenario §5, П.1–П.6). Night, the boat by the stone; the heavy net; the little Mermaid asleep
// in it; the choice of how he lets her go (net: for a word / for nothing); the evenings after; the morning market.
// Pieces: the stone's night, in_net, go_word / go_free, evenings; the bridge's market.
// Reads: nothing. Leaves: choices.net, marks.net, scales.song; the traces of М1 (marks.torn: the net torn at the edge)
// and М1б (she slipped out not looking at him: the pieces' `looks`).
import { piece } from '../story.js';
import { net, release } from '../minigames/all.js';

export default {
  number: '', title: tr('The Net'),
  titles: ['Night', 'Let Her Go', 'Evenings'],
  choices: [
    { id: 'net', title: tr('The net'), options: [{ id: 'word', label: tr('For her word') }, { id: 'free', label: tr('For nothing') }] },
  ],
  steps: [
    // П.1–П.2: night, the heavy net
    async g => {
      await piece(g, 'night', {
        cast: () => g.say('narrator', 'Every evening the young Fisherman went out upon the sea, and threw his nets into the water'),
      }, async () => {
        await g.scene('stone', { beat: 'night', here: ['fisherman'], moods: { fisherman: 'neutral' } });
        g.title(tr('The Fisherman and his Soul'));
      });
      const { torn } = await g.play(net);
      if (torn) g.mark('torn', 1, null);
      await g.say('fisherman', 'Either all the fish of the sea — or trouble');
    },
    // П.3–П.4: the Mermaid in the net; the choice — how he lets her go
    async g => {
      await piece(g, 'in_net', {
        wake: async () => {
          g.mood('mermaid', 'afraid');
          await g.say('mermaid', 'Let me go! I am the only daughter of an old father. He is alone');
        },
      }, async () => {
        await g.scene('stone', { beat: 'in_net', here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: 'eyes_closed' } });
        await g.say('narrator', 'And in the net, asleep, lay a little Mermaid. Her hair was like wet gold, and her tail was silver');
      });
      const how = await g.choose('net', { fisherman: [
        { id: 'word', label: tr('“I will let you go if you come whenever I call, and sing to me.”') },
        { id: 'free', label: tr('“Swim.”') },
      ] });
      if (how === 'word') {
        await g.say('fisherman', 'I will let you go if you come whenever I call, and sing to me');
        g.mood('mermaid', 'neutral');
        await g.say('mermaid', 'I will come. I swear it by the sea');
        const { long } = await g.play(release);
        g.set('looks', !long);
        await g.beat('go_word');
      } else {
        await g.say('fisherman', 'Swim');
        const { long } = await g.play(release);
        g.set('looks', !long);
        g.mood('mermaid', long ? 'neutral' : 'surprised');
        await piece(g, 'go_free', { linger: () => g.say('mermaid', 'Do you want nothing?') });
      }
      g.apply('net');
      g.gauge('song');
    },
    // П.5: the evenings; the market in the morning
    async g => {
      const { net: how } = g.state.choices;
      await g.scene('stone', { beat: 'evenings', here: ['fisherman', 'mermaid'], moods: { fisherman: 'smile', mermaid: 'smile' }, keys: { net_way: how } });
      await g.beat('evenings');
      await piece(g, 'market', {
        end: () => g.say('narrator', 'And he had more fish than all the fishermen of the bay; but he looked only at the stone'),
      }, () => g.scene('bridge', { beat: 'market', here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'neutral', potter: 'smile' } }));
    },
  ],
};
