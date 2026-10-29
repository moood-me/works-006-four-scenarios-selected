# Moominpappa at Sea: the finale's «in full» is «decided in time» (2026-10-29)

**Why.** The finale's row says how the play ended: `form` `late` — «decided late», else «in full». But `full` is only
the story's own name for the ending reached in time (`story.js facts`: the stair, or a night's choice that matches),
and it leaked into the English text: «in full» beside «decided late» says nothing. The Russian had it right
(«решил вовремя»); the Ukrainian translator noticed the English differs. Pavel asked to fix it.

**What.** `games/moominpappa-at-sea/bespoke/game.js:272` — `tr('decided in time')`; `lang/ru/strings.json`, its
entry's text the same (the translation unchanged). `check`: all right, 2043 texts. The language branches being merged
(uk, de, es, fr, ja, be, zh-hant) translated «in full»: their entry is renamed when they are merged.
