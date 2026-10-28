# Летняя книга — что мини-игры ждут от сцен (вставки closeups и ключи)

От автора мини-игр (М), 2026-10-28. Вставки — модуль `closeups` пакета Л: элемент сцены с id = имя вставки, открывается ключом `<shot>_open`; мини-игра открывает вставку и ставит метку на её точку. Новые ключи — `<shot>_<поле>`, 0…1 плавные, кроме `knife_flaw` (0/1). В `acts` — ключи, в `points` — точки вставок.

- **shore:** `stems_open` + `stems#stem` (поле pull ← уже есть `stems`); `gunwale_open` + `gunwale#hands`, push ← новый `gunwale_push` (М3б; `rowboat` остаётся); `knot_open` + `knot#thread` (pull ← уже есть `knot`); `string_open` + `string#bow` (pull ← уже есть `parcel`); `oars_open` + `oars#hands`, let ← новый `oars_let`; `rail_open` + `rail#hand`, let ← новый `rail_let` (М11 сходни).
- **house:** `gap_open` + `gap#palm`, поля `gap_palm`, `gap_hand` (М5а, М5б); `breast_open` + `breast#palm`, `breast_flicker` (М7б); `sleeve_open` + `sleeve#fingers`, `sleeve_let` (М8в).
- **forest:** `knife_open` и `carve` есть; + точки `knife#blade`, `knife#wood`; новый `knife_flaw` (0/1, одна ласта).
- **cape:** `palm_open` есть; + точка `palm#palm`, новый `palm_near` (М10г); и не вставка — act `rest` (bool: true — Бабушка садится на `seat:0`, false — встаёт и идёт дальше), мини-игра ставит его на передышку при слабых силах.
