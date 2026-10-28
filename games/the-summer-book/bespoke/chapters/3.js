// III. “The Storm” (scenario §5, 3.1–3.5). The end of July, close, a grey band on the horizon: the forest spins and
// Grandmother falls in front of the girl — ⚑ the second hinge: whom to tell about her head; the evening as it decides
// (the doctor; the candle and the palm; the new house at night); the storm Sophia prayed for — ⚑ what to give her
// (colours); the morning after: “I want a tent.”
// Stand-ins: the forest and the path at night — the cape; the new house — the house.
// Reads: choices.nets, marks.mama, marks.smoke, scales.sophia. Leaves: choices.head, choices.storm, marks.knows,
// marks.nottell, marks.say, marks.someday, marks.storm, scales.
import { SCENES, facts } from '../story.js';
import { moss, cup, still, stones, rail, blanket, sleeve } from '../minigames/all.js';

const FOREST = tr('In truth: the magic forest at the end of July, close and still; a grey band on the horizon.');

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
      await g.scene(SCENES.cape, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'smile' }, where: FOREST });
      g.title(tr('The end of July'));
      await g.plate(tr('Sophia is setting out her animals. Grandmother gets up from the stump — and the ground swims.'));
      g.mood('grandma', 'tired');
      await g.play(moss);
      await g.plate(tr('Grandmother sits on the moss, her head on her knees.'));
      if (g.state.scales.sophia >= 3) {
        g.mood('sophia', 'afraid');
        await g.plate(tr('Sophia does not shout: she squats down and looks into her face without a word. Sophia’s face, close; her lips white.'));
      } else {
        g.mood('sophia', 'afraid');
        await g.plate(tr('Sophia runs up.'));
        await g.say('sophia', 'What’s wrong?!');
        await g.plate(tr('Sophia’s face, close; her lips white.'));
      }
    },
    // 3.2: ⚑ whom to tell
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.cape, { here: ['grandma', 'sophia'], moods: { grandma: 'tired', sophia: 'afraid' }, where: FOREST }, { cut: true });
      const head = await g.choose('head', { 'sophia#chest': [
        { id: 'papa', label: tr('“Run for Papa”') },
        { id: 'sophia', label: tr('“It’s my head. I’m old. Some day I’ll sit down like this — and not get up. Then run for Papa. Not today”') },
        { id: 'moss', label: tr('“I’m looking at the moss. Sit down — you’ll see what it’s like”') },
      ] });
      if (head === 'papa') {
        await g.say('grandma', 'Run for Papa');
        g.here('sophia', false);
        await g.plate(tr('Sophia runs. Papa comes quickly, without a word, and lifts his mother up by the arm.'));
        await g.say('grandma', 'Don’t lead me like a cow');
        await g.plate(tr('He does not let go; she stops pulling away.'));
        if (f.nets === 'say') {
          await g.say('papa', 'You told me');
          await g.plate(tr('And that is all.'));
          g.mark('say', 'kept', tr('“I’ll tell you” — kept.'));
        } else if (f.nets === 'nothing') {
          await g.say('papa', 'Nothing to tell, then');
          await g.plate(tr('She says nothing.'));
        } else await g.plate(tr('Not a word; at home he sits down beside her on the porch step, as he did at the nets, and sits there till she gets up by herself.'));
        g.here('sophia', true);
        await g.say('papa', 'Grandmother is tired. Go and play');
        g.mood('sophia', 'sad');
        await g.plate(tr('Sophia looks back and does not go to play. Grandmother says nothing: now he decides.'));
      } else if (head === 'sophia') {
        await g.say('grandma', 'It’s my head. I’m old. Some day I’ll sit down like this — and not get up. Then run for Papa. Not today');
        if (f.mama === 'sky') {
          await g.plate(tr('Sophia steps back first.'));
          g.mood('sophia', 'angry');
          await g.say('sophia', 'You said not soon!');
          await g.say('grandma', 'I did. At night');
          await g.say('sophia', 'Liar!');
          await g.plate(tr('Grandmother does not argue. Sophia stands with her fists clenched — and asks on all the same.'));
        }
        g.mood('sophia', 'thinking');
        await g.say('sophia', 'And tell Papa?');
        if (f.nets === 'say') await g.wait(2000); // (the promise to him: a pause)
        await g.say('grandma', 'No need. He’s got enough…');
        await g.plate(tr('Sophia sits down beside her and counts aloud to a hundred, till Grandmother gets up.'));
        await g.say('sophia', 'One, two, three, four, five…');
      } else {
        await g.say('grandma', 'I’m looking at the moss. Sit down — you’ll see what it’s like');
        await g.plate(tr('Sophia sits down, her nose in the moss.'));
        g.mood('sophia', 'laugh');
        await g.say('sophia', 'There’s a beetle! A red one!');
        g.mood('grandma', 'laugh');
        await g.plate(tr('They laugh. Grandmother’s hand on the moss is shaking; Sophia does not see.'));
        await g.say('grandma', 'Tonight — that house');
        await g.say('sophia', 'Really?!');
      }
      g.apply('head');
    },
    // 3.3: the evening, as the hinge decides
    async g => {
      const f = facts(g.state);
      if (f.head === 'papa') {
        await g.scene(SCENES.house, { here: ['papa', 'grandma'], moods: { papa: 'thinking', grandma: 'neutral' } });
        await g.plate(tr('The veranda at dusk.'));
        await g.say('papa', 'I’ve written to the doctor. The boat’s on Thursday. In autumn — to us, in town. To winter near us');
        await g.play(cup);
        await g.say('grandma', 'All right. Only don’t put a chair for me by the gate');
        await g.wait(2500);
        g.mood('papa', 'sad');
        await g.say('papa', 'I can’t lose you too…');
        g.here('papa', false);
        await g.plate(tr('He does not finish, and goes off to the nets.'));
      } else if (f.head === 'sophia') {
        await g.scene(SCENES.house, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'thinking' } });
        await g.plate(tr('Night. Sophia gets up, comes with a candle to Grandmother’s bed and lays her palm on her breast: is she breathing? Grandmother is not asleep.'));
        await g.play(still);
        await g.say('sophia', 'Not today');
        await g.plate(tr('— in a whisper, and she goes back to her own bed.'));
      } else {
        await g.scene(SCENES.cape, { here: ['grandma', 'sophia'], moods: { grandma: 'smile', sophia: 'smile' }, keys: { night: 1, fog: 0, candle: 0, window: 0 },
          where: tr('In truth: through the forest at night to the other side of the island; far off on the water, Papa’s lantern by the nets.') });
        await g.plate(tr('Late evening, almost night. Papa is out in the boat by the nets, his lantern far off on the water. Grandmother and Sophia go through the forest with a lantern to the other side.'));
        await g.play(stones);
        await g.scene(SCENES.house, { here: ['grandma', 'sophia'], moods: { grandma: 'smile', sophia: 'surprised' },
          where: tr('In truth: the new house on the other side of the island, at night — big black windows; inside, everything new and clean.') });
        await g.plate(tr('The window of the new house’s veranda is not locked. Inside everything is new, clean, smelling of paint. Grandmother sits down on the wide owner’s bed and lights a cigarette.'));
        if (f.smoke === 'quit') {
          await g.plate(tr('First she takes out of the crevice that very packet:'));
          await g.say('grandma', 'For an occasion like this');
        }
        await g.plate(tr('Sophia opens all the drawers and takes nothing.'));
        g.mood('sophia', 'thinking');
        await g.say('sophia', 'Nobody has died here');
        await g.plate(tr('Grandmother looks at her. A pause.'));
        await g.say('grandma', 'Come on');
        await g.plate(tr('Going, Sophia leaves the wooden seal on the table.'));
        await g.scene(SCENES.shore, { here: ['grandma', 'sophia'], moods: { grandma: 'tired', sophia: 'laugh' },
          where: tr('In truth: home, at night; Papa’s lantern still out on the water.') });
        await g.plate(tr('Grandmother walks home slowly, sits down on the porch and does not get up for a long time; Papa’s lantern is still out on the water.'));
        await g.say('sophia', 'You’re crazy!');
        await g.say('grandma', 'Yes');
        g.scale('strength', -1);
        g.mark('someday', 'kept', tr('“At night. Some day” — kept.'));
      }
    },
    // 3.4: the storm; ⚑ what to give her
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.house, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'afraid' } });
      await g.plate(tr('The next night. Lightning, thunder; the house shakes. Sophia sits up in bed.'));
      await g.say('sophia', 'It was me who asked. Then, in the calm');
      if (f.mama === 'sky') await g.say('sophia', 'Does Mama see what I’ve done?');
      const storm = await g.choose('storm', { 'sophia#chest': [
        { id: 'porch', label: tr('“Let’s go out on the porch. Let’s look at it”') },
        { id: 'blanket', label: tr('“Under the blanket. I’ll sing”') },
        { id: 'notyou', label: tr('“It’s nothing to do with you. Nobody prayed anything down. Not the storm, nor anything else”') },
      ] });
      if (storm === 'porch') {
        await g.say('grandma', 'Let’s go out on the porch. Let’s look at it');
        await g.scene(SCENES.shore, { here: ['grandma', 'sophia'], moods: { grandma: 'smile', sophia: 'laugh' },
          where: tr('In truth: the porch in the storm — rain, a white sky.') });
        await g.play(rail);
        await g.plate(tr('The two of them stand there, rain, white sky. Sophia shrieks with fear and delight.'));
        await g.say('grandma', 'It isn’t you. It’s the sky. Look at it');
        await g.plate(tr('Both are wet through. The door’s creak is heard on the veranda.'));
        if (f.knew) {
          g.here('papa', true);
          await g.plate(tr('Papa comes out into the passage with a blanket and stands in the doorway without a word; after a minute, quietly:'));
          await g.say('papa', 'Mamma. Indoors');
          await g.plate(tr('She goes — not at once, but she goes, and he puts the blanket round the two of them.'));
        } else await g.plate(tr('Papa raises himself on his camp bed, sees their backs against the white sky and lies down again, face to the wall: this is her business.'));
      } else if (storm === 'blanket') {
        await g.say('grandma', 'Under the blanket. I’ll sing');
        await g.play(blanket);
        await g.plate(tr('A lamp under the blanket. Grandmother sings an old song, hoarsely, not remembering all the words.'));
        await g.say('grandma_song', 'Row, little boat, past the last of the stones… the gull is asleep and the herring… mm-mm… sleeps too… the light on the skerry is… mm… is burning for you', 'grandma');
        await g.plate(tr('Under the blanket Sophia sobs at first, a long time, then more quietly, and falls asleep. At the sobs Papa comes to the glass door, sees them and sits down on the floor on the veranda’s threshold, not coming into the room, his back to the jamb, till dawn.'));
      } else {
        await g.say('grandma', 'It’s nothing to do with you. Nobody prayed anything down. Not the storm, nor anything else');
        await g.plate(tr('Sophia has clutched her sleeve.'));
        await g.play(sleeve);
        await g.plate(tr('Sophia is silent a long time.'));
        await g.say('sophia', 'Nothing at all to do with me?');
        await g.say('grandma', 'Nothing at all');
        g.mood('sophia', 'neutral');
        await g.plate(tr('Sophia turns to the wall and falls asleep under the loudest of the thunder.'));
      }
      g.apply('storm');
    },
    // 3.5: the morning after
    async g => {
      await g.scene(SCENES.shore, { here: ['sophia', 'papa', 'grandma'], moods: { sophia: 'smile', papa: 'neutral', grandma: 'neutral' } });
      await g.plate(tr('Quiet; seaweed on the rocks. By the pier the dinghy on its painter; Sophia sits in it and rows in circles, crookedly, then straighter — she has been doing it all summer.'));
      await g.say('sophia', 'I want a tent. My own. To sleep on my own');
      await g.plate(tr('Papa writes it in the list for the post.'));
      await g.say('papa', 'I’ll order one');
      if (g.state.scales.sophia <= 1) {
        await g.plate(tr('Sophia turns round to Grandmother at once.'));
        await g.say('sophia', 'And will you come?');
        await g.say('grandma', 'We’ll see');
      }
    },
  ],
};
