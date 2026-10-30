# Рыбак и его душа — игра в терминах кода

Стадии (`moood-me/moood:docs/writing/game-stages.md`): 3 — вся игра на трёх сценах (2026-10-22); 5 — 2026-10-29:
игра на настоящих местах, каждый шаг — на кусках сцен (контракт ниже, «Stage 5 — pieces»), мини-игры настоящие.
Сценарий — `scenario.md`; здесь — как он лёг в код.

- **Игра:** `games/the-fisherman-and-his-soul` (bespoke) этого репозитория; **мир:** `worlds/the-fisherman-and-his-soul`.
- **Места** (`story.js PLACES`): `stone` — сцена `stone` (С2; и лодка в море), `pier` — `pier` (С1), `shore` — `pier`
  с `view: shore` (берег: шалаш, лодка вдовы, поле, холм), `priest` — `priest-house` (С3), `well` — `well` (С4),
  `bridge` — `bridge` (С5: площадь, нищий), `room` — `potter-room` (С5 внутри), `deep` — `deep` (С6). Моменты — ключи
  из notes.md сцен (`STONE`, `DEEP`, `PRIEST`; в главах — часы `light`/`time`, места людей `<id>_at`, фонарь, нож,
  шалаш, волна). Ярлык шага (`where`) — только год и то, чего сцена не покажет (Душа с его лицом; Рыбак стар).
  Следы (`TRACES`): дыра в сети (`net_hole`), дым с левой руки Души (`soul_smoke`) — каждой сцене, у которой есть ключ.
- **Люди** — по id сцен, там, где их ставит сценарий (`SILENT` — те, кто молчит: `velvet`, `daughter`, `woman_a`,
  `woman_b`, `widow_girl`, `widow_boy`, `beggar`, `musician_a`, `musician_b`). Голос «women» — над `woman_a`.
- **Каркас** — как у «Папы и моря» и «Кентервиля» (`bespoke/game.js`, `story.js`, `jump.js`, `ui.js`, `map.js`,
  `minigames/`, `check/run.mjs`). Своё: `g.interrupt(choice, offers, otherwise, ms, phrase)` — знак (одно касание
  точки за `ms`, дуга времени тает; не тронут — `otherwise`), у главы `skip(r)` — глава не на этом пути (глава 4 на
  пути «Глубина»), `titleOf(r)` — имя главы по пути (III «Город» / «Без него»). Куски: `g.scene(place, {beat})`,
  `g.beat`, `g.told`, `piece(g, name, {moment: fn})` — как у «Летней книги»: шаг открывает сцену на куске, реплики —
  на моментах куска, выбор и мини-игры — в позе, где кусок кончился; варианты куска — ключами сцены (имена — в notes
  сцен, «Pieces»). Выбор открывает шаг, начатый куском перед ним (поэтому часть шагов стадии 3 слиты).

## Главы и шаги

| Глава | Шаги | Выборы (`choices`) |
| --- | --- | --- |
| Пролог «Сеть» | ночь (М1), отпустить (сеть, выбор, М1б), вечера | `net`: word / free |
| I «Тень у ног» | камень, Священник, праздник, колодец, пляска, Ведьма, восход луны, сердце (тень встаёт, выбор), нож | `stop` (прерывание): danced / passed; `witch`: demand / dance; `heart`: ask / cut / come |
| II «Три года» | глубина, год первый, до солнца (её закон, выбор), год второй, пляска под водой, один день (год третий, выбор) | `sit`: sit / song; ⚑ `day`: go / stay |
| III «Город» (`day: go`) | мост, площадь (и выбор «ждать»), ночь, чаша (утро и выбор), мост утром / мост ночью | `wait`: wait / back; `cup`: confess / quiet |
| III «Без него» (`day: stay`) | глубина, город, последний зов (год четвёртый и выбор), дом у моста | `rise` (прерывание): rose / stayed; ⚑ `last`: go / no; `giveback`: confess / found |
| IV «Берег» (кроме «Глубины») | зов, нож, зима, ночь в море (весна, вдова, выбор), сердце, волна (её принесло, выбор) | `widow`: out / stayed; ⚑ `wave`: stay / pull |
| Эпилог | утро, годы спустя | — |

Шаги главы III другого пути ничего не делают (проверка следит: не открывают сцен).

## Шкалы и метки

- `SCALES`: `soul` (Душа: тоскует ↔ ожесточилась, 0–4, порог ≥3), `song` (Её песня: звучит ↔ стихла, 0–3, порог ≥2).
  Обе с 0, ставятся первым выбором (П.4, 1.9) сдвигом на его значение. Видны слева внизу и на карте (раздел 8
  сценария): имя, точки и слово стороны («тоскует» / «ожесточилась», «звучит» / «стихла»); каждый сдвиг — плашка
  о том, куда сдвинулась («Душа стала чуть жёстче», «Её песня стала чуть ближе к нему»), без стрелок и цифр; первая
  установка шкалы — без плашки сдвига (раньше плашка «звучит» спорила со словом шкалы «стихла»); правило шкалы — словами, как притча (2026-10-30). Песню слышно: раздел «Звук». Каждый выбор, что трогает шкалу, отвечен: строка вспыхивает, плашка говорит, в какую сторону —
  и у края шкалы, где кружкам дальше некуда (2026-10-30).
- `EFFECTS` — раздел 8–9 сценария. Метки: `net`, `danced`, `witch`, `come`, `thief` (3.6 «признался», 3С.2 всегда),
  `widow`.

## Финал (`facts`)

Путь: `went` (Ш1 «пойду»), `late` (Ш1 «нет», Ш1б «пойду»), `deep` (оба раза «нет»). `deep` → «Два огня»; иначе Ш2:
`stay` → «Белые цветы», `pull` → «Фонарь на мостках». Остальное — по меткам и шкалам (`hard`, `sounds`, `thief`,
`widow`, `net`, `witch`).

## Стадия 5 — что уже стоит и что ждёт

- **Мини-игры** (`minigames/`, 11, раздел 7) — на языке мини-игр, по файлу на каждую (общее — `hands.js`, взят у
  «Кентервиля»): `net` (тянуть), `release` (держать и отпустить), `dance` (ритм бубна), `knife` (провести), `song`
  (ничего не трогать), `cup` (равновесие), `post` (держать и отпустить), `knife2` (провести — нож проходит насквозь),
  `net2` (тянуть), `hold` (держать), `drag` (тянуть). Каждая возвращает след неудачи, и главы его читают: дыра в сети
  (`marks.torn`, видна в 4.8), не взглянула (П.4), сбился в пляске (1.5), рука Души как дым (`marks.rough`), поёт
  держа за руку (2.1), чаша звякнула — хлеба нет (3.6), не оглянулся (3С.4), бросил нож (4.2), полсети (4.5), пальцы
  почти касаются (`marks.apart`, «Белые цветы»), сеть рвётся шире (4.8). Точки и ключи, которых у сцен ещё нет, —
  в контракте; проверка называет их «ждём».
- **Знаки** (1.3 «Остановиться», 3С.1 «Подняться») — метка на Рыбаке с одним лепестком (слово того, что значит
  касание), дуга времени 5 с, пока лепесток открыт — стоит (2026-10-30: 3 с вслепую игрок не понимал, что делает
  касание).
- **Выборы** — метка на груди (`id#chest`), не над головой; выбор «к кому» — на тех, к кому: «До солнца» — «сесть» на
  Душе, «на её песню» — на Русалке у камня.
- **Плашек нет**: что показывает кусок — показано; чего кусок не покажет (мысли, правило Ведьмы, годы, ноты), говорит рассказчик голосом.
- **Карта игры** — ряд листов поверх пустых мостков (`map.js`); под выбранным ответом — что из него вышло (раздел 11
  сценария: `came` у каждого ответа в `choices` главы), слева внизу — шкалы. Выбор главы одного пути (глава III:
  «Город» и «Без него») несёт `road` — у пройденной главы выборы другого пути не показываются; лист «Эпилог» (выборов
  нет) называет концовку, к которой пришла игра.
- **Эпилог** — две части; между ними «Дальше» (`g.next()`): пауза — игрока. После эпилога последний кадр уходит в чёрное, на нём —
  название концовки, потом карта выходит из чёрного (как в «Кентервиле»).

## Звук (2026-10-30)

Сценарий (раздел 4): звук — главный инструмент. `bespoke/sound.js` (по образцу «Папы и моря»; `ambience.js` — его),
записи — `bespoke/sounds/` (CC0, выбранные Павлом для «Парадизо» и «Папы»: вода у свай, берег, шторм, площадь ночью,
рынок, очаг; README). Фон игры объявляется со сценой (`g.scene(place, …, {beds})`, иначе — фон места, `PLACES.beds`)
и меняется страницей на склейке вместе с музыкой; внутри сцены — `g.beds`. Разовые звуки — на моментах кусков
(`on(g, moment, fn)`): хвост по воде, ушла под воду, скамья, нож в столб и из столба, медяки, медяк в реку, чаша о
полку, бубен, канат сети, нож по доскам, волна.

- **Её песня** — только игры: из музыки сцен голос убран (`music` сцен — вес «wordless female voice» 0). Четыре ноты
  (F–D♭–E♭–B♭, тональность мира) — настоящий голос: женщина напевает без слов (CC0, `sounds/hum-439504.mp3` — три
  выдержанные ноты, каждая нота песни — ближайшая из них, сдвинутая на полутон-три; 2026-10-30, второй круг: синтез
  звучал свирелью). Бубен, хлопки, сверчки, всплески, волна, медяки — тоже записи (`sounds/README.md`). Фон `song` (рядом: глубина, камень по
  вечерам), `song_far` (с камня, слышно с мостков: «До солнца»), `song_under` (из-под воды у камня: 2.6, 3С.3 при
  Песне ≥2); разово — `notes`: все четыре, три (повисают: «Фонарь»), оборванные на третьей (клятва в 4.1).
  `hush` — обрыв (сел с Душой — песня обрывается; ушёл с Душой — обрывается), `again` — М4: тронул — смолкла и снова.
  Громкость её голоса — вровень с музыкой сцены (`VOICE` 1.6; 2026-10-30, седьмой круг: при 0.6 песня по замеру была
  на ~10 дБ тише музыки, а шкалу «Песня» игроку предлагают слушать).
- **Бубен** — фон `tambourine` в куске `dance`; в М2 бубен бьёт на долях ритма мини-игры (фон глушится).
- Места: мостки — вода у свай; берег — прибой (зимой холодный ветер, в ночь волны — шторм); камень — вода у борта;
  дом Священника — море за стенами; колодец — ветер в елях и сверчки; мост — река и гул города (у площади громче,
  утром — рынок); комната гончара — очаг; глубина — тяжесть воды и пузыри; карта — вода у свай.
- Проверка (`check/run.mjs`) — фоны из `sound.js`, уровни 0…1, без секунд; каждый `g.sound.<имя>` глав и мини-игр
  есть в `sound.js`.

## Голоса (`people.json`)

Рассказчик — Charon; Рыбак и Душа — Orus (Душа тем же голосом, тише и суше: так в сценарии); Русалка — Leda; Ведьма
— Pulcherrima; Священник — Alnilam; гончар — Iapetus; вдова — Vindemiatrix; девушка — Aoede; женщины — Achernar.

## Проверка

`node bespoke/check/run.mjs [клон мира]` (по умолчанию — мир из game.json) — все 1 440 путей (каждая комбинация
выборов и знаков, что встречает путь), на каждом: места игры — сцены мира, люди — игры, ключи — из states сцены,
точки выборов — элементы сцены или люди в кадре, реплики — люди `people.json`, куски и их моменты — в контракте сцены
(notes.md, «Contract for the check»), одна концовка и та, что по правилу; выборы ровно те, что у пути; шкалы в
границах; «вор» — где положено; `PLAYS` карты автора кончаются как подписаны — и ещё раз со всеми мини-играми
проваленными. Отдельно, как «ждём», — что контракт кусков просит у сцен, а у них ещё нет. `@moood/check` — тексты и
русский перевод.

## Stage 5 — pieces

The contract between the game (`games/the-fisherman-and-his-soul`, the game's author, branch `r3/rybak-s5`) and the
scenes (`worlds/the-fisherman-and-his-soul`, the pieces' author). Written 2026-10-29 before either side codes, after
«Кентервильское привидение»'s (works-007, `r3/canterville-s5`) and «Летняя книга»; a change to it is agreed and written
here first. The scenario is `scenario.md` (§5 steps, §7 mini-games, §10 finales); what is not said here is as it says.

### How a piece works (as in «Летняя книга», world module `beats`)

- The world gets the module `beats` (copy `worlds/the-summer-book/modules/beats.js` and `beats.md`); each scene with
  pieces: its `FILM` in `lib.js`, `script.js` `scene.kit.beats.play(scene, scene.lib.FILM)`. The key `beat`: the game
  names a piece, it plays from its `from` (or on from the one before, if it is `after` it); the scene tells
  `<piece>:<moment>` at its moments and `beat:<piece>` at its end; it ends in a living pose (values held, people
  breathe).
- The game opens a scene on a piece (`g.scene(place, {beat, here, moods, keys})`), says the lines **at the moments**
  the rows name (a voice takes as long as it takes: a piece never waits for a line, the game waits for both), then
  plays choices and mini-games in the pose the piece ends in. «After» — said once the piece has ended.
- `here` and `moods` are the game's; every other starting value is the piece's `from`. Keys the game sets besides
  (variants of a piece) are named in its row (**keys:**). Person ids are the scenes' elements (below).
- Seconds are the piece's own, without lines. Shots: `wide` — the scene's picture camera; `medium` / `close` —
  `camera_target` + `camera_shot`; the exact framing is the pieces' author's; faces must read (readable, not dark —
  the nights moonlit and bright, the lantern warm against the moon).
- Each scene's notes.md gets a «Contract for the check» block as the summer book's (beats with `after`, `tells`,
  `seconds`; points; keys); the game's `check/run.mjs` reads it.
- **Traces the game passes on** (a mini-game's miss, scenario §7) — keys the game sets on every scene where the thing
  is seen: `net_hole` (0 / 1 torn at the edge / 2 torn wider — the net on the pier's rail, in the boat, round her);
  `soul_wear: "soul_smoke"` (the Soul's left hand blurred like smoke, wherever the Soul is seen after 1.10).

### Places (the game's `PLACES` → the world's scenes)

| place | scene | what it is |
| --- | --- | --- |
| `stone` | `stone` (С2) | the stone in the bay from the pier; also the boat at sea (`boat` true, no Mermaid: the widow's boat, 4.5–4.6) |
| `pier` | `pier` (С1) | the pier, its end, the post, the water by it, the stone beyond |
| `shore` | `pier` (С1), key `view: "shore"` | the same bay seen toward the land: the sand at the pier's root, the rail with the net, the hut (ch. 4), the widow's boat drawn up, up the bank the field's edge where the linen is bleached (the mound) |
| `priest` | `priest-house` (С3) | the white room on the hill |
| `well` | `well` (С4) | the glade in the fir wood |
| `bridge` | `bridge` (С5) | the town's end of the bridge, the quay lane (the square's end), the potter's house from outside |
| `room` | `potter-room` (С5, inside) — **ask 6** | inside the potter's house |
| `deep` | `deep` (С6) | under the water by the stone |

### People in the scenes (element ids = the game's people.json keys)

`fisherman`, `soul`, `mermaid`, `witch`, `velvet`, `priest`, `potter`, `daughter`, `woman_a`, `woman_b` (as now),
and new: `girl` (the girl dancing barefoot on the pier, 1.3), `widow`, `widow_girl` (her elder, ~9), `widow_boy` (the
younger, ~6), `beggar` (the old beggar asleep on the bridge, 3.7б), `musician_a`, `musician_b` (the square, 3.2).
Looks by `<id>_wear`: `soul_smoke` (the trace above), `fisherman_old` (white hair: «Фонарь на мостках»'s last shot,
«Два огня»). The «women» voice of people.json is said at `woman_a`.

**Asks of the world:**

1. **The pier** (the look of stage 2 now, no keys) gets:
   - `light`: `night` (the default: moon) / `dawn` (a misty dawn, pale sun) / `noon` (bright day, the feast) /
     `evening` (the moon rising low behind the pier's end) / `morning` (mist); `mist` 0..1; `snow` (bool: snow on the
     boards and the sand, the shore frozen — 4.3).
   - The lantern: `lantern_at`: `post` (hung on the hook, lit — the default) / `boards` (standing on the boards by the
     post, lit — after 1.10) / `none` (the hook empty: someone carries it — `<id>_with: ["lantern"]`, the cast's part).
   - The knife: `knife`: `none` / `post` (driven into the post at chest height: the green snakeskin handle; `rust`
     bool — rusty from chapter 4) / `boards` (lying on the boards, thrown — М6's miss).
   - `net_rail` (bool, default true: his net hung on the rail at the pier's root; with `net_hole`).
   - The shore (seen with `view: "shore"`): `hut` (`none` / `half` / `built` / `gone`: a hut of willow rods by the
     water), `shawl` (bool: the Witch's shawl and a loaf by the hut's door), `widow_boat` (bool: the widow's husband's
     boat drawn up on the sand), `wave` (0 calm … 0.3 the sea dark and coming … 1 the black wave over the sand),
     `mound` (bool: a fresh mound at the field's edge), `linen` (bool: linen laid out to bleach on the field),
     `shells` (bool: shells laid at the field's corner — the unmarked graves).
   - Under the water by the stone: `under_light` (0..1 a pale light under the water by the stone, not rising — 4.1);
     `far_lantern` (0..1 his lantern going away over the hill toward the bridge — 2.7 «нет», «Два огня»).
   - People's places (`<id>_at`, as `stone` does): `fisherman_at` `end` (on the boards by the post) / `edge` (sitting
     on the pier's edge, legs over the water — 2.3; the Soul beside him: `soul_at` `edge`) / `shallows` (in the water
     by the pier's end to the waist — 2.2, 2.4, 2.6, 3С.3) / `post` (in the water, his hand on a post of the pier —
     3С.4) / `under` (gone under) / on the shore `hut`, `sand` (kneeling by her), `field` (at the field's edge);
     `mermaid_at` `pier` (by the pier's end, as now) / `stone` (to the shoulders by the stone) / `sand` (lying dead on
     the sand — 4.7, 4.8, «Белые цветы»: still, the tail on the sand, eyes closed); `soul_at` `end` / `edge` / `walk`
     (going away up the pier). The village, the widow's family, the Priest and the Witch on the pier and the shore
     where the rows say.
   - A line for the knife (М3, М6): an element `cutline` — the shadow's edge along his soles on the boards, heel to
     toe, points `cutline#heel`, `cutline#toe`; key `cut` 0..1 (the cut drawn along it, a thin line of light),
     `cut_rough` (bool: the cut uneven).
   - `lantern_post#grip` (his hand on the post at the water — М9); `bundle` (bool: her body wrapped in his net on the
     sand, point `bundle#rope`) and `drag` 0..1 (it drawn from the water's edge up to the field's edge, him backing
     before it — М8б).
2. **The stone** gets: `light` `night` (default) / `evening` / `dawn`; `haul` 0..1 (the net drawn in: over the bow →
   in the boat), `heel` 0..1 (the boat heeling), `fish` 0..1 (the net full of fish as it comes up), `knot` 0..1 (the
   knot of the net by her hand loosening: 1 — loose), `splash` (a pulse: her tail beats the water), `pass_light` 0..1
   (a pale light passing under the boat's keel: 0 → 1 → 0); points `net_over#rope` (the rope at the bow, where his
   hands pull), `net_over#knot`.
3. **The well** gets: `time` `midnight` (default: the full moon over the firs) / `evening` (dusk, the moon not up) /
   `dawn` (the moon pale, the sky greying); `round` (bool: the dance — the two going round the well facing each other
   while it is set; the scene moves them on the circle), `stumble` (a pulse: he stumbles in the dance), `knife_ground`
   (bool: the knife on the slabs at his feet).
4. **The bridge** gets: `time` `night` (default) / `evening` / `morning` (the market: the potter's wares out, people);
   `square` (bool: lanterns hung across the lane, `musician_a` and `musician_b` playing at the bridge's head, an empty
   circle on the cobbles, the potter's stall with coppers on it — point `stall#coppers`); `door` 0 shut … 1 open (the
   potter's door); `beggar` asleep against the bridge's parapet midway, a bowl of coppers at his feet (point
   `bowl#coins`; `copper` a pulse: the bowl rocks, a copper falls into the river); `soul` (the Soul with his face and
   the lantern, 3С.2); a place under the bridge's end by the water where one sits (3.1: `fisherman_at` `under`);
   `woman_a`, `woman_b` at the morning market (3С.2's rumour).
5. **The deep** gets: `mermaid_near` 0..1 (she slides nearer him on the slab — М4); the rest it has (`fisherman_at`,
   `hands`, `years`, `dusk`, `far_light`).
6. **A new scene `potter-room`** (С5's inside, a small interior in the same look as the others; the bridge shows the
   house only from outside): the low room — the hearth (`fire` 0..1), the bench by it (point `bench#seat`; one lies on it asleep), the shelf with the silver cup and the loaf
   (points `shelf#cup`, `shelf#bread`: behind the bread), the daughter's pallet by the fire, the potter's bed, the door
   (`door` 0..1) and the window onto the bridge; `morning` 0..1; `cup_at` `shelf` / `hand` (in a person's hand: the
   cast's part `cup`) / `bag` (in the Fisherman's shoulder bag) / `gone`; people `fisherman`, `potter`, `daughter`,
   `soul`. Decided by the lead (2026-10-29): a scene of its own, not the bridge's house opened up; the game's place
   `room` is it.
7. **The cast**: parts `knife` (the Witch's knife, a green snakeskin handle; `knife_rusty`), `cup` (the silver cup,
   point `#cup`), `bag` (a shoulder bag), `bread` (a round loaf), `ring` (a ring on the Soul's finger, seen close),
   `tambourine_hand` (held up in the left hand — dancing; point `#tambourine`), `bundles` (the widow's); looks
   `soul_smoke`, `fisherman_old`; people `girl` (barefoot, a light dress, a ribbon), `widow` (a dark shawl, a plain
   dress), `widow_girl`, `widow_boy` (barefoot children), `beggar` (old, a ragged coat, a grey beard), `musician_a` (a
   fiddle), `musician_b` (a pipe).
8. The Soul see-through (the water through him) stays the engine's ask (pier notes).

### New motions (Kimodo; a loop unless «once»)

| name | prompt | s | where |
| --- | --- | --- | --- |
| `haul_net` | A person standing in a boat pulls a heavy rope toward them hand over hand, leaning back | 4 | П.2, 4.5–4.6 |
| `struggle` | A person thrashes their arms and twists their shoulders as if caught in something | 3 | П.3 |
| `laugh` | A person laughs hard, throwing the head back, shoulders shaking | 4 | the Mermaid, the Soul, the Witch, the Fisherman |
| `sign` (once) | A person touches their forehead with the right palm, then lays the palm on the chest over the heart | 3 | 1.2, 1.5, «Два огня» |
| `rise_sharp` (once) | A seated person stands up abruptly from a bench, pushing it back | 2 | 1.2 |
| `point_away` (once) | A stern person flings the right arm out, pointing at the door | 3 | 1.2, «Фонарь» |
| `dance_light` | A young woman dances in place lightly, turning and stepping from foot to foot, arms out | 4 | 1.3 |
| `clap` | A person stands clapping their hands in rhythm | 3 | 1.3 |
| `whisper` | A person leans to the side and whispers behind a raised hand | 4 | 1.3, 3С.2 |
| `clumsy_dance` (once) | A man takes two clumsy dance steps, stumbling, arms out for balance, then laughs | 3 | 1.3, 2.5 |
| `look_back` (once) | A walking person stops, turns the head and shoulders to look back over the shoulder, then turns forward again | 3 | 1.3, П.4, 4.5 |
| `swing_feet` | A person sitting on a high ledge swings their bare legs back and forth | 4 | 1.4 |
| `dance_tambourine` | A woman dances, turning, beating a tambourine held up in her left hand with her right | 4 | 1.5, «Два огня» |
| `dance_round` | A man dances in place facing a partner, stepping side to side with the arms raised | 4 | 1.5, 1.6 |
| `pull_hands` (once) | A person grabs someone's hands with both hands and pulls them forward, walking backward | 3 | 1.5 |
| `pant` | A tired person stands bent forward with the hands on the knees, breathing hard | 4 | 1.6 |
| `throw_down` (once) | A person throws a small object down onto the ground in front of someone | 2 | 1.6 |
| `hold_out` | A person holds out an object in both hands toward someone | 3 | П.5, 1.6, 2.4, 3.6, 3Л |
| `kneel` | A person kneels on both knees, upright, the hands on the thighs | 5 | 1.10, 3.6, 4.7 |
| `bend_over` (once) | A kneeling person bends down low over something lying on the ground before them | 4 | 4.7 |
| `cut_shadow` (once) | A crouching person draws a knife along the ground at their feet from heel to toe with the right hand | 4 | 1.10, 4.2 |
| `stab_post` (once) | A person drives a knife into a wooden post at chest height with the right hand | 2 | 1.10, 4.2 |
| `pull_knife` (once) | A person pulls a knife out of a wooden post at chest height with the right hand | 2 | 4.2, the finales |
| `rise_ground` (once) | A person lying flat on their back on the ground slowly gets up to standing | 5 | 1.8 |
| `plead` | A person stands holding out both open hands toward someone, pleading | 4 | 1.8–1.9 |
| `sit_edge` | A person sits on the edge of a high ledge, legs hanging down, the hands on the edge beside the hips | 6 | 2.3 |
| `call_out` | A person stands cupping both hands round the mouth and calls out | 4 | 2.2, 4.1, 4.3 |
| `hang_lantern` (once) | A person reaches up and hangs a lantern on a hook at head height with the right hand | 3 | 4.1 |
| `weave` | A person kneels weaving thin rods together with both hands | 5 | 4.3 |
| `sit_ground` | A person sits on the ground, knees drawn up, the arms round them | 6 | 3.1, 4.3, «Фонарь» |
| `drag_back` | A person walks backward slowly, dragging something heavy along the ground with both hands | 4 | 4.8 |
| `lie_still` | A person lies still on their back on the ground | 6 | 4.7–4.8, «Белые цветы» |
| `fall_beside` (once) | An exhausted person drops to the knees and lies down on their side on the ground | 4 | 4.8 |
| `bless` (once) | A priest raises the right hand and makes a wide slow sign of blessing in the air | 4 | the finales |
| `throw_far` (once) | A person throws something far with the right arm, overhand | 2 | «Белые цветы» |
| `preach` | A priest stands speaking to a crowd, gesturing slowly with open hands | 5 | the finales |
| `sing` | A seated person sways gently from side to side, singing, the hands in the lap | 5 | the Mermaid |
| `hide_face` | A seated person bows the head and covers the face with both hands | 4 | 2.5 |
| `lie_bench` | A person lies asleep on their side on a bench | 6 | 3.4, 3С.2 |
| `sleep_floor` | A child lies curled up on their side, asleep on the floor | 6 | 3.3–3.5 |
| `search` | A person searches a shelf, moving things aside with both hands | 4 | 3.5 |
| `wrist_behind` (once) | A person grabs their own right wrist with the left hand and pulls it behind the back | 3 | 3.2, 3.7б |
| `shrug` (once) | A person shrugs both shoulders | 2 | 3.3 |
| `hands_under` | A seated person sits with both hands tucked under the thighs | 5 | 3.3 |
| `sleep_wall` | An old person sits on the ground against a wall, the head dropped, asleep | 6 | 3.7б |
| `lay_down` (once) | A person bends down and lays something on the ground before them | 3 | the finales |
| `knot_net` | A seated child knots a net in their lap with both hands | 5 | «Фонарь» |
| `run` | A person runs forward at a steady pace | 4 | 2.7, 4.7 |
| `shield` (once) | A woman reaches back with both arms, keeping someone behind her | 3 | 4.4 |
| `play_fiddle` | A person plays a fiddle held under the chin | 4 | 3.2 |
| `play_pipe` | A person plays a small pipe held in both hands | 4 | 3.2 |
| `wade` | A person walks slowly through waist-deep water, pushing with the arms | 4 | 1.1, 1.11, 2.7 |

Existing (cast.md): `seated`, `hands_behind`; the engine's `stand`, `walk`. The pieces' author may take a nearer
existing one where Kimodo fails (or one motion for two rows), and says so in cast.md. The Mermaid's motions are seen
from the chest up (she is in the water or on the stone).

### Pieces

Each: **id** · place · from · who moves (motions) · what happens · seconds · shot · lines (the game says them at the
moment named) · tells.

**Prologue «Сеть»**

- `night` · stone · `light` night, `boat`, `lantern` 1, `net` heap, `fisherman_at` boat, no Mermaid · the camera from
  the moon's path in to the boat; he casts the net (`net` heap → over) and takes the rope (`haul_net`) · 15 · wide, a
  slow push in → medium on him · at `night:cast`: narrator «Every evening…» · `night:cast`, `night:rope`; then **M1**
- `in_net` · stone · after M1 · `net` over, `mermaid_at` net, eyes closed, asleep; she opens her eyes (afraid),
  `struggle`; he holds the net's edge by her hand (`fisherman_reach` `net_over#knot`) and looks at her · 12 · close on
  her → medium on the two · at `in_net:wake`: Mermaid «Let me go!…» · `in_net:wake`, `in_net:hold`; then the choice
  «Сеть» (on `fisherman`), his line (and her oath: word), **M1б**
- `go_word` · stone · after M1б; **keys:** `looks` (bool, false when M1б missed: she slips out not looking at him) ·
  she sinks (`mermaid_at` water → `mermaid_here` false) without looking back · 6 · medium · — · `go_word:under`
- `go_free` · stone · after M1б; **keys:** `looks` · she lingers by the bow (`mermaid_at` water) looking at him (with
  `looks` false — not at him), then goes, turns once (`look_back`) and is gone · 12 · medium on her · at
  `go_free:linger`: «Do you want nothing?» · `go_free:linger`, `go_free:turn`, `go_free:under`
- `evenings` · stone · `light` evening → night (→ dawn); **keys:** `net` (`word` / `free`) · word: she on the stone
  `sing`s looking at the water, he `haul_net`s, the net full (`fish` 1), twice over; free: the stone empty, he sits on
  the thwart (`seated`) till the dawn greys; then she on the stone by herself `sing`ing, looking at him; then empty
  again · 18 · wide · — · `evenings:sing`, `evenings:empty` (free), `evenings:end`
- `market` · bridge · `time` morning, the market, the potter at his wares · the Fisherman comes off the bridge, gives
  the fish (`hold_out`), takes the coins without counting, walks back over the bridge · 12 · wide → medium on the two
  → wide · at `market:end`: narrator «And he had more fish…» · `market:give`, `market:end`

**Chapter I «Тень у ног»**

- `ask_wife` · stone · `light` night, `boat` false, `mermaid_at` stone · the Fisherman `wade`s in from the right and
  stops knee-deep (`fisherman_at` shallows) · 8 · wide → medium two-shot (both faces) · the talk after ·
  `ask_wife:there`
- `laugh_tail` · stone · after `ask_wife` · she `laugh`s, `splash` · 4 · close on her · her «Send it away — and come»
  after · `laugh_tail:splash`
- `dive` · stone · after `laugh_tail` · she laughs and slides into the water (`mermaid_at` water → `mermaid_here`
  false) · 5 · medium · — · `dive:under`
- `priest_sign` · priest · `morning` 1, the 1.2 row · the Priest makes the `sign` · 5 · medium on the Priest · the
  Fisherman's question before; the Priest's line after · `priest_sign:sign`
- `bench_falls` · priest · after `priest_sign` · the Fisherman `rise_sharp`, `bench_tilt` → 90 · 3 · wide · his line
  after · `bench_falls:fall`
- `begone` · priest · after `bench_falls` · the Priest `point_away`; the Fisherman walks to the threshold (0.45,
  5.75), turns, makes the `sign` — and drops his hand halfway · 12 · medium on the Priest → close on the Fisherman at
  the door · at `begone:point`: «Begone!» · `begone:point`, `begone:sign`
- `feast` · pier · `light` noon; `girl` dancing on the boards (`dance_light`), `woman_a`, `woman_b` clapping (`clap`),
  then `whisper`; the Fisherman walks in from the pier's end toward the shore and comes level with the girl (slows,
  stands a moment: the living pose) · 12 · wide → medium on him and the girl · at `feast:whisper`: women «By the
  well…» · `feast:whisper`, `feast:level`; then the sign «Остановиться» (a touch on `fisherman`, 3 s)
- `danced` · pier · after `feast` · he stops, looks at her feet (`fisherman_look` `girl#feet`); she pulls his sleeve
  (`girl_reach` his left hand); he `clumsy_dance`s, laughs; his shadow on the boards dances with him · 10 · medium on
  the two → wide (the shadow) · at `danced:pull`: girl «Dance, fisherman!» · `danced:pull`, `danced:laugh`
- `passed` · pier · after `feast` · he walks on toward the shore, `look_back` once · 6 · medium · — · `passed:look`
- `well_evening` · well · `time` evening, the Witch on the rim `swing_feet`, the Fisherman `walk`s in along the slabs
  with his lantern and stops before her · 10 · wide → medium two-shot · the talk after · `well_evening:there`
- `long_look` · well · after `well_evening` · she looks at him, smiling · 4 · close on her · — · `long_look:end`
- `dance` · well · `time` midnight, the 1.5 places, `velvet_here` false · the Witch `dance_tambourine`
  (`witch_with: ["tambourine_hand"]`), the Fisherman `dance_round`, the two going round the well (`round`) · 8 · wide
  · — · `dance:begin` (the dance goes on: its living pose); then **M2**
- `velvet` · well · after M2; **keys:** `stumbled` (bool: M2 missed — she laughs as she pulls) · the man in black
  steps out by the last fir (`velvet_here`); `round` stops; the Witch `pull_hands` the Fisherman toward him · 8 · medium
  → close on the man · at `velvet:bow`: Witch «Bow to him» · `velvet:bow`
- `sign_velvet` · well · after `velvet` · the Fisherman makes the `sign`; the man in black turns and walks into the
  wood (`velvet_here` false at the end); the Witch cries out (afraid), the dance falls apart; she goes back to the rim,
  `pant` · 12 · close on his hand → wide · — · `sign_velvet:sign`, `sign_velvet:gone`, `sign_velvet:cry`
- `broken` · well · after `sign_velvet` · she breathes hard (`pant`, angry), straightens · 4 · medium on her · her line
  after · `broken:end`; then the choice «Ведьма» (on `fisherman`)
- `demand` · well · after `broken` · she looks long (close), leans to him and whispers, `throw_down`s the knife
  (`knife_ground` true), turns away to the well · 14 · close on her → medium · at `demand:promise`: «I promised»; at
  `demand:knife`: «Take it. Cut…» · `demand:promise`, `demand:whisper`, `demand:knife`, `demand:away`
- `dance_dawn` · well · after `broken` · she stands still, then `laugh`s — another laugh; the two `dance_round` slowly
  (`round`, `witch_with` []), the moon pales (`time` midnight → dawn); at dawn she `hold_out`s the knife
  (`witch_with: ["knife"]`), he takes it, her hand stays on his (`witch_reach` his right hand) · 18 · wide → close on
  the hands · — · `dance_dawn:laugh`, `dance_dawn:dawn`, `dance_dawn:hand`
- `moonrise` · pier · `light` evening, the moon rising behind the pier's end; the Fisherman on the boards with his back
  to the moon, his shadow long to the water; `mermaid_at` stone, watching; **keys:** `smell` (bool: «плясал с ней» —
  the camera goes to her for her line) · 10 · wide (the shadow down the boards) → close on her (smell) · at
  `moonrise:her` (smell): «You smell of the wood» · `moonrise:shadow`, `moonrise:her`
- `shadow_rises` · pier · after `moonrise` · the shadow rises from the boards: the Soul (`soul_here`, `rise_ground`)
  — his face; then `plead` · 12 · medium → close on the Soul's face · his words after `shadow_rises:face` ·
  `shadow_rises:up`, `shadow_rises:face`; then the choice «Сердце» (on `fisherman`)
- `heart_cut` · pier · after `shadow_rises` · he turns to the water (`fisherman_look` the stone), the Soul pleads on ·
  6 · close on the Soul → medium · at `heart_cut:turn`: the Soul's broken line · `heart_cut:turn`
- `heart_come` · pier · after `shadow_rises` · by the stone the Mermaid sinks, and comes up after a long while · 9 ·
  wide on the stone · — · `heart_come:under`, `heart_come:up`
- `knife_ready` · pier · after `shadow_rises`, `heart_cut` or `heart_come` · the Fisherman takes the knife
  (`fisherman_with: ["knife"]`), crouches at his heels (`kneel`) · 4 · close on his feet and the shadow (`cutline`) ·
  — · `knife_ready:end`; then **M3**
- `cut` · pier · after M3 · he stands; the Soul steps apart (a metre); he `stab_post`s the knife into the post
  (`knife` post), sets the lantern down on the boards (`lantern_at` boards) · 10 · medium · — · `cut:apart`, `cut:post`
- `into_sea` · pier · after `cut` · he walks off the pier's end into the water toward the stone (`wade`); the Mermaid
  by the stone waits till he is far from the Soul, then laughs, takes his hand (`mermaid_reach`), both go under; the
  Soul picks up the lantern (`soul_with: ["lantern"]`, `lantern_at` none) and looks at the water · 18 · wide → medium on
  the Soul · at `into_sea:soul`: narrator «And the sea took him» · `into_sea:far`, `into_sea:under`, `into_sea:soul`

**Chapter II «Три года»**

- `deep_song` · deep · `fisherman_at` sand · she `sing`s; the camera comes down from the surface's light to the two ·
  10 · wide → medium two-shot · — · `deep_song:sing`; then **M4**; then narrator «A year went by…» (in the pose)
- `come_out` · pier · `light` dawn, `mist` 1; the Soul (`soul_with: ["lantern"]`) on the boards at the end, the
  Fisherman not here · the Soul `call_out`s; the Fisherman comes up from the water to his waist (`fisherman_at`
  shallows) · 10 · wide in the mist → medium on the two · at `come_out:call`: Soul «Come out» · `come_out:call`,
  `come_out:up`; the talk after
- `law` · pier · after `come_out` · by the stone the Mermaid comes up (`mermaid_at` stone) and comes no nearer · 4 ·
  wide on the stone · her line after · `law:up`; then the Soul «Then sit with me…» and the choice «До солнца»
- `sit_edge` · pier · after `law` · he climbs onto the boards and sits on the pier's edge beside the Soul
  (`fisherman_at` / `soul_at` edge, `sit_edge`), not touching; the Soul talks, `laugh`s once; by the stone the Mermaid
  turns her back · 16 · medium two-shot → wide (her back by the stone) · — · `sit_edge:sat`, `sit_edge:laugh`,
  `sit_edge:back`
- `to_song` · pier · after `law` · he sinks into the water toward the stone (`fisherman_here` false); the Soul alone on
  the boards looks at the water and puts out the lantern (its light 1 → 0) · 12 · medium on the Soul → close on the
  lantern · — · `to_song:under`, `to_song:out`
- `ring` · pier · `light` dawn, the second year: the Soul on the boards (`soul_with: ["lantern", "ring"]`), the
  Fisherman in the shallows · the Soul raises the hand with the ring (`hold_out`) · 6 · close on the ring → medium ·
  the talk after · `ring:shown`
- `laugh_go` · pier · after `ring`; **keys:** `hard` (bool: a short angry laugh; else a tired one) · the Soul `laugh`s
  and walks away up the pier (`soul_at` walk → `soul_here` false) · 10 · medium · — · `laugh_go:laugh`, `laugh_go:gone`
- `dance_deep` · deep · `fisherman_at` standing · his ask and her answer before; he `clumsy_dance`s on the sand; she
  `laugh`s; then looks at his feet (`mermaid_look` `fisherman#feet`) and `hide_face` · 16 · medium → close on her · at
  `dance_deep:dance` («плясал»): «Like this…» · `dance_deep:dance`, `dance_deep:laugh`, `dance_deep:feet`,
  `dance_deep:hide`
- (2026-10-30) `third_year` and `fourth_year` end on the Soul's face (seen from the water's side) and the game says
  the Soul's words in that pose; the stone comes after in pieces of their own — `third_stone`, `fourth_stone` (the
  scene's own camera on the bay: the pier, the two, the stone and her light; then medium on him for the choice); `go_day`,
  `stay_day` follow `third_stone`, `late_go`, `turn_away` follow `fourth_stone`. The rows below are as first written.
- `third_year` · pier · `light` dawn, the Soul on the boards, the Fisherman in the shallows; **keys:** `song` (bool: by
  the stone under the water her faint light — the song is the game's sound; else the stone empty) · the Soul walks to
  the pier's end, nearer him; then the camera to the stone · 10 · medium on the Soul → wide on the stone · the Soul's
  lines at `third_year:near`; the song or the quiet at `third_year:stone` · `third_year:near`, `third_year:stone`;
  then the choice «Один день» (⚑)
- `go_day` · pier · after `third_year` · he `laugh`s; three strides through the shallows up onto the boards
  (`fisherman_at` end), wet; the Soul gives him the lantern (`fisherman_with: ["lantern"]`) and steps into his shadow
  (`soul_here` false: it sinks into him); close: by the stone the Mermaid sees, goes under; he turns to the water; then
  goes off up the pier almost running (`run`) · 22 · medium → close on her → medium → wide · at `go_day:turn`: «I will
  come back» · `go_day:up`, `go_day:in`, `go_day:her`, `go_day:turn`, `go_day:gone`
- `stay_day` · pier · after `third_year` · he turns to the water; the Soul walks off up the pier with the lantern and
  over the hill (`soul_here` false; `far_lantern` 0 → 1, seen a long while) · 16 · medium → wide · at `stay_day:turn`:
  the Soul's line · `stay_day:turn`, `stay_day:gone`

**Chapter III «Город»** (went)

- `under_bridge` · bridge · `time` evening; the Fisherman sitting under the bridge's end by the water (`fisherman_at`
  under, `sit_ground`, the lantern by him) · 6 · medium · at `under_bridge:sat`: Soul «She dances at night» ·
  `under_bridge:sat`
- `over_bridge` · bridge · `time` night · he walks over the bridge with the lantern toward the lights and stops at its
  head · 12 · wide · at `over_bridge:head`: Soul «Do you hear? Music» · `over_bridge:walk`, `over_bridge:head`
- `square` · bridge · `time` night, `square` true, the musicians playing (`play_fiddle`, `play_pipe`), the potter at
  his stall · the Fisherman walks up to the stall · 8 · wide → medium two-shot · the potter's lines after ·
  `square:met`
- `hand_itself` · bridge · after `square` · his right hand reaches by itself for the coppers (`fisherman_reach`
  `stall#coppers`); he looks at it, catches it with the left, puts it behind his back (`wrist_behind`) · 8 · close on
  the hands → close on his face · — · `hand_itself:reach`, `hand_itself:caught`; then the Soul's chuckle and line, the
  potter's invitation; the choice «Ждать»
- `room_in` · room · evening, the hearth, the daughter asleep by the fire (`sleep_floor`), `cup_at` shelf · the potter
  shows the shelf (`hold_out` toward it); the Fisherman sits down on the bench, `hands_under` · 12 · wide → close on
  the cup → medium on him · at `room_in:cup`: potter «My wife's…» · `room_in:cup`, `room_in:sat`
- `shrug_back` · bridge · after `hand_itself` · the potter `shrug`s; the Fisherman turns and walks onto the bridge · 8
  · medium → wide · — · `shrug_back:turn`
- `sleepwalk` · room · night, the fire low; the Fisherman asleep on the bench (`lie_bench`), the potter asleep, the
  daughter by the fire · he gets up with his eyes shut (one shadow at his feet), walks to the shelf, takes the cup
  (`cup_at` hand), puts it into his bag (`cup_at` bag), lies down again; the daughter half opens her eyes and shuts
  them · 22 · medium → close on the daughter's eyes · — · `sleepwalk:up`, `sleepwalk:cup`, `sleepwalk:down`,
  `sleepwalk:girl`
- `cup_gone` · room · `morning` 1; the potter at the shelf `search`; the Fisherman sits up on the bench, reaches for
  his bag — heavy · 10 · medium → close on the bag · at `cup_gone:search`: potter «The cup…»; at `cup_gone:bag`: Soul
  «Hush» · `cup_gone:search`, `cup_gone:bag`; then the choice «Чаша»
- `confess` · room · after `cup_gone` · he takes out the cup (`hold_out`, `cup_at` hand); the potter takes it, looks at
  it long; the daughter goes behind her father · 14 · close on the cup → medium · at `confess:out`: «I don't remember
  how…»; at `confess:look`: potter «I gave you bread. Go»; at `confess:hide`: Soul «You said: I» · `confess:out`,
  `confess:look`, `confess:hide`
- `bend_daughter` · room · after `cup_gone` · the potter `kneel`s by his daughter, his back to the shelf · 4 · medium ·
  — · `bend_daughter:bent`; then **M5**
- `found_cup` · room · after M5; **keys:** `rang` (bool: M5 missed — he turned at the ring, sees the cup on the shelf,
  looks at his guest a long while; no bread) · the potter gets up, finds the cup behind the bread, `laugh`s, gives
  bread for the road (`hold_out`, `bread`) — or (rang) looks long · 10 · medium · at `found_cup:find` (not rang):
  «There it is!…»; at `found_cup:look` (rang): Soul «Not sure. And not being sure — he keeps quiet» ·
  `found_cup:find`, `found_cup:bread`, `found_cup:look`
- `bridge_dawn` · bridge · `time` morning · he walks back over the bridge toward the sea and stops midway · 12 · wide →
  medium · the talk at `bridge_dawn:stop`; he walks on after · `bridge_dawn:stop`, `bridge_dawn:on`
- `beggar` · bridge · `time` night, the beggar asleep midway (`sleep_wall`) · the Fisherman walks to the middle; his
  hand reaches for the bowl (`fisherman_reach` `bowl#coins`), the other catches it (`wrist_behind`), he stands
  trembling; the bowl rocks, a copper falls into the river (`copper`); the old man sleeps on · 16 · medium → close on
  the hands → close on the bowl · the talk after · `beggar:reach`, `beggar:caught`, `beggar:copper`

**Chapter III «Без него»** (stayed)

- `deep_dusk` · deep · `dusk` 1, `fisherman_at` sand; **keys:** `hands` (Song 0–1: silent, hand in hand), `sing`
  (Song 2–3: she `sing`s) · the camera looks up: the warm light far above goes along (`far_light` 0.01 → 0.6) · 12 ·
  wide → up · narrator «And the Soul went…» at `deep_dusk:begin`; the sign «Подняться» at `deep_dusk:light` (a touch on
  `fisherman`, 3 s) · `deep_dusk:begin`, `deep_dusk:light`
- `rise` · stone · `light` night, `boat` false, `fisherman_at` water, no Mermaid, `far_light` 0.5 → 1 · he watches the
  little light go away beyond the bridge; then he is pulled under from below (`fisherman_here` false) · 12 · wide →
  medium on his face → wide · — · `rise:watch`, `rise:pulled`
- `palm_eyes` · deep · after `deep_dusk` · the light goes away (`far_light` → 1); she lays her palm over his eyes
  (`mermaid_reach` `fisherman#head`) and sings on · 8 · close on the two · — · `palm_eyes:palm`
- `soul_town` · bridge · `time` evening; the Soul (dark, his face; `soul_with: ["lantern"]`) comes off the bridge to the
  potter at his door · 10 · wide → medium · at `soul_town:met`: the potter's line · `soul_town:met`
- `soul_theft` · room · night; the potter asleep, the daughter by the fire; **keys:** `hard` (bool: the Soul goes
  straight to the shelf, takes the cup, leaves the door wide open; else it stands over the sleeping girl a long while,
  then takes the cup) · the potter wakes in the lantern's light, sits up, sees the face; the Soul goes out into the dark
  (`soul_here` false) · 20 · medium → close on the potter · at `soul_theft:wake`: potter «Fisherman!..» ·
  `soul_theft:girl`, `soul_theft:cup`, `soul_theft:wake`, `soul_theft:gone`
- `rumour` · bridge · `time` morning, the market; `woman_a`, `woman_b` at the potter's wares, `whisper` · 8 · wide · at
  `rumour:say`: women «The fisherman from the bay is a thief» · `rumour:say`
- `fourth_year` · pier · `light` dawn; the Soul on the boards with the cup (`soul_with: ["cup"]`); the Fisherman comes
  up into the shallows; **keys:** `song` (as `third_year`) · 12 · medium → close on the cup → wide on the stone · the
  talk after `fourth_year:up`; the song or the silence at `fourth_year:stone` · `fourth_year:up`,
  `fourth_year:stone`; then the choice «Последний раз» (⚑)
- `late_go` · pier · after `fourth_year` · he looks long at the knife in the post (close); the Soul gives him the
  lantern and the cup and goes into his shadow; by the stone the Mermaid sees, goes under; he speaks to the water · 18 ·
  close on the knife → medium → wide on the stone → medium · at `late_go:water`: «I'll give it back — and come back» ·
  `late_go:knife`, `late_go:in`, `late_go:her`, `late_go:water`
- `turn_away` · pier · after `fourth_year` · he turns his back to the pier, his hand on a post (`fisherman_at` post,
  `fisherman_reach` `lantern_post#grip`) · 5 · medium · — · `turn_away:hand`; then **M9**
- `sink` · pier · after M9; **keys:** `looked` (bool: he looks once at the pier before he goes; false when M9 missed) ·
  he goes under (`fisherman_at` under) · 6 · medium → wide · — · `sink:under`
- `door_potter` · bridge · `time` morning, `door` 0 · the Fisherman (the lantern, the cup) at the door; the potter
  opens (`door` 1), the daughter behind him; the Fisherman holds out the cup (`hold_out`) · 10 · medium two-shot →
  close on the cup · at `door_potter:open`: «You!..» · `door_potter:open`, `door_potter:cup`; then the choice «Чаша у
  двери»
- `door_shut` · bridge · after `door_potter`; **keys:** `slow` (bool: «это я взял» — the door shuts slowly; else at
  once) · the potter takes the cup and shuts the door · 8 · medium → the door · at `door_shut:take`: his line ·
  `door_shut:take`, `door_shut:shut`; then the Soul within «There. Now back…»

**Chapter IV «Берег»**

- `call_her` · pier; **keys:** `light` (morning + mist after 3.7, night after 3.7б, evening after 3Л) · the Fisherman
  hangs the lantern on the post (`hang_lantern`, `lantern_at` post), calls (`call_out`); the camera to the stone: under
  the water a pale light (`under_light` 1) stays and does not rise · 16 · medium → wide on the stone · at
  `call_her:call`: his call; at `call_her:light`: the notes or the water (the game's sound) · `call_her:hung`,
  `call_her:call`, `call_her:light`
- `knife_rust` · pier · after `call_her` (went: «Come out…» / «I promised. I lied» before) · he pulls the knife out of
  the post (`pull_knife`, `knife` none, `fisherman_with: ["knife_rusty"]`) · 5 · close on the post → medium · at
  `knife_rust:out`: «I'll cut you off again» · `knife_rust:out`; then **M6**
- `knife_back` · pier · after M6; **keys:** `thrown` (bool: M6 missed — he throws the knife on the boards, `knife`
  boards, then picks it up) · he `stab_post`s it back (`knife` post, `rust` true) · 8 · medium · the Soul's «A knife
  cuts once…» at `knife_back:through` · `knife_back:through`, `knife_back:post`
- `winter` · shore · autumn → `snow` 0 → 1; `hut` none → half → built · he weaves the hut (`weave`), then stands by the
  water and `call_out`s · 16 · wide · — · `winter:hut`, `winter:snow`
- `witch_shore` · shore · `snow` 1, `hut` built, the Fisherman sitting by it (`sit_ground`); **keys:** `witch`
  (`demanded`: she stops, `laugh`s, walks on; `danced`: she lays bread and her shawl by the hut — `shawl` true — and
  goes, looking back) · the Witch walks along the frozen shore · 16 · wide → medium on her · at `witch_shore:stop`: her
  line · `witch_shore:stop`, `witch_shore:gone`; the Soul's «Go to her…» after
- `widow` · shore · `light` dawn (spring), `snow` 0, `widow_boat` true; the widow, `widow_girl`, `widow_boy` by the
  boat; **keys:** `thief` (bool: she looks at him long and `shield`s the children behind her) · she comes to him; the
  children look at the net on the rail · 14 · wide → medium two-shot → close on the children · at `widow:say`: «There
  are no fish…»; at `widow:boat`: «The boat is rotting…» · `widow:say`, `widow:boat`, `widow:net`; then the choice
  «Ночь в море»
- `boat_out` · stone · `light` night, `boat` (the widow's), `lantern` 1, `fisherman_at` boat, no Mermaid · he casts the
  net · 8 · wide → medium · — · `boat_out:cast`; then **M7**
- `keel_light` · stone · after M7; **keys:** `fish` (1, or 0.5 when M7 missed) · he `haul_net`s; a pale light passes
  under the keel (`pass_light` 0 → 1 → 0); for a moment four notes (the game's) · 10 · medium → close on the water by
  the hull · — · `keel_light:light`; the Soul and he talk after
- `widow_goes` · shore · `light` morning · the widow with her bundles leads the children away along the shore toward
  the bridge; the younger `look_back`s at the net on the rail · 14 · wide → close on the boy · — · `widow_goes:look`,
  `widow_goes:gone`
- `night_alone` · pier · `light` night · he alone on the boards by the post · 6 · wide · the Soul and he talk after ·
  `night_alone:end`
- `dawn_shore` · shore · `light` dawn; **keys:** `fish` · he comes in from the water's edge with the full net; the widow
  sees the fish; the children by something on the sand step apart: the Mermaid (`mermaid_at` sand) · 18 · wide → medium
  → close on her · at `dawn_shore:fish`: widow «If the boat goes out — we'll stay» · `dawn_shore:fish`,
  `dawn_shore:apart`
- `wave_lays` · shore · `light` night · a black wave comes in and lays the Mermaid at his feet (`wave` pulse,
  `mermaid_at` sand) · 10 · wide → close · — · `wave_lays:laid`
- `kneel_kiss` · shore · after `dawn_shore` or `wave_lays` · he `kneel`s by her, `bend_over`, kisses her · 8 · close on
  the two · his words after · `kneel_kiss:kiss`
- `sea_comes` · shore · after `kneel_kiss`; **keys:** `children` (bool: «вышел» — the children `run` up the shore) ·
  the sea darkens and comes (`wave` 0 → 0.3) · 10 · wide · at `sea_comes:run` (children): «Home! Run!» ·
  `sea_comes:dark`, `sea_comes:run`; the Soul's «Run!…» and his answer after; then the choice «Волна» (⚑, on
  `fisherman`)
- `covered` · shore · after **M8** · the wave covers them (`wave` 1) · 6 · wide · — · `covered:end`
- `wrap` · shore · after `sea_comes` · he wraps her in his net (`bundle` true, `mermaid_here` false) · 6 · close · — ·
  `wrap:end`; then **M8б**
- `fall_by` · shore · after M8б · the wave strikes the hut and carries it off (`hut` gone); up at the field's edge he
  `fall_beside`s her · 10 · wide → medium · — · `fall_by:hut`, `fall_by:fell`; the Soul goes in after (its line, or a
  shiver: `fisherman_mood`)

**Epilogue**

«Белые цветы»:
- `morning_two` · shore · `light` morning, `mist` 1, `lantern_at` post (still lit), the two on the sand (the
  Fisherman `lie_still` holding her); **keys:** `apart` (bool: M8 slipped — they lie side by side, fingers almost
  touching) · the Priest walks down the shore to bless the sea and stops by them · 14 · wide → medium on the Priest ·
  his lines after · `morning_two:stop`
- `knife_sea` · pier · `light` morning, `mist` 1 · the Priest at the post pulls out the knife (`pull_knife`) and throws
  it into the sea (`throw_far`, `knife` none) · 8 · medium · his last line after · `knife_sea:out`, `knife_sea:thrown`
- `feast_flowers` · priest · `morning` 1, `flowers` altar, `woman_a`, `woman_b` before the Priest · he speaks
  (`preach`) · 12 · wide → close on the flowers → close on the Priest · at `feast_flowers:ask`: «Where are the flowers
  from?», woman_a's answer · `feast_flowers:ask`
- `field_corner` · shore · `light` noon, `linen` true; **keys:** `shells` (bool: «вышел» — the widow's children come
  and lay shells there, `lay_down`; else nobody) · the camera on the field's corner · 10 · wide · — ·
  `field_corner:end`
- `bless_sea` · pier · `light` morning · the Priest on the boards at the end blesses the water (`bless`) · 8 · wide · —
  · `bless_sea:bless`
- `hook_empty` · pier · `light` morning, `mist` 1, `lantern_at` none (the hook empty), the Priest on the pier ·
  nothing moves but the mist · 10 · wide, slow · — · `hook_empty:end` (the last shot; the notes are the game's)

«Фонарь на мостках»:
- `post_knife` · pier · `light` morning · the Fisherman pulls the knife out of the post (`pull_knife`) · 5 · close · —
  · `post_knife:out`
- `mound_morning` · shore · `light` morning, `mound` true · he comes up with the knife, sets it at the mound's head
  (`lay_down`), sits beside it (`sit_ground`) · 12 · wide → medium · — · `mound_morning:knife`, `mound_morning:sat`
- `priest_mound` · shore · after `mound_morning` · the Priest comes up to the mound; at «Begone!» `point_away`; the
  Fisherman does not get up; the Priest walks away · 14 · medium · at `priest_mound:who`: «Who is here?» and the talk;
  at `priest_mound:begone`: «She shall not lie…» · `priest_mound:who`, `priest_mound:begone`, `priest_mound:gone`
- `threshold_flowers` · priest · `morning` 1 · the Fisherman lays the flowers on the threshold (`flowers` threshold)
  and goes; the Priest finds them and sets them on the altar (`flowers` altar), `preach` · 18 · wide → close on the
  flowers → medium on the Priest · — · `threshold_flowers:laid`, `threshold_flowers:found`, `threshold_flowers:altar`
- `bless_sea` (as above)
- `old_lantern` · pier · `light` night, `fisherman_wear` fisherman_old: the old Fisherman at the pier's end with the
  lantern, its beam on the water; **keys:** `boy` (bool: «вышел» — the widow's boy sits beside him knotting a new net,
  `knot_net`) · 14 · wide, slow · — · `old_lantern:end` (the last shot)

«Два огня»:
- `soul_leaves` · pier · `light` morning; the Soul with the cup and the lantern; **keys:** `hard` (bool: the lantern
  dark, it does not turn; else it burns and the Soul turns once to the water) · it walks up the pier and away over the
  hill (`far_lantern`) · 14 · medium → wide · — · `soul_leaves:turn`, `soul_leaves:gone`
- `sermon` · priest · `morning` 1, the «Два огня» row (the Priest on the threshold, the women and the Witch) · the
  Priest `preach`es; the women make the `sign`; the Witch `laugh`s · 14 · wide → medium on the Witch · at
  `sermon:preach`: the Priest's line; at `sermon:laugh`: the Witch's · `sermon:preach`, `sermon:sign`, `sermon:laugh`
- `witch_knife` · pier · `light` night · the Witch on the boards pulls the knife out of the post (`pull_knife`) and
  walks away with it · 10 · medium → wide · — · `witch_knife:out`, `witch_knife:gone`
- `witch_dance` · pier · `light` night (the full moon) · the Witch dances alone at the pier's end (`dance_tambourine`)
  · 10 · wide · — · `witch_dance:end`
- `white_hair` · deep · `years` true, `hands` false, `fisherman_at` sand · she touches his hair (`mermaid_reach`
  `fisherman#head`) · 8 · close on the two · the talk after · `white_hair:touch`
- `hands_years` · deep · after `white_hair`; **keys:** `first` (`he`: «слово» — he takes her hand first; `she`:
  «даром» — she takes his before he reaches), `sing` (bool: all four notes — she `sing`s; else she begins and stops) ·
  `hands` true · 10 · close on the hands → medium · — · `hands_years:hand`
- `two_lights` · stone · `light` night, empty, `deep_lights` true, `far_light` 0.5 → 1 (a third light going over the
  hill) · 10 · wide, slow · — · `two_lights:end` (the last shot)

### Mini-games (each in the pose its piece ended in; the game sets the keys named)

| id | § | scene, after | gesture | marks on | keys the game drives | s | a miss leaves |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `net` | М1 | stone, `night` | pull slowly | `net_over#rope` | `haul` 0 → 1, `heel` | 10 | the net torn at the edge: `net_hole` 1 on the rail all game, and in 4.8 |
| `release` | М1б | stone, `in_net` + the choice | hold, then let go (when she grows still) | `net_over#knot` | `knot` 0 → 1, `mermaid_mood` afraid → neutral (her struggling is the piece's) | 5 | held long: the knot slides by itself, she slips out not looking at him (`looks` false) |
| `dance` | М2 | well, `dance` | rhythm (the tambourine, ~100 bpm) | `witch#tambourine` | `round`, `stumble` | 12 | out of step: he stumbles, she pulls him by the hands harder and laughs (`velvet` `stumbled`) |
| `knife` | М3 | pier, `knife_ready` | trace | `cutline#heel` → `cutline#toe` | `cut` 0..1, `cut_rough` | 10 | an uneven cut: the Soul's left hand smoke to the end (`soul_wear` soul_smoke) |
| `song` | М4 | deep, `deep_song` | touch nothing | — (hands off) | `mermaid_mood` (laugh, then smile), `mermaid_near`, `hands` | 10 | touched: she stops, laughs, begins again nearer; at the second touch she sings holding his hand (`hands` true) |
| `cup` | М5 | room, `bend_daughter` | balance (lead) | `fisherman#cup` (the part's point) | `cup_tilt` −1..1, `carry` 0 → 1 (he goes from the bench to the shelf as it rises — the scene moves him), `cup_at` hand → shelf, `potter_look` (he turns to the ring) | 8 | it rings: the potter turns, sees it, no bread (`found_cup` `rang`); no rumour |
| `knife2` | М6 | pier, `knife_rust` | trace (it goes through all the same) | `cutline#heel` → `cutline#toe` | `cut` (passes, leaves nothing) | 10 | he throws the knife on the boards, then drives it into the post (`knife_back` `thrown`) |
| `net2` | М7 | stone (the widow's boat), `boat_out` | pull slowly | `net_over#rope` | `haul`, `fish` | 10 | half a net (`fish` 0.5); the children get fish all the same |
| `hold` | М8 | shore, `sea_comes` + the choice «остаться» | hold (by its count) | `mermaid#hand_l` (her hand in his) | `wave` 0.3 → 1, `fisherman_reach` | 10 | her hand slips: he stays beside her, fingers almost touching (`morning_two` `apart`) |
| `drag` | М8б | shore, `wrap` | pull slowly | `bundle#rope` | `drag` 0 → 1, `wave`, `net_hole` | 12 | the wave reaches his knees, the net tears wider (`net_hole` 2); he draws her out all the same |
| `post` | М9 | pier, `turn_away` | hold, then let go | `lantern_post#grip` | `fisherman_reach` | 5 | held long: his fingers slip by themselves; he goes under not looking back (`sink` `looked` false) |

The signs (the scenario's «прерывания»): one touch within 3 s on the point, its arc of time running down (a press
with no petals): «Остановиться» on `fisherman` right after `feast:level` (he stops); «Подняться» on `fisherman` at
`deep_dusk:light`.
Person points the language needs (`#head`, `#chest`, `#hand_l`, `#hand_r`, `#feet`) are the engine's; the parts':
`#cup`, `#tambourine`, `#flame`. Scene points to add: `net_over#rope`, `net_over#knot`, `cutline#heel`, `cutline#toe`,
`lantern_post#grip`, `bundle#rope`, `stall#coppers`, `bowl#coins`, `shelf#cup`, `shelf#bread`, `bench#seat`.
