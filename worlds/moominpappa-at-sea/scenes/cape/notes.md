# The Fisherman's Cape (С6 of the game «Папа и море»)

The cape on a windy late afternoon, the low sun over the sea on the left (1.7, «sit beside him in silence»): the
Fisherman on his low stone in the lee of his rock, his net in his hands and heaped at his feet, the rest of it drying
on two driftwood poles; Moominpappa sitting on the granite beside him, both looking out to sea; across the cove the
island's long back rising to the dark lighthouse some sixty metres off, Moominmamma small on its steps, alone with the
bundles.

- The land is one function (`lib.js` `land`): the viewer's rock and the cape running out to the left, the
  Fisherman's knob of rock on it, a cove of water ahead, the island's back on the right up to the lighthouse's knoll.
  `SEA` is the sea's height. `granite` is one draped plane; `sea` one reflecting plane with the landing's shader
  (crests coming and going, foam washing the waterline).
- The lighthouse, its steps and the pines are the landing's paintings (the tower's profile is in `lib.js` `TOWER`, as
  there). Points: `lighthouse#door`, `lighthouse#lantern`, `rack#net`.
- `lib.net` draws a net's diamond mesh (the rack's hanging net — a layer the wind sways, translucent to the sun —
  and the heap at his feet).
- The low sun is out of the picture behind the viewer's left shoulder (the light `sun`, `from` [-115, 16]): it lights
  the faces turned to the sea and lays the long shadows ahead; the sky is warm on that side.
- People (the world's cast): the Fisherman came into the cast with this scene (`fisher`: thin, long-headed, a
  drooping nose, an oilskin, a sou'wester; his part `netload` — the net bundled in his hands, falling to his feet).
  He sits (`seated`, `fisher_on` the stone's top), the net in his hands on his knees, looking out to sea; papa sits on the ground (`sit_look`); mama sits on the lighthouse steps (`seated`). No mending motion
  yet: the motion model was paused when this was made.
- `tools/cape.py` writes `scene.json` (the heap at the Fisherman's feet worked out from his seat and turn).
- Stage 2 (the look) only: people sit and breathe; no motions, no camera, no showcase yet.
