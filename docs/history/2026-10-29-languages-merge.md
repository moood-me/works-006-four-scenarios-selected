# 2026-10-29 — семь языков вместе: ветка `languages`

Ветки `uk`, `de`, `es`, `ja`, `be`, `fr`, `zh-hant` слиты в `languages` (от `main`; в `main` не слита). Конфликты —
только списки `"languages"` в world.json и game.json: объединены (en, ru, uk, de, es, ja, be, fr, zh-hant).

В «Муми-папе и море» финал на `main` стал `tr('decided in time')` вместо «in full» (2026-10-29-moominpappa-in-time.md),
а языковые ветки делались до этого и переводили «in full». Переводы у них уже по смыслу «решил вовремя» — в
`games/moominpappa-at-sea/bespoke/lang/*/strings.json` сменён только исходный текст записи: «in full» → «decided in time».
