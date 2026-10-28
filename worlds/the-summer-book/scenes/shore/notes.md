# The Shore by the House

The first scene of «The Summer Book» (С1 of the game's scenario): the island's smooth granite sloping into a pale
sea, the white-boarded house with its glazed veranda, peonies by the porch, the gate, the pier and the moored boat,
wind-bent pines on the crown. Its sea, sky, granite, pines, mist, fog and the hour and the weather are the island's
(`modules/isle.md`); the generator is `tools/shore.py` (`python -B tools/shore.py <world>` writes `scene.json`,
`elements/sky.*`, `elements/sea.*`). The approved look (stage 2) is `dawn: 1` with everyone at their first places.

- **The land** is `lib.ground` (relief.js): `coast(z)` the line of the rock, `shore(z)` where the sea meets it, `edge`
  the waterline (the storm's foam). Off the rock where the two stand lies **the shelf**: level granite 0.72 m under
  the water (`SHELF`) between distances 4.2 and 7.6, about two metres out; beyond three metres out the floor falls
  away. Sophia on it (`sophia_at: shelf`) is in the water to her chest: the sea plane hides her below its surface,
  pixel by pixel, and its mirror shows nothing under it. The sea's paint is thinned over the shelf (`clear` in
  `tools/shore.py`): the water is darker there, the bottom (`rock.js`: the shelf's pale granite, weed, a white stone)
  is for close shots, not for the wide view.
- `rock` paints the granite (the island's) and the shore's own: the grass and heather (burnt in August: `late`), the
  path, the shelf under the water. Its points: `rock#ledge` (the rock's edge over the shelf), `rock#shelf` (on the
  shelf, in the water), `rock#warm` (the warm rock they sit on in the calm).
- **The house** is cards and planes on the unseen anchor `house` (facing 200): the gable end with the glazed veranda
  (its panes clear: `veranda_in` behind them — the back wall, the door to the room, Papa's table and lamp — and Papa
  in it, `papa_at: veranda`, his face seen through the glass), the side, the roof, the chimney, the porch (its rail
  carries the shell ashtray: `shell`); through the glass, by the room's door, the straw hat on its nail (`hat`).
- **The cat Mappe** is the world's `cat` (`modules/cat.md`): `cat_at` his place (`lib.CAT`: the porch's landing, its
  rail, the path above the rock, the rock past them — walking, he goes there at his pace and tells `cat:arrived`),
  `cat_pose` sit · lie · walk · none.
- **The things of the summer**, each by a key between steps (their paintings read it — none moves while it plays):
  the gate and its stone (`gate`), the chair by it (`chair`), the graves (`graves` 0–5), wrack after the storm
  (`weed`), Papa's net on the pier (`net`), the family boat out at the nets by night with its lantern (`boat_out`:
  `far_boat`, the light `far_lamp`), the big boat and its gangway (`big_boat`), the things by the pier (`luggage`).
- **What moves** by keys over time: Eriksson's boat (`rowboat` 0 → 1 rows in along the shore to the pier's end, 1 →
  0 turns round and rows away: the script's, `lib.ROWBOAT`); the dinghy (`dinghy`: moored, `circles` — round and
  round before the rock, a lap in 26 s, — `out` along the shore by `dinghy_at`: `lib.DINGHY`).
- **The far house** (`far_roof`): the new house on the other side, white and black-windowed over its grey trees,
  far off past the house on the left of the sea.
- **People** (the world's `cast`): `<id>_at` names where each is (`lib.PLACES`, put by the island's `places`, a seat
  and a motion with it where the place has them): Grandmother — water, ledge, warm, path, gate, porch, peonies, pier,
  net, gangway, step (seated on the porch's lowest step), knee (knee-deep on the shelf's inner edge), dinghy (in its
  stern); Sophia — water, edge, shelf, warm, graves, porch, pier, gangway, dinghy (at the oars); Papa — lawn, veranda,
  porch, pier, net, gangway, dinghy (in its bow, his back to them). In the dinghy they are seated on it and go with
  it. **Eriksson** (`eriksson`) never comes ashore: he sits on his boat's thwart (`eriksson_on` its seat, `sit_bench`),
  carried with it, looking at Grandmother; here while his boat is (`eriksson_here`, the pieces').
- The showcase (`showcase.js`) runs the summer: dawn, the shelf, Eriksson, the calm, the nets, the moon, the storm,
  the morning after, August, the last morning, the fog by night.

## Pieces (stage 5)

How they will be made, as «Папа и море»'s: `lib.js` `film(scene)` — each piece's `from` (the people's places by
`PLACES`, the cat's, the camera, the scene's own keys — never the hour, the weather, who is here, or what the play
decided) and `run` (walks at the cast's gaits, motions, keys moved, the camera moved, `scene.tell('<piece>:<moment>')`
at the moments); played through the world's `beats`. The game says every line at its moment and plays the
mini-games between pieces: **a piece ends in the pose of what comes after it** (a choice, a mini-game, the next piece);
a mini-game in the middle of a step splits the piece into a piece before it (ending in its pose) and one after it
(`after`). A piece `after` another goes on from where that one ended (its `from` is not applied). The people's motions,
parts and close-ups are package Л's (`modules/cast.md`, `closeups.md`): named here as needed. Seconds are estimates.
The play's own keys a piece reads are listed in `party`; the places (`<id>_at`) are the pieces' — the game no longer
sets them, except where `party` says.

**Prologue «Пионы»** (dawn)
- `peonies` (П.1–П.2, ≈ 12 s): everyone asleep, the house still; Grandmother sits on the porch's lowest step among
  the peonies (`grandma_at` step; `sit_stone`) and feels about in the earth with her hand — `peonies:start` (the
  narrator's line), `peonies:hand` (her hand in among the stems). Ends in the pose of М1 «Пионы»: her hand at the
  stems (`peony:2#stems`; the close-up of the stems, Л) — the mini-game moves `stems`.
- `teeth` (after М1, ≈ 25 s): something glints in the grass — `teeth:glint`; Sophia comes out on the porch in her
  nightdress (`sophia_here`) — `teeth:porch` («What are you doing?» — «Looking for my teeth»); Grandmother finds them
  — `teeth:found` («Found them» — «Show me»); shows them and puts them in (the close-up «зубы», Л) — `teeth:in`; the
  two faces close — `teeth:ask` («When will you die?» — «Soon…» — «Why?»); she gets up slowly holding on to the porch
  rail (`rise_slow`, her hand at `porch#rail`) — `teeth:up` («Let's go down to the water»). Ends standing at the porch's
  foot, the two of them. (The hat on its nail and Papa asleep — the game cuts to `house`.)
- `ledge` (П.4, ≈ 12 s): they come down the rock to the water; Sophia goes out to the very edge (`sophia_at` edge),
  Grandmother behind her on the ledge's top (`ledge`); the clear water, the shelf under it, dark further out —
  `ledge:edge` («I want to see where the bottom is»). Ends in the pose of the choice `bottom` (`sophia#chest` in the
  middle 4:3).
- `wrist` («Держать», ≈ 4 s): Sophia leans out over the water, Grandmother's hand on her wrist (`grandma_reach` r →
  `sophia#hand_l`); on the bottom the weed and the white stone — `wrist:bottom`. Ends in the pose of М2а «Рука»
  (`sophia#hand_l`): the mini-game moves `pull` (Sophia pulling her hand away).
- `wrist_after` (after М2а, ≈ 22 s): Sophia jerks free — `wrist_after:free` («Let go!…»); on the rock she stamps
  (`stamp`) — `wrist_after:stamp` («I hate you!»); a minute later she sits down right up against her (both seated on
  the rock's edge: `sit_stone`, `seated`) — `wrist_after:sat` («Don't stick to me…»); Grandmother, not looking, holds
  out her hand, Sophia takes it (`_reach` both) — `wrist_after:hand`. Ends so.
- `shoulder` («Иди», ≈ 3 s): Grandmother's hand on Sophia's shoulder at the edge (`grandma_reach` r →
  `sophia#shoulder_r`) — the line «Go on. I'm watching» is said in the choice's pose. Ends in the pose of М2б
  «Плечо» (`sophia#shoulder_r`): the mini-game moves `let` (the shoulder going from under the hand).
- `slip` (after М2б, ≈ 14 s): Sophia steps onto the shelf, slips and sits down in the water up to her chest
  (`sophia_at` shelf; splashes) — `slip:in`; gasps — and laughs, wet and proud (`laugh`) — `slip:laugh`; Grandmother's
  hands on the rock, shaking (the close-up «руки дрожат на скале», Л) — `slip:hands`. Ends on Sophia in the water.
- `down` («Спуститься», ≈ 4 s): Grandmother at the rock's edge over the shelf, Sophia beside her. Ends in the pose of
  М2в «Уступ» (`rock#ledge`): the mini-game moves `step` (0 at the edge … 1 standing knee-deep on the shelf's inner
  edge, `grandma_at` knee — `step_down`, Л; the water hides her legs).
- `down_after` (after М2в, ≈ 32 s): Sophia comes into the water too (`sophia_at` shelf) and shrieks — `down_after:you`
  («You too!»); getting up does not work: Grandmother sits a long time on the rock's edge, her feet in the water —
  `down_after:sat`; Papa comes out of the house and down to her (walks from the door) and holds out his hand —
  `down_after:hand` («Myself»); she climbs out by herself, slowly (`rise_slow`); Papa stands beside her till she is up —
  `down_after:up`.

**Chapter I** (June)
- `eriksson` (1.4, day, ≈ 26 s): Eriksson rows in along the shore to the pier's end (`rowboat` 0 → 1,
  `eriksson_here`); Grandmother goes down onto the pier, Sophia with her — holding her skirt (`sophia_reach` →
  `grandma#hips`), or with `skirt` false standing alone at the pier's edge — `eriksson:in`; he hands up the post —
  `eriksson:post` («You've got old» — «And you haven't?» — «Me too. Get in…»); she takes hold of the gunwale with both
  hands, her face to the sea (the close-up «руки на борту», Л) — `eriksson:gunwale`; looks at her knees —
  `eriksson:knees` («Some other time»); he looks at Sophia (or, `skirt` false, at Grandmother's hands still on the
  gunwale) — `eriksson:look` («Don't hold your girl back»). Ends in the pose of М3б «Оттолкнуть»: her palm on the
  gunwale (`rowboat#gunwale`): the mini-game moves `rowboat` (down from 1: the boat pushed off).
- `eriksson_off` (after М3б, ≈ 12 s): he rows away without a word, the boat turning (`rowboat` → 0) —
  `eriksson_off:gone`; Sophia looks up at Grandmother — `eriksson_off:ask` («What did he say?» — «That he's old»).
- `shell` (1.3 «Скажи ему», the morning after the supper, ≈ 8 s): morning; on the porch's rail the big shell ashtray
  (`shell` false → true) — `shell:shell`; Grandmother smokes by it, and Papa behind the veranda's glass looks at her over
  his papers (`papa_at` veranda) — `shell:look`.
- `nets` (1.5, dusk, ≈ 16 s): Papa sits at the pier's root untangling the net (`net`, `untangle`); Grandmother comes
  down with a mug of coffee, gives it to him — `nets:coffee`; sits down beside him on a stone at the pier's root (a
  stone the scene adds; `sit_stone`)
  — `nets:sat` («Mamma. Tell me…» — «I'm not going to be the last…»). Ends in the pose of the choice `nets`
  (`grandma#chest`).
- `nets_say` («Скажу», ≈ 8 s): Papa nods, untangles on, drinks, gives back the cup — `nets_say:cup`.
- `nets_nothing` («Нечего», ≈ 10 s): he untangles in silence, faster — `nets_nothing:fast` («All right» before it);
  she gets up and goes up the path; he watches her go — `nets_nothing:watch`.
- `net` («Сеть», ≈ 3 s): Grandmother takes up the other end of the net. Ends in the pose of М3в «Сеть» (`net#knot`;
  the close-up of the knot, Л): the mini-game moves `knot`.
- `net_after` (after М3в, ≈ 16 s): they untangle it together — `net_after:together`; Papa — `net_after:thanks`
  («Thank you, Mamma»); bent over the net again, not looking — `net_after:ask` («So you'll tell me…»); she does not
  answer; he goes on alone — `net_after:alone`.

**Chapter II** (July)
- `calm` (2.1, the dead calm, `calm` 1, ≈ 30 s): heat, the sea glass; Grandmother and Sophia sit on the warm rock
  (`warm`; seated); the cat comes along the rock (`cat_at` path → past, `cat_pose` walk) — `calm:cat`; Sophia reaches
  for him with both hands — he goes before she touches him — `calm:gone` («Why doesn't he love me?…» — «What do you
  think?» — «Don't ask back!» — «Then don't ask me anything either!»); Grandmother moves round to sit with her back to
  her — `calm:back`. Ends in the pose of М4 «Камешек»: Grandmother's hand with the pebble over the glass water
  (`grandma#hand_r`): the mini-game moves `rings` (each throw: rings spreading on the glass where it falls).
- `calm_after` (after М4, ≈ 34 s): the rings die away — `calm_after:still`; without turning she holds a second pebble
  out behind her; Sophia takes it and throws — `calm_after:second` (`rings` once more); over the pines the new house's
  roof — `calm_after:roof` («Let's climb in there!» — «At night. Some day» — «Promise?» — «We'll see»); the silence,
  ten seconds — `calm_after:silence`; Sophia gets on her knees (`kneel_pray`) — `calm_after:pray` («God, let something
  happen…»); on the way to the house Grandmother sits down on the stone by the gate for two seconds and gets up
  (`gate#stone`) — `calm_after:stone`; behind the veranda's glass Papa raises his head from his papers
  (`papa_at` veranda) — `calm_after:papa`; Sophia runs on ahead — `calm_after:run`.
- `graves` (2.2 «Похоронить», day, ≈ 22 s): between the stones on the shore a hole in the sand; Grandmother kneels and
  carves a bird from a chip (`carve`, the knife, Л) and sets it on the grave (`graves` 0 → 1) — `graves:bird`; Sophia
  sings something of her own — `graves:song`; «Where is it now?» — «Here» — `graves:here`; she lays a shell on top —
  `graves:shell`; the summer passes over it: the row grows (cuts: `graves` 2 … 5) — `graves:row`.
- `cat_rail` (2.2 «За дверь», evening, ≈ 6 s): the door shut; the cat asleep on the porch's rail (`cat_at` rail,
  `cat_pose` lie); he does not ask to come in — `cat_rail:rail`.
- `moon_path` (Ш1 «Луна», night, full moon, ≈ 22 s): Grandmother and Sophia come out onto the rocks and stand at the
  water (`water`); the moon's path comes right up to their feet — `moon_path:path` («And Mama…» — «Look»); they look;
  it is cold: Grandmother puts her shawl round Sophia (`drape`; the shawl from her look to Sophia's, Л) —
  `moon_path:shawl`; on the veranda, dark, Papa does not come out — `moon_path:veranda`.

**Chapter III**
- `home_late` (3.3 «Никто не знает», night, `boat_out`, ≈ 16 s): Grandmother comes home slowly up the path, sits
  down on the porch's step and does not get up for a long time (`step`) — `home_late:sat`; Papa's lantern still out on
  the water — `home_late:lantern`; Sophia — `home_late:crazy` («You're crazy!» — «Yes»).
- `step_beside` (3.2 «Беги за папой» with «Сеть», after the forest's `lead_home` through black, ≈ 12 s): Grandmother on
  the porch's step (`step`); Papa sits down beside her without a word, as at the nets then — `step_beside:sat`; and sits
  till she gets up by herself — `step_beside:up`.
- `rail` (3.4 «На крыльцо», night storm, ≈ 5 s): they come out on the porch into the rain under the white sky, both
  take hold of the rail. Ends in the pose of М8а «Перила» (`porch#rail`): the mini-game moves `gust` (the wind's
  gusts at them: hair, the hem, the rain driven).
- `rail_after` (after М8а, ≈ 16 s, + `knew` ≈ 12 s): they stand in the rain; Sophia shrieks with fear and delight —
  `rail_after:shriek`; Grandmother — `rail_after:sky` («It isn't you. It's the sky. Look at it»); wet through; the
  door's creak — `rail_after:creak`. With `knew`: Papa comes out with the blanket and stands in the door —
  `rail_after:papa` («Mamma. Indoors»); she goes — not at once; he puts the blanket round the two of them —
  `rail_after:blanket`. Without: ends on their backs at the rail against the white sky (the game cuts to `house`: Papa
  on his camp bed).
- `circles` (3.5, morning after the storm, `weed`, ≈ 18 s): quiet; wrack on the rocks; Sophia in the dinghy rows in
  circles (`dinghy` circles; `sophia_at` dinghy, `row`), crooked, then straighter — `circles:straight`; she rows to
  the pier where Papa stands — `circles:tent` («I want a tent…»); Papa writes it in the list (`write`, the list, Л) —
  `circles:list` («I'll order one»). With `ask_back`: Sophia turns at once to Grandmother on the porch —
  `circles:turn` («And will you come?» — «We'll see»).

**Chapter IV** (August, `late`)
- `post` (4.1, day, ≈ 18 s): Eriksson rows in (`rowboat` 0 → 1), the parcel in his boat — `post:in`; Sophia grabs it
  off the gunwale and drags it to Grandmother — `post:grab` («Is it mine?»); Grandmother holds it, making out the
  writing, Sophia pulls. Ends in the pose of М9а «Свёрток» (`grandma#hands`; the close-up of the string, Л): the
  mini-game moves `parcel` (0 in Grandmother's hands … 1 Sophia has it).
- `post_after` (after М9а, ≈ 6 s): Sophia with the parcel; Eriksson from the water — `post_after:ask` («Will you put
  it up yourself?» — «Myself!»). (The bottle of drops on the sill — the game cuts to `house`.)
- `gate` (4.1, `knew`, ≈ 30 s): the chair by the gate (`chair` set); Grandmother sits beside it on the stone, the chair
  empty — `gate:sat`; Eriksson calls once — `gate:call` («To the nets?»); she gets up — `gate:up`; from behind the
  veranda's glass Papa, not getting up — `gate:papa` («Mamma. You mustn't»); she stands holding the chair's back and
  shoves it away (`chair` shoved; it scrapes) — `gate:shove`; sits down again on the stone — `gate:sat2`; Eriksson
  looks at the empty chair — `gate:chair` («They've tied you up» — «I tied myself»); he pushes off (`rowboat` → 0) —
  `gate:off`.
- `foot` (4.1, not `knew`, strength ≥ 2, ≈ 16 s): Eriksson calls once — `foot:call` («Will you come out to the
  nets?»); she goes down to the pier, takes hold of the gunwale, puts her foot
  on the thwart — `foot:on` — and takes it off — `foot:off` («Some other time» — «There aren't many other times…»);
  he pushes off — `foot:gone`.
- `porch_stay` (4.1, not `knew`, strength ≤ 1, ≈ 16 s): Eriksson calls once — `porch_stay:call`; she does not get up from the porch's step, only looks at the
  boat — `porch_stay:look` («Off you go»); Eriksson looks at her a long time and pushes off without a word —
  `porch_stay:gone`; Papa behind the veranda's glass sees it — `porch_stay:papa`.
- `porch_dawn` (Ш3, «Идти» without `knew` and «За палаткой», dawn in thin fog, ≈ 8 s): Grandmother on the porch's
  step, she can no longer get up — `porch_dawn:sat`.
- `jacket` (after `porch_dawn`, «За палаткой», ≈ 12 s): Papa comes out, puts his jacket round her shoulders (`drape`,
  the jacket, Л) and looks at her wet hem — `jacket:hem` («You were there» — «Don't tell her»).
- `learns` (after `porch_dawn` or `jacket`, ≈ 6–12 s — «Когда Папа узнаёт», by `nets` read by the game): Papa beside
  her — `learns:said` (his line, her answer); with `net` he takes her hand as she sits and holds it (`_reach` both) —
  `learns:hand`; Sophia beside them (when she is here) — `learns:sophia` (with «Софья знает»: «I didn't tell. She told
  me not to»; Papa looks at his mother).
- `run_to` (after `learns` or `jacket`, ≈ 10 s): he raises his eyes to the cape — the fog thinning — and goes; Sophia
  comes running down the path and sees Grandmother on the step — `run_to:sees`. Then by the play (the game chooses):
- `count` («Софья знает», ≈ 20 s): Sophia stops, her lips white, grabs Papa's sleeve with both hands (Papa back) —
  `count:sleeve` («She isn't getting up!…» — «I know» — «I didn't tell…»); Papa looks at his mother — `count:look`;
  Sophia sits beside her on the step and counts aloud — `count:count`; Papa lifts his mother by the arm and leads her
  in, Sophia after, counting — `count:in`.
- `hem` (Sophia called, ≈ 12 s): Papa back; Sophia — `hem:said` («I called and you didn't come!»); Papa and
  Grandmother say nothing — `hem:silent`; Sophia hits her on the knee with her fist and at once clings to her hem with
  both hands — `hem:cling`.
- `alone` (Sophia did not call, ≈ 12 s): Sophia — `alone:said` («I was alone! All night!…») and stops: Grandmother
  does not get up to meet her — `alone:stop`; she sits beside her on the step and takes her sleeve — `alone:sleeve`;
  later in the day (a cut within the piece) — `alone:later` (with «Постучу»: «You didn't knock!»); in the evening
  Sophia brings her coffee herself (the mug) — `alone:coffee`.
- `called_porch` (Ш3 «Лампа», Sophia called, morning, after the cape's `out_of_white`, ≈ 20 s): the porch — Sophia,
  Papa, Grandmother; Sophia — `called_porch:said` («I called!», with «Постучу» «And you didn't knock!»); Papa raises his
  eyes to his mother — `called_porch:eyes` («I heard»); Sophia — `called_porch:hate` («I hate you!») and runs off onto
  the pier and sits there (`sophia_at` pier, seated); Papa, quietly — `called_porch:woken` («You could have woken me» —
  «You would have gone»).

**Epilogue** (31 August, `late`, `dawn`, thin fog `fog` 0.6, `big_boat`, `luggage`)
- `last_morning` (≈ 8 s): the things by the pier; the big boat by the far rock, the gangway; everyone at the pier —
  `last_morning:boat`.
- `signs` (≈ 6–14 s, by `sign_smoke`, `sign_hat`, `sign_bird`): one gesture each — Sophia slips Grandmother the
  pouch (`pouch`) / Papa takes the shell off the rail into the basket (`shell`) / Grandmother crumples the empty packet
  (`packet`) / pats her empty pocket (`pocket`) — `signs:smoke`; the hat on Sophia, Papa straightens its brim and turns
  to the water (`on`) / Papa with the hat from the house, puts it in his bag (`bag`) — `signs:hat` (`nail`: no gesture
  here — the house's); Sophia runs along the graves laying a shell on each (`graves`) / Papa carries the lidded basket,
  hissing (`basket`) — `signs:bird`.
- The way to the boat (the game chooses by Grandmother's strength): `walk_self` (≥ 3: she walks to the gangway by
  herself — `walk_self:there`), `walk_arm` (1–2: on Papa's arm — `walk_arm:there`), `walk_slow` (0: step by step along
  the shore, holding the stones, then the gangway's rail; Sophia sits on a bundle watching, Papa by the gangway with
  her bundle and her knife — `walk_slow:stones`, `walk_slow:there`). Each ends at the gangway's foot.
- `elbow` («Окно», full, ≈ 6 s): on the gangway Papa takes her by the elbow; she does not shake it off —
  `elbow:taken`; Sophia sits down by her place in the boat (the game's next scene shows it). Ends in the pose of М11
  «Сходни» (`gangway#rail`: her palm on the rail, the last time).
- `catch` («Окно», late, ≈ 10 s): she does not give him her elbow; Papa a step behind, ready to catch — `catch:behind`
  («Don't catch me…»); Sophia looks from him to her — `catch:look`; at strength 0 she stops at the gangway —
  `catch:stop` («Well, hold me…»). Ends in the pose of М11 «Сходни».
- `tent_walk` («Палатка», after the game's cut from `cape`, ≈ 10 s, by strength): he carries the things and does not
  look at her; she steps in by herself / leaning on Sophia's hand or his arm, he lifts her in / she walks by herself
  step by step, everyone waits — `tent_walk:board`; with `counted` Sophia counts her steps soundlessly with her lips —
  `tent_walk:count`; with `knock_broken` Sophia does not take her hand at first, then
  does — `tent_walk:hand`.
- `shawl_walk` («Платок», ≈ 14 s): Grandmother on the porch in Papa's jacket (`grandma_wear`) — `shawl_walk:jacket`
  («Where's your shawl?» — «I lost it»); she goes to the boat (her strength's way in it) — `shawl_walk:there`; on the
  gangway — `shawl_walk:doctor` («In town — a doctor»); she nods.
- `dinghy_board` («Вёсла», ≈ 20–30 s): Sophia sits down in the dinghy at the oars without a word and waits
  (`sophia_at` dinghy) — `dinghy_board:oars`; Grandmother into its stern — Papa sets her in under the arms (strength ≤
  2) or she steps in herself (`grandma_at` dinghy) — `dinghy_board:stern`; with `heard` Papa gets into the bow, his
  back to them, the bundle on his knees (`papa_at` dinghy) — `dinghy_board:bow_in`; else he holds the dinghy by the bow
  (`dinghy#bow`), looking at the fog, the shore, Sophia — `dinghy_board:hold`; with `knew` she lays her hand over his
  on the gunwale — `dinghy_board:hand` («The winter is yours…»); he pushes it off himself — `dinghy_board:push`
  («Along the shore…»); Sophia's line by the play — `dinghy_board:sophia`; with `knock_broken` she shakes Grandmother's
  hands off the oars, then lets them be — `dinghy_board:shake`. Ends in the pose of М11 «Вёсла» (`dinghy#oars`:
  Grandmother's hands over Sophia's): the mini-game moves `dinghy_at` (0 → about 0.4).
- `oars_after` (after М11, ≈ 18 s): the dinghy goes crooked, then straight, out along the shore (`dinghy_at` → 1);
  Papa walks the shore level with them, the bundle on his shoulder (or sits in the bow) — `oars_after:straight`;
  halfway her hand reaches for the oars by itself and lies back on her knees — `oars_after:hand`; at the big boat —
  `oars_after:there`.
- `from_water` (finals, ≈ 4 s a shot; the camera out over the water, looking in at the island, the motor's sound the
  game's): the house's door — through the veranda's glass the nail with the hat or empty (`hat`) — `from_water:door`;
  the gate, the chair by it or not (`chair`) — `from_water:gate`; the porch's empty rail — `from_water:rail`; with
  `graves` the row of little graves with wooden birds — `from_water:graves`. Each moment a shot made ready ahead; the
  game shows the ones its marks need.

The play's keys the pieces read (`party`; the game sets them from the play): the hour and the weather (the island's);
`chair`, `shell`, `graves`, `weed`, `boat_out`, `big_boat`, `luggage` — what the summer left on the shore; `hat` — the
hat on its nail or not (`from_water`); `skirt` — Sophia holds Grandmother's skirt at the pier (not «Вода: отпустила»);
`knew` — Papa knows (3.4, 4.1); `ask_back` — Sophia ≤ 1 (3.5); `heard` — Papa heard «Слышала» (the oars); `knock_broken`
— «Постучу» broken; `sign_smoke` (`pouch` · `shell` · `packet` · `pocket`), `sign_hat` (`on` · `bag` · `nail`),
`sign_bird` (`graves` · `basket` · `none`) — the last morning's gestures; who is here (`<id>_here`). The mini-games move
`stems`, `pull`, `let`, `step`, `rowboat`, `knot`, `rings`, `gust`, `parcel`, `dinghy_at` (the scene shows each — stage
5 adds them to its `states`; the gangway's М11 moves nothing: her palm leaves the rail).

## The pieces' code (stage 5)

`lib.js` `film(scene)` — each piece's `from` (places by `PLACES`, the camera, the scene's own keys) and `run`; played
by the world's `beats` (`modules/beats.js`, «Папа и море»'s, unchanged) from `script.js`; `showcase.js` plays a
selection in its play's keys. The camera: the scene's own moved nearer (`NEAR` — along the line the viewer sees them
by; over the water the eye 1.7 m over the sea plane, `water`), out over the water (`OFF`), or the operator on a person or a
point where the line to them is clear (`SHOT`); each choice's pose frames the chooser's face with the point in the
middle 4:3; each mini-game's pose its point there. People walk at their gaits (`go`); seated places put at once where
they stand. The mini-games' keys are shown by the scene (`script.js`: `stems`, `pull`, `let`, `step`, `parcel`;
`knot` — the net's tangle, `rings` — the rings on the glass, `gust` — the look, `rowboat`, `dinghy_at` — the boats).
The sea's mirror follows the weather (the island's keyed mirror: rough and rippled in the storm, glass in the calm).

### What the pieces need from the people (package Л) — named in the code, taken as they land

- Motions: Grandmother `rise_slow` (holding on — the rail, a hand), `shove` (the chair), `carve` (loop, sitting),
  `drape` (a shawl, a blanket, a jacket round someone); gait `old_walk`. Sophia `lean_over` (over the water), `stamp`,
  `throw` (a pebble, sitting), `kneel_pray` and `kneeling` (loop), `hit_knee`, `shake` (hands off the oars), `row`
  (sitting, in the dinghy: now `seated`); gait `run`. Papa `drink`, `untangle` and `untangle_fast` (loops, sitting: now
  `seated`), `write` (the list), `drape`. Eriksson `row` (sitting).
- Parts: `cigarette`, `knife` and `chip`, `shawl` (on Sophia), `blanket`, `list`, `parcel`, `jacket`, `bundle`, `hat`,
  `shell`, `basket`; `mug` is there. Looks: Grandmother without her shawl (`grandma_wear`), the straw hat on Sophia
  (`sophia_wear`).
- Close-ups — the world's `closeups`, in: `teeth` (the piece `teeth` opens it at `teeth:in`, `teeth_show`), `tremble`
  (`slip:hands`), and the mini-games' `stems` (`stems`), `gunwale` (`gunwale_push`), `knot` (`knot`), `string`
  (`parcel`), `oars` (`oars_let`), `rail` (`rail_let`), each opened by `<shot>_open`; their points in the contract.
- Parts — in, by the cast's names: `cigarette`, `mug`, `knife` and `chip`, `pebble`, `shawl` (on Sophia; Grandmother
  `long_dress` meanwhile), `blanket_fold` carried and `blanket_round` round the two, `list`, `parcel`, `jacket`,
  `bundle`, `hat`, `shell`, `basket`, `pouch`, `packet`. Motions — those above, until they come: stand-ins (standing,
  `seated`).

## Contract for the check

```json
{"beats": {
 "peonies": {"after": [], "tells": ["peonies:start", "peonies:hand"], "seconds": 12, "show": false},
 "teeth": {"after": ["peonies"], "tells": ["teeth:glint", "teeth:porch", "teeth:found", "teeth:in", "teeth:ask", "teeth:up"], "seconds": 25, "show": false},
 "ledge": {"after": [], "tells": ["ledge:edge"], "seconds": 12, "show": false},
 "wrist": {"after": ["ledge"], "tells": ["wrist:bottom"], "seconds": 4, "show": false},
 "wrist_after": {"after": ["wrist"], "tells": ["wrist_after:free", "wrist_after:stamp", "wrist_after:sat", "wrist_after:hand"], "seconds": 22, "show": false},
 "shoulder": {"after": ["ledge"], "tells": [], "seconds": 3, "show": false},
 "slip": {"after": ["shoulder"], "tells": ["slip:in", "slip:laugh", "slip:hands"], "seconds": 14, "show": false},
 "down": {"after": ["ledge"], "tells": [], "seconds": 4, "show": false},
 "down_after": {"after": ["down"], "tells": ["down_after:you", "down_after:sat", "down_after:hand", "down_after:up"], "seconds": 32, "show": false},
 "eriksson": {"after": [], "tells": ["eriksson:in", "eriksson:post", "eriksson:gunwale", "eriksson:knees", "eriksson:look"], "seconds": 26, "show": false},
 "eriksson_off": {"after": ["eriksson"], "tells": ["eriksson_off:gone", "eriksson_off:ask"], "seconds": 12, "show": false},
 "nets": {"after": [], "tells": ["nets:coffee", "nets:sat"], "seconds": 16, "show": false},
 "nets_say": {"after": ["nets"], "tells": ["nets_say:cup"], "seconds": 8, "show": false},
 "nets_nothing": {"after": ["nets"], "tells": ["nets_nothing:fast", "nets_nothing:watch"], "seconds": 10, "show": false},
 "net": {"after": ["nets"], "tells": [], "seconds": 3, "show": false},
 "net_after": {"after": ["net"], "tells": ["net_after:together", "net_after:thanks", "net_after:ask", "net_after:alone"], "seconds": 16, "show": false},
 "shell": {"after": [], "tells": ["shell:shell", "shell:look"], "seconds": 8, "show": false},
 "calm": {"after": [], "tells": ["calm:cat", "calm:gone", "calm:back"], "seconds": 30, "show": false},
 "calm_after": {"after": ["calm"], "tells": ["calm_after:still", "calm_after:second", "calm_after:roof", "calm_after:silence", "calm_after:pray", "calm_after:stone", "calm_after:papa", "calm_after:run"], "seconds": 34, "show": false},
 "graves": {"after": [], "tells": ["graves:bird", "graves:song", "graves:here", "graves:shell", "graves:row"], "seconds": 22, "show": false},
 "cat_rail": {"after": [], "tells": ["cat_rail:rail"], "seconds": 6, "show": false},
 "moon_path": {"after": [], "tells": ["moon_path:path", "moon_path:shawl", "moon_path:veranda"], "seconds": 22, "show": false},
 "home_late": {"after": [], "tells": ["home_late:sat", "home_late:lantern", "home_late:crazy"], "seconds": 16, "show": false},
 "step_beside": {"after": [], "tells": ["step_beside:sat", "step_beside:up"], "seconds": 12, "show": false},
 "rail": {"after": [], "tells": [], "seconds": 5, "show": false},
 "rail_after": {"after": ["rail"], "tells": ["rail_after:shriek", "rail_after:sky", "rail_after:creak", "rail_after:papa", "rail_after:blanket"], "seconds": 16, "show": false},
 "circles": {"after": [], "tells": ["circles:straight", "circles:tent", "circles:list", "circles:turn"], "seconds": 18, "show": false},
 "post": {"after": [], "tells": ["post:in", "post:grab"], "seconds": 18, "show": false},
 "post_after": {"after": ["post"], "tells": ["post_after:ask"], "seconds": 6, "show": false},
 "gate": {"after": [], "tells": ["gate:sat", "gate:call", "gate:up", "gate:papa", "gate:shove", "gate:sat2", "gate:chair", "gate:off"], "seconds": 30, "show": false},
 "foot": {"after": ["post_after"], "tells": ["foot:call", "foot:on", "foot:off", "foot:gone"], "seconds": 16, "show": false},
 "porch_stay": {"after": ["post_after"], "tells": ["porch_stay:call", "porch_stay:look", "porch_stay:gone", "porch_stay:papa"], "seconds": 16, "show": false},
 "called_porch": {"after": [], "tells": ["called_porch:said", "called_porch:eyes", "called_porch:hate", "called_porch:woken"], "seconds": 20, "show": false},
 "porch_dawn": {"after": [], "tells": ["porch_dawn:sat"], "seconds": 8, "show": false},
 "jacket": {"after": ["porch_dawn"], "tells": ["jacket:hem"], "seconds": 12, "show": false},
 "learns": {"after": ["porch_dawn", "jacket"], "tells": ["learns:said", "learns:hand", "learns:sophia"], "seconds": 9, "show": false},
 "run_to": {"after": ["learns", "jacket"], "tells": ["run_to:sees"], "seconds": 10, "show": false},
 "count": {"after": ["run_to"], "tells": ["count:sleeve", "count:look", "count:count", "count:in"], "seconds": 20, "show": false},
 "hem": {"after": ["run_to"], "tells": ["hem:said", "hem:silent", "hem:cling"], "seconds": 12, "show": false},
 "alone": {"after": ["run_to"], "tells": ["alone:said", "alone:stop", "alone:sleeve", "alone:later", "alone:coffee"], "seconds": 12, "show": false},
 "last_morning": {"after": [], "tells": ["last_morning:boat"], "seconds": 8, "show": false},
 "signs": {"after": ["last_morning"], "tells": ["signs:smoke", "signs:hat", "signs:bird"], "seconds": 10, "show": false},
 "walk_self": {"after": ["signs"], "tells": ["walk_self:there"], "seconds": 10, "show": false},
 "walk_arm": {"after": ["signs"], "tells": ["walk_arm:there"], "seconds": 14, "show": false},
 "walk_slow": {"after": ["signs"], "tells": ["walk_slow:stones", "walk_slow:there"], "seconds": 24, "show": false},
 "elbow": {"after": ["walk_self", "walk_arm", "walk_slow"], "tells": ["elbow:taken"], "seconds": 6, "show": false},
 "catch": {"after": ["walk_self", "walk_arm", "walk_slow"], "tells": ["catch:behind", "catch:look", "catch:stop"], "seconds": 10, "show": false},
 "tent_walk": {"after": [], "tells": ["tent_walk:board", "tent_walk:count", "tent_walk:hand"], "seconds": 10, "show": false},
 "shawl_walk": {"after": ["signs"], "tells": ["shawl_walk:jacket", "shawl_walk:there", "shawl_walk:doctor"], "seconds": 14, "show": false},
 "dinghy_board": {"after": ["signs"], "tells": ["dinghy_board:oars", "dinghy_board:stern", "dinghy_board:bow_in", "dinghy_board:hold", "dinghy_board:hand", "dinghy_board:push", "dinghy_board:sophia", "dinghy_board:shake"], "seconds": 25, "show": false},
 "oars_after": {"after": ["dinghy_board"], "tells": ["oars_after:straight", "oars_after:hand", "oars_after:there"], "seconds": 18, "show": false},
 "from_water": {"after": [], "tells": ["from_water:door", "from_water:gate", "from_water:rail", "from_water:graves"], "seconds": 16, "show": false}},
 "points": ["rock#ledge", "rock#shelf", "rock#warm", "peony:2#stems", "pier#end", "boat#boat", "rowboat#gunwale", "rowboat#seat", "net#knot", "gate#gate", "gate#stone", "chair#back", "porch#rail", "porch#landing", "graves#pit", "dinghy#oars", "dinghy#seat", "dinghy#bow", "gangway#rail", "big_boat#deck", "big_boat#bow", "luggage#basket", "house_front#veranda", "house_front#door", "house_front#gable", "veranda_in#hat", "cat#cat", "cat#back", "far_roof#roof", "far_boat#lamp", "sky#sun", "sky#sun_late", "sky#sun_dawn", "sky#moon", "grandma#chest", "grandma#hand_r", "grandma#hands", "sophia#chest", "sophia#hand_l", "sophia#shoulder_r", "papa#chest", "eriksson#chest", "teeth#teeth", "stems#stem", "tremble#hands", "gunwale#hands", "knot#thread", "knot#knot", "string#bow", "oars#hands", "rail#hand"],
 "offers": ["peony:2#stems", "sophia#hand_l", "sophia#shoulder_r", "rock#ledge", "rowboat#gunwale", "net#knot", "grandma#hand_r", "porch#rail", "grandma#hands", "gangway#rail", "dinghy#oars", "grandma#chest", "sophia#chest", "papa#chest", "stems#stem", "gunwale#hands", "knot#thread", "string#bow", "oars#hands", "rail#hand"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "chair": "none", "shell": false, "graves": 0, "weed": false, "boat_out": false, "big_boat": false, "luggage": false, "hat": "nail", "skirt": true, "knew": false, "ask_back": false, "heard": false, "knock_broken": false, "sign_smoke": "pocket", "sign_hat": "nail", "sign_bird": "none", "grandma_here": true, "sophia_here": true, "papa_here": true, "eriksson_here": false},
 "acts": {"stems": {"values": [], "tells": []}, "pull": {"values": [], "tells": []}, "let": {"values": [], "tells": []}, "step": {"values": [], "tells": []}, "rowboat": {"values": [], "tells": []}, "knot": {"values": [], "tells": []}, "rings": {"values": [], "tells": []}, "gust": {"values": [], "tells": []}, "parcel": {"values": [], "tells": []}, "dinghy_at": {"values": [], "tells": []}, "flash": {"values": [], "tells": ["flash:strike"]}, "stems_open": {"values": [], "tells": []}, "gunwale_open": {"values": [], "tells": []}, "gunwale_push": {"values": [], "tells": []}, "knot_open": {"values": [], "tells": []}, "string_open": {"values": [], "tells": []}, "oars_open": {"values": [], "tells": []}, "oars_let": {"values": [], "tells": []}, "rail_open": {"values": [], "tells": []}, "rail_let": {"values": [], "tells": []}}}
```

Against the plan's names: the shelf's points are the land's — `rock#ledge` (the plan's `ledge#edge`) and `rock#shelf`
(`ledge#water`): the shelf is the land itself, not a thing standing on it. `gate#stone` is the gate's.
