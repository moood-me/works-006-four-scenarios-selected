// IV. The Storm (scenario §5, 4.1–4.7). Morning: the boat pulled up, “with one paw”, and My says at table what Papa does
// not know; the oil warmed (with two sheets); the storm comes; ⚑ where Papa is in the storm (hinge 3); dawn, the sea
// smooth; night 3 — no light anywhere, the boy at the door: ⚑ the paw on his shoulder.
// Scenes: the landing (storm_coming, boat_up) and the room (breakfast); the room (oil); the room in the storm, the cape
// through its window; the room (storm_moon, the choice, st_*), the lantern room, the landing and the cape in the storm;
// the room and the landing at the calm dawn; night 3 — the shore (wide), the room (night3), the shore by its branch.
// Reads: choices.wall, night1, night2, fisher, tell; scales.garden, lamp, groke; marks.promise, son_closed, son_knows,
// son_later, mama_heard. Leaves: choices.storm, night3; scales.paraffin; marks.mama_heard, fisher_spoke.
import { SCENES, facts, isle, land, on } from '../story.js';
import { boat, burner, hold, rocks, both, shoulder, keep, beside } from '../minigames/all.js';

// the round room in the storm (4.3–4.4): the stove flooded, steam, the floor wet, the door not staying shut
const STORM = { ...isle(25, 'night', 1), stove: 'flooded', steam: 1, wet: true, door: 0.15, lantern_at: 'table', flame: 'out', firewood: false };
// the lantern room in the storm: the pan of warm oil there with two sheets
const top = g => ({ ...isle(25, 'night', 1), pot: g.state.scales.lamp === 2 });
// Mama ties the shutters as her garden stands (4.3): ≤ 1 — then holds Papa's sleeve; 2 — without a word; ≥ 3 — her palm
// on the painted gate
const shutters = garden => (garden <= 1 ? 'storm_sleeve' : garden === 2 ? 'storm_shutters' : 'storm_gate');

export default {
  number: 'IV', title: tr('The Storm'),
  titles: ['Morning', 'The Oil', 'The Storm Comes', 'Where Papa Is', 'Dawn', 'Night 3'],
  choices: [
    { id: 'storm', weight: '⚑', title: tr('Where Papa is in the storm'), options: [{ id: 'light', label: tr('Light the lighthouse') }, { id: 'door', label: tr('Hold the door with everyone') }, { id: 'cape', label: tr('To the Fisherman on the cape') }, { id: 'both', label: tr('The burner — and run down') }] },
    { id: 'night3', title: tr('Night 3: the paw on his shoulder'), options: [{ id: 'go', label: tr('“Let him go”') }, { id: 'right', label: tr('“Mama is right”') }, { id: 'dune', label: tr('“As far as the dune”') }] },
  ],
  steps: [
    // 4.1: the boat pulled up; breakfast, and what My says
    async g => {
      const { night1, night2, wall } = g.state.choices, m = g.state.marks;
      g.beds({ sea: 0.6, wind: 0.4 });
      const sky = g.told('storm_coming:sky');
      await g.scene(SCENES.landing, { beat: 'storm_coming', here: ['papa', 'troll'], moods: { papa: 'thinking', troll: 'neutral' },
        keys: { ...land(25, 'morning', 0.35), pines: 1, troll_at: m.son_closed ? 'boat_far' : 'boat' } });
      g.title(tr('25 August'));
      const coming = g.beat('storm_coming');
      await sky;
      await g.say('papa', 'There’s going to be a storm');
      await coming;
      await g.play(boat);
      g.set('boat_up', 1);
      await g.beat('boat_up');
      g.beds({ sea_in: 0.4, wind: 0.3 });
      const boast = g.told('breakfast:boast'), said = g.told('breakfast:my');
      await g.scene(SCENES.room, { beat: 'breakfast', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', mama: 'neutral', my: 'smile', troll: 'neutral' },
        keys: { ...isle(25, 'morning', 0.35), lantern_at: 'table', flame: 'out', cups: 2, tea: 1 } }, { cut: true });
      const breakfast = g.beat('breakfast');
      await boast;
      await g.say('papa', 'With one paw, you might say. Against the wind');
      await said;
      await g.say('my', 'He pulled too');
      // what My says in front of everyone (4.1): where the boy goes, if Papa doesn't know; else where Mama was
      const first = night1 === 'son' || night1 === 'turns', second = night2 === 'sleep';
      let leaves = false;
      if (night2 !== 'follow') {
        if (first && second) await g.say('my', 'Your son takes the lantern to the Groke. Every night');
        else if (first) await g.say('my', 'Your son took the lantern to the Groke. The one you left him');
        else if (second && m.son_knows) await g.say('my', 'Your son took the lantern to the Groke last night. And you watched and lay there');
        else if (second) await g.say('my', 'Your son took the lantern to the Groke last night. And you snored. Pretending');
        else await g.say('my', 'Your son goes to the Groke at night. Without a lantern. He sits there and freezes');
        leaves = true;
      } else if (wall === 'walk') {
        await g.say('my', 'Mama was in the wall all day yesterday. She came out when you weren’t there');
        await g.say('mama', 'My');
      } else g.mood('my', 'smile');
      await breakfast;
      if (leaves) {
        await g.beat('breakfast_leave');
        g.mark('mama_heard', true, tr('Mama knows where the boy goes at night.'));
      }
    },
    // 4.2: the oil warmed — only with two sheets
    async g => {
      if (g.state.scales.lamp < 2) return;
      g.beds({ sea_in: 0.4, wind: 0.5, fire: 0.35 });
      const up = g.told('oil:up'), bread = g.told('oil:bread');
      await g.scene(SCENES.room, { beat: 'oil', here: ['papa', 'mama', 'my'], moods: { papa: 'thinking', mama: 'neutral', my: 'disgusted' },
        keys: { ...isle(25, 'dusk', 0.45), stove: 'fire', firewood: false, lantern_at: 'table' } });
      const oil = g.beat('oil');
      await up;
      await g.say('mama', 'All right');
      await bread;
      await g.say('my', 'Bread again');
      await oil;
    },
    // 4.3: the storm comes
    async g => {
      const garden = g.state.scales.garden;
      g.beds({ storm: 0.5, sea_in: 0.3, wind: 0.4 });
      const flood = g.told('storm:flood');
      on(g, 'storm:door', () => g.sound.door());
      on(g, 'storm:glass', () => g.sound.glass());
      await g.scene(SCENES.room, { beat: 'storm', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'afraid', my: 'laugh', troll: 'afraid' },
        keys: STORM });
      const storm = g.beat('storm');
      await flood;
      g.sound.splash(1);
      await g.say('mama', 'The stove’s flooded');
      await storm;
      // (through the window: the cape — the Fisherman under the wave)
      g.beds({ storm: 0.8, wind: 0.5 });
      on(g, 'under_wave:wave', () => g.sound.wave(1));
      await g.scene(SCENES.cape, { beat: 'under_wave', here: ['fisher'], keys: land(25, 'night', 1) }, { cut: true });
      g.each('flash:strike', () => g.sound.thunder(0.8));
      await g.beat('under_wave');
      g.beds({ storm: 0.5, sea_in: 0.3, wind: 0.4 });
      await g.scene(SCENES.room, { beat: shutters(garden), here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'afraid', my: 'laugh', troll: 'afraid' },
        keys: STORM }, { cut: true });
      await g.beat(shutters(garden));
    },
    // 4.4: ⚑ where Papa is in the storm
    async g => {
      const { wall, fisher } = g.state.choices;
      g.beds({ storm: 0.5, sea_in: 0.3, wind: 0.4 });
      const moon = g.told('storm_moon:moon');
      await g.scene(SCENES.room, { beat: 'storm_moon', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'afraid', my: 'laugh', troll: 'afraid' },
        keys: { ...STORM, shutters: true, mama_to: wall === 'walk' ? 'apple' : 'papa' } }, { cut: true });
      const looking = g.beat('storm_moon');
      await moon;
      if (g.state.marks.promise === 'term') await g.say('mama', 'Full moon');
      await looking;
      const storm = await g.choose('storm', { 'papa#chest': [
        { id: 'light', label: tr('Light the lighthouse with the last of the paraffin') },
        { id: 'door', label: tr('Hold the door with everyone: “When it drops, we sail home.”') },
        { id: 'cape', label: tr('Go out to the cape, to the Fisherman') },
        { id: 'both', label: tr('Light the burner — and run down to the door') },
      ] });
      g.set('beat_next', storm === 'door' ? 'st_door' : 'st_go');
      g.scale('paraffin', -1);
      // Papa leaves the room: what is said, the last measure, what Mama says after him — nothing, if he did not notice
      // her in the wall (and later, to the wall, “Well, there”), else “Be careful”
      const go = async () => {
        const asked = g.told('st_go:say'), fill = g.told('st_go:fill'), after = g.told('st_go:after');
        const leaving = g.beat('st_go');
        if (storm === 'cape') {
          await asked;
          await g.say('papa', 'Man overboard. The captain is going');
          await g.say('my', 'Have you gone mad?');
          await g.say('mama', 'Where are you going, in such water?');
        }
        await fill;
        g.sound.pour();
        await after;
        if (wall === 'walk') await g.say('mama', 'Well, there', 'wall_a#garden');
        else await g.say('mama', 'Be careful out there');
        await leaving;
      };
      // below, Mama alone with the children holds the door
      const left = async () => {
        g.beds({ storm: 0.5, sea_in: 0.3, wind: 0.4 });
        await g.scene(SCENES.room, { beat: 'st_left', here: ['mama', 'my', 'troll'], moods: { mama: 'afraid', my: 'surprised', troll: 'afraid' },
          keys: { ...STORM, shutters: true, lantern_at: storm === 'cape' ? 'none' : 'table' } }, { cut: true });
        await g.beat('st_left');
      };
      if (storm === 'light') {
        await go();
        g.beds({ storm: 0.9, wind: 0.6 });
        const shout = g.told('st_gallery:shout'), wave = g.told('st_gallery:wave'), sheets = g.told('st_gallery:sheets');
        await g.scene(SCENES.top, { beat: 'st_gallery', here: ['papa'], moods: { papa: 'angry' }, keys: top(g) }, { cut: true });
        const gallery = g.beat('st_gallery');
        await shout;
        await g.say('papa', 'You won’t take it! Do you hear? You won’t take it!');
        await wave;
        g.sound.wave(1);
        g.sound.glass();
        await sheets;
        const n = g.state.scales.lamp;
        if (n === 2) await g.say('papa', 'The oil is warm. Till it turns blue');
        else if (n === 1) await g.say('papa', 'Till it turns blue');
        else await g.say('papa', 'Well. Come on');
        await gallery;
        await g.play(burner);
        g.sound.flare(1);
        if (facts(g.state).lit) {
          on(g, 'st_lit:laugh', () => g.mood('papa', 'laugh'));
          await g.beat('st_lit');
          await g.scene(SCENES.cape, { beat: 'beam_cape', here: ['fisher'], keys: { ...land(25, 'night', 1), beam: 1, lighthouse_lit: 1 } }, { cut: true });
          g.each('flash:strike', () => g.sound.thunder(0.8));
          await g.beat('beam_cape');
        } else {
          on(g, 'st_out:flash', () => { g.mood('papa', 'sad'); g.sound.thunder(1); });
          await g.beat('st_out');
        }
        await left();
      } else if (storm === 'door') {
        on(g, 'st_door:fill', () => g.sound.pour());
        const order = g.told('st_door:order');
        const doorway = g.beat('st_door');
        await order;
        await g.say('papa', 'When it drops, we sail home');
        if (g.state.marks.promise === 'term') await g.say('papa', 'The captain remembers');
        await doorway;
        await g.play(hold);
        const told = g.told('st_door_sat:told'), home = g.told('st_door_sat:home');
        on(g, 'st_door_sat:flash', () => g.sound.thunder(0.8));
        const sat = g.beat('st_door_sat');
        await told;
        await g.say('my', 'You’ve told that one');
        await home;
        if (wall === 'walk') await g.say('mama', 'I want to go home', 'wall_a#apple');
        else {
          await g.say('mama', 'I want to go home');
          await g.say('mama', 'Pass me the blanket');
        }
        await sat;
      } else if (storm === 'cape') {
        await go();
        g.beds({ storm: 0.9, wind: 0.6 });
        await g.scene(SCENES.landing, { beat: 'out_storm', here: ['papa'], moods: { papa: 'angry' }, keys: land(25, 'night', 1) }, { cut: true });
        g.each('flash:strike', () => g.sound.thunder(0.8));
        await g.beat('out_storm');
        await g.scene(SCENES.cape, { beat: 'crossing', here: ['fisher', 'papa'], moods: { papa: 'angry', fisher: 'neutral' }, keys: { ...land(25, 'night', 1), net: 'knot' } }, { cut: true });
        g.each('flash:strike', () => g.sound.thunder(0.8));
        await g.beat('crossing');
        await g.play(rocks);
        const out = g.told('blown:out');
        const blown = g.beat('blown');
        await out;
        await g.say('papa', 'You won’t get me!');
        await blown;
        g.mood('papa', 'thinking');
        on(g, 'sleeve:wave', () => g.sound.wave(1));
        await g.beat('sleeve');
        on(g, 'lightning:faces', () => g.sound.thunder(1));
        await g.beat('lightning');
        if (fisher === 'sit') {
          const line = g.told('spoke:line');
          const spoke = g.beat('spoke');
          await line;
          await g.say('fisher', 'On a night like this he ought to burn');
          await spoke;
          g.mark('fisher_spoke', true, tr('The Fisherman spoke to Papa.'));
        } else await g.beat('till_dawn');
        await left();
      } else {
        await go();
        g.beds({ storm: 0.9, wind: 0.6 });
        await g.scene(SCENES.top, { beat: 'st_both', here: ['papa'], moods: { papa: 'afraid' }, keys: top(g) }, { cut: true });
        await g.beat('st_both');
        await g.play(both);
        on(g, 'st_both_down:bang', () => g.sound.door());
        await g.beat('st_both_down');
        g.beds({ storm: 0.5, sea_in: 0.3, wind: 0.4 });
        await g.scene(SCENES.room, { beat: 'st_run', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'afraid', mama: 'afraid', my: 'surprised', troll: 'afraid' },
          keys: { ...STORM, shutters: true } }, { cut: true });
        await g.beat('st_run');
      }
      g.apply('storm');
    },
    // 4.5: dawn — the sea smooth
    async g => {
      const f = facts(g.state);
      g.beds({ sea_in: 0.2 });
      await g.scene(SCENES.room, { beat: 'calm', here: ['mama'], moods: { mama: 'tired' },
        keys: { ...isle(26, 'dawn'), wet: true, drip: 1, stove: 'flooded', lantern_at: 'table', flame: 'out', basket: g.state.marks.promise === 'term' } });
      g.title(tr('26 August'));
      await g.beat('calm');
      if (f.lit) {
        await g.scene(SCENES.top, { beat: 'burnt_out', here: [], keys: { ...isle(26, 'dawn'), flame: 'lit' } }, { cut: true });
        await g.beat('burnt_out');
      }
      g.beds({ sea: 0.35 });
      // Papa at the water by where he was in the storm: lit — “There, you see”; the lighthouse — silent; the cape —
      // crouching, his paw over the water; the door — a glance at the sea, and to the boat; both — not down at all
      const shore = { light: f.lit ? 'look' : 'silent', cape: 'crouch', door: 'glance', both: 'none' }[f.storm];
      const water = g.told('calm:water');
      await g.scene(SCENES.landing, { beat: 'calm', here: ['papa'], moods: { papa: 'tired' },
        keys: { ...land(26, 'dawn'), pines: 1, driftwood: true, boat: 'cracked', papa_shore: shore } }, { cut: true });
      const calm = g.beat('calm');
      await water;
      if (shore === 'look') await g.say('papa', 'There, you see');
      else if (shore === 'crouch') await g.say('papa', 'There, there. It’s all right');
      await calm;
      await g.beat('caulk');
    },
    // 4.6–4.7: night 3 — no light; ⚑ the paw on his shoulder
    async g => {
      const m = g.state.marks, given = g.state.scales.groke > 0;
      g.beds({ sea: 0.3, wind: 0.08 });
      on(g, 'wide:howl', () => g.sound.howl());
      await g.scene(SCENES.shore, { beat: 'wide', here: ['groke'], keys: { ...isle(26, 'night'), groke_at: given ? 'closest' : 'near', frost: 1 } });
      g.title(tr('Night 3, 26/27 August'));
      await g.beat('wide');
      // (the room after the storm: the stove dried out, the can and the lantern empty; Mama's basket by the door, if she
      // was given a term — 4.5)
      const room = { ...isle(26, 'night'), lantern_at: 'table', flame: 'out', drip: 0.3, basket: m.promise === 'term' };
      g.beds({ sea_in: 0.2 });
      const door = g.told('night3:door'), mama = g.told('night3:mama');
      await g.scene(SCENES.room, { beat: 'night3', here: ['papa', 'mama', 'troll'], moods: { papa: 'thinking', mama: 'sad', troll: 'neutral' },
        keys: { ...room, son_look: m.son_closed ? 'away' : m.son_knows ? 'papa' : 'none' } }, { cut: true });
      const night = g.beat('night3');
      await door;
      if (m.son_later) await g.say('troll', 'Later');
      await mama;
      if (m.mama_heard) {
        await g.say('mama', 'Without a lantern? She’ll freeze you');
        await g.say('troll', 'Let her');
      } else {
        await g.say('mama', 'Where are you going? To freeze again?');
        await g.say('troll', 'I need to');
      }
      await g.say('mama', 'Tell him');
      await night;
      const night3 = await g.choose('night3', { 'troll#chest': [
        { id: 'go', label: tr('“Let him go.”') },
        { id: 'right', label: tr('“Mama is right.”') },
        { id: 'dune', label: tr('“Come on. I’ll go with you as far as the dune.”') },
      ] });
      const shore = { ...isle(26, 'night'), groke_at: given ? 'closest' : 'near', frost: 1 };
      if (night3 === 'go') {
        await g.say('papa', 'Let him go');
        await g.play(shoulder);
        await g.beat('n3_go');
        g.beds({ sea: 0.3, wind: 0.08 });
        await g.scene(SCENES.shore, { beat: 'beside', here: ['troll', 'groke', 'mama'], moods: { troll: 'tired' }, keys: shore }, { cut: true });
        await g.beat('beside');
        await g.beat('blanket');
        g.beds({ sea_in: 0.2 });
        const line = g.told('n3_dawn:dawn');
        await g.scene(SCENES.room, { beat: 'n3_dawn', here: ['papa', 'mama', 'troll'], moods: { papa: 'thinking', mama: 'neutral', troll: 'tired' }, keys: { ...room, ...isle(27, 'dawn') } });
        const dawn = g.beat('n3_dawn');
        await line;
        await g.say('troll', 'She isn’t frightening. She’s just cold');
        await dawn;
      } else if (night3 === 'right') {
        await g.say('papa', 'Mama is right');
        await g.play(keep);
        await g.beat('n3_right');
        g.beds({ sea: 0.3, wind: 0.08 });
        on(g, 'leave:howl', () => g.sound.howl());
        await g.scene(SCENES.shore, { beat: 'leave', here: ['groke'], keys: shore }, { cut: true });
        await g.beat('leave');
        g.beds({ sea_in: 0.2 });
        await g.scene(SCENES.room, { beat: 'n3_cover', here: ['mama', 'troll'], moods: { mama: 'sad', troll: 'tired' }, keys: { ...room, ...isle(27, 'dawn') } });
        await g.beat('n3_cover');
      } else {
        await g.say('papa', 'Come on. I’ll go with you as far as the dune');
        await g.beat('n3_dune');
        g.beds({ sea: 0.3, wind: 0.08 });
        await g.scene(SCENES.shore, { beat: 'dune_start', here: ['papa', 'troll', 'groke'], moods: { papa: 'thinking', troll: 'neutral' }, keys: { ...shore, groke_at: 'edge' } }, { cut: true });
        await g.beat('dune_start');
        await g.play(beside);
        const own = g.told('dune_stop:say');
        const stop = g.beat('dune_stop');
        await own;
        await g.say('troll', 'I’ll go on by myself from here');
        await stop;
        await g.beat('dawn_beside');
        g.beds({ sea_in: 0.2 });
        on(g, 'n3_cups:cups', () => g.sound.cup());
        await g.scene(SCENES.room, { beat: 'n3_cups', here: ['mama'], moods: { mama: 'sad' }, keys: room }, { cut: true });
        await g.beat('n3_cups');
        g.beds({ sea: 0.3, wind: 0.08 });
        await g.scene(SCENES.shore, { beat: 'past', here: ['papa', 'troll', 'groke'], moods: { papa: 'thinking', troll: 'neutral' }, keys: { ...shore, ...isle(27, 'dawn'), groke_at: 'edge', warm: 1 } }, { cut: true });
        await g.beat('past');
      }
    },
  ],
};
