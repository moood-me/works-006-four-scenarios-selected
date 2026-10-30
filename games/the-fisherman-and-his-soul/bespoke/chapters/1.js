// I. The Shadow at his Feet (scenario §5, 1.1–1.12). The stone: “send away your soul”; the Priest drives him out; the
// feast on the pier — the sign “Stop” (danced or passed by); the Witch at the well, the dance at full moon, the man in
// black velvet, the sign he makes without thinking; the choice with the Witch; moonrise: the shadow rises — the Soul
// asks for a heart; the choice of the heart; the knife; the sea takes him.
// Pieces: the stone's ask_wife, laugh_tail, dive; the Priest's house's priest_sign, bench_falls, begone; the pier's
// feast, danced / passed, moonrise, shadow_rises, heart_cut / heart_come, knife_ready, cut, into_sea; the well's
// well_evening, long_look, dance, velvet, sign_velvet, broken, demand / dance_dawn.
// Reads: marks.net. Leaves: choices.stop, witch, heart; marks.danced, witch, come; scales.soul, song; the traces of М2
// (he stumbled in the dance: `stumbled`) and М3 (marks.rough: the Soul's left hand like smoke — TRACES).
import { on, piece } from '../story.js';
import { dance, knife } from '../minigames/all.js';

export default {
  number: 'I', title: tr('The Shadow at his Feet'),
  titles: ['The Stone', 'The Priest', 'The Feast', 'The Well', 'The Dance', 'The Witch', 'Moonrise', 'The Heart', 'The Knife'],
  choices: [
    { id: 'stop', title: tr('The girl dancing on the pier'), options: [{ id: 'danced', label: tr('Stopped, and danced'), came: tr('Your shadow on the boards danced with you.') }, { id: 'passed', label: tr('Passed by, looked back once'), came: tr('You looked back once.') }] },
    { id: 'witch', title: tr('The Witch'), options: [{ id: 'demand', label: tr('“You promised.”'), came: tr('She threw the knife at your feet and turned away to the well.') }, { id: 'dance', label: tr('“Again. Without him. Till dawn.”'), came: tr('Her hand stayed on yours on the knife. The Mermaid smelled the wood on you.') }] },
    { id: 'heart', title: tr('The heart'), options: [{ id: 'ask', label: tr('“And what would I love her with?”'), came: tr('“Then I shall be cruel. You chose it yourself.”') }, { id: 'cut', label: tr('Not look at it. Cut.'), came: tr('The Soul fell silent in the middle of a word.') }, { id: 'come', label: tr('“Come here once a year”'), came: tr('The Mermaid heard that you would go out to another.') }] },
  ],
  steps: [
    // 1.1: the stone
    async g => {
      await piece(g, 'ask_wife', {
        there: async () => {
          await g.say('fisherman', 'Be my wife');
          await g.say('mermaid', 'You have a human soul. Send it away — and I will love you');
          await g.say('fisherman', 'What use is a soul to me? I have never seen it. Never touched it. I do not know it');
        },
      }, () => g.scene('stone', { beat: 'ask_wife', here: ['fisherman', 'mermaid'], moods: { fisherman: 'thinking', mermaid: 'smile' } }));
      g.mood('mermaid', 'laugh');
      on(g, 'laugh_tail:splash', () => g.sound.splash(1));
      await g.beat('laugh_tail');
      await g.say('mermaid', 'Send it away — and come');
      await g.say('fisherman', 'I will come tomorrow');
      await g.say('mermaid', 'What is “tomorrow”?');
      on(g, 'dive:under', () => g.sound.dive());
      await g.beat('dive');
    },
    // 1.2: the Priest
    async g => {
      await piece(g, 'priest_sign', {}, async () => {
        await g.scene('priest', { beat: 'priest_sign', here: ['priest', 'fisherman'], moods: { priest: 'neutral', fisherman: 'neutral' } });
        await g.say('fisherman', 'Father, I love a girl of the sea. My soul is in the way. How do I send it away?');
      });
      await g.say('priest', 'The soul is worth more than all the gold in the world. The sea-folk are accursed. Keep away from them');
      g.mood('priest', 'angry');
      g.mood('fisherman', 'angry');
      on(g, 'bench_falls:fall', () => g.sound.bench());
      await g.beat('bench_falls');
      await g.say('fisherman', 'If it is worth so much — I do not need it');
      await piece(g, 'begone', {
        point: () => g.say('priest', 'Begone!'),
        sign: async () => g.mood('fisherman', 'sad'),
      });
    },
    // 1.3: the feast on the pier; the sign “Stop”
    async g => {
      await piece(g, 'feast', {
        whisper: () => g.say('women', 'By the well in the fir wood lives one who knows', 'woman_a'),
      }, () => g.scene('pier', { beat: 'feast', here: ['fisherman', 'girl', 'woman_a', 'woman_b'],
        moods: { fisherman: 'neutral', girl: 'laugh', woman_a: 'smile', woman_b: 'smile' } }, { beds: { sea: 0.3, claps: 0.55 } }));
      const stop = await g.interrupt('stop', { fisherman: [{ id: 'danced', label: tr('Stop') }] }, { id: 'passed' }, 5000,
        tr('A girl dancing barefoot on the boards.'));
      if (stop === 'danced') await piece(g, 'danced', { pull: () => g.say('girl', 'Dance, fisherman!') });
      else await g.beat('passed');
      g.apply('stop');
    },
    // 1.4: the well
    async g => {
      await piece(g, 'well_evening', {
        there: async () => {
          await g.say('witch', 'What do you want? Wind? Fish? No. I know. To send your soul away');
          await g.say('fisherman', 'Tell me how');
          await g.say('witch', 'The price is a dance. Tonight, at full moon, here');
          await g.say('fisherman', 'Only a dance?');
          g.mood('witch', 'laugh');
          await g.say('witch', 'Only');
          g.mood('witch', 'smile');
        },
      }, () => g.scene('well', { beat: 'well_evening', here: ['fisherman', 'witch'], moods: { fisherman: 'neutral', witch: 'smile' } },
        { beds: { wind: 0.2, crickets: 0.35 } }));
      await g.beat('long_look');
    },
    // 1.5: the dance; the man in black velvet
    async g => {
      await g.scene('well', { beat: 'dance', here: ['fisherman', 'witch'], moods: { fisherman: 'neutral', witch: 'laugh' } },
        { beds: { wind: 0.15, crickets: 0.2, tambourine: 0.6 } });
      await g.beat('dance');
      const { stumbled } = await g.play(dance);
      g.set('stumbled', stumbled);
      await piece(g, 'velvet', { bow: () => g.say('witch', 'Bow to him') });
      g.mood('fisherman', 'thinking');
      await piece(g, 'sign_velvet', { cry: async () => g.mood('witch', 'afraid') });
    },
    // 1.6: the choice with the Witch
    async g => {
      await g.scene('well', { beat: 'broken', here: ['fisherman', 'witch'], moods: { fisherman: 'neutral', witch: 'angry' } },
        { cut: true, beds: { wind: 0.2, crickets: 0.3 } });
      await g.beat('broken');
      await g.say('witch', 'You broke the dance. The bargain is not kept');
      const w = await g.choose('witch', { fisherman: [
        { id: 'demand', label: tr('“You promised.”') },
        { id: 'dance', label: tr('“Again. Without him. Till dawn.”') },
      ] });
      if (w === 'demand') {
        await g.say('fisherman', 'You promised');
        await piece(g, 'demand', {
          promise: () => g.say('witch', 'I promised'),
          knife: () => g.say('witch', 'Take it. Cut. You will see for yourself what comes of a man without one'),
          away: async () => g.mood('witch', 'sad'),
        });
      } else {
        await g.say('fisherman', 'Again. Without him. Till dawn');
        g.mood('witch', 'surprised');
        await piece(g, 'dance_dawn', { laugh: async () => g.mood('witch', 'smile') });
      }
      await g.say('narrator', 'And the rule was this: at moonrise stand by the water with your back to the moon. The shadow at your feet is the body of your soul. Cut it from your feet with this knife, the knife with the handle of green snakeskin');
      g.apply('witch');
    },
    // 1.7: moonrise
    async g => {
      const { witch } = g.state.choices;
      await piece(g, 'moonrise', {
        her: async () => {
          if (witch !== 'dance') return;
          g.mood('mermaid', 'sad');
          await g.say('mermaid', 'You smell of the wood');
        },
      }, () => g.scene('pier', { beat: 'moonrise', here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: 'neutral' },
        keys: { smell: witch === 'dance' } }, { beds: { sea: 0.45, crickets: 0.15 } }));
    },
    // 1.8–1.9: the shadow rises; the choice of the heart
    async g => {
      await piece(g, 'shadow_rises', {
        face: async () => {
          g.mood('soul', 'afraid');
          await g.say('soul', 'I have been with you all your life. Do not drive me away. And if you do — do not send me without a heart. The world is cruel. Give me your heart; with it I shall not be lost');
        },
      }, () => g.scene('pier', { beat: 'shadow_rises', here: ['fisherman', 'soul', 'mermaid'], moods: { fisherman: 'thinking', soul: 'afraid', mermaid: 'neutral' } },
        { cut: true, beds: { sea: 0.45, crickets: 0.15 } }));
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
        await piece(g, 'heart_cut', { turn: () => g.say('soul', 'Once a year I will come and…') });
      } else {
        await g.say('fisherman', 'My heart is hers. But come here once a year. I will come out to you');
        g.mood('soul', 'neutral');
        await g.say('soul', 'I will come. You promised');
        on(g, 'heart_come:under', () => g.sound.splash(0.35));
        await g.beat('heart_come');
      }
      g.apply('heart');
    },
    // 1.10–1.11: the knife; the sea takes him
    async g => {
      await g.scene('pier', { beat: 'knife_ready', here: ['fisherman', 'soul', 'mermaid'], moods: { fisherman: 'neutral', soul: 'neutral', mermaid: 'neutral' } },
        { cut: true, beds: { sea: 0.45, crickets: 0.15 } });
      await g.beat('knife_ready');
      const { rough } = await g.play(knife);
      if (rough) {
        g.mark('rough', true, null);
        g.set('soul_smoke', 1);
      }
      on(g, 'cut:post', () => g.sound.thud());
      await g.beat('cut');
      on(g, 'into_sea:under', () => g.sound.dive());
      await piece(g, 'into_sea', {
        soul: async () => {
          g.mood('soul', 'sad');
          await g.say('narrator', 'And the sea took him');
        },
      });
    },
  ],
};
