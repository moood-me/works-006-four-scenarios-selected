// II. Three Years (scenario §5, 2.1–2.8). The deep and her song; the first year — the Mirror of Wisdom, her law said
// aloud; the choice “till sunrise”; the second year — the Ring of Riches; dancing under water; the third year — the
// dancer on the square; ⚑ the first hinge “One Day”.
// Pieces: the deep's deep_song, dance_deep; the pier's come_out, law, sit_edge / to_song, ring, laugh_go, third_year,
// go_day / stay_day.
// Reads: marks.come, danced; scales.soul, song. Leaves: choices.sit, day; scales.soul, song. М4 touched twice — she
// sings holding his hand.
import { facts, on, piece } from '../story.js';
import { song } from '../minigames/all.js';

export default {
  number: 'II', title: tr('Three Years'),
  titles: ['The Deep', 'The First Year', 'Till Sunrise', 'The Second Year', 'Dancing Under Water', 'One Day'],
  choices: [
    { id: 'sit', title: tr('Till sunrise'), options: [{ id: 'sit', label: tr('Sat beside the Soul') }, { id: 'song', label: tr('Went to her song') }] },
    { id: 'day', title: tr('One day'), weight: '⚑', options: [{ id: 'go', label: tr('“I’ll go. One day.”') }, { id: 'stay', label: tr('“No. I stay.”') }] },
  ],
  steps: [
    // 2.1: the deep
    async g => {
      await g.scene('deep', { beat: 'deep_song', here: ['fisherman', 'mermaid'], moods: { fisherman: 'smile', mermaid: 'smile' } },
        { beds: { deep: 0.55, song: 0.8 } });
      await g.beat('deep_song');
      await g.play(song);
      await g.say('narrator', 'A year went by like a single evening');
    },
    // 2.2: the first year
    async g => {
      const f = facts(g.state);
      await piece(g, 'come_out', {
        call: () => g.say('soul', 'Come out'),
        up: async () => {
          if (f.come) await g.say('soul', 'You promised. Here I am');
          await g.say('soul', 'I have been in the East. There in a cave is the Mirror of Wisdom: whoever looks in it knows everything. I hid it for you. Come');
          await g.say('fisherman', 'Love is better than wisdom. And I am loved');
        },
      }, () => {
        on(g, 'come_out:up', () => g.sound.splash(0.4));
        return g.scene('pier', { beat: 'come_out', here: ['fisherman', 'soul'], moods: { fisherman: 'neutral', soul: 'neutral' },
          where: tr('The first year.') });
      });
    },
    // 2.2–2.3: her law; the choice “till sunrise”
    async g => {
      on(g, 'law:up', () => g.sound.splash(0.3));
      await g.scene('pier', { beat: 'law', here: ['fisherman', 'soul', 'mermaid'], moods: { fisherman: 'thinking', soul: 'sad', mermaid: 'neutral' } }, { cut: true });
      await g.beat('law');
      await g.say('mermaid', 'Do not go near her. Whoever has her in him is not ours. That is how it is with us');
      // (her song from the stone, calling him down, while the Soul asks; sitting with the Soul breaks it off)
      g.beds({ sea: 0.4, song_far: 0.75 });
      await g.say('soul', 'Then sit with me till sunrise. Only sit. For a year I have talked to myself');
      // (a choice of whom to be with: on the Soul — and on her by the stone)
      const s = await g.choose('sit', {
        soul: [{ id: 'sit', label: tr('Sit on the edge of the pier, beside her') }],
        mermaid: [{ id: 'song', label: tr('Go to her song') }],
      });
      if (s === 'sit') {
        on(g, 'sit_edge:sat', () => { g.sound.hush('song_far', 0.25); g.beds({ sea: 0.4 }); });
        await piece(g, 'sit_edge', {
          laugh: async () => g.mood('soul', 'smile'),
          back: async () => g.mood('mermaid', 'sad'),
        });
        await g.say('narrator', 'The song from the stone broke off in the middle; and all that day, down below, she sat with her back to him');
      } else {
        on(g, 'to_song:under', () => g.sound.dive());
        on(g, 'to_song:out', () => g.sound.puff());
        await piece(g, 'to_song', { under: async () => g.mood('soul', 'sad') });
      }
      g.apply('sit');
    },
    // 2.4: the second year
    async g => {
      const f = facts(g.state);
      await piece(g, 'ring', {
        shown: async () => {
          await g.say('soul', 'I have been in the South. The Ring of Riches. Come');
          await g.say('fisherman', 'Love is better than riches');
        },
      }, () => g.scene('pier', { beat: 'ring', here: ['fisherman', 'soul'], moods: { fisherman: 'neutral', soul: 'neutral' },
        keys: { hard: f.hard }, where: tr('The second year, the same day.') }));
      await g.beat('laugh_go');
    },
    // 2.5: dancing under water
    async g => {
      const f = facts(g.state);
      await piece(g, 'dance_deep', {
        dance: async () => { if (f.danced) await g.say('fisherman', 'Like this — the way they do on the pier'); },
        laugh: async () => g.mood('mermaid', 'laugh'),
        feet: async () => g.mood('mermaid', 'sad'),
      }, async () => {
        await g.scene('deep', { beat: 'dance_deep', here: ['fisherman', 'mermaid'], moods: { fisherman: 'smile', mermaid: 'smile' } }, { beds: { deep: 0.6 } });
        await g.say('fisherman', 'Show me how you dance here');
        await g.say('mermaid', 'We do not dance. Dancing is done with feet');
      });
    },
    // 2.6–2.7: the third year; ⚑ the first hinge “One Day”
    async g => {
      const f = facts(g.state);
      // (the Soul speaks in the pose its piece ends in — the two of them —; then the stone, and back to him)
      await g.scene('pier', { beat: 'third_year', here: ['fisherman', 'soul'], moods: { fisherman: 'neutral', soul: f.hard ? 'smile' : 'sad' },
        keys: { song: f.sounds }, where: tr('The third year.') });
      await g.beat('third_year');
      await g.say('soul', 'On the square beyond the bridge, where you sold your fish, a girl dances at night. You were never there at night. Her feet are like little white doves. Come. One day');
      if (f.hard) await g.say('soul', 'You want to see feet, don’t you? Hers has none');
      else await g.say('soul', 'I am tired of walking alone. You will look — and come back');
      if (f.danced) await g.say('soul', 'You stopped that time on the pier. I remember — I danced with you');
      else await g.say('soul', 'You looked back that time on the pier. I remember');
      await g.say('soul', 'To walk on the earth, let me in. On the shore I will come out again');
      // (Song 2–3: from under the water by the stone her song, calling him down; 0–1: the stone quiet)
      if (f.sounds) on(g, 'third_stone:stone', () => g.beds({ sea: 0.4, song_under: 0.8 }));
      await g.beat('third_stone');
      const d = await g.choose('day', { fisherman: [
        { id: 'go', label: tr('“I’ll go. One day.”') },
        { id: 'stay', label: tr('“No. I stay.”') },
      ] });
      if (d === 'go') {
        await g.say('fisherman', 'I’ll go. One day');
        on(g, 'go_day:her', () => { g.sound.hush('song_under', 0.2); g.beds({ sea: 0.4 }); g.sound.dive(); });
        await piece(g, 'go_day', {
          up: async () => g.mood('fisherman', 'laugh'),
          her: async () => g.mood('mermaid', 'sad'),
          turn: async () => {
            g.mood('fisherman', 'neutral');
            await g.say('fisherman', 'I will come back');
          },
        });
      } else {
        await g.say('fisherman', 'No. I stay');
        await piece(g, 'stay_day', {
          turn: () => (f.hard ? g.say('soul', 'As you like. Your face will be useful to me') : g.say('soul', 'Then I will go alone. With your face')),
        });
      }
      g.apply('day');
    },
  ],
};
