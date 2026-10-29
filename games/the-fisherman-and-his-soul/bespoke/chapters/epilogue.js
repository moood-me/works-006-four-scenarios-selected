// Epilogue (scenario §5, §10). Three endings, by the road and the wave (story.js facts): “White Flowers” (stayed with
// her in the wave — after Wilde), “A Lantern on the Pier” (drew her away from the water), “Two Lights” (stayed in the
// deep both times). A pause meant to be: the player only watches — two parts with “Next” between them.
// Places: the shore (the pier seen toward the land), the pier, the Priest's house, the deep, the stone (the last shot of
// «Two Lights»).
// Reads: everything (facts; marks.apart — М8's trace).
import { DEEP, PRIEST, STONE, facts } from '../story.js';

export default {
  number: '', title: tr('Epilogue'),
  titles: ['The Morning', 'Years Later'],
  choices: [],
  steps: [
    // part one: the morning
    async g => {
      const f = facts(g.state);
      if (f.ending === 'flowers') {
        const apart = !!g.state.marks.apart;
        await g.scene('shore', { here: ['fisherman', 'mermaid', 'priest'], moods: { fisherman: 'eyes_closed', mermaid: 'eyes_closed', priest: 'angry' },
          keys: { light: 'morning', mist: 1, hut: 'gone', widow_boat: true, lantern_at: 'post', knife: 'post', rust: true,
            fisherman_at: 'sand', mermaid_at: 'sand', priest_at: 'shore' } });
        g.title(tr('White Flowers'));
        await g.plate(apart ? tr('Morning. The lantern still burns on the post. The Priest comes down to bless the sea; on the sand lie two, side by side, their fingers almost touching.')
          : tr('Morning. The lantern still burns on the post. The Priest comes down to bless the sea; on the sand lie two — the Fisherman holding her in his arms.'));
        await g.say('priest', 'I will not bless the sea. Accursed are the sea-folk, and accursed are they who go with them');
        if (f.thief) await g.say('priest', 'He sold his soul — and turned thief');
        g.set('priest_at', 'post');
        await g.plate(tr('He pulls the knife out of the post and throws it into the sea.'));
        g.set('knife', 'none');
        await g.say('priest', 'Bury them in the corner of the field where the linen is bleached. With no sign');
      } else if (f.ending === 'lantern') {
        await g.scene('shore', { here: ['fisherman', 'priest'], moods: { fisherman: 'sad', priest: 'angry' },
          keys: { light: 'morning', hut: 'gone', widow_boat: true, mound: true, knife: 'mound', rust: true, fisherman_at: 'field', priest_at: 'mound' } });
        g.title(tr('A Lantern on the Pier'));
        await g.plate(tr('Morning. At the edge of the field — a fresh mound. The Fisherman goes down to the pier — the post has stood — pulls out the knife and sets it at her head. He sits beside her.'));
        await g.say('priest', 'Who is here?');
        await g.say('fisherman', 'She is from the sea');
        if (f.thief) await g.say('priest', 'And a thief, they say');
        await g.plate(tr('The Fisherman does not answer.'));
        await g.say('priest', 'She shall not lie in holy ground. And you — come away from her. Begone!');
        await g.plate(tr('The Fisherman does not get up. The Priest goes, without a blessing.'));
      } else {
        await g.scene('pier', { here: ['soul'], moods: { soul: f.hard ? 'neutral' : 'sad' },
          keys: { light: 'dawn', mist: 0.6, soul_at: 'end', soul_with: ['cup', f.hard ? 'lantern_out' : 'lantern'], lantern_at: 'none', knife: 'post' },
          where: tr('The same morning as the last call.') });
        g.title(tr('Two Lights'));
        g.set('soul_at', 'walk');
        if (f.hard) await g.plate(tr('The Soul leaves the pier with the cup and the lantern. The lantern is dark; she does not turn round. Over the hill, to the bridge.'));
        else {
          g.set('far_lantern', 1, 14);
          await g.plate(tr('The Soul leaves the pier with the cup and the lantern. The lantern burns; once she turns to the water. Over the hill, to the bridge.'));
        }
        await g.scene('priest', { here: ['priest', 'woman_a', 'woman_b', 'witch'], moods: { priest: 'angry', witch: 'neutral' }, keys: PRIEST.sermon,
          where: tr('Years later.') });
        await g.say('priest', 'The fisherman from the bay sold his soul — and see, now he thieves from town to town');
        await g.plate(tr('The women make the sign.'));
        g.mood('witch', 'laugh');
        await g.plate(tr('The Witch in the crowd laughs aloud.'));
        await g.say('witch', 'Sold! He gave it away for nothing — I saw');
        await g.scene('pier', { here: ['witch'], moods: { witch: 'laugh' },
          keys: { light: 'night', witch_at: 'end', knife: 'post', ...(f.witch === 'demand' ? {} : { witch_with: ['tambourine_hand'] }) } });
        if (f.witch === 'demand') {
          g.set('knife', 'none');
          g.set('witch_with', ['knife']);
          await g.plate(tr('And afterwards she pulls the knife out of the post and carries it away.'));
        } else await g.plate(tr('And at full moon she dances alone at the end of the pier.'));
      }
    },
    // part two: years later; the last shot
    async g => {
      const f = facts(g.state);
      if (f.ending === 'flowers') {
        await g.scene('priest', { here: ['priest', 'woman_a', 'woman_b'], moods: { priest: 'thinking' }, keys: PRIEST.feast,
          where: tr('Three years later, a feast day.') });
        await g.plate(tr('Three years. On the altar — white flowers such as no one has seen, and their scent. The Priest meant to speak of wrath — and speaks of love, not knowing why himself.'));
        await g.say('priest', 'Where are the flowers from?');
        await g.plate(tr('From the corner of the field where the linen is bleached.'));
        await g.scene('shore', { here: f.widow === 'out' ? ['widow_girl', 'widow_boy'] : [],
          keys: { light: 'noon', hut: 'gone', widow_boat: true, linen: true, shells: f.widow === 'out', widow_girl_at: 'field', widow_boy_at: 'field' } });
        if (f.widow === 'out') await g.plate(tr('To that corner the widow’s children carry shells: they stayed, the boat goes out again.'));
        else await g.plate(tr('To that corner nobody goes.'));
        await g.plate(tr('In the morning the Priest goes down to the sea and blesses everything — the water, the fish, the sea-folk. But the sea-folk had left the bay, and there were never flowers in that corner again.'));
        await g.scene('pier', { here: ['priest'], keys: { light: 'morning', mist: 1, lantern_at: 'none', knife: 'none', priest_at: 'end' } });
        if (f.widow === 'stayed' && f.sounds) await g.plate(tr('Last shot: the Priest on the pier in the mist, the lantern’s hook empty. Far off, at the edge of hearing, four notes, going away out of the bay.'));
        else await g.plate(tr('Last shot: the Priest on the pier in the mist, the lantern’s hook empty. Only the water.'));
      } else if (f.ending === 'lantern') {
        await g.scene('priest', { here: ['fisherman', 'priest'], moods: { fisherman: 'neutral', priest: 'surprised' }, keys: PRIEST.threshold,
          where: tr('Three springs later.') });
        await g.plate(tr('Three springs. On the mound — white flowers such as no one has seen. The Fisherman carries them to the Priest’s door, lays them on the threshold and goes.'));
        g.here('fisherman', false);
        g.set('flowers', 'altar');
        await g.plate(tr('The Priest sets them on the altar; he meant to speak of wrath — and speaks of love. The next day he blesses the sea. The sea-folk have left the bay.'));
        await g.scene('pier', { here: f.widow === 'out' ? ['fisherman', 'widow_boy'] : ['fisherman'], moods: { fisherman: 'neutral' },
          keys: { light: 'night', fisherman_at: 'end', fisherman_with: ['lantern'], lantern_at: 'none', knife: 'none', widow_boy_at: 'end' },
          where: tr('Night, many years later; the Fisherman is old.') });
        if (f.widow === 'out') await g.plate(tr('Last shot: night; the old Fisherman at the end of the pier with his lantern, its beam on the water. Beside him the widow’s boy knots a new net from his. He hears no notes — only the water.'));
        else if (f.sounds) await g.plate(tr('Last shot: night; the old Fisherman alone at the end of the pier with his lantern, its beam on the water. Sometimes he seems to hear three notes.'));
        else await g.plate(tr('Last shot: night; the old Fisherman alone at the end of the pier with his lantern, its beam on the water. Only the water.'));
      } else {
        await g.scene('deep', { here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: 'smile' }, keys: DEEP.years,
          where: tr('Years on. His hair is white; she is the same as in the net.') });
        await g.plate(tr('She touches his hair.'));
        await g.say('mermaid', 'What is this — white?');
        await g.say('fisherman', 'Years');
        await g.say('mermaid', 'What are “years”?');
        await g.plate(tr('He does not answer.'));
        if (f.net === 'word') await g.plate(tr('He is the first to take her hand, as he always called her.'));
        else await g.plate(tr('She takes his hand first, before he reaches for hers.'));
        g.set('hands', true);
        if (f.sounds) await g.plate(tr('She sings all four notes.'));
        else await g.plate(tr('She begins to sing and falls silent; they are silent, hand in hand.'));
        await g.scene('stone', { here: [], keys: STONE.lights });
        g.set('far_light', 1, 12);
        await g.plate(tr('Last shot: night, the bay; under the water by the stone, two pale lights; far off beyond the hill, a third, going away.'));
      }
    },
  ],
};
