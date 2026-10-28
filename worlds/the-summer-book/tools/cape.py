# Writes scenes/cape/scene.json (and the island's sky and sea beside it): the cape (С4) — its elements and where they
# stand, its light by the hour (the island's: tools/isle.py), its people, the cat, its keys. Run from anywhere:
# python -B tools/cape.py <the world's root>
import sys, os, math
sys.path.insert(0, os.path.join(sys.argv[1], "tools"))
import isle

root = sys.argv[1]
folder = os.path.join(root, "scenes", "cape")
A = isle.A
WATER = -0.75
WIND = [-1, 0.4, 0.5]

MUSIC_PROMPTS = [
    ("Felt piano with tape hiss, close and soft, lullaby feel", 1.2),
    ("Glass harmonica shimmer, cold clear air, high and fragile", 0.8),
    ("Low cello long tones, tender and grave, an old woman remembering", 0.6),
    ("Distant church bell and sea wind textures, sparse, mostly silence", 0.5),
    ("Sparse solo piano, slow and unhurried, with long silences, like light on still water", 0),
    ("Nordic folk melody on a single wooden flute, distant and breathy, over a soft drone", 0),
    ("Gentle nylon-string guitar picking, quiet and intimate, a summer evening by the sea", 0),
    ("Warm ambient pads with slow swells, deep blue and calm, barely moving", 0),
    ("Celesta and music box notes, childlike and a little sad", 0),
    ("Kantele plucked softly, Finnish archipelago, open fifths, airy", 0),
    ("Solo accordion, slow waltz, faded and wistful, far away across the water", 0),
    ("Soft string quartet, chamber music, restrained and bittersweet", 0),
    ("Minimalist marimba patterns, gentle and repeating, like small waves", 0),
    ("Harmonium chords breathing slowly, a quiet chapel by the sea", 0),
    ("Clarinet in its low register, dry and humorous, a little crooked tune", 0),
    ("Harp arpeggios, slow, luminous, a late August night", 0),
]
music = {"prompts": [{"text": t, "weight": w} for t, w in MUSIC_PROMPTS], "bpm": 60, "density": 0.2, "brightness": 0.35,
         "scale": "G_MAJOR_E_MINOR"}

# the tent's anchor and its frame (as lib.js: TENT, onTent)
TENT, FACING = (2.4, 6.6), 215
F = math.radians(FACING)


def on_tent(x, d):
    return [round(TENT[0] - math.cos(F) * x - math.sin(F) * d, 3), round(TENT[1] + math.sin(F) * x - math.cos(F) * d, 3)]


SEATS = [[-1.6, 9.6], on_tent(-1.05, 1.6), [-0.85, 5.75], [-3.0, 11.15]]
LEDGE = [3.35, 9.2]
# the people's and the cat's first places (lib.PLACES, lib.CAT): Grandmother and Sophia as approved; Papa by the tent
FIRST = {"grandma": ("stand", [-0.4, 4.4], 160), "sophia": ("tent", [1.4, 5.6], 200), "papa": ("by", on_tent(-1.6, -0.9), FACING - 180 + 150)}
CAT_FIRST = on_tent(0.75, -0.25)

# the sky: the day's sun high ahead on the right, August's lower, the dawn's low on the right; the afterglow far on the
# left (as approved); the moon behind the viewer over the island (its light from there); the lightning out to sea
SUN, LATE, DAWN, BOLT = [A * 0.8, -0.12], [A * 0.9, 0.14], [A * 0.95, 0.31], [A * 0.32, 0.02]

objects = [
    isle.sky(folder, 0.45, SUN, LATE, DAWN, A * 0.12, A * 0.65, BOLT),
    isle.sea(folder, WATER, {"strength": 0.45, "fade": 0, "rough": 0.25, "ripple": 0.15}),
    {"id": "fog_wall", "name": "The fog's wall on the horizon", "across": 300, "distance": 1400, "onLand": False, "elevation": WATER, "height": 56,
     "box": [-900, -58, 900, 2]},
    {"id": "skerry", "name": "Skerries", "across": 60, "distance": 380, "onLand": False, "elevation": WATER, "height": 5, "box": [-20.5, -5.4, 20.5, 0.7],
     "copies": [{"across": 60, "distance": 380}, {"across": 190, "distance": 520, "scale": 1.3, "flip": True}, {"across": -20, "distance": 240, "scale": 0.6}]},
    {"id": "fog_far", "name": "Fog over the water", "across": 60, "distance": 140, "onLand": False, "elevation": WATER, "height": 10, "box": [-200, -10, 200, 1],
     "copies": [{"across": 60, "distance": 140}, {"across": 40, "distance": 45, "scale": 0.6, "flip": True}]},
    {"id": "rock", "name": "The cape's rock", "plane": True, "drape": True, "across": -15, "distance": 47.5, "width": 90, "depth": 105},
    {"id": "pine", "name": "Pines by the house", "across": -20, "distance": 52, "height": 9, "box": [-2.2, -9.3, 3.6, 0.3],
     "copies": [{"across": -20, "distance": 52, "scale": 1.1}, {"across": -23.5, "distance": 57, "scale": 0.9, "flip": True},
                {"across": -33, "distance": 63, "scale": 1.2}, {"across": -36.5, "distance": 58, "flip": True}, {"across": -15.5, "distance": 64, "scale": 0.9}]},
    {"id": "far_house", "name": "The house, far off", "across": -27, "distance": 60, "height": 5.6, "box": [-7, -5.7, 2.9, 0.1]},
    {"id": "far_window", "name": "Grandmother's window", "glows": True, "across": -27, "distance": 60, "height": 2, "box": [-0.6, -2.4, 0.6, -1.1],
     "inFront": ["far_house"]},
    {"id": "juniper", "name": "Junipers", "across": -4.2, "distance": 6.5, "height": 0.9, "box": [-1.0, -1.0, 1.0, 0.1], "shadow": True,
     "copies": [{"across": -4.2, "distance": 6.5, "scale": 1.1}, {"across": -6.5, "distance": 11, "scale": 1.3, "flip": True},
                {"across": -3, "distance": 14.5, "scale": 0.9}]},
    {"id": "boulders", "name": "Boulders", "across": -2.6, "distance": 7.8, "box": [-2.3, -1.2, 2.3, 0], "shadow": True,
     "copies": [{"across": -2.6, "distance": 7.8, "scale": 1.2}, {"across": 4.8, "distance": 10.5, "scale": 0.8, "flip": True},
                {"across": -5.5, "distance": 13, "scale": 1.5}, {"across": 0.6, "distance": 12, "scale": 0.7}, {"across": -1.8, "distance": 16, "flip": True},
                {"across": -8, "distance": 9, "scale": 1.3}]},
    {"id": "tuft", "name": "Grass in the cracks", "across": -1.5, "distance": 3.6, "height": 0.4, "box": [-0.25, -0.5, 0.25, 0.05],
     "copies": [{"across": -1.5, "distance": 3.6, "scale": 0.9}, {"across": 0.8, "distance": 3.4, "flip": True}, {"across": -2.2, "distance": 5.5, "scale": 1.1},
                {"across": 2.9, "distance": 4.6, "scale": 0.8, "flip": True}, {"across": -0.9, "distance": 6.8}, {"across": 3.6, "distance": 7.4, "scale": 1.1},
                {"across": -3.4, "distance": 4.2, "scale": 0.9, "flip": True}, {"across": 0.2, "distance": 8.6}, {"across": 1.1, "distance": 4.1, "scale": 0.8}]},
    {"id": "path", "name": "The wet stones of the path", "plane": True, "drape": True, "across": -1.75, "distance": 8.4, "width": 5, "depth": 6.4},
    {"id": "seat", "name": "Low stones to sit on", "across": SEATS[0][0], "distance": SEATS[0][1], "box": [-1.2, -0.45, 1.2, 0], "shadow": True,
     "copies": [{"across": SEATS[0][0], "distance": SEATS[0][1], "elevation": -0.1},
                {"across": SEATS[1][0], "distance": SEATS[1][1], "elevation": -0.1, "flip": True},
                {"across": SEATS[2][0], "distance": SEATS[2][1], "elevation": -0.1, "scale": 0.9},
                {"across": SEATS[3][0], "distance": SEATS[3][1], "elevation": -0.1, "scale": 0.85, "flip": True}]},
    {"id": "ledge", "name": "The crevice and its ledge", "across": LEDGE[0], "distance": LEDGE[1], "onLand": False, "elevation": WATER - 0.08, "facing": 114,
     "height": 0.55, "box": [-0.56, -0.6, 0.56, 0.06]},
    {"id": "tent", "name": "Sophia's tent", "unseen": True, "across": TENT[0], "distance": TENT[1], "facing": FACING, "place": {"tilt": "tent_tilt"}},
    {"id": "tent_floor", "name": "The tent's floor", "plane": True, "on": "tent", "distance": 0.95, "elevation": 0.02, "width": 1.5, "depth": 1.84},
    {"id": "tent_back", "name": "The tent's back", "on": "tent", "distance": 1.9, "facing": 180, "height": 1.15, "box": [-0.82, -1.17, 0.82, 0.04],
     "translucent": 0.5},
    {"id": "tent_slope_r", "name": "The tent's roof, the near slope", "plane": True, "on": "tent", "across": 0.4, "distance": 0.95, "elevation": 0.575,
     "width": 1.9, "depth": 1.4, "rotation": 90, "tilt": 55.2, "translucent": 0.5, "shadow": True},
    {"id": "tent_slope_l", "name": "The tent's roof, the far slope", "plane": True, "on": "tent", "across": -0.4, "distance": 0.95, "elevation": 0.575,
     "width": 1.9, "depth": 1.4, "rotation": 90, "tilt": -55.2, "translucent": 0.5, "shadow": True},
    {"id": "tent_front", "name": "The tent's front", "on": "tent", "facing": 180, "height": 1.15, "box": [-0.85, -1.2, 0.85, 0.05], "translucent": 0.5,
     "shadow": True},
    {"id": "lantern", "name": "The candle lantern", "on": "tent", "across": 0.15, "distance": 1.5, "elevation": 0.02, "height": 0.32,
     "box": [-0.1, -0.35, 0.1, 0.02]},
    {"id": "peg", "name": "The guy rope and its peg", "on": "tent", "facing": 90, "height": 1.2, "box": [-1.0, -1.2, 0.05, 0.05]},
    {"id": "stones_side", "name": "Stones along the tent's side", "on": "tent", "across": 0.84, "facing": 90, "height": 0.2, "box": [-0.05, -0.25, 1.98, 0.03]},
    {"id": "stones_front", "name": "Stones along the tent's front", "on": "tent", "distance": -0.05, "facing": 180, "height": 0.2,
     "box": [-0.85, -0.22, 0.85, 0.03]},
    {"id": "parcel", "name": "The tent in its parcel", "on": "tent", "across": 0.1, "distance": 0.6, "facing": 180, "height": 0.3,
     "box": [-0.85, -0.32, 0.85, 0.03], "shadow": True},
    {"id": "pole", "name": "The pole stood up, the canvas slack", "on": "tent", "facing": 180, "height": 1.25, "box": [-0.9, -1.3, 0.9, 0.05],
     "translucent": 0.4, "shadow": True},
    {"id": "fog_near", "name": "The cape in the fog", "across": 4, "distance": 22, "height": 9, "box": [-80, -9, 80, 1],
     "copies": [{"across": 4, "distance": 22}, {"across": -2, "distance": 12.5, "scale": 0.6, "flip": True}]},
    {"id": "cat", "name": "Mappe, the cat", "across": CAT_FIRST[0], "distance": CAT_FIRST[1], "height": 0.5, "box": [-0.46, -0.56, 0.46, 0.03],
     "shadow": True, "place": {"across": "cat_a", "distance": "cat_d"}},
    {"id": "grandma", "name": "Grandmother", "person": {"cast": "cast", "who": "grandma", "turn": FIRST["grandma"][2], "does": "hands_behind"},
     "across": FIRST["grandma"][1][0], "distance": FIRST["grandma"][1][1], "place": {"across": "grandma_a", "distance": "grandma_d"}},
    {"id": "sophia", "name": "Sophia", "person": {"cast": "cast", "who": "sophia", "turn": FIRST["sophia"][2]},
     "across": FIRST["sophia"][1][0], "distance": FIRST["sophia"][1][1], "place": {"across": "sophia_a", "distance": "sophia_d"},
     "shadow": {"light": "candle", "onto": ["tent_front", "tent_back", "tent_slope_r", "tent_slope_l"]}},
    {"id": "papa", "name": "Papa", "person": {"cast": "cast", "who": "papa", "turn": FIRST["papa"][2]},
     "across": FIRST["papa"][1][0], "distance": FIRST["papa"][1][1], "place": {"across": "papa_a", "distance": "papa_d"}},
    isle.RAIN,
    # the knock minigame's close-up (the world's closeups, modules/closeups.md): opened by `palm_open`
    {"id": "palm", "name": "Her palm by the glowing canvas, close", "insert": "palm_open"},
]

lights = isle.lights(("sky#sun", "#ffefd8", 1.3), ("sky#sun_late", "#ffe2b8", 1.25), ("sky#sun_dawn", "#ffeedd", 1.0),
                     ([300, 5], "#f3d6c6", 0.5), ([205, 38], "#c4d2f2", 0.8), [30, 30]) + [
    {"id": "candle", "of": "lantern#flame", "color": "#ffc27a", "strength": 2.6, "reach": 3.5, "on": "candle", "flicker": 0.15},
    {"id": "window", "of": "far_window#window", "color": "#ffcf88", "strength": 1, "reach": 3, "on": "window"},
    {"id": "hand_lamp", "at": "grandma#flame", "color": "#ffc98a", "strength": 1.1, "reach": 3.5, "on": "lamp_lit", "flicker": 0.12}]

# the empty play: a June day on the cape, the tent standing, Grandmother and Sophia where the approved look has them,
# Papa and the cat not here, the candle and the window out
state = {**isle.STATE,
         "candle": 0, "window": 0, "tent": "up", "lean": 0, "tent_tilt": 0, "flap": "open", "shawl": "none", "stones": False, "stones_laid": 0, "from": "land",
         "knocks": False, "lamp_hand": True, "weak": False, "sophia_night": "whisper", "step": 0, "lantern_dip": 0, "lamp_lit": 0, "rest": False, "palm_open": 0, "palm_near": 0.6,
         "grandma_at": "stand", "sophia_at": "tent", "papa_at": "by", "papa_here": False,
         "grandma_a": FIRST["grandma"][1][0], "grandma_d": FIRST["grandma"][1][1], "sophia_a": FIRST["sophia"][1][0], "sophia_d": FIRST["sophia"][1][1],
         "papa_a": FIRST["papa"][1][0], "papa_d": FIRST["papa"][1][1],
         "cat_at": "tent", "cat_pose": "none", "cat_a": CAT_FIRST[0], "cat_d": CAT_FIRST[1], "cat_dir": -1}


def placed(id, who, places):
    return {f"{id}_at": {"values": places, "means": f"where {who} is (the scene's places, lib.PLACES: {', '.join(places)}); set, put there at once"},
            f"{id}_a": {"range": [-12, 12], "means": f"the scene's own: where {who} stands (across, metres), set from {id}_at; a piece walks them"},
            f"{id}_d": {"range": [0, 30], "means": f"the scene's own: where {who} stands (distance, metres), set from {id}_at; a piece walks them"},
            f"{id}_placed": {"type": "string", "means": f"the scene's own: the place {who} was last put at"}}


states = {**isle.STATES,
          **placed("grandma", "Grandmother", ["stand", "top", "pole", "stone1", "stone2", "stone3", "rest", "half", "door", "inside", "behind"]),
          **placed("sophia", "Sophia", ["parcel", "tent", "tie", "pet", "door", "lie", "inside", "path", "by_half", "half", "top"]),
          **placed("papa", "Papa", ["top", "path", "by", "lamp", "mother", "peg", "half", "door"]),
          "candle": {"range": [0, 1], "smooth": True, "means": "the candle in the lantern at the back of the tent: 0 out, 1 burning — the canvas glows with it"},
          "window": {"range": [0, 1], "smooth": True, "means": "the lamp behind Grandmother's window in the far house: 0 dark, 1 lit"},
          "tent": {"values": ["parcel", "pole", "up"], "means": "the tent: in its parcel on the rock (as Eriksson brought it); its pole stood up, the canvas slack; standing"},
          "lean": {"range": [0, 1], "smooth": True, "means": "how crooked the tent stands: 0 straight, 1 leaning back (the pole trembled as it went up)"},
          "tent_tilt": {"range": [0, 9], "means": "the scene's own: the tent's lean in degrees, set from lean"},
          "flap": {"values": ["open", "shut"], "means": "the tent's door: its flaps thrown back and tied; laced shut (whoever sits inside between the candle and it is a shadow on it)"},
          "shawl": {"values": ["none", "ledge"], "means": "Grandmother's shawl: not here; slipped into the crevice, lying on its ledge over the water (seen from the sea)"},
          "stones": {"type": "boolean", "means": "the last morning: stones laid round the tent's edges"},
          "stones_laid": {"range": [0, 1], "smooth": True, "means": "the scene's own: the stones being laid one by one in a piece (the front's to 0.3, then the side's)"},
          "knocks": {"type": "boolean", "means": "the play's: «I'll knock at midnight, three times» was promised — at the door she knocks three times (else she stoops to it: «It's me»)"},
          "lamp_hand": {"type": "boolean", "means": "the play's: Grandmother goes down to the tent in the fog with the lantern (its light a warm circle on her and the stones), or without it, by the moonlit fog"},
          "weak": {"type": "boolean", "means": "the play's: her strength at 1 or less — on the way behind the tent she sits down to get her breath"},
          "sophia_night": {"values": ["cry", "whisper", "huddle"], "means": "the play's: Sophia alone at the flap under the moon — cries, then goes quiet; whispers and lies down; sits on, huddled, all night"},
          "step": {"range": [0, 3], "means": "the fog and dark minigames: the stone of the path Grandmother walks to (1…3), at her pace; step:stone<n> told on arrival"},
          "lantern_dip": {"range": [0, 1], "smooth": True, "means": "the fog minigame's flaw: the lantern in her hand guttering (0 alight … 1 nearly out)"},
          "lamp_lit": {"range": [0, 1], "smooth": True, "means": "the scene's own: Grandmother's lantern alight in her hand (from grandma_with and lantern_dip)"},
          "rest": {"type": "boolean", "means": "the fog and dark minigames (during fog_way): true — Grandmother sits down where she stands (by the first stone on its low stone, at the second on the halfway stone seat:0); false — she gets up and goes on, back on the stone"},
          "palm_open": {"range": [0, 1], "smooth": True, "means": "М10г «knock»: the close-up of her palm by the tent's canvas open (0 closed … 1 open)"},
          "palm_near": {"range": [0, 1], "smooth": True, "means": "the palm close-up: how near her palm is to the canvas (1 touching it)"},
          "beat": {"type": "string", "means": "the piece playing (the module beats; the game names it, notes.md «Pieces»)"},
          "beat_next": {"type": "string", "means": "the piece the game goes to next (its cut made ready)"},
          "from": {"values": ["land", "sea", "side"], "means": "where the camera is (a cut): on the rock as the scene starts; out on the water, looking back at the cape (the tent's back, the crevice and its ledge); up the path on the left, looking across the tent to the sea (whoever sits behind it)"},
          "cat_at": {"values": ["tent", "door", "rock", "off", "fog"], "means": "where the cat is (lib.CAT): by the tent's front, at its door, on the rock nearer, over the rocks out of sight, behind the tent's back in the fog; set while he walks (cat_pose walk), he goes there at his pace (cat:arrived told)"},
          "cat_pose": {"values": ["sit", "lie", "walk", "none"], "means": "what the cat does: sits, lies, walks; none — not here"},
          "cat_a": {"range": [-12, 12], "means": "the scene's own: where the cat is (across)"},
          "cat_d": {"range": [0, 30], "means": "the scene's own: where the cat is (distance)"},
          "cat_dir": {"values": [1, -1], "means": "the scene's own: which way the cat faces (1 right, -1 left)"},
          "cat_placed": {"type": "string", "means": "the scene's own: the place the cat was last put at"}}

# the light: the island's, and the cape's own over it — in the thick fog the candle is swallowed to 0.4 (its glow in
# the white air would wash out whoever sits by the tent)
light = isle.light(WIND)
light["looks"]["fog_air"] = {**light["looks"]["fog_air"], "lights": {"candle": 0.4}}

spec = {
    "engine": 3,
    "title": "The Cape",
    "caption": "August. Sophia's tent on the bare rocks; the fog is coming in from the sea.",
    "horizon": 0.45,
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
