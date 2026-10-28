// IV. Christmas Eve (scenario: «IV. „Сочельник“»). Noon in the yard: the bonus, Mrs Kehoe’s pies (the slip of paper),
// Sheila or Grace, the basin (“Hands”, short); the road in the fog, the boy at the fork, the old man; the Wilson house —
// Ned’s hammer (the mini-game “The Hammer”), the lorry that won’t start; Ш the coal gate at dusk: the voice in the shed,
// and the bundle down the chute, the bargain at the main gates, the shed opened (“The Bolt” again, “The Hand”) or home.
// The bargain refused — the choice again, without it.
// Stand-ins: the yard, the road, the Wilson house — the coal gate (the gate is the scene’s own).
// Reads: everything (facts). Leaves: choices.gate, choices.again; scales.trade, scales.home.
import { SCENES, facts } from '../story.js';
import { handsAgain, hammer, boltAgain, hand } from '../minigames/all.js';

// what Bill does at the coal gate, but for the bargain: the bundle down the chute, the shed opened, home
async function act(g, which, f) {
  if (which === 'chute') {
    if (f.carried && f.bundle) await g.plate(tr('Close: Bill takes off his scarf and wraps in it what he has brought — the shoes, and Eileen’s socks and cardigan.'));
    else if (f.carried) await g.plate(tr('Close: Bill takes off his scarf and wraps the shoes in it.'));
    else if (f.bundle) await g.plate(tr('Close: Bill takes off his scarf and wraps in it Eileen’s socks and cardigan.'));
    else await g.plate(tr('Close: Bill takes off his scarf. He has nothing to wrap in it: in the scarf there is only the scarf.'));
    if (f.paper) {
      if (f.bundle) await g.plate(tr('The slip of paper stays in his fingers over the scarf longer than it need. He pushes it into a sock.'));
      else if (f.carried) await g.plate(tr('The slip of paper stays in his fingers over the scarf longer than it need. He pushes it into a shoe.'));
      else await g.plate(tr('The slip of paper stays in his fingers over the scarf longer than it need. He folds it into the scarf.'));
    }
    await g.plate(tr('He opens the hatch of the chute — the same one he tips the sacks into — and the bundle goes down with a rustle of coal. Silence.'));
    if (f.name) await g.say('sara', 'Bill?');
    await g.plate(tr('He locks the gate and goes.'));
  } else if (which === 'open') {
    await g.play(boltAgain);
    g.here('sara', true);
    g.mood('sara', 'afraid');
    await g.plate(tr('The door is open. Close: Sara’s face.'));
    if (f.punished) await g.plate(tr('Her hair is cropped. The narrator says nothing.'));
    await g.play(hand);
    await g.plate(tr('Cut: his coat is on her shoulders.'));
    if (f.carried) await g.plate(tr('His shoes on her feet.'));
    if (f.bundle) await g.plate(tr('Eileen’s cardigan under the coat.'));
    await g.plate(tr('In the windows of the dormitory, faces: the girls look at the open door and do not come out.'));
    await g.plate(tr('He doesn’t hide her: he leads her out through the gate, down past the main gates, under the lamp, into the town.'));
    if (f.paper) await g.plate(tr('By the lodge stands the suitcase. At the gates Sara slows by a step — and goes on, faster than him.'));
  } else {
    await g.plate(tr('He locks the gate and goes down the hill. At the turn he looks back: the gate in the lamplight. Bells.'));
  }
}

export default {
  number: 'IV', title: tr('Christmas Eve'),
  titles: ['Noon', 'The Fork in the Fog', 'The Wilson House', 'The Coal Gate', 'Refused'],
  choices: [
    { id: 'gate', weight: '◆', title: tr('The coal gate'), options: [{ id: 'chute', label: tr('The bundle down the chute') }, { id: 'deal', label: tr('Ask for her at the main gates') }, { id: 'open', label: tr('Open the shed') }, { id: 'home', label: tr('Go home') }] },
    { id: 'again', title: tr('The coal gate again'), options: [{ id: 'chute', label: tr('The bundle down the chute') }, { id: 'open', label: tr('Open the shed') }, { id: 'home', label: tr('Go home') }] },
  ],
  steps: [
    // IV.1: noon in the yard
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' },
        where: tr('In truth: Furlong’s coal yard at noon on Christmas Eve; a paper garland on the scales.') });
      await g.say('narrator', 'On Thursday he took the sisters their coal, as always. The shed stood open and empty');
      if (!f.bought) await g.say('narrator', 'At the gates a strange lorry was unloading, with the Christmas order');
      if (f.shoes) {
        await g.plate(tr('That Thursday: across the yard goes Sara, in convent boots too big for her, a sister a step behind her. She does not raise her eyes.'));
        g.here('sara', true);
        g.mood('sara', 'sad');
        await g.wait(2500);
        g.here('sara', false);
      }
      await g.plate(tr('A paper garland on the scales. Bill lays out the bonus envelopes on them; the men take their own.'));
      if (f.trade <= 1) {
        await g.plate(tr('The envelopes are thinner — he cut them himself. A man weighs his on his palm:'));
        if (!f.bought) await g.say('worker', 'They took the Christmas order off us. So there’s the bonus');
        else await g.say('worker', 'They’re saying in town you were talking about the sisters in the café. So there’s the bonus');
        await g.plate(tr('The other looks at Bill and says nothing.'));
      } else await g.plate(tr('The envelopes are as fat as every year; the men joke.'));
      await g.plate(tr('Bill puts the week’s takings in his inside pocket — for Eileen.'));
      if (f.carried) await g.plate(tr('The shoebox is already on the lorry’s seat: he took it this morning; Eileen saw, and didn’t ask.'));
      if (f.kehoe === 'child') {
        await g.plate(tr('Mrs Kehoe brings the men their pies, as every year. In front of him she sets a bag of pies on the scales and, not looking at him:'));
        await g.say('kehoe', 'They came to Mary. Asking who’d been asking');
        await g.plate(tr('She goes without looking back. Under the top pie, a folded slip of paper. The narrator reads it:'));
        await g.say('narrator', '“Redmond, Sara. A boy, July. In the county home till spring. Then to a family.”');
        await g.plate(tr('That is how he learns her surname.'));
      } else if (f.kehoe === 'coal') await g.plate(tr('Mrs Kehoe brings the men their pies, as every year, and nods to him.'));
      else {
        await g.plate(tr('The pies are brought, as every year — but by her nephew:'));
        await g.say('nephew', 'Auntie’s busy');
      }
      if (f.bought) {
        await g.plate(tr('Sheila runs into the yard with the white choir dress on a hanger:'));
        await g.say('sheila', 'Daddy, we go at eleven! Sit where you can see me');
      } else {
        await g.plate(tr('Grace runs into the yard, a raisin in her cheek:'));
        await g.say('grace', 'Mammy says everyone to Mass at eleven. Sheila’s crying she won’t go');
      }
      await g.say('bill', 'I’ll come');
      await g.plate(tr('Bill washes his hands in the basin.'));
      await g.play(handsAgain);
      await g.plate(tr('Close: on the dashboard, the child’s drawing.'));
      if (f.envelope === 'girls') await g.plate(tr('Beside it, the sisters’ envelope.'));
      if (f.carried) await g.plate(tr('Beside it, the shoebox.'));
      if (f.bundle) await g.plate(tr('Beside it, Eileen’s bundle.'));
    },
    // IV.2: the road in the fog, the fork
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'thinking' },
        where: tr('In truth: the road along the river in a white fog; a fork, and by it a farm with smoke from the chimney.') });
      await g.plate(tr('Bill drives to the house where he grew up, not knowing himself why. At the fork the road can’t be seen.'));
      if (f.boy) await g.plate(tr('Out of the farm runs the same boy and silently holds his palm up to the cab window. Bill winds the glass down — cut: the last coin is in the boy’s palm.'));
      await g.plate(tr('Out of the fog comes an old man:'));
      await g.say('oldman', 'This road will take you wherever you want');
    },
    // IV.2: the Wilson house — Ned’s hammer
    async g => {
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'thinking' },
        where: tr('In truth: the gate of the old Wilson house behind its trees; the new tenant at the gate.') });
      await g.say('tenant', 'Ned? He’s in the county home. Since the stroke');
      await g.plate(tr('In passing:'));
      await g.say('tenant', 'You’re like him, you know. I thought you’d have been told');
      await g.plate(tr('He holds out an old hammer, its handle worn down to another man’s palm.'));
      await g.say('tenant', 'His. Take it, it’s no use to me');
      await g.plate(tr('And lays it on the gatepost.'));
      await g.play(hammer);
      await g.plate(tr('The narrator says nothing. Silence: the yard of the house, the stable, the empty window where the kitchen was.'));
      await g.plate(tr('The lorry won’t start in the frost.'));
      await g.say('tenant', 'My son-in-law will give you a push in the morning. If he’s slept it off');
      await g.plate(tr('Bill takes what lies on the dashboard and goes on foot. The road into town runs along the convent wall.'));
    },
    // IV.3: Ш the coal gate
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' } });
      await g.plate(tr('Dusk, frost. The bells call to vespers; the streets empty. The laundry is silent.'));
      if (f.bundle || f.eileen === 'house') await g.plate(tr('With the bundle, or for the bargain, he was coming here anyway.'));
      else await g.plate(tr('He would only have walked past.'));
      await g.plate(tr('Through the grille, the shed: the bolt is drawn, as it was then.'));
      if (f.paper) {
        await g.plate(tr('Across the yard a sister late for vespers carries a small suitcase to the lodge by the main gates, and says to the portress:'));
        await g.say('sister', 'Redmond. After midnight Mass');
        await g.plate(tr('They both go into the lodge. The yard is empty.'));
      }
      await g.plate(tr('From the shed, a cough. Bill stops. The key in the gate, as every Thursday; he goes in and stands at the shed door. His hand in his pocket finds the child’s drawing. From below, from the square, the bell of the church where the choir sings at eleven.'));
      await g.plate(tr('Close: his face, a few seconds, without words.'));
      await g.plate(tr('From the shed, in a whisper, at his steps (the young sister brings her bread):'));
      await g.say('sara', 'Sister? Is it bread?');
      await g.wait(1200);
      if (f.punished) {
        await g.say('sara', 'Mr Furlong');
        await g.wait(1000);
        await g.say('sara', 'They cut my hair. For your bolt');
      } else if (f.name) await g.say('sara', 'No. It’s you, Bill. I know your step');
      else {
        await g.say('sara', 'Who’s there?');
        await g.say('bill', 'The coal man');
        await g.say('sara', 'I’m here by myself. It’s quiet here');
      }
      if (f.paper) await g.say('sara', 'Tonight, to Dublin. There’s new sisters there. I’ll ask there');
      else if (f.promise && f.punished) await g.say('sara', 'And you never did ask');
      else if (f.promise) await g.say('sara', 'I asked again. You said…');
      else {
        await g.plate(tr('A cough, and quieter, as if to herself:'));
        await g.say('sara', 'I won’t go to Dublin');
      }
      await g.plate(tr('The yard is empty: the sisters at vespers or in the lodge, the girls locked in the house at this hour. Close: his hand on the bolt. His hands remember it.'));
      const options = [{ id: 'chute', label: tr('The bundle down the chute') }];
      if (f.eileen === 'house') options.push({ id: 'deal', label: tr('Ask for her at the main gates') });
      options.push({ id: 'open', label: tr('Open the shed') }, { id: 'home', label: tr('Go home') });
      const gate = await g.choose('gate', { shed_door: options });
      g.apply('gate');
      if (gate !== 'deal') return act(g, gate, f);
      // the bargain at the main gates
      await g.plate(tr('He locks the gate, goes down to the main gates and rings. The portress goes for the Mother; the Mother Superior comes to the grille, a shawl about her shoulders.'));
      g.here('mother', true);
      g.mood('mother', 'thinking');
      if (f.refused) {
        await g.say('mother', 'I don’t think so, Mr Furlong. Happy Christmas');
        await g.plate(tr('The door closes. He is at the coal gate again.'));
        g.here('mother', false);
        return;
      }
      if (f.paper) {
        await g.say('mother', 'She’s being moved tonight. Someone in the town was asking about her child. You wouldn’t know who?');
        await g.plate(tr('Bill says nothing. She looks at him a long time, then at the suitcase by the lodge.'));
        await g.say('mother', 'This house lives on donations, Mr Furlong. Like any house');
      } else {
        await g.plate(tr('She looks up, at the shed:'));
        await g.say('mother', 'She’s being moved. After the holiday');
        await g.wait(1200);
        await g.say('mother', 'This house lives on donations, Mr Furlong');
      }
      if (f.takings) await g.plate(tr('Bill takes out the week’s takings: the envelope’s money went on the shoes.'));
      else await g.plate(tr('Bill takes the money out of the envelope; the card he keeps in his pocket.'));
      await g.plate(tr('Close: white fingers take the money from his palm.'));
      if (f.paper) {
        await g.plate(tr('Without turning round, to the portress:'));
        await g.say('mother', 'Take the suitcase back');
        await g.say('mother', 'She’s nothing more to ask about now, has she, Mr Furlong?');
      }
      await g.plate(tr('He unwinds his scarf:'));
      await g.say('bill', 'Only that she’d be in the warm tonight, Mother');
      await g.say('mother', 'She wants for nothing, Mr Furlong. Tomorrow, at the coal gate. With your wife');
      await g.plate(tr('The scarf in his fist. He gives way. From above, from the shed, a cough.'));
    },
    // IV.3: the bargain refused — the choice again, without it
    async g => {
      const f = facts(g.state);
      if (g.state.choices.gate !== 'deal' || !f.refused) return;
      await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' } }, { cut: true });
      await g.plate(tr('The coal gate again. From the shed, a cough. His hand on the bolt.'));
      const again = await g.choose('again', { shed_door: [
        { id: 'chute', label: tr('The bundle down the chute') },
        { id: 'open', label: tr('Open the shed') },
        { id: 'home', label: tr('Go home') },
      ] });
      g.apply('again');
      await act(g, again, facts(g.state));
    },
  ],
};
