# Летняя книга — дом, мыс, лес: вставки и ключи мини-игр (стадия 5)

2026-10-28. Мир `moood-me/pavel--the-summer-book`, ветка `sb/hcf` (от `sb/all` `bcf3160`), клон `resuming3-work/sb-hcf`,
коммит `4f908a7`. По `docs/new-games/letnyaya-kniga/minigame-inserts.md` и `modules/closeups.md` мира.

- **Дом:** вставки `gap` (`gap_open`, `gap_palm`, `gap_hand`, точка `gap#palm`), `breast` (`breast_open`,
  `breast_flicker`, `breast#palm`), `sleeve` (`sleeve_open`, `sleeve_let`, `sleeve#fingers`). Ключ игры `slips` (bool):
  М5а/М5б с ошибкой — в `gone_near` и `sky_morning` Софья подходит не сразу (ждёт, смотрит, потом идёт).
- **Лес:** вставка `knife` (`knife_open`, `carve`, `knife_flaw`; `knife#blade`, `knife#wood`). Тюлень во мху с одной
  ластой — ключ игры `flipper` (или `knife_flaw` в том же шаге): дальняя ласта — свой слой. У ствола — `eyes_closed`.
  Свет спички и фонаря — у `grandma#flame`, дым сигареты — частицы у `grandma#ember`.
- **Мыс:** вставка `palm` (`palm_open`, `palm_near`, `palm#palm`); act `rest`: true — садится на низкий камень у
  камня, где стоит (у второго `seat:0`, у первого новый `seat:3`), false — встаёт и снова на камне.
- **Имена людей:** `eat`, `get_up_bed`, `lie_side`, `put_down` (за `set_down`/`stoop`), `crouch` (за `lay_stones`),
  части `lantern` (за `storm_lantern`), `blanket_fold` → `blanket` (за `plaid`); `shift` — сидячий цикл и скольжение без
  шагов, `lean` — сидячий цикл и взгляд; бабушка в палатке — `sit_stone` на низком сиденье, не `sit_ground`; Папа
  ловит за `grandma#elbow_l`. Несделанные движения стоят заглушками (Kimodo).
- Контракты в notes.md с новыми ключами и точками; генераторы `tools/*.py`; `@moood/check` чистый. Проверка на GPU
  (`render.sh`, `sheets/sb-hcf/`): вставки gap, breast, sleeve, knife, palm открываются и рисуются.
- Не сделано: вставка `match` в лесу (кусок `match` показывает спичку на людях); `rest` и `slips` не рендерились.

## Ревью стадии 5 (сцены) и новые ключи мини-игр — `sb/hcf` `094d7d5` (влит `sb/all` `93d7a1a`)

- Мыс: платок соскальзывает — `long_dress` (п. 6); в палатке `sit_stone` и в `fetch` (п. 10); ключ `balance` −1…1
  (стрелка мини-игры на камнях): наклона тела у движка нет — рука в сторону наклона, дальше чем сильнее.
- Дом: кадр `lamp` отодвинут, голова ниже плашки (п. 15); `far_light` — act «Лампы».
- Лес: ключ игры `slips` («Мох» с ошибкой): в `fall` дольше сидит согнувшись, Софья ближе — рука на плече.
- Новый дом на пакете Л (п. 11): части `lantern`/`packet`/`cigarette`/`match`/`seal` через `with`, свет и дым у их
  точек; `put_down`, `sit_down`, `rise_slow`, `pick_up`; подъём после склейки и шагами к фонарю. Высота камеры (`V`)
  над тем, на чём движок ставит глаз (пол внутри, вода над морем) — `from_sea` идёт над водой (п. 16); заодно
  внутренние кадры больше не на 0,45 м выше.
- Рендер на GPU (`sheets/sb-hcf/`): `from_sea` 1/4/8 с, `inside`, `smoke`, `look`, `lamp_window`, `before_dawn`.
