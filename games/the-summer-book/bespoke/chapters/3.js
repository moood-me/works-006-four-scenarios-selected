// III. “The Storm” (scenario §5, 3.1–3.5). The end of July, close, a grey band on the horizon: the forest spins and
// Grandmother falls in front of the girl — ⚑ the second hinge: whom to tell about her head; the evening as it decides
// (the doctor; the candle and the palm; the new house at night); the storm Sophia prayed for — ⚑ what to give her
// (colours); the morning after: “I want a tent.”
// Scenes: the forest (swim, fall and the hinge's branches; night_path, into_trees), the shore (step_beside, home_late,
// rail, rail_after, circles), the house (doctor, doctor_after; palm_night, not_today; thunder and its branches,
// storm_cot), the new house (window … seal).
// Reads: choices.nets, choices.mama, choices.smoke, scales. Leaves: choices.head, choices.storm, marks.knows,
// marks.nottell, marks.say, marks.someday, marks.storm, scales.
import { SCENES, facts, hour, piece, on } from '../story.js';
import { moss, cup, still, stones, rail, blanket, sleeve } from '../minigames/all.js';

const JULY = { ...hour('day'), band: 1 }, HOME = ['grandma', 'sophia', 'papa'];

export default {
  number: 'III', title: tr('The Storm'),
  titles: ['The Forest', 'Whom to Tell', 'The Evening', 'The Storm', 'The Morning After'],
  choices: [
    { id: 'head', title: tr('Whom to tell about her head'), weight: '⚑', options: [{ id: 'papa', label: tr('“Run for Papa”') }, { id: 'sophia', label: tr('Sophia, and only her') }, { id: 'moss', label: tr('“I’m looking at the moss”') }] },
    { id: 'storm', title: tr('“It was me who asked”'), options: [{ id: 'porch', label: tr('Out on the porch') }, { id: 'blanket', label: tr('Under the blanket, a song') }, { id: 'notyou', label: tr('“It’s nothing to do with you”') }] },
  ],
  steps: [
    // 3.1: the forest spins
    async g => {
      g.beds({ wind: 0.2, trees: 0.5 });
      await piece(g, 'swim', { animals: async () => g.title(tr('The end of July')), up: async () => g.mood('grandma', 'tired') },
        () => g.scene(SCENES.forest, { beat: 'swim', here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'smile' }, keys: JULY }));
      // (the horizon not kept: she sits longer, Sophia comes closer — the forest's `slips` in the fall)
      g.mark('dizzy', (await g.play(moss)).slips > 0, null);
    },
    // 3.2: ⚑ whom to tell
    async g => {
      const f = facts(g.state);
      g.beds({ wind: 0.2, trees: 0.5 });
      await piece(g, 'fall', {
        near: () => (f.sophia >= 3 ? undefined : g.say('sophia', 'What’s wrong?!')),
      }, () => g.scene(SCENES.forest, { beat: 'fall', here: ['grandma', 'sophia'], moods: { grandma: 'tired', sophia: 'afraid' }, keys: JULY }, { cut: true }));
      const head = await g.choose('head', { 'stump#seat': [
        { id: 'papa', label: tr('“Run for Papa”') },
        { id: 'sophia', label: tr('“It’s my head. I’m old. Some day I’ll sit down like this — and not get up. Then run for Papa. Not today”') },
        { id: 'moss', label: tr('“I’m looking at the moss. Sit down — you’ll see what it’s like”') },
      ] });
      if (head === 'papa') {
        await g.say('grandma', 'Run for Papa');
        await g.beat('run_papa');
        g.here('papa', true);
        await piece(g, 'papa_comes', {
          lift: () => g.say('grandma', 'Don’t lead me like a cow'),
          held: async () => {
            if (f.nets === 'say') {
              await g.say('papa', 'You told me');
              g.mark('say', 'kept', tr('“I’ll tell you” — kept.'));
            } else if (f.nets === 'nothing') await g.say('papa', 'Nothing to tell, then');
          },
        });
        await piece(g, 'lead_home', {
          play: () => g.say('papa', 'Grandmother is tired. Go and play'),
          back: async () => g.mood('sophia', 'sad'),
        });
        if (f.nets === 'net') {
          g.beds({ sea: 0.3 });
          await g.scene(SCENES.shore, { beat: 'step_beside', here: ['grandma', 'papa'], moods: { grandma: 'tired', papa: 'sad' }, keys: hour('day') });
          await g.beat('step_beside');
        }
      } else if (head === 'sophia') {
        await g.say('grandma', 'It’s my head. I’m old. Some day I’ll sit down like this — and not get up. Then run for Papa. Not today');
        await piece(g, 'count', {
          back: async () => {
            if (f.mama !== 'sky') return;
            g.mood('sophia', 'angry');
            await g.say('sophia', 'You said not soon!');
            await g.say('grandma', 'I did. At night');
            await g.say('sophia', 'Liar!');
          },
          ask: async () => {
            g.mood('sophia', 'thinking');
            await g.say('sophia', 'And tell Papa?');
            if (f.nets === 'say') await g.wait(2000); // (the promise to him: a pause)
            await g.say('grandma', 'No need. He’s got enough…');
          },
          sit: () => g.say('sophia', 'One, two, three, four, five…'),
        });
      } else {
        await g.say('grandma', 'I’m looking at the moss. Sit down — you’ll see what it’s like');
        await piece(g, 'beetle', {
          beetle: async () => {
            g.mood('sophia', 'laugh');
            await g.say('sophia', 'There’s a beetle! A red one!');
            g.mood('grandma', 'laugh');
          },
          house: async () => {
            await g.say('grandma', 'Tonight — that house');
            await g.say('sophia', 'Really?!');
          },
        });
      }
      g.apply('head');
    },
    // 3.3: the evening, as the hinge decides
    async g => {
      const f = facts(g.state);
      if (f.head === 'papa') {
        g.beds({ sea_in: 0.25 });
        await piece(g, 'doctor', {
          said: () => g.say('papa', 'I’ve written to the doctor. The boat’s on Thursday. In autumn — to us, in town. To winter near us'),
        }, () => g.scene(SCENES.house, { beat: 'doctor', here: HOME, moods: { papa: 'thinking', grandma: 'neutral' }, keys: hour('dusk') }));
        await g.play(cup);
        await piece(g, 'doctor_after', {
          chair: () => g.say('grandma', 'All right. Only don’t put a chair for me by the gate'),
          cant: async () => {
            g.mood('papa', 'sad');
            await g.say('papa', 'I can’t lose you too…');
          },
        });
      } else if (f.head === 'sophia') {
        g.beds({ sea_in: 0.2 });
        await g.scene(SCENES.house, { beat: 'palm_night', here: HOME, moods: { grandma: 'neutral', sophia: 'thinking' }, keys: hour('night') });
        await g.beat('palm_night');
        // (she moved: «You’re not asleep?» in the mini-game — Sophia goes back without the whisper)
        const { moved } = await g.play(still);
        await piece(g, 'not_today', { whisper: () => (moved ? undefined : g.say('sophia', 'Not today')) });
      } else {
        g.beds({ wind: 0.15, trees: 0.4 });
        await g.scene(SCENES.forest, { beat: 'night_path', here: ['grandma', 'sophia'], moods: { grandma: 'smile', sophia: 'smile' }, keys: { ...hour('night'), boat_out: true } });
        await g.beat('night_path');
        await g.play(stones);
        await g.beat('into_trees');
        g.beds({ sea: 0.2 });
        await g.scene(SCENES.newHouse, { beat: 'window', here: ['grandma', 'sophia'], moods: { grandma: 'smile', sophia: 'surprised' }, keys: hour('night') }, { cut: true });
        await g.beat('window');
        g.beds({ sea_in: 0.15 });
        await g.beat('inside');
        on(g, 'smoke:lit', () => g.sound.strike());
        await piece(g, 'smoke', {
          packet: () => (f.smoke === 'quit' ? g.say('grandma', 'For an occasion like this') : undefined),
        });
        await piece(g, 'drawers', {
          turn: async () => {
            g.mood('sophia', 'thinking');
            await g.say('sophia', 'Nobody has died here');
          },
        });
        await piece(g, 'look', { up: () => g.say('grandma', 'Come on') });
        await g.beat('seal');
        g.beds({ sea: 0.3 });
        await piece(g, 'home_late', {
          crazy: async () => {
            await g.say('sophia', 'You’re crazy!');
            await g.say('grandma', 'Yes');
          },
        }, () => g.scene(SCENES.shore, { beat: 'home_late', here: ['grandma', 'sophia'], moods: { grandma: 'tired', sophia: 'laugh' }, keys: { ...hour('night'), boat_out: true } }));
        g.scale('strength', -1);
        g.mark('someday', 'kept', tr('“At night. Some day” — kept.'));
      }
    },
    // 3.4: the storm; ⚑ what to give her
    async g => {
      const f = facts(g.state);
      g.beds({ sea_in: 0.3, storm: 0.5 });
      on(g, 'thunder:up', () => g.sound.thunder(1));
      await piece(g, 'thunder', {
        asked: async () => {
          await g.say('sophia', 'It was me who asked. Then, in the calm');
          if (f.mama === 'sky') await g.say('sophia', 'Does Mama see what I’ve done?');
        },
      }, () => g.scene(SCENES.house, { beat: 'thunder', here: HOME, moods: { grandma: 'neutral', sophia: 'afraid' }, keys: { ...hour('night'), storm: 1 } }));
      g.each('flash:strike', () => g.sound.thunder(0.7));
      const storm = await g.choose('storm', { 'sophia#chest': [
        { id: 'porch', label: tr('“Let’s go out on the porch. Let’s look at it”') },
        { id: 'blanket', label: tr('“Under the blanket. I’ll sing”') },
        { id: 'notyou', label: tr('“It’s nothing to do with you. Nobody prayed anything down. Not the storm, nor anything else”') },
      ] });
      if (storm === 'porch') {
        await g.say('grandma', 'Let’s go out on the porch. Let’s look at it');
        on(g, 'porch_go:out', () => g.sound.creak());
        await g.beat('porch_go');
        g.beds({ sea: 0.4, storm: 1 });
        await g.scene(SCENES.shore, { beat: 'rail', here: ['grandma', 'sophia'], moods: { grandma: 'smile', sophia: 'laugh' }, keys: { ...hour('night'), storm: 1 } }, { cut: true });
        g.each('flash:strike', () => g.sound.thunder(1));
        await g.beat('rail');
        await g.play(rail);
        await piece(g, 'rail_after', {
          sky: () => g.say('grandma', 'It isn’t you. It’s the sky. Look at it'),
          creak: async () => {
            g.sound.creak();
            if (f.knew) g.here('papa', true); // (he comes out with the blanket)
          },
          ...(f.knew ? { papa: () => g.say('papa', 'Mamma. Indoors') } : {}),
        });
        if (!f.knew) {
          g.beds({ sea_in: 0.3, storm: 0.5 });
          await g.scene(SCENES.house, { beat: 'storm_cot', here: HOME, moods: { papa: 'sad' }, keys: { ...hour('night'), storm: 1 } }, { cut: true });
          await g.beat('storm_cot');
        }
      } else if (storm === 'blanket') {
        await g.say('grandma', 'Under the blanket. I’ll sing');
        await g.beat('under');
        if ((await g.play(blanket)).slips) g.sound.thunder(1.4); // (the blanket slipped: the thunder louder)
        await piece(g, 'song', {
          sing: () => g.say('grandma_song', 'Row, little boat, past the last of the stones… the gull is asleep and the herring… mm-mm… sleeps too… the light on the skerry is… mm… is burning for you', 'grandma'),
        });
      } else {
        await g.say('grandma', 'It’s nothing to do with you. Nobody prayed anything down. Not the storm, nor anything else');
        await g.beat('notyou');
        await g.play(sleeve);
        await piece(g, 'notyou_after', {
          ask: async () => {
            await g.say('sophia', 'Nothing at all to do with me?');
            await g.say('grandma', 'Nothing at all');
            g.mood('sophia', 'neutral');
          },
        });
      }
      g.apply('storm');
    },
    // 3.5: the morning after
    async g => {
      g.beds({ sea: 0.4 });
      await piece(g, 'circles', {
        tent: () => g.say('sophia', 'I want a tent. My own. To sleep on my own'),
        list: () => g.say('papa', 'I’ll order one'),
        ...(g.state.scales.sophia <= 1 ? {
          turn: async () => {
            await g.say('sophia', 'And will you come?');
            await g.say('grandma', 'We’ll see');
          },
        } : {}),
      }, () => g.scene(SCENES.shore, { beat: 'circles', here: ['sophia', 'papa', 'grandma'], moods: { sophia: 'smile', papa: 'neutral', grandma: 'neutral' }, keys: { ...hour('day'), weed: true } }));
    },
  ],
};
