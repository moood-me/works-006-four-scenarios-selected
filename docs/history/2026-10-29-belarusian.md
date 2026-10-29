# 2026-10-29 — Belarusian (`be`)

Why: Павел: ещё язык — белорусский.

- Worlds and games (`worlds/*`, `games/*`): «Мумі-тата і мора» (Туве Янсан), «Такія дробязі» (Клэр Кіган), «Рыбак і яго Душа» (Оскар Уайльд), «Летняя кніга» (Туве Янсан) — `"be"` in `languages`, the worlds' and scenes' `lang/be.json`, the Moomin chart module's `modules/chart.be.json`, each game's `bespoke/lang/be/strings.json` (2043 texts in all).
- Names: Мумі-тата, Мумі-мама, Мумі-троль, Мю, Морра (the Groke: «Мора» would read as «the sea»); Біл Ферлонг, Эйлін, Шыла, Кэтлін, Ларэта, Грэйс, Сара Рэдманд, місіс Кехо, Нэд; Рыбак, Душа, Русалка, Ведзьма, Святар, ганчар; Сафія, Бабуля, Тата, Эрыксан. Christmas Eve is «Куцця», the Soul is «яна» as in the Russian.

How it was checked: moood's `check` (its `be` branch: `be` in `i18n/languages.json`), `node packages/check/cli.js <repo> --write`
laid the files out, the translations were written into them, then `check` on the whole repository says «all right».
Modern standard Belarusian, the official orthography; translated from the English source, the Russian read beside it as
a second view of meaning and tone. Only translations and the `languages` lists were added; no source text, code or doc
was changed.
