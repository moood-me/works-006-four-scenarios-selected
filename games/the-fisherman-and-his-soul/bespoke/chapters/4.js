// IV. The Shore (scenario §5, 4.1–4.9). Not on the road that stayed both times (skip: the epilogue comes after
// chapter 3). He calls her — the light under the water does not rise; the knife does not cut twice; winter in the hut,
// the Witch; spring, the widow, the choice “a night at sea”; the heart that is all hers; the sea brings her, ⚑ the
// second hinge “The Wave”.
// Pieces: the pier's call_her, knife_rust, knife_back, night_alone; the shore's (the pier's `view` shore) winter,
// witch_shore, widow, widow_goes, dawn_shore / wave_lays, kneel_kiss, sea_comes, covered / wrap, fall_by; the stone's
// boat_out, keel_light (the widow's boat at sea).
// Reads: choices.day, wait, last, witch; marks.net, thief, torn; scales.soul, song. Leaves: choices.widow, wave;
// marks.widow; the traces of М6 (he threw the knife down: `thrown`), М7 (marks.half: half a net), М8 (marks.apart:
// her hand slipped), М8б (marks.torn 2: the net torn wider).
import { facts, on, piece } from '../story.js';
import { knife2, net2, hold, drag } from '../minigames/all.js';

const off = g => facts(g.state).road === 'deep';
// the hour he comes back to the pier at: in the morning mist after the town, at night after the bridge, in the evening
// after the potter's door
const back = f => (f.road === 'late' ? 'evening' : f.wait === 'back' ? 'night' : 'morning');
// the Witch's shawl and loaf by the hut (laid in `witch_shore` if he danced with her till dawn) lie there till the wave
// takes the hut: every shore opened after says so
const shawl = f => f.witch !== 'demand';

export default {
  number: 'IV', title: tr('The Shore'),
  skip: r => facts(r).road === 'deep',
  titles: ['The Call', 'The Knife', 'Winter', 'A Night at Sea', 'The Heart', 'The Wave'],
  choices: [
    { id: 'widow', title: tr('A night at sea'), options: [{ id: 'out', label: tr('Went out for the night') }, { id: 'stayed', label: tr('Stayed by the water') }] },
    { id: 'wave', title: tr('The wave'), weight: '⚑', options: [{ id: 'stay', label: tr('Stayed with her') }, { id: 'pull', label: tr('Drew her away from the water') }] },
  ],
  steps: [
    // 4.1: the call
    async g => {
      if (off(g)) return;
      const f = facts(g.state), light = back(f);
      await piece(g, 'call_her', {
        call: () => (f.net === 'word' ? g.say('fisherman', 'You swore by the sea to come whenever I call. I am calling!')
          : g.say('fisherman', 'You always came by yourself… Come')),
        light: async () => {
          if (f.net === 'word') g.sound.notes({ broken: true, how: 'under' });
          else if (f.sounds) g.sound.notes({ how: 'under' });
          await g.wait(f.net === 'word' || f.sounds ? 3200 : 1200);
          if (f.net === 'word') await g.say('narrator', 'And the oath answered: from the deep, the four notes of her song — and they broke off on the third');
          else if (f.sounds) await g.say('narrator', 'He had nothing to call her by. From the deep came the same four notes');
          else await g.say('narrator', 'He had nothing to call her by. Only the water');
        },
      }, () => g.scene('pier', { beat: 'call_her', here: ['fisherman'], moods: { fisherman: 'neutral' },
        keys: { light, mist: light === 'morning' ? 1 : 0, rust: true } }));
    },
    // 4.2: the knife
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await piece(g, 'knife_rust', { out: () => g.say('fisherman', 'I’ll cut you off again') }, async () => {
        on(g, 'knife_rust:out', () => g.sound.wrench());
        await g.scene('pier', { beat: 'knife_rust', here: ['fisherman'], moods: { fisherman: 'angry' } });
        if (f.road === 'went') {
          await g.say('fisherman', 'Come out. You promised to come out on the shore');
          await g.say('soul', 'I promised. I lied');
        }
      });
      const { thrown } = await g.play(knife2);
      g.set('thrown', thrown);
      g.mood('fisherman', 'sad');
      on(g, 'knife_back:post', () => g.sound.thud());
      await piece(g, 'knife_back', { through: () => g.say('soul', 'A knife cuts once. You cut me off yourself') });
    },
    // 4.3: winter; the Witch
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene('shore', { beat: 'winter', here: ['fisherman'], moods: { fisherman: 'tired' } }, { beds: { shore: 0.3, wind_cold: 0.35 } });
      on(g, 'winter:snow', () => g.beds({ shore: 0.25, wind_cold: 0.6 }));
      await g.beat('winter');
      await piece(g, 'witch_shore', {
        stop: () => (f.witch === 'demand' ? g.say('witch', 'I told you: you will see for yourself') : g.say('witch', 'The night is long. It is warm by the well')),
      }, () => g.scene('shore', { beat: 'witch_shore', here: ['fisherman', 'witch'], moods: { fisherman: 'tired', witch: f.witch === 'demand' ? 'laugh' : 'sad' },
        keys: { witch_way: f.witch === 'demand' ? 'demanded' : 'danced' } }, { cut: true, beds: { shore: 0.25, wind_cold: 0.6 } }));
      await g.say('soul', 'Go to her. She is warm. She has feet');
    },
    // 4.4–4.5: spring, the widow; the choice “a night at sea”
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await piece(g, 'widow', {
        say: () => g.say('widow', 'There are no fish. When the ice goes, we’ll leave. Somewhere'),
        boat: () => g.say('widow', 'The boat is rotting. Take it, if you need it'),
        net: () => g.say('soul', 'You are the best fisherman in the bay. Go out for one night — for them. What harm is there?'),
      }, () => g.scene('shore', { beat: 'widow', here: ['fisherman', 'widow', 'widow_girl', 'widow_boy'], moods: { fisherman: 'neutral', widow: 'sad' },
        keys: { thief: f.thief, shawl: shawl(f) } }));
      const w = await g.choose('widow', { fisherman: [
        { id: 'out', label: tr('Go out for the night') },
        { id: 'stayed', label: tr('Stay') },
      ] });
      if (w === 'out') {
        on(g, 'boat_out:cast', () => g.sound.splash(0.5));
        await g.scene('stone', { beat: 'boat_out', here: ['fisherman'], moods: { fisherman: 'neutral' } });
        await g.beat('boat_out');
        const { half } = await g.play(net2);
        if (half) g.mark('half', true, null);
      } else await g.beat('widow_goes');
      g.apply('widow');
    },
    // 4.6: the heart (went out: a night in the boat)
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      if (f.widow === 'out') {
        on(g, 'keel_light:light', () => g.sound.notes({ how: 'under', level: 0.1 }));
        await g.scene('stone', { beat: 'keel_light', here: ['fisherman'], moods: { fisherman: 'tired' }, keys: { fish: g.state.marks.half ? 0.5 : 1 } });
        await g.beat('keel_light');
      } else {
        await g.scene('pier', { beat: 'night_alone', here: ['fisherman'], moods: { fisherman: 'tired' } }, { beds: { sea: 0.45, crickets: 0.1 } });
        await g.beat('night_alone');
      }
      await g.say('soul', 'I tempted you with evil and with good. Let me at least into your heart — to be one, as before');
      await g.say('fisherman', 'Come in');
      await g.say('soul', 'I cannot. It is all taken up with her');
    },
    // 4.7–4.8: the sea brings her; ⚑ the second hinge “The Wave”
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      if (f.widow === 'out') {
        await piece(g, 'dawn_shore', { fish: () => g.say('widow', 'If the boat goes out — we’ll stay') },
          () => g.scene('shore', { beat: 'dawn_shore', here: ['fisherman', 'widow', 'widow_girl', 'widow_boy', 'mermaid'], moods: { fisherman: 'neutral', mermaid: 'eyes_closed' },
            keys: { fish: g.state.marks.half ? 0.5 : 1, shawl: shawl(f) } }));
      } else {
        on(g, 'wave_lays:laid', () => g.sound.wave(1));
        await g.scene('shore', { beat: 'wave_lays', here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: 'eyes_closed' },
          keys: { shawl: shawl(f) } }, { beds: { shore: 0.3, storm: 0.35 } });
        await g.beat('wave_lays');
      }
      g.mood('fisherman', 'sad');
      await g.beat('kneel_kiss');
      await g.say('fisherman', 'I loved you more than wisdom. More than riches. You called — and I did not hear');
      g.set('children', f.widow === 'out');
      on(g, 'sea_comes:dark', () => g.beds({ shore: 0.25, storm: 0.7 }));
      await piece(g, 'sea_comes', { run: async () => { if (f.widow === 'out') await g.say('fisherman', 'Home! Run!'); } });
      await g.say('soul', 'Run! The sea is coming!');
      await g.say('fisherman', 'The sea cast you out…');
      const w = await g.choose('wave', { fisherman: [
        { id: 'stay', label: tr('Stay with her') },
        { id: 'pull', label: tr('Draw her away from the water') },
      ] });
      if (w === 'stay') {
        const { slips } = await g.play(hold);
        if (slips) g.mark('apart', true, null);
      } else {
        await g.beat('wrap');
        const { torn } = await g.play(drag);
        if (torn) g.mark('torn', 2, null);
        on(g, 'fall_by:hut', () => g.sound.wave(1.2));
        await g.beat('fall_by');
      }
      await g.say('narrator', 'His heart broke — and the Soul went into his heart');
      if (f.hard) await g.say('narrator', 'It went in without a word, and he shuddered with cold');
      else await g.say('soul', 'I am home');
      if (w === 'stay') {
        on(g, 'covered:end', () => g.sound.wave(1.3));
        await g.beat('covered');
      }
      g.apply('wave');
    },
  ],
};
