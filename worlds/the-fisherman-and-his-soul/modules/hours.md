# hours — the light by the hour's name

For the scenes whose light the game names as a word: `pier` and `stone` (`light`), `well` and `bridge` (`time`). The
word is the game's (and a piece's `from`); what the scene is lit and painted by are numbers — the looks of its light
(`dusk`, `dawn`, `day`, `morning`…), its sky's layers shown by its shader, its mist's layers — so that a piece can move
the light slowly (an evening going into night) without anything being painted again.

`scene.kit.hours.follow(scene, key, table)` in the scene's script: whenever `key` changes (and as the scene opens) the
numbers of `table[word]` are set at once. A piece moving the light slowly moves the numbers itself, then names the word
(the numbers are already there: nothing changes). A piece's `from` gives both the word and its numbers (the lib's table
spread in), so that a cut made ready ahead has them.

Used by: `pier`, `stone`, `well`, `bridge`.
