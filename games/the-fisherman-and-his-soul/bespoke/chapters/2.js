// II. Three Years (scenario §5, 2.1–2.8). The deep and her song; the first year — the Mirror of Wisdom, her law said
// aloud; the choice “till sunrise”; the second year — the Ring of Riches; dancing under water; the third year — the
// dancer on the square; ⚑ the first hinge “One Day”.
// Places: the deep, the pier.
// Reads: marks.come, danced; scales.soul, song. Leaves: choices.sit, day; scales.soul, song. М4 touched twice — she
// sings holding his hand.
import { DEEP, facts } from '../story.js';
import { song } from '../minigames/all.js';

// the pier on the Soul's day each year: a misty dawn, he in the shallows, the Soul on the boards with his lantern, the
// knife in the post
const YEAR = { light: 'dawn', mist: 0.6, fisherman_at: 'shallows', soul_at: 'end', soul_with: ['lantern'], lantern_at: 'none', knife: 'post' };

export default {
  number: 'II', title: tr('Three Years'),
  titles: ['The Deep', 'The First Year', 'Till Sunrise', 'The Second Year', 'Dancing Under Water', 'The Third Year', 'One Day'],
  choices: [
    { id: 'sit', title: tr('Till sunrise'), options: [{ id: 'sit', label: tr('Sat beside the Soul') }, { id: 'song', label: tr('Went to her song') }] },
    { id: 'day', title: tr('One day'), weight: '⚑', options: [{ id: 'go', label: tr('“I’ll go. One day.”') }, { id: 'stay', label: tr('“No. I stay.”') }] },
  ],
  steps: [
    // 2.1: the deep
    async g => {
      await g.scene('deep', { here: ['fisherman', 'mermaid'], moods: { fisherman: 'smile', mermaid: 'smile' }, keys: DEEP.sand });
      await g.plate(tr('Light in pillars, weed, fish. She sings; he sits on the sand.'));
      const { touches } = await g.play(song);
      if (touches >= 2) await g.plate(tr('She laughs, and sings on, holding his hand.'));
      await g.say('narrator', 'A year went by like a single evening');
    },
    // 2.2: the first year
    async g => {
      const f = facts(g.state);
      await g.scene('pier', { here: ['fisherman', 'soul'], moods: { fisherman: 'neutral', soul: 'neutral' }, keys: { ...YEAR, mist: 1 },
        where: tr('The first year.') });
      await g.plate(tr('From the shore, his own voice:'));
      await g.say('soul', 'Come out');
      await g.plate(tr('The Fisherman comes up onto the shallows, up to his waist. On the pier stands the Soul with his lantern.'));
      if (f.come) await g.say('soul', 'You promised. Here I am');
      await g.say('soul', 'I have been in the East. There in a cave is the Mirror of Wisdom: whoever looks in it knows everything. I hid it for you. Come');
      await g.say('fisherman', 'Love is better than wisdom. And I am loved');
      g.set('mermaid_at', 'stone');
      g.here('mermaid', true);
      g.mood('mermaid', 'neutral');
      await g.plate(tr('By the stone the Mermaid comes up — and swims no nearer.'));
      await g.say('mermaid', 'Do not go near her. Whoever has her in him is not ours. That is how it is with us');
    },
    // 2.3: the choice “till sunrise”
    async g => {
      await g.scene('pier', { here: ['fisherman', 'soul', 'mermaid'], moods: { fisherman: 'thinking', soul: 'sad', mermaid: 'neutral' },
        keys: { ...YEAR, mist: 1, mermaid_at: 'stone' } }, { cut: true });
      await g.say('soul', 'Then sit with me till sunrise. Only sit. For a year I have talked to myself');
      const s = await g.choose('sit', { fisherman: [
        { id: 'sit', label: tr('Sit on the edge of the pier, beside her') },
        { id: 'song', label: tr('Go to her song') },
      ] });
      if (s === 'sit') {
        g.set('fisherman_at', 'edge');
        g.set('soul_at', 'edge');
        await g.plate(tr('He sits on the edge of the pier beside the Soul, not touching. The Soul tells him of the road; once she laughs — warmly, with his laugh.'));
        g.mood('soul', 'smile');
        await g.plate(tr('The song from the stone breaks off in the middle. Down below, all that day, the Mermaid sits with her back to him.'));
        g.mood('mermaid', 'sad');
      } else {
        g.here('fisherman', false);
        await g.plate(tr('He goes down into the water, to her song.'));
        g.mood('soul', 'sad');
        g.set('lantern_lit', 0, 1.5);
        await g.plate(tr('The Soul, alone on the pier, looks at the water and puts out the lantern.'));
      }
      g.apply('sit');
    },
    // 2.4: the second year
    async g => {
      const f = facts(g.state);
      await g.scene('pier', { here: ['fisherman', 'soul'], moods: { fisherman: 'neutral', soul: 'neutral' },
        keys: { ...YEAR, soul_with: ['lantern', 'ring'] }, where: tr('The second year, the same day.') });
      await g.plate(tr('A ring on the Soul’s finger.'));
      await g.say('soul', 'I have been in the South. The Ring of Riches. Come');
      await g.say('fisherman', 'Love is better than riches');
      g.mood('soul', 'laugh');
      if (f.hard) await g.plate(tr('The Soul laughs — short and angry — and goes without a goodbye.'));
      else await g.plate(tr('The Soul laughs — tiredly — and goes without a goodbye.'));
      g.set('soul_at', 'walk');
      g.here('soul', false);
    },
    // 2.5: dancing under water
    async g => {
      const f = facts(g.state);
      await g.scene('deep', { here: ['fisherman', 'mermaid'], moods: { fisherman: 'smile', mermaid: 'smile' }, keys: DEEP.standing });
      await g.say('fisherman', 'Show me how you dance here');
      await g.say('mermaid', 'We do not dance. Dancing is done with feet');
      if (f.danced) {
        await g.plate(tr('He gets up and dances clumsily on the sand.'));
        await g.say('fisherman', 'Like this — the way they do on the pier');
      } else await g.plate(tr('He gets up and, without a word, dances clumsily on the sand.'));
      g.mood('mermaid', 'laugh');
      await g.plate(tr('She laughs and beats her tail.'));
      g.mood('mermaid', 'sad');
      g.set('mermaid_look', 'fisherman#feet');
      await g.plate(tr('Then for a long time she looks at his feet — and hides her face in her hair.'));
    },
    // 2.6: the third year
    async g => {
      const f = facts(g.state);
      await g.scene('pier', { here: ['fisherman', 'soul'], moods: { fisherman: 'neutral', soul: f.hard ? 'smile' : 'sad' }, keys: YEAR,
        where: tr('The third year.') });
      await g.say('soul', 'On the square beyond the bridge, where you sold your fish, a girl dances at night. You were never there at night. Her feet are like little white doves. Come. One day');
      if (f.hard) await g.say('soul', 'You want to see feet, don’t you? Hers has none');
      else await g.say('soul', 'I am tired of walking alone. You will look — and come back');
      if (f.danced) await g.say('soul', 'You stopped that time on the pier. I remember — I danced with you');
      else await g.say('soul', 'You looked back that time on the pier. I remember');
      await g.say('soul', 'To walk on the earth, let me in. On the shore I will come out again');
      if (f.sounds) {
        g.set('under_light', 1, 2);
        await g.plate(tr('From under the water by the stone — her song. It calls him down.'));
      }
      else await g.plate(tr('Quiet. The stone is empty.'));
    },
    // 2.7: ⚑ the first hinge “One Day”
    async g => {
      const f = facts(g.state);
      await g.scene('pier', { here: ['fisherman', 'soul', 'mermaid'], moods: { fisherman: 'thinking', soul: 'neutral', mermaid: 'neutral' },
        keys: { ...YEAR, mermaid_at: 'stone' } }, { cut: true });
      const d = await g.choose('day', { fisherman: [
        { id: 'go', label: tr('“I’ll go. One day.”') },
        { id: 'stay', label: tr('“No. I stay.”') },
      ] });
      if (d === 'go') {
        await g.say('fisherman', 'I’ll go. One day');
        g.mood('fisherman', 'laugh');
        g.set('fisherman_at', 'end');
        g.set('soul_with', []);
        g.set('fisherman_with', ['lantern']);
        await g.plate(tr('He laughs — short, the laugh of the pier at the feast — and in three strides over the shallows he is on the boards, wet and barefoot. The Soul gives him the lantern and steps into his shadow: there is one shadow at his feet.'));
        g.here('soul', false);
        g.mood('mermaid', 'sad');
        await g.plate(f.sounds ? tr('Close: by the stone the Mermaid sees it, and goes under. The song breaks off.') : tr('Close: by the stone the Mermaid sees it, and goes under.'));
        g.here('mermaid', false);
        g.mood('fisherman', 'neutral');
        await g.plate(tr('He turns to the water.'));
        await g.say('fisherman', 'I will come back');
        await g.plate(tr('He walks to the bridge almost at a run, not looking back.'));
      } else {
        await g.say('fisherman', 'No. I stay');
        await g.plate(tr('He turns to the water.'));
        if (f.hard) await g.say('soul', 'As you like. Your face will be useful to me');
        else await g.say('soul', 'Then I will go alone. With your face');
        g.set('soul_at', 'walk');
        g.here('soul', false);
        g.set('far_lantern', 1, 14);
        await g.plate(tr('The Soul goes over the hill with the lantern; for a long while the lantern is seen on the road to the bridge.'));
      }
      g.apply('day');
    },
  ],
};
