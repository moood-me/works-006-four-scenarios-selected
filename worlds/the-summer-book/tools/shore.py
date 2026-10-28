# Writes scenes/shore/scene.json (and the island's sky and sea beside it): the shore by the house (С1) — its elements
# and where they stand, its light by the hour (the island's: tools/isle.py), its people, its keys. Run from anywhere:
# python tools/shore.py <the world's root>
import sys, os
sys.path.insert(0, os.path.join(sys.argv[1], "tools"))
import isle

root = sys.argv[1]
folder = os.path.join(root, "scenes", "shore")
A = isle.A
WATER = -0.55
WIND = [1, 0.3, 0.4]

MUSIC_PROMPTS = [
    ("Sparse solo piano, slow and unhurried, with long silences, like light on still water", 1.2),
    ("Nordic folk melody on a single wooden flute, distant and breathy, over a soft drone", 0.8),
    ("Gentle nylon-string guitar picking, quiet and intimate, a summer morning by the sea", 0.6),
    ("Warm ambient pads with slow swells, pearl-grey and calm, barely moving", 0.5),
    ("Celesta and music box notes, childlike and a little sad", 0),
    ("Low cello long tones, tender and grave, an old woman remembering", 0),
    ("Kantele plucked softly, Finnish archipelago, open fifths, airy", 0),
    ("Solo accordion, slow waltz, faded and wistful, far away across the water", 0),
    ("Soft string quartet, chamber music, restrained and bittersweet", 0),
    ("Glass harmonica shimmer, cold clear air, high and fragile", 0),
    ("Minimalist marimba patterns, gentle and repeating, like small waves", 0),
    ("Harmonium chords breathing slowly, a quiet chapel by the sea", 0),
    ("Clarinet in its low register, dry and humorous, a little crooked tune", 0),
    ("Felt piano with tape hiss, close and soft, lullaby feel", 0),
    ("Distant church bell and sea wind textures, sparse, mostly silence", 0),
    ("Harp arpeggios, slow, luminous, early summer dawn", 0),
]
music = {"prompts": [{"text": t, "weight": w} for t, w in MUSIC_PROMPTS], "bpm": 66, "density": 0.25, "brightness": 0.45,
         "scale": "G_MAJOR_E_MINOR"}


def copies(rows):
    return [dict(zip(("across", "distance", "scale", "flip"), r)) for r in rows]


# the sky: the day's sun high on the right, August's lower, the June dawn's just up on the right (as approved); the
# afterglow far on the left; the full moon ahead over the sea, its path coming to the rock; the lightning out to sea
# Eriksson's boat: far out on the right (rowboat 0) -> alongside the pier's end (1); the dinghy moored by the pier's root
ROWBOAT = [[70, 30], [10.6, 14.9]]
DINGHY = [1.6, 14.6]
SUN, LATE, DAWN, MOON, BOLT = [A * 0.66, 0.02], [A * 0.86, 0.2], [A * 0.78, 0.3], [A * 0.58, 0.2], [A * 0.32, 0.02]

objects = [
    isle.sky(folder, 0.42, SUN, LATE, DAWN, A * 0.12, A * 0.58, BOLT, moon=MOON),
    isle.sea(folder, WATER, {**isle.KEYED, "fade": 0}, clear=[[2.5, 5.9, 1.15, 1.0]]),
    # the rings a pebble makes on the glass (rings: the throws), and the splash of Sophia into the water
    {"id": "rings", "name": "Rings on the water", "plane": True, "across": 2.4, "distance": 7.6, "elevation": WATER + 0.01, "width": 4, "depth": 4},
    {"id": "splash", "name": "Splash", "particles": {"kind": "splashes", "at": [2.6, 5.8, 0.74], "burst": {"on": "splash", "count": 70}}},
    {"id": "islet", "name": "Wooded islet", "across": 320, "distance": 700, "onLand": False, "elevation": WATER, "height": 14,
     "box": [-46, -15, 46, 0.7], "copies": [{"across": 320, "distance": 700}, {"across": -260, "distance": 950, "scale": 1.3, "flip": True}]},
    {"id": "skerry", "name": "Skerry", "across": -40, "distance": 260, "onLand": False, "elevation": WATER, "height": 5,
     "box": [-20.5, -5.4, 20.5, 0.7], "copies": [{"across": -40, "distance": 260}, {"across": 95, "distance": 430, "scale": 1.4, "flip": True},
                                                {"across": 210, "distance": 320, "scale": 0.7}, {"across": 30, "distance": 150, "scale": 0.5, "flip": True}]},
    {"id": "mist", "name": "Mist on the horizon", "across": 120, "distance": 650, "onLand": False, "elevation": WATER, "height": 18,
     "box": [-800, -16, 800, 2]},
    {"id": "rock", "name": "The island rock", "plane": True, "drape": True, "across": -24, "distance": 32, "width": 66, "depth": 76},
    {"id": "pine", "name": "Pines", "across": -12, "distance": 24, "height": 9, "box": [-2.2, -9.3, 3.6, 0.3], "shadow": True,
     "copies": [{"across": -12, "distance": 24, "scale": 1.1}, {"across": -9.5, "distance": 26.5, "scale": 0.9, "flip": True},
                {"across": -15, "distance": 21, "scale": 1.2}, {"across": -6.5, "distance": 31, "scale": 0.8}, {"across": -18, "distance": 28},
                {"across": -11, "distance": 33, "scale": 1.1, "flip": True}]},
    {"id": "house", "name": "House", "unseen": True, "across": -7.5, "distance": 15.5, "facing": 200},
    {"id": "house_front", "name": "House, the gable end", "on": "house", "facing": 180, "height": 4.8, "box": [-2.95, -5, 2.95, 0.4], "shadow": True},
    {"id": "house_side", "name": "House, the side", "on": "house", "across": 2.5, "facing": 90, "height": 3, "box": [-0.1, -3.1, 6.45, 0.4], "shadow": True},
    {"id": "roof_r", "name": "Roof, the near slope", "plane": True, "on": "house", "across": 1.375, "distance": 3, "elevation": 3.81, "width": 6.5,
     "depth": 3.39, "rotation": 90, "tilt": 35.8, "shadow": True},
    {"id": "roof_l", "name": "Roof, the far slope", "plane": True, "on": "house", "across": -1.375, "distance": 3, "elevation": 3.81, "width": 6.5,
     "depth": 3.39, "rotation": 90, "tilt": -35.8},
    {"id": "chimney", "name": "Chimney", "on": "house", "across": -0.8, "distance": 2.5, "height": 5.8, "box": [-0.4, -5.9, 0.4, 0.05]},
    {"id": "porch", "name": "Porch", "on": "house", "across": 1.6, "distance": -0.7, "facing": 180, "height": 1.5, "box": [-0.9, -1.7, 0.75, 0.05]},
    {"id": "cat", "name": "Mappe, the cat", "across": -6.09, "distance": 13.97, "elevation": 0.62, "height": 0.5, "box": [-0.46, -0.56, 0.46, 0.03],
     "shadow": True, "place": {"across": "cat_a", "distance": "cat_d", "elevation": "cat_e"}},
    {"id": "peony", "name": "Peonies", "across": -9.56, "distance": 15.4, "height": 0.85, "box": [-0.75, -1, 0.75, 0.05],
     "copies": [{"across": -9.56, "distance": 15.4}, {"across": -7.21, "distance": 14.54, "scale": 0.9, "flip": True}, {"across": -5.58, "distance": 13.9, "scale": 1.05}]},
    {"id": "pier", "name": "Pier", "plane": True, "walk": True, "across": 3.6, "distance": 16, "elevation": -0.15, "width": 10, "depth": 1.3, "shadow": True},
    {"id": "pier_side", "name": "Pier, the near edge", "across": 3.6, "distance": 15.35, "onLand": False, "elevation": -0.15, "height": 0.2, "box": [-5, -0.02, 5, 0.22]},
    {"id": "post", "name": "Pier posts", "across": -0.2, "distance": 15.4, "onLand": False, "elevation": -0.15, "height": 1.4, "box": [-0.1, -0.02, 0.1, 1.42],
     "copies": [{"across": a, "distance": d} for a in (-0.2, 2.3, 4.8, 7.3, 8.5) for d in (15.4, 16.6)]},
    {"id": "boat", "name": "Rowing boat", "across": 7.2, "distance": 17.2, "onLand": False, "elevation": WATER, "height": 0.8, "box": [-2.4, -0.95, 2, 0.2]},
    {"id": "juniper", "name": "Junipers", "across": -2.9, "distance": 3.4, "height": 0.9, "box": [-1, -1, 1, 0.1], "shadow": True,
     "copies": [{"across": -2.9, "distance": 3.4, "scale": 1.2}, {"across": -2.2, "distance": 11.5, "flip": True}, {"across": -10.5, "distance": 12, "scale": 1.3},
                {"across": -5, "distance": 9.5, "scale": 0.8}]},
    {"id": "tuft", "name": "Grass in the cracks", "across": -1.8, "distance": 3.3, "height": 0.4, "box": [-0.25, -0.5, 0.25, 0.05],
     "copies": copies([(-1.8, 3.3, 0.8, False), (0.4, 3.2, 0.9, True), (-2.6, 5.2, 1, False), (0.3, 6.3, 1.1, True), (-1.3, 7, 0.8, False),
                       (-0.6, 9.5, 0.9, True), (-2, 10.8, 1, False), (0, 12.6, 1.1, True), (-1.6, 13.4, 0.8, False), (-0.9, 2.8, 0.9, True),
                       (-3, 6.6, 1, False), (-2.4, 8.3, 1.1, True)])},
    {"id": "veranda_in", "name": "The veranda, through its glass", "on": "house", "across": -0.7, "distance": 1.9, "facing": 180, "height": 3,
     "box": [-1.75, -3.05, 1.75, 0.05]},
    {"id": "far_roof", "name": "The new house over the trees, far off", "across": -13, "distance": 125, "onLand": False, "elevation": WATER, "height": 9,
     "box": [-11.2, -9.3, 12, 0.6]},
    {"id": "gate", "name": "The gate and its stone", "across": -4.9, "distance": 11.9, "height": 1.1, "box": [-1.7, -1.15, 2.4, 0.05], "shadow": True},
    {"id": "chair", "name": "The chair by the gate", "across": -4.1, "distance": 11.0, "height": 0.95, "box": [-0.6, -1.05, 0.75, 0.05], "shadow": True},
    {"id": "graves", "name": "The graves", "across": -1.9, "distance": 9.4, "height": 0.3, "box": [-1.35, -0.42, 1.35, 0.05]},
    {"id": "weed", "name": "Wrack on the rock", "across": 0.6, "distance": 7, "height": 0.15, "box": [-0.9, -0.28, 0.95, 0.05],
     "copies": copies([(0.55, 7.2, 1, False), (0.05, 8.1, 1.2, True), (-0.35, 10.2, 0.9, False), (-0.15, 11.6, 1.1, True), (-0.4, 13.1, 1, False)])},
    {"id": "net", "name": "Papa's net", "across": -1.75, "distance": 13.85, "height": 0.4, "box": [-0.75, -0.65, 1.4, 0.03]},
    {"id": "net_stones", "name": "Two stones at the pier's root", "across": -1.6, "distance": 14.4, "height": 0.45, "box": [-0.95, -0.45, 0.95, 0.05], "shadow": True},
    # the porch's landing, to stand on (its painting is the porch's card)
    {"id": "porch_deck", "name": "The porch's landing", "plane": True, "walk": True, "unseen": True, "on": "house", "across": 1.6, "distance": -1.0,
     "elevation": 0.55, "width": 1.3, "depth": 0.6},
    {"id": "luggage", "name": "The things by the pier", "across": -2.2, "distance": 14.8, "height": 0.7, "box": [-0.95, -0.75, 1.0, 0.05], "shadow": True},
    {"id": "rowboat", "name": "Eriksson's boat", "across": ROWBOAT[0][0], "distance": ROWBOAT[0][1], "onLand": False, "elevation": WATER, "facing": 180,
     "height": 1, "box": [-2.4, -1.1, 2.8, 0.25], "place": {"across": "rowboat_a", "distance": "rowboat_d", "facing": "rowboat_f"}},
    {"id": "dinghy", "name": "The dinghy", "across": DINGHY[0], "distance": DINGHY[1], "onLand": False, "elevation": WATER, "facing": 180,
     "height": 0.7, "box": [-1.9, -0.85, 1.3, 0.25], "place": {"across": "dinghy_a", "distance": "dinghy_d", "facing": "dinghy_f"}},
    {"id": "big_boat", "name": "The big boat", "across": 2.2, "distance": 27.6, "onLand": False, "elevation": WATER, "height": 4.5,
     "box": [-4.6, -4.6, 4.8, 0.3]},
    {"id": "gangway", "name": "The gangway", "across": -3.7, "distance": 27.0, "height": 1.3, "box": [-0.1, -1.35, 2.3, 0.12]},
    {"id": "far_boat", "name": "The boat out at the nets", "across": 60, "distance": 160, "onLand": False, "elevation": WATER, "height": 1.8,
     "box": [-2, -1.9, 2, 0.2]},
    {"id": "fog_wall", "name": "The fog's wall", "across": 300, "distance": 1400, "onLand": False, "elevation": WATER, "height": 56, "box": [-900, -58, 900, 2]},
    {"id": "fog_far", "name": "Fog over the water", "across": 40, "distance": 140, "onLand": False, "elevation": WATER, "height": 10, "box": [-200, -10, 200, 1]},
    {"id": "fog_near", "name": "The island in the fog", "across": 6, "distance": 24, "height": 9, "box": [-80, -9, 80, 1],
     "copies": [{"across": 6, "distance": 24}, {"across": -4, "distance": 12, "scale": 0.6, "flip": True}]},
    {"id": "grandma", "name": "Grandmother", "person": {"cast": "cast", "who": "grandma", "turn": 150}, "across": 0.2, "distance": 4,
     "place": {"across": "grandma_a", "distance": "grandma_d"}},
    {"id": "sophia", "name": "Sophia", "person": {"cast": "cast", "who": "sophia", "turn": 150}, "across": 0.68, "distance": 4.27,
     "place": {"across": "sophia_a", "distance": "sophia_d"}},
    {"id": "papa", "name": "Papa", "person": {"cast": "cast", "who": "papa", "turn": 150}, "across": -3, "distance": 8,
     "place": {"across": "papa_a", "distance": "papa_d"}},
    # Eriksson never comes ashore: he sits on his boat's thwart, carried with it
    {"id": "eriksson", "name": "Eriksson", "person": {"cast": "cast", "who": "eriksson", "turn": 270, "does": "sit_bench"},
     "across": ROWBOAT[0][0], "distance": ROWBOAT[0][1]},
    isle.RAIN,
    # the close-ups the mini-games and the pieces open (modules/closeups.md): each by its key `<shot>_open`
    {"id": "teeth", "name": "The teeth found in the peonies (a piece opens it: П.3)", "insert": "teeth_open"},
    {"id": "stems", "name": "The peony stems close (М1)", "insert": "stems_open"},
    {"id": "tremble", "name": "Grandmother's hands shaking on the rock (a piece opens it: П.5 «Иди»)", "insert": "tremble_open"},
    {"id": "gunwale", "name": "The hands on the gunwale (М3б)", "insert": "gunwale_open"},
    {"id": "knot", "name": "The net's knot close (М3в)", "insert": "knot_open"},
    {"id": "string", "name": "The parcel's string (М9а)", "insert": "string_open"},
    {"id": "oars", "name": "The hands on the oars (М11 «Вёсла»)", "insert": "oars_open"},
    {"id": "rail", "name": "The hand on the gangway's rail (М11 «Сходни»)", "insert": "rail_open"},
]

lights = isle.lights(("sky#sun", "#ffefd8", 1.3), ("sky#sun_late", "#ffe2b8", 1.25), ("sky#sun_dawn", "#ffeedd", 1.0),
                     ([300, 5], "#f3d6c6", 0.5), ("sky#moon", "#c4d2f2", 0.8), [-30, 30]) + [
    {"id": "far_lamp", "of": "far_boat#lamp", "color": "#ffcf86", "strength": 1.4, "reach": 14, "on": "boat_out"}]

# the empty play: a June day, everyone where the approved look has them (Grandmother and Sophia hand in hand at the
# water's edge, Papa on the grass with his mug: lib.PLACES), nothing of the later summer out
MIRROR = isle.lib_value(root, "shore", "MIRROR")
PLACES = isle.lib_value(root, "shore", "PLACES")
light = isle.light(WIND)
# the porch in the storm's gusts (М8а: `gust`)
light["looks"]["gust"] = {"wind": [WIND[0], WIND[1], 3.4], "haze": 0.3}
state = {**isle.STATE, **isle.mirror_state(MIRROR),
         "grandma_at": "water", "sophia_at": "water", "papa_at": "lawn", "papa_with": ["mug"],
         "grandma_a": 0.2, "grandma_d": 4, "sophia_a": 0.68, "sophia_d": 4.27, "papa_a": -3, "papa_d": 8,
         "rowboat": 0, "rowboat_a": ROWBOAT[0][0], "rowboat_d": ROWBOAT[0][1], "rowboat_f": 180,
         "net": False, "chair": "none", "shell": False, "graves": 0, "weed": False, "boat_out": False,
         "dinghy": "moored", "dinghy_at": 0, "dinghy_a": DINGHY[0], "dinghy_d": DINGHY[1], "dinghy_f": 180,
         "big_boat": False, "luggage": False, "hat": "nail",
         "cat_at": "porch", "cat_pose": "sit", "cat_a": -6.09, "cat_d": 13.97, "cat_e": 0.62, "cat_dir": 1,
         "eriksson_here": False, "eriksson_on": {"on": "rowboat", "at": [-0.2, 0.3, 0.45]}, "eriksson_look": "grandma",
         "stems": 0, "pull": 0, "let": 0, "step": 0, "knot": 0, "rings": 0, "gust": 0, "parcel": 0, "splash": 0, "beat": "", "beat_next": "",
         "teeth_open": 0, "teeth_show": 0, "stems_open": 0, "tremble_open": 0, "gunwale_open": 0, "gunwale_push": 0, "knot_open": 0,
         "string_open": 0, "oars_open": 0, "oars_let": 0, "rail_open": 0, "rail_let": 0,
         "skirt": True, "knew": False, "ask_back": False, "heard": False, "knock_broken": False, "weak": False, "counted": False, "shawl_lost": False, "net_self": False, "oar": False, "parcel_long": False,
         "pebble_hand": 0, "sophia_grab": 0, "lean": 0,
         "sign_smoke": "pocket", "sign_hat": "nail", "sign_bird": "none"}


def placed(id, who, places):
    return {f"{id}_at": {"values": places, "means": f"where {who} stands (the scene's places, lib.PLACES: {', '.join(places)}); set, put there at once"},
            f"{id}_a": {"range": [-12, 12], "means": f"the scene's own: where {who} stands (across, metres), set from {id}_at; a piece walks them"},
            f"{id}_d": {"range": [0, 30], "means": f"the scene's own: where {who} stands (distance, metres), set from {id}_at; a piece walks them"},
            f"{id}_placed": {"type": "string", "means": f"the scene's own: the place {who} was last put at"}}


states = {**isle.STATES, **isle.MIRROR_STATES,
          "stems": {"range": [0, 1], "smooth": True, "means": "М1 «Пионы» (the mini-game's): Grandmother's hand in among the peony's stems, 0 at them … 1 deep in"},
          "pull": {"range": [0, 1], "smooth": True, "means": "М2а «Рука» (the mini-game's): how far Sophia pulls her hand away"},
          "let": {"range": [0, 1], "smooth": True, "means": "М2б «Плечо» (the mini-game's): the shoulder going from under Grandmother's hand"},
          "step": {"range": [0, 1], "smooth": True, "means": "М2в «Уступ» (the mini-game's): Grandmother's way down from the edge to knee-deep on the shelf; she walks there"},
          "knot": {"range": [0, 1], "smooth": True, "means": "М3в «Сеть» (the mini-game's): the net's tangle loosened"},
          "rings": {"type": "number", "means": "М4 «Камешек» (the mini-game's, and the pieces'): pebbles thrown — each one up, rings spread on the glass"},
          "gust": {"range": [0, 1], "smooth": True, "means": "М8а «Перила» (the mini-game's): the storm's gust at the porch (the look gust)"},
          "parcel": {"range": [0, 1], "smooth": True, "means": "М9а «Свёрток» (the mini-game's): the parcel from Grandmother's hands (0) into Sophia's (1)"},
          **{f"{s}_open": {"range": [0, 1], "smooth": True, "means": f"the close-up {s} open (0 closed … 1 open): the mini-game's or the piece's"}
             for s in ("teeth", "stems", "tremble", "gunwale", "knot", "string", "oars", "rail")},
          "teeth_show": {"range": [0, 1], "smooth": True, "means": "the teeth close-up: Sophia's fingers lift them out of the earth (the piece's)"},
          "gunwale_push": {"range": [0, 1], "smooth": True, "means": "М3б (the mini-game's): the hands on the gunwale push off and open"},
          "oars_let": {"range": [0, 1], "smooth": True, "means": "М11 «Вёсла» (the mini-game's): Grandmother's hands lift off the oars"},
          "rail_let": {"range": [0, 1], "smooth": True, "means": "М11 «Сходни» (the mini-game's): her hand opens and leaves the rail"},
          "splash": {"type": "number", "means": "the scene's own: each change a splash where Sophia goes into the water"},
          "beat": {"type": "string", "means": "the piece playing (notes.md «Pieces»)"},
          "beat_next": {"type": "string", "means": "the piece the game will play next (its cut made ready)"},
          "skirt": {"type": "boolean", "means": "the play's: Sophia holds Grandmother's skirt at the pier (not «Вода: отпустила»)"},
          "knew": {"type": "boolean", "means": "the play's: Papa knows (3.4, 4.1, the oars)"},
          "ask_back": {"type": "boolean", "means": "the play's: Sophia ≤ 1 — she turns to Grandmother (3.5)"},
          "heard": {"type": "boolean", "means": "the play's: Papa heard «Слышала» (the oars: he sits in the dinghy's bow)"},
          "knock_broken": {"type": "boolean", "means": "the play's: «Постучу» broken"},
          "net_self": {"type": "boolean", "means": "the play's (М3в's outcome): Papa untangles the net himself (net_after)"},
          "oar": {"type": "boolean", "means": "the play's (М3б's outcome): Eriksson pushes off with his oar (eriksson_off)"},
          "parcel_long": {"type": "boolean", "means": "the play's (М9а's outcome): the string snapped — Sophia sits on the pier (post_after)"},
          "pebble_hand": {"range": [0, 1], "smooth": True, "means": "М4 (the mini-game's): Grandmother's hand with the pebble out over the water"},
          "sophia_grab": {"range": [0, 1], "smooth": True, "means": "М8а, М2в (the mini-game's): Sophia grabs Grandmother's hand (past a half)"},
          "lean": {"range": [-1, 1], "smooth": True, "means": "М2в, М8а (the mini-game's): Grandmother's body after the arrow, −1 left … 1 right"},
          "counted": {"type": "boolean", "means": "the play's: «Софья знает» — Sophia counts Grandmother's steps"},
          "shawl_lost": {"type": "boolean", "means": "the play's: her shawl lost behind the tent («За палаткой»): from that dawn she is in the dress alone"},
          "weak": {"type": "boolean", "means": "the play's: Grandmother's strength ≤ 2 (Papa sets her into the dinghy)"},
          "sign_smoke": {"values": ["pouch", "shell", "packet", "pocket"], "means": "the play's: the last morning's gesture of the cigarettes"},
          "sign_hat": {"values": ["on", "bag", "nail"], "means": "the play's: the last morning's gesture of the hat"},
          "sign_bird": {"values": ["graves", "basket", "none"], "means": "the play's: the last morning's gesture of the bird"},
          **placed("grandma", "Grandmother", list(PLACES["grandma"])),
          **placed("sophia", "Sophia", list(PLACES["sophia"])),
          **placed("papa", "Papa", list(PLACES["papa"])),
          "hat": {"values": ["nail", "none"], "means": "the straw hat on its nail by the room's door, seen through the veranda's glass (the house's own hat; from the water)"},
          "cat_at": {"values": ["porch", "rail", "path", "past", "away"], "means": "where the cat is (lib.CAT): on the porch's landing, lying on its rail, on the path above the rock, on the rock past them; set while he walks (cat_pose walk), he goes there at his pace (cat:arrived told)"},
          "cat_pose": {"values": ["sit", "lie", "walk", "none"], "means": "what the cat does: sits, lies, walks; none, not here"},
          "cat_a": {"range": [-12, 12], "means": "the scene's own: where the cat is (across)"},
          "cat_d": {"range": [0, 30], "means": "the scene's own: where the cat is (distance)"},
          "cat_e": {"range": [0, 2], "means": "the scene's own: how high the cat is over the land (the porch, its rail)"},
          "cat_dir": {"values": [1, -1], "means": "the scene's own: which way the cat faces (1 right, -1 left)"},
          "cat_placed": {"type": "string", "means": "the scene's own: the place the cat was last put at"},
          "rowboat": {"range": [0, 1], "smooth": True, "means": "Eriksson's boat: 0 not here (far out on the right, gone in the haze), 1 alongside the pier's end; moved up he rows in, down he rows away (the boat turns round at the pier first)"},
          "rowboat_a": {"range": [0, 75], "means": "the scene's own: where Eriksson's boat is (across), set from rowboat"},
          "rowboat_d": {"range": [10, 35], "means": "the scene's own: where Eriksson's boat is (distance), set from rowboat"},
          "rowboat_f": {"range": [-360, 360], "means": "the scene's own: which way Eriksson's boat faces, turned round as he leaves"},
          "net": {"type": "boolean", "means": "the evening at the nets: Papa's net heaped on the pier by the boat, a length of it drawn out, tangled"},
          "chair": {"values": ["none", "set", "shoved"], "means": "the chair by the gate: not there; set upright beside it (Papa put it there); shoved askew on the stones"},
          "shell": {"type": "boolean", "means": "the big white shell on the porch's rail: the ashtray (Papa put it there)"},
          "graves": {"range": [0, 5], "means": "how many little graves there are in the sand between the stones, each a shell and a wooden bird (0: the sand bare)"},
          "weed": {"type": "boolean", "means": "the morning after the storm: wrack thrown up along the wet band of the rock"},
          "boat_out": {"type": "boolean", "means": "by night: the family's boat out at the nets far on the water, Papa's lantern its one warm light; not at the pier"},
          "dinghy": {"values": ["moored", "circles", "out"], "means": "the dinghy: moored by the pier's root; going round in circles before the rock (Sophia rowing: her place the pieces'); out along the shore toward the big boat, as far as dinghy_at"},
          "dinghy_at": {"range": [0, 1], "smooth": True, "means": "how far along the shore toward the big boat the dinghy is (dinghy out): 0 off the pier, 1 at the gangway"},
          "dinghy_a": {"range": [-2, 8], "means": "the scene's own: where the dinghy is (across)"},
          "dinghy_d": {"range": [8, 30], "means": "the scene's own: where the dinghy is (distance)"},
          "dinghy_f": {"type": "number", "means": "the scene's own: which way the dinghy faces (degrees)"},
          "big_boat": {"type": "boolean", "means": "the last morning: the big motor boat lying off the far rock, the gangway with its rail laid to it"},
          "luggage": {"type": "boolean", "means": "the last morning: the things carried down by the pier (kitbag, basket, suitcase, the plaid)"}}

spec = {
    "engine": 3,
    "title": "The Shore by the House",
    "caption": "June on the island. The sea lies still as glass.",
    "horizon": 0.42,
    "camera": {"mode": "picture"},
    "light": light,
    "lights": lights,
    "modules": ["cast", "isle", "cat", "beats", "closeups"],
    "state": state,
    "states": states,
    "objects": objects,
    "music": music,
}
isle.write_json(os.path.join(folder, "scene.json"), spec)
