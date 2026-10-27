// III. Mama's Garden (scenario §5, 3.1–3.6). Morning: the pines at the door, frost tracks, the boy's white paws, the
// garden grown on the wall overnight; noon: Mama steps into the wall; the empty room; ⚑ Mama in the wall (hinge 2);
// night 2 — ⚑ the boy's hand on the lantern.
// Scenes: the landing in the morning, the round room (noon, dusk, night), the lantern room, the shore at night.
// Reads: choices.night1; scales.garden, lamp, groke; marks.promise, line27. Leaves: choices.wall, night2; scales.garden,
// lamp, paraffin, groke; marks.mama_wall, line27, son_later, son_closed, son_knows.
import { SCENES, isle } from '../story.js';
import { door, palm, dust, asleep, after } from '../minigames/all.js';

// where the lantern is in the morning after night 1 (2.7): carried up, on the table burnt out, by the boy's bunk, on the
// middle step in frost
const LANTERN = { lamp: { lantern_at: 'none' }, mama: { lantern_at: 'table', flame: 'out' }, son: { lantern_at: 'bunk', flame: 'out' },
  turns: { lantern_at: 'stair', flame: 'frost' } };

export default {
  number: 'III', title: tr('Mama’s Garden'),
  titles: ['Morning', 'Into the Wall', 'The Empty Room', 'Night 2'],
  choices: [
    { id: 'wall', weight: '⚑', title: tr('Mama in the wall'), options: [{ id: 'walk', label: tr('“She’s out walking” — and up') }, { id: 'call', label: tr('Call her') }, { id: 'wait', label: tr('A cup, and wait') }] },
    { id: 'night2', title: tr('Night 2: the hand on the lantern'), options: [{ id: 'sleep', label: tr('Don’t open your eyes') }, { id: 'put', label: tr('“Put it back”') }, { id: 'follow', label: tr('Go after him') }] },
  ],
  steps: [
    // 3.1: morning — the pines at the door, the frost tracks, the boy's paws, the garden on the wall
    async g => {
      const { night1 } = g.state.choices, garden = g.state.scales.garden;
      await g.scene(SCENES.landing, { here: ['papa', 'my', 'fisher'], moods: { papa: 'angry' },
        keys: { ...isle(24, 'morning'), pines: 1, frost_step: true, papa_at: 'door', my_at: 'rock', fisher_at: 'away' } });
      await g.plate(tr('24 August. The door will not open: in the night the pines have crept up to the very threshold.'));
      await g.say('papa', 'Trees don’t walk');
      await g.say('my', 'They’re afraid');
      await g.play(door);
      g.set('door', 1);
      await g.plate(tr('On the stone by the threshold, tracks of frost — from the shore to the door and back. Far off the Fisherman is walking away from the lighthouse: at dawn he was here.'));
      await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'sad', my: 'smile', troll: 'tired' },
        keys: { ...isle(24, 'morning'), ...LANTERN[night1 ?? 'lamp'] } });
      if (night1 === 'lamp' || night1 === 'mama') await g.plate(tr('The boy at the table, his paws white with cold. Without the lantern he sat by the Groke in the night, far from her — his first small step.'));
      else await g.plate(tr('The boy at the table, his paws white with cold: he sat by the light on the wet sand.'));
      await g.plate(tr('Mama drops the cup she was washing, takes his paws in hers without a word and rubs them. She asks nothing. Papa looks at the tracks and at the paws.'));
      if (night1 === 'lamp' || night1 === 'mama') {
        await g.say('papa', 'Toughening up. Quite right');
        await g.plate(tr('My looks at her brother.'));
      } else if (night1 === 'son') await g.plate(tr('Papa says nothing. For a moment the boy lifts his eyes to him.'));
      else await g.plate(tr('Papa says nothing and looks at the lantern in frost on the middle step.'));
      await g.plate(tr('On the wall, overnight, a garden has grown: an apple tree, a veranda, a stream. Painted in it: the boy, My, Mama with her basket.'));
      if (night1 === 'lamp' || night1 === 'son') await g.plate(tr('Mama had no lantern: she painted by moonlight. The brush lies on the sill in the square of moonlight, the paint still fresh.'));
      if (garden <= 1) {
        await g.plate(tr('By the gate stands a little Papa.'));
        await g.say('my', 'Ti-iny, isn’t it');
      } else {
        await g.say('my', 'And no Papa');
        await g.say('mama', 'He’s at the lighthouse');
      }
    },
    // 3.2: noon — Mama steps into the wall
    async g => {
      await g.scene(SCENES.room, { here: ['mama', 'my'], moods: { mama: 'tired', my: 'surprised' }, keys: { ...isle(24, 'day'), lantern_at: 'none' } });
      await g.plate(tr('Noon. Papa is up top, rubbing the lenses. My is on the windowsill outside, the boy in the pines. Quiet.'));
      if (g.state.scales.garden <= 1) await g.plate(tr('Mama rubs her eyes and sits down, the way one sits down to rest.'));
      else await g.plate(tr('Mama looks round at the empty room.'));
      await g.plate(tr('She finishes the last branch, steps back, looks — and steps into the wall, under the apple tree. Her little figure sits down in the grass. Instead of the wind — the garden, bees. You and My see it through the glass; Papa does not.'));
      g.here('mama', false);
      g.set('wall_mama', 1);
      await g.wait(1500);
    },
    // 3.3–3.4: the empty room; ⚑ Mama in the wall
    async g => {
      await g.scene(SCENES.room, { here: ['papa', 'my'], moods: { papa: 'surprised', my: 'smile' },
        keys: { ...isle(24, 'day'), lantern_at: 'none', wall_mama: 1, cups: 1, tea: 0 } });
      await g.plate(tr('Papa comes down. The table, cold tea, wind in the chimney. Mama is not there.'));
      await g.plate(tr('My looks in at the door and at the wall:'));
      await g.say('my', 'That’s new. Wasn’t there this morning');
      await g.wait(1500);
      await g.say('my', 'Fine');
      g.here('my', false);
      g.mood('papa', 'sad');
      await g.plate(tr('Papa looks at the wall: under the apple tree, a little figure that was not there in the morning — an apron, a handbag. He knows her. He lays his palm on the painted gate: under his paw, plaster. He cannot get in there. His face, close.'));
      const wall = await g.choose('wall', { 'papa#chest': [
        { id: 'walk', label: tr('“She’s out walking. The island is small” — and up to the lamp') },
        { id: 'call', label: tr('Call: “Mamma! Mamma!” — his palm on the wall') },
        { id: 'wait', label: tr('Put a cup of tea by the wall and sit down to wait. Not to move, whoever comes') },
      ] });
      if (wall === 'walk') {
        await g.say('papa', 'She’s out walking. The island is small');
        g.here('papa', false);
        await g.plate(tr('Papa at the lamp till dusk: he rubs the lenses, strikes matches, talks to the burner. And here, all day, the wall: Mama’s figure under the apple tree, the bees.'));
        g.set('dusk', 1);
        g.here('my', true);
        await g.plate(tr('At dusk, when the room is empty, Mama comes out of the wall. Only My sees it, from the windowsill.'));
        g.set('wall_mama', 0);
        g.set('wall_grass', true);
        g.here('mama', true);
      } else if (wall === 'call') {
        await g.say('papa', 'Mamma! Mamma!');
        await g.play(palm);
        g.set('wall_mama', 0);
        g.set('wall_grass', true);
        g.here('mama', true);
        g.mood('mama', 'tired');
        await g.plate(tr('Mama comes out at once, embarrassed and tired.'));
        await g.say('mama', 'I only lay down for a moment under the apple tree');
        g.set('brushes', 'jar');
        g.set('apple_leaves', false);
        await g.plate(tr('She stays with him till evening. Her brushes she puts away in a jar and does not touch them again; the apple tree is left without its last leaves.'));
        if (g.state.marks.promise === 'term') await g.say('mama', 'Two more nights');
      } else {
        g.set('dusk', 1);
        g.set('tea', 1);
        await g.plate(tr('The light in the window goes from noon toward dusk; the tea goes cold, Papa pours fresh. Around Mama’s figure on the wall, all day, flowers add themselves.'));
        await g.play(dust);
        g.set('line27', g.state.marks.line27 ? 'next' : 'clean');
        if (g.state.marks.line27) await g.plate(tr('He knows the line of 27 August already; he reads the next one: “Ate bread. Whose — don’t know.”'));
        else await g.plate(tr('“27 August. Wind north. I am forty today. Nobody knows.” And under it, a knot.'));
        g.here('troll', true);
        await g.plate(tr('In the afternoon the boy in the doorway, a stone from his ring in his paws. For the first time his father sits on the floor, low, the way he sits himself; the boy looks a long time — and comes in:'));
        await g.say('troll', 'Pappa, I…');
        await g.plate(tr('Papa, not turning from the wall, lifts a paw:'));
        await g.say('papa', 'Shh. Later');
        g.here('troll', false);
        g.set('stone', true);
        await g.plate(tr('The boy turns red and goes. The stone stays on the threshold.'));
        g.set('wall_mama', 0);
        g.set('wall_grass', true);
        g.here('mama', true);
        await g.plate(tr('At dusk Mama comes out by herself, sees the cup, touches it — a knock against the table — and says nothing. She sits down beside him on the floor.'));
        g.mood('papa', 'smile');
        await g.say('papa', 'And I found a line here, by the way. The old keeper’s. By myself, under the dust');
        await g.plate(tr('And he waits.'));
        await g.say('mama', 'How good that you noticed');
      }
      g.apply('wall');
    },
    // 3.5–3.6: night 2; ⚑ the hand on the lantern
    async g => {
      const { night1, wall } = g.state.choices, given = g.state.scales.groke > 0;
      g.scale('paraffin', -1);
      await g.scene(SCENES.room, { here: wall === 'walk' ? ['mama', 'troll'] : ['papa', 'mama', 'troll'], moods: { papa: 'tired', mama: 'tired', troll: 'thinking' },
        keys: { ...isle(24, 'night'), ...(wall === 'walk' ? { lantern_at: 'none' } : { lantern_at: 'table', flame: 'low', cups: wall === 'wait' ? 1 : 0 }) } });
      if (given) await g.plate(tr('Night 2, 24/25 August. One measure of paraffin left. The moon almost full. The Groke by the rocks — right up against them.'));
      else await g.plate(tr('Night 2, 24/25 August. One measure of paraffin left. The moon almost full. The Groke by the rocks.'));
      if (wall === 'walk') {
        await g.plate(tr('Papa carries the lantern up and falls asleep over the lamp; the lantern stands on the floor, its light falls on the soot straight on, and the grooves do not show. Below it is dark; Mama lies awake facing the wall and hums softly, like the bees in her garden; the howling she seems not to hear.'));
        await g.plate(tr('In the night the boy appears in the hatch and reaches for the lantern.'));
        await g.scene(SCENES.top, { here: ['papa', 'troll'], moods: { papa: 'tired', troll: 'thinking' },
          keys: { ...isle(24, 'night'), lenses: 1, lantern_at: 'floor', lantern_flame: 'full' } }, { cut: true });
      } else if (wall === 'call') {
        await g.plate(tr('Mama sat on at the table with Papa and fell asleep on the bench in the middle of a word; Papa turns the wick down himself. The boy comes to the table.'));
      } else {
        await g.plate(tr('Papa has dozed off on the floor by the cup. Mama, going to bed, turns the wick down:'));
        await g.say('mama', 'Let it burn low. Somebody’s howling');
        await g.plate(tr('The boy comes to the table.'));
      }
      await g.plate(tr('Papa wakes at a creak and sees his son’s hand on the lantern.'));
      if (night1 === 'lamp' && wall !== 'walk') await g.plate(tr('Up top the camp bed is empty: “I sleep by the lamp” is broken.'));
      const night2 = await g.choose('night2', { 'troll#chest': [
        { id: 'sleep', label: tr('Don’t open your eyes') },
        { id: 'put', label: tr('“Where are you going? Put it back. I need it.”') },
        { id: 'follow', label: tr('Go after him') },
      ] });
      if (night2 === 'sleep') {
        await g.play(asleep);
        g.here('troll', false);
        await g.plate(tr('The boy goes.'));
        await g.scene(SCENES.shore, { here: ['troll', 'groke'], moods: { troll: 'thinking' },
          keys: { ...isle(24, 'night'), lantern_stone: 'lit', troll_at: 'near', groke_at: given ? 'closest' : 'near', frost: 0.3 } });
        if (given) await g.plate(tr('The Groke sways over the light — the second time, and nearer. The frost under her is less.'));
        else await g.plate(tr('The Groke sways over the light. The frost under her is less.'));
      } else if (night2 === 'put') {
        await g.say('papa', 'Where are you going? Put it back. I need it');
        g.mood('troll', 'sad');
        await g.plate(tr('The boy sets the lantern down without looking and stands at the window till dawn.'));
        if (wall === 'walk') {
          await g.plate(tr('Papa turns the wick up, holds the lantern sideways to the soot and reads the next piece:'));
          g.set('slant', 1);
          if (g.state.scales.lamp === 0) {
            await g.say('papa', '“In wind, warm the burner with paraffin till the flame turns blue. Do not let go before.”');
            await g.plate(tr('The sheet “Burner”.'));
          } else {
            await g.say('papa', '“The oil is thick: warm it in a pan on the stove, carry it wrapped. On a quiet evening the warm oil runs by itself; in wind — only with paraffin.”');
            await g.plate(tr('The sheet “Pan”.'));
          }
          g.scale('lamp', 1);
          g.set('sheets', g.state.scales.lamp);
        } else await g.plate(tr('Papa lies awake, looking at his son’s back by the window.'));
        if (g.state.marks.promise === 'ask') await g.plate(tr('“I won’t ask” is broken.'));
      } else {
        await g.scene(SCENES.shore, { here: ['papa', 'troll', 'groke'], moods: { papa: 'thinking', troll: 'sad' },
          keys: { ...isle(24, 'night'), lantern_stone: 'lit', troll_at: 'near', groke_at: given ? 'closest' : 'near', frost: 0.3 } });
        await g.play(after);
        await g.plate(tr('The boy sets the lantern on a stone; the Groke rises toward the light. Papa stops on the dune. The boy knows he is there and does not turn round.'));
        if (night1 === 'lamp' && wall === 'walk') await g.plate(tr('Up top the camp bed stays empty till morning: “I sleep by the lamp” is broken.'));
        await g.plate(tr('In the morning:'));
        if (g.state.marks.promise === 'ask') {
          await g.say('my', 'You promised not to ask');
          await g.say('papa', 'I didn’t ask');
        } else await g.say('my', 'Spy');
      }
      g.apply('night2');
    },
  ],
};
