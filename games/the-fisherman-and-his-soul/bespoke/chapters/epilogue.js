// Epilogue (scenario §5, §10). Three endings, by the road and the wave (story.js facts): “White Flowers” (stayed with
// her in the wave — after Wilde), “A Lantern on the Pier” (drew her away from the water), “Two Lights” (stayed in the
// deep both times). A pause meant to be: the player only watches — two parts with “Next” between them.
// Pieces: the shore's morning_two, field_corner, mound_morning, priest_mound; the pier's knife_sea, bless_sea,
// hook_empty, post_knife, old_lantern, soul_leaves, witch_knife, witch_dance; the Priest's house's feast_flowers,
// threshold_flowers, sermon; the deep's white_hair, hands_years; the stone's two_lights.
// Reads: everything (facts; marks.apart — М8's trace).
import { facts, on, piece } from '../story.js';

export default {
  number: '', title: tr('Epilogue'),
  titles: ['The Morning', 'Years Later'],
  choices: [],
  steps: [
    // part one: the morning
    async g => {
      const f = facts(g.state);
      if (f.ending === 'flowers') {
        await piece(g, 'morning_two', {
          stop: async () => {
            await g.say('priest', 'I will not bless the sea. Accursed are the sea-folk, and accursed are they who go with them');
            if (f.thief) await g.say('priest', 'He sold his soul — and turned thief');
          },
        }, async () => {
          await g.scene('shore', { beat: 'morning_two', here: ['fisherman', 'mermaid', 'priest'], moods: { fisherman: 'eyes_closed', mermaid: 'eyes_closed', priest: 'angry' },
            keys: { apart: !!g.state.marks.apart } }, { beds: { shore: 0.3 } });
          g.title(tr('White Flowers'));
        });
        on(g, 'knife_sea:out', () => g.sound.wrench());
        on(g, 'knife_sea:thrown', () => setTimeout(() => g.sound.splash(0.3), 900));
        await g.scene('pier', { beat: 'knife_sea', here: ['priest'], moods: { priest: 'angry' } });
        await g.beat('knife_sea');
        await g.say('priest', 'Bury them in the corner of the field where the linen is bleached. With no sign');
      } else if (f.ending === 'lantern') {
        on(g, 'post_knife:out', () => g.sound.wrench());
        await g.scene('pier', { beat: 'post_knife', here: ['fisherman'], moods: { fisherman: 'sad' } });
        g.title(tr('A Lantern on the Pier'));
        await g.beat('post_knife');
        await g.scene('shore', { beat: 'mound_morning', here: ['fisherman', 'priest'], moods: { fisherman: 'sad', priest: 'angry' } }, { beds: { shore: 0.3 } });
        await g.beat('mound_morning');
        await piece(g, 'priest_mound', {
          who: async () => {
            await g.say('priest', 'Who is here?');
            await g.say('fisherman', 'She is from the sea');
            if (f.thief) await g.say('priest', 'And a thief, they say');
          },
          begone: () => g.say('priest', 'She shall not lie in holy ground. And you — come away from her. Begone!'),
        });
      } else {
        await piece(g, 'soul_leaves', {}, async () => {
          await g.scene('pier', { beat: 'soul_leaves', here: ['soul'], moods: { soul: f.hard ? 'neutral' : 'sad' }, keys: { hard: f.hard },
            where: tr('The same morning as the last call.') });
          g.title(tr('Two Lights'));
        });
        await piece(g, 'sermon', {
          preach: () => g.say('priest', 'The fisherman from the bay sold his soul — and see, now he thieves from town to town'),
          laugh: async () => {
            g.mood('witch', 'laugh');
            await g.say('witch', 'Sold! He gave it away for nothing — I saw');
          },
        }, () => g.scene('priest', { beat: 'sermon', here: ['priest', 'woman_a', 'woman_b', 'witch'], moods: { priest: 'angry', witch: 'neutral' },
          where: tr('Years later.') }));
        if (f.witch === 'demand') {
          on(g, 'witch_knife:out', () => g.sound.wrench());
          await g.scene('pier', { beat: 'witch_knife', here: ['witch'], moods: { witch: 'laugh' } }, { beds: { sea: 0.45, crickets: 0.12 } });
          await g.beat('witch_knife');
        } else {
          await g.scene('pier', { beat: 'witch_dance', here: ['witch'], moods: { witch: 'laugh' } }, { beds: { sea: 0.4, tambourine: 0.45 } });
          await g.beat('witch_dance');
        }
      }
    },
    // part two: years later; the last shot
    async g => {
      const f = facts(g.state);
      if (f.ending === 'flowers') {
        await piece(g, 'feast_flowers', {
          ask: async () => {
            await g.say('narrator', 'Three years went by. On the altar lay white flowers such as no one had ever seen. The Priest meant to speak of wrath — and spoke of love, not knowing why himself');
            await g.say('priest', 'Where are the flowers from?');
            await g.say('women', 'From the corner of the field where the linen is bleached', 'woman_a');
          },
        }, () => g.scene('priest', { beat: 'feast_flowers', here: ['priest', 'woman_a', 'woman_b'], moods: { priest: 'thinking' } }));
        await g.scene('shore', { beat: 'field_corner', here: f.widow === 'out' ? ['widow_girl', 'widow_boy'] : [], keys: { shells: f.widow === 'out' } }, { beds: { shore: 0.2, crickets: 0.15 } });
        await g.beat('field_corner');
        if (f.widow === 'out') await g.say('narrator', 'To that corner the widow’s children carried shells: they had stayed, and the boat went out again');
        else await g.say('narrator', 'To that corner nobody went');
        await g.scene('pier', { beat: 'bless_sea', here: ['priest'], moods: { priest: 'neutral' } });
        await g.beat('bless_sea');
        await g.say('narrator', 'In the morning the Priest went down to the sea and blessed everything — the water, the fish, the sea-folk. But the sea-folk had left the bay, and there were never flowers in that corner again');
        await g.scene('pier', { beat: 'hook_empty', here: ['priest'], moods: { priest: 'neutral' } }, { beds: { sea: 0.35 } });
        await g.beat('hook_empty');
        if (f.widow === 'stayed' && f.sounds) {
          g.sound.notes({ how: 'far', level: 0.07 });
          await g.wait(1500);
          await g.say('narrator', 'Far off, at the edge of hearing, four notes, going away out of the bay');
        }
      } else if (f.ending === 'lantern') {
        await piece(g, 'threshold_flowers', {
          altar: () => g.say('narrator', 'Three springs went by, and on the mound grew white flowers such as no one had seen. The Priest set them on the altar; he meant to speak of wrath — and spoke of love'),
        }, () => g.scene('priest', { beat: 'threshold_flowers', here: ['fisherman', 'priest'], moods: { fisherman: 'neutral', priest: 'surprised' } }));
        await g.scene('pier', { beat: 'bless_sea', here: ['priest'], moods: { priest: 'neutral' } });
        await g.beat('bless_sea');
        await g.say('narrator', 'The next day he blessed the sea. But the sea-folk had left the bay');
        await g.scene('pier', { beat: 'old_lantern', here: f.widow === 'out' ? ['fisherman', 'widow_boy'] : ['fisherman'], moods: { fisherman: 'neutral' },
          keys: { boy: f.widow === 'out' }, where: tr('Many years later.') }, { beds: { sea: 0.4, crickets: 0.12 } });
        await g.beat('old_lantern');
        if (f.widow === 'stayed' && f.sounds) {
          g.sound.notes({ count: 3, how: 'far', level: 0.07 });
          await g.wait(1500);
          await g.say('narrator', 'Sometimes he seems to hear three notes');
        }
      } else {
        await piece(g, 'white_hair', {
          touch: async () => {
            await g.say('mermaid', 'What is this — white?');
            await g.say('fisherman', 'Years');
            await g.say('mermaid', 'What are “years”?');
          },
        }, () => g.scene('deep', { beat: 'white_hair', here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: 'smile' },
          keys: { first: f.net === 'word' ? 'he' : 'she', sing: f.sounds }, where: tr('Years on.') }));
        on(g, 'hands_years:hand', () => g.sound.notes(f.sounds ? { how: 'near' } : { count: 2, how: 'near' }));
        await g.beat('hands_years');
        await g.scene('stone', { beat: 'two_lights', here: [] }, { beds: { sea: 0.35 } });
        await g.beat('two_lights');
      }
    },
  ],
};
