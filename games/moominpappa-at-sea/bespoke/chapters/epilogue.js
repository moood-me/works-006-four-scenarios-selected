// Epilogue (scenario §5, §10). 27 August, the second quiet day. What the camera passes in every finale, by the play's
// marks (the scenes' common shots); then the ending the three hinges decide (story.js facts): “The Beam” (the
// Lighthouse), “A Boat to the Valley” (Home), “A Pie on the Cape” (the Shore), “Halfway up the Stair” (holding the
// incompatible) — each full, or late (decided only in the storm).
// Scenes: the common shots — the room, the landing, the middle, the cape, the shore, the lantern room; the finales —
// the lantern room and the beam's way (the room, the landing, the cape, the shore); the room, the landing, the sea, the
// shore going home; the room and the cape at the pie; the landing, the lantern room and the room's stair.
// Reads: everything (facts). Leaves: nothing.
import { SCENES, facts, isle, land, moon, on } from '../story.js';
import { beam, mooring, pie, bread, matches, stair } from '../minigames/all.js';

// the room on the 27th (look: the hour): the storm's damage gone, the lantern empty; Mama — at the table, or in the
// garden on the wall (her figure under the apple tree, the table empty)
const room = (look, f, keys = {}) => ({ ...isle(27, look), lantern_at: 'table', flame: 'out', basket: f.basket, wall_mama: f.wall === 'walk' ? 1 : 0, ...keys });
// the shore on the morning after night 3 (scenario 4.7): the dark circle where she sat with the boy, or her white track
// into the sea; the hollow on the dune where Papa sat
const sand = f => (f.night3 === 'right' ? { groke_at: 'water', track: 1, frost: 0.3 } : { warm: 1, frost: 0.3, dune_dent: f.night3 === 'dune' });
// how the Fisherman takes Papa in the end, by how Papa first came to him (1.7)
const MARK = { keeper: 'keeper', invite: 'invited', sit: 'sat' };

export default {
  number: '', title: tr('Epilogue'),
  titles: ['What the Camera Passes', 'The Finale'],
  choices: [],
  steps: [
    // the common shots (§10), by the marks
    async g => {
      const f = facts(g.state), m = g.state.marks;
      // one shot of a scene: opened on it, held to its end
      const shot = async (folder, beat, keys = {}, here = []) => {
        await g.scene(folder, { beat, here, keys }, { cut: true });
        await g.beat(beat);
      };
      g.beds({ sea_in: 0.25 });
      await g.scene(SCENES.room, { beat: 'shot_wall', here: f.wall === 'walk' ? [] : ['mama'], keys: room('morning', f, { cups: f.wall === 'wait' ? 2 : 1 }) });
      g.title(tr('27 August'));
      await g.beat('shot_wall');
      await shot(SCENES.room, 'shot_table', room('morning', f, { cups: f.wall === 'wait' ? 2 : 1 }), f.wall === 'walk' ? [] : ['mama']);
      g.beds({ sea: 0.3, wind: 0.08 });
      await shot(SCENES.landing, 'look_marks', { ...land(27, 'morning'), pines: 1, boat: 'tarred', driftwood: true, cleft: f.day === 'weed' ? 'sprout' : 'empty' });
      if (f.day === 'pool') await shot(SCENES.middle, 'rope_shot', { ...isle(27, 'morning'), coil: true });
      if (m.son_later) await shot(SCENES.middle, 'ring_shot', { ...isle(27, 'morning'), ring: 'one_missing' });
      await shot(SCENES.cape, 'look_fisher', { ...land(27, 'morning'), fisher_mark: MARK[f.fisher],
        net: f.day === 'fisher' ? (f.fisher === 'sit' ? 'mended' : 'folded') : 'dry' }, ['fisher']);
      await shot(SCENES.shore, 'morning', { ...isle(27, 'morning'), ...sand(f), troll_at: f.night3 === 'go' ? 'beside' : 'far' }, f.night3 === 'right' ? ['troll'] : ['troll', 'groke']);
      await shot(SCENES.shore, 'look_son', { ...isle(27, 'morning'), ...sand(f), glance: f.glance }, ['troll']);
      if (f.night1 === 'lamp') {
        g.beds({ wind: 0.25, sea: 0.15 });
        await shot(SCENES.top, 'shot_cot', { ...isle(27, 'morning'), cot: f.lampKept ? 'taken' : 'empty' });
      }
    },
    // the finale
    async g => {
      const f = facts(g.state);
      // (Mama unpacks her basket: the term given and not kept)
      const unpack = async () => {
        g.beds({ sea_in: 0.25 });
        await g.scene(SCENES.room, { beat: 'unpack', here: ['mama'], moods: { mama: 'neutral' }, keys: room('morning', f, { wall_mama: 0, basket: true }) });
        await g.beat('unpack');
      };
      if (f.ending === 'beam') {
        if (f.basket) await unpack();
        g.beds({ wind: 0.25, sea: 0.25 });
        const week = !(f.lit && f.form === 'full'), my = g.told('e_write:my');
        await g.scene(SCENES.top, { beat: 'e_write', here: week ? ['papa', 'my'] : ['papa'], moods: { papa: 'smile', my: 'smile' },
          keys: { ...isle(27, 'night'), lenses: 1, flame: 'lit', cot: f.night1 === 'lamp' ? (f.lampKept ? 'taken' : 'empty') : f.form === 'late' ? 'taken' : 'none' } }, { cut: !f.basket });
        g.title(tr('The Beam')).then(() => week && g.title(tr('A week later')));
        const write = g.beat('e_write');
        if (week) {
          await my;
          await g.say('my', 'It’s you who can’t');
          await g.say('papa', 'I can now');
        }
        await write;
        if (week && f.form === 'late') {
          // (all week Papa sleeps up top; every evening Mama puts his cup on the table, and by morning it is full)
          g.beds({ sea_in: 0.2 });
          await g.scene(SCENES.room, { beat: 'shot_table', here: [], keys: room('night', f, { wall_mama: 0, cups: 1, tea: 1 }) }, { cut: true });
          await g.beat('shot_table');
          g.beds({ wind: 0.25, sea: 0.25 });
          await g.scene(SCENES.top, { beat: 'e_write', here: ['papa'], moods: { papa: 'smile' }, keys: { ...isle(27, 'night'), lenses: 1, flame: 'lit', cot: 'taken' } }, { cut: true });
          await g.beat('e_write');
        }
        await g.play(beam);
        // the beam passes each: Mama, My on a rock, the Fisherman on the cape, the shore — and My at the wall
        g.beds({ sea_in: 0.2 });
        await g.scene(SCENES.room, { beat: 'e_beam', here: f.wall === 'walk' ? [] : ['mama'], moods: { mama: 'neutral' },
          keys: room('night', f, { cups: f.wall === 'wait' ? 2 : 1, apple_leaves: f.wall !== 'call' }) }, { cut: true });
        await g.beat('e_beam');
        g.beds({ sea: 0.3, wind: 0.1 });
        const lit = { beam: 1, lighthouse_lit: 1 };
        await g.scene(SCENES.landing, { beat: 'beam_pass', here: ['my'], keys: { ...land(27, 'night'), ...lit, pines: 1, boat: 'tarred' } }, { cut: true });
        await g.beat('beam_pass');
        await g.scene(SCENES.cape, { beat: 'beam_pass', here: ['fisher'], keys: { ...land(27, 'night'), ...lit } }, { cut: true });
        await g.beat('beam_pass');
        await g.scene(SCENES.shore, { beat: 'beam', here: f.night3 === 'right' ? ['troll'] : ['troll', 'groke'],
          keys: { ...isle(27, 'night'), ...lit, ...sand(f), troll_at: f.night3 === 'right' ? 'far' : 'beside' } }, { cut: true });
        await g.beat('beam');
        g.beds({ sea_in: 0.2 });
        const read = g.told('e_beam_my:my'), out = g.told('e_beam_my:window');
        await g.scene(SCENES.room, { beat: 'e_beam_my', here: ['my'], moods: { my: 'smile' }, keys: room('night', f, { line27: 'clean' }) }, { cut: true });
        const beamMy = g.beat('e_beam_my');
        await read;
        await g.say('my', '“I am forty today. Nobody knows.” Ha. I know');
        await out;
        await g.say('narrator', 'The lighthouse shone far. For everyone who was at sea');
        await beamMy;
      } else if (f.ending === 'boat') {
        g.beds({ sea_in: 0.25 });
        await g.scene(SCENES.room, { beat: 'e_basket', here: ['mama'], moods: { mama: 'smile' }, keys: room('morning', f, { wall_mama: 0, basket: true, garden: f.form === 'late' ? 4 : g.state.scales.garden }) });
        g.title(tr('A Boat to the Valley'));
        await g.beat('e_basket');
        g.beds({ sea: 0.35, wind: 0.08 });
        on(g, 'leave:key', () => g.sound.creak());
        await g.scene(SCENES.landing, { beat: 'leave', here: ['papa', 'mama', 'troll', 'my'], moods: { papa: 'smile', mama: 'smile', troll: 'sad' },
          keys: { ...land(27, 'morning'), pines: 1, boat: 'tarred', bundles: 'none' } }, { cut: true });
        await g.beat('leave');
        await g.play(mooring);
        g.set('mooring', 1);
        await g.beat('cast_off');
        g.beds({ sea: 0.45, gale: 0.15 });
        const going = { ...moon(27), glance: f.glance };
        const term = g.told('home:term'), my = g.told('home:my');
        await g.scene(SCENES.sea, { beat: 'home', here: ['papa', 'mama', 'troll', 'my'], moods: { papa: 'smile', mama: 'smile', troll: 'sad' }, keys: going }, { cut: true });
        const home = g.beat('home');
        await term;
        if (f.termKept) {
          await g.say('mama', 'Full moon');
          await g.say('papa', 'The captain keeps his word');
          await g.say('my', 'The captain didn’t light it');
        }
        await my;
        await g.say('my', 'That’s not how it was');
        await home;
        g.beds({ sea: 0.3, wind: 0.05 });
        await g.scene(SCENES.shore, { beat: 'morning', here: f.night3 === 'go' ? ['groke'] : [], keys: { ...isle(27, 'morning'), ...sand(f) } }, { cut: true });
        await g.beat('morning');
        if (f.wall === 'walk') {
          // (a moment: Mama under the apple tree on the wall, the table empty)
          g.beds({ sea_in: 0.2 });
          await g.scene(SCENES.room, { beat: 'shot_table', here: [], keys: room('morning', f, { cups: 0 }) }, { cut: true });
          await g.beat('shot_table');
        }
        g.beds({ sea: 0.35, wind: 0.08 });
        await g.scene(SCENES.landing, { beat: 'fisher_door', here: ['fisher'], keys: { ...land(27, 'morning'), pines: 1, boat: 'away', fisher_hand: f.fisher === 'invite' } }, { cut: true });
        await g.beat('fisher_door');
        g.beds({ sea: 0.45, gale: 0.15 });
        await g.scene(SCENES.sea, { beat: 'last', here: ['papa', 'mama', 'troll', 'my'], moods: { papa: 'smile', mama: 'smile', troll: 'sad' }, keys: going }, { cut: true });
        await g.beat('last');
      } else if (f.ending === 'pie') {
        if (f.basket) await unpack();
        g.beds({ sea_in: 0.25, fire: f.form === 'full' ? 0.25 : 0 });
        const story = g.told('e_story:story');
        await g.scene(SCENES.room, { beat: 'e_story', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', mama: 'smile', my: 'smile', troll: 'neutral' },
          keys: room('morning', f, { wall_mama: 0, cups: 2, tea: 1 }) }, { cut: !f.basket });
        g.title(tr('A Pie on the Cape'));
        const told = g.beat('e_story');
        g.set('beat_next', f.form === 'full' ? 'e_pie' : 'e_late');
        await story;
        await g.say('papa', 'A wave — higher than the lighthouse. And we sit there. Like two rocks');
        await g.say('my', 'You’ve told that one');
        await g.say('papa', 'Yesterday it wasn’t like that');
        if (f.form === 'full') {
          await g.say('papa', 'Today is his birthday');
          await g.say('my', 'At last');
        }
        await told;
        if (f.form === 'full') {
          await g.beat('e_pie');
          g.beds({ sea: 0.4, wind: 0.08 });
          await g.scene(SCENES.cape, { beat: 'pie_way', here: ['fisher', 'papa', 'my'], moods: { papa: 'smile', fisher: 'neutral' }, keys: land(27, 'night') });
          await g.beat('pie_way');
          await g.play(pie);
          g.set('carry', 1);
          const sea = g.told('pie:sea');
          const set = g.beat('pie');
          await sea;
          await g.say('fisher', 'The sea is good today');
          await set;
          await g.play(matches);
          if (f.spoke) {
            const no = g.told('matches_palm:no');
            const palm = g.beat('matches_palm');
            await no;
            await g.say('fisher', 'No need');
            await palm;
          } else await g.beat('matches_stone');
          if (f.night3 !== 'dune') {
            // (each in a corner of their own: the boy on the shore — by the Groke, or alone by the water)
            await g.scene(SCENES.shore, { beat: 'corner', here: f.night3 === 'go' ? ['troll', 'groke'] : ['troll'],
              keys: { ...isle(27, 'night'), ...sand(f), troll_at: f.night3 === 'go' ? 'beside' : 'far' } }, { cut: true });
            await g.beat('corner');
          }
          const up = g.told('pie_leave:up'), go = g.told('pie_leave:go');
          await g.scene(SCENES.cape, { beat: 'pie_leave', here: ['fisher', 'papa', 'mama', 'my'], moods: { papa: 'smile', fisher: 'neutral', mama: 'tired' },
            keys: { ...land(27, 'night'), pie: true, matchbox: f.spoke ? 'palm' : 'stone', mama_at: f.night3 === 'go' ? 'apart' : 'beside' } }, { cut: f.night3 === 'dune' });
          const leaving = g.beat('pie_leave');
          await up;
          await g.say('mama', 'I’ll go and wash the tin');
          await go;
          await g.say('papa', 'Go on, go on');
          await leaving;
          if (f.spoke) {
            await g.scene(SCENES.landing, { beat: 'threshold', here: ['fisher', 'papa'], keys: { ...land(27, 'night'), pines: 1, boat: 'tarred' } }, { cut: true });
            await g.beat('threshold');
          } else await g.beat('stone_empty');
          g.beds({ sea_in: 0.2 });
          const piece = f.wall === 'walk' ? 'e_home_away' : 'e_home_was';
          await g.scene(SCENES.room, { beat: piece, here: f.wall === 'walk' ? [] : ['mama'], moods: { mama: 'tired' }, keys: room('night', f, { wall_mama: 0 }) });
          await g.beat(piece);
        } else {
          const log = g.told('e_late:log'), my = g.told('e_late:my');
          const late = g.beat('e_late');
          await log;
          await g.say('papa', '“27 August. Quiet.”');
          await my;
          await g.say('my', '“I am forty today. Nobody knows.” Forty! Old!');
          g.mood('my', 'laugh');
          await late;
          if (f.sheets === 2) {
            g.beds({ wind: 0.2, sea: 0.2 });
            await g.scene(SCENES.top, { beat: 'e_light', here: ['papa'], moods: { papa: 'thinking' }, keys: { ...isle(27, 'dusk'), pot: true } }, { cut: true });
            await g.beat('e_light');
          }
          g.beds({ sea: 0.4, wind: 0.08 });
          await g.scene(SCENES.cape, { beat: 'bread_way', here: ['fisher', 'papa'], moods: { papa: 'thinking', fisher: 'neutral' },
            keys: { ...land(27, 'night'), beam: f.sheets === 2 ? 1 : 0, lighthouse_lit: f.sheets === 2 ? 1 : 0 } });
          await g.beat('bread_way');
          await g.play(bread);
          g.set('carry', 1);
          const line = g.told('bread_take:line'), more = g.told('bread_take:more');
          const take = g.beat('bread_take');
          await line;
          await g.say('fisher', 'You shouldn’t have');
          if (f.spoke) {
            await more;
            await g.say('fisher', 'Tomorrow will be quiet too');
          }
          await take;
          await g.play(matches);
          await g.beat('matches_stone');
          g.beds({ sea_in: 0.2 });
          const piece = f.wall === 'walk' ? 'e_home_away' : 'e_home_was';
          await g.scene(SCENES.room, { beat: piece, here: f.wall === 'walk' ? [] : ['mama'], moods: { mama: 'tired' }, keys: room('night', f, { wall_mama: 0, log: 2, line27: 'stripe' }) });
          await g.beat(piece);
          await g.scene(SCENES.room, { beat: 'shot_wall', here: [], keys: room('night', f, { log: 2, line27: 'stripe' }) }, { cut: true });
          await g.beat('shot_wall');
          g.beds({ sea: 0.3, wind: 0.05 });
          await g.scene(SCENES.cape, { beat: 'box_shot', here: [], keys: { ...land(27, 'night'), matchbox: 'stone' } }, { cut: true });
          await g.beat('box_shot');
        }
      } else {
        g.beds({ sea: 0.3, wind: 0.05 });
        await g.scene(SCENES.landing, { beat: 'mooring_touch', here: ['papa'], moods: { papa: 'thinking' }, keys: { ...land(27, 'morning'), pines: 1, boat: 'tarred' } });
        g.title(tr('Halfway up the Stair'));
        await g.beat('mooring_touch');
        if (f.sheets === 2) {
          g.beds({ wind: 0.2, sea: 0.2 });
          await g.scene(SCENES.top, { beat: 'e_light', here: ['papa'], moods: { papa: 'thinking' }, keys: { ...isle(27, 'dusk'), pot: true } }, { cut: true });
          await g.beat('e_light');
        }
        g.beds({ sea_in: 0.2 });
        const story = g.told('e_stair:story'), everywhere = g.told('e_stair:everywhere');
        await g.scene(SCENES.room, { beat: 'e_stair', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'neutral', my: 'smile', troll: 'neutral' },
          keys: room('day', f, { wall_mama: 0, lantern_at: f.night1 === 'turns' ? 'stair' : 'table', clouds: f.wall !== 'call', cups: 1, tea: 1 }) });
        const stairs = g.beat('e_stair');
        await story;
        await g.say('papa', 'Up top and down below. The captain is in time everywhere');
        await everywhere;
        await g.say('mama', 'You were everywhere');
        await stairs;
        await g.play(stair);
        const step = g.told('e_step:step');
        const sit = g.beat('e_step');
        await step;
        await g.say('narrator', 'Papa sat on the stair. The sea was silent');
        await sit;
      }
    },
  ],
};
