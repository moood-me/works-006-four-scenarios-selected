// The finale (scenario: «Финалы»). The choice at the coal gate decides: the shed opened — “Through the Town” (the door
// Eileen opens herself, if she knows everything; else his hand on a door not yet open); the bundle down the chute — “The
// File behind the Grille”; the bargain — “The Paper Crown”; home — “The Misted Glass”, and the convent bell in the
// night: an interruption (a choice at stage 3) — “Tracks on the Frost”. The marks give the details; the scales — the
// window, the table, the street, the neighbours’ cards.
// Stand-ins: the street and the square — the coal gate; the Christmas table — the kitchen, and Sara at it — the parlour.
// Reads: everything (facts). Leaves: choices.bell.
import { SCENES, facts } from '../story.js';
import { town, file, cracker, cloth, glass } from '../minigames/all.js';

// the neighbours’ Christmas cards on the shelf, by the trade
const cards = f => (f.trade >= 3 ? tr('On the shelf the neighbours’ Christmas cards stand crowded.') : tr('On the shelf, only a few of the neighbours’ cards.'));

async function throughTown(g, f) {
  await g.scene(SCENES.gate, { here: ['bill', 'sara'], moods: { bill: 'tired', sara: 'afraid' },
    where: tr('In truth: the main street, lit for Christmas; people coming from vespers. Sara in his coat.') });
  g.title(tr('Through the Town'));
  await g.play(town);
  await g.say('dougherty', 'Bill Furlong, are you in your right mind?');
  await g.plate(tr('He, not looking, to no purpose:'));
  await g.say('bill', 'I’ll bring you round a sack. After the holiday');
  if (f.trade >= 2) await g.plate(tr('People nod, and don’t stop.'));
  else if (f.trade === 1) await g.plate(tr('People cross to the other side of the street.'));
  else await g.plate(tr('People cross to the other side of the street. Mr Kenny crosses too, looking away.'));
  if (f.kehoe === 'public') await g.plate(tr('Mrs Kehoe at her café window watches them, not drawing the curtain; then puts out the light.'));
  else if (f.kehoe === 'child') await g.plate(tr('Mrs Kehoe draws the curtain of her café.'));
  else await g.plate(tr('The café is shut for the holiday.'));
  if (f.paper) {
    await g.plate(tr('At the turn he says:'));
    await g.say('bill', 'He’s alive. In the home till spring');
    await g.plate(tr('She stops — and then goes on by herself, ahead of him.'));
  }
  if (f.envelope === 'girls') await g.plate(tr('From the pocket of the coat on her shoulders sticks the edge of the sisters’ Christmas card.'));
  const sheila = f.bought ? ['sheila'] : [];
  await g.scene(SCENES.kitchen, { here: f.form === 'door' ? ['eileen', 'bill', ...sheila] : ['bill'], moods: { eileen: 'sad', bill: 'tired', sheila: 'smile' },
    where: tr('In truth: the Furlongs’ house, from the street; Sara beside Bill (the kitchen has no figure of her yet).') });
  await g.plate(tr('By the house they stop.'));
  if (f.home >= 4) await g.plate(tr('The kitchen window: warm, the girls’ shadows, the wireless loud.'));
  else if (f.home === 3) await g.plate(tr('The kitchen window: warm, the wireless low.'));
  else await g.plate(tr('The kitchen window: one lamp, the wireless off.'));
  if (f.bought) await g.plate(tr('Sheila is already in her white choir dress, though midnight Mass is five hours off.'));
  if (f.form === 'door') {
    await g.plate(tr('Eileen has been coming to the window all evening. She sees them from the street and opens the door before he can knock.'));
    if (f.bought) {
      await g.say('sheila', 'Daddy, you’ll come at eleven?');
      g.mood('sheila', 'afraid');
      await g.plate(tr('— and she sees Sara. Eileen looks over their heads at the hill and the convent, not at her daughter:'));
      await g.say('eileen', 'Take it off. You’re not going tonight');
      await g.say('sheila', 'They gave me the solo!');
      await g.plate(tr('She howls, pulls off the dress (cut: in her house clothes, the dress on its hook) and runs upstairs.'));
      g.here('sheila', false);
    } else {
      await g.plate(tr('Sheila on the stairs, asking no one:'));
      await g.say('sheila', 'Is it because of her they put me out?');
      await g.plate(tr('No one answers.'));
    }
    if (f.home >= 3) {
      await g.say('eileen', 'Upstairs');
      await g.plate(tr('To the girls; they sit on the stairs and look through the banisters. To Sara and to him:'));
      await g.say('eileen', 'Well, what are you standing there for. Come in, it’s cold');
    } else {
      await g.say('eileen', 'Upstairs. All of you');
      await g.plate(tr('Not turning round. She looks at Sara’s feet, not at her face.'));
      await g.say('eileen', 'Come in');
      await g.plate(tr('To him, nothing. She goes to the range, her back turned, and leaves the door open.'));
    }
    await g.plate(tr('Kathleen stands in the kitchen door with a tea towel and looks Sara up and down:'));
    await g.say('kathleen', 'Is that the one from the laundry? Is she sleeping here?');
    await g.say('eileen', 'Put the kettle on');
    await g.plate(tr('Kathleen does, loudly.'));
    if (f.punished) await g.plate(tr('Seeing the cropped hair, Eileen looks away.'));
    await g.plate(tr('Bill puts Ned’s hammer on the shelf by the wireless.'));
    await g.plate(tr('Last shot: Bill’s hands and Sara’s at the range — one pair black, one red.'));
  } else {
    if (f.eileen === 'house') await g.plate(tr('Eileen has been waiting for his answer from the sisters: her shadow by the table. She doesn’t come to the window.'));
    else await g.plate(tr('Eileen doesn’t come to the window.'));
    await g.plate(tr('No one opens the door.'));
    if (f.bought) await g.plate(tr('Sheila at the window, her forehead to the glass, waves to him: she has seen her father, and hasn’t yet made out who is with him.'));
    await g.plate(tr('He goes up to the door; Sara one step below.'));
    if (f.bought) await g.plate(tr('Last shot: his hand on the door, not yet open; in his other hand, Ned’s hammer; behind the glass, the white dress.'));
    else await g.plate(tr('Last shot: his hand on the door, not yet open; in his other hand, Ned’s hammer; behind the glass, one lamp.'));
  }
  await g.say('narrator', 'The hardest part was still ahead. But the worst thing he could have done, he had not done');
}

async function crown(g, f) {
  await g.scene(SCENES.kitchen, { here: ['eileen', 'bill', 'grace', 'sheila'], moods: { eileen: 'neutral', bill: 'tired', grace: 'smile', sheila: 'smile' },
    where: tr('In truth: Christmas Day, the Furlongs’ table; Sara serves at it (the kitchen has no figure of her yet).') });
  g.title(tr('The Paper Crown'));
  await g.plate(tr('The Christmas table. Sara, in Kathleen’s old dress, serves; through the open pantry door, a camp bed. Eileen doesn’t hurt her, but speaks to her as to a servant. To a neighbour at the window:'));
  await g.say('eileen', 'My people. From Wexford');
  if (f.feet === 'his') await g.plate(tr('Kathleen knows the shoes under the table and says nothing all dinner; she gets up first and puts her plate in the sink, loudly.'));
  await g.plate(tr('Sheila, hoarse, tells how she sang the solo.'));
  await g.plate(tr('The sisters’ Christmas card — empty, the money gone out of it — stands on the shelf among the neighbours’ cards.'));
  await g.plate(cards(f));
  if (f.takings) {
    await g.plate(tr('Eileen over the empty tin:'));
    await g.say('eileen', 'Again?');
    await g.plate(tr('— and counts on her fingers what they’ll live on in January.'));
  }
  await g.scene(SCENES.parlour, { here: ['sara', 'bill'], moods: { sara: 'neutral', bill: 'tired' },
    where: tr('In truth: the same Christmas table in the Furlongs’ kitchen.') });
  await g.plate(tr('Loretta pushes a cracker at Sara and nods at her father.'));
  await g.play(cracker);
  g.mood('sara', 'laugh');
  await g.plate(tr('Cut: a paper crown on Sara — and for the first time, Sara laughs.'));
  if (f.punished) {
    await g.plate(tr('The crown sits on her cropped hair.'));
    await g.say('loretta', 'Why is her hair like a boy’s?');
    await g.say('eileen', 'Eat');
  }
  g.mood('sara', 'neutral');
  await g.plate(tr('Sara sets a dish beside Bill and coughs into her sleeve; nobody mentions the cough.'));
  if (f.name) {
    await g.say('sara', 'Bill…');
    await g.plate(tr('— and, catching Eileen’s eye:'));
    await g.say('sara', 'Mr Furlong. Would you know where my…');
  } else await g.say('sara', 'Mr Furlong. Would you know…');
  await g.plate(tr('Eileen raises her eyes: her condition — not a word in front of the girls.'));
  await g.play(cloth);
  await g.say('bill', 'Eat, Sara. Sit down and eat');
  if (f.paper) await g.plate(tr('The slip of paper is in his breast pocket; he doesn’t take it out.'));
  await g.plate(tr('His scarf on the hook by the door.'));
  await g.plate(tr('Last shot: her red hands set a dish on the cloth; his black ones lie flat either side of his plate and do not move.'));
  await g.say('narrator', 'Sara lived with the Furlongs until spring. In the house, the boy was not spoken of');
}

async function fileBehind(g, f) {
  await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'tired' },
    where: tr('In truth: the square after midnight Mass; opposite, the convent’s main gates, the lamp over them, frost. The Furlongs come out of the church.') });
  g.title(tr('The File behind the Grille'));
  await g.plate(tr('Christmas night, after midnight Mass. Close, from the church: Ned’s hammer on Bill’s knees.'));
  await g.plate(tr('Behind the grille the girls are led in file, with candles, from the chapel to the house — close to the bars, under the lamp.'));
  await g.play(file);
  await g.plate(tr('She is not in the file: the shed was not opened.'));
  if (!f.paper) {
    await g.plate(tr('His look goes along the faces to the end, and on, up along the wall, to the lamp over the coal gate. It is dark there, and quiet.'));
    if (f.carried || f.bundle) await g.plate(tr('What he put down the chute stayed with her in the shed.'));
  } else {
    await g.plate(tr('His look goes along the faces to the end, and on — to a car by the lodge, its headlights on. Sara is led out of the coal gate above, a sister with a lantern beside her.'));
    g.here('sara', true);
    g.mood('sara', 'neutral');
    await g.plate(tr('At the car, under the lamp, two steps from the Furlongs.'));
    if (f.feet === 'his') await g.plate(tr('On her feet, his shoes.'));
    else if (f.feet === 'convent') await g.plate(tr('On her feet, the convent boots.'));
    else await g.plate(tr('Her feet are bare.'));
    await g.plate(tr('The slip of paper in her fist.'));
    if (f.punished) await g.plate(tr('Her hair is cropped.'));
    if (f.feet === 'his') await g.plate(tr('The sister looks at the shoes, then across the square at the Furlongs, and says nothing. Kathleen knows the shoes, turns away and goes on ahead, to her mother.'));
    if (f.name) await g.plate(tr('Sara looks back while the sister opens the car door.'));
    else await g.plate(tr('She gets in without looking back.'));
    await g.plate(tr('The car goes off down the street.'));
    g.here('sara', false);
  }
  if (f.bought) await g.plate(tr('Sheila, hoarse after the solo, carries the choir dress over her arm and shows everyone where she tore the hem.'));
  else await g.plate(tr('Sheila, put out of the choir, walks beside Eileen and doesn’t look at the file.'));
  if (f.eileen === 'all') await g.plate(tr('By the gates Eileen slows her step.'));
  else if (f.eileen === 'house') await g.plate(tr('By the gates Eileen looks at him; he shakes his head. Close: her hands tie Loretta’s scarf tighter.'));
  else if (f.eileen === 'bundle') await g.plate(tr('Eileen looks at the gates and asks nothing.'));
  else await g.plate(tr('Eileen doesn’t look at the gates.'));
  if (f.home >= 4) await g.plate(tr('They walk side by side; under her breath Eileen tells him about the solo.'));
  else if (f.home === 3) await g.plate(tr('They walk together, without a word.'));
  else await g.plate(tr('Eileen walks ahead with the little ones; Bill behind, with Kathleen.'));
  if (f.trade >= 3) await g.plate(tr('On the square Mr Kenny raises his hat and stops to wish them a happy Christmas.'));
  else await g.plate(tr('On the square Mr Kenny nods and walks on.'));
  await g.plate(tr('No scarf: his neck bare in the frost. Loretta, asleep on her feet, drops a mitten. Close: the mitten in his hand.'));
  await g.plate(tr('Last shot: Bill’s black hand round Loretta’s small mitten.'));
  await g.say('narrator', 'On Thursday he took the sisters their coal. The shed stood open and empty');
}

async function mistedGlass(g, f) {
  await g.scene(SCENES.kitchen, { here: ['eileen', 'bill'], moods: { eileen: 'thinking', bill: 'tired' } });
  g.title(tr('The Misted Glass'));
  await g.plate(tr('The kitchen, the evening of Christmas Eve. Bill comes in from the cold and puts on the chair by the door what he brought back.'));
  if (f.eileen === 'all') await g.plate(tr('Eileen doesn’t ask where he’s been. She puts out his plate.'));
  else if (f.eileen === 'house') {
    await g.say('eileen', 'Well, what did the sisters say?');
    if (f.gate === 'home' && g.state.choices.gate === 'deal') await g.say('bill', 'They don’t think so');
    else await g.say('bill', 'Not today');
    await g.plate(tr('She turns away to the range: it’s easier for her, and she is ashamed of it.'));
  } else if (f.eileen === 'bundle') await g.plate(tr('She sees the bundle on the chair by the door and says nothing.'));
  else await g.plate(tr('She is glad he’s home.'));
  await g.scene(SCENES.kitchen, { here: f.home <= 2 ? ['eileen', 'bill'] : ['eileen', 'bill', 'grace', 'sheila'], moods: { eileen: f.home >= 4 ? 'smile' : 'neutral', bill: 'tired', grace: 'smile', sheila: 'neutral' } }, { cut: true });
  await g.plate(tr('Cut: the same kitchen after midnight Mass. The cake, the wireless, the girls in their pyjamas.'));
  if (f.home >= 4) await g.plate(tr('Everyone at the table; Eileen sings along to the wireless.'));
  else if (f.home === 3) await g.plate(tr('Everyone at the table; Eileen silent.'));
  else await g.plate(tr('Eileen alone at the range, her back turned; the cake not cut through.'));
  await g.plate(cards(f));
  if (f.bought) await g.plate(tr('Sheila won’t let anyone take the choir dress off her, and falls asleep in it on the bench.'));
  else await g.plate(tr('Sheila sleeps with her face to the wall; the choir dress hangs on its hook, never worn.'));
  await g.plate(tr('Eileen lays out the presents, finds Loretta’s letter and reads it under her breath:'));
  await g.say('eileen', 'Dear Santa. I need a dog. If there isn’t a dog, let Kathleen sleep in a different room');
  await g.plate(tr('She snorts. Bill at the window.'));
  await g.play(glass);
  await g.plate(tr('The window has misted over; Bill’s hands on the sill; two seconds of silence. From the hill the convent bell strikes.'));
  await g.sheet(tr('An interruption, to be'), [
    tr('A bell, the sign at the top of the screen for three seconds. Tapped — Bill goes. Not tapped — the bell goes quiet.'),
    tr('For now: the choice.'),
  ]);
  const bell = await g.choose('bell', { window: [
    { id: 'stay', label: tr('Let the bell go quiet') },
    { id: 'go', label: tr('The bell: go') },
  ] });
  if (bell === 'stay') {
    await g.plate(tr('The bell goes quiet.'));
    if (f.boots && f.eileen === 'none') await g.plate(tr('The shoes are under the tree, “Kathleen” on the lid.'));
    else if (f.bundle) await g.plate(tr('The bundle on the chair by the door.'));
    else if (f.carried) await g.plate(tr('The shoebox on the chair by the door.'));
    if (f.paper) await g.plate(tr('The slip of paper in the table drawer. At the convent gates a car is waiting, and he knows where she will be taken tonight.'));
    await g.plate(tr('Last shot: his hands on the sill, beside Ned’s hammer.'));
    await g.say('narrator', 'In the morning it was Christmas, and everything was as it always was');
    return;
  }
  // “Tracks on the Frost”: decided late
  g.title(tr('Tracks on the Frost'));
  if (f.bundle) await g.plate(tr('He takes his coat from the chair, and the bundle with it.'));
  else if (f.carried) await g.plate(tr('He takes his coat from the chair, and the shoebox with it.'));
  else await g.plate(tr('He takes his coat from the chair.'));
  await g.plate(tr('Eileen in her nightdress in the bedroom door:'));
  await g.say('eileen', 'Bill?');
  await g.plate(tr('He goes.'));
  await g.scene(SCENES.gate, { here: ['bill'], moods: { bill: 'sad' } });
  await g.plate(tr('The coal gate, near three in the morning, the lamp over it. The shed door stands open; inside, empty.'));
  if (f.shoes) await g.plate(tr('On the frost from the shed to the house: the tracks of the sisters’ boots, and beside them, of convent boots.'));
  else await g.plate(tr('On the frost from the shed to the house: the tracks of the sisters’ boots, and beside them, of bare feet.'));
  if (f.paper) await g.plate(tr('At the main gates a car, its headlights off, the driver asleep in the cab.'));
  await g.plate(tr('A young sister with a lantern comes to the grille:'));
  await g.say('young', 'She’s been taken to the infirmary');
  if (f.eileen === 'all' || f.eileen === 'house') await g.say('bill', 'Tell her Bill came. I’ll come tomorrow. With my wife');
  else await g.say('bill', 'Tell her Bill came. I’ll come tomorrow');
  await g.say('young', 'It’s not allowed, mister');
  if (f.bundle) await g.plate(tr('At the bundle she shakes her head. He hangs his coat on the bars, ties the bundle to them, and goes.'));
  else if (f.carried) await g.plate(tr('At the box she shakes her head. He hangs his coat on the bars, sets the box down by the grille, and goes.'));
  else await g.plate(tr('He hangs his coat on the bars and goes.'));
  await g.plate(tr('Last shot: a black hand on the bars; the frost melts under the fingers.'));
  await g.say('narrator', 'He walked home without his coat. It was Christmas already');
}

export default {
  number: '', title: tr('Christmas'),
  titles: ['The Finale'],
  choices: [
    { id: 'bell', title: tr('The convent bell at night'), options: [{ id: 'stay', label: tr('Let it go quiet') }, { id: 'go', label: tr('Go') }] },
  ],
  steps: [
    async g => {
      const f = facts(g.state);
      if (f.gate === 'open') return throughTown(g, f);
      if (f.gate === 'deal') return crown(g, f);
      if (f.gate === 'chute') return fileBehind(g, f);
      return mistedGlass(g, f);
    },
  ],
};
