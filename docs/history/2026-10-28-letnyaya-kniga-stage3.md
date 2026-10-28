# 2026-10-28 — «Летняя книга»: стадия 3

Игра по стадии 3 (`moood-me/moood:docs/writing/game-stages.md`), каркасом «Папы и моря» (`020ea3b`): весь сценарий на трёх
сценах мира (`shore`, `house`, `cape`), в настоящем коде игры. Павел стадию 3 не смотрит — дальше стадии 4–5 (`plan.md`).

1. **Создание.** `POST /api/games` через `stand.py` упал (500): сервис игр не смог создать репозиторий —
   GitHub 403 на `orgs/moood-me/repos` (у GitHub App стенда пропало право Administration). Павел создал пустой
   приватный `moood-me/pavel--game--the-summer-book` руками; игра взята стендом путём усыновления (`services/games`
   `index.py` `_adopt`): пуш `game.json` (type, world, title, description; их русский — в `bespoke/lang/ru/strings.json`)
   и `bespoke/` в `env/malay/resuming3` → игра 95 `~pavel/games/the-summer-book`, название и русское верные. Тело
   запроса через `stand.py` — только ASCII (`\uXXXX`): строку он шлёт как latin-1, а Git Bash портит `\u` в аргументах —
   тело из файла, `"$(cat файл)"`.
2. **Код** — `sb/game`, влит в `env/malay/resuming3` перемоткой; env/dev нет. Своё в каркасе: `g.scene(…, {keys})` и
   `g.set` — ключи сцены (ночь, туман, свеча мыса), шкала «Силы» рисуется от «потратила» (`spent`), заглушка учит
   нажатию призраком. Пение — свои записи `people.json` (`grandma_song`, `sophia_song`: тот же голос, свой `how`).
3. **Проверка веток** — `bespoke/check/run.mjs`: 26 244 пути, одна концовка на каждом по правилу §3; точки людей — только
   тех, кто сейчас в кадре; ключи сцен — по их `states`. `@moood/check` чистый (773 текста).
4. **Голоса** — Бабушка `Gacrux`, Софья `Leda`, Папа `Sadachbia`, Эрикссон `Fenrir`, рассказчик `Vindemiatrix` (повторы
   между играми разрешены); озвучка стенда `POST /api/selftest/voices`.

Подробно — `docs/new-games/letnyaya-kniga/game.md`.
