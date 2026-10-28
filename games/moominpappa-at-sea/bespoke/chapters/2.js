// II. The Lighthouse Is Dark (scenario §5, 2.1–2.7). The lantern room: thick oil, soot, the match — “He doesn't want
// to”; each to their own (the boy's ring of stones, the sea horses); ⚑ Papa's day; dusk; supper — one lantern, “Take
// it, take it”, the boy asks for it “for the whole night”; ⚑ whose lantern tonight (hinge 1), night 1.
// Scenes: the lantern room, the shore and the middle of the island (and the cape: the bread), Papa's day on the middle,
// the shore, the landing or the cape; the landing at dusk; the shore at dusk and the round room; night 1 — the room,
// the lantern room, the shore.
// Reads: choices.tell, boat, fisher; scales.garden, groke. Leaves: choices.day, night1; scales.garden, lamp, paraffin,
// groke; marks.promise, line27.
import { SCENES, isle, land, on } from '../story.js';
import { match, lead, armful, knot, steady, thread, lantern, half } from '../minigames/all.js';

export default {
  number: 'II', title: tr('The Lighthouse Is Dark'),
  titles: ['The Lantern Room', 'Each to Their Own', 'Papa’s Day', 'Dusk', 'Supper', 'Whose Lantern'],
  choices: [
    { id: 'day', title: tr('Papa’s day'), options: [{ id: 'pool', label: tr('Measure the pool') }, { id: 'weed', label: tr('Carry seaweed for Mama') }, { id: 'fisher', label: tr('Go to the Fisherman') }] },
    { id: 'night1', weight: '⚑', title: tr('Whose lantern tonight'), options: [{ id: 'lamp', label: tr('Up to the lamp') }, { id: 'mama', label: tr('Mama, with a term') }, { id: 'son', label: tr('The son, no questions') }, { id: 'turns', label: tr('By turns') }] },
  ],
  steps: [
    // 2.1–2.2: the lantern room; the match
    async g => {
      g.beds({ wind: 0.3, sea: 0.2 });
      await g.scene(SCENES.top, { beat: 'lamp_look', here: ['papa', 'my'], moods: { papa: 'thinking', my: 'smile' }, keys: isle(23, 'day') });
      g.gauge('lamp');
      await g.beat('lamp_look');
      await g.play(match);
      const out = g.told('smoke_out:out'), my = g.told('smoke_out:my');
      g.sound.flare(0.6);
      const smoke = g.beat('smoke_out');
      await out;
      await g.say('papa', 'He doesn’t want to');
      await my;
      await g.say('my', 'It’s you who can’t');
      g.mood('papa', 'angry');
      await g.say('papa', 'A lighthouse takes time!');
      await smoke;
    },
    // 2.3: each to their own
    async g => {
      g.beds({ sea: 0.5, wind: 0.12 });
      await g.scene(SCENES.shore, { beat: 'weed', here: ['mama'], moods: { mama: 'neutral' }, keys: isle(23, 'day') });
      await g.beat('weed');
      if (g.state.choices.fisher === 'invite') {
        await g.scene(SCENES.cape, { beat: 'bread', here: ['fisher', 'mama'], keys: land(23, 'day') }, { cut: true });
        await g.beat('bread');
      }
      g.beds({ wind: 0.2, sea: 0.2 });
      const set = g.told('ring:set');
      await g.scene(SCENES.middle, { beat: 'ring', here: ['troll', 'my'], moods: { troll: 'thinking' }, keys: isle(23, 'day') }, { cut: true });
      const ring = g.beat('ring');
      await set;
      await g.say('troll', 'Mine');
      await ring;
      g.beds({ sea: 0.5, wind: 0.12 });
      const crouch = g.told('seahorses:crouch');
      await g.scene(SCENES.shore, { beat: 'seahorses', here: ['troll'], moods: { troll: 'thinking' }, keys: isle(23, 'day') }, { cut: true });
      const seahorses = g.beat('seahorses');
      await crouch;
      await g.say('troll', 'How beautiful you are…');
      await seahorses;
      on(g, 'laugh:face', () => g.mood('troll', 'sad'));
      await g.beat('laugh');
    },
    // 2.4: ⚑ Papa's day
    async g => {
      g.beds({ wind: 0.2, sea: 0.2 });
      await g.scene(SCENES.middle, { beat: 'day', here: ['papa'], moods: { papa: 'thinking' }, keys: isle(23, 'day') });
      await g.beat('day');
      const day = await g.choose('day', { 'papa#chest': [
        { id: 'pool', label: tr('Measure the black pool') },
        { id: 'weed', label: tr('Carry seaweed for Mama') },
        { id: 'fisher', label: tr('Go to the Fisherman and ask about the lighthouse') },
      ] });
      if (day === 'pool') {
        g.set('beat_next', 'sound_ready');
        await g.beat('sound_ready');
        await g.play(lead);
        g.set('rope', 1);
        on(g, 'sound_after:look', () => g.mood('papa', 'surprised'));
        await g.beat('sound_after');
      } else if (day === 'weed') {
        g.beds({ sea: 0.5, wind: 0.12 });
        await g.scene(SCENES.shore, { beat: 'armful_load', here: ['papa', 'mama'], moods: { papa: 'smile', mama: 'neutral' }, keys: isle(23, 'day') }, { cut: true });
        await g.beat('armful_load');
        g.beds({ wind: 0.2, sea: 0.2 });
        await g.scene(SCENES.middle, { beat: 'armful_in', here: ['papa', 'troll'], moods: { papa: 'smile', troll: 'thinking' }, keys: { ...isle(23, 'day'), ring: 'set' } }, { cut: true });
        await g.beat('armful_in');
        await g.play(armful);
        on(g, 'armful_through:gone', () => g.mood('troll', 'sad'));
        await g.beat('armful_through');
        await g.beat('regather');
        g.beds({ sea: 0.5, wind: 0.15 });
        const packed = g.told('weed:packed'), laugh = g.told('weed:laugh');
        await g.scene(SCENES.landing, { beat: 'weed', here: ['papa', 'mama'], moods: { papa: 'smile', mama: 'neutral' }, keys: land(23, 'day') }, { cut: true });
        const weed = g.beat('weed');
        await packed;
        await g.say('mama', 'Nothing will grow here');
        await g.say('papa', 'It will for me');
        await laugh;
        g.mood('mama', 'laugh');
        await weed;
      } else {
        g.beds({ sea: 0.55, wind: 0.25 });
        const sat = g.state.choices.fisher === 'sit';
        await g.scene(SCENES.cape, { beat: sat ? 'net_sit' : 'net_left', here: ['fisher', 'papa'], moods: { papa: 'thinking', fisher: 'neutral' },
          keys: land(23, 'day') }, { cut: true });
        await g.beat(sat ? 'net_sit' : 'net_left');
        await g.play(knot);
        g.sound.rustle();
        if (sat) {
          const asked = g.told('net_ask:asked'), answer = g.told('net_ask:answer');
          const ask = g.beat('net_ask');
          await asked;
          await g.say('papa', 'Why isn’t he lit?');
          await answer;
          await g.say('fisher', 'He shines outward');
          await ask;
        } else await g.beat('net_taken');
      }
      if (day !== 'weed') {
        // (the evening: Mama back from the shore, wet, the basket empty)
        g.beds({ sea: 0.5, wind: 0.15 });
        await g.scene(SCENES.landing, { beat: 'wet_back', here: ['mama'], moods: { mama: 'tired' }, keys: land(23, 'dusk') });
        await g.beat('wet_back');
      }
      g.apply('day');
    },
    // 2.5: dusk
    async g => {
      g.beds({ sea: 0.6, wind: 0.2 });
      const stood = g.told('dusk:stood');
      on(g, 'beat:dusk', () => g.sound.splash(0.5));
      await g.scene(SCENES.landing, { beat: 'dusk', here: ['papa'], moods: { papa: 'thinking' }, keys: land(23, 'dusk') });
      const dusk = g.beat('dusk');
      await stood;
      if (g.state.choices.day !== 'weed') await g.say('papa', 'I’ll understand you. You’ll see');
      await dusk;
    },
    // 2.6: supper — one lantern
    async g => {
      const { boat, fisher } = g.state.choices;
      g.beds({ sea: 0.45, wind: 0.15 });
      await g.scene(SCENES.shore, { beat: 'dusk_sit', here: ['groke'], keys: { ...isle(23, 'dusk'), groke_at: boat === 'hold' ? 'near' : 'edge', track: boat === 'douse' ? 1 : 0 } });
      await g.beat('dusk_sit');
      g.beds({ sea_in: 0.35, wind: 0.12 });
      const sill = g.told('supper:sill'), hatch = g.told('supper:hatch');
      await g.scene(SCENES.room, { beat: 'supper', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'smile', my: 'smile', troll: 'thinking' },
        keys: { ...isle(23, 'dusk'), garden: -1, stove: 'cold', firewood: false } }, { cut: true });
      const supper = g.beat('supper');
      await sill;
      if (fisher === 'invite') await g.say('mama', 'The bread was taken');
      await hatch;
      await g.say('papa', 'A lighthouse is lit at dusk');
      await g.say('my', 'So light it, then');
      await supper;
      const give1 = g.told('give:give1'), give2 = g.told('give:give2'), ask = g.told('give:ask');
      const give = g.beat('give');
      await give1;
      await g.say('mama', 'Take it, take it. I can see well enough');
      await give2;
      await g.say('mama', 'Take it, take it');
      await ask;
      await g.say('troll', 'Can I have the lantern? For the whole night');
      await g.say('papa', 'What for?');
      await g.say('troll', 'I need it');
      await give;
    },
    // 2.7: ⚑ whose lantern tonight — night 1
    async g => {
      g.beds({ sea_in: 0.3, wind: 0.1 });
      on(g, 'fill:poured', () => g.sound.pour());
      await g.scene(SCENES.room, { beat: 'fill', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'neutral', my: 'smile', troll: 'thinking' },
        keys: { ...isle(23, 'night'), garden: -1 } }, { cut: true });
      g.title(tr('Night 1, 23/24 August'));
      await g.beat('fill');
      const night1 = await g.choose('night1', { 'lantern#flame': [
        { id: 'lamp', label: tr('Up to the lamp: “Till I light it, I sleep by the lamp.”') },
        { id: 'mama', label: tr('To Mama: “The captain sets a term. Not lit by the full moon — we turn for home.”') },
        { id: 'son', label: tr('To the son: “Take it. I won’t ask.”') },
        { id: 'turns', label: tr('By turns: “Mama till bedtime, then me, toward morning — you.”') },
      ] });
      g.set('beat_next', { lamp: 'n1_lamp', mama: 'n1_mama', son: 'n1_son', turns: 'n1_turns' }[night1]);
      g.scale('paraffin', -1);
      if (night1 === 'lamp') {
        await g.say('papa', 'Till I light it, I sleep by the lamp');
        on(g, 'n1_lamp:up', () => g.sound.creak());
        await g.beat('n1_lamp');
        g.beds({ wind: 0.3, sea: 0.15 });
        await g.scene(SCENES.top, { beat: 'n1_up', here: ['papa'], moods: { papa: 'thinking' }, keys: isle(23, 'night') }, { cut: true });
        await g.beat('n1_up');
        await g.play(steady);
        const read = g.told('n1_read:read'), out = g.told('n1_read:out');
        const reading = g.beat('n1_read');
        await read;
        await g.say('papa', '“In wind, warm the burner with paraffin till the flame turns blue. Do not let go before.”');
        await out;
        g.sound.flare(0.8);
        await g.say('papa', 'He doesn’t want to');
        await reading;
        g.beds({ sea: 0.4, wind: 0.12 });
        on(g, 'howl:howl', () => g.sound.howl());
        await g.scene(SCENES.shore, { beat: 'howl', here: ['groke'], keys: { ...isle(23, 'night'), lighthouse_lit: 0.25 } }, { cut: true });
        await g.beat('howl');
      } else if (night1 === 'mama') {
        await g.say('papa', 'The captain sets a term. If it isn’t lit by the full moon — we turn for home');
        const term = g.told('n1_mama:term');
        const mama = g.beat('n1_mama');
        await term;
        await g.say('mama', 'Three nights till the full moon');
        await g.say('papa', 'Three');
        await g.say('my', 'Home? Where everything’s done?');
        await mama;
        await g.play(thread);
        const sat = g.told('n1_mama_sat:sat'), low = g.told('n1_mama_sat:low');
        const lie = g.beat('n1_mama_sat');
        await sat;
        g.sound.howl({ far: true });
        await g.say('mama', 'Somebody is crying');
        await low;
        await g.say('mama', 'Let it burn low');
        await lie;
      } else if (night1 === 'son') {
        await g.say('papa', 'Take it. I won’t ask');
        await g.play(lantern);
        on(g, 'n1_son:gone', () => g.sound.door());
        await g.beat('n1_son');
        g.beds({ wind: 0.3, sea: 0.15 });
        await g.scene(SCENES.top, { beat: 'n1_cold', here: ['papa'], moods: { papa: 'thinking' }, keys: isle(23, 'night') }, { cut: true });
        await g.beat('n1_cold');
        g.beds({ sea: 0.4, wind: 0.12 });
        const set = g.told('gift:set');
        await g.scene(SCENES.shore, { beat: 'gift', here: ['troll', 'groke'], moods: { troll: 'afraid' }, keys: { ...isle(23, 'night'), groke_at: 'near', frost: 0.4 } }, { cut: true });
        const gift = g.beat('gift');
        await set;
        await g.say('troll', 'There. That’s for you');
        await gift;
        g.beds({ sea_in: 0.3, wind: 0.1 });
        await g.scene(SCENES.room, { beat: 'dawn_line', here: ['papa', 'troll'], moods: { papa: 'surprised', troll: 'tired' }, keys: { ...isle(24, 'dawn'), garden: -1 } });
        await g.beat('dawn_line');
      } else {
        await g.say('papa', 'Mama till bedtime, then me, and toward morning — you');
        const stair = g.told('n1_turns:stair');
        const turns = g.beat('n1_turns');
        await stair;
        await g.say('mama', 'All right');
        await turns;
        g.beds({ wind: 0.3, sea: 0.15 });
        await g.scene(SCENES.top, { beat: 'n1_half', here: ['papa'], moods: { papa: 'thinking' }, keys: isle(23, 'night') }, { cut: true });
        await g.beat('n1_half');
        await g.play(half);
        await g.beat('n1_down');
        g.beds({ sea_in: 0.3, wind: 0.1 });
        on(g, 'n1_step:set', () => g.sound.creak());
        await g.scene(SCENES.room, { beat: 'n1_step', here: ['papa', 'troll'], moods: { papa: 'tired', troll: 'thinking' }, keys: { ...isle(23, 'night'), garden: -1 } }, { cut: true });
        await g.beat('n1_step');
        g.beds({ sea: 0.45, wind: 0.12 });
        await g.scene(SCENES.shore, { beat: 'wade', here: ['troll', 'groke'], moods: { troll: 'afraid' }, keys: isle(23, 'night') }, { cut: true });
        await g.beat('wade');
        g.beds({ sea_in: 0.3, wind: 0.1 });
        await g.scene(SCENES.room, { beat: 'dawn_stair', here: ['papa'], moods: { papa: 'surprised' }, keys: { ...isle(24, 'morning'), garden: -1 } });
        await g.beat('dawn_stair');
      }
      g.apply('night1');
    },
  ],
};
