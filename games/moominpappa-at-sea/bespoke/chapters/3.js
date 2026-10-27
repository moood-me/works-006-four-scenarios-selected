// III. Mama's Garden (scenario §5, 3.1–3.6). Morning: the pines at the door, frost tracks, the boy's white paws, the
// garden grown on the wall overnight; noon: Mama steps into the wall; the empty room; ⚑ Mama in the wall (hinge 2);
// night 2 — ⚑ the boy's hand on the lantern.
// Scenes: the landing (pines, door_open) and the round room (morning); the lantern room (lenses) and the room
// (into_wall, empty_room, the branches of Ш2; Papa up by the lamp — w_lamp); night 2 — the shore (night2), the room or
// the lantern room, the shore (gift, follow), the morning after.
// Reads: choices.night1; scales.garden, lamp, groke; marks.promise, line27. Leaves: choices.wall, night2; scales.garden,
// lamp, paraffin, groke; marks.mama_wall, line27, son_later, son_closed, son_knows.
import { SCENES, isle, land, on } from '../story.js';
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
      g.beds({ sea: 0.45, wind: 0.2 });
      const push = g.told('pines:push');
      await g.scene(SCENES.landing, { beat: 'pines', here: ['papa', 'my', 'fisher'], moods: { papa: 'angry' }, keys: { ...land(24, 'morning'), pines: 1 } });
      g.title(tr('24 August'));
      const pines = g.beat('pines');
      await push;
      await g.say('papa', 'Trees don’t walk');
      await g.say('my', 'They’re afraid');
      await pines;
      await g.play(door);
      g.set('door', 1);
      g.sound.door();
      await g.beat('door_open');
      g.beds({ sea_in: 0.35, wind: 0.1 });
      const paws = g.told('morning:paws'), wall = g.told('morning:wall');
      await g.scene(SCENES.room, { beat: 'morning', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'sad', my: 'smile', troll: 'tired' },
        keys: { ...isle(24, 'morning'), ...LANTERN[night1 ?? 'lamp'] } }, { cut: true });
      const morning = g.beat('morning');
      await paws;
      if (night1 === 'lamp' || night1 === 'mama') await g.say('papa', 'Toughening up. Quite right');
      await wall;
      if (garden <= 1) await g.say('my', 'Ti-iny, isn’t it');
      else {
        await g.say('my', 'And no Papa');
        await g.say('mama', 'He’s at the lighthouse');
      }
      await morning;
    },
    // 3.2: noon — Mama steps into the wall
    async g => {
      g.beds({ wind: 0.3, sea: 0.15 });
      await g.scene(SCENES.top, { beat: 'lenses', here: ['papa'], moods: { papa: 'thinking' }, keys: isle(24, 'day') });
      await g.beat('lenses');
      g.beds({ sea_in: 0.3, wind: 0.1 });
      on(g, 'into_wall:in', () => g.beds({ sea_in: 0.15, bees: 0.4 }, 3));
      await g.scene(SCENES.room, { beat: 'into_wall', here: ['mama', 'my'], moods: { mama: 'tired', my: 'surprised' }, keys: { ...isle(24, 'day'), lantern_at: 'none' } }, { cut: true });
      await g.beat('into_wall');
    },
    // 3.3–3.4: the empty room; ⚑ Mama in the wall
    async g => {
      g.beds({ sea_in: 0.15, bees: 0.35, wind: 0.1 });
      const my = g.told('empty_room:my'), gate = g.told('empty_room:gate');
      on(g, 'empty_room:down', () => g.sound.creak());
      await g.scene(SCENES.room, { beat: 'empty_room', here: ['papa', 'my'], moods: { papa: 'surprised', my: 'smile' },
        keys: { ...isle(24, 'day'), lantern_at: 'none', wall_mama: 1, cups: 1, tea: 0 } });
      const room = g.beat('empty_room');
      await my;
      await g.say('my', 'That’s new. Wasn’t there this morning');
      await g.wait(1500);
      await g.say('my', 'Fine');
      await gate;
      g.mood('papa', 'sad');
      await room;
      const wall = await g.choose('wall', { 'papa#chest': [
        { id: 'walk', label: tr('“She’s out walking. The island is small” — and up to the lamp') },
        { id: 'call', label: tr('Call: “Mamma! Mamma!” — his palm on the wall') },
        { id: 'wait', label: tr('Put a cup of tea by the wall and sit down to wait. Not to move, whoever comes') },
      ] });
      if (wall === 'walk') {
        await g.say('papa', 'She’s out walking. The island is small');
        g.beds({ wind: 0.3, sea: 0.15 });
        await g.scene(SCENES.top, { beat: 'w_lamp', here: ['papa'], moods: { papa: 'thinking' }, keys: isle(24, 'day') }, { cut: true });
        await g.beat('w_lamp');
        g.beds({ sea_in: 0.15, bees: 0.35, wind: 0.1 });
        on(g, 'w_walk:out', () => g.beds({ sea_in: 0.3, wind: 0.1 }, 3));
        await g.scene(SCENES.room, { beat: 'w_walk', here: ['my'], moods: { my: 'smile', mama: 'tired' }, keys: { ...isle(24, 'dusk'), lantern_at: 'none', wall_mama: 1, cups: 1 } }, { cut: true });
        await g.beat('w_walk');
      } else if (wall === 'call') {
        await g.say('papa', 'Mamma! Mamma!');
        await g.play(palm);
        g.beds({ sea_in: 0.3, wind: 0.1 }, 2);
        const out = g.told('w_call:out'), jar = g.told('w_call:jar');
        const call = g.beat('w_call');
        await out;
        g.mood('mama', 'tired');
        await g.say('mama', 'I only lay down for a moment under the apple tree');
        await jar;
        if (g.state.marks.promise === 'term') await g.say('mama', 'Two more nights');
        await call;
      } else {
        g.sound.cup();
        await g.beat('w_wait');
        await g.play(dust);
        const son = g.told('w_wait_son:son'), hush = g.told('w_wait_son:hush'), cup = g.told('w_wait_son:cup'), beside = g.told('w_wait_son:beside');
        const rest = g.beat('w_wait_son');
        await son;
        await g.say('troll', 'Pappa, I…');
        await hush;
        await g.say('papa', 'Shh. Later');
        await cup;
        g.sound.cup();
        g.beds({ sea_in: 0.3, wind: 0.1 }, 3);
        await beside;
        g.mood('papa', 'smile');
        await g.say('papa', 'And I found a line here, by the way. The old keeper’s. By myself, under the dust');
        await g.wait(1500);
        await g.say('mama', 'How good that you noticed');
        await rest;
      }
      g.apply('wall');
    },
    // 3.5–3.6: night 2; ⚑ the hand on the lantern
    async g => {
      const { night1, wall } = g.state.choices, given = g.state.scales.groke > 0;
      const near = { groke_at: given ? 'closest' : 'near' };
      g.scale('paraffin', -1);
      g.beds({ sea: 0.4, wind: 0.12 });
      on(g, 'night2:sat', () => g.sound.howl({ far: true }));
      await g.scene(SCENES.shore, { beat: 'night2', here: ['groke'], keys: { ...isle(24, 'night'), ...near } });
      g.title(tr('Night 2, 24/25 August'));
      await g.beat('night2');
      // (up top the camp bed is empty: “I sleep by the lamp” broken)
      if (night1 === 'lamp' && wall !== 'walk') {
        g.beds({ wind: 0.3, sea: 0.15 });
        await g.scene(SCENES.top, { beat: 'shot_cot', here: [], keys: { ...isle(24, 'night'), cot: 'empty' } }, { cut: true });
        await g.beat('shot_cot');
        g.note(tr('Up top the camp bed is empty: “I sleep by the lamp” is broken.'));
      }
      const top = wall === 'walk';
      if (top) {
        g.beds({ sea_in: 0.3, wind: 0.1 });
        await g.scene(SCENES.room, { beat: 'n2_walk', here: ['mama'], moods: { mama: 'tired' }, keys: { ...isle(24, 'night'), lantern_at: 'none' } }, { cut: true });
        await g.beat('n2_walk');
        g.beds({ wind: 0.3, sea: 0.15 });
        on(g, 'n2_asleep:hatch', () => g.sound.creak());
        await g.scene(SCENES.top, { beat: 'n2_asleep', here: ['papa', 'troll'], moods: { papa: 'tired', troll: 'thinking' }, keys: isle(24, 'night') }, { cut: true });
        await g.beat('n2_asleep');
      } else {
        g.beds({ sea_in: 0.3, wind: 0.1 });
        const piece = wall === 'call' ? 'n2_call' : 'n2_wait';
        const low = wall === 'wait' ? g.told('n2_wait:low') : null;
        on(g, `${piece}:hand`, () => g.sound.creak());
        await g.scene(SCENES.room, { beat: piece, here: ['papa', 'mama', 'troll'], moods: { papa: 'tired', mama: 'tired', troll: 'thinking' },
          keys: { ...isle(24, 'night'), lantern_at: 'table', cups: wall === 'wait' ? 1 : 0 } }, { cut: true });
        const n2 = g.beat(piece);
        if (wall === 'wait') {
          await low;
          await g.say('mama', 'Let it burn low. Somebody’s howling');
        }
        await n2;
      }
      const night2 = await g.choose('night2', { 'troll#chest': [
        { id: 'sleep', label: tr('Don’t open your eyes') },
        { id: 'put', label: tr('“Where are you going? Put it back. I need it.”') },
        { id: 'follow', label: tr('Go after him') },
      ] });
      if (!top) g.set('beat_next', { sleep: 'n2_sleep', put: 'n2_put', follow: 'n2_follow' }[night2]);
      if (night2 === 'sleep') {
        if (!top) await g.beat('n2_sleep');
        await g.play(asleep);
        await g.beat(top ? 'n2_taken' : 'n2_sleep_gone');
        g.beds({ sea: 0.4, wind: 0.12 });
        await g.scene(SCENES.shore, { beat: 'gift', here: ['troll', 'groke'], moods: { troll: 'thinking' }, keys: { ...isle(24, 'night'), ...near, frost: given ? 0.2 : 0.3 } }, { cut: true });
        await g.beat('gift');
      } else if (night2 === 'put') {
        await g.say('papa', 'Where are you going? Put it back. I need it');
        g.mood('troll', 'sad');
        if (top) {
          const read = g.told('n2_read:read');
          const reading = g.beat('n2_read');
          await read;
          if (g.state.scales.lamp === 0) await g.say('papa', '“In wind, warm the burner with paraffin till the flame turns blue. Do not let go before.”');
          else await g.say('papa', '“The oil is thick: warm it in a pan on the stove, carry it wrapped. On a quiet evening the warm oil runs by itself; in wind — only with paraffin.”');
          g.scale('lamp', 1);
          await reading;
        } else await g.beat('n2_put');
        if (g.state.marks.promise === 'ask') g.note(tr('“I won’t ask” is broken.'));
      } else {
        await g.beat(top ? 'n2_taken' : 'n2_follow');
        g.beds({ sea: 0.4, wind: 0.12 });
        await g.scene(SCENES.shore, { beat: 'follow_start', here: ['papa', 'troll', 'groke'], moods: { papa: 'thinking', troll: 'sad' }, keys: { ...isle(24, 'night'), ...near } }, { cut: true });
        await g.beat('follow_start');
        await g.play(after);
        await g.beat('follow_end');
        if (night1 === 'lamp' && wall === 'walk') {
          g.beds({ wind: 0.3, sea: 0.15 });
          await g.scene(SCENES.top, { beat: 'shot_cot', here: [], keys: { ...isle(24, 'night'), cot: 'empty' } }, { cut: true });
          await g.beat('shot_cot');
          g.note(tr('Up top the camp bed stays empty till morning: “I sleep by the lamp” is broken.'));
        }
        g.beds({ sea_in: 0.3, wind: 0.1 });
        const my = g.told('n2_morning:my');
        await g.scene(SCENES.room, { beat: 'n2_morning', here: ['papa', 'my'], moods: { papa: 'tired', my: 'smile' }, keys: { ...isle(25, 'morning', 0.2), lantern_at: 'table', flame: 'out' } });
        const morning = g.beat('n2_morning');
        await my;
        if (g.state.marks.promise === 'ask') {
          await g.say('my', 'You promised not to ask');
          await g.say('papa', 'I didn’t ask');
        } else await g.say('my', 'Spy');
        await morning;
      }
      g.apply('night2');
    },
  ],
};
