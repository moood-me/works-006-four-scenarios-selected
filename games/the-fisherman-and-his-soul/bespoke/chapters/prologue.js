// Prologue. “The Net” (scenario §5, П.1–П.6). Night, the boat by the stone; the heavy net; the little Mermaid asleep
// in it; the choice of how he lets her go (net: for a word / for nothing); the evenings after; the morning market.
// Places: the stone (its moments: STONE), the bridge for the market.
// Reads: nothing. Leaves: choices.net, marks.net, scales.song; the traces of М1 (marks.torn: the net torn at the edge)
// and М1б (she slipped out not looking at him).
import { STONE } from '../story.js';
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
      await g.scene('stone', { here: ['fisherman'], moods: { fisherman: 'neutral' }, keys: STONE.night });
      g.title(tr('The Fisherman and his Soul'));
      await g.wait(3000);
      await g.say('narrator', 'Every evening the young Fisherman went out upon the sea, and threw his nets into the water');
      await g.plate(tr('The moon’s path on the water, the boat by the stone, a lantern on the bow. The Fisherman draws in his net — it is heavy, the boat heels.'));
      g.set('net', 'over');
      const { torn } = await g.play(net);
      if (torn) g.mark('torn', 1, null);
      await g.say('fisherman', 'Either all the fish of the sea — or trouble');
      await g.scene('stone', { here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: 'eyes_closed' }, keys: STONE.net }, { cut: true });
      await g.plate(tr('In the net, asleep, lies a little Mermaid: her hair is like wet gold, her tail is silver. She opens her eyes — and struggles.'));
      g.mood('mermaid', 'afraid');
      await g.say('mermaid', 'Let me go! I am the only daughter of an old father. He is alone');
      await g.plate(tr('He holds the edge of the net so that the thread does not cut her arm, and looks at her, and cannot look away.'));
    },
    // П.4: the choice — how he lets her go
    async g => {
      await g.scene('stone', { here: ['fisherman', 'mermaid'], moods: { fisherman: 'thinking', mermaid: 'afraid' }, keys: STONE.net }, { cut: true });
      const how = await g.choose('net', { fisherman: [
        { id: 'word', label: tr('“I will let you go if you come whenever I call, and sing to me.”') },
        { id: 'free', label: tr('“Swim.”') },
      ] });
      if (how === 'word') {
        await g.say('fisherman', 'I will let you go if you come whenever I call, and sing to me');
        g.mood('mermaid', 'neutral');
        await g.plate(tr('She looks up at him from the net.'));
        await g.say('mermaid', 'I will come. I swear it by the sea');
        const { long } = await g.play(release);
        g.set('mermaid_at', 'water');
        g.here('mermaid', false);
        await g.plate(long ? tr('The knot slides by itself; she slips out of the net without looking at him, and is gone under the water.')
          : tr('She goes under the water and does not look back.'));
      } else {
        await g.say('fisherman', 'Swim');
        const { long } = await g.play(release);
        g.set('mermaid_at', 'water');
        if (long) {
          await g.plate(tr('The knot slides by itself; she slips out of the net without looking at him, and stays by the side of the boat.'));
          await g.say('mermaid', 'Do you want nothing?');
          await g.plate(tr('He says nothing. She goes, and does not turn round.'));
        } else {
          g.mood('mermaid', 'surprised');
          await g.plate(tr('She lingers by the side of the boat.'));
          await g.say('mermaid', 'Do you want nothing?');
          await g.plate(tr('He says nothing. She goes — and turns once to look at him.'));
        }
        g.here('mermaid', false);
      }
      g.apply('net');
      g.gauge('song');
    },
    // П.5: the evenings; the market in the morning
    async g => {
      const { net: how } = g.state.choices;
      await g.scene('stone', { here: ['fisherman', 'mermaid'], moods: { fisherman: 'smile', mermaid: 'smile' }, keys: STONE.evenings,
        where: tr('Evening after evening.') });
      if (how === 'word') {
        await g.plate(tr('The evenings go by one after another. Every evening he calls — and she is on the stone; every evening she sings, and the fish come into his net. She sings looking at the fish.'));
      } else {
        g.here('mermaid', false);
        g.set('fish', 0);
        await g.plate(tr('The first nights — an empty sea; he sits in the boat till dawn.'));
        g.set('light', 'dawn');
        g.set('light', 'evening');
        g.here('mermaid', true);
        await g.plate(tr('Then she is on the stone by herself, before any call, and sings looking at him. And then again an evening when the stone is empty and the net is empty: he does not call, he only waits.'));
      }
      await g.scene('bridge', { here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'neutral', potter: 'smile' },
        keys: { time: 'morning', fisherman_at: 'stall', potter_at: 'stall' },
        where: tr('Morning: the market on the square beyond the bridge, an hour’s walk from the bay.') });
      await g.plate(tr('The potter takes his fish; the Fisherman does not count the money, and by noon he is already walking back to the water.'));
      await g.say('narrator', 'And he had more fish than all the fishermen of the bay; but he looked only at the stone');
    },
  ],
};
