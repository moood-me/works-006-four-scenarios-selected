// Epilogue. “August” (scenario §5, §10). 31 August, the last morning, a thin fog; the island shut up till summer. The
// way to the boat by Grandmother's strength, Sophia's place by her scale, the hands in the mini-game of the ending;
// then the motor, the island from the water by the play's marks, the lines of the promises in the boat, the island
// going into the white. The ending the three hinges decide (story.js facts): “The Window” (Keep), “The Tent”
// (Together), “The Oars” (Let go) — each full or late —, “The Shawl on the Stone” (holding the incompatible).
// The last morning: dawn and late, a thin fog (0.6); the island goes into the white from the sea's boat (`island`).
// Eriksson is not here.
// Reads: everything (facts, marks). Leaves: nothing.
import { SCENES, facts } from '../story.js';
import { gangway, hold, oars, upright } from '../minigames/all.js';

const MORNING = { dawn: 1, late: 1, fog: 0.6 };
// where Sophia and Grandmother sit in the big boat (Sophia's scale, §8)
const seats = f => ({ sophia_at: f.sophia >= 3 ? 'bow' : f.sophia === 2 ? 'beside' : 'hand', grandma_at: f.sophia <= 1 ? 'hand' : 'seat' });

export default {
  number: '', title: tr('August'),
  titles: ['The Last Morning', 'From the Water'],
  choices: [],
  steps: [
    // the way to the boat, the hands
    async g => {
      const f = facts(g.state), m = g.state.marks;
      if (f.ending === 'tent') {
        await g.scene(SCENES.cape, { here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'smile', sophia: 'neutral', papa: 'sad' },
          keys: { ...MORNING, grandma_at: 'door', sophia_at: 'tent', papa_at: 'peg' } });
        g.title(tr('The Tent'));
      } else {
        await g.scene(SCENES.shore, { here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'neutral', papa: 'neutral' },
          keys: { ...MORNING, big_boat: true, luggage: true, grandma_at: 'pier', sophia_at: 'pier', papa_at: 'pier', chair: f.knew ? 'set' : 'none' } });
        g.title(f.ending === 'window' ? tr('The Window') : f.ending === 'oars' ? tr('The Oars') : tr('The Shawl on the Stone'));
      }
      await g.plate(tr('31 August, the last morning. A thin morning fog — the shore can be seen in it. The things are by the pier; the big boat stands by the far rock, where it is deep, and a gangway with a rail is laid to it from the shore. The island is shut up till summer.'));
      // the marks, in gestures (§9)
      const signs = [];
      if (f.smoke === 'secret') signs.push(tr('Sophia slips Grandmother the tobacco pouch on the sly.'));
      else if (f.smoke === 'tell') signs.push(tr('Papa takes the shell ashtray off the veranda rail and puts it in the basket without a word.'));
      else if (f.house) signs.push(tr('Grandmother pats her pocket: there is the empty packet from the new house. She crumples it and does not throw it away.'));
      else signs.push(tr('Grandmother pats her empty pocket.'));
      if (f.mama === 'gone') signs.push(tr('The hat is on Sophia. Papa, seeing it, straightens its brim against the wind and turns away to the water.'));
      else if (f.mama === 'sky') signs.push(tr('Sophia silently tugs Papa by the sleeve and points at the nail. He takes down the hat, holds it, then puts it in his bag.'));
      else signs.push(tr('The hat stays on its nail. Going, Sophia touches it: “Till summer.”'));
      if (f.bird === 'bury') signs.push(tr('Sophia runs along the row of little graves with wooden birds and lays a shell on each.'));
      else if (f.bird === 'out') signs.push(tr('The cat was shut in a basket with a lid this morning; Papa carries it to the boat — hissing inside, claws on the wicker. Sophia sits as far from the basket as she can.'));
      await g.sheet(tr('The last morning'), signs);
      if (f.ending === 'window') {
        if (f.knew) await g.plate(tr('On the windowsill, empty bottles; the chair by the gate.'));
        else await g.plate(tr('The doctor came in the last week.'));
        if (f.form === 'full' || f.strength > 0) await g.plate(walks(f));
        if (f.form === 'full') await g.plate(tr('On the gangway Papa takes her by the elbow — his gesture, not a support: his hand is simply there. This time she does not shake it off and says nothing.'));
        else {
          await g.plate(tr('She does not give him her elbow. Papa walks a step behind, ready to catch her.'));
          await g.say('grandma', 'Don’t catch me. I won’t fall');
          await g.plate(tr('He does not answer. Sophia looks from him to her.'));
          if (f.strength === 0) {
            await g.plate(tr('At the gangway she stops by herself:'));
            await g.say('grandma', 'Well, hold me, since you’re catching');
            await g.plate(tr('And he puts her into the boat.'));
          }
        }
        g.set('grandma_at', 'gangway');
        g.set('papa_at', 'gangway');
        await g.plate(sits(f));
        await g.play(gangway);
      } else if (f.ending === 'tent') {
        await g.plate(tr('Papa takes hold of the tent peg.'));
        await g.say('papa', 'The winter will carry it off');
        await g.say('sophia', 'It won’t. It’s mine');
        await g.plate(tr('Grandmother, saying nothing, lays her palm on the canvas. He stands a long time, lets go of the peg and weighs the edges of the tent down with stones. Then:'));
        g.set('stones', true);
        if (f.knew) await g.say('papa', 'You’ll winter with us. The doctor will come every week');
        else await g.say('papa', 'You’ll winter with us. The doctor will come');
        await g.plate(tr('She does not answer.'));
        await g.scene(SCENES.shore, { here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'smile', sophia: 'neutral', papa: 'sad' },
          keys: { ...MORNING, big_boat: true, luggage: true, grandma_at: 'gangway', sophia_at: 'gangway', papa_at: 'gangway', chair: f.knew ? 'set' : 'none' } });
        if (f.strength >= 3) await g.plate(tr('He carries the things and does not look at his mother. She steps into the boat by herself; he stands beside and does not look.'));
        else if (f.strength >= 1) await g.plate(f.sophia <= 2
          ? tr('He carries the things and does not look at his mother. She walks leaning on Sophia’s hand; Papa lifts her into the boat — and even then does not look at her.')
          : tr('He carries the things and does not look at his mother. She walks leaning on his arm; he lifts her into the boat — and even then does not look at her.'));
        else await g.plate(tr('He carries the things and does not look at his mother. She walks by herself, step by step, along the shore, holding on to the stones and then the gangway rail; everyone waits by the boat, nobody hurries her. He puts her into the boat holding her under the arms, and does not look at her.'));
        if (f.knockBroken) await g.plate(tr('On the gangway Sophia does not take her hand at first — then she does.'));
        await g.scene(SCENES.sea, { here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'smile', sophia: 'neutral', papa: 'sad' },
          keys: { ...MORNING, island: 0.2, grandma_at: 'hand', sophia_at: f.sophia >= 3 ? 'bow' : 'hand', papa_at: 'stern' } });
        if (f.sophia >= 3) {
          await g.plate(tr('Sophia sits on the bow at first; when the island begins to go, she comes over to Grandmother by herself.'));
          g.set('sophia_at', 'hand');
        }
        await g.play(hold);
        await g.plate(tr('Grandmother sits with her eyes closed, smiling.'));
      } else if (f.ending === 'oars') {
        g.set('dinghy', 'moored');
        await g.plate(tr('Walking over the stones to the big boat would take Grandmother long: by water it is a hundred strokes from the pier, along the shore twice as far. Sophia, who has rowed circles by the pier all summer, sits down in the dinghy at the oars without a word and waits.'));
        await g.plate(f.strength <= 2
          ? tr('Grandmother is in the stern of the dinghy: Papa sets her in, holding her under the arms.')
          : tr('Grandmother steps into the stern of the dinghy by herself.'));
        if (f.heard) {
          await g.plate(tr('Papa, who heard “I heard” that morning, gets into the dinghy himself without a word, in the bow, his back to them, the bundle on his knees. He does not take the oars: Sophia rows, and the dinghy goes low and heavy.'));
        } else {
          await g.plate(tr('Papa holds the dinghy by the bow and looks at the fog, at the shore, at Sophia at the oars.'));
          if (f.knew) {
            await g.plate(tr('He does not let go. Grandmother lays her hand over his on the gunwale.'));
            await g.say('grandma', 'The winter is yours. The hundred strokes are ours');
            await g.plate(tr('He stands so a long time.'));
          }
          await g.say('papa', 'Along the shore. So that I can see');
          await g.plate(tr('And he pushes the dinghy off himself. He walks along the shore level with them, the bundle on his shoulder.'));
        }
        if (f.form === 'late') {
          await g.plate(tr('Sophia rows crossly and proudly — crooked, then straighter, as by the pier. To Grandmother:'));
          if (f.called || f.night === 'knock') {
            await g.say('sophia', 'You didn’t come');
            await g.say('grandma', 'You got there by yourself');
          } else await g.say('sophia', 'I saw your lamp');
          await g.plate(tr('Sophia rows harder and does not look at her till the big boat.'));
        } else if (f.hearBroken) {
          await g.plate(tr('Taking the oars, Sophia:'));
          await g.say('sophia', 'You didn’t come then');
          await g.plate(tr('Nothing more, and she rows.'));
        }
        if (f.knockBroken) {
          await g.plate(tr('First she shakes Grandmother’s hands off the oars:'));
          await g.say('sophia', 'Myself!');
          await g.plate(tr('— then lets them be.'));
        }
        g.set('dinghy', 'out');
        await g.play(oars);
        g.set('dinghy_at', 1);
        await g.plate(tr('The dinghy goes crooked, then straight. Halfway, Grandmother’s hand reaches for the oars by itself — and lies back on her knees.'));
      } else {
        await g.plate(tr('The last days Grandmother sat on the porch, in Papa’s jacket.'));
        await g.say('sophia', 'Where’s your shawl?');
        await g.say('grandma', 'I lost it');
        await g.plate(walks(f));
        await g.plate(tr('On the gangway Papa says one thing:'));
        await g.say('papa', 'In town — a doctor');
        await g.plate(tr('She nods: there is nothing to argue with.'));
        if (f.knockBroken) await g.plate(tr('On the gangway Sophia does not take her hand at first — then she does.'));
        await g.scene(SCENES.sea, { here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'tired', sophia: 'neutral', papa: 'neutral' },
          keys: { ...MORNING, island: 0.2, sway: 1, ...seats(f), papa_at: 'stern' } });
        await g.plate(sits(f));
        await g.play(upright);
      }
    },
    // the motor; the island from the water; the lines in the boat; into the white
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.sea, { here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'neutral', sophia: 'neutral', papa: 'neutral' },
        keys: { ...MORNING, island: 0.3, basket: f.bird === 'gift' ? 'cat' : 'shut', ...seats(f), papa_at: 'stern' } });
      await g.plate(tr('The motor. From the water the island goes by.'));
      const shots = [];
      if (f.mama === 'moon') shots.push(tr('The door of the house: the hat on its nail.'));
      else shots.push(tr('The door of the house: the nail is empty.'));
      if (f.knew) shots.push(tr('The gate: the chair beside it.'));
      else shots.push(tr('The gate.'));
      shots.push(tr('The empty veranda rail.'));
      if (f.bird === 'bury') shots.push(tr('The shore: the row of little graves with wooden birds.'));
      if (f.house) shots.push(tr('From the sea, the big windows of the new house on the other side; in the window, on the table, a wooden seal.'));
      else shots.push(tr('From the sea, the black windows of the new house on the other side; Sophia looks at them a long time, as long as they can be seen.'));
      if (f.bird === 'gift') shots.push(tr('In the boat the cat is already sitting on a basket beside Sophia — how he came, nobody saw; at his paws a dead bird, the last present. Wrinkling her nose, Sophia drops it overboard with two fingers, then strokes him; he puts up with it and looks at the water.'));
      if (f.storm === 'porch') shots.push(tr('Sophia looks up at the grey sky and laughs.'));
      else if (f.storm === 'blanket') shots.push(tr('Papa covers the two of them with one blanket.'));
      else shots.push(tr('By habit Sophia folds her hands — and lowers them, asking for nothing.'));
      if (f.head === 'sophia') shots.push(tr('Sophia watched Grandmother step into the boat and counted her steps soundlessly with her lips.'));
      await g.sheet(tr('From the water'), shots);
      if (f.ending === 'window') {
        if (f.mama === 'sky') await g.plate(tr('Grandmother looks at Papa’s bag, where the hat is,'));
        else if (f.mama === 'gone') await g.plate(tr('Grandmother looks at the hat on Sophia,'));
        else await g.plate(tr('Grandmother looks at the door, where the hat stayed,'));
        await g.plate(tr('and says to her son, not to Sophia:'));
        await g.say('grandma', 'She wouldn’t have let herself be led either');
        await g.wait(2500);
        await g.say('papa', 'She wouldn’t');
        await g.plate(tr('Sophia looks from one to the other: they spoke about Mama in front of her — and not to her.'));
        await promises(g, f);
        if (f.storm === 'blanket') {
          await g.plate(tr('Grandmother hums that same song, quietly, hoarsely, not all the words.'));
          await g.say('grandma_song', 'Row, little boat… mm-mm… the light on the skerry… is burning for you', 'grandma');
        }
        await g.say('narrator', 'That winter Grandmother lived with them in town, in a room with a window onto the yard. It was a good window');
        g.set('island', 1);
        g.set('fog', 0.85);
        await g.plate(tr('Last shot: the window of the house on the island, dark, going into the fog.'));
      } else if (f.ending === 'tent') {
        await g.plate(f.house
          ? tr('Sophia tells Papa about the summer — about the beetle in the moss, about the tent, about the fog — and in the middle of it:')
          : tr('Sophia tells Papa about the summer — about the tent, about the fog — and in the middle of it:'));
        await g.say('sophia', '…and Mama would have got into the tent too!');
        await g.plate(tr('She stops. Papa does not answer; he lays his hand on her head and does not take it away.'));
        await g.say('sophia', 'Next summer again!');
        await g.say('grandma', 'Again');
        await g.say('papa', 'We’ll see');
        await promises(g, f);
        if (f.form === 'late') {
          await g.say('sophia', 'Why only once?');
          await g.plate(tr('Grandmother does not answer.'));
        }
        await g.scene(SCENES.cape, { here: [], keys: { ...MORNING, stones: true, from: 'sea' } }, { cut: true });
        await g.plate(tr('Only the motor. Last shot: the tent on the cape, grey, flapping in the wind, going into the fog.'));
        g.set('fog', 0.85);
      } else if (f.ending === 'oars') {
        await g.plate(f.strength <= 2
          ? tr('At the big boat Sophia does not take her by the hand: Papa lifts her in.')
          : tr('At the big boat Sophia does not take her by the hand: Grandmother climbs over by herself.'));
        if (!f.learned) {
          await g.plate(tr('His hand on her elbow feels her trembling.'));
          if (f.nets === 'say') {
            await g.say('papa', 'Mamma?');
            await g.say('grandma', 'I’ll tell you later');
          } else if (f.nets === 'nothing') {
            await g.plate(tr('She, before he asks:'));
            await g.say('grandma', 'Nothing to tell');
          } else await g.plate(tr('He holds her hand on the gunwale without a word, as he held the end of the net.'));
        }
        if (f.sophia >= 3) await g.plate(tr('Sophia sits on the bow, facing forward, and does not look back at Grandmother any more.'));
        else if (f.sophia === 2) await g.plate(tr('Sophia sits beside her, not touching.'));
        else await g.plate(tr('Sophia sits beside her and takes Grandmother’s hand, without a word.'));
        if (f.form === 'full' && f.mama === 'gone') {
          if (f.sophia <= 1) await g.plate(tr('To Papa, the first time — not letting go of Grandmother’s hand, squeezing it tighter:'));
          else await g.plate(tr('To Papa, the first time:'));
          await g.say('sophia', 'Did Mama row like that?');
          await g.wait(3000);
          await g.say('papa', 'Better');
          await g.plate(tr('The talk goes past Grandmother.'));
        } else await g.plate(tr('Papa silently takes the dinghy’s oars from Sophia and ties it to the stern.'));
        await promises(g, f);
        g.set('island', 1);
        g.set('fog', 0.85);
        if (f.sophia >= 3) await g.plate(tr('Last shot: Grandmother’s empty hands on her knees — and Sophia ahead, on the bow.'));
        else if (f.sophia === 2) await g.plate(tr('Last shot: Grandmother’s empty hands on her knees — and Sophia beside her, facing forward.'));
        else await g.plate(tr('Last shot: Sophia’s hand in Grandmother’s hand, and the bow of the boat empty.'));
      } else {
        if (f.called) {
          await g.plate(tr('Sophia tells — not Grandmother, but Papa — haltingly, the true story:'));
          if (f.night === 'knock') await g.say('sophia', 'I called. Nobody came, nobody knocked. It was frightening. Then morning');
          else await g.say('sophia', 'I called. Nobody came. It was frightening. Then morning');
          await g.plate(tr('Papa looks at his mother and says nothing. Grandmother, who was behind the canvas, says nothing.'));
        } else {
          await g.plate(f.bird === 'gift'
            ? tr('Sophia tells everyone how she slept alone, all night, by herself — how the cat came to get warm, how it was hardly frightening at all.')
            : tr('Sophia tells everyone how she slept alone, all night, by herself — how it was hardly frightening at all.'));
          if (f.night === 'knock') {
            await g.say('sophia', 'You didn’t knock');
            await g.plate(tr('Grandmother says nothing.'));
          }
        }
        await promises(g, f);
        await g.plate(tr('From the water Sophia sees by the cape, in a crevice above the water, a grey patch.'));
        await g.say('sophia', 'What’s that?');
        await g.say('grandma', 'A stone');
        await g.scene(SCENES.cape, { here: [], keys: { ...MORNING, shawl: 'ledge', from: 'sea' } }, { cut: true });
        await g.plate(tr('Last shot: the grey shawl on the stone, going into the fog.'));
        g.set('fog', 0.85);
      }
    },
  ],
};

// where Sophia sits in the boat (her scale, §8)
function sits(f) {
  if (f.sophia >= 3) return tr('Sophia sits alone on the bow, facing forward.');
  if (f.sophia === 2) return tr('Sophia sits beside Grandmother, not holding on.');
  return tr('Sophia holds Grandmother’s hand all the way and sits beside her.');
}
// how Grandmother goes to the boat (her strength, §8)
function walks(f) {
  if (f.strength >= 3) return tr('Grandmother walks to the boat by herself and steps in by herself.');
  if (f.strength >= 1) return tr('Grandmother walks leaning on Papa’s arm; Papa lifts her into the boat.');
  return tr('Grandmother walks by herself, step by step, along the shore, holding on to the stones and then the gangway rail; everyone waits by the boat, nobody hurries her: Sophia sits on a bundle and watches her come, Papa stands by the gangway with her bundle and her knife in his hands. He puts her into the boat holding her under the arms.');
}
// the lines of the first hinge in the boat (§9, §10): “not soon”, or “look” — one of them
async function promises(g, f) {
  if (f.mama === 'sky') {
    await g.say('sophia', 'You promised: not soon');
    await g.say('grandma', 'I did');
    await g.say('sophia', 'Promise again');
    await g.plate(tr('Grandmother says nothing.'));
    await g.say('sophia', 'Greedy');
    await g.plate(tr('And she turns away.'));
  } else if (f.mama === 'moon') {
    await g.plate(tr('In a whisper, only to Grandmother, while Papa is at the stern:'));
    await g.say('sophia', 'You never did tell me where Mama is');
    await g.plate(tr('Grandmother points at the water, as on that night.'));
    await g.say('grandma', 'Look');
    await g.say('sophia', '“Look” again!');
    await g.plate(tr('But she looks.'));
  }
}
