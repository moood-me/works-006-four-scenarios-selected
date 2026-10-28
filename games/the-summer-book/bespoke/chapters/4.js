// IV. “The Fog” (scenario §5, 4.1–4.5). August: the tent comes with the post (the chair by the gate, “You mustn’t”, or
// a foot on the thwart and off again); the tent on the cape, the law of the fog; ⚑ what to say for the night (colours);
// the night — the candle goes out in the fog, maybe one call; ⚑ the third hinge; the fog's night as it decides, and —
// where he did not know — when Papa learns.
// Eriksson is in no scene yet (stage 4): a plate, his voice. Papa is not in the cape's scene yet: on the cape — his
// voice. The cape's own keys show the night, the fog and the candle.
// Reads: everything before (facts), scales. Leaves: choices.night, choices.fog, marks.called, marks.hear, marks.knock,
// marks.say, marks.stayed, scales.
import { SCENES, facts } from '../story.js';
import { parcel, pole, fog, dark, lamp, wait, knock } from '../minigames/all.js';

const DUSK = { night: 0, fog: 0, candle: 0, window: 0 };

export default {
  number: 'IV', title: tr('The Fog'),
  titles: ['The Post', 'The Tent', 'For the Night', 'The Night', 'The Fog'],
  choices: [
    { id: 'night', title: tr('What to say for the night'), options: [{ id: 'call', label: tr('“Call — I’ll hear”') }, { id: 'scared', label: tr('“Then you’re frightened”') }, { id: 'knock', label: tr('“At midnight I’ll knock”') }] },
    { id: 'fog', title: tr('The candle has gone out'), weight: '⚑', options: [{ id: 'go', label: tr('Take the lantern and go') }, { id: 'papa', label: tr('Wake her son') }, { id: 'lamp', label: tr('A lamp in the window, and wait') }, { id: 'behind', label: tr('Sit behind the tent') }] },
  ],
  steps: [
    // 4.1: the post; the parcel; the chair by the gate — or the boat
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.shore, { here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'laugh', papa: 'thinking' } });
      g.title(tr('August'));
      await g.plate(tr('Eriksson at his oars; in the boat, a parcel — the tent. Sophia grabs it off the gunwale and drags it to Grandmother.'));
      await g.say('sophia', 'Is it mine?');
      await g.plate(tr('Grandmother holds the parcel, making out the writing on the wrapping, and Sophia pulls it her way.'));
      await g.play(parcel);
      await g.say('eriksson', 'Will you put it up yourself?');
      await g.say('sophia', 'Myself!');
      if (f.knew) {
        await g.plate(tr('On the windowsill, a bottle of drops: the doctor came on Thursday. Running past with the parcel, Sophia sniffs the bottle and wrinkles her nose.'));
        await g.say('sophia', 'Is that what tired smells like?');
        await g.say('grandma', 'It is');
        await g.plate(tr('By the gate stands a chair: Papa put it there, though she asked him not to. Grandmother sits beside it, on a stone; the chair is empty. Eriksson calls once — in this visit the first time and the last.'));
        await g.say('eriksson', 'To the nets?');
        await g.plate(tr('Grandmother gets up from the stone. From the veranda Papa, not getting up from his table:'));
        await g.say('papa', 'Mamma. You mustn’t');
        g.mood('grandma', 'angry');
        await g.plate(tr('She stands holding the back of the chair — and shoves it away with her hand; it scrapes over the stones. Then she sits down again — on the stone, not on the chair. Eriksson looks at the empty chair.'));
        await g.say('eriksson', 'They’ve tied you up');
        await g.say('grandma', 'I tied myself');
        await g.plate(tr('He pushes off.'));
      } else {
        await g.plate(tr('Eriksson calls once — in this visit the first time and the last.'));
        await g.say('eriksson', 'Will you come out to the nets?');
        if (f.strength >= 2) {
          await g.plate(tr('Grandmother goes down to the pier, takes hold of the gunwale, puts her foot on the thwart — and takes it off.'));
          await g.say('grandma', 'Some other time');
          await g.say('eriksson', 'There aren’t many other times left for us');
        } else {
          g.mood('grandma', 'tired');
          await g.plate(tr('She does not get up from the porch; she only looks at the boat.'));
          await g.say('grandma', 'Off you go');
          await g.plate(tr('Eriksson looks at her a long time and pushes off without a word. Papa sees it from the veranda.'));
          g.mark('stayed', true, null);
        }
      }
    },
    // 4.2: the tent on the cape; the law of the fog
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.cape, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'smile' }, keys: DUSK });
      await g.plate(tr('The cape. Sophia puts up her tent on the rocks; Grandmother holds the pole while Sophia ties the ropes.'));
      await g.play(pole);
      await g.plate(tr('Papa brings a lantern with a candle in it.'));
      g.set('candle', 1);
      await g.say('papa', 'Candle for two hours. If the fog comes — don’t move from the spot. Not toward a light, not toward a voice. That’s the law');
      await g.say('sophia', 'I know');
      await g.plate(tr('From here you can see the window of the house — Grandmother’s. Papa, leaving, stops by his mother a moment.'));
      await g.say('papa', 'The window is yours');
      await g.say('grandma', 'Mine');
      if (f.bird === 'gift') await g.plate(tr('The cat comes and sits by the tent while Sophia strokes him, and goes off to catch birds.'));
      if (g.state.marks.stayed) {
        await g.plate(tr('On the way back Papa, not looking at her:'));
        await g.say('papa', 'Mamma, I’ll write to the doctor');
        await g.say('grandma', 'In autumn. In town');
        await g.plate(tr('He says nothing; at home he writes in the list for the post: “Doctor — September.”'));
      }
    },
    // 4.3: ⚑ what to say for the night
    async g => {
      await g.scene(SCENES.cape, { here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'neutral' }, keys: { ...DUSK, candle: 1 } }, { cut: true });
      const night = await g.choose('night', { 'sophia#chest': [
        { id: 'call', label: tr('“If you get frightened — call. I’ll hear”') },
        { id: 'scared', label: tr('“If you get frightened — then you’re frightened. It’ll pass by morning”') },
        { id: 'knock', label: tr('“At midnight I’ll knock. Three times”') },
      ] });
      if (night === 'call') {
        await g.say('grandma', 'If you get frightened — call. I’ll hear');
        await g.say('sophia', 'I won’t get frightened');
        await g.plate(tr('But when Grandmother turns to go, Sophia catches her by the sleeve.'));
        await g.say('sophia', 'And you’ll really hear?');
        await g.say('grandma', 'Really');
      } else if (night === 'scared') {
        await g.say('grandma', 'If you get frightened — then you’re frightened. It’ll pass by morning');
        g.mood('sophia', 'thinking');
        await g.plate(tr('Sophia nods seriously — and does not watch Grandmother go. Halfway Grandmother looks back: Sophia is sitting at the tent’s door, hugging her knees, and does not wave.'));
      } else {
        await g.say('grandma', 'At midnight I’ll knock. Three times');
        g.mood('sophia', 'laugh');
        await g.say('sophia', 'Three! Don’t forget!');
      }
      g.apply('night');
    },
    // 4.4: the night; the candle goes out in the fog; ⚑ the third hinge
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.house, { here: ['grandma'], moods: { grandma: 'thinking' } });
      await g.plate(f.knew
        ? tr('Night. Grandmother at the half-open window of the room, looking at the cape. She took her evening drops, as she was told, and still does not sleep. Papa is asleep on the veranda, on the other side of the house: between him and the cape, the whole house and the glass door.')
        : tr('Night. Grandmother at the half-open window of the room, looking at the cape. Papa is asleep on the veranda, on the other side of the house: between him and the cape, the whole house and the glass door.'));
      if (f.bird === 'gift') await g.plate(tr('The cat sits on the windowsill.'));
      await g.scene(SCENES.cape, { here: [], keys: { night: 1, fog: 0.2, candle: 1, window: 0 },
        where: tr('As Grandmother sees it from her window: the cape far off, the tent glowing.') });
      await g.plate(tr('On the cape the tent glows. Fog comes in from the sea, white, light under the moon.'));
      g.set('fog', 1);
      await g.wait(2500);
      g.set('candle', 0);
      await g.plate(tr('The little light blurs into a patch — and goes out: the candle, lit when it got dark, has burnt down. It is still half an hour to midnight.'));
      if (f.sophia <= 1) {
        await g.say('sophia', 'Grandmother!');
        g.mark('called', true, tr('Sophia called, once. Only at this window could it be heard.'));
      }
      await g.wait(f.sophia <= 1 ? 4000 : 10000); // (the silence)
      await g.scene(SCENES.house, { here: ['grandma'], moods: { grandma: 'sad' } });
      if (f.bird === 'gift') await g.plate(tr('The cat gets off the windowsill and goes out into the fog — where to is his business.'));
      await g.plate(tr('Grandmother’s face, close; in the glass, her reflection and white nothing.'));
      await g.choose('fog', { 'grandma#chest': [
        { id: 'go', label: tr('Take the lantern and go to her') },
        { id: 'papa', label: tr('Wake her son') },
        { id: 'lamp', label: tr('Put the lamp in the window and wait') },
        { id: 'behind', label: tr('Go and sit behind the tent, unseen') },
      ] });
    },
    // 4.5: the fog's night as the hinge decides; when Papa learns
    async g => {
      const f = facts(g.state);
      const strength = f.strength; // (before the night takes its toll)
      if (f.fog === 'go') {
        await g.scene(SCENES.house, { here: ['grandma'], moods: { grandma: 'neutral' } });
        await g.plate(tr('Grandmother takes the lantern and goes out into the fog, holding the creaking door so that it does not creak. Papa does not wake.'));
        await g.scene(SCENES.cape, { here: ['grandma'], moods: { grandma: 'afraid' }, keys: { night: 1, fog: 1, candle: 0, window: 0 },
          where: tr('In truth: the wet stones of the path to the cape, in the fog.') });
        await g.play(fog);
        if (strength >= 2) {
          await g.plate(tr('She hurries: the fog is thickening, the girl is alone. She gets there.'));
          if (f.night === 'knock') {
            await g.plate(tr('Three knocks on the canvas.'));
            g.mark('knock', 'kept', tr('“I’ll knock” — kept.'));
          } else await g.say('grandma', 'It’s me');
          g.here('sophia', true);
          g.mood('sophia', 'laugh');
          await g.say('sophia', 'I knew!');
          await g.plate(tr('It is cramped in the tent; Sophia falls asleep clutching her hand.'));
          await g.say('grandma', 'Don’t hang on me');
          await g.plate(tr('— she says to her, asleep, and does not take her hand away; she does not sleep herself, her feet go cold. At dawn she cannot get up, and Sophia runs home for Papa — the fog is already thinning; Papa leads his mother home by the arm, and she does not argue.'));
        } else {
          g.mood('grandma', 'tired');
          await g.plate(tr('Halfway, hurrying over the wet stones, everything spins, and she sits down. Not to call her — to hold her back — it comes out of her by itself:'));
          await g.say('grandma', 'Stay there! I’m here!');
          g.here('sophia', true);
          g.mood('sophia', 'afraid');
          await g.plate(tr('Sophia comes out of the tent at the voice — breaking the law for the first time — and finds her.'));
          if (f.night === 'knock') {
            await g.say('sophia', 'You didn’t knock, you shouted!');
            g.mark('knock', 'shout', tr('“I’ll knock” — a shout instead of the knock.'));
          }
          if (f.head === 'sophia') {
            await g.plate(tr('Finding her, Sophia turns at once toward the house, into the white.'));
            await g.say('sophia', 'You said — run for Papa!');
            await g.plate(tr('Grandmother catches her by the hand.'));
            await g.say('grandma', 'Not today. Sit with me');
            await g.plate(tr('Sophia stands, then sits down.'));
          }
          await g.plate(tr('Till dawn they sit on a stone under Sophia’s blanket; Sophia holds her hand and talks, talks without stopping, so that Grandmother does not fall asleep. At dawn Papa wakes, sees the empty room and goes straight to the cape. He finds them and leads his mother home by the arm, stopping every ten steps.'));
        }
        if (f.called && f.night === 'call') g.mark('hear', 'kept', tr('“I’ll hear you” — kept.'));
        if (f.knew) await g.say('papa', 'Mamma');
        else {
          await g.scene(SCENES.shore, { here: ['grandma', 'papa', 'sophia'], moods: { grandma: 'tired', papa: 'neutral', sophia: 'neutral' },
            where: tr('In truth: the porch of the house, in the morning.') });
          await g.plate(tr('At home, on the porch, once she has sat down.'));
          await learns(g, f);
        }
      } else if (f.fog === 'papa') {
        await g.scene(SCENES.house, { here: ['grandma', 'papa'], moods: { grandma: 'afraid', papa: 'neutral' } });
        await g.plate(tr('Grandmother wakes her son. Papa gets up at once and takes the big lantern; Grandmother takes hold of her cardigan — to go too. At the door, not looking at her:'));
        await g.say('papa', 'Sit. Shine');
        g.here('papa', false);
        await g.plate(tr('And he goes. She stays at the window and raises the lamp to the glass.'));
        await g.play(lamp);
        await g.plate(tr('A long time, nothing; then out of the white comes one light.'));
        if (f.sophia <= 1) await g.plate(tr('Sophia is walking holding Papa’s hand, asleep on her feet, and does not let go of him — the first time all summer. Grandmother sees it from the window.'));
        g.here('papa', true);
        g.here('sophia', true);
        g.mood('sophia', 'angry');
        if (f.sophia > 1) {
          await g.plate(tr('Sophia walks beside him by herself, cross.'));
          await g.say('sophia', 'I wasn’t frightened! I was asleep!');
        }
        if (f.night === 'knock') {
          await g.plate(tr('On the threshold Sophia:'));
          await g.say('sophia', 'And you?');
          await g.plate(tr('Grandmother says nothing. Sophia kicks the threshold.'));
          await g.say('sophia', 'You always lie!');
          await g.plate(tr('And she lies down face to the wall without undressing.'));
          g.mark('knock', 'broken', tr('“I’ll knock” — broken.'));
        }
        g.here('sophia', false);
        await g.plate(tr('At dawn, moving away from the window, Grandmother sways, and Papa catches her by the elbow.'));
        if (f.knew) {
          await g.say('papa', 'Sit down');
          await g.plate(tr('She sits down.'));
        } else {
          await g.say('papa', 'How long?');
          await g.say('grandma', 'A long time');
          await learns(g, f, { woke: true });
        }
        if (f.called && f.night === 'call') {
          g.here('sophia', true);
          await g.plate(tr('In the morning Sophia, to Grandmother:'));
          await g.say('sophia', 'I called you. And Papa came');
          await g.plate(tr('And all day she follows Papa about.'));
          g.mark('hear', 'papa', tr('“I’ll hear you” — Papa came.'));
        }
      } else if (f.fog === 'lamp') {
        await g.scene(SCENES.house, { here: ['grandma'], moods: { grandma: 'thinking' } });
        await g.plate(tr('Grandmother puts the lamp in the window and waits.'));
        await g.play(wait);
        if (f.called) await g.plate(tr('She opens her mouth to call back — and does not call; she only raises the lamp higher.'));
        await g.scene(SCENES.cape, { here: ['sophia'], moods: { sophia: f.night === 'scared' ? 'afraid' : f.sophia <= 1 ? 'sad' : 'thinking' }, keys: { night: 1, fog: 0.8, candle: 0, window: 1 },
          where: tr('What Grandmother does not see: Sophia at the folded-back flap of the tent.') });
        await g.plate(tr('Sophia sits at the folded-back flap, under the moon in the light fog, hugging her knees, and looks at the blurred patch of the window.'));
        if (f.night === 'scared') await g.plate(tr('No whisper, no tears: she sits so, huddled, all night, and does not lie down.'));
        else if (f.sophia <= 1) await g.plate(tr('She cries, then goes quiet.'));
        else {
          if (f.mama === 'sky') await g.say('sophia', 'Mama, can you see?');
          else if (f.mama === 'gone') await g.say('sophia', 'Grandmother isn’t asleep. There’s the lamp');
          else await g.plate(tr('She whispers something.'));
          await g.plate(tr('And she lies down.'));
        }
        if (f.bird === 'gift') await g.plate(tr('Out of the fog comes the wet cat and lies down at the tent’s door, at her feet; by morning he is gone.'));
        await g.scene(SCENES.house, { here: ['grandma', 'papa'], moods: { grandma: 'tired', papa: 'thinking' } });
        await g.plate(tr('Morning. Grandmother has dozed off in the armchair by the window; the lamp has burnt out. Papa, passing, covers her with a blanket and first of all looks out of the window at the cape: it is still white there.'));
        if (f.knew) {
          await g.plate(tr('Then at the burnt-out lamp.'));
          await g.say('papa', 'You didn’t sleep');
          await g.say('grandma', 'I slept');
          await g.plate(tr('He puts the drops beside her.'));
        }
        await g.plate(tr('The fog thins, and Papa goes straight to the cape; out of the white Sophia comes to meet him, wet, by herself.'));
        g.here('sophia', true);
        if (f.called) {
          g.mood('sophia', 'angry');
          await g.plate(tr('On the porch:'));
          await g.say('sophia', 'I called!');
          if (f.night === 'knock') await g.say('sophia', 'And you didn’t knock!');
          await g.plate(tr('Papa raises his eyes to his mother.'));
          await g.say('grandma', 'I heard');
          await g.say('sophia', 'I hate you!');
          g.here('sophia', false);
          await g.plate(tr('She runs off to the pier and sits there till lunch; all that day she does not come near Grandmother.'));
          await g.say('papa', 'You could have woken me');
          await g.say('grandma', 'You’d have gone');
          await g.plate(tr('He says nothing more, and in the evening he moves his camp bed from the veranda into the room, to the window on the cape, and sleeps there for the rest of the summer. Grandmother watches and says nothing.'));
          if (f.night === 'call') g.mark('hear', 'broken', tr('“I’ll hear you” — broken: she heard, and did not come.'));
        } else {
          await g.plate(tr('She sits down to eat without a word, then:'));
          await g.say('sophia', 'I saw your lamp');
          if (f.night === 'knock') {
            await g.say('sophia', 'You didn’t knock');
            await g.say('grandma', 'I didn’t');
          }
        }
        if (f.night === 'knock') g.mark('knock', 'broken', tr('“I’ll knock” — broken.'));
      } else {
        await g.scene(SCENES.house, { here: ['grandma'], moods: { grandma: 'neutral' } });
        await g.plate(tr('Grandmother goes out into the fog without the lantern, holding the creaking door so that it does not creak. Papa does not wake.'));
        await g.scene(SCENES.cape, { here: ['grandma'], moods: { grandma: 'tired' }, keys: { night: 1, fog: 1, candle: 0, window: 0 },
          where: tr('In truth: the wet stones of the path to the cape, in the fog white under the moon.') });
        await g.play(dark);
        await g.plate(strength <= 1
          ? tr('Slowly, stone by stone, so that Sophia does not hear; twice she sits down to get her breath — and gets there.')
          : tr('Slowly, stone by stone, so that Sophia does not hear — and she gets there.'));
        await g.plate(tr('Grandmother sits behind the tent on a wet stone, in her shawl.'));
        if (f.called) await g.plate(tr('By the time she comes Sophia has gone quiet: she has cried and sits hugging her knees.'));
        await g.plate(f.bird === 'gift'
          ? tr('Inside, Sophia thinks she is alone and talks aloud — to herself, and to the cat: he has come out of the fog to get warm and lies at the door.')
          : tr('Inside, Sophia thinks she is alone and talks aloud — to herself.'));
        if (f.mama !== 'moon') await g.say('sophia', 'Mama, I’m alone. Hardly frightened at all');
        if (f.night === 'knock') {
          await g.plate(tr('At midnight Sophia whispers:'));
          await g.say('sophia', 'Well… three times…');
          await g.plate(tr('And she waits.'));
        }
        await g.play(knock);
        if (f.night === 'knock') await g.plate(tr('Grandmother does not knock.'));
        await g.scene(SCENES.shore, { here: ['grandma'], moods: { grandma: 'tired' },
          where: tr('In truth: the porch of the house, at dawn.') });
        await g.plate(tr('Before dawn she goes home just as slowly, holding on to the stones, and sits down on the porch; she can no longer get up. Her shawl has slipped off her shoulders behind the tent into a crevice and caught on a ledge above the water, above the surf; she could not bend for it; from the stones it cannot be seen — only from the sea.'));
        g.here('papa', true);
        await g.plate(tr('On the porch Papa finds her, puts his jacket round her shoulders and looks at the wet hem.'));
        await g.say('papa', 'You were there');
        await g.plate(tr('It is not a question.'));
        await g.say('grandma', 'Don’t tell her');
        if (!f.knew) await learns(g, f, { sophia: false });
        g.here('papa', false);
        await g.plate(tr('He raises his eyes to the cape — the fog is thinning — and goes there; Sophia comes running to meet him and sees Grandmother on the porch.'));
        g.here('sophia', true);
        if (f.head === 'sophia') {
          g.here('papa', true);
          g.mood('sophia', 'afraid');
          await g.plate(tr('She understands at once: Grandmother is sitting and does not get up — the very thing she was told in the forest. Sophia stops, her lips white, and does as she was told: she grabs Papa’s sleeve with both hands.'));
          await g.say('sophia', 'She isn’t getting up! She said — then to you!');
          await g.say('papa', 'I know');
          await g.say('sophia', 'I didn’t tell. She told me not to');
          await g.plate(tr('Papa looks at his mother. Sophia sits down beside Grandmother on the step and counts aloud, as she did in the forest, till Papa lifts his mother by the arm and leads her indoors; Sophia follows and goes on counting. About the night she says nothing till evening.'));
          if (f.called) {
            await g.plate(tr('In the evening:'));
            await g.say('sophia', 'I called and you didn’t come!');
            if (f.night === 'knock') await g.say('sophia', 'And you didn’t knock!');
            await g.plate(tr('And she lies down face to the wall without undressing. Grandmother says nothing.'));
          } else if (f.night === 'knock') {
            await g.plate(tr('In the evening:'));
            await g.say('sophia', 'You didn’t knock');
            await g.plate(tr('Grandmother says nothing.'));
          }
        } else if (f.called) {
          g.here('papa', true);
          g.mood('sophia', 'angry');
          await g.say('sophia', 'I called and you didn’t come!');
          if (f.night === 'knock') await g.say('sophia', 'And you didn’t knock!');
          await g.plate(tr('Papa looks at his mother and says nothing. Grandmother too. Sophia hits her on the knee with her fist — and at once clings to her hem with both hands and does not let go.'));
        } else {
          g.mood('sophia', 'smile');
          await g.say('sophia', 'I was alone! All night! By myself!');
          g.mood('sophia', 'afraid');
          await g.plate(tr('— and she stops short: Grandmother does not get up to meet her. Sophia sits down beside her on the step and takes her sleeve without a word.'));
          if (f.night === 'knock') {
            await g.plate(tr('Later, in the day:'));
            await g.say('sophia', 'You didn’t knock!');
            await g.plate(tr('Grandmother says nothing; Sophia does not talk to her till evening, and in the evening brings her coffee herself.'));
          }
        }
        if (f.called && f.night === 'call') g.mark('hear', 'broken', tr('“I’ll hear you” — broken: nobody came.'));
        if (f.night === 'knock') g.mark('knock', 'broken', tr('“I’ll knock” — broken, though she was behind the canvas.'));
      }
      g.apply('fog');
    },
  ],
};

// When Papa learns (scenario §5, after 4.5): the fog's night, if he did not know since the forest — his first words by
// what she answered at the nets (1.5). woke — she woke him herself (“her son”); sophia: false — Sophia is not by them
// (behind the tent: that is in its own outcome).
async function learns(g, f, { woke = false, sophia = true } = {}) {
  if (f.nets === 'say') {
    await g.say('papa', 'You promised to tell me');
    if (woke) await g.say('grandma', 'I’m telling you now');
    else {
      await g.say('grandma', 'You wouldn’t have let me');
      await g.say('papa', 'I wouldn’t');
    }
    g.mark('say', 'broken', tr('“I’ll tell you” — broken.'));
  } else if (f.nets === 'nothing') {
    await g.say('papa', 'Nothing to tell, then');
    await g.plate(tr('She says nothing.'));
  } else {
    await g.say('papa', 'I did ask');
    await g.plate(tr('Nothing more; as she sits, he takes her hand, as he took the end of the net then, and holds it.'));
  }
  if (sophia && f.head === 'sophia') {
    g.here('sophia', true);
    await g.plate(tr('Sophia, seeing that Papa knows:'));
    await g.say('sophia', 'I didn’t tell. She told me not to');
    await g.plate(tr('Papa looks at his mother.'));
  }
}
