# Writes scenes/round-room/scene.json: the room's numbers worked out of its circle — C, R, H, WIN, DOOR, the stair and
# the lantern's places as the scene's lib.js has them (keep the two the same) —, the island's sky, sea and granite seen
# through the window and the door (tools/island.py), its lights and looks, its states.
# Run from the world's root: python tools/round_room.py .
import json, math, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island
import lantern

root = sys.argv[1]
folder = root + '/scenes/round-room'
WIND = [1, 0.2, 1.1]
C, R, H = (0, 3.8), 3.6, 3.6
WIN = {"mid": 24, "half": 0.6, "sill": 0.65, "top": 2.3, "deep": 0.6}
# the lighthouse's door (modules/island DOOR: half 0.5, sill 0.42, top 2.25): its arch over the room's floor
DOOR = {"mid": 44, "half": 0.5, "top": 1.83, "spring": 1.33, "deep": 0.6}
D = math.pi / 180
r3 = lambda v: round(v, 3)
at = lambda t, r=R: [r3(C[0] + r * math.sin(t * D)), r3(C[1] + r * math.cos(t * D))]
W0, W1 = WIN["mid"] - WIN["half"] / R / D, WIN["mid"] + WIN["half"] / R / D
D0, D1 = DOOR["mid"] - math.asin(DOOR["half"] / R) / D, DOOR["mid"] + math.asin(DOOR["half"] / R) / D
DOOR_R = math.sqrt(R * R - DOOR["half"] ** 2)
def wall(a, b):
    m = (a + b) / 2
    return {"anchor": at(m), "facing": r3(m + 180), "width": r3(R * (b - a) * D)}
WA, WB, WC, WW = wall(-150, W0), wall(W1, D0), wall(D1, 150), wall(W0, W1)
WIN_H = r3(WIN["top"] - WIN["sill"])
DOOR_FACING, DOOR_SWING = DOOR["mid"] + 180, 85
# the stair's middle tread (its end, just before the stringer) — lib.js LANTERN.stair
STAIR = {"theta": -48, "r": 3.3, "facing": 132, "treads": 13}
sa, sd = at(STAIR["theta"], STAIR["r"])
mid_h = math.ceil(STAIR["treads"] / 2) * H / (STAIR["treads"] + 1)
LANTERN = {"table": [0.12, 4.4, 0.72],
           "stair": [r3(sa + 0.1 * math.sin(STAIR["facing"] * D)), r3(sd + 0.1 * math.cos(STAIR["facing"] * D)), r3(mid_h + 0.045)],
           "bunk": at(-80, 2.55) + [0]}

land = json.load(open(root + '/scenes/landing/scene.json', encoding='utf-8'))
music = land['music']
w = {"Wind chimes and low synth pad, the bare island at night, the moon on the water": 0.9,
     "Sparse felt piano, three notes and a long pause, cold clear morning air, gentle melancholy": 0.8,
     "Soft accordion holding long quiet chords, a little out of breath, a Finnish summer evening by the shore": 0.6,
     "Solo nylon-string guitar picking a slow, plain northern folk tune, close and intimate, sea wind behind it": 0.5,
     "A celesta and a flute, an imaginary garden painted on a wall, bees and summer warmth": 0.3}
music = {**music, "prompts": [{"text": p["text"], "weight": w.get(p["text"], 0)} for p in music["prompts"]],
         "bpm": 66, "density": 0.25, "brightness": 0.35}


def card(id, name, a, d, box, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    o["box"] = box
    o["inside"] = True
    return o


def pane(t0, t1, bottom, top):
    o0, o1 = at(t0, R + WIN["deep"]), at(t1, R + WIN["deep"])
    return [o0 + [bottom], o1 + [bottom], o1 + [top], o0 + [top]]


door_out = [at(D0, R + DOOR["deep"]), at(D1, R + DOOR["deep"])]
panes = [pane(W0, W1, WIN["sill"], WIN["top"]),
         [door_out[0] + [0], door_out[1] + [0], door_out[1] + [DOOR["spring"]], at(DOOR["mid"], R + DOOR["deep"]) + [DOOR["top"]],
          door_out[0] + [DOOR["spring"]]]]
# the island's far lights, coming in only at the window and the door: the sun by day, at dawn (low, far into the room),
# at dusk; the moon from the sky's moon; the lightning from its bolt, seen low in the window
# a lantern carried lit: its light at the flame in the hand (modules/cast part lantern…), on by `<id>_lamp`
carried = [{"id": f"lamp_{who}", "at": f"{who}#flame", "on": f"{who}_lamp", "color": "#ffd08c", "strength": 1.1, "reach": 5, "flicker": 0.1,
            "glow": 0.2} for who in ("papa", "troll")]
far = island.lights(([18, 38], "#fff1dc", 1.3), ([8, 7], "#ffe0c2", 1.3), [38, 6], [9, 4], lantern=False)
for l in far:
    l["through"] = panes
# the island's light outside; how much of it comes into the room
light = island.light(WIND)
light["inside"] = 0.75
# (no beam here: the lighthouse's beam is the lantern room's and the outside scenes')
light["looks"]["storm"]["lights"].pop("beam", None)
for k, v in {"dawn": 0.8, "dusk": 0.8, "night": 0.85, "storm": 0.65}.items():
    light["looks"][k]["inside"] = v
cheek = lambda t, face, h, deep: {"across": at(t, R + deep / 2)[0], "distance": at(t, R + deep / 2)[1], "elevation": h, "facing": r3(face)}
person = lambda id, name, who, a, d, does=None: {"id": id, "name": name, "person": {"cast": "cast", "who": who, **({"does": does} if does else {})},
                                                 "across": a, "distance": d, "place": {"across": id + "_a", "distance": id + "_d"},
                                                 "inside": True}
PEOPLE_AT = {"papa": (-2.7, 4.6), "mama": (-1.05, 4.25), "my": (0.78, 4.6), "troll": tuple(at(WIN["mid"], 3.2))}
stove = at(68, 3.1)
spec = {
    "engine": 3,
    "title": "The Round Room",
    "caption": "The round room at the foot of the lighthouse.",
    "horizon": 0.4,
    "camera": {"mode": "picture"},
    "light": light,
    "lights": [
        lantern.light("lamp", "lantern#flame"),
        {"id": "fire", "of": "stove#fire", "color": "#ff9a50", "strength": 1, "reach": 3.5, "flicker": 0.35},
        *far,
        *carried,
        {"id": "window_light", "of": "casement", "daylight": 1, "on": "window_open"},
        {"id": "door_light", "of": "door", "daylight": 1, "on": "door"}],
    "modules": ["cast", "island", "lantern", "beats", "closeups"],
    "objects": [
        island.sky(0.41, (0.2, -0.3), 1.03, 1.67),
        island.sea(-5, {"strength": 0.2, "fade": 0, "rough": 0.6, "ripple": 0.4}),
        {"id": "granite", "name": "The lighthouse's knoll", "plane": True, "drape": True, "across": 14, "distance": 22, "width": 44, "depth": 44},
        {"id": "cape", "name": "The Fisherman's cape, far off", "plane": True, "drape": True, "across": 23, "distance": 112, "width": 56, "depth": 46},
        {"id": "porch", "name": "The top step outside", "plane": True, "across": at(DOOR["mid"], R + DOOR["deep"] + 0.45)[0],
         "distance": at(DOOR["mid"], R + DOOR["deep"] + 0.45)[1], "elevation": -0.03, "width": 1.4, "depth": 0.9, "rotation": -DOOR["mid"]},
        {"id": "floor", "name": "The floor", "plane": True, "across": 0, "distance": 3.8, "elevation": 0.01, "width": 7.4, "depth": 7.4, "inside": True},
        {"id": "puddles", "name": "The sea on the floor", "plane": True, "across": 0, "distance": 3.8, "elevation": 0.014, "width": 7.4, "depth": 7.4,
         "inside": True, "reflect": {"strength": 0.6, "fade": 3, "rough": 0.15, "ripple": 0.2}},
        {"id": "ceiling", "name": "The ceiling", "plane": True, "across": 0, "distance": 3.8, "elevation": H, "width": 7.4, "depth": 7.4,
         "tilt": 180, "inside": True},
        card("wall_a", "The wall, left of the window", *WA["anchor"], [-WA["width"] / 2, -H, WA["width"] / 2, 0], facing=WA["facing"]),
        card("wall_b", "The wall between the window and the door", *WB["anchor"], [-WB["width"] / 2, -H, WB["width"] / 2, 0], facing=WB["facing"]),
        card("wall_c", "The wall, right of the door", *WC["anchor"], [-WC["width"] / 2, -H, WC["width"] / 2, 0], facing=WC["facing"]),
        card("win_low", "The wall under the window", *WW["anchor"], [-WW["width"] / 2, -WIN["sill"], WW["width"] / 2, 0], facing=WW["facing"]),
        card("win_top", "The wall over the window", *WW["anchor"], [-WW["width"] / 2, -r3(H - WIN["top"]), WW["width"] / 2, 0], facing=WW["facing"],
             elevation=WIN["top"]),
        {"id": "reveal", "name": "The window's cheeks", "box": [-WIN["deep"] / 2, -WIN_H, WIN["deep"] / 2, 0], "inside": True,
         "copies": [cheek(W0, W0 + 90, WIN["sill"], WIN["deep"]), cheek(W1, W1 + 270, WIN["sill"], WIN["deep"])]},
        {"id": "sill", "name": "The windowsill", "plane": True, "across": at(WIN["mid"], R + WIN["deep"] / 2)[0],
         "distance": at(WIN["mid"], R + WIN["deep"] / 2)[1], "elevation": WIN["sill"], "width": 2 * WIN["half"], "depth": WIN["deep"],
         "rotation": -WIN["mid"], "inside": True},
        card("jar", "The jar with the brushes", *at(WIN["mid"] + 6, R + 0.15), [-0.08, -0.36, 0.08, 0.01], facing=WIN["mid"] + 180,
             elevation=WIN["sill"]),
        card("casement", "The window", *at(WIN["mid"], R + WIN["deep"] - 0.08), [-WIN["half"], -WIN_H, WIN["half"], 0], facing=WIN["mid"] + 180,
             elevation=WIN["sill"]),
        {"id": "pane_rain", "name": "Rain running down the window", "on": "casement", "distance": 0.03, "elevation": 0.82,
         "particles": {"kind": "drops", "source": [1.1, 0, 1.5], "rate": 5, "amount": "storm"}},
        {"id": "shutters", "name": "The shutters", "across": at(WIN["mid"], R + WIN["deep"] + 0.04)[0], "distance": at(WIN["mid"], R + WIN["deep"] + 0.04)[1],
         "facing": WIN["mid"] + 180, "elevation": WIN["sill"] - 0.05, "shadow": True,
         "box": [-WIN["half"] - 0.07, -WIN_H - 0.12, WIN["half"] + 0.07, 0.02]},
        card("door_top", "The wall over the door", *at(DOOR["mid"], DOOR_R), [-DOOR["half"], -H, DOOR["half"], -DOOR["spring"] + 0.01],
             facing=DOOR["mid"] + 180),
        card("door_reveal", "The doorway's reveal", *at(DOOR["mid"], DOOR_R),
             [-r3(DOOR["spring"] + math.pi * DOOR["half"] / 2), -DOOR["deep"], r3(DOOR["spring"] + math.pi * DOOR["half"] / 2), 0],
             facing=DOOR["mid"] + 180),
        {"id": "threshold", "name": "The threshold", "plane": True, "across": at(DOOR["mid"], DOOR_R + DOOR["deep"] / 2)[0],
         "distance": at(DOOR["mid"], DOOR_R + DOOR["deep"] / 2)[1], "elevation": 0.025, "width": 2 * DOOR["half"], "depth": DOOR["deep"],
         "rotation": -DOOR["mid"], "inside": True},
        card("door", "The doorway", *at(DOOR["mid"], DOOR_R - 0.01), [-DOOR["half"] - 0.12, -DOOR["top"] - 0.12, DOOR["half"] + 0.12, 0.01],
             facing=DOOR_FACING),
        card("door_leaf", "The door", *at(D0, R), [-0.01, -DOOR["top"] - 0.01, 2 * DOOR["half"] + 0.01, 0.01], facing=DOOR_FACING,
             place={"facing": "door_f"}, shadow=True),
        card("basket", "Moominmamma's basket", *at(31, 3.2), [-0.28, -0.66, 0.28, 0.03], shadow=True),
        card("stone", "The boy's stone", *at(D1 + 1.5, 3.4), [-0.12, -0.12, 0.12, 0.02]),
        card("stair", "The stair to the hatch", *at(STAIR["theta"], STAIR["r"]), [-1.25, -3.65, 1.25, 0.03], facing=STAIR["facing"], shadow=True),
        card("shelf", "The shelf with the paraffin", *at(6, 3.48), [-0.5, -0.5, 0.5, 0.2], facing=186, elevation=1.85, shadow=True),
        card("stove", "The stove", *stove, [-0.4, -3.65, 0.8, 0.05], shadow=True),
        {"id": "stove_steam", "name": "Steam off the flooded stove", "inside": True,
         "particles": {"kind": "smoke", "at": "stove#hob", "color": "#eef0f2", "rate": 14, "size": [0.15, 1.2], "speed": [0.4, 0.8],
                       "life": [3, 5], "opacity": 0.5, "shadow": 0.2, "amount": "steam"}},
        {"id": "drip", "name": "Drips from the ceiling", "across": 1.6, "distance": 5.2, "elevation": H - 0.05, "inside": True,
         "particles": {"kind": "splashes", "source": [1.8, 1.8, 0], "rate": 1.2, "life": [0.9, 1.2], "direction": [0, 0, -1], "spread": 3,
                       "speed": [0.1, 0.3], "gravity": 9.8, "shape": "drop", "size": [0.012, 0.012], "ground": "splash", "settle": 0.15,
                       "amount": "drip"}},
        card("bunks", "The bunks", *at(-98, 3.2), [-1.05, -1.8, 1.05, 0.03], facing=82, shadow=True),
        {"id": "table", "name": "The table", "plane": True, "across": 0, "distance": 4.45, "elevation": 0.72, "width": 1.5, "depth": 0.8,
         "inside": True},
        card("table_legs", "The table's legs", 0, 4.45, [-0.85, -0.76, 0.85, 0.05], facing=180, shadow=True),
        lantern.element("lantern", "The storm lantern", *LANTERN["table"], inside=True,
                        place={"across": "lantern_a", "distance": "lantern_d", "elevation": "lantern_e"}),
        card("cup", "The cups", -0.42, 4.3, [-0.07, -0.12, 0.3, 0.01], elevation=0.72),
        {"id": "tea_steam", "name": "Steam over the tea", "inside": True,
         "particles": {"kind": "smoke", "at": "cup#cup", "color": "#f4f4f2", "rate": 3, "size": [0.03, 0.18], "speed": [0.08, 0.15],
                       "life": [2, 3], "opacity": 0.25, "gravity": -0.1, "shadow": 0, "amount": "tea"}},
        card("wall_mama", "Moominmamma in her garden", *at(-10.5, R - 0.015), [-0.22, -0.42, 0.28, 0.01], facing=169.5, elevation=1.0),
        card("bench", "The bench", 0.03, 5.15, [-0.85, -0.5, 0.85, 0.03], shadow=True),
        card("stool", "Moominmamma's stool", -1.05, 4.25, [-0.22, -0.5, 0.22, 0.03], shadow=True),
        card("handbag", "Moominmamma's handbag", -1.45, 4.0, [-0.25, -0.4, 0.25, 0.03], facing=200, shadow=True),
        {"id": "motes", "name": "Dust in the light", "across": 1.4, "distance": 6.1, "elevation": 0.9, "inside": True,
         "particles": {"kind": "dust", "source": [1.6, 1.6, 1.4]}},
        {"id": "needle", "name": "Mama's needle close", "insert": "needle_open"},
        {"id": "handle", "name": "The lantern's handle close", "insert": "handle_open"},
        {"id": "paws", "name": "The boy's paws close", "insert": "paws_open"},
        person("papa", "Moominpappa", "papa", -2.7, 4.6, "hands_behind"),
        person("mama", "Moominmamma", "mama", -1.05, 4.25, "seated"),
        person("my", "Little My", "my", 0.78, 4.6, "seated"),
        person("troll", "Moomintroll", "troll", *at(WIN["mid"], 3.2)),
    ],
    "state": {
        **island.STATE,
        "garden": -1, "paints": "green", "wall_mama": 0, "wall_grass": False, "apple_leaves": True, "clouds": False,
        "line27": "dust", "log": 0, "log_depth": False, "sill": -1, "brushes": "sill",
        "lantern_at": "table", "flame": "full", "paraffin": 3, "stove": "cold", "firewood": True, "steam": 0,
        "cups": 0, "tea": 0, "door": 0, "basket": False, "stone": False, "shutters": False, "wet": False, "drip": 0,
        "door_f": DOOR_FACING, "lantern_a": LANTERN["table"][0], "lantern_d": LANTERN["table"][1], "lantern_e": LANTERN["table"][2],
        "window_open": 1, "lantern_x": 0, "papa_lamp": 0, "troll_lamp": 0, "needle_open": 0, "handle_open": 0, "paws_open": 0,
        "paws_rub": 0, "paws_thaw": 0, "thread": 0, "give": 0, "can_sway": 0, "wipe": 0, "eyes": 0, "door_shake": 0, "mama_to": "papa", "beat": "", "beat_next": "",
        **{f"{k}_a": v[0] for k, v in PEOPLE_AT.items()}, **{f"{k}_d": v[1] for k, v in PEOPLE_AT.items()},
        "papa_turn": 120, "papa_look": [0, 4.45, 0.9], "papa_mood": "thinking",
        "mama_on": [-1.05, 4.25, 0.45], "mama_turn": 115, "mama_look": [0, 4.45, 0.9], "mama_mood": "smile",
        "my_on": [0.78, 4.6, 0.72], "my_turn": 250, "my_look": "papa", "my_mood": "smile",
        "troll_turn": WIN["mid"], "troll_look": at(WIN["mid"], 12) + [0.4], "troll_mood": "thinking"},
    "states": {
        **island.STATES,
        "garden": {"range": [-1, 4], "means": "Moominmamma's garden on the wall: −1 the bare wall; 0 the apple tree, the veranda, the stream, the boy, My and herself with her basket, half washed in, a gate with little Papa at it; 1 coloured in (little Papa still at the gate); 2 the path, bushes, more flowers; 3 apples, beds of flowers; 4 whole, her sky behind it"},
        "paints": {"values": ["green", "red_blue"], "means": "her paints, on the sill and the wall: her own greens, or the red lead and frame blue from the store"},
        "wall_mama": {"range": [0, 1], "smooth": True, "means": "Moominmamma in her garden under the apple tree: 0 not there … 1 there"},
        "wall_grass": {"type": "boolean", "means": "the grass under the apple tree pressed where she sat"},
        "apple_leaves": {"type": "boolean", "means": "the apple tree has its last leaves (false: its top bare, never finished)"},
        "clouds": {"type": "boolean", "means": "clouds painted over the apple tree"},
        "line27": {"values": ["dust", "clean", "stripe", "next"], "means": "the line of the 27th of August low by the floor: under the dust; wiped clean; clean, a finger's stripe through the dust under it; clean, and the next line under it too"},
        "log": {"range": [0, 2], "means": "Moominpappa's log on the keeper's wall: 0 none; 1 «23 August. Arrived.» across «Nobody again»; 2 and «27 August. Calm.»"},
        "log_depth": {"type": "boolean", "means": "his line «Depth: more than the rope.»"},
        "sill": {"range": [-1, 4], "means": "Moominmamma's painted garden on the sill: −1 bare; 0 her first stem; 1–4 that many flowers by it"},
        "brushes": {"values": ["sill", "jar"], "means": "her brush laid on the sill by her paint, or her brushes put away in the jar"},
        "lantern_at": {"values": ["table", "stair", "bunk", "none"], "means": "where the storm lantern stands: the table's middle, the stair's middle tread, the floor by the boy's bunk, not in the room"},
        "flame": {"values": ["full", "low", "out", "frost"], "means": "the lantern's flame: full, turned low, out (empty), out and white with rime"},
        "paraffin": {"range": [0, 3], "means": "measures of paraffin left in the can (strokes on its label; 0 its cap off)"},
        "stove": {"values": ["cold", "fire", "flooded"], "means": "the stove: cold; a fire in it; flooded by the sea down its pipe"},
        "firewood": {"type": "boolean", "means": "the driftwood bundle by the stove full (false: two sticks left)"},
        "steam": {"range": [0, 1], "smooth": True, "means": "steam off the flooded stove"},
        "cups": {"range": [0, 2], "means": "cups on the table"},
        "tea": {"range": [0, 1], "smooth": True, "means": "steam over the cups: 1 hot tea … 0 gone cold"},
        "door": {"range": [0, 1], "smooth": True, "means": "the door: 0 shut … 1 wide open into the room"},
        "basket": {"type": "boolean", "means": "Moominmamma's basket packed by the door"},
        "stone": {"type": "boolean", "means": "the boy's stone left just inside the door"},
        "shutters": {"type": "boolean", "means": "the window's shutters shut and tied"},
        "wet": {"type": "boolean", "means": "the sea come in lies on the floor"},
        "drip": {"range": [0, 1], "smooth": True, "means": "drips from the ceiling after the storm"},
        "door_f": {"type": "number", "means": "the door leaf's turn, degrees — the script sets it from door"},
        "lantern_a": {"type": "number", "means": "the lantern's place, across — the script sets it from lantern_at"},
        "lantern_d": {"type": "number", "means": "the lantern's place, distance — the script sets it from lantern_at"},
        "lantern_e": {"type": "number", "means": "the lantern's place, elevation — the script sets it from lantern_at"},
        "window_open": {"range": [0, 1], "means": "the window lets the day in (0 behind the shutters) — the script sets it from shutters"},
        **{f"{k}_lamp": {"range": [0, 1], "means": f"the lantern {k} carries burns (its light at the hand)"} for k in ("papa", "troll")},
        **{f"{k}_open": {"range": [0, 1], "smooth": True, "means": f"the close-up `{k}` open (modules/closeups)"} for k in ("needle", "handle", "paws")},
        "paws_rub": {"range": [0, 1], "smooth": True, "means": "the close-up `paws`: Mama's paws rubbing his"},
        "paws_thaw": {"range": [0, 1], "smooth": True, "means": "the close-up `paws`: the rime going"},
        "thread": {"range": [0, 1], "smooth": True, "means": "М5б: the thread to the needle's eye and through (the close-up `needle`)"},
        "give": {"range": [0, 1], "smooth": True, "means": "М5в: Papa's paw opening on the handle, the boy's closing (the close-up `handle`)"},
        "can_sway": {"range": [-1, 1], "smooth": True, "means": "М2б: the can's sway as he carries it"},
        "wipe": {"range": [0, 1], "smooth": True, "means": "М6в: the dust wiped along the line"},
        "eyes": {"range": [0, 1], "smooth": True, "means": "М7а: Papa's eyes opening"},
        "door_shake": {"range": [0, 1], "smooth": True, "means": "М9б: the door's blow"},
        "lantern_x": {"type": "number", "means": "the lantern moved along the table from its middle, metres (the piece «Бери, бери»)"},
        "mama_to": {"values": ["papa", "apple"], "means": "whom Mama tells «I want to go home» at the door in the storm: Papa, or the painted apple tree (Ш2 «Гуляет»)"},
        "beat": {"type": "string", "means": "the piece playing (modules/beats)"},
        "beat_next": {"type": "string", "means": "the piece the game plays next (modules/beats: made ready ahead)"},
        **{f"{k}_a": {"type": "number", "means": f"where {k} stands, across"} for k in PEOPLE_AT},
        **{f"{k}_d": {"type": "number", "means": f"where {k} stands, distance"} for k in PEOPLE_AT},
    },
    "music": music,
}
island.shaders(folder)
lantern.shader(folder, "lantern")
json.dump(spec, open(folder + '/scene.json', 'w', encoding='utf-8', newline='\n'), indent=2, ensure_ascii=False)
